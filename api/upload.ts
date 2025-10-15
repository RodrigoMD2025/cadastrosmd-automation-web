import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false, // Necessário para multipart/form-data
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Parser multipart/form-data manualmente
    const busboy = require('busboy');
    const bb = busboy({ headers: req.headers });

    let fileBuffer: Buffer;
    let fileName: string;
    let fileSize: number;

    await new Promise((resolve, reject) => {
      bb.on('file', (name: string, file: any, info: any) => {
        fileName = info.filename;
        const chunks: Buffer[] = [];

        file.on('data', (data: Buffer) => chunks.push(data));
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
    if (!fileName!) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      return res.status(400).json({
        error: 'Apenas arquivos Excel (.xlsx, .xls)'
      });
    }

    if (fileSize > 25 * 1024 * 1024) {
      return res.status(400).json({
        error: 'Arquivo muito grande. Máximo: 25MB'
      });
    }

    // Gera nome único
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const uploadId = `excel-${timestamp}-${random}`;
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
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            blob_url: blob.url,
            upload_id: uploadId,
            file_name: fileName!,
          },
        }),
      }
    );

    if (!githubResponse.ok) {
      const error = await githubResponse.text();
      throw new Error(`GitHub API error: ${error}`);
    }

    return res.status(200).json({
      success: true,
      uploadId,
      blobUrl: blob.url,
      fileName: fileName!,
      size: fileSize,
      message: 'Upload concluído! Processamento iniciado.',
      githubActionsUrl: `https://github.com/${githubRepo}/actions`,
    });

  } catch (error) {
    console.error('❌ Erro:', error);
    return res.status(500).json({
      error: (error as Error).message
    });
  }
}
