import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Code2, Layers, Zap, Sparkles, Globe, ArrowRight,
  Monitor, Smartphone, Palette, MousePointerClick,
  Layout, ShoppingCart, Play, CheckCircle2, Star,
  Shield, Clock, Download, Eye, Cpu, PenTool,
  BarChart3, Lock, Webhook, FileCode2, Brush,
  Settings, Box, Figma, Chrome, Rocket,
  Instagram, Linkedin, Github, CodepenIcon, Mail, ExternalLink,
} from 'lucide-react';

// Static data defined outside component to avoid re-creation on renders
const features = [
  { icon: MousePointerClick, title: 'Drag & Drop Editor', desc: 'Build visually with an intuitive canvas. Click, drag, and place components exactly where you want them.' },
  { icon: Palette, title: '100+ Components', desc: 'Buttons, forms, galleries, navbars, footers, hero sections, pricing tables, and more.' },
  { icon: Monitor, title: 'Responsive Design', desc: 'Pixel-perfect on every device. Preview and tweak desktop, tablet, and mobile layouts in real time.' },
  { icon: Globe, title: 'One-Click Publish', desc: 'Deploy to a live URL instantly with built-in hosting, SSL, and custom domain support.' },
  { icon: Layout, title: 'Pro Templates', desc: '10+ professionally designed templates for blogs, stores, portfolios, restaurants, and SaaS.' },
  { icon: Code2, title: 'Export Source Code', desc: 'Download clean React, Next.js, or static HTML. You own 100% of everything you build.' },
  { icon: Zap, title: 'Auto-Save', desc: 'Your progress is automatically saved every 3 seconds. Never lose a single change, ever.' },
  { icon: ShoppingCart, title: 'E-commerce Ready', desc: 'Product cards, shopping carts, checkout flows, and pricing tables — all built in.' },
];

const advancedFeatures = [
  { icon: PenTool, title: 'Visual Style Editor', desc: 'Edit fonts, colors, shadows, borders, spacing, and more with a visual property panel.' },
  { icon: Layers, title: 'Layer Management', desc: 'Organize elements with sections, containers, and nested component trees like Figma.' },
  { icon: Clock, title: 'Version History', desc: 'Every publish creates a snapshot. Roll back to any previous version with one click.' },
  { icon: FileCode2, title: 'Code Editor', desc: 'Switch to code view anytime. Edit component properties with a built-in Monaco editor.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Enterprise-grade security with row-level access control. Your data stays yours.' },
  { icon: Download, title: 'Multi-Format Export', desc: 'Export as React components, Next.js pages, or static HTML/CSS for any hosting provider.' },
];

const stats = [
  { value: '50+', label: 'Components' },
  { value: '10+', label: 'Templates' },
  { value: '3', label: 'Export Formats' },
  { value: '∞', label: 'Possibilities' },
];

const steps = [
  { num: '01', title: 'Choose a Template', desc: 'Browse professionally designed templates for blogs, stores, portfolios, agencies, SaaS and more. Or start from a blank canvas.', icon: Layout },
  { num: '02', title: 'Customize Everything', desc: 'Drag & drop components, edit text, change colors, adjust spacing. The visual editor makes it effortless.', icon: Brush },
  { num: '03', title: 'Publish & Share', desc: 'Go live with one click. Get a shareable URL, connect a custom domain, and track your deployments.', icon: Rocket },
];

const comparisons = [
  { feature: 'Visual Drag & Drop', devbuilder: true, others: true },
  { feature: 'No Account to Start', devbuilder: true, others: false },
  { feature: 'Export Source Code', devbuilder: true, others: false },
  { feature: 'React/Next.js Export', devbuilder: true, others: false },
  { feature: 'Built-in Code Editor', devbuilder: true, others: false },
  { feature: 'Version History', devbuilder: true, others: true },
  { feature: 'Responsive Preview', devbuilder: true, others: true },
  { feature: '100% Free to Start', devbuilder: true, others: false },
];

const useCases = [
  { emoji: '💼', title: 'Business Websites', desc: 'Professional sites for companies of all sizes with contact forms, team sections, and service pages.' },
  { emoji: '🛒', title: 'Online Stores', desc: 'Beautiful e-commerce stores with product grids, pricing, and checkout-ready layouts.' },
  { emoji: '🎨', title: 'Portfolios', desc: 'Showcase your creative work with stunning gallery layouts and project case studies.' },
  { emoji: '📝', title: 'Blogs & Content', desc: 'Clean, readable blog layouts with post grids, categories, and author pages.' },
  { emoji: '🚀', title: 'Landing Pages', desc: 'High-converting landing pages with hero sections, CTAs, and social proof blocks.' },
  { emoji: '🍽️', title: 'Restaurants & Food', desc: 'Menu displays, reservation info, and atmospheric designs for food businesses.' },
];

const faqs = [
  { q: 'Do I need coding skills?', a: 'Not at all! DevBuilder is designed for everyone. Drag, drop, and click to build your website. If you know code, you can switch to the code editor anytime.' },
  { q: 'Is it really free?', a: 'Yes! You can start building immediately without an account or payment. Only sign in when you want to save and publish your project.' },
  { q: 'Can I export my code?', a: 'Absolutely. Export your project as clean React components, Next.js pages, or static HTML/CSS. You own everything you build.' },
  { q: 'What about hosting?', a: 'We handle hosting for you with one-click publish. You get a live URL instantly, or connect your own custom domain.' },
  { q: 'Can I use my own domain?', a: 'Yes. Connect any custom domain to your published site through the project settings panel.' },
  { q: 'How is this different from Wix or WordPress?', a: 'DevBuilder gives you full source code ownership, a cleaner interface, React/Next.js exports, and you can start building without any account. No vendor lock-in.' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <a href="#compare" className="hover:text-foreground transition-colors">Compare</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[80px]"
            style={{ background: 'var(--gradient-primary)', willChange: 'auto' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8 hover:border-primary/30 transition-colors cursor-default">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>The #1 Visual Website Builder — 100% Free to Start</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] mb-8 animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            Create Stunning<br />
            Websites <span className="text-gradient">Without Code</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.2s' }}>
            The most powerful visual website builder. Drag & drop components,
            choose from pro templates, and publish in seconds. No coding required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-10 animate-slide-up"
            style={{ animationDelay: '0.25s' }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> No account needed to start</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" /> Export your code</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.3s' }}>
            <button onClick={() => navigate('/templates')}
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:scale-[1.02] btn-glow"
              style={{ background: 'var(--gradient-primary)' }}>
              <Play className="w-4 h-4" />
              Start Building — It's Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-medium border border-border hover:bg-muted transition-colors">
              <Eye className="w-4 h-4" /> See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-14 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
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
            <div className="h-10 flex items-center gap-2 px-4 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-background text-xs text-muted-foreground border border-border/50">devbuilder.app/editor</div>
              </div>
            </div>
            <div className="h-[340px] sm:h-[420px] flex">
              <div className="w-56 border-r border-border p-3 hidden sm:block bg-muted/30">
                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Components</div>
                {['🔘 Button', '📝 Text Block', '🖼️ Image', '📦 Card', '📋 Form', '🧭 Nav Bar', '⭐ Rating', '💬 Testimonial'].map(c => (
                  <div key={c} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1.5 bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-default">
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-8 flex items-center justify-center relative" style={{ background: 'var(--gradient-hero)' }}>
                {/* Mock website preview */}
                <div className="w-full max-w-md bg-background rounded-xl border border-border/50 shadow-lg overflow-hidden">
                  <div className="h-8 bg-muted/50 border-b border-border flex items-center px-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="h-2.5 w-16 rounded bg-muted" />
                    <div className="flex-1" />
                    <div className="flex gap-3">
                      <div className="h-2 w-8 rounded bg-muted" />
                      <div className="h-2 w-8 rounded bg-muted" />
                      <div className="h-2 w-8 rounded bg-muted" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="h-3 w-32 rounded bg-primary/20 mx-auto mb-3" />
                    <div className="h-6 w-48 rounded bg-foreground/10 mx-auto mb-2" />
                    <div className="h-2.5 w-40 rounded bg-muted mx-auto mb-4" />
                    <div className="h-8 w-28 rounded-lg mx-auto" style={{ background: 'var(--gradient-primary)', opacity: 0.7 }} />
                  </div>
                  <div className="px-6 pb-6 grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-lg bg-muted/50 border border-border/30" />
                    <div className="h-16 rounded-lg bg-muted/50 border border-border/30" />
                    <div className="h-16 rounded-lg bg-muted/50 border border-border/30" />
                  </div>
                </div>
              </div>
              <div className="w-64 border-l border-border p-3 hidden lg:block bg-muted/30">
                <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Properties</div>
                {['Font Size', 'Color', 'Padding', 'Margin', 'Border Radius', 'Shadow', 'Opacity'].map(p => (
                  <div key={p} className="mb-2.5">
                    <div className="text-xs text-muted-foreground mb-1">{p}</div>
                    <div className="h-7 rounded-lg bg-background/50 border border-border/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-[40px] opacity-20"
            style={{ background: 'var(--gradient-primary)' }} />
        </div>
      </section>

      {/* === TRUSTED BY (logos strip) === */}
      <section className="py-12 px-6 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/50 mb-8 font-medium">Trusted by creators worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-40">
            {['Startups', 'Agencies', 'Freelancers', 'Designers', 'Developers', 'Entrepreneurs'].map(name => (
              <span key={name} className="text-lg font-bold tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Zap className="w-3 h-3 text-primary" /> Core Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Build & Launch</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Professional tools that rival Wix and WordPress — in a cleaner, faster, open-source package.
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

      {/* === ADVANCED FEATURES (2-col highlight) === */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'var(--gradient-hero)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Cpu className="w-3 h-3 text-primary" /> Advanced
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Power Tools for <span className="text-gradient">Power Users</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Everything you'd expect from a professional-grade builder, and then some.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {advancedFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border border-border bg-card group hover:border-primary/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: 'var(--gradient-hero)' }}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-primary" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three Steps to <span className="text-gradient">Your Website</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From idea to live website in minutes. No technical knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {steps.map(({ num, title, desc, icon: Icon }) => (
              <div key={num} className="relative p-8 rounded-2xl border border-border bg-card text-center group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Step {num}</div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === USE CASES === */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'var(--gradient-hero)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Box className="w-3 h-3 text-primary" /> Use Cases
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Build <span className="text-gradient">Any Kind</span> of Website
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Whatever you're building, DevBuilder has the templates and tools to make it happen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {useCases.map(({ emoji, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-border bg-card group hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/templates')}>
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
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

      {/* === COMPARISON TABLE === */}
      <section id="compare" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'var(--gradient-hero)' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <BarChart3 className="w-3 h-3 text-primary" /> Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We <span className="text-gradient">Compare</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              See why creators choose DevBuilder over traditional website builders.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-semibold border-b border-border">
              <div className="p-4 text-muted-foreground">Feature</div>
              <div className="p-4 text-center text-gradient">DevBuilder</div>
              <div className="p-4 text-center text-muted-foreground">Others</div>
            </div>
            {comparisons.map(({ feature, devbuilder, others }, i) => (
              <div key={feature} className={`grid grid-cols-3 text-sm ${i < comparisons.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="p-4 text-muted-foreground">{feature}</div>
                <div className="p-4 text-center">
                  {devbuilder
                    ? <CheckCircle2 className="w-5 h-5 text-success mx-auto" />
                    : <span className="text-muted-foreground/30">—</span>}
                </div>
                <div className="p-4 text-center">
                  {others
                    ? <CheckCircle2 className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    : <span className="text-muted-foreground/30">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="text-gradient">Creators</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {[
              { quote: "DevBuilder made my portfolio site in under an hour. The drag and drop is incredibly smooth and the templates are gorgeous.", name: "Alex Chen", role: "UI Designer", stars: 5 },
              { quote: "Switched from WordPress and never looked back. DevBuilder is faster, cleaner, and the code export is an absolute game changer.", name: "Sarah Kim", role: "Full-Stack Developer", stars: 5 },
              { quote: "I built an entire e-commerce store without writing a single line of code. The component library is incredibly comprehensive.", name: "Marcus Johnson", role: "Entrepreneur", stars: 5 },
              { quote: "As a freelancer, DevBuilder lets me spin up client sites in hours instead of days. The export feature means no vendor lock-in.", name: "Priya Sharma", role: "Freelance Designer", stars: 5 },
              { quote: "The version history saved my life when a client wanted to revert changes. DevBuilder thinks of everything.", name: "James Wright", role: "Agency Owner", stars: 5 },
              { quote: "Finally a builder that doesn't treat me like I can't code. Visual when I want it, code when I need it. Perfect balance.", name: "Emma Liu", role: "Software Engineer", stars: 5 },
            ].map(t => (
              <div key={t.name} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all">
                <div className="flex gap-0.5 mb-3">
                  {Array(t.stars).fill(0).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
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

      {/* === FAQ === */}
      <section id="faq" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'var(--gradient-hero)' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              <Settings className="w-3 h-3 text-primary" /> FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="space-y-4 stagger-children">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-border bg-card overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-semibold hover:text-primary transition-colors list-none">
                  {q}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed -mt-1">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center p-14 sm:p-20 rounded-3xl relative overflow-hidden"
          style={{ background: 'var(--gradient-primary)' }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 relative z-10 leading-tight">
            Ready to Build<br />Something Amazing?
          </h2>
          <p className="text-white/70 mb-10 relative z-10 max-w-md mx-auto text-lg">
            Join thousands of creators building beautiful websites with DevBuilder. Free forever, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button onClick={() => navigate('/templates')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-foreground font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
              Start Building Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-border py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">DevBuilder</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                The most powerful visual website builder. Create, customize, and publish stunning websites without code.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/girish_lade_/', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/girish-lade-075bba201/', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/girishlade111', label: 'GitHub' },
                  { icon: CodepenIcon, href: 'https://codepen.io/Girish-Lade-the-looper', label: 'CodePen' },
                  { icon: Mail, href: 'mailto:admin@ladestack.in', label: 'Email' },
                  { icon: ExternalLink, href: 'https://ladestack.in', label: 'Website' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    title={label}
                    className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'hsl(var(--muted))',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--gradient-primary)';
                      e.currentTarget.style.boxShadow = '0 4px 15px -3px hsl(var(--primary) / 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'hsl(var(--muted))';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <a href="#features" className="block hover:text-foreground transition-colors">Features</a>
                <a href="#templates" className="block hover:text-foreground transition-colors">Templates</a>
                <a href="#how-it-works" className="block hover:text-foreground transition-colors">How It Works</a>
                <a href="#compare" className="block hover:text-foreground transition-colors">Compare</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <a href="#faq" className="block hover:text-foreground transition-colors">FAQ</a>
                <span className="block cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/docs')}>Documentation</span>
                <span className="block cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/changelog')}>Changelog</span>
                <span className="block cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/api-reference')}>API Reference</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Connect</h4>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <a href="https://www.instagram.com/girish_lade_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <a href="https://www.linkedin.com/in/girish-lade-075bba201/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a href="https://github.com/girishlade111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href="mailto:admin@ladestack.in" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5" /> admin@ladestack.in
                </a>
                <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> ladestack.in
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} DevBuilder. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/privacy')}>Privacy Policy</span>
              <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/terms')}>Terms of Service</span>
              <span>Made with ❤️ by <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">LadeStack</a></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
