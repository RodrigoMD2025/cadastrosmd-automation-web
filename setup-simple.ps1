# Setup do Projeto - Sistema de Automacao
Write-Host "Configurando projeto..." -ForegroundColor Green

# Criar .env se nao existir
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env criado - configure suas variaveis" -ForegroundColor Yellow
}

if (-not (Test-Path "functions/.env")) {
    Copy-Item "functions/.env.example" "functions/.env" 
    Write-Host "functions/.env criado - configure suas credenciais" -ForegroundColor Yellow
}

Write-Host "Instalando dependencias frontend..." -ForegroundColor Gray
npm install

Write-Host "Instalando dependencias functions..." -ForegroundColor Gray
Set-Location functions
npm install
npm run build
Set-Location ..

Write-Host ""
Write-Host "Setup concluido! Proximos passos:" -ForegroundColor Green
Write-Host "1. Configure .env e functions/.env" -ForegroundColor White
Write-Host "2. firebase emulators:start" -ForegroundColor White  
Write-Host "3. npm run dev (outro terminal)" -ForegroundColor White