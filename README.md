# 🤖 Painel de Automação de Cadastros Musicais

Cansado de cadastrar músicas manualmente, uma por uma? Este projeto é a sua solução! ✨

Ele é um painel web simples e elegante que automatiza todo o trabalho pesado. Basta fazer o upload de uma planilha Excel com os dados das suas músicas e, com um clique, um robô faz todo o cadastro para você no sistema externo. Simples assim!

---

## 🎯 O Que o Projeto Faz?

-   📥 **Upload Simplificado:** Arraste e solte sua planilha Excel (`.xlsx`) com todos os dados das músicas diretamente na interface web.

-   ⚙️ **Processamento Inteligente:** O sistema envia sua planilha de forma segura para a nuvem, onde os dados são lidos e preparados para o cadastro.

-   🚀 **Cadastro em Massa com Um Clique:** Aperte o botão "Executar Automação" e deixe a mágica acontecer! Um robô inteligente (Playwright) abre o sistema, preenche todos os formulários e cadastra suas músicas automaticamente.

-   ⚡ **Performance Otimizada:** Se você enviar centenas ou milhares de músicas, o sistema se divide em várias "máquinas" que trabalham em paralelo para cadastrar tudo muito mais rápido.

-   📊 **Acompanhamento Fácil:** A interface oferece links diretos para você acompanhar o progresso e ver os logs de cada etapa da automação em tempo real.

---

## 🤔 Como Funciona? (A Mágica por Trás das Cortinas)

O fluxo é desenhado para ser seguro e eficiente, sem que você precise se preocupar com detalhes técnicos:

**Você (Interface Web) 💻 ➡ GitHub Actions 🧙‍♂️ ➡ Banco de Dados (Neon) 🗄️ ➡ Robô (Playwright) 🤖**

1.  **Interface Web:** É onde você interage, faz o upload e dispara a automação.
2.  **GitHub Actions:** É o "cérebro" do projeto. Ele orquestra todo o processo na nuvem, de forma segura, sem expor nenhuma senha.
3.  **Banco de Dados Neon:** Armazena temporariamente os dados da sua planilha, pronto para o robô usar.
4.  **Robô Playwright:** O trabalhador incansável que realiza os cadastros no sistema externo.

---

## 🛠️ Tecnologias Utilizadas

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **Backend & Automação**: GitHub Actions, Python
-   **Banco de Dados**: Neon (PostgreSQL)
-   **Web Scraping**: Playwright

---

## ⚙️ Como Configurar e Executar o Projeto

Siga os passos abaixo para ter o painel rodando na sua máquina.

### 1️⃣ Crie um Token de Acesso no GitHub

Isso permite que o frontend se comunique com o GitHub Actions de forma segura.

-   Vá para **GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)**.
-   Clique em **"Generate new token (classic)"**.
-   Dê um nome ao token e selecione os escopos `repo` e `workflow`.
-   Copie o token gerado (ex: `ghp_...`).

### 2️⃣ Configure os Arquivos de Ambiente

#### Frontend (`.env`)
Na pasta principal, copie `.env.example` para `.env` e configure:

```bash
# ⚠️ NUNCA EXPONHA TOKENS AQUI!
VITE_GITHUB_REPO="seu-usuario/seu-repositorio"
VITE_UPLOAD_FUNCTION_URL_DEV="http://127.0.0.1:5001/seu-projeto-firebase/us-central1/uploadFile"
VITE_UPLOAD_FUNCTION_URL_PROD="https://us-central1-seu-projeto-firebase.cloudfunctions.net/uploadFile"
VITE_ENV="dev"
```

#### Cloud Functions (`functions/.env`)
Na pasta `functions`, copie `.env.example` para `.env`:

```bash
FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"
NEON_DB_URL="postgres://usuario:senha@host:5432/database"
GITHUB_TOKEN="ghp_seu_token_aqui"
GITHUB_REPO="seu-usuario/seu-repositorio"
```

### 3️⃣ Configure os Segredos no Repositório GitHub

Estes são os dados sensíveis que o robô usará. Eles ficam guardados de forma segura no GitHub.

-   No seu repositório do GitHub, vá para **Settings > Secrets and variables > Actions**.
-   Clique em **"New repository secret"** para cada uma das variáveis abaixo:
    -   `DATABASE_URL`: A URL de conexão do seu banco de dados Neon.
    -   `TABELA`: O nome da tabela onde os dados serão salvos (ex: `cadastros`).
    -   `LOGIN_USERNAME`: O usuário de login do sistema onde o robô vai cadastrar.
    -   `LOGIN_PASSWORD`: A senha de login do sistema.
    -   `TELEGRAM_TOKEN` (Opcional): Se quiser receber notificações no Telegram.
    -   `TELEGRAM_CHAT_ID` (Opcional): O ID do seu chat no Telegram.

### 4️⃣ Instale as Dependências do Projeto

Abra um terminal na pasta do projeto e rode o comando:

```bash
npm install
```

### 5️⃣ Execute o Projeto!

Finalmente, para iniciar o painel, rode o comando:

```bash
npm run dev
```

🎉 Pronto! A aplicação estará rodando localmente e pronta para ser usada.

---

## 🗺️ Testes e Deploy

### 🧪 Testando Localmente

1. **Inicie os emuladores do Firebase:**
   ```bash
   npx firebase emulators:start
   ```

2. **Em outro terminal, inicie o frontend:**
   ```bash
   npm run dev
   ```

3. **Teste o fluxo completo:**
   - Acesse `http://localhost:8080`
   - Faça login/cadastro
   - Teste o upload de uma planilha Excel
   - Verifique o progresso no painel
   - Teste o botão "Executar Automação"

### 🚀 Deploy para GitHub Pages

1. **Configure as variáveis de produção no `.env`:**
   ```bash
   VITE_ENV="prod"
   ```

2. **Deploy das Cloud Functions:**
   ```bash
   # Configure os secrets no Firebase
   firebase functions:secrets:set NEON_DB_URL
   firebase functions:secrets:set GITHUB_TOKEN
   
   # Deploy
   firebase deploy --only functions
   ```

3. **Ative o GitHub Pages:**
   - Vá para Settings > Pages no seu repositório
   - Selecione "GitHub Actions" como source
   - O workflow `.github/workflows/deploy-gh-pages.yml` fará o deploy automaticamente

4. **Seu site estará disponível em:**
   ```
   https://seu-usuario.github.io/seu-repositorio/
   ```

### ⚙️ Configurando Secrets de Produção

Para segurança, use Firebase Secrets para credenciais sensíveis:

```bash
# Configurar secrets do Firebase
firebase functions:secrets:set NEON_DB_URL
firebase functions:secrets:set GITHUB_TOKEN
firebase functions:secrets:set GITHUB_REPO
```

E atualize a Cloud Function para usar:

```typescript
// Em functions/src/index.ts
const NEON_DB_URL = defineSecret("NEON_DB_URL");
const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");
```
