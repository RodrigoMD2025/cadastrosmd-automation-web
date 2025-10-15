import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { PlaywrightTrigger } from "@/components/PlaywrightTrigger";
import { Button } from "@/components/ui/button";
import { Upload, LogOut } from "lucide-react";
import { toast } from "sonner";
import UploadDialog from "@/components/UploadDialog";

const Index = () => {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  if (!userEmail) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pt-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Painel de Automação
            </h1>
            <p className="text-muted-foreground mt-2">Gerencie e monitore seus cadastros automatizados</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center pt-10">
          <Button onClick={() => setUploadOpen(true)} className="gap-2" size="lg">
            <Upload className="h-4 w-4" />
            Upload Planilha
          </Button>
          
          <PlaywrightTrigger />
        </div>

        <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      </div>
    </div>
  );
};

export default Index;