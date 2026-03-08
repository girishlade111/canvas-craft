import { useState } from 'react';
import {
  X, Megaphone, Clock, MousePointerClick, ArrowUpFromDot, Eye, Copy, Trash2, Plus, Check,
  ChevronRight, Search, Layers, Zap, Settings, BarChart3, Image, Type, AlignLeft,
  Star, Heart, Gift, Percent, Mail, Bell, Shield, Lock, Users,
  Sparkles, Timer, ExternalLink, Maximize2, Minimize2,
  PanelTop, PanelBottom, Smartphone, Monitor, Target, Award,
  MessageSquare, ThumbsUp, Share2, Download, Upload, Play,
  Tag, Ticket, Crown, Gem, BookOpen, FileText, Radio,
  AlertCircle, CheckCircle2, Info, HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

// ─── Types ─────────────────────────────────────────────────

interface PopupConfig {
  id: string;
  name: string;
  type: 'modal' | 'banner' | 'slide-in' | 'fullscreen' | 'floating-bar' | 'toast' | 'bottom-sheet' | 'sidebar';
  trigger: 'time-delay' | 'scroll-percent' | 'exit-intent' | 'click' | 'page-load' | 'inactivity' | 'add-to-cart' | 'custom-event';
  triggerValue: string;
  position: 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
  content: { heading: string; body: string; ctaText: string; ctaUrl: string; imageUrl: string; secondaryCta: string };
  style: { bgColor: string; textColor: string; accentColor: string; borderRadius: string; overlay: boolean; overlayColor: string; animation: string; width: string };
  behavior: { showOnce: boolean; frequency: string; closable: boolean; autoClose: number; showOnMobile: boolean; showOnDesktop: boolean; pageTargeting: string };
  isActive: boolean;
}

const DEFAULT_POPUP: Omit<PopupConfig, 'id'> = {
  name: 'New Popup',
  type: 'modal',
  trigger: 'time-delay',
  triggerValue: '3',
  position: 'center',
  content: { heading: 'Special Offer!', body: 'Sign up now and get 20% off your first order.', ctaText: 'Get Started', ctaUrl: '#', imageUrl: '', secondaryCta: '' },
  style: { bgColor: '#ffffff', textColor: '#1f2937', accentColor: '#6366f1', borderRadius: '16px', overlay: true, overlayColor: 'rgba(0,0,0,0.5)', animation: 'fade-in', width: '480px' },
  behavior: { showOnce: true, frequency: 'once', closable: true, autoClose: 0, showOnMobile: true, showOnDesktop: true, pageTargeting: 'all' },
  isActive: false,
};

// ─── Popup Templates ───────────────────────────────────────

const POPUP_TEMPLATES = [
  {
    id: 'email-capture', name: 'Email Capture', icon: Mail, category: 'Lead Gen', preview: '📧',
    description: 'Collect email addresses with a discount offer',
    config: { ...DEFAULT_POPUP, name: 'Email Capture', type: 'modal' as const, content: { ...DEFAULT_POPUP.content, heading: '🎉 Get 15% Off!', body: 'Subscribe to our newsletter and receive an exclusive discount on your first order.', ctaText: 'Subscribe Now', secondaryCta: 'No thanks' } },
  },
  {
    id: 'exit-intent', name: 'Exit Intent', icon: ArrowUpFromDot, category: 'Lead Gen', preview: '🚪',
    description: 'Capture leaving visitors before they go',
    config: { ...DEFAULT_POPUP, name: 'Exit Intent', type: 'modal' as const, trigger: 'exit-intent' as const, content: { ...DEFAULT_POPUP.content, heading: 'Wait! Don\'t Leave Yet', body: 'We have a special offer just for you. Get 20% off right now!', ctaText: 'Claim My Discount', secondaryCta: 'Maybe later' } },
  },
  {
    id: 'welcome-mat', name: 'Welcome Mat', icon: Maximize2, category: 'Welcome', preview: '👋',
    description: 'Full-screen welcome overlay for first-time visitors',
    config: { ...DEFAULT_POPUP, name: 'Welcome Mat', type: 'fullscreen' as const, trigger: 'page-load' as const, content: { ...DEFAULT_POPUP.content, heading: 'Welcome to Our Store!', body: 'Discover our curated collection of premium products.', ctaText: 'Start Shopping', secondaryCta: 'Browse deals' } },
  },
  {
    id: 'countdown', name: 'Countdown Timer', icon: Timer, category: 'Urgency', preview: '⏰',
    description: 'Limited-time offer with countdown',
    config: { ...DEFAULT_POPUP, name: 'Countdown Sale', type: 'banner' as const, position: 'top' as const, content: { ...DEFAULT_POPUP.content, heading: '🔥 Flash Sale Ends In 2 Hours!', body: 'Up to 50% off everything. Don\'t miss out!', ctaText: 'Shop Now', secondaryCta: '' } },
  },
  {
    id: 'social-proof', name: 'Social Proof', icon: Users, category: 'Trust', preview: '👥',
    description: 'Show recent purchases or activity',
    config: { ...DEFAULT_POPUP, name: 'Social Proof', type: 'toast' as const, position: 'bottom-left' as const, trigger: 'time-delay' as const, triggerValue: '5', content: { ...DEFAULT_POPUP.content, heading: 'Someone just purchased!', body: 'Sarah from NYC bought Premium Package 2 mins ago', ctaText: 'View Product', secondaryCta: '' }, style: { ...DEFAULT_POPUP.style, width: '320px' } },
  },
  {
    id: 'cookie-consent', name: 'Cookie Consent', icon: Shield, category: 'Legal', preview: '🍪',
    description: 'GDPR-compliant cookie notice',
    config: { ...DEFAULT_POPUP, name: 'Cookie Consent', type: 'floating-bar' as const, position: 'bottom' as const, trigger: 'page-load' as const, content: { ...DEFAULT_POPUP.content, heading: 'We use cookies', body: 'This website uses cookies to ensure you get the best experience.', ctaText: 'Accept All', secondaryCta: 'Manage Preferences' }, behavior: { ...DEFAULT_POPUP.behavior, showOnce: true, closable: true } },
  },
  {
    id: 'free-shipping', name: 'Free Shipping Bar', icon: Tag, category: 'E-commerce', preview: '🚚',
    description: 'Progress bar to free shipping threshold',
    config: { ...DEFAULT_POPUP, name: 'Free Shipping', type: 'floating-bar' as const, position: 'top' as const, trigger: 'page-load' as const, content: { ...DEFAULT_POPUP.content, heading: '🚚 Free shipping on orders over $50!', body: 'You\'re $25 away from free shipping', ctaText: 'Shop More', secondaryCta: '' } },
  },
  {
    id: 'spin-wheel', name: 'Spin to Win', icon: Target, category: 'Gamification', preview: '🎡',
    description: 'Gamified discount wheel',
    config: { ...DEFAULT_POPUP, name: 'Spin to Win', type: 'modal' as const, content: { ...DEFAULT_POPUP.content, heading: '🎡 Spin to Win!', body: 'Try your luck and win amazing discounts!', ctaText: 'Spin Now', secondaryCta: '' } },
  },
  {
    id: 'announcement', name: 'Announcement Bar', icon: Megaphone, category: 'Info', preview: '📢',
    description: 'Top bar for news and announcements',
    config: { ...DEFAULT_POPUP, name: 'Announcement', type: 'banner' as const, position: 'top' as const, trigger: 'page-load' as const, content: { ...DEFAULT_POPUP.content, heading: '📢 New Feature Released!', body: 'Check out our latest update.', ctaText: 'Learn More', secondaryCta: '' } },
  },
  {
    id: 'feedback', name: 'Feedback Survey', icon: MessageSquare, category: 'Engagement', preview: '💬',
    description: 'Quick NPS or feedback form',
    config: { ...DEFAULT_POPUP, name: 'Feedback', type: 'slide-in' as const, position: 'bottom-right' as const, trigger: 'scroll-percent' as const, triggerValue: '75', content: { ...DEFAULT_POPUP.content, heading: 'How was your experience?', body: 'We\'d love to hear your feedback.', ctaText: 'Share Feedback', secondaryCta: 'Maybe later' } },
  },
  {
    id: 'age-verify', name: 'Age Verification', icon: Lock, category: 'Legal', preview: '🔞',
    description: 'Age gate for restricted content',
    config: { ...DEFAULT_POPUP, name: 'Age Verification', type: 'fullscreen' as const, trigger: 'page-load' as const, content: { ...DEFAULT_POPUP.content, heading: 'Age Verification Required', body: 'You must be 21 or older to access this site.', ctaText: 'I am 21+', secondaryCta: 'Leave site' }, behavior: { ...DEFAULT_POPUP.behavior, closable: false } },
  },
  {
    id: 'upsell', name: 'Upsell/Cross-sell', icon: Crown, category: 'E-commerce', preview: '👑',
    description: 'Suggest related products at checkout',
    config: { ...DEFAULT_POPUP, name: 'Upsell', type: 'slide-in' as const, position: 'right' as const, trigger: 'add-to-cart' as const, content: { ...DEFAULT_POPUP.content, heading: 'You might also like...', body: 'Complete your look with these items', ctaText: 'Add to Cart', secondaryCta: 'No thanks' } },
  },
];

// ─── Popup Components Library ──────────────────────────────

const POPUP_COMPONENTS = {
  'Layout Types': [
    { id: 'modal-center', name: 'Center Modal', icon: Maximize2, description: 'Classic centered dialog', preview: '📱' },
    { id: 'slide-left', name: 'Slide-in Left', icon: PanelBottom, description: 'Slides from left edge', preview: '◀️' },
    { id: 'slide-right', name: 'Slide-in Right', icon: PanelBottom, description: 'Slides from right edge', preview: '▶️' },
    { id: 'slide-bottom', name: 'Bottom Sheet', icon: PanelBottom, description: 'Mobile-style bottom sheet', preview: '⬆️' },
    { id: 'top-banner', name: 'Top Banner', icon: PanelTop, description: 'Sticky top notification', preview: '📣' },
    { id: 'bottom-bar', name: 'Bottom Bar', icon: PanelBottom, description: 'Floating bottom bar', preview: '📢' },
    { id: 'fullscreen-overlay', name: 'Fullscreen', icon: Maximize2, description: 'Full viewport overlay', preview: '🖥️' },
    { id: 'toast-notification', name: 'Toast', icon: Bell, description: 'Small corner notification', preview: '🔔' },
  ],
  'Content Elements': [
    { id: 'popup-heading', name: 'Heading', icon: Type, description: 'Bold title text', preview: '📝' },
    { id: 'popup-body', name: 'Body Text', icon: AlignLeft, description: 'Description paragraph', preview: '📄' },
    { id: 'popup-image', name: 'Image', icon: Image, description: 'Visual content', preview: '🖼️' },
    { id: 'popup-video', name: 'Video', icon: Play, description: 'Embedded video', preview: '▶️' },
    { id: 'popup-cta', name: 'CTA Button', icon: MousePointerClick, description: 'Primary action button', preview: '🔘' },
    { id: 'popup-secondary-cta', name: 'Secondary Button', icon: MousePointerClick, description: 'Alternative action', preview: '⚪' },
    { id: 'popup-close', name: 'Close Button', icon: X, description: 'Dismiss popup', preview: '✕' },
    { id: 'popup-countdown', name: 'Countdown Timer', icon: Timer, description: 'Urgency timer', preview: '⏰' },
    { id: 'popup-progress', name: 'Progress Bar', icon: BarChart3, description: 'Visual progress', preview: '📊' },
  ],
  'Form Elements': [
    { id: 'popup-email-input', name: 'Email Input', icon: Mail, description: 'Email capture field', preview: '📧' },
    { id: 'popup-name-input', name: 'Name Input', icon: Users, description: 'Name field', preview: '👤' },
    { id: 'popup-phone-input', name: 'Phone Input', icon: Smartphone, description: 'Phone number field', preview: '📱' },
    { id: 'popup-textarea', name: 'Text Area', icon: FileText, description: 'Multi-line input', preview: '📝' },
    { id: 'popup-checkbox', name: 'Checkbox', icon: CheckCircle2, description: 'Opt-in checkbox', preview: '☑️' },
    { id: 'popup-radio', name: 'Radio Buttons', icon: Radio, description: 'Single selection', preview: '🔘' },
    { id: 'popup-rating', name: 'Star Rating', icon: Star, description: 'Rating input', preview: '⭐' },
    { id: 'popup-nps', name: 'NPS Score', icon: ThumbsUp, description: '0-10 rating scale', preview: '📊' },
  ],
  'Social & Sharing': [
    { id: 'popup-social-share', name: 'Social Share', icon: Share2, description: 'Share buttons', preview: '📤' },
    { id: 'popup-testimonial', name: 'Testimonial', icon: MessageSquare, description: 'Customer review', preview: '💬' },
    { id: 'popup-social-proof', name: 'Social Proof', icon: Users, description: 'Activity notification', preview: '👥' },
    { id: 'popup-trust-badge', name: 'Trust Badges', icon: Shield, description: 'Security icons', preview: '🛡️' },
    { id: 'popup-referral', name: 'Referral Link', icon: ExternalLink, description: 'Share & earn', preview: '🔗' },
  ],
  'E-commerce': [
    { id: 'popup-coupon', name: 'Coupon Code', icon: Ticket, description: 'Discount code display', preview: '🎟️' },
    { id: 'popup-product', name: 'Product Card', icon: Gift, description: 'Product recommendation', preview: '🎁' },
    { id: 'popup-cart-reminder', name: 'Cart Reminder', icon: AlertCircle, description: 'Abandoned cart alert', preview: '🛒' },
    { id: 'popup-free-shipping', name: 'Shipping Progress', icon: Tag, description: 'Free shipping meter', preview: '🚚' },
    { id: 'popup-spin-wheel', name: 'Spin Wheel', icon: Target, description: 'Gamified discount', preview: '🎡' },
    { id: 'popup-scratch-card', name: 'Scratch Card', icon: Sparkles, description: 'Reveal discount', preview: '🃏' },
  ],
};

// ─── Animations ────────────────────────────────────────────

const POPUP_ANIMATIONS = [
  { id: 'fade-in', name: 'Fade In', description: 'Simple opacity fade' },
  { id: 'slide-up', name: 'Slide Up', description: 'Slides from bottom' },
  { id: 'slide-down', name: 'Slide Down', description: 'Slides from top' },
  { id: 'slide-left', name: 'Slide Left', description: 'Slides from right' },
  { id: 'slide-right', name: 'Slide Right', description: 'Slides from left' },
  { id: 'zoom-in', name: 'Zoom In', description: 'Scales from small' },
  { id: 'bounce', name: 'Bounce', description: 'Bouncy entrance' },
  { id: 'flip', name: 'Flip', description: '3D flip effect' },
];

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = true, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-border/30">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{title}</span>
          {badge !== undefined && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{badge}</Badge>}
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Component Card ────────────────────────────────────────

const ComponentCard = ({ component, onAdd }: { component: any; onAdd: () => void }) => (
  <button
    onClick={onAdd}
    className="w-full p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
  >
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-base shrink-0">
        {component.preview}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate group-hover:text-primary transition-colors">{component.name}</div>
        <div className="text-[9px] text-muted-foreground truncate">{component.description}</div>
      </div>
      <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
    </div>
  </button>
);

// ─── Main Component ────────────────────────────────────────

const PopupBuilderPanel = ({ onClose }: { onClose: () => void }) => {
  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'components' | 'my-popups'>('templates');
  const [editTab, setEditTab] = useState<'content' | 'design' | 'trigger' | 'behavior'>('content');
  const [templateSearch, setTemplateSearch] = useState('');
  const [componentSearch, setComponentSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');

  const addPopup = (config?: Partial<Omit<PopupConfig, 'id'>>) => {
    const newPopup: PopupConfig = {
      ...DEFAULT_POPUP,
      ...(config || {}),
      id: `popup-${Date.now()}`,
      name: config?.name || `Popup ${popups.length + 1}`,
    } as PopupConfig;
    setPopups(prev => [...prev, newPopup]);
    setEditing(newPopup.id);
    setActiveTab('my-popups');
    toast.success(`Created ${newPopup.name}`);
  };

  const updatePopup = (id: string, updates: Partial<PopupConfig>) => {
    setPopups(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
    if (editing === id) setEditing(null);
    toast.success('Popup deleted');
  };

  const duplicatePopup = (popup: PopupConfig) => {
    const newPopup = { ...popup, id: `popup-${Date.now()}`, name: `${popup.name} (copy)` };
    setPopups(prev => [...prev, newPopup]);
    toast.success('Popup duplicated');
  };

  const current = popups.find(p => p.id === editing);

  const templateCategories = ['all', ...new Set(POPUP_TEMPLATES.map(t => t.category))];

  const filteredTemplates = POPUP_TEMPLATES.filter(t => {
    const matchesSearch = !templateSearch || t.name.toLowerCase().includes(templateSearch.toLowerCase()) || t.description.toLowerCase().includes(templateSearch.toLowerCase());
    const matchesFilter = templateFilter === 'all' || t.category === templateFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilteredComponents = () => {
    if (!componentSearch) return POPUP_COMPONENTS;
    const filtered: Record<string, typeof POPUP_COMPONENTS[keyof typeof POPUP_COMPONENTS]> = {};
    Object.entries(POPUP_COMPONENTS).forEach(([category, components]) => {
      const matching = components.filter(c =>
        c.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matching.length > 0) filtered[category] = matching;
    });
    return filtered;
  };

  return (
    <div className="builder-flyout flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Megaphone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Popups & Banners</h2>
            <p className="text-[10px] text-muted-foreground">{popups.length} popup{popups.length !== 1 ? 's' : ''} • {popups.filter(p => p.isActive).length} active</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Main Tabs or Edit View */}
      {editing && current ? (
        /* ════════════════════════════════════════════════════════ */
        /* EDIT MODE */
        /* ════════════════════════════════════════════════════════ */
        <>
          <button onClick={() => setEditing(null)} className="w-full text-left px-3 py-2.5 text-xs hover:bg-muted/50 transition-colors border-b border-border flex items-center gap-2">
            <ChevronRight className="w-3 h-3 rotate-180" /> Back to list
          </button>

          <div className="p-3 border-b border-border">
            <input
              value={current.name}
              onChange={e => updatePopup(current.id, { name: e.target.value })}
              className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs font-medium"
            />
          </div>

          {/* Edit Tabs */}
          <div className="flex border-b border-border shrink-0">
            {(['content', 'design', 'trigger', 'behavior'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setEditTab(tab)}
                className={`flex-1 py-2.5 text-[10px] font-medium capitalize transition-colors ${
                  editTab === tab ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-4">
              {/* Content Tab */}
              {editTab === 'content' && (
                <>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Heading</label>
                    <input
                      value={current.content.heading}
                      onChange={e => updatePopup(current.id, { content: { ...current.content, heading: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Body Text</label>
                    <textarea
                      value={current.content.body}
                      onChange={e => updatePopup(current.id, { content: { ...current.content, body: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs resize-y min-h-[70px]"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium mb-1.5 block">CTA Button</label>
                      <input
                        value={current.content.ctaText}
                        onChange={e => updatePopup(current.id, { content: { ...current.content, ctaText: e.target.value } })}
                        className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium mb-1.5 block">Secondary CTA</label>
                      <input
                        value={current.content.secondaryCta}
                        onChange={e => updatePopup(current.id, { content: { ...current.content, secondaryCta: e.target.value } })}
                        className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">CTA Link URL</label>
                    <input
                      value={current.content.ctaUrl}
                      onChange={e => updatePopup(current.id, { content: { ...current.content, ctaUrl: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Image URL</label>
                    <input
                      value={current.content.imageUrl}
                      onChange={e => updatePopup(current.id, { content: { ...current.content, imageUrl: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </>
              )}

              {/* Design Tab */}
              {editTab === 'design' && (
                <>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Popup Type</label>
                    <select
                      value={current.type}
                      onChange={e => updatePopup(current.id, { type: e.target.value as any })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="modal">Modal Dialog</option>
                      <option value="banner">Top/Bottom Banner</option>
                      <option value="slide-in">Slide-in</option>
                      <option value="fullscreen">Fullscreen</option>
                      <option value="floating-bar">Floating Bar</option>
                      <option value="toast">Toast Notification</option>
                      <option value="bottom-sheet">Bottom Sheet</option>
                      <option value="sidebar">Sidebar Panel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Position</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map(pos => (
                        <button
                          key={pos}
                          onClick={() => updatePopup(current.id, { position: pos as any })}
                          className={`py-2 rounded text-[9px] capitalize transition-colors ${
                            current.position === pos ? 'bg-primary text-primary-foreground' : 'bg-muted/30 hover:bg-muted/50'
                          }`}
                        >
                          {pos.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Animation</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {POPUP_ANIMATIONS.map(anim => (
                        <button
                          key={anim.id}
                          onClick={() => updatePopup(current.id, { style: { ...current.style, animation: anim.id } })}
                          className={`p-2 rounded-md text-left text-[10px] transition-colors ${
                            current.style.animation === anim.id ? 'bg-primary/10 ring-1 ring-primary' : 'bg-muted/30 hover:bg-muted/50'
                          }`}
                        >
                          <div className="font-medium">{anim.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-2 block">Colors</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: 'bgColor', label: 'Background' },
                        { key: 'textColor', label: 'Text' },
                        { key: 'accentColor', label: 'Accent' },
                        { key: 'overlayColor', label: 'Overlay' },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <label className="text-[9px] text-muted-foreground mb-1 block">{label}</label>
                          <input
                            type="color"
                            value={(current.style as any)[key].startsWith('rgba') ? '#000000' : (current.style as any)[key]}
                            onChange={e => updatePopup(current.id, { style: { ...current.style, [key]: e.target.value } })}
                            className="w-full h-8 rounded-md cursor-pointer border-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Border Radius</label>
                    <select
                      value={current.style.borderRadius}
                      onChange={e => updatePopup(current.id, { style: { ...current.style, borderRadius: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="0">None (0px)</option>
                      <option value="4px">Small (4px)</option>
                      <option value="8px">Medium (8px)</option>
                      <option value="16px">Large (16px)</option>
                      <option value="24px">Extra Large (24px)</option>
                      <option value="9999px">Pill</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Width</label>
                    <select
                      value={current.style.width}
                      onChange={e => updatePopup(current.id, { style: { ...current.style, width: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="320px">Small (320px)</option>
                      <option value="480px">Medium (480px)</option>
                      <option value="640px">Large (640px)</option>
                      <option value="800px">Extra Large (800px)</option>
                      <option value="100%">Full Width</option>
                    </select>
                  </div>
                </>
              )}

              {/* Trigger Tab */}
              {editTab === 'trigger' && (
                <>
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Trigger Type</label>
                    <select
                      value={current.trigger}
                      onChange={e => updatePopup(current.id, { trigger: e.target.value as any })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="time-delay">⏰ Time Delay</option>
                      <option value="scroll-percent">📜 Scroll Percentage</option>
                      <option value="exit-intent">🚪 Exit Intent</option>
                      <option value="click">🖱️ On Click</option>
                      <option value="page-load">📄 Page Load</option>
                      <option value="inactivity">💤 User Inactivity</option>
                      <option value="add-to-cart">🛒 Add to Cart</option>
                      <option value="custom-event">⚡ Custom Event</option>
                    </select>
                  </div>

                  {/* Trigger-specific value */}
                  {current.trigger === 'time-delay' && (
                    <div>
                      <label className="text-[11px] font-medium mb-1.5 block">Delay (seconds)</label>
                      <div className="flex items-center gap-3">
                        <Slider
                          value={[Number(current.triggerValue) || 0]}
                          onValueChange={([v]) => updatePopup(current.id, { triggerValue: v.toString() })}
                          min={0} max={60} step={1}
                          className="flex-1"
                        />
                        <span className="text-xs font-mono w-8">{current.triggerValue}s</span>
                      </div>
                    </div>
                  )}

                  {current.trigger === 'scroll-percent' && (
                    <div>
                      <label className="text-[11px] font-medium mb-1.5 block">Scroll Percentage</label>
                      <div className="flex items-center gap-3">
                        <Slider
                          value={[Number(current.triggerValue) || 0]}
                          onValueChange={([v]) => updatePopup(current.id, { triggerValue: v.toString() })}
                          min={0} max={100} step={5}
                          className="flex-1"
                        />
                        <span className="text-xs font-mono w-8">{current.triggerValue}%</span>
                      </div>
                    </div>
                  )}

                  {current.trigger === 'inactivity' && (
                    <div>
                      <label className="text-[11px] font-medium mb-1.5 block">Inactivity Duration (seconds)</label>
                      <input
                        type="number"
                        value={current.triggerValue}
                        onChange={e => updatePopup(current.id, { triggerValue: e.target.value })}
                        className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                        placeholder="30"
                      />
                    </div>
                  )}

                  {/* Trigger Info */}
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-[10px] text-muted-foreground">
                        {current.trigger === 'exit-intent' && 'Triggers when the user moves their cursor toward the browser close button.'}
                        {current.trigger === 'time-delay' && `Popup will appear ${current.triggerValue} seconds after page load.`}
                        {current.trigger === 'scroll-percent' && `Triggers when the user scrolls past ${current.triggerValue}% of the page.`}
                        {current.trigger === 'page-load' && 'Popup appears immediately when the page loads.'}
                        {current.trigger === 'click' && 'Popup opens when a specific element is clicked.'}
                        {current.trigger === 'inactivity' && `Triggers after ${current.triggerValue || '30'} seconds of no mouse/keyboard activity.`}
                        {current.trigger === 'add-to-cart' && 'Triggers when a customer adds an item to their cart.'}
                        {current.trigger === 'custom-event' && 'Triggered by a custom JavaScript event.'}
                      </div>
                    </div>
                  </div>

                  {/* Page Targeting */}
                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Page Targeting</label>
                    <select
                      value={current.behavior.pageTargeting}
                      onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, pageTargeting: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="all">All Pages</option>
                      <option value="homepage">Homepage Only</option>
                      <option value="product">Product Pages</option>
                      <option value="cart">Cart Page</option>
                      <option value="checkout">Checkout Page</option>
                      <option value="blog">Blog Posts</option>
                      <option value="custom">Custom URL Pattern</option>
                    </select>
                  </div>
                </>
              )}

              {/* Behavior Tab */}
              {editTab === 'behavior' && (
                <>
                  <div className="space-y-2">
                    {[
                      { key: 'closable', label: 'Show Close Button', description: 'Allow users to dismiss' },
                      { key: 'showOnce', label: 'Show Only Once', description: 'Don\'t show again after closing' },
                      { key: 'showOnMobile', label: 'Show on Mobile', description: 'Visible on mobile devices' },
                      { key: 'showOnDesktop', label: 'Show on Desktop', description: 'Visible on desktop' },
                    ].map(item => (
                      <label key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 cursor-pointer">
                        <div>
                          <div className="text-[11px] font-medium">{item.label}</div>
                          <div className="text-[9px] text-muted-foreground">{item.description}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={(current.behavior as any)[item.key]}
                          onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, [item.key]: e.target.checked } })}
                          className="w-4 h-4 rounded accent-primary"
                        />
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Display Frequency</label>
                    <select
                      value={current.behavior.frequency}
                      onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, frequency: e.target.value } })}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="once">Once per session</option>
                      <option value="always">Every page view</option>
                      <option value="daily">Once per day</option>
                      <option value="weekly">Once per week</option>
                      <option value="monthly">Once per month</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium mb-1.5 block">Auto-close After (0 = never)</label>
                    <div className="flex items-center gap-3">
                      <Slider
                        value={[current.behavior.autoClose]}
                        onValueChange={([v]) => updatePopup(current.id, { behavior: { ...current.behavior, autoClose: v } })}
                        min={0} max={60} step={1}
                        className="flex-1"
                      />
                      <span className="text-xs font-mono w-8">{current.behavior.autoClose}s</span>
                    </div>
                  </div>
                </>
              )}

              {/* Live Preview */}
              <div className="mt-2 rounded-lg overflow-hidden border border-border">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground p-2 bg-muted/30 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Preview
                </div>
                <div
                  className="relative p-6 min-h-[140px] flex items-center justify-center"
                  style={{ background: current.style.overlay ? 'rgba(0,0,0,0.3)' : 'hsl(var(--muted))' }}
                >
                  <div
                    className="rounded-lg p-4 shadow-xl max-w-[220px] w-full"
                    style={{
                      background: current.style.bgColor,
                      color: current.style.textColor,
                      borderRadius: current.style.borderRadius,
                    }}
                  >
                    {current.content.heading && (
                      <div className="text-xs font-bold mb-1">{current.content.heading}</div>
                    )}
                    {current.content.body && (
                      <div className="text-[9px] opacity-70 mb-3">{current.content.body}</div>
                    )}
                    <div className="flex gap-2">
                      {current.content.ctaText && (
                        <button
                          className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
                          style={{ background: current.style.accentColor }}
                        >
                          {current.content.ctaText}
                        </button>
                      )}
                      {current.content.secondaryCta && (
                        <button className="px-3 py-1.5 rounded text-[10px] font-medium opacity-60">
                          {current.content.secondaryCta}
                        </button>
                      )}
                    </div>
                    {current.behavior.closable && (
                      <button className="absolute top-7 right-7 text-xs opacity-50 hover:opacity-100">✕</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </>
      ) : (
        /* ════════════════════════════════════════════════════════ */
        /* LIST MODE */
        /* ════════════════════════════════════════════════════════ */
        <>
          {/* Main Tabs */}
          <div className="flex border-b border-border shrink-0">
            {[
              { id: 'templates' as const, label: 'Templates', icon: Layers },
              { id: 'components' as const, label: 'Elements', icon: Zap },
              { id: 'my-popups' as const, label: 'My Popups', icon: Megaphone },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-medium transition-colors ${
                  activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-3 h-3" /> {label}
                {id === 'my-popups' && popups.length > 0 && (
                  <Badge variant="secondary" className="text-[9px] px-1 py-0">{popups.length}</Badge>
                )}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            {/* ─── Templates Tab ─── */}
            {activeTab === 'templates' && (
              <div className="divide-y divide-border/30">
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={templateSearch}
                      onChange={e => setTemplateSearch(e.target.value)}
                      placeholder="Search popup templates..."
                      className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {templateCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setTemplateFilter(cat)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-medium capitalize transition-colors ${
                          templateFilter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  {filteredTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => addPopup(template.config as any)}
                      className="w-full p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                          {template.preview}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium group-hover:text-primary transition-colors">{template.name}</span>
                            <Badge variant="secondary" className="text-[8px]">{template.category}</Badge>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{template.description}</div>
                        </div>
                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary shrink-0" />
                      </div>
                    </button>
                  ))}
                  {filteredTemplates.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">No templates match your search</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Components Tab ─── */}
            {activeTab === 'components' && (
              <div className="divide-y divide-border/30">
                <div className="p-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={componentSearch}
                      onChange={e => setComponentSearch(e.target.value)}
                      placeholder="Search popup elements..."
                      className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {Object.entries(getFilteredComponents()).map(([category, components]) => (
                  <Section key={category} title={category} icon={Layers} badge={components.length} defaultOpen={category === 'Layout Types'}>
                    <div className="space-y-1.5">
                      {components.map(component => (
                        <ComponentCard
                          key={component.id}
                          component={component}
                          onAdd={() => toast.success(`Added ${component.name}`)}
                        />
                      ))}
                    </div>
                  </Section>
                ))}
              </div>
            )}

            {/* ─── My Popups Tab ─── */}
            {activeTab === 'my-popups' && (
              <div className="p-3 space-y-3">
                <button
                  onClick={() => addPopup()}
                  className="w-full py-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" /> Create Blank Popup
                </button>

                {popups.length === 0 && (
                  <div className="text-center py-10">
                    <Megaphone className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                    <div className="text-sm font-medium mb-1">No popups yet</div>
                    <div className="text-xs text-muted-foreground">Create one from a template or start from scratch</div>
                  </div>
                )}

                {popups.map(popup => (
                  <div key={popup.id} className="rounded-lg border border-border/50 overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">{popup.name}</span>
                        <button
                          onClick={() => updatePopup(popup.id, { isActive: !popup.isActive })}
                          className={`w-9 h-5 rounded-full flex items-center transition-colors px-0.5 ${
                            popup.isActive ? 'bg-success justify-end' : 'bg-muted justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground mb-3">
                        <Badge variant="secondary" className="text-[9px] capitalize">{popup.type}</Badge>
                        <Badge variant="secondary" className="text-[9px] capitalize">{popup.trigger.replace('-', ' ')}</Badge>
                        <Badge variant="secondary" className="text-[9px]">{popup.position}</Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditing(popup.id)}
                          className="flex-1 py-2 text-xs rounded-md font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button onClick={() => duplicatePopup(popup)} className="p-2 rounded-md hover:bg-muted transition-colors">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deletePopup(popup.id)} className="p-2 rounded-md hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default PopupBuilderPanel;
