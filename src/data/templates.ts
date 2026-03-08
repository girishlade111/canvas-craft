import type { Template, PageSchema } from '@/types/builder';

// ═══════════════════════════════════════════════════════════
// SHARED PARTIALS
// ═══════════════════════════════════════════════════════════

const darkFooter = {
  id: 'footer-shared', type: 'footer' as const, label: 'Footer',
  styles: { padding: '48px 24px', backgroundColor: '#0f172a', color: '#94a3b8', textAlign: 'center' },
  components: [
    { id: 'f-social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: {}, props: { layout: 'horizontal', size: '28' } },
    { id: 'f-divider', type: 'divider', category: 'Basic', label: 'Divider', styles: { width: '100%', height: '1px', backgroundColor: '#1e293b', margin: '24px 0' } },
    { id: 'f-text', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 All rights reserved. Built with DevBuilder.', styles: { fontSize: '13px', opacity: '0.6' } },
  ],
};

const lightFooter = {
  ...darkFooter,
  styles: { padding: '48px 24px', backgroundColor: '#f8fafc', color: '#64748b', textAlign: 'center', borderTop: '1px solid #e2e8f0' },
  components: [
    { id: 'f-social-l', type: 'social-icons', category: 'Widgets', label: 'Social', styles: {}, props: { layout: 'horizontal', size: '28' } },
    { id: 'f-divider-l', type: 'divider', category: 'Basic', label: 'Divider', styles: { width: '100%', height: '1px', backgroundColor: '#e2e8f0', margin: '24px 0' } },
    { id: 'f-text-l', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 All rights reserved.', styles: { fontSize: '13px' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 1. BLANK CANVAS
// ═══════════════════════════════════════════════════════════

const blankSchema: PageSchema = {
  id: 'page-blank', name: 'Home',
  sections: [
    {
      id: 'header-1', type: 'header', label: 'Header',
      styles: { padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'logo-1', type: 'heading', category: 'Text', label: 'Logo', content: 'MySite', styles: { fontSize: '20px', fontWeight: '700' } },
      ],
    },
    {
      id: 'body-1', type: 'body', label: 'Body',
      styles: { padding: '80px 24px', minHeight: '400px', textAlign: 'center' },
      components: [
        { id: 'body-heading', type: 'heading', category: 'Text', label: 'Main Heading', content: 'Welcome to Your Website', styles: { fontSize: '40px', fontWeight: '800', margin: '0 0 16px 0' } },
        { id: 'body-text', type: 'paragraph', category: 'Text', label: 'Body Text', content: 'Start building by dragging components from the sidebar.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' } as any },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 2. STARTUP SAAS — Full Landing
// ═══════════════════════════════════════════════════════════

const saasSchema: PageSchema = {
  id: 'page-saas', name: 'SaaS Landing',
  sections: [
    {
      id: 'saas-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-logo', type: 'heading', category: 'Text', label: 'Logo', content: '⚡ Velocity', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'saas-nav-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Features   Pricing   Docs   Blog', styles: { fontSize: '14px', opacity: '0.7' } },
      ],
    },
    {
      id: 'saas-announce', type: 'body', label: 'Announcement',
      styles: { padding: '0' },
      components: [
        { id: 'saas-ann', type: 'announcement-bar', category: 'Widgets', label: 'Announcement', content: '🚀 v3.0 is here — AI-powered workflows, 10x faster builds. Read the announcement →', styles: {} },
      ],
    },
    {
      id: 'saas-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 32px 80px', textAlign: 'center', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-badge', type: 'badge', category: 'Text', label: 'Badge', content: '✨ Trusted by 50,000+ teams', styles: {} },
        { id: 'saas-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'Ship products faster\nwith modern tooling', styles: { fontSize: '64px', fontWeight: '800', lineHeight: '1.1', margin: '20px 0', letterSpacing: '-0.02em' } },
        { id: 'saas-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'The complete platform for building, deploying, and scaling web applications. From prototype to production in minutes.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '640px', margin: '0 auto 32px' } as any },
        { id: 'saas-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free Trial →', styles: { padding: '16px 40px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'saas-logos', type: 'body', label: 'Social Proof',
      styles: { padding: '48px 32px', backgroundColor: '#020617' },
      components: [
        { id: 'saas-lc', type: 'logo-cloud', category: 'Layout', label: 'Logo Cloud', styles: {}, props: { title: 'Trusted by industry leaders' } },
      ],
    },
    {
      id: 'saas-features', type: 'body', label: 'Features',
      styles: { padding: '80px 32px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-feat-h', type: 'heading', category: 'Text', label: 'Title', content: 'Everything you need to build', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 12px 0' } },
        { id: 'saas-feat-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Powerful features that help you go from idea to launch faster.', styles: { textAlign: 'center', color: '#94a3b8', margin: '0 0 48px 0', fontSize: '18px' } },
        { id: 'saas-f1', type: 'feature-card', category: 'Layout', label: 'Feature 1', styles: {}, props: { icon: '⚡', title: 'Lightning Fast', description: 'Optimized build pipeline with edge caching for sub-second load times.' } },
        { id: 'saas-f2', type: 'feature-card', category: 'Layout', label: 'Feature 2', styles: {}, props: { icon: '🔒', title: 'Enterprise Security', description: 'SOC2 compliant with end-to-end encryption and role-based access.' } },
        { id: 'saas-f3', type: 'feature-card', category: 'Layout', label: 'Feature 3', styles: {}, props: { icon: '📊', title: 'Real-time Analytics', description: 'Monitor performance, track events, and make data-driven decisions.' } },
        { id: 'saas-f4', type: 'feature-card', category: 'Layout', label: 'Feature 4', styles: {}, props: { icon: '🔄', title: 'CI/CD Pipeline', description: 'Automatic deployments from Git with preview environments.' } },
      ],
    },
    {
      id: 'saas-stats', type: 'body', label: 'Stats',
      styles: { padding: '64px 32px', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-stats-c', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 4 } },
      ],
    },
    {
      id: 'saas-testimonial', type: 'body', label: 'Testimonials',
      styles: { padding: '80px 32px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonial', styles: {} },
      ],
    },
    {
      id: 'saas-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '80px 32px', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-price-h', type: 'heading', category: 'Text', label: 'Title', content: 'Simple, transparent pricing', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'saas-price-1', type: 'pricing-card', category: 'Layout', label: 'Starter', styles: {}, props: { name: 'Starter', price: '$0', period: '/month', featured: false } },
        { id: 'saas-price-2', type: 'pricing-card', category: 'Layout', label: 'Pro', styles: {}, props: { name: 'Pro', price: '$29', period: '/month', featured: true } },
        { id: 'saas-price-3', type: 'pricing-card', category: 'Layout', label: 'Enterprise', styles: {}, props: { name: 'Enterprise', price: '$99', period: '/month', featured: false } },
      ],
    },
    {
      id: 'saas-faq', type: 'body', label: 'FAQ',
      styles: { padding: '80px 32px', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'saas-faq-c', type: 'faq', category: 'Layout', label: 'FAQ', styles: {} },
      ],
    },
    {
      id: 'saas-cta-bottom', type: 'body', label: 'CTA',
      styles: { padding: '80px 32px', backgroundColor: '#020617' },
      components: [
        { id: 'saas-cta-b', type: 'cta-banner', category: 'Layout', label: 'CTA', styles: {}, props: { buttonText: 'Start Building for Free' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#020617' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 3. CREATIVE AGENCY
// ═══════════════════════════════════════════════════════════

const agencySchema: PageSchema = {
  id: 'page-agency', name: 'Agency',
  sections: [
    {
      id: 'ag-nav', type: 'header', label: 'Navigation',
      styles: { padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent' },
      components: [
        { id: 'ag-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'STUDIO∞', styles: { fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' } },
        { id: 'ag-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   Services   About   Contact', styles: { fontSize: '14px', fontWeight: '500' } },
      ],
    },
    {
      id: 'ag-hero', type: 'body', label: 'Hero',
      styles: { padding: '140px 40px 100px', background: 'linear-gradient(160deg, #0f0f23 0%, #1a1a3e 40%, #2d1b4e 70%, #0f0f23 100%)', color: '#ffffff' },
      components: [
        { id: 'ag-h1', type: 'heading', category: 'Text', label: 'Hero Title', content: 'We craft digital\nexperiences that\nmove people.', styles: { fontSize: '72px', fontWeight: '800', lineHeight: '1.05', letterSpacing: '-0.03em', margin: '0 0 24px 0' } },
        { id: 'ag-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Award-winning agency specializing in brand strategy, product design, and full-stack development for ambitious companies.', styles: { fontSize: '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', lineHeight: '1.6' } },
        { id: 'ag-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'View Our Work', styles: { marginTop: '40px', padding: '16px 40px', fontSize: '15px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#0f0f23', border: 'none' } },
      ],
    },
    {
      id: 'ag-marquee', type: 'body', label: 'Marquee',
      styles: { padding: '0', backgroundColor: '#0f0f23' },
      components: [
        { id: 'ag-mq', type: 'marquee', category: 'Widgets', label: 'Marquee', content: '★ Brand Strategy  ★ UI/UX Design  ★ Web Development  ★ Mobile Apps  ★ Motion Graphics  ★ Creative Direction', styles: {} },
      ],
    },
    {
      id: 'ag-work', type: 'body', label: 'Featured Work',
      styles: { padding: '100px 40px', backgroundColor: '#fafafa' },
      components: [
        { id: 'ag-w-h', type: 'heading', category: 'Text', label: 'Section Title', content: 'Featured Work', styles: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '3px', opacity: '0.4', margin: '0 0 48px 0' } as any },
        { id: 'ag-w1', type: 'image-overlay-card', category: 'Media', label: 'Project 1', styles: {}, props: { title: 'Nexus Rebrand', subtitle: 'Brand Identity • Strategy • Guidelines' } },
        { id: 'ag-w2', type: 'image-overlay-card', category: 'Media', label: 'Project 2', styles: { marginTop: '24px' }, props: { title: 'Pulse Dashboard', subtitle: 'Product Design • Frontend • Analytics' } },
        { id: 'ag-w3', type: 'image-overlay-card', category: 'Media', label: 'Project 3', styles: { marginTop: '24px' }, props: { title: 'Meridian Commerce', subtitle: 'E-commerce • Mobile • Payments' } },
      ],
    },
    {
      id: 'ag-team', type: 'body', label: 'Team',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ag-team-h', type: 'heading', category: 'Text', label: 'Title', content: 'Meet the Team', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'ag-team-g', type: 'team-grid', category: 'Layout', label: 'Team', styles: {} },
      ],
    },
    {
      id: 'ag-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '80px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ag-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'ag-cta-section', type: 'body', label: 'CTA',
      styles: { padding: '100px 40px', textAlign: 'center' },
      components: [
        { id: 'ag-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s create something\nextraordinary together.', styles: { fontSize: '48px', fontWeight: '800', lineHeight: '1.1', margin: '0 0 24px 0' } },
        { id: 'ag-cta-btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Start a Project →', styles: { padding: '16px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#0f0f23', color: '#ffffff', border: 'none' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 4. MODERN BLOG
// ═══════════════════════════════════════════════════════════

const blogSchema: PageSchema = {
  id: 'page-blog', name: 'Blog',
  sections: [
    {
      id: 'blog-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'blog-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✍️ The Journal', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'blog-search', type: 'search-bar', category: 'Widgets', label: 'Search', styles: {} },
      ],
    },
    {
      id: 'blog-hero', type: 'body', label: 'Hero',
      styles: { padding: '80px 32px', textAlign: 'center', background: 'linear-gradient(135deg, #faf5ff, #f0f9ff, #fefce8)' },
      components: [
        { id: 'blog-h', type: 'heading', category: 'Text', label: 'Title', content: 'Stories, Ideas &\nInsights', styles: { fontSize: '56px', fontWeight: '800', lineHeight: '1.1', margin: '0 0 16px 0' } },
        { id: 'blog-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Exploring design, technology, and the art of building great products.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '520px', margin: '0 auto' } as any },
        { id: 'blog-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: { marginTop: '32px' }, props: { title: '', buttonText: 'Subscribe' } },
      ],
    },
    {
      id: 'blog-tags', type: 'body', label: 'Tags',
      styles: { padding: '24px 32px', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'blog-tl', type: 'tag-list', category: 'Widgets', label: 'Tags', styles: {}, props: { tags: 'All,Design,Engineering,Product,Culture,Tutorials' } },
      ],
    },
    {
      id: 'blog-grid', type: 'body', label: 'Posts',
      styles: { padding: '48px 32px' },
      components: [
        { id: 'bp-1', type: 'blog-post-card', category: 'Blog', label: 'Post 1', styles: {}, props: { title: 'The Art of Minimal Design', excerpt: 'How less really is more in modern web interfaces...', date: 'Mar 5, 2026', author: 'Sarah Chen' } },
        { id: 'bp-2', type: 'blog-post-card', category: 'Blog', label: 'Post 2', styles: { marginTop: '24px' }, props: { title: 'Building Scalable Design Systems', excerpt: 'A comprehensive guide to creating reusable component libraries...', date: 'Mar 2, 2026', author: 'Alex Kim' } },
        { id: 'bp-3', type: 'blog-post-card', category: 'Blog', label: 'Post 3', styles: { marginTop: '24px' }, props: { title: 'React Performance Deep Dive', excerpt: 'Advanced optimization techniques for production applications...', date: 'Feb 28, 2026', author: 'James Liu' } },
      ],
    },
    {
      id: 'blog-pagination', type: 'body', label: 'Pagination',
      styles: { padding: '32px', textAlign: 'center' },
      components: [
        { id: 'blog-pag', type: 'pagination', category: 'Widgets', label: 'Pagination', styles: {}, props: { totalPages: 5, currentPage: 1 } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 5. ENTERPRISE BUSINESS
// ═══════════════════════════════════════════════════════════

const enterpriseSchema: PageSchema = {
  id: 'page-enterprise', name: 'Enterprise',
  sections: [
    {
      id: 'ent-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'ent-logo', type: 'heading', category: 'Text', label: 'Logo', content: '◆ Meridian', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'ent-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Solutions   Products   Resources   Company', styles: { fontSize: '14px', fontWeight: '500' } },
        { id: 'ent-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Request Demo', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '600', borderRadius: '8px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'ent-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 40px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'ent-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Enterprise Infrastructure\nfor the AI Era', styles: { fontSize: '60px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em', margin: '0 0 20px 0' } },
        { id: 'ent-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Secure, scalable, and intelligent platform trusted by Fortune 500 companies to power their digital transformation.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 36px' } as any },
        { id: 'ent-cta1', type: 'button', category: 'Basic', label: 'Primary CTA', content: 'Schedule a Demo', styles: { padding: '16px 40px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', marginRight: '12px' } },
        { id: 'ent-cta2', type: 'button', category: 'Basic', label: 'Secondary CTA', content: 'View Documentation', styles: { padding: '16px 40px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #334155' } },
      ],
    },
    {
      id: 'ent-logos', type: 'body', label: 'Clients',
      styles: { padding: '48px 40px', backgroundColor: '#0f172a' },
      components: [
        { id: 'ent-lc', type: 'logo-cloud', category: 'Layout', label: 'Logos', styles: {}, props: { title: 'Powering the world\'s best companies' } },
      ],
    },
    {
      id: 'ent-kpi', type: 'body', label: 'KPIs',
      styles: { padding: '64px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ent-kpi-c', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
      ],
    },
    {
      id: 'ent-features', type: 'body', label: 'Features',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ent-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Built for scale, designed for teams', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'ent-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🛡️', title: 'SOC2 & HIPAA Compliant', description: 'Enterprise-grade security with continuous monitoring and automated compliance.' } },
        { id: 'ent-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🌐', title: 'Global Edge Network', description: '200+ edge locations for sub-50ms latency worldwide.' } },
        { id: 'ent-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤖', title: 'AI-Powered Insights', description: 'Machine learning models that optimize your infrastructure in real-time.' } },
      ],
    },
    {
      id: 'ent-comparison', type: 'body', label: 'Comparison',
      styles: { padding: '80px 40px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'ent-cmp-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why choose Meridian?', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 40px 0' } },
        { id: 'ent-cmp', type: 'comparison-table', category: 'Layout', label: 'Comparison', styles: {} },
      ],
    },
    {
      id: 'ent-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '80px 40px' },
      components: [
        { id: 'ent-test-h', type: 'heading', category: 'Text', label: 'Title', content: 'What leaders say', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 40px 0' } },
        { id: 'ent-test', type: 'blockquote-image', category: 'Text', label: 'Testimonial', styles: {}, props: { author: 'Sarah Johnson, CTO at TechCorp' }, content: '"Meridian transformed how we deploy and scale. Our infrastructure costs dropped 40% while performance improved across every metric."' },
      ],
    },
    {
      id: 'ent-cta', type: 'body', label: 'CTA',
      styles: { padding: '100px 40px' },
      components: [
        { id: 'ent-cta-c', type: 'cta-banner', category: 'Layout', label: 'CTA', styles: {}, props: { buttonText: 'Talk to Sales' } },
      ],
    },
    darkFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 6. MODERN PORTFOLIO
// ═══════════════════════════════════════════════════════════

const portfolioSchema: PageSchema = {
  id: 'page-portfolio', name: 'Portfolio',
  sections: [
    {
      id: 'port-nav', type: 'header', label: 'Navigation',
      styles: { padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-name', type: 'heading', category: 'Text', label: 'Name', content: 'JANE DOE', styles: { fontSize: '16px', fontWeight: '600', letterSpacing: '3px' } as any },
        { id: 'port-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   About   Contact', styles: { fontSize: '14px', opacity: '0.6' } },
      ],
    },
    {
      id: 'port-hero', type: 'body', label: 'Hero',
      styles: { padding: '140px 40px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Designer &\nCreative Director', styles: { fontSize: '76px', fontWeight: '200', lineHeight: '1.05', letterSpacing: '-0.03em' } },
        { id: 'port-sub', type: 'paragraph', category: 'Text', label: 'Bio', content: 'I create thoughtful digital experiences at the intersection of design and technology. Currently leading design at ◆ StudioLab.', styles: { fontSize: '18px', color: '#737373', maxWidth: '480px', marginTop: '32px', lineHeight: '1.7' } },
      ],
    },
    {
      id: 'port-work', type: 'body', label: 'Selected Work',
      styles: { padding: '80px 40px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'port-w-h', type: 'heading', category: 'Text', label: 'Section', content: 'Selected Work', styles: { fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '4px', opacity: '0.4', margin: '0 0 48px 0' } as any },
        { id: 'port-w1', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: {}, props: { title: 'Cosmos Rebrand', subtitle: '2026 — Brand Identity & Web' } },
        { id: 'port-w2', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Flux App Design', subtitle: '2025 — Product Design & UX' } },
        { id: 'port-w3', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Zenith Dashboard', subtitle: '2025 — Data Visualization' } },
      ],
    },
    {
      id: 'port-timeline', type: 'body', label: 'Experience',
      styles: { padding: '80px 40px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'port-tl-h', type: 'heading', category: 'Text', label: 'Section', content: 'Experience', styles: { fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '4px', opacity: '0.4', margin: '0 0 40px 0' } as any },
        { id: 'port-tl', type: 'timeline', category: 'Layout', label: 'Timeline', styles: {} },
      ],
    },
    {
      id: 'port-contact', type: 'body', label: 'Contact',
      styles: { padding: '100px 40px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'port-c-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s work\ntogether.', styles: { fontSize: '56px', fontWeight: '200', lineHeight: '1.1', margin: '0 0 32px 0' } },
        { id: 'port-email', type: 'button', category: 'Basic', label: 'Email', content: 'hello@janedoe.com', styles: { padding: '16px 48px', fontSize: '16px', fontWeight: '500', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 7. E-COMMERCE STORE
// ═══════════════════════════════════════════════════════════

const ecommerceSchema: PageSchema = {
  id: 'page-ecommerce', name: 'Store',
  sections: [
    {
      id: 'ec-announce', type: 'body', label: 'Announcement',
      styles: { padding: '0' },
      components: [
        { id: 'ec-ann', type: 'announcement-bar', category: 'Widgets', label: 'Promo', content: '🚚 Free shipping on orders over $50 — Use code SHIP50', styles: {} },
      ],
    },
    {
      id: 'ec-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' },
      components: [
        { id: 'ec-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'MAISON', styles: { fontSize: '24px', fontWeight: '300', letterSpacing: '6px' } as any },
        { id: 'ec-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'New Arrivals   Women   Men   Sale', styles: { fontSize: '13px', fontWeight: '500', letterSpacing: '1px' } as any },
      ],
    },
    {
      id: 'ec-hero', type: 'body', label: 'Hero',
      styles: { padding: '100px 40px', background: 'linear-gradient(135deg, #fdf4ff, #faf5ff, #f5f3ff)', textAlign: 'center' },
      components: [
        { id: 'ec-badge', type: 'badge', category: 'Text', label: 'Badge', content: 'New Collection', styles: {} },
        { id: 'ec-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Spring/Summer\n2026', styles: { fontSize: '64px', fontWeight: '200', lineHeight: '1.1', letterSpacing: '-0.02em', margin: '16px 0 20px 0' } },
        { id: 'ec-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Discover timeless pieces crafted with premium materials.', styles: { fontSize: '18px', color: '#6b7280', margin: '0 0 32px 0' } },
        { id: 'ec-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'Shop Collection', styles: { padding: '16px 48px', fontSize: '14px', fontWeight: '600', borderRadius: '0', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', letterSpacing: '2px', textTransform: 'uppercase' } as any },
      ],
    },
    {
      id: 'ec-products', type: 'body', label: 'Products',
      styles: { padding: '64px 32px' },
      components: [
        { id: 'ec-prod-h', type: 'heading', category: 'Text', label: 'Title', content: 'Bestsellers', styles: { fontSize: '28px', fontWeight: '600', textAlign: 'center', margin: '0 0 40px 0' } },
        { id: 'ec-pg', type: 'product-grid', category: 'Ecommerce', label: 'Products', styles: {} },
      ],
    },
    {
      id: 'ec-features', type: 'body', label: 'Features',
      styles: { padding: '64px 32px', backgroundColor: '#fafafa' },
      components: [
        { id: 'ec-fl', type: 'feature-list', category: 'Widgets', label: 'Features', styles: {}, props: { items: 'Free shipping on $50+,30-day hassle-free returns,Sustainable packaging,Lifetime warranty' } },
      ],
    },
    {
      id: 'ec-reviews', type: 'body', label: 'Reviews',
      styles: { padding: '64px 32px' },
      components: [
        { id: 'ec-rev-h', type: 'heading', category: 'Text', label: 'Title', content: 'What Our Customers Say', styles: { fontSize: '28px', fontWeight: '600', textAlign: 'center', margin: '0 0 40px 0' } },
        { id: 'ec-r1', type: 'review-card', category: 'Ecommerce', label: 'Review 1', styles: {}, props: { author: 'Emma L.', rating: 5, content: 'Absolutely stunning quality. The fabric is so soft and the fit is perfect.' } },
        { id: 'ec-r2', type: 'review-card', category: 'Ecommerce', label: 'Review 2', styles: { marginTop: '16px' }, props: { author: 'David K.', rating: 5, content: 'Best purchase I\'ve made this year. Will definitely be ordering more.' } },
      ],
    },
    {
      id: 'ec-newsletter', type: 'body', label: 'Newsletter',
      styles: { padding: '80px 32px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'ec-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: 'Join the MAISON community', buttonText: 'Join Now' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 8. DASHBOARD / APP
// ═══════════════════════════════════════════════════════════

const dashboardSchema: PageSchema = {
  id: 'page-dashboard', name: 'Dashboard',
  sections: [
    {
      id: 'dash-nav', type: 'header', label: 'Top Bar',
      styles: { padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'dash-logo', type: 'heading', category: 'Text', label: 'Logo', content: '📊 Analytics Hub', styles: { fontSize: '18px', fontWeight: '700' } },
        { id: 'dash-avatar', type: 'avatar', category: 'Media', label: 'User', styles: {}, props: { name: 'Admin', size: '36' } },
      ],
    },
    {
      id: 'dash-breadcrumb', type: 'body', label: 'Breadcrumb',
      styles: { padding: '16px 24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
      components: [
        { id: 'dash-bc', type: 'breadcrumb-trail', category: 'Widgets', label: 'Breadcrumb', styles: {}, props: { items: 'Home,Dashboard,Overview' } },
      ],
    },
    {
      id: 'dash-kpis', type: 'body', label: 'KPIs',
      styles: { padding: '24px' },
      components: [
        { id: 'dash-kpi', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
      ],
    },
    {
      id: 'dash-charts', type: 'body', label: 'Charts',
      styles: { padding: '0 24px 24px' },
      components: [
        { id: 'dash-chart1', type: 'chart-placeholder', category: 'Advanced', label: 'Revenue Chart', styles: {}, props: { chartType: 'area' } },
      ],
    },
    {
      id: 'dash-table', type: 'body', label: 'Data',
      styles: { padding: '0 24px 24px' },
      components: [
        { id: 'dash-tb-h', type: 'heading', category: 'Text', label: 'Title', content: 'Recent Activity', styles: { fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0' } },
        { id: 'dash-dt', type: 'data-table', category: 'Advanced', label: 'Table', styles: {}, props: { columns: 4, rows: 5 } },
        { id: 'dash-pag', type: 'pagination', category: 'Widgets', label: 'Pagination', styles: { marginTop: '16px' }, props: { totalPages: 5, currentPage: 1 } },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════
// 9. RESTAURANT / FOOD
// ═══════════════════════════════════════════════════════════

const restaurantSchema: PageSchema = {
  id: 'page-restaurant', name: 'Restaurant',
  sections: [
    {
      id: 'rest-nav', type: 'header', label: 'Navigation',
      styles: { padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1c1917', color: '#fef3c7' },
      components: [
        { id: 'rest-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✦ La Maison', styles: { fontSize: '26px', fontWeight: '300', letterSpacing: '3px' } as any },
        { id: 'rest-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Menu   Reservations   Gallery   Contact', styles: { fontSize: '13px', letterSpacing: '2px', opacity: '0.7' } as any },
      ],
    },
    {
      id: 'rest-hero', type: 'body', label: 'Hero',
      styles: { padding: '140px 40px', textAlign: 'center', backgroundColor: '#1c1917', color: '#fef3c7' },
      components: [
        { id: 'rest-h1', type: 'heading', category: 'Text', label: 'Title', content: 'A Culinary\nJourney', styles: { fontSize: '72px', fontWeight: '200', lineHeight: '1.05', letterSpacing: '-0.02em' } },
        { id: 'rest-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Farm-to-table dining experience in the heart of the city', styles: { fontSize: '18px', color: '#a8a29e', margin: '20px 0 40px 0' } },
        { id: 'rest-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'Reserve a Table', styles: { padding: '16px 48px', fontSize: '14px', fontWeight: '500', borderRadius: '0', backgroundColor: '#fef3c7', color: '#1c1917', border: 'none', letterSpacing: '2px', textTransform: 'uppercase' } as any },
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
      styles: { padding: '80px 40px', backgroundColor: '#fef3c7', color: '#1c1917' },
      components: [
        { id: 'rest-m-h', type: 'heading', category: 'Text', label: 'Title', content: 'The Menu', styles: { fontSize: '40px', fontWeight: '300', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '2px' } as any },
        { id: 'rest-m-div', type: 'divider-text', category: 'Basic', label: 'Divider', content: 'STARTERS', styles: {} },
        { id: 'rest-m1', type: 'paragraph', category: 'Text', label: 'Item', content: 'Truffle Burrata — Heirloom tomatoes, basil oil, aged balsamic..... $24', styles: { fontSize: '16px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
        { id: 'rest-m2', type: 'paragraph', category: 'Text', label: 'Item', content: 'Foie Gras Torchon — Fig compote, brioche, Sauternes gel..... $32', styles: { fontSize: '16px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
        { id: 'rest-m-div2', type: 'divider-text', category: 'Basic', label: 'Divider', content: 'MAINS', styles: { marginTop: '32px' } },
        { id: 'rest-m3', type: 'paragraph', category: 'Text', label: 'Item', content: 'Wagyu Ribeye — Bone marrow butter, black garlic, potato mousseline..... $68', styles: { fontSize: '16px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
        { id: 'rest-m4', type: 'paragraph', category: 'Text', label: 'Item', content: 'Pan-Seared Dover Sole — Brown butter, capers, lemon..... $54', styles: { fontSize: '16px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
      ],
    },
    {
      id: 'rest-reviews', type: 'body', label: 'Reviews',
      styles: { padding: '80px 40px', backgroundColor: '#292524', color: '#fef3c7' },
      components: [
        { id: 'rest-test', type: 'testimonial-carousel', category: 'Layout', label: 'Reviews', styles: {} },
      ],
    },
    {
      id: 'rest-contact', type: 'body', label: 'Contact',
      styles: { padding: '80px 40px', backgroundColor: '#1c1917', color: '#fef3c7', textAlign: 'center' },
      components: [
        { id: 'rest-c-h', type: 'heading', category: 'Text', label: 'Title', content: 'Visit Us', styles: { fontSize: '36px', fontWeight: '300', margin: '0 0 16px 0', letterSpacing: '2px' } as any },
        { id: 'rest-addr', type: 'paragraph', category: 'Text', label: 'Address', content: '42 Rue de la Paix, Paris\nTue–Sun, 6:00 PM – 11:00 PM', styles: { fontSize: '16px', color: '#a8a29e', lineHeight: '1.8' } },
        { id: 'rest-map', type: 'map', category: 'Widgets', label: 'Map', styles: { marginTop: '32px' }, props: { address: 'Paris, France' } },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#1c1917' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 10. PHOTOGRAPHY
// ═══════════════════════════════════════════════════════════

const photographySchema: PageSchema = {
  id: 'page-photography', name: 'Photography',
  sections: [
    {
      id: 'photo-nav', type: 'header', label: 'Navigation',
      styles: { padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'LENS', styles: { fontSize: '18px', fontWeight: '400', letterSpacing: '8px' } as any },
        { id: 'photo-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Portfolio   About   Pricing   Contact', styles: { fontSize: '12px', letterSpacing: '2px', opacity: '0.5' } as any },
      ],
    },
    {
      id: 'photo-hero', type: 'body', label: 'Hero',
      styles: { padding: '160px 40px 120px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'photo-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Capturing\nLife\'s Poetry', styles: { fontSize: '80px', fontWeight: '200', lineHeight: '1.05', letterSpacing: '-0.03em' } },
        { id: 'photo-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Wedding • Portrait • Editorial • Commercial', styles: { fontSize: '14px', color: '#525252', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '32px' } as any },
      ],
    },
    {
      id: 'photo-gallery', type: 'body', label: 'Gallery',
      styles: { padding: '40px', backgroundColor: '#0a0a0a' },
      components: [
        { id: 'photo-gal', type: 'gallery', category: 'Media', label: 'Gallery', styles: { display: 'grid', gap: '8px' }, props: { columns: 3 } },
      ],
    },
    {
      id: 'photo-about', type: 'body', label: 'About',
      styles: { padding: '80px 40px', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-bio', type: 'author-bio', category: 'Blog', label: 'Bio', styles: {}, props: { name: 'Alex Rivera', bio: 'Award-winning photographer based in Los Angeles. Specializing in editorial, wedding, and fine art photography for over 15 years.' } },
      ],
    },
    {
      id: 'photo-pricing', type: 'body', label: 'Pricing',
      styles: { padding: '80px 40px', backgroundColor: '#111111', color: '#ffffff' },
      components: [
        { id: 'photo-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Packages', styles: { fontSize: '14px', fontWeight: '400', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center', opacity: '0.4', margin: '0 0 48px 0' } as any },
        { id: 'photo-pr1', type: 'pricing-card', category: 'Layout', label: 'Essential', styles: {}, props: { name: 'Essential', price: '$2,500', period: '/session', featured: false } },
        { id: 'photo-pr2', type: 'pricing-card', category: 'Layout', label: 'Premium', styles: {}, props: { name: 'Premium', price: '$5,000', period: '/session', featured: true } },
      ],
    },
    {
      id: 'photo-contact', type: 'body', label: 'Contact',
      styles: { padding: '100px 40px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'photo-c-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Let\'s tell\nyour story.', styles: { fontSize: '48px', fontWeight: '200', lineHeight: '1.15', margin: '0 0 32px 0' } },
        { id: 'photo-c-btn', type: 'button', category: 'Basic', label: 'Email', content: 'hello@lens-studio.com', styles: { padding: '14px 40px', fontSize: '14px', borderRadius: '0', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '2px' } as any },
      ],
    },
    { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
  ],
};

// ═══════════════════════════════════════════════════════════
// 11. LANDING PAGE — Conversion Focused
// ═══════════════════════════════════════════════════════════

const landingSchema: PageSchema = {
  id: 'page-landing', name: 'Landing Page',
  sections: [
    {
      id: 'lp-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      components: [
        { id: 'lp-logo', type: 'heading', category: 'Text', label: 'Logo', content: '▲ Prism', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'lp-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Early Access', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
      ],
    },
    {
      id: 'lp-hero', type: 'body', label: 'Hero',
      styles: { padding: '120px 32px 80px', textAlign: 'center' },
      components: [
        { id: 'lp-chip', type: 'chip-group', category: 'Widgets', label: 'Tags', styles: { justifyContent: 'center' }, props: { items: '🆕 Just Launched,Product Hunt #1' } },
        { id: 'lp-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'The modern way to\nbuild web products', styles: { fontSize: '64px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em', margin: '24px 0 16px 0' } },
        { id: 'lp-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'From wireframe to production in one tool. Design, build, and ship — all without leaving your browser.', styles: { fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 36px' } as any },
        { id: 'lp-cta1', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free — No credit card', styles: { padding: '16px 40px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', marginRight: '12px' } },
      ],
    },
    {
      id: 'lp-logos', type: 'body', label: 'Social Proof',
      styles: { padding: '48px 32px' },
      components: [
        { id: 'lp-lc', type: 'logo-cloud', category: 'Layout', label: 'Logos', styles: {}, props: { title: 'Loved by 10,000+ developers' } },
      ],
    },
    {
      id: 'lp-features', type: 'body', label: 'Features',
      styles: { padding: '80px 32px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'lp-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why teams choose Prism', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'lp-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🎯', title: 'Pixel Perfect', description: 'Design with precision using our advanced layout engine.' } },
        { id: 'lp-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '⚡', title: 'Instant Deploy', description: 'One-click deploys to a global CDN with automatic SSL.' } },
        { id: 'lp-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤝', title: 'Team Collaboration', description: 'Real-time multiplayer editing with comments and reviews.' } },
      ],
    },
    {
      id: 'lp-steps', type: 'body', label: 'How It Works',
      styles: { padding: '80px 32px' },
      components: [
        { id: 'lp-s-h', type: 'heading', category: 'Text', label: 'Title', content: 'Get started in 3 steps', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
        { id: 'lp-steps-c', type: 'numbered-steps', category: 'Layout', label: 'Steps', styles: {} },
      ],
    },
    {
      id: 'lp-testimonials', type: 'body', label: 'Testimonials',
      styles: { padding: '80px 32px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'lp-test', type: 'testimonial-carousel', category: 'Layout', label: 'Testimonials', styles: {} },
      ],
    },
    {
      id: 'lp-cta-bottom', type: 'body', label: 'CTA',
      styles: { padding: '80px 32px' },
      components: [
        { id: 'lp-cta-b', type: 'cta-banner', category: 'Layout', label: 'CTA', styles: {}, props: { buttonText: 'Start Building — It\'s Free' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// 12. SOCIAL / COMMUNITY
// ═══════════════════════════════════════════════════════════

const communitySchema: PageSchema = {
  id: 'page-community', name: 'Community',
  sections: [
    {
      id: 'com-nav', type: 'header', label: 'Navigation',
      styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7c3aed', color: '#ffffff' },
      components: [
        { id: 'com-logo', type: 'heading', category: 'Text', label: 'Logo', content: '🟣 Commune', styles: { fontSize: '22px', fontWeight: '800' } },
        { id: 'com-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Feed   Events   Members   About', styles: { fontSize: '14px', opacity: '0.8' } },
      ],
    },
    {
      id: 'com-hero', type: 'body', label: 'Hero',
      styles: { padding: '80px 32px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'com-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Connect with\ncreators worldwide', styles: { fontSize: '52px', fontWeight: '800', lineHeight: '1.1', margin: '0 0 16px 0' } },
        { id: 'com-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Join a vibrant community of designers, developers, and makers.', styles: { fontSize: '18px', opacity: '0.8', margin: '0 0 32px 0' } },
        { id: 'com-stats', type: 'stats', category: 'Layout', label: 'Stats', styles: { padding: '0' }, props: { columns: 3 } },
      ],
    },
    {
      id: 'com-feed', type: 'body', label: 'Feed',
      styles: { padding: '48px 32px', maxWidth: '640px', margin: '0 auto' },
      components: [
        { id: 'com-sf1', type: 'social-feed-card', category: 'Social', label: 'Post', styles: {}, props: { platform: 'Commune', content: 'Just shipped our new design system! 🎨 Check out the full documentation and start building.' } },
        { id: 'com-sf2', type: 'social-feed-card', category: 'Social', label: 'Post', styles: { marginTop: '16px' }, props: { platform: 'Commune', content: 'Who\'s attending the virtual meetup this Friday? Topic: Advanced CSS Grid techniques 🔥' } },
        { id: 'com-chat', type: 'chat-bubble', category: 'Social', label: 'Chat', content: 'Welcome to Commune! Feel free to introduce yourself 👋', styles: { marginTop: '16px' } },
      ],
    },
    {
      id: 'com-members', type: 'body', label: 'Members',
      styles: { padding: '48px 32px', backgroundColor: '#f8fafc' },
      components: [
        { id: 'com-m-h', type: 'heading', category: 'Text', label: 'Title', content: 'Featured Members', styles: { fontSize: '28px', fontWeight: '700', textAlign: 'center', margin: '0 0 32px 0' } },
        { id: 'com-up1', type: 'user-profile-card', category: 'Social', label: 'Member', styles: {}, props: { name: 'Alex Morgan', role: 'Product Designer at Figma' } },
      ],
    },
    {
      id: 'com-cta', type: 'body', label: 'CTA',
      styles: { padding: '80px 32px', textAlign: 'center' },
      components: [
        { id: 'com-cta-b', type: 'cta-banner', category: 'Layout', label: 'CTA', styles: {}, props: { buttonText: 'Join the Community — Free' } },
      ],
    },
    lightFooter,
  ],
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

export const templates: Template[] = [
  { id: 'blank', name: 'Blank Canvas', description: 'Start from scratch with a minimal layout', category: 'starter', thumbnail: '🗒️', schema: blankSchema },
  { id: 'saas', name: 'SaaS Landing', description: 'Full-featured startup landing with pricing, FAQ, and testimonials', category: 'tech', thumbnail: '⚡', schema: saasSchema },
  { id: 'agency', name: 'Creative Agency', description: 'Bold agency site with portfolio, team, and services', category: 'creative', thumbnail: '✦', schema: agencySchema },
  { id: 'blog', name: 'Modern Blog', description: 'Content-first blog with newsletter, tags, and pagination', category: 'content', thumbnail: '✍️', schema: blogSchema },
  { id: 'enterprise', name: 'Enterprise', description: 'B2B site with KPIs, comparison tables, and social proof', category: 'business', thumbnail: '◆', schema: enterpriseSchema },
  { id: 'portfolio', name: 'Portfolio', description: 'Minimal designer portfolio with timeline and project showcase', category: 'creative', thumbnail: '◯', schema: portfolioSchema },
  { id: 'ecommerce', name: 'E-commerce', description: 'Fashion store with products, reviews, and announcements', category: 'commerce', thumbnail: '🛍️', schema: ecommerceSchema },
  { id: 'dashboard', name: 'Dashboard', description: 'Analytics dashboard with KPIs, charts, and data tables', category: 'tech', thumbnail: '📊', schema: dashboardSchema },
  { id: 'restaurant', name: 'Restaurant', description: 'Elegant dining site with menu, gallery, and reservations', category: 'food', thumbnail: '✦', schema: restaurantSchema },
  { id: 'photography', name: 'Photography', description: 'Minimal photography portfolio with pricing and gallery', category: 'creative', thumbnail: '📷', schema: photographySchema },
  { id: 'landing', name: 'Landing Page', description: 'Conversion-focused page with features, steps, and CTA', category: 'marketing', thumbnail: '▲', schema: landingSchema },
  { id: 'community', name: 'Community', description: 'Social community with feed, members, and chat', category: 'social', thumbnail: '🟣', schema: communitySchema },
];
