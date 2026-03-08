import { useState } from 'react';
import { Search, X, Globe, Share2, Code2 } from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  customHead: string;
}

const SEOPanel = ({ onClose }: { onClose: () => void }) => {
  const [seo, setSeo] = useState<SEOData>({
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: '',
    noIndex: false,
    customHead: '',
  });
  const [activeTab, setActiveTab] = useState<'seo' | 'social' | 'advanced'>('seo');

  const update = (key: keyof SEOData, value: any) => setSeo(prev => ({ ...prev, [key]: value }));

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">SEO & Meta</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { id: 'seo' as const, label: 'SEO', icon: Globe },
          { id: 'social' as const, label: 'Social', icon: Share2 },
          { id: 'advanced' as const, label: 'Code', icon: Code2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'seo' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Page Title</label>
            <input
              value={seo.title}
              onChange={(e) => update('title', e.target.value)}
              className="property-input"
              placeholder="My Amazing Page"
              maxLength={60}
            />
            <div className="text-[10px] opacity-40 mt-1">{seo.title.length}/60 characters</div>
          </div>

          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Meta Description</label>
            <textarea
              value={seo.description}
              onChange={(e) => update('description', e.target.value)}
              className="property-input resize-y min-h-[60px]"
              placeholder="Describe your page for search engines..."
              maxLength={160}
              rows={3}
            />
            <div className="text-[10px] opacity-40 mt-1">{seo.description.length}/160 characters</div>
          </div>

          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Canonical URL</label>
            <input
              value={seo.canonicalUrl}
              onChange={(e) => update('canonicalUrl', e.target.value)}
              className="property-input"
              placeholder="https://example.com/page"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={seo.noIndex}
              onChange={(e) => update('noIndex', e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: 'hsl(var(--primary))' }}
            />
            <span className="text-xs">Hide from search engines (noindex)</span>
          </label>

          {/* Google Preview */}
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[10px] uppercase tracking-wider opacity-40 mb-2">Google Preview</div>
            <div className="text-sm font-medium" style={{ color: '#1a0dab' }}>
              {seo.title || 'Page Title'}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: '#006621' }}>
              {seo.canonicalUrl || 'https://yoursite.com/page'}
            </div>
            <div className="text-xs mt-1 opacity-60 line-clamp-2">
              {seo.description || 'Add a meta description to help search engines understand your page content.'}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">OG Title</label>
            <input
              value={seo.ogTitle}
              onChange={(e) => update('ogTitle', e.target.value)}
              className="property-input"
              placeholder="Title for social sharing"
            />
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">OG Description</label>
            <textarea
              value={seo.ogDescription}
              onChange={(e) => update('ogDescription', e.target.value)}
              className="property-input resize-y min-h-[60px]"
              placeholder="Description for social sharing..."
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">OG Image URL</label>
            <input
              value={seo.ogImage}
              onChange={(e) => update('ogImage', e.target.value)}
              className="property-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Social Preview */}
          <div className="mt-4 rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="text-[10px] uppercase tracking-wider opacity-40 p-2">Social Preview</div>
            <div className="aspect-video flex items-center justify-center text-2xl" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              {seo.ogImage ? (
                <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover" />
              ) : '🖼️'}
            </div>
            <div className="p-2">
              <div className="text-xs font-semibold">{seo.ogTitle || seo.title || 'Page Title'}</div>
              <div className="text-[10px] opacity-60 mt-0.5 line-clamp-2">
                {seo.ogDescription || seo.description || 'Page description'}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs opacity-70 mb-1.5 block font-medium">Custom Head Code</label>
            <textarea
              value={seo.customHead}
              onChange={(e) => update('customHead', e.target.value)}
              className="property-input font-mono text-xs resize-y min-h-[120px]"
              placeholder={'<!-- Add custom scripts, styles, or meta tags -->\n<script src="..."></script>'}
              rows={6}
            />
          </div>
          <p className="text-[10px] opacity-40 leading-relaxed">
            Add tracking scripts (Google Analytics, Facebook Pixel), custom fonts, or any HTML to the {'<head>'} section.
          </p>
        </div>
      )}
    </div>
  );
};

export default SEOPanel;
