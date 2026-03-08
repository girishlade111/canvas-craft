import { useState } from 'react';
import { componentLibrary, categoryIcons } from '@/data/componentLibrary';
import type { ComponentCategory } from '@/types/builder';
import { useDraggable } from '@dnd-kit/core';
import {
  LayoutTemplate, Type, Image, Columns3, FileInput, ShoppingBag, Navigation, Code2,
  Square, Minus, MoveVertical, AlignLeft, Heading2, List, Quote,
  Video, GalleryHorizontal, MonitorPlay, Sparkles, Grid3x3, RectangleHorizontal,
  PanelTop, ChevronDown, TextCursorInput, FileText, CheckSquare, LogIn, UserPlus,
  Mail, ShoppingCart, CreditCard, Wallet, Menu, PanelLeft, ChevronRight,
  Terminal, Globe, LayoutGrid, MousePointerClick, Circle, DollarSign,
  MessageSquareQuote, Search,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutTemplate, Type, Image, Columns3, FileInput, ShoppingBag, Navigation, Code2,
  Square, Minus, MoveVertical, AlignLeft, Heading2, List, Quote,
  Video, GalleryHorizontal, MonitorPlay, Sparkles, Grid3x3, RectangleHorizontal,
  PanelTop, ChevronDown, TextCursorInput, FileText, CheckSquare, LogIn, UserPlus,
  Mail, ShoppingCart, CreditCard, Wallet, Menu, PanelLeft, ChevronRight,
  Terminal, Globe, LayoutGrid, MousePointerClick, Circle, DollarSign,
  MessageSquareQuote,
};

const DraggableItem = ({ type, label, icon, isContainer }: { type: string; label: string; icon: string; isContainer?: boolean }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${type}`,
    data: { type, label, fromLibrary: true, isContainer },
  });

  const Icon = iconMap[icon] || Square;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`component-item ${isDragging ? 'opacity-50' : ''}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate flex-1">{label}</span>
      {isContainer && (
        <span className="text-[10px] px-1 py-0.5 rounded opacity-50" style={{ background: 'hsl(var(--primary) / 0.2)' }}>⊞</span>
      )}
    </div>
  );
};

const ComponentSidebar = () => {
  const [openCategory, setOpenCategory] = useState<ComponentCategory | null>('Basic');
  const [search, setSearch] = useState('');
  const categories = Object.keys(componentLibrary) as ComponentCategory[];

  const filteredCategories = search.trim()
    ? categories.map(cat => ({
        cat,
        items: componentLibrary[cat].filter(c => c.label.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())),
      })).filter(c => c.items.length > 0)
    : null;

  return (
    <div className="builder-sidebar w-60 border-r overflow-y-auto">
      <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
          Components
        </h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="property-input pl-7 text-xs"
          />
        </div>
      </div>

      {filteredCategories ? (
        <div className="py-1">
          {filteredCategories.map(({ cat, items }) => (
            <div key={cat}>
              <div className="px-3 py-1.5 text-xs font-semibold opacity-50 uppercase">{cat}</div>
              <div className="px-2 pb-2 space-y-1">
                {items.map((comp) => (
                  <DraggableItem key={comp.type} type={comp.type} label={comp.label} icon={comp.icon} isContainer={comp.isContainer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-1">
          {categories.map((cat) => {
            const CatIcon = iconMap[categoryIcons[cat]] || Square;
            const isOpen = openCategory === cat;
            return (
              <div key={cat}>
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'hsl(var(--builder-component-hover))')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <CatIcon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="flex-1 text-left font-medium">{cat}</span>
                  <span className="text-xs opacity-40">{componentLibrary[cat].length}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-2 pb-2 space-y-1">
                    {componentLibrary[cat].map((comp) => (
                      <DraggableItem key={comp.type} type={comp.type} label={comp.label} icon={comp.icon} isContainer={comp.isContainer} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComponentSidebar;
