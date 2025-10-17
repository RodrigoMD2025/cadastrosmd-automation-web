import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

// Função para lidar com cabeçalhos CORS e pre-flight requests
const allowCors = (fn: (req: VercelRequest, res: VercelResponse) => Promise<void>) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // A origem do seu frontend no GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://rodrigomd2025.github.io');
  // Permitir localhost para desenvolvimento
  if (req.headers.origin && new URL(req.headers.origin).hostname === 'localhost') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // As variáveis de ambiente DATABASE_URL e TABELA devem estar configuradas na Vercel
  const connectionString = process.env.DATABASE_URL;
  const tabela = process.env.TABELA;

  if (!connectionString || !tabela) {
    return res.status(500).json({ error: 'Database configuration is missing.' });
  }

  const pool = new Pool({
    connectionString,
  });

  try {
    // Query para o total de registros
    const totalResult = await pool.query(`SELECT COUNT(*) FROM public."${tabela}"`);
    const total = parseInt(totalResult.rows[0].count, 10) || 0;

    // Query para os registros restantes (não processados)
    const remainingResult = await pool.query(`SELECT COUNT(*) FROM public."${tabela}" WHERE "PAINEL_NEW" IS NULL`);
    const remaining = parseInt(remainingResult.rows[0].count, 10) || 0;

    const processed = total - remaining;

    // Retorna os dados em formato JSON
    res.status(200).json({ total, processed, remaining });

  } catch (error: any) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Failed to fetch progress status', details: error.message });
  } finally {
    await pool.end();
  }
};

export default allowCors(handler);
