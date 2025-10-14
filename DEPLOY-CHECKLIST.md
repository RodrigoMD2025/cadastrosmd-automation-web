# 🚀 Checklist de Deploy - Sistema de Automação Musical

## ✅ Pré-requisitos

- [ ] Firebase CLI instalado (`firebase --version`)
- [ ] Node.js 18+ instalado
- [ ] Conta Firebase configurada
- [ ] Banco Neon configurado
- [ ] Token GitHub com permissões `repo` e `workflow`

## 🔐 Configuração de Segurança

### Arquivos de Ambiente
- [ ] `.env` configurado (sem tokens sensíveis)
- [ ] `functions/.env` configurado com credenciais locais
- [ ] `.env.example` atualizado
- [ ] `functions/.env.example` atualizado
- [ ] Arquivos `.env` adicionados ao `.gitignore`

### Firebase Secrets (Produção)
```bash
firebase functions:secrets:set NEON_DB_URL
firebase functions:secrets:set GITHUB_TOKEN  
firebase functions:secrets:set GITHUB_REPO
```

## 🧪 Testes Locais

### Ambiente de Desenvolvimento
- [ ] `npm install` executado
- [ ] `cd functions && npm install` executado
- [ ] `cd functions && npm run build` sem erros
- [ ] `firebase emulators:start` funcionando
- [ ] `npm run dev` funcionando
- [ ] Interface carregando em `http://localhost:8080`

### Fluxo Completo
- [ ] Login/cadastro funcionando
- [ ] Upload de planilha funcionando
- [ ] Progresso em tempo real funcionando
- [ ] Processamento de dados no Neon funcionando
- [ ] Trigger de automação funcionando

## ☁️ Deploy Backend (Firebase Functions)

```bash
# 1. Build local
cd functions
npm run build

# 2. Deploy
firebase deploy --only functions

# 3. Verificar URL da função
firebase functions:list
```

- [ ] Deploy das functions sem erros
- [ ] URLs das functions copiadas para `.env` de produção
- [ ] Teste da function em produção

## 🌐 Deploy Frontend (GitHub Pages)

### Configuração
- [ ] `VITE_ENV="prod"` no workflow
- [ ] URLs de produção configuradas no workflow
- [ ] GitHub Pages ativado no repositório
- [ ] Workflow `deploy-gh-pages.yml` criado

### Deploy
```bash
# 1. Commit e push das mudanças
git add .
git commit -m "🚀 Deploy para produção"
git push origin main

# 2. Verificar workflow no GitHub Actions
# 3. Verificar site em https://seu-usuario.github.io/repo/
```

- [ ] Workflow executado sem erros
- [ ] Site funcionando na URL do GitHub Pages
- [ ] Todas as funcionalidades testadas em produção

## 🔧 Configuração GitHub Actions

### Secrets do Repositório
No GitHub: Settings > Secrets and variables > Actions

- [ ] `DATABASE_URL` (mesmo valor que NEON_DB_URL)
- [ ] `TABELA` (nome da tabela, ex: `cadastros`)
- [ ] `LOGIN_USERNAME` (credenciais do sistema externo)
- [ ] `LOGIN_PASSWORD` (credenciais do sistema externo)
- [ ] `TELEGRAM_TOKEN` (opcional - notificações)
- [ ] `TELEGRAM_CHAT_ID` (opcional - notificações)

## 📊 Monitoramento

- [ ] Logs do Firebase Functions
- [ ] Logs do GitHub Actions
- [ ] Métricas de uso do Firebase
- [ ] Status do banco Neon
- [ ] Artifacts dos workflows

## 🛡️ Segurança Final

### Verificações
- [ ] Nenhum token exposto no código
- [ ] URLs de produção corretas
- [ ] CORS configurado adequadamente
- [ ] Rate limiting considerado
- [ ] Logs não expondo dados sensíveis

### Backup
- [ ] Backup do banco de dados
- [ ] Backup das configurações do Firebase
- [ ] Documentação das configurações

## 🎉 Go Live!

- [ ] Site funcionando: https://seu-usuario.github.io/repo/
- [ ] Upload de planilhas funcionando
- [ ] Automação com Playwright funcionando
- [ ] Monitoramento ativo
- [ ] Usuários notificados

---

## 🆘 Troubleshooting

### Problemas Comuns

**Firebase Functions não fazem deploy:**
- Verificar versão do Node.js
- Executar `npm run build` na pasta functions
- Verificar logs: `firebase functions:log`

**GitHub Pages não carrega:**
- Verificar configuração do repository
- Verificar workflow logs
- Verificar se base path está correto

**Upload não funciona:**
- Verificar URL da função
- Verificar CORS
- Verificar logs do Firebase

### Comandos Úteis

```bash
# Logs em tempo real
firebase functions:log --follow

# Status dos emuladores
firebase emulators:exec "echo 'Emulators running'"

# Build de produção
npm run build

# Teste de conectividade
curl -X POST https://sua-function-url.com/uploadFile
```