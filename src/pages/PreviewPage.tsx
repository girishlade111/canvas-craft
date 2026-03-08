import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePages } from '@/hooks/usePages';
import RecursiveRenderer from '@/engine/renderer/RecursiveRenderer';
import type { PageSchema, DeviceView } from '@/types/builder';
import { Monitor, Tablet, Smartphone, ArrowLeft, ExternalLink } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const deviceWidths: Record<DeviceView, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const PreviewPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: pages, isLoading } = usePages(projectId ?? null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  const currentPage = pages?.[currentPageIndex];
  const schema = currentPage?.schema as unknown as PageSchema | undefined;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'hsl(var(--background))' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--primary))' }} />
      </div>
    );
  }

  if (!pages?.length || !schema) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'hsl(var(--background))' }}>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>No pages found</p>
      </div>
    );
  }

  const devices: { view: DeviceView; icon: typeof Monitor; label: string }[] = [
    { view: 'desktop', icon: Monitor, label: 'Desktop' },
    { view: 'tablet', icon: Tablet, label: 'Tablet' },
    { view: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <div className="h-screen flex flex-col" style={{ background: 'hsl(var(--builder-bg))' }}>
      {/* Preview toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{
          background: 'hsl(var(--builder-toolbar))',
          borderBottom: '1px solid hsl(var(--builder-panel-border))',
          color: 'hsl(var(--builder-toolbar-foreground))',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/builder/${projectId}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Editor
          </button>

          {/* Page tabs */}
          {pages.length > 1 && (
            <div className="flex items-center gap-1 ml-4">
              {pages.map((page, i) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    i === currentPageIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {devices.map(({ view, icon: Icon, label }) => (
            <button
              key={view}
              onClick={() => setDeviceView(view)}
              className={`p-1.5 rounded transition-colors ${
                deviceView === view
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-white/10'
              }`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Preview canvas */}
      <div className="flex-1 overflow-auto flex justify-center p-8">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: deviceWidths[deviceView],
            maxWidth: '100%',
            minHeight: '100%',
          }}
        >
          {schema.sections.map((section) => (
            <section key={section.id} style={section.styles as React.CSSProperties}>
              {section.components.map((comp) => (
                <RecursiveRenderer key={comp.id} node={comp} deviceView={deviceView} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
