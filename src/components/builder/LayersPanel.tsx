import { useState, useMemo } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent, PageSection } from '@/types/builder';
import {
  Layers, Eye, EyeOff, Lock, Unlock, ChevronRight, ChevronDown,
  GripVertical, Trash2, Copy, Plus, ArrowUp, ArrowDown, Image,
  MoreHorizontal, Type, Square, Box, LayoutGrid, Columns, Rows,
  Circle, Star, Zap, Code, Music, FileText, Link,
  FormInput, CheckSquare, List, Table, Navigation, Menu,
  Quote, Heading1, Heading2, AlignLeft, ImageIcon, Film, MapPin,
  Calendar, Clock, User, Globe, Share2,
  ShoppingCart, CreditCard, Package, Tag,
  Pencil, Sparkles, Cloud,
  Search, Filter, SlidersHorizontal, Settings, MoreVertical,
  FolderClosed, Move,
  CheckCircle,
  Maximize2, Minimize2,
  PanelLeft, PanelTop, PanelBottom, Layout,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button as UIButton } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ─── Custom Minus Icon ─────────────────────────────────────

const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ─── Component Type Icons Map ──────────────────────────────

const COMPONENT_ICONS: Record<string, any> = {
  // Text
  heading: Heading1, 'heading-1': Heading1, 'heading-2': Heading2, paragraph: AlignLeft,
  text: Type, label: Type, quote: Quote, blockquote: Quote, code: Code,
  // Layout
  section: PanelTop, container: Box, grid: LayoutGrid, columns: Columns,
  row: Rows, group: FolderClosed, stack: Layers, flex: Layout,
  // Media
  image: ImageIcon, video: Film, audio: Music, gallery: Image,
  avatar: User, icon: Star, 'lucide-icon': Zap, 'hero-icon': Sparkles,
  // Forms
  form: FormInput, input: FormInput, button: Circle, checkbox: CheckSquare,
  select: List, textarea: FileText, radio: Circle,
  // Navigation
  navbar: Navigation, menu: Menu, link: Link, breadcrumb: ChevronRight,
  tabs: PanelTop, accordion: List, sidebar: PanelLeft,
  // Cards & Content
  card: Square, hero: Maximize2, feature: Star, testimonial: Quote,
  pricing: Tag, cta: Zap, banner: PanelTop, modal: Maximize2,
  // E-commerce
  product: Package, cart: ShoppingCart, checkout: CreditCard,
  'product-card': Package, 'price-tag': Tag,
  // Widgets
  calendar: Calendar, clock: Clock, map: MapPin, weather: Cloud,
  chart: SlidersHorizontal, progress: SlidersHorizontal, rating: Star,
  // Social
  social: Share2, 'social-links': Globe, share: Share2,
  // Embeds
  youtube: Film, vimeo: Film, spotify: Music, instagram: ImageIcon,
  twitter: Globe, embed: Code, iframe: Globe,
  // Advanced
  table: Table, list: List, divider: MinusIcon, spacer: Move,
  html: Code, script: Code, 'custom-code': Code,
};

const getTypeIcon = (type: string) => {
  return COMPONENT_ICONS[type] || Square;
};

const getTypeColor = (type: string): string => {
  if (['heading', 'paragraph', 'text', 'label', 'quote', 'code'].includes(type)) return 'hsl(var(--chart-1))';
  if (['section', 'container', 'grid', 'columns', 'row', 'group', 'stack'].includes(type)) return 'hsl(var(--chart-2))';
  if (['image', 'video', 'audio', 'gallery', 'avatar'].includes(type)) return 'hsl(var(--chart-3))';
  if (['form', 'input', 'button', 'checkbox', 'select'].includes(type)) return 'hsl(var(--chart-4))';
  if (['navbar', 'menu', 'link', 'tabs', 'accordion'].includes(type)) return 'hsl(var(--chart-5))';
  return 'hsl(var(--muted-foreground))';
};

// ─── Quick Actions Bar ─────────────────────────────────────

const QuickActionsBar = ({ componentId, onClose }: { componentId: string; onClose: () => void }) => {
  const { updateComponent, removeComponent } = useBuilderStore();

  return (
    <div className="absolute right-0 top-full mt-1 z-50 bg-popover border rounded-md shadow-lg p-1 flex items-center gap-0.5">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1.5 rounded hover:bg-accent" onClick={() => updateComponent(componentId, { hidden: false })}>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Show</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1.5 rounded hover:bg-accent" onClick={() => updateComponent(componentId, { locked: true })}>
              <Lock className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Lock</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1.5 rounded hover:bg-accent text-destructive" onClick={() => { removeComponent(componentId); onClose(); }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// ─── Layer Item (Enhanced) ─────────────────────────────────

const LayerItem = ({
  node,
  depth = 0,
  sectionId,
  searchQuery = '',
}: {
  node: BuilderComponent;
  depth?: number;
  sectionId: string;
  searchQuery?: string;
}) => {
  const {
    selectedComponentId, selectComponent, updateComponent, removeComponent,
    addComponentToContainer,
  } = useBuilderStore();
  const [expanded, setExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState(node.label);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const isSelected = selectedComponentId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const TypeIcon = getTypeIcon(node.type);
  const typeColor = getTypeColor(node.type);

  // Filter by search
  const matchesSearch = !searchQuery || 
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.type.toLowerCase().includes(searchQuery.toLowerCase());

  const childrenMatchSearch = node.children?.some(child => 
    child.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.children?.some(gc => gc.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (searchQuery && !matchesSearch && !childrenMatchSearch) return null;

  const handleRename = () => {
    updateComponent(node.id, { label: tempName });
    setIsRenaming(false);
  };

  const handleDuplicate = () => {
    const reassignIds = (comp: BuilderComponent): BuilderComponent => ({
      ...comp,
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      children: comp.children?.map(reassignIds),
    });
    const clone = reassignIds({ ...node, label: `${node.label} (copy)` });
    addComponentToContainer(sectionId, clone);
  };

  const handleWrapInContainer = () => {
    // This would wrap the component in a container
    // Implementation depends on your tree operations
  };

  return (
    <div>
      <div
        className={`relative flex items-center gap-1 px-2 py-1.5 text-xs cursor-pointer transition-all group ${
          isSelected 
            ? 'bg-primary/15 text-primary border-l-2 border-primary' 
            : 'hover:bg-accent/50 border-l-2 border-transparent'
        } ${node.hidden ? 'opacity-40' : ''} ${node.locked ? 'cursor-not-allowed' : ''}`}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        onClick={(e) => { e.stopPropagation(); if (!node.locked) selectComponent(node.id); }}
        onDoubleClick={(e) => { e.stopPropagation(); if (!node.locked) { setIsRenaming(true); setTempName(node.label); } }}
      >
        {/* Expand/Collapse */}
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="p-0.5 hover:bg-accent rounded transition-colors"
          >
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Drag Handle */}
        <GripVertical className="w-3 h-3 opacity-20 shrink-0 cursor-grab hover:opacity-60 transition-opacity" />

        {/* Type Icon with Color */}
        <div className="p-0.5 rounded" style={{ backgroundColor: `${typeColor}20` }}>
          <TypeIcon className="w-3 h-3 shrink-0" style={{ color: typeColor }} />
        </div>

        {/* Label */}
        {isRenaming ? (
          <input
            autoFocus
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setIsRenaming(false); }}
            className="flex-1 bg-transparent border-b border-primary outline-none text-xs px-0.5"
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span className={`truncate flex-1 ${searchQuery && matchesSearch ? 'bg-yellow-500/20 rounded px-0.5' : ''}`}>
            {node.label}
          </span>
        )}

        {/* Status Badges */}
        <div className="flex items-center gap-0.5">
          {node.hidden && <EyeOff className="w-3 h-3 opacity-50" />}
          {node.locked && <Lock className="w-3 h-3 opacity-50" />}
          {hasChildren && (
            <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 opacity-50">
              {node.children!.length}
            </Badge>
          )}
        </div>

        {/* Type Badge on Hover */}
        <span className="text-[9px] opacity-0 group-hover:opacity-40 shrink-0 transition-opacity font-mono">
          {node.type}
        </span>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
            <button className="p-0.5 rounded hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">Layer Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setIsRenaming(true); setTempName(node.label); }}>
              <Pencil className="w-3.5 h-3.5 mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => updateComponent(node.id, { hidden: !node.hidden })}>
              {node.hidden ? <Eye className="w-3.5 h-3.5 mr-2" /> : <EyeOff className="w-3.5 h-3.5 mr-2" />}
              {node.hidden ? 'Show' : 'Hide'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateComponent(node.id, { locked: !node.locked })}>
              {node.locked ? <Unlock className="w-3.5 h-3.5 mr-2" /> : <Lock className="w-3.5 h-3.5 mr-2" />}
              {node.locked ? 'Unlock' : 'Lock'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Layers className="w-3.5 h-3.5 mr-2" /> Arrange
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem><ArrowUp className="w-3.5 h-3.5 mr-2" /> Bring Forward</DropdownMenuItem>
                <DropdownMenuItem><ArrowDown className="w-3.5 h-3.5 mr-2" /> Send Backward</DropdownMenuItem>
                <DropdownMenuItem><Maximize2 className="w-3.5 h-3.5 mr-2" /> Bring to Front</DropdownMenuItem>
                <DropdownMenuItem><Minimize2 className="w-3.5 h-3.5 mr-2" /> Send to Back</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Box className="w-3.5 h-3.5 mr-2" /> Wrap In
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem><Box className="w-3.5 h-3.5 mr-2" /> Container</DropdownMenuItem>
                <DropdownMenuItem><LayoutGrid className="w-3.5 h-3.5 mr-2" /> Grid</DropdownMenuItem>
                <DropdownMenuItem><Rows className="w-3.5 h-3.5 mr-2" /> Row</DropdownMenuItem>
                <DropdownMenuItem><Link className="w-3.5 h-3.5 mr-2" /> Link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => removeComponent(node.id)}>
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="relative">
          {/* Connection Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-border/50"
            style={{ marginLeft: `${depth * 14 + 16}px` }}
          />
          {node.children!.map((child) => (
            <LayerItem key={child.id} node={child} depth={depth + 1} sectionId={sectionId} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Section Layer (Enhanced) ──────────────────────────────

const SectionLayer = ({ 
  section, onMoveUp, onMoveDown, onDuplicate, onDelete, isFirst, isLast, searchQuery 
}: {
  section: PageSection;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
  searchQuery: string;
}) => {
  const [expanded, setExpanded] = useState(true);

  const sectionTypeIcons: Record<string, any> = {
    header: PanelTop,
    nav: Navigation,
    body: Layout,
    footer: PanelBottom,
    section: Layers,
  };
  const SectionIcon = sectionTypeIcons[section.type] || Layers;

  const totalComponents = section.components.reduce((acc, c) => {
    const countChildren = (comp: BuilderComponent): number => 
      1 + (comp.children?.reduce((a, ch) => a + countChildren(ch), 0) || 0);
    return acc + countChildren(c);
  }, 0);

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <div className="border-b border-border/30">
        <CollapsibleTrigger asChild>
          <div className="w-full flex items-center gap-2 px-3 py-2 group hover:bg-accent/30 cursor-pointer transition-colors">
            <button className="p-0.5 hover:bg-accent rounded">
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            
            <div className="p-1 rounded bg-primary/10">
              <SectionIcon className="w-3.5 h-3.5 text-primary" />
            </div>
            
            <span className="text-xs font-semibold uppercase tracking-wider flex-1">
              {section.label}
            </span>

            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">
              {totalComponents}
            </Badge>

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {!isFirst && (
                <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} className="p-1 rounded hover:bg-accent" title="Move Up">
                  <ArrowUp className="w-3 h-3" />
                </button>
              )}
              {!isLast && (
                <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} className="p-1 rounded hover:bg-accent" title="Move Down">
                  <ArrowDown className="w-3 h-3" />
                </button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <button className="p-1 rounded hover:bg-accent">
                    <MoreHorizontal className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onDuplicate}>
                    <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate Section
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="w-3.5 h-3.5 mr-2" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-3.5 h-3.5 mr-2" /> Section Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                    <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Section
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {section.components.length === 0 ? (
            <div className="px-4 py-3 text-xs text-muted-foreground text-center italic">
              Empty section — drag components here
            </div>
          ) : (
            section.components.map((comp) => (
              <LayerItem key={comp.id} node={comp} depth={0} sectionId={section.id} searchQuery={searchQuery} />
            ))
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

// ─── Quick Insert Panel ────────────────────────────────────

const QuickInsertPanel = ({ onInsert }: { onInsert: (type: string) => void }) => {
  const quickComponents = [
    { type: 'container', icon: Box, label: 'Container', color: 'hsl(var(--chart-2))' },
    { type: 'grid', icon: LayoutGrid, label: 'Grid', color: 'hsl(var(--chart-2))' },
    { type: 'row', icon: Rows, label: 'Row', color: 'hsl(var(--chart-2))' },
    { type: 'columns', icon: Columns, label: 'Columns', color: 'hsl(var(--chart-2))' },
    { type: 'heading', icon: Heading1, label: 'Heading', color: 'hsl(var(--chart-1))' },
    { type: 'paragraph', icon: AlignLeft, label: 'Text', color: 'hsl(var(--chart-1))' },
    { type: 'image', icon: ImageIcon, label: 'Image', color: 'hsl(var(--chart-3))' },
    { type: 'button', icon: Circle, label: 'Button', color: 'hsl(var(--chart-4))' },
  ];

  return (
    <div className="p-2 border-b border-border/30">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">Quick Add</p>
      <div className="grid grid-cols-4 gap-1">
        {quickComponents.map(({ type, icon: Icon, label, color }) => (
          <TooltipProvider key={type} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onInsert(type)}
                  className="p-2 rounded-md hover:bg-accent flex flex-col items-center gap-1 transition-colors"
                >
                  <div className="p-1.5 rounded" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

// ─── Layers Panel (Main) ───────────────────────────────────

const LayersPanel = () => {
  const { schema, selectComponent, setSchema, addComponent } = useBuilderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'visible' | 'hidden' | 'locked'>('all');
  const [activeTab, setActiveTab] = useState<'layers' | 'outline' | 'components'>('layers');

  const handleAddSection = () => {
    const newSection: PageSection = {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'section',
      label: `Section ${schema.sections.length + 1}`,
      components: [],
      styles: { padding: '40px 20px', width: '100%', minHeight: '100px' },
    };
    setSchema({ ...schema, sections: [...schema.sections, newSection] });
  };

  const handleMoveSection = (index: number, direction: -1 | 1) => {
    const sections = [...schema.sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
    setSchema({ ...schema, sections });
  };

  const handleDuplicateSection = (index: number) => {
    const section = schema.sections[index];
    const clone: PageSection = JSON.parse(JSON.stringify(section));
    clone.id = `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    clone.label = `${section.label} (copy)`;
    const reassignIds = (comp: BuilderComponent): BuilderComponent => ({
      ...comp,
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      children: comp.children?.map(reassignIds),
    });
    clone.components = clone.components.map(reassignIds);
    const sections = [...schema.sections];
    sections.splice(index + 1, 0, clone);
    setSchema({ ...schema, sections });
  };

  const handleDeleteSection = (index: number) => {
    if (schema.sections.length <= 1) return;
    const sections = schema.sections.filter((_, i) => i !== index);
    setSchema({ ...schema, sections });
  };

  const handleQuickInsert = (type: string) => {
    const newComponent: BuilderComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      category: 'Layout',
      label: type.charAt(0).toUpperCase() + type.slice(1),
      styles: {},
      isContainer: ['container', 'grid', 'row', 'columns', 'section'].includes(type),
    };
    if (schema.sections.length > 0) {
      addComponent(schema.sections[0].id, newComponent);
    }
  };

  // Statistics
  const stats = useMemo(() => {
    let total = 0, hidden = 0, locked = 0;
    const countComponents = (comp: BuilderComponent) => {
      total++;
      if (comp.hidden) hidden++;
      if (comp.locked) locked++;
      comp.children?.forEach(countComponents);
    };
    schema.sections.forEach(s => s.components.forEach(countComponents));
    return { total, hidden, locked, sections: schema.sections.length };
  }, [schema]);

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Layers</h2>
            <p className="text-[10px] text-muted-foreground">
              {stats.sections} sections • {stats.total} elements
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <UIButton variant="ghost" size="icon" className="h-7 w-7" onClick={handleAddSection}>
                  <Plus className="w-4 h-4" />
                </UIButton>
              </TooltipTrigger>
              <TooltipContent>Add Section</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UIButton variant="ghost" size="icon" className="h-7 w-7">
                <Filter className="w-4 h-4" />
              </UIButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Layers</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterType('all')}>
                <Layers className="w-3.5 h-3.5 mr-2" /> All Layers
                {filterType === 'all' && <CheckCircle className="w-3 h-3 ml-auto text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('visible')}>
                <Eye className="w-3.5 h-3.5 mr-2" /> Visible Only
                {filterType === 'visible' && <CheckCircle className="w-3 h-3 ml-auto text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('hidden')}>
                <EyeOff className="w-3.5 h-3.5 mr-2" /> Hidden ({stats.hidden})
                {filterType === 'hidden' && <CheckCircle className="w-3 h-3 ml-auto text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('locked')}>
                <Lock className="w-3.5 h-3.5 mr-2" /> Locked ({stats.locked})
                {filterType === 'locked' && <CheckCircle className="w-3 h-3 ml-auto text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search */}
      <div className="p-2 border-b border-border/50 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search layers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-xs bg-muted/50"
          />
        </div>
      </div>

      {/* Quick Insert */}
      <QuickInsertPanel onInsert={handleQuickInsert} />

      {/* Layers Tree */}
      <ScrollArea className="flex-1">
        <div className="py-1" onClick={() => selectComponent(null)}>
          {schema.sections.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium mb-1">No sections yet</p>
              <p className="text-xs text-muted-foreground mb-3">
                Add a section to start building
              </p>
              <UIButton size="sm" onClick={handleAddSection}>
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Section
              </UIButton>
            </div>
          ) : (
            schema.sections.map((section, index) => (
              <SectionLayer
                key={section.id}
                section={section}
                onMoveUp={() => handleMoveSection(index, -1)}
                onMoveDown={() => handleMoveSection(index, 1)}
                onDuplicate={() => handleDuplicateSection(index)}
                onDelete={() => handleDeleteSection(index)}
                isFirst={index === 0}
                isLast={index === schema.sections.length - 1}
                searchQuery={searchQuery}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="p-2 border-t border-border/50 shrink-0">
        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" /> {stats.total}
          </span>
          {stats.hidden > 0 && (
            <span className="flex items-center gap-1">
              <EyeOff className="w-3 h-3" /> {stats.hidden}
            </span>
          )}
          {stats.locked > 0 && (
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" /> {stats.locked}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayersPanel;
