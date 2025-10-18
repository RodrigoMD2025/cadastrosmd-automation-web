// Script para testar conectividade com Neon Database
const { Pool } = require('pg');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const TABELA = process.env.TABELA || 'cadastros';

console.log('🔍 Testando conectividade com Neon Database...\n');

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não definida no arquivo .env');
  console.log('Por favor, adicione DATABASE_URL ao seu arquivo .env');
  process.exit(1);
}

// Ocultar senha na URL para segurança
const urlMasked = DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
console.log(`📡 Conectando a: ${urlMasked}\n`);

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  try {
    // Teste 1: Conexão básica
    console.log('1️⃣ Testando conexão básica...');
    const client = await pool.connect();
    console.log('✅ Conexão estabelecida com sucesso!\n');

    // Teste 2: Verificar se a tabela existe
    console.log(`2️⃣ Verificando se a tabela "${TABELA}" existe...`);
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      );
    `, [TABELA]);

    if (tableCheck.rows[0].exists) {
      console.log(`✅ Tabela "${TABELA}" encontrada!\n`);

      // Teste 3: Contar registros
      console.log('3️⃣ Contando registros...');
      const countResult = await client.query(`SELECT COUNT(*) FROM public."${TABELA}"`);
      const total = parseInt(countResult.rows[0].count, 10);
      console.log(`📊 Total de registros: ${total}\n`);

      // Teste 4: Verificar estrutura da tabela
      console.log('4️⃣ Verificando estrutura da tabela...');
      const columnsResult = await client.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
        LIMIT 10;
      `, [TABELA]);

      console.log('📋 Primeiras colunas da tabela:');
      columnsResult.rows.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type})`);
      });
      console.log('');

      // Teste 5: Query de teste (top 3 registros)
      console.log('5️⃣ Buscando primeiros 3 registros...');
      const sampleResult = await client.query(`SELECT * FROM public."${TABELA}" LIMIT 3`);
      if (sampleResult.rows.length > 0) {
        console.log(`✅ Encontrados ${sampleResult.rows.length} registros de exemplo`);
        console.log('📄 Colunas disponíveis:', Object.keys(sampleResult.rows[0]).slice(0, 5).join(', '), '...\n');
      } else {
        console.log('⚠️  Tabela está vazia\n');
      }
    } else {
      console.log(`❌ Tabela "${TABELA}" NÃO encontrada!`);
      console.log('Você pode precisar criar a tabela primeiro.\n');
    }

    client.release();

    console.log('✅ Todos os testes concluídos com sucesso!');
    console.log('\n🎉 Sua aplicação está pronta para usar o Neon Database!\n');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:');
    console.error(`   Tipo: ${error.name}`);
    console.error(`   Mensagem: ${error.message}\n`);

    if (error.code === 'ENOTFOUND') {
      console.log('💡 Dica: Verifique se a URL do DATABASE_URL está correta');
    } else if (error.code === '28P01') {
      console.log('💡 Dica: Credenciais inválidas. Verifique usuário e senha');
    } else if (error.code === '3D000') {
      console.log('💡 Dica: Database não encontrado. Verifique o nome do database na URL');
    }

    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
