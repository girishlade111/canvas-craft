import { useState } from 'react';
import {
  Sparkles, X, Wand2, Type, Image, Search, Palette, PenTool,
  FileText, Zap, Loader2, Copy, Check, RefreshCw, Globe,
} from 'lucide-react';

interface AIToolsPanelProps {
  onClose?: () => void;
}

const AIToolsPanel = ({ onClose }: AIToolsPanelProps) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'seo' | 'design'>('text');
  const [textPrompt, setTextPrompt] = useState('');
  const [textTone, setTextTone] = useState('professional');
  const [textType, setTextType] = useState('paragraph');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStyle, setImageStyle] = useState('photorealistic');

  const [seoUrl, setSeoUrl] = useState('');
  const [seoKeyword, setSeoKeyword] = useState('');

  const handleGenerateText = () => {
    if (!textPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const samples: Record<string, string> = {
        paragraph: `Transform your business with our cutting-edge solutions. We combine innovative technology with human-centered design to deliver experiences that captivate, convert, and retain your audience. Our team of experts brings decades of combined experience to every project.`,
        heading: 'Elevate Your Digital Presence Today',
        cta: 'Start Your Free Trial — No Credit Card Required',
        tagline: 'Where Innovation Meets Simplicity',
        product: 'Introducing our flagship product — engineered for performance, designed for beauty. Features include real-time sync, AI-powered insights, and seamless integrations with your favorite tools.',
      };
      setGeneratedText(samples[textType] || samples.paragraph);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'text' as const, label: 'Text', icon: Type },
    { id: 'image' as const, label: 'Image', icon: Image },
    { id: 'seo' as const, label: 'SEO', icon: Search },
    { id: 'design' as const, label: 'Design', icon: Palette },
  ];

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">AI Tools</h2>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(280 70% 60%))', color: 'white' }}>
            Beta
          </span>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />{label}
          </button>
        ))}
      </div>

      {/* AI Text Generator */}
      {activeTab === 'text' && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[10px] opacity-60 block mb-1 font-medium">What do you need?</label>
            <textarea value={textPrompt} onChange={e => setTextPrompt(e.target.value)}
              placeholder="Describe what you want to write about..."
              className="property-input resize-y min-h-[60px] text-xs" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Tone</label>
              <select value={textTone} onChange={e => setTextTone(e.target.value)} className="property-input text-[10px]">
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="bold">Bold & Confident</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="witty">Witty</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Type</label>
              <select value={textType} onChange={e => setTextType(e.target.value)} className="property-input text-[10px]">
                <option value="paragraph">Paragraph</option>
                <option value="heading">Heading</option>
                <option value="cta">Call to Action</option>
                <option value="tagline">Tagline</option>
                <option value="product">Product Description</option>
              </select>
            </div>
          </div>
          <button onClick={handleGenerateText} disabled={isGenerating || !textPrompt.trim()}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-semibold transition-all disabled:opacity-40"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
            {isGenerating ? <><Loader2 className="w-3 h-3 animate-spin" /> Generating...</> : <><Wand2 className="w-3 h-3" /> Generate Text</>}
          </button>
          {generatedText && (
            <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium opacity-60">Generated Text</span>
                <div className="flex gap-1">
                  <button onClick={() => handleGenerateText()} className="p-1 rounded hover:bg-muted" title="Regenerate"><RefreshCw className="w-3 h-3" /></button>
                  <button onClick={handleCopy} className="p-1 rounded hover:bg-muted" title="Copy">
                    {copied ? <Check className="w-3 h-3" style={{ color: 'hsl(var(--success))' }} /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <p className="text-xs leading-relaxed">{generatedText}</p>
            </div>
          )}
        </div>
      )}

      {/* AI Image Generator */}
      {activeTab === 'image' && (
        <div className="p-3 space-y-3">
          <div>
            <label className="text-[10px] opacity-60 block mb-1 font-medium">Describe your image</label>
            <textarea value={imagePrompt} onChange={e => setImagePrompt(e.target.value)}
              placeholder="A modern office space with natural light..."
              className="property-input resize-y min-h-[60px] text-xs" rows={3} />
          </div>
          <div>
            <label className="text-[10px] opacity-60 block mb-1">Style</label>
            <select value={imageStyle} onChange={e => setImageStyle(e.target.value)} className="property-input text-[10px]">
              <option value="photorealistic">Photorealistic</option>
              <option value="illustration">Illustration</option>
              <option value="3d">3D Render</option>
              <option value="watercolor">Watercolor</option>
              <option value="minimalist">Minimalist</option>
              <option value="abstract">Abstract</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['1:1', '16:9', '9:16', '4:3', '3:2', '21:9'].map(ratio => (
              <button key={ratio} className="py-1.5 rounded text-[10px] font-medium hover:bg-muted/50 transition-colors" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                {ratio}
              </button>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-semibold"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
            <Image className="w-3 h-3" /> Generate Image
          </button>
          <div className="grid grid-cols-2 gap-1.5">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-lg opacity-20" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                🖼️
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI SEO */}
      {activeTab === 'seo' && (
        <div className="p-3 space-y-3">
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <h3 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
              <Search className="w-3 h-3" style={{ color: 'hsl(var(--primary))' }} /> AI SEO Optimizer
            </h3>
            <p className="text-[10px] opacity-50 mb-3">Enter your target keyword and page URL to get AI-powered SEO suggestions</p>
            <div className="space-y-2">
              <input value={seoKeyword} onChange={e => setSeoKeyword(e.target.value)} placeholder="Target keyword..." className="property-input text-xs" />
              <input value={seoUrl} onChange={e => setSeoUrl(e.target.value)} placeholder="Page URL..." className="property-input text-xs" />
              <button className="w-full py-2 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Analyze & Optimize
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Generate Meta Title', desc: 'AI-optimized title tag under 60 chars', icon: FileText },
              { label: 'Generate Meta Description', desc: 'Compelling description under 160 chars', icon: FileText },
              { label: 'Generate Alt Text', desc: 'Descriptive alt text for all images', icon: Image },
              { label: 'Keyword Suggestions', desc: 'Related keywords and search volume', icon: Search },
              { label: 'Schema Markup', desc: 'Auto-generate JSON-LD structured data', icon: Globe },
            ].map(tool => (
              <button key={tool.label} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left hover:bg-muted/30 transition-colors" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <tool.icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <div>
                  <div className="text-[10px] font-medium">{tool.label}</div>
                  <div className="text-[9px] opacity-40">{tool.desc}</div>
                </div>
                <Wand2 className="w-3 h-3 shrink-0 opacity-30 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Design */}
      {activeTab === 'design' && (
        <div className="p-3 space-y-3">
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <Palette className="w-6 h-6 mx-auto mb-2 opacity-40" />
            <h3 className="text-xs font-semibold text-center mb-1">Smart Design Suggestions</h3>
            <p className="text-[10px] opacity-40 text-center mb-3">AI analyzes your design and suggests improvements</p>
            <button className="w-full py-2 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              <Sparkles className="w-3 h-3 inline mr-1" />Analyze My Design
            </button>
          </div>

          <div className="space-y-2">
            {[
              { label: 'AI Color Palette', desc: 'Generate harmonious color schemes', icon: Palette },
              { label: 'AI Font Pairing', desc: 'Find the perfect font combination', icon: Type },
              { label: 'AI Layout Generator', desc: 'Create layouts from a description', icon: PenTool },
              { label: 'AI Logo Maker', desc: 'Generate a logo for your brand', icon: Zap },
            ].map(tool => (
              <button key={tool.label} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left hover:bg-muted/30 transition-colors" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <tool.icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <div>
                  <div className="text-[10px] font-medium">{tool.label}</div>
                  <div className="text-[9px] opacity-40">{tool.desc}</div>
                </div>
                <Wand2 className="w-3 h-3 shrink-0 opacity-30 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIToolsPanel;
