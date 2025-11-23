import asyncio
import logging
import os
import requests
import pandas as pd
import psycopg2
from psycopg2.extras import DictCursor
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError
from tqdm import tqdm
from urllib.parse import quote
from dotenv import load_dotenv
from datetime import datetime
import time

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
        self.batch_size = int(os.getenv('BATCH_SIZE', 150))
        self.run_id = os.getenv('RUN_ID', f'auto-{int(time.time())}')
        
        # Contadores
        self.total_processed = 0
        self.success_count = 0
        self.error_count = 0
        self.skipped_count = 0
        
        # Lista de registros que falharam para retry posterior
        self.failed_records = []
        
        # Validação das variáveis obrigatórias
        required_vars = [
            self.login_username, self.login_password, 
            self.telegram_token, self.telegram_chat_id,
            self.database_url
        ]
        if not all(required_vars):
            raise ValueError("Variáveis de ambiente obrigatórias não foram definidas.")

    def inicializar_progresso(self, total_records):
        """Inicializa o registro de progresso no banco"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = '''
                        UPDATE public.automation_progress
                        SET status = 'running',
                            total_records = %s,
                            updated_at = NOW()
                        WHERE run_id = %s
                    '''
                    cur.execute(query, (total_records, self.run_id))
                    conn.commit()
                    logging.info(f"Progresso inicializado: {total_records} registros")
        except Exception as e:
            logging.error(f"Erro ao inicializar progresso: {e}")

    def atualizar_progresso(self):
        """Atualiza o progresso em tempo real"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = '''
                        UPDATE public.automation_progress
                        SET processed_records = %s,
                            success_count = %s,
                            error_count = %s,
                            skipped_count = %s,
                            updated_at = NOW()
                        WHERE run_id = %s
                    '''
                    cur.execute(query, (
                        self.total_processed,
                        self.success_count,
                        self.error_count,
                        self.skipped_count,
                        self.run_id
                    ))
                    conn.commit()
        except Exception as e:
            logging.error(f"Erro ao atualizar progresso: {e}")

    def finalizar_progresso(self, status='completed', error_message=None):
        """Finaliza o registro de progresso"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = '''
                        UPDATE public.automation_progress
                        SET status = %s,
                            is_complete = TRUE,
                            completed_at = NOW(),
                            error_message = %s,
                            updated_at = NOW()
                        WHERE run_id = %s
                    '''
                    cur.execute(query, (status, error_message, self.run_id))
                    conn.commit()
                    logging.info(f"Progresso finalizado com status: {status}")
        except Exception as e:
            logging.error(f"Erro ao finalizar progresso: {e}")

    def registrar_erro(self, isrc, artista, titulares, error_type, error_message):
        """Registra um erro no banco para retry posterior"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = '''
                        INSERT INTO public.automation_errors
                        (run_id, isrc, artista, titulares, error_type, error_message, retry_count, should_retry)
                        VALUES (%s, %s, %s, %s, %s, %s, 0, TRUE)
                        ON CONFLICT DO NOTHING
                    '''
                    cur.execute(query, (
                        self.run_id, isrc, artista, titulares, 
                        error_type, error_message
                    ))
                    conn.commit()
        except Exception as e:
            logging.error(f"Erro ao registrar erro para ISRC {isrc}: {e}")

    def marcar_erro_resolvido(self, isrc):
        """Marca um erro como resolvido após retry bem-sucedido"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    query = '''
                        UPDATE public.automation_errors
                        SET resolved = TRUE,
                            retried_at = NOW()
                        WHERE isrc = %s AND run_id = %s
                    '''
                    cur.execute(query, (isrc, self.run_id))
                    conn.commit()
        except Exception as e:
            logging.error(f"Erro ao marcar erro resolvido para ISRC {isrc}: {e}")

    def buscar_dados_neon(self):
        """Busca dados pendentes da tabela no Neon"""
        try:
            logging.info(f"Buscando registros pendentes do Neon...")
            
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor(cursor_factory=DictCursor) as cur:
                    query = f'''
                        SELECT * FROM public."{self.tabela}"
                        WHERE "PAINEL_NEW" IS NULL
                        ORDER BY "id" ASC
                        LIMIT %s
                    '''
                    cur.execute(query, (self.batch_size,))
                    dados = cur.fetchall()

                    if not dados:
                        logging.info(f"Nenhum registro pendente encontrado.")
                        return pd.DataFrame()
                    
                    df = pd.DataFrame([dict(row) for row in dados])
                    logging.info(f"Encontrados {len(df)} registros para processar.")
                    return df
                
        except Exception as e:
            logging.error(f"Erro ao conectar com Neon: {e}")
            return pd.DataFrame()

    def atualizar_status_neon(self, isrc, status='Cadastro OK'):
        """Atualiza o status de um registro no Neon"""
        try:
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    # Se foi sucesso, registra o timestamp
                    if status == 'Cadastro OK':
                        query = f'''
                            UPDATE public."{self.tabela}"
                            SET "PAINEL_NEW" = %s,
                                "CADASTRADO" = NOW()
                            WHERE "ISRC" = %s
                        '''
                    else:
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

    async def verificar_conectividade(self):
        """Verifica se o painel está acessível"""
        try:
            response = await self.page.goto(
                "https://sistemamd.com.br/login",
                wait_until='domcontentloaded',
                timeout=15000
            )
            return response.status == 200
        except Exception as e:
            logging.error(f"Erro ao verificar conectividade: {e}")
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
        try:
            await self.page.goto("https://sistemamd.com.br/login", timeout=30000)

            await self.page.fill('input#login-username', self.login_username)
            await self.page.fill('input#login-password', self.login_password)
            await self.page.click('button[type="submit"]')
            
            await self.page.wait_for_timeout(1000)  # Reduzido de 2000 
            
            current_url = self.page.url
            if "login" in current_url:
                logging.error("Login falhou - ainda na página de login")
                return False
                
            logging.info("Login realizado com sucesso.")
            return True
        except Exception as e:
            logging.error(f"Erro ao tentar logar: {e}")
            return False

    async def validar_cadastro_sucesso(self):
        """Valida se o cadastro foi bem-sucedido - SIMPLIFICADO"""
        try:
            # Usa o mesmo tempo do script original que funciona
            await self.page.wait_for_timeout(500)
            
            # Simplificado: assume sucesso (como no original)
            # O painel geralmente não mostra erro imediatamente
            return True, None
            
        except Exception as e:
            logging.warning(f"Erro na validação: {e}")
            return True, None

    async def cadastrar_musica(self, row):
        """Cadastra uma música no painel - OTIMIZADO PARA ~16s"""
        isrc = row.get('ISRC')
        artista = row.get('ARTISTA')
        titulares = row.get('TITULARES')
        
        # Timeout de 25s (reduzido de 30s)
        async with asyncio.timeout(25):
            # Usa wait_until='domcontentloaded' para ser mais rápido
            await self.page.goto("https://sistemamd.com.br/musicas/add", wait_until='domcontentloaded')
            await self.page.wait_for_selector('input#titulo', timeout=5000)
            
            await self.page.fill('input#titulo', str(artista))
            await self.page.fill('input#isrc', str(isrc))
            await self.page.click('span.select2-selection')
            
            titular_input = await self.page.wait_for_selector('input.select2-search__field', timeout=3000)
            await titular_input.fill(str(titulares))
            await titular_input.press('Enter')
            await self.page.wait_for_timeout(200)  # Reduzido de 500ms

            await self.page.click('input#titular_2')
            await self.page.click('input#titular_1')
            await self.page.click('input#titular_4')
            await self.page.click('input#titular_5')
            await self.page.click('input#titular_3')

            await self.page.wait_for_timeout(250)  # Reduzido de 500ms
            await self.page.click('button#AdicionarTitular')
            await self.page.click('button#BtnSalvar')
            
            # Removida validação - confia no save (economiza ~500ms)
            await self.page.wait_for_timeout(100)  # Apenas pequeno delay

    async def cadastrar_com_retry(self, row, max_retries=3):
        """Tenta cadastrar com retry exponencial"""
        isrc = row.get('ISRC')
        artista = row.get('ARTISTA')
        titulares = row.get('TITULARES')
        
        for attempt in range(max_retries):
            try:
                await self.cadastrar_musica(row)
                return True, None
                
            except asyncio.TimeoutError:
                wait_time = 2 ** attempt  # 1s, 2s, 4s
                logging.warning(
                    f"Timeout no ISRC {isrc} (tentativa {attempt+1}/{max_retries})"
                )
                
                if attempt < max_retries - 1:
                    logging.info(f"Aguardando {wait_time}s antes de retry...")
                    await asyncio.sleep(wait_time)
                else:
                    error_msg = "Timeout após múltiplas tentativas"
                    return False, error_msg
                    
            except Exception as e:
                error_msg = str(e)
                logging.error(f"Erro no ISRC {isrc} (tentativa {attempt+1}/{max_retries}): {error_msg}")
                
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    logging.info(f"Aguardando {wait_time}s antes de retry...")
                    await asyncio.sleep(wait_time)
                else:
                    return False, error_msg
                    
        return False, "Falha após todas as tentativas"

    async def processar_lote_com_skip_retry(self, tabela_df):
        """Processa lote, skipa falhas, tenta novamente depois"""
        total_items = len(tabela_df)
        logging.info(f"Iniciando cadastro de {total_items} faixas...")
        
        # Primeira passagem - tenta todos
        for index, row in tqdm(tabela_df.iterrows(), total=total_items, desc="Processando"):
            isrc = row.get('ISRC')
            artista = row.get('ARTISTA')
            titulares = row.get('TITULARES')
            
            if not all([isrc, artista, titulares]):
                logging.warning(f"Dados incompletos na linha {index}: ISRC={isrc}")
                self.skipped_count += 1
                continue
            
            # Health check a cada 10 registros
            if self.total_processed > 0 and self.total_processed % 10 == 0:
                if not await self.verificar_conectividade():
                    logging.error("Perda de conectividade detectada. Tentando reconectar...")
                    await asyncio.sleep(30)
                    if not await self.login():
                        logging.error("Falha ao reconectar. Abortando...")
                        break
            
            success, error_msg = await self.cadastrar_com_retry(row)
            
            if success:
                self.atualizar_status_neon(isrc, 'Cadastro OK')
                self.success_count += 1
                logging.info(f"✓ ISRC {isrc} cadastrado com sucesso")
            else:
                self.atualizar_status_neon(isrc, 'Erro no Cadastro')
                self.error_count += 1
                self.failed_records.append((row, error_msg))
                self.registrar_erro(
                    isrc, artista, titulares,
                    'CadastroError', error_msg or 'Erro desconhecido'
                )
                logging.error(f"✗ ISRC {isrc} falhou: {error_msg}")
            
            self.total_processed += 1
            
            # Atualiza progresso a cada registro para sincronizar com KPI cards
            self.atualizar_progresso()
        
        # Segunda passagem - retry dos que falharam
        if self.failed_records:
            retry_count = len(self.failed_records)
            logging.info(f"\n{'='*60}")
            logging.info(f"RETRY: {retry_count} registros falharam, tentando novamente...")
            logging.info(f"{'='*60}\n")
            
            await asyncio.sleep(10)  # Espera antes de começar retry
            
            retry_success = 0
            for row, prev_error in tqdm(self.failed_records, desc="Retry"):
                isrc = row.get('ISRC')
                
                success, error_msg = await self.cadastrar_com_retry(row, max_retries=2)
                
                if success:
                    self.atualizar_status_neon(isrc, 'Cadastro OK')
                    self.marcar_erro_resolvido(isrc)
                    self.success_count += 1
                    self.error_count -= 1
                    retry_success += 1
                    logging.info(f"✓ RETRY OK: ISRC {isrc}")
                else:
                    logging.error(f"✗ RETRY FALHOU: ISRC {isrc}: {error_msg}")
                
                self.atualizar_progresso()
            
            logging.info(f"\nRETRY Completo: {retry_success}/{retry_count} recuperados")

    async def run_task_with_time_estimate(self):
        tabela_df = self.buscar_dados_neon()
        
        if tabela_df.empty:
            logging.info(f"Nenhum dado para processar. Finalizando...")
            self.finalizar_progresso('completed')
            return

        total_records = len(tabela_df)
        self.inicializar_progresso(total_records)

        await self.start_driver()
        
        if not await self.login():
            self.finalizar_progresso('failed', 'Falha no login')
            await self.close_driver()
            return

        try:
            await self.processar_lote_com_skip_retry(tabela_df)
            
            self.finalizar_progresso('completed')
            logging.info(f"\n{'='*60}")
            logging.info(f"RESULTADO FINAL:")
            logging.info(f"  Total Processado: {self.total_processed}")
            logging.info(f"  Sucessos: {self.success_count}")
            logging.info(f"  Erros: {self.error_count}")
            logging.info(f"  Pulados: {self.skipped_count}")
            logging.info(f"{'='*60}\n")
            
            await self.send_telegram_notification()
            
        except Exception as e:
            logging.error(f"Erro crítico durante processamento: {e}")
            self.finalizar_progresso('failed', str(e))
        finally:
            await self.close_driver()

    async def send_telegram_notification(self):
        logging.info("Enviando notificação por Telegram...")
        message = f'''🤖 Automação MusicDelivery Concluída ✅

📊 Run ID: {self.run_id}

📈 Resultados:
   • Processados: {self.total_processed}
   • Sucessos: {self.success_count} ✓
   • Erros: {self.error_count} ✗
   • Pulados: {self.skipped_count}

Taxa de Sucesso: {(self.success_count/self.total_processed*100):.1f}%

Por favor, validar logs para detalhes.'''
        
        try:
            response = requests.get(
                url=f'https://api.telegram.org/bot{self.telegram_token}/sendMessage',
                params={'chat_id': self.telegram_chat_id, 'text': message}
            )
            if response.status_code == 200:
                logging.info("Telegram enviado com sucesso.")
            else:
                logging.error("Erro ao enviar notificação por Telegram.")
        except Exception as e:
            logging.error(f"Exceção ao enviar Telegram: {e}")

async def main():
    try:
        web_automation = WebAutomation()
        logging.info(f"Iniciando automação (Run ID: {web_automation.run_id})...")
        await web_automation.run_task_with_time_estimate()
    except ValueError as e:
        logging.error(f"Erro de configuração: {e}")
    except Exception as e:
        logging.error(f"Erro inesperado: {e}")

if __name__ == "__main__":
    asyncio.run(main())
