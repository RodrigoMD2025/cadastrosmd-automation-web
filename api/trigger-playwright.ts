import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS seguro - permite produção e desenvolvimento local
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
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const githubRepo = 'RodrigoMD2025/cadastrosmd-automation-web';
    const githubToken = process.env.GITHUB_TOKEN!;

    const githubResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/actions/workflows/run-playwright.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref: 'main' }),
      }
    );

    if (!githubResponse.ok) throw new Error('Failed to trigger GitHub Actions');

    return res.status(200).json({
      success: true,
      message: 'Playwright automation triggered successfully!',
      githubActionsUrl: `https://github.com/${githubRepo}/actions`,
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
