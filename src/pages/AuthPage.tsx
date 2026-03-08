import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Code2, Loader2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type View = 'login' | 'signup' | 'forgot';

const AuthPage = () => {
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast({ title: 'Check your email', description: 'Password reset link has been sent.' });
        setView('login');
      } else if (view === 'login') {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password);
        toast({ title: 'Account created', description: 'Check your email to confirm your account.' });
        setView('login');
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">DevBuilder</span>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
          {view === 'login' && 'Sign in to your account'}
          {view === 'signup' && 'Create your account'}
          {view === 'forgot' && 'Reset your password'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5 text-muted-foreground font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {view !== 'forgot' && (
            <div>
              <label className="block text-sm mb-1.5 text-muted-foreground font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {view === 'login' && (
            <button type="button" onClick={() => setView('forgot')} className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {view === 'login' && 'Sign In'}
            {view === 'signup' && 'Create Account'}
            {view === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {view === 'login' && (
            <>Don't have an account?{' '}
              <button onClick={() => setView('signup')} className="text-primary hover:underline">Sign Up</button>
            </>
          )}
          {view === 'signup' && (
            <>Already have an account?{' '}
              <button onClick={() => setView('login')} className="text-primary hover:underline">Sign In</button>
            </>
          )}
          {view === 'forgot' && (
            <button onClick={() => setView('login')} className="text-primary hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
