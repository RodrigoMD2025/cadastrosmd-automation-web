# 💰 Firebase Pricing Guide - Cloud Functions

## 🔥 Planos do Firebase

### **Spark Plan (Gratuito)**
- ✅ **Hospedagem Web:** Ilimitada
- ✅ **Firebase Auth:** 10k usuários/mês
- ✅ **Firestore:** 1GB storage, 20k reads/dia
- ❌ **Cloud Functions:** NÃO DISPONÍVEL

### **Blaze Plan (Pay-as-you-go)**
- ✅ **Hospedagem Web:** Ilimitada
- ✅ **Firebase Auth:** Ilimitado
- ✅ **Firestore:** Ilimitado
- ✅ **Cloud Functions:** DISPONÍVEL
- 💰 **Preço:** Pay-per-use (muito barato para uso pessoal)

---

## 💡 Alternativas GRATUITAS

### **Opção 1: Apenas GitHub Actions (Recomendado)**
- ✅ **100% Gratuito**
- ✅ **Funcionalidade completa**
- ✅ **Sem necessidade de cartão de crédito**

**Como funciona:**
```
Frontend (GitHub Pages) → GitHub Actions → Scripts Python → Neon DB
```

### **Opção 2: Firebase Hosting + GitHub Actions**
- ✅ **Frontend:** Firebase Hosting (gratuito)
- ✅ **Backend:** GitHub Actions (gratuito)
- ✅ **Sem Cloud Functions**

### **Opção 3: Upgrade para Blaze**
- 💰 **Custo:** ~$0.01-0.10/mês para uso pessoal
- ✅ **Funcionalidade completa**
- ✅ **Mais seguro (Firebase Secrets)**

---

## 🚀 Configuração Gratuita (GitHub Actions)

### **Vantagens:**
- ✅ **100% Gratuito**
- ✅ **2.000 minutos/mês** de GitHub Actions
- ✅ **Funcionalidade completa**
- ✅ **Sem necessidade de cartão**

### **Como configurar:**
1. **Frontend:** GitHub Pages
2. **Upload:** GitHub Actions (workflow upload-excel.yml)
3. **Automação:** GitHub Actions (workflow run-playwright.yml)
4. **Banco:** Neon (gratuito até 0.5GB)

---

## 💰 Custo do Plano Blaze

### **Cloud Functions:**
- **Invocations:** $0.40 por 1M requests
- **Compute time:** $0.0000025 por GB-second
- **Networking:** $0.12 por GB

### **Exemplo de Custo Mensal:**
```
100 uploads/mês = ~$0.01
1.000 automações/mês = ~$0.05
Total: ~$0.06/mês
```

---

## 🎯 Recomendação

### **Para Uso Pessoal/Pequeno:**
**Use GitHub Actions (100% gratuito)**
- Funcionalidade completa
- Sem custos
- Fácil configuração

### **Para Uso Profissional/Comercial:**
**Upgrade para Blaze**
- Mais seguro
- Melhor performance
- Firebase Secrets
- Custo muito baixo

---

## 🔧 Como Configurar GitHub Actions (Gratuito)

### **1. Frontend (GitHub Pages)**
```yaml
# .github/workflows/deploy-gh-pages.yml
# Já configurado no projeto
```

### **2. Upload (GitHub Actions)**
```yaml
# .github/workflows/upload-excel.yml
# Já configurado no projeto
```

### **3. Automação (GitHub Actions)**
```yaml
# .github/workflows/run-playwright.yml
# Já configurado no projeto
```

### **4. Secrets Necessários (GitHub)**
- `DATABASE_URL`
- `TABELA`
- `LOGIN_USERNAME`
- `LOGIN_PASSWORD`
- `TELEGRAM_TOKEN` (opcional)
- `TELEGRAM_CHAT_ID` (opcional)

---

## 📊 Comparação de Custos

| Funcionalidade | Spark (Grátis) | Blaze (Pago) | GitHub Actions (Grátis) |
|----------------|----------------|--------------|-------------------------|
| Frontend | ✅ GitHub Pages | ✅ Firebase Hosting | ✅ GitHub Pages |
| Upload | ❌ | ✅ Cloud Functions | ✅ GitHub Actions |
| Automação | ❌ | ✅ Cloud Functions | ✅ GitHub Actions |
| Banco | ✅ Neon (0.5GB) | ✅ Neon (0.5GB) | ✅ Neon (0.5GB) |
| **Custo** | **$0** | **~$0.06/mês** | **$0** |

---

## 🚀 Próximos Passos

### **Opção Gratuita (Recomendada):**
1. ✅ **Repositório:** Já configurado
2. ✅ **Workflows:** Já criados
3. ⏳ **Configurar Secrets:** GitHub Secrets
4. ⏳ **Testar:** GitHub Actions

### **Opção Paga (Firebase):**
1. ⏳ **Upgrade:** Para plano Blaze
2. ⏳ **Deploy:** Cloud Functions
3. ⏳ **Configurar:** Firebase Secrets
4. ⏳ **Atualizar:** Frontend URLs

---

## 💡 Conclusão

**Para seu caso de uso, recomendo GitHub Actions:**
- ✅ **100% gratuito**
- ✅ **Funcionalidade completa**
- ✅ **Fácil manutenção**
- ✅ **Sem necessidade de cartão**

**O sistema já está configurado para funcionar apenas com GitHub Actions!**
