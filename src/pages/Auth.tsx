import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/integrations/firebase/client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Bot } from 'lucide-react'; // Importando o ícone

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login bem-sucedido!');
        navigate('/');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Conta criada com sucesso! Você será redirecionado.');
        navigate('/');
      }
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro. Tente novamente.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'O formato do e-mail é inválido.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'E-mail ou senha incorretos.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Este e-mail já está em uso.';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
          break;
        default:
          console.error('Erro de autenticação:', error);
      }
      toast.error('Erro de Autenticação', { description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-background">
      <div className="hidden lg:flex lg:flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 p-10 text-white">
        <div className="text-center">
          <Bot className="mx-auto h-24 w-24 mb-6" />
          <h1 className="text-4xl font-bold tracking-tight">Automação de Cadastros</h1>
          <p className="mt-4 text-lg text-blue-100">
            Dê adeus aos cadastros manuais. Faça o upload da sua planilha e deixe nossa automação cuidar do resto.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm w-full border-none shadow-none lg:border lg:shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? 'Login' : 'Criar Conta'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Entre com seu e-mail para acessar o painel' : 'Crie uma conta para começar a usar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Criar conta')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="underline">
                {isLogin ? 'Crie uma' : 'Faça login'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
