import { useState } from 'react';
import {
  Megaphone, Mail, MessageSquare, Share2, Bell, Users, Plus, X,
  Send, Calendar, BarChart3, Eye, Edit3, Trash2, Clock,
  Facebook, Instagram, Twitter, Linkedin, Globe, Zap, Loader2,
} from 'lucide-react';
import { useEmailCampaigns, useCreateEmailCampaign, useSocialPosts, useCreateSocialPost } from '@/hooks/useMarketing';
import { toast } from 'sonner';

const platformIcons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin };

interface MarketingPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const MarketingPanel = ({ projectId, onClose }: MarketingPanelProps) => {
  const [activeTab, setActiveTab] = useState<'email' | 'social' | 'chat' | 'automations'>('email');
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');

  const { data: campaigns = [], isLoading: campaignsLoading } = useEmailCampaigns(projectId ?? null);
  const { data: socialPosts = [], isLoading: socialLoading } = useSocialPosts(projectId ?? null);
  const createCampaign = useCreateEmailCampaign();
  const createSocialPost = useCreateSocialPost();

  const tabs = [
    { id: 'email' as const, label: 'Email', icon: Mail },
    { id: 'social' as const, label: 'Social', icon: Share2 },
    { id: 'chat' as const, label: 'Chat', icon: MessageSquare },
    { id: 'automations' as const, label: 'Auto', icon: Zap },
  ];

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

  if (!projectId) {
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-sm font-semibold">Marketing</h2>
          </div>
          {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
        <div className="p-6 text-center text-xs opacity-50">Save your project first to use marketing tools.</div>
      </div>
    );
  }

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
          { label: 'Campaigns', value: campaigns.length.toString(), color: 'hsl(var(--primary))' },
          { label: 'Social Posts', value: socialPosts.length.toString(), color: 'hsl(var(--success))' },
          { label: 'Sent', value: campaigns.filter(c => c.status === 'sent').length.toString(), color: 'hsl(var(--muted-foreground))' },
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
            {showNewCampaign ? (
              <div className="space-y-2">
                <input autoFocus value={newCampaignName} onChange={e => setNewCampaignName(e.target.value)} placeholder="Campaign name..." className="property-input text-xs" onKeyDown={e => e.key === 'Enter' && handleCreateCampaign()} />
                <div className="flex gap-1.5">
                  <button onClick={handleCreateCampaign} disabled={createCampaign.isPending} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    {createCampaign.isPending ? 'Creating...' : 'Create'}
                  </button>
                  <button onClick={() => setShowNewCampaign(false)} className="px-3 py-1.5 rounded text-[10px] hover:bg-muted">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewCampaign(true)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                <Plus className="w-3 h-3" /> New Campaign
              </button>
            )}
          </div>
          {campaignsLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : campaigns.length === 0 ? (
            <div className="p-6 text-center text-xs opacity-40">No campaigns yet</div>
          ) : (
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
                    {camp.open_rate && <><span>•</span><Eye className="w-2.5 h-2.5" />{camp.open_rate}% opened</>}
                  </div>
                  {camp.sent_date && <div className="text-[9px] opacity-30 mt-0.5">Sent {new Date(camp.sent_date).toLocaleDateString()}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Social */}
      {activeTab === 'social' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> Schedule Post
            </button>
          </div>
          {socialLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : socialPosts.length === 0 ? (
            <div className="p-6 text-center text-xs opacity-40">No social posts yet</div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
              {socialPosts.map(post => {
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
                    {post.scheduled_date && <div className="text-[9px] opacity-30 mt-1"><Clock className="w-2.5 h-2.5 inline mr-0.5" />{new Date(post.scheduled_date).toLocaleDateString()}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Chat */}
      {activeTab === 'chat' && (
        <div className="p-3 space-y-3">
          <div className="p-4 rounded-lg text-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <h3 className="text-xs font-semibold mb-1">Live Chat Widget</h3>
            <p className="text-[10px] opacity-50 mb-3">Add a live chat widget to your website</p>
            <button className="px-4 py-2 rounded text-xs font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>Enable Chat</button>
          </div>
        </div>
      )}

      {/* Automations */}
      {activeTab === 'automations' && (
        <div className="p-3 space-y-2">
          <div className="p-6 text-center text-xs opacity-40">No automations configured yet</div>
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Create Automation
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketingPanel;
