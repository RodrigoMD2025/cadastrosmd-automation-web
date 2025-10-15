import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Altere para a URL do seu projeto na Vercel
  const API_URL = 'https://cadastrosmd-automation-web.vercel.app'; // <<<<<<< ATUALIZE ESTA LINHA

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
        toast.error("Formato inválido", { 
          description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)." 
        });
        return;
      }
      
      if (selectedFile.size > 25 * 1024 * 1024) { // Aumentado para 25MB para corresponder ao Worker
        toast.error("Arquivo muito grande", {
          description: "O arquivo deve ter no máximo 25MB."
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
      const formData = new FormData();
      formData.append('file', file);

      toast.info('📤 Enviando arquivo...');

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro no upload');
      }

      const data = await response.json();

      toast.success('✅ Upload concluído!', {
        description: `Arquivo: ${data.fileName} (${(data.size / 1024).toFixed(2)} KB)`,
        action: {
          label: 'Ver execução',
          onClick: () => window.open(data.githubActionsUrl, '_blank'),
        },
        duration: 10000,
      });

      setFile(null);
      onOpenChange(false); // Fechar o dialog após o upload

    } catch (error) {
      console.error('Erro:', error);
      toast.error('❌ ' + (error as Error).message);
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

        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">
              Selecione a planilha Excel
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />
          </div>
          
          {file && (
            <div className="text-sm text-gray-600">
              📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
          
          <Button 
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? '⏳ Enviando...' : '🚀 Fazer Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
