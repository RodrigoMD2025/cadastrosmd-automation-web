import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload, Database, CheckCircle, Clock, BarChart3, Activity, Play,
  AlertCircle, Wifi, WifiOff, RefreshCw, X
} from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { UploadDialog } from "@/components/UploadDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

// URL da API Vercel
const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface AutomationStatus {
  success: boolean;
  total_cadastros: number;
  cadastrados: number;
  restantes: number;
  errors: number;
  is_running: boolean;
  run_id: string | null;
  automation_progress: {
    processed: number;
    total: number;
    success: number;
    errors: number;
    status: string;
    started_at: string;
    last_update: string;
  } | null;
  connectivity_status: string;
  recent_errors: number;
}

interface AutomationError {
  id: number;
  isrc: string;
  artista: string;
  error_type: string;
  error_message: string;
  retry_count: number;
  max_retries: number;
  should_retry: boolean;
}

const fetchAutomationStatus = async (): Promise<AutomationStatus> => {
  const response = await fetch(`${API_URL}/api/automation/status`);
  if (!response.ok) throw new Error('Failed to fetch automation status');
  return response.json();
};

const fetchAutomationErrors = async () => {
  const response = await fetch(`${API_URL}/api/automation/errors?unresolved_only=true&limit=10`);
  if (!response.ok) throw new Error('Failed to fetch errors');
  const data = await response.json();
  return data.errors || [];
};

const Index = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const queryClient = useQueryClient();

  // Busca status da automação a cada 3 segundos
  const { data, error, isLoading, refetch } = useQuery<AutomationStatus>({
    queryKey: ['automationStatus'],
    queryFn: fetchAutomationStatus,
    refetchInterval: 3000,
  });

  // Busca erros se houver
  const { data: errorsData } = useQuery<AutomationError[]>({
    queryKey: ['automationErrors'],
    queryFn: fetchAutomationErrors,
    enabled: (data?.recent_errors || 0) > 0,
    refetchInterval: 5000,
  });

  // Mutation para iniciar automação
  const startAutomation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/automation/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_size: 150 })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start automation');
      }
      return response.json();
    },
    onSuccess: (result) => {
      toast.success('Automação iniciada!', {
        description: `${result.total_records} registros serão processados`
      });
      queryClient.invalidateQueries({ queryKey: ['automationStatus'] });
    },
    onError: (error: Error) => {
      toast.error('Erro ao iniciar automação', {
        description: error.message
      });
    }
  });

  // Mutation para retry de ISRCs
  const retryISRCs = useMutation({
    mutationFn: async (isrcs: string[]) => {
      const response = await fetch(`${API_URL}/api/automation/retry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isrcs })
      });
      if (!response.ok) throw new Error('Failed to retry ISRCs');
      return response.json();
    },
    onSuccess: () => {
      toast.success('ISRCs marcados para retry');
      queryClient.invalidateQueries({ queryKey: ['automationErrors'] });
    },
    onError: () => {
      toast.error('Erro ao marcar ISRCs para retry');
    }
  });

  const progressPercentage = data?.automation_progress
    ? (data.automation_progress.processed / data.automation_progress.total) * 100
    : data && data.total_cadastros > 0
      ? (data.cadastrados / data.total_cadastros) * 100
      : 0;

  const canStartAutomation = !data?.is_running && (data?.restantes || 0) > 0;

  // Timer para mostrar tempo decorrido
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (data?.is_running && data?.automation_progress?.started_at) {
      const startTime = new Date(data.automation_progress.started_at).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000); // segundos
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [data?.is_running, data?.automation_progress?.started_at]);

  // Formata tempo em MM:SS ou HH:MM:SS
  const formatElapsedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Detecta se está provisionando (iniciou mas não processou nada ainda)
  const isProvisioning = data?.is_running &&
    (!data?.automation_progress || data.automation_progress.processed === 0);

  // Debug log para troubleshooting (pode ser removido em produção)
  if (error && !isLoading) {
    console.error('Erro ao buscar status:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
        <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitoramento e controle de cadastros
            </p>
          </div>
          <Button
            onClick={() => {
              console.log('🔄 Atualizando dashboard...');
              // Invalida todas as queries para forçar refetch completo
              queryClient.invalidateQueries();
              // Também força refetch da query principal
              refetch();
              toast.success('Dashboard atualizado!');
            }}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar dados</AlertTitle>
            <AlertDescription>
              Não foi possível conectar à API. Verifique a conexão e tente novamente.
              <br />
              <code className="text-xs mt-2 block">{(error as Error).message}</code>
            </AlertDescription>
          </Alert>
        )}


        {/* Unified Progress Alert - Shows provisioning, running automation OR general overview */}
        <Alert className={data?.is_running
          ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
          : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
        }>
          <Activity className={`h-4 w-4 ${data?.is_running ? 'text-blue-600 dark:text-blue-400 animate-pulse' : 'text-gray-600 dark:text-gray-400'}`} />
          <AlertTitle className={`${data?.is_running ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-gray-100"} flex items-center justify-between`}>
            <span>
              {isProvisioning ? '⚙️ Provisionando...' : data?.is_running ? 'Automação em andamento' : 'Progresso Geral'}
            </span>
            {data?.is_running && (
              <span className="text-sm font-mono">
                ⏱️ {formatElapsedTime(elapsedTime)}
              </span>
            )}
          </AlertTitle>
          <AlertDescription className={data?.is_running ? "text-blue-800 dark:text-blue-200" : "text-gray-800 dark:text-gray-200"}>
            {isProvisioning ? (
              // PROVISIONING: Aguardando GitHub Actions preparar ambiente
              <div className="mt-2 space-y-2">
                <p className="text-sm">
                  Preparando ambiente de execução... Isso pode levar alguns minutos.
                </p>
                <Progress value={0} className="h-2 animate-pulse" />
              </div>
            ) : data?.is_running && data.automation_progress ? (
              // RUNNING: Real-time automation progress
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progresso: {data.automation_progress.processed}/{data.automation_progress.total}</span>
                  <span className="font-bold">{Math.round((data.automation_progress.processed / data.automation_progress.total) * 100)}%</span>
                </div>
                <Progress value={(data.automation_progress.processed / data.automation_progress.total) * 100} className="h-2" />
                <div className="flex gap-4 text-xs">
                  <span>✓ Sucessos: {data.automation_progress.success}</span>
                  <span>✗ Erros: {data.automation_progress.errors}</span>
                </div>
              </div>
            ) : (
              // IDLE: General overview from database
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {data?.cadastrados || 0} de {data?.total_cadastros || 0} cadastrados
                  </span>
                  <span className="font-bold">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <p className="text-xl font-bold text-green-600">{data?.cadastrados || 0}</p>
                    <p className="text-xs text-muted-foreground">Sucessos</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-orange-500">{data?.restantes || 0}</p>
                    <p className="text-xs text-muted-foreground">Pendentes</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-600">{data?.errors || 0}</p>
                    <p className="text-xs text-muted-foreground">Erros</p>
                  </div>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>


        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total de Cadastros */}
          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Cadastros
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
                      data?.total_cadastros.toLocaleString('pt-BR') ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Cadastros no Painel</p>
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

          {/* Concluídos */}
          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                      data?.cadastrados.toLocaleString('pt-BR') ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {data && data.total_cadastros > 0
                      ? `${((data.cadastrados / data.total_cadastros) * 100).toFixed(1)}% do total`
                      : 'Aguardando dados'}
                  </p>
                </div>
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: data?.cadastrados || 0 },
                        { value: (data?.total_cadastros || 0) - (data?.cadastrados || 0) }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#16a34a" />  {/* Verde vibrante */}
                      <Cell fill="#e5e7eb" />  {/* Cinza claro */}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Restantes */}
          <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                      data?.restantes.toLocaleString('pt-BR') ?? 0
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Pendentes de cadastro</p>
                </div>
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: data?.restantes || 0 },
                        { value: (data?.cadastrados || 0) }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#f97316" />  {/* Laranja vibrante */}
                      <Cell fill="#e5e7eb" />  {/* Cinza claro */}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automation Control & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Automation Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Controle de Automação
              </CardTitle>
              <CardDescription>
                Inicie o processo de cadastro automático no MusicDelivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => {
                  console.log('🔵 Iniciando automação...');
                  startAutomation.mutate();
                }}
                disabled={!canStartAutomation || startAutomation.isPending}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                {startAutomation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando...
                  </>
                ) : data?.is_running ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-pulse" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Iniciar Cadastros
                  </>
                )}
              </Button>

              {data?.restantes === 0 && !data.is_running && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Tudo pronto!</AlertTitle>
                  <AlertDescription>
                    Todos os registros foram processados.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Status do Sistema
              </CardTitle>
              <CardDescription>
                Monitoramento de saúde e conectividade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  {data?.connectivity_status === 'online' ? (
                    <Wifi className="h-4 w-4 text-green-600" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-sm font-medium">Conectividade</span>
                </div>
                <Badge variant={data?.connectivity_status === 'online' ? 'default' : 'destructive'}>
                  {data?.connectivity_status === 'online' ? 'Online' : 'Offline'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <AlertCircle className={`h-4 w-4 ${(data?.recent_errors || 0) > 0 ? 'text-orange-600' : 'text-green-600'}`} />
                  <span className="text-sm font-medium">Falhas Recentes (24h)</span>
                </div>
                <Badge variant={(data?.recent_errors || 0) > 0 ? 'destructive' : 'default'}>
                  {data?.recent_errors || 0}
                </Badge>
              </div>

              {(data?.errors || 0) > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowErrors(!showErrors)}
                >
                  {showErrors ? 'Ocultar' : 'Ver'} Erros Detalhados
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Errors List */}
        {showErrors && errorsData && errorsData.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>ISRCs com Falha</CardTitle>
                  <CardDescription>
                    Registros que falharam durante o cadastro automático
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowErrors(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISRC</TableHead>
                      <TableHead>Artista</TableHead>
                      <TableHead>Tipo de Erro</TableHead>
                      <TableHead>Tentativas</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorsData.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell className="font-mono text-sm">{error.isrc}</TableCell>
                        <TableCell>{error.artista}</TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-xs">
                            {error.error_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {error.retry_count}/{error.max_retries}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => retryISRCs.mutate([error.isrc])}
                            disabled={error.retry_count >= error.max_retries || retryISRCs.isPending}
                          >
                            Retry
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
