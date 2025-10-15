import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
// import { auth, functions } from "@/integrations/firebase/client";
// import { httpsCallable } from "firebase/functions";

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
    
    // Remover validação do Firebase Auth, se desejar pode validar login Google separadamente

    setUploading(true);
    const uploadToast = toast.info("Iniciando upload...", { 
      description: "O arquivo está sendo enviado para processamento.",
      duration: 0 // Toast persistente
    });

    // Upload via GitHub API
    try {
      toast.info("Enviando arquivo para o GitHub...");
      // Token pessoal do GitHub (configure via .env ou peça ao usuário)
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      const REPO = "RodrigoMD2025/cadastrosmd-automation-web"; // ajuste para seu repo
      const BRANCH = "main";
      const PATH = `uploads/${file.name}`; // pasta uploads no repo

      // Ler arquivo como base64
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Criar arquivo via API do GitHub
      const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Upload de arquivo via frontend: ${file.name}`,
          content: fileBase64,
          branch: BRANCH,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      toast.dismiss(uploadToast);
      toast.success("✅ Upload concluído!", {
        description: "Arquivo enviado para o repositório do GitHub. O processamento será iniciado pelo GitHub Actions."
      });
      onOpenChange(false);
      setFile(null);
    } catch (error: any) {
      toast.dismiss(uploadToast);
      toast.error("❌ Erro ao enviar para o GitHub", {
        description: error?.message || "Erro desconhecido"
      });
    }
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
