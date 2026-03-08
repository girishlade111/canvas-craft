import { useState } from 'react';
import {
  ArrowLeft, Rocket, Loader2, Check, ExternalLink, BarChart3,
  Globe, Clock, FileArchive, Shield, Key, Eye, EyeOff,
  Activity, Users, MonitorSmartphone, TrendingUp, Zap, Code,
  RefreshCw, Settings, Copy, AlertCircle, Cpu, Database,
} from 'lucide-react';
import { RailwayIcon } from './BrandIcons';
import { useAppConfig } from '@/hooks/useAppConfig';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage } from '@/hooks/usePages';
import { useCreateDeployment, useUpdateDeployment, useDeployments } from '@/hooks/useDeployments';
import { generateRailwayFiles, deployToRailway, type RailwayDeployStatus } from '@/engine/deploy/railwayDeploy';
import { downloadZip } from '@/engine/codegen/zipExporter';
import { useUpdateProjectSettings, useProjectSettings } from '@/hooks/useProjectSettings';
import type { PageSchema } from '@/types/builder';
import { toast } from 'sonner';

interface RailwayPanelProps {
  projectId?: string | null;
  onClose?: () => void;
  onBack?: () => void;
}

type PanelView = 'main' | 'deploy' | 'analytics' | 'settings';

const RAILWAY_ANALYTICS_SCRIPT = `<!-- Railway Monitoring & Analytics -->
<script>
  window.__RAILWAY_ANALYTICS = true;
  (function() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://cdn.railway.app/analytics.js';
    s.setAttribute('data-project', 'YOUR_PROJECT_ID');
    document.head.appendChild(s);
  })();
</script>
<!-- Railway Performance Monitoring -->
<script>
  if ('PerformanceObserver' in window) {
    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('[Railway] LCP:', entry.startTime);
        }
      });
    }).observe({type: 'largest-contentful-paint', buffered: true});

    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        if (!entry.hadRecentInput) {
          console.log('[Railway] CLS:', entry.value);
        }
      });
    }).observe({type: 'layout-shift', buffered: true});
  }
</script>`;

const RAILWAY_ANALYTICS_CODE = `// Railway observability setup
// Railway provides built-in metrics via the dashboard:
// 1. Go to railway.app → Your Project → Observability
// 2. View CPU, Memory, Network, and Request metrics
// 3. Set up alerts for anomalies
//
// For custom client-side tracking, add Web Vitals:
// npm install web-vitals
import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals';

function sendToRailwayAnalytics(metric) {
  console.log('[Railway Analytics]', metric.name, metric.value);
  // Send to your Railway backend endpoint
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' },
  });
}

onCLS(sendToRailwayAnalytics);
onFID(sendToRailwayAnalytics);
onLCP(sendToRailwayAnalytics);
onTTFB(sendToRailwayAnalytics);`;

const RailwayPanel = ({ projectId, onClose, onBack }: RailwayPanelProps) => {
  const [view, setView] = useState<PanelView>('main');
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState('');
  const [railwayProjectId, setRailwayProjectId] = useState('');
  const [deployStatus, setDeployStatus] = useState<RailwayDeployStatus>('idle');
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { saveConfig, getConfig } = useAppConfig(projectId ?? null);
  const existingConfig = getConfig('railway');
  const schema = useBuilderStore((s) => s.schema);
  const { data: pages } = usePages(projectId ?? null);
  const savePage = useSavePage();
  const createDeployment = useCreateDeployment();
  const updateDeployment = useUpdateDeployment();
  const { data: deployments } = useDeployments(projectId ?? null);
  const { data: projectSettings } = useProjectSettings(projectId ?? null);
  const updateSettings = useUpdateProjectSettings();

  useState(() => {
    if (existingConfig?.values?.railway_token) setToken(existingConfig.values.railway_token);
    if (existingConfig?.values?.railway_project_id) setRailwayProjectId(existingConfig.values.railway_project_id);
    if (projectSettings?.analytics_scripts?.includes('railway')) setAnalyticsEnabled(true);
  });

  const isConnected = !!existingConfig?.isConnected && !!token;

  const handleSaveToken = () => {
    if (!token.trim()) {
      toast.error('Please enter your Railway API Token.');
      return;
    }
    saveConfig('railway', { railway_token: token, railway_project_id: railwayProjectId });
    toast.success('Railway connected successfully!');
  };

  const handleDeploy = async () => {
    if (!token) {
      toast.error('Connect your Railway account first.');
      setView('settings');
      return;
    }

    try {
      setDeployStatus('generating');

      if (pages?.length) {
        const currentPage = pages.find((p) => (p.schema as unknown as PageSchema)?.id === schema.id);
        if (currentPage) await savePage.mutateAsync({ pageId: currentPage.id, schema });
      }

      const result = await deployToRailway(
        schema,
        {
          projectName: schema.name?.toLowerCase().replace(/\s+/g, '-') || 'my-website',
          token,
          projectId: railwayProjectId || undefined,
        },
        setDeployStatus
      );

      if (result.success && result.url) {
        setDeployUrl(result.url);
        setDeployStatus('deployed');

        if (projectId) {
          const versionNumber = (deployments?.length ?? 0) + 1;
          const deployment = await createDeployment.mutateAsync({ projectId, versionNumber });
          await updateDeployment.mutateAsync({
            deploymentId: deployment.id,
            updates: {
              status: 'completed',
              deployment_url: result.url,
              build_log: `Deployed to Railway: ${result.url} (${result.deployId})`,
            },
          });
        }

        toast.success('🚀 Deployed to Railway successfully!');
      } else {
        setDeployStatus('error');
        toast.error(result.error || 'Deployment failed');
      }
    } catch (err: any) {
      setDeployStatus('error');
      toast.error('Deploy failed: ' + err.message);
    }
  };

  const handleDownloadZip = async () => {
    try {
      const files = generateRailwayFiles(schema);
      await downloadZip(files, schema.name || 'my-website');
      toast.success('ZIP downloaded — push to GitHub and connect on Railway');
    } catch (err: any) {
      toast.error('Download failed: ' + err.message);
    }
  };

  const handleEnableAnalytics = async () => {
    if (!projectId) {
      toast.info('Save your project first to enable analytics.');
      return;
    }

    const currentScripts = projectSettings?.analytics_scripts || '';
    const hasRailway = currentScripts.includes('RAILWAY_ANALYTICS');

    if (hasRailway) {
      const updated = currentScripts.replace(RAILWAY_ANALYTICS_SCRIPT, '').trim();
      await updateSettings.mutateAsync({ projectId, updates: { analytics_scripts: updated || null } });
      setAnalyticsEnabled(false);
      toast.info('Railway Analytics removed from your site.');
    } else {
      const updated = currentScripts ? `${currentScripts}\n\n${RAILWAY_ANALYTICS_SCRIPT}` : RAILWAY_ANALYTICS_SCRIPT;
      await updateSettings.mutateAsync({ projectId, updates: { analytics_scripts: updated } });
      setAnalyticsEnabled(true);
      toast.success('Railway Analytics enabled! Deploy to activate monitoring.');
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const RAILWAY_COLOR = '130 80% 50%';

  const Header = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
      <button onClick={() => view === 'main' ? (onBack || onClose)?.() : setView('main')}
        className="p-1 rounded hover:bg-muted transition-colors">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
        <RailwayIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-semibold truncate">{title}</h3>
        <p className="text-[10px] opacity-50">railway.app</p>
      </div>
      {isConnected && (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{ background: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }}>
          <Check className="w-3 h-3" /> Live
        </span>
      )}
    </div>
  );

  /* ── Settings View ── */
  if (view === 'settings') {
    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <Header title="Railway Settings" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5" style={{ color: `hsl(${RAILWAY_COLOR})` }} />
              Connection Setup
            </h4>
            {[
              { step: 1, title: 'Go to Railway Dashboard', desc: 'Visit railway.app → Account Settings → Tokens' },
              { step: 2, title: 'Create API Token', desc: 'Click "Create Token" → name it → copy the token' },
              { step: 3, title: 'Paste Token Below', desc: 'Enter your token to enable direct deployments' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                  style={{ background: `hsl(${RAILWAY_COLOR} / 0.15)`, color: `hsl(${RAILWAY_COLOR})` }}>{step}</div>
                <div>
                  <p className="text-[11px] font-medium">{title}</p>
                  <p className="text-[10px] opacity-50">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="flex items-center gap-1 text-[10px] font-medium mb-1 opacity-70">
              <Key className="w-3 h-3" /> API Token
              <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
              <span className="ml-auto flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded"
                style={{ background: 'hsl(var(--warning, 45 93% 47%) / 0.1)', color: 'hsl(var(--warning, 45 93% 47%))' }}>
                <Shield className="w-2.5 h-2.5" /> Secret
              </span>
            </label>
            <div className="relative">
              <input type={showToken ? 'text' : 'password'} value={token}
                onChange={e => setToken(e.target.value)} placeholder="Enter your Railway API token"
                className="property-input text-xs pr-8 font-mono" style={{ fontSize: '10px' }} />
              <button onClick={() => setShowToken(!showToken)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors">
                {showToken ? <EyeOff className="w-3 h-3 opacity-40" /> : <Eye className="w-3 h-3 opacity-40" />}
              </button>
            </div>
            <p className="text-[8px] mt-0.5 font-mono opacity-30">→ [SERVER] RAILWAY_TOKEN</p>
          </div>

          <div>
            <label className="flex items-center gap-1 text-[10px] font-medium mb-1 opacity-70">
              <Globe className="w-3 h-3" /> Project ID <span className="opacity-40">(optional — auto-created if empty)</span>
            </label>
            <input type="text" value={railwayProjectId} onChange={e => setRailwayProjectId(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="property-input text-xs font-mono" style={{ fontSize: '10px' }} />
            <p className="text-[8px] mt-0.5 font-mono opacity-30">→ RAILWAY_PROJECT_ID</p>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: `hsl(${RAILWAY_COLOR} / 0.05)`, border: `1px solid hsl(${RAILWAY_COLOR} / 0.1)` }}>
            <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: `hsl(${RAILWAY_COLOR})` }} />
            <p className="text-[9px] leading-relaxed opacity-50">
              Your token is stored locally and used only for deployment. It's never sent to third parties.
            </p>
          </div>

          <button onClick={handleSaveToken}
            className="w-full py-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
            style={{ background: `hsl(${RAILWAY_COLOR})`, color: '#fff' }}>
            <Zap className="w-3.5 h-3.5" /> {isConnected ? 'Update Connection' : 'Connect to Railway'}
          </button>
        </div>
      </div>
    );
  }

  /* ── Deploy View ── */
  if (view === 'deploy') {
    const statusSteps = [
      { key: 'generating', label: 'Generating code' },
      { key: 'uploading', label: 'Uploading to Railway' },
      { key: 'building', label: 'Building & deploying' },
      { key: 'deployed', label: 'Deployed!' },
    ];
    const statusOrder = ['generating', 'uploading', 'building', 'deployed'];
    const currentIdx = statusOrder.indexOf(deployStatus);

    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <Header title="Deploy to Railway" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {!isConnected ? (
            <div className="p-4 text-center rounded-lg" style={{ background: 'hsl(var(--muted) / 0.2)' }}>
              <Key className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-[11px] font-medium opacity-60">Connect your Railway account first</p>
              <button onClick={() => setView('settings')}
                className="mt-2 px-4 py-1.5 rounded-lg text-[10px] font-medium"
                style={{ background: `hsl(${RAILWAY_COLOR})`, color: '#fff' }}>
                Setup Connection
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {statusSteps.map(({ key, label }, i) => {
                  const isDone = currentIdx > i || deployStatus === 'deployed';
                  const isActive = currentIdx === i && deployStatus !== 'idle' && deployStatus !== 'error';
                  return (
                    <div key={key} className="flex items-center gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                        style={{
                          background: isDone ? 'hsl(var(--success) / 0.15)' : isActive ? `hsl(${RAILWAY_COLOR} / 0.15)` : 'hsl(var(--muted) / 0.5)',
                          color: isDone ? 'hsl(var(--success))' : isActive ? `hsl(${RAILWAY_COLOR})` : 'hsl(var(--muted-foreground))',
                        }}>
                        {isDone ? <Check className="w-3 h-3" /> : isActive ? <Loader2 className="w-3 h-3 animate-spin" /> : i + 1}
                      </div>
                      <span className={`text-[11px] ${isDone ? 'line-through opacity-50' : isActive ? 'font-medium' : 'opacity-40'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>

              {deployUrl && (
                <a href={deployUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg text-[11px] font-medium hover:opacity-80 transition-opacity"
                  style={{ background: 'hsl(var(--success) / 0.08)', color: 'hsl(var(--success))' }}>
                  <ExternalLink className="w-4 h-4" /> {deployUrl}
                </a>
              )}

              {deployStatus === 'error' && (
                <div className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'hsl(var(--destructive) / 0.08)' }}>
                  <AlertCircle className="w-4 h-4 shrink-0" style={{ color: 'hsl(var(--destructive))' }} />
                  <div>
                    <p className="text-[11px] font-medium" style={{ color: 'hsl(var(--destructive))' }}>Deployment failed</p>
                    <p className="text-[10px] opacity-50">Check your token permissions and try again.</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button onClick={handleDeploy}
                  disabled={deployStatus === 'generating' || deployStatus === 'uploading' || deployStatus === 'building'}
                  className="w-full py-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  style={{ background: `hsl(${RAILWAY_COLOR})`, color: '#fff' }}>
                  {deployStatus === 'idle' || deployStatus === 'deployed' || deployStatus === 'error' ? (
                    <><Rocket className="w-3.5 h-3.5" /> Deploy to Railway</>
                  ) : (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Deploying...</>
                  )}
                </button>
                <button onClick={handleDownloadZip}
                  className="w-full py-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                  style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                  <FileArchive className="w-3.5 h-3.5" /> Download ZIP (GitHub Deploy)
                </button>
              </div>

              {deployments && deployments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: `hsl(${RAILWAY_COLOR})` }} /> Recent Deployments
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {deployments.slice(0, 8).map(d => (
                      <div key={d.id} className="flex items-center justify-between text-[10px] p-2 rounded-lg"
                        style={{ background: 'hsl(var(--builder-component-bg))' }}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full"
                            style={{ background: d.status === 'completed' ? 'hsl(var(--success))' : d.status === 'pending' ? 'hsl(45 93% 47%)' : 'hsl(var(--destructive))' }} />
                          <span className="font-medium">v{d.version_number}</span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-40">
                          <Clock className="w-3 h-3" />
                          {new Date(d.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Analytics View ── */
  if (view === 'analytics') {
    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <Header title="Railway Analytics" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <p className="text-[11px] leading-relaxed opacity-70">
              Railway provides built-in observability with real-time metrics, logs, and performance monitoring. Add client-side analytics to track Web Vitals and user behavior for full-stack diagnostics.
            </p>
          </div>

          <div className="p-3 rounded-lg flex items-center justify-between"
            style={{ background: analyticsEnabled ? 'hsl(var(--success) / 0.08)' : 'hsl(var(--builder-component-bg))', border: analyticsEnabled ? '1px solid hsl(var(--success) / 0.2)' : '1px solid transparent' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: analyticsEnabled ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground) / 0.3)' }} />
              <div>
                <p className="text-[11px] font-semibold">{analyticsEnabled ? 'Analytics Active' : 'Analytics Disabled'}</p>
                <p className="text-[9px] opacity-50">{analyticsEnabled ? 'Monitoring code injected in source' : 'Click to add analytics to your site'}</p>
              </div>
            </div>
            <button onClick={handleEnableAnalytics}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
              style={analyticsEnabled
                ? { background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }
                : { background: `hsl(${RAILWAY_COLOR})`, color: '#fff' }
              }>
              {analyticsEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold mb-2">What You Get</h4>
            <div className="space-y-2">
              {[
                { icon: Cpu, title: 'CPU & Memory Metrics', desc: 'Real-time resource usage monitoring for your deployed services' },
                { icon: Activity, title: 'Request Logs', desc: 'Live streaming logs with search, filtering and log drains' },
                { icon: TrendingUp, title: 'Web Vitals (LCP, CLS, FID)', desc: 'Client-side Core Web Vitals tracking for performance optimization' },
                { icon: Database, title: 'Database Metrics', desc: 'Track query performance, connections and storage usage' },
                { icon: Users, title: 'Traffic & Bandwidth', desc: 'Monitor incoming requests, response times and data transfer' },
                { icon: MonitorSmartphone, title: 'Error Tracking', desc: 'Catch runtime errors, crashes and failed requests automatically' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `hsl(${RAILWAY_COLOR} / 0.1)` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${RAILWAY_COLOR})` }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium">{title}</p>
                    <p className="text-[9px] opacity-50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" style={{ color: `hsl(${RAILWAY_COLOR})` }} /> Integration Code
            </h4>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium opacity-60">HTML (auto-injected)</span>
                <button onClick={() => handleCopy(RAILWAY_ANALYTICS_SCRIPT, 'HTML')}
                  className="flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-medium transition-colors"
                  style={{ background: `hsl(${RAILWAY_COLOR} / 0.1)`, color: `hsl(${RAILWAY_COLOR})` }}>
                  <Copy className="w-2.5 h-2.5" /> {copiedCode === 'HTML' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="rounded-lg p-2.5 text-[9px] leading-relaxed overflow-x-auto font-mono"
                style={{ background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--builder-panel-border))' }}>
                {RAILWAY_ANALYTICS_SCRIPT}
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium opacity-60">React / Web Vitals</span>
                <button onClick={() => handleCopy(RAILWAY_ANALYTICS_CODE, 'React')}
                  className="flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-medium transition-colors"
                  style={{ background: `hsl(${RAILWAY_COLOR} / 0.1)`, color: `hsl(${RAILWAY_COLOR})` }}>
                  <Copy className="w-2.5 h-2.5" /> {copiedCode === 'React' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="rounded-lg p-2.5 text-[9px] leading-relaxed overflow-x-auto font-mono"
                style={{ background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--builder-panel-border))' }}>
                {RAILWAY_ANALYTICS_CODE}
              </pre>
            </div>
          </div>

          <a href="https://railway.app" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-[11px] font-medium transition-colors hover:opacity-80"
            style={{ background: `hsl(${RAILWAY_COLOR} / 0.1)`, color: `hsl(${RAILWAY_COLOR})` }}>
            <ExternalLink className="w-3.5 h-3.5" /> Open Railway Dashboard
          </a>
        </div>
      </div>
    );
  }

  /* ── Main View ── */
  return (
    <div className="builder-flyout overflow-hidden flex flex-col">
      <Header title="Railway" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <p className="text-[11px] leading-relaxed opacity-70">
            Deploy your website to Railway's cloud platform. Get automatic builds, instant rollbacks, databases, cron jobs, and built-in observability — all with zero configuration.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-medium" style={{ color: `hsl(${RAILWAY_COLOR})` }}>Free Tier</span>
            <span className="text-[10px] opacity-40">40K+ installs</span>
            <span className="text-[10px] opacity-40">⭐ 4.6</span>
          </div>
        </div>

        {isConnected ? (
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--success) / 0.08)', border: '1px solid hsl(var(--success) / 0.2)' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(var(--success))' }} />
              <span className="text-[11px] font-semibold" style={{ color: 'hsl(var(--success))' }}>Connected to Railway</span>
            </div>
            <p className="text-[10px] opacity-50 mt-1">Ready to deploy your website</p>
          </div>
        ) : (
          <div className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--muted) / 0.2)', border: '1px dashed hsl(var(--muted-foreground) / 0.2)' }}>
            <Key className="w-6 h-6 mx-auto mb-1 opacity-20" />
            <p className="text-[10px] font-medium opacity-50">Not connected</p>
            <p className="text-[9px] opacity-30">Add your Railway token to get started</p>
          </div>
        )}

        <div className="space-y-2">
          <button onClick={() => setView('deploy')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': `hsl(${RAILWAY_COLOR} / 0.3)` } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `hsl(${RAILWAY_COLOR} / 0.1)` }}>
                <Rocket className="w-5 h-5" style={{ color: `hsl(${RAILWAY_COLOR})` }} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Deploy Website</p>
                <p className="text-[10px] opacity-50">Push your site live to Railway's cloud</p>
              </div>
              <ExternalLink className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
          </button>

          <button onClick={() => setView('analytics')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': `hsl(${RAILWAY_COLOR} / 0.3)` } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: analyticsEnabled ? 'hsl(var(--success) / 0.1)' : `hsl(${RAILWAY_COLOR} / 0.1)` }}>
                <BarChart3 className="w-5 h-5" style={{ color: analyticsEnabled ? 'hsl(var(--success))' : `hsl(${RAILWAY_COLOR})` }} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Analytics & Diagnostics</p>
                <p className="text-[10px] opacity-50">Monitor metrics, logs & Web Vitals</p>
              </div>
              {analyticsEnabled && (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }}>ON</span>
              )}
            </div>
          </button>

          <button onClick={() => setView('settings')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': `hsl(${RAILWAY_COLOR} / 0.3)` } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                <Settings className="w-5 h-5 opacity-60" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Connection Settings</p>
                <p className="text-[10px] opacity-50">{isConnected ? 'Update token & project settings' : 'Connect your Railway account'}</p>
              </div>
              <RefreshCw className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
          </button>
        </div>

        <div className="p-2.5 rounded-lg text-center" style={{ background: `hsl(${RAILWAY_COLOR} / 0.05)` }}>
          <p className="text-[9px] opacity-50 leading-relaxed">
            Railway provides instant deploys, automatic HTTPS, integrated databases (Postgres, Redis, MySQL), cron jobs, and real-time observability.
          </p>
          <a href="https://docs.railway.app/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-[9px] font-medium"
            style={{ color: `hsl(${RAILWAY_COLOR})` }}>
            <ExternalLink className="w-2.5 h-2.5" /> Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default RailwayPanel;
