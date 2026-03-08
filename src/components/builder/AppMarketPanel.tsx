import { useState } from 'react';
import {
  Store, Search, X, Download, Check, Star, ExternalLink,
  Zap, BarChart3, MessageSquare, Mail, ShoppingBag, Calendar,
  Globe, Shield, Camera, Music, Video, MapPin,
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: typeof Zap;
  rating: number;
  installs: string;
  installed: boolean;
  free: boolean;
  price?: number;
}

const APPS: App[] = [
  { id: '1', name: 'Google Analytics', description: 'Track visitors, conversions and behavior', category: 'Analytics', icon: BarChart3, rating: 4.8, installs: '50K+', installed: true, free: true },
  { id: '2', name: 'Live Chat Pro', description: 'Real-time customer support chat widget', category: 'Communication', icon: MessageSquare, rating: 4.6, installs: '25K+', installed: false, free: false, price: 9.99 },
  { id: '3', name: 'Mailchimp', description: 'Email marketing automation', category: 'Marketing', icon: Mail, rating: 4.7, installs: '100K+', installed: true, free: true },
  { id: '4', name: 'Stripe Payments', description: 'Accept credit card payments', category: 'eCommerce', icon: ShoppingBag, rating: 4.9, installs: '200K+', installed: false, free: true },
  { id: '5', name: 'Calendly', description: 'Scheduling & appointment booking', category: 'Scheduling', icon: Calendar, rating: 4.5, installs: '30K+', installed: false, free: false, price: 7.99 },
  { id: '6', name: 'reCAPTCHA', description: 'Spam & bot protection', category: 'Security', icon: Shield, rating: 4.3, installs: '80K+', installed: true, free: true },
  { id: '7', name: 'Instagram Feed', description: 'Display your Instagram feed', category: 'Social', icon: Camera, rating: 4.4, installs: '40K+', installed: false, free: true },
  { id: '8', name: 'Spotify Player', description: 'Embed playlists and tracks', category: 'Media', icon: Music, rating: 4.2, installs: '15K+', installed: false, free: true },
  { id: '9', name: 'YouTube Gallery', description: 'Auto-sync and display videos', category: 'Media', icon: Video, rating: 4.6, installs: '35K+', installed: false, free: true },
  { id: '10', name: 'Google Maps', description: 'Interactive maps and locations', category: 'Utilities', icon: MapPin, rating: 4.7, installs: '90K+', installed: true, free: true },
  { id: '11', name: 'HotJar', description: 'Heatmaps and user recordings', category: 'Analytics', icon: Zap, rating: 4.5, installs: '20K+', installed: false, free: false, price: 14.99 },
  { id: '12', name: 'Intercom', description: 'Customer messaging platform', category: 'Communication', icon: MessageSquare, rating: 4.4, installs: '10K+', installed: false, free: false, price: 19.99 },
];

const CATEGORIES = ['All', 'Analytics', 'Marketing', 'eCommerce', 'Communication', 'Social', 'Media', 'Security', 'Scheduling', 'Utilities'];

interface AppMarketPanelProps {
  onClose?: () => void;
}

const AppMarketPanel = ({ onClose }: AppMarketPanelProps) => {
  const [apps, setApps] = useState(APPS);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeView, setActiveView] = useState<'browse' | 'installed'>('browse');

  const filtered = apps.filter(a => {
    if (activeView === 'installed' && !a.installed) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'All' && a.category !== filterCategory) return false;
    return true;
  });

  const toggleInstall = (id: string) => {
    setApps(apps.map(a => a.id === id ? { ...a, installed: !a.installed } : a));
  };

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">App Market</h2>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>{apps.length} apps</span>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Toggle browse/installed */}
      <div className="flex p-2 gap-1 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {(['browse', 'installed'] as const).map(view => (
          <button key={view} onClick={() => setActiveView(view)}
            className={`flex-1 py-1.5 rounded text-[10px] font-medium transition-colors ${
              activeView === view ? '' : 'opacity-50 hover:opacity-80'
            }`}
            style={activeView === view ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } : undefined}>
            {view === 'browse' ? `Browse (${apps.length})` : `Installed (${apps.filter(a => a.installed).length})`}
          </button>
        ))}
      </div>

      {/* Search & filter */}
      <div className="p-3 space-y-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search apps..." className="property-input pl-8 text-xs" />
        </div>
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-colors ${filterCategory === cat ? '' : 'opacity-50 hover:opacity-80'}`}
              style={filterCategory === cat ? { background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' } : { background: 'hsl(var(--muted) / 0.5)' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* App list */}
      <div className="space-y-1 p-2">
        {filtered.map(app => {
          const Icon = app.icon;
          return (
            <div key={app.id} className="p-3 rounded-lg transition-colors hover:bg-muted/30" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-xs font-semibold truncate">{app.name}</h3>
                    {app.installed && <Check className="w-3 h-3 shrink-0" style={{ color: 'hsl(var(--success))' }} />}
                  </div>
                  <p className="text-[10px] opacity-50 line-clamp-1">{app.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" style={{ color: 'hsl(var(--warning, 45 93% 47%))' }} />
                      <span className="text-[9px] font-medium">{app.rating}</span>
                    </div>
                    <span className="text-[9px] opacity-30">{app.installs}</span>
                    <span className="text-[9px] font-medium" style={{ color: app.free ? 'hsl(var(--success))' : 'hsl(var(--primary))' }}>
                      {app.free ? 'Free' : `$${app.price}/mo`}
                    </span>
                  </div>
                </div>
                <button onClick={() => toggleInstall(app.id)}
                  className="shrink-0 px-2.5 py-1 rounded text-[10px] font-medium transition-colors"
                  style={app.installed
                    ? { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
                    : { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                  }>
                  {app.installed ? 'Remove' : 'Install'}
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-6 text-center text-xs opacity-40">No apps found</div>
        )}
      </div>
    </div>
  );
};

export default AppMarketPanel;
