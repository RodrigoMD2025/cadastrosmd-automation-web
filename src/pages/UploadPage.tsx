import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle, Database, FileCheck } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { UploadProgressTracker } from '@/components/UploadProgressTracker';
import { UploadHistoryList } from '@/components/UploadHistoryList';
import { useUploadContext } from '@/contexts/UploadContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<"overwrite" | "append">("append");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

  const { setActiveUpload, clearUpload, uploadState } = useUploadContext();

  // Auto-resume: Check if there's an active upload on mount
  useEffect(() => {
    if (uploadState.uploadId && uploadState.isProcessing) {
      setUploadId(uploadState.uploadId);
    }
  }, [uploadState.uploadId, uploadState.isProcessing]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
      setUploadStatus('idle');
      toast.success('Arquivo selecionado com sucesso!');
    } else {
      toast.error('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
      toast.success('Arquivo selecionado com sucesso!');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Por favor, selecione um arquivo');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadMode', uploadMode);

    try {
      // Simular progresso do upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        setUploadStatus('success');
        const newUploadId = result.uploadId;
        setUploadId(newUploadId);
        // Save to context + localStorage
        setActiveUpload(newUploadId, file.name);

        // NOVO: Limpar erros antigos quando houver novo upload
        try {
          const clearResponse = await fetch(`${API_URL}/api/automation/clear-errors`, {
            method: 'POST',
          });
          if (clearResponse.ok) {
            console.log('✅ Erros antigos limpos com sucesso');
          }
        } catch (e) {
          console.warn('Aviso: Não foi possível limpar erros antigos:', e);
          // Não falha o upload por causa disso
        }

        toast.success(result.message || 'Planilha enviada com sucesso!');
      } else {
        const errorData = await response.json();
        setUploadStatus('error');
        toast.error('Erro no upload', {
          description: errorData.message || 'Ocorreu um erro ao enviar a planilha.',
        });
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setUploadStatus('error');
      setUploadProgress(0);
      toast.error('Erro de conexão', {
        description: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
      });
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setUploadId(null);
    clearUpload(); // Clear from context + localStorage
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent" />;
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-600" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Upload className="h-6 w-6 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Enviando arquivo...';
      case 'success':
        return 'Upload concluído com sucesso!';
      case 'error':
        return 'Erro no upload';
      default:
        return 'Pronto para enviar';
    }
  };

  const handleUploadComplete = useCallback(() => {
    toast.success('Processamento concluído!');
    // Refresh history list
    setHistoryRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Upload de Planilhas
          </h1>
          <p className="text-muted-foreground text-lg">
            Faça upload de planilhas Excel para processamento automático
          </p>
        </div>

        {/* Resume Alert */}
        {uploadState.uploadId && uploadState.isProcessing && !file && (
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-900 dark:text-blue-100">Upload em andamento</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              Continuando processamento de "{uploadState.fileName}"
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Upload Area */}
          <div className="space-y-6">
            {/* Main Upload Card */}
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Selecionar Arquivo
                </CardTitle>
                <CardDescription>
                  Arraste e solte sua planilha Excel ou clique para selecionar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Drag and Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer",
                    isDragging
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-accent/50",
                    uploadStatus === 'success' && "border-green-500 bg-green-500/5",
                    uploadStatus === 'error' && "border-destructive bg-destructive/5"
                  )}
                >
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadStatus === 'uploading'}
                  />

                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className={cn(
                      "p-4 rounded-full transition-colors",
                      uploadStatus === 'success' ? "bg-green-500/10" :
                        uploadStatus === 'error' ? "bg-destructive/10" :
                          "bg-primary/10"
                    )}>
                      {getStatusIcon()}
                    </div>

                    {file ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FileCheck className="h-4 w-4 text-primary" />
                          {file.name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tamanho: {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-lg font-semibold">
                          Arraste seu arquivo aqui
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ou clique para selecionar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Formatos aceitos: .xlsx, .xls
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadStatus !== 'idle' && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{getStatusText()}</span>
                      <span className={cn(
                        "font-bold",
                        uploadStatus === 'success' && "text-green-600",
                        uploadStatus === 'error' && "text-destructive"
                      )}>
                        {uploadProgress}%
                      </span>
                    </div>
                    <Progress
                      value={uploadProgress}
                      className={cn(
                        "h-3 transition-all",
                        uploadStatus === 'success' && "[&>div]:bg-green-600",
                        uploadStatus === 'error' && "[&>div]:bg-destructive"
                      )}
                    />
                  </div>
                )}

                {/* Upload Mode Selection */}
                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    Modo de Importação
                  </Label>
                  <RadioGroup value={uploadMode} onValueChange={(value) => setUploadMode(value as "overwrite" | "append")} disabled={uploadStatus === 'uploading'}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                      <RadioGroupItem value="append" id="append" />
                      <Label htmlFor="append" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Adicionar aos dados existentes</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Os novos dados serão adicionados à base atual
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-destructive/30 hover:border-destructive hover:bg-destructive/5 transition-all cursor-pointer">
                      <RadioGroupItem value="overwrite" id="overwrite" />
                      <Label htmlFor="overwrite" className="flex-1 cursor-pointer">
                        <div className="font-semibold flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          Apagar dados atuais e substituir
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ⚠️ Todos os dados existentes serão removidos permanentemente
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {uploadStatus === 'success' || uploadStatus === 'error' ? (
                    <Button
                      onClick={resetUpload}
                      variant="outline"
                      className="flex-1 h-12 text-base"
                    >
                      Enviar Novo Arquivo
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={resetUpload}
                        variant="outline"
                        disabled={!file || uploadStatus === 'uploading'}
                        className="h-12"
                      >
                        Limpar
                      </Button>
                      <Button
                        onClick={handleUpload}
                        disabled={!file || uploadStatus === 'uploading'}
                        className="flex-1 h-12 text-base gap-2 font-semibold"
                      >
                        {uploadStatus === 'uploading' ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5" />
                            Fazer Upload
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Processing Progress Tracker */}
            {uploadId && (
              <UploadProgressTracker
                uploadId={uploadId}
                onComplete={handleUploadComplete}
              />
            )}
          </div>

          {/* Right Column: Excel Template Example */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/10 shadow-md bg-white/50 dark:bg-slate-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  Modelo da Planilha
                </CardTitle>
                <CardDescription>
                  Seu arquivo Excel deve seguir exatamente este formato:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="bg-green-50 dark:bg-green-900/20 border-b px-4 py-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <span className="ml-2 text-xs font-mono text-muted-foreground">modelo_importacao.xlsx</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                          <th className="px-4 py-2 border-r border-b w-12 text-center bg-muted"></th>
                          <th className="px-4 py-2 border-r border-b w-32">A</th>
                          <th className="px-4 py-2 border-r border-b w-48">B</th>
                          <th className="px-4 py-2 border-b w-48">C</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="bg-muted/20">
                          <td className="px-4 py-2 border-r font-mono text-xs text-center bg-muted/50">1</td>
                          <td className="px-4 py-2 border-r font-bold text-green-700 dark:text-green-400">ISRC</td>
                          <td className="px-4 py-2 border-r font-bold text-green-700 dark:text-green-400">ARTISTA</td>
                          <td className="px-4 py-2 font-bold text-green-700 dark:text-green-400">TITULARES</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-r font-mono text-xs text-center bg-muted/50">2</td>
                          <td className="px-4 py-2 border-r font-mono text-xs">BR...</td>
                          <td className="px-4 py-2 border-r">Nome do Artista</td>
                          <td className="px-4 py-2">Titular 1, Titular 2</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-r font-mono text-xs text-center bg-muted/50">3</td>
                          <td className="px-4 py-2 border-r font-mono text-xs">US...</td>
                          <td className="px-4 py-2 border-r">Outro Artista</td>
                          <td className="px-4 py-2">Titular Principal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Colunas Obrigatórias</p>
                      <p className="text-muted-foreground">
                        A planilha <strong>precisa</strong> ter cabeçalhos exatos: <code className="bg-muted px-1 py-0.5 rounded">ISRC</code>, <code className="bg-muted px-1 py-0.5 rounded">ARTISTA</code> e <code className="bg-muted px-1 py-0.5 rounded">TITULARES</code>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Dicas de Formatação</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Sem linhas em branco antes do cabeçalho</li>
                        <li>ISRCs devem ser válidos (12 caracteres)</li>
                        <li>Evite caracteres especiais no nome do arquivo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card - Moved to right column */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Database className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">Processamento Automático</p>
                    <p className="text-muted-foreground">
                      Assim que o upload for concluído, o sistema iniciará automaticamente a validação e importação dos dados para a fila de processamento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upload History */}
        <div className="mt-8">
          <UploadHistoryList refreshTrigger={historyRefreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;