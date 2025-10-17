import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePlaywrightTrigger } from "@/hooks/usePlaywrightTrigger";
import UploadDialog from "@/components/UploadDialog";

const Index = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const { isRunning, trigger } = usePlaywrightTrigger();

  // Efeito para autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/auth");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  // Esqueleto de carregamento enquanto o usuário é verificado
  if (!userEmail) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-[hsl(224_76%_48%)] text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Painel de Automação
              </h1>
              <p className="text-primary-foreground/90 text-sm md:text-base">
                Monitore em tempo real o progresso dos seus cadastros
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm font-medium">{userEmail}</span>
              </div>
              <ThemeToggle />
              <Button onClick={handleLogout} variant="secondary" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 md:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={() => setUploadOpen(true)} className="gap-3 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.02]" size="lg">
            <Upload className="h-5 w-5" />
            Fazer Upload de Planilha
          </Button>
          <Button onClick={trigger} disabled={isRunning} variant="success" size="lg" className="gap-3 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.02]">
            {isRunning ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Iniciando...</>
            ) : (
              <><Play className="h-5 w-5" /> Iniciar Cadastro</>
            )}
          </Button>
        </div>

        <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      </main>
    </div>
  );
};

export default Index;
