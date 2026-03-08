import { useBuilderStore } from '@/store/builderStore';
import { useNavigate } from 'react-router-dom';
import {
  Undo2, Redo2, Eye, Monitor, Tablet, Smartphone, Save, Upload,
  Code2, Download, Lock, Loader2, FileArchive, Github, Globe,
  ChevronDown, ExternalLink, FolderOpen, Cloud,
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
  onOpenExportDialog?: () => void;
}

const BuilderToolbar = ({
  onSave, isSaving, isAutosaving, projectId, onPublish,
  isAuthenticated, onExportZip, onExportHTML, onExportReact, onAuthRequired,
  onOpenExportDialog,
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

        {/* Export - Enhanced */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div
                className="absolute right-0 top-full mt-1 rounded-xl shadow-xl py-2 z-50 min-w-[280px]"
                style={{
                  background: 'hsl(var(--builder-sidebar))',
                  border: '1px solid hsl(var(--builder-panel-border))',
                  boxShadow: '0 12px 40px hsl(220 13% 10% / 0.3)',
                }}
              >
                {!isAuthenticated && (
                  <div
                    className="px-4 py-2.5 text-xs flex items-center gap-2 border-b mx-2 mb-2 rounded-lg"
                    style={{ background: 'hsl(var(--warning, 45 93% 47%) / 0.1)', borderColor: 'hsl(var(--warning, 45 93% 47%) / 0.2)' }}
                  >
                    <Lock className="w-3.5 h-3.5" style={{ color: 'hsl(var(--warning, 45 93% 47%))' }} />
                    <span>Sign in to enable exports</span>
                  </div>
                )}
                
                {/* Quick Export Options */}
                <div className="px-2 pb-2 border-b mb-2" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-40 px-2 mb-1.5">Quick Export</div>
                  
                  <button
                    onClick={() => handleExportAction(onExportZip)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                      <FolderOpen className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs">Download for VS Code</div>
                      <div className="text-[10px] opacity-50">React + TypeScript, ready to edit</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowExportMenu(false);
                      window.open('https://github.com/new', '_blank');
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--muted))' }}>
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs flex items-center gap-1">
                        Push to GitHub
                        <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                      </div>
                      <div className="text-[10px] opacity-50">Create repo & deploy</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleExportAction(onExportHTML)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--muted))' }}>
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs">Download HTML</div>
                      <div className="text-[10px] opacity-50">Single static HTML file</div>
                    </div>
                  </button>
                </div>

                {/* Advanced Export */}
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    if (!isAuthenticated) {
                      onAuthRequired?.();
                    } else {
                      onOpenExportDialog?.();
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-muted transition-colors"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  <span>More export options...</span>
                  <ChevronDown className="w-3 h-3 -rotate-90" />
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
