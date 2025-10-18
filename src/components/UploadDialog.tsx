import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle, Database } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'https://cadastrosmd-automation-web.vercel.app';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<"overwrite" | "append">("append");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    setIsUploading(true);
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadMode", uploadMode);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "Planilha enviada com sucesso!");
      } else {
        const errorData = await response.json();
        toast.error("Erro no upload", {
          description: errorData.message || "Ocorreu um erro ao enviar a planilha.",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast.error("Erro de conexão", {
        description: "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente.",
      });
    } finally {
      setIsUploading(false);
      setFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Upload className="h-5 w-5 text-primary" />
            Upload de Planilha
          </DialogTitle>
          <DialogDescription>
            Faça upload de uma planilha Excel (.xlsx) com os dados dos cadastros
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium">
              Selecionar Arquivo
            </Label>
            <div className="flex items-center gap-2">
              <input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {file && (
              <p className="text-xs text-muted-foreground">
                Arquivo selecionado: {file.name}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Modo de Importação
            </Label>
            <RadioGroup value={uploadMode} onValueChange={(value) => setUploadMode(value as "overwrite" | "append")}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="append" id="append" />
                <Label htmlFor="append" className="flex-1 cursor-pointer">
                  <div className="font-medium">Adicionar aos dados existentes</div>
                  <div className="text-xs text-muted-foreground">Os novos dados serão adicionados à base atual</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-destructive/50 hover:bg-destructive/5 transition-colors">
                <RadioGroupItem value="overwrite" id="overwrite" />
                <Label htmlFor="overwrite" className="flex-1 cursor-pointer">
                  <div className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Apagar dados atuais e substituir
                  </div>
                  <div className="text-xs text-muted-foreground">Todos os dados existentes serão removidos</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading} className="gap-2">
            {isUploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Enviando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Fazer Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
