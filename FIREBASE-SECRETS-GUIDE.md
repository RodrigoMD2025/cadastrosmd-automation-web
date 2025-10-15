# 🔥 Firebase Secrets Configuration Guide

## 📋 Frontend vs Backend Secrets

### 🌐 **Frontend Secrets (VITE_*)**
- **Onde:** GitHub Secrets para build do frontend
- **Quando:** Durante o build do GitHub Pages
- **Propósito:** Configurar URLs e variáveis para o frontend em produção

### 🔧 **Backend Secrets (Firebase Functions)**
- **Onde:** Firebase Secrets (mais seguro)
- **Quando:** Durante execução das Cloud Functions
- **Propósito:** Credenciais sensíveis do backend

---

## 🔥 Como Obter Frontend Secrets do Firebase

### 1. **VITE_UPLOAD_FUNCTION_URL_PROD**

#### Opção A: Deploy das Functions (Recomendado)
```bash
# 1. Upgrade para plano Blaze
# https://console.firebase.google.com/project/automacao-neon-auth/usage/details

# 2. Deploy das functions
firebase deploy --only functions

# 3. Copie a URL que aparece no output
# Exemplo: https://us-central1-automacao-neon-auth.cloudfunctions.net/uploadFile
```

#### Opção B: Firebase Console
1. **Acesse:** https://console.firebase.google.com/project/automacao-neon-auth/functions
2. **Copie a URL** da função `uploadFile`
3. **Formato:** `https://us-central1-automacao-neon-auth.cloudfunctions.net/uploadFile`

#### Opção C: Comando Firebase
```bash
# Listar functions deployadas
firebase functions:list

# Ver logs com URLs
firebase functions:log
```

---

## 🔐 Firebase Secrets vs GitHub Secrets

### **Firebase Secrets (Backend)**
```bash
# Configurar secrets no Firebase
firebase functions:secrets:set NEON_DB_URL
firebase functions:secrets:set GITHUB_TOKEN
firebase functions:secrets:set GITHUB_REPO

# Usar nos functions/src/index.ts
const NEON_DB_URL = defineSecret("NEON_DB_URL");
const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");
```

### **GitHub Secrets (Frontend + Workflows)**
```yaml
# No .github/workflows/deploy-gh-pages.yml
env:
  VITE_UPLOAD_FUNCTION_URL_PROD: ${{ secrets.VITE_UPLOAD_FUNCTION_URL_PROD }}

# No .github/workflows/upload-excel.yml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  TABELA: ${{ secrets.TABELA }}
```

---

## 🚀 Configuração Completa

### **Passo 1: Deploy das Functions**
```bash
# Upgrade para Blaze
# https://console.firebase.google.com/project/automacao-neon-auth/usage/details

# Deploy
firebase deploy --only functions

# Copiar URL do output
```

### **Passo 2: Configurar GitHub Secrets**
1. **Acesse:** https://github.com/RodrigoMD2025/cadastrosmd-automation-web/settings/secrets/actions
2. **Adicione:**
   - `VITE_UPLOAD_FUNCTION_URL_PROD` = URL das functions
   - `DATABASE_URL` = URL do Neon
   - `TABELA` = `cadastros`
   - `LOGIN_USERNAME` = Seu usuário
   - `LOGIN_PASSWORD` = Sua senha

### **Passo 3: Configurar Firebase Secrets (Opcional)**
```bash
# Para usar Firebase Secrets em vez de GitHub Secrets
firebase functions:secrets:set NEON_DB_URL
firebase functions:secrets:set GITHUB_TOKEN
firebase functions:secrets:set GITHUB_REPO
```

---

## 💡 Alternativa: Apenas GitHub Actions (Sem Firebase Functions)

Se não quiser usar Firebase Functions, o sistema pode funcionar apenas com GitHub Actions:

### **Configuração Simplificada:**
1. **Frontend:** GitHub Pages (apenas interface)
2. **Backend:** GitHub Actions (processamento)
3. **Automação:** Scripts Python no GitHub Actions

### **Secrets Necessários (Apenas GitHub):**
- `DATABASE_URL`
- `TABELA`
- `LOGIN_USERNAME`
- `LOGIN_PASSWORD`
- `TELEGRAM_TOKEN` (opcional)
- `TELEGRAM_CHAT_ID` (opcional)

---

## 🔍 Verificar URLs das Functions

### **Método 1: Firebase Console**
1. https://console.firebase.google.com/project/automacao-neon-auth/functions
2. Copiar URL da função `uploadFile`

### **Método 2: Terminal**
```bash
firebase functions:list
```

### **Método 3: Logs**
```bash
firebase functions:log --only uploadFile
```

---

## ⚠️ Importante

- **Frontend URLs:** Precisam estar no GitHub Secrets para o build
- **Backend Credentials:** Podem estar no Firebase Secrets (mais seguro)
- **GitHub Actions:** Sempre precisam estar no GitHub Secrets
- **Local Development:** Use arquivos `.env`

---

## 🎯 Recomendação

**Para máxima segurança:**
1. **Firebase Secrets:** Para credenciais do backend
2. **GitHub Secrets:** Para URLs do frontend e GitHub Actions
3. **Local .env:** Para desenvolvimento local
