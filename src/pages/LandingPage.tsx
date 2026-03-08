import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Code2, Layers, Zap, Sparkles, Globe, ArrowRight,
  Monitor, Smartphone, Palette, MousePointerClick,
  Layout, Type, Image, ShoppingCart, Play,
  CheckCircle2, Star, Users,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    { icon: MousePointerClick, title: 'Drag & Drop Editor', desc: 'Build visually with an intuitive canvas. No coding skills needed.' },
    { icon: Palette, title: '100+ Components', desc: 'Buttons, forms, galleries, navbars, footers, and more — ready to use.' },
    { icon: Monitor, title: 'Responsive Design', desc: 'Preview and fine-tune for desktop, tablet, and mobile in real time.' },
    { icon: Globe, title: 'One-Click Publish', desc: 'Deploy to a live URL instantly with built-in hosting and SSL.' },
    { icon: Layout, title: 'Pro Templates', desc: 'Start with stunning, professionally designed templates for any niche.' },
    { icon: Code2, title: 'Export Source Code', desc: 'Download clean React or HTML code. You own everything you build.' },
    { icon: Zap, title: 'Auto-Save', desc: 'Your progress is automatically saved. Never lose a single change.' },
    { icon: ShoppingCart, title: 'E-commerce Ready', desc: 'Product cards, shopping carts, and checkout flows built in.' },
  ];

  const stats = [
    { value: '50+', label: 'Components' },
    { value: '10+', label: 'Templates' },
    { value: '3', label: 'Export Formats' },
    { value: '∞', label: 'Possibilities' },
  ];

  const steps = [
    { num: '01', title: 'Choose a Template', desc: 'Browse professionally designed templates for any purpose.' },
    { num: '02', title: 'Customize Everything', desc: 'Drag, drop, and style every element to match your vision.' },
    { num: '03', title: 'Publish Instantly', desc: 'Go live with one click. Your site is hosted and ready.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* === NAV === */}
      <nav className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: 'var(--gradient-primary)' }}>
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DevBuilder</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate('/dashboard')}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-primary-foreground"
                style={{ background: 'var(--gradient-primary)' }}>
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/auth')}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </button>
                <button onClick={() => navigate('/templates')}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-primary-foreground btn-glow"
                  style={{ background: 'var(--gradient-primary)' }}>
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-15 blur-[150px] animate-gradient"
            style={{ background: 'var(--gradient-primary)' }} />
          <div className="absolute top-40 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
            style={{ background: 'hsl(var(--accent))' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-[120px]"
            style={{ background: 'hsl(var(--primary))' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8 hover:border-primary/30 transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>The Visual Website Builder for Everyone</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] mb-8 animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            Create Stunning<br />
            Websites <span className="text-gradient">Without Code</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s' }}>
            The most powerful visual website builder. Drag & drop components,
            choose from pro templates, and publish in seconds. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.3s' }}>
            <button onClick={() => navigate('/templates')}
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:scale-[1.02] btn-glow"
              style={{ background: 'var(--gradient-primary)' }}>
              <Play className="w-4 h-4" />
              Start Building — It's Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => { const el = document.getElementById('how-it-works'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-medium border border-border hover:bg-muted transition-colors">
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual: mock editor */}
        <div className="max-w-5xl mx-auto mt-20 relative animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="rounded-2xl border border-border/50 overflow-hidden shadow-2xl shadow-black/10 bg-card">
            {/* Mock toolbar */}
            <div className="h-10 flex items-center gap-2 px-4 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-background text-xs text-muted-foreground">devbuilder.app/editor</div>
              </div>
            </div>
            {/* Mock canvas */}
            <div className="h-[340px] sm:h-[420px] flex">
              <div className="w-56 border-r border-border p-3 hidden sm:block bg-muted/30">
                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Components</div>
                {['Button', 'Text Block', 'Image', 'Card', 'Form', 'Nav Bar'].map(c => (
                  <div key={c} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1.5 bg-background/50 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-8 flex items-center justify-center" style={{ background: 'var(--gradient-hero)' }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-float"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-2">Your Canvas Awaits</p>
                  <p className="text-sm text-muted-foreground">Drag components here to start building</p>
                </div>
              </div>
              <div className="w-64 border-l border-border p-3 hidden lg:block bg-muted/30">
                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Properties</div>
                {['Font Size', 'Color', 'Padding', 'Margin', 'Border'].map(p => (
                  <div key={p} className="mb-3">
                    <div className="text-xs text-muted-foreground mb-1">{p}</div>
                    <div className="h-8 rounded-lg bg-background/50 border border-border/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow under the card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-[40px] opacity-20"
            style={{ background: 'var(--gradient-primary)' }} />
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Zap className="w-3 h-3 text-primary" /> Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Build & Launch</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Professional tools that rival Wix and WordPress — in a cleaner, faster package.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--gradient-hero)' }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-primary" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three Steps to <span className="text-gradient">Your Website</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative p-8 rounded-2xl border border-border bg-card text-center group hover:border-primary/30 transition-all duration-300">
                <div className="text-5xl font-black text-gradient opacity-20 mb-4">{num}</div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TEMPLATES PREVIEW === */}
      <section id="templates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Layout className="w-3 h-3 text-primary" /> Templates
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start With a <span className="text-gradient">Pro Template</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Professionally designed templates for every industry. Fully customizable, responsive, and ready to publish.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children mb-10">
            {[
              { emoji: '🗒️', name: 'Blank Canvas', cat: 'Starter' },
              { emoji: '📝', name: 'Blog', cat: 'Content' },
              { emoji: '🏢', name: 'Business', cat: 'Corporate' },
              { emoji: '🚀', name: 'Landing Page', cat: 'Marketing' },
              { emoji: '🛒', name: 'E-commerce', cat: 'Store' },
              { emoji: '🎨', name: 'Portfolio', cat: 'Creative' },
              { emoji: '🍽️', name: 'Restaurant', cat: 'Food' },
              { emoji: '💼', name: 'Agency', cat: 'Business' },
              { emoji: '💻', name: 'SaaS', cat: 'Tech' },
              { emoji: '📸', name: 'Photography', cat: 'Creative' },
            ].map(t => (
              <div key={t.name}
                className="template-card group cursor-pointer"
                onClick={() => navigate('/templates')}>
                <div className="h-28 sm:h-32 flex items-center justify-center text-4xl sm:text-5xl bg-muted/30 group-hover:bg-muted/50 transition-colors">
                  {t.emoji}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.cat}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/templates')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all">
              Browse All Templates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* === SOCIAL PROOF === */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-6 h-6 text-warning fill-warning" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {[
              { quote: "DevBuilder made my portfolio site in under an hour. The drag and drop is incredibly smooth.", name: "Alex Chen", role: "Designer" },
              { quote: "Switched from WordPress. DevBuilder is faster, cleaner, and the code export is a game changer.", name: "Sarah Kim", role: "Developer" },
              { quote: "I built an entire e-commerce store without writing a single line of code. Amazing tool.", name: "Marcus Johnson", role: "Entrepreneur" },
            ].map(t => (
              <div key={t.name} className="p-6 rounded-2xl border border-border bg-card">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
                    style={{ background: 'var(--gradient-primary)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center p-14 rounded-3xl relative overflow-hidden"
          style={{ background: 'var(--gradient-primary)' }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-white/70 mb-8 relative z-10 max-w-md mx-auto">
            Join thousands of creators building beautiful websites with DevBuilder. No credit card required.
          </p>
          <button onClick={() => navigate('/templates')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-foreground font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all relative z-10">
            Start Building Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}>
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">DevBuilder</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            </div>
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} DevBuilder. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
