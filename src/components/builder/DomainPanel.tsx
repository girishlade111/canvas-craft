import { useState } from 'react';
import {
  X, Globe, Shield, Server, Zap, Link, ExternalLink,
  Check, AlertCircle, Clock, Search, Settings, Copy,
  ChevronRight, Lock, Unlock, RefreshCw, Download,
  Activity, BarChart3, Eye, Smartphone, Monitor,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface DomainPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const DomainPanel = ({ projectId, onClose }: DomainPanelProps) => {
  const [activeTab, setActiveTab] = useState<'domain' | 'hosting' | 'performance'>('domain');
  const [customDomain, setCustomDomain] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleConnectDomain = () => {
    if (!customDomain.trim()) {
      toast.error('Enter a domain name');
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      toast.success(`Domain "${customDomain}" added! Configure DNS to complete setup.`);
    }, 1500);
  };

  const tabs = [
    { id: 'domain' as const, label: 'Domain' },
    { id: 'hosting' as const, label: 'Hosting' },
    { id: 'performance' as const, label: 'Speed' },
  ];

  return (
    <div className="builder-flyout-panel" style={{ width: 320 }}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Domain & Hosting</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-accent/10">
            <X className="w-4 h-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        )}
      </div>

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
        {/* Domain Tab */}
        {activeTab === 'domain' && (
          <div className="p-3 space-y-4">
            {/* Current domain */}
            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Current Domain</h4>
              <div className="p-3 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(142 70% 45%)' }} />
                  <span className="text-xs font-mono" style={{ color: 'hsl(var(--foreground))' }}>
                    {projectId ? `${projectId}.devbuilder.app` : 'local.devbuilder.app'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Lock className="w-3 h-3" style={{ color: 'hsl(142 70% 45%)' }} />
                  <span className="text-[10px]" style={{ color: 'hsl(142 70% 45%)' }}>SSL Active</span>
                </div>
              </div>
            </div>

            {/* Connect custom domain */}
            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Connect Custom Domain</h4>
              <div className="flex gap-2 mb-2">
                <input
                  value={customDomain}
                  onChange={e => setCustomDomain(e.target.value)}
                  placeholder="example.com"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                />
                <button
                  onClick={handleConnectDomain}
                  disabled={connecting}
                  className="px-3 py-2 text-xs rounded-lg font-medium"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  {connecting ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Connect'}
                </button>
              </div>
              <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Point your domain's DNS to our servers. We'll automatically provision an SSL certificate.
              </p>
            </div>

            {/* DNS Instructions */}
            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>DNS Configuration</h4>
              <div className="space-y-2">
                {[
                  { type: 'A', name: '@', value: '76.76.21.21', desc: 'Root domain' },
                  { type: 'CNAME', name: 'www', value: 'cname.devbuilder.app', desc: 'www subdomain' },
                ].map(record => (
                  <div key={record.type + record.name} className="p-2 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-[9px] font-mono">{record.type}</Badge>
                        <span className="text-xs font-mono" style={{ color: 'hsl(var(--foreground))' }}>{record.name}</span>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(record.value); toast.success('Copied!'); }} className="p-1 rounded hover:bg-accent/10">
                        <Copy className="w-3 h-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
                      </button>
                    </div>
                    <div className="text-[10px] font-mono mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{record.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redirects */}
            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Redirects</h4>
              {[
                { from: 'www → non-www', enabled: true },
                { from: 'HTTP → HTTPS', enabled: true },
                { from: 'Trailing slash removal', enabled: false },
              ].map(item => (
                <div key={item.from} className="flex items-center justify-between p-2 mb-1 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <span className="text-xs" style={{ color: 'hsl(var(--foreground))' }}>{item.from}</span>
                  <div className={`w-8 h-4 rounded-full cursor-pointer`} style={{ background: item.enabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}>
                    <div className={`w-3.5 h-3.5 rounded-full mt-[1px] transition-transform ${item.enabled ? 'translate-x-[17px]' : 'translate-x-[1px]'}`}
                      style={{ background: 'hsl(var(--background))' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hosting Tab */}
        {activeTab === 'hosting' && (
          <div className="p-3 space-y-4">
            <div className="p-3 rounded-lg border" style={{ borderColor: 'hsl(var(--primary) / 0.3)', background: 'hsl(var(--primary) / 0.05)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Hosting Status</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Status', value: 'Active', color: '142 70% 45%' },
                  { label: 'Region', value: 'US East (Virginia)', color: '' },
                  { label: 'CDN', value: 'Global Edge Network', color: '' },
                  { label: 'SSL', value: 'Auto-renewed', color: '142 70% 45%' },
                  { label: 'Bandwidth', value: '100 GB/month', color: '' },
                  { label: 'Storage', value: '10 GB', color: '' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.label}</span>
                    <span className="text-[10px] font-medium" style={{ color: item.color ? `hsl(${item.color})` : 'hsl(var(--foreground))' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Environment</h4>
              {['Production', 'Staging', 'Development'].map(env => (
                <div key={env} className="flex items-center gap-2 p-2 mb-1 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: env === 'Production' ? 'hsl(142 70% 45%)' : 'hsl(var(--muted-foreground))' }} />
                  <span className="text-xs flex-1" style={{ color: 'hsl(var(--foreground))' }}>{env}</span>
                  {env === 'Production' && <Badge variant="secondary" className="text-[9px]">Live</Badge>}
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Deploy Settings</h4>
              {[
                { label: 'Auto Deploy', desc: 'Deploy on every save' },
                { label: 'Build Optimization', desc: 'Minify CSS, JS, HTML' },
                { label: 'Image Optimization', desc: 'Auto WebP conversion' },
                { label: 'Prerendering', desc: 'Static page generation' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 mb-1 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div>
                    <div className="text-xs" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.desc}</div>
                  </div>
                  <Check className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="p-3 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Performance', score: 96, color: '142 70% 45%' },
                { label: 'Accessibility', score: 92, color: '210 100% 50%' },
                { label: 'Best Practices', score: 100, color: '142 70% 45%' },
                { label: 'SEO', score: 98, color: '142 70% 45%' },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-lg border text-center" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="text-2xl font-bold mb-0.5" style={{ color: `hsl(${item.color})` }}>{item.score}</div>
                  <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Core Web Vitals</h4>
              {[
                { label: 'LCP (Largest Contentful Paint)', value: '1.2s', status: 'good' },
                { label: 'FID (First Input Delay)', value: '12ms', status: 'good' },
                { label: 'CLS (Cumulative Layout Shift)', value: '0.05', status: 'good' },
                { label: 'FCP (First Contentful Paint)', value: '0.8s', status: 'good' },
                { label: 'TTFB (Time to First Byte)', value: '120ms', status: 'good' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 mb-1 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="flex-1">
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.label}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-medium" style={{ color: 'hsl(142 70% 45%)' }}>{item.value}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(142 70% 45%)' }} />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Optimizations</h4>
              {[
                { label: 'Lazy Load Images', enabled: true },
                { label: 'Code Splitting', enabled: true },
                { label: 'Browser Caching', enabled: true },
                { label: 'Gzip Compression', enabled: true },
                { label: 'Critical CSS', enabled: false },
                { label: 'Prefetch Links', enabled: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 mb-1 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                  <span className="text-xs" style={{ color: 'hsl(var(--foreground))' }}>{item.label}</span>
                  <div className={`w-8 h-4 rounded-full cursor-pointer`} style={{ background: item.enabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}>
                    <div className={`w-3.5 h-3.5 rounded-full mt-[1px] transition-transform ${item.enabled ? 'translate-x-[17px]' : 'translate-x-[1px]'}`}
                      style={{ background: 'hsl(var(--background))' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DomainPanel;
