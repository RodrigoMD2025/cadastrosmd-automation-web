import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';

// Mesmas regras de escala do api/automation/start.ts
function getNumJobs(totalRecords: number): number {
  let numJobs = 1;
  if (totalRecords > 400) numJobs = 5;
  else if (totalRecords > 300) numJobs = 4;
  else if (totalRecords > 200) numJobs = 3;
  else if (totalRecords > 100) numJobs = 2;
  return numJobs;
}

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

    // Modo timeline: retorna o histórico diário de cadastros concluídos
    if (req.query.view === 'timeline') {
      // Janela dinâmica: do primeiro cadastro até hoje (ou um limite opcional via ?days=)
      const rangeResult = await client.query(
        `SELECT MIN("CADASTRADO")::date AS first_date, MAX("CADASTRADO")::date AS last_date
         FROM public."${tabela}"
         WHERE "CADASTRADO" IS NOT NULL`
      );
      const firstDate = rangeResult.rows[0]?.first_date;
      const lastDate = rangeResult.rows[0]?.last_date || new Date();

      let startDate: string;
      if (firstDate) {
        const span = (new Date(lastDate).getTime() - new Date(firstDate).getTime()) / 86400000;
        startDate = firstDate;
        const explicitDays = parseInt(String(req.query.days || ''), 10);
        const cap = 180; // limite de segurança de pontos no gráfico
        if (explicitDays > 0) {
          // janela fixa: últimos N dias
          startDate = new Date(new Date(lastDate).getTime() - explicitDays * 86400000).toISOString().slice(0, 10);
        } else if (span > cap) {
          // se o histórico for muito antigo, restringe aos cap dias mais recentes
          startDate = new Date(new Date(lastDate).getTime() - cap * 86400000).toISOString().slice(0, 10);
        }
      } else {
        startDate = new Date().toISOString().slice(0, 10);
      }

      const timelineResult = await client.query(
        `WITH RECURSIVE days AS (
           SELECT generate_series(
             $1::date,
             COALESCE($2::date, CURRENT_DATE),
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
        [startDate, lastDate]
      );

      const timeline = timelineResult.rows.map(row => ({
        date: row.date,
        total: parseInt(row.total, 10)
      }));

      return res.status(200).json({
        success: true,
        data: timeline
      });
    }

    return res.status(200).json({
      success: true,
      total_cadastros: total,
      cadastrados: completed,
      restantes: remaining,
      errors: errors,
      is_running: isRunning,
      num_machines: automationData
        ? getNumJobs(parseInt(automationData.total_records, 10))
        : getNumJobs(remaining),
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
