import os
import psycopg2
import math
import json
from dotenv import load_dotenv

# Carrega .env para testes locais
load_dotenv()

BATCH_SIZE = 150

def main():
    """
    Calcula o número de lotes necessários para processar os registros pendentes
    e imprime uma matriz JSON para o GitHub Actions.
    """
    db_url = os.getenv('DATABASE_URL')
    table_name = os.getenv('TABELA', 'cadastros')

    if not db_url:
        print("Erro: DATABASE_URL não configurada.")
        exit(1)

    try:
        with psycopg2.connect(db_url) as conn:
            with conn.cursor() as cur:
                # Conta apenas os registros que precisam ser processados
                query = f'SELECT COUNT(*) FROM public."{table_name}" WHERE "PAINEL_NEW" IS NULL'
                cur.execute(query)
                total_records = cur.fetchone()[0]

        if total_records == 0:
            print("[]") # Retorna uma matriz vazia se não há nada a processar
            return

        # Calcula o número de lotes, arredondando para cima
        num_batches = math.ceil(total_records / BATCH_SIZE)
        
        # Gera a matriz de lotes (ex: [1, 2, 3])
        batches = list(range(1, num_batches + 1))
        
        # Imprime a matriz como uma string JSON para ser capturada pelo GitHub Actions
        print(json.dumps(batches))

    except Exception as e:
        print(f"Erro ao conectar ou consultar o banco de dados: {e}")
        # Em caso de erro, retorna uma matriz vazia para não iniciar jobs
        print("[]")
        exit(1)

if __name__ == "__main__":
    main()
