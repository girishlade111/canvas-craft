import { useState } from 'react';
import {
  Palette, X, Type, Droplets, Sun, Moon, Copy, Plus, Trash2,
  Sparkles, Layers, Box, Grid3X3, Circle, Square, Triangle,
  Hexagon, Star, Heart, Zap, Eye, EyeOff, Lock, Unlock,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Move,
  RotateCw, FlipHorizontal, FlipVertical, Maximize2, Minimize2,
  Paintbrush, Blend, Contrast, Droplet, Waves, Wind,
  Cloudy, Sunrise, CircleDot, RectangleHorizontal, LayoutGrid,
  Columns, Rows, SplitSquareHorizontal, PanelTop, PanelBottom,
  MousePointer, Hand, Crosshair, Target, Focus, Aperture,
  Image, ImagePlus, ImageOff, Crop, ZoomIn, ZoomOut,
  CornerUpLeft, CornerUpRight, CornerDownLeft, CornerDownRight,
  ChevronRight, Check, Download, Upload, RefreshCw, Settings,
  Sliders, SlidersHorizontal, Gauge, Activity, TrendingUp,
} from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// ─── Types ─────────────────────────────────────────────────

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  baseSize: string;
  lineHeight: string;
  letterSpacing: string;
  headingWeight: string;
  bodyWeight: string;
  scale: string;
}

interface SpacingSettings {
  baseUnit: number;
  containerWidth: string;
  sectionPadding: string;
  componentGap: string;
}

interface EffectsSettings {
  borderRadius: string;
  shadowIntensity: number;
  blurAmount: number;
  animationSpeed: string;
  hoverScale: number;
}

// ─── Color Presets ─────────────────────────────────────────

const COLOR_PRESETS: { name: string; colors: ThemeColors; category: string }[] = [
  // Dark Themes
  { name: 'Midnight Pro', category: 'Dark', colors: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b', background: '#0f172a', foreground: '#f8fafc', muted: '#1e293b', card: '#1e293b', border: '#334155', success: '#22c55e', warning: '#eab308', error: '#ef4444', info: '#3b82f6' } },
  { name: 'Neon Cyber', category: 'Dark', colors: { primary: '#a855f7', secondary: '#ec4899', accent: '#22d3ee', background: '#09090b', foreground: '#fafafa', muted: '#18181b', card: '#1c1c1e', border: '#27272a', success: '#4ade80', warning: '#fbbf24', error: '#f87171', info: '#60a5fa' } },
  { name: 'Deep Space', category: 'Dark', colors: { primary: '#06b6d4', secondary: '#0ea5e9', accent: '#f97316', background: '#020617', foreground: '#f1f5f9', muted: '#0f172a', card: '#1e293b', border: '#1e3a5f', success: '#10b981', warning: '#f59e0b', error: '#dc2626', info: '#0284c7' } },
  { name: 'Carbon', category: 'Dark', colors: { primary: '#22d3ee', secondary: '#14b8a6', accent: '#fbbf24', background: '#171717', foreground: '#fafafa', muted: '#262626', card: '#262626', border: '#404040', success: '#34d399', warning: '#fcd34d', error: '#fb7185', info: '#38bdf8' } },
  // Light Themes
  { name: 'Ocean Breeze', category: 'Light', colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#f97316', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9', card: '#ffffff', border: '#e2e8f0', success: '#22c55e', warning: '#eab308', error: '#ef4444', info: '#3b82f6' } },
  { name: 'Forest Green', category: 'Light', colors: { primary: '#22c55e', secondary: '#10b981', accent: '#eab308', background: '#fafaf9', foreground: '#1c1917', muted: '#f5f5f4', card: '#ffffff', border: '#e7e5e4', success: '#16a34a', warning: '#ca8a04', error: '#dc2626', info: '#2563eb' } },
  { name: 'Rose Gold', category: 'Light', colors: { primary: '#f43f5e', secondary: '#ec4899', accent: '#d97706', background: '#fff1f2', foreground: '#1f2937', muted: '#fce7f3', card: '#ffffff', border: '#fda4af', success: '#4ade80', warning: '#fbbf24', error: '#f87171', info: '#60a5fa' } },
  { name: 'Arctic Blue', category: 'Light', colors: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#14b8a6', background: '#f0f9ff', foreground: '#0c4a6e', muted: '#e0f2fe', card: '#ffffff', border: '#bae6fd', success: '#22c55e', warning: '#f59e0b', error: '#ef4444', info: '#0ea5e9' } },
  // Neutral
  { name: 'Monochrome', category: 'Neutral', colors: { primary: '#18181b', secondary: '#3f3f46', accent: '#a1a1aa', background: '#ffffff', foreground: '#09090b', muted: '#f4f4f5', card: '#ffffff', border: '#e4e4e7', success: '#22c55e', warning: '#eab308', error: '#ef4444', info: '#3b82f6' } },
  { name: 'Warm Sunset', category: 'Neutral', colors: { primary: '#ea580c', secondary: '#dc2626', accent: '#facc15', background: '#fffbeb', foreground: '#1c1917', muted: '#fef3c7', card: '#ffffff', border: '#fde68a', success: '#16a34a', warning: '#d97706', error: '#b91c1c', info: '#1d4ed8' } },
  // Brand Themes
  { name: 'Stripe', category: 'Brand', colors: { primary: '#635bff', secondary: '#00d4ff', accent: '#80e9ff', background: '#0a2540', foreground: '#ffffff', muted: '#1a3a5c', card: '#1a3a5c', border: '#2d4a6f', success: '#32d583', warning: '#ffbb00', error: '#ff5630', info: '#36b3ff' } },
  { name: 'Linear', category: 'Brand', colors: { primary: '#5e6ad2', secondary: '#8b7cf6', accent: '#f2c94c', background: '#0d0d0f', foreground: '#f8f8f8', muted: '#1c1c1f', card: '#1c1c1f', border: '#2a2a2d', success: '#4ade80', warning: '#fbbf24', error: '#f87171', info: '#60a5fa' } },
];

// ─── Gradients ─────────────────────────────────────────────

const GRADIENT_PRESETS = [
  { name: 'Sunset', value: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)', colors: ['#f97316', '#ec4899'] },
  { name: 'Ocean', value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', colors: ['#06b6d4', '#3b82f6'] },
  { name: 'Forest', value: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)', colors: ['#22c55e', '#14b8a6'] },
  { name: 'Purple Haze', value: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', colors: ['#8b5cf6', '#ec4899'] },
  { name: 'Fire', value: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)', colors: ['#ef4444', '#f97316', '#fbbf24'] },
  { name: 'Aurora', value: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)', colors: ['#22d3ee', '#a855f7', '#ec4899'] },
  { name: 'Midnight', value: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', colors: ['#1e293b', '#0f172a'] },
  { name: 'Gold', value: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', colors: ['#fbbf24', '#d97706'] },
  { name: 'Rose', value: 'linear-gradient(135deg, #fda4af 0%, #f43f5e 100%)', colors: ['#fda4af', '#f43f5e'] },
  { name: 'Emerald', value: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', colors: ['#34d399', '#059669'] },
  { name: 'Sky', value: 'linear-gradient(180deg, #0ea5e9 0%, #bae6fd 100%)', colors: ['#0ea5e9', '#bae6fd'] },
  { name: 'Mesh', value: 'radial-gradient(at 40% 20%, #a855f7 0px, transparent 50%), radial-gradient(at 80% 0%, #22d3ee 0px, transparent 50%), radial-gradient(at 0% 50%, #ec4899 0px, transparent 50%)', colors: ['#a855f7', '#22d3ee', '#ec4899'] },
];

// ─── Fonts ─────────────────────────────────────────────────

const FONT_CATEGORIES = {
  'Sans Serif': ['Inter', 'DM Sans', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Nunito', 'Raleway', 'Outfit', 'Plus Jakarta Sans', 'Sora', 'Space Grotesk', 'General Sans', 'Satoshi'],
  'Serif': ['Playfair Display', 'Merriweather', 'Crimson Text', 'Source Serif Pro', 'Lora', 'EB Garamond', 'Cormorant', 'Libre Baskerville'],
  'Display': ['Clash Display', 'Cabinet Grotesk', 'Bebas Neue', 'Righteous', 'Archivo Black', 'Anton', 'Oswald'],
  'Monospace': ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', 'Roboto Mono', 'Space Mono'],
};

const FONT_PAIRINGS = [
  { heading: 'Playfair Display', body: 'Source Serif Pro', label: 'Editorial Classic', category: 'Elegant' },
  { heading: 'Space Grotesk', body: 'DM Sans', label: 'Modern Tech', category: 'Tech' },
  { heading: 'Clash Display', body: 'Satoshi', label: 'Bold Geometric', category: 'Bold' },
  { heading: 'Cabinet Grotesk', body: 'General Sans', label: 'Clean Studio', category: 'Minimal' },
  { heading: 'Sora', body: 'Inter', label: 'Minimal Pro', category: 'Minimal' },
  { heading: 'Outfit', body: 'Plus Jakarta Sans', label: 'Friendly SaaS', category: 'Friendly' },
  { heading: 'Bebas Neue', body: 'Open Sans', label: 'Sports & Fitness', category: 'Bold' },
  { heading: 'Cormorant', body: 'Lora', label: 'Luxury Editorial', category: 'Elegant' },
  { heading: 'Archivo Black', body: 'Inter', label: 'Impact Headlines', category: 'Bold' },
  { heading: 'EB Garamond', body: 'Crimson Text', label: 'Classic Literary', category: 'Elegant' },
];

// ─── Type Scale Presets ────────────────────────────────────

const TYPE_SCALES = [
  { name: 'Minor Second', ratio: 1.067, label: '1.067' },
  { name: 'Major Second', ratio: 1.125, label: '1.125' },
  { name: 'Minor Third', ratio: 1.2, label: '1.200' },
  { name: 'Major Third', ratio: 1.25, label: '1.250' },
  { name: 'Perfect Fourth', ratio: 1.333, label: '1.333' },
  { name: 'Augmented Fourth', ratio: 1.414, label: '1.414' },
  { name: 'Perfect Fifth', ratio: 1.5, label: '1.500' },
  { name: 'Golden Ratio', ratio: 1.618, label: '1.618' },
];

// ─── Effects & Animation Presets ───────────────────────────

const ANIMATION_PRESETS = [
  { name: 'None', value: 'none', duration: '0ms' },
  { name: 'Instant', value: 'all', duration: '100ms' },
  { name: 'Fast', value: 'all', duration: '150ms' },
  { name: 'Normal', value: 'all', duration: '200ms' },
  { name: 'Relaxed', value: 'all', duration: '300ms' },
  { name: 'Slow', value: 'all', duration: '500ms' },
];

const EASING_PRESETS = [
  { name: 'Linear', value: 'linear' },
  { name: 'Ease', value: 'ease' },
  { name: 'Ease In', value: 'ease-in' },
  { name: 'Ease Out', value: 'ease-out' },
  { name: 'Ease In Out', value: 'ease-in-out' },
  { name: 'Spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  { name: 'Bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
];

const SHADOW_PRESETS = [
  { name: 'None', value: 'none' },
  { name: 'XS', value: '0 1px 2px rgba(0,0,0,0.05)' },
  { name: 'SM', value: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' },
  { name: 'MD', value: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' },
  { name: 'LG', value: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' },
  { name: 'XL', value: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' },
  { name: '2XL', value: '0 25px 50px -12px rgba(0,0,0,0.25)' },
  { name: 'Inner', value: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)' },
  { name: 'Glow', value: '0 0 15px rgba(99, 102, 241, 0.5)' },
  { name: 'Neon', value: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6' },
];

const BORDER_RADIUS_PRESETS = [
  { name: 'None', value: '0', icon: Square },
  { name: 'SM', value: '0.125rem', icon: Square },
  { name: 'MD', value: '0.375rem', icon: Square },
  { name: 'LG', value: '0.5rem', icon: Square },
  { name: 'XL', value: '0.75rem', icon: Square },
  { name: '2XL', value: '1rem', icon: Square },
  { name: '3XL', value: '1.5rem', icon: Square },
  { name: 'Full', value: '9999px', icon: Circle },
];

// ─── Layout Presets ────────────────────────────────────────

const CONTAINER_WIDTHS = [
  { name: 'Narrow', value: '640px', description: 'Blog posts, articles' },
  { name: 'Default', value: '768px', description: 'Standard content' },
  { name: 'Wide', value: '1024px', description: 'Dashboards, apps' },
  { name: 'Extra Wide', value: '1280px', description: 'Large displays' },
  { name: 'Full', value: '1536px', description: 'Maximum width' },
];

const GRID_PRESETS = [
  { name: '12 Column', columns: 12, gap: '1rem' },
  { name: '6 Column', columns: 6, gap: '1.5rem' },
  { name: '4 Column', columns: 4, gap: '2rem' },
  { name: '3 Column', columns: 3, gap: '2rem' },
  { name: 'Auto Fit', columns: 'auto-fit', gap: '1rem', minWidth: '250px' },
];

// ─── Collapsible Section ───────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = true }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Color Swatch Component ────────────────────────────────

const ColorSwatch = ({ color, label, onChange, size = 'md' }: { color: string; label: string; onChange: (color: string) => void; size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-10 h-10' };
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={`${sizes[size]} rounded-md cursor-pointer border border-border/50`}
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{label}</div>
        <div className="text-[10px] font-mono text-muted-foreground">{color}</div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────

const GlobalDesignPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'effects'>('colors');
  const [theme, setTheme] = useState<ThemeColors>(COLOR_PRESETS[0].colors);
  const [typography, setTypography] = useState<TypographySettings>({
    headingFont: 'Inter', bodyFont: 'Inter', monoFont: 'JetBrains Mono',
    baseSize: '16', lineHeight: '1.6', letterSpacing: '0', headingWeight: '700', bodyWeight: '400', scale: '1.25',
  });
  const [spacing, setSpacing] = useState<SpacingSettings>({
    baseUnit: 4, containerWidth: '1280px', sectionPadding: '64px', componentGap: '16px',
  });
  const [effects, setEffects] = useState<EffectsSettings>({
    borderRadius: '0.5rem', shadowIntensity: 50, blurAmount: 0, animationSpeed: '200ms', hoverScale: 1.02,
  });
  const [customColors, setCustomColors] = useState<{ name: string; value: string }[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);

  const applyTheme = (colors: ThemeColors) => {
    setTheme(colors);
    toast.success('Theme applied');
  };

  const copyCSS = () => {
    const css = `:root {
  /* Colors */
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --muted: ${theme.muted};
  --card: ${theme.card};
  --border: ${theme.border};
  --success: ${theme.success};
  --warning: ${theme.warning};
  --error: ${theme.error};
  --info: ${theme.info};
  
  /* Typography */
  --heading-font: '${typography.headingFont}', sans-serif;
  --body-font: '${typography.bodyFont}', sans-serif;
  --mono-font: '${typography.monoFont}', monospace;
  --base-size: ${typography.baseSize}px;
  --line-height: ${typography.lineHeight};
  --letter-spacing: ${typography.letterSpacing}em;
  --type-scale: ${typography.scale};
  
  /* Spacing */
  --spacing-unit: ${spacing.baseUnit}px;
  --container-width: ${spacing.containerWidth};
  --section-padding: ${spacing.sectionPadding};
  --component-gap: ${spacing.componentGap};
  
  /* Effects */
  --border-radius: ${effects.borderRadius};
  --animation-speed: ${effects.animationSpeed};
  --hover-scale: ${effects.hoverScale};
}`;
    navigator.clipboard.writeText(css);
    toast.success('CSS variables copied!');
  };

  const exportJSON = () => {
    const data = { theme, typography, spacing, effects, customColors };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-system.json';
    a.click();
    toast.success('Design system exported');
  };

  return (
    <div className="builder-flyout-panel flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Palette className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Design System</h2>
            <p className="text-[10px] text-muted-foreground">Global styles & theming</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={copyCSS} className="p-1.5 rounded hover:bg-muted"><Copy className="w-3.5 h-3.5" /></button>
              </TooltipTrigger>
              <TooltipContent>Copy CSS</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={exportJSON} className="p-1.5 rounded hover:bg-muted"><Download className="w-3.5 h-3.5" /></button>
              </TooltipTrigger>
              <TooltipContent>Export JSON</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border shrink-0">
        <div className="flex p-1 gap-1">
          {[
            { id: 'colors' as const, label: 'Colors', icon: Droplets },
            { id: 'typography' as const, label: 'Type', icon: Type },
            { id: 'spacing' as const, label: 'Layout', icon: LayoutGrid },
            { id: 'effects' as const, label: 'Effects', icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                activeTab === id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════════ */}
        {/* COLORS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'colors' && (
          <div className="divide-y divide-border/30">
            {/* Theme Mode */}
            <Section title="Theme Mode" icon={isDark ? Moon : Sun}>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <button
                  onClick={() => setIsDark(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-colors ${!isDark ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                >
                  <Sun className="w-4 h-4" /> Light
                </button>
                <button
                  onClick={() => setIsDark(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-colors ${isDark ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                >
                  <Moon className="w-4 h-4" /> Dark
                </button>
              </div>
            </Section>

            {/* Theme Presets */}
            <Section title="Theme Presets" icon={Palette}>
              {['Dark', 'Light', 'Neutral', 'Brand'].map(category => (
                <div key={category} className="mb-4">
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{category}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_PRESETS.filter(p => p.category === category).map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => applyTheme(preset.colors)}
                        className={`p-2 rounded-lg text-left transition-all hover:scale-[1.02] ${
                          theme.primary === preset.colors.primary ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : 'border border-border/50 hover:border-border'
                        }`}
                        style={{ background: preset.colors.background }}
                      >
                        <div className="flex gap-0.5 mb-1.5">
                          {[preset.colors.primary, preset.colors.secondary, preset.colors.accent].map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full" style={{ background: c }} />
                          ))}
                        </div>
                        <div className="text-[10px] font-medium" style={{ color: preset.colors.foreground }}>{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* Gradients */}
            <Section title="Gradient Presets" icon={Blend} defaultOpen={false}>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENT_PRESETS.map(gradient => (
                  <button
                    key={gradient.name}
                    onClick={() => setSelectedGradient(gradient.value)}
                    className={`aspect-square rounded-lg transition-all hover:scale-105 ${selectedGradient === gradient.value ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                    style={{ background: gradient.value }}
                    title={gradient.name}
                  />
                ))}
              </div>
            </Section>

            {/* Color Palette */}
            <Section title="Color Palette" icon={Droplet}>
              <div className="space-y-3">
                {(Object.keys(theme) as Array<keyof ThemeColors>).map(key => (
                  <ColorSwatch
                    key={key}
                    color={theme[key]}
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    onChange={(color) => setTheme(prev => ({ ...prev, [key]: color }))}
                  />
                ))}
              </div>
            </Section>

            {/* Custom Colors */}
            <Section title="Custom Colors" icon={Plus} defaultOpen={false}>
              <button
                onClick={() => setCustomColors(prev => [...prev, { name: `Custom ${prev.length + 1}`, value: '#6366f1' }])}
                className="w-full py-2 border border-dashed border-border/50 rounded-lg text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors mb-3"
              >
                + Add Custom Color
              </button>
              <div className="space-y-2">
                {customColors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="color" value={c.value} onChange={e => {
                      const updated = [...customColors]; updated[i].value = e.target.value; setCustomColors(updated);
                    }} className="w-7 h-7 rounded cursor-pointer border-0" />
                    <input value={c.name} onChange={e => {
                      const updated = [...customColors]; updated[i].name = e.target.value; setCustomColors(updated);
                    }} className="flex-1 bg-muted/30 border-0 rounded px-2 py-1 text-xs" />
                    <button onClick={() => setCustomColors(prev => prev.filter((_, j) => j !== i))} className="p-1 rounded hover:bg-destructive/10">
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            {/* Live Preview */}
            <Section title="Live Preview" icon={Eye}>
              <div className="rounded-lg overflow-hidden border border-border/50" style={{ background: theme.background }}>
                <div className="p-4 space-y-3">
                  <div className="text-lg font-bold" style={{ color: theme.foreground, fontFamily: typography.headingFont }}>Heading</div>
                  <div className="text-sm" style={{ color: theme.foreground, fontFamily: typography.bodyFont }}>Body text example</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded text-xs text-white" style={{ background: theme.primary }}>Primary</span>
                    <span className="px-3 py-1 rounded text-xs text-white" style={{ background: theme.secondary }}>Secondary</span>
                    <span className="px-3 py-1 rounded text-xs text-white" style={{ background: theme.accent }}>Accent</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ background: theme.success }}>Success</span>
                    <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ background: theme.warning }}>Warning</span>
                    <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ background: theme.error }}>Error</span>
                    <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ background: theme.info }}>Info</span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* TYPOGRAPHY TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'typography' && (
          <div className="divide-y divide-border/30">
            {/* Font Pairings */}
            <Section title="Font Pairings" icon={Type}>
              <div className="space-y-2">
                {FONT_PAIRINGS.map(pair => (
                  <button
                    key={pair.label}
                    onClick={() => setTypography(prev => ({ ...prev, headingFont: pair.heading, bodyFont: pair.body }))}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      typography.headingFont === pair.heading ? 'ring-2 ring-primary bg-primary/5' : 'border border-border/50 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ fontFamily: pair.heading }}>{pair.heading}</span>
                      <Badge variant="secondary" className="text-[9px]">{pair.category}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: pair.body }}>{pair.body} — {pair.label}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Font Selection */}
            <Section title="Font Selection" icon={AlignLeft}>
              <div className="space-y-4">
                {Object.entries(FONT_CATEGORIES).map(([category, fonts]) => (
                  <div key={category}>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">{category}</div>
                    <select
                      value={category === 'Monospace' ? typography.monoFont : (category === 'Serif' || category === 'Display' ? typography.headingFont : typography.bodyFont)}
                      onChange={e => {
                        if (category === 'Monospace') setTypography(prev => ({ ...prev, monoFont: e.target.value }));
                        else if (category === 'Serif' || category === 'Display') setTypography(prev => ({ ...prev, headingFont: e.target.value }));
                        else setTypography(prev => ({ ...prev, bodyFont: e.target.value }));
                      }}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </Section>

            {/* Type Scale */}
            <Section title="Type Scale" icon={TrendingUp}>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {TYPE_SCALES.map(scale => (
                  <button
                    key={scale.name}
                    onClick={() => setTypography(prev => ({ ...prev, scale: scale.ratio.toString() }))}
                    className={`p-2 rounded-lg text-left text-xs ${
                      typography.scale === scale.ratio.toString() ? 'bg-primary/10 border-primary' : 'border border-border/50'
                    }`}
                  >
                    <div className="font-medium">{scale.name}</div>
                    <div className="text-muted-foreground font-mono">{scale.label}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Typography Controls */}
            <Section title="Typography Controls" icon={SlidersHorizontal}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Base Size</span>
                    <span className="font-mono">{typography.baseSize}px</span>
                  </div>
                  <Slider
                    value={[Number(typography.baseSize)]}
                    onValueChange={([v]) => setTypography(prev => ({ ...prev, baseSize: v.toString() }))}
                    min={12} max={24} step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Line Height</span>
                    <span className="font-mono">{typography.lineHeight}</span>
                  </div>
                  <Slider
                    value={[Number(typography.lineHeight) * 100]}
                    onValueChange={([v]) => setTypography(prev => ({ ...prev, lineHeight: (v / 100).toString() }))}
                    min={100} max={250} step={5}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Letter Spacing</span>
                    <span className="font-mono">{typography.letterSpacing}em</span>
                  </div>
                  <Slider
                    value={[(Number(typography.letterSpacing) + 0.1) * 100]}
                    onValueChange={([v]) => setTypography(prev => ({ ...prev, letterSpacing: ((v / 100) - 0.1).toFixed(2) }))}
                    min={0} max={20} step={1}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs mb-1.5">Heading Weight</div>
                    <select
                      value={typography.headingWeight}
                      onChange={e => setTypography(prev => ({ ...prev, headingWeight: e.target.value }))}
                      className="w-full bg-muted/30 border-0 rounded-md px-2 py-1.5 text-xs"
                    >
                      {['300', '400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5">Body Weight</div>
                    <select
                      value={typography.bodyWeight}
                      onChange={e => setTypography(prev => ({ ...prev, bodyWeight: e.target.value }))}
                      className="w-full bg-muted/30 border-0 rounded-md px-2 py-1.5 text-xs"
                    >
                      {['300', '400', '500', '600', '700'].map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </Section>

            {/* Type Preview */}
            <Section title="Type Preview" icon={Eye}>
              <div className="rounded-lg p-4 bg-muted/20 space-y-2">
                {[
                  { tag: 'H1', multiplier: 2.5 },
                  { tag: 'H2', multiplier: 2 },
                  { tag: 'H3', multiplier: 1.5 },
                  { tag: 'H4', multiplier: 1.25 },
                  { tag: 'Body', multiplier: 1 },
                  { tag: 'Small', multiplier: 0.875 },
                ].map(({ tag, multiplier }) => (
                  <div key={tag} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground w-10">{tag}</span>
                    <span
                      style={{
                        fontSize: Math.min(Number(typography.baseSize) * multiplier, 28),
                        fontWeight: tag.startsWith('H') ? Number(typography.headingWeight) : Number(typography.bodyWeight),
                        fontFamily: tag.startsWith('H') ? typography.headingFont : typography.bodyFont,
                        lineHeight: typography.lineHeight,
                        letterSpacing: `${typography.letterSpacing}em`,
                      }}
                    >
                      The quick brown fox
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* SPACING/LAYOUT TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'spacing' && (
          <div className="divide-y divide-border/30">
            {/* Container Width */}
            <Section title="Container Width" icon={Columns}>
              <div className="space-y-2">
                {CONTAINER_WIDTHS.map(width => (
                  <button
                    key={width.name}
                    onClick={() => setSpacing(prev => ({ ...prev, containerWidth: width.value }))}
                    className={`w-full p-3 rounded-lg text-left ${
                      spacing.containerWidth === width.value ? 'bg-primary/10 ring-1 ring-primary' : 'border border-border/50 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{width.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{width.value}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{width.description}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Grid System */}
            <Section title="Grid System" icon={Grid3X3}>
              <div className="space-y-2">
                {GRID_PRESETS.map(grid => (
                  <div key={grid.name} className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">{grid.name}</span>
                      <span className="text-[10px] text-muted-foreground">Gap: {grid.gap}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(typeof grid.columns === 'number' ? Math.min(grid.columns, 12) : 6)].map((_, i) => (
                        <div key={i} className="flex-1 h-4 bg-primary/20 rounded" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Spacing Scale */}
            <Section title="Spacing Scale" icon={Move}>
              <div className="space-y-2">
                {[
                  { name: '4XS', multiplier: 0.25 }, { name: '3XS', multiplier: 0.5 },
                  { name: '2XS', multiplier: 1 }, { name: 'XS', multiplier: 2 },
                  { name: 'SM', multiplier: 3 }, { name: 'MD', multiplier: 4 },
                  { name: 'LG', multiplier: 6 }, { name: 'XL', multiplier: 8 },
                  { name: '2XL', multiplier: 12 }, { name: '3XL', multiplier: 16 },
                  { name: '4XL', multiplier: 24 },
                ].map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground w-8">{s.name}</span>
                    <div
                      className="h-3 rounded bg-primary/50"
                      style={{ width: Math.min(s.multiplier * spacing.baseUnit, 200) }}
                    />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {s.multiplier * spacing.baseUnit}px
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span>Base Unit</span>
                  <span className="font-mono">{spacing.baseUnit}px</span>
                </div>
                <Slider
                  value={[spacing.baseUnit]}
                  onValueChange={([v]) => setSpacing(prev => ({ ...prev, baseUnit: v }))}
                  min={2} max={8} step={1}
                />
              </div>
            </Section>

            {/* Section Padding */}
            <Section title="Section Padding" icon={RectangleHorizontal} defaultOpen={false}>
              <div className="grid grid-cols-4 gap-2">
                {['32px', '48px', '64px', '80px', '96px', '120px', '160px', '200px'].map(padding => (
                  <button
                    key={padding}
                    onClick={() => setSpacing(prev => ({ ...prev, sectionPadding: padding }))}
                    className={`p-2 rounded-lg text-center text-[10px] font-mono ${
                      spacing.sectionPadding === padding ? 'bg-primary text-primary-foreground' : 'border border-border/50 hover:border-border'
                    }`}
                  >
                    {padding}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════ */}
        {/* EFFECTS TAB */}
        {/* ════════════════════════════════════════════════════════ */}
        {activeTab === 'effects' && (
          <div className="divide-y divide-border/30">
            {/* Border Radius */}
            <Section title="Border Radius" icon={Square}>
              <div className="grid grid-cols-4 gap-2">
                {BORDER_RADIUS_PRESETS.map(radius => (
                  <button
                    key={radius.name}
                    onClick={() => setEffects(prev => ({ ...prev, borderRadius: radius.value }))}
                    className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-lg ${
                      effects.borderRadius === radius.value ? 'bg-primary/10 ring-1 ring-primary' : 'border border-border/50 hover:border-border'
                    }`}
                  >
                    <div
                      className="w-8 h-8 bg-primary/50"
                      style={{ borderRadius: radius.value }}
                    />
                    <span className="text-[9px] font-mono">{radius.name}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* Shadows */}
            <Section title="Shadow Presets" icon={Layers}>
              <div className="space-y-3">
                {SHADOW_PRESETS.map(shadow => (
                  <div key={shadow.name} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground w-10">{shadow.name}</span>
                    <div
                      className="w-16 h-10 rounded-md bg-card"
                      style={{ boxShadow: shadow.value }}
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* Animation Speed */}
            <Section title="Animation Speed" icon={Zap}>
              <div className="grid grid-cols-3 gap-2">
                {ANIMATION_PRESETS.map(anim => (
                  <button
                    key={anim.name}
                    onClick={() => setEffects(prev => ({ ...prev, animationSpeed: anim.duration }))}
                    className={`p-2 rounded-lg text-center ${
                      effects.animationSpeed === anim.duration ? 'bg-primary text-primary-foreground' : 'border border-border/50 hover:border-border'
                    }`}
                  >
                    <div className="text-xs font-medium">{anim.name}</div>
                    <div className="text-[10px] opacity-70">{anim.duration}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Easing */}
            <Section title="Easing Curves" icon={Activity} defaultOpen={false}>
              <div className="space-y-2">
                {EASING_PRESETS.map(easing => (
                  <div key={easing.name} className="flex items-center justify-between p-2 rounded-lg border border-border/50">
                    <span className="text-xs font-medium">{easing.name}</span>
                    <code className="text-[9px] text-muted-foreground font-mono max-w-[120px] truncate">{easing.value}</code>
                  </div>
                ))}
              </div>
            </Section>

            {/* Hover Effects */}
            <Section title="Hover Effects" icon={MousePointer}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Hover Scale</span>
                    <span className="font-mono">{effects.hoverScale}</span>
                  </div>
                  <Slider
                    value={[effects.hoverScale * 100]}
                    onValueChange={([v]) => setEffects(prev => ({ ...prev, hoverScale: v / 100 }))}
                    min={100} max={115} step={1}
                  />
                </div>
                <div className="flex justify-center p-6">
                  <div
                    className="w-24 h-16 bg-primary rounded-lg cursor-pointer transition-transform"
                    style={{ transform: 'scale(1)' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.transform = `scale(${effects.hoverScale})`}
                    onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
                  />
                </div>
              </div>
            </Section>

            {/* Blur & Opacity */}
            <Section title="Blur & Glass" icon={Droplets} defaultOpen={false}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Blur Amount</span>
                    <span className="font-mono">{effects.blurAmount}px</span>
                  </div>
                  <Slider
                    value={[effects.blurAmount]}
                    onValueChange={([v]) => setEffects(prev => ({ ...prev, blurAmount: v }))}
                    min={0} max={20} step={1}
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div
                    className="p-4 rounded-lg bg-background/80"
                    style={{ backdropFilter: `blur(${effects.blurAmount}px)` }}
                  >
                    <div className="text-xs">Glassmorphism Preview</div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default GlobalDesignPanel;
