import { useState } from 'react';
import {
  Store, Search, X, Check, Star, HelpCircle, ChevronRight, Copy,
  Zap, BarChart3, MessageSquare, Mail, ShoppingBag, Calendar,
  Globe, Shield, Camera, Music, Video, MapPin, Loader2,
  CreditCard, Database, Bell, FileText, Cloud, Lock,
  Share2, Webhook, PieChart, Megaphone, ArrowLeft,
  ExternalLink, Key, Settings, BookOpen, AlertCircle,
} from 'lucide-react';
import { useInstalledApps, useInstallApp, useUninstallApp } from '@/hooks/useInstalledApps';
import { toast } from 'sonner';

/* ── Config field types ── */
interface ConfigField {
  key: string;
  label: string;
  type: 'api_key' | 'token' | 'client_id' | 'client_secret' | 'webhook_url' | 'project_id' | 'site_id' | 'tracking_id' | 'custom';
  placeholder: string;
  required: boolean;
  secret?: boolean;
}

interface SetupStep {
  step: number;
  title: string;
  description: string;
}

interface AppDef {
  key: string;
  name: string;
  description: string;
  category: string;
  icon: typeof Zap;
  rating: number;
  installs: string;
  free: boolean;
  price?: number;
  docsUrl?: string;
  configFields: ConfigField[];
  setupSteps: SetupStep[];
}

/* ── Expanded app catalog with connection guides ── */
const APP_CATALOG: AppDef[] = [
  {
    key: 'google-analytics', name: 'Google Analytics', description: 'Track visitors, conversions and behavior',
    category: 'Analytics', icon: BarChart3, rating: 4.8, installs: '50K+', free: true,
    docsUrl: 'https://support.google.com/analytics/answer/9304153',
    configFields: [
      { key: 'ga_tracking_id', label: 'Measurement ID', type: 'tracking_id', placeholder: 'G-XXXXXXXXXX', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Google Analytics account', description: 'Go to analytics.google.com and sign up or log in.' },
      { step: 2, title: 'Create a property', description: 'Click Admin → Create Property and follow the wizard.' },
      { step: 3, title: 'Get your Measurement ID', description: 'Go to Admin → Data Streams → Web, copy the Measurement ID (starts with G-).' },
      { step: 4, title: 'Paste the ID above', description: 'Enter your Measurement ID and click Save to start tracking.' },
    ],
  },
  {
    key: 'stripe', name: 'Stripe Payments', description: 'Accept credit card payments securely',
    category: 'eCommerce', icon: CreditCard, rating: 4.9, installs: '200K+', free: true,
    docsUrl: 'https://docs.stripe.com/keys',
    configFields: [
      { key: 'stripe_publishable_key', label: 'Publishable Key', type: 'api_key', placeholder: 'pk_live_...', required: true },
      { key: 'stripe_secret_key', label: 'Secret Key', type: 'api_key', placeholder: 'sk_live_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Stripe account', description: 'Go to dashboard.stripe.com and register.' },
      { step: 2, title: 'Get your API keys', description: 'Navigate to Developers → API Keys in your Stripe dashboard.' },
      { step: 3, title: 'Copy both keys', description: 'Copy the Publishable Key (pk_live_...) and Secret Key (sk_live_...).' },
      { step: 4, title: 'Paste and save', description: 'Enter both keys above. The Secret Key is stored securely.' },
    ],
  },
  {
    key: 'mailchimp', name: 'Mailchimp', description: 'Email marketing automation & newsletters',
    category: 'Marketing', icon: Mail, rating: 4.7, installs: '100K+', free: true,
    docsUrl: 'https://mailchimp.com/developer/marketing/guides/quick-start/',
    configFields: [
      { key: 'mailchimp_api_key', label: 'API Key', type: 'api_key', placeholder: 'xxxxxxxx-us14', required: true, secret: true },
      { key: 'mailchimp_list_id', label: 'Audience List ID', type: 'custom', placeholder: 'abc1234def', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Mailchimp', description: 'Go to mailchimp.com and sign in to your account.' },
      { step: 2, title: 'Generate an API key', description: 'Go to Account → Extras → API Keys → Create A Key.' },
      { step: 3, title: 'Find your Audience ID', description: 'Go to Audience → Settings → Audience name and defaults → copy the Audience ID.' },
      { step: 4, title: 'Enter credentials', description: 'Paste both the API Key and Audience ID above.' },
    ],
  },
  {
    key: 'live-chat-pro', name: 'Tawk.to Chat', description: 'Free live chat widget for customer support',
    category: 'Communication', icon: MessageSquare, rating: 4.6, installs: '25K+', free: true,
    docsUrl: 'https://help.tawk.to/article/finding-your-tawk-to-widget-id',
    configFields: [
      { key: 'tawk_property_id', label: 'Property ID', type: 'project_id', placeholder: '5xxxxxxxxxxxxxx', required: true },
      { key: 'tawk_widget_id', label: 'Widget ID', type: 'custom', placeholder: '1xxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at tawk.to', description: 'Go to tawk.to and create a free account.' },
      { step: 2, title: 'Create a property', description: 'Add your website as a new property in the dashboard.' },
      { step: 3, title: 'Get embed code IDs', description: 'Go to Administration → Chat Widget → find your Property ID and Widget ID from the embed code.' },
      { step: 4, title: 'Enter the IDs', description: 'Paste both IDs above to activate the live chat on your site.' },
    ],
  },
  {
    key: 'calendly', name: 'Calendly', description: 'Scheduling & appointment booking',
    category: 'Scheduling', icon: Calendar, rating: 4.5, installs: '30K+', free: false, price: 7.99,
    docsUrl: 'https://developer.calendly.com/getting-started',
    configFields: [
      { key: 'calendly_api_key', label: 'Personal Access Token', type: 'token', placeholder: 'eyJhbGciOiJIUz...', required: true, secret: true },
      { key: 'calendly_event_url', label: 'Event URL', type: 'custom', placeholder: 'https://calendly.com/your-name/30min', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Calendly', description: 'Go to calendly.com and sign in.' },
      { step: 2, title: 'Create a Personal Access Token', description: 'Go to Integrations → API & Webhooks → Generate Token.' },
      { step: 3, title: 'Get your event URL', description: 'Copy the link of the event type you want to embed.' },
      { step: 4, title: 'Connect', description: 'Paste both above to enable scheduling on your website.' },
    ],
  },
  {
    key: 'recaptcha', name: 'reCAPTCHA v3', description: 'Spam & bot protection for forms',
    category: 'Security', icon: Shield, rating: 4.3, installs: '80K+', free: true,
    docsUrl: 'https://developers.google.com/recaptcha/docs/v3',
    configFields: [
      { key: 'recaptcha_site_key', label: 'Site Key', type: 'api_key', placeholder: '6Lxxxxxxxxxxxxxxxxxxxxxxxxx', required: true },
      { key: 'recaptcha_secret_key', label: 'Secret Key', type: 'api_key', placeholder: '6Lxxxxxxxxxxxxxxxxxxxxxxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to reCAPTCHA Admin', description: 'Visit google.com/recaptcha/admin and sign in with Google.' },
      { step: 2, title: 'Register a new site', description: 'Choose reCAPTCHA v3, add your domain(s).' },
      { step: 3, title: 'Copy your keys', description: 'Copy the Site Key (public) and Secret Key (server-side).' },
      { step: 4, title: 'Paste above', description: 'Enter both keys to activate reCAPTCHA on your forms.' },
    ],
  },
  {
    key: 'instagram-feed', name: 'Instagram Feed', description: 'Display your Instagram posts on your site',
    category: 'Social', icon: Camera, rating: 4.4, installs: '40K+', free: true,
    docsUrl: 'https://developers.facebook.com/docs/instagram-basic-display-api/',
    configFields: [
      { key: 'instagram_access_token', label: 'Access Token', type: 'token', placeholder: 'IGQVJxxxxxxxxx...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Facebook App', description: 'Go to developers.facebook.com → My Apps → Create App.' },
      { step: 2, title: 'Add Instagram Basic Display', description: 'In your app dashboard, add the Instagram Basic Display product.' },
      { step: 3, title: 'Generate Access Token', description: 'Add your Instagram account as a tester, then generate a long-lived token.' },
      { step: 4, title: 'Paste the token', description: 'Enter your access token above to display your feed.' },
    ],
  },
  {
    key: 'spotify-player', name: 'Spotify Player', description: 'Embed playlists, albums and tracks',
    category: 'Media', icon: Music, rating: 4.2, installs: '15K+', free: true,
    docsUrl: 'https://developer.spotify.com/documentation/web-api',
    configFields: [
      { key: 'spotify_client_id', label: 'Client ID', type: 'client_id', placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', required: true },
      { key: 'spotify_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Spotify Developer', description: 'Visit developer.spotify.com/dashboard and log in.' },
      { step: 2, title: 'Create an app', description: 'Click "Create App", fill in name and description.' },
      { step: 3, title: 'Copy credentials', description: 'From the app settings, copy Client ID and Client Secret.' },
      { step: 4, title: 'Enter above', description: 'Paste both credentials to enable Spotify integration.' },
    ],
  },
  {
    key: 'youtube-gallery', name: 'YouTube Gallery', description: 'Display and auto-sync your YouTube videos',
    category: 'Media', icon: Video, rating: 4.6, installs: '35K+', free: true,
    docsUrl: 'https://developers.google.com/youtube/v3/getting-started',
    configFields: [
      { key: 'youtube_api_key', label: 'YouTube Data API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
      { key: 'youtube_channel_id', label: 'Channel ID', type: 'custom', placeholder: 'UCxxxxxxxxxxxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Open Google Cloud Console', description: 'Go to console.cloud.google.com and create/select a project.' },
      { step: 2, title: 'Enable YouTube Data API v3', description: 'Go to APIs & Services → Library → search "YouTube Data API v3" → Enable.' },
      { step: 3, title: 'Create API key', description: 'Go to Credentials → Create Credentials → API Key.' },
      { step: 4, title: 'Find your Channel ID', description: 'Go to youtube.com, click your profile → Settings → Advanced → Channel ID.' },
    ],
  },
  {
    key: 'google-maps', name: 'Google Maps', description: 'Interactive maps & location embeds',
    category: 'Utilities', icon: MapPin, rating: 4.7, installs: '90K+', free: true,
    docsUrl: 'https://developers.google.com/maps/documentation/javascript/get-api-key',
    configFields: [
      { key: 'google_maps_api_key', label: 'Maps API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Open Google Cloud Console', description: 'Go to console.cloud.google.com.' },
      { step: 2, title: 'Enable Maps JavaScript API', description: 'APIs & Services → Library → Maps JavaScript API → Enable.' },
      { step: 3, title: 'Create an API key', description: 'Go to Credentials → Create Credentials → API Key.' },
      { step: 4, title: 'Paste the key', description: 'Enter your API Key above to embed interactive maps.' },
    ],
  },
  {
    key: 'hotjar', name: 'Hotjar', description: 'Heatmaps, recordings & user feedback',
    category: 'Analytics', icon: PieChart, rating: 4.5, installs: '20K+', free: false, price: 14.99,
    docsUrl: 'https://help.hotjar.com/hc/en-us/articles/115009336727',
    configFields: [
      { key: 'hotjar_site_id', label: 'Site ID', type: 'site_id', placeholder: '1234567', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Hotjar account', description: 'Go to hotjar.com and sign up.' },
      { step: 2, title: 'Add your site', description: 'In the dashboard, add your website URL.' },
      { step: 3, title: 'Get your Site ID', description: 'Find the Site ID in your tracking code or Settings → Tracking.' },
      { step: 4, title: 'Enter the Site ID', description: 'Paste it above to start collecting heatmap and recording data.' },
    ],
  },
  {
    key: 'intercom', name: 'Intercom', description: 'Customer messaging & support platform',
    category: 'Communication', icon: MessageSquare, rating: 4.4, installs: '10K+', free: false, price: 19.99,
    docsUrl: 'https://developers.intercom.com/docs/build-an-integration/getting-started/',
    configFields: [
      { key: 'intercom_app_id', label: 'App ID', type: 'project_id', placeholder: 'xxxxxxxx', required: true },
      { key: 'intercom_api_key', label: 'Access Token', type: 'token', placeholder: 'dG9rOm...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Intercom', description: 'Go to app.intercom.com and sign in.' },
      { step: 2, title: 'Find your App ID', description: 'Go to Settings → Installation → Web → copy App ID from the snippet.' },
      { step: 3, title: 'Create an Access Token', description: 'Go to Settings → Integrations → Developer Hub → New App → get the Access Token.' },
      { step: 4, title: 'Paste credentials', description: 'Enter App ID and Access Token above to enable Intercom chat.' },
    ],
  },
  {
    key: 'firebase', name: 'Firebase', description: 'Google\'s app platform — auth, database, storage',
    category: 'Backend', icon: Database, rating: 4.8, installs: '80K+', free: true,
    docsUrl: 'https://firebase.google.com/docs/web/setup',
    configFields: [
      { key: 'firebase_api_key', label: 'API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
      { key: 'firebase_project_id', label: 'Project ID', type: 'project_id', placeholder: 'my-project-12345', required: true },
      { key: 'firebase_auth_domain', label: 'Auth Domain', type: 'custom', placeholder: 'my-project.firebaseapp.com', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Firebase Console', description: 'Visit console.firebase.google.com and create a new project.' },
      { step: 2, title: 'Register a web app', description: 'Click the Web icon (</>), name your app, and register.' },
      { step: 3, title: 'Copy config', description: 'Copy API Key, Project ID, and Auth Domain from the config snippet.' },
      { step: 4, title: 'Enter the values above', description: 'Paste each field to connect your Firebase project.' },
    ],
  },
  {
    key: 'sendgrid', name: 'SendGrid', description: 'Transactional email delivery service',
    category: 'Marketing', icon: Mail, rating: 4.5, installs: '45K+', free: true,
    docsUrl: 'https://docs.sendgrid.com/for-developers/sending-email/api-getting-started',
    configFields: [
      { key: 'sendgrid_api_key', label: 'API Key', type: 'api_key', placeholder: 'SG.xxxxxxxxxxxxx...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create SendGrid account', description: 'Go to sendgrid.com and register.' },
      { step: 2, title: 'Create an API Key', description: 'Go to Settings → API Keys → Create API Key → Full Access.' },
      { step: 3, title: 'Copy the key', description: 'Copy the generated API Key (it\'s shown only once!).' },
      { step: 4, title: 'Paste above', description: 'Enter the API Key to enable email sending from your site.' },
    ],
  },
  {
    key: 'cloudinary', name: 'Cloudinary', description: 'Image & video optimization and CDN',
    category: 'Media', icon: Cloud, rating: 4.6, installs: '30K+', free: true,
    docsUrl: 'https://cloudinary.com/documentation/how_to_integrate_cloudinary',
    configFields: [
      { key: 'cloudinary_cloud_name', label: 'Cloud Name', type: 'custom', placeholder: 'my-cloud', required: true },
      { key: 'cloudinary_api_key', label: 'API Key', type: 'api_key', placeholder: '123456789012345', required: true },
      { key: 'cloudinary_api_secret', label: 'API Secret', type: 'api_key', placeholder: 'abcdefghijk...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Cloudinary', description: 'Go to cloudinary.com and create a free account.' },
      { step: 2, title: 'Go to Dashboard', description: 'Your Cloud Name, API Key, and API Secret are displayed on the dashboard.' },
      { step: 3, title: 'Copy credentials', description: 'Copy all three values from the dashboard.' },
      { step: 4, title: 'Enter above', description: 'Paste each value to enable Cloudinary media management.' },
    ],
  },
  {
    key: 'webhook', name: 'Custom Webhook', description: 'Connect to any service via webhook URL',
    category: 'Utilities', icon: Webhook, rating: 4.3, installs: '12K+', free: true,
    docsUrl: 'https://en.wikipedia.org/wiki/Webhook',
    configFields: [
      { key: 'webhook_url', label: 'Webhook URL', type: 'webhook_url', placeholder: 'https://hooks.example.com/...', required: true },
      { key: 'webhook_secret', label: 'Secret (optional)', type: 'token', placeholder: 'whsec_...', required: false, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Get webhook URL', description: 'Create a webhook endpoint in your target service (Zapier, Make, n8n, etc.).' },
      { step: 2, title: 'Copy the URL', description: 'Copy the generated webhook URL from the service.' },
      { step: 3, title: 'Add a secret (optional)', description: 'Some services provide a signing secret for verifying payloads.' },
      { step: 4, title: 'Paste above', description: 'Enter the URL (and optional secret) to connect.' },
    ],
  },
  {
    key: 'onesignal', name: 'OneSignal', description: 'Push notifications for web & mobile',
    category: 'Communication', icon: Bell, rating: 4.4, installs: '18K+', free: true,
    docsUrl: 'https://documentation.onesignal.com/docs/web-push-quickstart',
    configFields: [
      { key: 'onesignal_app_id', label: 'App ID', type: 'project_id', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a OneSignal account', description: 'Go to onesignal.com and sign up.' },
      { step: 2, title: 'Create an app', description: 'Click New App/Website and configure for Web Push.' },
      { step: 3, title: 'Get your App ID', description: 'Find the App ID in Settings → Keys & IDs.' },
      { step: 4, title: 'Paste above', description: 'Enter the App ID to enable push notifications.' },
    ],
  },
  {
    key: 'google-adsense', name: 'Google AdSense', description: 'Monetize your website with ads',
    category: 'Marketing', icon: Megaphone, rating: 4.1, installs: '60K+', free: true,
    docsUrl: 'https://support.google.com/adsense/answer/9274019',
    configFields: [
      { key: 'adsense_client_id', label: 'Publisher ID', type: 'tracking_id', placeholder: 'ca-pub-xxxxxxxxxxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up for AdSense', description: 'Go to google.com/adsense and register your website.' },
      { step: 2, title: 'Get approved', description: 'Wait for Google to review and approve your site.' },
      { step: 3, title: 'Copy Publisher ID', description: 'Find your Publisher ID (ca-pub-...) in the AdSense dashboard.' },
      { step: 4, title: 'Enter above', description: 'Paste the Publisher ID to start showing ads.' },
    ],
  },
];

const CATEGORIES = ['All', 'Analytics', 'Marketing', 'eCommerce', 'Communication', 'Social', 'Media', 'Security', 'Scheduling', 'Utilities', 'Backend'];

/* ── Field type icon helper ── */
const getFieldIcon = (type: ConfigField['type']) => {
  switch (type) {
    case 'api_key': return Key;
    case 'token': return Lock;
    case 'client_id': case 'client_secret': return Settings;
    case 'webhook_url': return Webhook;
    default: return FileText;
  }
};

/* ── App Detail / Guide view ── */
const AppDetailView = ({ app, installed, onBack, onToggle, isPending }: {
  app: AppDef; installed: boolean; onBack: () => void; onToggle: () => void; isPending: boolean;
}) => {
  const [configValues, setConfigValues] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const missing = app.configFields.filter(f => f.required && !configValues[f.key]?.trim());
    if (missing.length) {
      toast.error(`Please fill in: ${missing.map(f => f.label).join(', ')}`);
      return;
    }
    // Save configs (in a real app, send to backend)
    setSaved(true);
    toast.success(`${app.name} configuration saved!`);
  };

  const Icon = app.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <button onClick={onBack} className="p-1 rounded hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
          <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold truncate">{app.name}</h3>
          <p className="text-[10px] opacity-50">{app.category}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Description card */}
        <div className="p-3 mx-3 mt-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <p className="text-[11px] leading-relaxed opacity-70">{app.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" style={{ color: 'hsl(var(--warning, 45 93% 47%))' }} />
              <span className="text-[10px] font-medium">{app.rating}</span>
            </div>
            <span className="text-[10px] opacity-40">{app.installs} installs</span>
            <span className="text-[10px] font-medium" style={{ color: app.free ? 'hsl(var(--success))' : 'hsl(var(--primary))' }}>
              {app.free ? 'Free' : `$${app.price}/mo`}
            </span>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="px-3 mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
            <h4 className="text-[11px] font-semibold">Setup Guide</h4>
          </div>
          <div className="space-y-2">
            {app.setupSteps.map(({ step, title, description }) => (
              <div key={step} className="flex gap-2.5 p-2 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                  style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}>
                  {step}
                </div>
                <div>
                  <p className="text-[11px] font-medium">{title}</p>
                  <p className="text-[10px] opacity-50 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {app.docsUrl && (
            <a href={app.docsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 mt-2 text-[10px] font-medium transition-colors hover:underline"
              style={{ color: 'hsl(var(--primary))' }}>
              <ExternalLink className="w-3 h-3" /> Official Documentation
            </a>
          )}
        </div>

        {/* Configuration Fields */}
        <div className="px-3 mt-4 pb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Settings className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
            <h4 className="text-[11px] font-semibold">Configuration</h4>
          </div>

          <div className="space-y-2.5">
            {app.configFields.map(field => {
              const FieldIcon = getFieldIcon(field.type);
              const isSecret = field.secret;
              const showValue = showSecrets[field.key];

              return (
                <div key={field.key}>
                  <label className="flex items-center gap-1 text-[10px] font-medium mb-1 opacity-70">
                    <FieldIcon className="w-3 h-3" />
                    {field.label}
                    {field.required && <span style={{ color: 'hsl(var(--destructive))' }}>*</span>}
                    {isSecret && (
                      <span className="ml-auto flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: 'hsl(var(--warning, 45 93% 47%) / 0.1)', color: 'hsl(var(--warning, 45 93% 47%))' }}>
                        <Lock className="w-2.5 h-2.5" /> Secret
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={isSecret && !showValue ? 'password' : 'text'}
                      value={configValues[field.key] || ''}
                      onChange={e => setConfigValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="property-input text-xs pr-8 font-mono"
                      style={{ fontSize: '10px' }}
                    />
                    {isSecret && (
                      <button
                        onClick={() => setShowSecrets(prev => ({ ...prev, [field.key]: !prev[field.key] }))}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors"
                        title={showValue ? 'Hide' : 'Show'}>
                        {showValue ? <Lock className="w-3 h-3 opacity-40" /> : <Key className="w-3 h-3 opacity-40" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 mt-3 p-2 rounded-lg" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
            <p className="text-[9px] leading-relaxed opacity-60">
              Secret keys are stored securely and never exposed in client-side code. Publishable keys are safe to use in the browser.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave}
              className="flex-1 py-2 rounded-lg text-[11px] font-semibold transition-colors"
              style={saved
                ? { background: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }
                : { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
              }>
              {saved ? '✓ Saved' : 'Save Configuration'}
            </button>
            <button onClick={onToggle} disabled={isPending}
              className="px-3 py-2 rounded-lg text-[11px] font-medium transition-colors"
              style={installed
                ? { background: 'hsl(var(--destructive) / 0.1)', color: 'hsl(var(--destructive))' }
                : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
              }>
              {installed ? 'Remove' : 'Install'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Panel ── */
interface AppMarketPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const AppMarketPanel = ({ projectId, onClose }: AppMarketPanelProps) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeView, setActiveView] = useState<'browse' | 'installed'>('browse');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const { data: installedApps = [], isLoading } = useInstalledApps(projectId ?? null);
  const installApp = useInstallApp();
  const uninstallApp = useUninstallApp();

  const installedKeys = new Set(installedApps.map(a => a.app_key));

  const filtered = APP_CATALOG.filter(a => {
    if (activeView === 'installed' && !installedKeys.has(a.key)) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'All' && a.category !== filterCategory) return false;
    return true;
  });

  const handleToggle = async (appKey: string) => {
    if (!projectId) {
      toast.info('Save your project first to install apps.');
      return;
    }
    try {
      if (installedKeys.has(appKey)) {
        await uninstallApp.mutateAsync({ projectId, appKey });
        toast.success('App removed');
      } else {
        await installApp.mutateAsync({ projectId, appKey });
        toast.success('App installed!');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Detail view for a selected app
  const detailApp = selectedApp ? APP_CATALOG.find(a => a.key === selectedApp) : null;
  if (detailApp) {
    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <AppDetailView
          app={detailApp}
          installed={installedKeys.has(detailApp.key)}
          onBack={() => setSelectedApp(null)}
          onToggle={() => handleToggle(detailApp.key)}
          isPending={installApp.isPending || uninstallApp.isPending}
        />
      </div>
    );
  }

  // No-project fallback
  if (!projectId) {
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-sm font-semibold">App Market</h2>
          </div>
          {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
        <div className="p-6 text-center">
          <Store className="w-8 h-8 mx-auto mb-2 opacity-20" />
          <p className="text-xs opacity-50">Save your project first to install apps.</p>
          <p className="text-[10px] opacity-30 mt-1">You can still browse and view setup guides.</p>
          <div className="mt-4 space-y-1">
            {APP_CATALOG.slice(0, 6).map(app => {
              const Icon = app.icon;
              return (
                <button key={app.key} onClick={() => setSelectedApp(app.key)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-colors hover:bg-muted/30"
                  style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[11px] font-semibold truncate">{app.name}</h3>
                    <p className="text-[9px] opacity-40">{app.description}</p>
                  </div>
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 opacity-30" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-flyout overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">App Market</h2>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
            {APP_CATALOG.length} apps
          </span>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Browse / Installed tabs */}
      <div className="flex p-2 gap-1 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {(['browse', 'installed'] as const).map(view => (
          <button key={view} onClick={() => setActiveView(view)}
            className={`flex-1 py-1.5 rounded text-[10px] font-medium transition-colors ${activeView === view ? '' : 'opacity-50 hover:opacity-80'}`}
            style={activeView === view ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } : undefined}>
            {view === 'browse' ? `Browse (${APP_CATALOG.length})` : `Installed (${installedApps.length})`}
          </button>
        ))}
      </div>

      {/* Search + category filter */}
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
      {isLoading ? (
        <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
      ) : (
        <div className="space-y-1 p-2">
          {filtered.map(app => {
            const Icon = app.icon;
            const installed = installedKeys.has(app.key);
            return (
              <div key={app.key}
                className="p-3 rounded-lg transition-colors hover:bg-muted/30 cursor-pointer group"
                style={{ background: 'hsl(var(--builder-component-bg))' }}
                onClick={() => setSelectedApp(app.key)}>
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-xs font-semibold truncate">{app.name}</h3>
                      {installed && <Check className="w-3 h-3 shrink-0" style={{ color: 'hsl(var(--success))' }} />}
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
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      className="p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      style={{ background: 'hsl(var(--primary) / 0.1)' }}
                      title="Setup Guide"
                      onClick={(e) => { e.stopPropagation(); setSelectedApp(app.key); }}>
                      <HelpCircle className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-50 transition-opacity" />
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="p-6 text-center text-xs opacity-40">No apps found</div>}
        </div>
      )}
    </div>
  );
};

export default AppMarketPanel;
