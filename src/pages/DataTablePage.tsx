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
import { Search, RefreshCw, Loader2, Database, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

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
    const [isExporting, setIsExporting] = useState(false);

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

    // Export functions
    const exportToCSV = async () => {
        setIsExporting(true);
        try {
            // Fetch all data for export
            const response = await fetch(`${API_URL}/api/cadastros?limit=10000`);
            if (!response.ok) throw new Error('Erro ao buscar dados para export');

            const result = await response.json();
            const exportData = result.data;
            const exportColumns = result.columns.filter((col: string) => !['#', 'id'].includes(col.toLowerCase()));

            // Create CSV content
            const csvContent = [
                exportColumns.join(','), // Header
                ...exportData.map((row: any) =>
                    exportColumns.map(col => {
                        let value = row[col] ?? '';

                        // Format CADASTRADO timestamp
                        if (col === 'CADASTRADO' && value) {
                            const date = new Date(value);
                            value = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                        }

                        // Escape quotes and wrap in quotes if contains comma
                        return typeof value === 'string' && value.includes(',')
                            ? `"${value.replace(/"/g, '""')}"`
                            : value;
                    }).join(',')
                )
            ].join('\n');

            // Download
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `cadastros_${new Date().toISOString().split('T')[0]}.csv`);
            link.click();
            URL.revokeObjectURL(url);

            toast.success('CSV exportado com sucesso!');
        } catch (error) {
            toast.error('Erro ao exportar CSV');
            console.error(error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToExcel = async () => {
        setIsExporting(true);
        try {
            const response = await fetch(`${API_URL}/api/cadastros?limit=10000`);
            if (!response.ok) throw new Error('Erro ao buscar dados para export');

            const result = await response.json();
            const exportData = result.data;
            const exportColumns = result.columns.filter((col: string) => !['#', 'id'].includes(col.toLowerCase()));

            // Prepare data for Excel
            const wsData = [
                exportColumns, // Header
                ...exportData.map((row: any) => exportColumns.map(col => {
                    const value = row[col];

                    // Format CADASTRADO timestamp
                    if (col === 'CADASTRADO' && value) {
                        const date = new Date(value);
                        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                    }

                    return value ?? '';
                }))
            ];

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Cadastros');

            // Download
            XLSX.writeFile(wb, `cadastros_${new Date().toISOString().split('T')[0]}.xlsx`);

            toast.success('Excel exportado com sucesso!');
        } catch (error) {
            toast.error('Erro ao exportar Excel');
            console.error(error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const response = await fetch(`${API_URL}/api/cadastros?limit=10000`);
            if (!response.ok) throw new Error('Erro ao buscar dados para export');

            const result = await response.json();
            const exportData = result.data;
            const exportColumns = result.columns.filter((col: string) => !['#', 'id'].includes(col.toLowerCase()));

            const doc = new jsPDF('l', 'mm', 'a4'); // Landscape

            doc.setFontSize(16);
            doc.text('Relatório de Cadastros', 14, 15);
            doc.setFontSize(10);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22);

            // Prepare table data
            const tableData = exportData.map((row: any) =>
                exportColumns.map(col => {
                    const value = row[col];
                    if (col === 'CADASTRADO' && value) {
                        const date = new Date(value);
                        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }
                    return value ?? '';
                })
            );

            autoTable(doc, {
                head: [exportColumns],
                body: tableData,
                startY: 28,
                styles: { fontSize: 8, cellPadding: 2 },
                headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 245, 245] },
            });

            doc.save(`cadastros_${new Date().toISOString().split('T')[0]}.pdf`);

            toast.success('PDF exportado com sucesso!');
        } catch (error) {
            toast.error('Erro ao exportar PDF');
            console.error(error);
        } finally {
            setIsExporting(false);
        }
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

                                {/* Export Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={exportToCSV}
                                        disabled={isExporting || isLoading || total === 0}
                                        title="Exportar como CSV"
                                    >
                                        <FileDown className="h-4 w-4 mr-1" />
                                        CSV
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={exportToExcel}
                                        disabled={isExporting || isLoading || total === 0}
                                        title="Exportar como Excel"
                                    >
                                        <FileDown className="h-4 w-4 mr-1" />
                                        Excel
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={exportToPDF}
                                        disabled={isExporting || isLoading || total === 0}
                                        title="Exportar como PDF"
                                    >
                                        <FileDown className="h-4 w-4 mr-1" />
                                        PDF
                                    </Button>
                                </div>

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
                                                        {column === 'PAINEL_NEW' ? 'STATUS' : column}
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
                                                                    <div className="flex items-center justify-center" title="Cadastrado">
                                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                                    </div>
                                                                ) : row[column] === 'Erro no Cadastro' ? (
                                                                    <div className="flex items-center justify-center" title="Erro no Cadastro">
                                                                        <XCircle className="h-4 w-4 text-red-600" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center justify-center" title="Pendente">
                                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                                    </div>
                                                                )
                                                            ) : column === 'CADASTRADO' ? (
                                                                // Formatação: DD-MM-YYYY HH:MM:SS
                                                                row[column] ? (
                                                                    <div className="text-sm font-mono text-muted-foreground">
                                                                        {(() => {
                                                                            const date = new Date(row[column]);
                                                                            const day = String(date.getDate()).padStart(2, '0');
                                                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                                                            const year = date.getFullYear();
                                                                            const hours = String(date.getHours()).padStart(2, '0');
                                                                            const minutes = String(date.getMinutes()).padStart(2, '0');
                                                                            const seconds = String(date.getSeconds()).padStart(2, '0');
                                                                            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                                                                        })()}
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
