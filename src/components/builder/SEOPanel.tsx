import { useState } from 'react';
import {
  Search, X, Globe, Share2, Code2, FileText, Map, Shield, Zap, CheckCircle2, AlertCircle,
  ChevronDown, Copy, Eye, TrendingUp, BarChart3, Target, Link2, Image, Type, Hash,
  Smartphone, Monitor, Clock, Users, MousePointerClick, ExternalLink, RefreshCw,
  Lightbulb, Award, Gauge, ArrowUp, ArrowDown, Minus, Settings, Sparkles, BookOpen,
  Layout, Layers, PieChart, Activity, Bot, FileCode, Heading1, AlignLeft, List,
  CircleDot, Languages, Megaphone, Bell, Mail, Rss, Bookmark, Star, HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface SEOData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  customHead: string;
  focusKeyword: string;
  secondaryKeywords: string;
  robotsTxt: string;
  schemaType: string;
  schemaData: string;
  breadcrumbs: string[];
  redirects: { from: string; to: string; type: '301' | '302' }[];
  hreflang: { lang: string; url: string }[];
  // Performance
  lazyLoadImages: boolean;
  minifyCSS: boolean;
  minifyJS: boolean;
  preloadFonts: boolean;
  // Accessibility
  altTagsRequired: boolean;
  ariaLabels: boolean;
  skipLinks: boolean;
  // Analytics
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  // Sitemap
  sitemapEnabled: boolean;
  sitemapFrequency: string;
  sitemapPriority: string;
}

const SCHEMA_TYPES = [
  'WebSite', 'WebPage', 'Article', 'BlogPosting', 'Product', 'LocalBusiness',
  'Organization', 'Person', 'Event', 'FAQPage', 'HowTo', 'Recipe',
  'Review', 'Course', 'BreadcrumbList', 'VideoObject', 'SoftwareApplication',
  'Service', 'Restaurant', 'MedicalOrganization', 'EducationalOrganization',
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
    base.mainEntity = [
      { '@type': 'Question', name: 'Question 1?', acceptedAnswer: { '@type': 'Answer', text: 'Answer 1' } },
    ];
  }
  return JSON.stringify(base, null, 2);
};

const SEO_CHECKLIST = [
  { id: 'title', label: 'Page title is set', check: (seo: SEOData) => seo.title.length > 0, tip: 'Add a descriptive page title' },
  { id: 'title-length', label: 'Title under 60 characters', check: (seo: SEOData) => seo.title.length > 0 && seo.title.length <= 60, tip: 'Keep title concise for better display' },
  { id: 'description', label: 'Meta description set', check: (seo: SEOData) => seo.description.length > 0, tip: 'Write a compelling meta description' },
  { id: 'desc-length', label: 'Description 120-160 chars', check: (seo: SEOData) => seo.description.length >= 120 && seo.description.length <= 160, tip: 'Optimal length for search results' },
  { id: 'keyword', label: 'Focus keyword set', check: (seo: SEOData) => seo.focusKeyword.length > 0, tip: 'Target a primary keyword' },
  { id: 'keyword-title', label: 'Keyword in title', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.title.toLowerCase().includes(seo.focusKeyword.toLowerCase()), tip: 'Include focus keyword in title' },
  { id: 'keyword-desc', label: 'Keyword in description', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.description.toLowerCase().includes(seo.focusKeyword.toLowerCase()), tip: 'Use keyword naturally in description' },
  { id: 'og', label: 'Open Graph tags set', check: (seo: SEOData) => seo.ogTitle.length > 0, tip: 'Configure social sharing preview' },
  { id: 'canonical', label: 'Canonical URL set', check: (seo: SEOData) => seo.canonicalUrl.length > 0, tip: 'Prevent duplicate content issues' },
  { id: 'schema', label: 'Structured data added', check: (seo: SEOData) => seo.schemaData.length > 0, tip: 'Add schema markup for rich results' },
  { id: 'analytics', label: 'Analytics configured', check: (seo: SEOData) => seo.googleAnalyticsId.length > 0, tip: 'Track your page performance' },
  { id: 'performance', label: 'Performance optimized', check: (seo: SEOData) => seo.lazyLoadImages && seo.minifyCSS, tip: 'Enable lazy loading & minification' },
];

/* ── Score Circle Component ── */
const ScoreCircle = ({ score, size = 80 }: { score: number; size?: number }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? 'hsl(142.1 76.2% 36.3%)' : score >= 50 ? 'hsl(45 93% 47%)' : 'hsl(0 84.2% 60.2%)';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold" style={{ color }}>{score}</span>
        <span className="text-[8px] opacity-50">/ 100</span>
      </div>
    </div>
  );
};

/* ── Mini Stat Card ── */
const StatCard = ({ icon: Icon, label, value, trend, color }: { icon: any; label: string; value: string; trend?: 'up' | 'down' | 'neutral'; color?: string }) => (
  <div className="p-2.5 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `${color || 'hsl(var(--primary))'} / 0.1` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: color || 'hsl(var(--primary))' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] opacity-50 truncate">{label}</div>
        <div className="text-xs font-semibold flex items-center gap-1">
          {value}
          {trend === 'up' && <ArrowUp className="w-2.5 h-2.5 text-green-500" />}
          {trend === 'down' && <ArrowDown className="w-2.5 h-2.5 text-red-500" />}
          {trend === 'neutral' && <Minus className="w-2.5 h-2.5 opacity-30" />}
        </div>
      </div>
    </div>
  </div>
);

/* ── Keyword Density Bar ── */
const KeywordDensityBar = ({ keyword, density, status }: { keyword: string; density: number; status: 'good' | 'low' | 'high' }) => {
  const colors = { good: 'hsl(142.1 76.2% 36.3%)', low: 'hsl(45 93% 47%)', high: 'hsl(0 84.2% 60.2%)' };
  return (
    <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
      <Hash className="w-3 h-3 opacity-40" />
      <span className="text-[10px] font-medium flex-1 truncate">{keyword}</span>
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(density * 20, 100)}%`, background: colors[status] }} />
      </div>
      <span className="text-[9px] font-mono w-8 text-right">{density.toFixed(1)}%</span>
    </div>
  );
};

const SEOPanel = ({ onClose }: { onClose: () => void }) => {
  const [seo, setSeo] = useState<SEOData>({
    title: '', description: '', ogTitle: '', ogDescription: '', ogImage: '',
    twitterCard: 'summary_large_image', twitterSite: '',
    canonicalUrl: '', noIndex: false, noFollow: false, customHead: '', focusKeyword: '',
    secondaryKeywords: '', robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
    schemaType: 'WebSite', schemaData: '', breadcrumbs: ['Home'],
    redirects: [], hreflang: [],
    lazyLoadImages: true, minifyCSS: true, minifyJS: true, preloadFonts: true,
    altTagsRequired: true, ariaLabels: true, skipLinks: false,
    googleAnalyticsId: '', googleTagManagerId: '', facebookPixelId: '',
    sitemapEnabled: true, sitemapFrequency: 'weekly', sitemapPriority: '0.8',
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'meta' | 'social' | 'schema' | 'technical' | 'performance' | 'analytics'>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const update = (key: keyof SEOData, value: any) => setSeo(prev => ({ ...prev, [key]: value }));

  const seoScore = Math.round((SEO_CHECKLIST.filter(c => c.check(seo)).length / SEO_CHECKLIST.length) * 100);
  const passedChecks = SEO_CHECKLIST.filter(c => c.check(seo)).length;

  const copySchema = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${seo.schemaData}\n</script>`);
    toast.success('Schema markup copied');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: PieChart },
    { id: 'keywords' as const, label: 'Keywords', icon: Target },
    { id: 'meta' as const, label: 'Meta', icon: FileText },
    { id: 'social' as const, label: 'Social', icon: Share2 },
    { id: 'schema' as const, label: 'Schema', icon: Code2 },
    { id: 'technical' as const, label: 'Technical', icon: Settings },
    { id: 'performance' as const, label: 'Speed', icon: Zap },
    { id: 'analytics' as const, label: 'Tracking', icon: BarChart3 },
  ];

  const toggleSection = (id: string) => setExpandedSection(expandedSection === id ? null : id);

  return (
    <div className="builder-flyout overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">SEO & Meta</h2>
          <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${seoScore >= 80 ? 'bg-green-500/10 text-green-500' : seoScore >= 50 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
            {seoScore}%
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Tabs - Scrollable */}
      <div className="flex overflow-x-auto border-b scrollbar-none" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-2 text-[9px] font-medium transition-colors whitespace-nowrap ${activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'}`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      {/* ══════════════ OVERVIEW TAB ══════════════ */}
      {activeTab === 'overview' && (
        <div className="p-3 space-y-3">
          {/* Score Card */}
          <div className="p-4 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(280 70% 55% / 0.08))' }}>
            <ScoreCircle score={seoScore} size={90} />
            <div className="mt-2 text-xs font-medium">{passedChecks}/{SEO_CHECKLIST.length} checks passed</div>
            <p className="text-[10px] opacity-50 mt-1">
              {seoScore >= 80 ? '🎉 Great job! Your SEO is well optimized.' : seoScore >= 50 ? '⚠️ Good start, but room for improvement.' : '🔧 Needs attention to rank better.'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard icon={Type} label="Title Length" value={`${seo.title.length}/60`} trend={seo.title.length <= 60 && seo.title.length > 0 ? 'up' : 'down'} />
            <StatCard icon={AlignLeft} label="Description" value={`${seo.description.length}/160`} trend={seo.description.length >= 120 && seo.description.length <= 160 ? 'up' : 'neutral'} />
            <StatCard icon={Target} label="Keywords" value={seo.focusKeyword ? '1+' : '0'} trend={seo.focusKeyword ? 'up' : 'down'} />
            <StatCard icon={Link2} label="Links" value="Canonical" trend={seo.canonicalUrl ? 'up' : 'neutral'} />
          </div>

          {/* SEO Checklist */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <button onClick={() => toggleSection('checklist')} className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-xs font-medium">SEO Checklist</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'checklist' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'checklist' && (
              <div className="px-3 pb-3 space-y-1.5">
                {SEO_CHECKLIST.map(item => {
                  const passed = item.check(seo);
                  return (
                    <div key={item.id} className="flex items-start gap-2 p-2 rounded-md text-[10px]" style={{ background: passed ? 'hsl(142.1 76.2% 36.3% / 0.08)' : 'hsl(0 84.2% 60.2% / 0.08)' }}>
                      {passed ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> : <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        {!passed && <p className="opacity-50 mt-0.5">{item.tip}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setActiveTab('keywords')} className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-[10px] font-medium transition-colors hover:bg-muted/50" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Target className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Optimize Keywords
            </button>
            <button onClick={() => setActiveTab('schema')} className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-[10px] font-medium transition-colors hover:bg-muted/50" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Add Rich Snippets
            </button>
          </div>

          {/* Content Recommendations */}
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-3.5 h-3.5" style={{ color: 'hsl(45 93% 47%)' }} />
              <span className="text-[11px] font-semibold">Content Tips</span>
            </div>
            <ul className="space-y-1.5 text-[10px] opacity-70">
              <li className="flex items-start gap-1.5"><CircleDot className="w-2.5 h-2.5 mt-0.5 shrink-0" />Use H1 heading with focus keyword</li>
              <li className="flex items-start gap-1.5"><CircleDot className="w-2.5 h-2.5 mt-0.5 shrink-0" />Add 2-3 internal links to relevant pages</li>
              <li className="flex items-start gap-1.5"><CircleDot className="w-2.5 h-2.5 mt-0.5 shrink-0" />Include images with descriptive alt text</li>
              <li className="flex items-start gap-1.5"><CircleDot className="w-2.5 h-2.5 mt-0.5 shrink-0" />Aim for 300+ words of quality content</li>
            </ul>
          </div>
        </div>
      )}

      {/* ══════════════ KEYWORDS TAB ══════════════ */}
      {activeTab === 'keywords' && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Focus Keyword</label>
            <div className="relative">
              <Target className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
              <input value={seo.focusKeyword} onChange={e => update('focusKeyword', e.target.value)}
                className="property-input pl-8 text-xs" placeholder="e.g. web design agency" />
            </div>
            <p className="text-[9px] opacity-40 mt-1">The main keyword you want to rank for</p>
          </div>

          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Secondary Keywords</label>
            <input value={seo.secondaryKeywords} onChange={e => update('secondaryKeywords', e.target.value)}
              className="property-input text-xs" placeholder="keyword1, keyword2, keyword3" />
            <p className="text-[9px] opacity-40 mt-1">Comma-separated related keywords</p>
          </div>

          {/* Keyword Analysis */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-3 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Activity className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-[11px] font-semibold">Keyword Analysis</span>
            </div>
            <div className="p-2 space-y-1.5">
              {seo.focusKeyword && (
                <KeywordDensityBar keyword={seo.focusKeyword} density={2.1} status="good" />
              )}
              {seo.secondaryKeywords.split(',').filter(k => k.trim()).slice(0, 3).map((kw, i) => (
                <KeywordDensityBar key={i} keyword={kw.trim()} density={[1.2, 0.8, 0.5][i]} status={['good', 'low', 'low'][i] as any} />
              ))}
              {!seo.focusKeyword && (
                <div className="text-center py-4 text-[10px] opacity-40">
                  <Target className="w-6 h-6 mx-auto mb-1 opacity-30" />
                  Add a focus keyword to analyze
                </div>
              )}
            </div>
          </div>

          {/* Keyword Placement */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Keyword Placement
            </div>
            <div className="space-y-2">
              {[
                { label: 'Page Title', checked: seo.focusKeyword && seo.title.toLowerCase().includes(seo.focusKeyword.toLowerCase()), icon: Heading1 },
                { label: 'Meta Description', checked: seo.focusKeyword && seo.description.toLowerCase().includes(seo.focusKeyword.toLowerCase()), icon: AlignLeft },
                { label: 'URL / Slug', checked: false, icon: Link2 },
                { label: 'First Paragraph', checked: false, icon: FileText },
                { label: 'Headings (H2-H6)', checked: false, icon: List },
                { label: 'Image Alt Text', checked: false, icon: Image },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-[10px]">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.checked ? 'bg-green-500/20' : 'bg-muted'}`}>
                    {item.checked ? <CheckCircle2 className="w-2.5 h-2.5 text-green-500" /> : <item.icon className="w-2.5 h-2.5 opacity-30" />}
                  </div>
                  <span className={item.checked ? 'opacity-100' : 'opacity-50'}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Suggestions */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Related Keywords
            </div>
            <div className="flex flex-wrap gap-1">
              {['best practices', 'tips', 'guide', 'how to', 'examples', 'tutorial', '2024'].map(kw => (
                <button key={kw} className="px-2 py-1 rounded-full text-[9px] font-medium transition-colors hover:opacity-80"
                  style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}
                  onClick={() => update('secondaryKeywords', seo.secondaryKeywords ? `${seo.secondaryKeywords}, ${kw}` : kw)}>
                  + {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ META TAB ══════════════ */}
      {activeTab === 'meta' && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Page Title</label>
            <input value={seo.title} onChange={e => update('title', e.target.value)}
              className="property-input text-xs" placeholder="My Amazing Page" maxLength={60} />
            <div className="flex justify-between mt-1">
              <span className={`text-[9px] ${seo.title.length > 60 ? 'text-red-500' : 'opacity-40'}`}>{seo.title.length}/60 characters</span>
              {seo.title.length > 0 && seo.title.length <= 60 && <CheckCircle2 className="w-3 h-3 text-green-500" />}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Meta Description</label>
            <textarea value={seo.description} onChange={e => update('description', e.target.value)}
              className="property-input text-xs resize-y min-h-[70px]" placeholder="Describe your page for search engines..." maxLength={160} rows={3} />
            <div className="flex justify-between mt-1">
              <span className={`text-[9px] ${seo.description.length > 160 ? 'text-red-500' : seo.description.length >= 120 ? 'text-green-500' : 'opacity-40'}`}>
                {seo.description.length}/160 characters {seo.description.length >= 120 && seo.description.length <= 160 && '✓ Optimal'}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Canonical URL</label>
            <div className="relative">
              <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
              <input value={seo.canonicalUrl} onChange={e => update('canonicalUrl', e.target.value)}
                className="property-input pl-8 text-xs" placeholder="https://example.com/page" />
            </div>
          </div>

          {/* Robots Directives */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Search Engine Directives
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={seo.noIndex} onChange={e => update('noIndex', e.target.checked)}
                  className="w-3.5 h-3.5 rounded" style={{ accentColor: 'hsl(var(--primary))' }} />
                <div>
                  <span className="text-[10px] font-medium">noindex</span>
                  <p className="text-[9px] opacity-50">Hide from search results</p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={seo.noFollow} onChange={e => update('noFollow', e.target.checked)}
                  className="w-3.5 h-3.5 rounded" style={{ accentColor: 'hsl(var(--primary))' }} />
                <div>
                  <span className="text-[10px] font-medium">nofollow</span>
                  <p className="text-[9px] opacity-50">Don't follow links on this page</p>
                </div>
              </label>
            </div>
          </div>

          {/* Google Preview */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Globe className="w-3.5 h-3.5 opacity-50" />
              <span className="text-[10px] font-medium">Google Search Preview</span>
            </div>
            <div className="p-3" style={{ background: '#fff' }}>
              <div className="text-[13px] font-medium" style={{ color: '#1a0dab' }}>
                {seo.title || 'Page Title - Your Website'}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: '#006621' }}>
                {seo.canonicalUrl || 'https://yoursite.com › page'}
              </div>
              <div className="text-[11px] mt-1 line-clamp-2" style={{ color: '#545454' }}>
                {seo.description || 'Add a meta description to help search engines understand your page content and improve click-through rates.'}
              </div>
            </div>
          </div>

          {/* Mobile Preview Toggle */}
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <Monitor className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[10px] flex-1">Preview Mode</span>
            <button className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>Desktop</button>
            <button className="px-2 py-0.5 rounded text-[9px] font-medium opacity-50 hover:opacity-80">Mobile</button>
          </div>
        </div>
      )}

      {/* ══════════════ SOCIAL TAB ══════════════ */}
      {activeTab === 'social' && (
        <div className="p-3 space-y-3">
          {/* Open Graph */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Share2 className="w-3.5 h-3.5" style={{ color: '#1877f2' }} />
              <span className="text-[11px] font-semibold">Open Graph (Facebook, LinkedIn)</span>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">OG Title</label>
                <input value={seo.ogTitle} onChange={e => update('ogTitle', e.target.value)}
                  className="property-input text-xs" placeholder={seo.title || 'Title for social sharing'} />
              </div>
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">OG Description</label>
                <textarea value={seo.ogDescription} onChange={e => update('ogDescription', e.target.value)}
                  className="property-input text-xs resize-none" rows={2} placeholder={seo.description || 'Description for social sharing'} />
              </div>
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">OG Image (1200×630 recommended)</label>
                <input value={seo.ogImage} onChange={e => update('ogImage', e.target.value)}
                  className="property-input text-xs" placeholder="https://example.com/image.jpg" />
              </div>
              {/* Facebook Preview */}
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
                <div className="aspect-[1.91/1] flex items-center justify-center" style={{ background: '#f0f2f5' }}>
                  {seo.ogImage ? <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover" /> : <Image className="w-8 h-8 opacity-20" />}
                </div>
                <div className="p-2" style={{ background: '#fff' }}>
                  <div className="text-[9px] uppercase opacity-40">yoursite.com</div>
                  <div className="text-[11px] font-semibold mt-0.5" style={{ color: '#1c1e21' }}>{seo.ogTitle || seo.title || 'Page Title'}</div>
                  <div className="text-[10px] opacity-60 line-clamp-1">{seo.ogDescription || seo.description || 'Description'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[10px]" style={{ color: '#000' }}>𝕏</span>
              <span className="text-[11px] font-semibold">Twitter / X Card</span>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">Card Type</label>
                <select value={seo.twitterCard} onChange={e => update('twitterCard', e.target.value)}
                  className="property-input text-xs">
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary with Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">Twitter @username</label>
                <input value={seo.twitterSite} onChange={e => update('twitterSite', e.target.value)}
                  className="property-input text-xs" placeholder="@yourusername" />
              </div>
              {/* Twitter Preview */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #cfd9de' }}>
                <div className={`${seo.twitterCard === 'summary_large_image' ? 'aspect-[2/1]' : 'h-20'} flex items-center justify-center`} style={{ background: '#f7f9fa' }}>
                  {seo.ogImage ? <img src={seo.ogImage} alt="Twitter" className="w-full h-full object-cover" /> : <Image className="w-6 h-6 opacity-20" />}
                </div>
                <div className="p-2.5" style={{ background: '#fff' }}>
                  <div className="text-[11px] font-semibold">{seo.ogTitle || seo.title || 'Page Title'}</div>
                  <div className="text-[10px] opacity-60 line-clamp-2 mt-0.5">{seo.ogDescription || seo.description || 'Description'}</div>
                  <div className="text-[9px] opacity-40 mt-1 flex items-center gap-1"><Link2 className="w-2.5 h-2.5" />yoursite.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Platforms */}
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2">Other Platforms</div>
            <div className="flex flex-wrap gap-1">
              {['Pinterest', 'Slack', 'Discord', 'Telegram', 'WhatsApp'].map(platform => (
                <span key={platform} className="px-2 py-1 rounded text-[9px] font-medium flex items-center gap-1" style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                  <CheckCircle2 className="w-2.5 h-2.5 text-green-500" /> {platform}
                </span>
              ))}
            </div>
            <p className="text-[9px] opacity-40 mt-2">Open Graph tags are used by most platforms</p>
          </div>
        </div>
      )}

      {/* ══════════════ SCHEMA TAB ══════════════ */}
      {activeTab === 'schema' && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[11px] font-medium mb-1.5 block">Schema Type</label>
            <select value={seo.schemaType} onChange={e => {
              update('schemaType', e.target.value);
              update('schemaData', generateSchema(e.target.value, seo.title, seo.description, seo.canonicalUrl));
            }} className="property-input text-xs">
              {SCHEMA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Schema Templates */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Quick Templates
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { type: 'Article', icon: FileText },
                { type: 'Product', icon: Award },
                { type: 'LocalBusiness', icon: Map },
                { type: 'FAQPage', icon: HelpCircle },
                { type: 'Organization', icon: Users },
                { type: 'Event', icon: Clock },
              ].map(({ type, icon: Icon }) => (
                <button key={type} onClick={() => {
                  update('schemaType', type);
                  update('schemaData', generateSchema(type, seo.title, seo.description, seo.canonicalUrl));
                }} className="flex items-center gap-1.5 p-2 rounded text-[10px] font-medium text-left transition-colors hover:bg-muted/50"
                  style={seo.schemaType === type ? { background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' } : undefined}>
                  <Icon className="w-3 h-3" /> {type}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => update('schemaData', generateSchema(seo.schemaType, seo.title, seo.description, seo.canonicalUrl))}
            className="w-full py-2 rounded text-[10px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
            <Sparkles className="w-3.5 h-3.5" /> Auto-generate Schema
          </button>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium">JSON-LD Markup</label>
              <button onClick={copySchema} className="text-[9px] flex items-center gap-1 font-medium hover:opacity-70" style={{ color: 'hsl(var(--primary))' }}>
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <textarea value={seo.schemaData} onChange={e => update('schemaData', e.target.value)}
              className="property-input font-mono text-[9px] resize-y min-h-[180px]" rows={10}
              placeholder="JSON-LD structured data..." />
          </div>

          {/* Breadcrumbs */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" style={{ color: 'hsl(var(--primary))' }} />
              Breadcrumb Trail
            </div>
            <div className="flex flex-wrap items-center gap-1 mb-2">
              {seo.breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="opacity-30 text-[10px]">/</span>}
                  <input value={b} onChange={e => {
                    const updated = [...seo.breadcrumbs]; updated[i] = e.target.value; update('breadcrumbs', updated);
                  }} className="property-input w-16 text-[9px] py-0.5 text-center" />
                </span>
              ))}
              <button onClick={() => update('breadcrumbs', [...seo.breadcrumbs, 'Page'])}
                className="text-[9px] px-2 py-0.5 rounded font-medium hover:bg-muted" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
          </div>

          {/* Schema Validation */}
          <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded text-[10px] font-medium transition-colors hover:bg-muted"
            style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <ExternalLink className="w-3 h-3" /> Validate Schema
          </a>
        </div>
      )}

      {/* ══════════════ TECHNICAL TAB ══════════════ */}
      {activeTab === 'technical' && (
        <div className="p-3 space-y-3">
          {/* Sitemap */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Map className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-[11px] font-semibold">Sitemap Settings</span>
            </div>
            <div className="p-3 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[10px]">Include in Sitemap</span>
                <input type="checkbox" checked={seo.sitemapEnabled} onChange={e => update('sitemapEnabled', e.target.checked)}
                  className="w-4 h-4 rounded" style={{ accentColor: 'hsl(var(--primary))' }} />
              </label>
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">Change Frequency</label>
                <select value={seo.sitemapFrequency} onChange={e => update('sitemapFrequency', e.target.value)}
                  className="property-input text-xs">
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] opacity-60 mb-1 block">Priority (0.0 - 1.0)</label>
                <input type="text" value={seo.sitemapPriority} onChange={e => update('sitemapPriority', e.target.value)}
                  className="property-input text-xs" placeholder="0.8" />
              </div>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Bot className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-[11px] font-semibold">robots.txt</span>
            </div>
            <div className="p-3">
              <textarea value={seo.robotsTxt} onChange={e => update('robotsTxt', e.target.value)}
                className="property-input font-mono text-[9px] resize-y min-h-[100px]" rows={6} />
            </div>
          </div>

          {/* Redirects */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center justify-between" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-[11px] font-semibold">Redirects</span>
              </div>
              <button onClick={() => update('redirects', [...seo.redirects, { from: '', to: '', type: '301' }])}
                className="text-[9px] font-medium" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
            <div className="p-3 space-y-2">
              {seo.redirects.length === 0 && (
                <p className="text-[10px] opacity-40 text-center py-2">No redirects configured</p>
              )}
              {seo.redirects.map((r, i) => (
                <div key={i} className="flex items-center gap-1">
                  <input value={r.from} onChange={e => {
                    const updated = [...seo.redirects]; updated[i].from = e.target.value; update('redirects', updated);
                  }} className="property-input flex-1 text-[9px]" placeholder="/old-url" />
                  <span className="text-[10px] opacity-30">→</span>
                  <input value={r.to} onChange={e => {
                    const updated = [...seo.redirects]; updated[i].to = e.target.value; update('redirects', updated);
                  }} className="property-input flex-1 text-[9px]" placeholder="/new-url" />
                  <select value={r.type} onChange={e => {
                    const updated = [...seo.redirects]; updated[i].type = e.target.value as '301' | '302'; update('redirects', updated);
                  }} className="property-input text-[9px] w-12 py-0.5">
                    <option value="301">301</option>
                    <option value="302">302</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Hreflang */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center justify-between" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center gap-2">
                <Languages className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-[11px] font-semibold">Hreflang (Multi-language)</span>
              </div>
              <button onClick={() => update('hreflang', [...seo.hreflang, { lang: 'en', url: '' }])}
                className="text-[9px] font-medium" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
            <div className="p-3 space-y-2">
              {seo.hreflang.length === 0 && (
                <p className="text-[10px] opacity-40 text-center py-2">No alternate languages configured</p>
              )}
              {seo.hreflang.map((h, i) => (
                <div key={i} className="flex items-center gap-1">
                  <select value={h.lang} onChange={e => {
                    const updated = [...seo.hreflang]; updated[i].lang = e.target.value; update('hreflang', updated);
                  }} className="property-input text-[9px] w-14 py-0.5">
                    {['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru', 'nl', 'sv', 'pl'].map(l => (
                      <option key={l} value={l}>{l.toUpperCase()}</option>
                    ))}
                  </select>
                  <input value={h.url} onChange={e => {
                    const updated = [...seo.hreflang]; updated[i].url = e.target.value; update('hreflang', updated);
                  }} className="property-input flex-1 text-[9px]" placeholder="https://example.com/es/" />
                </div>
              ))}
            </div>
          </div>

          {/* Custom Head */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Code2 className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-[11px] font-semibold">Custom &lt;head&gt; Code</span>
            </div>
            <div className="p-3">
              <textarea value={seo.customHead} onChange={e => update('customHead', e.target.value)}
                className="property-input font-mono text-[9px] resize-y min-h-[100px]" rows={5}
                placeholder={'<!-- Custom scripts, styles, meta tags -->\n<link rel="preconnect" href="...">\n<script src="..."></script>'} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PERFORMANCE TAB ══════════════ */}
      {activeTab === 'performance' && (
        <div className="p-3 space-y-3">
          {/* Performance Score */}
          <div className="p-4 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, hsl(142.1 76.2% 36.3% / 0.1), hsl(200 80% 50% / 0.1))' }}>
            <Gauge className="w-10 h-10 mx-auto mb-2" style={{ color: 'hsl(142.1 76.2% 36.3%)' }} />
            <div className="text-2xl font-bold" style={{ color: 'hsl(142.1 76.2% 36.3%)' }}>92</div>
            <div className="text-[10px] opacity-60">Estimated Performance Score</div>
          </div>

          {/* Core Web Vitals */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Activity className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-[11px] font-semibold">Core Web Vitals</span>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: 'LCP (Largest Contentful Paint)', value: '1.2s', status: 'good' },
                { label: 'FID (First Input Delay)', value: '45ms', status: 'good' },
                { label: 'CLS (Cumulative Layout Shift)', value: '0.05', status: 'good' },
                { label: 'TTFB (Time to First Byte)', value: '320ms', status: 'needs-improvement' },
              ].map(metric => (
                <div key={metric.label} className="flex items-center justify-between p-2 rounded" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                  <span className="text-[10px]">{metric.label}</span>
                  <span className={`text-[10px] font-semibold ${metric.status === 'good' ? 'text-green-500' : 'text-yellow-500'}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Toggles */}
          <div className="rounded-lg p-3 space-y-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Optimizations
            </div>
            {[
              { key: 'lazyLoadImages', label: 'Lazy Load Images', desc: 'Load images as they enter viewport' },
              { key: 'minifyCSS', label: 'Minify CSS', desc: 'Remove whitespace from CSS files' },
              { key: 'minifyJS', label: 'Minify JavaScript', desc: 'Remove whitespace from JS files' },
              { key: 'preloadFonts', label: 'Preload Fonts', desc: 'Preload critical web fonts' },
            ].map(opt => (
              <label key={opt.key} className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={(seo as any)[opt.key]} onChange={e => update(opt.key as keyof SEOData, e.target.checked)}
                  className="w-4 h-4 rounded mt-0.5" style={{ accentColor: 'hsl(var(--primary))' }} />
                <div>
                  <div className="text-[10px] font-medium">{opt.label}</div>
                  <p className="text-[9px] opacity-50">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Image Optimization Tips */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Image Best Practices
            </div>
            <ul className="space-y-1.5 text-[10px] opacity-70">
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-2.5 h-2.5 text-green-500 mt-0.5" />Use WebP or AVIF formats</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-2.5 h-2.5 text-green-500 mt-0.5" />Specify width and height attributes</li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-2.5 h-2.5 text-green-500 mt-0.5" />Use responsive images with srcset</li>
              <li className="flex items-start gap-1.5"><AlertCircle className="w-2.5 h-2.5 text-yellow-500 mt-0.5" />Compress images before uploading</li>
            </ul>
          </div>

          {/* Accessibility */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Accessibility (a11y)
            </div>
            <div className="space-y-2">
              {[
                { key: 'altTagsRequired', label: 'Require Alt Tags', desc: 'Warn when images lack alt text' },
                { key: 'ariaLabels', label: 'ARIA Labels', desc: 'Add ARIA labels to interactive elements' },
                { key: 'skipLinks', label: 'Skip Links', desc: 'Add skip-to-content links' },
              ].map(opt => (
                <label key={opt.key} className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-[10px] font-medium">{opt.label}</div>
                    <p className="text-[9px] opacity-50">{opt.desc}</p>
                  </div>
                  <input type="checkbox" checked={(seo as any)[opt.key]} onChange={e => update(opt.key as keyof SEOData, e.target.checked)}
                    className="w-4 h-4 rounded" style={{ accentColor: 'hsl(var(--primary))' }} />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ ANALYTICS TAB ══════════════ */}
      {activeTab === 'analytics' && (
        <div className="p-3 space-y-3">
          {/* Google Analytics */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <BarChart3 className="w-3.5 h-3.5" style={{ color: '#F9AB00' }} />
              <span className="text-[11px] font-semibold">Google Analytics 4</span>
            </div>
            <div className="p-3">
              <label className="text-[10px] opacity-60 mb-1 block">Measurement ID</label>
              <input value={seo.googleAnalyticsId} onChange={e => update('googleAnalyticsId', e.target.value)}
                className="property-input text-xs font-mono" placeholder="G-XXXXXXXXXX" />
              <p className="text-[9px] opacity-40 mt-1">Find this in Google Analytics → Admin → Data Streams</p>
            </div>
          </div>

          {/* Google Tag Manager */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Settings className="w-3.5 h-3.5" style={{ color: '#4285F4' }} />
              <span className="text-[11px] font-semibold">Google Tag Manager</span>
            </div>
            <div className="p-3">
              <label className="text-[10px] opacity-60 mb-1 block">Container ID</label>
              <input value={seo.googleTagManagerId} onChange={e => update('googleTagManagerId', e.target.value)}
                className="property-input text-xs font-mono" placeholder="GTM-XXXXXXX" />
            </div>
          </div>

          {/* Facebook Pixel */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="p-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <Share2 className="w-3.5 h-3.5" style={{ color: '#1877F2' }} />
              <span className="text-[11px] font-semibold">Meta (Facebook) Pixel</span>
            </div>
            <div className="p-3">
              <label className="text-[10px] opacity-60 mb-1 block">Pixel ID</label>
              <input value={seo.facebookPixelId} onChange={e => update('facebookPixelId', e.target.value)}
                className="property-input text-xs font-mono" placeholder="XXXXXXXXXXXXXXXX" />
            </div>
          </div>

          {/* Other Integrations */}
          <div className="rounded-lg p-3" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[11px] font-semibold mb-2">More Integrations</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { name: 'Hotjar', icon: MousePointerClick },
                { name: 'Mixpanel', icon: PieChart },
                { name: 'Segment', icon: Layers },
                { name: 'Amplitude', icon: TrendingUp },
                { name: 'Plausible', icon: Shield },
                { name: 'Fathom', icon: Eye },
              ].map(({ name, icon: Icon }) => (
                <button key={name} className="flex items-center gap-1.5 p-2 rounded text-[10px] font-medium text-left transition-colors hover:bg-muted/50"
                  style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
                  <Icon className="w-3 h-3 opacity-50" /> {name}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Codes */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <button onClick={() => toggleSection('verification')} className="w-full p-2.5 flex items-center justify-between" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-[11px] font-semibold">Site Verification</span>
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform ${expandedSection === 'verification' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'verification' && (
              <div className="p-3 space-y-3">
                {[
                  { name: 'Google Search Console', placeholder: 'google-site-verification=...' },
                  { name: 'Bing Webmaster', placeholder: 'msvalidate.01=...' },
                  { name: 'Pinterest', placeholder: 'p:domain_verify=...' },
                  { name: 'Yandex', placeholder: 'yandex-verification=...' },
                ].map(site => (
                  <div key={site.name}>
                    <label className="text-[10px] opacity-60 mb-1 block">{site.name}</label>
                    <input className="property-input text-[9px] font-mono" placeholder={site.placeholder} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOPanel;
