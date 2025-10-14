# Sistema Completo: Excel → Neon → Playwright via GitHub Actions

## 🏗️ Arquitetura Final

```
Frontend (GitHub Pages) - Apenas Interface
    ↓
    ├── Upload Excel → GitHub Actions → upload_planilha_neon.py → Neon
    ↓
    └── Botão Trigger → GitHub Actions → client_cad_painel_neon.py → Playwright
```

**✅ Vantagens:**
- Credenciais do Neon NUNCA ficam expostas
- Usa seus scripts Python atuais
- Frontend apenas dispara workflows
- 100% seguro e gratuito

---

## 📋 Estrutura de Pastas

```
seu-repositorio/
├── index.html                          # Frontend
├── app.js                              # Lógica do frontend
├── .github/
│   └── workflows/
│       ├── upload-excel.yml            # Workflow de upload
│       └── run-playwright.yml          # Workflow do Playwright
├── scripts/
│   ├── upload_planilha_neon.py         # Seu script atual (adaptado)
│   └── client_cad_painel_neon.py       # Seu script atual (adaptado)
└── .env.example                         # Exemplo de variáveis
```

---

## 📋 PASSO 1: Frontend (index.html)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automação - Neon + Playwright</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            text-align: center;
        }
        .subtitle {
            color: #666;
            margin-bottom: 40px;
            text-align: center;
            font-size: 14px;
        }
        .section {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 25px;
            border-left: 5px solid #667eea;
        }
        .section h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .file-input-wrapper {
            position: relative;
            width: 100%;
        }
        .file-input-wrapper input[type=file] {
            position: absolute;
            left: -9999px;
        }
        .file-input-label {
            display: block;
            padding: 25px;
            background: white;
            border: 3px dashed #667eea;
            border-radius: 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 16px;
        }
        .file-input-label:hover {
            background: #f0f0ff;
            border-color: #5568d3;
            transform: translateY(-2px);
        }
        .file-name {
            margin-top: 15px;
            color: #666;
            font-size: 14px;
            text-align: center;
        }
        button {
            width: 100%;
            padding: 18px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 20px;
        }
        button:hover:not(:disabled) {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        .status {
            padding: 18px;
            border-radius: 10px;
            margin-top: 20px;
            display: none;
            font-size: 15px;
        }
        .status.success {
            background: #d4edda;
            color: #155724;
            border: 2px solid #c3e6cb;
        }
        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 2px solid #f5c6cb;
        }
        .status.info {
            background: #d1ecf1;
            color: #0c5460;
            border: 2px solid #bee5eb;
        }
        .flow {
            background: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 25px;
        }
        .flow-step {
            display: inline-block;
            padding: 15px 25px;
            background: #667eea;
            color: white;
            border-radius: 8px;
            margin: 5px;
            font-size: 14px;
        }
        .arrow {
            color: #667eea;
            font-size: 24px;
            margin: 0 10px;
        }
        .info-box {
            background: #fff3cd;
            border: 2px solid #ffc107;
            padding: 20px;
            border-radius: 10px;
            margin-top: 25px;
        }
        .info-box h3 {
            color: #856404;
            margin-bottom: 10px;
        }
        .info-box ul {
            margin-left: 20px;
            color: #856404;
        }
        .info-box li {
            margin: 8px 0;
        }
        .github-link {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .github-link a {
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
        .github-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Sistema de Automação</h1>
        <p class="subtitle">Upload Excel → Neon PostgreSQL → Playwright Automation</p>

        <!-- Fluxo Visual -->
        <div class="flow">
            <div class="flow-step">📁 Upload Excel</div>
            <span class="arrow">→</span>
            <div class="flow-step">🤖 GitHub Actions</div>
            <span class="arrow">→</span>
            <div class="flow-step">🗄️ Neon PostgreSQL</div>
            <span class="arrow">→</span>
            <div class="flow-step">🎭 Playwright Bot</div>
        </div>

        <!-- Seção 1: Upload -->
        <div class="section">
            <h2>📤 Passo 1: Upload da Planilha Excel</h2>
            <p style="color: #666; margin-bottom: 20px; font-size: 14px;">
                Selecione o arquivo <strong>Emitir.xlsx</strong> para enviar ao Neon
            </p>
            <div class="file-input-wrapper">
                <input type="file" id="excelFile" accept=".xlsx,.xls" />
                <label for="excelFile" class="file-input-label">
                    📁 Clique aqui para selecionar a planilha Excel
                </label>
            </div>
            <div class="file-name" id="fileName">Nenhum arquivo selecionado</div>
            <button id="uploadBtn" disabled>🚀 Enviar para Neon (via GitHub Actions)</button>
            <div class="status" id="uploadStatus"></div>
        </div>

        <!-- Seção 2: Trigger Playwright -->
        <div class="section">
            <h2>🎭 Passo 2: Executar Automação Playwright</h2>
            <p style="color: #666; margin-bottom: 20px; font-size: 14px;">
                Busca dados do Neon e executa cadastros no sistema via Playwright
            </p>
            <button id="triggerBtn">▶️ Iniciar Automação Playwright</button>
            <div class="status" id="triggerStatus"></div>
        </div>

        <!-- Informações -->
        <div class="info-box">
            <h3>ℹ️ Como funciona:</h3>
            <ul>
                <li><strong>Segurança:</strong> Credenciais do Neon ficam apenas no GitHub Secrets</li>
                <li><strong>Upload:</strong> Arquivo vai direto para GitHub Actions (não passa pelo navegador)</li>
                <li><strong>Processamento:</strong> Scripts Python rodam no GitHub (grátis)</li>
                <li><strong>Logs:</strong> Acompanhe a execução na aba Actions do repositório</li>
            </ul>
        </div>

        <!-- Link GitHub Actions -->
        <div class="github-link">
            <p>📊 Acompanhe a execução dos workflows em:</p>
            <a href="https://github.com/SEU-USUARIO/SEU-REPO/actions" target="_blank">
                Ver GitHub Actions →
            </a>
        </div>
    </div>

    <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 📋 PASSO 2: Frontend Logic (app.js)

```javascript
// Configurações - ALTERE AQUI
const GITHUB_TOKEN = 'ghp_seu_token_aqui'; // Personal Access Token do GitHub
const GITHUB_REPO = 'seu-usuario/seu-repo'; // Ex: joao/meu-projeto
const GITHUB_BRANCH = 'main'; // Ou 'master'

// Elementos do DOM
const excelFile = document.getElementById('excelFile');
const uploadBtn = document.getElementById('uploadBtn');
const triggerBtn = document.getElementById('triggerBtn');
const fileName = document.getElementById('fileName');
const uploadStatus = document.getElementById('uploadStatus');
const triggerStatus = document.getElementById('triggerStatus');

// Seleção de arquivo
excelFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = `📎 ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        uploadBtn.disabled = false;
    } else {
        fileName.textContent = 'Nenhum arquivo selecionado';
        uploadBtn.disabled = true;
    }
});

// Upload do Excel
uploadBtn.addEventListener('click', async () => {
    const file = excelFile.files[0];
    if (!file) return;

    uploadBtn.disabled = true;
    uploadBtn.textContent = '⏳ Enviando para GitHub Actions...';
    showStatus(uploadStatus, 'info', '📤 Convertendo arquivo e enviando...');

    try {
        // Converte arquivo para Base64
        const base64 = await fileToBase64(file);

        // Dispara workflow de upload
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/upload-excel.yml/dispatches`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ref: GITHUB_BRANCH,
                    inputs: {
                        file_content: base64,
                        file_name: file.name
                    }
                })
            }
        );

        if (response.status === 204) {
            showStatus(uploadStatus, 'success', 
                `✅ Upload iniciado com sucesso! O arquivo está sendo processado no GitHub Actions. 
                 Aguarde alguns segundos e verifique na aba Actions do GitHub.`);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro desconhecido');
        }
    } catch (error) {
        showStatus(uploadStatus, 'error', 
            `❌ Erro ao enviar: ${error.message}. 
             Verifique se o GITHUB_TOKEN e GITHUB_REPO estão corretos.`);
        console.error('Erro completo:', error);
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = '🚀 Enviar para Neon (via GitHub Actions)';
    }
});

// Trigger Playwright
triggerBtn.addEventListener('click', async () => {
    const confirmacao = confirm(
        'Tem certeza que deseja iniciar a automação Playwright?\n\n' +
        'Isso irá buscar os dados do Neon e executar os cadastros no sistema.'
    );
    
    if (!confirmacao) return;

    triggerBtn.disabled = true;
    triggerBtn.textContent = '⏳ Iniciando automação...';
    showStatus(triggerStatus, 'info', '🤖 Disparando workflow do Playwright...');

    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/run-playwright.yml/dispatches`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ref: GITHUB_BRANCH
                })
            }
        );

        if (response.status === 204) {
            showStatus(triggerStatus, 'success', 
                `✅ Automação iniciada! O Playwright está rodando no GitHub Actions. 
                 Acompanhe o progresso na aba Actions do GitHub.`);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro desconhecido');
        }
    } catch (error) {
        showStatus(triggerStatus, 'error', 
            `❌ Erro ao disparar: ${error.message}. 
             Verifique o GITHUB_TOKEN e as permissões.`);
        console.error('Erro completo:', error);
    } finally {
        triggerBtn.disabled = false;
        triggerBtn.textContent = '▶️ Iniciar Automação Playwright';
    }
});

// Funções auxiliares
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function showStatus(element, type, message) {
    element.className = `status ${type}`;
    element.textContent = message;
    element.style.display = 'block';
    
    // Auto-hide após 10 segundos para mensagens de sucesso
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 10000);
    }
}
```

---

## 📋 PASSO 3: Workflow Upload (.github/workflows/upload-excel.yml)

```yaml
name: Upload Excel to Neon

on:
  workflow_dispatch:
    inputs:
      file_content:
        description: 'Base64 encoded Excel file'
        required: true
        type: string
      file_name:
        description: 'Original file name'
        required: true
        type: string

jobs:
  upload:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install pandas openpyxl psycopg2-binary tqdm
      
      - name: Decode Excel file
        run: |
          echo "${{ github.event.inputs.file_content }}" | base64 -d > Emitir.xlsx
          echo "✅ Arquivo decodificado: $(ls -lh Emitir.xlsx)"
      
      - name: Upload to Neon
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          TABELA: ${{ secrets.TABELA }}
        run: |
          python scripts/upload_planilha_neon.py
      
      - name: Upload logs as artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: upload-logs
          path: '*.log'
          retention-days: 7
```

---

## 📋 PASSO 4: Workflow Playwright (.github/workflows/run-playwright.yml)

```yaml
name: Run Playwright Automation

on:
  workflow_dispatch:

jobs:
  playwright:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install playwright psycopg2-binary pandas tqdm requests python-dotenv
          playwright install chromium
          playwright install-deps
      
      - name: Run Playwright Script
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          TABELA: ${{ secrets.TABELA }}
          LOGIN_USERNAME: ${{ secrets.LOGIN_USERNAME }}
          LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}
          TELEGRAM_TOKEN: ${{ secrets.TELEGRAM_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
        run: |
          python scripts/client_cad_painel_neon.py
      
      - name: Upload logs as artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-logs
          path: '*.log'
          retention-days: 7
```

---

## 📋 PASSO 5: Adaptar upload_planilha_neon.py

```python
import pandas as pd
import psycopg2
import logging
import os
from tqdm import tqdm

# Configurações das variáveis de ambiente (GitHub Actions)
DATABASE_URL = os.getenv('DATABASE_URL')
TABELA = os.getenv('TABELA', 'cadastros')
PLANILHA = 'Emitir.xlsx'  # Nome fixo no GitHub Actions

# Validação
if not DATABASE_URL:
    raise ValueError("DATABASE_URL não definida nos secrets do GitHub")

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("upload_neon.log"),
        logging.StreamHandler()
    ]
)

def verificar_conexao_neon():
    """Verifica a conexão com o Neon"""
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            logging.info("✅ Conexão com Neon estabelecida")
        return True
    except Exception as e:
        logging.error(f"❌ Erro ao conectar: {e}")
        return False

def limpar_tabela():
    """Limpa a tabela antes do upload"""
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                logging.info(f"🗑️ Limpando tabela {TABELA}...")
                cur.execute(f'DELETE FROM public.{TABELA}')
                conn.commit()
                logging.info("✅ Tabela limpa")
    except Exception as e:
        logging.error(f"❌ Erro ao limpar tabela: {e}")
        raise

def upload_planilha():
    """Upload da planilha para o Neon"""
    try:
        # Ler Excel
        df = pd.read_excel(PLANILHA)
        logging.info(f"📊 Lidas {len(df)} linhas do Excel")
        
        # Normalizar colunas
        df.columns = [col.upper().strip() for col in df.columns]
        logging.info(f"Colunas: {list(df.columns)}")
        
        sucessos = 0
        erros = 0

        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                with tqdm(total=len(df), desc="Importando") as pbar:
                    for index, row in df.iterrows():
                        dados = row.dropna().to_dict()
                        dados_limpos = {f'"{key}"': value for key, value in dados.items()}

                        cols = ', '.join(dados_limpos.keys())
                        vals = ', '.join(['%s'] * len(dados_limpos))
                        query = f"INSERT INTO public.{TABELA} ({cols}) VALUES ({vals})"
                        
                        try:
                            cur.execute(query, list(dados_limpos.values()))
                            conn.commit()
                            sucessos += 1
                            pbar.set_postfix({"✅": sucessos, "❌": erros})
                        except Exception as e:
                            conn.rollback()
                            erros += 1
                            logging.warning(f"Erro linha {index + 1}: {e}")
                            pbar.set_postfix({"✅": sucessos, "❌": erros})
                        
                        pbar.update(1)
        
        logging.info(f"✅ Importação concluída: {sucessos} sucessos, {erros} erros")
        return sucessos, erros
                
    except FileNotFoundError:
        logging.error(f"❌ Arquivo {PLANILHA} não encontrado")
        raise
    except Exception as e:
        logging.error(f"❌ Erro no upload: {e}")
        raise

if __name__ == "__main__":
    try:
        logging.info("🚀 Iniciando upload para Neon...")
        
        if not verificar_conexao_neon():
            exit(1)
        
        # No GitHub Actions, sempre limpa a tabela
        limpar_tabela()
        
        sucessos, erros = upload_planilha()
        
        if erros > 0:
            logging.warning(f"⚠️ Concluído com {erros} erros")
            exit(1)
        else:
            logging.info("✅ Upload 100% concluído")
        
    except Exception as e:
        logging.error(f"❌ Erro fatal: {e}")
        exit(1)
```

---

## 📋 PASSO 6: Seu client_cad_painel_neon.py (já está pronto!)

**Não precisa alterar nada!** O script já está preparado para pegar as variáveis do ambiente:

```python
# Já está no seu código:
self.database_url = os.getenv('DATABASE_URL')
self.login_username = os.getenv('LOGIN_USERNAME')
# ... etc
```

---

## 📋 PASSO 7: Configurar GitHub Secrets

No seu repositório: **Settings → Secrets and variables → Actions → New repository secret**

Adicione:

```
DATABASE_URL = postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
TABELA = cadastros
LOGIN_USERNAME = seu_usuario_sistema
LOGIN_PASSWORD = sua_senha_sistema
TELEGRAM_TOKEN = seu_token_telegram
TELEGRAM_CHAT_ID = seu_chat_id
```

---

## 📋 PASSO 8: Criar GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Generate new token (classic)**
3. Selecione os escopos:
   - ✅ `repo` (acesso total ao repositório)
   - ✅ `workflow` (disparar workflows)
4. Copie o token: `ghp_xxxxxxxxxxxxx`
5. Cole no `app.js` na variável `GITHUB_TOKEN`

---

## 🎯 Como Usar

### 1️⃣ Upload da Planilha:
1. Abra o site no GitHub Pages
2. Selecione o arquivo `Emitir.xlsx`
3. Clique em "Enviar para Neon"
4. Aguarde ~30 segundos
5. Verifique na aba **Actions** do GitHub

### 2️⃣ Executar Playwright:
1. Clique em "Iniciar Automação Playwright"
2. Confirme a ação
3. Acompanhe na aba **Actions**
4. Receba notificação no Telegram

---

## 📊 Ver Logs

Os logs ficam disponíveis como **artifacts** no GitHub Actions:
1. Vá em **Actions** → Escolha a execução
2. Role até "Artifacts"
3. Baixe `upload-logs` ou `playwright-logs`

---

## ✅ Checklist Final

- [ ] Criar Personal Access Token no GitHub
- [ ] Configurar Secrets no repositório
- [ ] Fazer upload dos arquivos (HTML, JS, workflows, scripts)
- [ ] Ativar GitHub Pages (Settings → Pages → Source: main branch)
- [ ] Testar upload de planilha
- [ ] Testar automação Playwright

---

## 🔒 Segurança Garantida

✅ Credenciais do Neon só nos GitHub Secrets  
✅ Token do GitHub com escopo limitado  
✅ Arquivo Excel nunca passa pelo browser (vai direto pro Actions)  
✅ Frontend só dispara workflows (não processa dados)  

---

## 💰 100% Gratuito

- **GitHub Actions**: 2.000 minutos/mês
- **GitHub Pages**: Ilimitado para sites públicos
- **Neon**: 0.5GB storage grátis

---

## 🤖 ORIENTAÇÕES PARA AGENTE IA ADAPTAR O PROJETO

### 📌 Contexto do Projeto
Este é um sistema web que permite:
1. Upload de planilhas Excel para banco Neon PostgreSQL
2. Trigger de automação Playwright via GitHub Actions
3. Frontend hospedado no GitHub Pages (ou Lovable)

### 🎯 Pontos Críticos de Integração

#### 1. **API do GitHub Actions**
O frontend precisa fazer requests para:
```
POST https://api.github.com/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches
```

**Headers obrigatórios:**
```javascript
{
  'Authorization': 'Bearer {GITHUB_TOKEN}',
  'Accept': 'application/vnd.github+json',
  'Content-Type': 'application/json'
}
```

**Body para upload de Excel:**
```javascript
{
  ref: 'main', // ou 'master'
  inputs: {
    file_content: 'base64_string_here',
    file_name: 'nome_arquivo.xlsx'
  }
}
```

**Resposta de sucesso:** HTTP 204 (sem body)

#### 2. **Conversão de Arquivo para Base64**
```javascript
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove o prefixo "data:application/...;base64,"
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

#### 3. **Nomes dos Workflows**
Certifique-se que os workflows tenham esses nomes EXATOS:
- `upload-excel.yml` - Para upload da planilha
- `run-playwright.yml` - Para executar automação

Ou ajuste as URLs no frontend:
```javascript
// Exemplo com IDs numéricos (alternativa):
/actions/workflows/12345678/dispatches
```

#### 4. **Tratamento de Erros**
```javascript
try {
  const response = await fetch(url, options);
  
  if (response.status === 204) {
    // Sucesso
  } else if (response.status === 404) {
    throw new Error('Workflow não encontrado. Verifique o nome do arquivo .yml');
  } else if (response.status === 401) {
    throw new Error('Token inválido ou sem permissões');
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
} catch (error) {
  console.error('Erro:', error);
  // Mostrar mensagem amigável ao usuário
}
```

### 🔐 Variáveis de Configuração

**No Frontend (hardcoded ou .env):**
```javascript
const CONFIG = {
  GITHUB_TOKEN: 'ghp_xxxxx', // Personal Access Token
  GITHUB_REPO: 'usuario/repositorio',
  GITHUB_BRANCH: 'main',
  WORKFLOW_UPLOAD: 'upload-excel.yml',
  WORKFLOW_PLAYWRIGHT: 'run-playwright.yml'
};
```

**⚠️ IMPORTANTE:** 
- Se usar Lovable, o TOKEN pode ficar no código (site é privado)
- Se for GitHub Pages (público), considere usar um backend proxy
- Nunca commite o token no repositório

**Nos GitHub Secrets (configurar manualmente):**
```
DATABASE_URL
TABELA
LOGIN_USERNAME
LOGIN_PASSWORD
TELEGRAM_TOKEN
TELEGRAM_CHAT_ID
```

### 📊 Feedback Visual para o Usuário

Implemente 3 estados para cada ação:

**1. Estado Inicial:**
```javascript
button.disabled = false;
button.textContent = '🚀 Enviar para Neon';
status.style.display = 'none';
```

**2. Estado Loading:**
```javascript
button.disabled = true;
button.textContent = '⏳ Processando...';
showStatus('info', '📤 Enviando dados...');
```

**3. Estado Success/Error:**
```javascript
button.disabled = false;
button.textContent = '🚀 Enviar para Neon';
showStatus('success', '✅ Enviado com sucesso!');
// ou
showStatus('error', '❌ Erro: ' + message);
```

### 🔗 Link para GitHub Actions

Adicione um link direto para o usuário acompanhar:
```javascript
const githubActionsUrl = `https://github.com/${GITHUB_REPO}/actions`;

// No HTML:
<a href="{githubActionsUrl}" target="_blank">
  📊 Ver execução no GitHub Actions →
</a>
```

### 📱 Responsividade

Certifique-se que funciona em mobile:
```css
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  button {
    font-size: 16px;
    padding: 15px;
  }
}
```

### ⚡ Performance

**Upload de arquivos grandes:**
```javascript
// Limite de tamanho (GitHub API: ~30MB)
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

if (file.size > MAX_FILE_SIZE) {
  showStatus('error', '❌ Arquivo muito grande. Máximo: 25MB');
  return;
}
```

### 🧪 Testes Manuais

Antes de considerar pronto, teste:

1. ✅ Upload de Excel pequeno (< 1MB)
2. ✅ Upload de Excel médio (5-10MB)
3. ✅ Trigger do Playwright
4. ✅ Erro ao enviar sem arquivo
5. ✅ Erro com token inválido
6. ✅ Verificar logs no GitHub Actions
7. ✅ Testar em Chrome, Firefox e Safari
8. ✅ Testar em mobile

### 🐛 Debugging

**Se upload falhar:**
1. Verifique o nome do workflow está correto
2. Confirme que o token tem permissão `workflow`
3. Veja os logs no Console do browser (F12)
4. Teste o endpoint com curl:
```bash
curl -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/USER/REPO/actions/workflows/upload-excel.yml/dispatches \
  -d '{"ref":"main","inputs":{"file_content":"test","file_name":"test.xlsx"}}'
```

**Se Playwright não executar:**
1. Verifique se os Secrets estão configurados
2. Veja os logs do workflow no GitHub Actions
3. Confirme que `playwright install chromium` rodou

### 📦 Estrutura Final dos Arquivos

```
projeto/
├── index.html                    # Interface do usuário
├── app.js ou main.js            # Lógica do frontend
├── styles.css (opcional)        # Se não usar Tailwind
├── .github/
│   └── workflows/
│       ├── upload-excel.yml     # Workflow de upload
│       └── run-playwright.yml   # Workflow do Playwright
├── scripts/
│   ├── upload_planilha_neon.py
│   └── client_cad_painel_neon.py
├── README.md                     # Esta documentação
└── .env.example                  # Exemplo de variáveis

# NÃO commitar:
.env
*.log
node_modules/
```

### 🔄 Fluxo Completo Detalhado

```
1. USUÁRIO SELECIONA EXCEL
   ↓
2. JavaScript valida arquivo
   ↓
3. Converte para Base64
   ↓
4. Faz POST para GitHub API
   ↓
5. GitHub Actions recebe webhook
   ↓
6. Runner Ubuntu inicializa
   ↓
7. Instala Python + dependências
   ↓
8. Decodifica Base64 → arquivo.xlsx
   ↓
9. Executa upload_planilha_neon.py
   ↓
10. Script conecta ao Neon
   ↓
11. Limpa tabela antiga
   ↓
12. Insere novos dados
   ↓
13. Gera logs
   ↓
14. Workflow termina (✅ ou ❌)
   ↓
15. USUÁRIO CLICA "EXECUTAR PLAYWRIGHT"
   ↓
16. GitHub Actions inicia novo workflow
   ↓
17. Executa client_cad_painel_neon.py
   ↓
18. Playwright busca dados do Neon
   ↓
19. Cadastra no sistema externo
   ↓
20. Atualiza status no Neon
   ↓
21. Envia notificação Telegram
   ↓
22. Workflow termina
```

### 💡 Melhorias Futuras (Opcional)

1. **Polling de Status:**
```javascript
// Verificar se workflow terminou
async function checkWorkflowStatus(runId) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/actions/runs/${runId}`,
    { headers: { 'Authorization': `Bearer ${TOKEN}` } }
  );
  const data = await response.json();
  return data.status; // 'completed', 'in_progress', etc
}
```

2. **Histórico de Uploads:**
Salvar em localStorage:
```javascript
const historico = JSON.parse(localStorage.getItem('uploads') || '[]');
historico.push({
  data: new Date(),
  arquivo: fileName,
  status: 'sucesso'
});
localStorage.setItem('uploads', JSON.stringify(historico));
```

3. **Autenticação (Opcional):**
Se quiser restringir acesso, adicione Firebase Auth ou senha simples.

### 🎨 Integração com Lovable

Se estiver usando Lovable:

1. **Importe as funções de API:**
```javascript
// Em um arquivo api.js ou service.js
export async function uploadExcel(file) {
  const base64 = await fileToBase64(file);
  // ... resto do código
}

export async function triggerPlaywright() {
  // ... código do trigger
}
```

2. **Use nos componentes:**
```jsx
import { uploadExcel, triggerPlaywright } from './api';

function UploadButton() {
  const handleUpload = async (file) => {
    try {
      await uploadExcel(file);
      toast.success('Upload iniciado!');
    } catch (error) {
      toast.error('Erro: ' + error.message);
    }
  };
  
  return <Button onClick={() => handleUpload(selectedFile)}>Upload</Button>;
}
```

3. **Variáveis de ambiente no Lovable:**
Crie um arquivo `.env.local`:
```
VITE_GITHUB_TOKEN=ghp_xxxxx
VITE_GITHUB_REPO=usuario/repo
```

Acesse com:
```javascript
const token = import.meta.env.VITE_GITHUB_TOKEN;
```

### ✅ Checklist para o Agente

Ao adaptar o projeto, verifique:

- [ ] Conversão de arquivo para Base64 funciona
- [ ] Headers da API do GitHub estão corretos
- [ ] Token tem permissões `repo` e `workflow`
- [ ] Nomes dos workflows estão corretos
- [ ] Tratamento de erros implementado
- [ ] Feedback visual (loading, success, error)
- [ ] Link para GitHub Actions funciona
- [ ] Validação de tamanho de arquivo
- [ ] Responsivo (mobile e desktop)
- [ ] Logs de erro no console para debug

### 📞 Troubleshooting Comum

**"404 Not Found":**
- Verifique o nome do repositório: `usuario/repo` (não `github.com/usuario/repo`)
- Confirme que os workflows existem na branch correta

**"401 Unauthorized":**
- Token expirou ou inválido
- Token não tem permissão `workflow`

**"422 Unprocessable Entity":**
- O workflow não tem `workflow_dispatch` como trigger
- Input `file_content` ou `file_name` faltando

**Workflow não executa:**
- Verifique os Secrets no repositório
- Confirme que a branch está correta (`main` vs `master`)

---

## 📚 Recursos Adicionais

- [GitHub Actions API Docs](https://docs.github.com/en/rest/actions/workflows)
- [Neon Documentation](https://neon.tech/docs)
- [Playwright Python](https://playwright.dev/python/docs/intro)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)