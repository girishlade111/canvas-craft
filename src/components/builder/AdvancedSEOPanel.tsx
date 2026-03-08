import { useState } from 'react';
import {
  Search, X, Globe, Share2, Code2, FileText, Map, Zap, CheckCircle2, AlertCircle,
  Copy, ChevronRight, Eye, BarChart3, Target, Link2, Image, Type, Hash,
  Monitor, Clock, Users, RefreshCw, Plus, Trash2, Settings, Sparkles,
  Layers, Bot, FileCode, AlignLeft, Languages, Gauge, MousePointerClick,
  Twitter, Facebook, Linkedin, MapPin, Star, Smartphone, Database, Tag, BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

// ─── Types ─────────────────────────────────────────────────

interface SEOData {
  // Basic Meta
  title: string;
  description: string;
  keywords: string;
  author: string;
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: 'website' | 'article' | 'product' | 'video';
  ogSiteName: string;
  ogLocale: string;
  // Twitter Cards
  twitterCard: 'summary' | 'summary_large_image';
  twitterSite: string;
  twitterCreator: string;
  // Technical SEO
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  customHead: string;
  // Keywords
  focusKeyword: string;
  secondaryKeywords: string;
  keywordDensityTarget: number;
  // Robots & Crawling
  robotsTxt: string;
  // Schema
  schemaType: string;
  schemaData: string;
  // Navigation
  breadcrumbs: string[];
  redirects: { from: string; to: string; type: '301' | '302' }[];
  hreflang: { lang: string; url: string }[];
  // Performance
  lazyLoadImages: boolean;
  minifyCSS: boolean;
  minifyJS: boolean;
  preloadFonts: boolean;
  // Analytics
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  // Sitemap
  sitemapEnabled: boolean;
  sitemapFrequency: 'daily' | 'weekly' | 'monthly';
  sitemapPriority: string;
  // Local SEO
  localBusinessName: string;
  localBusinessAddress: string;
  localBusinessPhone: string;
  // E-commerce
  productPrice: string;
  productCurrency: string;
  productAvailability: 'InStock' | 'OutOfStock' | 'PreOrder';
  productBrand: string;
  // Verification
  verificationGoogle: string;
  verificationBing: string;
}

// ─── Constants ─────────────────────────────────────────────

const SCHEMA_TYPES = [
  'WebSite', 'WebPage', 'Article', 'BlogPosting', 'NewsArticle', 'Product', 'LocalBusiness',
  'Organization', 'Person', 'Event', 'FAQPage', 'HowTo', 'Recipe', 'JobPosting',
  'Review', 'Course', 'BreadcrumbList', 'VideoObject', 'SoftwareApplication',
  'Service', 'Restaurant', 'Book', 'Movie', 'MusicAlbum', 'Podcast',
];

const SEO_COMPONENTS = {
  'Meta Tags': [
    { id: 'meta-title', name: 'Page Title', icon: Type, description: 'SEO-optimized title tag', preview: '📝' },
    { id: 'meta-description', name: 'Meta Description', icon: AlignLeft, description: '160-char description', preview: '📄' },
    { id: 'meta-keywords', name: 'Keywords Tag', icon: Hash, description: 'Focus & secondary keywords', preview: '#️⃣' },
    { id: 'canonical-url', name: 'Canonical URL', icon: Link2, description: 'Prevent duplicate content', preview: '🔗' },
    { id: 'robots-meta', name: 'Robots Meta', icon: Bot, description: 'index/noindex directives', preview: '🤖' },
    { id: 'author-tag', name: 'Author Tag', icon: Users, description: 'Content attribution', preview: '✍️' },
  ],
  'Social Sharing': [
    { id: 'og-tags', name: 'Open Graph Tags', icon: Share2, description: 'Facebook/LinkedIn sharing', preview: '📱' },
    { id: 'twitter-cards', name: 'Twitter Cards', icon: Twitter, description: 'Twitter preview cards', preview: '🐦' },
    { id: 'linkedin-tags', name: 'LinkedIn Tags', icon: Linkedin, description: 'Professional sharing', preview: '💼' },
    { id: 'pinterest-tags', name: 'Pinterest Tags', icon: Image, description: 'Rich pins support', preview: '📌' },
    { id: 'social-preview', name: 'Social Preview', icon: Eye, description: 'Preview all platforms', preview: '👁️' },
  ],
  'Structured Data': [
    { id: 'schema-website', name: 'Website Schema', icon: Globe, description: 'Organization & site info', preview: '🌐' },
    { id: 'schema-article', name: 'Article Schema', icon: FileText, description: 'Blog/news markup', preview: '📰' },
    { id: 'schema-product', name: 'Product Schema', icon: Tag, description: 'E-commerce rich results', preview: '🛍️' },
    { id: 'schema-local', name: 'Local Business', icon: MapPin, description: 'Location & hours', preview: '📍' },
    { id: 'schema-faq', name: 'FAQ Schema', icon: BookOpen, description: 'Question dropdowns', preview: '❓' },
    { id: 'schema-breadcrumb', name: 'Breadcrumb Schema', icon: ChevronRight, description: 'Navigation path', preview: '›' },
    { id: 'schema-review', name: 'Review Schema', icon: Star, description: 'Star ratings', preview: '⭐' },
    { id: 'schema-event', name: 'Event Schema', icon: Clock, description: 'Event listings', preview: '📅' },
  ],
  'Technical SEO': [
    { id: 'sitemap-xml', name: 'XML Sitemap', icon: Map, description: 'Auto-generated sitemap', preview: '🗺️' },
    { id: 'robots-txt', name: 'Robots.txt', icon: Bot, description: 'Crawler instructions', preview: '🤖' },
    { id: 'redirects', name: '301 Redirects', icon: RefreshCw, description: 'URL redirections', preview: '↪️' },
    { id: 'hreflang', name: 'Hreflang Tags', icon: Languages, description: 'Multi-language SEO', preview: '🌍' },
    { id: 'lazy-load', name: 'Lazy Loading', icon: Zap, description: 'Image optimization', preview: '⚡' },
    { id: 'preload', name: 'Resource Preload', icon: Download, description: 'Critical resources', preview: '📥' },
  ],
  'Analytics & Tracking': [
    { id: 'ga4', name: 'Google Analytics 4', icon: BarChart3, description: 'Traffic analytics', preview: '📊' },
    { id: 'gtm', name: 'Google Tag Manager', icon: Tag, description: 'Tag management', preview: '🏷️' },
    { id: 'search-console', name: 'Search Console', icon: Search, description: 'Google verification', preview: '🔍' },
    { id: 'fb-pixel', name: 'Facebook Pixel', icon: Facebook, description: 'Meta conversion tracking', preview: '📘' },
    { id: 'hotjar', name: 'Hotjar', icon: MousePointerClick, description: 'Heatmaps & recordings', preview: '🔥' },
    { id: 'clarity', name: 'Microsoft Clarity', icon: Monitor, description: 'User behavior', preview: '💡' },
  ],
  'Performance': [
    { id: 'core-vitals', name: 'Core Web Vitals', icon: Gauge, description: 'LCP, FID, CLS metrics', preview: '📈' },
    { id: 'image-optimize', name: 'Image Optimization', icon: Image, description: 'WebP, compression', preview: '🖼️' },
    { id: 'minification', name: 'Minification', icon: FileCode, description: 'CSS/JS compression', preview: '📦' },
    { id: 'caching', name: 'Browser Caching', icon: Database, description: 'Cache headers', preview: '💾' },
    { id: 'cdn', name: 'CDN Setup', icon: Wifi, description: 'Content delivery', preview: '🌐' },
    { id: 'mobile-first', name: 'Mobile-First', icon: Smartphone, description: 'Responsive design', preview: '📱' },
  ],
};

const SEO_CHECKLIST = [
  { id: 'title', label: 'Page title is set', check: (seo: SEOData) => seo.title.length > 0, tip: 'Add a descriptive page title', category: 'basic' },
  { id: 'title-length', label: 'Title under 60 characters', check: (seo: SEOData) => seo.title.length > 0 && seo.title.length <= 60, tip: 'Keep title concise', category: 'basic' },
  { id: 'description', label: 'Meta description set', check: (seo: SEOData) => seo.description.length > 0, tip: 'Write a compelling description', category: 'basic' },
  { id: 'desc-length', label: 'Description 120-160 chars', check: (seo: SEOData) => seo.description.length >= 120 && seo.description.length <= 160, tip: 'Optimal length for SERPs', category: 'basic' },
  { id: 'keyword', label: 'Focus keyword set', check: (seo: SEOData) => seo.focusKeyword.length > 0, tip: 'Target a primary keyword', category: 'keywords' },
  { id: 'keyword-title', label: 'Keyword in title', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.title.toLowerCase().includes(seo.focusKeyword.toLowerCase()), tip: 'Include keyword in title', category: 'keywords' },
  { id: 'keyword-desc', label: 'Keyword in description', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.description.toLowerCase().includes(seo.focusKeyword.toLowerCase()), tip: 'Use keyword naturally', category: 'keywords' },
  { id: 'og', label: 'Open Graph tags set', check: (seo: SEOData) => seo.ogTitle.length > 0, tip: 'Configure social sharing', category: 'social' },
  { id: 'canonical', label: 'Canonical URL set', check: (seo: SEOData) => seo.canonicalUrl.length > 0, tip: 'Prevent duplicate content', category: 'technical' },
  { id: 'schema', label: 'Structured data added', check: (seo: SEOData) => seo.schemaData.length > 0, tip: 'Add schema markup', category: 'technical' },
  { id: 'analytics', label: 'Analytics configured', check: (seo: SEOData) => seo.googleAnalyticsId.length > 0, tip: 'Track performance', category: 'analytics' },
  { id: 'performance', label: 'Performance optimized', check: (seo: SEOData) => seo.lazyLoadImages && seo.minifyCSS, tip: 'Enable optimizations', category: 'performance' },
];

const generateSchema = (type: string, title: string, description: string, url: string): string => {
  const base: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title || 'My Website',
    description: description || 'Website description',
    url: url || 'https://example.com',
  };
  if (type === 'Article' || type === 'BlogPosting') {
    base.author = { '@type': 'Person', name: 'Author Name' };
    base.datePublished = new Date().toISOString().split('T')[0];
    base.publisher = { '@type': 'Organization', name: 'Publisher' };
  }
  if (type === 'Product') {
    base.offers = { '@type': 'Offer', price: '0.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' };
  }
  if (type === 'LocalBusiness') {
    base.address = { '@type': 'PostalAddress', streetAddress: '123 Main St', addressLocality: 'City', addressRegion: 'State', postalCode: '12345' };
    base.telephone = '+1-555-000-0000';
  }
  if (type === 'FAQPage') {
    base.mainEntity = [{ '@type': 'Question', name: 'Question 1?', acceptedAnswer: { '@type': 'Answer', text: 'Answer 1' } }];
  }
  return JSON.stringify(base, null, 2);
};

// ─── Score Circle Component ────────────────────────────────

const ScoreCircle = ({ score, size = 80 }: { score: number; size?: number }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? 'hsl(var(--success))' : score >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold" style={{ color }}>{score}</span>
        <span className="text-[8px] text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
};

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = true, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
          {badge !== undefined && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{badge}</Badge>}
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Component Card ────────────────────────────────────────

const ComponentCard = ({ component, onAdd }: { component: any; onAdd: () => void }) => (
  <button
    onClick={onAdd}
    className="w-full p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
  >
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-base shrink-0">
        {component.preview}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate group-hover:text-primary transition-colors">{component.name}</div>
        <div className="text-[9px] text-muted-foreground truncate">{component.description}</div>
      </div>
      <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
    </div>
  </button>
);

// ─── Main Component ────────────────────────────────────────

const AdvancedSEOPanel = ({ onClose }: { onClose: () => void }) => {
  const [seo, setSeo] = useState<SEOData>({
    title: '', description: '', keywords: '', author: '',
    ogTitle: '', ogDescription: '', ogImage: '', ogType: 'website', ogSiteName: '', ogLocale: 'en_US',
    twitterCard: 'summary_large_image', twitterSite: '', twitterCreator: '',
    canonicalUrl: '', noIndex: false, noFollow: false, noArchive: false,
    customHead: '', focusKeyword: '', secondaryKeywords: '', keywordDensityTarget: 2,
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
    schemaType: 'WebSite', schemaData: '', breadcrumbs: ['Home'], redirects: [], hreflang: [],
    lazyLoadImages: true, minifyCSS: true, minifyJS: true, preloadFonts: true,
    googleAnalyticsId: '', googleTagManagerId: '', facebookPixelId: '',
    sitemapEnabled: true, sitemapFrequency: 'weekly', sitemapPriority: '0.8',
    localBusinessName: '', localBusinessAddress: '', localBusinessPhone: '',
    productPrice: '', productCurrency: 'USD', productAvailability: 'InStock', productBrand: '',
    verificationGoogle: '', verificationBing: '',
  });

  const [activeTab, setActiveTab] = useState<'components' | 'meta' | 'social' | 'schema' | 'technical' | 'analytics' | 'audit'>('components');
  const [componentSearch, setComponentSearch] = useState('');

  const update = (key: keyof SEOData, value: any) => setSeo(prev => ({ ...prev, [key]: value }));

  const seoScore = Math.round((SEO_CHECKLIST.filter(c => c.check(seo)).length / SEO_CHECKLIST.length) * 100);
  const passedChecks = SEO_CHECKLIST.filter(c => c.check(seo)).length;

  const copySchema = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${seo.schemaData}\n</script>`);
    toast.success('Schema markup copied');
  };

  const addRedirect = () => {
    update('redirects', [...seo.redirects, { from: '', to: '', type: '301' }]);
  };

  const tabs = [
    { id: 'components' as const, label: 'Components', icon: Layers },
    { id: 'meta' as const, label: 'Meta', icon: FileText },
    { id: 'social' as const, label: 'Social', icon: Share2 },
    { id: 'schema' as const, label: 'Schema', icon: Code2 },
    { id: 'technical' as const, label: 'Technical', icon: Settings },
    { id: 'analytics' as const, label: 'Tracking', icon: BarChart3 },
    { id: 'audit' as const, label: 'Audit', icon: Gauge },
  ];

  const handleAddComponent = (component: any) => {
    toast.success(`Added ${component.name} to page`);
  };

  const getFilteredComponents = () => {
    if (!componentSearch) return SEO_COMPONENTS;
    const filtered: Record<string, typeof SEO_COMPONENTS[keyof typeof SEO_COMPONENTS]> = {};
    Object.entries(SEO_COMPONENTS).forEach(([category, components]) => {
      const matchingComponents = components.filter(c =>
        c.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matchingComponents.length > 0) {
        filtered[category] = matchingComponents;
      }
    });
    return filtered;
  };

  return (
    <div className="builder-flyout flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">SEO & Meta</h2>
            <p className="text-[10px] text-muted-foreground">Search optimization tools</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={seoScore >= 80 ? 'default' : 'secondary'} className={`text-[10px] ${seoScore >= 80 ? 'bg-success text-success-foreground' : seoScore >= 50 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'}`}>
            {seoScore}%
          </Badge>
          {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border shrink-0 scrollbar-none">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-2 text-[9px] font-medium transition-colors whitespace-nowrap ${
              activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════════ */}
        {/* COMPONENTS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'components' && (
          <div className="divide-y divide-border/30">
            {/* Search */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={componentSearch}
                  onChange={e => setComponentSearch(e.target.value)}
                  placeholder="Search SEO components..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <Section title="Quick Actions" icon={Zap}>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setActiveTab('audit')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-primary/10 transition-colors">
                  <Gauge className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Run Audit</span>
                </button>
                <button onClick={() => {
                  update('schemaData', generateSchema(seo.schemaType, seo.title, seo.description, seo.canonicalUrl));
                  toast.success('Schema generated');
                }} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-primary/10 transition-colors">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Generate Schema</span>
                </button>
              </div>
            </Section>

            {/* Component Categories */}
            {Object.entries(getFilteredComponents()).map(([category, components]) => (
              <Section key={category} title={category} icon={Layers} badge={components.length} defaultOpen={category === 'Meta Tags'}>
                <div className="space-y-1.5">
                  {components.map(component => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onAdd={() => handleAddComponent(component)}
                    />
                  ))}
                </div>
              </Section>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* META TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'meta' && (
          <div className="divide-y divide-border/30">
            <Section title="Basic Meta Tags" icon={FileText}>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Page Title</label>
                  <input
                    value={seo.title}
                    onChange={e => update('title', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="My Amazing Page"
                    maxLength={60}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-[9px] ${seo.title.length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {seo.title.length}/60 characters
                    </span>
                    {seo.title.length > 0 && seo.title.length <= 60 && <CheckCircle2 className="w-3 h-3 text-success" />}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Meta Description</label>
                  <textarea
                    value={seo.description}
                    onChange={e => update('description', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs resize-y min-h-[70px]"
                    placeholder="Describe your page for search engines..."
                    maxLength={160}
                    rows={3}
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-[9px] ${seo.description.length > 160 ? 'text-destructive' : seo.description.length >= 120 ? 'text-success' : 'text-muted-foreground'}`}>
                      {seo.description.length}/160 {seo.description.length >= 120 && seo.description.length <= 160 && '✓ Optimal'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Canonical URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={seo.canonicalUrl}
                      onChange={e => update('canonicalUrl', e.target.value)}
                      className="w-full bg-muted/30 border-0 rounded-md pl-8 pr-3 py-2 text-xs"
                      placeholder="https://example.com/page"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Author</label>
                  <input
                    value={seo.author}
                    onChange={e => update('author', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </Section>

            <Section title="Focus Keywords" icon={Target}>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Primary Keyword</label>
                  <div className="relative">
                    <Target className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={seo.focusKeyword}
                      onChange={e => update('focusKeyword', e.target.value)}
                      className="w-full bg-muted/30 border-0 rounded-md pl-8 pr-3 py-2 text-xs"
                      placeholder="e.g. web design agency"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Secondary Keywords</label>
                  <input
                    value={seo.secondaryKeywords}
                    onChange={e => update('secondaryKeywords', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                {/* Keyword Placement Check */}
                {seo.focusKeyword && (
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="text-[11px] font-medium mb-2">Keyword Placement</div>
                    <div className="space-y-2">
                      {[
                        { label: 'In Title', checked: seo.title.toLowerCase().includes(seo.focusKeyword.toLowerCase()) },
                        { label: 'In Description', checked: seo.description.toLowerCase().includes(seo.focusKeyword.toLowerCase()) },
                        { label: 'In URL', checked: seo.canonicalUrl.toLowerCase().includes(seo.focusKeyword.toLowerCase()) },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2 text-[10px]">
                          {item.checked ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                          <span className={item.checked ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>

            <Section title="Robots Directives" icon={Bot}>
              <div className="space-y-3">
                {[
                  { key: 'noIndex', label: 'No Index', description: 'Hide from search results' },
                  { key: 'noFollow', label: 'No Follow', description: 'Don\'t follow links' },
                  { key: 'noArchive', label: 'No Archive', description: 'Prevent cached versions' },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 cursor-pointer">
                    <div>
                      <div className="text-[11px] font-medium">{item.label}</div>
                      <div className="text-[9px] text-muted-foreground">{item.description}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={seo[item.key as keyof SEOData] as boolean}
                      onChange={e => update(item.key as keyof SEOData, e.target.checked)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Google Preview" icon={Eye}>
              <div className="rounded-lg p-4 bg-background border border-border">
                <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                  {seo.title || 'Page Title Goes Here'}
                </div>
                <div className="text-xs text-green-700 mt-0.5">
                  {seo.canonicalUrl || 'https://yoursite.com/page'}
                </div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {seo.description || 'Add a meta description to see how your page will appear in search results...'}
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* SOCIAL TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'social' && (
          <div className="divide-y divide-border/30">
            <Section title="Open Graph (Facebook/LinkedIn)" icon={Share2}>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">OG Title</label>
                  <input
                    value={seo.ogTitle}
                    onChange={e => update('ogTitle', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="Title for social sharing"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">OG Description</label>
                  <textarea
                    value={seo.ogDescription}
                    onChange={e => update('ogDescription', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs resize-y min-h-[60px]"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">OG Image URL</label>
                  <input
                    value={seo.ogImage}
                    onChange={e => update('ogImage', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-[9px] text-muted-foreground mt-1">Recommended: 1200×630px</p>
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">OG Type</label>
                  <select
                    value={seo.ogType}
                    onChange={e => update('ogType', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </Section>

            <Section title="Twitter Cards" icon={Twitter}>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Card Type</label>
                  <select
                    value={seo.twitterCard}
                    onChange={e => update('twitterCard', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Twitter @username</label>
                  <input
                    value={seo.twitterSite}
                    onChange={e => update('twitterSite', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>
            </Section>

            <Section title="Social Preview" icon={Eye}>
              <div className="space-y-3">
                {['Facebook', 'Twitter'].map(platform => (
                  <div key={platform} className="rounded-lg overflow-hidden border border-border">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground p-2 bg-muted/30">{platform} Preview</div>
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      {seo.ogImage ? (
                        <img src={seo.ogImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-10 h-10 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold">{seo.ogTitle || seo.title || 'Page Title'}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                        {seo.ogDescription || seo.description || 'Description'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* SCHEMA TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'schema' && (
          <div className="divide-y divide-border/30">
            <Section title="Schema Type" icon={Code2}>
              <div className="space-y-3">
                <select
                  value={seo.schemaType}
                  onChange={e => {
                    update('schemaType', e.target.value);
                    update('schemaData', generateSchema(e.target.value, seo.title, seo.description, seo.canonicalUrl));
                  }}
                  className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                >
                  {SCHEMA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <button
                  onClick={() => update('schemaData', generateSchema(seo.schemaType, seo.title, seo.description, seo.canonicalUrl))}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> Auto-generate Schema
                </button>
              </div>
            </Section>

            <Section title="JSON-LD Markup" icon={FileCode}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium">Schema Code</label>
                  <button onClick={copySchema} className="text-[10px] flex items-center gap-1 text-primary hover:underline">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <textarea
                  value={seo.schemaData}
                  onChange={e => update('schemaData', e.target.value)}
                  className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs font-mono resize-y min-h-[200px]"
                  rows={12}
                  placeholder="JSON-LD structured data..."
                />
              </div>
            </Section>

            <Section title="Breadcrumbs" icon={ChevronRight}>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1">
                  {seo.breadcrumbs.map((b, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <span className="text-muted-foreground">/</span>}
                      <input
                        value={b}
                        onChange={e => {
                          const updated = [...seo.breadcrumbs];
                          updated[i] = e.target.value;
                          update('breadcrumbs', updated);
                        }}
                        className="bg-muted/30 border-0 rounded px-2 py-1 text-[10px] w-20"
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => update('breadcrumbs', [...seo.breadcrumbs, 'Page'])}
                    className="text-[10px] px-2 py-1 rounded text-primary hover:bg-primary/10"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* TECHNICAL TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'technical' && (
          <div className="divide-y divide-border/30">
            <Section title="Robots.txt" icon={Bot}>
              <textarea
                value={seo.robotsTxt}
                onChange={e => update('robotsTxt', e.target.value)}
                className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs font-mono resize-y min-h-[120px]"
                rows={6}
              />
            </Section>

            <Section title="301 Redirects" icon={RefreshCw}>
              <div className="space-y-2">
                {seo.redirects.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={r.from}
                      onChange={e => {
                        const updated = [...seo.redirects];
                        updated[i].from = e.target.value;
                        update('redirects', updated);
                      }}
                      className="flex-1 bg-muted/30 border-0 rounded px-2 py-1.5 text-[10px]"
                      placeholder="/old-url"
                    />
                    <span className="text-muted-foreground">→</span>
                    <input
                      value={r.to}
                      onChange={e => {
                        const updated = [...seo.redirects];
                        updated[i].to = e.target.value;
                        update('redirects', updated);
                      }}
                      className="flex-1 bg-muted/30 border-0 rounded px-2 py-1.5 text-[10px]"
                      placeholder="/new-url"
                    />
                    <button
                      onClick={() => update('redirects', seo.redirects.filter((_, j) => j !== i))}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addRedirect}
                  className="w-full py-2 border border-dashed border-border rounded-md text-[10px] text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  + Add Redirect
                </button>
              </div>
            </Section>

            <Section title="Hreflang (Multi-language)" icon={Languages}>
              <div className="space-y-2">
                {seo.hreflang.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <select
                      value={h.lang}
                      onChange={e => {
                        const updated = [...seo.hreflang];
                        updated[i].lang = e.target.value;
                        update('hreflang', updated);
                      }}
                      className="bg-muted/30 border-0 rounded px-2 py-1.5 text-[10px] w-16"
                    >
                      {['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar'].map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    <input
                      value={h.url}
                      onChange={e => {
                        const updated = [...seo.hreflang];
                        updated[i].url = e.target.value;
                        update('hreflang', updated);
                      }}
                      className="flex-1 bg-muted/30 border-0 rounded px-2 py-1.5 text-[10px]"
                      placeholder="https://example.com/es/"
                    />
                  </div>
                ))}
                <button
                  onClick={() => update('hreflang', [...seo.hreflang, { lang: 'en', url: '' }])}
                  className="w-full py-2 border border-dashed border-border rounded-md text-[10px] text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  + Add Language
                </button>
              </div>
            </Section>

            <Section title="Performance Optimizations" icon={Zap}>
              <div className="space-y-2">
                {[
                  { key: 'lazyLoadImages', label: 'Lazy Load Images', icon: Image },
                  { key: 'minifyCSS', label: 'Minify CSS', icon: FileCode },
                  { key: 'minifyJS', label: 'Minify JavaScript', icon: FileCode },
                  { key: 'preloadFonts', label: 'Preload Fonts', icon: Type },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[11px]">{item.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={seo[item.key as keyof SEOData] as boolean}
                      onChange={e => update(item.key as keyof SEOData, e.target.checked)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Sitemap Settings" icon={Map}>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 cursor-pointer">
                  <span className="text-[11px]">Enable Sitemap</span>
                  <input
                    type="checkbox"
                    checked={seo.sitemapEnabled}
                    onChange={e => update('sitemapEnabled', e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                </label>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Update Frequency</label>
                  <select
                    value={seo.sitemapFrequency}
                    onChange={e => update('sitemapFrequency', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Priority (0.0-1.0)</label>
                  <input
                    value={seo.sitemapPriority}
                    onChange={e => update('sitemapPriority', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="0.8"
                  />
                </div>
              </div>
            </Section>

            <Section title="Custom Head Code" icon={Code2} defaultOpen={false}>
              <textarea
                value={seo.customHead}
                onChange={e => update('customHead', e.target.value)}
                className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs font-mono resize-y min-h-[100px]"
                rows={5}
                placeholder={'<!-- Analytics, fonts, etc -->\n<script src="..."></script>'}
              />
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* ANALYTICS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'analytics' && (
          <div className="divide-y divide-border/30">
            <Section title="Google Analytics" icon={BarChart3}>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">GA4 Measurement ID</label>
                  <input
                    value={seo.googleAnalyticsId}
                    onChange={e => update('googleAnalyticsId', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Google Tag Manager ID</label>
                  <input
                    value={seo.googleTagManagerId}
                    onChange={e => update('googleTagManagerId', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
              </div>
            </Section>

            <Section title="Meta (Facebook) Pixel" icon={Facebook}>
              <div>
                <label className="text-[11px] font-medium mb-1.5 block">Pixel ID</label>
                <input
                  value={seo.facebookPixelId}
                  onChange={e => update('facebookPixelId', e.target.value)}
                  className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                  placeholder="1234567890"
                />
              </div>
            </Section>

            <Section title="Search Console Verification" icon={Search}>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Google Verification</label>
                  <input
                    value={seo.verificationGoogle}
                    onChange={e => update('verificationGoogle', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="Verification code"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium mb-1.5 block">Bing Verification</label>
                  <input
                    value={seo.verificationBing}
                    onChange={e => update('verificationBing', e.target.value)}
                    className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    placeholder="Verification code"
                  />
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* AUDIT TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'audit' && (
          <div className="p-4 space-y-4">
            {/* Score Card */}
            <div className="p-6 rounded-xl text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <ScoreCircle score={seoScore} size={100} />
              <div className="mt-3 text-sm font-medium">{passedChecks}/{SEO_CHECKLIST.length} checks passed</div>
              <p className="text-[11px] text-muted-foreground mt-1">
                {seoScore >= 80 ? '🎉 Great job! Your SEO is well optimized.' : seoScore >= 50 ? '⚠️ Good start, but room for improvement.' : '🔧 Needs attention to rank better.'}
              </p>
            </div>

            {/* Checklist by Category */}
            {['basic', 'keywords', 'social', 'technical', 'analytics', 'performance'].map(category => {
              const items = SEO_CHECKLIST.filter(c => c.category === category);
              const passed = items.filter(c => c.check(seo)).length;
              return (
                <div key={category} className="rounded-lg border border-border/50 overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-muted/30">
                    <span className="text-xs font-medium capitalize">{category}</span>
                    <Badge variant="secondary" className="text-[9px]">{passed}/{items.length}</Badge>
                  </div>
                  <div className="p-2 space-y-1">
                    {items.map(item => {
                      const isPassed = item.check(seo);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-start gap-2 p-2 rounded-md ${isPassed ? 'bg-success/10' : 'bg-destructive/10'}`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium">{item.label}</div>
                            {!isPassed && <p className="text-[9px] text-muted-foreground mt-0.5">{item.tip}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Quick Fix Button */}
            <button
              onClick={() => toast.info('Auto-fix will optimize basic settings')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Auto-fix Common Issues
            </button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AdvancedSEOPanel;
