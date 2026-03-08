import { useState } from 'react';
import {
  Store, Search, X, Check, Star, HelpCircle, ChevronRight, Copy,
  Zap, BarChart3, MessageSquare, Mail, ShoppingBag, Calendar,
  Globe, Shield, Camera, Music, Video, MapPin, Loader2,
  CreditCard, Database, Bell, FileText, Cloud, Lock,
  Share2, Webhook, PieChart, Megaphone, ArrowLeft,
  ExternalLink, Key, Settings, BookOpen, AlertCircle,
} from 'lucide-react';
import {
  SupabaseIcon, StripeIcon, GitHubIcon, GoogleIcon, GoogleDocsIcon,
  GoogleSheetsIcon, GoogleDriveIcon, OneDriveIcon, PerplexityIcon,
  ChatGPTIcon, ClaudeIcon, ShopifyIcon, ElevenLabsIcon, SarvamAIIcon,
  FirecrawlIcon, AtlassianIcon, CanvaIcon, FigmaIcon, V0Icon,
  AirtableIcon, SpotifyIcon, ZohoIcon, BookingIcon, ExpediaIcon,
  SlackIcon, NotionIcon, ZapierIcon, VercelIcon, TwilioIcon,
  HubSpotIcon, AWSIcon, JiraIcon, LinearIcon, ResendIcon,
  PostmanIcon, MongoDBIcon, PrismaIcon, MixpanelIcon, SegmentIcon,
  LottieIcon, SanityIcon, ContentfulIcon, ReplicateIcon, DeepgramIcon,
  MakeIcon, N8NIcon, ClaudeCodeIcon, GeminiIcon, MistralIcon,
  HuggingFaceIcon, StabilityIcon, NetlifyIcon, RailwayIcon,
  CloudflareIcon, PayPalIcon, RazorpayIcon, LemonSqueezyIcon,
  DiscordIcon, TelegramIcon, TeamsIcon, ZoomIcon, WordPressIcon,
  GhostIcon, StrapiIcon, Auth0Icon, ClerkIcon, AlgoliaIcon,
  PineconeIcon, SentryIcon, RenderIcon, DigitalOceanIcon,
  FramerIcon, WebflowIcon, PaddleIcon, GumroadIcon, WooCommerceIcon,
  PostHogIcon, UpstashIcon, NeonIcon, PlausibleIcon, DenoIcon, TursoIcon,
} from './BrandIcons';
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
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  rating: number;
  installs: string;
  free: boolean;
  price?: number;
  docsUrl?: string;
  configFields: ConfigField[];
  setupSteps: SetupStep[];
}

/* ── Expanded app catalog ── */
const APP_CATALOG: AppDef[] = [
  // ── Backend & Database ──
  {
    key: 'supabase', name: 'Supabase', description: 'Open-source Firebase alternative — Postgres, Auth, Storage, Realtime',
    category: 'Backend', icon: SupabaseIcon, rating: 4.9, installs: '120K+', free: true,
    docsUrl: 'https://supabase.com/docs',
    configFields: [
      { key: 'supabase_url', label: 'Project URL', type: 'custom', placeholder: 'https://xxx.supabase.co', required: true },
      { key: 'supabase_anon_key', label: 'Anon Key', type: 'api_key', placeholder: 'eyJhbGciOiJIUz...', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Supabase project', description: 'Go to supabase.com and create a new project.' },
      { step: 2, title: 'Get your API keys', description: 'Go to Settings → API and copy the Project URL and anon key.' },
      { step: 3, title: 'Enter credentials above', description: 'Paste both values to connect your Supabase project.' },
    ],
  },
  {
    key: 'firebase', name: 'Firebase', description: 'Google\'s app platform — auth, database, storage',
    category: 'Backend', icon: GoogleIcon, rating: 4.8, installs: '80K+', free: true,
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
    ],
  },
  {
    key: 'mongodb', name: 'MongoDB Atlas', description: 'Cloud-hosted NoSQL document database',
    category: 'Backend', icon: MongoDBIcon, rating: 4.7, installs: '55K+', free: true,
    docsUrl: 'https://www.mongodb.com/docs/atlas/',
    configFields: [
      { key: 'mongodb_uri', label: 'Connection String', type: 'custom', placeholder: 'mongodb+srv://user:pass@cluster.mongodb.net/db', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create an Atlas account', description: 'Go to cloud.mongodb.com and sign up.' },
      { step: 2, title: 'Create a cluster', description: 'Set up a free M0 cluster in your preferred region.' },
      { step: 3, title: 'Get connection string', description: 'Click Connect → Drivers → copy the connection string.' },
    ],
  },
  {
    key: 'prisma', name: 'Prisma', description: 'Type-safe ORM for Node.js & TypeScript',
    category: 'Backend', icon: PrismaIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://www.prisma.io/docs',
    configFields: [
      { key: 'database_url', label: 'Database URL', type: 'custom', placeholder: 'postgresql://user:pass@host:5432/db', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Install Prisma', description: 'Run npm install prisma @prisma/client in your project.' },
      { step: 2, title: 'Init Prisma', description: 'Run npx prisma init to create schema.prisma.' },
      { step: 3, title: 'Set database URL', description: 'Enter your database connection string above.' },
    ],
  },
  {
    key: 'aws', name: 'AWS', description: 'Amazon Web Services — S3, Lambda, CloudFront & more',
    category: 'Backend', icon: AWSIcon, rating: 4.7, installs: '70K+', free: false, price: 0,
    docsUrl: 'https://docs.aws.amazon.com/',
    configFields: [
      { key: 'aws_access_key', label: 'Access Key ID', type: 'api_key', placeholder: 'AKIA...', required: true, secret: true },
      { key: 'aws_secret_key', label: 'Secret Access Key', type: 'api_key', placeholder: 'wJalrXUtnFEMI...', required: true, secret: true },
      { key: 'aws_region', label: 'Region', type: 'custom', placeholder: 'us-east-1', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign in to AWS Console', description: 'Go to console.aws.amazon.com.' },
      { step: 2, title: 'Create IAM user', description: 'Go to IAM → Users → Create user with programmatic access.' },
      { step: 3, title: 'Copy credentials', description: 'Save the Access Key ID and Secret Access Key.' },
    ],
  },

  // ── Payments & eCommerce ──
  {
    key: 'stripe', name: 'Stripe', description: 'Accept credit card payments securely',
    category: 'eCommerce', icon: StripeIcon, rating: 4.9, installs: '200K+', free: true,
    docsUrl: 'https://docs.stripe.com/keys',
    configFields: [
      { key: 'stripe_publishable_key', label: 'Publishable Key', type: 'api_key', placeholder: 'pk_live_...', required: true },
      { key: 'stripe_secret_key', label: 'Secret Key', type: 'api_key', placeholder: 'sk_live_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Stripe account', description: 'Go to dashboard.stripe.com and register.' },
      { step: 2, title: 'Get your API keys', description: 'Navigate to Developers → API Keys.' },
      { step: 3, title: 'Copy both keys', description: 'Copy the Publishable Key and Secret Key.' },
    ],
  },
  {
    key: 'shopify', name: 'Shopify', description: 'Complete eCommerce platform — products, checkout, inventory',
    category: 'eCommerce', icon: ShopifyIcon, rating: 4.8, installs: '150K+', free: false, price: 29,
    docsUrl: 'https://shopify.dev/docs/api',
    configFields: [
      { key: 'shopify_store_url', label: 'Store URL', type: 'custom', placeholder: 'your-store.myshopify.com', required: true },
      { key: 'shopify_access_token', label: 'Admin API Access Token', type: 'token', placeholder: 'shpat_xxxxx', required: true, secret: true },
      { key: 'shopify_storefront_token', label: 'Storefront Access Token', type: 'token', placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Shopify', description: 'Go to your Shopify admin panel.' },
      { step: 2, title: 'Create a custom app', description: 'Go to Settings → Apps → Develop apps → Create app.' },
      { step: 3, title: 'Get API tokens', description: 'Install app and copy Admin API and Storefront tokens.' },
    ],
  },

  // ── AI & Machine Learning ──
  {
    key: 'chatgpt', name: 'ChatGPT / OpenAI', description: 'GPT-4o, DALL-E, Whisper — AI text, image & audio',
    category: 'AI', icon: ChatGPTIcon, rating: 4.9, installs: '300K+', free: false, price: 0,
    docsUrl: 'https://platform.openai.com/docs',
    configFields: [
      { key: 'openai_api_key', label: 'API Key', type: 'api_key', placeholder: 'sk-proj-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create an OpenAI account', description: 'Go to platform.openai.com and sign up.' },
      { step: 2, title: 'Generate an API key', description: 'Go to API Keys → Create new secret key.' },
      { step: 3, title: 'Paste the key above', description: 'Enter your API key to use GPT-4o, DALL-E, etc.' },
    ],
  },
  {
    key: 'claude', name: 'Anthropic Claude', description: 'Claude AI — safe, helpful AI assistant & code generation',
    category: 'AI', icon: ClaudeIcon, rating: 4.9, installs: '180K+', free: false, price: 0,
    docsUrl: 'https://docs.anthropic.com/',
    configFields: [
      { key: 'anthropic_api_key', label: 'API Key', type: 'api_key', placeholder: 'sk-ant-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create an Anthropic account', description: 'Go to console.anthropic.com and sign up.' },
      { step: 2, title: 'Generate an API key', description: 'Go to API Keys → Create Key.' },
      { step: 3, title: 'Enter the key above', description: 'Paste your API key to enable Claude integration.' },
    ],
  },
  {
    key: 'perplexity', name: 'Perplexity', description: 'AI-powered search and answer engine with citations',
    category: 'AI', icon: PerplexityIcon, rating: 4.7, installs: '60K+', free: false, price: 0,
    docsUrl: 'https://docs.perplexity.ai/',
    configFields: [
      { key: 'perplexity_api_key', label: 'API Key', type: 'api_key', placeholder: 'pplx-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Perplexity', description: 'Visit perplexity.ai and sign in.' },
      { step: 2, title: 'Get API access', description: 'Navigate to API settings and generate a key.' },
      { step: 3, title: 'Paste above', description: 'Enter your API key to enable AI search.' },
    ],
  },
  {
    key: 'elevenlabs', name: 'ElevenLabs', description: 'AI voice generation, text-to-speech & voice cloning',
    category: 'AI', icon: ElevenLabsIcon, rating: 4.8, installs: '75K+', free: false, price: 0,
    docsUrl: 'https://elevenlabs.io/docs',
    configFields: [
      { key: 'elevenlabs_api_key', label: 'API Key', type: 'api_key', placeholder: 'xi-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create an ElevenLabs account', description: 'Go to elevenlabs.io and sign up.' },
      { step: 2, title: 'Get your API key', description: 'Go to Profile → API Keys.' },
      { step: 3, title: 'Enter the key', description: 'Paste your API key to enable voice generation.' },
    ],
  },
  {
    key: 'sarvam-ai', name: 'Sarvam AI', description: 'Indian language AI — translation, TTS, ASR for Indic languages',
    category: 'AI', icon: SarvamAIIcon, rating: 4.5, installs: '15K+', free: false, price: 0,
    docsUrl: 'https://docs.sarvam.ai/',
    configFields: [
      { key: 'sarvam_api_key', label: 'API Key', type: 'api_key', placeholder: 'sarvam_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Sarvam AI', description: 'Go to sarvam.ai and create an account.' },
      { step: 2, title: 'Get API key', description: 'Navigate to Dashboard → API Keys.' },
      { step: 3, title: 'Enter above', description: 'Paste key to enable Indic language AI.' },
    ],
  },
  {
    key: 'replicate', name: 'Replicate', description: 'Run open-source ML models — Stable Diffusion, LLaMA & more',
    category: 'AI', icon: ReplicateIcon, rating: 4.6, installs: '45K+', free: false, price: 0,
    docsUrl: 'https://replicate.com/docs',
    configFields: [
      { key: 'replicate_api_token', label: 'API Token', type: 'token', placeholder: 'r8_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Replicate', description: 'Go to replicate.com and create an account.' },
      { step: 2, title: 'Get API token', description: 'Go to Account Settings → API Tokens.' },
      { step: 3, title: 'Enter the token', description: 'Paste your token to run ML models.' },
    ],
  },
  {
    key: 'deepgram', name: 'Deepgram', description: 'Speech-to-text & text-to-speech API with real-time transcription',
    category: 'AI', icon: DeepgramIcon, rating: 4.6, installs: '25K+', free: true,
    docsUrl: 'https://developers.deepgram.com/docs',
    configFields: [
      { key: 'deepgram_api_key', label: 'API Key', type: 'api_key', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Deepgram account', description: 'Go to deepgram.com and sign up.' },
      { step: 2, title: 'Get API key', description: 'Go to Dashboard → API Keys → Create Key.' },
      { step: 3, title: 'Enter above', description: 'Paste key to enable speech AI.' },
    ],
  },

  // ── Developer Tools ──
  {
    key: 'github', name: 'GitHub', description: 'Code hosting, CI/CD, version control & collaboration',
    category: 'Developer', icon: GitHubIcon, rating: 4.9, installs: '500K+', free: true,
    docsUrl: 'https://docs.github.com/en/rest',
    configFields: [
      { key: 'github_token', label: 'Personal Access Token', type: 'token', placeholder: 'ghp_xxxxxxxxxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to GitHub Settings', description: 'Go to github.com → Settings → Developer settings → Personal access tokens.' },
      { step: 2, title: 'Generate a token', description: 'Click "Generate new token (classic)" with needed scopes.' },
      { step: 3, title: 'Paste the token', description: 'Enter your PAT above to connect GitHub.' },
    ],
  },
  {
    key: 'vercel', name: 'Vercel', description: 'Deploy frontend apps with zero-config CI/CD',
    category: 'Developer', icon: VercelIcon, rating: 4.8, installs: '100K+', free: true,
    docsUrl: 'https://vercel.com/docs',
    configFields: [
      { key: 'vercel_token', label: 'Access Token', type: 'token', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Vercel', description: 'Go to vercel.com and sign in.' },
      { step: 2, title: 'Create an access token', description: 'Go to Settings → Tokens → Create.' },
      { step: 3, title: 'Enter the token', description: 'Paste your access token above.' },
    ],
  },
  {
    key: 'v0', name: 'V0 by Vercel', description: 'AI-powered UI component generator with React & Tailwind',
    category: 'Developer', icon: V0Icon, rating: 4.7, installs: '60K+', free: true,
    docsUrl: 'https://v0.dev',
    configFields: [
      { key: 'v0_api_key', label: 'API Key', type: 'api_key', placeholder: 'v0_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to v0.dev', description: 'Visit v0.dev and sign in with your Vercel account.' },
      { step: 2, title: 'Get API access', description: 'Check your account settings for API key.' },
      { step: 3, title: 'Enter above', description: 'Paste key to generate UI components with AI.' },
    ],
  },
  {
    key: 'figma', name: 'Figma', description: 'Design-to-code — import Figma designs directly',
    category: 'Design', icon: FigmaIcon, rating: 4.8, installs: '90K+', free: true,
    docsUrl: 'https://www.figma.com/developers/api',
    configFields: [
      { key: 'figma_access_token', label: 'Personal Access Token', type: 'token', placeholder: 'figd_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Open Figma Settings', description: 'Go to figma.com → Settings → Personal Access Tokens.' },
      { step: 2, title: 'Generate a token', description: 'Create a new token with read access.' },
      { step: 3, title: 'Paste above', description: 'Enter your token to import Figma designs.' },
    ],
  },
  {
    key: 'canva', name: 'Canva', description: 'Design graphics, presentations & social media visuals',
    category: 'Design', icon: CanvaIcon, rating: 4.7, installs: '80K+', free: true,
    docsUrl: 'https://www.canva.dev/docs/connect/',
    configFields: [
      { key: 'canva_api_key', label: 'API Key', type: 'api_key', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Canva Developers', description: 'Visit canva.dev and sign in.' },
      { step: 2, title: 'Create an app', description: 'Register a new app and get your API credentials.' },
      { step: 3, title: 'Enter API key', description: 'Paste your key to embed Canva designs.' },
    ],
  },
  {
    key: 'postman', name: 'Postman', description: 'API testing, documentation & monitoring',
    category: 'Developer', icon: PostmanIcon, rating: 4.5, installs: '50K+', free: true,
    docsUrl: 'https://learning.postman.com/docs',
    configFields: [
      { key: 'postman_api_key', label: 'API Key', type: 'api_key', placeholder: 'PMAK-xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign in to Postman', description: 'Go to postman.com and log in.' },
      { step: 2, title: 'Generate API key', description: 'Go to Settings → API Keys → Generate.' },
      { step: 3, title: 'Enter above', description: 'Paste key to sync Postman collections.' },
    ],
  },
  {
    key: 'firecrawl', name: 'Firecrawl', description: 'AI-powered web scraping, search & data extraction',
    category: 'Developer', icon: FirecrawlIcon, rating: 4.6, installs: '20K+', free: true,
    docsUrl: 'https://docs.firecrawl.dev/',
    configFields: [
      { key: 'firecrawl_api_key', label: 'API Key', type: 'api_key', placeholder: 'fc-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Firecrawl', description: 'Go to firecrawl.dev and create an account.' },
      { step: 2, title: 'Get API key', description: 'Find your API key in the dashboard.' },
      { step: 3, title: 'Enter above', description: 'Paste key to enable web scraping.' },
    ],
  },

  // ── Google Workspace ──
  {
    key: 'google-docs', name: 'Google Docs', description: 'Embed & sync Google Docs in your website',
    category: 'Productivity', icon: GoogleDocsIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://developers.google.com/docs/api',
    configFields: [
      { key: 'google_api_key', label: 'Google API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
      { key: 'google_doc_id', label: 'Document ID', type: 'custom', placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Enable Google Docs API', description: 'Go to console.cloud.google.com → APIs → Enable Google Docs API.' },
      { step: 2, title: 'Create API key', description: 'Go to Credentials → Create API Key.' },
      { step: 3, title: 'Get Document ID', description: 'Copy the ID from your Google Doc URL (between /d/ and /edit).' },
    ],
  },
  {
    key: 'google-sheets', name: 'Google Sheets', description: 'Use spreadsheets as a database or embed live data',
    category: 'Productivity', icon: GoogleSheetsIcon, rating: 4.7, installs: '65K+', free: true,
    docsUrl: 'https://developers.google.com/sheets/api',
    configFields: [
      { key: 'google_api_key', label: 'Google API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
      { key: 'sheet_id', label: 'Spreadsheet ID', type: 'custom', placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Enable Sheets API', description: 'Go to Google Cloud Console → APIs → Enable Google Sheets API.' },
      { step: 2, title: 'Create API key', description: 'Credentials → Create API Key.' },
      { step: 3, title: 'Get Spreadsheet ID', description: 'Copy the ID from your Google Sheet URL.' },
    ],
  },
  {
    key: 'google-drive', name: 'Google Drive', description: 'Access & embed files from Google Drive',
    category: 'Productivity', icon: GoogleDriveIcon, rating: 4.6, installs: '55K+', free: true,
    docsUrl: 'https://developers.google.com/drive/api',
    configFields: [
      { key: 'google_client_id', label: 'OAuth Client ID', type: 'client_id', placeholder: 'xxxxx.apps.googleusercontent.com', required: true },
      { key: 'google_api_key', label: 'API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Enable Drive API', description: 'Go to Google Cloud Console → APIs → Enable Google Drive API.' },
      { step: 2, title: 'Create OAuth credentials', description: 'Create OAuth 2.0 Client ID and API Key.' },
      { step: 3, title: 'Enter credentials', description: 'Paste both values above to connect Drive.' },
    ],
  },
  {
    key: 'onedrive', name: 'Microsoft OneDrive', description: 'Cloud storage — files, photos & documents from Microsoft',
    category: 'Productivity', icon: OneDriveIcon, rating: 4.5, installs: '35K+', free: true,
    docsUrl: 'https://learn.microsoft.com/en-us/onedrive/developer/',
    configFields: [
      { key: 'onedrive_client_id', label: 'Application (Client) ID', type: 'client_id', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: true },
      { key: 'onedrive_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Register an app in Azure', description: 'Go to portal.azure.com → App registrations → New.' },
      { step: 2, title: 'Get credentials', description: 'Copy Application ID and create a Client Secret.' },
      { step: 3, title: 'Enter above', description: 'Paste both to connect OneDrive.' },
    ],
  },

  // ── Zoho Suite ──
  {
    key: 'zoho-sheet', name: 'Zoho Sheet', description: 'Online spreadsheet with collaboration & automation',
    category: 'Productivity', icon: ZohoIcon, rating: 4.4, installs: '20K+', free: true,
    docsUrl: 'https://www.zoho.com/sheet/help/api/',
    configFields: [
      { key: 'zoho_client_id', label: 'Client ID', type: 'client_id', placeholder: '1000.xxxxx', required: true },
      { key: 'zoho_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Register a Zoho app', description: 'Go to api-console.zoho.com and create a Self Client.' },
      { step: 2, title: 'Get credentials', description: 'Copy Client ID and Client Secret.' },
      { step: 3, title: 'Enter above', description: 'Paste both values to connect Zoho Sheet.' },
    ],
  },
  {
    key: 'zoho-writer', name: 'Zoho Writer', description: 'Online word processor with document automation',
    category: 'Productivity', icon: ZohoIcon, rating: 4.3, installs: '15K+', free: true,
    docsUrl: 'https://www.zoho.com/writer/help/api/',
    configFields: [
      { key: 'zoho_client_id', label: 'Client ID', type: 'client_id', placeholder: '1000.xxxxx', required: true },
      { key: 'zoho_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Register a Zoho app', description: 'Go to api-console.zoho.com and create a Self Client.' },
      { step: 2, title: 'Get credentials', description: 'Copy Client ID and Client Secret.' },
      { step: 3, title: 'Enter above', description: 'Paste to connect Zoho Writer.' },
    ],
  },
  {
    key: 'zoho-notebook', name: 'Zoho Notebook', description: 'Note-taking app with rich media support',
    category: 'Productivity', icon: ZohoIcon, rating: 4.3, installs: '10K+', free: true,
    docsUrl: 'https://www.zoho.com/notebook/',
    configFields: [
      { key: 'zoho_client_id', label: 'Client ID', type: 'client_id', placeholder: '1000.xxxxx', required: true },
      { key: 'zoho_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Register a Zoho app', description: 'Go to api-console.zoho.com.' },
      { step: 2, title: 'Get credentials', description: 'Copy Client ID and Client Secret.' },
      { step: 3, title: 'Enter above', description: 'Paste to connect Zoho Notebook.' },
    ],
  },

  // ── Communication & Collaboration ──
  {
    key: 'slack', name: 'Slack', description: 'Send messages, notifications & alerts to Slack channels',
    category: 'Communication', icon: SlackIcon, rating: 4.8, installs: '120K+', free: true,
    docsUrl: 'https://api.slack.com/docs',
    configFields: [
      { key: 'slack_bot_token', label: 'Bot Token', type: 'token', placeholder: 'xoxb-xxxxx', required: true, secret: true },
      { key: 'slack_channel', label: 'Channel ID', type: 'custom', placeholder: 'C0XXXXXXX', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Slack app', description: 'Go to api.slack.com/apps → Create New App.' },
      { step: 2, title: 'Add Bot permissions', description: 'Add OAuth scopes like chat:write.' },
      { step: 3, title: 'Install to workspace', description: 'Install the app and copy the Bot Token.' },
    ],
  },
  {
    key: 'twilio', name: 'Twilio', description: 'SMS, WhatsApp, voice & video communication APIs',
    category: 'Communication', icon: TwilioIcon, rating: 4.6, installs: '55K+', free: false, price: 0,
    docsUrl: 'https://www.twilio.com/docs',
    configFields: [
      { key: 'twilio_account_sid', label: 'Account SID', type: 'custom', placeholder: 'ACxxxxx', required: true },
      { key: 'twilio_auth_token', label: 'Auth Token', type: 'token', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Twilio account', description: 'Go to twilio.com and sign up.' },
      { step: 2, title: 'Get credentials', description: 'Find Account SID and Auth Token on the dashboard.' },
      { step: 3, title: 'Enter above', description: 'Paste both to enable SMS/voice.' },
    ],
  },
  {
    key: 'notion', name: 'Notion', description: 'All-in-one workspace — notes, docs, wikis & databases',
    category: 'Productivity', icon: NotionIcon, rating: 4.7, installs: '70K+', free: true,
    docsUrl: 'https://developers.notion.com/',
    configFields: [
      { key: 'notion_api_key', label: 'Integration Token', type: 'token', placeholder: 'secret_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Notion integration', description: 'Go to notion.so/my-integrations → New integration.' },
      { step: 2, title: 'Copy the token', description: 'Copy the Internal Integration Token.' },
      { step: 3, title: 'Share pages', description: 'Share Notion pages with your integration, then paste token above.' },
    ],
  },
  {
    key: 'airtable', name: 'Airtable', description: 'Spreadsheet-database hybrid — flexible data management',
    category: 'Productivity', icon: AirtableIcon, rating: 4.7, installs: '60K+', free: true,
    docsUrl: 'https://airtable.com/developers/web/api/introduction',
    configFields: [
      { key: 'airtable_token', label: 'Personal Access Token', type: 'token', placeholder: 'patxxxxx', required: true, secret: true },
      { key: 'airtable_base_id', label: 'Base ID', type: 'custom', placeholder: 'appXXXXXXXXXX', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Airtable', description: 'Visit airtable.com/create/tokens.' },
      { step: 2, title: 'Create a token', description: 'Generate a personal access token with needed scopes.' },
      { step: 3, title: 'Get Base ID', description: 'Find the Base ID in the Airtable API docs for your base.' },
    ],
  },

  // ── Project Management ──
  {
    key: 'atlassian', name: 'Atlassian (Confluence)', description: 'Team documentation, knowledge base & collaboration',
    category: 'Project Management', icon: AtlassianIcon, rating: 4.5, installs: '40K+', free: true,
    docsUrl: 'https://developer.atlassian.com/cloud/confluence/rest/',
    configFields: [
      { key: 'atlassian_email', label: 'Email', type: 'custom', placeholder: 'you@company.com', required: true },
      { key: 'atlassian_api_token', label: 'API Token', type: 'token', placeholder: 'xxxxx', required: true, secret: true },
      { key: 'atlassian_domain', label: 'Domain', type: 'custom', placeholder: 'your-company.atlassian.net', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Atlassian account', description: 'Visit id.atlassian.com/manage-profile/security/api-tokens.' },
      { step: 2, title: 'Create API token', description: 'Click Create API Token and copy it.' },
      { step: 3, title: 'Enter credentials', description: 'Paste email, token, and your Atlassian domain.' },
    ],
  },
  {
    key: 'jira', name: 'Jira', description: 'Issue tracking, project management & agile boards',
    category: 'Project Management', icon: JiraIcon, rating: 4.6, installs: '45K+', free: true,
    docsUrl: 'https://developer.atlassian.com/cloud/jira/platform/rest/',
    configFields: [
      { key: 'jira_email', label: 'Email', type: 'custom', placeholder: 'you@company.com', required: true },
      { key: 'jira_api_token', label: 'API Token', type: 'token', placeholder: 'xxxxx', required: true, secret: true },
      { key: 'jira_domain', label: 'Jira Domain', type: 'custom', placeholder: 'your-company.atlassian.net', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Atlassian account', description: 'Visit id.atlassian.com/manage-profile/security/api-tokens.' },
      { step: 2, title: 'Create API token', description: 'Click Create API Token.' },
      { step: 3, title: 'Enter credentials', description: 'Paste email, token, and Jira domain.' },
    ],
  },
  {
    key: 'linear', name: 'Linear', description: 'Modern issue tracking for high-performance teams',
    category: 'Project Management', icon: LinearIcon, rating: 4.7, installs: '30K+', free: true,
    docsUrl: 'https://developers.linear.app/',
    configFields: [
      { key: 'linear_api_key', label: 'API Key', type: 'api_key', placeholder: 'lin_api_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Open Linear Settings', description: 'Go to linear.app → Settings → API.' },
      { step: 2, title: 'Create API key', description: 'Generate a personal API key.' },
      { step: 3, title: 'Enter above', description: 'Paste to connect Linear.' },
    ],
  },

  // ── Travel & Booking ──
  {
    key: 'booking-com', name: 'Booking.com', description: 'Hotel & travel booking affiliate integration',
    category: 'Travel', icon: BookingIcon, rating: 4.4, installs: '25K+', free: true,
    docsUrl: 'https://developers.booking.com/',
    configFields: [
      { key: 'booking_affiliate_id', label: 'Affiliate ID', type: 'custom', placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Join Booking.com Affiliate', description: 'Go to booking.com/affiliate and sign up.' },
      { step: 2, title: 'Get Affiliate ID', description: 'Find your affiliate ID in the dashboard.' },
      { step: 3, title: 'Enter above', description: 'Paste ID to embed booking widgets.' },
    ],
  },
  {
    key: 'expedia', name: 'Expedia', description: 'Travel booking — flights, hotels & vacation packages',
    category: 'Travel', icon: ExpediaIcon, rating: 4.3, installs: '18K+', free: true,
    docsUrl: 'https://developers.expediagroup.com/',
    configFields: [
      { key: 'expedia_api_key', label: 'API Key', type: 'api_key', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Join Expedia Affiliate', description: 'Go to developers.expediagroup.com and register.' },
      { step: 2, title: 'Get API key', description: 'Create an app and copy the API key.' },
      { step: 3, title: 'Enter above', description: 'Paste key to embed travel search.' },
    ],
  },

  // ── Analytics ──
  {
    key: 'google-analytics', name: 'Google Analytics', description: 'Track visitors, conversions and behavior',
    category: 'Analytics', icon: GoogleIcon, rating: 4.8, installs: '50K+', free: true,
    docsUrl: 'https://support.google.com/analytics/answer/9304153',
    configFields: [
      { key: 'ga_tracking_id', label: 'Measurement ID', type: 'tracking_id', placeholder: 'G-XXXXXXXXXX', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Google Analytics account', description: 'Go to analytics.google.com.' },
      { step: 2, title: 'Create a property', description: 'Click Admin → Create Property.' },
      { step: 3, title: 'Get Measurement ID', description: 'Go to Data Streams → Web, copy G- ID.' },
    ],
  },
  {
    key: 'mixpanel', name: 'Mixpanel', description: 'Product analytics — funnels, retention & user behavior',
    category: 'Analytics', icon: MixpanelIcon, rating: 4.6, installs: '35K+', free: true,
    docsUrl: 'https://docs.mixpanel.com/',
    configFields: [
      { key: 'mixpanel_token', label: 'Project Token', type: 'token', placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Mixpanel account', description: 'Go to mixpanel.com and sign up.' },
      { step: 2, title: 'Get project token', description: 'Go to Settings → Project Settings → Token.' },
      { step: 3, title: 'Enter above', description: 'Paste token to start tracking events.' },
    ],
  },
  {
    key: 'segment', name: 'Segment', description: 'Customer data platform — collect, unify & route data',
    category: 'Analytics', icon: SegmentIcon, rating: 4.5, installs: '30K+', free: true,
    docsUrl: 'https://segment.com/docs/',
    configFields: [
      { key: 'segment_write_key', label: 'Write Key', type: 'api_key', placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Segment account', description: 'Go to segment.com and sign up.' },
      { step: 2, title: 'Create a source', description: 'Add a JavaScript source and copy the Write Key.' },
      { step: 3, title: 'Enter above', description: 'Paste write key to route analytics.' },
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
      { step: 2, title: 'Add your site', description: 'Add your website URL in the dashboard.' },
      { step: 3, title: 'Get Site ID', description: 'Find the Site ID in Settings → Tracking.' },
    ],
  },

  // ── Marketing & Email ──
  {
    key: 'mailchimp', name: 'Mailchimp', description: 'Email marketing automation & newsletters',
    category: 'Marketing', icon: Mail, rating: 4.7, installs: '100K+', free: true,
    docsUrl: 'https://mailchimp.com/developer/marketing/guides/quick-start/',
    configFields: [
      { key: 'mailchimp_api_key', label: 'API Key', type: 'api_key', placeholder: 'xxxxxxxx-us14', required: true, secret: true },
      { key: 'mailchimp_list_id', label: 'Audience List ID', type: 'custom', placeholder: 'abc1234def', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Mailchimp', description: 'Go to mailchimp.com and sign in.' },
      { step: 2, title: 'Generate an API key', description: 'Account → Extras → API Keys → Create.' },
      { step: 3, title: 'Find Audience ID', description: 'Audience → Settings → copy Audience ID.' },
    ],
  },
  {
    key: 'hubspot', name: 'HubSpot', description: 'CRM, marketing automation, sales & customer service',
    category: 'Marketing', icon: HubSpotIcon, rating: 4.7, installs: '55K+', free: true,
    docsUrl: 'https://developers.hubspot.com/docs/api/overview',
    configFields: [
      { key: 'hubspot_access_token', label: 'Private App Token', type: 'token', placeholder: 'pat-xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to HubSpot', description: 'Log in to app.hubspot.com.' },
      { step: 2, title: 'Create a private app', description: 'Settings → Integrations → Private Apps → Create.' },
      { step: 3, title: 'Copy the token', description: 'Paste the Private App Token above.' },
    ],
  },
  {
    key: 'sendgrid', name: 'SendGrid', description: 'Transactional email delivery service',
    category: 'Marketing', icon: Mail, rating: 4.5, installs: '45K+', free: true,
    docsUrl: 'https://docs.sendgrid.com/for-developers/sending-email/api-getting-started',
    configFields: [
      { key: 'sendgrid_api_key', label: 'API Key', type: 'api_key', placeholder: 'SG.xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create SendGrid account', description: 'Go to sendgrid.com and register.' },
      { step: 2, title: 'Create an API Key', description: 'Settings → API Keys → Create.' },
      { step: 3, title: 'Paste above', description: 'Enter the API Key to enable emails.' },
    ],
  },
  {
    key: 'resend', name: 'Resend', description: 'Developer-friendly email API — simple, modern & reliable',
    category: 'Marketing', icon: ResendIcon, rating: 4.6, installs: '25K+', free: true,
    docsUrl: 'https://resend.com/docs',
    configFields: [
      { key: 'resend_api_key', label: 'API Key', type: 'api_key', placeholder: 're_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Resend', description: 'Go to resend.com and create an account.' },
      { step: 2, title: 'Get API key', description: 'Go to API Keys → Create.' },
      { step: 3, title: 'Enter above', description: 'Paste key to send emails.' },
    ],
  },
  {
    key: 'google-adsense', name: 'Google AdSense', description: 'Monetize your website with ads',
    category: 'Marketing', icon: Megaphone, rating: 4.1, installs: '60K+', free: true,
    docsUrl: 'https://support.google.com/adsense/answer/9274019',
    configFields: [
      { key: 'adsense_client_id', label: 'Publisher ID', type: 'tracking_id', placeholder: 'ca-pub-xxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up for AdSense', description: 'Go to google.com/adsense and register.' },
      { step: 2, title: 'Get approved', description: 'Wait for Google to review your site.' },
      { step: 3, title: 'Copy Publisher ID', description: 'Paste your ca-pub- ID above.' },
    ],
  },

  // ── Media ──
  {
    key: 'spotify', name: 'Spotify', description: 'Embed playlists, albums, tracks & podcasts',
    category: 'Media', icon: SpotifyIcon, rating: 4.5, installs: '40K+', free: true,
    docsUrl: 'https://developer.spotify.com/documentation/web-api',
    configFields: [
      { key: 'spotify_client_id', label: 'Client ID', type: 'client_id', placeholder: 'xxxxxxxx', required: true },
      { key: 'spotify_client_secret', label: 'Client Secret', type: 'client_secret', placeholder: 'xxxxxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Spotify Developer', description: 'Visit developer.spotify.com/dashboard.' },
      { step: 2, title: 'Create an app', description: 'Click Create App, fill in details.' },
      { step: 3, title: 'Copy credentials', description: 'Copy Client ID and Client Secret.' },
    ],
  },
  {
    key: 'youtube-gallery', name: 'YouTube', description: 'Display and sync your YouTube videos & channels',
    category: 'Media', icon: Video, rating: 4.6, installs: '35K+', free: true,
    docsUrl: 'https://developers.google.com/youtube/v3/getting-started',
    configFields: [
      { key: 'youtube_api_key', label: 'YouTube Data API Key', type: 'api_key', placeholder: 'AIzaSy...', required: true },
      { key: 'youtube_channel_id', label: 'Channel ID', type: 'custom', placeholder: 'UCxxxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Enable YouTube Data API', description: 'Go to Google Cloud Console → APIs → YouTube Data API v3.' },
      { step: 2, title: 'Create API key', description: 'Credentials → Create API Key.' },
      { step: 3, title: 'Find Channel ID', description: 'YouTube → Profile → Settings → Advanced → Channel ID.' },
    ],
  },
  {
    key: 'cloudinary', name: 'Cloudinary', description: 'Image & video optimization and CDN',
    category: 'Media', icon: Cloud, rating: 4.6, installs: '30K+', free: true,
    docsUrl: 'https://cloudinary.com/documentation',
    configFields: [
      { key: 'cloudinary_cloud_name', label: 'Cloud Name', type: 'custom', placeholder: 'my-cloud', required: true },
      { key: 'cloudinary_api_key', label: 'API Key', type: 'api_key', placeholder: '123456789', required: true },
      { key: 'cloudinary_api_secret', label: 'API Secret', type: 'api_key', placeholder: 'abcdefghijk', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Cloudinary', description: 'Go to cloudinary.com and create a free account.' },
      { step: 2, title: 'Go to Dashboard', description: 'Copy Cloud Name, API Key, and API Secret.' },
      { step: 3, title: 'Enter above', description: 'Paste each value to enable Cloudinary.' },
    ],
  },
  {
    key: 'lottie', name: 'Lottie Animations', description: 'Add lightweight, scalable animations to your site',
    category: 'Media', icon: LottieIcon, rating: 4.5, installs: '30K+', free: true,
    docsUrl: 'https://lottiefiles.com/developers',
    configFields: [
      { key: 'lottie_api_key', label: 'LottieFiles API Key', type: 'api_key', placeholder: 'xxxxx', required: false },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at LottieFiles', description: 'Go to lottiefiles.com and create an account.' },
      { step: 2, title: 'Browse animations', description: 'Find free animations to use on your site.' },
      { step: 3, title: 'Optional: API key', description: 'Get an API key for programmatic access.' },
    ],
  },

  // ── CMS ──
  {
    key: 'sanity', name: 'Sanity', description: 'Headless CMS with real-time collaboration & structured content',
    category: 'CMS', icon: SanityIcon, rating: 4.7, installs: '35K+', free: true,
    docsUrl: 'https://www.sanity.io/docs',
    configFields: [
      { key: 'sanity_project_id', label: 'Project ID', type: 'project_id', placeholder: 'xxxxx', required: true },
      { key: 'sanity_dataset', label: 'Dataset', type: 'custom', placeholder: 'production', required: true },
      { key: 'sanity_token', label: 'API Token', type: 'token', placeholder: 'skxxxxx', required: false, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Sanity project', description: 'Go to sanity.io/manage and create a project.' },
      { step: 2, title: 'Get Project ID', description: 'Find it in the project settings.' },
      { step: 3, title: 'Create API token', description: 'Go to API → Tokens for authenticated access.' },
    ],
  },
  {
    key: 'contentful', name: 'Contentful', description: 'Headless CMS for structured content at scale',
    category: 'CMS', icon: ContentfulIcon, rating: 4.6, installs: '30K+', free: true,
    docsUrl: 'https://www.contentful.com/developers/docs/',
    configFields: [
      { key: 'contentful_space_id', label: 'Space ID', type: 'custom', placeholder: 'xxxxx', required: true },
      { key: 'contentful_access_token', label: 'Content Delivery API Token', type: 'token', placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Contentful account', description: 'Go to contentful.com and sign up.' },
      { step: 2, title: 'Get Space ID', description: 'Settings → General → Space ID.' },
      { step: 3, title: 'Create API key', description: 'Settings → API Keys → Add API Key.' },
    ],
  },

  // ── Automation ──
  {
    key: 'zapier', name: 'Zapier', description: 'Connect 5000+ apps with automated workflows',
    category: 'Automation', icon: ZapierIcon, rating: 4.7, installs: '80K+', free: true,
    docsUrl: 'https://zapier.com/developer',
    configFields: [
      { key: 'zapier_webhook_url', label: 'Webhook URL', type: 'webhook_url', placeholder: 'https://hooks.zapier.com/hooks/catch/...', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Zapier account', description: 'Go to zapier.com and sign up.' },
      { step: 2, title: 'Create a Zap', description: 'Use "Webhooks by Zapier" as the trigger.' },
      { step: 3, title: 'Copy webhook URL', description: 'Paste the webhook URL above.' },
    ],
  },
  {
    key: 'make', name: 'Make (Integromat)', description: 'Visual automation platform with 1000+ integrations',
    category: 'Automation', icon: MakeIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://www.make.com/en/help',
    configFields: [
      { key: 'make_webhook_url', label: 'Webhook URL', type: 'webhook_url', placeholder: 'https://hook.make.com/xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Make account', description: 'Go to make.com and sign up.' },
      { step: 2, title: 'Create a scenario', description: 'Add a Webhook module as the first step.' },
      { step: 3, title: 'Copy webhook URL', description: 'Paste it above to connect.' },
    ],
  },
  {
    key: 'n8n', name: 'n8n', description: 'Open-source workflow automation — self-hosted or cloud',
    category: 'Automation', icon: N8NIcon, rating: 4.5, installs: '25K+', free: true,
    docsUrl: 'https://docs.n8n.io/',
    configFields: [
      { key: 'n8n_webhook_url', label: 'Webhook URL', type: 'webhook_url', placeholder: 'https://your-n8n.com/webhook/xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Set up n8n', description: 'Self-host or use n8n.cloud.' },
      { step: 2, title: 'Create a workflow', description: 'Add a Webhook node as the trigger.' },
      { step: 3, title: 'Copy webhook URL', description: 'Paste the production URL above.' },
    ],
  },

  // ── Social & Chat ──
  {
    key: 'instagram-feed', name: 'Instagram Feed', description: 'Display your Instagram posts on your site',
    category: 'Social', icon: Camera, rating: 4.4, installs: '40K+', free: true,
    docsUrl: 'https://developers.facebook.com/docs/instagram-basic-display-api/',
    configFields: [
      { key: 'instagram_access_token', label: 'Access Token', type: 'token', placeholder: 'IGQVJxxxxxxxxx...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create a Facebook App', description: 'Go to developers.facebook.com → Create App.' },
      { step: 2, title: 'Add Instagram Display', description: 'Add Instagram Basic Display product.' },
      { step: 3, title: 'Generate token', description: 'Add your account as tester, generate long-lived token.' },
    ],
  },
  {
    key: 'live-chat-pro', name: 'Tawk.to Chat', description: 'Free live chat widget for customer support',
    category: 'Communication', icon: MessageSquare, rating: 4.6, installs: '25K+', free: true,
    docsUrl: 'https://help.tawk.to/',
    configFields: [
      { key: 'tawk_property_id', label: 'Property ID', type: 'project_id', placeholder: '5xxxxxx', required: true },
      { key: 'tawk_widget_id', label: 'Widget ID', type: 'custom', placeholder: '1xxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at tawk.to', description: 'Create a free account at tawk.to.' },
      { step: 2, title: 'Create a property', description: 'Add your website as a property.' },
      { step: 3, title: 'Get IDs', description: 'Find Property ID and Widget ID from embed code.' },
    ],
  },
  {
    key: 'intercom', name: 'Intercom', description: 'Customer messaging & support platform',
    category: 'Communication', icon: MessageSquare, rating: 4.4, installs: '10K+', free: false, price: 19.99,
    docsUrl: 'https://developers.intercom.com/',
    configFields: [
      { key: 'intercom_app_id', label: 'App ID', type: 'project_id', placeholder: 'xxxxxxxx', required: true },
      { key: 'intercom_api_key', label: 'Access Token', type: 'token', placeholder: 'dG9rOm...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Intercom', description: 'Go to app.intercom.com.' },
      { step: 2, title: 'Find App ID', description: 'Settings → Installation → Web → copy App ID.' },
      { step: 3, title: 'Create Access Token', description: 'Developer Hub → New App → get token.' },
    ],
  },

  // ── Security & Utilities ──
  {
    key: 'recaptcha', name: 'reCAPTCHA v3', description: 'Spam & bot protection for forms',
    category: 'Security', icon: Shield, rating: 4.3, installs: '80K+', free: true,
    docsUrl: 'https://developers.google.com/recaptcha/docs/v3',
    configFields: [
      { key: 'recaptcha_site_key', label: 'Site Key', type: 'api_key', placeholder: '6Lxxxxxxxxx', required: true },
      { key: 'recaptcha_secret_key', label: 'Secret Key', type: 'api_key', placeholder: '6Lxxxxxxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to reCAPTCHA Admin', description: 'Visit google.com/recaptcha/admin.' },
      { step: 2, title: 'Register your site', description: 'Choose v3, add your domain.' },
      { step: 3, title: 'Copy keys', description: 'Paste Site Key and Secret Key above.' },
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
      { step: 2, title: 'Enable Maps API', description: 'APIs → Maps JavaScript API → Enable.' },
      { step: 3, title: 'Create API key', description: 'Credentials → Create API Key.' },
    ],
  },
  {
    key: 'calendly', name: 'Calendly', description: 'Scheduling & appointment booking',
    category: 'Scheduling', icon: Calendar, rating: 4.5, installs: '30K+', free: false, price: 7.99,
    docsUrl: 'https://developer.calendly.com/',
    configFields: [
      { key: 'calendly_api_key', label: 'Personal Access Token', type: 'token', placeholder: 'eyJhbGciOiJIUz...', required: true, secret: true },
      { key: 'calendly_event_url', label: 'Event URL', type: 'custom', placeholder: 'https://calendly.com/your-name/30min', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Calendly', description: 'Go to calendly.com and sign in.' },
      { step: 2, title: 'Generate token', description: 'Integrations → API & Webhooks → Generate Token.' },
      { step: 3, title: 'Get event URL', description: 'Copy the link of the event type to embed.' },
    ],
  },
  {
    key: 'onesignal', name: 'OneSignal', description: 'Push notifications for web & mobile',
    category: 'Communication', icon: Bell, rating: 4.4, installs: '18K+', free: true,
    docsUrl: 'https://documentation.onesignal.com/',
    configFields: [
      { key: 'onesignal_app_id', label: 'App ID', type: 'project_id', placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create OneSignal account', description: 'Go to onesignal.com and sign up.' },
      { step: 2, title: 'Create an app', description: 'New App → configure for Web Push.' },
      { step: 3, title: 'Get App ID', description: 'Settings → Keys & IDs → App ID.' },
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
      { step: 1, title: 'Get webhook URL', description: 'Create an endpoint in your target service.' },
      { step: 2, title: 'Copy the URL', description: 'Copy the generated webhook URL.' },
      { step: 3, title: 'Paste above', description: 'Enter URL and optional secret.' },
    ],
  },

  // ── NEW: Additional AI ──
  {
    key: 'claude-code', name: 'Claude Code', description: 'AI-powered coding agent by Anthropic — terminal-native agentic coding',
    category: 'AI', icon: ClaudeCodeIcon, rating: 4.8, installs: '95K+', free: false, price: 0,
    docsUrl: 'https://docs.anthropic.com/en/docs/claude-code',
    configFields: [
      { key: 'anthropic_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'sk-ant-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Get Anthropic API key', description: 'Go to console.anthropic.com → API Keys.' },
      { step: 2, title: 'Install Claude Code', description: 'Run: npm install -g @anthropic-ai/claude-code' },
      { step: 3, title: 'Enter API key above', description: 'Paste your key to enable Claude Code integration.' },
    ],
  },
  {
    key: 'gemini', name: 'Google Gemini', description: 'Google\'s multimodal AI — text, image, code & reasoning',
    category: 'AI', icon: GeminiIcon, rating: 4.8, installs: '200K+', free: false, price: 0,
    docsUrl: 'https://ai.google.dev/docs',
    configFields: [
      { key: 'gemini_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'AIzaSy...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Google AI Studio', description: 'Visit aistudio.google.com and sign in.' },
      { step: 2, title: 'Create API key', description: 'Click "Get API Key" → Create in new project.' },
      { step: 3, title: 'Enter above', description: 'Paste key to use Gemini models.' },
    ],
  },
  {
    key: 'mistral', name: 'Mistral AI', description: 'Open-weight AI models — Mistral, Mixtral & Codestral',
    category: 'AI', icon: MistralIcon, rating: 4.7, installs: '50K+', free: false, price: 0,
    docsUrl: 'https://docs.mistral.ai/',
    configFields: [
      { key: 'mistral_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Mistral', description: 'Go to console.mistral.ai and register.' },
      { step: 2, title: 'Create API key', description: 'Navigate to API Keys → Create.' },
      { step: 3, title: 'Enter above', description: 'Paste key to access Mistral models.' },
    ],
  },
  {
    key: 'huggingface', name: 'Hugging Face', description: 'Open-source ML hub — models, datasets & inference API',
    category: 'AI', icon: HuggingFaceIcon, rating: 4.8, installs: '150K+', free: true,
    docsUrl: 'https://huggingface.co/docs/api-inference',
    configFields: [
      { key: 'hf_api_token', label: 'Access Token', type: 'token' as const, placeholder: 'hf_...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Hugging Face', description: 'Go to huggingface.co and create an account.' },
      { step: 2, title: 'Create access token', description: 'Settings → Access Tokens → New Token.' },
      { step: 3, title: 'Enter above', description: 'Paste token to use Inference API.' },
    ],
  },
  {
    key: 'stability-ai', name: 'Stability AI', description: 'Stable Diffusion image generation API',
    category: 'AI', icon: StabilityIcon, rating: 4.6, installs: '65K+', free: false, price: 0,
    docsUrl: 'https://platform.stability.ai/docs/api-reference',
    configFields: [
      { key: 'stability_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'sk-...', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Stability AI', description: 'Go to platform.stability.ai and register.' },
      { step: 2, title: 'Get API key', description: 'Dashboard → API Keys → Create.' },
      { step: 3, title: 'Enter above', description: 'Paste key to generate images.' },
    ],
  },

  // ── NEW: Payments ──
  {
    key: 'paypal', name: 'PayPal', description: 'Accept PayPal & credit card payments worldwide',
    category: 'eCommerce', icon: PayPalIcon, rating: 4.7, installs: '180K+', free: true,
    docsUrl: 'https://developer.paypal.com/docs/api/overview/',
    configFields: [
      { key: 'paypal_client_id', label: 'Client ID', type: 'client_id' as const, placeholder: 'AXxxxx', required: true },
      { key: 'paypal_client_secret', label: 'Client Secret', type: 'client_secret' as const, placeholder: 'ELxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to PayPal Developer', description: 'Visit developer.paypal.com and log in.' },
      { step: 2, title: 'Create an app', description: 'My Apps → Create App → get credentials.' },
      { step: 3, title: 'Enter above', description: 'Paste Client ID and Secret.' },
    ],
  },
  {
    key: 'razorpay', name: 'Razorpay', description: 'Indian payment gateway — UPI, cards, wallets & more',
    category: 'eCommerce', icon: RazorpayIcon, rating: 4.7, installs: '90K+', free: true,
    docsUrl: 'https://razorpay.com/docs/api/',
    configFields: [
      { key: 'razorpay_key_id', label: 'Key ID', type: 'api_key' as const, placeholder: 'rzp_live_xxxxx', required: true },
      { key: 'razorpay_key_secret', label: 'Key Secret', type: 'api_key' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Razorpay', description: 'Go to dashboard.razorpay.com and register.' },
      { step: 2, title: 'Get API keys', description: 'Settings → API Keys → Generate Key.' },
      { step: 3, title: 'Enter above', description: 'Paste Key ID and Secret.' },
    ],
  },
  {
    key: 'lemonsqueezy', name: 'Lemon Squeezy', description: 'All-in-one payments, tax & subscriptions for digital products',
    category: 'eCommerce', icon: LemonSqueezyIcon, rating: 4.6, installs: '35K+', free: true,
    docsUrl: 'https://docs.lemonsqueezy.com/api',
    configFields: [
      { key: 'lemonsqueezy_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Lemon Squeezy', description: 'Go to lemonsqueezy.com and register.' },
      { step: 2, title: 'Generate API key', description: 'Settings → API → Create Key.' },
      { step: 3, title: 'Enter above', description: 'Paste key to accept payments.' },
    ],
  },
  {
    key: 'paddle', name: 'Paddle', description: 'SaaS billing platform — subscriptions, tax & checkout',
    category: 'eCommerce', icon: PaddleIcon, rating: 4.5, installs: '25K+', free: true,
    docsUrl: 'https://developer.paddle.com/',
    configFields: [
      { key: 'paddle_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'paddle_client_token', label: 'Client-side Token', type: 'token' as const, placeholder: 'test_xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Paddle', description: 'Go to paddle.com and register.' },
      { step: 2, title: 'Get API credentials', description: 'Developer Tools → Authentication.' },
      { step: 3, title: 'Enter above', description: 'Paste API Key and Client Token.' },
    ],
  },
  {
    key: 'gumroad', name: 'Gumroad', description: 'Sell digital products, memberships & courses',
    category: 'eCommerce', icon: GumroadIcon, rating: 4.4, installs: '30K+', free: true,
    docsUrl: 'https://app.gumroad.com/api',
    configFields: [
      { key: 'gumroad_access_token', label: 'Access Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Gumroad', description: 'Go to gumroad.com and sign in.' },
      { step: 2, title: 'Get access token', description: 'Settings → Advanced → Application API → Generate.' },
      { step: 3, title: 'Enter above', description: 'Paste token to integrate Gumroad.' },
    ],
  },
  {
    key: 'woocommerce', name: 'WooCommerce', description: 'Open-source WordPress eCommerce plugin',
    category: 'eCommerce', icon: WooCommerceIcon, rating: 4.5, installs: '110K+', free: true,
    docsUrl: 'https://woocommerce.github.io/woocommerce-rest-api-docs/',
    configFields: [
      { key: 'woo_store_url', label: 'Store URL', type: 'custom' as const, placeholder: 'https://your-store.com', required: true },
      { key: 'woo_consumer_key', label: 'Consumer Key', type: 'api_key' as const, placeholder: 'ck_xxxxx', required: true, secret: true },
      { key: 'woo_consumer_secret', label: 'Consumer Secret', type: 'api_key' as const, placeholder: 'cs_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to WooCommerce', description: 'WordPress Admin → WooCommerce → Settings → Advanced → REST API.' },
      { step: 2, title: 'Create API keys', description: 'Add Key → set permissions → Generate.' },
      { step: 3, title: 'Enter above', description: 'Paste Store URL and API keys.' },
    ],
  },

  // ── NEW: Communication ──
  {
    key: 'discord', name: 'Discord', description: 'Bot integration — messages, webhooks & community management',
    category: 'Communication', icon: DiscordIcon, rating: 4.7, installs: '85K+', free: true,
    docsUrl: 'https://discord.com/developers/docs',
    configFields: [
      { key: 'discord_bot_token', label: 'Bot Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'discord_webhook_url', label: 'Webhook URL (optional)', type: 'webhook_url' as const, placeholder: 'https://discord.com/api/webhooks/...', required: false },
    ],
    setupSteps: [
      { step: 1, title: 'Create Discord Application', description: 'Go to discord.com/developers/applications → New Application.' },
      { step: 2, title: 'Create a bot', description: 'Bot tab → Add Bot → copy token.' },
      { step: 3, title: 'Enter above', description: 'Paste bot token and optional webhook URL.' },
    ],
  },
  {
    key: 'telegram', name: 'Telegram Bot', description: 'Build Telegram bots — messages, commands & inline queries',
    category: 'Communication', icon: TelegramIcon, rating: 4.6, installs: '50K+', free: true,
    docsUrl: 'https://core.telegram.org/bots/api',
    configFields: [
      { key: 'telegram_bot_token', label: 'Bot Token', type: 'token' as const, placeholder: '123456:ABCdefGhIJKlmNoPQRstuVWXyz', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Talk to BotFather', description: 'Open Telegram, search @BotFather, send /newbot.' },
      { step: 2, title: 'Get bot token', description: 'BotFather will give you a token after creating the bot.' },
      { step: 3, title: 'Enter above', description: 'Paste your bot token.' },
    ],
  },
  {
    key: 'teams', name: 'Microsoft Teams', description: 'Team collaboration, messaging & video conferencing',
    category: 'Communication', icon: TeamsIcon, rating: 4.5, installs: '60K+', free: true,
    docsUrl: 'https://learn.microsoft.com/en-us/graph/teams-concept-overview',
    configFields: [
      { key: 'teams_client_id', label: 'Application ID', type: 'client_id' as const, placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: true },
      { key: 'teams_webhook_url', label: 'Incoming Webhook URL', type: 'webhook_url' as const, placeholder: 'https://outlook.office.com/webhook/...', required: false },
    ],
    setupSteps: [
      { step: 1, title: 'Register an app', description: 'Go to Azure Portal → App registrations → New.' },
      { step: 2, title: 'Configure Teams permissions', description: 'Add Microsoft Graph permissions for Teams.' },
      { step: 3, title: 'Enter above', description: 'Paste Application ID and webhook URL.' },
    ],
  },
  {
    key: 'zoom', name: 'Zoom', description: 'Video meetings, webinars & virtual events API',
    category: 'Communication', icon: ZoomIcon, rating: 4.5, installs: '45K+', free: true,
    docsUrl: 'https://developers.zoom.us/docs/',
    configFields: [
      { key: 'zoom_client_id', label: 'Client ID', type: 'client_id' as const, placeholder: 'xxxxx', required: true },
      { key: 'zoom_client_secret', label: 'Client Secret', type: 'client_secret' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Zoom Marketplace', description: 'Visit marketplace.zoom.us and sign in.' },
      { step: 2, title: 'Create an app', description: 'Develop → Build App → OAuth → Create.' },
      { step: 3, title: 'Enter above', description: 'Paste Client ID and Secret.' },
    ],
  },

  // ── NEW: Hosting & Deploy ──
  {
    key: 'netlify', name: 'Netlify', description: 'Deploy & host websites with CI/CD and serverless functions',
    category: 'Developer', icon: NetlifyIcon, rating: 4.7, installs: '95K+', free: true,
    docsUrl: 'https://docs.netlify.com/',
    configFields: [
      { key: 'netlify_token', label: 'Personal Access Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'netlify_site_id', label: 'Site ID', type: 'site_id' as const, placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', required: false },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Netlify', description: 'Go to app.netlify.com and sign in.' },
      { step: 2, title: 'Create access token', description: 'User Settings → Applications → Personal Access Tokens.' },
      { step: 3, title: 'Enter above', description: 'Paste token and optional Site ID.' },
    ],
  },
  {
    key: 'railway', name: 'Railway', description: 'Deploy apps, databases & cron jobs with zero config',
    category: 'Developer', icon: RailwayIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://docs.railway.app/',
    configFields: [
      { key: 'railway_token', label: 'API Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Railway', description: 'Go to railway.app and create an account.' },
      { step: 2, title: 'Generate token', description: 'Account Settings → Tokens → Create Token.' },
      { step: 3, title: 'Enter above', description: 'Paste token to deploy via API.' },
    ],
  },
  {
    key: 'render', name: 'Render', description: 'Cloud hosting for web apps, APIs, databases & static sites',
    category: 'Developer', icon: RenderIcon, rating: 4.5, installs: '35K+', free: true,
    docsUrl: 'https://render.com/docs',
    configFields: [
      { key: 'render_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'rnd_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Render', description: 'Go to render.com and create an account.' },
      { step: 2, title: 'Create API key', description: 'Account Settings → API Keys → Create.' },
      { step: 3, title: 'Enter above', description: 'Paste key to manage Render services.' },
    ],
  },
  {
    key: 'cloudflare', name: 'Cloudflare', description: 'CDN, DNS, Workers & security for websites',
    category: 'Developer', icon: CloudflareIcon, rating: 4.8, installs: '120K+', free: true,
    docsUrl: 'https://developers.cloudflare.com/',
    configFields: [
      { key: 'cloudflare_api_token', label: 'API Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'cloudflare_zone_id', label: 'Zone ID', type: 'custom' as const, placeholder: 'xxxxxxxx', required: false },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Cloudflare', description: 'Go to dash.cloudflare.com and sign in.' },
      { step: 2, title: 'Create API token', description: 'Profile → API Tokens → Create Token.' },
      { step: 3, title: 'Enter above', description: 'Paste token and optional Zone ID.' },
    ],
  },
  {
    key: 'digitalocean', name: 'DigitalOcean', description: 'Cloud infrastructure — Droplets, App Platform & databases',
    category: 'Developer', icon: DigitalOceanIcon, rating: 4.6, installs: '55K+', free: false, price: 0,
    docsUrl: 'https://docs.digitalocean.com/',
    configFields: [
      { key: 'do_api_token', label: 'API Token', type: 'token' as const, placeholder: 'dop_v1_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to DigitalOcean', description: 'Go to cloud.digitalocean.com.' },
      { step: 2, title: 'Generate token', description: 'API → Tokens → Generate New Token.' },
      { step: 3, title: 'Enter above', description: 'Paste token to manage DO resources.' },
    ],
  },
  {
    key: 'deno', name: 'Deno Deploy', description: 'Edge-first serverless platform for TypeScript',
    category: 'Developer', icon: DenoIcon, rating: 4.5, installs: '20K+', free: true,
    docsUrl: 'https://deno.com/deploy/docs',
    configFields: [
      { key: 'deno_deploy_token', label: 'Access Token', type: 'token' as const, placeholder: 'ddp_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Deno Deploy', description: 'Go to dash.deno.com and register.' },
      { step: 2, title: 'Create access token', description: 'Account Settings → Access Tokens → New.' },
      { step: 3, title: 'Enter above', description: 'Paste token to deploy edge functions.' },
    ],
  },

  // ── NEW: CMS ──
  {
    key: 'wordpress', name: 'WordPress', description: 'World\'s most popular CMS — headless or traditional',
    category: 'CMS', icon: WordPressIcon, rating: 4.7, installs: '200K+', free: true,
    docsUrl: 'https://developer.wordpress.org/rest-api/',
    configFields: [
      { key: 'wp_site_url', label: 'Site URL', type: 'custom' as const, placeholder: 'https://your-site.com', required: true },
      { key: 'wp_app_password', label: 'Application Password', type: 'token' as const, placeholder: 'xxxx xxxx xxxx xxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to WordPress Admin', description: 'Navigate to your WordPress admin panel.' },
      { step: 2, title: 'Create app password', description: 'Users → Profile → Application Passwords → Add New.' },
      { step: 3, title: 'Enter above', description: 'Paste site URL and app password.' },
    ],
  },
  {
    key: 'ghost', name: 'Ghost', description: 'Modern publishing platform — blogs, newsletters & memberships',
    category: 'CMS', icon: GhostIcon, rating: 4.6, installs: '25K+', free: true,
    docsUrl: 'https://ghost.org/docs/content-api/',
    configFields: [
      { key: 'ghost_url', label: 'Ghost URL', type: 'custom' as const, placeholder: 'https://your-site.ghost.io', required: true },
      { key: 'ghost_content_key', label: 'Content API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Go to Ghost Admin', description: 'Navigate to your Ghost admin panel.' },
      { step: 2, title: 'Create integration', description: 'Settings → Integrations → Add Custom Integration.' },
      { step: 3, title: 'Enter above', description: 'Paste Ghost URL and Content API Key.' },
    ],
  },
  {
    key: 'strapi', name: 'Strapi', description: 'Open-source headless CMS — customizable & self-hosted',
    category: 'CMS', icon: StrapiIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://docs.strapi.io/',
    configFields: [
      { key: 'strapi_url', label: 'Strapi URL', type: 'custom' as const, placeholder: 'https://your-strapi.com', required: true },
      { key: 'strapi_api_token', label: 'API Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Deploy Strapi', description: 'Set up Strapi locally or on a cloud provider.' },
      { step: 2, title: 'Create API token', description: 'Settings → API Tokens → Create new API Token.' },
      { step: 3, title: 'Enter above', description: 'Paste Strapi URL and API token.' },
    ],
  },

  // ── NEW: Auth ──
  {
    key: 'auth0', name: 'Auth0', description: 'Authentication & authorization platform — SSO, MFA & social login',
    category: 'Security', icon: Auth0Icon, rating: 4.7, installs: '80K+', free: true,
    docsUrl: 'https://auth0.com/docs',
    configFields: [
      { key: 'auth0_domain', label: 'Domain', type: 'custom' as const, placeholder: 'your-tenant.auth0.com', required: true },
      { key: 'auth0_client_id', label: 'Client ID', type: 'client_id' as const, placeholder: 'xxxxx', required: true },
      { key: 'auth0_client_secret', label: 'Client Secret', type: 'client_secret' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create Auth0 account', description: 'Go to auth0.com and sign up.' },
      { step: 2, title: 'Create an application', description: 'Applications → Create Application → Single Page App.' },
      { step: 3, title: 'Enter above', description: 'Paste Domain, Client ID, and Secret.' },
    ],
  },
  {
    key: 'clerk', name: 'Clerk', description: 'Drop-in authentication — sign-up, sign-in & user management',
    category: 'Security', icon: ClerkIcon, rating: 4.8, installs: '70K+', free: true,
    docsUrl: 'https://clerk.com/docs',
    configFields: [
      { key: 'clerk_publishable_key', label: 'Publishable Key', type: 'api_key' as const, placeholder: 'pk_live_xxxxx', required: true },
      { key: 'clerk_secret_key', label: 'Secret Key', type: 'api_key' as const, placeholder: 'sk_live_xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create Clerk account', description: 'Go to clerk.com and sign up.' },
      { step: 2, title: 'Create an application', description: 'Dashboard → Create Application.' },
      { step: 3, title: 'Enter above', description: 'Paste Publishable Key and Secret Key.' },
    ],
  },

  // ── NEW: Search & Vector DB ──
  {
    key: 'algolia', name: 'Algolia', description: 'Lightning-fast search & discovery API',
    category: 'Developer', icon: AlgoliaIcon, rating: 4.7, installs: '60K+', free: true,
    docsUrl: 'https://www.algolia.com/doc/',
    configFields: [
      { key: 'algolia_app_id', label: 'Application ID', type: 'custom' as const, placeholder: 'XXXXXXXXXX', required: true },
      { key: 'algolia_search_key', label: 'Search-Only API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true },
      { key: 'algolia_admin_key', label: 'Admin API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: false, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Algolia', description: 'Go to algolia.com and create an account.' },
      { step: 2, title: 'Get API keys', description: 'Settings → API Keys → copy keys.' },
      { step: 3, title: 'Enter above', description: 'Paste Application ID and API keys.' },
    ],
  },
  {
    key: 'pinecone', name: 'Pinecone', description: 'Vector database for AI applications — similarity search at scale',
    category: 'AI', icon: PineconeIcon, rating: 4.6, installs: '40K+', free: true,
    docsUrl: 'https://docs.pinecone.io/',
    configFields: [
      { key: 'pinecone_api_key', label: 'API Key', type: 'api_key' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'pinecone_environment', label: 'Environment', type: 'custom' as const, placeholder: 'us-east-1-aws', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Pinecone', description: 'Go to pinecone.io and create an account.' },
      { step: 2, title: 'Get API key', description: 'Console → API Keys.' },
      { step: 3, title: 'Enter above', description: 'Paste API key and environment.' },
    ],
  },

  // ── NEW: Monitoring ──
  {
    key: 'sentry', name: 'Sentry', description: 'Error tracking, performance monitoring & crash reporting',
    category: 'Developer', icon: SentryIcon, rating: 4.7, installs: '90K+', free: true,
    docsUrl: 'https://docs.sentry.io/',
    configFields: [
      { key: 'sentry_dsn', label: 'DSN', type: 'custom' as const, placeholder: 'https://xxxxx@o123.ingest.sentry.io/456', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Create Sentry account', description: 'Go to sentry.io and sign up.' },
      { step: 2, title: 'Create a project', description: 'Settings → Projects → Create Project → JavaScript/React.' },
      { step: 3, title: 'Get DSN', description: 'Project Settings → Client Keys (DSN) → copy DSN.' },
    ],
  },
  {
    key: 'posthog', name: 'PostHog', description: 'Product analytics, feature flags, session replay & A/B testing',
    category: 'Analytics', icon: PostHogIcon, rating: 4.7, installs: '45K+', free: true,
    docsUrl: 'https://posthog.com/docs',
    configFields: [
      { key: 'posthog_api_key', label: 'Project API Key', type: 'api_key' as const, placeholder: 'phc_xxxxx', required: true },
      { key: 'posthog_host', label: 'Host', type: 'custom' as const, placeholder: 'https://app.posthog.com', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at PostHog', description: 'Go to posthog.com and create an account.' },
      { step: 2, title: 'Get API key', description: 'Project Settings → Project API Key.' },
      { step: 3, title: 'Enter above', description: 'Paste API key and host URL.' },
    ],
  },
  {
    key: 'plausible', name: 'Plausible Analytics', description: 'Privacy-friendly, lightweight web analytics — no cookies',
    category: 'Analytics', icon: PlausibleIcon, rating: 4.6, installs: '30K+', free: false, price: 9,
    docsUrl: 'https://plausible.io/docs',
    configFields: [
      { key: 'plausible_domain', label: 'Domain', type: 'custom' as const, placeholder: 'your-site.com', required: true },
      { key: 'plausible_api_key', label: 'API Key (optional)', type: 'api_key' as const, placeholder: 'xxxxx', required: false, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Plausible', description: 'Go to plausible.io and create an account.' },
      { step: 2, title: 'Add your site', description: 'Add your website domain.' },
      { step: 3, title: 'Enter above', description: 'Paste your domain and optional API key.' },
    ],
  },

  // ── NEW: Databases ──
  {
    key: 'upstash', name: 'Upstash', description: 'Serverless Redis & Kafka — low-latency data at the edge',
    category: 'Backend', icon: UpstashIcon, rating: 4.6, installs: '30K+', free: true,
    docsUrl: 'https://upstash.com/docs',
    configFields: [
      { key: 'upstash_redis_url', label: 'Redis REST URL', type: 'custom' as const, placeholder: 'https://xxxxx.upstash.io', required: true },
      { key: 'upstash_redis_token', label: 'Redis REST Token', type: 'token' as const, placeholder: 'AXxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Upstash', description: 'Go to upstash.com and register.' },
      { step: 2, title: 'Create a database', description: 'Console → Create Database → copy REST URL and Token.' },
      { step: 3, title: 'Enter above', description: 'Paste Redis REST URL and Token.' },
    ],
  },
  {
    key: 'neon', name: 'Neon', description: 'Serverless Postgres — branching, autoscaling & bottomless storage',
    category: 'Backend', icon: NeonIcon, rating: 4.7, installs: '35K+', free: true,
    docsUrl: 'https://neon.tech/docs',
    configFields: [
      { key: 'neon_connection_string', label: 'Connection String', type: 'custom' as const, placeholder: 'postgresql://user:pass@xxxxx.neon.tech/db', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Neon', description: 'Go to neon.tech and create an account.' },
      { step: 2, title: 'Create a project', description: 'Console → New Project → copy connection string.' },
      { step: 3, title: 'Enter above', description: 'Paste your Postgres connection string.' },
    ],
  },
  {
    key: 'turso', name: 'Turso', description: 'Edge-hosted SQLite database — low-latency reads worldwide',
    category: 'Backend', icon: TursoIcon, rating: 4.5, installs: '15K+', free: true,
    docsUrl: 'https://docs.turso.tech/',
    configFields: [
      { key: 'turso_db_url', label: 'Database URL', type: 'custom' as const, placeholder: 'libsql://xxxxx.turso.io', required: true },
      { key: 'turso_auth_token', label: 'Auth Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Sign up at Turso', description: 'Go to turso.tech and register.' },
      { step: 2, title: 'Create a database', description: 'turso db create mydb → turso db tokens create mydb.' },
      { step: 3, title: 'Enter above', description: 'Paste Database URL and Auth Token.' },
    ],
  },

  // ── NEW: Design Tools ──
  {
    key: 'framer', name: 'Framer', description: 'Design & publish production websites with animations',
    category: 'Design', icon: FramerIcon, rating: 4.6, installs: '50K+', free: true,
    docsUrl: 'https://www.framer.com/developers/',
    configFields: [
      { key: 'framer_api_token', label: 'API Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Framer', description: 'Go to framer.com and sign in.' },
      { step: 2, title: 'Get API access', description: 'Check developer settings for API token.' },
      { step: 3, title: 'Enter above', description: 'Paste token to integrate Framer.' },
    ],
  },
  {
    key: 'webflow', name: 'Webflow', description: 'Visual website builder with CMS & hosting',
    category: 'Design', icon: WebflowIcon, rating: 4.6, installs: '55K+', free: false, price: 14,
    docsUrl: 'https://developers.webflow.com/',
    configFields: [
      { key: 'webflow_api_token', label: 'API Token', type: 'token' as const, placeholder: 'xxxxx', required: true, secret: true },
      { key: 'webflow_site_id', label: 'Site ID', type: 'site_id' as const, placeholder: 'xxxxx', required: true },
    ],
    setupSteps: [
      { step: 1, title: 'Log in to Webflow', description: 'Go to webflow.com and sign in.' },
      { step: 2, title: 'Create API token', description: 'Account Settings → Integrations → API Access.' },
      { step: 3, title: 'Enter above', description: 'Paste API token and Site ID.' },
    ],
  },
];

const CATEGORIES = [
  'All', 'AI', 'Backend', 'eCommerce', 'Developer', 'Design', 'Productivity',
  'Communication', 'Analytics', 'Marketing', 'Media', 'CMS', 'Automation',
  'Project Management', 'Social', 'Travel', 'Security', 'Scheduling', 'Utilities',
];

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
    setSaved(true);
    toast.success(`${app.name} configuration saved!`);
  };

  const AppIcon = app.icon;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <button onClick={onBack} className="p-1 rounded hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <AppIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold truncate">{app.name}</h3>
          <p className="text-[10px] opacity-50">{app.category}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 mx-3 mt-3 rounded-lg" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
          <p className="text-[11px] leading-relaxed opacity-70">{app.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" style={{ color: 'hsl(var(--warning, 45 93% 47%))' }} />
              <span className="text-[10px] font-medium">{app.rating}</span>
            </div>
            <span className="text-[10px] opacity-40">{app.installs} installs</span>
            <span className="text-[10px] font-medium" style={{ color: app.free ? 'hsl(var(--success))' : 'hsl(var(--primary))' }}>
              {app.free ? 'Free' : app.price === 0 ? 'Pay-as-you-go' : `$${app.price}/mo`}
            </span>
          </div>
        </div>

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

          <div className="flex items-start gap-2 mt-3 p-2 rounded-lg" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
            <p className="text-[9px] leading-relaxed opacity-60">
              Secret keys are stored securely and never exposed in client-side code.
            </p>
          </div>

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
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.category.toLowerCase().includes(search.toLowerCase()) && !a.description.toLowerCase().includes(search.toLowerCase())) return false;
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
            {APP_CATALOG.slice(0, 8).map(app => {
              const AppIcon = app.icon;
              return (
                <button key={app.key} onClick={() => setSelectedApp(app.key)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-colors hover:bg-muted/30"
                  style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                    <AppIcon className="w-5 h-5" />
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

      <div className="flex p-2 gap-1 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {(['browse', 'installed'] as const).map(view => (
          <button key={view} onClick={() => setActiveView(view)}
            className={`flex-1 py-1.5 rounded text-[10px] font-medium transition-colors ${activeView === view ? '' : 'opacity-50 hover:opacity-80'}`}
            style={activeView === view ? { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } : undefined}>
            {view === 'browse' ? `Browse (${APP_CATALOG.length})` : `Installed (${installedApps.length})`}
          </button>
        ))}
      </div>

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

      {isLoading ? (
        <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
      ) : (
        <div className="space-y-1 p-2">
          {filtered.map(app => {
            const AppIcon = app.icon;
            const installed = installedKeys.has(app.key);
            return (
              <div key={app.key}
                className="p-3 rounded-lg transition-colors hover:bg-muted/30 cursor-pointer group"
                style={{ background: 'hsl(var(--builder-component-bg))' }}
                onClick={() => setSelectedApp(app.key)}>
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
                    <AppIcon className="w-5 h-5" />
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
                        {app.free ? 'Free' : app.price === 0 ? 'Pay-as-you-go' : `$${app.price}/mo`}
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
