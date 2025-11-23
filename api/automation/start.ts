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
        const githubToken = process.env.GITHUB_TOKEN;
        const githubRepo = process.env.GITHUB_REPO || 'RodrigoMD2025/cadastrosmd-automation-web';

        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration missing' });
        }

        const { batch_size = 150 } = req.body;

        // Generate run_id
        const runId = `auto-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        client = new Client({ connectionString: databaseUrl });
        await client.connect();

        // Check if there's already a running automation
        const checkRunning = await client.query(
            `SELECT run_id FROM public.automation_progress WHERE is_complete = FALSE`
        );

        if (checkRunning.rows.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'Automation already running',
                run_id: checkRunning.rows[0].run_id
            });
        }

        // Get total records to process
        const totalResult = await client.query(
            `SELECT COUNT(*) as total FROM public.cadastros WHERE "PAINEL_NEW" IS NULL`
        );
        const totalRecords = parseInt(totalResult.rows[0].total, 10);

        if (totalRecords === 0) {
            return res.status(400).json({
                success: false,
                error: 'No records to process',
                message: 'All records are already processed'
            });
        }

        // Create automation_progress record
        await client.query(
            `INSERT INTO public.automation_progress 
       (run_id, status, total_records, processed_records, success_count, error_count, is_complete) 
       VALUES ($1, 'pending', $2, 0, 0, 0, FALSE)`,
            [runId, totalRecords]
        );

        // Trigger GitHub Actions workflow
        let workflowRunId = null;

        if (githubToken) {
            try {
                const workflowResponse = await fetch(
                    `https://api.github.com/repos/${githubRepo}/actions/workflows/automacao-cadastros.yml/dispatches`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${githubToken}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ref: 'main',
                            inputs: {
                                run_id: runId,
                                batch_size: batch_size.toString()
                            }
                        })
                    }
                );

                if (workflowResponse.ok) {
                    workflowRunId = 'triggered';
                } else {
                    console.error('Failed to trigger workflow:', await workflowResponse.text());
                }
            } catch (error) {
                console.error('Error triggering GitHub Actions:', error);
            }
        }

        return res.status(200).json({
            success: true,
            run_id: runId,
            total_records: totalRecords,
            batch_size,
            message: 'Automação iniciada com sucesso',
            workflow_triggered: !!workflowRunId,
            workflow_run_id: workflowRunId
        });

    } catch (error) {
        console.error('Error starting automation:', error);
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
