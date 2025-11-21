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

  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();

  let client: Client | null = null;

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    client = new Client({ connectionString: databaseUrl });
    await client.connect();

    // GET - List all uploads
    if (req.method === 'GET') {
      const { limit = '20', offset = '0', status = 'all' } = req.query;

      let query = `
        SELECT 
          upload_id,
          file_name,
          total_records,
          processed_records,
          success_count,
          error_count,
          status,
          upload_mode,
          started_at,
          updated_at,
          completed_at,
          error_message,
          EXTRACT(EPOCH FROM (completed_at - started_at)) as duration_seconds
        FROM upload_progress
      `;

      const params: any[] = [];
      
      // Filter by status if not 'all'
      if (status !== 'all') {
        query += ' WHERE status = $1';
        params.push(status);
      }

      query += ' ORDER BY started_at DESC';
      
      // Add pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limitNum, offsetNum);

      const result = await client.query(query, params);

      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM upload_progress';
      const countParams: any[] = [];
      if (status !== 'all') {
        countQuery += ' WHERE status = $1';
        countParams.push(status);
      }
      const countResult = await client.query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count, 10);

      return res.status(200).json({
        success: true,
        data: result.rows,
        total,
        limit: limitNum,
        offset: offsetNum
      });
    }

    // DELETE - Remove upload from history
    if (req.method === 'DELETE') {
      const { upload_id } = req.query;

      if (!upload_id || typeof upload_id !== 'string') {
        return res.status(400).json({ error: 'upload_id is required' });
      }

      const result = await client.query(
        'DELETE FROM upload_progress WHERE upload_id = $1 RETURNING *',
        [upload_id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Upload not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Upload removido do histórico'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Error in upload-history:', error);
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
