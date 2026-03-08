import { useState } from 'react';
import {
  Megaphone, Mail, MessageSquare, Share2, Bell, Users, Plus, X,
  Send, Calendar, BarChart3, Eye, Edit3, Trash2, Clock,
  Facebook, Instagram, Twitter, Linkedin, Globe, Zap,
} from 'lucide-react';

interface EmailCampaign {
  id: string;
  name: string;
  status: 'draft' | 'sent' | 'scheduled';
  recipients: number;
  openRate?: number;
  clickRate?: number;
  sentDate?: string;
  scheduledDate?: string;
}

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  scheduledDate: string;
  status: 'scheduled' | 'published' | 'draft';
}

const MOCK_CAMPAIGNS: EmailCampaign[] = [
  { id: '1', name: 'Welcome Series', status: 'sent', recipients: 1250, openRate: 42.5, clickRate: 8.3, sentDate: '2026-03-01' },
  { id: '2', name: 'Spring Sale Announcement', status: 'scheduled', recipients: 3400, scheduledDate: '2026-03-15' },
  { id: '3', name: 'Product Launch', status: 'draft', recipients: 0 },
  { id: '4', name: 'Monthly Newsletter - March', status: 'sent', recipients: 2800, openRate: 38.1, clickRate: 5.7, sentDate: '2026-03-05' },
];

const MOCK_SOCIAL: SocialPost[] = [
  { id: '1', platform: 'instagram', content: '🚀 Exciting new features coming soon! Stay tuned...', scheduledDate: '2026-03-10', status: 'scheduled' },
  { id: '2', platform: 'twitter', content: 'We just hit 10k users! Thank you for the support 🎉', scheduledDate: '2026-03-08', status: 'published' },
  { id: '3', platform: 'facebook', content: 'Check out our latest blog post on web design trends', scheduledDate: '2026-03-12', status: 'scheduled' },
];

const platformIcons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };

interface MarketingPanelProps {
  onClose?: () => void;
}

const MarketingPanel = ({ onClose }: MarketingPanelProps) => {
  const [activeTab, setActiveTab] = useState<'email' | 'social' | 'chat' | 'automations'>('email');
  const [campaigns] = useState(MOCK_CAMPAIGNS);

  const tabs = [
    { id: 'email' as const, label: 'Email', icon: Mail },
    { id: 'social' as const, label: 'Social', icon: Share2 },
    { id: 'chat' as const, label: 'Chat', icon: MessageSquare },
    { id: 'automations' as const, label: 'Auto', icon: Zap },
  ];

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Marketing</h2>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1 p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { label: 'Subscribers', value: '3,420', color: 'hsl(var(--primary))' },
          { label: 'Avg Open', value: '40.3%', color: 'hsl(var(--success))' },
          { label: 'Campaigns', value: campaigns.length.toString(), color: 'hsl(var(--muted-foreground))' },
        ].map(s => (
          <div key={s.label} className="p-2 rounded text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />{label}
          </button>
        ))}
      </div>

      {/* Email */}
      {activeTab === 'email' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
              <Plus className="w-3 h-3" /> New Campaign
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
            {campaigns.map(camp => (
              <div key={camp.id} className="p-3 hover:bg-muted/30 transition-colors group">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-medium">{camp.name}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{
                    background: camp.status === 'sent' ? 'hsl(var(--success) / 0.1)' : camp.status === 'scheduled' ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--muted) / 0.5)',
                    color: camp.status === 'sent' ? 'hsl(var(--success))' : camp.status === 'scheduled' ? 'hsl(var(--primary))' : 'inherit',
                  }}>{camp.status}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] opacity-50">
                  <Users className="w-2.5 h-2.5" />{camp.recipients} recipients
                  {camp.openRate && <><span>•</span><Eye className="w-2.5 h-2.5" />{camp.openRate}% opened</>}
                  {camp.clickRate && <><span>•</span>{camp.clickRate}% clicked</>}
                </div>
                {camp.sentDate && <div className="text-[9px] opacity-30 mt-0.5">Sent {camp.sentDate}</div>}
                {camp.scheduledDate && <div className="text-[9px] mt-0.5" style={{ color: 'hsl(var(--primary))' }}>📅 Scheduled {camp.scheduledDate}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social */}
      {activeTab === 'social' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="flex gap-2 mb-2">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map(p => {
                const Icon = platformIcons[p] || Globe;
                return (
                  <button key={p} className="flex-1 p-2 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                    <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  </button>
                );
              })}
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> Schedule Post
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
            {MOCK_SOCIAL.map(post => {
              const Icon = platformIcons[post.platform] || Globe;
              return (
                <div key={post.id} className="p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3 h-3" style={{ color: 'hsl(var(--primary))' }} />
                    <span className="text-[10px] font-medium capitalize">{post.platform}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{
                      background: post.status === 'published' ? 'hsl(var(--success) / 0.1)' : 'hsl(var(--primary) / 0.1)',
                      color: post.status === 'published' ? 'hsl(var(--success))' : 'hsl(var(--primary))',
                    }}>{post.status}</span>
                  </div>
                  <p className="text-[10px] opacity-70 line-clamp-2">{post.content}</p>
                  <div className="text-[9px] opacity-30 mt-1"><Clock className="w-2.5 h-2.5 inline mr-0.5" />{post.scheduledDate}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat */}
      {activeTab === 'chat' && (
        <div className="p-3 space-y-3">
          <div className="p-4 rounded-lg text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <h3 className="text-xs font-semibold mb-1">Live Chat Widget</h3>
            <p className="text-[10px] opacity-50 mb-3">Add a live chat widget to your website for real-time customer support</p>
            <button className="px-4 py-2 rounded text-xs font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>Enable Chat</button>
          </div>
          <div className="space-y-2">
            {['WhatsApp Button', 'Contact Form', 'Chat Bot'].map(item => (
              <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <MessageSquare className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-xs font-medium flex-1">{item}</span>
                <span className="text-[10px] opacity-30">Add →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Automations */}
      {activeTab === 'automations' && (
        <div className="p-3 space-y-2">
          {[
            { name: 'Welcome Email', trigger: 'New signup', status: 'active', sent: 450 },
            { name: 'Abandoned Cart', trigger: 'Cart left 1hr', status: 'active', sent: 89 },
            { name: 'Post-Purchase Follow-up', trigger: '3 days after order', status: 'paused', sent: 210 },
            { name: 'Re-engagement', trigger: 'Inactive 30 days', status: 'draft', sent: 0 },
          ].map(auto => (
            <div key={auto.name} className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold">{auto.name}</h3>
                <span className={`text-[10px] ${auto.status === 'active' ? '' : 'opacity-40'}`} style={auto.status === 'active' ? { color: 'hsl(var(--success))' } : undefined}>
                  {auto.status === 'active' ? '● Active' : auto.status === 'paused' ? '⏸ Paused' : '○ Draft'}
                </span>
              </div>
              <div className="text-[10px] opacity-50">
                <Zap className="w-2.5 h-2.5 inline mr-0.5" />{auto.trigger}
                {auto.sent > 0 && <span className="ml-2">• {auto.sent} sent</span>}
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Create Automation
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketingPanel;
