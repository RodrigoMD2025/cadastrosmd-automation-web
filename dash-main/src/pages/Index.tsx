import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, LogOut, Database, CheckCircle, Clock, BarChart3, Activity, Play } from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { UploadDialog } from "@/components/UploadDialog";
import { ThemeToggle } from "@/components/ThemeToggle";

// URL da API Vercel (deve ser configurada nas variáveis de ambiente)
const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface ProgressStatus {
  total: number;
  processed: number;
  remaining: number;
}

// Função para buscar os dados de progresso
const fetchProgress = async (): Promise<ProgressStatus> => {
  // Simular dados para demonstração - substituir pela chamada real da API
  return {
    total: 100,
    processed: 45,
    remaining: 55
  };
};

const Index = () => {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [userEmail] = useState<string>("usuario@exemplo.com");

  // Busca os dados da API a cada 5 segundos
  const { data, error, isLoading } = useQuery<ProgressStatus>({
    queryKey: ['progressStatus'],
    queryFn: fetchProgress,
    refetchInterval: 5000,
  });

  const handleLogout = async () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/auth");
  };

  const progressPercentage = data && data.total > 0 ? (data.processed / data.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-primary to-[hsl(224_76%_48%)] text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                <Activity className="h-8 w-8" strokeWidth={2.5} />
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
              <Button 
                onClick={handleLogout} 
                variant="secondary"
                size="sm" 
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Ações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={() => setUploadOpen(true)} 
            className="gap-3 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.02]" 
            size="lg"
          >
            <Upload className="h-5 w-5" />
            Fazer Upload de Planilha
          </Button>
          <Button
            variant="success"
            size="lg"
            className="gap-3 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            <Play className="h-5 w-5" />
            Iniciar Cadastro
          </Button>
        </div>

        <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* KPI Cards com Gráficos */}
          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Registros
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-foreground">
                    {isLoading ? (
                      <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                    ) : (
                      data?.total ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Cadastros na planilha</p>
                </div>
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={[{ value: 100 }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="hsl(var(--primary))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Concluídos
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-foreground">
                    {isLoading ? (
                      <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                    ) : (
                      data?.processed ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {progressPercentage.toFixed(0)}% completo
                  </p>
                </div>
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: data?.processed ?? 0 },
                        { value: data?.remaining ?? 0 }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#16a34a" />
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Restantes
              </CardTitle>
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-foreground">
                    {isLoading ? (
                      <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                    ) : (
                      data?.remaining ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {(100 - progressPercentage).toFixed(0)}% restante
                  </p>
                </div>
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: data?.remaining ?? 0 },
                        { value: data?.processed ?? 0 }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#ea580c" />
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Barra de Progresso */}
          <Card className="md:col-span-2 lg:col-span-3 border-border shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Progresso Geral
                </CardTitle>
                <span className="text-2xl font-bold text-primary">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {data?.processed ?? 0} de {data?.total ?? 0} cadastros
                </span>
                <span className="text-muted-foreground font-medium">
                  {data?.remaining ?? 0} restantes
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="md:col-span-2 lg:col-span-3 border-border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium">Sistema Operacional</p>
                    <p className="text-xs text-muted-foreground">Todos os serviços ativos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium">API Conectada</p>
                    <p className="text-xs text-muted-foreground">Resposta em 45ms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium">Processamento</p>
                    <p className="text-xs text-muted-foreground">Em andamento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse"></div>
                <p className="text-sm font-medium">
                  Erro ao buscar dados de progresso. Tentando novamente...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
