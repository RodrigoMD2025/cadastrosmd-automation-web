#
# 🚀 Novo Fluxo: Upload via GitHub API e Processamento no GitHub Actions

## Passo a Passo

1. **Login do usuário via Google (Firebase Authentication)**
2. **Upload do arquivo Excel pelo frontend React**
  - O arquivo é enviado diretamente para o repositório do GitHub usando a API REST
  - O upload é feito na pasta `uploads/` do repositório
  - Autenticação via token pessoal do GitHub
3. **Disparo automático do GitHub Actions**
  - O workflow é configurado para rodar ao detectar novo arquivo na pasta `uploads/`
  - O script Python do Neon é executado dentro do container do GitHub Actions
  - Secrets do GitHub são usados para garantir segurança no processamento
4. **Resultado do processamento**
  - O resultado pode ser salvo em banco de dados, enviado por e-mail ou exibido no painel

## Vantagens
- Sem custos extras de backend
- Segurança garantida pelos secrets do GitHub
- Flexibilidade para rodar scripts Python

## Observações
- O token do GitHub deve ser mantido seguro e nunca exposto no frontend público
- O workflow pode ser adaptado para diferentes tipos de processamento
# Histórico do Projeto - Sistema de Automação com Firebase e Neon

## 📋 Visão Geral do Projeto

Sistema web para automatizar o upload de dados de planilhas Excel para o banco de dados Neon e iniciar processos de automação via GitHub Actions.

### Componentes Principais
- **Frontend**: Aplicação React hospedada no GitHub Pages
- **Autenticação**: Firebase Authentication (email/senha)
- **Backend**: Firebase Cloud Functions
- **Banco de Dados**: Neon (PostgreSQL)
- **Automação**: GitHub Actions para web scraping

---

## 🏗️ Arquitetura do Sistema

### 1. Frontend (flow-trigger-graph-main)
- **Tecnologias**: React, Vite, TypeScript, Tailwind CSS
- **Hospedagem**: GitHub Pages
- **Funcionalidades**:
  - Login/Cadastro de usuários
  - Upload de planilhas Excel
  - Botão para iniciar automação (GitHub Actions)

### 2. Backend (Firebase Cloud Functions)
- **Linguagem**: TypeScript/Node.js
- **Serviços**:
  - `uploadFile`: Processa planilhas e insere dados no Neon
  - Trigger para GitHub Actions (a implementar)

### 3. Automação Python (cadastrosmd-automation-neon-master)
- **Bibliotecas**: pandas, psycopg2-binary, playwright
- **Função**: Web scraping e cadastro em sistema externo

---

## 🔧 Configuração Realizada

### Passo 1: Remoção do Supabase
- ✅ Removida dependência `@supabase/supabase-js` do `package.json`
- ✅ Deletada pasta `src/integrations/supabase`

### Passo 2: Instalação do Firebase
- ✅ Adicionada dependência `firebase: ^10.12.2`
- ✅ Criado arquivo `src/integrations/firebase/client.ts`

### Passo 3: Configuração do Firebase Authentication

**Arquivo**: `src/integrations/firebase/client.ts`

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAa78S1-3wO4kiJ2oFf7gUhaxSCfwKX4_E",
  authDomain: "automacao-neon-auth.firebaseapp.com",
  projectId: "automacao-neon-auth",
  storageBucket: "automacao-neon-auth.appspot.com",
  messagingSenderId: "292826330421",
  appId: "1:292826330421:web:b03faaa180c53cafbf887c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export default app;
```

### Passo 4: Migração da Autenticação

**Arquivo**: `src/pages/Auth.tsx`

Principais alterações:
- ✅ `signInWithEmailAndPassword()` para login
- ✅ `createUserWithEmailAndPassword()` para cadastro
- ✅ `onAuthStateChanged()` para monitorar estado de autenticação
- ✅ Tratamento de erros específicos do Firebase:
  - `auth/invalid-credential`
  - `auth/user-not-found`
  - `auth/wrong-password`
  - `auth/email-already-in-use`

### Passo 5: Instalação de Dependências
```bash
npm install  # Instaladas 471 pacotes
```

---

## 🔥 Configuração do Firebase Cloud Functions

### Estrutura de Arquivos Criada

```
flow-trigger-graph-main/
├── .firebaserc
├── firebase.json
└── functions/
    ├── package.json
    ├── tsconfig.json
    └── src/
        └── index.ts
```

### Arquivo `.firebaserc`
```json
{
  "projects": {
    "default": "automacao-neon-auth"
  }
}
```

### Arquivo `firebase.json`
```json
{
  "functions": {
    "source": "functions"
  }
}
```

### Dependências do Backend

**Instaladas**:
- `firebase-admin: ^12.0.0`
- `firebase-functions: ^5.0.0`
- `busboy: ^1.6.0` - Upload de arquivos
- `cors: ^2.8.5` - Permitir chamadas do frontend
- `pg: ^8.12.0` - Conexão com PostgreSQL/Neon
- `xlsx: ^0.18.5` - Processamento de planilhas Excel

### Cloud Function: uploadFile

**Funcionalidades**:
1. ✅ Aceita apenas requisições POST
2. ✅ Valida token de autenticação do Firebase
3. ✅ Recebe arquivo Excel via multipart/form-data
4. ✅ Processa planilha com xlsx
5. ✅ Conecta ao banco Neon via PostgreSQL
6. ✅ Insere dados em transação (COMMIT/ROLLBACK)
7. ✅ Logs detalhados para debug

**Segurança**: URL do banco de dados armazenada como segredo do Firebase

---

## 🗄️ Configuração do Banco de Dados Neon

### Credenciais do Ambiente de Teste
- **Host**: `ep-old-cherry-acjq873k-pooler.sa-east-1.aws.neon.tech`
- **Porta**: `5432`
- **Database**: `neondb`
- **Usuário**: `neondb_owner`

### URL de Conexão (formato)
```
postgres://neondb_owner:SUA_SENHA@ep-old-cherry-acjq873k-pooler.sa-east-1.aws.neon.tech:5432/neondb
```

### Estrutura de Tabela (Exemplo)
```sql
CREATE TABLE cadastros (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50)
);
```

**⚠️ IMPORTANTE**: Ajustar nomes de colunas no código da Cloud Function conforme sua estrutura real.

---

## 🚀 Sessão de Desenvolvimento e Depuração (13/10/2025)

Nesta sessão, realizamos uma extensa refatoração e depuração para alinhar o projeto com os requisitos de segurança, feedback de UI e performance.

### 1. Mudanças de Arquitetura

- **Tentativa 1 (GitHub Actions Puro):** Inicialmente, o projeto foi refatorado para usar GitHub Actions como backend, eliminando a necessidade do Firebase para processamento. Isso simplificou o deploy, mas removeu a possibilidade de uma tela de login e de uma barra de progresso em tempo real.

- **Tentativa 2 (Arquitetura Híbrida - A Escolhida):** Após o usuário solicitar a volta da tela de login e da barra de progresso, o projeto foi novamente refatorado para uma arquitetura híbrida, combinando o melhor dos dois mundos:
  - ✅ **Firebase Authentication:** Para uma tela de login segura.
  - ✅ **Firebase Cloud Functions:** Para orquestrar o upload, processar a planilha e fornecer dados de progresso em tempo real para o frontend via Firestore.
  - ✅ **GitHub Actions:** Mantido para a tarefa pesada de automação com Playwright, garantindo performance com processamento em paralelo.

### 2. Depuração e Correções (Falhas e Acertos)

Durante a implementação da arquitetura híbrida, enfrentamos e resolvemos uma série de desafios de configuração:

- **Falha 1: Emulador não iniciava (Erro: `.../lib/index.js does not exist`)**
  - **Causa:** O código TypeScript das funções (`.ts`) não estava sendo compilado para JavaScript (`.js`).
  - **Acerto:** Adicionamos um script `"build": "tsc"` ao `functions/package.json`.

- **Falha 2: Compilação falhava (Erros: `Int32Array`, `node-fetch`, `ImageData`)**
  - **Causa:** Conflitos de versão de dependências e configurações do TypeScript.
  - **Acerto:** Realizamos um conjunto de correções: atualizamos a versão do `typescript` no `functions/package.json`, removemos a importação desnecessária do `node-fetch`, e ajustamos o `tsconfig.json` para incluir a biblioteca `"dom"`, resolvendo os conflitos.

- **Falha 3: Erro de Autenticação no Upload (Erro: `Unauthorized`)**
  - **Causa:** O emulador de Funções não estava se comunicando com o emulador de Autenticação para validar os tokens de login.
  - **Acerto:** Adicionamos a variável `FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"` ao arquivo `functions/.env` para forçar a comunicação entre os emuladores.

- **Falha 4: Erro de Rede no Upload (Erro: `Failed to fetch` / `CORS`)**
  - **Causa:** A requisição de verificação (`OPTIONS`) do navegador estava sendo mal interpretada pela função, que tentava processar um upload de arquivo inexistente, causando a falha antes de dar a permissão de CORS.
  - **Acerto:** Reestruturamos a Cloud Function `uploadFile` para primeiro lidar com a verificação de CORS e só depois executar a lógica de upload, resolvendo o problema.

- **Falha 5: Emulador não carregava variáveis de ambiente (Erro: `Failed to load .env`)**
  - **Causa:** Sintaxe incorreta no arquivo `functions/.env`, provavelmente por caracteres especiais na URL do Neon ou no token do GitHub.
  - **Acerto:** Orientamos o usuário a garantir que todos os valores no arquivo `functions/.env` estivessem entre aspas duplas (`"..."`).

### 3. Status Atual e Próximos Passos

- ✅ **O que funciona:**
  - A aplicação frontend inicia sem erros (`npm run dev`).
  - Os emuladores do Firebase (Auth, Functions, Firestore) iniciam corretamente.
  - O fluxo de **autenticação local** (cadastro e login de usuário) está 100% funcional.
  - A comunicação entre o frontend e o backend (Cloud Functions) está estabelecida, sem erros de CORS ou rede.

- ❗ **O que falta corrigir:**
  - **O processamento do upload do arquivo Excel está falhando silenciosamente.** Agora que todos os problemas de configuração foram resolvidos, o próximo passo é investigar o **log de execução da Cloud Function `uploadFile`** no terminal do emulador para encontrar o erro de lógica que está impedindo o processamento da planilha e a inserção dos dados no Neon.

---

## 📞 Informações do Projeto

- **Projeto Firebase**: automacao-neon-auth
- **Localização**: `C:\Users\Suporte\Downloads\Analise projetos\flow-trigger-graph-main`
- **Node Version**: v22.18.0
- **NPM Version**: 10.9.3

---

## 📚 Documentação de Referência

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Neon PostgreSQL](https://neon.tech/docs)
- [GitHub Actions](https://docs.github.com/actions)

---

**Última Atualização**: Projeto com arquitetura híbrida implementada e ambiente de desenvolvimento local estabilizado. Aguardando depuração da lógica de processamento de arquivo na Cloud Function.
