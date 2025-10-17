import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg border-border">
        <div className="inline-flex p-4 rounded-full bg-primary/10 mx-auto">
          <AlertCircle className="h-16 w-16 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <Button 
          onClick={() => navigate("/")}
          className="gap-2 w-full sm:w-auto"
          size="lg"
        >
          <Home className="h-4 w-4" />
          Voltar para o Início
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
