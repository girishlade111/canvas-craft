import { useState, useMemo } from 'react';
import {
  X, Search, Sparkles, Zap, MousePointer, LayoutGrid, Type,
  CreditCard, MessageSquare, Navigation, Footprints, FormInput,
  Palette, Star, TrendingUp, Loader2, Plus, ChevronDown, ChevronRight,
  Wand2, Crown,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { useBuilderStore } from '@/store/builderStore';
import { useInteractiveElements, type InteractiveElementRow } from '@/hooks/useInteractiveElements';

interface InteractiveElementsPanelProps {
  onClose?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Elements', icon: LayoutGrid },
  { id: 'hero', label: 'Hero Animations', icon: Sparkles },
  { id: 'buttons', label: 'Animated Buttons', icon: MousePointer },
  { id: 'cards', label: 'Interactive Cards', icon: CreditCard },
  { id: 'text', label: 'Text Effects', icon: Type },
  { id: 'banners', label: 'Banners & Sections', icon: Zap },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'navigation', label: 'Navigation', icon: Navigation },
  { id: 'footers', label: 'Footers', icon: Footprints },
  { id: 'forms', label: 'Animated Forms', icon: FormInput },
  { id: 'pricing', label: 'Pricing & CTA', icon: CreditCard },
  { id: 'decorative', label: 'Decorative', icon: Palette },
];

const ANIMATION_COLORS: Record<string, string> = {
  'fade-in': '#3b82f6',
  'typewriter': '#8b5cf6',
  'gradient': '#ec4899',
  'scale': '#f59e0b',
  'parallax': '#06b6d4',
  'pulse': '#ef4444',
  'slide': '#10b981',
  'magnetic': '#6366f1',
  'shimmer': '#f59e0b',
  'bounce': '#14b8a6',
  'hover-lift': '#8b5cf6',
  'flip': '#ec4899',
  'stagger': '#3b82f6',
  'tilt': '#f97316',
  'glass': '#06b6d4',
  'counter': '#10b981',
  'highlight': '#eab308',
  'reveal': '#6366f1',
  'glitch': '#ef4444',
  'gradient-bg': '#ec4899',
  'particles': '#8b5cf6',
  'scroll-reveal': '#3b82f6',
  'marquee': '#f59e0b',
  'slide-in': '#10b981',
  'fade-rotate': '#6366f1',
  'sticky': '#3b82f6',
  'hamburger': '#64748b',
  'wave': '#06b6d4',
  'fade-up': '#8b5cf6',
  'focus-animate': '#6366f1',
  'newsletter': '#ec4899',
  'skeleton': '#94a3b8',
  'animated-bg': '#8b5cf6',
};

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const deepCloneWithIds = (components: any[]): any[] => {
  return components.map((comp: any) => ({
    ...comp,
    id: generateId(),
    children: comp.children ? deepCloneWithIds(comp.children) : undefined,
  }));
};

const InteractiveElementsPanel: React.FC<InteractiveElementsPanelProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedElement, setExpandedElement] = useState<string | null>(null);
  const schema = useBuilderStore((s) => s.schema);
  const setSchema = useBuilderStore((s) => s.setSchema);

  const { data: elements = [], isLoading } = useInteractiveElements(
    activeCategory === 'all' ? undefined : activeCategory
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return elements;
    const q = search.toLowerCase();
    return elements.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.includes(q)) ||
        e.animation_type.includes(q)
    );
  }, [elements, search]);

  const handleInsert = (element: InteractiveElementRow, targetSectionType?: string) => {
    const components = deepCloneWithIds(element.element_schema.components || []);
    if (components.length === 0) {
      toast.error('Element has no components');
      return;
    }

    const sections = [...schema.sections];
    let targetIdx = -1;

    if (targetSectionType) {
      targetIdx = sections.findIndex((s) => s.type === targetSectionType);
    }

    // Find first compatible section
    if (targetIdx === -1) {
      for (const compatType of element.compatible_sections) {
        targetIdx = sections.findIndex((s) => s.type === compatType);
        if (targetIdx !== -1) break;
      }
    }

    // Fallback: find any body section or create one
    if (targetIdx === -1) {
      targetIdx = sections.findIndex((s) => s.type === 'body');
    }
    if (targetIdx === -1) {
      const footerIdx = sections.findIndex((s) => s.type === 'footer');
      const newSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'body' as const,
        label: 'Content',
        components: [],
        styles: { padding: '40px' },
      };
      if (footerIdx !== -1) {
        sections.splice(footerIdx, 0, newSection);
        targetIdx = footerIdx;
      } else {
        sections.push(newSection);
        targetIdx = sections.length - 1;
      }
    }

    sections[targetIdx] = {
      ...sections[targetIdx],
      components: [...sections[targetIdx].components, ...components],
    };

    setSchema({ ...schema, sections });
    toast.success(`Added "${element.name}" to ${sections[targetIdx].label || sections[targetIdx].type}`);
  };

  const sectionTypes = schema.sections.map((s) => ({ id: s.id, type: s.type, label: s.label }));

  return (
    <div className="w-80 bg-background border-r border-border flex flex-col h-full animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
            <Wand2 className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Interactive Elements</h3>
            <p className="text-[10px] text-muted-foreground">{elements.length} animated components</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search animations..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-muted/30 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-3 border-b border-border">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                  isActive
                    ? 'text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={isActive ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : undefined}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Elements List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">No elements found</p>
            </div>
          ) : (
            filtered.map((element) => {
              const animColor = ANIMATION_COLORS[element.animation_type] || '#6366f1';
              const isExpanded = expandedElement === element.id;

              return (
                <Collapsible
                  key={element.id}
                  open={isExpanded}
                  onOpenChange={() => setExpandedElement(isExpanded ? null : element.id)}
                >
                  <div
                    className="rounded-xl border border-border bg-card hover:border-primary/30 transition-all group"
                  >
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="p-3 flex items-start gap-3">
                        {/* Thumbnail */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                          style={{ backgroundColor: `${animColor}15` }}
                        >
                          {element.thumbnail}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs font-semibold truncate">{element.name}</span>
                            {element.is_premium && (
                              <Crown className="w-3 h-3 text-amber-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                            {element.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Badge
                              variant="outline"
                              className="text-[8px] px-1.5 py-0 h-4 font-bold uppercase tracking-wider"
                              style={{ borderColor: animColor, color: animColor }}
                            >
                              {element.animation_type}
                            </Badge>
                            <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                              <TrendingUp className="w-2.5 h-2.5" /> {element.installs}
                            </span>
                          </div>
                        </div>

                        {/* Expand indicator */}
                        <div className="flex-shrink-0 mt-1">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-3 pb-3 space-y-2">
                        {/* Compatible sections info */}
                        <div className="flex flex-wrap gap-1">
                          {element.compatible_sections.map((s) => (
                            <span
                              key={s}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium capitalize"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Tags */}
                        {element.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {element.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="text-[8px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CSS Preview */}
                        {element.preview_css && (
                          <div className="bg-muted/50 rounded-lg p-2 font-mono text-[9px] text-muted-foreground overflow-hidden max-h-16">
                            {element.preview_css.slice(0, 120)}...
                          </div>
                        )}

                        {/* Insert buttons by section */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Insert into:
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {/* Quick insert to matching sections */}
                            {sectionTypes
                              .filter((s) => element.compatible_sections.includes(s.type))
                              .map((section) => (
                                <button
                                  key={section.id}
                                  onClick={() => handleInsert(element, section.type)}
                                  className="flex items-center gap-1 px-2.5 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-[10px] font-medium transition-all"
                                >
                                  <Plus className="w-3 h-3" />
                                  {section.label}
                                </button>
                              ))}
                            {/* Auto insert button */}
                            <button
                              onClick={() => handleInsert(element)}
                              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-[10px] font-medium transition-all col-span-2 text-primary-foreground"
                              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                            >
                              <Sparkles className="w-3 h-3" />
                              Auto Insert (Best Match)
                            </button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Star className="w-3 h-3 text-amber-500" />
          <span>Click any element → pick a section → inserted!</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveElementsPanel;
