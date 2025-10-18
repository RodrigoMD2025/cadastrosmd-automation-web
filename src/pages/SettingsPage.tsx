import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <Settings className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-6">Página de Configurações</h1>
      <p className="text-muted-foreground">Em breve, funcionalidades de configuração estarão disponíveis aqui.</p>
    </div>
  );
};

export default SettingsPage;