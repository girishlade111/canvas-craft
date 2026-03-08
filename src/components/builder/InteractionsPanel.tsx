import { useState } from 'react';
import {
  X, Zap, MousePointer, Scroll, Eye, Play, Clock, ArrowUp, ArrowDown,
  ArrowLeft, ArrowRight, RotateCw, Maximize2, Minimize2, Move,
  ChevronRight, ChevronDown, Plus, Search, Sparkles, Layers, Target,
  Monitor, Smartphone, Tablet, Volume2, Pause, SkipForward,
  FlipHorizontal, FlipVertical, Blend, Contrast, Sun, Moon,
  Loader2, Check, Copy, Trash2, Settings, Info, RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';

interface InteractionsPanelProps {
  onClose?: () => void;
}

// ─── Interaction Presets ───────────────────────────────────

interface InteractionPreset {
  id: string;
  name: string;
  desc: string;
  icon: typeof Zap;
  category: string;
  trigger: string;
  animation: string;
  css?: string;
}

const PRESETS: Record<string, InteractionPreset[]> = {
  'Scroll Animations': [
    { id: 'fade-in-up', name: 'Fade In Up', desc: 'Element fades in while sliding up', icon: ArrowUp, category: 'scroll', trigger: 'scroll-into-view', animation: 'fadeInUp' },
    { id: 'fade-in-down', name: 'Fade In Down', desc: 'Slides down with fade', icon: ArrowDown, category: 'scroll', trigger: 'scroll-into-view', animation: 'fadeInDown' },
    { id: 'fade-in-left', name: 'Slide From Left', desc: 'Slides in from the left', icon: ArrowRight, category: 'scroll', trigger: 'scroll-into-view', animation: 'fadeInLeft' },
    { id: 'fade-in-right', name: 'Slide From Right', desc: 'Slides in from the right', icon: ArrowLeft, category: 'scroll', trigger: 'scroll-into-view', animation: 'fadeInRight' },
    { id: 'zoom-in', name: 'Zoom In', desc: 'Scale up from small', icon: Maximize2, category: 'scroll', trigger: 'scroll-into-view', animation: 'zoomIn' },
    { id: 'zoom-out', name: 'Zoom Out', desc: 'Scale down from large', icon: Minimize2, category: 'scroll', trigger: 'scroll-into-view', animation: 'zoomOut' },
    { id: 'rotate-in', name: 'Rotate In', desc: 'Rotate while appearing', icon: RotateCw, category: 'scroll', trigger: 'scroll-into-view', animation: 'rotateIn' },
    { id: 'bounce-in', name: 'Bounce In', desc: 'Bouncy entrance effect', icon: Play, category: 'scroll', trigger: 'scroll-into-view', animation: 'bounceIn' },
    { id: 'flip-in', name: 'Flip In', desc: '3D flip entrance', icon: FlipHorizontal, category: 'scroll', trigger: 'scroll-into-view', animation: 'flipIn' },
  ],
  'Hover Effects': [
    { id: 'hover-grow', name: 'Grow', desc: 'Scale up on hover', icon: Maximize2, category: 'hover', trigger: 'hover', animation: 'grow', css: 'transform: scale(1.05)' },
    { id: 'hover-shrink', name: 'Shrink', desc: 'Scale down on hover', icon: Minimize2, category: 'hover', trigger: 'hover', animation: 'shrink', css: 'transform: scale(0.95)' },
    { id: 'hover-float', name: 'Float', desc: 'Lift with shadow', icon: ArrowUp, category: 'hover', trigger: 'hover', animation: 'float', css: 'transform: translateY(-4px)' },
    { id: 'hover-sink', name: 'Sink', desc: 'Press down effect', icon: ArrowDown, category: 'hover', trigger: 'hover', animation: 'sink', css: 'transform: translateY(4px)' },
    { id: 'hover-rotate', name: 'Rotate', desc: 'Slight rotation', icon: RotateCw, category: 'hover', trigger: 'hover', animation: 'rotate', css: 'transform: rotate(5deg)' },
    { id: 'hover-pulse', name: 'Pulse', desc: 'Pulsing glow effect', icon: Target, category: 'hover', trigger: 'hover', animation: 'pulse' },
    { id: 'hover-glow', name: 'Glow', desc: 'Color glow on hover', icon: Sun, category: 'hover', trigger: 'hover', animation: 'glow' },
    { id: 'hover-underline', name: 'Underline Slide', desc: 'Animated underline', icon: Move, category: 'hover', trigger: 'hover', animation: 'underline-slide' },
    { id: 'hover-color-shift', name: 'Color Shift', desc: 'Smooth color change', icon: Blend, category: 'hover', trigger: 'hover', animation: 'color-shift' },
  ],
  'Page Transitions': [
    { id: 'page-fade', name: 'Fade', desc: 'Smooth opacity transition', icon: Eye, category: 'page', trigger: 'page-load', animation: 'pageFade' },
    { id: 'page-slide-left', name: 'Slide Left', desc: 'Page slides from right', icon: ArrowLeft, category: 'page', trigger: 'page-load', animation: 'pageSlideLeft' },
    { id: 'page-slide-up', name: 'Slide Up', desc: 'Page slides from bottom', icon: ArrowUp, category: 'page', trigger: 'page-load', animation: 'pageSlideUp' },
    { id: 'page-zoom', name: 'Zoom', desc: 'Zoom in transition', icon: Maximize2, category: 'page', trigger: 'page-load', animation: 'pageZoom' },
    { id: 'page-blur', name: 'Blur In', desc: 'Blur to clear transition', icon: Contrast, category: 'page', trigger: 'page-load', animation: 'pageBlur' },
  ],
  'Scroll Effects': [
    { id: 'parallax', name: 'Parallax', desc: 'Depth scrolling effect', icon: Layers, category: 'scroll-effect', trigger: 'scroll', animation: 'parallax' },
    { id: 'sticky', name: 'Sticky', desc: 'Stick on scroll', icon: Target, category: 'scroll-effect', trigger: 'scroll', animation: 'sticky' },
    { id: 'reveal', name: 'Scroll Reveal', desc: 'Progressive reveal', icon: Eye, category: 'scroll-effect', trigger: 'scroll', animation: 'scrollReveal' },
    { id: 'counter', name: 'Number Counter', desc: 'Count up on scroll', icon: Plus, category: 'scroll-effect', trigger: 'scroll-into-view', animation: 'counter' },
    { id: 'progress-bar', name: 'Progress Bar', desc: 'Fill bar on scroll', icon: Loader2, category: 'scroll-effect', trigger: 'scroll', animation: 'progressFill' },
    { id: 'text-reveal', name: 'Text Reveal', desc: 'Character-by-character reveal', icon: Sparkles, category: 'scroll-effect', trigger: 'scroll-into-view', animation: 'textReveal' },
  ],
  'Click Actions': [
    { id: 'click-toggle', name: 'Toggle Visibility', desc: 'Show/hide element', icon: Eye, category: 'click', trigger: 'click', animation: 'toggleVisibility' },
    { id: 'click-scroll', name: 'Scroll To Section', desc: 'Smooth scroll to target', icon: Scroll, category: 'click', trigger: 'click', animation: 'scrollTo' },
    { id: 'click-modal', name: 'Open Modal', desc: 'Open a popup/modal', icon: Maximize2, category: 'click', trigger: 'click', animation: 'openModal' },
    { id: 'click-tab', name: 'Switch Tab', desc: 'Change active tab', icon: Layers, category: 'click', trigger: 'click', animation: 'switchTab' },
    { id: 'click-play', name: 'Play Video', desc: 'Start video playback', icon: Play, category: 'click', trigger: 'click', animation: 'playVideo' },
  ],
};

const InteractionsPanel = ({ onClose }: InteractionsPanelProps) => {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('Scroll Animations');
  const [duration, setDuration] = useState(0.6);
  const [delay, setDelay] = useState(0);
  const [easing, setEasing] = useState('ease-out');
  const { selectedComponentId, updateComponent, getSelectedComponent } = useBuilderStore();

  const selectedComponent = selectedComponentId ? getSelectedComponent() : null;

  const handleApplyInteraction = (preset: InteractionPreset) => {
    if (!selectedComponentId) {
      toast.error('Select a component first');
      return;
    }
    updateComponent(selectedComponentId, {
      props: {
        ...getSelectedComponent()?.props,
        interaction: {
          type: preset.category,
          trigger: preset.trigger,
          animation: preset.animation,
          duration,
          delay,
          easing,
        },
      },
    });
    toast.success(`Applied "${preset.name}" to component`);
  };

  const filteredPresets = search
    ? Object.fromEntries(
        Object.entries(PRESETS)
          .map(([cat, items]) => [cat, items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))])
          .filter(([, items]) => (items as InteractionPreset[]).length > 0)
      ) as Record<string, InteractionPreset[]>
    : PRESETS;

  const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.68,-0.55,0.27,1.55)'];

  return (
    <div className="builder-flyout-panel" style={{ width: 320 }}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Interactions</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-accent/10">
            <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        )}
      </div>

      <ScrollArea className="flex-1" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="p-3 space-y-3">
          {/* Selected component info */}
          {selectedComponent ? (
            <div className="p-2 rounded-lg border flex items-center gap-2" style={{ borderColor: 'hsl(var(--primary) / 0.3)', background: 'hsl(var(--primary) / 0.05)' }}>
              <Target className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              <span className="text-xs font-medium" style={{ color: 'hsl(var(--primary))' }}>
                {selectedComponent.label || selectedComponent.type}
              </span>
            </div>
          ) : (
            <div className="p-2 rounded-lg border flex items-center gap-2" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}>
              <Info className="w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <span className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Select a component to add interactions</span>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search interactions..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border"
              style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            />
          </div>

          {/* Animation Settings */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              <div className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                <span>Animation Settings</span>
              </div>
              <ChevronRight className="w-3 h-3" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              <div>
                <label className="text-[10px] font-medium mb-1 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Duration: {duration}s
                </label>
                <Slider value={[duration]} onValueChange={([v]) => setDuration(v)} min={0.1} max={3} step={0.1} />
              </div>
              <div>
                <label className="text-[10px] font-medium mb-1 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Delay: {delay}s
                </label>
                <Slider value={[delay]} onValueChange={([v]) => setDelay(v)} min={0} max={2} step={0.1} />
              </div>
              <div>
                <label className="text-[10px] font-medium mb-1 block" style={{ color: 'hsl(var(--muted-foreground))' }}>Easing</label>
                <select
                  value={easing}
                  onChange={e => setEasing(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                >
                  {EASINGS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Presets */}
          {Object.entries(filteredPresets).map(([category, items]) => (
            <Collapsible key={category} open={openCategory === category} onOpenChange={open => setOpenCategory(open ? category : null)}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                <span>{category}</span>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-[10px] px-1.5">{items.length}</Badge>
                  <ChevronRight className={`w-3 h-3 transition-transform ${openCategory === category ? 'rotate-90' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1">
                {items.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyInteraction(preset)}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left hover:bg-accent/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                      <preset.icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>{preset.name}</div>
                      <div className="text-[10px] truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{preset.desc}</div>
                    </div>
                    <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100" style={{ color: 'hsl(var(--primary))' }} />
                  </button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InteractionsPanel;
