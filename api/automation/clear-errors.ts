import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    const origin = req.headers.origin || '';
    const allowedOrigins = [
        'https://rodrigomd2025.github.io',
        'http://localhost:8080',
        'http://localhost:8081',
    ];

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://rodrigomd2025.github.io');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        // Marca todos os erros antigos como resolved
        const clearResult = await client.query(`
      UPDATE public.automation_errors
      SET resolved = TRUE
      WHERE resolved = FALSE
    `);

        await client.end();

        return res.status(200).json({
            success: true,
            message: 'Erros antigos limpos com sucesso',
            cleared_count: clearResult.rowCount || 0
        });

    } catch (error) {
        console.error('Erro ao limpar erros:', error);
        await client.end();
        return res.status(500).json({
            success: false,
            error: (error as Error).message
        });
    }
}
