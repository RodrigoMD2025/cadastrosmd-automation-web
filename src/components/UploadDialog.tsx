import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { auth, functions } from "@/integrations/firebase/client";
import { httpsCallable } from "firebase/functions";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validação de formato
      if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
        toast.error("Formato inválido", { 
          description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)." 
        });
        return;
      }
      
      // Validação de tamanho (máx 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Arquivo muito grande", {
          description: "O arquivo deve ter no máximo 10MB."
        });
        return;
      }
      
      setFile(selectedFile);
      toast.success("Arquivo selecionado", {
        description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Nenhum arquivo selecionado");
      return;
    }
    
    const user = auth.currentUser;
    if (!user) {
      toast.error("Você precisa estar logado para fazer o upload.");
      return;
    }

    setUploading(true);
    const uploadToast = toast.info("Iniciando upload...", { 
      description: "O arquivo está sendo enviado para processamento.",
      duration: 0 // Toast persistente
    });

    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        toast.info(`Tentativa ${attempt}/${maxRetries}...`, {
          description: attempt > 1 ? "Tentando novamente..." : "Enviando arquivo..."
        });

        const idToken = await user.getIdToken();
        
        // Determina a URL da função baseada no ambiente
        const env = import.meta.env.VITE_ENV || 'dev';
        const uploadUrl = env === 'prod' 
          ? import.meta.env.VITE_UPLOAD_FUNCTION_URL_PROD
          : import.meta.env.VITE_UPLOAD_FUNCTION_URL_DEV;

        if (!uploadUrl) {
          throw new Error(`A URL da função de upload não está configurada para o ambiente: ${env}`);
        }

        // Cria FormData para upload estruturado
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('fileSize', file.size.toString());

        console.log('Tentando upload para:', uploadUrl);
        
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          mode: 'cors',
          credentials: 'include',
          // Adiciona um timeout de 30 segundos
          signal: AbortSignal.timeout(30000)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro no upload:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          let errorMessage;
          
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorText;
          } catch {
            errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
          }
          
          throw new Error(errorMessage);
        }

        const result = await response.json();
        
        toast.dismiss(uploadToast);
        toast.success("✅ Upload concluído!", { 
          description: result.message || "O processamento foi iniciado. Acompanhe o progresso no painel."
        });
        
        onOpenChange(false);
        setFile(null);
        return; // Sucesso, sair do loop

      } catch (error: any) {
        lastError = error;
        console.error(`Tentativa ${attempt} falhou:`, error);
        
        if (attempt < maxRetries) {
          // Aguarda antes da próxima tentativa (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    toast.dismiss(uploadToast);
    toast.error("❌ Erro ao fazer upload", { 
      description: `Tentativas esgotadas. Último erro: ${lastError?.message || 'Erro desconhecido'}`
    });
    
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload de Planilha</DialogTitle>
          <DialogDescription>
            Selecione um arquivo Excel (.xlsx) para enviar aos nossos sistemas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card/50 hover:bg-card/80 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <FileSpreadsheet className="w-8 h-8 mb-2 text-primary" />
                    <p className="text-sm text-foreground font-medium">{file.name}</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Clique para selecionar ou arraste o arquivo</p>
                  </>
                )}
              </div>
              <Input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? "Enviando..." : "Enviar para Processamento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
