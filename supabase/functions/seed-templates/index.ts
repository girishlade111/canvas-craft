import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Shared footer partials
const darkFooter = {
  id: 'footer-shared', type: 'footer', label: 'Footer',
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

const templates = [
  {
    name: 'Blank Canvas',
    description: 'Clean starter with header, hero section, and footer — ready for customization',
    category: 'starter',
    thumbnail: '🗒️',
    tags: ['starter', 'blank', 'minimal'],
    schema: {
      id: 'page-blank', name: 'Home',
      sections: [
        { id: 'header-1', type: 'header', label: 'Header', styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }, components: [
          { id: 'logo-1', type: 'heading', category: 'Text', label: 'Logo', content: '● YourBrand', styles: { fontSize: '20px', fontWeight: '700' } },
          { id: 'nav-1', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Home   About   Contact', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
        ]},
        { id: 'body-1', type: 'body', label: 'Body', styles: { padding: '120px 32px', minHeight: '500px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }, components: [
          { id: 'body-heading', type: 'heading', category: 'Text', label: 'Main Heading', content: 'Welcome to Your Website', styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', letterSpacing: '-0.02em', lineHeight: '1.1' } },
          { id: 'body-text', type: 'paragraph', category: 'Text', label: 'Body Text', content: 'Start building by dragging components from the sidebar. This blank canvas is your creative playground.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7' } },
          { id: 'body-btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started →', styles: { padding: '14px 36px', fontSize: '15px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
        ]},
        lightFooter,
      ],
    },
  },
  {
    name: 'SaaS Landing',
    description: 'Full-featured startup landing with hero, features, pricing, FAQ, testimonials, and conversion CTAs',
    category: 'tech',
    thumbnail: '⚡',
    tags: ['saas', 'startup', 'landing', 'tech'],
    schema: {
      id: 'page-saas', name: 'SaaS Landing',
      sections: [
        { id: 'saas-nav', type: 'header', label: 'Navigation', styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#020617', color: '#ffffff' }, components: [
          { id: 'saas-logo', type: 'heading', category: 'Text', label: 'Logo', content: '⚡ Velocity', styles: { fontSize: '22px', fontWeight: '800' } },
          { id: 'saas-nav-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Features   Pricing   Integrations   Docs   Blog', styles: { fontSize: '14px', opacity: '0.7', fontWeight: '500' } },
          { id: 'saas-nav-cta', type: 'button', category: 'Basic', label: 'Nav CTA', content: 'Start Free Trial', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none' } },
        ]},
        { id: 'saas-hero', type: 'body', label: 'Hero', styles: { padding: '120px 40px 100px', textAlign: 'center', background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #020617 60%)', color: '#ffffff' }, components: [
          { id: 'saas-badge', type: 'badge', category: 'Text', label: 'Badge', content: '✨ Trusted by 50,000+ teams worldwide', styles: {} },
          { id: 'saas-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'Ship products 10x faster\nwith modern infrastructure', styles: { fontSize: '68px', fontWeight: '800', lineHeight: '1.08', margin: '24px 0', letterSpacing: '-0.03em' } },
          { id: 'saas-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'The complete developer platform for building, deploying, and scaling web applications.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 40px', lineHeight: '1.6' } },
          { id: 'saas-cta', type: 'button', category: 'Basic', label: 'Primary CTA', content: 'Start Free Trial →', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none', marginRight: '12px' } },
          { id: 'saas-cta2', type: 'button', category: 'Basic', label: 'Secondary CTA', content: 'Watch Demo', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #334155' } },
        ]},
        { id: 'saas-features', type: 'body', label: 'Features', styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff' }, components: [
          { id: 'saas-feat-h', type: 'heading', category: 'Text', label: 'Title', content: 'Everything you need to build,\ndeploy, and scale', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 56px 0', letterSpacing: '-0.02em' } },
          { id: 'saas-f1', type: 'feature-card', category: 'Layout', label: 'Feature 1', styles: {}, props: { icon: '⚡', title: 'Lightning Fast Builds', description: 'Optimized CI/CD pipeline with incremental builds and sub-second cold starts.' } },
          { id: 'saas-f2', type: 'feature-card', category: 'Layout', label: 'Feature 2', styles: {}, props: { icon: '🛡️', title: 'Enterprise-Grade Security', description: 'SOC2 Type II certified with end-to-end encryption, SSO/SAML, and role-based access control.' } },
          { id: 'saas-f3', type: 'feature-card', category: 'Layout', label: 'Feature 3', styles: {}, props: { icon: '📊', title: 'Real-time Observability', description: 'Full-stack monitoring with distributed tracing, custom dashboards, and instant alerting.' } },
        ]},
        { id: 'saas-pricing', type: 'body', label: 'Pricing', styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff' }, components: [
          { id: 'saas-price-h', type: 'heading', category: 'Text', label: 'Title', content: 'Simple, transparent pricing', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 56px 0', letterSpacing: '-0.02em' } },
          { id: 'saas-price-1', type: 'pricing-card', category: 'Layout', label: 'Hobby', styles: {}, props: { name: 'Hobby', price: '$0', period: '/month', featured: false } },
          { id: 'saas-price-2', type: 'pricing-card', category: 'Layout', label: 'Pro', styles: {}, props: { name: 'Pro', price: '$29', period: '/month', featured: true } },
          { id: 'saas-price-3', type: 'pricing-card', category: 'Layout', label: 'Enterprise', styles: {}, props: { name: 'Enterprise', price: 'Custom', period: '', featured: false } },
        ]},
        { id: 'saas-faq', type: 'body', label: 'FAQ', styles: { padding: '100px 40px', backgroundColor: '#020617', color: '#ffffff' }, components: [
          { id: 'saas-faq-h', type: 'heading', category: 'Text', label: 'Title', content: 'Frequently asked questions', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'saas-faq-c', type: 'faq', category: 'Layout', label: 'FAQ', styles: {} },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#020617' } },
      ],
    },
  },
  {
    name: 'Creative Agency',
    description: 'Bold agency site with immersive hero, portfolio showcase, services, team, and client testimonials',
    category: 'creative',
    thumbnail: '✦',
    tags: ['agency', 'creative', 'portfolio', 'bold'],
    schema: {
      id: 'page-agency', name: 'Agency',
      sections: [
        { id: 'ag-nav', type: 'header', label: 'Navigation', styles: { padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', position: 'relative', zIndex: '10' }, components: [
          { id: 'ag-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'STUDIO∞', styles: { fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', color: '#ffffff' } },
          { id: 'ag-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   Services   About   Careers   Contact', styles: { fontSize: '14px', fontWeight: '500', color: '#ffffff', opacity: '0.7' } },
        ]},
        { id: 'ag-hero', type: 'body', label: 'Hero', styles: { padding: '100px 48px 120px', background: 'linear-gradient(160deg, #0f0f23 0%, #1a1a3e 35%, #2d1b4e 60%, #1a0a2e 80%, #0f0f23 100%)', color: '#ffffff' }, components: [
          { id: 'ag-h1', type: 'heading', category: 'Text', label: 'Hero Title', content: 'We craft digital\nexperiences that\nmove people.', styles: { fontSize: '76px', fontWeight: '800', lineHeight: '1.02', letterSpacing: '-0.04em', margin: '0 0 32px 0' } },
          { id: 'ag-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Award-winning agency specializing in brand strategy, product design, and full-stack development.', styles: { fontSize: '19px', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', lineHeight: '1.7' } },
          { id: 'ag-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'View Our Work →', styles: { marginTop: '44px', padding: '18px 48px', fontSize: '15px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#0f0f23', border: 'none' } },
        ]},
        { id: 'ag-services', type: 'body', label: 'Services', styles: { padding: '100px 48px', backgroundColor: '#ffffff' }, components: [
          { id: 'ag-srv-h', type: 'heading', category: 'Text', label: 'Title', content: 'What We Do', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '-0.02em' } },
          { id: 'ag-s1', type: 'feature-card', category: 'Layout', label: 'Service 1', styles: {}, props: { icon: '🎨', title: 'Brand & Identity', description: 'Logo design, visual identity systems, brand guidelines, and positioning strategy.' } },
          { id: 'ag-s2', type: 'feature-card', category: 'Layout', label: 'Service 2', styles: {}, props: { icon: '✏️', title: 'Product Design', description: 'User research, wireframing, UI/UX design, prototyping, and usability testing.' } },
          { id: 'ag-s3', type: 'feature-card', category: 'Layout', label: 'Service 3', styles: {}, props: { icon: '💻', title: 'Development', description: 'Full-stack web and mobile development with React, Next.js, and modern frameworks.' } },
        ]},
        { id: 'ag-team', type: 'body', label: 'Team', styles: { padding: '100px 48px' }, components: [
          { id: 'ag-team-h', type: 'heading', category: 'Text', label: 'Title', content: 'Meet the Creative Minds', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0' } },
          { id: 'ag-team-g', type: 'team-grid', category: 'Layout', label: 'Team', styles: {} },
        ]},
        { id: 'ag-cta-section', type: 'body', label: 'CTA', styles: { padding: '120px 48px', textAlign: 'center', background: 'linear-gradient(160deg, #0f0f23 0%, #2d1b4e 50%, #0f0f23 100%)', color: '#ffffff' }, components: [
          { id: 'ag-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: "Let's create something\nextraordinary together.", styles: { fontSize: '52px', fontWeight: '800', lineHeight: '1.08', margin: '0 0 20px 0' } },
          { id: 'ag-cta-btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Start a Project →', styles: { padding: '18px 56px', fontSize: '16px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#0f0f23', border: 'none' } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0f0f23' } },
      ],
    },
  },
  {
    name: 'Modern Blog',
    description: 'Content-first publishing platform with featured posts, categories, newsletter, and search',
    category: 'content',
    thumbnail: '✍️',
    tags: ['blog', 'content', 'publishing', 'articles'],
    schema: {
      id: 'page-blog', name: 'Blog',
      sections: [
        { id: 'blog-nav', type: 'header', label: 'Navigation', styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff' }, components: [
          { id: 'blog-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✍️ The Journal', styles: { fontSize: '22px', fontWeight: '800' } },
          { id: 'blog-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Articles   Categories   Newsletter   About', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
        ]},
        { id: 'blog-hero', type: 'body', label: 'Hero', styles: { padding: '100px 40px 80px', textAlign: 'center', background: 'linear-gradient(135deg, #faf5ff 0%, #f0f9ff 40%, #fefce8 100%)' }, components: [
          { id: 'blog-h', type: 'heading', category: 'Text', label: 'Title', content: 'Ideas That Shape\nthe Future', styles: { fontSize: '60px', fontWeight: '800', lineHeight: '1.08', margin: '0 0 20px 0', letterSpacing: '-0.03em' } },
          { id: 'blog-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Exploring design, technology, and the craft of building exceptional digital products.', styles: { fontSize: '18px', color: '#6b7280', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7' } },
          { id: 'blog-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'Subscribe Free' } },
        ]},
        { id: 'blog-grid', type: 'body', label: 'Posts', styles: { padding: '48px 40px' }, components: [
          { id: 'bp-1', type: 'blog-post-card', category: 'Blog', label: 'Post 1', styles: {}, props: { title: 'The Art of Minimal Design', excerpt: 'How less really is more in modern web interfaces.', date: 'Mar 5, 2026', author: 'Sarah Chen' } },
          { id: 'bp-2', type: 'blog-post-card', category: 'Blog', label: 'Post 2', styles: { marginTop: '24px' }, props: { title: 'Building Scalable Design Systems', excerpt: 'A comprehensive guide to creating reusable component libraries.', date: 'Mar 2, 2026', author: 'Alex Kim' } },
          { id: 'bp-3', type: 'blog-post-card', category: 'Blog', label: 'Post 3', styles: { marginTop: '24px' }, props: { title: 'React Server Components Deep Dive', excerpt: 'Advanced optimization techniques for production applications.', date: 'Feb 28, 2026', author: 'James Liu' } },
        ]},
        { id: 'blog-newsletter-bottom', type: 'body', label: 'Newsletter CTA', styles: { padding: '80px 40px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'blog-nl-h', type: 'heading', category: 'Text', label: 'Title', content: 'Never miss an article', styles: { fontSize: '36px', fontWeight: '800', margin: '0 0 12px 0' } },
          { id: 'blog-nl-b', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'Subscribe' } },
        ]},
        lightFooter,
      ],
    },
  },
  {
    name: 'Enterprise',
    description: 'Professional B2B site with KPIs, feature comparison, pricing tiers, and enterprise-grade social proof',
    category: 'business',
    thumbnail: '◆',
    tags: ['enterprise', 'b2b', 'business', 'corporate'],
    schema: {
      id: 'page-enterprise', name: 'Enterprise',
      sections: [
        { id: 'ent-nav', type: 'header', label: 'Navigation', styles: { padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }, components: [
          { id: 'ent-logo', type: 'heading', category: 'Text', label: 'Logo', content: '◆ Meridian', styles: { fontSize: '22px', fontWeight: '800' } },
          { id: 'ent-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Solutions   Platform   Resources   Customers   Company', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
          { id: 'ent-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Request a Demo', styles: { padding: '10px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
        ]},
        { id: 'ent-hero', type: 'body', label: 'Hero', styles: { padding: '120px 48px 100px', background: 'linear-gradient(170deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'ent-trust', type: 'badge', category: 'Text', label: 'Trust Badge', content: '🏆 G2 Leader — Enterprise Infrastructure 2026', styles: {} },
          { id: 'ent-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Enterprise Infrastructure\nfor the AI Era', styles: { fontSize: '64px', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.03em', margin: '24px 0 20px 0' } },
          { id: 'ent-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Secure, scalable, and intelligent cloud platform trusted by Fortune 500 companies.', styles: { fontSize: '20px', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 40px', lineHeight: '1.6' } },
          { id: 'ent-cta1', type: 'button', category: 'Basic', label: 'Primary CTA', content: 'Schedule a Demo', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none' } },
        ]},
        { id: 'ent-kpi', type: 'body', label: 'KPIs', styles: { padding: '80px 48px', backgroundColor: '#f8fafc' }, components: [
          { id: 'ent-kpi-h', type: 'heading', category: 'Text', label: 'Title', content: 'Platform at a glance', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'ent-kpi-c', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
        ]},
        { id: 'ent-features', type: 'body', label: 'Features', styles: { padding: '100px 48px' }, components: [
          { id: 'ent-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Built for scale,\ndesigned for security', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 56px 0', letterSpacing: '-0.02em' } },
          { id: 'ent-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🛡️', title: 'SOC2 & HIPAA Compliant', description: 'Enterprise-grade security with continuous monitoring.' } },
          { id: 'ent-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🌐', title: 'Global Edge Network', description: '300+ edge locations across 6 continents for sub-30ms latency.' } },
          { id: 'ent-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤖', title: 'AI-Powered Insights', description: 'ML models that optimize infrastructure and predict capacity needs.' } },
        ]},
        { id: 'ent-pricing', type: 'body', label: 'Pricing', styles: { padding: '100px 48px', backgroundColor: '#f8fafc' }, components: [
          { id: 'ent-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Enterprise pricing', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'ent-pr1', type: 'pricing-card', category: 'Layout', label: 'Team', styles: {}, props: { name: 'Team', price: '$499', period: '/month', featured: false } },
          { id: 'ent-pr2', type: 'pricing-card', category: 'Layout', label: 'Business', styles: {}, props: { name: 'Business', price: '$1,999', period: '/month', featured: true } },
          { id: 'ent-pr3', type: 'pricing-card', category: 'Layout', label: 'Enterprise', styles: {}, props: { name: 'Enterprise', price: 'Custom', period: '', featured: false } },
        ]},
        darkFooter,
      ],
    },
  },
  {
    name: 'Portfolio',
    description: 'Refined designer portfolio with project showcase, about section, experience timeline, and testimonials',
    category: 'creative',
    thumbnail: '◯',
    tags: ['portfolio', 'designer', 'minimal', 'personal'],
    schema: {
      id: 'page-portfolio', name: 'Portfolio',
      sections: [
        { id: 'port-nav', type: 'header', label: 'Navigation', styles: { padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'port-name', type: 'heading', category: 'Text', label: 'Name', content: 'JANE DOE', styles: { fontSize: '14px', fontWeight: '600', letterSpacing: '4px' } },
          { id: 'port-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Work   About   Process   Contact', styles: { fontSize: '13px', opacity: '0.5', letterSpacing: '1px' } },
        ]},
        { id: 'port-hero', type: 'body', label: 'Hero', styles: { padding: '140px 48px 100px', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'port-h1', type: 'heading', category: 'Text', label: 'Title', content: "I design digital\nexperiences that\nfeel effortless.", styles: { fontSize: '72px', fontWeight: '200', lineHeight: '1.05', letterSpacing: '-0.03em' } },
          { id: 'port-sub', type: 'paragraph', category: 'Text', label: 'Bio', content: 'Senior Product Designer with 10+ years crafting interfaces for startups, agencies, and Fortune 500 companies.', styles: { fontSize: '17px', color: '#737373', maxWidth: '520px', marginTop: '36px', lineHeight: '1.8' } },
          { id: 'port-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'View Selected Work ↓', styles: { marginTop: '48px', padding: '16px 44px', fontSize: '14px', fontWeight: '500', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333' } },
        ]},
        { id: 'port-work', type: 'body', label: 'Selected Work', styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'port-w1', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: {}, props: { title: 'Cosmos — Brand Overhaul', subtitle: '2026 — Brand Identity • Design System • Web Platform' } },
          { id: 'port-w2', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Flux — Mobile Banking App', subtitle: '2025 — Product Design • UX Research • iOS & Android' } },
          { id: 'port-w3', type: 'image-overlay-card', category: 'Media', label: 'Project', styles: { marginTop: '20px' }, props: { title: 'Zenith — Analytics Dashboard', subtitle: '2025 — Data Visualization • Design System • Accessibility' } },
        ]},
        { id: 'port-timeline', type: 'body', label: 'Experience', styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'port-tl', type: 'timeline', category: 'Layout', label: 'Timeline', styles: {} },
        ]},
        { id: 'port-contact', type: 'body', label: 'Contact', styles: { padding: '120px 48px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'port-c-h', type: 'heading', category: 'Text', label: 'CTA', content: "Let's work\ntogether.", styles: { fontSize: '60px', fontWeight: '200', lineHeight: '1.1', margin: '0 0 20px 0' } },
          { id: 'port-email', type: 'button', category: 'Basic', label: 'Email', content: 'hello@janedoe.com', styles: { padding: '16px 48px', fontSize: '15px', fontWeight: '500', borderRadius: '100px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333' } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
      ],
    },
  },
  {
    name: 'E-commerce',
    description: 'Premium fashion store with categories, product grid, customer reviews, and newsletter signup',
    category: 'commerce',
    thumbnail: '🛍️',
    tags: ['ecommerce', 'store', 'fashion', 'shop'],
    schema: {
      id: 'page-ecommerce', name: 'Store',
      sections: [
        { id: 'ec-announce', type: 'body', label: 'Announcement', styles: { padding: '0' }, components: [
          { id: 'ec-ann', type: 'announcement-bar', category: 'Widgets', label: 'Promo', content: '🚚 Free worldwide shipping on orders over $100', styles: {} },
        ]},
        { id: 'ec-nav', type: 'header', label: 'Navigation', styles: { padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff' }, components: [
          { id: 'ec-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'MAISON', styles: { fontSize: '26px', fontWeight: '300', letterSpacing: '8px' } },
          { id: 'ec-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'New Arrivals   Women   Men   Accessories   Sale', styles: { fontSize: '12px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase' } },
        ]},
        { id: 'ec-hero', type: 'body', label: 'Hero', styles: { padding: '120px 48px', background: 'linear-gradient(135deg, #fdf4ff 0%, #faf5ff 30%, #f5f3ff 60%, #eff6ff 100%)', textAlign: 'center' }, components: [
          { id: 'ec-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Spring / Summer\n2026', styles: { fontSize: '72px', fontWeight: '200', lineHeight: '1.08', letterSpacing: '-0.02em', margin: '20px 0 24px 0' } },
          { id: 'ec-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Timeless pieces crafted with premium materials and ethical manufacturing.', styles: { fontSize: '18px', color: '#6b7280', margin: '0 auto 40px', maxWidth: '520px', lineHeight: '1.7' } },
          { id: 'ec-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'SHOP THE COLLECTION', styles: { padding: '18px 56px', fontSize: '13px', fontWeight: '600', borderRadius: '0', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', letterSpacing: '3px' } },
        ]},
        { id: 'ec-products', type: 'body', label: 'Products', styles: { padding: '80px 40px' }, components: [
          { id: 'ec-prod-h', type: 'heading', category: 'Text', label: 'Title', content: 'Bestsellers', styles: { fontSize: '32px', fontWeight: '400', textAlign: 'center', margin: '0 0 48px 0', letterSpacing: '1px' } },
          { id: 'ec-pg', type: 'product-grid', category: 'Ecommerce', label: 'Products', styles: {} },
        ]},
        { id: 'ec-reviews', type: 'body', label: 'Reviews', styles: { padding: '80px 40px' }, components: [
          { id: 'ec-rev-h', type: 'heading', category: 'Text', label: 'Title', content: 'What Our Customers Say', styles: { fontSize: '32px', fontWeight: '400', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'ec-r1', type: 'review-card', category: 'Ecommerce', label: 'Review 1', styles: {}, props: { author: 'Emma Laurent', rating: 5, content: 'Absolutely stunning quality. The fabric is incredibly soft and the cut is perfect.' } },
          { id: 'ec-r2', type: 'review-card', category: 'Ecommerce', label: 'Review 2', styles: { marginTop: '16px' }, props: { author: 'David Kim', rating: 5, content: 'The attention to detail is remarkable. Everything feels premium.' } },
        ]},
        { id: 'ec-newsletter', type: 'body', label: 'Newsletter', styles: { padding: '100px 40px', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'ec-nl-h', type: 'heading', category: 'Text', label: 'Title', content: 'Join the MAISON Family', styles: { fontSize: '36px', fontWeight: '300', margin: '0 0 32px 0', letterSpacing: '2px' } },
          { id: 'ec-nl', type: 'newsletter', category: 'Forms', label: 'Newsletter', styles: {}, props: { title: '', buttonText: 'JOIN NOW' } },
        ]},
        lightFooter,
      ],
    },
  },
  {
    name: 'Dashboard',
    description: 'Data-rich admin panel with KPIs, charts, data tables, search, and pagination',
    category: 'tech',
    thumbnail: '📊',
    tags: ['dashboard', 'admin', 'analytics', 'data'],
    schema: {
      id: 'page-dashboard', name: 'Dashboard',
      sections: [
        { id: 'dash-nav', type: 'header', label: 'Top Bar', styles: { padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }, components: [
          { id: 'dash-logo', type: 'heading', category: 'Text', label: 'Logo', content: '📊 Analytics Hub', styles: { fontSize: '18px', fontWeight: '700' } },
          { id: 'dash-search', type: 'search-bar', category: 'Widgets', label: 'Search', styles: {}, props: { placeholder: 'Search reports...' } },
        ]},
        { id: 'dash-welcome', type: 'body', label: 'Welcome', styles: { padding: '28px 28px 0' }, components: [
          { id: 'dash-wh', type: 'heading', category: 'Text', label: 'Welcome', content: 'Good morning, Admin 👋', styles: { fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' } },
          { id: 'dash-wp', type: 'paragraph', category: 'Text', label: 'Subtitle', content: "Here's what's happening with your projects today.", styles: { fontSize: '14px', color: '#6b7280' } },
        ]},
        { id: 'dash-kpis', type: 'body', label: 'KPIs', styles: { padding: '24px 28px' }, components: [
          { id: 'dash-kpi', type: 'kpi-dashboard', category: 'Layout', label: 'KPIs', styles: {} },
        ]},
        { id: 'dash-charts', type: 'body', label: 'Charts', styles: { padding: '0 28px 24px' }, components: [
          { id: 'dash-ch-h', type: 'heading', category: 'Text', label: 'Chart Title', content: 'Revenue Overview', styles: { fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' } },
          { id: 'dash-chart1', type: 'chart-placeholder', category: 'Advanced', label: 'Revenue Chart', styles: {}, props: { chartType: 'area' } },
        ]},
        { id: 'dash-table', type: 'body', label: 'Data', styles: { padding: '0 28px 28px' }, components: [
          { id: 'dash-tb-h', type: 'heading', category: 'Text', label: 'Title', content: 'Recent Activity', styles: { fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' } },
          { id: 'dash-dt', type: 'data-table', category: 'Advanced', label: 'Table', styles: {}, props: { columns: 5, rows: 8 } },
        ]},
      ],
    },
  },
  {
    name: 'Fine Dining',
    description: 'Elegant restaurant site with tasting menu, philosophy section, gallery, reviews, and reservations',
    category: 'food',
    thumbnail: '✦',
    tags: ['restaurant', 'food', 'dining', 'elegant'],
    schema: {
      id: 'page-restaurant', name: 'Restaurant',
      sections: [
        { id: 'rest-nav', type: 'header', label: 'Navigation', styles: { padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1c1917', color: '#fef3c7' }, components: [
          { id: 'rest-logo', type: 'heading', category: 'Text', label: 'Logo', content: '✦ La Maison', styles: { fontSize: '28px', fontWeight: '300', letterSpacing: '4px' } },
          { id: 'rest-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Menu   Wine   Reservations   Private Events   Contact', styles: { fontSize: '12px', letterSpacing: '2px', opacity: '0.6', textTransform: 'uppercase' } },
        ]},
        { id: 'rest-hero', type: 'body', label: 'Hero', styles: { padding: '160px 48px 120px', textAlign: 'center', background: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)', color: '#fef3c7' }, components: [
          { id: 'rest-h1', type: 'heading', category: 'Text', label: 'Title', content: 'A Culinary\nJourney', styles: { fontSize: '80px', fontWeight: '200', lineHeight: '1.02', letterSpacing: '-0.02em' } },
          { id: 'rest-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Three Michelin stars — Farm-to-table dining in the heart of Paris since 1987', styles: { fontSize: '17px', color: '#a8a29e', margin: '24px 0 48px 0', letterSpacing: '1px' } },
          { id: 'rest-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'RESERVE A TABLE', styles: { padding: '18px 56px', fontSize: '13px', fontWeight: '500', borderRadius: '0', backgroundColor: '#fef3c7', color: '#1c1917', border: 'none', letterSpacing: '3px' } },
        ]},
        { id: 'rest-about', type: 'body', label: 'Philosophy', styles: { padding: '100px 48px', backgroundColor: '#292524', color: '#fef3c7', textAlign: 'center' }, components: [
          { id: 'rest-ab-h', type: 'heading', category: 'Text', label: 'Title', content: 'Where tradition meets\ninnovation', styles: { fontSize: '40px', fontWeight: '300', lineHeight: '1.3', margin: '0 0 24px 0' } },
          { id: 'rest-ab-p', type: 'paragraph', category: 'Text', label: 'Description', content: 'Chef Laurent Dupont sources the finest seasonal ingredients from local producers, creating dishes that honor French culinary tradition.', styles: { fontSize: '16px', color: '#a8a29e', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8' } },
        ]},
        { id: 'rest-menu', type: 'body', label: 'Menu', styles: { padding: '100px 48px', backgroundColor: '#fef3c7', color: '#1c1917' }, components: [
          { id: 'rest-m-h', type: 'heading', category: 'Text', label: 'Title', content: 'The Menu', styles: { fontSize: '44px', fontWeight: '300', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '3px' } },
          { id: 'rest-m1', type: 'paragraph', category: 'Text', label: 'Item', content: 'Truffle Burrata — Heirloom tomatoes, basil oil, aged balsamic..... $28', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
          { id: 'rest-m2', type: 'paragraph', category: 'Text', label: 'Item', content: 'Foie Gras Torchon — Fig compote, toasted brioche, Sauternes gel..... $36', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
          { id: 'rest-m3', type: 'paragraph', category: 'Text', label: 'Item', content: 'A5 Wagyu Ribeye — Bone marrow butter, black garlic, potato mousseline..... $78', styles: { fontSize: '15px', padding: '16px 0', borderBottom: '1px solid #d4c9a8' } },
        ]},
        { id: 'rest-contact', type: 'body', label: 'Contact', styles: { padding: '100px 48px', backgroundColor: '#1c1917', color: '#fef3c7', textAlign: 'center' }, components: [
          { id: 'rest-c-h', type: 'heading', category: 'Text', label: 'Title', content: 'La Maison', styles: { fontSize: '40px', fontWeight: '300', margin: '0 0 20px 0', letterSpacing: '3px' } },
          { id: 'rest-addr', type: 'paragraph', category: 'Text', label: 'Address', content: '42 Rue de la Paix, 75002 Paris, France\nTuesday – Sunday, 6:30 PM – 11:00 PM', styles: { fontSize: '15px', color: '#a8a29e', lineHeight: '2' } },
          { id: 'rest-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'MAKE A RESERVATION', styles: { marginTop: '36px', padding: '18px 56px', fontSize: '13px', fontWeight: '500', borderRadius: '0', backgroundColor: '#fef3c7', color: '#1c1917', border: 'none', letterSpacing: '3px' } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#1c1917' } },
      ],
    },
  },
  {
    name: 'Photography',
    description: 'Cinematic photography portfolio with gallery, pricing packages, testimonials, and booking CTA',
    category: 'creative',
    thumbnail: '📷',
    tags: ['photography', 'portfolio', 'gallery', 'cinematic'],
    schema: {
      id: 'page-photography', name: 'Photography',
      sections: [
        { id: 'photo-nav', type: 'header', label: 'Navigation', styles: { padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'photo-logo', type: 'heading', category: 'Text', label: 'Logo', content: 'LENS', styles: { fontSize: '18px', fontWeight: '400', letterSpacing: '10px' } },
          { id: 'photo-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Portfolio   Collections   About   Pricing   Contact', styles: { fontSize: '11px', letterSpacing: '3px', opacity: '0.45', textTransform: 'uppercase' } },
        ]},
        { id: 'photo-hero', type: 'body', label: 'Hero', styles: { padding: '180px 48px 140px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'photo-h1', type: 'heading', category: 'Text', label: 'Title', content: "Capturing\nLife's Poetry", styles: { fontSize: '84px', fontWeight: '200', lineHeight: '1.02', letterSpacing: '-0.03em' } },
          { id: 'photo-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Wedding • Portrait • Editorial • Fine Art • Commercial', styles: { fontSize: '13px', color: '#525252', letterSpacing: '5px', textTransform: 'uppercase', marginTop: '40px' } },
          { id: 'photo-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'VIEW PORTFOLIO', styles: { marginTop: '48px', padding: '16px 48px', fontSize: '12px', borderRadius: '0', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '4px' } },
        ]},
        { id: 'photo-gallery', type: 'body', label: 'Gallery', styles: { padding: '48px', backgroundColor: '#0a0a0a' }, components: [
          { id: 'photo-gal', type: 'gallery', category: 'Media', label: 'Gallery', styles: { display: 'grid', gap: '6px' }, props: { columns: 3 } },
        ]},
        { id: 'photo-pricing', type: 'body', label: 'Pricing', styles: { padding: '100px 48px', backgroundColor: '#0a0a0a', color: '#ffffff' }, components: [
          { id: 'photo-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Packages', styles: { fontSize: '36px', fontWeight: '200', textAlign: 'center', margin: '0 0 56px 0', letterSpacing: '4px' } },
          { id: 'photo-pr1', type: 'pricing-card', category: 'Layout', label: 'Essential', styles: {}, props: { name: 'Essential', price: '$2,500', period: '/session', featured: false } },
          { id: 'photo-pr2', type: 'pricing-card', category: 'Layout', label: 'Premium', styles: {}, props: { name: 'Premium', price: '$5,000', period: '/session', featured: true } },
          { id: 'photo-pr3', type: 'pricing-card', category: 'Layout', label: 'Bespoke', styles: {}, props: { name: 'Bespoke', price: 'Custom', period: '', featured: false } },
        ]},
        { id: 'photo-contact', type: 'body', label: 'Contact', styles: { padding: '120px 48px', backgroundColor: '#0a0a0a', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'photo-c-h', type: 'heading', category: 'Text', label: 'CTA', content: "Let's tell\nyour story.", styles: { fontSize: '52px', fontWeight: '200', lineHeight: '1.12', margin: '0 0 40px 0' } },
          { id: 'photo-c-btn', type: 'button', category: 'Basic', label: 'Email', content: 'INQUIRE NOW', styles: { padding: '16px 48px', fontSize: '12px', borderRadius: '0', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #333', letterSpacing: '4px' } },
        ]},
        { ...darkFooter, styles: { ...darkFooter.styles, backgroundColor: '#0a0a0a' } },
      ],
    },
  },
  {
    name: 'Landing Page',
    description: 'High-conversion landing with social proof, features, pricing, FAQ, and multiple CTAs',
    category: 'marketing',
    thumbnail: '▲',
    tags: ['landing', 'conversion', 'marketing', 'product'],
    schema: {
      id: 'page-landing', name: 'Landing Page',
      sections: [
        { id: 'lp-nav', type: 'header', label: 'Navigation', styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, components: [
          { id: 'lp-logo', type: 'heading', category: 'Text', label: 'Logo', content: '▲ Prism', styles: { fontSize: '22px', fontWeight: '800' } },
          { id: 'lp-nav-l', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Features   How It Works   Pricing   FAQ', styles: { fontSize: '14px', fontWeight: '500', opacity: '0.7' } },
          { id: 'lp-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Early Access', styles: { padding: '10px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
        ]},
        { id: 'lp-hero', type: 'body', label: 'Hero', styles: { padding: '120px 40px 100px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)' }, components: [
          { id: 'lp-h1', type: 'heading', category: 'Text', label: 'Headline', content: 'The modern way to\nbuild web products', styles: { fontSize: '68px', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.03em', margin: '28px 0 20px 0' } },
          { id: 'lp-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'From wireframe to production in one tool. Design, build, and ship — all without leaving your browser.', styles: { fontSize: '20px', color: '#6b7280', maxWidth: '620px', margin: '0 auto 40px', lineHeight: '1.6' } },
          { id: 'lp-cta1', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free — No Credit Card', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
        ]},
        { id: 'lp-features', type: 'body', label: 'Features', styles: { padding: '100px 40px', backgroundColor: '#f8fafc' }, components: [
          { id: 'lp-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why teams choose Prism', styles: { fontSize: '44px', fontWeight: '800', textAlign: 'center', margin: '16px 0 56px 0', letterSpacing: '-0.02em' } },
          { id: 'lp-f1', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🎯', title: 'Pixel Perfect Design', description: 'Advanced layout engine with snap-to-grid and responsive breakpoints.' } },
          { id: 'lp-f2', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '⚡', title: 'One-Click Deploy', description: 'Deploy to a global CDN with automatic SSL and custom domains.' } },
          { id: 'lp-f3', type: 'feature-card', category: 'Layout', label: 'Feature', styles: {}, props: { icon: '🤝', title: 'Real-time Collaboration', description: 'Multiplayer editing with live cursors, comments, and version history.' } },
        ]},
        { id: 'lp-pricing', type: 'body', label: 'Pricing', styles: { padding: '100px 40px' }, components: [
          { id: 'lp-pr-h', type: 'heading', category: 'Text', label: 'Title', content: 'Start free, upgrade anytime', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'lp-pr1', type: 'pricing-card', category: 'Layout', label: 'Free', styles: {}, props: { name: 'Free', price: '$0', period: '/month', featured: false } },
          { id: 'lp-pr2', type: 'pricing-card', category: 'Layout', label: 'Pro', styles: {}, props: { name: 'Pro', price: '$19', period: '/month', featured: true } },
          { id: 'lp-pr3', type: 'pricing-card', category: 'Layout', label: 'Team', styles: {}, props: { name: 'Team', price: '$49', period: '/month', featured: false } },
        ]},
        { id: 'lp-faq', type: 'body', label: 'FAQ', styles: { padding: '100px 40px', backgroundColor: '#f8fafc' }, components: [
          { id: 'lp-faq-h', type: 'heading', category: 'Text', label: 'Title', content: 'Frequently asked questions', styles: { fontSize: '36px', fontWeight: '800', textAlign: 'center', margin: '0 0 48px 0' } },
          { id: 'lp-faq-c', type: 'faq', category: 'Layout', label: 'FAQ', styles: {} },
        ]},
        { id: 'lp-cta-bottom', type: 'body', label: 'CTA', styles: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)' }, components: [
          { id: 'lp-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: "Start building today.\nIt's free.", styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 36px 0', lineHeight: '1.1' } },
          { id: 'lp-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: "Get Started — It's Free →", styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none' } },
        ]},
        lightFooter,
      ],
    },
  },
  {
    name: 'Community',
    description: 'Vibrant social platform with activity feed, member showcase, features, and community testimonials',
    category: 'social',
    thumbnail: '🟣',
    tags: ['community', 'social', 'platform', 'members'],
    schema: {
      id: 'page-community', name: 'Community',
      sections: [
        { id: 'com-nav', type: 'header', label: 'Navigation', styles: { padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7c3aed', color: '#ffffff' }, components: [
          { id: 'com-logo', type: 'heading', category: 'Text', label: 'Logo', content: '🟣 Commune', styles: { fontSize: '22px', fontWeight: '800' } },
          { id: 'com-links', type: 'paragraph', category: 'Text', label: 'Nav', content: 'Feed   Events   Members   Resources   About', styles: { fontSize: '14px', opacity: '0.8', fontWeight: '500' } },
          { id: 'com-cta-nav', type: 'button', category: 'Basic', label: 'CTA', content: 'Join Free', styles: { padding: '10px 24px', fontSize: '13px', fontWeight: '700', borderRadius: '100px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none' } },
        ]},
        { id: 'com-hero', type: 'body', label: 'Hero', styles: { padding: '100px 40px 80px', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 70%, #4c1d95 100%)', color: '#ffffff', textAlign: 'center' }, components: [
          { id: 'com-badge', type: 'badge', category: 'Text', label: 'Badge', content: '🎉 50,000+ Members & Growing', styles: {} },
          { id: 'com-h1', type: 'heading', category: 'Text', label: 'Title', content: 'Connect with\ncreators worldwide', styles: { fontSize: '56px', fontWeight: '800', lineHeight: '1.08', margin: '20px 0 16px 0', letterSpacing: '-0.02em' } },
          { id: 'com-sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Join a vibrant community of designers, developers, and makers building the future of the web.', styles: { fontSize: '18px', opacity: '0.8', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' } },
          { id: 'com-cta', type: 'button', category: 'Basic', label: 'CTA', content: 'Join the Community — Free', styles: { padding: '18px 44px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none' } },
        ]},
        { id: 'com-features', type: 'body', label: 'Why Join', styles: { padding: '100px 40px' }, components: [
          { id: 'com-f-h', type: 'heading', category: 'Text', label: 'Title', content: 'Why join Commune?', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', margin: '0 0 56px 0' } },
          { id: 'com-f1', type: 'feature-card', category: 'Layout', label: 'Feature 1', styles: {}, props: { icon: '💬', title: 'Discussion Forums', description: 'Engage in thoughtful conversations across 50+ topic channels.' } },
          { id: 'com-f2', type: 'feature-card', category: 'Layout', label: 'Feature 2', styles: {}, props: { icon: '🎓', title: 'Weekly Workshops', description: 'Free live workshops and AMAs with industry experts.' } },
          { id: 'com-f3', type: 'feature-card', category: 'Layout', label: 'Feature 3', styles: {}, props: { icon: '🤝', title: 'Mentorship Program', description: 'Connect with experienced mentors who guide your growth.' } },
        ]},
        { id: 'com-cta-bottom', type: 'body', label: 'CTA', styles: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', color: '#ffffff' }, components: [
          { id: 'com-cta-h', type: 'heading', category: 'Text', label: 'CTA', content: 'Ready to join 50,000+\ncreators?', styles: { fontSize: '48px', fontWeight: '800', margin: '0 0 36px 0', lineHeight: '1.1' } },
          { id: 'com-cta-b', type: 'button', category: 'Basic', label: 'CTA', content: 'Join the Community →', styles: { padding: '18px 48px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#ffffff', color: '#7c3aed', border: 'none' } },
        ]},
        lightFooter,
      ],
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Clear existing templates (optional, for re-seeding)
    await supabase.from("templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const rows = templates.map((t) => ({
      name: t.name,
      description: t.description,
      category: t.category,
      thumbnail: t.thumbnail,
      tags: t.tags,
      schema: t.schema,
      is_public: true,
      is_premium: false,
      author_id: null,
      installs: Math.floor(Math.random() * 500) + 50,
    }));

    const { data, error } = await supabase.from("templates").insert(rows).select("id, name");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, inserted: data?.length, templates: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
