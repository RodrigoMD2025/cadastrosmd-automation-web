import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload, CheckCircle, BarChart3, Activity, Play,
  AlertCircle, RefreshCw, X
} from "lucide-react";
import { toast } from "sonner";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip
} from "recharts";
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

interface TimelinePoint {
  date: string;
  total: number;
}

const fetchAutomationStatus = async (): Promise<AutomationStatus> => {
  const response = await fetch(`${API_URL}/api/automation/status`);
  if (!response.ok) throw new Error('Failed to fetch automation status');
  return response.json();
};

const fetchTimeline = async (): Promise<TimelinePoint[]> => {
  const response = await fetch(`${API_URL}/api/automation/status?view=timeline`);
  if (!response.ok) throw new Error('Failed to fetch timeline');
  const data = await response.json();
  return data.data || [];
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

  // Busca histórico dos últimos cadastros para o gráfico de linha
  const { data: timelineData } = useQuery<TimelinePoint[]>({
    queryKey: ['automationTimeline'],
    queryFn: fetchTimeline,
    refetchInterval: 30000,
  });

  // Apenas dias com cadastros concluídos para otimizar a visualização do gráfico
  const timelineChartData = useMemo(
    () => (timelineData || []).filter(point => point.total > 0),
    [timelineData]
  );

  // Mutation para iniciar automação
  const startAutomation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/automation/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_size: 100 })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start automation');
      }
      return response.json();
    },
    onSuccess: (result) => {
      toast.success('Automação iniciada!', {
        description: `${result.total_records} registros serão processados por ${result.num_jobs || 1} máquina(s)`
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

  // Timer para mostrar tempo decorrido e ETA
  const [elapsedTime, setElapsedTime] = useState(0);
  const [eta, setEta] = useState<number | null>(null);

  useEffect(() => {
    if (data?.is_running && data?.automation_progress?.started_at) {
      const startTime = new Date(data.automation_progress.started_at).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000); // segundos
        setElapsedTime(elapsed);

        // Calculate ETA
        if (data.automation_progress && data.automation_progress.processed > 0) {
          const processed = data.automation_progress.processed;
          const total = data.automation_progress.total;
          const remaining = total - processed;

          if (remaining > 0) {
            const avgTimePerItem = elapsed / processed;
            const estimatedRemaining = Math.floor(avgTimePerItem * remaining);
            setEta(estimatedRemaining);
          } else {
            setEta(0);
          }
        } else {
          setEta(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
      setEta(null);
    }
  }, [data?.is_running, data?.automation_progress?.started_at, data?.automation_progress?.processed, data?.automation_progress?.total]);

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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                queryClient.invalidateQueries();
                refetch();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-transparent dark:text-green-400 dark:border-green-500/40 dark:hover:bg-green-500/10 transition-colors"
              aria-label="Verificar status do sistema"
              title="Status do sistema: Online"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online
            </button>
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


        {/* Progresso e Controle em 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Progresso Geral */}
          <Alert className={`h-full p-2.5 ${data?.is_running
            ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
            : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          }`}>
            <Activity className={`h-4 w-4 ${data?.is_running ? 'text-blue-600 dark:text-blue-400 animate-pulse' : 'text-gray-600 dark:text-gray-400'}`} />
            <AlertTitle className={`${data?.is_running ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-gray-100"} flex items-center justify-between`}>
              <span>
                {isProvisioning ? '⚙️ Provisionando...' : data?.is_running ? 'Automação em andamento' : 'Progresso Geral'}
              </span>
              {data?.is_running && (
                <div className="flex gap-4 text-sm font-mono">
                  <span>⏱️ {formatElapsedTime(elapsedTime)}</span>
                  {eta !== null && (
                    <span className="text-muted-foreground">
                      🏁 ETA: {formatElapsedTime(eta)}
                    </span>
                  )}
                </div>
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
                <div className="mt-2 space-y-2">
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
                      <p className="text-base font-bold text-green-600">{data?.cadastrados || 0}</p>
                      <p className="text-xs text-muted-foreground">Sucessos</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-orange-500">{data?.restantes || 0}</p>
                      <p className="text-xs text-muted-foreground">Pendentes</p>
                    </div>
                    <div>
                      <p className="text-base font-bold text-red-600">{data?.errors || 0}</p>
                      <p className="text-xs text-muted-foreground">Erros</p>
                    </div>
                  </div>
                </div>
              )}
            </AlertDescription>

            {/* Máquinas Docker em uso */}
            <div className="mt-3 pt-3 border-t border-foreground/10">
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${data?.is_running ? 'animate-ping bg-green-400' : 'bg-gray-300'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${data?.is_running ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </span>
                Máquinas Docker em uso
              </p>
              <div className="flex items-center justify-between gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`relative flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all duration-500 ${
                      data?.is_running
                        ? 'bg-green-500/15 border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                        : 'bg-muted/40 border-transparent opacity-40'
                    }`}
                  >
                    {data?.is_running && (
                      <span className="absolute -top-0.5 right-0.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-6 h-6 ${data?.is_running ? 'text-green-600' : 'text-muted-foreground'}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="4" width="18" height="10" rx="2" />
                      <path d="M2 14h20v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3z" />
                      <path d="M9 21h6" />
                    </svg>
                    <span className={`text-xs leading-none font-semibold ${data?.is_running ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Alert>

          {/* Controle de Automação */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Controle de Automação
              </CardTitle>
              <CardDescription>
                Inicie o processo de cadastro automático no MusicDelivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
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

        {/* Histórico de Cadastros - gráfico de linha */}
        <Card className="border-border shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Histórico de Cadastros
            </CardTitle>
            <CardDescription>
              Cadastros concluídos por dia desde o primeiro registro
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!timelineData ? (
              <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
            ) : timelineChartData.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados suficientes para o gráfico</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                  data={timelineChartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCadastros" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value: string) => {
                      const d = new Date(value);
                      return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
                    }}
                    minTickGap={28}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    allowDecimals={false}
                    tickFormatter={(value: number) => value.toLocaleString('pt-BR')}
                  />
                  <Tooltip
                    formatter={(value: number | string) => [value.toLocaleString('pt-BR'), 'Cadastros']}
                    labelFormatter={(label: string) =>
                      new Date(label).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fill="url(#colorCadastros)"
                    dot={{ r: 3, fill: "#16a34a", strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

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
