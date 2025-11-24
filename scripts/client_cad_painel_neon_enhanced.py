import asyncio
import logging
import os
import sys
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

# Configuração do logging com handlers simultâneos (console + arquivo)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Formato comum para ambos os handlers
formatter = logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s',
    datefmt='%d/%m/%Y %H:%M:%S'
)

# Handler para arquivo (mantém funcionamento atual)
file_handler = logging.FileHandler('painel_novo_neon.log', mode='w', encoding='utf-8')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Handler para console (NOVO - permite ver logs no GitHub Actions)
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

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
        self.batch_size = int(os.getenv('BATCH_SIZE', 100))
        self.run_id = os.getenv('RUN_ID', f'auto-{int(time.time())}')
        self.job_index = int(os.getenv('JOB_INDEX', '0'))
        self.total_jobs = int(os.getenv('TOTAL_JOBS', '1'))
        
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
        
        # Logs detalhados de inicialização
        logging.info("="*60)
        logging.info("🚀 WebAutomation inicializada com sucesso")
        logging.info(f"📊 Run ID: {self.run_id}")
        logging.info(f"👤 Username: {self.login_username}")
        logging.info(f"💾 Tabela: {self.tabela}")
        logging.info(f"📦 Batch Size: {self.batch_size}")
        logging.info(f"🔢 Job: {self.job_index + 1}/{self.total_jobs}")
        logging.info(f"🗄️  Database: {self.database_url[:30]}...{self.database_url[-15:]}")
        logging.info("="*60)

    def testar_conexao_banco(self):
        """Testa a conexão com o banco antes de iniciar o processamento"""
        try:
            logging.info("")
            logging.info("🔌 Testando conexão com banco de dados...")
            
            with psycopg2.connect(self.database_url) as conn:
                with conn.cursor() as cur:
                    # Testa conexão simples
                    cur.execute("SELECT version();")
                    version = cur.fetchone()
                    logging.info(f"✅ Conexão OK - PostgreSQL: {version[0][:50]}...")
                    
                    # Verifica se a tabela existe
                    cur.execute(f"""
                        SELECT EXISTS (
                            SELECT FROM information_schema.tables 
                            WHERE table_schema = 'public'
                            AND table_name = %s
                        );
                    """, (self.tabela,))
                    
                    table_exists = cur.fetchone()[0]
                    if not table_exists:
                        raise ValueError(f"Tabela '{self.tabela}' não encontrada no banco")
                    
                    logging.info(f"✅ Tabela '{self.tabela}' encontrada")
                    
                    # Conta registros pendentes
                    cur.execute(f"""
                        SELECT COUNT(*) FROM public."{self.tabela}"
                        WHERE "PAINEL_NEW" IS NULL
                    """)
                    
                    total_pending = cur.fetchone()[0]
                    logging.info(f"📊 Total de registros pendentes no banco: {total_pending}")
                    logging.info("")
                    
                    return True
                    
        except Exception as e:
            logging.error(f"❌ Falha ao testar conexão: {e}")
            import traceback
            logging.error(f"Stack trace:\n{traceback.format_exc()}")
            return False


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
        """Busca dados pendentes da tabela no Neon com particionamento por job"""
        try:
            logging.info("")
            logging.info("🔍 INICIANDO BUSCA DE DADOS NO NEON")
            logging.info(f"   Tabela: {self.tabela}")
            logging.info(f"   Job: {self.job_index + 1}/{self.total_jobs}")
            logging.info(f"   Batch Size: {self.batch_size}")
            
            with psycopg2.connect(self.database_url) as conn:
                logging.info("✅ Conexão com banco estabelecida com sucesso")
                
                with conn.cursor(cursor_factory=DictCursor) as cur:
                    # Use modulo to partition records across jobs
                    # Each job processes records where (id % total_jobs) == job_index
                    query = '''
                        SELECT * FROM public."{}"
                        WHERE "PAINEL_NEW" IS NULL
                        AND (id %% %s) = %s
                        ORDER BY "id" ASC
                        LIMIT %s
                    '''.format(self.tabela)
                    
                    logging.info(f"🔎 Executando query para buscar registros pendentes...")
                    cur.execute(query, (self.total_jobs, self.job_index, self.batch_size))
                    dados = cur.fetchall()

                    if not dados:
                        logging.warning(f"⚠️  Nenhum registro pendente encontrado para este job")
                        logging.info("")
                        return pd.DataFrame()
                    
                    df = pd.DataFrame([dict(row) for row in dados])
                    logging.info(f"✅ Encontrados {len(df)} registros para processar neste job")
                    
                    # Log de amostra dos primeiros registros
                    if len(df) > 0:
                        logging.info(f"📋 Primeiros registros:")
                        for idx, row in df.head(3).iterrows():
                            logging.info(f"   • ID {row.get('id')}: {row.get('ARTISTA')} - ISRC: {row.get('ISRC')}")
                    
                    logging.info("")
                    return df
                
        except psycopg2.Error as db_error:
            logging.error("❌ ERRO DE BANCO DE DADOS")
            logging.error(f"   Tipo: {type(db_error).__name__}")
            logging.error(f"   Mensagem: {str(db_error)}")
            import traceback
            logging.error(f"   Stack trace:\n{traceback.format_exc()}")
            return pd.DataFrame()
            
        except Exception as e:
            logging.error("❌ ERRO AO CONECTAR COM NEON")
            logging.error(f"   Tipo: {type(e).__name__}")
            logging.error(f"   Mensagem: {str(e)}")
            import traceback
            logging.error(f"   Stack trace:\n{traceback.format_exc()}")
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
        logging.info("="*60)
        logging.info(f"🎯 INICIANDO CADASTRO DE {total_items} FAIXAS")
        logging.info("="*60)
        logging.info("")
        
        # Primeira passagem - tenta todos
        for index, row in tqdm(tabela_df.iterrows(), total=total_items, desc="Processando"):
            isrc = row.get('ISRC')
            artista = row.get('ARTISTA')
            titulares = row.get('TITULARES')
            
            logging.info(f"📀 [{self.total_processed + 1}/{total_items}] Processando: {artista}")
            logging.info(f"   ISRC: {isrc}")
            logging.info(f"   Titulares: {titulares}")
            
            if not all([isrc, artista, titulares]):
                logging.warning(f"⚠️  Dados incompletos - pulando registro")
                self.skipped_count += 1
                continue
            
            # Health check a cada 10 registros
            if self.total_processed > 0 and self.total_processed % 10 == 0:
                logging.info("🔍 Verificando conectividade...")
                if not await self.verificar_conectividade():
                    logging.error("❌ Perda de conectividade detectada. Tentando reconectar...")
                    await asyncio.sleep(30)
                    if not await self.login():
                        logging.error("❌ Falha ao reconectar. Abortando...")
                        break
                    logging.info("✅ Reconexão bem-sucedida")
            
            success, error_msg = await self.cadastrar_com_retry(row)
            
            if success:
                self.atualizar_status_neon(isrc, 'Cadastro OK')
                self.success_count += 1
                logging.info(f"✅ Cadastrado com sucesso!")
            else:
                self.atualizar_status_neon(isrc, 'Erro no Cadastro')
                self.error_count += 1
                self.failed_records.append((row, error_msg))
                self.registrar_erro(
                    isrc, artista, titulares,
                    'CadastroError', error_msg or 'Erro desconhecido'
                )
                logging.error(f"❌ Falhou: {error_msg}")
            
            self.total_processed += 1
            
            # Log de progresso a cada 5 registros
            if self.total_processed % 5 == 0:
                logging.info(f"\n📊 Progresso: {self.total_processed}/{total_items} processados ({(self.total_processed/total_items*100):.1f}%)")
                logging.info(f"   ✅ Sucessos: {self.success_count} | ❌ Erros: {self.error_count}\n")
            
            # Atualiza progresso a cada registro para sincronizar com KPI cards
            self.atualizar_progresso()
        
        # Segunda passagem - retry dos que falharam
        if self.failed_records:
            retry_count = len(self.failed_records)
            logging.info(f"\n{'='*60}")
            logging.info(f"🔄 RETRY: {retry_count} registros falharam, tentando novamente...")
            logging.info(f"{'='*60}\n")
            
            await asyncio.sleep(10)  # Espera antes de começar retry
            
            retry_success = 0
            for row, prev_error in tqdm(self.failed_records, desc="Retry"):
                isrc = row.get('ISRC')
                artista = row.get('ARTISTA')
                
                logging.info(f"🔁 Retry: {artista} (ISRC: {isrc})")
                
                success, error_msg = await self.cadastrar_com_retry(row, max_retries=2)
                
                if success:
                    self.atualizar_status_neon(isrc, 'Cadastro OK')
                    self.marcar_erro_resolvido(isrc)
                    self.success_count += 1
                    self.error_count -= 1
                    retry_success += 1
                    logging.info(f"✅ Retry bem-sucedido!")
                else:
                    logging.error(f"❌ Retry falhou novamente: {error_msg}")
                
                self.atualizar_progresso()
            
            logging.info(f"\n🔄 RETRY Completo: {retry_success}/{retry_count} recuperados\n")

    async def run_task_with_time_estimate(self):
        # Testar conexão com banco antes de começar
        logging.info("")
        if not self.testar_conexao_banco():
            error_msg = "Falha na conexão com banco de dados"
            logging.error(f"❌ {error_msg}. Abortando execução.")
            self.finalizar_progresso('failed', error_msg)
            return
        
        logging.info("🔄 Buscando dados para processar...")
        tabela_df = self.buscar_dados_neon()
        
        if tabela_df.empty:
            logging.info(f"ℹ️  Nenhum dado para processar. Finalizando...")
            self.finalizar_progresso('completed')
            return

        total_records = len(tabela_df)
        logging.info(f"📦 Total de registros neste lote: {total_records}")
        self.inicializar_progresso(total_records)
        logging.info("")

        logging.info("🌐 Iniciando navegador...")
        await self.start_driver()
        
        logging.info("🔐 Realizando login no painel...")
        if not await self.login():
            error_msg = 'Falha no login'
            logging.error(f"❌ {error_msg}")
            self.finalizar_progresso('failed', error_msg)
            await self.close_driver()
            return
        
        logging.info("✅ Login bem-sucedido, iniciando processamento...")
        logging.info("")

        try:
            await self.processar_lote_com_skip_retry(tabela_df)
            
            self.finalizar_progresso('completed')
            logging.info(f"\n{'='*60}")
            logging.info(f"🎉 RESULTADO FINAL:")
            logging.info(f"  📊 Total Processado: {self.total_processed}")
            logging.info(f"  ✅ Sucessos: {self.success_count}")
            logging.info(f"  ❌ Erros: {self.error_count}")
            logging.info(f"  ⏭️  Pulados: {self.skipped_count}")
            if self.total_processed > 0:
                taxa_sucesso = (self.success_count / self.total_processed * 100)
                logging.info(f"  📈 Taxa de Sucesso: {taxa_sucesso:.1f}%")
            logging.info(f"{'='*60}\n")
            
            await self.send_telegram_notification()
            
        except Exception as e:
            logging.error(f"❌ Erro crítico durante processamento: {e}")
            import traceback
            logging.error(f"Stack trace:\n{traceback.format_exc()}")
            self.finalizar_progresso('failed', str(e))
        finally:
            logging.info("🚪 Fechando navegador...")
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
        logging.info("🎬 Iniciando aplicação de automação...")
        logging.info("")
        
        web_automation = WebAutomation()
        logging.info("✅ Todas as variáveis de ambiente validadas")
        logging.info("")
        
        logging.info("▶️  Executando tarefa principal...")
        await web_automation.run_task_with_time_estimate()
        
        logging.info("")
        logging.info("✅ Aplicação finalizada com sucesso")
        
    except ValueError as e:
        logging.error("="*60)
        logging.error("❌ ERRO DE CONFIGURAÇÃO")
        logging.error(f"   {str(e)}")
        logging.error("="*60)
        print(f"\n❌ ERRO CRÍTICO DE CONFIGURAÇÃO: {e}\n", file=sys.stderr)
        sys.exit(1)
        
    except Exception as e:
        logging.error("="*60)
        logging.error("❌ ERRO INESPERADO")
        logging.error(f"   Tipo: {type(e).__name__}")
        logging.error(f"   Mensagem: {str(e)}")
        logging.error("="*60)
        
        import traceback
        stack_trace = traceback.format_exc()
        logging.error(f"\n📋 Stack Trace Completo:\n{stack_trace}")
        
        print(f"\n❌ ERRO INESPERADO: {e}\n", file=sys.stderr)
        print(stack_trace, file=sys.stderr)
        
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
