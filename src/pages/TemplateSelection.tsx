import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { Code2, ArrowLeft, Search, LayoutGrid, Loader2, Cloud, HardDrive, Upload, Eye, X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useTemplates, useIncrementTemplateInstalls, useCreateTemplate } from '@/hooks/useTemplates';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import RecursiveRenderer from '@/engine/renderer/RecursiveRenderer';

import type { Template, DeviceView } from '@/types/builder';

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'starter', label: 'Starter' },
  { id: 'business', label: 'Business' },
  { id: 'creative', label: 'Creative' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'commerce', label: 'E-commerce' },
  { id: 'content', label: 'Content' },
  { id: 'tech', label: 'Tech' },
  { id: 'food', label: 'Food & Drink' },
  { id: 'social', label: 'Social' },
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const setSchema = useBuilderStore((s) => s.setSchema);
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [source, setSource] = useState<'cloud' | 'local'>('cloud');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewDevice, setPreviewDevice] = useState<DeviceView>('desktop');

  // Cloud templates from Supabase
  const { data: cloudTemplates = [], isLoading: cloudLoading } = useTemplates(
    activeCategory !== 'all' ? activeCategory : undefined
  );
  const incrementInstalls = useIncrementTemplateInstalls();

  // Local templates (fallback / built-in)
  const [localTemplates, setLocalTemplates] = useState<Template[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (source === 'local' && localTemplates.length === 0) {
      setLocalLoading(true);
      import('@/data/templates').then((mod) => {
        setLocalTemplates(mod.templates);
        setLocalLoading(false);
      });
    }
  }, [source, localTemplates.length]);

  const templates = source === 'cloud' ? cloudTemplates : localTemplates;
  const loading = source === 'cloud' ? cloudLoading : localLoading;

  const filtered = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (template: Template) => {
    setSchema(JSON.parse(JSON.stringify(template.schema)));
    // Increment install count for cloud templates
    if (source === 'cloud') {
      incrementInstalls.mutate(template.id);
    }
    navigate('/builder/local');
  };

  // Upload local template to cloud
  const createTemplate = useCreateTemplate();
  const handleUploadToCloud = async (template: Template) => {
    if (!user) {
      toast.error('Please sign in to upload templates to cloud.');
      return;
    }
    try {
      await createTemplate.mutateAsync({
        name: template.name,
        description: template.description,
        category: template.category,
        thumbnail: template.thumbnail,
        schema: template.schema,
        is_public: true,
        tags: [],
      });
      toast.success(`"${template.name}" uploaded to cloud!`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}>
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">DevBuilder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Source toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-muted">
              <button
                onClick={() => setSource('cloud')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  source === 'cloud' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Cloud className="w-3.5 h-3.5" />
                Cloud
              </button>
              <button
                onClick={() => setSource('local')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  source === 'local' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                Built-in
              </button>
            </div>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Choose Your <span className="text-gradient">Template</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {source === 'cloud'
              ? 'Browse community templates stored in the cloud. Pick one and make it yours.'
              : 'Built-in templates bundled with the app. Upload them to cloud for everyone to use.'}
          </p>
        </div>

        {/* Mobile source toggle */}
        <div className="flex sm:hidden items-center gap-1 p-1 rounded-xl bg-muted mb-6 mx-auto w-fit">
          <button
            onClick={() => setSource('cloud')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              source === 'cloud' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" /> Cloud
          </button>
          <button
            onClick={() => setSource('local')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              source === 'local' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" /> Built-in
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              style={activeCategory === cat.id ? { background: 'var(--gradient-primary)' } : undefined}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Info banner for cloud */}
        {source === 'cloud' && cloudTemplates.length === 0 && !cloudLoading && (
          <div className="text-center py-10 mb-6 rounded-2xl border border-dashed border-border bg-muted/30">
            <Cloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
            <h3 className="font-semibold mb-1">No cloud templates yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
              Switch to "Built-in" to use bundled templates, or upload them to cloud so everyone can use them.
            </p>
            <button
              onClick={() => setSource('local')}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Browse Built-in Templates
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 && (source === 'local' || cloudTemplates.length > 0) ? (
          <div className="text-center py-20 text-muted-foreground">
            <LayoutGrid className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No templates match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
            {filtered.map((template) => (
              <div key={template.id} className="template-card text-left group relative">
                <button
                  onClick={() => handleSelect(template)}
                  className="w-full text-left"
                >
                  <div className="h-44 flex items-center justify-center text-6xl bg-muted/30 group-hover:bg-muted/50 transition-colors relative overflow-hidden">
                    <span className="relative z-10">{template.thumbnail}</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-foreground/5">
                      <div className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: 'var(--gradient-primary)' }}>
                        Use Template
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{template.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider font-medium">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                </button>

                {/* Upload to cloud button (only for local templates) */}
                {source === 'local' && user && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUploadToCloud(template); }}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    title="Upload to Cloud"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelection;
