import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore, functions } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Play, Database, LogOut } from "lucide-react";
import { toast } from "sonner";
import ProgressChart from "@/components/ProgressChart";
import UploadDialog from "@/components/UploadDialog";

const Index = () => {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [progress, setProgress] = useState({ total: 0, processed: 0, status: 'idle' });
  const [isTriggering, setIsTriggering] = useState(false);

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

  // Efeito para ouvir o progresso no Firestore
  useEffect(() => {
    if (auth.currentUser) {
      const progressDocRef = doc(firestore, "progress", auth.currentUser.uid);
      const unsubscribe = onSnapshot(progressDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const newProgress = {
            total: data.total || 0,
            processed: data.processed || 0,
            status: data.status || 'idle',
          };
          setProgress(newProgress);

          if (newProgress.status === 'completed') {
            toast.success("Processamento da planilha concluído!");
          } else if (newProgress.status === 'error') {
            toast.error("Ocorreu um erro no processamento da planilha.");
          }
        }
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  const handleTriggerWorkflow = async () => {
    setIsTriggering(true);
    toast.info("Disparando workflow de automação...");
    try {
      const triggerPlaywright = httpsCallable(functions, 'triggerPlaywright');
      const result = await triggerPlaywright();
      toast.success("Workflow disparado com sucesso!", { 
        description: "Acompanhe o progresso na aba Actions do seu repositório GitHub."
      });
    } catch (error: any) {
      console.error("Erro ao disparar workflow:", error);
      toast.error("Erro ao disparar workflow", { description: error.message });
    } finally {
      setIsTriggering(false);
    }
  };

  if (!userEmail) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  const percentage = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;

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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-gradient border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.total}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processados</CardTitle>
              <Database className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.processed}</div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              <Database className="h-4 w-4 text-primary-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{percentage}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => setUploadOpen(true)} className="gap-2" size="lg">
            <Upload className="h-4 w-4" />
            Upload Planilha
          </Button>
          
          <Button onClick={handleTriggerWorkflow} variant="secondary" className="gap-2" size="lg" disabled={isTriggering}>
            <Play className="h-4 w-4" />
            {isTriggering ? 'Disparando...' : 'Executar Automação'}
          </Button>
        </div>

        {/* Progress Chart */}
        <Card className="card-gradient border-primary/20">
          <CardHeader>
            <CardTitle>Progresso de Processamento da Planilha</CardTitle>
            <CardDescription>Acompanhe em tempo real o status dos cadastros no banco de dados.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart stats={{...progress, percentage}} />
          </CardContent>
        </Card>

        <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      </div>
    </div>
  );
};

export default Index;
