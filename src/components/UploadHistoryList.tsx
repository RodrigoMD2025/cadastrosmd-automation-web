import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FileSpreadsheet, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface UploadHistoryItem {
    upload_id: string;
    file_name: string;
    total_records: number;
    processed_records: number;
    success_count: number;
    error_count: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    upload_mode: string;
    started_at: string;
    completed_at: string | null;
    duration_seconds: number | null;
    error_message: string | null;
}

interface UploadHistoryListProps {
    refreshTrigger?: number;
}

export function UploadHistoryList({ refreshTrigger }: UploadHistoryListProps) {
    const [items, setItems] = useState<UploadHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/upload-history?limit=50`);

            if (!response.ok) {
                throw new Error('Erro ao buscar histórico');
            }

            const data = await response.json();
            setItems(data.data || []);
        } catch (err) {
            console.error('Error fetching history:', err);
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [refreshTrigger]);

    const handleDeleteClick = (uploadId: string) => {
        setItemToDelete(uploadId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);

        try {
            const response = await fetch(
                `${API_URL}/api/upload-history?upload_id=${itemToDelete}`,
                { method: 'DELETE' }
            );

            if (!response.ok) {
                throw new Error('Erro ao deletar registro');
            }

            toast.success('Registro removido do histórico');
            setItems(items.filter(item => item.upload_id !== itemToDelete));
        } catch (err) {
            console.error('Error deleting:', err);
            toast.error('Erro ao deletar registro');
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; label: string; className: string }> = {
            completed: {
                variant: 'default',
                label: 'Concluído',
                className: 'bg-green-600 hover:bg-green-700'
            },
            failed: {
                variant: 'destructive',
                label: 'Falhou',
                className: ''
            },
            processing: {
                variant: 'secondary',
                label: 'Processando',
                className: 'bg-yellow-500 hover:bg-yellow-600 text-white'
            },
            pending: {
                variant: 'outline',
                label: 'Pendente',
                className: ''
            },
        };

        const config = variants[status] || variants.pending;

        return (
            <Badge variant={config.variant} className={config.className}>
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatDuration = (seconds: number | null) => {
        if (!seconds) return '-';

        if (seconds < 60) {
            return `${Math.round(seconds)}s`;
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-3 py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-muted-foreground">Carregando histórico...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardContent className="pt-6">
                    <div className="text-center py-8">
                        <p className="text-destructive">Erro ao carregar histórico: {error}</p>
                        <Button onClick={fetchHistory} className="mt-4" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Tentar Novamente
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (items.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Histórico de Uploads
                    </CardTitle>
                    <CardDescription>Nenhum upload encontrado</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Faça seu primeiro upload para ver o histórico aqui</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <FileSpreadsheet className="h-5 w-5" />
                                Histórico de Uploads
                            </CardTitle>
                            <CardDescription>
                                Total: {items.length} {items.length === 1 ? 'upload' : 'uploads'}
                            </CardDescription>
                        </div>
                        <Button onClick={fetchHistory} variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Atualizar
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Arquivo</TableHead>
                                    <TableHead>Data/Hora</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Registros</TableHead>
                                    <TableHead className="text-center">Sucessos</TableHead>
                                    <TableHead className="text-center">Erros</TableHead>
                                    <TableHead>Modo</TableHead>
                                    <TableHead className="text-center">Duração</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.upload_id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                                                {item.file_name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDate(item.started_at)}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={cn(
                                                "font-medium",
                                                item.processed_records === item.total_records && "text-green-600"
                                            )}>
                                                {item.processed_records}/{item.total_records}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center font-medium text-green-600">
                                            {item.success_count}
                                        </TableCell>
                                        <TableCell className="text-center font-medium text-destructive">
                                            {item.error_count}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                                {item.upload_mode === 'append' ? 'Adicionar' : 'Sobrescrever'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-sm text-muted-foreground">
                                            {formatDuration(item.duration_seconds)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteClick(item.upload_id)}
                                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja remover este registro do histórico?
                            Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deletando...
                                </>
                            ) : (
                                'Deletar'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
