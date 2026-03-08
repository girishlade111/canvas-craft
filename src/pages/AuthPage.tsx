import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Code2, Loader2, Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[150px]"
          style={{ background: 'var(--gradient-primary)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'var(--gradient-primary)' }}>
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold">DevBuilder</span>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl border border-border bg-card shadow-xl">
          <h2 className="text-xl font-bold text-center mb-1">
            {view === 'login' && 'Welcome back'}
            {view === 'signup' && 'Create your account'}
            {view === 'forgot' && 'Reset password'}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {view === 'login' && 'Sign in to access your projects'}
            {view === 'signup' && 'Start building websites for free'}
            {view === 'forgot' && "We'll send you a reset link"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div>
                <label className="block text-sm mb-1.5 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
              className="w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {view === 'login' && 'Sign In'}
              {view === 'signup' && 'Create Account'}
              {view === 'forgot' && 'Send Reset Link'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {view === 'login' && (
              <>Don't have an account?{' '}
                <button onClick={() => setView('signup')} className="text-primary hover:underline font-medium">Sign Up</button>
              </>
            )}
            {view === 'signup' && (
              <>Already have an account?{' '}
                <button onClick={() => setView('login')} className="text-primary hover:underline font-medium">Sign In</button>
              </>
            )}
            {view === 'forgot' && (
              <button onClick={() => setView('login')} className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                <ArrowLeft className="w-3 h-3" /> Back to Sign In
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
