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

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let client: Client | null = null;

    try {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration missing' });
        }

        const { isrcs } = req.body;

        if (!isrcs || !Array.isArray(isrcs) || isrcs.length === 0) {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'isrcs array is required and must not be empty'
            });
        }

        client = new Client({ connectionString: databaseUrl });
        await client.connect();

        // Mark ISRCs for retry
        const placeholders = isrcs.map((_, i) => `$${i + 1}`).join(', ');

        const result = await client.query(
            `UPDATE public.automation_errors
       SET should_retry = TRUE,
           retry_count = 0,
           resolved = FALSE
       WHERE isrc IN (${placeholders})
       AND retry_count < max_retries
       RETURNING isrc`,
            isrcs
        );

        const updatedCount = result.rows.length;

        // Also reset PAINEL_NEW to NULL for these ISRCs so they can be reprocessed
        await client.query(
            `UPDATE public.cadastros
       SET "PAINEL_NEW" = NULL
       WHERE "ISRC" IN (${placeholders})`,
            isrcs
        );

        return res.status(200).json({
            success: true,
            message: `${updatedCount} ISRC(s) marcados para retry`,
            updated_isrcs: result.rows.map(row => row.isrc),
            requested_count: isrcs.length,
            updated_count: updatedCount
        });

    } catch (error) {
        console.error('Error marking ISRCs for retry:', error);
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
