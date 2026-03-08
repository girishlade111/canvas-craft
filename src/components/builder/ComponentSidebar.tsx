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
  Terminal, Globe, LayoutGrid,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutTemplate, Type, Image, Columns3, FileInput, ShoppingBag, Navigation, Code2,
  Square, Minus, MoveVertical, AlignLeft, Heading2, List, Quote,
  Video, GalleryHorizontal, MonitorPlay, Sparkles, Grid3x3, RectangleHorizontal,
  PanelTop, ChevronDown, TextCursorInput, FileText, CheckSquare, LogIn, UserPlus,
  Mail, ShoppingCart, CreditCard, Wallet, Menu, PanelLeft, ChevronRight,
  Terminal, Globe, LayoutGrid,
};

const DraggableItem = ({ type, label, icon }: { type: string; label: string; icon: string }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${type}`,
    data: { type, label, fromLibrary: true },
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
      <span className="truncate">{label}</span>
    </div>
  );
};

const ComponentSidebar = () => {
  const [openCategory, setOpenCategory] = useState<ComponentCategory | null>('Basic');
  const categories = Object.keys(componentLibrary) as ComponentCategory[];

  return (
    <div className="builder-sidebar w-60 border-r overflow-y-auto">
      <div className="p-3 border-b border-builder-panel-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-builder-sidebar-foreground opacity-60">
          Components
        </h2>
      </div>
      <div className="py-1">
        {categories.map((cat) => {
          const CatIcon = iconMap[categoryIcons[cat]] || Square;
          const isOpen = openCategory === cat;
          return (
            <div key={cat}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-builder-component-hover transition-colors"
              >
                <CatIcon className="w-4 h-4 text-primary" />
                <span className="flex-1 text-left font-medium">{cat}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-2 pb-2 space-y-1">
                  {componentLibrary[cat].map((comp) => (
                    <DraggableItem
                      key={comp.type}
                      type={comp.type}
                      label={comp.label}
                      icon={comp.icon}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentSidebar;
