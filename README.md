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

**Você (Interface Web) 💻 ➡ Vercel Serverless Function ☁️ ➡ Vercel Blob 📦 ➡ GitHub Actions 🧙‍♂️ ➡ Banco de Dados (Neon) 🗄️ ➡ Robô (Playwright) 🤖**

1.  **Interface Web:** É onde você interage, faz o upload e dispara a automação.
2.  **Vercel Serverless Function:** Um pequeno "backend" gratuito que recebe seu arquivo, armazena no Vercel Blob e dispara o GitHub Actions.
3.  **Vercel Blob:** Armazenamento de objetos gratuito e seguro para suas planilhas.
4.  **GitHub Actions:** É o "cérebro" do projeto. Ele orquestra todo o processo na nuvem, de forma segura, sem expor nenhuma senha.
5.  **Banco de Dados Neon:** Armazena temporariamente os dados da sua planilha, pronto para o robô usar.
6.  **Robô Playwright:** O trabalhador incansável que realiza os cadastros no sistema externo.

---

## 🛠️ Tecnologias Utilizadas

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **Backend (Serverless)**: Vercel Serverless Functions (Node.js)
-   **Armazenamento**: Vercel Blob
-   **Automação**: GitHub Actions, Python
-   **Banco de Dados**: Neon (PostgreSQL)
-   **Web Scraping**: Playwright

---

## ⚙️ Como Configurar e Executar o Projeto

Siga os passos abaixo para ter o painel rodando na sua máquina e a automação funcionando.

### 1️⃣ Crie seu Projeto na Vercel

Isso irá hospedar as funções serverless que intermediam o frontend e o GitHub Actions.

-   Acesse [https://vercel.com](https://vercel.com) e faça login com o GitHub.
-   Crie um **New Project** e importe seu repositório `RodrigoMD2025/cadastrosmd-automation-web`.
-   A Vercel fará um deploy inicial. Anote a URL do seu projeto Vercel (ex: `https://seu-projeto.vercel.app`).

### 2️⃣ Configure Environment Variables na Vercel

Estas variáveis são essenciais para suas funções Vercel se comunicarem com o GitHub.

-   No seu Dashboard da Vercel, selecione seu projeto.
-   Vá em **Settings > Environment Variables**.
-   Adicione as seguintes variáveis:
    -   `GITHUB_TOKEN`: Seu Personal Access Token (PAT) do GitHub com permissão `workflow`.
    -   `GITHUB_REPO`: O nome do seu repositório no formato `usuario/repositorio` (ex: `RodrigoMD2025/cadastrosmd-automation-web`).
    -   `BLOB_READ_WRITE_TOKEN`: Este é gerado automaticamente pela Vercel quando você usa `@vercel/blob`. Não precisa criar manualmente.

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

### 4️⃣ Atualize a URL da API no Frontend

O frontend precisa saber onde encontrar suas funções Vercel.

-   Edite os arquivos `src/components/UploadDialog.tsx` e `src/components/PlaywrightTrigger.tsx`.
-   Substitua a constante `API_URL` (que está como `'https://YOUR_VERCEL_PROJECT_URL/api'`) pela URL real do seu projeto Vercel, seguida de `/api`.
    *   **Exemplo:** Se a URL do seu projeto Vercel for `https://meu-projeto.vercel.app`, a `API_URL` será `https://meu-projeto.vercel.app/api`.

### 5️⃣ Instale as Dependências do Projeto (Localmente)

Abra um terminal na pasta do projeto e rode o comando para instalar as novas dependências:

```bash
npm install
```

### 6️⃣ Execute o Projeto Localmente!

Para iniciar o painel localmente:

```bash
npm run dev
```

🎉 Pronto! A aplicação estará rodando localmente e pronta para ser usada.

---

## 🚀 Deploy para GitHub Pages

Para ter seu painel online:

1.  **Faça o build da aplicação:**
    ```bash
    npm run build
    ```

2.  **Publique no GitHub Pages:**
    ```bash
    npx gh-pages -d dist
    ```

3.  **Seu site estará disponível em:**
    ```
    https://RodrigoMD2025.github.io/cadastrosmd-automation-web/
    ```

---

## 🗺️ Testes

1.  **Teste o Upload de Planilha:**
    *   Acesse seu site no GitHub Pages.
    *   Faça login/cadastro.
    *   Tente fazer o upload de uma planilha Excel.
    *   Verifique se uma nova execução aparece na aba "Actions" do seu repositório GitHub.

2.  **Teste o Trigger do Playwright:**
    *   Clique no botão "Executar Automação".
    *   Verifique se uma nova execução aparece na aba "Actions" do seu repositório GitHub.

---

## 💰 Custos (100% Gratuito)

-   **Vercel Serverless Functions**: 100GB-Hrs/mês grátis
-   **Vercel Blob**: 500MB storage + 5GB bandwidth/mês grátis
-   **GitHub Actions**: 2.000 minutos/mês grátis
-   **Neon PostgreSQL**: 0.5GB grátis

**Total: R$ 0,00/mês 🎉**

---

## ✅ Vantagens Finais

✅ **Sem cartão de crédito** - 100% gratuito
✅ **Tudo na Vercel** - Mais simples de gerenciar
✅ **Edge Functions** - Rápido globalmente
✅ **Auto-deploy** - Push no GitHub = deploy automático
✅ **Limites generosos** - Bem acima do seu uso