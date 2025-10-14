import asyncio
import logging
import os
import requests
import pandas as pd
import psycopg2
from psycopg2.extras import DictCursor
from playwright.async_api import async_playwright
from tqdm import tqdm
from urllib.parse import quote
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env (para uso local)
load_dotenv()

# Configuração do logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s",
    datefmt='%d/%m/%Y %H:%M:%S',
    filename='painel_novo_neon.log',
    filemode='w',
)

class WebAutomation:
    def __init__(self):
        self.browser = None
        self.page = None
        # Carrega as variáveis de ambiente
        self.login_username = os.getenv('LOGIN_USERNAME')
        self.login_password = os.getenv('LOGIN_PASSWORD')
        self.telegram_token = os.getenv('TELEGRAM_TOKEN')
        self.telegram_chat_id = os.getenv('TELEGRAM_CHAT_ID')
        self.database_url = os.getenv('DATABASE_URL')
        self.tabela = os.getenv('TABELA', 'cadastros')
        self.batch_number = int(os.getenv('BATCH_NUMBER', 1))
        self.batch_size = int(os.getenv('BATCH_SIZE', 150))
        
        # Validação das variáveis obrigatórias
        required_vars = [
            self.login_username, self.login_password, 
            self.telegram_token, self.telegram_chat_id,
            self.database_url
        ]
        if not all(required_vars):
            raise ValueError("Variáveis de ambiente obrigatórias não foram definidas. Verifique DATABASE_URL e outras no .env ou nas secrets do GitHub")

    def buscar_dados_neon(self):
        """Busca um lote de dados da tabela no Neon"""
        try:
            offset = (self.batch_number - 1) * self.batch_size
            logging.info(f"Buscando lote {self.batch_number} do Neon (tamanho: {self.batch_size}, offset: {offset})...")
            
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor(cursor_factory=DictCursor) as cur:
                    query = f'''
                        SELECT * FROM public."{self.tabela}"
                        WHERE "PAINEL_NEW" IS NULL
                        ORDER BY "id" ASC -- Ordenação é crucial para consistência dos lotes
                        LIMIT %s
                        OFFSET %s
                    '''
                    cur.execute(query, (self.batch_size, offset))
                    dados = cur.fetchall()

                    if not dados:
                        logging.info(f"Lote {self.batch_number}: Nenhum registro pendente encontrado.")
                        return pd.DataFrame()
                    
                    df = pd.DataFrame([dict(row) for row in dados])
                    logging.info(f"Lote {self.batch_number}: Encontrados {len(df)} registros para processar.")
                    return df
                
        except Exception as e:
            logging.error(f"Erro ao conectar com Neon no lote {self.batch_number}: {e}")
            return pd.DataFrame()

    def atualizar_status_neon(self, isrc, status='Cadastro OK'):
        """Atualiza o status de um registro no Neon"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = f'''
                        UPDATE public."{self.tabela}"
                        SET "PAINEL_NEW" = %s
                        WHERE "ISRC" = %s
                    '''
                    cur.execute(query, (status, isrc))
                    conn.commit()
                    return True
            
        except Exception as e:
            logging.error(f"Erro ao atualizar status do ISRC {isrc}: {e}")
            return False

    async def start_driver(self):
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=True)
        self.page = await self.browser.new_page()

    async def close_driver(self):
        if self.browser:
            await self.browser.close()

    async def login(self):
        logging.info('Logando no Painel...')
        await self.page.goto("https://sistemamd.com.br/login?login_error")

        try:
            await self.page.fill('input#login-username', self.login_username)
            await self.page.fill('input#login-password', self.login_password)
            await self.page.click('button[type="submit"]')
            
            await self.page.wait_for_timeout(2000) 
            
            current_url = self.page.url
            if "login" in current_url:
                logging.error("Login falhou - ainda na página de login")
                return False
                
            logging.info("Login realizado com sucesso.")
            return True
        except Exception as e:
            logging.error(f"Erro ao tentar logar: {e}")
            return False

    async def run_task_with_time_estimate(self):
        tabela_df = self.buscar_dados_neon()
        
        if tabela_df.empty:
            logging.info(f"Lote {self.batch_number}: Nenhum dado para processar. Finalizando...")
            return

        await self.start_driver()
        if not await self.login():
            await self.close_driver()
            return

        total_items = len(tabela_df)
        contador = 0
        logging.info(f"Lote {self.batch_number}: Iniciando Cadastro de {total_items} Faixas...")

        for index, row in tqdm(tabela_df.iterrows(), total=total_items, desc=f"Lote {self.batch_number}"):
            try:
                isrc = row.get('ISRC')
                artista = row.get('ARTISTA') 
                titulares = row.get('TITULARES')

                if not all([isrc, artista, titulares]):
                    logging.warning(f"Dados incompletos na linha {index} do lote {self.batch_number}: ISRC={isrc}")
                    continue

                await self.page.goto("https://sistemamd.com.br/musicas/add")
                await self.page.wait_for_selector('input#titulo')
                await self.page.fill('input#titulo', str(artista))
                await self.page.fill('input#isrc', str(isrc))
                await self.page.click('span.select2-selection')
                titular_input = await self.page.wait_for_selector('input.select2-search__field')
                await titular_input.fill(str(titulares))
                await titular_input.press('Enter')
                await self.page.wait_for_timeout(500)

                await self.page.click('input#titular_2')
                await self.page.click('input#titular_1')
                await self.page.click('input#titular_4')
                await self.page.click('input#titular_5')
                await self.page.click('input#titular_3')

                await self.page.wait_for_timeout(500)
                await self.page.click('button#AdicionarTitular')
                await self.page.click('button#BtnSalvar')

                if self.atualizar_status_neon(isrc, 'Cadastro OK'):
                    logging.info(f"Lote {self.batch_number} - ISRC: {isrc} - Status atualizado")
                    contador += 1
                else:
                    logging.warning(f"Lote {self.batch_number} - ISRC: {isrc} - Erro ao atualizar status")
                    
            except Exception as e:
                logging.error(f"Erro no lote {self.batch_number} - ISRC: {isrc}: {e}")
                self.atualizar_status_neon(isrc, 'Erro no Cadastro')
                continue

        logging.info(f"Lote {self.batch_number}: Total de {contador} faixas cadastradas com sucesso.")
        # A notificação do Telegram será enviada apenas pelo último lote, ou por um job separado.
        # await self.send_telegram_notification(contador)
        await self.close_driver()

    async def send_telegram_notification(self, contador):
        logging.info("Enviando notificação por Telegram...")
        message = f'Painel New (Neon) Concluído com êxito 👍🏼📝✅\n{contador} arquivo(s) cadastrado(s).\nPor gentileza validar relatório de logs, Obrigado!'
        response = requests.get(
            url=f'https://api.telegram.org/bot{self.telegram_token}/sendMessage?chat_id={self.telegram_chat_id}&text={quote(message)}'
        )
        if response.status_code == 200:
            logging.info("Telegram enviado com sucesso.")
        else:
            logging.error("Erro ao enviar notificação por Telegram.")

async def main():
    try:
        web_automation = WebAutomation()
        batch_num = os.getenv('BATCH_NUMBER', '1')
        logging.info(f"Iniciando automação para o lote {batch_num}...")
        await web_automation.run_task_with_time_estimate()
    except ValueError as e:
        logging.error(f"Erro de configuração: {e}")
    except Exception as e:
        logging.error(f"Erro inesperado: {e}")

if __name__ == "__main__":
    asyncio.run(main())
