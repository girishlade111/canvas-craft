import type { Template, PageSchema } from '@/types/builder';

// ═══════════════════════════════════════════════════════════
// SHARED PARTIALS — Professional Footers
// ═══════════════════════════════════════════════════════════

const darkFooter = {
  id: 'footer-shared', type: 'footer' as const, label: 'Footer',
  styles: { padding: '64px 40px 32px', backgroundColor: '#0f172a', color: '#94a3b8', textAlign: 'center' },
  components: [
    { id: 'f-links', type: 'paragraph', category: 'Text', label: 'Footer Links', content: 'Home   About   Services   Blog   Contact   Privacy   Terms', styles: { fontSize: '13px', letterSpacing: '0.5px', opacity: '0.7', marginBottom: '20px' } },
    { id: 'f-social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: {}, props: { layout: 'horizontal', size: '28' } },
    { id: 'f-divider', type: 'divider', category: 'Basic', label: 'Divider', styles: { width: '100%', height: '1px', backgroundColor: '#1e293b', margin: '24px 0' } },
    { id: 'f-text', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 All rights reserved. Crafted with DevBuilder.', styles: { fontSize: '12px', opacity: '0.5' } },
  ],
};

const lightFooter = {
  ...darkFooter,
  styles: { padding: '64px 40px 32px', backgroundColor: '#f8fafc', color: '#64748b', textAlign: 'center', borderTop: '1px solid #e2e8f0' },
  components: [
    { id: 'f-links-l', type: 'paragraph', category: 'Text', label: 'Footer Links', content: 'Home   About   Services   Blog   Contact   Privacy   Terms', styles: { fontSize: '13px', letterSpacing: '0.5px', opacity: '0.7', marginBottom: '20px' } },
    { id: 'f-social-l', type: 'social-icons', category: 'Widgets', label: 'Social', styles: {}, props: { layout: 'horizontal', size: '28' } },
    { id: 'f-divider-l', type: 'divider', category: 'Basic', label: 'Divider', styles: { width: '100%', height: '1px', backgroundColor: '#e2e8f0', margin: '24px 0' } },
    { id: 'f-text-l', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 All rights reserved.', styles: { fontSize: '12px', opacity: '0.5' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 1. BLANK CANVAS — Clean Starter
// ═══════════════════════════════════════════════════════════

const blankSchema: PageSchema = {
  id: 'page-blank', name: 'Home',
  sections: [
    {
      id: 'header-1', type: 'header', label: 'Header',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'logo-1', type: 'heading', category: 'Text', label: 'Logo', content: '● YourBrand', styles: { fontSize: '20px', fontWeight: '700' } },
        { id: 'nav-1', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Home   About   Contact', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
      ],
    },
    {
      id: 'body-1', type: 'body', label: 'Body',
      styles: { padding: '120px 32px', minHeight: '500px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' },
      components: [
        { id: 'body-heading', type: 'heading', category: 'Text', label: 'Main Heading', content: 'Welcome to Your Website', styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', letterSpacing: '-0.02em', lineHeight: '1.1' } },
        { id: 'body-text', type: 'paragraph', category: 'Text', label: 'Body Text', content: 'Start building by dragging components from the sidebar. This blank canvas is your creative playground.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7' } as any },
        { id: 'body-btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started →', styles: { padding: '14px 36px', fontSize: '15px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 2. STARTUP SAAS — Full Professional Landing
// ═══════════════════════════════════════════════════════════

const saasSchema: PageSchema = {
  id: 'page-saas', name: 'SaaS Landing',
  sections: [
    {
      id: 'saas-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-logo', type: 'heading', category: 'Text', label: 'Logo', content: '⚡ Velocity', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'saas-nav-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Features   Pricing   Integrations   Docs   Blog', styles: { fontSize: '14px', opacity: '0.7', fontWeight: '500' } },
        { id: 'saas-nav-cta', type: 'button', category: 'Basic', label: 'Nav CTA', content: 'Start Free Trial', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'saas-announce', type: 'body', label: 'Announcement',
      styles: { padding: '0' },
      components: [
        { id: 'saas-ann', type: 'announcement-bar', category: 'Widgets', label: 'Announcement', content: '🚀 v3.0 is here — AI-powered workflows, 10x faster builds, 200+ new integrations. Read the announcement →', styles: {} },
      ],
    },
    {
      id: 'saas-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 40px 100px', textAlign: 'center', background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #020617 60%)', color: '#ffffff' },
      components: [
        { id: 'saas-badge', type: 'badge', category: 'Text', label: 'Badge', content: '✨ Trusted by 50,000+ teams worldwide', styles: {} },
        { id: 'saas-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'Ship products 10x faster\nwith modern infrastructure', styles: { fontSize: '68px', fontWeight: '800', lineHeight: '1.08', margin: '24px 0', letterSpacing: '-0.03em' } },
        { id: 'saas-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'The complete developer platform for building, deploying, and scaling web applications. From prototype to production in minutes — not months.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 40px', lineHeight: '1.6' } as any },
        { id: 'saas-cta', type: 'button', category: 'Basic', label: 'Primary CTA', content: 'Start Free Trial →', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none', marginRight: '12px' } },
        { id: 'saas-cta2', type: 'button', category: 'Basic', label: 'Secondary CTA', content: 'Watch Demo', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #334155' } },
      ],
    },
    {
      id: 'saas-logos', type: 'body', label: 'Social Proof',
      styles: { padding: '56px 40px', backgroundColor: '#020617' },
      components: [
        { id: 'saas-lc', type: 'logo-cloud', category: 'Layout', label: 'Logo Cloud', styles: {}, props: { title: 'Powering teams at the world\'s best companies' } },
      ],
    },
    {
      id: 'saas-features', type: 'body', label: 'Features',
      styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-feat-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'FEATURES', styles: {} },
        { id: 'saas-feat-h', type: 'heading', category: 'Text', label: 'Title', content: 'Everything you need to build,\ndeploy, and scale', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 12px 0', lineHeight: '1.15', letterSpacing: '-0.02em' } },
        { id: 'saas-feat-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Powerful features designed to help engineering teams move faster and build with confidence.', styles: { textAlign: 'center', color: '#94a3b8', margin: '0 auto 56px', fontSize: '18px', maxWidth: '560px', lineHeight: '1.6' } as any },
        { id: 'saas-f1', type: 'feature-card', category: 'Layout', label: 'Feature 1', styles: {}, props: { icon: '⚡', title: 'Lightning Fast Builds', description: 'Optimized CI/CD pipeline with incremental builds, edge caching, and sub-second cold starts across 300+ global PoPs.' } },
        { id: 'saas-f2', type: 'feature-card', category: 'Layout', label: 'Feature 2', styles: {}, props: { icon: '🛡️', title: 'Enterprise-Grade Security', description: 'SOC2 Type II certified with end-to-end encryption, SSO/SAML, role-based access control, and automated vulnerability scanning.' } },
        { id: 'saas-f3', type: 'feature-card', category: 'Layout', label: 'Feature 3', styles: {}, props: { icon: '📊', title: 'Real-time Observability', description: 'Full-stack monitoring with distributed tracing, custom dashboards, anomaly detection, and instant alerting.' } },
        { id: 'saas-f4', type: 'feature-card', category: 'Layout', label: 'Feature 4', styles: {}, props: { icon: '🔄', title: 'GitOps Workflows', description: 'Push-to-deploy with preview environments, automated testing, rollback, and branch-based staging — all from Git.' } },
        { id: 'saas-f5', type: 'feature-card', category: 'Layout', label: 'Feature 5', styles: {}, props: { icon: '🤖', title: 'AI Code Assistant', description: 'Built-in AI pair programmer that reviews PRs, suggests optimizations, auto-generates tests, and documents your codebase.' } },
        { id: 'saas-f6', type: 'feature-card', category: 'Layout', label: 'Feature 6', styles: {}, props: { icon: '🔌', title: '200+ Integrations', description: 'Connect with Slack, GitHub, Linear, Datadog, PagerDuty, and 200+ tools your team already uses.' } },
      ],
    },
    {
      id: 'saas-stats', type: 'body', label: 'Stats',
      styles: { padding: '80px 40px', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-stats-h', type: 'heading', category: 'Text', label: 'Title', content: 'Built for performance at any scale', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-stats-c', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 4 } },
      ],
    },
    {
      id: 'saas-how', type: 'body', label: 'How It Works',
      styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-how-h', type: 'heading', category: 'Text', label: 'Title', content: 'Up and running in 3 minutes', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-steps', type: 'numbered-steps', category: 'Layout', label: 'Steps', styles: {} },
      ],
    },
    {
      id: 'saas-testimonial', type: 'body', label: 'Testimonials',
      styles: { padding: '100px 40px', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'Loved by engineering teams', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonial', styles: {} },
      ],
    },
    {
      id: 'saas-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-price-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'PRICING', styles: {} },
        { id: 'saas-price-h', type: 'heading', category: 'Text', label: 'Title', content: 'Simple, transparent pricing', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 12px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-price-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Start free and scale as you grow. No hidden fees, no surprises.', styles: { textAlign: 'center', color: '#94a3b8', margin: '0 0 56px 0', fontSize: '18px' } },
        { id: 'saas-price-1', type: 'pricing-card', category: 'Layout', label: 'Hobby', styles: {}, props: { name: 'Hobby', price: '$0', period: '/month', featured: false } },
        { id: 'saas-price-2', type: 'pricing-card', category: 'Layout', label: 'Pro', styles: {}, props: { name: 'Pro', price: '$29', period: '/month', featured: true } },
        { id: 'saas-price-3', type: 'pricing-card', category: 'Layout', label: 'Enterprise', styles: {}, props: { name: 'Enterprise', price: 'Custom', period: '', featured: false } },
      ],
    },
    {
      id: 'saas-faq', type: 'body', label: 'FAQ',
      styles: { padding: '100px 40px', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-faq-h', type: 'heading', category: 'Text', label: 'Title', content: 'Frequently asked questions', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'saas-faq-c', type: 'faq', category: 'Layout', label: 'FAQ', styles: {} },
      ],
    },
    {
      id: 'saas-cta-bottom', type: 'body', label: 'CTA',
      styles: { padding: '100px 40px', background: 'radial-gradient(ellipse at bottom, #1e1b4b 0%, #020617 60%)', textAlign: 'center' },
      components: [
        { id: 'saas-final-h', type: 'heading', category: 'Text', label: 'CTA Heading', content: 'Ready to ship faster?', styles: { fontSize: '48px', fontWeight: '800', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-final-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'Join 50,000+ teams already building with Velocity. Free forever for hobby projects.', styles: { fontSize: '18px', color: '#94a3b8', margin: '0 0 36px 0' } },
        { id: 'saas-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Building for Free →', styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#020617' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 3. CREATIVE AGENCY — Bold & Immersive
// ═══════════════════════════════════════════════════════════

const agencySchema: PageSchema = {
  id: 'page-agency', name: 'Agency',
  sections: [
    {
      id: 'ag-nav', type: 'header', label: 'Navigation',
      styles: { padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', position: 'relative', zIndex: '10' } as any,
      components: [
        { id: 'ag-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'STUDIO∞', styles: { fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', color: '#ffffff' } },
        { id: 'ag-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   Services   About   Careers   Contact', styles: { fontSize: '14px', fontWeight: '500', color: '#ffffff', opacity: '0.7' } },
      ],
    },
    {
      id: 'ag-hero', type: 'body', label: 'Hero',
      styles: { padding: '100px 48px 120px', background: 'linear-gradient(160deg, #0f0f23 0%, #1a1a3e 35%, #2d1b4e 60%, #1a0a2e 80%, #0f0f23 100%)', color: '#ffffff' },
      components: [
        { id: 'ag-overline', type: 'paragraph', category: 'Text', label: 'Overline', content: 'AWARD-WINNING DIGITAL AGENCY', styles: { fontSize: '12px', fontWeight: '600', letterSpacing: '4px', opacity: '0.4', marginBottom: '24px' } as any },
        { id: 'ag-h1', type: 'heading', category: 'Text', label: 'Hero Title', content: 'We craft digital\nexperiences that\nmove people.', styles: { fontSize: '76px', fontWeight: '800', lineHeight: '1.02', letterSpacing: '-0.04em', margin: '0 0 32px 0' } },
        { id: 'ag-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Award-winning agency specializing in brand strategy, product design, and full-stack development for the world\'s most ambitious companies. We don\'t just build websites — we build movements.', styles: { fontSize: '19px', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', lineHeight: '1.7' } },
        { id: 'ag-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'View Our Work →', styles: { marginTop: '44px', padding: '18px 48px', fontSize: '15px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#0f0f23', border: 'none' } },
        { id: 'ag-cta2', type: 'button', category: 'Basic', label: 'Secondary CTA', content: 'Book a Call', styles: { marginTop: '44px', marginLeft: '12px', padding: '18px 48px', fontSize: '15px', fontWeight: '700', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' } },
      ],
    },
    {
      id: 'ag-marquee', type: 'body', label: 'Marquee',
      styles: { padding: '0', backgroundColor: '#0f0f23' },
      components: [
        { id: 'ag-mq', type: 'marquee', category: 'Widgets', label: 'Marquee', content: '★ Brand Strategy  ★ UI/UX Design  ★ Web Development  ★ Mobile Apps  ★ Motion Graphics  ★ Creative Direction  ★ 3D & AR Experiences', styles: {} },
      ],
    },
    {
      id: 'ag-clients', type: 'body', label: 'Clients',
      styles: { padding: '64px 48px', backgroundColor: '#0f0f23' },
      components: [
        { id: 'ag-cl', type: 'logo-cloud', category: 'Layout', label: 'Clients', styles: {}, props: { title: 'Trusted by industry leaders' } },
      ],
    },
    {
      id: 'ag-work', type: 'body', label: 'Featured Work',
      styles: { padding: '100px 48px', backgroundColor: '#fafafa' },
      components: [
        { id: 'ag-w-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'SELECTED PROJECTS', styles: { fontSize: '12px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', marginBottom: '48px' } as any },
        { id: 'ag-w1', type: 'image-overlay-card', category: 'Media', label: 'Project 1', styles: {}, props: { title: 'Nexus — Complete Rebrand', subtitle: 'Brand Identity • Strategy • Design System • 3D Assets' } },
        { id: 'ag-w2', type: 'image-overlay-card', category: 'Media', label: 'Project 2', styles: { marginTop: '24px' }, props: { title: 'Pulse — Analytics Dashboard', subtitle: 'Product Design • Frontend Engineering • Data Visualization' } },
        { id: 'ag-w3', type: 'image-overlay-card', category: 'Media', label: 'Project 3', styles: { marginTop: '24px' }, props: { title: 'Meridian — E-commerce Platform', subtitle: 'Full-Stack Development • Mobile App • Payment Integration' } },
        { id: 'ag-w4', type: 'image-overlay-card', category: 'Media', label: 'Project 4', styles: { marginTop: '24px' }, props: { title: 'Aether — Fintech Startup', subtitle: 'Brand Strategy • Web App • Investor Pitch • Launch Campaign' } },
      ],
    },
    {
      id: 'ag-services', type: 'body', label: 'Services',
      styles: { padding: '100px 48px', backgroundColor: '#ffffff' },
      components: [
        { id: 'ag-srv-h', type: 'heading', category: 'Text', label: 'Title', content: 'What We Do', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '0 0 16px 0', letterSpacing: '-0.02em' } },
        { id: 'ag-srv-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'End-to-end digital services that transform businesses and captivate audiences.', styles: { fontSize: '18px', color: '#6b7280', textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px', lineHeight: '1.6' } as any },
        { id: 'ag-s1', type: 'feature-card', category: 'Layout', label: 'Service 1', styles: {}, props: { icon: '🎨', title: 'Brand & Identity', description: 'Logo design, visual identity systems, brand guidelines, and positioning strategy that makes you unforgettable.' } },
        { id: 'ag-s2', type: 'feature-card', category: 'Layout', label: 'Service 2', styles: {}, props: { icon: '✏️', title: 'Product Design', description: 'User research, wireframing, UI/UX design, prototyping, and usability testing for web and mobile products.' } },
        { id: 'ag-s3', type: 'feature-card', category: 'Layout', label: 'Service 3', styles: {}, props: { icon: '💻', title: 'Development', description: 'Full-stack web and mobile development with React, Next.js, and modern frameworks. Performance-first architecture.' } },
        { id: 'ag-s4', type: 'feature-card', category: 'Layout', label: 'Service 4', styles: {}, props: { icon: '📈', title: 'Growth & Marketing', description: 'SEO, content strategy, conversion optimization, and analytics to grow your digital presence measurably.' } },
      ],
    },
    {
      id: 'ag-stats', type: 'body', label: 'Stats',
      styles: { padding: '80px 48px', backgroundColor: '#0f0f23', color: '#ffffff' },
      components: [
        { id: 'ag-stats-c', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 4 } },
      ],
    },
    {
      id: 'ag-team', type: 'body', label: 'Team',
      styles: { padding: '100px 48px' },
      components: [
        { id: 'ag-team-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'OUR PEOPLE', styles: { fontSize: '12px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'ag-team-h', type: 'heading', category: 'Text', label: 'Title', content: 'Meet the Creative Minds', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '-0.02em' } },
        { id: 'ag-team-g', type: 'team-grid', category: 'Layout', label: 'Team', styles: {} },
      ],
    },
    {
      id: 'ag-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '100px 48px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ag-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'Client Testimonials', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0' } },
        { id: 'ag-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'ag-cta-section', type: 'body', label: 'CTA',
      styles: { padding: '120px 48px', textAlign: 'center', background: 'linear-gradient(160deg, #0f0f23 0%, #2d1b4e 50%, #0f0f23 100%)', color: '#ffffff' },
      components: [
        { id: 'ag-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s create something\nextraordinary together.', styles: { fontSize: '52px', fontWeight: '800', lineHeight: '1.08', margin: '0 0 20px 0', letterSpacing: '-0.02em' } },
        { id: 'ag-cta-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'We\'re always looking for exciting projects. Tell us about yours.', styles: { fontSize: '18px', color: 'rgba(255,255,255,0.5)', margin: '0 0 40px 0' } },
        { id: 'ag-cta-btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Start a Project →', styles: { padding: '18px 56px', fontSize: '16px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#0f0f23', border: 'none' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0f0f23' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 4. MODERN BLOG — Content-First Publishing
// ═══════════════════════════════════════════════════════════

const blogSchema: PageSchema = {
  id: 'page-blog', name: 'Blog',
  sections: [
    {
      id: 'blog-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff' },
      components: [
        { id: 'blog-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✍️ The Journal', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'blog-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Articles   Categories   Newsletter   About', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
        { id: 'blog-search', type: 'search-bar', category: 'Widgets', label: 'Search', styles: {} },
      ],
    },
    {
      id: 'blog-hero', type: 'body', label: 'Hero',
      styles: { padding: '100px 40px 80px', textAlign: 'center', background: 'linear-gradient(135deg, #faf5ff 0%, #f0f9ff 40%, #fefce8 100%)' },
      components: [
        { id: 'blog-overline', type: 'paragraph', category: 'Text', label: 'Overline', content: 'STORIES & INSIGHTS', styles: { fontSize: '11px', fontWeight: '700', letterSpacing: '4px', opacity: '0.4', marginBottom: '16px' } as any },
        { id: 'blog-h', type: 'heading', category: 'Text', label: 'Title', content: 'Ideas That Shape\nthe Future', styles: { fontSize: '60px', fontWeight: '800', lineHeight: '1.08', margin: '0 0 20px 0', letterSpacing: '-0.03em' } },
        { id: 'blog-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Exploring design, technology, and the craft of building exceptional digital products. Written by practitioners, for practitioners.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7' } as any },
        { id: 'blog-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'Subscribe Free' } },
      ],
    },
    {
      id: 'blog-featured', type: 'body', label: 'Featured Post',
      styles: { padding: '64px 40px', backgroundColor: '#ffffff' },
      components: [
        { id: 'blog-feat-label', type: 'badge', category: 'Text', label: 'Badge', content: '✦ FEATURED', styles: {} },
        { id: 'blog-feat-card', type: 'blog-post-card', category: 'Blog', label: 'Featured', styles: { marginTop: '16px' }, props: { title: 'The Future of Design Systems: AI-Generated Components', excerpt: 'How machine learning is revolutionizing the way we build and maintain design systems at scale. A deep dive into automated component generation, style inference, and the implications for design teams.', date: 'Mar 8, 2026', author: 'Sarah Chen' } },
      ],
    },
    {
      id: 'blog-tags', type: 'body', label: 'Tags',
      styles: { padding: '24px 40px', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'blog-tl', type: 'tag-list', category: 'Widgets', label: 'Tags', styles: {}, props: { tags: 'All,Design,Engineering,Product,AI & ML,Culture,Tutorials,Case Studies' } },
      ],
    },
    {
      id: 'blog-grid', type: 'body', label: 'Posts',
      styles: { padding: '48px 40px' },
      components: [
        { id: 'bp-1', type: 'blog-post-card', category: 'Blog', label: 'Post 1', styles: {}, props: { title: 'The Art of Minimal Design', excerpt: 'How less really is more in modern web interfaces. Exploring whitespace, typography hierarchies, and the discipline of restraint.', date: 'Mar 5, 2026', author: 'Sarah Chen' } },
        { id: 'bp-2', type: 'blog-post-card', category: 'Blog', label: 'Post 2', styles: { marginTop: '24px' }, props: { title: 'Building Scalable Design Systems from Scratch', excerpt: 'A comprehensive guide to creating reusable component libraries that scale with your organization. From tokens to documentation.', date: 'Mar 2, 2026', author: 'Alex Kim' } },
        { id: 'bp-3', type: 'blog-post-card', category: 'Blog', label: 'Post 3', styles: { marginTop: '24px' }, props: { title: 'React Server Components: A Performance Deep Dive', excerpt: 'Advanced optimization techniques for production applications using RSC. Benchmarks, trade-offs, and real-world implementation patterns.', date: 'Feb 28, 2026', author: 'James Liu' } },
        { id: 'bp-4', type: 'blog-post-card', category: 'Blog', label: 'Post 4', styles: { marginTop: '24px' }, props: { title: 'From Junior to Staff Engineer: A Career Framework', excerpt: 'Lessons learned over a decade in tech. The skills, mindsets, and habits that accelerate engineering careers beyond just writing code.', date: 'Feb 24, 2026', author: 'Maria Rodriguez' } },
      ],
    },
    {
      id: 'blog-pagination', type: 'body', label: 'Pagination',
      styles: { padding: '32px 40px', textAlign: 'center' },
      components: [
        { id: 'blog-pag', type: 'pagination', category: 'Widgets', label: 'Pagination', styles: {}, props: { totalPages: 8, currentPage: 1 } },
      ],
    },
    {
      id: 'blog-newsletter-bottom', type: 'body', label: 'Newsletter CTA',
      styles: { padding: '80px 40px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'blog-nl-h', type: 'heading', category: 'Text', label: 'Title', content: 'Never miss an article', styles: { fontSize: '36px', fontWeight: '800', margin: '0 0 12px 0' } },
        { id: 'blog-nl-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Get weekly insights on design, engineering, and product delivered to your inbox. Read by 25,000+ professionals.', styles: { fontSize: '16px', color: '#94a3b8', margin: '0 0 32px 0' } },
        { id: 'blog-nl-b', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'Subscribe' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 5. ENTERPRISE BUSINESS — B2B Professional
// ═══════════════════════════════════════════════════════════

const enterpriseSchema: PageSchema = {
  id: 'page-enterprise', name: 'Enterprise',
  sections: [
    {
      id: 'ent-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'ent-logo', type: 'heading', category: 'Text', label: 'Logo', content: '◆ Meridian', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'ent-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Solutions   Platform   Resources   Customers   Company', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
        { id: 'ent-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Request a Demo', styles: { padding: '10px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'ent-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 48px 100px', background: 'linear-gradient(170deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'ent-trust', type: 'badge', category: 'Text', label: 'Trust Badge', content: '🏆 G2 Leader — Enterprise Infrastructure 2026', styles: {} },
        { id: 'ent-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Enterprise Infrastructure\nfor the AI Era', styles: { fontSize: '64px', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.03em', margin: '24px 0 20px 0' } },
        { id: 'ent-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Secure, scalable, and intelligent cloud platform trusted by Fortune 500 companies to power their most critical workloads and accelerate digital transformation.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 40px', lineHeight: '1.6' } as any },
        { id: 'ent-cta1', type: 'button', category: 'Basic', label: 'Primary CTA', content: 'Schedule a Demo', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', marginRight: '12px' } },
        { id: 'ent-cta2', type: 'button', category: 'Basic', label: 'Secondary CTA', content: 'Read Documentation', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #334155' } },
      ],
    },
    {
      id: 'ent-logos', type: 'body', label: 'Clients',
      styles: { padding: '64px 48px', backgroundColor: '#0f172a' },
      components: [
        { id: 'ent-lc', type: 'logo-cloud', category: 'Layout', label: 'Logos', styles: {}, props: { title: 'Powering 2,000+ enterprise customers worldwide' } },
      ],
    },
    {
      id: 'ent-kpi', type: 'body', label: 'KPIs',
      styles: { padding: '80px 48px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ent-kpi-h', type: 'heading', category: 'Text', label: 'Title', content: 'Platform at a glance', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'ent-kpi-c', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
      ],
    },
    {
      id: 'ent-features', type: 'body', label: 'Features',
      styles: { padding: '100px 48px' },
      components: [
        { id: 'ent-f-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'PLATFORM', styles: {} },
        { id: 'ent-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Built for scale,\ndesigned for security', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 12px 0', letterSpacing: '-0.02em', lineHeight: '1.1' } },
        { id: 'ent-f-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Enterprise-grade capabilities that meet the most demanding compliance, performance, and reliability requirements.', styles: { textAlign: 'center', color: '#6b7280', margin: '0 auto 56px', fontSize: '18px', maxWidth: '560px', lineHeight: '1.6' } as any },
        { id: 'ent-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🛡️', title: 'SOC2 & HIPAA Compliant', description: 'Enterprise-grade security with continuous monitoring, automated compliance reporting, and dedicated security team.' } },
        { id: 'ent-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🌐', title: 'Global Edge Network', description: '300+ edge locations across 6 continents for sub-30ms latency worldwide with automatic failover and load balancing.' } },
        { id: 'ent-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤖', title: 'AI-Powered Insights', description: 'Machine learning models that optimize infrastructure, predict capacity needs, and detect anomalies before they impact users.' } },
        { id: 'ent-f4', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🔐', title: 'Zero Trust Security', description: 'Identity-based access control with mutual TLS, network segmentation, and real-time threat detection across all workloads.' } },
      ],
    },
    {
      id: 'ent-comparison', type: 'body', label: 'Comparison',
      styles: { padding: '100px 48px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ent-cmp-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why leaders choose Meridian', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '-0.02em' } },
        { id: 'ent-cmp', type: 'comparison-table', category: 'Layout', label: 'Comparison', styles: {} },
      ],
    },
    {
      id: 'ent-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '100px 48px' },
      components: [
        { id: 'ent-test-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'CUSTOMER STORIES', styles: { fontSize: '12px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'ent-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'Trusted by industry leaders', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0' } },
        { id: 'ent-test', type: 'blockquote-image', category: 'Text', label: 'Testimonial', styles: {}, props: { author: 'Sarah Johnson, CTO at TechCorp' }, content: '"Meridian transformed how we deploy and scale. Our infrastructure costs dropped 40% while performance improved across every metric. The migration was seamless."' },
      ],
    },
    {
      id: 'ent-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '100px 48px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ent-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Enterprise pricing', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 12px 0' } },
        { id: 'ent-pr-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Custom plans tailored to your organization\'s needs. Volume discounts available.', styles: { textAlign: 'center', color: '#6b7280', margin: '0 0 48px 0', fontSize: '18px' } },
        { id: 'ent-pr1', type: 'pricing-card', category: 'Layout', label: 'Team', styles: {}, props: { name: 'Team', price: '$499', period: '/month', featured: false } },
        { id: 'ent-pr2', type: 'pricing-card', category: 'Layout', label: 'Business', styles: {}, props: { name: 'Business', price: '$1,999', period: '/month', featured: true } },
        { id: 'ent-pr3', type: 'pricing-card', category: 'Layout', label: 'Enterprise', styles: {}, props: { name: 'Enterprise', price: 'Custom', period: '', featured: false } },
      ],
    },
    {
      id: 'ent-cta', type: 'body', label: 'CTA',
      styles: { padding: '100px 48px', background: 'linear-gradient(170deg, #0f172a, #1e293b)', textAlign: 'center' },
      components: [
        { id: 'ent-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Ready to transform\nyour infrastructure?', styles: { fontSize: '48px', fontWeight: '800', color: '#ffffff', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-0.02em' } },
        { id: 'ent-cta-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'Talk to our solutions team and get a personalized demo.', styles: { fontSize: '18px', color: '#94a3b8', margin: '0 0 36px 0' } },
        { id: 'ent-cta-c', type: 'button', category: 'Basic', label: 'CTA', content: 'Talk to Sales →', styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none' } },
      ],
    },
    darkFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 6. MODERN PORTFOLIO — Refined & Minimal
// ═══════════════════════════════════════════════════════════

const portfolioSchema: PageSchema = {
  id: 'page-portfolio', name: 'Portfolio',
  sections: [
    {
      id: 'port-nav', type: 'header', label: 'Navigation',
      styles: { padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-name', type: 'heading', category: 'Text', label: 'Name', content: 'JANE DOE', styles: { fontSize: '14px', fontWeight: '600', letterSpacing: '4px' } as any },
        { id: 'port-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   About   Process   Contact', styles: { fontSize: '13px', opacity: '0.5', letterSpacing: '1px' } as any },
      ],
    },
    {
      id: 'port-hero', type: 'body', label: 'Hero',
      styles: { padding: '140px 48px 100px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-overline', type: 'paragraph', category: 'Text', label: 'Overline', content: 'DESIGNER & CREATIVE DIRECTOR — LOS ANGELES', styles: { fontSize: '11px', fontWeight: '500', letterSpacing: '4px', opacity: '0.35', marginBottom: '32px' } as any },
        { id: 'port-h1', type: 'heading', category: 'Text', label: 'Title', content: 'I design digital\nexperiences that\nfeel effortless.', styles: { fontSize: '72px', fontWeight: '200', lineHeight: '1.05', letterSpacing: '-0.03em' } },
        { id: 'port-sub', type: 'paragraph', category: 'Text', label: 'Bio', content: 'Senior Product Designer with 10+ years crafting interfaces for startups, agencies, and Fortune 500 companies. Currently leading design at ◆ StudioLab — previously at Google, Airbnb, and Figma.', styles: { fontSize: '17px', color: '#737373', maxWidth: '520px', marginTop: '36px', lineHeight: '1.8' } },
        { id: 'port-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'View Selected Work ↓', styles: { marginTop: '48px', padding: '16px 44px', fontSize: '14px', fontWeight: '500', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '1px' } as any },
      ],
    },
    {
      id: 'port-work', type: 'body', label: 'Selected Work',
      styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-w-h', type: 'paragraph', category: 'Text', label: 'Section', content: 'SELECTED PROJECTS', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.3', margin: '0 0 56px 0' } as any },
        { id: 'port-w1', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: {}, props: { title: 'Cosmos — Brand Overhaul', subtitle: '2026 — Brand Identity • Design System • Web Platform' } },
        { id: 'port-w2', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Flux — Mobile Banking App', subtitle: '2025 — Product Design • UX Research • iOS & Android' } },
        { id: 'port-w3', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Zenith — Analytics Dashboard', subtitle: '2025 — Data Visualization • Design System • Accessibility' } },
        { id: 'port-w4', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Nova — E-commerce Redesign', subtitle: '2024 — UX Audit • Conversion Optimization • Shopify Plus' } },
      ],
    },
    {
      id: 'port-about', type: 'body', label: 'About',
      styles: { padding: '100px 48px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'port-ab-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'ABOUT', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.3', marginBottom: '32px' } as any },
        { id: 'port-ab-h', type: 'heading', category: 'Text', label: 'About Heading', content: 'Design is how I think.\nCode is how I build.', styles: { fontSize: '40px', fontWeight: '300', lineHeight: '1.3', margin: '0 0 24px 0', maxWidth: '600px' } },
        { id: 'port-ab-p', type: 'paragraph', category: 'Text', label: 'About Text', content: 'I believe the best digital products come from understanding people — their frustrations, their goals, and the moments in between. My process blends research-driven strategy with meticulous craft, resulting in experiences that feel intuitive and delightful.\n\nWhen I\'m not designing, you\'ll find me speaking at design conferences, mentoring emerging designers, and contributing to open-source design tools.', styles: { fontSize: '16px', color: '#a3a3a3', maxWidth: '560px', lineHeight: '1.8' } },
      ],
    },
    {
      id: 'port-timeline', type: 'body', label: 'Experience',
      styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-tl-h', type: 'paragraph', category: 'Text', label: 'Section', content: 'EXPERIENCE', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.3', margin: '0 0 48px 0' } as any },
        { id: 'port-tl', type: 'timeline', category: 'Layout', label: 'Timeline', styles: {} },
      ],
    },
    {
      id: 'port-testimonials', type: 'body', label: 'Kind Words',
      styles: { padding: '100px 48px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'port-tw-h', type: 'paragraph', category: 'Text', label: 'Section', content: 'KIND WORDS', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.3', margin: '0 0 48px 0', textAlign: 'center' } as any },
        { id: 'port-tw', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'port-contact', type: 'body', label: 'Contact',
      styles: { padding: '120px 48px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'port-c-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'AVAILABLE FOR FREELANCE', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.3', marginBottom: '24px' } as any },
        { id: 'port-c-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s work\ntogether.', styles: { fontSize: '60px', fontWeight: '200', lineHeight: '1.1', margin: '0 0 20px 0' } },
        { id: 'port-c-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'Got an interesting project? I\'d love to hear about it.', styles: { fontSize: '16px', color: '#737373', margin: '0 0 40px 0' } },
        { id: 'port-email', type: 'button', category: 'Basic', label: 'Email', content: 'hello@janedoe.com', styles: { padding: '16px 48px', fontSize: '15px', fontWeight: '500', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '1px' } as any },
        { id: 'port-social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: { marginTop: '32px' }, props: { layout: 'horizontal', size: '24' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 7. E-COMMERCE STORE — Premium Fashion
// ═══════════════════════════════════════════════════════════

const ecommerceSchema: PageSchema = {
  id: 'page-ecommerce', name: 'Store',
  sections: [
    {
      id: 'ec-announce', type: 'body', label: 'Announcement',
      styles: { padding: '0' },
      components: [
        { id: 'ec-ann', type: 'announcement-bar', category: 'Widgets', label: 'Promo', content: '🚚 Free worldwide shipping on orders over $100 — Use code WELCOME15 for 15% off your first order', styles: {} },
      ],
    },
    {
      id: 'ec-nav', type: 'header', label: 'Navigation',
      styles: { padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff' },
      components: [
        { id: 'ec-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'MAISON', styles: { fontSize: '26px', fontWeight: '300', letterSpacing: '8px' } as any },
        { id: 'ec-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'New Arrivals   Women   Men   Accessories   Sale', styles: { fontSize: '12px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase' } as any },
      ],
    },
    {
      id: 'ec-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 48px', background: 'linear-gradient(135deg, #fdf4ff 0%, #faf5ff 30%, #f5f3ff 60%, #eff6ff 100%)', textAlign: 'center' },
      components: [
        { id: 'ec-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'NEW COLLECTION', styles: {} },
        { id: 'ec-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Spring / Summer\n2026', styles: { fontSize: '72px', fontWeight: '200', lineHeight: '1.08', letterSpacing: '-0.02em', margin: '20px 0 24px 0' } },
        { id: 'ec-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Timeless pieces crafted with premium materials and ethical manufacturing. Designed in Paris, made for the world.', styles: { fontSize: '18px', color: '#6b7280', margin: '0 auto 40px', maxWidth: '520px', lineHeight: '1.7' } as any },
        { id: 'ec-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'SHOP THE COLLECTION', styles: { padding: '18px 56px', fontSize: '13px', fontWeight: '600', borderRadius: '0', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', letterSpacing: '3px' } as any },
      ],
    },
    {
      id: 'ec-categories', type: 'body', label: 'Categories',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ec-cat-h', type: 'heading', category: 'Text', label: 'Title', content: 'Shop by Category', styles: { fontSize: '28px', fontWeight: '400', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '2px' } as any },
        { id: 'ec-cat1', type: 'image-overlay-card', category: 'Media', label: 'Category 1', styles: {}, props: { title: 'Women\'s Collection', subtitle: '124 Products' } },
        { id: 'ec-cat2', type: 'image-overlay-card', category: 'Media', label: 'Category 2', styles: { marginTop: '16px' }, props: { title: 'Men\'s Collection', subtitle: '98 Products' } },
        { id: 'ec-cat3', type: 'image-overlay-card', category: 'Media', label: 'Category 3', styles: { marginTop: '16px' }, props: { title: 'Accessories', subtitle: '67 Products' } },
      ],
    },
    {
      id: 'ec-products', type: 'body', label: 'Products',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ec-prod-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'CURATED FOR YOU', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'ec-prod-h', type: 'heading', category: 'Text', label: 'Title', content: 'Bestsellers', styles: { fontSize: '32px', fontWeight: '400', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '1px' } as any },
        { id: 'ec-pg', type: 'product-grid', category: 'Ecommerce', label: 'Products', styles: {} },
      ],
    },
    {
      id: 'ec-features', type: 'body', label: 'Brand Promise',
      styles: { padding: '80px 40px', backgroundColor: '#fafafa' },
      components: [
        { id: 'ec-fl', type: 'feature-list', category: 'Widgets', label: 'Features', styles: {}, props: { items: 'Free shipping worldwide on $100+,30-day hassle-free returns & exchanges,Sustainable & ethically sourced materials,Lifetime craftsmanship warranty' } },
      ],
    },
    {
      id: 'ec-reviews', type: 'body', label: 'Reviews',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ec-rev-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'CUSTOMER REVIEWS', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'ec-rev-h', type: 'heading', category: 'Text', label: 'Title', content: 'What Our Customers Say', styles: { fontSize: '32px', fontWeight: '400', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '1px' } as any },
        { id: 'ec-r1', type: 'review-card', category: 'Ecommerce', label: 'Review 1', styles: {}, props: { author: 'Emma Laurent', rating: 5, content: 'Absolutely stunning quality. The fabric is incredibly soft and the cut is perfect. I\'ve received so many compliments — ordering more!' } },
        { id: 'ec-r2', type: 'review-card', category: 'Ecommerce', label: 'Review 2', styles: { marginTop: '16px' }, props: { author: 'David Kim', rating: 5, content: 'The attention to detail is remarkable. From the packaging to the product itself — everything feels premium. Best fashion purchase this year.' } },
        { id: 'ec-r3', type: 'review-card', category: 'Ecommerce', label: 'Review 3', styles: { marginTop: '16px' }, props: { author: 'Sofia Martinez', rating: 5, content: 'I love that they use sustainable materials without compromising on quality. The fit is true to size and the delivery was faster than expected.' } },
      ],
    },
    {
      id: 'ec-newsletter', type: 'body', label: 'Newsletter',
      styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'ec-nl-h', type: 'heading', category: 'Text', label: 'Title', content: 'Join the MAISON Family', styles: { fontSize: '36px', fontWeight: '300', margin: '0 0 12px 0', letterSpacing: '2px' } as any },
        { id: 'ec-nl-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Be the first to know about new arrivals, exclusive offers, and seasonal collections.', styles: { fontSize: '16px', color: '#94a3b8', margin: '0 0 32px 0' } },
        { id: 'ec-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'JOIN NOW' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 8. DASHBOARD / APP — Data-Rich Admin
// ═══════════════════════════════════════════════════════════

const dashboardSchema: PageSchema = {
  id: 'page-dashboard', name: 'Dashboard',
  sections: [
    {
      id: 'dash-nav', type: 'header', label: 'Top Bar',
      styles: { padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'dash-logo', type: 'heading', category: 'Text', label: 'Logo', content: '📊 Analytics Hub', styles: { fontSize: '18px', fontWeight: '700' } },
        { id: 'dash-search', type: 'search-bar', category: 'Widgets', label: 'Search', styles: {}, props: { placeholder: 'Search reports...' } },
        { id: 'dash-avatar', type: 'avatar', category: 'Media', label: 'User', styles: {}, props: { name: 'Admin', size: '36' } },
      ],
    },
    {
      id: 'dash-breadcrumb', type: 'body', label: 'Breadcrumb',
      styles: { padding: '16px 28px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'dash-bc', type: 'breadcrumb-trail', category: 'Widgets', label: 'Breadcrumb', styles: {}, props: { items: 'Home,Dashboard,Overview' } },
      ],
    },
    {
      id: 'dash-welcome', type: 'body', label: 'Welcome',
      styles: { padding: '28px 28px 0' },
      components: [
        { id: 'dash-wh', type: 'heading', category: 'Text', label: 'Welcome', content: 'Good morning, Admin 👋', styles: { fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' } },
        { id: 'dash-wp', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Here\'s what\'s happening with your projects today.', styles: { fontSize: '14px', color: '#6b7280' } },
      ],
    },
    {
      id: 'dash-kpis', type: 'body', label: 'KPIs',
      styles: { padding: '24px 28px' },
      components: [
        { id: 'dash-kpi', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
      ],
    },
    {
      id: 'dash-charts', type: 'body', label: 'Charts',
      styles: { padding: '0 28px 24px' },
      components: [
        { id: 'dash-ch-h', type: 'heading', category: 'Text', label: 'Chart Title', content: 'Revenue Overview', styles: { fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' } },
        { id: 'dash-chart1', type: 'chart-placeholder', category: 'Advanced', label: 'Revenue Chart', styles: {}, props: { chartType: 'area' } },
      ],
    },
    {
      id: 'dash-table', type: 'body', label: 'Data',
      styles: { padding: '0 28px 28px' },
      components: [
        { id: 'dash-tb-h', type: 'heading', category: 'Text', label: 'Title', content: 'Recent Activity', styles: { fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' } },
        { id: 'dash-dt', type: 'data-table', category: 'Advanced', label: 'Table', styles: {}, props: { columns: 5, rows: 8 } },
        { id: 'dash-pag', type: 'pagination', category: 'Widgets', label: 'Pagination', styles: { marginTop: '16px' }, props: { totalPages: 10, currentPage: 1 } },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// 9. RESTAURANT / FINE DINING — Elegant Culinary
// ═══════════════════════════════════════════════════════════

const restaurantSchema: PageSchema = {
  id: 'page-restaurant', name: 'Restaurant',
  sections: [
    {
      id: 'rest-nav', type: 'header', label: 'Navigation',
      styles: { padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1c1917', color: '#fef3c7' },
      components: [
        { id: 'rest-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✦ La Maison', styles: { fontSize: '28px', fontWeight: '300', letterSpacing: '4px' } as any },
        { id: 'rest-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Menu   Wine   Reservations   Private Events   Contact', styles: { fontSize: '12px', letterSpacing: '2px', opacity: '0.6', textTransform: 'uppercase' } as any },
      ],
    },
    {
      id: 'rest-hero', type: 'body', label: 'Hero',
      styles: { padding: '160px 48px 120px', textAlign: 'center', background: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)', color: '#fef3c7' },
      components: [
        { id: 'rest-stars', type: 'paragraph', category: 'Text', label: 'Stars', content: '★ ★ ★', styles: { fontSize: '14px', letterSpacing: '8px', opacity: '0.4', marginBottom: '24px' } as any },
        { id: 'rest-h1', type: 'heading', category: 'Text', label: 'Title', content: 'A Culinary\nJourney', styles: { fontSize: '80px', fontWeight: '200', lineHeight: '1.02', letterSpacing: '-0.02em' } },
        { id: 'rest-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Three Michelin stars — Farm-to-table dining in the heart of Paris since 1987', styles: { fontSize: '17px', color: '#a8a29e', margin: '24px 0 48px 0', letterSpacing: '1px' } as any },
        { id: 'rest-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'RESERVE A TABLE', styles: { padding: '18px 56px', fontSize: '13px', fontWeight: '500', borderRadius: '0', backgroundColor: '#fef3c7', color: '#1c1917', border: 'none', letterSpacing: '3px' } as any },
      ],
    },
    {
      id: 'rest-about', type: 'body', label: 'Philosophy',
      styles: { padding: '100px 48px', backgroundColor: '#292524', color: '#fef3c7', textAlign: 'center' },
      components: [
        { id: 'rest-ab-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'OUR PHILOSOPHY', styles: { fontSize: '11px', fontWeight: '500', letterSpacing: '4px', opacity: '0.4', marginBottom: '24px' } as any },
        { id: 'rest-ab-h', type: 'heading', category: 'Text', label: 'Title', content: 'Where tradition meets\ninnovation', styles: { fontSize: '40px', fontWeight: '300', lineHeight: '1.3', margin: '0 0 24px 0', letterSpacing: '1px' } as any },
        { id: 'rest-ab-p', type: 'paragraph', category: 'Text', label: 'Description', content: 'Chef Laurent Dupont sources the finest seasonal ingredients from local producers, creating dishes that honor French culinary tradition while embracing contemporary techniques. Every plate tells a story of terroir, craftsmanship, and passion.', styles: { fontSize: '16px', color: '#a8a29e', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8' } as any },
      ],
    },
    {
      id: 'rest-gallery', type: 'body', label: 'Gallery',
      styles: { padding: '0' },
      components: [
        { id: 'rest-gal', type: 'horizontal-gallery', category: 'Media', label: 'Gallery', styles: {} },
      ],
    },
    {
      id: 'rest-menu', type: 'body', label: 'Menu',
      styles: { padding: '100px 48px', backgroundColor: '#fef3c7', color: '#1c1917' },
      components: [
        { id: 'rest-m-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'SEASONAL TASTING MENU', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'rest-m-h', type: 'heading', category: 'Text', label: 'Title', content: 'The Menu', styles: { fontSize: '44px', fontWeight: '300', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '3px' } as any },
        { id: 'rest-m-div', type: 'divider-text', category: 'Basic', label: 'Divider', content: 'AMUSE-BOUCHE & STARTERS', styles: {} },
        { id: 'rest-m1', type: 'paragraph', category: 'Text', label: 'Item', content: 'Truffle Burrata — Heirloom tomatoes, basil oil, aged balsamic, micro herbs..... $28', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
        { id: 'rest-m2', type: 'paragraph', category: 'Text', label: 'Item', content: 'Foie Gras Torchon — Fig compote, toasted brioche, Sauternes gel, edible flowers..... $36', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
        { id: 'rest-m3', type: 'paragraph', category: 'Text', label: 'Item', content: 'Hokkaido Uni — Sea urchin, dashi jelly, shiso, gold leaf..... $42', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
        { id: 'rest-m-div2', type: 'divider-text', category: 'Basic', label: 'Divider', content: 'MAINS', styles: { marginTop: '40px' } },
        { id: 'rest-m4', type: 'paragraph', category: 'Text', label: 'Item', content: 'A5 Wagyu Ribeye — Bone marrow butter, black garlic, potato mousseline, jus..... $78', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
        { id: 'rest-m5', type: 'paragraph', category: 'Text', label: 'Item', content: 'Dover Sole Meunière — Brown butter, capers, lemon, haricots verts..... $62', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
        { id: 'rest-m6', type: 'paragraph', category: 'Text', label: 'Item', content: 'Pigeon en Croûte — Foie gras, black truffle, Périgueux sauce..... $72', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8', lineHeight: '1.5' } },
      ],
    },
    {
      id: 'rest-reviews', type: 'body', label: 'Reviews',
      styles: { padding: '100px 48px', backgroundColor: '#292524', color: '#fef3c7' },
      components: [
        { id: 'rest-rev-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'GUEST REVIEWS', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '48px' } as any },
        { id: 'rest-test', type: 'testimonial-carousel', category: 'Layout', label: 'Reviews', styles: {} },
      ],
    },
    {
      id: 'rest-contact', type: 'body', label: 'Contact',
      styles: { padding: '100px 48px', backgroundColor: '#1c1917', color: '#fef3c7', textAlign: 'center' },
      components: [
        { id: 'rest-c-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'VISIT US', styles: { fontSize: '11px', fontWeight: '500', letterSpacing: '4px', opacity: '0.4', marginBottom: '20px' } as any },
        { id: 'rest-c-h', type: 'heading', category: 'Text', label: 'Title', content: 'La Maison', styles: { fontSize: '40px', fontWeight: '300', margin: '0 0 20px 0', letterSpacing: '3px' } as any },
        { id: 'rest-addr', type: 'paragraph', category: 'Text', label: 'Address', content: '42 Rue de la Paix, 75002 Paris, France\nTuesday – Sunday, 6:30 PM – 11:00 PM\nReservations: +33 1 42 65 15 16', styles: { fontSize: '15px', color: '#a8a29e', lineHeight: '2' } },
        { id: 'rest-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'MAKE A RESERVATION', styles: { marginTop: '36px', padding: '18px 56px', fontSize: '13px', fontWeight: '500', borderRadius: '0', backgroundColor: '#fef3c7', color: '#1c1917', border: 'none', letterSpacing: '3px' } as any },
        { id: 'rest-map', type: 'map', category: 'Widgets', label: 'Map', styles: { marginTop: '48px' }, props: { address: 'Paris, France' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#1c1917' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 10. PHOTOGRAPHY — Cinematic Portfolio
// ═══════════════════════════════════════════════════════════

const photographySchema: PageSchema = {
  id: 'page-photography', name: 'Photography',
  sections: [
    {
      id: 'photo-nav', type: 'header', label: 'Navigation',
      styles: { padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'LENS', styles: { fontSize: '18px', fontWeight: '400', letterSpacing: '10px' } as any },
        { id: 'photo-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Portfolio   Collections   About   Pricing   Contact', styles: { fontSize: '11px', letterSpacing: '3px', opacity: '0.45', textTransform: 'uppercase' } as any },
      ],
    },
    {
      id: 'photo-hero', type: 'body', label: 'Hero',
      styles: { padding: '180px 48px 140px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'photo-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'PHOTOGRAPHY BY ALEX RIVERA', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '6px', opacity: '0.3', marginBottom: '32px' } as any },
        { id: 'photo-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Capturing\nLife\'s Poetry', styles: { fontSize: '84px', fontWeight: '200', lineHeight: '1.02', letterSpacing: '-0.03em' } },
        { id: 'photo-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Wedding • Portrait • Editorial • Fine Art • Commercial', styles: { fontSize: '13px', color: '#525252', letterSpacing: '5px', textTransform: 'uppercase', marginTop: '40px' } as any },
        { id: 'photo-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'VIEW PORTFOLIO', styles: { marginTop: '48px', padding: '16px 48px', fontSize: '12px', borderRadius: '0', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '4px' } as any },
      ],
    },
    {
      id: 'photo-gallery', type: 'body', label: 'Gallery',
      styles: { padding: '48px', backgroundColor: '#0a0a0a' },
      components: [
        { id: 'photo-gal-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'SELECTED WORKS', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '5px', opacity: '0.3', color: '#ffffff', marginBottom: '32px' } as any },
        { id: 'photo-gal', type: 'gallery', category: 'Media', label: 'Gallery', styles: { display: 'grid', gap: '6px' }, props: { columns: 3 } },
      ],
    },
    {
      id: 'photo-about', type: 'body', label: 'About',
      styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-ab-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'ABOUT THE ARTIST', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '5px', opacity: '0.3', marginBottom: '32px' } as any },
        { id: 'photo-bio', type: 'author-bio', category: 'Blog', label: 'Bio', styles: {}, props: { name: 'Alex Rivera', bio: 'Award-winning photographer based in Los Angeles with 15+ years of experience. Published in Vogue, National Geographic, and The New York Times. Specializing in editorial, wedding, and fine art photography that captures the extraordinary in the ordinary.' } },
      ],
    },
    {
      id: 'photo-stats', type: 'body', label: 'Stats',
      styles: { padding: '80px 48px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'photo-stats-c', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 4 } },
      ],
    },
    {
      id: 'photo-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-pr-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'INVESTMENT', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '5px', opacity: '0.3', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'photo-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Packages', styles: { fontSize: '36px', fontWeight: '200', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '4px' } as any },
        { id: 'photo-pr1', type: 'pricing-card', category: 'Layout', label: 'Essential', styles: {}, props: { name: 'Essential', price: '$2,500', period: '/session', featured: false } },
        { id: 'photo-pr2', type: 'pricing-card', category: 'Layout', label: 'Premium', styles: {}, props: { name: 'Premium', price: '$5,000', period: '/session', featured: true } },
        { id: 'photo-pr3', type: 'pricing-card', category: 'Layout', label: 'Bespoke', styles: {}, props: { name: 'Bespoke', price: 'Custom', period: '', featured: false } },
      ],
    },
    {
      id: 'photo-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '100px 48px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'photo-test-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'CLIENT WORDS', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '5px', opacity: '0.3', textAlign: 'center', marginBottom: '48px' } as any },
        { id: 'photo-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'photo-contact', type: 'body', label: 'Contact',
      styles: { padding: '120px 48px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'photo-c-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'NOW BOOKING 2026', styles: { fontSize: '10px', fontWeight: '500', letterSpacing: '5px', opacity: '0.3', marginBottom: '24px' } as any },
        { id: 'photo-c-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s tell\nyour story.', styles: { fontSize: '52px', fontWeight: '200', lineHeight: '1.12', margin: '0 0 20px 0' } },
        { id: 'photo-c-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'Every session begins with a conversation. Let\'s talk about what matters most to you.', styles: { fontSize: '15px', color: '#737373', margin: '0 0 40px 0' } },
        { id: 'photo-c-btn', type: 'button', category: 'Basic', label: 'Email', content: 'INQUIRE NOW', styles: { padding: '16px 48px', fontSize: '12px', borderRadius: '0', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '4px' } as any },
        { id: 'photo-social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: { marginTop: '36px' }, props: { layout: 'horizontal', size: '24' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 11. LANDING PAGE — High-Conversion
// ═══════════════════════════════════════════════════════════

const landingSchema: PageSchema = {
  id: 'page-landing', name: 'Landing Page',
  sections: [
    {
      id: 'lp-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      components: [
        { id: 'lp-logo', type: 'heading', category: 'Text', label: 'Logo', content: '▲ Prism', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'lp-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Features   How It Works   Pricing   FAQ', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
        { id: 'lp-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Early Access', styles: { padding: '10px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'lp-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 40px 100px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)' },
      components: [
        { id: 'lp-chip', type: 'chip-group', category: 'Widgets', label: 'Tags', styles: { justifyContent: 'center' }, props: { items: '🆕 Just Launched,🏆 Product Hunt #1,⭐ 4.9/5 Rating' } },
        { id: 'lp-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'The modern way to\nbuild web products', styles: { fontSize: '68px', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.03em', margin: '28px 0 20px 0' } },
        { id: 'lp-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'From wireframe to production in one tool. Design, build, and ship — all without leaving your browser. No coding required.', styles: { fontSize: '20px', color: '#6b7280', maxWidth: '620px', margin: '0 auto 40px', lineHeight: '1.6' } as any },
        { id: 'lp-cta1', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free — No Credit Card', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', marginRight: '12px' } },
        { id: 'lp-cta2', type: 'button', category: 'Basic', label: 'Secondary', content: 'Watch 2-min Demo', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'transparent', color: '#0f172a', border: '1px solid #d1d5db' } },
      ],
    },
    {
      id: 'lp-logos', type: 'body', label: 'Social Proof',
      styles: { padding: '56px 40px' },
      components: [
        { id: 'lp-lc', type: 'logo-cloud', category: 'Layout', label: 'Logos', styles: {}, props: { title: 'Loved by 25,000+ developers and designers' } },
      ],
    },
    {
      id: 'lp-features', type: 'body', label: 'Features',
      styles: { padding: '100px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'lp-f-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'FEATURES', styles: {} },
        { id: 'lp-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why teams choose Prism', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 12px 0', letterSpacing: '-0.02em' } },
        { id: 'lp-f-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Everything you need to design, build, and launch — without the complexity.', styles: { textAlign: 'center', color: '#6b7280', margin: '0 auto 56px', fontSize: '18px', maxWidth: '480px' } as any },
        { id: 'lp-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🎯', title: 'Pixel Perfect Design', description: 'Advanced layout engine with snap-to-grid, auto-layout, and responsive breakpoints built in.' } },
        { id: 'lp-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '⚡', title: 'One-Click Deploy', description: 'Deploy to a global CDN with automatic SSL, custom domains, and instant rollback capability.' } },
        { id: 'lp-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤝', title: 'Real-time Collaboration', description: 'Multiplayer editing with live cursors, comments, version history, and approval workflows.' } },
        { id: 'lp-f4', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🧩', title: '100+ Components', description: 'Drag-and-drop from a library of professionally designed, fully responsive components.' } },
      ],
    },
    {
      id: 'lp-steps', type: 'body', label: 'How It Works',
      styles: { padding: '100px 40px' },
      components: [
        { id: 'lp-s-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'HOW IT WORKS', styles: {} },
        { id: 'lp-s-h', type: 'heading', category: 'Text', label: 'Title', content: 'From idea to live site\nin 3 simple steps', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 56px 0', letterSpacing: '-0.02em' } },
        { id: 'lp-steps-c', type: 'numbered-steps', category: 'Layout', label: 'Steps', styles: {} },
      ],
    },
    {
      id: 'lp-stats', type: 'body', label: 'Stats',
      styles: { padding: '80px 40px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'lp-stats-c', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 4 } },
      ],
    },
    {
      id: 'lp-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '100px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'lp-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'What people are saying', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0' } },
        { id: 'lp-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'lp-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '100px 40px' },
      components: [
        { id: 'lp-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Start free, upgrade anytime', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 12px 0', letterSpacing: '-0.02em' } },
        { id: 'lp-pr-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'No credit card required. Cancel anytime.', styles: { textAlign: 'center', color: '#6b7280', margin: '0 0 48px 0', fontSize: '18px' } },
        { id: 'lp-pr1', type: 'pricing-card', category: 'Layout', label: 'Free', styles: {}, props: { name: 'Free', price: '$0', period: '/month', featured: false } },
        { id: 'lp-pr2', type: 'pricing-card', category: 'Layout', label: 'Pro', styles: {}, props: { name: 'Pro', price: '$19', period: '/month', featured: true } },
        { id: 'lp-pr3', type: 'pricing-card', category: 'Layout', label: 'Team', styles: {}, props: { name: 'Team', price: '$49', period: '/month', featured: false } },
      ],
    },
    {
      id: 'lp-faq', type: 'body', label: 'FAQ',
      styles: { padding: '100px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'lp-faq-h', type: 'heading', category: 'Text', label: 'Title', content: 'Frequently asked questions', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'lp-faq-c', type: 'faq', category: 'Layout', label: 'FAQ', styles: {} },
      ],
    },
    {
      id: 'lp-cta-bottom', type: 'body', label: 'CTA',
      styles: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)' },
      components: [
        { id: 'lp-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Start building today.\nIt\'s free.', styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-0.02em' } },
        { id: 'lp-cta-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'Join thousands of teams shipping faster with Prism.', styles: { fontSize: '18px', color: '#6b7280', margin: '0 0 36px 0' } },
        { id: 'lp-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started — It\'s Free →', styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 12. SOCIAL / COMMUNITY — Vibrant Platform
// ═══════════════════════════════════════════════════════════

const communitySchema: PageSchema = {
  id: 'page-community', name: 'Community',
  sections: [
    {
      id: 'com-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7c3aed', color: '#ffffff' },
      components: [
        { id: 'com-logo', type: 'heading', category: 'Text', label: 'Logo', content: '🟣 Commune', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'com-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Feed   Events   Members   Resources   About', styles: { fontSize: '14px', opacity: '0.8', fontWeight: '500' } },
        { id: 'com-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Join Free', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none' } },
      ],
    },
    {
      id: 'com-hero', type: 'body', label: 'Hero',
      styles: { padding: '100px 40px 80px', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 70%, #4c1d95 100%)', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'com-badge', type: 'badge', category: 'Text', label: 'Badge', content: '🎉 50,000+ Members & Growing', styles: {} },
        { id: 'com-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Connect with\ncreators worldwide', styles: { fontSize: '56px', fontWeight: '800', lineHeight: '1.08', margin: '20px 0 16px 0', letterSpacing: '-0.02em' } },
        { id: 'com-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Join a vibrant community of designers, developers, and makers building the future of the web. Share ideas, get feedback, and grow together.', styles: { fontSize: '18px', opacity: '0.8', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' } as any },
        { id: 'com-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'Join the Community — Free', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none', marginRight: '12px' } },
        { id: 'com-stats', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0', marginTop: '56px' }, props: { columns: 3 } },
      ],
    },
    {
      id: 'com-features', type: 'body', label: 'Why Join',
      styles: { padding: '100px 40px' },
      components: [
        { id: 'com-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why join Commune?', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '-0.02em' } },
        { id: 'com-f1', type: 'feature-card', category: 'Layout', label: 'Feature 1', styles: {}, props: { icon: '💬', title: 'Discussion Forums', description: 'Engage in thoughtful conversations across 50+ topic channels. Get help, share knowledge, and connect with peers.' } },
        { id: 'com-f2', type: 'feature-card', category: 'Layout', label: 'Feature 2', styles: {}, props: { icon: '🎓', title: 'Weekly Workshops', description: 'Free live workshops and AMAs with industry experts. Learn new skills every week from the best in the field.' } },
        { id: 'com-f3', type: 'feature-card', category: 'Layout', label: 'Feature 3', styles: {}, props: { icon: '🤝', title: 'Mentorship Program', description: 'Connect with experienced mentors who guide your growth. 1-on-1 sessions, career advice, and portfolio reviews.' } },
      ],
    },
    {
      id: 'com-feed', type: 'body', label: 'Feed',
      styles: { padding: '48px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'com-feed-h', type: 'heading', category: 'Text', label: 'Title', content: 'Latest from the Community', styles: { fontSize: '28px', fontWeight: '700', textAlign: 'center', margin: '0 0 32px 0' } },
        { id: 'com-sf1', type: 'social-feed-card', category: 'Social', label: 'Post', styles: { maxWidth: '640px', margin: '0 auto' }, props: { platform: 'Commune', content: 'Just shipped our new design system! 🎨 Check out the full documentation and component library. Feedback welcome!' } },
        { id: 'com-sf2', type: 'social-feed-card', category: 'Social', label: 'Post', styles: { maxWidth: '640px', margin: '16px auto 0' }, props: { platform: 'Commune', content: 'Who\'s attending the virtual meetup this Friday? Topic: Advanced CSS Grid techniques & container queries 🔥 Register link in bio.' } },
        { id: 'com-sf3', type: 'social-feed-card', category: 'Social', label: 'Post', styles: { maxWidth: '640px', margin: '16px auto 0' }, props: { platform: 'Commune', content: 'Launched my first SaaS product today! 🚀 Couldn\'t have done it without this incredible community. Thank you for all the feedback and support!' } },
      ],
    },
    {
      id: 'com-members', type: 'body', label: 'Members',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'com-m-over', type: 'paragraph', category: 'Text', label: 'Overline', content: 'COMMUNITY LEADERS', styles: { fontSize: '11px', fontWeight: '600', letterSpacing: '4px', opacity: '0.35', textAlign: 'center', marginBottom: '16px' } as any },
        { id: 'com-m-h', type: 'heading', category: 'Text', label: 'Title', content: 'Featured Members', styles: { fontSize: '32px', fontWeight: '700', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'com-team', type: 'team-grid', category: 'Layout', label: 'Members', styles: {} },
      ],
    },
    {
      id: 'com-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '80px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'com-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'What members say', styles: { fontSize: '32px', fontWeight: '700', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'com-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'com-cta', type: 'body', label: 'CTA',
      styles: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', color: '#ffffff' },
      components: [
        { id: 'com-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Ready to join 50,000+\ncreators?', styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-0.02em' } },
        { id: 'com-cta-p', type: 'paragraph', category: 'Text', label: 'CTA Sub', content: 'It\'s completely free. No credit card required.', styles: { fontSize: '18px', opacity: '0.8', margin: '0 0 36px 0' } },
        { id: 'com-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'Join the Community →', styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

export const templates: Template[] = [
  { id: 'blank', name: 'Blank Canvas', description: 'Clean starter with header, hero section, and footer — ready for customization', category: 'starter', thumbnail: '🗒️', schema: blankSchema },
  { id: 'saas', name: 'SaaS Landing', description: 'Full-featured startup landing with hero, features, pricing, FAQ, testimonials, and conversion CTAs', category: 'tech', thumbnail: '⚡', schema: saasSchema },
  { id: 'agency', name: 'Creative Agency', description: 'Bold agency site with immersive hero, portfolio showcase, services, team, and client testimonials', category: 'creative', thumbnail: '✦', schema: agencySchema },
  { id: 'blog', name: 'Modern Blog', description: 'Content-first publishing platform with featured posts, categories, newsletter, and search', category: 'content', thumbnail: '✍️', schema: blogSchema },
  { id: 'enterprise', name: 'Enterprise', description: 'Professional B2B site with KPIs, feature comparison, pricing tiers, and enterprise-grade social proof', category: 'business', thumbnail: '◆', schema: enterpriseSchema },
  { id: 'portfolio', name: 'Portfolio', description: 'Refined designer portfolio with project showcase, about section, experience timeline, and testimonials', category: 'creative', thumbnail: '◯', schema: portfolioSchema },
  { id: 'ecommerce', name: 'E-commerce', description: 'Premium fashion store with categories, product grid, customer reviews, and newsletter signup', category: 'commerce', thumbnail: '🛍️', schema: ecommerceSchema },
  { id: 'dashboard', name: 'Dashboard', description: 'Data-rich admin panel with KPIs, charts, data tables, search, and pagination', category: 'tech', thumbnail: '📊', schema: dashboardSchema },
  { id: 'restaurant', name: 'Fine Dining', description: 'Elegant restaurant site with tasting menu, philosophy section, gallery, reviews, and reservations', category: 'food', thumbnail: '✦', schema: restaurantSchema },
  { id: 'photography', name: 'Photography', description: 'Cinematic photography portfolio with gallery, pricing packages, testimonials, and booking CTA', category: 'creative', thumbnail: '📷', schema: photographySchema },
  { id: 'landing', name: 'Landing Page', description: 'High-conversion landing with social proof, features, pricing, FAQ, and multiple CTAs', category: 'marketing', thumbnail: '▲', schema: landingSchema },
  { id: 'community', name: 'Community', description: 'Vibrant social platform with activity feed, member showcase, features, and community testimonials', category: 'social', thumbnail: '🟣', schema: communitySchema },
];
