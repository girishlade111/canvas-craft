import { useNavigate } from 'react-router-dom';
import { templates } from '@/data/templates';
import { useBuilderStore } from '@/store/builderStore';
import { Code2, ArrowLeft, Layers, Sparkles, Zap } from 'lucide-react';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const setSchema = useBuilderStore((s) => s.setSchema);

  const handleSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSchema(JSON.parse(JSON.stringify(template.schema)));
      // Navigate to builder without project ID (local mode)
      navigate('/builder/local');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 h-16 flex items-center justify-between shrink-0 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">DevBuilder</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Choose a Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a starting point and make it yours. Every template is fully customizable.
          </p>
        </div>

        {/* Features strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-muted-foreground">
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
            <span>50+ Components</span>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl w-full">
          {templates.map((template, i) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="template-card text-left group animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-40 flex items-center justify-center text-6xl bg-muted/50">
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
