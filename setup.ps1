# Script de Configuração do Projeto - Sistema de Automação de Cadastros Musicais
# Execute: .\setup.ps1

Write-Host "Configurando Sistema de Automacao de Cadastros Musicais..." -ForegroundColor Cyan
Write-Host ""

# Verificar se os arquivos .env existem
$envMain = Test-Path ".env"
$envFunctions = Test-Path "functions/.env"

if (-not $envMain) {
    Write-Host "Arquivo .env nao encontrado na pasta principal" -ForegroundColor Yellow
    Write-Host "Copiando .env.example para .env..." -ForegroundColor Green
    Copy-Item ".env.example" ".env"
    Write-Host "Arquivo .env criado! Configure suas variaveis." -ForegroundColor Green
} else {
    Write-Host "Arquivo .env encontrado na pasta principal" -ForegroundColor Green
}

if (-not $envFunctions) {
    Write-Host "⚠️  Arquivo functions/.env não encontrado" -ForegroundColor Yellow
    Write-Host "Copiando functions/.env.example para functions/.env..." -ForegroundColor Green
    Copy-Item "functions/.env.example" "functions/.env"
    Write-Host "✅ Arquivo functions/.env criado! Configure suas credenciais." -ForegroundColor Green
} else {
    Write-Host "✅ Arquivo functions/.env encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Instalando dependências..." -ForegroundColor Cyan

# Instalar dependências do frontend
Write-Host "Frontend..." -ForegroundColor Gray
npm install | Out-Null

# Instalar dependências das functions
Write-Host "Cloud Functions..." -ForegroundColor Gray
Set-Location functions
npm install | Out-Null
npm run build | Out-Null
Set-Location ..

Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
Write-Host ""

Write-Host "🔧 Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure suas credenciais nos arquivos:" -ForegroundColor White
Write-Host "   📄 .env (pasta principal)" -ForegroundColor Gray
Write-Host "   📄 functions/.env (pasta functions)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Para testar localmente:" -ForegroundColor White
Write-Host "   🔥 firebase emulators:start" -ForegroundColor Gray
Write-Host "   (Em outro terminal)" -ForegroundColor DarkGray
Write-Host "   💻 npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Para fazer deploy:" -ForegroundColor White
Write-Host "   ☁️  firebase deploy --only functions" -ForegroundColor Gray
Write-Host "   🌐 Push para main → GitHub Pages automático" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Projeto configurado com sucesso!" -ForegroundColor Green