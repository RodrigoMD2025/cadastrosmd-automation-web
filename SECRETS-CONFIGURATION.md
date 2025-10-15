# 🔐 Secrets Configuration for GitHub Repository

## 📋 Complete List of Required Secrets

Configure these secrets in your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

---

## 🗄️ Database Configuration

### `DATABASE_URL`
- **Description:** Complete PostgreSQL connection URL for Neon database
- **Format:** `postgresql://username:password@host:port/database?sslmode=require`
- **Example:** `postgresql://neondb_owner:your_password@ep-xxx.us-east-2.aws.neon.tech:5432/neondb?sslmode=require`
- **Required:** ✅ Yes

### `TABELA`
- **Description:** Name of the table to store music data
- **Value:** `cadastros`
- **Required:** ✅ Yes

---

## 🔑 System Authentication

### `LOGIN_USERNAME`
- **Description:** Username for the external system where automation will register
- **Example:** `your_system_username`
- **Required:** ✅ Yes

### `LOGIN_PASSWORD`
- **Description:** Password for the external system
- **Example:** `your_system_password`
- **Required:** ✅ Yes

---

## 📱 Telegram Notifications (Optional)

### `TELEGRAM_TOKEN`
- **Description:** Bot token from @BotFather on Telegram
- **Format:** `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
- **Required:** ❌ No (but recommended for notifications)

### `TELEGRAM_CHAT_ID`
- **Description:** Your Telegram chat ID for receiving notifications
- **Example:** `123456789`
- **Required:** ❌ No (but recommended for notifications)

---

## 🌐 Frontend Configuration

### `VITE_UPLOAD_FUNCTION_URL_PROD`
- **Description:** Production URL of your Firebase Cloud Function
- **Format:** `https://us-central1-PROJECT_ID.cloudfunctions.net/uploadFile`
- **Example:** `https://us-central1-automacao-neon-auth.cloudfunctions.net/uploadFile`
- **Required:** ✅ Yes (for production frontend)

---

## 🔧 How to Add Secrets

1. **Go to:** https://github.com/RodrigoMD2025/cadastrosmd-automation-web/settings/secrets/actions
2. **Click:** "New repository secret"
3. **Name:** Enter the secret name (e.g., `DATABASE_URL`)
4. **Secret:** Enter the secret value
5. **Click:** "Add secret"
6. **Repeat** for all secrets listed above

---

## ⚠️ Important Notes

- **Never commit secrets to code** - Always use GitHub Secrets
- **Test locally first** - Use `.env` files for local development
- **Keep secrets secure** - Only share with trusted team members
- **Update regularly** - Change passwords periodically for security

---

## 🧪 Testing Secrets

After adding secrets, test them by:

1. **Trigger a workflow** manually from Actions tab
2. **Check logs** to ensure all secrets are accessible
3. **Verify database connection** works
4. **Test Telegram notifications** (if configured)

---

## 📞 Support

If you need help configuring any secret:
1. Check the documentation in each script file
2. Review the workflow logs in GitHub Actions
3. Test locally with `.env` files first
