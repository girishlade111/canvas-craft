import { useBuilderStore } from '@/store/builderStore';
import { useNavigate } from 'react-router-dom';
import {
  Undo2, Redo2, Eye, Monitor, Tablet, Smartphone, Save, Upload,
  Code2, Download, Lock, Loader2, FileArchive, Plus,
} from 'lucide-react';
import type { DeviceView } from '@/types/builder';
import { useState } from 'react';

interface BuilderToolbarProps {
  onSave: () => void;
  isSaving: boolean;
  isAutosaving?: boolean;
  onToggleAssets: () => void;
  onToggleVersions: () => void;
  showAssets: boolean;
  showVersions: boolean;
  projectId?: string;
  onPublish?: () => void;
  onToggleLayers?: () => void;
  showLayers?: boolean;
  onToggleSEO?: () => void;
  showSEO?: boolean;
  isAuthenticated?: boolean;
  onExportZip?: () => void;
  onExportHTML?: () => void;
  onExportReact?: () => void;
  onAuthRequired?: () => void;
}

const BuilderToolbar = ({
  onSave, isSaving, isAutosaving, projectId, onPublish,
  isAuthenticated, onExportZip, onExportHTML, onExportReact, onAuthRequired,
}: BuilderToolbarProps) => {
  const {
    schema, deviceView, setDeviceView, undo, redo, historyIndex, history,
  } = useBuilderStore();
  const navigate = useNavigate();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const devices: { view: DeviceView; icon: typeof Monitor; label: string }[] = [
    { view: 'desktop', icon: Monitor, label: 'Desktop' },
    { view: 'tablet', icon: Tablet, label: 'Tablet' },
    { view: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  const handleExportAction = (action: (() => void) | undefined) => {
    if (!isAuthenticated) {
      onAuthRequired?.();
      setShowExportMenu(false);
      return;
    }
    action?.();
    setShowExportMenu(false);
  };

  return (
    <div className="builder-toolbar">
      {/* Left: brand */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: 'hsl(var(--primary))' }}
          >
            <Code2 className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary-foreground))' }} />
          </div>
          <span className="font-semibold text-sm hidden md:inline">
            {schema.name || 'My Site'}
          </span>
        </button>
      </div>

      {/* Center: device + undo/redo */}
      <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 mx-2" style={{ background: 'hsl(var(--builder-panel-border))' }} />

        {devices.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => setDeviceView(view)}
            className={`p-1.5 rounded-md transition-colors ${
              deviceView === view
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5">
        {isAutosaving && (
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--success))' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(var(--success))' }} />
            <span className="hidden sm:inline">Saving</span>
          </div>
        )}

        <button
          onClick={() => navigate(`/preview/${projectId || 'local'}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div
                className="absolute right-0 top-full mt-1 rounded-lg shadow-xl py-1 z-50 min-w-[220px]"
                style={{
                  background: 'hsl(var(--builder-sidebar))',
                  border: '1px solid hsl(var(--builder-panel-border))',
                  boxShadow: '0 8px 30px hsl(220 13% 70% / 0.2)',
                }}
              >
                {!isAuthenticated && (
                  <div
                    className="px-4 py-2 text-xs flex items-center gap-1.5 border-b"
                    style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}
                  >
                    <Lock className="w-3 h-3" />
                    Sign in to export
                  </div>
                )}
                <button
                  onClick={() => handleExportAction(onExportZip)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-2.5"
                >
                  <FileArchive className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium text-xs">Download ZIP</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Vercel-ready, VS Code editable
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportAction(onExportHTML)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-2.5"
                >
                  <Code2 className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium text-xs">Static HTML</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Single HTML file
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportAction(onExportReact)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-2.5"
                >
                  <Code2 className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium text-xs">React Components</div>
                    <div className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      TSX page files
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted transition-colors"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              onAuthRequired?.();
            } else {
              onPublish?.();
            }
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity"
          style={{
            background: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          <Upload className="w-3.5 h-3.5" />
          Publish
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
