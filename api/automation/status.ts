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

    client = new Client({ connectionString: databaseUrl });
    await client.connect();

    // Get total de cadastros
    const totalResult = await client.query(
      `SELECT COUNT(*) as total FROM public."${tabela}"`
    );
    const total = parseInt(totalResult.rows[0].total, 10);

    // Get cadastros concluídos (PAINEL_NEW = 'Cadastro OK')
    const completedResult = await client.query(
      `SELECT COUNT(*) as completed FROM public."${tabela}" WHERE "PAINEL_NEW" = 'Cadastro OK'`
    );
    const completed = parseInt(completedResult.rows[0].completed, 10);

    // Get cadastros restantes (PAINEL_NEW IS NULL)
    const remainingResult = await client.query(
      `SELECT COUNT(*) as remaining FROM public."${tabela}" WHERE "PAINEL_NEW" IS NULL`
    );
    const remaining = parseInt(remainingResult.rows[0].remaining, 10);

    // Get erros (PAINEL_NEW = 'Erro no Cadastro')
    const errorsResult = await client.query(
      `SELECT COUNT(*) as errors FROM public."${tabela}" WHERE "PAINEL_NEW" = 'Erro no Cadastro'`
    );
    const errors = parseInt(errorsResult.rows[0].errors, 10);

    // Check if automation is running
    const automationResult = await client.query(
      `SELECT run_id, status, processed_records, total_records, success_count, error_count, started_at, updated_at
       FROM public.automation_progress 
       WHERE is_complete = FALSE 
       ORDER BY started_at DESC 
       LIMIT 1`
    );

    const isRunning = automationResult.rows.length > 0;
    const automationData = isRunning ? automationResult.rows[0] : null;

    // Get recent errors count (last 24 hours)
    const recentErrorsResult = await client.query(
      `SELECT COUNT(*) as recent_errors 
       FROM public.automation_errors 
       WHERE created_at > NOW() - INTERVAL '24 hours' 
       AND resolved = FALSE`
    );
    const recentErrors = parseInt(recentErrorsResult.rows[0].recent_errors, 10);

    return res.status(200).json({
      success: true,
      total_cadastros: total,
      cadastrados: completed,
      restantes: remaining,
      errors: errors,
      is_running: isRunning,
      run_id: automationData?.run_id || null,
      automation_progress: automationData ? {
        processed: parseInt(automationData.processed_records, 10),
        total: parseInt(automationData.total_records, 10),
        success: parseInt(automationData.success_count, 10),
        errors: parseInt(automationData.error_count, 10),
        status: automationData.status,
        started_at: automationData.started_at,
        last_update: automationData.updated_at
      } : null,
      connectivity_status: 'online', // TODO: Implement real connectivity check
      recent_errors: recentErrors
    });

  } catch (error) {
    console.error('Error fetching automation status:', error);
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
