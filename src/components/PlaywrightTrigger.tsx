import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Play, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

export function PlaywrightTrigger() {
  const [running, setRunning] = useState(false);

  async function triggerPlaywright() {
    const confirmacao = window.confirm(
      'Deseja iniciar a automação Playwright?\n\n' +
      'Isso irá processar os dados do Neon e cadastrar no sistema.'
    );

    if (!confirmacao) return;

    setRunning(true);

    try {
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
    <Button
      onClick={triggerPlaywright}
      disabled={running}
      variant="success"
      size="lg"
      className="gap-3 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.02] w-full"
    >
      {running ? (
        <><Loader2 className="h-5 w-5 animate-spin" /> Iniciando...</>
      ) : (
        <><Play className="h-5 w-5" /> Iniciar Cadastro</>
      )}
    </Button>
  );
}