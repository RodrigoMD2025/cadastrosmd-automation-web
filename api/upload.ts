import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import busboy from 'busboy'; // ✅ import correto (não require)

export const config = {
  api: {
    bodyParser: false, // necessário para multipart/form-data
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS seguro - permite produção e desenvolvimento local
  res.setHeader('Access-Control-Allow-Origin', 'https://rodrigomd2025.github.io');
  if (req.headers.origin && (req.headers.origin.startsWith('http://localhost:') || req.headers.origin.startsWith('http://127.0.0.1:'))) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Verifica se há headers necessários
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
    }

    const bb = busboy({ headers: req.headers });
    
    let fileBuffer: Buffer;
    let fileName = '';
    let fileSize = 0;

    await new Promise<void>((resolve, reject) => {
      bb.on('file', (_name, file, info) => {
        fileName = info.filename;
        const chunks: Buffer[] = [];
        
        file.on('data', (data) => chunks.push(data));
        file.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
          fileSize = fileBuffer.length;
        });
      });

      bb.on('finish', resolve);
      bb.on('error', reject);
      
      req.pipe(bb);
    });

    // Validações
    if (!fileName) return res.status(400).json({ error: 'No file uploaded' });
    
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      return res.status(400).json({ error: 'Only Excel files allowed' });
    }

    if (fileSize > 25 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Max 25MB' });
    }

    // Gera nome único
    const uploadId = `excel-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const blobName = `${uploadId}.xlsx`;

    // Upload para Vercel Blob
    const blob = await put(blobName, fileBuffer!, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('✅ Blob criado:', blob.url);

    // Dispara GitHub Actions
    const githubRepo = 'RodrigoMD2025/cadastrosmd-automation-web';
    const githubToken = process.env.GITHUB_TOKEN!;

    const githubResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/actions/workflows/processar-excel.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            blob_url: blob.url,
            upload_id: uploadId,
            file_name: fileName,
          },
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      throw new Error(`GitHub API error: ${errorText}`);
    }

    return res.status(200).json({
      success: true,
      uploadId,
      blobUrl: blob.url,
      fileName,
      size: fileSize,
      message: 'Upload complete and workflow started.',
      githubActionsUrl: `https://github.com/${githubRepo}/actions`,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
}