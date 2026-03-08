import { useState } from 'react';
import {
  Sparkles, X, Wand2, Type, Image, Search, Palette, PenTool,
  FileText, Zap, Loader2, Copy, Check, RefreshCw, Globe,
  Code, Languages, MessageSquare, Lightbulb, Bot, Mail,
  Megaphone, ShoppingBag, FileCode, Bug, BookOpen, Pen,
  Video, Music, Mic, Camera, ImagePlus, Eraser, Layers,
  Hash, AtSign, BarChart3, TrendingUp, Users, Target,
  Briefcase, GraduationCap, Heart, Star, Award, Shield,
  ChevronRight, ChevronDown, ArrowLeft, Play, Pause,
  Volume2, Headphones, Brain, Cpu, Workflow, GitBranch,
  Terminal, Database, Layout, Grid, Boxes, Component,
  Smartphone, Monitor, Tablet, Scissors, Crop, Blend,
  Contrast, Sun, Moon, Droplet, Feather, PencilLine,
} from 'lucide-react';

interface AIToolsPanelProps {
  onClose?: () => void;
}

/* ── AI Tool Definition ── */
interface AITool {
  id: string;
  name: string;
  description: string;
  icon: typeof Sparkles;
  category: string;
  tags: string[];
  comingSoon?: boolean;
}

/* ── Category Definition ── */
interface Category {
  id: string;
  name: string;
  icon: typeof Sparkles;
  description: string;
  color: string;
}

const categories: Category[] = [
  { id: 'content', name: 'Content Writing', icon: Pen, description: 'Generate text, copy, and content', color: '210 100% 50%' },
  { id: 'image', name: 'Image Generation', icon: ImagePlus, description: 'Create and edit images with AI', color: '280 70% 55%' },
  { id: 'seo', name: 'SEO & Marketing', icon: TrendingUp, description: 'Optimize for search and conversions', color: '142 70% 45%' },
  { id: 'code', name: 'Code Assistant', icon: Code, description: 'Generate and debug code', color: '45 93% 47%' },
  { id: 'design', name: 'Design & Style', icon: Palette, description: 'Colors, fonts, and layouts', color: '320 70% 55%' },
  { id: 'translate', name: 'Translation', icon: Languages, description: 'Translate to 50+ languages', color: '190 80% 45%' },
  { id: 'chat', name: 'AI Chat & Support', icon: MessageSquare, description: 'Chatbots and assistants', color: '350 70% 55%' },
  { id: 'audio', name: 'Audio & Voice', icon: Mic, description: 'Text-to-speech and transcription', color: '30 90% 50%' },
];

const aiTools: AITool[] = [
  // Content Writing
  { id: 'text-paragraph', name: 'Paragraph Writer', description: 'Generate engaging paragraphs for any topic', icon: FileText, category: 'content', tags: ['text', 'blog', 'article'] },
  { id: 'text-headline', name: 'Headline Generator', description: 'Create attention-grabbing headlines', icon: Type, category: 'content', tags: ['title', 'heading', 'hook'] },
  { id: 'text-cta', name: 'CTA Generator', description: 'Write compelling call-to-action buttons', icon: Zap, category: 'content', tags: ['button', 'conversion'] },
  { id: 'text-tagline', name: 'Tagline Creator', description: 'Craft memorable brand taglines', icon: Star, category: 'content', tags: ['slogan', 'brand'] },
  { id: 'text-product', name: 'Product Description', description: 'Write persuasive product copy', icon: ShoppingBag, category: 'content', tags: ['ecommerce', 'sales'] },
  { id: 'text-blog', name: 'Blog Post Writer', description: 'Generate full blog post outlines and content', icon: BookOpen, category: 'content', tags: ['article', 'long-form'] },
  { id: 'text-email', name: 'Email Composer', description: 'Write professional emails and newsletters', icon: Mail, category: 'content', tags: ['marketing', 'newsletter'] },
  { id: 'text-social', name: 'Social Media Posts', description: 'Create posts for all social platforms', icon: Hash, category: 'content', tags: ['twitter', 'instagram', 'linkedin'] },
  { id: 'text-bio', name: 'Bio Generator', description: 'Write professional bios and about sections', icon: Users, category: 'content', tags: ['about', 'profile'] },
  { id: 'text-faq', name: 'FAQ Generator', description: 'Generate FAQs from your content', icon: Lightbulb, category: 'content', tags: ['questions', 'help'] },
  { id: 'text-testimonial', name: 'Testimonial Writer', description: 'Create realistic customer testimonials', icon: Heart, category: 'content', tags: ['review', 'social-proof'] },
  { id: 'text-rewrite', name: 'Content Rewriter', description: 'Rewrite and improve existing text', icon: RefreshCw, category: 'content', tags: ['paraphrase', 'improve'] },

  // Image Generation
  { id: 'image-generate', name: 'Image Generator', description: 'Create images from text descriptions', icon: ImagePlus, category: 'image', tags: ['create', 'generate'] },
  { id: 'image-edit', name: 'Image Editor', description: 'Edit and modify existing images with AI', icon: PencilLine, category: 'image', tags: ['modify', 'enhance'] },
  { id: 'image-background', name: 'Background Remover', description: 'Remove backgrounds from any image', icon: Eraser, category: 'image', tags: ['transparent', 'cutout'] },
  { id: 'image-upscale', name: 'Image Upscaler', description: 'Enhance image resolution up to 4x', icon: Layers, category: 'image', tags: ['quality', 'resize'] },
  { id: 'image-style', name: 'Style Transfer', description: 'Apply artistic styles to photos', icon: Blend, category: 'image', tags: ['art', 'filter'] },
  { id: 'image-face', name: 'Portrait Enhancer', description: 'Enhance and retouch portrait photos', icon: Camera, category: 'image', tags: ['portrait', 'face'] },
  { id: 'image-object', name: 'Object Removal', description: 'Remove unwanted objects from images', icon: Scissors, category: 'image', tags: ['cleanup', 'delete'] },
  { id: 'image-colorize', name: 'Photo Colorizer', description: 'Add color to black & white photos', icon: Droplet, category: 'image', tags: ['color', 'restore'] },

  // SEO & Marketing
  { id: 'seo-meta', name: 'Meta Tag Generator', description: 'Generate optimized title & description', icon: FileText, category: 'seo', tags: ['title', 'description'] },
  { id: 'seo-keywords', name: 'Keyword Research', description: 'Find high-value keywords for your niche', icon: Search, category: 'seo', tags: ['research', 'ranking'] },
  { id: 'seo-alt', name: 'Alt Text Generator', description: 'Generate descriptive alt text for images', icon: Image, category: 'seo', tags: ['accessibility', 'images'] },
  { id: 'seo-schema', name: 'Schema Markup', description: 'Generate JSON-LD structured data', icon: Code, category: 'seo', tags: ['structured-data', 'rich-snippets'] },
  { id: 'seo-analyze', name: 'Page Analyzer', description: 'Analyze and score your page SEO', icon: BarChart3, category: 'seo', tags: ['audit', 'score'] },
  { id: 'seo-competitor', name: 'Competitor Analysis', description: 'Analyze competitor SEO strategies', icon: Target, category: 'seo', tags: ['research', 'spy'], comingSoon: true },
  { id: 'marketing-ad', name: 'Ad Copy Generator', description: 'Create Google & Facebook ad copy', icon: Megaphone, category: 'seo', tags: ['ads', 'ppc'] },
  { id: 'marketing-landing', name: 'Landing Page Copy', description: 'Generate high-converting landing page text', icon: Layout, category: 'seo', tags: ['conversion', 'sales'] },

  // Code Assistant
  { id: 'code-generate', name: 'Code Generator', description: 'Generate code from natural language', icon: FileCode, category: 'code', tags: ['write', 'create'] },
  { id: 'code-explain', name: 'Code Explainer', description: 'Explain what code does in plain English', icon: BookOpen, category: 'code', tags: ['understand', 'learn'] },
  { id: 'code-debug', name: 'Bug Finder', description: 'Find and fix bugs in your code', icon: Bug, category: 'code', tags: ['fix', 'error'] },
  { id: 'code-refactor', name: 'Code Refactor', description: 'Improve and optimize existing code', icon: GitBranch, category: 'code', tags: ['improve', 'clean'] },
  { id: 'code-convert', name: 'Language Converter', description: 'Convert code between languages', icon: RefreshCw, category: 'code', tags: ['translate', 'port'] },
  { id: 'code-regex', name: 'Regex Generator', description: 'Generate regex patterns from descriptions', icon: Terminal, category: 'code', tags: ['pattern', 'match'] },
  { id: 'code-sql', name: 'SQL Generator', description: 'Generate SQL queries from natural language', icon: Database, category: 'code', tags: ['database', 'query'] },
  { id: 'code-api', name: 'API Generator', description: 'Design REST API endpoints', icon: Workflow, category: 'code', tags: ['rest', 'endpoint'], comingSoon: true },

  // Design & Style
  { id: 'design-color', name: 'Color Palette', description: 'Generate harmonious color schemes', icon: Palette, category: 'design', tags: ['colors', 'theme'] },
  { id: 'design-font', name: 'Font Pairing', description: 'Find perfect font combinations', icon: Type, category: 'design', tags: ['typography', 'fonts'] },
  { id: 'design-layout', name: 'Layout Generator', description: 'Create layouts from descriptions', icon: Grid, category: 'design', tags: ['structure', 'page'] },
  { id: 'design-logo', name: 'Logo Generator', description: 'Create logos for your brand', icon: Award, category: 'design', tags: ['brand', 'icon'] },
  { id: 'design-gradient', name: 'Gradient Maker', description: 'Generate beautiful CSS gradients', icon: Blend, category: 'design', tags: ['css', 'background'] },
  { id: 'design-icon', name: 'Icon Generator', description: 'Create custom icons from descriptions', icon: Boxes, category: 'design', tags: ['svg', 'symbol'], comingSoon: true },
  { id: 'design-responsive', name: 'Responsive Advisor', description: 'Get responsive design suggestions', icon: Smartphone, category: 'design', tags: ['mobile', 'tablet'] },
  { id: 'design-dark', name: 'Dark Mode Generator', description: 'Generate dark mode color schemes', icon: Moon, category: 'design', tags: ['theme', 'colors'] },

  // Translation
  { id: 'translate-text', name: 'Text Translator', description: 'Translate text to 50+ languages', icon: Languages, category: 'translate', tags: ['language', 'convert'] },
  { id: 'translate-website', name: 'Website Translator', description: 'Translate entire website content', icon: Globe, category: 'translate', tags: ['localize', 'i18n'] },
  { id: 'translate-localize', name: 'Localization', description: 'Adapt content for local markets', icon: Target, category: 'translate', tags: ['culture', 'regional'] },
  { id: 'translate-detect', name: 'Language Detector', description: 'Detect the language of any text', icon: Search, category: 'translate', tags: ['identify', 'recognize'] },

  // AI Chat & Support
  { id: 'chat-widget', name: 'Chat Widget', description: 'Add AI chatbot to your website', icon: MessageSquare, category: 'chat', tags: ['bot', 'support'] },
  { id: 'chat-faq', name: 'FAQ Bot', description: 'Auto-answer FAQs with AI', icon: Lightbulb, category: 'chat', tags: ['help', 'answers'] },
  { id: 'chat-lead', name: 'Lead Qualifier', description: 'Qualify leads through conversation', icon: Users, category: 'chat', tags: ['sales', 'qualify'] },
  { id: 'chat-support', name: 'Support Assistant', description: 'AI-powered customer support', icon: Shield, category: 'chat', tags: ['help', 'tickets'] },
  { id: 'chat-persona', name: 'Custom Persona', description: 'Create a custom AI personality', icon: Bot, category: 'chat', tags: ['character', 'voice'], comingSoon: true },

  // Audio & Voice
  { id: 'audio-tts', name: 'Text to Speech', description: 'Convert text to natural-sounding audio', icon: Volume2, category: 'audio', tags: ['voice', 'narration'] },
  { id: 'audio-stt', name: 'Speech to Text', description: 'Transcribe audio to text', icon: Mic, category: 'audio', tags: ['transcribe', 'dictation'] },
  { id: 'audio-clone', name: 'Voice Cloning', description: 'Clone a voice from audio samples', icon: Headphones, category: 'audio', tags: ['clone', 'custom'], comingSoon: true },
  { id: 'audio-music', name: 'Music Generator', description: 'Generate royalty-free background music', icon: Music, category: 'audio', tags: ['soundtrack', 'ambient'], comingSoon: true },
  { id: 'audio-podcast', name: 'Podcast Enhancer', description: 'Clean up and enhance podcast audio', icon: Mic, category: 'audio', tags: ['clean', 'enhance'], comingSoon: true },
];

/* ── Tool Card Component ── */
const ToolCard = ({ tool, onSelect }: { tool: AITool; onSelect: (tool: AITool) => void }) => {
  const Icon = tool.icon;
  return (
    <button
      onClick={() => !tool.comingSoon && onSelect(tool)}
      disabled={tool.comingSoon}
      className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all ${
        tool.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/30 cursor-pointer'
      }`}
      style={{ background: 'hsl(var(--builder-component-bg))' }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
        <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold truncate">{tool.name}</span>
          {tool.comingSoon && (
            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-medium shrink-0"
              style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
              Soon
            </span>
          )}
        </div>
        <p className="text-[9px] opacity-50 truncate">{tool.description}</p>
      </div>
      {!tool.comingSoon && <ChevronRight className="w-3.5 h-3.5 opacity-30 shrink-0" />}
    </button>
  );
};

/* ── Category Card Component ── */
const CategoryCard = ({ category, tools, onClick }: { category: Category; tools: AITool[]; onClick: () => void }) => {
  const Icon = category.icon;
  const availableTools = tools.filter(t => !t.comingSoon).length;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02] hover:shadow-md"
      style={{ background: `hsl(${category.color} / 0.08)`, border: `1px solid hsl(${category.color} / 0.15)` }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `hsl(${category.color} / 0.15)` }}>
        <Icon className="w-5 h-5" style={{ color: `hsl(${category.color})` }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold truncate">{category.name}</div>
        <p className="text-[10px] opacity-50">{category.description}</p>
        <div className="text-[9px] mt-0.5 font-medium" style={{ color: `hsl(${category.color})` }}>
          {availableTools} tools available
        </div>
      </div>
      <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
    </button>
  );
};

/* ── Tool Detail View ── */
const ToolDetailView = ({ tool, onBack }: { tool: AITool; onBack: () => void }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const Icon = tool.icon;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const sampleResults: Record<string, string> = {
        'text-paragraph': 'Transform your business with our cutting-edge solutions. We combine innovative technology with human-centered design to deliver experiences that captivate and convert.',
        'text-headline': '🚀 Unlock Your Full Potential with AI-Powered Solutions',
        'text-cta': 'Start Your Free Trial — No Credit Card Required',
        'text-tagline': 'Where Innovation Meets Simplicity',
        'text-product': 'Introducing our flagship product — engineered for performance, designed for beauty. Features real-time sync, AI insights, and seamless integrations.',
        'code-generate': 'function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);\n}',
        'code-explain': 'This code iterates through an array of items and calculates the total price by multiplying each item\'s price by its quantity, then summing all values.',
        'seo-meta': '<title>Best AI Website Builder 2024 | Create Stunning Sites Fast</title>\n<meta name="description" content="Build beautiful websites in minutes with AI. No coding required. Free trial available." />',
        'design-color': '🎨 Primary: #3B82F6 (Blue)\n🎨 Secondary: #10B981 (Emerald)\n🎨 Accent: #8B5CF6 (Violet)\n🎨 Background: #F8FAFC\n🎨 Text: #1E293B',
        'translate-text': 'Bonjour! Bienvenue sur notre site web. Nous sommes ravis de vous accueillir.',
      };
      setResult(sampleResults[tool.id] || `AI-generated content for "${tool.name}" based on your prompt: "${prompt}"`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <button onClick={onBack} className="p-1 rounded hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
          <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold truncate">{tool.name}</h3>
          <p className="text-[10px] opacity-50">{tool.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div>
          <label className="text-[10px] opacity-60 block mb-1.5 font-medium">Your prompt</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={`Describe what you want to ${tool.name.toLowerCase()}...`}
            className="property-input resize-y min-h-[80px] text-xs"
            rows={4}
          />
        </div>

        {/* Tool-specific options */}
        {tool.category === 'content' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Tone</label>
              <select className="property-input text-[10px]">
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="bold">Bold</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="witty">Witty</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Length</label>
              <select className="property-input text-[10px]">
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>
        )}

        {tool.category === 'image' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Style</label>
              <select className="property-input text-[10px]">
                <option value="photorealistic">Photorealistic</option>
                <option value="illustration">Illustration</option>
                <option value="3d">3D Render</option>
                <option value="watercolor">Watercolor</option>
                <option value="minimalist">Minimalist</option>
                <option value="abstract">Abstract</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] opacity-60 block mb-1">Aspect Ratio</label>
              <div className="grid grid-cols-6 gap-1">
                {['1:1', '16:9', '9:16', '4:3', '3:2', '21:9'].map(ratio => (
                  <button key={ratio} className="py-1.5 rounded text-[9px] font-medium hover:bg-muted/50 transition-colors"
                    style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tool.category === 'translate' && (
          <div>
            <label className="text-[10px] opacity-60 block mb-1">Target Language</label>
            <select className="property-input text-[10px]">
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        )}

        {tool.category === 'code' && (
          <div>
            <label className="text-[10px] opacity-60 block mb-1">Language</label>
            <select className="property-input text-[10px]">
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="react">React/JSX</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
            </select>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
          style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
        >
          {isGenerating ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...</>
          ) : (
            <><Wand2 className="w-3.5 h-3.5" /> Generate</>
          )}
        </button>

        {result && (
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium opacity-60">Generated Result</span>
              <div className="flex gap-1">
                <button onClick={handleGenerate} className="p-1 rounded hover:bg-muted transition-colors" title="Regenerate">
                  <RefreshCw className="w-3 h-3" />
                </button>
                <button onClick={handleCopy} className="p-1 rounded hover:bg-muted transition-colors" title="Copy">
                  {copied ? <Check className="w-3 h-3" style={{ color: 'hsl(var(--success))' }} /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
            <div className={`text-xs leading-relaxed ${tool.category === 'code' ? 'font-mono text-[10px] whitespace-pre-wrap' : ''}`}>
              {result}
            </div>
          </div>
        )}

        {/* Quick tips */}
        <div className="p-2.5 rounded-lg" style={{ background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Lightbulb className="w-3 h-3" style={{ color: 'hsl(var(--primary))' }} />
            <span className="text-[10px] font-semibold">Tips for better results</span>
          </div>
          <ul className="text-[9px] opacity-60 space-y-0.5 ml-4.5 list-disc list-inside">
            <li>Be specific and detailed in your prompt</li>
            <li>Include context about your brand or audience</li>
            <li>Iterate and refine your prompts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ── Main Panel ── */
const AIToolsPanel = ({ onClose }: AIToolsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Filter tools by search
  const filteredTools = aiTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get tools for selected category
  const categoryTools = selectedCategory
    ? aiTools.filter(t => t.category === selectedCategory)
    : [];

  // Tool detail view
  if (selectedTool) {
    return (
      <div className="builder-flyout overflow-hidden flex flex-col">
        <ToolDetailView tool={selectedTool} onBack={() => setSelectedTool(null)} />
      </div>
    );
  }

  // Category view
  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory)!;
    const CategoryIcon = category.icon;
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <button onClick={() => setSelectedCategory(null)} className="p-1 rounded hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `hsl(${category.color} / 0.15)` }}>
            <CategoryIcon className="w-3.5 h-3.5" style={{ color: `hsl(${category.color})` }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold truncate">{category.name}</h3>
            <p className="text-[10px] opacity-50">{categoryTools.length} tools</p>
          </div>
        </div>

        <div className="p-2 space-y-1">
          {categoryTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={setSelectedTool} />
          ))}
        </div>
      </div>
    );
  }

  // Main view (categories + search)
  return (
    <div className="builder-flyout overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">AI Tools</h2>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(280 70% 60%))', color: 'white' }}>
            {aiTools.filter(t => !t.comingSoon).length} tools
          </span>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Search */}
      <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search AI tools..."
            className="property-input pl-8 text-xs"
          />
        </div>
      </div>

      {/* Search results */}
      {searchQuery && (
        <div className="p-2">
          <div className="text-[10px] opacity-40 px-2 mb-2">
            {filteredTools.length} results for "{searchQuery}"
          </div>
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} onSelect={setSelectedTool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 opacity-40">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">No tools found</p>
            </div>
          )}
        </div>
      )}

      {/* Categories grid */}
      {!searchQuery && (
        <div className="p-3 space-y-2">
          <div className="text-[10px] opacity-40 font-medium uppercase tracking-wider mb-2">Categories</div>
          {categories.map(category => {
            const tools = aiTools.filter(t => t.category === category.id);
            return (
              <CategoryCard
                key={category.id}
                category={category}
                tools={tools}
                onClick={() => setSelectedCategory(category.id)}
              />
            );
          })}
        </div>
      )}

      {/* Popular tools quick access */}
      {!searchQuery && (
        <div className="p-3 pt-0">
          <div className="text-[10px] opacity-40 font-medium uppercase tracking-wider mb-2">Popular Tools</div>
          <div className="space-y-1">
            {aiTools.filter(t => ['text-paragraph', 'image-generate', 'code-generate', 'seo-meta', 'translate-text'].includes(t.id)).map(tool => (
              <ToolCard key={tool.id} tool={tool} onSelect={setSelectedTool} />
            ))}
          </div>
        </div>
      )}

      {/* Coming soon banner */}
      {!searchQuery && (
        <div className="mx-3 mb-3 p-3 rounded-xl text-center"
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(280 70% 55% / 0.1))', border: '1px solid hsl(var(--primary) / 0.15)' }}>
          <Brain className="w-6 h-6 mx-auto mb-1.5" style={{ color: 'hsl(var(--primary))' }} />
          <p className="text-[11px] font-semibold mb-0.5">More AI features coming soon!</p>
          <p className="text-[9px] opacity-50">Voice cloning, video generation, and more</p>
        </div>
      )}
    </div>
  );
};

export default AIToolsPanel;
