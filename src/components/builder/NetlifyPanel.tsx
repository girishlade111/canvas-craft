import { useState } from 'react';
import {
  ArrowLeft, Rocket, Loader2, Check, ExternalLink, BarChart3,
  Globe, Clock, FileArchive, Shield, Key, Eye, EyeOff,
  Activity, Users, MonitorSmartphone, TrendingUp, Zap, Code,
  RefreshCw, Settings, Copy, AlertCircle, Search,
} from 'lucide-react';
import { NetlifyIcon } from './BrandIcons';
import { useAppConfig } from '@/hooks/useAppConfig';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage } from '@/hooks/usePages';
import { useCreateDeployment, useUpdateDeployment, useDeployments } from '@/hooks/useDeployments';
import { generateNetlifyFiles, deployToNetlify, type NetlifyDeployStatus } from '@/engine/deploy/netlifyDeploy';
import { downloadZip } from '@/engine/codegen/zipExporter';
import { useUpdateProjectSettings, useProjectSettings } from '@/hooks/useProjectSettings';
import type { PageSchema } from '@/types/builder';
import { toast } from 'sonner';

interface NetlifyPanelProps {
  projectId?: string | null;
  onClose?: () => void;
  onBack?: () => void;
}

type PanelView = 'main' | 'deploy' | 'analytics' | 'settings';

const NETLIFY_ANALYTICS_SCRIPT = `<!-- Netlify Analytics -->
<script defer data-site-id="YOUR_SITE_ID" src="https://cdn.netlify.com/netlify-analytics.js"></script>`;

const NETLIFY_ANALYTICS_REACT_CODE = `// For Netlify Analytics (server-side, no client JS needed for basic analytics)
// Analytics is enabled in your Netlify dashboard under:
// Site settings → Analytics → Enable analytics
//
// For enhanced client-side tracking, add to your index.html:
// <script defer data-site-id="YOUR_SITE_ID" src="https://cdn.netlify.com/netlify-analytics.js"></script>`;

const NetlifyPanel = ({ projectId, onClose, onBack }: NetlifyPanelProps) => {
  const [view, setView] = useState<PanelView>('main');
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState('');
  const [siteId, setSiteId] = useState('');
  const [deployStatus, setDeployStatus] = useState<NetlifyDeployStatus>('idle');
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { saveConfig, getConfig } = useAppConfig(projectId ?? null);
  const existingConfig = getConfig('netlify');
  const schema = useBuilderStore((s) => s.schema);
  const { data: pages } = usePages(projectId ?? null);
  const savePage = useSavePage();
  const createDeployment = useCreateDeployment();
  const updateDeployment = useUpdateDeployment();
  const { data: deployments } = useDeployments(projectId ?? null);
  const { data: projectSettings } = useProjectSettings(projectId ?? null);
  const updateSettings = useUpdateProjectSettings();

  // Load saved config
  useState(() => {
    if (existingConfig?.values?.netlify_token) {
      setToken(existingConfig.values.netlify_token);
    }
    if (existingConfig?.values?.netlify_site_id) {
      setSiteId(existingConfig.values.netlify_site_id);
    }
    if (projectSettings?.analytics_scripts?.includes('netlify')) {
      setAnalyticsEnabled(true);
    }
  });

  const isConnected = !!existingConfig?.isConnected && !!token;

  const handleSaveToken = () => {
    if (!token.trim()) {
      toast.error('Please enter your Netlify Personal Access Token.');
      return;
    }
    saveConfig('netlify', {
      netlify_token: token,
      netlify_site_id: siteId,
    });
    toast.success('Netlify connected successfully!');
  };

  const handleDeploy = async () => {
    if (!token) {
      toast.error('Connect your Netlify account first.');
      setView('settings');
      return;
    }

    try {
      setDeployStatus('generating');

      // Save current page first
      if (pages?.length) {
        const currentPage = pages.find((p) =>
          (p.schema as unknown as PageSchema)?.id === schema.id
        );
        if (currentPage) {
          await savePage.mutateAsync({ pageId: currentPage.id, schema });
        }
      }

      const result = await deployToNetlify(
        schema,
        {
          projectName: schema.name?.toLowerCase().replace(/\s+/g, '-') || 'my-website',
          token,
          siteId: siteId || undefined,
        },
        setDeployStatus
      );

      if (result.success && result.url) {
        setDeployUrl(result.url);
        setDeployStatus('deployed');

        if (projectId) {
          const versionNumber = (deployments?.length ?? 0) + 1;
          const deployment = await createDeployment.mutateAsync({
            projectId,
            versionNumber,
          });
          await updateDeployment.mutateAsync({
            deploymentId: deployment.id,
            updates: {
              status: 'completed',
              deployment_url: result.url,
              build_log: `Deployed to Netlify: ${result.url} (${result.deployId})`,
            },
          });
        }
        }

        toast.success('🚀 Deployed to Netlify successfully!');
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
      const files = generateNetlifyFiles(schema);
      await downloadZip(files, schema.name || 'my-website');
      toast.success('ZIP downloaded — drag & drop on Netlify to deploy');
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
    const hasNetlify = currentScripts.includes('netlify');

    if (hasNetlify) {
      const updated = currentScripts.replace(NETLIFY_ANALYTICS_SCRIPT, '').trim();
      await updateSettings.mutateAsync({
        projectId,
        updates: { analytics_scripts: updated || null },
      });
      setAnalyticsEnabled(false);
      toast.info('Netlify Analytics removed from your site.');
    } else {
      const updated = currentScripts ? `${currentScripts}\n\n${NETLIFY_ANALYTICS_SCRIPT}` : NETLIFY_ANALYTICS_SCRIPT;
      await updateSettings.mutateAsync({
        projectId,
        updates: { analytics_scripts: updated },
      });
      setAnalyticsEnabled(true);
      toast.success('Netlify Analytics enabled! Deploy to activate tracking.');
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  /* ── Header ── */
  const Header = ({ title, showBack = true }: { title: string; showBack?: boolean }) => (
    <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
      {showBack && (
        <button onClick={() => view === 'main' ? (onBack || onClose)?.() : setView('main')}
          className="p-1 rounded hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
        <NetlifyIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-semibold truncate">{title}</h3>
        <p className="text-[10px] opacity-50">netlify.com</p>
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
        <Header title="Netlify Settings" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Connection Setup
            </h4>
            {[
              { step: 1, title: 'Go to Netlify Dashboard', desc: 'Visit app.netlify.com → User Settings → Applications' },
              { step: 2, title: 'Create Personal Access Token', desc: 'Click "New access token" → name it → generate' },
              { step: 3, title: 'Paste Token Below', desc: 'Copy the token and paste it in the field below' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                  style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}>{step}</div>
                <div>
                  <p className="text-[11px] font-medium">{title}</p>
                  <p className="text-[10px] opacity-50">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Token Input */}
          <div>
            <label className="flex items-center gap-1 text-[10px] font-medium mb-1 opacity-70">
              <Key className="w-3 h-3" /> Personal Access Token
              <span style={{ color: 'hsl(var(--destructive))' }}>*</span>
              <span className="ml-auto flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded"
                style={{ background: 'hsl(var(--warning, 45 93% 47%) / 0.1)', color: 'hsl(var(--warning, 45 93% 47%))' }}>
                <Shield className="w-2.5 h-2.5" /> Secret
              </span>
            </label>
            <div className="relative">
              <input type={showToken ? 'text' : 'password'} value={token}
                onChange={e => setToken(e.target.value)} placeholder="Enter your Netlify access token"
                className="property-input text-xs pr-8 font-mono" style={{ fontSize: '10px' }} />
              <button onClick={() => setShowToken(!showToken)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors">
                {showToken ? <EyeOff className="w-3 h-3 opacity-40" /> : <Eye className="w-3 h-3 opacity-40" />}
              </button>
            </div>
            <p className="text-[8px] mt-0.5 font-mono opacity-30">→ [SERVER] NETLIFY_AUTH_TOKEN</p>
          </div>

          {/* Site ID */}
          <div>
            <label className="flex items-center gap-1 text-[10px] font-medium mb-1 opacity-70">
              <Globe className="w-3 h-3" /> Site ID <span className="opacity-40">(optional — auto-created if empty)</span>
            </label>
            <input type="text" value={siteId} onChange={e => setSiteId(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="property-input text-xs font-mono" style={{ fontSize: '10px' }} />
            <p className="text-[8px] mt-0.5 font-mono opacity-30">→ NETLIFY_SITE_ID</p>
          </div>

          {/* Security notice */}
          <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
            <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
            <p className="text-[9px] leading-relaxed opacity-50">
              Your token is stored locally and used only for deployment. It's never sent to third parties.
            </p>
          </div>

          <button onClick={handleSaveToken}
            className="w-full py-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
            <Zap className="w-3.5 h-3.5" /> {isConnected ? 'Update Connection' : 'Connect to Netlify'}
          </button>
        </div>
      </div>
    );
  }

  /* ── Deploy View ── */
  if (view === 'deploy') {
    const statusSteps = [
      { key: 'generating', label: 'Generating code' },
      { key: 'uploading', label: 'Uploading to Netlify' },
      { key: 'building', label: 'Building project' },
      { key: 'deployed', label: 'Deployed!' },
    ];
    const statusOrder = ['generating', 'uploading', 'building', 'deployed'];
    const currentIdx = statusOrder.indexOf(deployStatus);

    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <Header title="Deploy to Netlify" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {!isConnected ? (
            <div className="p-4 text-center rounded-lg" style={{ background: 'hsl(var(--muted) / 0.2)' }}>
              <Key className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-[11px] font-medium opacity-60">Connect your Netlify account first</p>
              <button onClick={() => setView('settings')}
                className="mt-2 px-4 py-1.5 rounded-lg text-[10px] font-medium"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                Setup Connection
              </button>
            </div>
          ) : (
            <>
              {/* Deploy status pipeline */}
              <div className="space-y-2">
                {statusSteps.map(({ key, label }, i) => {
                  const isDone = currentIdx > i || deployStatus === 'deployed';
                  const isActive = currentIdx === i && deployStatus !== 'idle' && deployStatus !== 'error';
                  return (
                    <div key={key} className="flex items-center gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                        style={{
                          background: isDone ? 'hsl(var(--success) / 0.15)' : isActive ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--muted) / 0.5)',
                          color: isDone ? 'hsl(var(--success))' : isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                        }}>
                        {isDone ? <Check className="w-3 h-3" /> : isActive ? <Loader2 className="w-3 h-3 animate-spin" /> : i + 1}
                      </div>
                      <span className={`text-[11px] ${isDone ? 'line-through opacity-50' : isActive ? 'font-medium' : 'opacity-40'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Deploy URL */}
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

              {/* Deploy actions */}
              <div className="space-y-2">
                <button onClick={handleDeploy}
                  disabled={deployStatus === 'generating' || deployStatus === 'uploading' || deployStatus === 'building'}
                  className="w-full py-2.5 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  style={{ background: 'hsl(142 76% 36%)', color: '#fff' }}>
                  {deployStatus === 'idle' || deployStatus === 'deployed' || deployStatus === 'error' ? (
                    <><Rocket className="w-3.5 h-3.5" /> Deploy to Netlify</>
                  ) : (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Deploying...</>
                  )}
                </button>
                <button onClick={handleDownloadZip}
                  className="w-full py-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                  style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                  <FileArchive className="w-3.5 h-3.5" /> Download ZIP (Drag & Drop Deploy)
                </button>
              </div>

              {/* Recent deployments */}
              {deployments && deployments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} /> Recent Deployments
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
        <Header title="Netlify Analytics" />
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Analytics overview */}
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
            <p className="text-[11px] leading-relaxed opacity-70">
              Netlify Analytics provides server-side visitor insights without client-side JavaScript. Get accurate data with zero performance impact — no ad blockers can interfere.
            </p>
          </div>

          {/* Enable/disable toggle */}
          <div className="p-3 rounded-lg flex items-center justify-between"
            style={{ background: analyticsEnabled ? 'hsl(var(--success) / 0.08)' : 'hsl(var(--builder-component-bg))', border: analyticsEnabled ? '1px solid hsl(var(--success) / 0.2)' : '1px solid transparent' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: analyticsEnabled ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground) / 0.3)' }} />
              <div>
                <p className="text-[11px] font-semibold">{analyticsEnabled ? 'Analytics Active' : 'Analytics Disabled'}</p>
                <p className="text-[9px] opacity-50">{analyticsEnabled ? 'Tracking code injected in source' : 'Click to add analytics to your site'}</p>
              </div>
            </div>
            <button onClick={handleEnableAnalytics}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
              style={analyticsEnabled
                ? { background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }
                : { background: 'hsl(142 76% 36%)', color: '#fff' }
              }>
              {analyticsEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>

          {/* Analytics Features */}
          <div>
            <h4 className="text-[11px] font-semibold mb-2">What You Get</h4>
            <div className="space-y-2">
              {[
                { icon: Users, title: 'Unique Visitors', desc: 'Server-side tracking — accurate counts unaffected by ad blockers' },
                { icon: TrendingUp, title: 'Page Views & Top Pages', desc: 'See which pages get the most traffic and engagement' },
                { icon: Globe, title: 'Traffic Sources & Referrers', desc: 'Know where your visitors come from — search, social, direct' },
                { icon: Activity, title: 'Bandwidth Usage', desc: 'Monitor data transfer and optimize your site performance' },
                { icon: MonitorSmartphone, title: '404 & Not Found Pages', desc: 'Identify broken links and missing pages automatically' },
                { icon: Search, title: 'Resource Analysis', desc: 'See which resources are requested most — optimize loading' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(142 76% 36% / 0.1)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(142 76% 36%)' }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium">{title}</p>
                    <p className="text-[9px] opacity-50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippets */}
          <div>
            <h4 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} /> Integration Code
            </h4>

            {/* HTML Snippet */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium opacity-60">HTML (auto-injected)</span>
                <button onClick={() => handleCopy(NETLIFY_ANALYTICS_SCRIPT, 'HTML')}
                  className="flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-medium transition-colors"
                  style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                  <Copy className="w-2.5 h-2.5" /> {copiedCode === 'HTML' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="rounded-lg p-2.5 text-[9px] leading-relaxed overflow-x-auto font-mono"
                style={{ background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--builder-panel-border))' }}>
                {NETLIFY_ANALYTICS_SCRIPT}
              </pre>
            </div>

            {/* Dashboard Info */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium opacity-60">Setup Guide</span>
                <button onClick={() => handleCopy(NETLIFY_ANALYTICS_REACT_CODE, 'Guide')}
                  className="flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-medium transition-colors"
                  style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                  <Copy className="w-2.5 h-2.5" /> {copiedCode === 'Guide' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="rounded-lg p-2.5 text-[9px] leading-relaxed overflow-x-auto font-mono"
                style={{ background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--builder-panel-border))' }}>
                {NETLIFY_ANALYTICS_REACT_CODE}
              </pre>
            </div>
          </div>

          {/* Pricing note */}
          <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
            <p className="text-[9px] leading-relaxed opacity-50">
              Netlify Analytics is a paid add-on ($9/month per site). Enable it in your Netlify dashboard under Site Settings → Analytics.
            </p>
          </div>

          {/* View Dashboard link */}
          <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-[11px] font-medium transition-colors hover:opacity-80"
            style={{ background: 'hsl(142 76% 36% / 0.1)', color: 'hsl(142 76% 36%)' }}>
            <ExternalLink className="w-3.5 h-3.5" /> Open Netlify Analytics Dashboard
          </a>
        </div>
      </div>
    );
  }

  /* ── Main View ── */
  return (
    <div className="builder-flyout overflow-hidden flex flex-col">
      <Header title="Netlify" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Description */}
        <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <p className="text-[11px] leading-relaxed opacity-70">
            Deploy your website instantly to Netlify's global CDN. Get automatic HTTPS, continuous deployment, serverless functions, and server-side analytics.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-medium" style={{ color: 'hsl(142 76% 36%)' }}>Free Tier</span>
            <span className="text-[10px] opacity-40">95K+ installs</span>
            <span className="text-[10px] opacity-40">⭐ 4.7</span>
          </div>
        </div>

        {/* Connection Status */}
        {isConnected ? (
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--success) / 0.08)', border: '1px solid hsl(var(--success) / 0.2)' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(var(--success))' }} />
              <span className="text-[11px] font-semibold" style={{ color: 'hsl(var(--success))' }}>Connected to Netlify</span>
            </div>
            <p className="text-[10px] opacity-50 mt-1">Ready to deploy your website</p>
          </div>
        ) : (
          <div className="p-3 rounded-lg text-center" style={{ background: 'hsl(var(--muted) / 0.2)', border: '1px dashed hsl(var(--muted-foreground) / 0.2)' }}>
            <Key className="w-6 h-6 mx-auto mb-1 opacity-20" />
            <p className="text-[10px] font-medium opacity-50">Not connected</p>
            <p className="text-[9px] opacity-30">Add your Netlify token to get started</p>
          </div>
        )}

        {/* Main Action Cards */}
        <div className="space-y-2">
          {/* Deploy */}
          <button onClick={() => setView('deploy')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': 'hsl(142 76% 36% / 0.3)' } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(142 76% 36% / 0.1)' }}>
                <Rocket className="w-5 h-5" style={{ color: 'hsl(142 76% 36%)' }} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Deploy Website</p>
                <p className="text-[10px] opacity-50">Push your site live to Netlify's global CDN</p>
              </div>
              <ExternalLink className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
          </button>

          {/* Analytics */}
          <button onClick={() => setView('analytics')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': 'hsl(142 76% 36% / 0.3)' } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: analyticsEnabled ? 'hsl(var(--success) / 0.1)' : 'hsl(142 76% 36% / 0.1)' }}>
                <BarChart3 className="w-5 h-5" style={{ color: analyticsEnabled ? 'hsl(var(--success))' : 'hsl(142 76% 36%)' }} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Analytics & Diagnostics</p>
                <p className="text-[10px] opacity-50">Track visitors, bandwidth & broken links</p>
              </div>
              {analyticsEnabled && (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }}>ON</span>
              )}
            </div>
          </button>

          {/* Settings */}
          <button onClick={() => setView('settings')}
            className="w-full p-3 rounded-lg text-left transition-all hover:ring-1 group"
            style={{ background: 'hsl(var(--builder-component-bg))', '--tw-ring-color': 'hsl(142 76% 36% / 0.3)' } as any}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                <Settings className="w-5 h-5 opacity-60" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold">Connection Settings</p>
                <p className="text-[10px] opacity-50">{isConnected ? 'Update token & site settings' : 'Connect your Netlify account'}</p>
              </div>
              <RefreshCw className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity" />
            </div>
          </button>
        </div>

        {/* Quick deploy info */}
        <div className="p-2.5 rounded-lg text-center" style={{ background: 'hsl(142 76% 36% / 0.05)' }}>
          <p className="text-[9px] opacity-50 leading-relaxed">
            Netlify provides automatic HTTPS, global CDN, deploy previews, serverless functions, form handling, and split testing support.
          </p>
          <a href="https://docs.netlify.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-[9px] font-medium"
            style={{ color: 'hsl(142 76% 36%)' }}>
            <ExternalLink className="w-2.5 h-2.5" /> Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NetlifyPanel;
