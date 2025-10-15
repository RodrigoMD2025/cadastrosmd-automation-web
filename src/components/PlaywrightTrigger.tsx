import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PlaywrightTrigger() {
  const [running, setRunning] = useState(false);
  const GITHUB_REPO = 'RodrigoMD2025/cadastrosmd-automation-web';

  async function triggerPlaywright() {
    setRunning(true);

    try {
      toast.info('🎭 Iniciando automação Playwright...');

      const issueBody = {
        title: `🎭 Executar Playwright - ${new Date().toLocaleString('pt-BR')}`,
        body: `## Solicitação de execução do Playwright

**Data:** ${new Date().toLocaleString('pt-BR')}

---
🤖 Este processo será executado automaticamente.`,
        labels: ['run-playwright', 'automation']
      };

      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(issueBody)
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao criar issue');
      }

      const issue = await response.json();

      toast.success('✅ Automação iniciada!', {
        description: `Acompanhe em: ${issue.html_url}`,
        duration: 10000,
      });

      window.open(issue.html_url, '_blank');

    } catch (error) {
      toast.error('❌ Erro: ' + (error as Error).message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <Button onClick={triggerPlaywright} disabled={running}>
      {running ? '⏳ Iniciando...' : '▶️ Executar Playwright'}
    </Button>
  );
}
