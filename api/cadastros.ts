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

        const {
            limit = '50',
            offset = '0',
            search = '',
            order_by = '',
            order_dir = 'ASC'
        } = req.query;

        client = new Client({ connectionString: databaseUrl });
        await client.connect();

        // Get table columns
        const columnsResult = await client.query(
            `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_schema = 'public' AND table_name = $1
       ORDER BY ordinal_position`,
            [tabela]
        );

        const columns = columnsResult.rows.map(row => row.column_name);

        if (columns.length === 0) {
            return res.status(404).json({
                error: 'Table not found or has no columns',
                table: tabela
            });
        }

        // Build search condition
        let whereClause = '';
        const params: any[] = [];

        if (search && typeof search === 'string' && search.trim()) {
            const searchConditions = columns.map((col, idx) => {
                params.push(`%${search.trim()}%`);
                return `LOWER(CAST("${col}" AS TEXT)) LIKE LOWER($${params.length})`;
            });
            whereClause = `WHERE ${searchConditions.join(' OR ')}`;
        }

        // Build ORDER BY clause
        let orderClause = '';
        if (order_by && typeof order_by === 'string' && columns.includes(order_by)) {
            const direction = order_dir === 'DESC' ? 'DESC' : 'ASC';
            orderClause = `ORDER BY "${order_by}" ${direction}`;
        }

        // Get total count
        const countQuery = `SELECT COUNT(*) FROM public."${tabela}" ${whereClause}`;
        const countResult = await client.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count, 10);

        // Get paginated data
        const limitNum = parseInt(limit as string, 10);
        const offsetNum = parseInt(offset as string, 10);

        const quotedColumns = columns.map(col => `"${col}"`).join(', ');
        const dataQuery = `
      SELECT ${quotedColumns}
      FROM public."${tabela}"
      ${whereClause}
      ${orderClause}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
        params.push(limitNum, offsetNum);

        const dataResult = await client.query(dataQuery, params);

        return res.status(200).json({
            success: true,
            data: dataResult.rows,
            columns,
            total,
            limit: limitNum,
            offset: offsetNum,
            hasNext: offsetNum + limitNum < total,
            hasPrev: offsetNum > 0
        });

    } catch (error) {
        console.error('Error fetching cadastros:', error);
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
