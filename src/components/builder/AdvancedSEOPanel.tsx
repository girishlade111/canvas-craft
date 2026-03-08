import { useState } from 'react';
import { Search, X, Globe, Share2, Code2, FileText, Map, Shield, Zap, CheckCircle2, AlertCircle, ChevronDown, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface SEOData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  customHead: string;
  // Advanced
  focusKeyword: string;
  secondaryKeywords: string;
  robotsTxt: string;
  schemaType: string;
  schemaData: string;
  breadcrumbs: string[];
  redirects: { from: string; to: string; type: '301' | '302' }[];
  hreflang: { lang: string; url: string }[];
}

const SCHEMA_TYPES = [
  'WebSite', 'WebPage', 'Article', 'BlogPosting', 'Product', 'LocalBusiness',
  'Organization', 'Person', 'Event', 'FAQPage', 'HowTo', 'Recipe',
  'Review', 'Course', 'BreadcrumbList', 'VideoObject',
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
  { id: 'title', label: 'Page title is set', check: (seo: SEOData) => seo.title.length > 0 },
  { id: 'title-length', label: 'Title is under 60 characters', check: (seo: SEOData) => seo.title.length > 0 && seo.title.length <= 60 },
  { id: 'description', label: 'Meta description is set', check: (seo: SEOData) => seo.description.length > 0 },
  { id: 'desc-length', label: 'Description is 120-160 chars', check: (seo: SEOData) => seo.description.length >= 120 && seo.description.length <= 160 },
  { id: 'keyword', label: 'Focus keyword is set', check: (seo: SEOData) => seo.focusKeyword.length > 0 },
  { id: 'keyword-title', label: 'Keyword appears in title', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.title.toLowerCase().includes(seo.focusKeyword.toLowerCase()) },
  { id: 'keyword-desc', label: 'Keyword appears in description', check: (seo: SEOData) => seo.focusKeyword.length > 0 && seo.description.toLowerCase().includes(seo.focusKeyword.toLowerCase()) },
  { id: 'og', label: 'Open Graph tags are set', check: (seo: SEOData) => seo.ogTitle.length > 0 },
  { id: 'canonical', label: 'Canonical URL is set', check: (seo: SEOData) => seo.canonicalUrl.length > 0 },
  { id: 'schema', label: 'Structured data is added', check: (seo: SEOData) => seo.schemaData.length > 0 },
];

const AdvancedSEOPanel = ({ onClose }: { onClose: () => void }) => {
  const [seo, setSeo] = useState<SEOData>({
    title: '', description: '', ogTitle: '', ogDescription: '', ogImage: '',
    canonicalUrl: '', noIndex: false, customHead: '', focusKeyword: '',
    secondaryKeywords: '', robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml',
    schemaType: 'WebSite', schemaData: '', breadcrumbs: ['Home'],
    redirects: [], hreflang: [],
  });
  const [activeTab, setActiveTab] = useState<'seo' | 'social' | 'schema' | 'advanced' | 'audit'>('seo');

  const update = (key: keyof SEOData, value: any) => setSeo(prev => ({ ...prev, [key]: value }));

  const seoScore = Math.round((SEO_CHECKLIST.filter(c => c.check(seo)).length / SEO_CHECKLIST.length) * 100);

  const copySchema = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${seo.schemaData}\n</script>`);
    toast.success('Schema markup copied');
  };

  const addRedirect = () => {
    update('redirects', [...seo.redirects, { from: '', to: '', type: '301' }]);
  };

  const tabs = [
    { id: 'seo' as const, label: 'SEO', icon: Globe },
    { id: 'social' as const, label: 'Social', icon: Share2 },
    { id: 'schema' as const, label: 'Schema', icon: Code2 },
    { id: 'advanced' as const, label: 'Advanced', icon: Shield },
    { id: 'audit' as const, label: 'Audit', icon: Zap },
  ];

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">SEO & Meta</h2>
          {/* Score badge */}
          <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${seoScore >= 80 ? 'bg-green-500/10 text-green-500' : seoScore >= 50 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
            {seoScore}%
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
      </div>

      {/* Tabs */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center justify-center gap-1 px-3 py-2 text-[10px] font-medium transition-colors ${activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'}`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'seo' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Focus Keyword</label>
            <input value={seo.focusKeyword} onChange={e => update('focusKeyword', e.target.value)} className="property-input" placeholder="e.g. web design agency" />
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Secondary Keywords</label>
            <input value={seo.secondaryKeywords} onChange={e => update('secondaryKeywords', e.target.value)} className="property-input" placeholder="Comma-separated keywords" />
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Page Title</label>
            <input value={seo.title} onChange={e => update('title', e.target.value)} className="property-input" placeholder="My Amazing Page" maxLength={60} />
            <div className={`text-[10px] mt-1 ${seo.title.length > 60 ? 'text-red-500' : 'opacity-40'}`}>{seo.title.length}/60</div>
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Meta Description</label>
            <textarea value={seo.description} onChange={e => update('description', e.target.value)} className="property-input resize-y min-h-[60px]" placeholder="Describe your page..." maxLength={160} rows={3} />
            <div className={`text-[10px] mt-1 ${seo.description.length > 160 ? 'text-red-500' : 'opacity-40'}`}>{seo.description.length}/160</div>
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Canonical URL</label>
            <input value={seo.canonicalUrl} onChange={e => update('canonicalUrl', e.target.value)} className="property-input" placeholder="https://example.com/page" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={seo.noIndex} onChange={e => update('noIndex', e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-xs">Hide from search engines (noindex)</span>
          </label>

          {/* Google Preview */}
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[10px] uppercase tracking-wider opacity-40 mb-2">Google Preview</div>
            <div className="text-sm font-medium" style={{ color: '#1a0dab' }}>{seo.title || 'Page Title'}</div>
            <div className="text-[11px] mt-0.5" style={{ color: '#006621' }}>{seo.canonicalUrl || 'https://yoursite.com/page'}</div>
            <div className="text-xs mt-1 opacity-60 line-clamp-2">{seo.description || 'Add a meta description...'}</div>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="p-4 space-y-4">
          <div><label className="text-xs opacity-70 mb-1.5 block font-medium">OG Title</label>
            <input value={seo.ogTitle} onChange={e => update('ogTitle', e.target.value)} className="property-input" placeholder="Title for social sharing" /></div>
          <div><label className="text-xs opacity-70 mb-1.5 block font-medium">OG Description</label>
            <textarea value={seo.ogDescription} onChange={e => update('ogDescription', e.target.value)} className="property-input resize-y min-h-[60px]" rows={3} /></div>
          <div><label className="text-xs opacity-70 mb-1.5 block font-medium">OG Image URL</label>
            <input value={seo.ogImage} onChange={e => update('ogImage', e.target.value)} className="property-input" placeholder="https://example.com/image.jpg" /></div>

          {/* Social Preview Cards */}
          <div className="space-y-3">
            {['Facebook', 'Twitter'].map(platform => (
              <div key={platform} className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
                <div className="text-[10px] uppercase tracking-wider opacity-40 p-2">{platform} Preview</div>
                <div className="aspect-video flex items-center justify-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  {seo.ogImage ? <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover" /> : <span className="text-2xl">🖼️</span>}
                </div>
                <div className="p-2">
                  <div className="text-xs font-semibold">{seo.ogTitle || seo.title || 'Page Title'}</div>
                  <div className="text-[10px] opacity-60 mt-0.5 line-clamp-2">{seo.ogDescription || seo.description || 'Description'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Schema Type</label>
            <select value={seo.schemaType} onChange={e => {
              update('schemaType', e.target.value);
              update('schemaData', generateSchema(e.target.value, seo.title, seo.description, seo.canonicalUrl));
            }} className="property-input">
              {SCHEMA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button onClick={() => update('schemaData', generateSchema(seo.schemaType, seo.title, seo.description, seo.canonicalUrl))}
            className="w-full py-2 rounded text-xs font-medium flex items-center justify-center gap-1 hover:bg-muted transition-colors"
            style={{ border: '1px solid hsl(var(--builder-panel-border))' }}
          >
            <Zap className="w-3 h-3" /> Auto-generate Schema
          </button>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs opacity-70 font-medium">JSON-LD Markup</label>
              <button onClick={copySchema} className="text-[10px] flex items-center gap-1 hover:opacity-70"><Copy className="w-3 h-3" /> Copy</button>
            </div>
            <textarea value={seo.schemaData} onChange={e => update('schemaData', e.target.value)}
              className="property-input font-mono text-[10px] resize-y min-h-[200px]" rows={12} placeholder="JSON-LD structured data..." />
          </div>

          {/* Breadcrumbs */}
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Breadcrumbs</label>
            <div className="flex flex-wrap gap-1 items-center text-xs mb-2">
              {seo.breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="opacity-30">/</span>}
                  <input value={b} onChange={e => {
                    const updated = [...seo.breadcrumbs]; updated[i] = e.target.value; update('breadcrumbs', updated);
                  }} className="property-input w-20 text-[10px] py-0.5" />
                </span>
              ))}
              <button onClick={() => update('breadcrumbs', [...seo.breadcrumbs, 'Page'])}
                className="text-[10px] px-2 py-0.5 rounded hover:bg-muted" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">robots.txt</label>
            <textarea value={seo.robotsTxt} onChange={e => update('robotsTxt', e.target.value)}
              className="property-input font-mono text-[10px] resize-y min-h-[100px]" rows={5} />
          </div>

          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Custom Head Code</label>
            <textarea value={seo.customHead} onChange={e => update('customHead', e.target.value)}
              className="property-input font-mono text-[10px] resize-y min-h-[100px]" rows={5}
              placeholder={'<!-- Analytics, fonts, etc -->\n<script src="..."></script>'} />
          </div>

          {/* 301 Redirects */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs opacity-70 font-medium">301 Redirects</label>
              <button onClick={addRedirect} className="text-[10px] flex items-center gap-1 hover:opacity-70" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
            {seo.redirects.map((r, i) => (
              <div key={i} className="flex items-center gap-1 mb-1.5">
                <input value={r.from} onChange={e => {
                  const updated = [...seo.redirects]; updated[i].from = e.target.value; update('redirects', updated);
                }} className="property-input flex-1 text-[10px]" placeholder="/old-url" />
                <span className="text-[10px] opacity-30">→</span>
                <input value={r.to} onChange={e => {
                  const updated = [...seo.redirects]; updated[i].to = e.target.value; update('redirects', updated);
                }} className="property-input flex-1 text-[10px]" placeholder="/new-url" />
                <select value={r.type} onChange={e => {
                  const updated = [...seo.redirects]; updated[i].type = e.target.value as any; update('redirects', updated);
                }} className="property-input text-[10px] w-14 py-0.5">
                  <option value="301">301</option><option value="302">302</option>
                </select>
              </div>
            ))}
          </div>

          {/* Hreflang */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs opacity-70 font-medium">Hreflang (Multi-language)</label>
              <button onClick={() => update('hreflang', [...seo.hreflang, { lang: 'en', url: '' }])} className="text-[10px] flex items-center gap-1 hover:opacity-70" style={{ color: 'hsl(var(--primary))' }}>+ Add</button>
            </div>
            {seo.hreflang.map((h, i) => (
              <div key={i} className="flex items-center gap-1 mb-1.5">
                <select value={h.lang} onChange={e => {
                  const updated = [...seo.hreflang]; updated[i].lang = e.target.value; update('hreflang', updated);
                }} className="property-input text-[10px] w-16 py-0.5">
                  {['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <input value={h.url} onChange={e => {
                  const updated = [...seo.hreflang]; updated[i].url = e.target.value; update('hreflang', updated);
                }} className="property-input flex-1 text-[10px]" placeholder="https://example.com/es/" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="p-4 space-y-4">
          {/* Score */}
          <div className="text-center p-4 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className={`text-4xl font-bold ${seoScore >= 80 ? 'text-green-500' : seoScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{seoScore}%</div>
            <div className="text-xs text-muted-foreground mt-1">SEO Score</div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {SEO_CHECKLIST.map(item => {
              const passed = item.check(seo);
              return (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-md" style={{ background: passed ? 'hsl(var(--primary) / 0.05)' : 'hsl(var(--destructive) / 0.05)' }}>
                  {passed ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  <span className="text-xs">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="font-medium mb-1">💡 Tips</div>
            <ul className="space-y-1 text-[10px] opacity-60">
              <li>• Include your focus keyword in the first 100 words</li>
              <li>• Use descriptive alt text on all images</li>
              <li>• Add internal links to related content</li>
              <li>• Keep URLs short and keyword-rich</li>
              <li>• Ensure mobile-friendly responsive design</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSEOPanel;
