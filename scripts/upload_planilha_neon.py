import pandas as pd
import psycopg2
import logging
import os
from tqdm import tqdm

# Configurações das variáveis de ambiente (GitHub Actions)
DATABASE_URL = os.getenv('DATABASE_URL')
TABELA = os.getenv('TABELA', 'cadastros')
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

def upload_planilha():
    """Upload da planilha para o Neon"""
    try:
        # Ler Excel
        df = pd.read_excel(PLANILHA)
        logging.info(f"📊 Lidas {len(df)} linhas do Excel")
        
        # Normalizar colunas
        df.columns = [col.upper().strip() for col in df.columns]
        logging.info(f"Colunas: {list(df.columns)}")
        
        sucessos = 0
        erros = 0

        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                with tqdm(total=len(df), desc="Importando") as pbar:
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
        
        if not verificar_conexao_neon():
            exit(1)
        
        # No GitHub Actions, sempre limpa a tabela
        limpar_tabela()
        
        sucessos, erros = upload_planilha()
        
        if erros > 0:
            logging.warning(f"⚠️ Concluído com {erros} erros")
            exit(1)
        else:
            logging.info("✅ Upload 100% concluído")
        
    except Exception as e:
        logging.error(f"❌ Erro fatal: {e}")
        exit(1)
