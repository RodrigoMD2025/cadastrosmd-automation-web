import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// ✅ usa variável de ambiente para ambiente prod/dev
const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

export function PlaywrightTrigger() {
  const [running, setRunning] = useState(false);

  async function triggerPlaywright() {
    const confirmacao = confirm(
      'Deseja iniciar a automação Playwright?\n\n' +
      'Isso irá processar os dados do Neon e cadastrar no sistema.'
    );

    if (!confirmacao) return;

    setRunning(true);

    try {
      // ✅ rota corrigida com prefixo /api/
      const response = await fetch(`${API_URL}/api/trigger-playwright`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao disparar automação');
      }

      const data = await response.json();

      toast.success('✅ Automação iniciada!', {
        description: 'Acompanhe o progresso no GitHub Actions',
        action: {
          label: 'Ver execução',
          onClick: () => window.open(data.githubActionsUrl, '_blank'),
        },
        duration: 10000,
      });

    } catch (error) {
      console.error('Erro:', error);
      toast.error('❌ ' + (error as Error).message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">🎭 Automação Playwright</h3>
      <p className="text-sm text-gray-600 mb-4">
        Executa o script de automação que processa os cadastros do Neon.
      </p>
      <Button 
        onClick={triggerPlaywright} 
        disabled={running}
        className="w-full"
      >
        {running ? '⏳ Iniciando...' : '▶️ Executar Playwright'}
      </Button>
    </div>
  );
}
