import type { Template, PageSchema } from '@/types/builder';

const blankSchema: PageSchema = {
  id: 'page-blank',
  name: 'Home',
  sections: [
    {
      id: 'header-1', type: 'header', label: 'Header',
      styles: { padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '0' },
      components: [
        { id: 'logo-1', type: 'heading', category: 'Text', label: 'Logo', content: 'MySite', styles: { fontSize: '20px', fontWeight: '700' } },
      ],
    },
    {
      id: 'nav-1', type: 'nav', label: 'Navigation',
      styles: { padding: '0 24px', backgroundColor: '#f9fafb', display: 'flex', gap: '24px', alignItems: 'center', height: '48px' },
      components: [
        { id: 'nav-link-1', type: 'paragraph', category: 'Text', label: 'Nav Link', content: 'Home', styles: { fontSize: '14px', fontWeight: '500' } },
        { id: 'nav-link-2', type: 'paragraph', category: 'Text', label: 'Nav Link', content: 'About', styles: { fontSize: '14px', fontWeight: '500' } },
        { id: 'nav-link-3', type: 'paragraph', category: 'Text', label: 'Nav Link', content: 'Services', styles: { fontSize: '14px', fontWeight: '500' } },
        { id: 'nav-link-4', type: 'paragraph', category: 'Text', label: 'Nav Link', content: 'Contact', styles: { fontSize: '14px', fontWeight: '500' } },
      ],
    },
    {
      id: 'body-1', type: 'body', label: 'Body',
      styles: { padding: '60px 24px', minHeight: '400px' },
      components: [
        { id: 'body-heading', type: 'heading', category: 'Text', label: 'Main Heading', content: 'Welcome to Your Website', styles: { fontSize: '36px', fontWeight: '700', textAlign: 'center', margin: '0 0 16px 0' } },
        { id: 'body-text', type: 'paragraph', category: 'Text', label: 'Body Text', content: 'Start building your website by dragging components from the left sidebar onto this canvas.', styles: { fontSize: '18px', textAlign: 'center', color: '#6b7280', margin: '0 auto', maxWidth: '600px' } as any },
      ],
    },
    {
      id: 'footer-1', type: 'footer', label: 'Footer',
      styles: { padding: '24px', backgroundColor: '#111827', color: '#9ca3af', textAlign: 'center' },
      components: [
        { id: 'footer-text', type: 'paragraph', category: 'Text', label: 'Footer Text', content: '© 2026 MySite. All rights reserved.', styles: { fontSize: '14px' } },
      ],
    },
  ],
};

const blogSchema: PageSchema = {
  ...blankSchema, id: 'page-blog', name: 'Blog',
  sections: [
    ...blankSchema.sections.slice(0, 2),
    {
      id: 'hero-blog', type: 'body', label: 'Hero',
      styles: { padding: '80px 24px', backgroundColor: '#f0f9ff', textAlign: 'center' },
      components: [
        { id: 'blog-hero-h', type: 'heading', category: 'Text', label: 'Blog Title', content: 'Our Blog', styles: { fontSize: '48px', fontWeight: '700', margin: '0 0 12px 0' } },
        { id: 'blog-hero-p', type: 'paragraph', category: 'Text', label: 'Blog Subtitle', content: 'Insights, tutorials, and updates from our team', styles: { fontSize: '20px', color: '#6b7280' } },
      ],
    },
    {
      id: 'blog-grid', type: 'body', label: 'Posts Grid',
      styles: { padding: '40px 24px', display: 'grid', gap: '24px' },
      components: [
        { id: 'post-1', type: 'card', category: 'Layout', label: 'Blog Post', content: 'Getting Started with Web Development', styles: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
        { id: 'post-2', type: 'card', category: 'Layout', label: 'Blog Post', content: 'Best Practices for Modern CSS', styles: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
        { id: 'post-3', type: 'card', category: 'Layout', label: 'Blog Post', content: 'Understanding TypeScript Generics', styles: { padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const businessSchema: PageSchema = {
  ...blankSchema, id: 'page-business', name: 'Business',
  sections: [
    blankSchema.sections[0], blankSchema.sections[1],
    {
      id: 'hero-biz', type: 'body', label: 'Hero',
      styles: { padding: '100px 24px', backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'center' },
      components: [
        { id: 'biz-h', type: 'heading', category: 'Text', label: 'Hero Title', content: 'Grow Your Business', styles: { fontSize: '56px', fontWeight: '700', margin: '0 0 16px 0' } },
        { id: 'biz-p', type: 'paragraph', category: 'Text', label: 'Hero Subtitle', content: 'Enterprise solutions that scale with you', styles: { fontSize: '22px', color: '#94a3b8' } },
      ],
    },
    {
      id: 'features-biz', type: 'body', label: 'Features',
      styles: { padding: '60px 24px', display: 'flex', gap: '24px', justifyContent: 'center' },
      components: [
        { id: 'feat-1', type: 'card', category: 'Layout', label: 'Feature', content: '🚀 Performance', styles: { padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center', width: '280px' } },
        { id: 'feat-2', type: 'card', category: 'Layout', label: 'Feature', content: '🔒 Security', styles: { padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center', width: '280px' } },
        { id: 'feat-3', type: 'card', category: 'Layout', label: 'Feature', content: '📊 Analytics', styles: { padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center', width: '280px' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const landingSchema: PageSchema = {
  ...blankSchema, id: 'page-landing', name: 'Landing Page',
  sections: [
    blankSchema.sections[0],
    {
      id: 'hero-landing', type: 'body', label: 'Hero',
      styles: { padding: '120px 24px', textAlign: 'center' },
      components: [
        { id: 'landing-h', type: 'heading', category: 'Text', label: 'Hero', content: 'The Future of Web Building', styles: { fontSize: '64px', fontWeight: '800', margin: '0 0 20px 0' } },
        { id: 'landing-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Create stunning websites without writing a single line of code.', styles: { fontSize: '20px', color: '#6b7280', maxWidth: '640px', margin: '0 auto' } as any },
      ],
    },
    blankSchema.sections[3],
  ],
};

const ecommerceSchema: PageSchema = {
  ...blankSchema, id: 'page-ecom', name: 'Ecommerce',
  sections: [
    blankSchema.sections[0], blankSchema.sections[1],
    {
      id: 'hero-ecom', type: 'body', label: 'Featured',
      styles: { padding: '60px 24px', backgroundColor: '#fef3c7', textAlign: 'center' },
      components: [
        { id: 'ecom-h', type: 'heading', category: 'Text', label: 'Featured', content: 'New Collection', styles: { fontSize: '48px', fontWeight: '700' } },
        { id: 'ecom-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Discover our latest products', styles: { fontSize: '18px', color: '#92400e' } },
      ],
    },
    {
      id: 'products-ecom', type: 'body', label: 'Products',
      styles: { padding: '40px 24px', display: 'grid', gap: '24px' },
      components: [
        { id: 'prod-1', type: 'product-card', category: 'Ecommerce', label: 'Product', content: 'Product One — $29.99', styles: { padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
        { id: 'prod-2', type: 'product-card', category: 'Ecommerce', label: 'Product', content: 'Product Two — $49.99', styles: { padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
        { id: 'prod-3', type: 'product-card', category: 'Ecommerce', label: 'Product', content: 'Product Three — $19.99', styles: { padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const portfolioSchema: PageSchema = {
  ...blankSchema, id: 'page-portfolio', name: 'Portfolio',
  sections: [
    { ...blankSchema.sections[0], components: [{ id: 'port-logo', type: 'heading', category: 'Text', label: 'Name', content: 'Jane Doe', styles: { fontSize: '20px', fontWeight: '700' } }] },
    {
      id: 'hero-port', type: 'body', label: 'Hero',
      styles: { padding: '100px 24px', textAlign: 'center', backgroundColor: '#0f172a', color: '#ffffff' },
      components: [
        { id: 'port-h', type: 'heading', category: 'Text', label: 'Title', content: 'Creative Designer & Developer', styles: { fontSize: '52px', fontWeight: '800', margin: '0 0 16px 0' } },
        { id: 'port-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'I create beautiful digital experiences that people love to use', styles: { fontSize: '20px', color: '#94a3b8' } },
      ],
    },
    {
      id: 'work-grid', type: 'body', label: 'Work',
      styles: { padding: '60px 24px', display: 'grid', gap: '24px' },
      components: [
        { id: 'work-1', type: 'card', category: 'Layout', label: 'Project', content: '🎨 Brand Identity — Nexus Corp', styles: { padding: '32px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' } },
        { id: 'work-2', type: 'card', category: 'Layout', label: 'Project', content: '📱 Mobile App — FitTrack', styles: { padding: '32px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' } },
        { id: 'work-3', type: 'card', category: 'Layout', label: 'Project', content: '🌐 Website — Artisan Coffee', styles: { padding: '32px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const restaurantSchema: PageSchema = {
  ...blankSchema, id: 'page-restaurant', name: 'Restaurant',
  sections: [
    { ...blankSchema.sections[0], styles: { ...blankSchema.sections[0].styles, backgroundColor: '#1c1917' }, components: [{ id: 'rest-logo', type: 'heading', category: 'Text', label: 'Name', content: '🍽️ La Maison', styles: { fontSize: '24px', fontWeight: '700', color: '#fef3c7' } }] },
    {
      id: 'hero-rest', type: 'body', label: 'Hero',
      styles: { padding: '120px 24px', textAlign: 'center', backgroundColor: '#292524', color: '#fef3c7' },
      components: [
        { id: 'rest-h', type: 'heading', category: 'Text', label: 'Title', content: 'Fine Dining Experience', styles: { fontSize: '56px', fontWeight: '700', margin: '0 0 16px 0' } },
        { id: 'rest-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Crafted with passion, served with elegance', styles: { fontSize: '20px', color: '#a8a29e' } },
      ],
    },
    {
      id: 'menu-section', type: 'body', label: 'Menu',
      styles: { padding: '60px 24px', backgroundColor: '#fef3c7' },
      components: [
        { id: 'menu-h', type: 'heading', category: 'Text', label: 'Menu', content: 'Our Menu', styles: { fontSize: '36px', fontWeight: '700', textAlign: 'center', margin: '0 0 24px 0', color: '#1c1917' } },
        { id: 'menu-1', type: 'card', category: 'Layout', label: 'Dish', content: 'Truffle Risotto — $28', styles: { padding: '20px', borderRadius: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', margin: '0 0 12px 0' } },
        { id: 'menu-2', type: 'card', category: 'Layout', label: 'Dish', content: 'Pan-Seared Salmon — $34', styles: { padding: '20px', borderRadius: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', margin: '0 0 12px 0' } },
      ],
    },
    { ...blankSchema.sections[3], styles: { ...blankSchema.sections[3].styles, backgroundColor: '#1c1917' } },
  ],
};

const agencySchema: PageSchema = {
  ...blankSchema, id: 'page-agency', name: 'Agency',
  sections: [
    blankSchema.sections[0], blankSchema.sections[1],
    {
      id: 'hero-agency', type: 'body', label: 'Hero',
      styles: { padding: '100px 24px', textAlign: 'center', background: 'linear-gradient(135deg, #6366f1, #ec4899)' },
      components: [
        { id: 'ag-h', type: 'heading', category: 'Text', label: 'Title', content: 'We Build Digital Products', styles: { fontSize: '56px', fontWeight: '800', color: '#ffffff', margin: '0 0 16px 0' } },
        { id: 'ag-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Strategy • Design • Development', styles: { fontSize: '22px', color: 'rgba(255,255,255,0.7)' } },
      ],
    },
    {
      id: 'services', type: 'body', label: 'Services',
      styles: { padding: '60px 24px', display: 'flex', gap: '24px', justifyContent: 'center' },
      components: [
        { id: 'svc-1', type: 'card', category: 'Layout', label: 'Service', content: '🎯 Strategy & Consulting', styles: { padding: '32px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', width: '300px', backgroundColor: '#ffffff' } },
        { id: 'svc-2', type: 'card', category: 'Layout', label: 'Service', content: '🎨 UI/UX Design', styles: { padding: '32px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', width: '300px', backgroundColor: '#ffffff' } },
        { id: 'svc-3', type: 'card', category: 'Layout', label: 'Service', content: '⚡ Web Development', styles: { padding: '32px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', width: '300px', backgroundColor: '#ffffff' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const saasSchema: PageSchema = {
  ...blankSchema, id: 'page-saas', name: 'SaaS',
  sections: [
    blankSchema.sections[0],
    {
      id: 'hero-saas', type: 'body', label: 'Hero',
      styles: { padding: '100px 24px', textAlign: 'center', backgroundColor: '#020617', color: '#ffffff' },
      components: [
        { id: 'saas-badge', type: 'paragraph', category: 'Text', label: 'Badge', content: '✨ Now in Public Beta', styles: { fontSize: '14px', color: '#818cf8', margin: '0 0 16px 0' } },
        { id: 'saas-h', type: 'heading', category: 'Text', label: 'Title', content: 'The All-in-One Platform', styles: { fontSize: '56px', fontWeight: '800', margin: '0 0 16px 0' } },
        { id: 'saas-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Streamline your workflow with powerful tools built for modern teams', styles: { fontSize: '20px', color: '#94a3b8' } },
      ],
    },
    {
      id: 'pricing', type: 'body', label: 'Pricing',
      styles: { padding: '60px 24px', display: 'flex', gap: '24px', justifyContent: 'center' },
      components: [
        { id: 'price-1', type: 'card', category: 'Layout', label: 'Plan', content: 'Free — $0/mo\n✓ 1 Project\n✓ Basic Support', styles: { padding: '32px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', width: '280px', backgroundColor: '#ffffff' } },
        { id: 'price-2', type: 'card', category: 'Layout', label: 'Plan', content: 'Pro — $29/mo\n✓ Unlimited Projects\n✓ Priority Support', styles: { padding: '32px', borderRadius: '16px', border: '2px solid #6366f1', textAlign: 'center', width: '280px', backgroundColor: '#ffffff' } },
        { id: 'price-3', type: 'card', category: 'Layout', label: 'Plan', content: 'Enterprise — Custom\n✓ Dedicated Support\n✓ Custom Integrations', styles: { padding: '32px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', width: '280px', backgroundColor: '#ffffff' } },
      ],
    },
    blankSchema.sections[3],
  ],
};

const photographySchema: PageSchema = {
  ...blankSchema, id: 'page-photography', name: 'Photography',
  sections: [
    { ...blankSchema.sections[0], styles: { ...blankSchema.sections[0].styles, backgroundColor: '#0a0a0a' }, components: [{ id: 'photo-logo', type: 'heading', category: 'Text', label: 'Name', content: '📸 Studio Lens', styles: { fontSize: '20px', fontWeight: '700', color: '#ffffff' } }] },
    {
      id: 'hero-photo', type: 'body', label: 'Hero',
      styles: { padding: '120px 24px', textAlign: 'center', backgroundColor: '#0a0a0a', color: '#ffffff' },
      components: [
        { id: 'photo-h', type: 'heading', category: 'Text', label: 'Title', content: 'Capturing Moments', styles: { fontSize: '60px', fontWeight: '300', letterSpacing: '-0.02em', margin: '0 0 16px 0' } },
        { id: 'photo-p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Wedding • Portrait • Commercial', styles: { fontSize: '18px', color: '#737373', letterSpacing: '0.2em', textTransform: 'uppercase' } as any },
      ],
    },
    {
      id: 'gallery', type: 'body', label: 'Gallery',
      styles: { padding: '40px 24px', display: 'grid', gap: '16px', backgroundColor: '#0a0a0a' },
      components: [
        { id: 'gal-1', type: 'card', category: 'Layout', label: 'Photo', content: '🏔️ Mountain Sunrise', styles: { padding: '60px 32px', borderRadius: '8px', backgroundColor: '#171717', textAlign: 'center', fontSize: '24px' } },
        { id: 'gal-2', type: 'card', category: 'Layout', label: 'Photo', content: '🌊 Ocean Waves', styles: { padding: '60px 32px', borderRadius: '8px', backgroundColor: '#171717', textAlign: 'center', fontSize: '24px' } },
        { id: 'gal-3', type: 'card', category: 'Layout', label: 'Photo', content: '🌸 Spring Blossom', styles: { padding: '60px 32px', borderRadius: '8px', backgroundColor: '#171717', textAlign: 'center', fontSize: '24px' } },
      ],
    },
    { ...blankSchema.sections[3], styles: { ...blankSchema.sections[3].styles, backgroundColor: '#0a0a0a' } },
  ],
};

export const templates: Template[] = [
  { id: 'blank', name: 'Blank Canvas', description: 'Start from scratch with a minimal layout', category: 'starter', thumbnail: '🗒️', schema: blankSchema },
  { id: 'blog', name: 'Blog', description: 'A clean blog with posts grid', category: 'content', thumbnail: '📝', schema: blogSchema },
  { id: 'business', name: 'Business', description: 'Professional corporate website', category: 'business', thumbnail: '🏢', schema: businessSchema },
  { id: 'landing', name: 'Landing Page', description: 'High-converting landing page', category: 'marketing', thumbnail: '🚀', schema: landingSchema },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online store with product grid', category: 'commerce', thumbnail: '🛒', schema: ecommerceSchema },
  { id: 'portfolio', name: 'Portfolio', description: 'Showcase your creative work', category: 'creative', thumbnail: '🎨', schema: portfolioSchema },
  { id: 'restaurant', name: 'Restaurant', description: 'Elegant dining experience site', category: 'food', thumbnail: '🍽️', schema: restaurantSchema },
  { id: 'agency', name: 'Agency', description: 'Digital agency with services', category: 'business', thumbnail: '💼', schema: agencySchema },
  { id: 'saas', name: 'SaaS', description: 'Software product with pricing', category: 'tech', thumbnail: '💻', schema: saasSchema },
  { id: 'photography', name: 'Photography', description: 'Minimal photography portfolio', category: 'creative', thumbnail: '📸', schema: photographySchema },
];
