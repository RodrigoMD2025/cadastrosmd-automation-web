# 🚀 Definitive Solution: Vercel Blob + GitHub Actions

## 📊 Complete Flowchart

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Lovable)                           │
│                                                                     │
│  ┌──────────────┐                                                   │
│  │  User        │                                                   │
│  │  selects     │                                                   │
│  │  Excel       │                                                   │
│  └──────┬───────┘                                                   │
│         │                                                           │
│         ▼                                                           │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Upload via JavaScript (FormData)                             │   │
│  │ POST → https://YOUR_VERCEL_PROJECT_URL/api/upload            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ HTTP POST (multipart/form-data)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│              VERCEL SERVERLESS FUNCTION (Node.js)                    │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ /api/upload.ts                                                │  │
│  │ 1. Receives Excel file                                        │  │
│  │ 2. Validates type/size                                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         │ put()                                                      │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            VERCEL BLOB STORAGE                                │  │
│  │  Stores: excel-{timestamp}-{random}.xlsx                    │  │
│  │  Returns: Public file URL                                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         │ Blob URL generated                                         │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 4. Calls GitHub API (workflow_dispatch)                       │  │
│  │    - Passes Blob URL                                          │  │
│  │    - Secure Token in Vercel Env Variable                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         │ Returns JSON                                               │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Response: { success: true, blobUrl: "...", uploadId: "..." }  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ JSON Response
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Lovable)                            │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Shows message: "✅ Upload complete!"                            │  │
│  │ Link: View processing on GitHub Actions                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

                            ║
                            ║ (in parallel)
                            ▼

┌─────────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS (Ubuntu Runner)                    │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Workflow: processar-excel.yml                                 │  │
│  │ Trigger: workflow_dispatch with input "blob_url"              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 1. Downloads file from Vercel Blob (public URL)               │  │
│  │    curl -o Emitir.xlsx "${{ github.event.inputs.blob_url }}"     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 2. Setup Python + Dependencies                                │  │
│  │    pip install pandas openpyxl psycopg2-binary                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 3. Executes: python scripts/upload_planilha_neon.py           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         │ psycopg2.connect()                                         │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                NEON POSTGRESQL                                 │  │
│  │  INSERT INTO cadastros (...) VALUES (...)                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 4. (Optional) Deletes blob after success                      │  │
│  │    curl -X DELETE "${{ github.event.inputs.blob_url }}"?token=${{ secrets.DELETE_TOKEN }}             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 5. Uploads logs as artifact                                   │  │
│  │ ✅ Workflow completed                                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        TRIGGER PLAYWRIGHT
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Lovable)                            │
│                                                                       │
│  ┌──────────────┐                                                   │
│  │  User        │                                                   │
│  │  clicks on   │                                                   │
│  │ "Execute"    │                                                   │
│  └──────┬───────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ POST → https://YOUR_VERCEL_PROJECT_URL/api/trigger-playwright │  │
│  └──────────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   VERCEL SERVERLESS FUNCTION                         │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Calls GitHub API → workflow_dispatch                          │  │
│  │ Workflow: run-playwright.yml                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS                                    │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ 1. Setup Python + Playwright                                  │  │
│  │ 2. Executes: python scripts/client_cad_painel_neon.py          │  │
│  │ 3. Fetches data from Neon                                     │  │
│  │ 4. Playwright registers in external system                    │  │
│  │ 5. Updates status in Neon                                     │  │
│  │ 6. Sends Telegram notification                                │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘


--- 

## 🎯 Advantages of this Solution

### ✅ Vercel Serverless Functions
-   **100% Free**: 100GB-Hrs/month free
-   **Global Edge Network**: Fast anywhere
-   **Secure**: GitHub Token is in Vercel Env Variable

### ✅ Vercel Blob Storage
-   **100% Free**: 500MB storage + 5GB bandwidth/month
-   **Public URLs**: Easy to access from GitHub Actions
-   **Durable**: High durability

### ✅ Comparison with other solutions

| Solution | Cost | Security | Complexity | Performance |
|---------|-------|-----------|--------------|-------------|
| Cloud Functions | 💰 Paid | ✅ High | 🟡 Medium | 🟢 Good |
| Token in Frontend | 💚 Free | ❌ Low | 🟢 Simple | 🟢 Good |
| GitHub Issues | 💚 Free | 🟡 Medium | 🟡 Medium | 🟡 OK |
| **Vercel Blob** | 💚 Free | ✅ High | 🟢 Simple | ⭐ Excellent |

--- 

## 📋 STEP 1: Create Project on Vercel

### 1.1 Create Vercel account

1.  Access https://vercel.com
2.  **Sign Up** with GitHub (no card!)
3.  Authorize GitHub access

### 1.2 Create new project

```bash
# Option 1: Via interface
- New Project → Import Git Repository → Choose your repo

# Option 2: Via CLI
npm i -g vercel
vercel login
vercel
```

--- 

## 📋 STEP 2: Project Structure

```
your-project/
├── api/
│   ├── upload.ts                    # Upload to Blob
│   └── trigger-playwright.ts        # Playwright Trigger
├── .github/
│   └── workflows/
│       ├── processar-excel.yml
│       └── run-playwright.yml
├── scripts/
│   ├── upload_planilha_neon.py
│   └── client_cad_painel_neon.py
├── package.json
└── vercel.json
```

--- 

## 📋 STEP 3: API Code - Upload

### api/upload.ts

```typescript
import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false, // Required for multipart/form-data
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Manually parse multipart/form-data
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

    // Validations
    if (!fileName!) {
      return res.status(400).json({ error: 'No file sent' });
    }

    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      return res.status(400).json({
        error: 'Only Excel files (.xlsx, .xls)'
      });
    }

    if (fileSize > 25 * 1024 * 1024) { // 25MB
      return res.status(400).json({
        error: 'File too large. Maximum: 25MB'
      });
    }

    // Generate unique ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const uploadId = `excel-${timestamp}-${random}`;
    const blobName = `${uploadId}.xlsx`;

    // Upload to Vercel Blob
    const blob = await put(blobName, fileBuffer!, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('✅ Blob created:', blob.url);

    // Trigger GitHub Actions
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
      message: 'Upload complete! Processing started.',
      githubActionsUrl: `https://github.com/${githubRepo}/actions`,
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      error: (error as Error).message
    });
  }
}
```

--- 

## 📋 STEP 4: API Code - Trigger Playwright

### api/trigger-playwright.ts

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const githubRepo = 'RodrigoMD2025/cadastrosmd-automation-web';
    const githubToken = process.env.GITHUB_TOKEN!;

    const githubResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/actions/workflows/run-playwright.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
        }),
      }
    );

    if (!githubResponse.ok) {
      throw new Error('Failed to trigger workflow');
    }

    return res.status(200).json({
      success: true,
      message: 'Playwright automation started!',
      githubActionsUrl: `https://github.com/${githubRepo}/actions`,
    });

  } catch (error) {
    return res.status(500).json({
      error: (error as Error).message
    });
  }
}
```

--- 

## 📋 STEP 5: package.json

```json
{
  "name": "excel-automation-api",
  "version": "1.0.0",
  "dependencies": {
    "@vercel/blob": "^0.23.0",
    "busboy": "^1.6.0"
  },
  "devDependencies": {
    "@vercel/node": "^3.0.0"
  }
}
```

--- 

## 📋 STEP 6: vercel.json

```json
{
  "functions": {
    "api/upload.ts": {
      "maxDuration": 60,
      "memory": 1024
    },
    "api/trigger-playwright.ts": {
      "maxDuration": 10
    }
  }
}
```

--- 

## 📋 STEP 7: Configure Environment Variables on Vercel

1.  Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

Add:
```
GITHUB_TOKEN = ghp_your_token_here
GITHUB_REPO = RodrigoMD2025/cadastrosmd-automation-web
BLOB_READ_WRITE_TOKEN = (automatically generated by Vercel)
```

**⚠️ IMPORTANT:**
-   `BLOB_READ_WRITE_TOKEN` is automatically created when you use `@vercel/blob`
-   No need to create manually

--- 

## 📋 STEP 8: Frontend (Lovable)

### UploadDialog.tsx

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Change to your Vercel project URL
  const API_URL = 'https://YOUR_VERCEL_PROJECT_URL/api'; // <<<<<<< UPDATE THIS LINE

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
        toast.error("Invalid format", { 
          description: "Please select an Excel file (.xlsx or .xls)."
        });
        return;
      }
      
      if (selectedFile.size > 25 * 1024 * 1024) { // Increased to 25MB to match Worker
        toast.error("File too large",{
          description: "The file must be a maximum of 25MB."
        });
        return;
      }
      
      setFile(selectedFile);
      toast.success("File selected", {
        description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`
      });
    }
  };

  async function handleUpload() {
    if (!file) {
      toast.error('Select a file');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      toast.info('📤 Uploading file...');

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload error');
      }

      const data = await response.json();

      toast.success('✅ Upload complete!', {
        description: `File: ${data.fileName} (${(data.size / 1024).toFixed(2)} KB)`,
        action: {
          label: 'View execution',
          onClick: () => window.open(data.githubActionsUrl, '_blank'),
        },
        duration: 10000,
      });

      setFile(null);
      onOpenChange(false); // Close the dialog after upload

    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('❌ ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Spreadsheet Upload</DialogTitle>
          <DialogDescription>
            Select an Excel file (.xlsx) to send to our systems.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select the Excel spreadsheet
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />
          </div>
          
          {file && (
            <div className="text-sm text-gray-600">
              📎 {file.name} (${(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
          
          <Button 
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          > 
            {uploading ? '⏳ Uploading...' : '🚀 Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
```

### PlaywrightTrigger.tsx

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PlaywrightTrigger() {
  const [running, setRunning] = useState(false);

  const API_URL = 'https://YOUR_VERCEL_PROJECT_URL/api'; // <<<<<<< UPDATE THIS LINE

  async function triggerPlaywright() {
    const confirmacao = confirm(
      'Do you want to start Playwright automation?\n\n' +
      'This will process Neon data and register it in the external system.'
    );

    if (!confirmacao) return;

    setRunning(true);

    try {
      const response = await fetch(`${API_URL}/trigger-playwright`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error triggering');
      }

      const data = await response.json();

      toast.success('✅ Automation started!', {
        description: 'Track progress on GitHub Actions',
        action: {
          label: 'View execution',
          onClick: () => window.open(data.githubActionsUrl, '_blank'),
        },
        duration: 10000,
      });

    } catch (error) {
      toast.error('❌ ' + (error as Error).message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        🎭 Playwright Automation
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Fetches data from Neon and executes registrations in the external system
      </p>
      <Button 
        onClick={triggerPlaywright} 
        disabled={running}
        className="w-full"
      >
        {running ? '⏳ Starting...' : '▶️ Execute Playwright'}
      </Button>
    </div>
  );
}
```

--- 

## 📋 STEP 9: GitHub Workflow - Process Excel

### .github/workflows/processar-excel.yml

```yaml
name: Process Excel from Vercel Blob

on:
  workflow_dispatch:
    inputs:
      blob_url:
        description: 'URL of the file in Vercel Blob'
        required: true
        type: string
      upload_id:
        description: 'Upload ID'
        required: true
        type: string
      file_name:
        description: 'Original file name'
        required: true
        type: string

jobs:
  processar:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Download file from Vercel Blob
        run: |
          echo "📥 Downloading file: ${{ github.event.inputs.file_name }}"
          curl -L -o Emitir.xlsx "${{ github.event.inputs.blob_url }}"
          echo "✅ File downloaded: $(ls -lh Emitir.xlsx)"
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install pandas openpyxl psycopg2-binary tqdm
      
      - name: Process and send to Neon
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          TABELA: ${{ secrets.TABELA }}
        run: |
          python scripts/upload_planilha_neon.py
      
      - name: Upload logs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: logs-${{ github.event.inputs.upload_id }}
          path: '*.log'
          retention-days: 7
      
      - name: Notify completion
        if: always()
        run: | 
          if [ "${{ job.status }}" == "success" ]; then
            echo "✅ Processing completed successfully!"
          else
            echo "❌ Error in processing"
          fi
```

--- 

## 📋 STEP 10: GitHub Secrets

Configure in the repository: **Settings → Secrets → Actions**

```
DATABASE_URL = postgresql://...
TABELA = cadastros
LOGIN_USERNAME = ...
LOGIN_PASSWORD = ...
TELEGRAM_TOKEN = ...
TELEGRAM_CHAT_ID = ...
```

--- 

## 🚀 Deploy

### 1. Push the code

```bash
git add .
git commit -m "feat: Setup Vercel Blob integration"
git push
```

### 2. Deploy on Vercel

Vercel will auto-deploy when you push!

Or via CLI:
```bash
vercel --prod
```

### 3. Note the URL

Vercel will give you a URL like:
```
https://YOUR_VERCEL_PROJECT_URL
```
Use this URL in the frontend: `${API_URL}/upload`

--- 

## 💰 Free Limits of Vercel

| Resource | Free Limit | Estimated Usage |
|---------|-------------|------------------|
| **Blob Storage** | 500 MB | ~50 MB/month |
| **Bandwidth** | 5 GB/month | ~500 MB/month |
| **Serverless Executions** | 100 GB-Hrs/month | ~1 GB-Hr/month |
| **Build Minutes** | 6,000/month | ~100/month |

**Conclusion:** You are **WELL BELOW** the limits! 🎉

--- 

## ✅ Final Checklist

-   [ ] Create Vercel account (no card)
-   [ ] Create project and connect GitHub
-   [ ] Add API code (`api/upload.ts`, etc)
-   [ ] Configure Environment Variables on Vercel
-   [ ] Deploy (automatic on push)
-   [ ] Update frontend with Vercel URL
-   [ ] Configure Secrets on GitHub
-   [ ] Test file upload
-   [ ] Test Playwright trigger

--- 

## 🎯 Final Advantages

✅ **No credit card required** - 100% free
✅ **Everything on Vercel** - Easier to manage
✅ **Edge Functions** - Fast globally
✅ **Auto-deploy** - Push to GitHub = automatic deploy
✅ **Generous limits** - Well above your usage

```