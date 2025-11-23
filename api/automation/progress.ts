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
        const { run_id } = req.query;

        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration missing' });
        }

        if (!run_id || typeof run_id !== 'string') {
            return res.status(400).json({ error: 'run_id is required' });
        }

        client = new Client({ connectionString: databaseUrl });
        await client.connect();

        // Get progress data
        const result = await client.query(
            `SELECT 
        run_id,
        status,
        total_records,
        processed_records,
        success_count,
        error_count,
        skipped_count,
        started_at,
        updated_at,
        completed_at,
        is_complete,
        error_message
       FROM public.automation_progress 
       WHERE run_id = $1`,
            [run_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Progress not found',
                run_id
            });
        }

        const data = result.rows[0];
        const percentage = data.total_records > 0
            ? Math.round((data.processed_records / data.total_records) * 100)
            : 0;

        return res.status(200).json({
            success: true,
            run_id: data.run_id,
            status: data.status,
            total_records: parseInt(data.total_records, 10),
            processed_records: parseInt(data.processed_records, 10),
            success_count: parseInt(data.success_count, 10),
            error_count: parseInt(data.error_count, 10),
            skipped_count: parseInt(data.skipped_count, 10),
            percentage,
            started_at: data.started_at,
            updated_at: data.updated_at,
            completed_at: data.completed_at,
            is_complete: data.is_complete,
            error_message: data.error_message
        });

    } catch (error) {
        console.error('Error fetching automation progress:', error);
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
