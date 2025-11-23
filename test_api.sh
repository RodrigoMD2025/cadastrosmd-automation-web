#!/bin/bash

echo "🔍 Testando APIs do Sistema de Automação..."
echo ""

API_URL="https://cadastrosmd-automation-web.vercel.app"

# Teste 1: API de Status
echo "1️⃣ Testando GET /api/automation/status"
echo "URL: $API_URL/api/automation/status"
echo ""

response=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$API_URL/api/automation/status")
http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d: -f2)
body=$(echo "$response" | grep -v "HTTP_CODE")

if [ "$http_code" = "200" ]; then
    echo "✅ Status: OK ($http_code)"
    echo "📊 Response:"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
else
    echo "❌ Status: ERRO ($http_code)"
    echo "Response: $body"
fi

echo ""
echo "────────────────────────────────────────"
echo ""

# Teste 2: API de Cadastros (para comparação)
echo "2️⃣ Testando GET /api/cadastros (para comparar)"
echo "URL: $API_URL/api/cadastros?limit=1"
echo ""

response2=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$API_URL/api/cadastros?limit=1")
http_code2=$(echo "$response2" | grep "HTTP_CODE" | cut -d: -f2)
body2=$(echo "$response2" | grep -v "HTTP_CODE")

if [ "$http_code2" = "200" ]; then
    echo "✅ Status: OK ($http_code2)"
    echo "📊 Response (resumido):"
    echo "$body2" | python3 -m json.tool 2>/dev/null | head -20 || echo "$body2"
else
    echo "❌ Status: ERRO ($http_code2)"
    echo "Response: $body2"
fi

echo ""
echo "────────────────────────────────────────"
echo ""
echo "🔍 Diagnóstico:"
echo ""

if [ "$http_code" = "200" ]; then
    # Verificar se tem dados
    total=$(echo "$body" | grep -o '"total_cadastros":[0-9]*' | cut -d: -f2)
    restantes=$(echo "$body" | grep -o '"restantes":[0-9]*' | cut -d: -f2)
    
    if [ -n "$total" ]; then
        echo "✅ API retornando dados"
        echo "   Total: $total"
        echo "   Restantes: $restantes"
        
        if [ "$restantes" -gt 0 ]; then
            echo "✅ Botão 'Iniciar Cadastros' DEVE estar habilitado"
        else
            echo "⚠️  Botão 'Iniciar Cadastros' estará DESABILITADO (sem registros pendentes)"
        fi
    else
        echo "⚠️  API retornou mas sem dados esperados"
    fi
else
    echo "❌ API não está respondendo corretamente"
    echo ""
    echo "Possíveis causas:"
    echo "  - DATABASE_URL não configurada no Vercel"
    echo "  - Tabela 'cadastros' não existe"
    echo "  - Problema de CORS"
    echo "  - API não deployada"
fi

echo ""
echo "────────────────────────────────────────"
echo ""
echo "💡 Próximos passos:"
echo ""
if [ "$http_code" != "200" ]; then
    echo "1. Verifique DATABASE_URL no Vercel:"
    echo "   https://vercel.com/rodrigomd2025/cadastrosmd-automation-web/settings/environment-variables"
    echo ""
    echo "2. Verifique logs no Vercel:"
    echo "   https://vercel.com/rodrigomd2025/cadastrosmd-automation-web/logs"
    echo ""
    echo "3. Teste conexão com banco:"
    echo "   psql \$DATABASE_URL -c 'SELECT COUNT(*) FROM cadastros;'"
else
    echo "✅ API funcionando! Abra o Console do navegador (F12) para ver logs"
    echo ""
    echo "No dashboard, procure por:"
    echo "  Console → 'Dashboard Debug:' → verifique os valores"
fi
