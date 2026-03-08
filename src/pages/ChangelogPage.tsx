import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, Bug, Zap, Shield, Box, Rocket } from 'lucide-react';

const ChangelogPage = () => {
  const navigate = useNavigate();

  const releases = [
    {
      version: '2.5.0',
      date: 'March 8, 2026',
      tag: 'Latest',
      tagColor: 'bg-green-500/10 text-green-600',
      changes: [
        { type: 'feature', icon: Sparkles, text: 'Full Supabase integration for CMS, eCommerce, Marketing, Bookings & App Market panels' },
        { type: 'feature', icon: Sparkles, text: 'Advanced SEO suite with JSON-LD schema generation, automated audit scoring, and social preview cards' },
        { type: 'feature', icon: Sparkles, text: 'Comprehensive robots.txt and XML sitemap generation for search engine optimization' },
        { type: 'feature', icon: Sparkles, text: '50+ meta tags including Open Graph, Twitter Cards, and structured data markup' },
        { type: 'feature', icon: Sparkles, text: 'Documentation, Changelog, API Reference, Privacy Policy, and Terms of Service pages' },
        { type: 'improvement', icon: Zap, text: 'All builder panels now persist data to Supabase with real-time cache invalidation' },
        { type: 'improvement', icon: Zap, text: 'Enhanced landing page with LadeStack branding and social media integration' },
      ],
    },
    {
      version: '2.4.0',
      date: 'March 5, 2026',
      changes: [
        { type: 'feature', icon: Sparkles, text: 'AI Tools Panel — AI-powered text generation, image creation, SEO analysis, and design suggestions' },
        { type: 'feature', icon: Sparkles, text: 'App Market Panel — Install/remove 12+ third-party integrations (Analytics, Stripe, Mailchimp, etc.)' },
        { type: 'feature', icon: Sparkles, text: 'Marketing Hub — Email campaign management with open/click rate tracking' },
        { type: 'feature', icon: Sparkles, text: 'Social Media Scheduler — Multi-platform post scheduling for Facebook, Instagram, Twitter, LinkedIn' },
        { type: 'improvement', icon: Zap, text: 'Builder sidebar reorganized with icon-based navigation for all feature panels' },
      ],
    },
    {
      version: '2.3.0',
      date: 'February 28, 2026',
      changes: [
        { type: 'feature', icon: Sparkles, text: 'eCommerce Panel — Full product management with variants, inventory tracking, and order management' },
        { type: 'feature', icon: Sparkles, text: 'Booking & Events Panel — Service scheduling, event capacity management, and calendar view' },
        { type: 'feature', icon: Sparkles, text: 'CMS Panel — Blog post management with categories, tags, and content scheduling' },
        { type: 'feature', icon: Sparkles, text: 'Coupon system — Create percentage and fixed-amount discount codes' },
        { type: 'improvement', icon: Zap, text: 'Improved component sidebar with search and category filtering' },
      ],
    },
    {
      version: '2.2.0',
      date: 'February 20, 2026',
      changes: [
        { type: 'feature', icon: Sparkles, text: 'Photo Studio Panel — In-editor image editing with crop, filters, and adjustments' },
        { type: 'feature', icon: Sparkles, text: 'Animation Panel — Entrance animations, scroll effects, and parallax support' },
        { type: 'feature', icon: Sparkles, text: 'Auto Layout Panel — Flexbox and Grid layout controls with visual configuration' },
        { type: 'feature', icon: Sparkles, text: 'Popup Builder — Create and manage lightbox popups, modals, and banners' },
        { type: 'improvement', icon: Zap, text: 'Canvas right-click context menu with duplicate, delete, and style copy actions' },
        { type: 'fix', icon: Bug, text: 'Fixed drag-and-drop ordering issues with nested container components' },
      ],
    },
    {
      version: '2.1.0',
      date: 'February 10, 2026',
      changes: [
        { type: 'feature', icon: Sparkles, text: 'Multi-page support — Create, manage, and navigate between multiple pages per project' },
        { type: 'feature', icon: Sparkles, text: 'Page version history — Save snapshots and restore previous page states' },
        { type: 'feature', icon: Sparkles, text: 'Code Editor Panel — Monaco-based code editor for custom CSS and JavaScript' },
        { type: 'feature', icon: Sparkles, text: 'Global Design Panel — Site-wide typography, color palette, and spacing configuration' },
        { type: 'security', icon: Shield, text: 'Row-Level Security (RLS) policies on all database tables' },
        { type: 'fix', icon: Bug, text: 'Fixed auto-save race conditions when switching between pages rapidly' },
      ],
    },
    {
      version: '2.0.0',
      date: 'January 30, 2026',
      tag: 'Major',
      tagColor: 'bg-primary/10 text-primary',
      changes: [
        { type: 'feature', icon: Rocket, text: 'Complete platform rebuild with React 18, Vite, TypeScript, and Tailwind CSS' },
        { type: 'feature', icon: Sparkles, text: '100+ drag-and-drop components across 15+ categories' },
        { type: 'feature', icon: Sparkles, text: '12 professionally designed templates — SaaS, Agency, Blog, Portfolio, eCommerce, and more' },
        { type: 'feature', icon: Sparkles, text: 'One-click publish with Vercel deployment and ZIP export' },
        { type: 'feature', icon: Sparkles, text: 'Responsive design editor with desktop, tablet, and mobile viewports' },
        { type: 'feature', icon: Sparkles, text: 'Supabase backend — Auth, database, storage, and real-time subscriptions' },
        { type: 'feature', icon: Sparkles, text: 'Layer management panel with drag-to-reorder and visibility toggles' },
        { type: 'feature', icon: Sparkles, text: 'Properties panel with visual style editing and custom CSS classes' },
        { type: 'feature', icon: Sparkles, text: 'Auto-save with 3-second interval and toast notifications' },
        { type: 'feature', icon: Sparkles, text: 'Project settings — SEO, branding, custom domains, and analytics scripts' },
        { type: 'feature', icon: Sparkles, text: 'Dashboard with project management, search, and quick actions' },
      ],
    },
    {
      version: '1.0.0',
      date: 'January 1, 2026',
      tag: 'Initial',
      tagColor: 'bg-muted text-muted-foreground',
      changes: [
        { type: 'feature', icon: Rocket, text: 'Initial release — DevBuilder visual website builder' },
        { type: 'feature', icon: Sparkles, text: 'Basic drag-and-drop editor with component library' },
        { type: 'feature', icon: Sparkles, text: 'Template selection and project creation' },
        { type: 'feature', icon: Sparkles, text: 'User authentication and project persistence' },
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    feature: 'text-green-600',
    improvement: 'text-blue-600',
    fix: 'text-amber-600',
    security: 'text-red-600',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h1 className="font-bold text-lg">Changelog</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">What's New in DevBuilder</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A complete history of features, improvements, bug fixes, and security updates. We ship constantly to make DevBuilder better.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          {releases.map((release, i) => (
            <div key={release.version} className={`relative pl-12 ${i > 0 ? 'mt-16' : ''}`}>
              {/* Dot */}
              <div className="absolute left-2.5 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />

              {/* Version header */}
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="text-xl font-bold">v{release.version}</h3>
                {release.tag && (
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${release.tagColor}`}>
                    {release.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{release.date}</p>

              {/* Changes */}
              <div className="space-y-3">
                {release.changes.map((change, ci) => (
                  <div key={ci} className="flex items-start gap-3">
                    <change.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${typeColors[change.type] || 'text-muted-foreground'}`} />
                    <p className="text-sm leading-relaxed">{change.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChangelogPage;
