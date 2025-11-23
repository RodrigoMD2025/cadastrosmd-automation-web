import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Loader2, Clock, Database } from 'lucide-react';
import { useUploadContext } from '@/contexts/UploadContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface UploadProgressData {
    success: boolean;
    upload_id: string;
    file_name: string;
    total_records: number;
    processed_records: number;
    success_count: number;
    error_count: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    upload_mode: string;
    percentage: number;
    started_at: string;
    updated_at: string;
    completed_at: string | null;
    error_message: string | null;
    is_complete: boolean;
}

interface UploadProgressTrackerProps {
    uploadId: string;
    onComplete?: () => void;
}

export function UploadProgressTracker({ uploadId, onComplete }: UploadProgressTrackerProps) {
    const [progress, setProgress] = useState<UploadProgressData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { clearUpload } = useUploadContext();

    useEffect(() => {
        if (!uploadId) return;

        const fetchProgress = async () => {
            try {
                const response = await fetch(`${API_URL}/api/upload-progress?upload_id=${uploadId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        // Upload ainda não iniciou o processamento - isso é normal
                        // Não marcar como erro, apenas aguardar
                        setProgress(null);
                        setIsLoading(true);
                        return;
                    }

                    // Outros erros
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                }

                const data: UploadProgressData = await response.json();
                setProgress(data);
                setIsLoading(false);
                setError(null);

                // Se completou, chamar callback e parar polling
                if (data.is_complete) {
                    clearUpload(); // Clear from localStorage
                    if (onComplete) {
                        onComplete();
                    }
                }
            } catch (err) {
                console.error('Error fetching progress:', err);
                setError((err as Error).message);
                setIsLoading(false);
            }
        };

        // Primeira busca imediata
        fetchProgress();


        // Polling a cada 2 segundos enquanto não completou
        const interval = setInterval(() => {
            if (progress?.is_complete) {
                clearInterval(interval);
                return;
            }
            fetchProgress();
        }, 2000);

        return () => clearInterval(interval);
    }, [uploadId, onComplete]); // Removed progress?.is_complete from deps to prevent loop


    if (isLoading) {
        return (
            <Card className="border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <div className="flex-1">
                            <span className="text-sm text-muted-foreground">Aguardando início do processamento...</span>
                            <p className="text-xs text-muted-foreground mt-1">Upload ID: {uploadId}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50 bg-destructive/10">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="text-sm text-destructive">Erro ao buscar progresso: {error}</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!progress) {
        return null;
    }

    const getStatusColor = () => {
        switch (progress.status) {
            case 'completed':
                return 'text-green-600';
            case 'failed':
                return 'text-destructive';
            case 'processing':
                return 'text-primary';
            default:
                return 'text-muted-foreground';
        }
    };

    const getStatusIcon = () => {
        switch (progress.status) {
            case 'completed':
                return <CheckCircle2 className="h-6 w-6 text-green-600" />;
            case 'failed':
                return <XCircle className="h-6 w-6 text-destructive" />;
            case 'processing':
                return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
            default:
                return <Clock className="h-6 w-6 text-muted-foreground" />;
        }
    };

    const getStatusText = () => {
        switch (progress.status) {
            case 'completed':
                return 'Processamento Concluído';
            case 'failed':
                return 'Processamento Falhou';
            case 'processing':
                return 'Processando Registros';
            default:
                return 'Aguardando';
        }
    };

    return (
        <Card className="border-2 border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Progresso do Processamento
                </CardTitle>
                <CardDescription>
                    Arquivo: {progress.file_name}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Status */}
                <div className="flex items-center gap-3">
                    {getStatusIcon()}
                    <div className="flex-1">
                        <p className={`text-lg font-semibold ${getStatusColor()}`}>
                            {getStatusText()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Modo: {progress.upload_mode === 'append' ? 'Adicionar' : 'Sobrescrever'}
                        </p>
                    </div>
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                            {progress.processed_records} de {progress.total_records} registros
                        </span>
                        <span className={`font-bold ${getStatusColor()}`}>
                            {progress.percentage}%
                        </span>
                    </div>
                    <Progress
                        value={progress.percentage}
                        className={`h-3 ${progress.status === 'completed' ? '[&>div]:bg-green-600' :
                            progress.status === 'failed' ? '[&>div]:bg-destructive' : ''
                            }`}
                    />
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Sucessos</p>
                        <p className="text-2xl font-bold text-green-600">{progress.success_count}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Erros</p>
                        <p className="text-2xl font-bold text-destructive">{progress.error_count}</p>
                    </div>
                </div>

                {/* Mensagem de Erro */}
                {progress.error_message && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive font-medium">Erro:</p>
                        <p className="text-sm text-destructive/90 mt-1">{progress.error_message}</p>
                    </div>
                )}

                {/* Timestamps */}
                <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                    <div className="flex justify-between">
                        <span>Iniciado:</span>
                        <span>{new Date(progress.started_at).toLocaleString('pt-BR')}</span>
                    </div>
                    {progress.completed_at && (
                        <div className="flex justify-between">
                            <span>Concluído:</span>
                            <span>{new Date(progress.completed_at).toLocaleString('pt-BR')}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
