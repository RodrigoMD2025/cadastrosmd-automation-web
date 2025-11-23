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
        const { limit = '50', offset = '0', run_id, unresolved_only = 'true' } = req.query;

        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration missing' });
        }

        client = new Client({ connectionString: databaseUrl });
        await client.connect();

        // Build WHERE clause
        const conditions: string[] = [];
        const params: any[] = [];
        let paramCount = 0;

        if (run_id && typeof run_id === 'string') {
            paramCount++;
            conditions.push(`run_id = $${paramCount}`);
            params.push(run_id);
        }

        if (unresolved_only === 'true') {
            conditions.push('resolved = FALSE');
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // Get total count
        const countQuery = `SELECT COUNT(*) FROM public.automation_errors ${whereClause}`;
        const countResult = await client.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count, 10);

        // Get paginated errors
        const limitNum = parseInt(limit as string, 10);
        const offsetNum = parseInt(offset as string, 10);

        const dataQuery = `
      SELECT 
        id,
        run_id,
        isrc,
        artista,
        titulares,
        error_type,
        error_message,
        retry_count,
        max_retries,
        should_retry,
        created_at,
        retried_at,
        resolved
      FROM public.automation_errors
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
        params.push(limitNum, offsetNum);

        const dataResult = await client.query(dataQuery, params);

        return res.status(200).json({
            success: true,
            errors: dataResult.rows.map(row => ({
                id: row.id,
                run_id: row.run_id,
                isrc: row.isrc,
                artista: row.artista,
                titulares: row.titulares,
                error_type: row.error_type,
                error_message: row.error_message,
                retry_count: row.retry_count,
                max_retries: row.max_retries,
                should_retry: row.should_retry,
                created_at: row.created_at,
                retried_at: row.retried_at,
                resolved: row.resolved
            })),
            total,
            limit: limitNum,
            offset: offsetNum,
            hasNext: offsetNum + limitNum < total,
            hasPrev: offsetNum > 0
        });

    } catch (error) {
        console.error('Error fetching automation errors:', error);
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
