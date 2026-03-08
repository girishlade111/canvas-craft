import { useState, useMemo } from 'react';
import {
  X, Users, UserPlus, Shield, Lock, Mail, Eye, Search,
  ChevronRight, ChevronDown, Plus, Trash2, Edit3, Copy,
  Settings, Key, Globe, Smartphone, LogIn, LogOut, UserCheck,
  Crown, Star, Heart, Zap, Award, Target, Bell, MessageSquare,
  CreditCard, FileText, Image, Layout, Layers, Grid3X3,
  BookOpen, Bookmark, Tag, Hash, Clock, Calendar, MapPin,
  BarChart3, TrendingUp, PieChart, Activity, Filter, SortAsc,
  Check, Info, AlertCircle, ExternalLink, Download, Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent } from '@/types/builder';

interface MemberAreaPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

// ─── Member Components ─────────────────────────────────────

const MEMBER_COMPONENTS: Record<string, { id: string; name: string; icon: typeof Users; desc: string }[]> = {
  'Login & Signup': [
    { id: 'login-form', name: 'Login Form', icon: LogIn, desc: 'Email & password login' },
    { id: 'signup-form', name: 'Signup Form', icon: UserPlus, desc: 'Registration with fields' },
    { id: 'social-login', name: 'Social Login', icon: Globe, desc: 'Google, Facebook, Apple login' },
    { id: 'forgot-password', name: 'Forgot Password', icon: Key, desc: 'Password reset form' },
    { id: 'otp-login', name: 'OTP Login', icon: Smartphone, desc: 'Phone/email OTP verification' },
    { id: 'magic-link', name: 'Magic Link', icon: Zap, desc: 'Passwordless email login' },
  ],
  'Member Profile': [
    { id: 'profile-card', name: 'Profile Card', icon: UserCheck, desc: 'Member avatar & info' },
    { id: 'profile-editor', name: 'Profile Editor', icon: Edit3, desc: 'Edit profile fields' },
    { id: 'avatar-upload', name: 'Avatar Upload', icon: Image, desc: 'Profile photo uploader' },
    { id: 'member-menu', name: 'Member Menu', icon: Settings, desc: 'Account dropdown menu' },
    { id: 'member-badge', name: 'Member Badge', icon: Award, desc: 'Role/status badge' },
    { id: 'activity-feed', name: 'Activity Feed', icon: Activity, desc: 'Member activity log' },
  ],
  'Member Areas': [
    { id: 'member-dashboard', name: 'Members Dashboard', icon: Layout, desc: 'Private member area' },
    { id: 'members-list', name: 'Members Directory', icon: Users, desc: 'Public members list' },
    { id: 'member-content', name: 'Gated Content', icon: Lock, desc: 'Members-only section' },
    { id: 'member-sidebar', name: 'Member Sidebar', icon: Layers, desc: 'Navigation for members' },
    { id: 'subscription-plans', name: 'Subscription Plans', icon: CreditCard, desc: 'Pricing tiers' },
    { id: 'member-notifications', name: 'Notifications', icon: Bell, desc: 'Member notifications' },
  ],
  'Community': [
    { id: 'forum', name: 'Forum / Discussion', icon: MessageSquare, desc: 'Community discussion board' },
    { id: 'comments', name: 'Comments Section', icon: MessageSquare, desc: 'Post comments' },
    { id: 'likes-reactions', name: 'Likes & Reactions', icon: Heart, desc: 'Content reactions' },
    { id: 'followers', name: 'Follow System', icon: UserPlus, desc: 'Follow/unfollow members' },
    { id: 'leaderboard', name: 'Leaderboard', icon: TrendingUp, desc: 'Top members ranking' },
    { id: 'badges-system', name: 'Badges & Rewards', icon: Star, desc: 'Achievement badges' },
  ],
  'Access Control': [
    { id: 'role-gate', name: 'Role Gate', icon: Shield, desc: 'Show content by role' },
    { id: 'paywall', name: 'Paywall', icon: Crown, desc: 'Premium content wall' },
    { id: 'age-gate', name: 'Age Verification', icon: AlertCircle, desc: 'Age check dialog' },
    { id: 'invite-only', name: 'Invite Only', icon: Mail, desc: 'Invitation-based access' },
    { id: 'trial-access', name: 'Free Trial', icon: Clock, desc: 'Time-limited access' },
    { id: 'geo-gate', name: 'Geo Restriction', icon: MapPin, desc: 'Location-based access' },
  ],
};

// ─── Member Page Templates ─────────────────────────────────

const MEMBER_TEMPLATES = [
  { id: 'member-login-page', name: 'Login Page', desc: 'Full login page with social options', icon: LogIn, color: '210 100% 50%' },
  { id: 'member-signup-page', name: 'Registration Page', desc: 'Multi-step signup flow', icon: UserPlus, color: '142 70% 45%' },
  { id: 'member-profile-page', name: 'Profile Page', desc: 'Member profile with activity', icon: UserCheck, color: '280 70% 55%' },
  { id: 'member-dashboard-page', name: 'Member Dashboard', desc: 'Private area with stats', icon: Layout, color: '45 93% 47%' },
  { id: 'pricing-page', name: 'Pricing Page', desc: '3-tier subscription plans', icon: CreditCard, color: '320 70% 55%' },
  { id: 'community-page', name: 'Community Hub', desc: 'Forum, feed & leaderboard', icon: Users, color: '190 80% 45%' },
];

// ─── Roles ─────────────────────────────────────────────────

interface MemberRole {
  id: string;
  name: string;
  color: string;
  permissions: string[];
}

const DEFAULT_ROLES: MemberRole[] = [
  { id: 'admin', name: 'Admin', color: '0 84% 60%', permissions: ['all'] },
  { id: 'editor', name: 'Editor', color: '210 100% 50%', permissions: ['edit_content', 'publish'] },
  { id: 'member', name: 'Member', color: '142 70% 45%', permissions: ['view_content', 'comment'] },
  { id: 'subscriber', name: 'Subscriber', color: '280 70% 55%', permissions: ['view_content'] },
  { id: 'guest', name: 'Guest', color: '220 10% 50%', permissions: ['view_public'] },
];

const MemberAreaPanel = ({ projectId, onClose }: MemberAreaPanelProps) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'templates' | 'roles' | 'settings'>('elements');
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>('Login & Signup');
  const [roles, setRoles] = useState<MemberRole[]>(DEFAULT_ROLES);
  const [newRoleName, setNewRoleName] = useState('');
  const { addComponent, schema } = useBuilderStore();

  const handleAddComponent = (comp: typeof MEMBER_COMPONENTS['Login & Signup'][0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body') || schema.sections[0];
    if (!bodySection) return;
    const newComp: BuilderComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: comp.id,
      category: 'Advanced',
      label: comp.name,
      content: comp.name,
      styles: { padding: '20px', width: '100%', minHeight: '60px', borderRadius: '8px', border: '1px dashed hsl(var(--border))' },
    };
    addComponent(bodySection.id, newComp);
    toast.success(`Added ${comp.name}`);
  };

  const handleApplyTemplate = (tpl: typeof MEMBER_TEMPLATES[0]) => {
    const bodySection = schema.sections.find(s => s.type === 'body') || schema.sections[0];
    if (!bodySection) return;
    const newComp: BuilderComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: 'section',
      category: 'Layout',
      label: tpl.name,
      content: tpl.name,
      isContainer: true,
      children: [],
      styles: { padding: '60px 20px', width: '100%', minHeight: '400px', background: 'hsl(var(--card))', borderRadius: '12px' },
    };
    addComponent(bodySection.id, newComp);
    toast.success(`Applied "${tpl.name}" template`);
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    const newRole: MemberRole = {
      id: newRoleName.toLowerCase().replace(/\s+/g, '-'),
      name: newRoleName,
      color: `${Math.floor(Math.random() * 360)} 70% 50%`,
      permissions: ['view_content'],
    };
    setRoles(prev => [...prev, newRole]);
    setNewRoleName('');
    toast.success(`Role "${newRoleName}" created`);
  };

  const filteredComponents = useMemo(() => {
    if (!search) return MEMBER_COMPONENTS;
    const q = search.toLowerCase();
    const filtered: Record<string, typeof MEMBER_COMPONENTS['Login & Signup']> = {};
    for (const [cat, items] of Object.entries(MEMBER_COMPONENTS)) {
      const matched = items.filter(i => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
      if (matched.length > 0) filtered[cat] = matched;
    }
    return filtered;
  }, [search]);

  const tabs = [
    { id: 'elements' as const, label: 'Elements' },
    { id: 'templates' as const, label: 'Pages' },
    { id: 'roles' as const, label: 'Roles' },
    { id: 'settings' as const, label: 'Settings' },
  ];

  return (
    <div className="builder-flyout-panel" style={{ width: 320 }}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Members</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-accent/10">
            <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 text-xs font-medium transition-colors"
            style={{
              color: activeTab === tab.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
              borderBottom: activeTab === tab.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Elements Tab */}
        {activeTab === 'elements' && (
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search member components..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border"
                style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              />
            </div>
            {Object.entries(filteredComponents).map(([category, items]) => (
              <Collapsible key={category} open={openCategory === category} onOpenChange={open => setOpenCategory(open ? category : null)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-1.5 text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                  <span>{category}</span>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5">{items.length}</Badge>
                    <ChevronRight className={`w-3 h-3 transition-transform ${openCategory === category ? 'rotate-90' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {items.map(comp => (
                    <button
                      key={comp.id}
                      onClick={() => handleAddComponent(comp)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left hover:bg-accent/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                        <comp.icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>{comp.name}</div>
                        <div className="text-[10px] truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{comp.desc}</div>
                      </div>
                      <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--primary))' }} />
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="p-3 space-y-2">
            <p className="text-[11px] mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Pre-built member page layouts
            </p>
            {MEMBER_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => handleApplyTemplate(tpl)}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-accent/10 transition-colors border"
                style={{ borderColor: 'hsl(var(--border))' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `hsl(${tpl.color} / 0.15)` }}>
                  <tpl.icon className="w-5 h-5" style={{ color: `hsl(${tpl.color})` }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{tpl.name}</div>
                  <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{tpl.desc}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              </button>
            ))}
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="p-3 space-y-3">
            <p className="text-[11px] mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Manage member roles & permissions
            </p>
            {roles.map(role => (
              <div key={role.id} className="flex items-center gap-2 p-2.5 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: `hsl(${role.color})` }} />
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{role.name}</div>
                  <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-accent/10">
                  <Edit3 className="w-3 h-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
                </button>
                {!['admin', 'member', 'guest'].includes(role.id) && (
                  <button onClick={() => setRoles(prev => prev.filter(r => r.id !== role.id))} className="p-1 rounded hover:bg-destructive/10">
                    <Trash2 className="w-3 h-3" style={{ color: 'hsl(var(--destructive))' }} />
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <input
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
                placeholder="New role name..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border"
                style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                onKeyDown={e => e.key === 'Enter' && handleAddRole()}
              />
              <button onClick={handleAddRole} className="px-3 py-1.5 text-xs rounded-lg font-medium" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Add
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-3 space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Authentication</h4>
              {[
                { label: 'Email/Password Login', desc: 'Traditional credentials', enabled: true },
                { label: 'Social Login (Google)', desc: 'Sign in with Google', enabled: false },
                { label: 'Social Login (GitHub)', desc: 'Sign in with GitHub', enabled: false },
                { label: 'Magic Link', desc: 'Passwordless email login', enabled: false },
                { label: 'Phone OTP', desc: 'SMS verification', enabled: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.desc}</div>
                  </div>
                  <div className={`w-8 h-4 rounded-full cursor-pointer transition-colors ${item.enabled ? '' : 'opacity-50'}`}
                    style={{ background: item.enabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}>
                    <div className={`w-3.5 h-3.5 rounded-full mt-[1px] transition-transform ${item.enabled ? 'translate-x-[17px]' : 'translate-x-[1px]'}`}
                      style={{ background: 'hsl(var(--background))' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Member Settings</h4>
              {[
                { label: 'Email Verification', desc: 'Require email confirmation' },
                { label: 'Profile Customization', desc: 'Allow members to edit profiles' },
                { label: 'Public Profiles', desc: 'Make member profiles visible' },
                { label: 'Member Directory', desc: 'Show member listing page' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.desc}</div>
                  </div>
                  <Check className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MemberAreaPanel;
