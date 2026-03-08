/**
 * Templates Panel - Browse and insert pre-built templates and sections
 */

import { useState, useMemo } from 'react';
import {
  X, Search, ChevronRight, Sparkles,
  LayoutTemplate, Layers, PanelTop, PanelBottom,
  Users, Mail, MessageSquare,
  CreditCard, Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent, ComponentStyles } from '@/types/builder';

// Template type definition
interface TemplateComponent {
  id: string;
  type: string;
  category: string;
  label: string;
  content?: string;
  styles?: ComponentStyles;
  props?: Record<string, any>;
  children?: TemplateComponent[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  components: TemplateComponent[];
  sectionStyles?: ComponentStyles;
}

// Template categories with pre-built sections
interface CategoryData {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  templates: Template[];
}

const TEMPLATE_CATEGORIES: Record<string, CategoryData> = {
  'Hero Sections': {
    icon: PanelTop,
    color: 'hsl(var(--primary))',
    templates: [
      {
        id: 'hero-centered',
        name: 'Centered Hero',
        description: 'Classic centered hero with headline, subtitle, and CTA',
        preview: '🎯',
        components: [
          { id: 'h1', type: 'heading', category: 'Text', label: 'Headline', content: 'Build Something Amazing', styles: { fontSize: '56px', fontWeight: '800', textAlign: 'center', lineHeight: '1.1', letterSpacing: '-0.02em' } },
          { id: 'p1', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Create beautiful websites without writing code. Drag, drop, and launch in minutes.', styles: { fontSize: '20px', textAlign: 'center', opacity: '0.7', maxWidth: '600px', margin: '16px auto 32px' } },
          { id: 'btn1', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started →', styles: { padding: '16px 40px', fontSize: '16px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } },
        ],
        sectionStyles: { padding: '120px 40px', textAlign: 'center', background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)' },
      },
      {
        id: 'hero-split',
        name: 'Split Hero',
        description: 'Two-column hero with text and image',
        preview: '↔️',
        components: [
          { id: 'container', type: 'flex-row', category: 'Layout', label: 'Container', styles: { display: 'flex', gap: '40px', alignItems: 'center' }, children: [
            { id: 'left', type: 'container', category: 'Layout', label: 'Left', styles: { flex: '1' }, children: [
              { id: 'badge', type: 'badge', category: 'Text', label: 'Badge', content: '✨ New Release', styles: { marginBottom: '16px' } },
              { id: 'h1', type: 'heading', category: 'Text', label: 'Headline', content: 'The future of web development is here', styles: { fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' } },
              { id: 'p1', type: 'paragraph', category: 'Text', label: 'Description', content: 'Build faster, ship faster. Our platform handles the complexity so you can focus on what matters.', styles: { fontSize: '18px', opacity: '0.7', marginBottom: '32px', lineHeight: '1.6' } },
              { id: 'btn1', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free Trial', styles: { padding: '14px 32px', borderRadius: '10px', fontWeight: '700', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } },
            ]},
            { id: 'right', type: 'container', category: 'Layout', label: 'Right', styles: { flex: '1' }, children: [
              { id: 'img', type: 'image', category: 'Media', label: 'Hero Image', styles: { width: '100%', borderRadius: '16px' }, props: { src: '/placeholder.svg', alt: 'Hero' } },
            ]},
          ]},
        ],
        sectionStyles: { padding: '80px 40px' },
      },
      {
        id: 'hero-gradient',
        name: 'Gradient Hero',
        description: 'Bold gradient background with floating elements',
        preview: '🌈',
        components: [
          { id: 'h1', type: 'heading', category: 'Text', label: 'Headline', content: 'Transform Your Ideas\nInto Reality', styles: { fontSize: '64px', fontWeight: '800', textAlign: 'center', lineHeight: '1.1', color: '#ffffff', letterSpacing: '-0.03em' } },
          { id: 'p1', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'The all-in-one platform for modern teams to collaborate, create, and ship products faster than ever.', styles: { fontSize: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.8)', maxWidth: '640px', margin: '24px auto 40px', lineHeight: '1.6' } },
          { id: 'btns', type: 'flex-row', category: 'Layout', label: 'Buttons', styles: { display: 'flex', gap: '16px', justifyContent: 'center' }, children: [
            { id: 'btn1', type: 'button', category: 'Basic', label: 'Primary', content: 'Get Started Free', styles: { padding: '16px 36px', fontWeight: '700', borderRadius: '12px', backgroundColor: '#ffffff', color: '#0f172a' } },
            { id: 'btn2', type: 'button', category: 'Basic', label: 'Secondary', content: 'Watch Demo', styles: { padding: '16px 36px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.3)' } },
          ]},
        ],
        sectionStyles: { padding: '140px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' },
      },
    ],
  },
  'Features': {
    icon: Layers,
    color: 'hsl(142 71% 45%)',
    templates: [
      {
        id: 'features-grid',
        name: 'Feature Grid',
        description: '3-column feature cards with icons',
        preview: '🔲',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Section Title', content: 'Everything you need', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', marginBottom: '16px' } },
          { id: 'sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Powerful features to help you build, deploy, and scale with confidence.', styles: { fontSize: '18px', textAlign: 'center', opacity: '0.6', marginBottom: '48px' } },
          { id: 'grid', type: 'grid', category: 'Layout', label: 'Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }, children: [
            { id: 'f1', type: 'card', category: 'Layout', label: 'Feature 1', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'i1', type: 'paragraph', category: 'Text', label: 'Icon', content: '⚡', styles: { fontSize: '32px', marginBottom: '16px' } },
              { id: 't1', type: 'heading', category: 'Text', label: 'Title', content: 'Lightning Fast', styles: { fontSize: '20px', fontWeight: '700', marginBottom: '8px' } },
              { id: 'd1', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Optimized for speed with instant hot reloading and fast builds.', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '1.5' } },
            ]},
            { id: 'f2', type: 'card', category: 'Layout', label: 'Feature 2', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'i2', type: 'paragraph', category: 'Text', label: 'Icon', content: '🔒', styles: { fontSize: '32px', marginBottom: '16px' } },
              { id: 't2', type: 'heading', category: 'Text', label: 'Title', content: 'Secure by Default', styles: { fontSize: '20px', fontWeight: '700', marginBottom: '8px' } },
              { id: 'd2', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Enterprise-grade security with automatic SSL and DDoS protection.', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '1.5' } },
            ]},
            { id: 'f3', type: 'card', category: 'Layout', label: 'Feature 3', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'i3', type: 'paragraph', category: 'Text', label: 'Icon', content: '🌍', styles: { fontSize: '32px', marginBottom: '16px' } },
              { id: 't3', type: 'heading', category: 'Text', label: 'Title', content: 'Global CDN', styles: { fontSize: '20px', fontWeight: '700', marginBottom: '8px' } },
              { id: 'd3', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Deploy to 100+ edge locations worldwide for ultra-low latency.', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '1.5' } },
            ]},
          ]},
        ],
        sectionStyles: { padding: '100px 40px' },
      },
      {
        id: 'features-list',
        name: 'Feature List',
        description: 'Vertical list with icons and descriptions',
        preview: '📋',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Title', content: 'Why choose us?', styles: { fontSize: '36px', fontWeight: '800', marginBottom: '40px' } },
          { id: 'list', type: 'container', category: 'Layout', label: 'List', styles: { display: 'flex', flexDirection: 'column', gap: '24px' }, children: [
            { id: 'item1', type: 'flex-row', category: 'Layout', label: 'Item 1', styles: { display: 'flex', gap: '16px', alignItems: 'flex-start' }, children: [
              { id: 'icon1', type: 'paragraph', category: 'Text', label: 'Icon', content: '✓', styles: { fontSize: '20px', color: 'hsl(142 71% 45%)', fontWeight: '700' } },
              { id: 'text1', type: 'container', category: 'Layout', label: 'Text', children: [
                { id: 't1', type: 'heading', category: 'Text', label: 'Title', content: 'Easy to use', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
                { id: 'd1', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Intuitive drag-and-drop interface that anyone can master in minutes.', styles: { fontSize: '14px', opacity: '0.6' } },
              ]},
            ]},
            { id: 'item2', type: 'flex-row', category: 'Layout', label: 'Item 2', styles: { display: 'flex', gap: '16px', alignItems: 'flex-start' }, children: [
              { id: 'icon2', type: 'paragraph', category: 'Text', label: 'Icon', content: '✓', styles: { fontSize: '20px', color: 'hsl(142 71% 45%)', fontWeight: '700' } },
              { id: 'text2', type: 'container', category: 'Layout', label: 'Text', children: [
                { id: 't2', type: 'heading', category: 'Text', label: 'Title', content: 'Fully customizable', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
                { id: 'd2', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Customize every aspect of your site with powerful design tools.', styles: { fontSize: '14px', opacity: '0.6' } },
              ]},
            ]},
            { id: 'item3', type: 'flex-row', category: 'Layout', label: 'Item 3', styles: { display: 'flex', gap: '16px', alignItems: 'flex-start' }, children: [
              { id: 'icon3', type: 'paragraph', category: 'Text', label: 'Icon', content: '✓', styles: { fontSize: '20px', color: 'hsl(142 71% 45%)', fontWeight: '700' } },
              { id: 'text3', type: 'container', category: 'Layout', label: 'Text', children: [
                { id: 't3', type: 'heading', category: 'Text', label: 'Title', content: '24/7 Support', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
                { id: 'd3', type: 'paragraph', category: 'Text', label: 'Desc', content: 'Our expert team is always here to help you succeed.', styles: { fontSize: '14px', opacity: '0.6' } },
              ]},
            ]},
          ]},
        ],
        sectionStyles: { padding: '80px 40px' },
      },
    ],
  },
  'Testimonials': {
    icon: MessageSquare,
    color: 'hsl(38 92% 50%)',
    templates: [
      {
        id: 'testimonial-cards',
        name: 'Testimonial Cards',
        description: 'Customer testimonials in card format',
        preview: '💬',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Title', content: 'Loved by thousands', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' } },
          { id: 'grid', type: 'grid', category: 'Layout', label: 'Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, children: [
            { id: 't1', type: 'card', category: 'Layout', label: 'Testimonial 1', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'stars1', type: 'paragraph', category: 'Text', label: 'Stars', content: '⭐⭐⭐⭐⭐', styles: { marginBottom: '16px' } },
              { id: 'quote1', type: 'paragraph', category: 'Text', label: 'Quote', content: '"This tool has completely transformed how we build websites. Incredibly intuitive and powerful."', styles: { fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' } },
              { id: 'author1', type: 'paragraph', category: 'Text', label: 'Author', content: '— Sarah Chen, CEO at TechCorp', styles: { fontSize: '13px', fontWeight: '600', opacity: '0.7' } },
            ]},
            { id: 't2', type: 'card', category: 'Layout', label: 'Testimonial 2', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'stars2', type: 'paragraph', category: 'Text', label: 'Stars', content: '⭐⭐⭐⭐⭐', styles: { marginBottom: '16px' } },
              { id: 'quote2', type: 'paragraph', category: 'Text', label: 'Quote', content: '"We shipped our new landing page in just 2 hours. The templates are beautifully designed."', styles: { fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' } },
              { id: 'author2', type: 'paragraph', category: 'Text', label: 'Author', content: '— Mark Johnson, Founder at StartupXYZ', styles: { fontSize: '13px', fontWeight: '600', opacity: '0.7' } },
            ]},
            { id: 't3', type: 'card', category: 'Layout', label: 'Testimonial 3', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--muted))' }, children: [
              { id: 'stars3', type: 'paragraph', category: 'Text', label: 'Stars', content: '⭐⭐⭐⭐⭐', styles: { marginBottom: '16px' } },
              { id: 'quote3', type: 'paragraph', category: 'Text', label: 'Quote', content: '"The best no-code builder I have ever used. Period. Our team loves it."', styles: { fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' } },
              { id: 'author3', type: 'paragraph', category: 'Text', label: 'Author', content: '— Emma Williams, Design Lead at Agency', styles: { fontSize: '13px', fontWeight: '600', opacity: '0.7' } },
            ]},
          ]},
        ],
        sectionStyles: { padding: '100px 40px', backgroundColor: 'hsl(var(--background))' },
      },
    ],
  },
  'Pricing': {
    icon: CreditCard,
    color: 'hsl(217 91% 60%)',
    templates: [
      {
        id: 'pricing-cards',
        name: 'Pricing Cards',
        description: 'Three-tier pricing comparison',
        preview: '💰',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Title', content: 'Simple, transparent pricing', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', marginBottom: '16px' } },
          { id: 'sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Choose the plan that fits your needs. No hidden fees.', styles: { fontSize: '18px', textAlign: 'center', opacity: '0.6', marginBottom: '48px' } },
          { id: 'grid', type: 'grid', category: 'Layout', label: 'Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }, children: [
            { id: 'p1', type: 'card', category: 'Layout', label: 'Starter', styles: { padding: '32px', borderRadius: '16px', border: '1px solid hsl(var(--border))' }, children: [
              { id: 'n1', type: 'paragraph', category: 'Text', label: 'Name', content: 'Starter', styles: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: '0.6', marginBottom: '8px' } },
              { id: 'price1', type: 'heading', category: 'Text', label: 'Price', content: '$9', styles: { fontSize: '48px', fontWeight: '800', marginBottom: '4px' } },
              { id: 'period1', type: 'paragraph', category: 'Text', label: 'Period', content: 'per month', styles: { fontSize: '14px', opacity: '0.5', marginBottom: '24px' } },
              { id: 'features1', type: 'paragraph', category: 'Text', label: 'Features', content: '✓ 1 website\n✓ 10GB storage\n✓ Basic analytics\n✓ Email support', styles: { fontSize: '14px', lineHeight: '2', whiteSpace: 'pre-line', marginBottom: '24px' } },
              { id: 'btn1', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started', styles: { width: '100%', padding: '12px', fontWeight: '600', borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'transparent' } },
            ]},
            { id: 'p2', type: 'card', category: 'Layout', label: 'Pro', styles: { padding: '32px', borderRadius: '16px', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', transform: 'scale(1.05)' }, children: [
              { id: 'badge2', type: 'paragraph', category: 'Text', label: 'Badge', content: '⭐ Most Popular', styles: { fontSize: '12px', fontWeight: '700', marginBottom: '12px' } },
              { id: 'n2', type: 'paragraph', category: 'Text', label: 'Name', content: 'Pro', styles: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: '0.8', marginBottom: '8px' } },
              { id: 'price2', type: 'heading', category: 'Text', label: 'Price', content: '$29', styles: { fontSize: '48px', fontWeight: '800', marginBottom: '4px' } },
              { id: 'period2', type: 'paragraph', category: 'Text', label: 'Period', content: 'per month', styles: { fontSize: '14px', opacity: '0.7', marginBottom: '24px' } },
              { id: 'features2', type: 'paragraph', category: 'Text', label: 'Features', content: '✓ 10 websites\n✓ 100GB storage\n✓ Advanced analytics\n✓ Priority support\n✓ Custom domain', styles: { fontSize: '14px', lineHeight: '2', whiteSpace: 'pre-line', marginBottom: '24px' } },
              { id: 'btn2', type: 'button', category: 'Basic', label: 'CTA', content: 'Get Started', styles: { width: '100%', padding: '12px', fontWeight: '700', borderRadius: '8px', backgroundColor: '#ffffff', color: 'hsl(var(--primary))' } },
            ]},
            { id: 'p3', type: 'card', category: 'Layout', label: 'Enterprise', styles: { padding: '32px', borderRadius: '16px', border: '1px solid hsl(var(--border))' }, children: [
              { id: 'n3', type: 'paragraph', category: 'Text', label: 'Name', content: 'Enterprise', styles: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: '0.6', marginBottom: '8px' } },
              { id: 'price3', type: 'heading', category: 'Text', label: 'Price', content: '$99', styles: { fontSize: '48px', fontWeight: '800', marginBottom: '4px' } },
              { id: 'period3', type: 'paragraph', category: 'Text', label: 'Period', content: 'per month', styles: { fontSize: '14px', opacity: '0.5', marginBottom: '24px' } },
              { id: 'features3', type: 'paragraph', category: 'Text', label: 'Features', content: '✓ Unlimited websites\n✓ 1TB storage\n✓ White-label\n✓ Dedicated support\n✓ SLA guarantee', styles: { fontSize: '14px', lineHeight: '2', whiteSpace: 'pre-line', marginBottom: '24px' } },
              { id: 'btn3', type: 'button', category: 'Basic', label: 'CTA', content: 'Contact Sales', styles: { width: '100%', padding: '12px', fontWeight: '600', borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'transparent' } },
            ]},
          ]},
        ],
        sectionStyles: { padding: '100px 40px' },
      },
    ],
  },
  'CTA Sections': {
    icon: Zap,
    color: 'hsl(263 70% 50%)',
    templates: [
      {
        id: 'cta-simple',
        name: 'Simple CTA',
        description: 'Clean call-to-action banner',
        preview: '📢',
        components: [
          { id: 'content', type: 'flex-row', category: 'Layout', label: 'Content', styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }, children: [
            { id: 'text', type: 'container', category: 'Layout', label: 'Text', children: [
              { id: 'h', type: 'heading', category: 'Text', label: 'Headline', content: 'Ready to get started?', styles: { fontSize: '32px', fontWeight: '800', marginBottom: '8px' } },
              { id: 'p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Join thousands of happy customers building amazing websites.', styles: { fontSize: '16px', opacity: '0.7' } },
            ]},
            { id: 'btn', type: 'button', category: 'Basic', label: 'CTA', content: 'Start Free Trial →', styles: { padding: '16px 36px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', whiteSpace: 'nowrap' } },
          ]},
        ],
        sectionStyles: { padding: '60px 40px', backgroundColor: 'hsl(var(--muted))', borderRadius: '16px' },
      },
      {
        id: 'cta-newsletter',
        name: 'Newsletter CTA',
        description: 'Email signup with input field',
        preview: '📧',
        components: [
          { id: 'h', type: 'heading', category: 'Text', label: 'Headline', content: 'Stay in the loop', styles: { fontSize: '32px', fontWeight: '800', textAlign: 'center', marginBottom: '12px' } },
          { id: 'p', type: 'paragraph', category: 'Text', label: 'Subtitle', content: 'Get the latest updates, tips, and resources delivered to your inbox.', styles: { fontSize: '16px', textAlign: 'center', opacity: '0.7', marginBottom: '32px' } },
          { id: 'form', type: 'flex-row', category: 'Layout', label: 'Form', styles: { display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '480px', margin: '0 auto' }, children: [
            { id: 'input', type: 'input', category: 'Form', label: 'Email Input', styles: { flex: '1', padding: '14px 20px', borderRadius: '10px', border: '1px solid hsl(var(--border))', fontSize: '15px' }, props: { placeholder: 'Enter your email' } },
            { id: 'btn', type: 'button', category: 'Basic', label: 'Subscribe', content: 'Subscribe', styles: { padding: '14px 28px', fontWeight: '700', borderRadius: '10px', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } },
          ]},
        ],
        sectionStyles: { padding: '80px 40px', textAlign: 'center' },
      },
    ],
  },
  'Footer': {
    icon: PanelBottom,
    color: 'hsl(var(--muted-foreground))',
    templates: [
      {
        id: 'footer-simple',
        name: 'Simple Footer',
        description: 'Minimal footer with links and copyright',
        preview: '📄',
        components: [
          { id: 'links', type: 'paragraph', category: 'Text', label: 'Links', content: 'Home   About   Services   Blog   Contact   Privacy   Terms', styles: { fontSize: '14px', textAlign: 'center', letterSpacing: '0.5px', marginBottom: '20px' } },
          { id: 'social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: { display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' } },
          { id: 'copy', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 Your Company. All rights reserved.', styles: { fontSize: '13px', textAlign: 'center', opacity: '0.5' } },
        ],
        sectionStyles: { padding: '48px 40px', borderTop: '1px solid hsl(var(--border))' },
      },
      {
        id: 'footer-columns',
        name: 'Column Footer',
        description: 'Multi-column footer with navigation',
        preview: '🏛️',
        components: [
          { id: 'grid', type: 'grid', category: 'Layout', label: 'Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '48px' }, children: [
            { id: 'col1', type: 'container', category: 'Layout', label: 'Brand', children: [
              { id: 'logo', type: 'heading', category: 'Text', label: 'Logo', content: '● YourBrand', styles: { fontSize: '20px', fontWeight: '800', marginBottom: '16px' } },
              { id: 'desc', type: 'paragraph', category: 'Text', label: 'Description', content: 'Building the future of web development, one website at a time.', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '1.6' } },
            ]},
            { id: 'col2', type: 'container', category: 'Layout', label: 'Product', children: [
              { id: 't2', type: 'paragraph', category: 'Text', label: 'Title', content: 'Product', styles: { fontSize: '14px', fontWeight: '700', marginBottom: '16px' } },
              { id: 'l2', type: 'paragraph', category: 'Text', label: 'Links', content: 'Features\nPricing\nIntegrations\nChangelog', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '2', whiteSpace: 'pre-line' } },
            ]},
            { id: 'col3', type: 'container', category: 'Layout', label: 'Company', children: [
              { id: 't3', type: 'paragraph', category: 'Text', label: 'Title', content: 'Company', styles: { fontSize: '14px', fontWeight: '700', marginBottom: '16px' } },
              { id: 'l3', type: 'paragraph', category: 'Text', label: 'Links', content: 'About\nCareers\nBlog\nPress', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '2', whiteSpace: 'pre-line' } },
            ]},
            { id: 'col4', type: 'container', category: 'Layout', label: 'Legal', children: [
              { id: 't4', type: 'paragraph', category: 'Text', label: 'Title', content: 'Legal', styles: { fontSize: '14px', fontWeight: '700', marginBottom: '16px' } },
              { id: 'l4', type: 'paragraph', category: 'Text', label: 'Links', content: 'Privacy\nTerms\nCookies\nLicenses', styles: { fontSize: '14px', opacity: '0.7', lineHeight: '2', whiteSpace: 'pre-line' } },
            ]},
          ]},
          { id: 'divider', type: 'divider', category: 'Basic', label: 'Divider', styles: { width: '100%', height: '1px', backgroundColor: 'hsl(var(--border))', marginBottom: '24px' } },
          { id: 'bottom', type: 'flex-row', category: 'Layout', label: 'Bottom', styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [
            { id: 'copy', type: 'paragraph', category: 'Text', label: 'Copyright', content: '© 2026 YourBrand. All rights reserved.', styles: { fontSize: '13px', opacity: '0.5' } },
            { id: 'social', type: 'social-icons', category: 'Widgets', label: 'Social', styles: {} },
          ]},
        ],
        sectionStyles: { padding: '64px 40px 32px' },
      },
    ],
  },
  'Contact': {
    icon: Mail,
    color: 'hsl(187 92% 41%)',
    templates: [
      {
        id: 'contact-form',
        name: 'Contact Form',
        description: 'Standard contact form with fields',
        preview: '📝',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Title', content: 'Get in touch', styles: { fontSize: '36px', fontWeight: '800', marginBottom: '12px' } },
          { id: 'sub', type: 'paragraph', category: 'Text', label: 'Subtitle', content: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.", styles: { fontSize: '16px', opacity: '0.7', marginBottom: '32px' } },
          { id: 'form', type: 'container', category: 'Layout', label: 'Form', styles: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }, children: [
            { id: 'name', type: 'input', category: 'Form', label: 'Name', styles: { padding: '14px 16px', borderRadius: '8px', border: '1px solid hsl(var(--border))' }, props: { placeholder: 'Your name' } },
            { id: 'email', type: 'input', category: 'Form', label: 'Email', styles: { padding: '14px 16px', borderRadius: '8px', border: '1px solid hsl(var(--border))' }, props: { placeholder: 'your@email.com', type: 'email' } },
            { id: 'message', type: 'textarea', category: 'Form', label: 'Message', styles: { padding: '14px 16px', borderRadius: '8px', border: '1px solid hsl(var(--border))', minHeight: '120px', resize: 'vertical' }, props: { placeholder: 'Your message...' } },
            { id: 'btn', type: 'button', category: 'Basic', label: 'Submit', content: 'Send Message', styles: { padding: '14px 28px', fontWeight: '700', borderRadius: '8px', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } },
          ]},
        ],
        sectionStyles: { padding: '80px 40px' },
      },
    ],
  },
  'Teams': {
    icon: Users,
    color: 'hsl(351 83% 61%)',
    templates: [
      {
        id: 'team-grid',
        name: 'Team Grid',
        description: 'Team members in a grid layout',
        preview: '👥',
        components: [
          { id: 'title', type: 'heading', category: 'Text', label: 'Title', content: 'Meet our team', styles: { fontSize: '40px', fontWeight: '800', textAlign: 'center', marginBottom: '48px' } },
          { id: 'grid', type: 'grid', category: 'Layout', label: 'Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }, children: [
            { id: 'm1', type: 'card', category: 'Layout', label: 'Member 1', styles: { textAlign: 'center' }, children: [
              { id: 'img1', type: 'container', category: 'Layout', label: 'Avatar', styles: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'hsl(var(--muted))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }, children: [
                { id: 'emoji1', type: 'paragraph', category: 'Text', label: 'Emoji', content: '👨‍💻', styles: {} },
              ]},
              { id: 'name1', type: 'heading', category: 'Text', label: 'Name', content: 'John Smith', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
              { id: 'role1', type: 'paragraph', category: 'Text', label: 'Role', content: 'CEO & Founder', styles: { fontSize: '14px', opacity: '0.6' } },
            ]},
            { id: 'm2', type: 'card', category: 'Layout', label: 'Member 2', styles: { textAlign: 'center' }, children: [
              { id: 'img2', type: 'container', category: 'Layout', label: 'Avatar', styles: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'hsl(var(--muted))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }, children: [
                { id: 'emoji2', type: 'paragraph', category: 'Text', label: 'Emoji', content: '👩‍🎨', styles: {} },
              ]},
              { id: 'name2', type: 'heading', category: 'Text', label: 'Name', content: 'Sarah Chen', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
              { id: 'role2', type: 'paragraph', category: 'Text', label: 'Role', content: 'Head of Design', styles: { fontSize: '14px', opacity: '0.6' } },
            ]},
            { id: 'm3', type: 'card', category: 'Layout', label: 'Member 3', styles: { textAlign: 'center' }, children: [
              { id: 'img3', type: 'container', category: 'Layout', label: 'Avatar', styles: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'hsl(var(--muted))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }, children: [
                { id: 'emoji3', type: 'paragraph', category: 'Text', label: 'Emoji', content: '👨‍🔧', styles: {} },
              ]},
              { id: 'name3', type: 'heading', category: 'Text', label: 'Name', content: 'Mike Johnson', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
              { id: 'role3', type: 'paragraph', category: 'Text', label: 'Role', content: 'Lead Engineer', styles: { fontSize: '14px', opacity: '0.6' } },
            ]},
            { id: 'm4', type: 'card', category: 'Layout', label: 'Member 4', styles: { textAlign: 'center' }, children: [
              { id: 'img4', type: 'container', category: 'Layout', label: 'Avatar', styles: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'hsl(var(--muted))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }, children: [
                { id: 'emoji4', type: 'paragraph', category: 'Text', label: 'Emoji', content: '👩‍💼', styles: {} },
              ]},
              { id: 'name4', type: 'heading', category: 'Text', label: 'Name', content: 'Emma Williams', styles: { fontSize: '18px', fontWeight: '700', marginBottom: '4px' } },
              { id: 'role4', type: 'paragraph', category: 'Text', label: 'Role', content: 'Marketing Lead', styles: { fontSize: '14px', opacity: '0.6' } },
            ]},
          ]},
        ],
        sectionStyles: { padding: '100px 40px' },
      },
    ],
  },
};

// UI Library references
const UI_LIBRARIES = [
  { name: 'shadcn/ui', description: 'Beautifully designed components', url: 'https://ui.shadcn.com', color: 'hsl(var(--foreground))' },
  { name: 'Radix UI', description: 'Unstyled, accessible components', url: 'https://radix-ui.com', color: 'hsl(var(--primary))' },
  { name: 'Tailwind UI', description: 'Premium Tailwind components', url: 'https://tailwindui.com', color: 'hsl(187 92% 41%)' },
  { name: 'Chakra UI', description: 'Simple, modular components', url: 'https://chakra-ui.com', color: 'hsl(172 66% 50%)' },
  { name: 'Ant Design', description: 'Enterprise-level UI library', url: 'https://ant.design', color: 'hsl(217 91% 60%)' },
  { name: 'Material UI', description: 'React Material Design', url: 'https://mui.com', color: 'hsl(217 91% 60%)' },
];

interface TemplatesPanelProps {
  onClose?: () => void;
}

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const deepCloneWithNewIds = (components: any[]): BuilderComponent[] => {
  return components.map(comp => ({
    ...comp,
    id: generateId(),
    children: comp.children ? deepCloneWithNewIds(comp.children) : undefined,
  }));
};

const TemplatesPanel: React.FC<TemplatesPanelProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { schema, setSchema } = useBuilderStore();

  const categories = Object.keys(TEMPLATE_CATEGORIES);

  const filteredTemplates = useMemo(() => {
    const searchLower = search.toLowerCase();
    
    if (selectedCategory) {
      const catData = TEMPLATE_CATEGORIES[selectedCategory as keyof typeof TEMPLATE_CATEGORIES];
      const templates = catData?.templates || [];
      return searchLower
        ? templates.filter(t => t.name.toLowerCase().includes(searchLower) || t.description.toLowerCase().includes(searchLower))
        : templates;
    }

    if (searchLower) {
      return Object.values(TEMPLATE_CATEGORIES)
        .flatMap(cat => cat.templates)
        .filter(t => t.name.toLowerCase().includes(searchLower) || t.description.toLowerCase().includes(searchLower));
    }

    return [];
  }, [search, selectedCategory]);

  const handleInsertTemplate = (template: typeof TEMPLATE_CATEGORIES['Hero Sections']['templates'][0]) => {
    // Clone components with new IDs
    const newComponents = deepCloneWithNewIds(template.components);
    
    // Create new section
    const newSection = {
      id: `section-${Date.now()}`,
      type: 'body' as const,
      label: template.name,
      styles: template.sectionStyles || {},
      components: newComponents,
    };

    // Add to schema
    const updatedSections = [...schema.sections];
    // Insert before footer if exists, otherwise at end
    const footerIndex = updatedSections.findIndex(s => s.type === 'footer');
    if (footerIndex !== -1) {
      updatedSections.splice(footerIndex, 0, newSection);
    } else {
      updatedSections.push(newSection);
    }

    setSchema({ ...schema, sections: updatedSections });
    toast.success(`Added "${template.name}" section`);
  };

  return (
    <div className="builder-flyout max-w-[420px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          Templates
        </h2>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="property-input pl-8 text-xs"
          />
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* UI Libraries Info */}
        {!selectedCategory && !search && (
          <div className="px-3 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 opacity-50">
              Compatible UI Libraries
            </div>
            <div className="grid grid-cols-2 gap-2">
              {UI_LIBRARIES.map(lib => (
                <a
                  key={lib.name}
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-muted"
                  style={{ background: 'hsl(var(--builder-component-bg))' }}
                >
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: lib.color, color: '#fff' }}>
                    {lib.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold truncate">{lib.name}</div>
                    <div className="text-[9px] opacity-50 truncate">{lib.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Category Selection */}
        {!selectedCategory && !search && (
          <div className="px-3 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 opacity-50">
              Template Categories
            </div>
            <div className="space-y-1">
              {categories.map(cat => {
                const catData = TEMPLATE_CATEGORIES[cat as keyof typeof TEMPLATE_CATEGORIES];
                const Icon = catData.icon;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted text-left"
                    style={{ background: 'hsl(var(--builder-component-bg))' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${catData.color}20` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: catData.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{cat}</div>
                      <div className="text-[10px] opacity-50">{catData.templates.length} templates</div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Back button when in category */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            Back to categories
          </button>
        )}

        {/* Templates List */}
        {(selectedCategory || search) && (
          <div className="px-3 py-2 space-y-2">
            {filteredTemplates.length === 0 && (
              <div className="text-center py-8 opacity-50 text-xs">
                No templates found
              </div>
            )}
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="group p-3 rounded-lg transition-all hover:shadow-lg cursor-pointer"
                style={{ background: 'hsl(var(--builder-component-bg))' }}
                onClick={() => handleInsertTemplate(template)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
                    style={{ background: 'hsl(var(--muted))' }}
                  >
                    {template.preview}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold">{template.name}</span>
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-[10px] font-medium"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInsertTemplate(template);
                        }}
                      >
                        Insert
                      </button>
                    </div>
                    <p className="text-[10px] opacity-60 line-clamp-2">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick tip */}
        {!selectedCategory && !search && (
          <div className="px-3 py-3">
            <div className="p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                Pro Tip
              </div>
              <p className="text-[10px] opacity-60 leading-relaxed">
                Click any template to instantly add it to your page. All templates are fully customizable after insertion.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPanel;
