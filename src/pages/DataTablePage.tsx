import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Search, RefreshCw, Loader2, Database, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface CadastrosData {
    success: boolean;
    data: Record<string, any>[];
    columns: string[];
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
}

const DataTablePage = () => {
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [total, setTotal] = useState(0);
    const [limit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setOffset(0); // Reset to first page when searching
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                limit: limit.toString(),
                offset: offset.toString(),
            });

            if (debouncedSearch) {
                params.append('search', debouncedSearch);
            }

            const response = await fetch(`${API_URL}/api/cadastros?${params}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const result: CadastrosData = await response.json();
            setData(result.data);

            // Filtrar colunas indesejadas (# e id)
            const filteredColumns = result.columns.filter(col =>
                !['#', 'id'].includes(col.toLowerCase())
            );
            setColumns(filteredColumns);
            setTotal(result.total);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError((err as Error).message);
            toast.error('Erro ao carregar dados');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [offset, debouncedSearch]);

    const handlePrevPage = () => {
        setOffset(Math.max(0, offset - limit));
    };

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasNext = offset + limit < total;
    const hasPrev = offset > 0;

    if (error && !isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card className="border-destructive/50">
                    <CardContent className="pt-6">
                        <div className="text-center py-8">
                            <p className="text-destructive mb-4">Erro ao carregar dados: {error}</p>
                            <Button onClick={fetchData} variant="outline">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Tentar Novamente
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Database className="h-8 w-8" />
                        Dados Cadastrados
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Visualize e pesquise os dados importados do Excel
                    </p>
                </div>

                {/* Search and Actions */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar em todos os campos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="text-sm">
                                    {total.toLocaleString('pt-BR')} {total === 1 ? 'registro' : 'registros'}
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={fetchData}
                                    disabled={isLoading}
                                >
                                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardContent className="pt-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-3 text-muted-foreground">Carregando dados...</span>
                            </div>
                        ) : data.length === 0 ? (
                            <div className="text-center py-12">
                                <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <p className="text-lg font-medium">Nenhum registro encontrado</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {searchTerm ? 'Tente uma busca diferente' : 'Faça upload de uma planilha para ver os dados aqui'}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="rounded-md border overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableHead key={column} className="min-w-[150px]">
                                                        {column}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.map((row, index) => (
                                                <TableRow key={index}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column}>
                                                            {column === 'PAINEL_NEW' ? (
                                                                row[column] === 'Cadastro OK' ? (
                                                                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                                        Cadastrado
                                                                    </Badge>
                                                                ) : row[column] === 'Erro no Cadastro' ? (
                                                                    <Badge variant="destructive">
                                                                        <XCircle className="h-3 w-3 mr-1" />
                                                                        Erro
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge variant="secondary">
                                                                        <Clock className="h-3 w-3 mr-1" />
                                                                        Pendente
                                                                    </Badge>
                                                                )
                                                            ) : column === 'CADASTRADO' ? (
                                                                // Formatação especial para timestamp
                                                                row[column] ? (
                                                                    <div className="text-sm">
                                                                        <div className="font-medium">
                                                                            {new Date(row[column]).toLocaleDateString('pt-BR', {
                                                                                day: '2-digit',
                                                                                month: '2-digit',
                                                                                year: 'numeric'
                                                                            })}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground">
                                                                            {new Date(row[column]).toLocaleTimeString('pt-BR', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-muted-foreground">-</span>
                                                                )
                                                            ) : (
                                                                row[column] !== null && row[column] !== undefined
                                                                    ? String(row[column])
                                                                    : '-'
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-6">
                                        <Button
                                            variant="outline"
                                            onClick={handlePrevPage}
                                            disabled={!hasPrev || isLoading}
                                            className="gap-2"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Anterior
                                        </Button>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">
                                                Página {currentPage} de {totalPages}
                                            </span>
                                            <Badge variant="outline">
                                                {offset + 1}-{Math.min(offset + limit, total)} de {total}
                                            </Badge>
                                        </div>

                                        <Button
                                            variant="outline"
                                            onClick={handleNextPage}
                                            disabled={!hasNext || isLoading}
                                            className="gap-2"
                                        >
                                            Próxima
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DataTablePage;
