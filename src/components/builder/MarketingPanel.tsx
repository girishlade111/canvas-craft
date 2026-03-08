import { useState, useMemo } from 'react';
import {
  Megaphone, Mail, MessageSquare, Share2, Bell, Users, Plus, X,
  Send, Calendar, BarChart3, Eye, Edit3, Trash2, Clock,
  Facebook, Instagram, Twitter, Linkedin, Globe, Zap, Loader2,
  Search, Layers, ChevronRight, Star, Target, Gift, Percent,
  TrendingUp, ArrowRight, Copy, Sparkles, MousePointerClick,
  ExternalLink, Image, Type, AlignLeft, Smartphone, Monitor,
  PanelTop, Tag, Award, Heart, ThumbsUp, BookOpen, FileText,
  Shield, Lock, Hash, MailOpen, Inbox, UserPlus, Settings,
  PieChart, Activity, Radio, Rss, Play, Video, ChevronDown,
  Info, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { useEmailCampaigns, useCreateEmailCampaign, useSocialPosts, useCreateSocialPost } from '@/hooks/useMarketing';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';

const platformIcons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };

// ─── Marketing Components Library ──────────────────────────

const MARKETING_COMPONENTS: Record<string, { icon: any; items: { id: string; name: string; icon: any; description: string; preview: string }[] }> = {
  'Banners & CTAs': {
    icon: Megaphone,
    items: [
      { id: 'hero-cta', name: 'Hero CTA Section', icon: Target, description: 'Full-width call-to-action', preview: '🎯' },
      { id: 'promo-banner', name: 'Promo Banner', icon: Megaphone, description: 'Announcement banner bar', preview: '📢' },
      { id: 'floating-cta', name: 'Floating CTA', icon: MousePointerClick, description: 'Sticky action button', preview: '🔘' },
      { id: 'inline-cta', name: 'Inline CTA', icon: ArrowRight, description: 'In-content call-to-action', preview: '➡️' },
      { id: 'exit-cta', name: 'Exit Intent CTA', icon: AlertCircle, description: 'Before-leave prompt', preview: '🚪' },
      { id: 'split-cta', name: 'Split A/B CTA', icon: Layers, description: 'Side-by-side comparison CTA', preview: '⚖️' },
    ],
  },
  'Email Capture': {
    icon: Mail,
    items: [
      { id: 'newsletter-inline', name: 'Inline Newsletter', icon: MailOpen, description: 'In-page email signup', preview: '📧' },
      { id: 'newsletter-footer', name: 'Footer Signup', icon: Inbox, description: 'Footer email capture', preview: '📬' },
      { id: 'lead-magnet', name: 'Lead Magnet', icon: Gift, description: 'Download in exchange for email', preview: '🎁' },
      { id: 'content-gate', name: 'Content Gate', icon: Lock, description: 'Unlock content with email', preview: '🔒' },
      { id: 'waitlist-form', name: 'Waitlist Form', icon: Clock, description: 'Pre-launch signup', preview: '⏳' },
      { id: 'email-preferences', name: 'Email Preferences', icon: Settings, description: 'Subscription management', preview: '⚙️' },
    ],
  },
  'Social Proof': {
    icon: Users,
    items: [
      { id: 'testimonial-card', name: 'Testimonial Card', icon: MessageSquare, description: 'Customer quote card', preview: '💬' },
      { id: 'testimonial-slider', name: 'Testimonial Carousel', icon: Star, description: 'Rotating testimonials', preview: '🌟' },
      { id: 'review-stars', name: 'Star Ratings', icon: Star, description: 'Product/service ratings', preview: '⭐' },
      { id: 'trust-badges', name: 'Trust Badges', icon: Shield, description: 'Security & trust icons', preview: '🛡️' },
      { id: 'client-logos', name: 'Client Logo Bar', icon: Award, description: '"Trusted by" logo strip', preview: '🏆' },
      { id: 'stats-counter', name: 'Stats Counter', icon: TrendingUp, description: 'Animated number counters', preview: '📊' },
      { id: 'case-study', name: 'Case Study Card', icon: BookOpen, description: 'Success story showcase', preview: '📖' },
      { id: 'social-proof-toast', name: 'Activity Toast', icon: Bell, description: 'Recent activity notification', preview: '🔔' },
    ],
  },
  'Pricing & Offers': {
    icon: Tag,
    items: [
      { id: 'pricing-table', name: 'Pricing Table', icon: Tag, description: 'Compare plans side-by-side', preview: '💰' },
      { id: 'pricing-card', name: 'Pricing Card', icon: Tag, description: 'Single plan card', preview: '💳' },
      { id: 'pricing-toggle', name: 'Monthly/Annual Toggle', icon: Layers, description: 'Pricing period switcher', preview: '🔄' },
      { id: 'discount-badge', name: 'Discount Badge', icon: Percent, description: 'Sale/discount label', preview: '🏷️' },
      { id: 'countdown-timer', name: 'Countdown Timer', icon: Clock, description: 'Urgency countdown', preview: '⏰' },
      { id: 'limited-offer', name: 'Limited Offer Bar', icon: Sparkles, description: 'Scarcity banner', preview: '🔥' },
      { id: 'coupon-display', name: 'Coupon Display', icon: Gift, description: 'Copy-to-clipboard coupon', preview: '🎟️' },
    ],
  },
  'Social Media': {
    icon: Share2,
    items: [
      { id: 'social-share', name: 'Share Buttons', icon: Share2, description: 'Social sharing buttons', preview: '📤' },
      { id: 'social-follow', name: 'Follow Buttons', icon: UserPlus, description: 'Follow us links', preview: '➕' },
      { id: 'social-feed', name: 'Social Feed', icon: Rss, description: 'Embedded social feed', preview: '📱' },
      { id: 'twitter-embed', name: 'Tweet Embed', icon: Twitter, description: 'Embedded tweet', preview: '🐦' },
      { id: 'instagram-grid', name: 'Instagram Grid', icon: Instagram, description: 'Photo gallery from IG', preview: '📸' },
      { id: 'social-proof-bar', name: 'Follower Count Bar', icon: Users, description: 'Show social following', preview: '👥' },
      { id: 'share-cta', name: 'Share CTA', icon: Heart, description: '"Share with a friend" prompt', preview: '❤️' },
    ],
  },
  'Content Marketing': {
    icon: FileText,
    items: [
      { id: 'blog-preview', name: 'Blog Preview Grid', icon: BookOpen, description: 'Latest posts grid', preview: '📝' },
      { id: 'featured-post', name: 'Featured Post', icon: Star, description: 'Highlighted article', preview: '📌' },
      { id: 'content-hub', name: 'Content Hub', icon: Layers, description: 'Resource library', preview: '📚' },
      { id: 'video-testimonial', name: 'Video Testimonial', icon: Video, description: 'Video review embed', preview: '🎬' },
      { id: 'podcast-player', name: 'Podcast Player', icon: Radio, description: 'Audio episode player', preview: '🎙️' },
      { id: 'ebook-download', name: 'eBook Download', icon: BookOpen, description: 'Digital asset download', preview: '📕' },
      { id: 'webinar-signup', name: 'Webinar Signup', icon: Play, description: 'Event registration block', preview: '🖥️' },
    ],
  },
  'Conversion & Analytics': {
    icon: BarChart3,
    items: [
      { id: 'ab-test-block', name: 'A/B Test Block', icon: Layers, description: 'Test two content variants', preview: '🧪' },
      { id: 'heatmap-tracker', name: 'Heatmap Tracker', icon: Activity, description: 'Click tracking overlay', preview: '🔥' },
      { id: 'conversion-pixel', name: 'Conversion Pixel', icon: Target, description: 'Tracking pixel embed', preview: '🎯' },
      { id: 'analytics-dashboard', name: 'Analytics Widget', icon: PieChart, description: 'Inline stats display', preview: '📈' },
      { id: 'utm-builder', name: 'UTM Link Builder', icon: ExternalLink, description: 'Campaign URL generator', preview: '🔗' },
      { id: 'goal-tracker', name: 'Goal Tracker', icon: CheckCircle2, description: 'Conversion goal display', preview: '✅' },
    ],
  },
  'Referral & Growth': {
    icon: TrendingUp,
    items: [
      { id: 'referral-widget', name: 'Referral Widget', icon: UserPlus, description: 'Refer-a-friend block', preview: '🤝' },
      { id: 'affiliate-banner', name: 'Affiliate Banner', icon: Tag, description: 'Partner promotion', preview: '🏷️' },
      { id: 'viral-loop', name: 'Viral Share Loop', icon: TrendingUp, description: 'Share-to-unlock content', preview: '🚀' },
      { id: 'loyalty-badge', name: 'Loyalty Program', icon: Award, description: 'Points/rewards display', preview: '🏅' },
      { id: 'milestone-bar', name: 'Milestone Bar', icon: Target, description: 'Progress to goal', preview: '📏' },
    ],
  },
};

// ─── Marketing Templates ───────────────────────────────────

const MARKETING_TEMPLATES = [
  {
    id: 'product-launch', name: 'Product Launch', icon: '🚀', category: 'Launch',
    description: 'Hero + features + pricing + CTA for new product',
    components: ['hero-cta', 'stats-counter', 'pricing-table', 'testimonial-slider', 'newsletter-inline'],
  },
  {
    id: 'saas-landing', name: 'SaaS Landing Page', icon: '💻', category: 'SaaS',
    description: 'Complete SaaS conversion page',
    components: ['hero-cta', 'client-logos', 'pricing-toggle', 'testimonial-card', 'inline-cta'],
  },
  {
    id: 'lead-gen', name: 'Lead Generation', icon: '📋', category: 'Lead Gen',
    description: 'Capture leads with gated content',
    components: ['lead-magnet', 'trust-badges', 'testimonial-card', 'countdown-timer', 'content-gate'],
  },
  {
    id: 'email-campaign', name: 'Email Campaign', icon: '📧', category: 'Email',
    description: 'Newsletter + email capture sections',
    components: ['newsletter-inline', 'newsletter-footer', 'email-preferences', 'social-share'],
  },
  {
    id: 'social-proof-page', name: 'Social Proof Page', icon: '⭐', category: 'Trust',
    description: 'Testimonials, reviews, and case studies',
    components: ['testimonial-slider', 'review-stars', 'case-study', 'client-logos', 'stats-counter'],
  },
  {
    id: 'flash-sale', name: 'Flash Sale', icon: '⚡', category: 'E-commerce',
    description: 'Urgency-driven promotion page',
    components: ['promo-banner', 'countdown-timer', 'limited-offer', 'discount-badge', 'coupon-display'],
  },
  {
    id: 'content-marketing', name: 'Content Hub', icon: '📚', category: 'Content',
    description: 'Blog, videos, and resources page',
    components: ['blog-preview', 'featured-post', 'content-hub', 'podcast-player', 'ebook-download'],
  },
  {
    id: 'referral-program', name: 'Referral Program', icon: '🤝', category: 'Growth',
    description: 'Referral and rewards page',
    components: ['referral-widget', 'viral-loop', 'loyalty-badge', 'milestone-bar', 'social-share'],
  },
  {
    id: 'webinar-page', name: 'Webinar Landing', icon: '🎥', category: 'Events',
    description: 'Event registration page',
    components: ['hero-cta', 'webinar-signup', 'testimonial-card', 'countdown-timer', 'social-share'],
  },
  {
    id: 'coming-soon', name: 'Coming Soon', icon: '⏳', category: 'Launch',
    description: 'Pre-launch teaser with waitlist',
    components: ['waitlist-form', 'countdown-timer', 'social-follow', 'milestone-bar'],
  },
];

// ─── Automation Templates ──────────────────────────────────

const AUTOMATION_TEMPLATES = [
  { id: 'welcome-series', name: 'Welcome Email Series', icon: '👋', description: '3-email onboarding drip', trigger: 'New signup' },
  { id: 'cart-abandon', name: 'Cart Abandonment', icon: '🛒', description: 'Remind after 1h, 24h, 72h', trigger: 'Abandoned cart' },
  { id: 'post-purchase', name: 'Post-Purchase Follow-up', icon: '📦', description: 'Thank you + review request', trigger: 'Order completed' },
  { id: 're-engagement', name: 'Re-engagement', icon: '💤', description: 'Win back inactive users', trigger: '30 days inactive' },
  { id: 'birthday', name: 'Birthday Campaign', icon: '🎂', description: 'Auto birthday discount', trigger: 'User birthday' },
  { id: 'referral-reward', name: 'Referral Reward', icon: '🎁', description: 'Auto-send when referred', trigger: 'Referral signup' },
  { id: 'lead-nurture', name: 'Lead Nurture', icon: '🌱', description: '5-email education series', trigger: 'Lead captured' },
  { id: 'upsell', name: 'Upsell Sequence', icon: '📈', description: 'Upgrade offer after trial', trigger: 'Trial ending' },
];

// ─── Section Component ─────────────────────────────────────

const Section = ({ title, icon: Icon, children, defaultOpen = false, badge }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; badge?: string | number }) => {
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
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// ─── Main Component ────────────────────────────────────────

interface MarketingPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const MarketingPanel = ({ projectId, onClose }: MarketingPanelProps) => {
  const { schema, addComponent } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'components' | 'templates' | 'campaigns' | 'automations'>('components');
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [componentSearch, setComponentSearch] = useState('');
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('twitter');

  const { data: campaigns = [], isLoading: campaignsLoading } = useEmailCampaigns(projectId ?? null);
  const { data: socialPosts = [], isLoading: socialLoading } = useSocialPosts(projectId ?? null);
  const createCampaign = useCreateEmailCampaign();
  const createSocialPost = useCreateSocialPost();

  const totalComponents = Object.values(MARKETING_COMPONENTS).reduce((sum, c) => sum + c.items.length, 0);

  const templateCategories = useMemo(() => ['all', ...new Set(MARKETING_TEMPLATES.map(t => t.category))], []);

  const filteredTemplates = useMemo(() =>
    MARKETING_TEMPLATES.filter(t => {
      const matchSearch = !templateSearch || t.name.toLowerCase().includes(templateSearch.toLowerCase()) || t.description.toLowerCase().includes(templateSearch.toLowerCase());
      const matchCat = templateFilter === 'all' || t.category === templateFilter;
      return matchSearch && matchCat;
    }),
  [templateSearch, templateFilter]);

  const filteredComponents = useMemo(() => {
    if (!componentSearch) return MARKETING_COMPONENTS;
    const result: typeof MARKETING_COMPONENTS = {};
    Object.entries(MARKETING_COMPONENTS).forEach(([cat, data]) => {
      const matching = data.items.filter(i =>
        i.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        i.description.toLowerCase().includes(componentSearch.toLowerCase())
      );
      if (matching.length) result[cat] = { ...data, items: matching };
    });
    return result;
  }, [componentSearch]);

  // ─── Handlers ──────────────────

  const handleAddComponent = (component: typeof MARKETING_COMPONENTS[string]['items'][0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      addComponent(bodySection.id, {
        id: `${component.id}-${Date.now()}`,
        type: component.id,
        category: 'marketing',
        label: component.name,
        content: '',
        props: {},
        children: [],
        styles: { padding: '24px' },
      });
      toast.success(`Added "${component.name}" to page`);
    }
  };

  const handleApplyTemplate = (template: typeof MARKETING_TEMPLATES[0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body');
    if (bodySection) {
      template.components.forEach((compId, idx) => {
        const allItems = Object.values(MARKETING_COMPONENTS).flatMap(c => c.items);
        const comp = allItems.find(i => i.id === compId);
        if (comp) {
          addComponent(bodySection.id, {
            id: `${compId}-${Date.now()}-${idx}`,
            type: compId,
            category: 'marketing',
            label: comp.name,
            content: '',
            props: {},
            children: [],
            styles: { padding: '24px' },
          });
        }
      });
      toast.success(`Applied "${template.name}" template (${template.components.length} components)`);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaignName.trim() || !projectId) return;
    try {
      await createCampaign.mutateAsync({ projectId, name: newCampaignName });
      setNewCampaignName('');
      setShowNewCampaign(false);
      toast.success('Campaign created!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !projectId) return;
    try {
      await createSocialPost.mutateAsync({ projectId, content: newPostContent, platform: newPostPlatform });
      setNewPostContent('');
      setShowNewPost(false);
      toast.success('Post scheduled!');
    } catch (err: any) {
      toast.error(err.message);
    }
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
            <h2 className="text-sm font-semibold">Marketing</h2>
            <p className="text-[10px] text-muted-foreground">{totalComponents} components • {MARKETING_TEMPLATES.length} templates</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5 p-3 border-b border-border shrink-0">
        {[
          { label: 'Campaigns', value: campaigns.length.toString(), icon: Mail },
          { label: 'Posts', value: socialPosts.length.toString(), icon: Share2 },
          { label: 'Sent', value: campaigns.filter(c => c.status === 'sent').length.toString(), icon: Send },
        ].map(s => (
          <div key={s.label} className="p-2 rounded-lg bg-muted/30 text-center">
            <s.icon className="w-3.5 h-3.5 mx-auto mb-1 text-primary" />
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[9px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border shrink-0">
        {[
          { id: 'components' as const, label: 'Elements', icon: Zap },
          { id: 'templates' as const, label: 'Templates', icon: Layers },
          { id: 'campaigns' as const, label: 'Campaigns', icon: Mail },
          { id: 'automations' as const, label: 'Auto', icon: Settings },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {/* ════════════════════════════════════════════════════ */}
        {/* COMPONENTS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'components' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={componentSearch}
                  onChange={e => setComponentSearch(e.target.value)}
                  placeholder="Search marketing elements..."
                  className="w-full bg-muted/30 border-0 rounded-lg pl-8 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {Object.entries(filteredComponents).map(([category, data]) => (
              <Section key={category} title={category} icon={data.icon} badge={data.items.length} defaultOpen={category === 'Banners & CTAs'}>
                <div className="space-y-1.5">
                  {data.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleAddComponent(item)}
                      className="w-full p-2.5 rounded-lg text-left transition-all hover:scale-[1.02] border border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-base shrink-0">
                          {item.preview}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium truncate group-hover:text-primary transition-colors">{item.name}</div>
                          <div className="text-[9px] text-muted-foreground truncate">{item.description}</div>
                        </div>
                        <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </Section>
            ))}

            {Object.keys(filteredComponents).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No components match your search</p>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* TEMPLATES TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'templates' && (
          <div className="divide-y divide-border/30">
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                  placeholder="Search marketing templates..."
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
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium group-hover:text-primary transition-colors">{template.name}</span>
                        <Badge variant="secondary" className="text-[8px]">{template.category}</Badge>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{template.description}</div>
                      <div className="text-[9px] text-muted-foreground/60 mt-0.5">{template.components.length} components</div>
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

        {/* ════════════════════════════════════════════════════ */}
        {/* CAMPAIGNS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'campaigns' && (
          <div className="divide-y divide-border/30">
            {/* Email Campaigns */}
            <Section title="Email Campaigns" icon={Mail} badge={campaigns.length} defaultOpen={true}>
              <div className="space-y-2">
                {!projectId ? (
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <Info className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">Save project first to manage campaigns</p>
                  </div>
                ) : showNewCampaign ? (
                  <div className="space-y-2">
                    <input
                      autoFocus
                      value={newCampaignName}
                      onChange={e => setNewCampaignName(e.target.value)}
                      placeholder="Campaign name..."
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                      onKeyDown={e => e.key === 'Enter' && handleCreateCampaign()}
                    />
                    <div className="flex gap-1.5">
                      <button onClick={handleCreateCampaign} disabled={createCampaign.isPending} className="flex-1 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground">
                        {createCampaign.isPending ? 'Creating...' : 'Create'}
                      </button>
                      <button onClick={() => setShowNewCampaign(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewCampaign(true)}
                    className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> New Campaign
                  </button>
                )}

                {campaignsLoading ? (
                  <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : campaigns.length === 0 ? (
                  <div className="text-center py-4 text-[10px] text-muted-foreground">No campaigns yet</div>
                ) : (
                  campaigns.map(camp => (
                    <div key={camp.id} className="p-2.5 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{camp.name}</span>
                        <Badge variant={camp.status === 'sent' ? 'default' : 'secondary'} className="text-[8px] capitalize">{camp.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" />{camp.recipients}</span>
                        {camp.open_rate != null && <span className="flex items-center gap-1"><Eye className="w-2.5 h-2.5" />{camp.open_rate}%</span>}
                        {camp.click_rate != null && <span className="flex items-center gap-1"><MousePointerClick className="w-2.5 h-2.5" />{camp.click_rate}%</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Section>

            {/* Social Posts */}
            <Section title="Social Posts" icon={Share2} badge={socialPosts.length} defaultOpen={true}>
              <div className="space-y-2">
                {!projectId ? (
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <Info className="w-5 h-5 mx-auto mb-1.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">Save project first to manage posts</p>
                  </div>
                ) : showNewPost ? (
                  <div className="space-y-2">
                    <select
                      value={newPostPlatform}
                      onChange={e => setNewPostPlatform(e.target.value)}
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="twitter">Twitter / X</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                    <textarea
                      autoFocus
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      placeholder="Write your post..."
                      className="w-full bg-muted/30 border-0 rounded-md px-3 py-2 text-xs resize-y min-h-[60px]"
                      rows={3}
                    />
                    <div className="flex gap-1.5">
                      <button onClick={handleCreatePost} disabled={createSocialPost.isPending} className="flex-1 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground">
                        {createSocialPost.isPending ? 'Scheduling...' : 'Schedule Post'}
                      </button>
                      <button onClick={() => setShowNewPost(false)} className="px-4 py-2 rounded-md text-xs hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewPost(true)}
                    className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Schedule Post
                  </button>
                )}

                {socialLoading ? (
                  <div className="py-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                ) : socialPosts.length === 0 ? (
                  <div className="text-center py-4 text-[10px] text-muted-foreground">No posts yet</div>
                ) : (
                  socialPosts.map(post => {
                    const PIcon = platformIcons[post.platform] || Globe;
                    return (
                      <div key={post.id} className="p-2.5 rounded-lg border border-border/50 hover:border-border transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <PIcon className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-medium capitalize">{post.platform}</span>
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="text-[8px] capitalize">{post.status}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{post.content}</p>
                        {post.scheduled_date && (
                          <div className="text-[9px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />{new Date(post.scheduled_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </Section>

            {/* Live Chat */}
            <Section title="Live Chat" icon={MessageSquare} defaultOpen={false}>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                <h3 className="text-xs font-semibold mb-1">Live Chat Widget</h3>
                <p className="text-[10px] text-muted-foreground mb-3">Add real-time chat to your website</p>
                <button className="px-4 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Enable Chat
                </button>
              </div>
            </Section>

            {/* Push Notifications */}
            <Section title="Push Notifications" icon={Bell} defaultOpen={false}>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
                <h3 className="text-xs font-semibold mb-1">Web Push Notifications</h3>
                <p className="text-[10px] text-muted-foreground mb-3">Send push notifications to subscribers</p>
                <button className="px-4 py-2 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Setup Push
                </button>
              </div>
            </Section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* AUTOMATIONS TAB */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === 'automations' && (
          <div className="p-3 space-y-3">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-[10px] text-muted-foreground">
                  Automations run in the background, sending emails or triggering actions based on user behavior.
                </div>
              </div>
            </div>

            <label className="text-[11px] font-medium block">Automation Templates</label>

            {AUTOMATION_TEMPLATES.map(auto => (
              <button
                key={auto.id}
                onClick={() => toast.success(`"${auto.name}" automation activated`)}
                className="w-full p-3 rounded-lg text-left border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                    {auto.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium group-hover:text-primary transition-colors">{auto.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{auto.description}</div>
                    <div className="text-[9px] text-muted-foreground/60 mt-0.5 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> Trigger: {auto.trigger}
                    </div>
                  </div>
                  <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary shrink-0" />
                </div>
              </button>
            ))}

            <button className="w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              <Plus className="w-3.5 h-3.5" /> Create Custom Automation
            </button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MarketingPanel;
