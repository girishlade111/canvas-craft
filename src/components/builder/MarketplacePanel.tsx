import { useState, useMemo } from 'react';
import {
  Store, Search, X, Download, Star, Heart, Eye, ChevronRight, ChevronDown,
  Sparkles, Zap, Palette, Layout, Box, Type, Image, Play, Code, Gift,
  Crown, Verified, TrendingUp, Clock, Filter, Grid3X3, List, ExternalLink,
  Layers, MousePointerClick, Wand2, Paintbrush, Blocks, Component, Package,
  ArrowRight, Check, Plus, Bookmark, Share2, Info, Award, Flame,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent } from '@/types/builder';

// ─── UI Library Brands ─────────────────────────────────────

const UI_LIBRARIES = [
  { id: 'shadcn', name: 'Shadcn UI', color: '#000000', textColor: '#fff' },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#06B6D4', textColor: '#fff' },
  { id: 'mui', name: 'Material UI', color: '#007FFF', textColor: '#fff' },
  { id: 'antd', name: 'Ant Design', color: '#1677FF', textColor: '#fff' },
  { id: 'mantine', name: 'Mantine', color: '#339AF0', textColor: '#fff' },
  { id: 'chakra', name: 'Chakra UI', color: '#319795', textColor: '#fff' },
  { id: 'headless', name: 'Headless UI', color: '#66E3FF', textColor: '#000' },
  { id: 'radix', name: 'Radix UI', color: '#1C2024', textColor: '#fff' },
  { id: 'bootstrap', name: 'Bootstrap', color: '#7952B3', textColor: '#fff' },
  { id: 'bulma', name: 'Bulma', color: '#00D1B2', textColor: '#fff' },
];

// ─── Marketplace Categories ────────────────────────────────

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  library: string;
  preview: React.ReactNode;
  downloads: number;
  rating: number;
  isPremium: boolean;
  isNew: boolean;
  isTrending: boolean;
  tags: string[];
  component?: Partial<BuilderComponent>;
}

// ─── Animated Components Preview ───────────────────────────

const AnimatedHeroPreview1 = () => (
  <div className="relative h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-3 w-20 bg-primary/40 rounded mb-2" />
        <div className="h-2 w-16 bg-primary/20 rounded" />
      </div>
    </div>
    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/30 animate-bounce" />
    <div className="absolute bottom-2 left-2 w-6 h-6 rounded bg-primary/20 animate-spin" style={{ animationDuration: '3s' }} />
  </div>
);

const AnimatedHeroPreview2 = () => (
  <div className="relative h-24 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
    </div>
  </div>
);

const AnimatedHeroPreview3 = () => (
  <div className="relative h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-orange-400/60 rounded-full animate-pulse"
          style={{
            height: `${20 + Math.random() * 20}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  </div>
);

const AnimatedFooterPreview = () => (
  <div className="h-24 bg-gradient-to-t from-slate-900/80 to-transparent rounded-lg p-3 flex flex-col justify-end">
    <div className="flex gap-2 mb-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-4 h-4 rounded-full bg-slate-400/40 hover:bg-primary/60 transition-colors cursor-pointer" />
      ))}
    </div>
    <div className="h-1.5 w-24 bg-slate-600/40 rounded" />
  </div>
);

const AnimatedButtonPreview = () => (
  <div className="h-24 bg-muted/30 rounded-lg flex items-center justify-center gap-3">
    <div className="px-4 py-2 bg-primary rounded-md text-xs text-primary-foreground font-medium hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-primary/25">
      Hover Me
    </div>
    <div className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-md text-xs text-white font-medium animate-pulse">
      Pulse
    </div>
  </div>
);

const AnimatedCardPreview = () => (
  <div className="h-24 bg-muted/30 rounded-lg p-3 flex items-center justify-center">
    <div className="w-20 h-16 bg-card rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-border/50 flex items-center justify-center">
      <Box className="w-5 h-5 text-muted-foreground" />
    </div>
  </div>
);

const AnimatedNavPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg p-2">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-4 h-4 rounded bg-primary/60" />
      <div className="flex gap-2 flex-1">
        {['Home', 'About', 'Work'].map((item, i) => (
          <span key={item} className="text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            {item}
          </span>
        ))}
      </div>
    </div>
    <div className="h-0.5 w-8 bg-primary rounded-full animate-[slideRight_2s_infinite]" />
  </div>
);

const IconPackPreview = ({ colors }: { colors: string[] }) => (
  <div className="h-24 bg-muted/20 rounded-lg p-3 grid grid-cols-4 gap-2">
    {[Star, Heart, Zap, Crown, Sparkles, Flame, Award, Gift].map((Icon, i) => (
      <div key={i} className="flex items-center justify-center">
        <Icon className="w-4 h-4" style={{ color: colors[i % colors.length] }} />
      </div>
    ))}
  </div>
);

const GradientPackPreview = () => (
  <div className="h-24 rounded-lg grid grid-cols-3 gap-1 overflow-hidden">
    <div className="bg-gradient-to-br from-pink-500 to-orange-500" />
    <div className="bg-gradient-to-br from-cyan-500 to-blue-500" />
    <div className="bg-gradient-to-br from-green-400 to-emerald-500" />
    <div className="bg-gradient-to-br from-violet-500 to-purple-500" />
    <div className="bg-gradient-to-br from-amber-400 to-orange-500" />
    <div className="bg-gradient-to-br from-rose-400 to-pink-500" />
  </div>
);

const AnimationPackPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg flex items-center justify-center gap-4">
    <div className="w-6 h-6 bg-blue-500 rounded animate-bounce" />
    <div className="w-6 h-6 bg-green-500 rounded animate-pulse" />
    <div className="w-6 h-6 bg-purple-500 rounded animate-spin" style={{ animationDuration: '2s' }} />
    <div className="w-6 h-6 bg-orange-500 rounded animate-ping" style={{ animationDuration: '1.5s' }} />
  </div>
);

const LoaderPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg flex items-center justify-center gap-6">
    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
    <div className="w-5 h-5 border-2 border-dashed border-primary rounded-full animate-spin" style={{ animationDuration: '2s' }} />
  </div>
);

const FormComponentPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg p-3 flex flex-col justify-center gap-2">
    <div className="h-6 bg-background border border-border rounded-md px-2 flex items-center">
      <span className="text-[9px] text-muted-foreground">Enter email...</span>
    </div>
    <div className="h-6 bg-primary rounded-md flex items-center justify-center">
      <span className="text-[9px] text-primary-foreground">Subscribe</span>
    </div>
  </div>
);

const TestimonialPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg p-3 flex flex-col justify-center">
    <div className="flex gap-0.5 mb-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <div className="h-1.5 w-full bg-muted rounded mb-1" />
    <div className="h-1.5 w-3/4 bg-muted rounded" />
    <div className="flex items-center gap-1.5 mt-2">
      <div className="w-4 h-4 rounded-full bg-primary/40" />
      <div className="h-1.5 w-12 bg-muted rounded" />
    </div>
  </div>
);

const PricingPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg p-2 flex gap-1.5">
    {['Basic', 'Pro', 'Team'].map((plan, i) => (
      <div key={plan} className={`flex-1 rounded p-1.5 ${i === 1 ? 'bg-primary/20 border border-primary/40' : 'bg-background/50'}`}>
        <div className="text-[8px] font-medium mb-0.5">{plan}</div>
        <div className="text-[10px] font-bold">${(i + 1) * 9}</div>
      </div>
    ))}
  </div>
);

const FeatureGridPreview = () => (
  <div className="h-24 bg-muted/20 rounded-lg p-2 grid grid-cols-2 gap-1.5">
    {[Zap, Layers, Sparkles, Crown].map((Icon, i) => (
      <div key={i} className="bg-background/50 rounded p-1.5 flex items-center gap-1">
        <Icon className="w-3 h-3 text-primary" />
        <div className="h-1 w-8 bg-muted rounded" />
      </div>
    ))}
  </div>
);

// ─── Marketplace Items Data ────────────────────────────────

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // Animated Heroes
  {
    id: 'hero-gradient-1',
    name: 'Gradient Mesh Hero',
    description: 'Animated gradient mesh background with floating elements',
    category: 'Components',
    subcategory: 'Heroes',
    library: 'tailwind',
    preview: <AnimatedHeroPreview1 />,
    downloads: 12400,
    rating: 4.9,
    isPremium: false,
    isNew: true,
    isTrending: true,
    tags: ['hero', 'gradient', 'animated', 'mesh'],
  },
  {
    id: 'hero-shimmer',
    name: 'Shimmer Hero',
    description: 'Beautiful shimmer effect with sparkle animations',
    category: 'Components',
    subcategory: 'Heroes',
    library: 'shadcn',
    preview: <AnimatedHeroPreview2 />,
    downloads: 8900,
    rating: 4.8,
    isPremium: false,
    isNew: true,
    isTrending: false,
    tags: ['hero', 'shimmer', 'sparkle'],
  },
  {
    id: 'hero-audio-waves',
    name: 'Audio Waves Hero',
    description: 'Dynamic audio wave visualization for music sites',
    category: 'Components',
    subcategory: 'Heroes',
    library: 'chakra',
    preview: <AnimatedHeroPreview3 />,
    downloads: 5600,
    rating: 4.7,
    isPremium: true,
    isNew: false,
    isTrending: true,
    tags: ['hero', 'audio', 'music', 'waves'],
  },
  
  // Animated Footers
  {
    id: 'footer-social-1',
    name: 'Social Links Footer',
    description: 'Minimal footer with animated social icons',
    category: 'Components',
    subcategory: 'Footers',
    library: 'mui',
    preview: <AnimatedFooterPreview />,
    downloads: 7200,
    rating: 4.6,
    isPremium: false,
    isNew: false,
    isTrending: false,
    tags: ['footer', 'social', 'minimal'],
  },
  
  // Buttons
  {
    id: 'buttons-animated-1',
    name: 'Animated Button Pack',
    description: '15+ button styles with hover and click animations',
    category: 'Components',
    subcategory: 'Buttons',
    library: 'shadcn',
    preview: <AnimatedButtonPreview />,
    downloads: 15600,
    rating: 4.9,
    isPremium: false,
    isNew: false,
    isTrending: true,
    tags: ['buttons', 'hover', 'click', 'animated'],
  },
  
  // Cards
  {
    id: 'cards-hover-1',
    name: 'Hover Effect Cards',
    description: 'Cards with beautiful lift and shadow animations',
    category: 'Components',
    subcategory: 'Cards',
    library: 'mantine',
    preview: <AnimatedCardPreview />,
    downloads: 9800,
    rating: 4.7,
    isPremium: false,
    isNew: true,
    isTrending: false,
    tags: ['cards', 'hover', 'shadow', '3d'],
  },
  
  // Navigation
  {
    id: 'nav-underline-1',
    name: 'Underline Navigation',
    description: 'Navigation with smooth underline slide animation',
    category: 'Components',
    subcategory: 'Navigation',
    library: 'headless',
    preview: <AnimatedNavPreview />,
    downloads: 11200,
    rating: 4.8,
    isPremium: false,
    isNew: false,
    isTrending: true,
    tags: ['nav', 'underline', 'menu', 'animated'],
  },
  
  // Icon Packs
  {
    id: 'icons-lucide-pro',
    name: 'Lucide Pro Pack',
    description: '500+ premium icons with multiple styles',
    category: 'Icons',
    subcategory: 'Icon Packs',
    library: 'shadcn',
    preview: <IconPackPreview colors={['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B']} />,
    downloads: 45000,
    rating: 5.0,
    isPremium: true,
    isNew: false,
    isTrending: true,
    tags: ['icons', 'lucide', 'premium'],
  },
  {
    id: 'icons-heroicons-solid',
    name: 'Heroicons Solid',
    description: '450 solid icons optimized for UI',
    category: 'Icons',
    subcategory: 'Icon Packs',
    library: 'tailwind',
    preview: <IconPackPreview colors={['#06B6D4', '#14B8A6', '#22C55E', '#84CC16']} />,
    downloads: 38000,
    rating: 4.9,
    isPremium: false,
    isNew: false,
    isTrending: false,
    tags: ['icons', 'heroicons', 'solid'],
  },
  {
    id: 'icons-phosphor',
    name: 'Phosphor Icons',
    description: '6000+ flexible icons in 6 weights',
    category: 'Icons',
    subcategory: 'Icon Packs',
    library: 'radix',
    preview: <IconPackPreview colors={['#F472B6', '#A78BFA', '#60A5FA', '#34D399']} />,
    downloads: 28000,
    rating: 4.8,
    isPremium: false,
    isNew: true,
    isTrending: true,
    tags: ['icons', 'phosphor', 'flexible'],
  },
  
  // Animations
  {
    id: 'animations-entrance',
    name: 'Entrance Animations',
    description: '30+ entrance animations (fade, slide, scale, rotate)',
    category: 'Animations',
    subcategory: 'Entrance',
    library: 'tailwind',
    preview: <AnimationPackPreview />,
    downloads: 22000,
    rating: 4.9,
    isPremium: false,
    isNew: false,
    isTrending: true,
    tags: ['animation', 'entrance', 'fade', 'slide'],
  },
  {
    id: 'animations-loaders',
    name: 'Loader Animations',
    description: '40+ loading spinners and skeleton loaders',
    category: 'Animations',
    subcategory: 'Loaders',
    library: 'chakra',
    preview: <LoaderPreview />,
    downloads: 18500,
    rating: 4.8,
    isPremium: false,
    isNew: true,
    isTrending: false,
    tags: ['animation', 'loader', 'spinner', 'skeleton'],
  },
  
  // Gradients
  {
    id: 'gradients-premium',
    name: 'Premium Gradients',
    description: '100+ handcrafted gradient backgrounds',
    category: 'Assets',
    subcategory: 'Gradients',
    library: 'tailwind',
    preview: <GradientPackPreview />,
    downloads: 32000,
    rating: 4.9,
    isPremium: true,
    isNew: false,
    isTrending: true,
    tags: ['gradient', 'background', 'colors'],
  },
  
  // Forms
  {
    id: 'forms-newsletter',
    name: 'Newsletter Forms',
    description: '12 beautiful newsletter signup forms',
    category: 'Components',
    subcategory: 'Forms',
    library: 'antd',
    preview: <FormComponentPreview />,
    downloads: 14200,
    rating: 4.7,
    isPremium: false,
    isNew: false,
    isTrending: false,
    tags: ['form', 'newsletter', 'email', 'signup'],
  },
  
  // Testimonials
  {
    id: 'testimonials-cards',
    name: 'Testimonial Cards',
    description: '8 testimonial card styles with ratings',
    category: 'Components',
    subcategory: 'Testimonials',
    library: 'mui',
    preview: <TestimonialPreview />,
    downloads: 9400,
    rating: 4.6,
    isPremium: false,
    isNew: true,
    isTrending: false,
    tags: ['testimonial', 'review', 'rating', 'cards'],
  },
  
  // Pricing
  {
    id: 'pricing-tables',
    name: 'Pricing Tables',
    description: '10 pricing table designs for SaaS',
    category: 'Components',
    subcategory: 'Pricing',
    library: 'shadcn',
    preview: <PricingPreview />,
    downloads: 16800,
    rating: 4.8,
    isPremium: true,
    isNew: false,
    isTrending: true,
    tags: ['pricing', 'table', 'saas', 'subscription'],
  },
  
  // Features
  {
    id: 'features-grid',
    name: 'Feature Grid Sections',
    description: '6 feature grid layouts with icons',
    category: 'Components',
    subcategory: 'Features',
    library: 'mantine',
    preview: <FeatureGridPreview />,
    downloads: 11600,
    rating: 4.7,
    isPremium: false,
    isNew: false,
    isTrending: false,
    tags: ['features', 'grid', 'icons', 'section'],
  },
];

// ─── Category Config ───────────────────────────────────────

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Grid3X3 },
  { id: 'Components', label: 'Components', icon: Component },
  { id: 'Animations', label: 'Animations', icon: Play },
  { id: 'Icons', label: 'Icons', icon: Star },
  { id: 'Assets', label: 'Assets', icon: Package },
];

const SUBCATEGORIES: Record<string, string[]> = {
  Components: ['Heroes', 'Footers', 'Buttons', 'Cards', 'Navigation', 'Forms', 'Testimonials', 'Pricing', 'Features', 'CTAs', 'Modals'],
  Animations: ['Entrance', 'Exit', 'Hover', 'Loaders', 'Scroll', 'Micro-interactions'],
  Icons: ['Icon Packs', 'Animated Icons', 'Brand Icons', 'Emoji'],
  Assets: ['Gradients', 'Patterns', 'Illustrations', 'Backgrounds', 'Textures'],
};

// ─── Marketplace Item Card ─────────────────────────────────

const MarketplaceItemCard = ({ item, onInstall }: { item: MarketplaceItem; onInstall: (item: MarketplaceItem) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const library = UI_LIBRARIES.find(l => l.id === item.library);

  const handleInstall = () => {
    setIsInstalled(true);
    onInstall(item);
  };

  return (
    <Card 
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview */}
      <div className="relative">
        {item.preview}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isPremium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] px-1.5 py-0 h-4">
              <Crown className="w-2.5 h-2.5 mr-0.5" /> PRO
            </Badge>
          )}
          {item.isNew && (
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-green-500/20 text-green-500">
              NEW
            </Badge>
          )}
          {item.isTrending && (
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 bg-pink-500/20 text-pink-500">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> HOT
            </Badge>
          )}
        </div>

        {/* Library Badge */}
        {library && (
          <div 
            className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded font-medium"
            style={{ backgroundColor: library.color, color: library.textColor }}
          >
            {library.name}
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Preview</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  className="h-8"
                  onClick={handleInstall}
                  disabled={isInstalled}
                >
                  {isInstalled ? (
                    <><Check className="w-4 h-4 mr-1" /> Added</>
                  ) : (
                    <><Plus className="w-4 h-4 mr-1" /> Add</>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to project</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Info */}
      <CardContent className="p-3">
        <h4 className="font-medium text-sm mb-0.5 truncate">{item.name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {item.rating}
            </span>
            <span className="flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {item.downloads > 1000 ? `${(item.downloads / 1000).toFixed(1)}k` : item.downloads}
            </span>
          </div>
          <Badge variant="outline" className="text-[9px] h-4 px-1.5">
            {item.subcategory}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Library Filter Pills ──────────────────────────────────

const LibraryFilters = ({ selected, onSelect }: { selected: string[]; onSelect: (id: string) => void }) => (
  <div className="flex flex-wrap gap-1.5 p-3 border-b border-border/50">
    {UI_LIBRARIES.map(lib => (
      <button
        key={lib.id}
        onClick={() => onSelect(lib.id)}
        className={`text-[10px] px-2 py-1 rounded-full transition-all ${
          selected.includes(lib.id)
            ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
            : 'opacity-70 hover:opacity-100'
        }`}
        style={{ backgroundColor: lib.color, color: lib.textColor }}
      >
        {lib.name}
      </button>
    ))}
  </div>
);

// ─── Main Marketplace Panel ────────────────────────────────

const MarketplacePanel = ({ onClose }: { onClose?: () => void }) => {
  const { addComponent, schema } = useBuilderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');

  const handleLibraryToggle = (id: string) => {
    setSelectedLibraries(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleInstall = (item: MarketplaceItem) => {
    // Add component to the first section
    if (schema.sections.length > 0 && item.component) {
      const newComponent: BuilderComponent = {
        id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: item.component.type || 'container',
        category: item.category,
        label: item.name,
        styles: item.component.styles || {},
        props: item.component.props,
        isContainer: item.component.isContainer,
      };
      addComponent(schema.sections[0].id, newComponent);
    }
  };

  const filteredItems = useMemo(() => {
    let items = [...MARKETPLACE_ITEMS];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.includes(query))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Subcategory
    if (selectedSubcategory) {
      items = items.filter(item => item.subcategory === selectedSubcategory);
    }

    // Libraries
    if (selectedLibraries.length > 0) {
      items = items.filter(item => selectedLibraries.includes(item.library));
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        items.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
    }

    return items;
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedLibraries, sortBy]);

  const subcategories = selectedCategory !== 'all' ? SUBCATEGORIES[selectedCategory] || [] : [];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Marketplace</h2>
              <p className="text-xs text-muted-foreground">{MARKETPLACE_ITEMS.length}+ assets & components</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search animations, icons, components..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Library Filters */}
      {showFilters && (
        <LibraryFilters selected={selectedLibraries} onSelect={handleLibraryToggle} />
      )}

      {/* Category Tabs */}
      <div className="border-b border-border/50 shrink-0">
        <div className="flex overflow-x-auto scrollbar-hide p-2 gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="flex overflow-x-auto scrollbar-hide px-2 pb-2 gap-1">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap transition-colors ${
                !selectedSubcategory ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap transition-colors ${
                  selectedSubcategory === sub ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 shrink-0">
        <span className="text-xs text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
        <div className="flex items-center gap-1">
          {(['popular', 'newest', 'rating'] as const).map(sort => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${
                sortBy === sort ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <ScrollArea className="flex-1">
        <div className="p-3 grid grid-cols-2 gap-3">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm font-medium mb-1">No items found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <MarketplaceItemCard key={item.id} item={item} onInstall={handleInstall} />
            ))
          )}
        </div>

        {/* Featured Libraries Section */}
        <div className="p-3 border-t border-border/50">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Verified className="w-4 h-4 text-blue-500" />
            Supported UI Libraries
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {UI_LIBRARIES.map(lib => (
              <div 
                key={lib.id}
                className="p-2.5 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: lib.color, color: lib.textColor }}
                  >
                    {lib.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium">{lib.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MarketplacePanel;
