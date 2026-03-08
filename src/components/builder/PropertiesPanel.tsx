import { useBuilderStore } from '@/store/builderStore';
import { getPropertyGroups } from '@/engine/properties';
import type { ComponentStyles, PropertySchema } from '@/types/builder';
import { isContainerType } from '@/types/builder';
import {
  X, ChevronDown, ChevronRight, Layers, LayoutDashboard, Smartphone,
  Sparkles, Link2, Accessibility, Palette, Upload, Image as ImageIcon, Trash2, ExternalLink,
} from 'lucide-react';
import { useState, useRef } from 'react';
import AutoLayoutPanel from './AutoLayoutPanel';
import ResponsivePanel from './ResponsivePanel';
import AnimationPanel from './AnimationPanel';
import { toast } from 'sonner';

const GOOGLE_FONTS = [
  'inherit', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Raleway', 'Oswald', 'Merriweather', 'Playfair Display', 'Nunito', 'Ubuntu',
  'Rubik', 'Work Sans', 'DM Sans', 'Outfit', 'Space Grotesk', 'Sora',
  'Archivo', 'Barlow', 'Fira Sans', 'Source Sans 3', 'Mulish', 'Manrope',
  'PT Sans', 'Quicksand', 'Comfortaa', 'Pacifico', 'Dancing Script',
  'Permanent Marker', 'Lobster', 'Caveat', 'JetBrains Mono', 'Fira Code',
];

// ─── Image/Logo Picker Component ───────────────────────────

const ImagePickerField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}> = ({ value, onChange, placeholder, label }) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Convert to base64 for local preview (in real app, upload to storage)
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);
      toast.success('Image uploaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setShowUrlInput(false);
      toast.success('Image URL set!');
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    toast.success('Image removed');
  };

  return (
    <div className="flex-1 space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative group rounded-lg overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
          <img 
            src={value} 
            alt={label || 'Preview'} 
            className="w-full h-20 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => setShowUrlInput(true)}
              className="p-1.5 rounded bg-white/20 hover:bg-white/30 transition-colors"
              title="Change URL"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded bg-white/20 hover:bg-white/30 transition-colors"
              title="Upload new"
            >
              <Upload className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={handleClear}
              className="p-1.5 rounded bg-red-500/50 hover:bg-red-500/70 transition-colors"
              title="Remove"
            >
              <Trash2 className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* No image - show upload options */}
      {!value && !showUrlInput && (
        <div 
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors"
          style={{ borderColor: 'hsl(var(--border))' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-6 h-6 opacity-40" />
          <span className="text-[10px] opacity-50 text-center">Click to upload or drag & drop</span>
          <div className="flex gap-2 mt-1">
            <button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="px-2 py-1 text-[10px] rounded font-medium"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Upload
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowUrlInput(true); }}
              className="px-2 py-1 text-[10px] rounded font-medium"
              style={{ background: 'hsl(var(--muted))' }}
            >
              URL
            </button>
          </div>
        </div>
      )}

      {/* URL Input */}
      {showUrlInput && (
        <div className="space-y-2">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={placeholder || 'https://example.com/logo.png'}
            className="property-input w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <div className="flex gap-1">
            <button
              onClick={handleUrlSubmit}
              className="flex-1 px-2 py-1 text-[10px] rounded font-medium"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Apply
            </button>
            <button
              onClick={() => { setShowUrlInput(false); setUrlInput(value || ''); }}
              className="px-2 py-1 text-[10px] rounded font-medium"
              style={{ background: 'hsl(var(--muted))' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Current URL display (if has value and not showing URL input) */}
      {value && !showUrlInput && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="property-input w-full text-[10px]"
          placeholder="Image URL"
        />
      )}
    </div>
  );
};

// ─── Property Field Renderer ──────────────────────────────

const PropertyField: React.FC<{
  schema: PropertySchema;
  value: any;
  onChange: (value: string) => void;
}> = ({ schema, value, onChange }) => {
  const currentValue = value ?? schema.defaultValue ?? '';

  // Image/Logo picker
  if (schema.type === 'image') {
    return (
      <ImagePickerField
        value={String(currentValue || '')}
        onChange={onChange}
        placeholder={schema.placeholder}
        label={schema.label}
      />
    );
  }

  if (schema.type === 'color') {
    return (
      <div className="flex items-center gap-1.5 flex-1">
        <input type="color" value={String(currentValue || '#000000')} onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-0 shrink-0" />
        <input value={String(currentValue || '')} onChange={(e) => onChange(e.target.value)}
          className="property-input flex-1" placeholder={schema.placeholder || schema.label} />
      </div>
    );
  }

  if (schema.key === 'fontFamily') {
    return (
      <select value={String(currentValue || 'inherit')} onChange={(e) => onChange(e.target.value)}
        className="property-input flex-1" style={{ fontFamily: String(currentValue || 'inherit') }}>
        {GOOGLE_FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
      </select>
    );
  }

  if (schema.type === 'select' && schema.options) {
    return (
      <select value={String(currentValue || '')} onChange={(e) => onChange(e.target.value)} className="property-input flex-1">
        <option value="">—</option>
        {schema.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    );
  }

  if (schema.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input type="checkbox" checked={currentValue === true || currentValue === 'true'}
          onChange={(e) => onChange(String(e.target.checked))}
          className="w-4 h-4 rounded" style={{ accentColor: 'hsl(var(--primary))' }} />
        <span className="text-xs opacity-70">{currentValue === true || currentValue === 'true' ? 'Yes' : 'No'}</span>
      </label>
    );
  }

  if (schema.type === 'number') {
    return (
      <input type="number" value={String(currentValue || '')} onChange={(e) => onChange(e.target.value)}
        min={schema.min} max={schema.max} step={schema.step || 1}
        className="property-input flex-1" placeholder={schema.placeholder || schema.label} />
    );
  }

  if (schema.type === 'code') {
    return (
      <textarea value={String(currentValue || '')} onChange={(e) => onChange(e.target.value)}
        className="property-input flex-1 font-mono text-xs resize-y min-h-[60px]"
        placeholder={schema.placeholder || 'Enter code...'} rows={3} />
    );
  }

  return (
    <input value={String(currentValue || '')} onChange={(e) => onChange(e.target.value)}
      className="property-input flex-1" placeholder={schema.placeholder || schema.label} />
  );
};

const STYLE_KEYS = new Set([
  'width', 'height', 'minHeight', 'minWidth', 'maxWidth', 'maxHeight',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'backgroundColor', 'color', 'fontSize', 'fontWeight', 'fontFamily',
  'lineHeight', 'textAlign', 'border', 'borderRadius', 'borderColor',
  'boxShadow', 'opacity', 'display', 'flexDirection', 'flexWrap',
  'justifyContent', 'alignItems', 'alignSelf', 'flex', 'gap',
  'rowGap', 'columnGap', 'gridTemplateColumns', 'gridTemplateRows',
  'gridColumn', 'gridRow', 'position', 'top', 'right', 'bottom',
  'left', 'zIndex', 'overflow', 'overflowX', 'overflowY', 'cursor',
  'transition', 'transform', 'customCSS', 'customClasses',
  'backgroundImage', 'backgroundSize', 'backgroundPosition',
  'backgroundRepeat', 'letterSpacing', 'textDecoration',
  'textTransform', 'whiteSpace', 'wordBreak', 'objectFit', 'aspectRatio',
  'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
  'animation',
]);

// ─── Page Settings (nothing selected) ──────────────────────

const PageSettingsPanel = () => {
  const { schema, setSchema } = useBuilderStore();
  const [favicon, setFavicon] = useState(schema.favicon || '');
  const [siteLogo, setSiteLogo] = useState(schema.logo || '');

  const handleFaviconChange = (url: string) => {
    setFavicon(url);
    setSchema({ ...schema, favicon: url });
    // Also update the actual favicon in the document
    if (url) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = url;
    }
  };

  const handleLogoChange = (url: string) => {
    setSiteLogo(url);
    setSchema({ ...schema, logo: url });
  };

  return (
    <div className="builder-properties-panel overflow-y-auto">
      <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Page Settings</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Page Name */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium">Page Name</label>
          <input value={schema.name || ''} onChange={e => setSchema({ ...schema, name: e.target.value })}
            className="property-input" placeholder="Page name" />
        </div>

        {/* Site Logo */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            Site Logo
          </label>
          <ImagePickerField
            value={siteLogo}
            onChange={handleLogoChange}
            placeholder="Upload or enter logo URL"
            label="Site Logo"
          />
        </div>

        {/* Favicon */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            Favicon
          </label>
          <ImagePickerField
            value={favicon}
            onChange={handleFaviconChange}
            placeholder="Upload favicon (32x32 or 64x64 recommended)"
            label="Favicon"
          />
          <p className="text-[9px] opacity-40 mt-1">Recommended: 32×32 or 64×64 PNG/ICO</p>
        </div>

        {/* Page Background */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium">Page Background</label>
          <div className="flex items-center gap-2">
            <input type="color" defaultValue="#ffffff" className="w-7 h-7 rounded cursor-pointer border-0" />
            <input className="property-input flex-1" placeholder="Color or gradient" />
          </div>
        </div>

        {/* Page Width */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium">Page Width</label>
          <select className="property-input" defaultValue="1280">
            <option value="960">960px (Narrow)</option>
            <option value="1280">1280px (Default)</option>
            <option value="1440">1440px (Wide)</option>
            <option value="100%">Full Width</option>
          </select>
        </div>

        {/* Sections */}
        <div>
          <label className="text-xs opacity-70 mb-1.5 block font-medium">Sections</label>
          <div className="space-y-1">
            {schema.sections.map((s) => (
              <div key={s.id} className="flex items-center gap-2 p-2 rounded text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <span className="font-medium flex-1">{s.label}</span>
                <span className="opacity-30">{s.components.length} elements</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
          <div className="font-medium mb-1">💡 Tip</div>
          <p className="text-[10px] opacity-50">Select an element on the canvas to edit its properties. Double-click text elements to edit inline.</p>
        </div>
      </div>
    </div>
  );
};

// ─── Section Settings (section selected) ───────────────────
// This would show when a section is clicked - for now we show it contextually

// ─── Link Tab ──────────────────────────────────────────────

const LinkPanel: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { updateComponent } = useBuilderStore();
  const component = useBuilderStore.getState().getSelectedComponent();
  if (!component) return null;

  const link = component.props?.link || { type: 'none', url: '', target: '_self' };

  const updateLink = (updates: any) => {
    updateComponent(componentId, {
      props: { ...component.props, link: { ...link, ...updates } },
    });
  };

  return (
    <div className="px-4 pb-3 space-y-3">
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Link Type</label>
        <select value={link.type || 'none'} onChange={e => updateLink({ type: e.target.value })} className="property-input">
          <option value="none">None</option>
          <option value="url">URL</option>
          <option value="page">Page</option>
          <option value="anchor">Anchor</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="file">File Download</option>
        </select>
      </div>

      {link.type === 'url' && (
        <div>
          <label className="text-xs opacity-70 mb-1.5 block">URL</label>
          <input value={link.url || ''} onChange={e => updateLink({ url: e.target.value })} className="property-input" placeholder="https://example.com" />
        </div>
      )}
      {link.type === 'email' && (
        <div>
          <label className="text-xs opacity-70 mb-1.5 block">Email Address</label>
          <input value={link.url || ''} onChange={e => updateLink({ url: e.target.value })} className="property-input" placeholder="hello@example.com" />
        </div>
      )}
      {link.type === 'phone' && (
        <div>
          <label className="text-xs opacity-70 mb-1.5 block">Phone Number</label>
          <input value={link.url || ''} onChange={e => updateLink({ url: e.target.value })} className="property-input" placeholder="+1 (555) 000-0000" />
        </div>
      )}
      {link.type === 'anchor' && (
        <div>
          <label className="text-xs opacity-70 mb-1.5 block">Anchor ID</label>
          <input value={link.url || ''} onChange={e => updateLink({ url: e.target.value })} className="property-input" placeholder="#section-name" />
        </div>
      )}
      {link.type !== 'none' && (
        <>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block">Open In</label>
            <select value={link.target || '_self'} onChange={e => updateLink({ target: e.target.value })} className="property-input">
              <option value="_self">Same Tab</option>
              <option value="_blank">New Tab</option>
            </select>
          </div>
          <div>
            <label className="text-xs opacity-70 mb-1.5 block">Rel Attribute</label>
            <select value={link.rel || ''} onChange={e => updateLink({ rel: e.target.value })} className="property-input">
              <option value="">None</option>
              <option value="nofollow">nofollow</option>
              <option value="noopener noreferrer">noopener noreferrer</option>
              <option value="sponsored">sponsored</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Accessibility Tab ─────────────────────────────────────

const AccessibilityPanel: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { updateComponent } = useBuilderStore();
  const component = useBuilderStore.getState().getSelectedComponent();
  if (!component) return null;

  const a11y = component.props?.accessibility || {};

  const updateA11y = (key: string, value: string) => {
    updateComponent(componentId, {
      props: { ...component.props, accessibility: { ...a11y, [key]: value } },
    });
  };

  return (
    <div className="px-4 pb-3 space-y-3">
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Alt Text (Images)</label>
        <textarea value={a11y.altText || ''} onChange={e => updateA11y('altText', e.target.value)}
          className="property-input resize-y min-h-[50px]" rows={2} placeholder="Describe this image for screen readers..." />
      </div>
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">ARIA Label</label>
        <input value={a11y.ariaLabel || ''} onChange={e => updateA11y('ariaLabel', e.target.value)}
          className="property-input" placeholder="Screen reader label" />
      </div>
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">ARIA Role</label>
        <select value={a11y.role || ''} onChange={e => updateA11y('role', e.target.value)} className="property-input">
          <option value="">Auto</option>
          <option value="button">Button</option>
          <option value="link">Link</option>
          <option value="heading">Heading</option>
          <option value="img">Image</option>
          <option value="navigation">Navigation</option>
          <option value="banner">Banner</option>
          <option value="main">Main</option>
          <option value="complementary">Sidebar</option>
          <option value="contentinfo">Footer</option>
          <option value="region">Region</option>
          <option value="alert">Alert</option>
          <option value="dialog">Dialog</option>
          <option value="presentation">Decorative (hidden)</option>
        </select>
      </div>
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Tab Index</label>
        <select value={a11y.tabIndex || ''} onChange={e => updateA11y('tabIndex', e.target.value)} className="property-input">
          <option value="">Default</option>
          <option value="0">Focusable (0)</option>
          <option value="-1">Not focusable (-1)</option>
        </select>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={a11y.ariaHidden === 'true'}
          onChange={e => updateA11y('ariaHidden', e.target.checked ? 'true' : 'false')}
          className="w-4 h-4 accent-primary" />
        <span className="text-xs">Hide from screen readers (aria-hidden)</span>
      </label>

      <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--builder-component-bg))' }}>
        <div className="font-medium mb-1">♿ Accessibility Tips</div>
        <ul className="space-y-1 text-[10px] opacity-50">
          <li>• All images should have descriptive alt text</li>
          <li>• Use semantic roles (heading, nav, main)</li>
          <li>• Ensure sufficient color contrast (4.5:1)</li>
          <li>• Interactive elements must be keyboard accessible</li>
        </ul>
      </div>
    </div>
  );
};

// ─── Main Properties Panel ─────────────────────────────────

const PropertiesPanel = () => {
  const { selectedComponentId, updateComponentStyles, updateComponent, toggleRightSidebar } = useBuilderStore();
  const [openGroups, setOpenGroups] = useState<string[]>(['Auto Layout', 'Component', 'Layout', 'Responsive']);
  const [activeTab, setActiveTab] = useState<'design' | 'layout' | 'animate' | 'link' | 'a11y' | 'responsive'>('design');

  if (!selectedComponentId) {
    return <PageSettingsPanel />;
  }

  const selectedComponent = useBuilderStore.getState().getSelectedComponent();
  if (!selectedComponent) return null;

  const isContainer = isContainerType(selectedComponent.type);
  const propertyGroups = getPropertyGroups(selectedComponent.type);

  const handleChange = (schema: PropertySchema, value: string) => {
    const isStyle = STYLE_KEYS.has(schema.key);
    if (isStyle) {
      updateComponentStyles(selectedComponentId, { [schema.key]: value });
    } else {
      updateComponent(selectedComponentId, {
        props: { ...selectedComponent.props, [schema.key]: value },
      });
    }
  };

  const toggleGroup = (group: string) => {
    setOpenGroups(prev =>
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const getValue = (schema: PropertySchema) => {
    const isStyle = STYLE_KEYS.has(schema.key);
    if (isStyle) return selectedComponent.styles[schema.key as keyof ComponentStyles];
    return selectedComponent.props?.[schema.key];
  };

  const tabs = [
    { id: 'design' as const, label: 'Design', icon: Palette },
    { id: 'layout' as const, label: 'Layout', icon: LayoutDashboard },
    { id: 'animate' as const, label: 'Animate', icon: Sparkles },
    { id: 'link' as const, label: 'Link', icon: Link2 },
    { id: 'a11y' as const, label: 'A11y', icon: Accessibility },
    { id: 'responsive' as const, label: 'RWD', icon: Smartphone },
  ];

  return (
    <div className="builder-properties-panel overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Properties</h2>
        <button onClick={toggleRightSidebar} className="p-1 rounded hover:opacity-70 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Component info */}
      <div className="property-group">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-3.5 h-3.5 opacity-50" />
          <span className="text-sm font-medium">{selectedComponent.label}</span>
        </div>
        <span className="text-xs opacity-40">{selectedComponent.type}</span>
        <div className="mt-1">
          <span className="text-[10px] font-mono opacity-30">{selectedComponent.id}</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center justify-center gap-0.5 px-2 py-2 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Design tab */}
      {activeTab === 'design' && (
        <>
          {/* Content editor — show for all components that can have content */}
          <div className="property-group">
            <span className="property-label">Content</span>
            <textarea
              value={selectedComponent.content || ''}
              onChange={(e) => updateComponent(selectedComponentId, { content: e.target.value })}
              className="property-input resize-y min-h-[60px]"
              rows={3}
              placeholder={`Enter content for ${selectedComponent.label}...`}
            />
          </div>

          {/* Label */}
          <div className="property-group">
            <span className="property-label">Label</span>
            <input
              value={selectedComponent.label || ''}
              onChange={(e) => updateComponent(selectedComponentId, { label: e.target.value })}
              className="property-input"
              placeholder="Component label"
            />
          </div>

          {Object.entries(propertyGroups).map(([group, fields]) => {
            if (['Layout'].includes(group)) return null;
            const isOpen = openGroups.includes(group);
            return (
              <div key={group} className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="flex items-center gap-1.5">
                    {group}
                    <span className="opacity-40 normal-case font-normal">({fields.length})</span>
                  </span>
                  {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 space-y-2.5">
                    {fields.map((schema) => (
                      <div key={schema.key} className="flex items-center gap-2">
                        <label className="text-xs w-20 shrink-0 opacity-70 truncate" title={schema.description || schema.label}>
                          {schema.label}
                        </label>
                        <PropertyField
                          schema={schema}
                          value={getValue(schema)}
                          onChange={(val) => handleChange(schema, val)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Layout tab */}
      {activeTab === 'layout' && (
        <>
          {/* Position & size quick controls */}
          <div className="p-4 space-y-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Position & Size</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'width', label: 'W' },
                { key: 'height', label: 'H' },
                { key: 'top', label: 'T' },
                { key: 'left', label: 'L' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1">
                  <span className="text-[10px] font-mono opacity-40 w-3">{label}</span>
                  <input
                    value={selectedComponent.styles[key as keyof ComponentStyles] || ''}
                    onChange={e => updateComponentStyles(selectedComponentId, { [key]: e.target.value })}
                    className="property-input flex-1 text-xs"
                    placeholder="auto"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] opacity-50 block mb-0.5">Rotation</label>
                <input
                  value={selectedComponent.styles.transform?.match(/rotate\((.+?)\)/)?.[1] || ''}
                  onChange={e => updateComponentStyles(selectedComponentId, {
                    transform: `rotate(${e.target.value})`,
                  })}
                  className="property-input text-xs" placeholder="0deg"
                />
              </div>
              <div>
                <label className="text-[10px] opacity-50 block mb-0.5">Z-Index</label>
                <input type="number"
                  value={selectedComponent.styles.zIndex || ''}
                  onChange={e => updateComponentStyles(selectedComponentId, { zIndex: e.target.value })}
                  className="property-input text-xs" placeholder="auto"
                />
              </div>
            </div>
          </div>

          {isContainer && (
            <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
              <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
                Auto Layout
              </div>
              <AutoLayoutPanel componentId={selectedComponentId} />
            </div>
          )}
          {propertyGroups['Layout'] && (
            <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
              <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
                Spacing
              </div>
              <div className="px-4 pb-3 space-y-2.5">
                {propertyGroups['Layout'].map((schema) => (
                  <div key={schema.key} className="flex items-center gap-2">
                    <label className="text-xs w-20 shrink-0 opacity-70 truncate">{schema.label}</label>
                    <PropertyField schema={schema} value={getValue(schema)} onChange={(val) => handleChange(schema, val)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Animate tab */}
      {activeTab === 'animate' && (
        <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
            Animation & Effects
          </div>
          <AnimationPanel componentId={selectedComponentId} />
        </div>
      )}

      {/* Link tab */}
      {activeTab === 'link' && (
        <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
            Link Settings
          </div>
          <LinkPanel componentId={selectedComponentId} />
        </div>
      )}

      {/* Accessibility tab */}
      {activeTab === 'a11y' && (
        <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
            Accessibility
          </div>
          <AccessibilityPanel componentId={selectedComponentId} />
        </div>
      )}

      {/* Responsive tab */}
      {activeTab === 'responsive' && (
        <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
            Responsive Overrides
          </div>
          <ResponsivePanel componentId={selectedComponentId} />
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
