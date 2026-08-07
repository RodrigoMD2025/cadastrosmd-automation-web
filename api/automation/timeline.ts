import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://rodrigomd2025.github.io',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081'
  ];

  if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://rodrigomd2025.github.io');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  let client: Client | null = null;

  try {
    const databaseUrl = process.env.DATABASE_URL;
    const tabela = process.env.TABELA || 'cadastros';

    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    const days = parseInt(String(req.query.days || '14'), 10);
    const numDays = Number.isFinite(days) && days > 0 && days <= 90 ? days : 14;

    client = new Client({ connectionString: databaseUrl });
    await client.connect();

    // Agrupa cadastros concluídos por dia (últimos N dias), incluindo dias sem registro
    const result = await client.query(
      `WITH RECURSIVE days AS (
         SELECT generate_series(
           CURRENT_DATE - ($1::int - 1),
           CURRENT_DATE,
           interval '1 day'
         )::date AS day
       )
       SELECT
         to_char(d.day, 'YYYY-MM-DD') AS date,
         COALESCE(COUNT(c."CADASTRADO"), 0) AS total
       FROM days d
       LEFT JOIN public."${tabela}" c
         ON c."CADASTRADO"::date = d.day
        AND c."PAINEL_NEW" = 'Cadastro OK'
       GROUP BY d.day
       ORDER BY d.day ASC`,
      [numDays]
    );

    const timeline = result.rows.map(row => ({
      date: row.date,
      total: parseInt(row.total, 10)
    }));

    return res.status(200).json({
      success: true,
      days: numDays,
      data: timeline
    });

  } catch (error) {
    console.error('Error fetching timeline:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: (error as Error).message
    });
  } finally {
    if (client) {
      await client.end();
    }
  }
}