import { useNavigate } from 'react-router-dom';
import { templates } from '@/data/templates';
import { useBuilderStore } from '@/store/builderStore';
import { Code2, Layers, Sparkles, Zap } from 'lucide-react';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const setSchema = useBuilderStore((s) => s.setSchema);

  const handleSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSchema(JSON.parse(JSON.stringify(template.schema)));
      navigate('/builder');
    }
  };

  return (
    <div className="min-h-screen bg-builder-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-builder-panel-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-builder-toolbar-foreground">DevBuilder</span>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-builder-toolbar-foreground mb-4">
            Build Your Next Project
          </h1>
          <p className="text-lg text-builder-sidebar-foreground max-w-xl mx-auto">
            Choose a template to get started, or begin with a blank canvas.
          </p>
        </div>

        {/* Features strip */}
        <div className="flex items-center gap-8 mb-12 text-builder-sidebar-foreground text-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>Drag & Drop</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Code Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Live Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Components</span>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl w-full">
          {templates.map((template, i) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="template-card text-left group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-40 flex items-center justify-center text-6xl bg-builder-component">
                {template.thumbnail}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
