import { useState } from 'react';
import {
  X, Languages, Plus, Trash2, Edit3, Check, Search, Globe,
  ChevronRight, Copy, Download, Upload, Flag, Eye, Settings,
  ArrowRight, AlertCircle, CheckCircle2, Clock, RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface MultiLanguagePanelProps {
  onClose?: () => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  enabled: boolean;
  progress: number;
  isDefault?: boolean;
  rtl?: boolean;
}

const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', enabled: true, progress: 100, isDefault: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enabled: false, progress: 0 },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enabled: false, progress: 0 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enabled: false, progress: 0 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', enabled: false, progress: 0 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', enabled: false, progress: 0 },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', enabled: false, progress: 0 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', enabled: false, progress: 0 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', enabled: false, progress: 0 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', enabled: false, progress: 0, rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', enabled: false, progress: 0 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', enabled: false, progress: 0 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', enabled: false, progress: 0 },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', enabled: false, progress: 0 },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', enabled: false, progress: 0 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', enabled: false, progress: 0 },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', enabled: false, progress: 0 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', enabled: false, progress: 0 },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', enabled: false, progress: 0, rtl: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', enabled: false, progress: 0 },
];

const MultiLanguagePanel = ({ onClose }: MultiLanguagePanelProps) => {
  const [activeTab, setActiveTab] = useState<'languages' | 'translate' | 'settings'>('languages');
  const [languages, setLanguages] = useState<Language[]>(AVAILABLE_LANGUAGES);
  const [search, setSearch] = useState('');
  const [editingLang, setEditingLang] = useState<string | null>(null);

  const enabledLanguages = languages.filter(l => l.enabled);
  const disabledLanguages = languages.filter(l => !l.enabled);

  const toggleLanguage = (code: string) => {
    setLanguages(prev => prev.map(l =>
      l.code === code ? { ...l, enabled: !l.enabled } : l
    ));
    const lang = languages.find(l => l.code === code);
    if (lang) {
      toast.success(lang.enabled ? `Disabled ${lang.name}` : `Enabled ${lang.name}`);
    }
  };

  const filteredDisabled = disabledLanguages.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  // Sample translatable strings
  const SAMPLE_STRINGS = [
    { key: 'nav.home', en: 'Home', desc: 'Navigation' },
    { key: 'nav.about', en: 'About', desc: 'Navigation' },
    { key: 'nav.contact', en: 'Contact', desc: 'Navigation' },
    { key: 'hero.title', en: 'Welcome to our website', desc: 'Hero Section' },
    { key: 'hero.subtitle', en: 'Build something amazing', desc: 'Hero Section' },
    { key: 'cta.button', en: 'Get Started', desc: 'Call to Action' },
    { key: 'footer.copyright', en: '© 2026 All rights reserved', desc: 'Footer' },
    { key: 'form.submit', en: 'Submit', desc: 'Forms' },
    { key: 'form.email', en: 'Email address', desc: 'Forms' },
    { key: 'form.name', en: 'Full name', desc: 'Forms' },
  ];

  const tabs = [
    { id: 'languages' as const, label: 'Languages' },
    { id: 'translate' as const, label: 'Translate' },
    { id: 'settings' as const, label: 'Settings' },
  ];

  return (
    <div className="builder-flyout-panel" style={{ width: 320 }}>
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>Multilingual</span>
          <Badge variant="secondary" className="text-[10px]">{enabledLanguages.length} active</Badge>
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
        {/* Languages Tab */}
        {activeTab === 'languages' && (
          <div className="p-3 space-y-3">
            <p className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Active languages on your site</p>

            {enabledLanguages.map(lang => (
              <div key={lang.code} className="flex items-center gap-2 p-2.5 rounded-lg border" style={{ borderColor: lang.isDefault ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))', background: lang.isDefault ? 'hsl(var(--primary) / 0.05)' : 'transparent' }}>
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{lang.name}</span>
                    {lang.isDefault && <Badge variant="secondary" className="text-[9px] px-1">Default</Badge>}
                    {lang.rtl && <Badge variant="outline" className="text-[9px] px-1">RTL</Badge>}
                  </div>
                  <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{lang.nativeName} · {lang.progress}% translated</div>
                </div>
                <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
                  <div className="h-full rounded-full" style={{ width: `${lang.progress}%`, background: lang.progress === 100 ? 'hsl(142 70% 45%)' : 'hsl(var(--primary))' }} />
                </div>
                {!lang.isDefault && (
                  <button onClick={() => toggleLanguage(lang.code)} className="p-1 rounded hover:bg-destructive/10">
                    <Trash2 className="w-3 h-3" style={{ color: 'hsl(var(--destructive))' }} />
                  </button>
                )}
              </div>
            ))}

            <div className="pt-2">
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>Add Languages</h4>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search languages..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                />
              </div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {filteredDisabled.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-xs flex-1 text-left" style={{ color: 'hsl(var(--foreground))' }}>{lang.name}</span>
                    <span className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{lang.nativeName}</span>
                    <Plus className="w-3 h-3" style={{ color: 'hsl(var(--primary))' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Translate Tab */}
        {activeTab === 'translate' && (
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <select className="flex-1 px-2 py-1.5 text-xs rounded-lg border" style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                {enabledLanguages.filter(l => !l.isDefault).map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
              <button className="px-3 py-1.5 text-xs rounded-lg font-medium flex items-center gap-1" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                <RefreshCw className="w-3 h-3" />
                Auto-translate
              </button>
            </div>

            {enabledLanguages.filter(l => !l.isDefault).length === 0 ? (
              <div className="text-center py-8">
                <Globe className="w-10 h-10 mx-auto mb-2" style={{ color: 'hsl(var(--muted-foreground))' }} />
                <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Add a language first to start translating</p>
              </div>
            ) : (
              <div className="space-y-1">
                {SAMPLE_STRINGS.map(str => (
                  <div key={str.key} className="p-2 rounded-lg border" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>{str.key}</span>
                      <Badge variant="secondary" className="text-[9px]">{str.desc}</Badge>
                    </div>
                    <div className="text-xs mb-1" style={{ color: 'hsl(var(--foreground))' }}>🇺🇸 {str.en}</div>
                    <input
                      placeholder="Translation..."
                      className="w-full px-2 py-1 text-xs rounded border"
                      style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-3 space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Language Switcher</h4>
              {[
                { label: 'Show Language Switcher', desc: 'Display language selector on site' },
                { label: 'Show Flags', desc: 'Display country flags in switcher' },
                { label: 'Auto-detect Language', desc: 'Based on browser settings' },
                { label: 'URL Structure', desc: '/en/, /es/, /fr/ prefixes' },
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

            <div className="space-y-2">
              <h4 className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Import / Export</h4>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg border hover:bg-accent/10"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  onClick={() => toast.info('Export translations as JSON')}>
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg border hover:bg-accent/10"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  onClick={() => toast.info('Import translations from JSON')}>
                  <Upload className="w-3.5 h-3.5" /> Import
                </button>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MultiLanguagePanel;
