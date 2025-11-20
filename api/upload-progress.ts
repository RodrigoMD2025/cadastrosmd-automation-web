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

  const { upload_id } = req.query;

  if (!upload_id || typeof upload_id !== 'string') {
    return res.status(400).json({ error: 'upload_id is required' });
  }

  let client: Client | null = null;

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    client = new Client({ connectionString: databaseUrl });
    await client.connect();

    const result = await client.query(
      `SELECT 
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
        error_message
      FROM upload_progress 
      WHERE upload_id = $1`,
      [upload_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Upload not found',
        upload_id 
      });
    }

    const progress = result.rows[0];
    
    // Calculate percentage
    const percentage = progress.total_records > 0 
      ? Math.round((progress.processed_records / progress.total_records) * 100) 
      : 0;

    return res.status(200).json({
      success: true,
      upload_id: progress.upload_id,
      file_name: progress.file_name,
      total_records: progress.total_records,
      processed_records: progress.processed_records,
      success_count: progress.success_count,
      error_count: progress.error_count,
      status: progress.status,
      upload_mode: progress.upload_mode,
      percentage,
      started_at: progress.started_at,
      updated_at: progress.updated_at,
      completed_at: progress.completed_at,
      error_message: progress.error_message,
      is_complete: progress.status === 'completed' || progress.status === 'failed'
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch progress',
      message: (error as Error).message 
    });
  } finally {
    if (client) {
      await client.end();
    }
  }
}
