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
  MessageSquareQuote, Search, X, GripVertical, History, Smile, Users, Palette,
  Home, User, Settings, Heart, Star, Bell, CheckCircle, Play, Pause, Volume2,
  Download, Upload, Share, Edit, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  Lock, Unlock, Eye, EyeOff, Zap, Flame, Rocket, Award, Trophy, Crown, Gift,
  Camera, Music, Film, MapPin, Phone, Calendar, Clock, Bookmark, Tag, Link,
  ExternalLink, Mic, Wifi, Sun, Moon, Cloud, Coffee, Briefcase, Package,
  CreditCard as CreditCardIcon, Truck, Building, Map, Compass, Flag,
  ThumbsUp, ThumbsDown, MessageCircle, Send, Inbox, Archive, Cpu, Database, Server,
  Monitor, Smartphone, Tablet, Laptop, Headphones, Speaker, Battery,
  Facebook, Instagram, Github, Figma, Twitter, Youtube, Linkedin,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  LayoutTemplate, Type, Image, Columns3, FileInput, ShoppingBag, Navigation, Code2,
  Square, Minus, MoveVertical, AlignLeft, Heading2, List, Quote,
  Video, GalleryHorizontal, MonitorPlay, Sparkles, Grid3x3, RectangleHorizontal,
  PanelTop, ChevronDown, TextCursorInput, FileText, CheckSquare, LogIn, UserPlus,
  Mail, ShoppingCart, CreditCard, Wallet, Menu, PanelLeft, ChevronRight,
  Terminal, Globe, LayoutGrid, MousePointerClick, Circle, DollarSign,
  MessageSquareQuote, History, Search, Smile, Users, Palette,
  Home, User, Settings, Heart, Star, Bell, CheckCircle, Play, Pause, Volume2,
  Download, Upload, Share, Edit, Trash2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  Lock, Unlock, Eye, EyeOff, Zap, Flame, Rocket, Award, Trophy, Crown, Gift,
  Camera, Music, Film, MapPin, Phone, Calendar, Clock, Bookmark, Tag, Link,
  ExternalLink, Mic, Wifi, Sun, Moon, Cloud, Coffee, Briefcase, Package,
  CreditCardIcon, Truck, Building, Map, Compass, Flag,
  ThumbsUp, ThumbsDown, MessageCircle, Send, Inbox, Archive, Cpu, Database, Server,
  Monitor, Smartphone, Tablet, Laptop, Headphones, Speaker, Battery,
  Facebook, Instagram, Github, Figma, Twitter, Youtube, Linkedin,
};

const DraggableItem = ({ type, label, icon, isContainer, uniqueId }: { type: string; label: string; icon: string; isContainer?: boolean; uniqueId: string }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: uniqueId,
    data: { type, label, fromLibrary: true, isContainer },
  });

  const Icon = iconMap[icon] || Square;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`component-item group ${isDragging ? 'opacity-50 scale-95' : ''}`}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
        style={{ background: 'hsl(var(--builder-component-bg))' }}
      >
        <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium truncate block">{label}</span>
        {isContainer && (
          <span className="text-[9px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Container</span>
        )}
      </div>
      <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-30 shrink-0" />
    </div>
  );
};

interface ComponentSidebarProps {
  onClose?: () => void;
}

const ComponentSidebar = ({ onClose }: ComponentSidebarProps) => {
  const [openCategory, setOpenCategory] = useState<ComponentCategory | null>('Basic');
  const [search, setSearch] = useState('');
  const categories = Object.keys(componentLibrary) as ComponentCategory[];

  const filteredCategories = search.trim()
    ? categories.map(cat => ({
        cat,
        items: componentLibrary[cat].filter(c =>
          c.label.toLowerCase().includes(search.toLowerCase()) ||
          c.type.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(c => c.items.length > 0)
    : null;

  return (
    <div className="builder-flyout">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-sm font-semibold">Add Elements</h2>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search elements..."
            className="property-input pl-8 text-xs"
          />
        </div>
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories ? (
          <div className="py-1">
            {filteredCategories.map(({ cat, items }) => (
              <div key={cat}>
                <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {cat}
                </div>
                <div className="px-2 pb-2 space-y-0.5">
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
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  >
                    <CatIcon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="flex-1 text-left text-xs font-medium">{cat}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--builder-component-bg))', color: 'hsl(var(--muted-foreground))' }}>
                      {componentLibrary[cat].length}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'hsl(var(--muted-foreground))' }} />
                  </button>
                  {isOpen && (
                    <div className="px-2 pb-2 space-y-0.5">
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
    </div>
  );
};

export default ComponentSidebar;
