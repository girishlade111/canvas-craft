import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { Code2, ArrowLeft, Search, Layers, Grid3X3, LayoutGrid, Loader2 } from 'lucide-react';

import type { Template } from '@/data/templates';

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
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  // Lazy-load templates data only when this page is visited
  useEffect(() => {
    import('@/data/templates').then((mod) => {
      setTemplates(mod.templates);
      setLoading(false);
    });
  }, []);

  const filtered = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSchema(JSON.parse(JSON.stringify(template.schema)));
      navigate('/builder/local');
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
          <div className="relative w-80 hidden sm:block">
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
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Choose Your <span className="text-gradient">Template</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Every template is fully customizable. Pick one and make it yours.
          </p>
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

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
          {filtered.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="template-card text-left group"
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
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <LayoutGrid className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No templates match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelection;
