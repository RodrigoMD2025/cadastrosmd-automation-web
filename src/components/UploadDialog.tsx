import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const GITHUB_REPO = 'RodrigoMD2025/cadastrosmd-automation-web';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
        toast.error("Formato inválido", { 
          description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)." 
        });
        return;
      }
      
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

  async function handleUpload() {
    if (!file) {
      toast.error('Selecione um arquivo');
      return;
    }

    setUploading(true);

    try {
      // 1. Upload para transfer.sh
      toast.info('📤 Enviando arquivo...');
      
      const transferResponse = await fetch(`https://transfer.sh/${file.name}`, {
        method: 'PUT',
        body: file,
      });

      if (!transferResponse.ok) {
        throw new Error('Erro ao fazer upload para transfer.sh');
      }

      const fileUrl = await transferResponse.text();
      const cleanUrl = fileUrl.trim();

      toast.success('✅ Arquivo enviado!');

      // 2. Criar Issue no GitHub (SEM AUTENTICAÇÃO!)
      toast.info('🚀 Iniciando processamento...');

      const issueBody = {
        title: `📊 Upload: ${file.name}`,
        body: `## Novo upload de planilha
        
**Arquivo:** ${file.name}
**Tamanho:** ${(file.size / 1024).toFixed(2)} KB
**Data:** ${new Date().toLocaleString('pt-BR')}
**URL:** ${cleanUrl}

---
🤖 Este upload será processado automaticamente pelo GitHub Actions.`,
        labels: ['upload', 'auto-process']
      };

      const issueResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(issueBody)
        }
      );

      if (!issueResponse.ok) {
        const error = await issueResponse.json();
        throw new Error(error.message || 'Erro ao criar issue');
      }

      const issue = await issueResponse.json();

      toast.success('✅ Processamento iniciado!', {
        description: `Acompanhe em: ${issue.html_url}`,
        duration: 10000,
      });

      window.open(issue.html_url, '_blank');
      onOpenChange(false);
      setFile(null);

    } catch (error) {
      console.error('Erro:', error);
      toast.error('❌ Erro: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  }

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