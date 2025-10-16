import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS seguro - domínio correto do GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://rodrigomd2025.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
