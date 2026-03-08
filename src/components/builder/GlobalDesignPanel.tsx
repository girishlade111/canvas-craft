import { useState } from 'react';
import { Palette, X, Type, Droplets, Sun, Moon, Check, Copy, Plus, Trash2 } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { toast } from 'sonner';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
}

interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  baseSize: string;
  lineHeight: string;
  headingWeight: string;
  bodyWeight: string;
}

const COLOR_PRESETS: { name: string; colors: ThemeColors }[] = [
  {
    name: 'Midnight Pro',
    colors: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b', background: '#0f172a', foreground: '#f8fafc', muted: '#1e293b', card: '#1e293b', border: '#334155' },
  },
  {
    name: 'Ocean Breeze',
    colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#f97316', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9', card: '#ffffff', border: '#e2e8f0' },
  },
  {
    name: 'Forest Green',
    colors: { primary: '#22c55e', secondary: '#10b981', accent: '#eab308', background: '#fafaf9', foreground: '#1c1917', muted: '#f5f5f4', card: '#ffffff', border: '#e7e5e4' },
  },
  {
    name: 'Rose Gold',
    colors: { primary: '#f43f5e', secondary: '#ec4899', accent: '#d97706', background: '#fff1f2', foreground: '#1f2937', muted: '#fce7f3', card: '#ffffff', border: '#fda4af' },
  },
  {
    name: 'Monochrome',
    colors: { primary: '#18181b', secondary: '#3f3f46', accent: '#a1a1aa', background: '#ffffff', foreground: '#09090b', muted: '#f4f4f5', card: '#ffffff', border: '#e4e4e7' },
  },
  {
    name: 'Neon Cyber',
    colors: { primary: '#a855f7', secondary: '#ec4899', accent: '#22d3ee', background: '#09090b', foreground: '#fafafa', muted: '#18181b', card: '#1c1c1e', border: '#27272a' },
  },
  {
    name: 'Warm Sunset',
    colors: { primary: '#ea580c', secondary: '#dc2626', accent: '#facc15', background: '#fffbeb', foreground: '#1c1917', muted: '#fef3c7', card: '#ffffff', border: '#fde68a' },
  },
  {
    name: 'Arctic Blue',
    colors: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#14b8a6', background: '#f0f9ff', foreground: '#0c4a6e', muted: '#e0f2fe', card: '#ffffff', border: '#bae6fd' },
  },
];

const FONT_OPTIONS = [
  'Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display',
  'Merriweather', 'Raleway', 'Nunito', 'DM Sans', 'Space Grotesk', 'JetBrains Mono',
  'Crimson Text', 'Source Serif Pro', 'Outfit', 'Plus Jakarta Sans', 'Sora',
  'Cabinet Grotesk', 'Satoshi', 'General Sans', 'Clash Display',
];

const FONT_PAIRINGS = [
  { heading: 'Playfair Display', body: 'Source Serif Pro', label: 'Editorial Classic' },
  { heading: 'Space Grotesk', body: 'DM Sans', label: 'Modern Tech' },
  { heading: 'Clash Display', body: 'Satoshi', label: 'Bold Geometric' },
  { heading: 'Cabinet Grotesk', body: 'General Sans', label: 'Clean Studio' },
  { heading: 'Sora', body: 'Inter', label: 'Minimal Pro' },
  { heading: 'Outfit', body: 'Plus Jakarta Sans', label: 'Friendly SaaS' },
];

const GlobalDesignPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors');
  const [theme, setTheme] = useState<ThemeColors>(COLOR_PRESETS[0].colors);
  const [typography, setTypography] = useState<TypographySettings>({
    headingFont: 'Inter', bodyFont: 'Inter', baseSize: '16', lineHeight: '1.6',
    headingWeight: '700', bodyWeight: '400',
  });
  const [customColors, setCustomColors] = useState<{ name: string; value: string }[]>([]);
  const [isDark, setIsDark] = useState(false);

  const applyTheme = (colors: ThemeColors) => {
    setTheme(colors);
    toast.success('Theme applied to design system');
  };

  const copyCSS = () => {
    const css = `:root {\n  --primary: ${theme.primary};\n  --secondary: ${theme.secondary};\n  --accent: ${theme.accent};\n  --background: ${theme.background};\n  --foreground: ${theme.foreground};\n  --muted: ${theme.muted};\n  --card: ${theme.card};\n  --border: ${theme.border};\n  --heading-font: '${typography.headingFont}', sans-serif;\n  --body-font: '${typography.bodyFont}', sans-serif;\n  --base-size: ${typography.baseSize}px;\n  --line-height: ${typography.lineHeight};\n}`;
    navigator.clipboard.writeText(css);
    toast.success('CSS variables copied to clipboard');
  };

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Design System</h2>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={copyCSS} className="p-1 rounded hover:opacity-70" title="Copy CSS"><Copy className="w-3.5 h-3.5" /></button>
          <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { id: 'colors' as const, label: 'Colors', icon: Droplets },
          { id: 'typography' as const, label: 'Type', icon: Type },
          { id: 'spacing' as const, label: 'Layout', icon: Sun },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'}`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'colors' && (
        <div className="p-4 space-y-5">
          {/* Theme mode toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-70">Theme Mode</span>
            <div className="flex items-center gap-1 p-0.5 rounded-md" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <button onClick={() => setIsDark(false)} className={`p-1.5 rounded text-xs flex items-center gap-1 ${!isDark ? 'bg-primary text-primary-foreground' : ''}`}>
                <Sun className="w-3 h-3" /> Light
              </button>
              <button onClick={() => setIsDark(true)} className={`p-1.5 rounded text-xs flex items-center gap-1 ${isDark ? 'bg-primary text-primary-foreground' : ''}`}>
                <Moon className="w-3 h-3" /> Dark
              </button>
            </div>
          </div>

          {/* Preset themes */}
          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Theme Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyTheme(preset.colors)}
                  className="p-2 rounded-lg text-left transition-all hover:scale-[1.02]"
                  style={{ border: theme.primary === preset.colors.primary ? `2px solid hsl(var(--primary))` : '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--builder-component-bg))' }}
                >
                  <div className="flex gap-1 mb-1.5">
                    {[preset.colors.primary, preset.colors.secondary, preset.colors.accent, preset.colors.background].map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="text-[10px] font-medium">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color editor */}
          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Color Palette</label>
            <div className="space-y-2">
              {(Object.keys(theme) as Array<keyof ThemeColors>).map(key => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="color" value={theme[key]}
                    onChange={e => setTheme(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-7 h-7 rounded cursor-pointer border-0"
                  />
                  <span className="text-xs capitalize flex-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-[10px] font-mono opacity-50">{theme[key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom colors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium opacity-70">Custom Colors</label>
              <button
                onClick={() => setCustomColors(prev => [...prev, { name: `Color ${prev.length + 1}`, value: '#6366f1' }])}
                className="p-1 rounded hover:bg-muted"><Plus className="w-3 h-3" /></button>
            </div>
            {customColors.map((c, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <input type="color" value={c.value} onChange={e => {
                  const updated = [...customColors]; updated[i].value = e.target.value; setCustomColors(updated);
                }} className="w-6 h-6 rounded cursor-pointer border-0" />
                <input value={c.name} onChange={e => {
                  const updated = [...customColors]; updated[i].name = e.target.value; setCustomColors(updated);
                }} className="property-input flex-1 text-xs" />
                <button onClick={() => setCustomColors(prev => prev.filter((_, j) => j !== i))} className="p-1 rounded hover:bg-destructive/10">
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
            <div className="text-[10px] uppercase tracking-wider opacity-40 p-2">Live Preview</div>
            <div className="p-4 space-y-2" style={{ background: theme.background, color: theme.foreground }}>
              <div className="text-sm font-bold" style={{ fontFamily: typography.headingFont }}>Heading Text</div>
              <div className="text-xs" style={{ fontFamily: typography.bodyFont }}>Body text looks like this paragraph.</div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 rounded text-xs font-medium text-white" style={{ background: theme.primary }}>Primary</button>
                <button className="px-3 py-1 rounded text-xs font-medium text-white" style={{ background: theme.secondary }}>Secondary</button>
                <button className="px-3 py-1 rounded text-xs font-medium" style={{ background: theme.accent, color: '#fff' }}>Accent</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'typography' && (
        <div className="p-4 space-y-5">
          {/* Font pairings */}
          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Font Pairings</label>
            <div className="space-y-2">
              {FONT_PAIRINGS.map(pair => (
                <button
                  key={pair.label}
                  onClick={() => setTypography(prev => ({ ...prev, headingFont: pair.heading, bodyFont: pair.body }))}
                  className="w-full p-3 rounded-lg text-left transition-all hover:scale-[1.01]"
                  style={{
                    border: typography.headingFont === pair.heading ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--builder-panel-border))',
                    background: 'hsl(var(--builder-component-bg))',
                  }}
                >
                  <div className="text-xs font-bold" style={{ fontFamily: pair.heading }}>{pair.heading}</div>
                  <div className="text-[10px] opacity-60" style={{ fontFamily: pair.body }}>{pair.body} — {pair.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual font selection */}
          <div className="space-y-3">
            <div>
              <label className="text-xs opacity-70 mb-1.5 block">Heading Font</label>
              <select value={typography.headingFont} onChange={e => setTypography(prev => ({ ...prev, headingFont: e.target.value }))} className="property-input">
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs opacity-70 mb-1.5 block">Body Font</label>
              <select value={typography.bodyFont} onChange={e => setTypography(prev => ({ ...prev, bodyFont: e.target.value }))} className="property-input">
                {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs opacity-70 mb-1.5 block">Base Font Size</label>
              <div className="flex items-center gap-2">
                <input type="range" min="12" max="24" value={typography.baseSize} onChange={e => setTypography(prev => ({ ...prev, baseSize: e.target.value }))} className="flex-1 accent-primary" />
                <span className="text-xs font-mono w-8">{typography.baseSize}px</span>
              </div>
            </div>
            <div>
              <label className="text-xs opacity-70 mb-1.5 block">Line Height</label>
              <div className="flex items-center gap-2">
                <input type="range" min="1" max="2.5" step="0.1" value={typography.lineHeight} onChange={e => setTypography(prev => ({ ...prev, lineHeight: e.target.value }))} className="flex-1 accent-primary" />
                <span className="text-xs font-mono w-8">{typography.lineHeight}</span>
              </div>
            </div>
            <div>
              <label className="text-xs opacity-70 mb-1.5 block">Heading Weight</label>
              <select value={typography.headingWeight} onChange={e => setTypography(prev => ({ ...prev, headingWeight: e.target.value }))} className="property-input">
                {['300', '400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          {/* Type scale preview */}
          <div className="rounded-lg p-3 space-y-2" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-[10px] uppercase tracking-wider opacity-40 mb-2">Type Scale</div>
            {[
              { tag: 'H1', size: `${Number(typography.baseSize) * 2.5}px`, weight: typography.headingWeight },
              { tag: 'H2', size: `${Number(typography.baseSize) * 2}px`, weight: typography.headingWeight },
              { tag: 'H3', size: `${Number(typography.baseSize) * 1.5}px`, weight: typography.headingWeight },
              { tag: 'Body', size: `${typography.baseSize}px`, weight: typography.bodyWeight },
              { tag: 'Small', size: `${Number(typography.baseSize) * 0.875}px`, weight: typography.bodyWeight },
            ].map(s => (
              <div key={s.tag} className="flex items-center gap-3">
                <span className="text-[10px] font-mono opacity-40 w-8">{s.tag}</span>
                <span style={{ fontSize: Math.min(parseInt(s.size), 28), fontWeight: Number(s.weight), fontFamily: s.tag.startsWith('H') ? typography.headingFont : typography.bodyFont, lineHeight: typography.lineHeight }}>
                  The quick brown fox
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'spacing' && (
        <div className="p-4 space-y-5">
          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Spacing Scale</label>
            <div className="space-y-2">
              {[
                { name: 'XS', value: '4px' }, { name: 'SM', value: '8px' },
                { name: 'MD', value: '16px' }, { name: 'LG', value: '24px' },
                { name: 'XL', value: '32px' }, { name: '2XL', value: '48px' },
                { name: '3XL', value: '64px' }, { name: '4XL', value: '96px' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono opacity-50 w-8">{s.name}</span>
                  <div className="h-3 rounded" style={{ width: s.value, background: 'hsl(var(--primary))', opacity: 0.6 }} />
                  <span className="text-[10px] font-mono opacity-40">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Border Radius</label>
            <div className="grid grid-cols-4 gap-2">
              {['0', '4px', '8px', '12px', '16px', '24px', '9999px', '50%'].map(r => (
                <button key={r} className="aspect-square flex items-center justify-center rounded-md text-[10px] font-mono" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
                  <div className="w-6 h-6" style={{ borderRadius: r, background: 'hsl(var(--primary))', opacity: 0.6 }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium opacity-70 mb-2 block">Shadow Presets</label>
            <div className="space-y-2">
              {[
                { name: 'None', value: 'none' },
                { name: 'XS', value: '0 1px 2px rgba(0,0,0,0.05)' },
                { name: 'SM', value: '0 1px 3px rgba(0,0,0,0.1)' },
                { name: 'MD', value: '0 4px 6px -1px rgba(0,0,0,0.1)' },
                { name: 'LG', value: '0 10px 15px -3px rgba(0,0,0,0.1)' },
                { name: 'XL', value: '0 20px 25px -5px rgba(0,0,0,0.1)' },
                { name: '2XL', value: '0 25px 50px -12px rgba(0,0,0,0.25)' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono opacity-50 w-8">{s.name}</span>
                  <div className="w-12 h-8 rounded-md bg-card" style={{ boxShadow: s.value }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalDesignPanel;
