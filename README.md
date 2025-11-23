# 🎵 Procastneitor Bot - Sistema de Automação de Cadastros Musicais

> **Automação inteligente para cadastro em massa de músicas no MusicDelivery com processamento paralelo e monitoramento em tempo real.**

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/features/actions)
[![Database](https://img.shields.io/badge/database-Neon-green)](https://neon.tech)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

O **Procastneitor Bot** é um sistema completo de automação para cadastro em massa de músicas. Desenvolvido para eliminar o trabalho manual repetitivo, o sistema processa centenas ou milhares de cadastros automaticamente, com:

- ⚡ **Processamento paralelo dinâmico** (1-5 máquinas simultâneas)
- 📊 **Dashboard em tempo real** com KPIs e progresso
- 🕐 **ETA inteligente** (tempo estimado de conclusão)
- 📤 **Upload via drag-and-drop** de planilhas Excel
- 🔄 **Sistema de retry automático** para erros
- 📈 **Exportação de dados** (CSV, Excel, PDF)
- 🌐 **100% gratuito** usando tier free de serviços cloud

---

## ✨ Funcionalidades

### 1. Upload de Planilhas
- Interface drag-and-drop intuitiva
- Suporte para `.xlsx` e `.xls`
- Validação automática de formato
- Preview do modelo de planilha
- Dois modos: **Adicionar** ou **Substituir** dados

### 2. Processamento Paralelo Dinâmico
Escalonamento automático baseado no volume:
- **≤100 registros**: 1 máquina
- **101-200 registros**: 2 máquinas
- **201-300 registros**: 3 máquinas
- **301-400 registros**: 4 máquinas
- **≥401 registros**: 5 máquinas (máximo)

**Ganho de Performance**: Redução de até **80% no tempo total** para grandes lotes.

### 3. Dashboard de Monitoramento
- **KPIs em tempo real**: Total, Concluídos, Pendentes, Erros
- **Progresso visual**: Barra de progresso com porcentagem
- **ETA (Estimated Time of Arrival)**: Tempo restante calculado dinamicamente
- **Status do sistema**: Conectividade e health checks
- **Histórico de uploads**: Lista completa com timestamps

### 4. Visualização de Dados
- **DataTable interativa** com ordenação e busca
- **Status por registro**: ✅ Sucesso, ❌ Erro, ⏰ Pendente
- **Timestamps formatados**: DD-MM-YYYY HH:MM:SS
- **Exportação**: CSV, Excel, PDF com formatação automática

### 5. Gerenciamento de Erros
- **Detecção automática** de falhas durante cadastro
- **Sistema de retry** com limite configurável
- **Lista de erros detalhada** com tipo e mensagem
- **Retry manual** via interface

---

## 🏗️ Arquitetura

### Fluxo de Dados

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Browser   │─────▶│    Vercel    │─────▶│ Vercel Blob │
│  (React)    │      │  Serverless  │      │   Storage   │
└─────────────┘      └──────────────┘      └─────────────┘
                              │
                              ▼
                     ┌──────────────┐
                     │    GitHub    │
                     │   Actions    │◀─────┐
                     └──────────────┘      │
                              │            │
                     ┌────────▼────────┐   │
                     │  Neon Database  │───┘
                     │  (PostgreSQL)   │
                     └─────────────────┘
                              │
                     ┌────────▼────────┐
                     │   Playwright    │
                     │  (Headless)     │
                     └─────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  MusicDelivery  │
                     │    (Target)     │
                     └─────────────────┘
```

### Componentes

#### **Frontend (React + Vite)**
- Interface responsiva com Tailwind CSS
- Componentes modulares reutilizáveis
- Estado global com React Query
- Notificações com Sonner (toast)

#### **Backend (Vercel Serverless)**
- `/api/upload`: Recebe e armazena planilhas
- `/api/automation/start`: Inicia processamento com N jobs
- `/api/automation/status`: Status em tempo real
- `/api/automation/progress`: Progresso por upload_id
- `/api/upload-history`: Histórico de uploads

#### **Automação (GitHub Actions)**
- Workflow `automacao-cadastros.yml`
- Inputs: `run_id`, `batch_size`, `job_index`, `total_jobs`
- Timeout: 6 horas máximo
- Logs persistentes (30 dias)

#### **Database (Neon PostgreSQL)**
Tabelas principais:
- `cadastros`: Registros de músicas
- `automation_progress`: Tracking de runs
- `automation_errors`: Log de erros
- `upload_history`: Histórico de uploads

#### **Bot (Python + Playwright)**
- Login automatizado
- Preenchimento de formulários
- Tratamento de erros
- Atualização de progresso a cada registro
- Particionamento via modulo matemático

---

## 🛠️ Tecnologias

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Server state
- **Recharts** - Gráficos

### Backend
- **Vercel Serverless Functions** - Node.js
- **Vercel Blob** - Object storage
- **GitHub REST API** - Workflow dispatch

### Automação
- **Python 3.11**
- **Playwright** - Web automation
- **psycopg2** - PostgreSQL driver
- **pandas** - Data manipulation
- **tqdm** - Progress bars

### Infrastructure
- **Neon** - Serverless PostgreSQL
- **GitHub Actions** - CI/CD + Compute
- **GitHub Pages** - Static hosting

---

## ⚙️ Configuração

### 1. Pré-requisitos
- Conta GitHub
- Conta Vercel
- Conta Neon (PostgreSQL)
- Node.js 18+
- npm ou yarn

### 2. Clone do Repositório
```bash
git clone https://github.com/RodrigoMD2025/cadastrosmd-automation-web.git
cd cadastrosmd-automation-web
npm install
```

### 3. Banco de Dados (Neon)

Crie um projeto no [Neon](https://neon.tech) e execute o schema:

```sql
-- Tabela principal de cadastros
CREATE TABLE cadastros (
    id SERIAL PRIMARY KEY,
    "ISRC" VARCHAR(12),
    "ARTISTA" TEXT,
    "TITULARES" TEXT,
    "PAINEL_NEW" VARCHAR(50),
    "CADASTRADO" TIMESTAMP
);

-- Tabela de progresso de automação
CREATE TABLE automation_progress (
    run_id VARCHAR(50) PRIMARY KEY,
    status VARCHAR(20),
    total_records INTEGER,
    processed_records INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_complete BOOLEAN DEFAULT FALSE
);

-- Tabela de erros
CREATE TABLE automation_errors (
    id SERIAL PRIMARY KEY,
    run_id VARCHAR(50),
    isrc VARCHAR(12),
    artista TEXT,
    error_type VARCHAR(100),
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de histórico de uploads
CREATE TABLE upload_history (
    upload_id VARCHAR(50) PRIMARY KEY,
    filename TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_records INTEGER,
    processed_records INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    is_complete BOOLEAN DEFAULT FALSE
);
```

### 4. Variáveis de Ambiente

#### **Vercel (Project Settings → Environment Variables)**
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxx  # Personal Access Token (workflow scope)
GITHUB_REPO=RodrigoMD2025/cadastrosmd-automation-web
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx  # Auto-generated
```

#### **GitHub (Settings → Secrets → Actions)**
```bash
DATABASE_URL=postgresql://user:pass@host/db
TABELA=cadastros
LOGIN_USERNAME=seu_usuario
LOGIN_PASSWORD=sua_senha
TELEGRAM_TOKEN=123456:ABC-DEF...  # Opcional
TELEGRAM_CHAT_ID=987654321  # Opcional
```

#### **Local (.env para desenvolvimento)**
```bash
VITE_API_URL=http://localhost:3000  # ou URL do Vercel
DATABASE_URL=postgresql://user:pass@host/db
```

### 5. Deploy

#### **Vercel (Automático)**
1. Conecte seu repositório GitHub à Vercel
2. Vercel detecta automaticamente o projeto Vite
3. Configure as variáveis de ambiente
4. Deploy automático a cada push na `main`

#### **GitHub Pages (Frontend)**
```bash
npm run build
npx gh-pages -d dist
```

Acesse em: `https://RodrigoMD2025.github.io/cadastrosmd-automation-web/`

---

## 📖 Uso

### Upload de Planilha

1. **Prepare sua planilha** com as colunas obrigatórias:
   - `ISRC` (12 caracteres)
   - `ARTISTA` (nome do artista)
   - `TITULARES` (separados por vírgula)

2. **Acesse o painel** e vá para a página "Upload"

3. **Arraste a planilha** ou clique para selecionar

4. **Escolha o modo**:
   - **Adicionar**: Mantém dados existentes
   - **Substituir**: Apaga tudo antes de importar

5. **Clique em "Fazer Upload"**

### Iniciar Automação

1. **Dashboard**: Visualize os KPIs atualizados
2. **Clique em "Iniciar Cadastros"**
3. **Sistema calcula automaticamente** quantas máquinas usar
4. **Acompanhe em tempo real**:
   - Progresso (%)
   - Tempo decorrido
   - ETA (tempo restante)
   - Sucessos vs Erros

### Visualizar Dados

1. **"Dados Cadastrados"**: Veja todos os registros processados
2. **Ordenação**: Clique nos cabeçalhos das colunas
3. **Busca**: Use o campo de pesquisa
4. **Exportar**: Botões CSV, Excel ou PDF

### Gerenciar Erros

1. **Dashboard**: Veja o contador de "Falhas Recentes"
2. **Clique em "Ver Erros Detalhados"**
3. **Analise** tipo de erro e mensagem
4. **Retry manual** se necessário

---

## ⚡ Performance

### Benchmarks

| Registros | Máquinas | Tempo (antes) | Tempo (depois) | Redução |
|-----------|----------|---------------|----------------|---------|
| 100       | 1        | ~33 min       | ~33 min        | 0%      |
| 200       | 2        | ~67 min       | ~35 min        | 48%     |
| 300       | 3        | ~100 min      | ~33 min        | 67%     |
| 500       | 5        | ~167 min      | ~33 min        | 80%     |

**Tempo médio por registro**: ~20 segundos

### Otimizações Implementadas

1. **Processamento Paralelo**: Modulo-based partitioning
2. **Timeouts Reduzidos**: 25s total, 5s/3s seletores
3. **Wait Optimization**: `domcontentloaded` ao invés de `networkidle`
4. **Progresso Real-time**: Atualização a cada registro (não em batch)
5. **Database Pooling**: Conexões reutilizadas

---

## 🐛 Troubleshooting

### Upload Falha

**Problema**: Erro ao fazer upload de planilha

**Soluções**:
- Verifique se o arquivo é `.xlsx` ou `.xls`
- Confirme que as colunas `ISRC`, `ARTISTA`, `TITULARES` existem
- Verifique o tamanho do arquivo (< 5MB)
- Tente com uma planilha menor primeiro

### Automação Não Inicia

**Problema**: Botão "Iniciar Cadastros" não funciona

**Soluções**:
- Verifique se há registros pendentes (`PAINEL_NEW IS NULL`)
- Confirme que não há outra automação rodando
- Check GitHub Actions quota (2000 min/mês free tier)
- Verifique logs da Vercel Function

### Progresso Não Atualiza

**Problema**: Dashboard mostra progresso parado

**Soluções**:
- Aguarde 3-5 segundos (intervalo de polling)
- Verifique conexão internet
- Clique em "Atualizar" manualmente
- Check GitHub Actions logs

### Erro de Timeout

**Problema**: Job do GitHub Actions timeout após 6h

**Soluções**:
- Reduza o batch size (ex: 50 ao invés de 100)
- Aumente o número de máquinas manualmente
- Verifique se o site externo está lento
- Divida em múltiplos uploads menores

---

## 📊 Limites e Quotas

### GitHub Actions (Free Tier)
- ✅ 2.000 minutos/mês
- ✅ 20 jobs simultâneos
- ✅ 6h timeout por job

### Vercel (Hobby Plan)
- ✅ 100 GB-Hrs serverless functions/mês
- ✅ 100 GB bandwidth/mês
- ✅ 500 MB Blob storage
- ✅ 5 GB Blob bandwidth/mês

### Neon (Free Tier)
- ✅ 0.5 GB storage
- ✅ 1 database
- ✅ 10 GB data transfer/mês

**Custo Total**: **R$ 0,00/mês** 🎉

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é proprietário e confidencial.

---

## 👨‍💻 Autor

**Rodrigo MD**
- GitHub: [@RodrigoMD2025](https://github.com/RodrigoMD2025)

---

## 🙏 Agradecimentos

- **Vercel** - Hosting e serverless functions
- **GitHub** - Actions e repository hosting
- **Neon** - Serverless PostgreSQL
- **Playwright** - Web automation framework

---

**Desenvolvido com ❤️ para automatizar o impossível.**