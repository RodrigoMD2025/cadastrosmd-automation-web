import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

export function usePlaywrightTrigger() {
  const [isRunning, setIsRunning] = useState(false);

  const trigger = async () => {
    const confirmacao = window.confirm(
      'Deseja iniciar a automação de cadastros?\n\n' +
      'Isso irá processar os dados pendentes no banco de dados.'
    );

    if (!confirmacao) return;

    setIsRunning(true);

    try {
      const response = await fetch(`${API_URL}/api/trigger-playwright`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao disparar automação');
      }

      const data = await response.json();

      toast.success('✅ Automação iniciada!', {
        description: 'Acompanhe o progresso no GitHub Actions.',
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
      setIsRunning(false);
    }
  };

  return { isRunning, trigger };
}