import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Code2, Layers, Zap, Sparkles, Globe, ArrowRight,
  Monitor, Smartphone, Palette, MousePointerClick,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Code2 className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">DevBuilder</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/templates')}
                  className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start Building
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Glow effect */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: 'hsl(var(--primary))' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Visual Website Builder — No Code Required
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Build Websites{' '}
            <span className="text-primary">Visually.</span>
            <br />
            Ship Them{' '}
            <span className="text-accent">Instantly.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Drag, drop, and design stunning websites with a professional-grade builder.
            Choose a template, customize everything, and publish in seconds.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/templates')}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            {user && (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Build</h2>
          <p className="text-muted-foreground text-center mb-14 max-w-lg mx-auto">
            A complete toolkit to design, build, and ship production-ready websites.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MousePointerClick, title: 'Drag & Drop', desc: 'Intuitive visual editor with real-time canvas' },
              { icon: Palette, title: 'Rich Components', desc: '50+ pre-built components ready to customize' },
              { icon: Monitor, title: 'Responsive', desc: 'Desktop, tablet, and mobile previews built-in' },
              { icon: Globe, title: 'One-Click Publish', desc: 'Deploy instantly with version history & rollback' },
              { icon: Layers, title: 'Templates', desc: 'Start with professionally designed templates' },
              { icon: Code2, title: 'Code Export', desc: 'Export clean React or static HTML source code' },
              { icon: Zap, title: 'Auto-Save', desc: 'Never lose work — changes saved automatically' },
              { icon: Smartphone, title: 'Live Preview', desc: 'Preview your site exactly as visitors see it' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl border border-border bg-card relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)), transparent 70%)' }} />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to Build Your Website?</h2>
          <p className="text-muted-foreground mb-8 relative z-10">
            Pick a template, customize it visually, and publish — all for free. No account needed to start.
          </p>
          <button
            onClick={() => navigate('/templates')}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 relative z-10"
          >
            Choose a Template
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">DevBuilder</span>
          </div>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
