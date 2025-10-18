import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Bot, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação - Substituir pela lógica real do Firebase
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(isLogin ? 'Login bem-sucedido!' : 'Conta criada com sucesso!');
      navigate('/');
    } catch (error: any) {
      toast.error('Erro de Autenticação', { 
        description: 'Ocorreu um erro. Tente novamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:flex-col items-center justify-center bg-gradient-to-br from-primary to-[hsl(224_76%_48%)] p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNjAgMTAgTSAxMCAwIEwgMTAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative z-10 text-center max-w-md space-y-6 animate-fade-in">
          <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg">
            <Bot className="h-20 w-20" strokeWidth={1.5} />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">
              Automação de Cadastros
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Dê adeus aos cadastros manuais. Faça o upload da sua planilha e deixe nossa automação cuidar do resto.
            </p>
          </div>

          <div className="pt-8 space-y-3 text-primary-foreground/80">
            <div className="flex items-center gap-3 justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60"></div>
              <span className="text-sm">Upload rápido e seguro</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60"></div>
              <span className="text-sm">Processamento automático</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60"></div>
              <span className="text-sm">Monitoramento em tempo real</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md border-border shadow-medium transition-all duration-300 hover:shadow-lg">
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="lg:hidden inline-flex mx-auto p-3 rounded-xl bg-primary/10 mb-2">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
            </CardTitle>
            <CardDescription className="text-base">
              {isLogin 
                ? 'Entre com seu e-mail para acessar o painel' 
                : 'Preencha os dados para começar a usar'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aguarde...
                  </>
                ) : (
                  isLogin ? 'Entrar' : 'Criar conta'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="font-semibold text-primary hover:underline transition-colors duration-200"
                >
                  {isLogin ? 'Crie uma' : 'Faça login'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
