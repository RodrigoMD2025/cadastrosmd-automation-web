import pandas as pd
import psycopg2
import logging
import os
from tqdm import tqdm

# Configurações das variáveis de ambiente (GitHub Actions)
DATABASE_URL = os.getenv('DATABASE_URL')
TABELA = os.getenv('TABELA', 'cadastros')
UPLOAD_MODE = os.getenv('UPLOAD_MODE', 'append')  # 'append' ou 'overwrite'
UPLOAD_ID = os.getenv('UPLOAD_ID', '')  # ID único do upload
FILE_NAME = os.getenv('FILE_NAME', 'Emitir.xlsx')  # Nome original do arquivo
PLANILHA = 'Emitir.xlsx'  # Nome fixo no GitHub Actions

# Validação
if not DATABASE_URL:
    raise ValueError("DATABASE_URL não definida nos secrets do GitHub")

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("upload_neon.log"),
        logging.StreamHandler()
    ]
)

def verificar_conexao_neon():
    """Verifica a conexão com o Neon"""
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            logging.info("✅ Conexão com Neon estabelecida")
        return True
    except Exception as e:
        logging.error(f"❌ Erro ao conectar: {e}")
        return False

def limpar_tabela():
    """Limpa a tabela antes do upload"""
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                logging.info(f"🗑️ Limpando tabela {TABELA}...")
                cur.execute(f'DELETE FROM public.{TABELA}')
                conn.commit()
                logging.info("✅ Tabela limpa")
    except Exception as e:
        logging.error(f"❌ Erro ao limpar tabela: {e}")
        raise

def init_progress(total_records):
    """Inicializa o registro de progresso no banco"""
    if not UPLOAD_ID:
        logging.warning("⚠️ UPLOAD_ID não fornecido, progresso não será rastreado")
        return
    
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO upload_progress 
                    (upload_id, file_name, total_records, status, upload_mode, started_at)
                    VALUES (%s, %s, %s, 'processing', %s, NOW())
                    ON CONFLICT (upload_id) 
                    DO UPDATE SET 
                        total_records = EXCLUDED.total_records,
                        status = 'processing',
                        started_at = NOW()
                """, (UPLOAD_ID, FILE_NAME, total_records, UPLOAD_MODE))
                conn.commit()
                logging.info(f"📊 Progresso inicializado: {total_records} registros")
    except Exception as e:
        logging.warning(f"⚠️ Erro ao inicializar progresso: {e}")

def update_progress(processed, success, errors):
    """Atualiza o progresso no banco"""
    if not UPLOAD_ID:
        return
    
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE upload_progress 
                    SET processed_records = %s,
                        success_count = %s,
                        error_count = %s,
                        updated_at = NOW()
                    WHERE upload_id = %s
                """, (processed, success, errors, UPLOAD_ID))
                conn.commit()
    except Exception as e:
        logging.warning(f"⚠️ Erro ao atualizar progresso: {e}")

def finalize_progress(status, error_message=None):
    """Finaliza o registro de progresso"""
    if not UPLOAD_ID:
        return
    
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                if error_message:
                    cur.execute("""
                        UPDATE upload_progress 
                        SET status = %s,
                            error_message = %s,
                            completed_at = NOW(),
                            updated_at = NOW()
                        WHERE upload_id = %s
                    """, (status, error_message, UPLOAD_ID))
                else:
                    cur.execute("""
                        UPDATE upload_progress 
                        SET status = %s,
                            completed_at = NOW(),
                            updated_at = NOW()
                        WHERE upload_id = %s
                    """, (status, UPLOAD_ID))
                conn.commit()
                logging.info(f"✅ Progresso finalizado com status: {status}")
    except Exception as e:
        logging.warning(f"⚠️ Erro ao finalizar progresso: {e}")

def upload_planilha():
    """Upload da planilha para o Neon"""
    try:
        # Ler Excel
        df = pd.read_excel(PLANILHA)
        total_records = len(df)
        logging.info(f"📊 Lidas {total_records} linhas do Excel")
        
        # Inicializar progresso
        init_progress(total_records)
        
        # Normalizar colunas
        df.columns = [col.upper().strip() for col in df.columns]
        logging.info(f"Colunas: {list(df.columns)}")
        
        sucessos = 0
        erros = 0

        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                with tqdm(total=total_records, desc="Importando") as pbar:
                    for index, row in df.iterrows():
                        dados = row.dropna().to_dict()
                        dados_limpos = {f'"{key}"': value for key, value in dados.items()}

                        cols = ', '.join(dados_limpos.keys())
                        vals = ', '.join(['%s'] * len(dados_limpos))
                        query = f"INSERT INTO public.{TABELA} ({cols}) VALUES ({vals})"
                        
                        try:
                            cur.execute(query, list(dados_limpos.values()))
                            conn.commit()
                            sucessos += 1
                            pbar.set_postfix({"✅": sucessos, "❌": erros})
                        except Exception as e:
                            conn.rollback()
                            erros += 1
                            logging.warning(f"Erro linha {index + 1}: {e}")
                            pbar.set_postfix({"✅": sucessos, "❌": erros})
                        
                        # Atualizar progresso a cada 10 registros ou no último
                        if (index + 1) % 10 == 0 or (index + 1) == total_records:
                            update_progress(index + 1, sucessos, erros)
                        
                        pbar.update(1)
        
        logging.info(f"✅ Importação concluída: {sucessos} sucessos, {erros} erros")
        return sucessos, erros
                
    except FileNotFoundError:
        logging.error(f"❌ Arquivo {PLANILHA} não encontrado")
        raise
    except Exception as e:
        logging.error(f"❌ Erro no upload: {e}")
        raise

if __name__ == "__main__":
    try:
        logging.info("🚀 Iniciando upload para Neon...")
        logging.info(f"📋 Modo de importação: {UPLOAD_MODE}")
        logging.info(f"🆔 Upload ID: {UPLOAD_ID}")
        
        if not verificar_conexao_neon():
            finalize_progress('failed', 'Falha ao conectar ao banco de dados')
            exit(1)
        
        # Só limpa a tabela se o modo for 'overwrite'
        if UPLOAD_MODE == 'overwrite':
            logging.info("🗑️ Modo OVERWRITE - Limpando tabela antes de importar")
            limpar_tabela()
        else:
            logging.info("➕ Modo APPEND - Adicionando dados sem apagar registros existentes")
        
        sucessos, erros = upload_planilha()
        
        if erros > 0:
            logging.warning(f"⚠️ Concluído com {erros} erros")
            finalize_progress('completed', f'Concluído com {erros} erros')
            exit(1)
        else:
            logging.info("✅ Upload 100% concluído")
            finalize_progress('completed')
        
    except Exception as e:
        logging.error(f"❌ Erro fatal: {e}")
        finalize_progress('failed', str(e))
        exit(1)
