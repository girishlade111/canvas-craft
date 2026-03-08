import { useBuilderStore } from '@/store/builderStore';
import { useNavigate } from 'react-router-dom';
import {
  Undo2, Redo2, Eye, Monitor, Tablet, Smartphone, Save, Upload,
  Code2, PanelLeftClose, PanelLeftOpen, Image, History, Loader2,
  Settings, Download, Circle, Layers, Search, FileArchive, Lock,
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
  onSave, isSaving, isAutosaving, onToggleAssets, onToggleVersions,
  showAssets, showVersions, projectId, onPublish,
  onToggleLayers, showLayers, onToggleSEO, showSEO,
  isAuthenticated, onExportZip, onExportHTML, onExportReact, onAuthRequired,
}: BuilderToolbarProps) => {
  const {
    schema, deviceView, setDeviceView, undo, redo, historyIndex, history,
    toggleLeftSidebar, leftSidebarOpen,
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
      <div className="flex items-center gap-1">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 p-1.5 rounded hover:bg-white/10 transition-colors">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
            <Code2 className="w-3 h-3" style={{ color: 'hsl(var(--primary-foreground))' }} />
          </div>
          <span className="font-semibold text-sm hidden md:inline">DevBuilder</span>
        </button>
        <div className="w-px h-5 mx-1" style={{ background: 'hsl(var(--builder-panel-border))' }} />
        <button onClick={toggleLeftSidebar} className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Components">
          {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        {onToggleLayers && (
          <button onClick={onToggleLayers} className={`p-1.5 rounded transition-colors ${showLayers ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="Layers">
            <Layers className="w-4 h-4" />
          </button>
        )}
        <button onClick={onToggleAssets} className={`p-1.5 rounded transition-colors ${showAssets ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="Assets">
          <Image className="w-4 h-4" />
        </button>
        <button onClick={onToggleVersions} className={`p-1.5 rounded transition-colors ${showVersions ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="Version History">
          <History className="w-4 h-4" />
        </button>
        {onToggleSEO && (
          <button onClick={onToggleSEO} className={`p-1.5 rounded transition-colors ${showSEO ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="SEO & Meta">
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button onClick={undo} disabled={historyIndex <= 0} className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30" title="Undo (Ctrl+Z)">
          <Undo2 className="w-4 h-4" />
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30" title="Redo (Ctrl+Y)">
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="w-px h-5 mx-2" style={{ background: 'hsl(var(--builder-panel-border))' }} />
        {devices.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => setDeviceView(view)}
            className={`p-1.5 rounded transition-colors ${deviceView === view ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        {isAutosaving && (
          <div className="flex items-center gap-1.5 text-xs opacity-60">
            <Circle className="w-2 h-2 fill-current animate-pulse" style={{ color: '#22c55e' }} />
            <span className="hidden sm:inline">Saving…</span>
          </div>
        )}

        <button onClick={() => navigate(`/preview/${projectId}`)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs hover:bg-white/10 transition-colors">
          <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Preview</span>
        </button>
        {projectId && (
          <button onClick={() => navigate(`/project/${projectId}/settings`)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs hover:bg-white/10 transition-colors">
            <Settings className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Settings</span>
          </button>
        )}

        {/* Export Dropdown */}
        <div className="relative">
          <button onClick={() => setShowExportMenu(!showExportMenu)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs hover:bg-white/10 transition-colors">
            <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Export</span>
          </button>
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 top-full mt-1 rounded-lg shadow-xl py-1 z-50 min-w-[220px]" style={{ background: 'hsl(var(--builder-sidebar))', border: '1px solid hsl(var(--builder-panel-border))' }}>
                {!isAuthenticated && (
                  <div className="px-4 py-2 text-xs flex items-center gap-1.5 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
                    <Lock className="w-3 h-3" />
                    Sign in to export
                  </div>
                )}
                <button
                  onClick={() => handleExportAction(onExportZip)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center gap-2.5"
                >
                  <FileArchive className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium">Download ZIP</div>
                    <div className="text-[10px] opacity-50">Vercel-ready, VS Code editable</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportAction(onExportHTML)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center gap-2.5"
                >
                  <Code2 className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium">Static HTML</div>
                    <div className="text-[10px] opacity-50">Single HTML file</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExportAction(onExportReact)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center gap-2.5"
                >
                  <Code2 className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <div className="font-medium">React Components</div>
                    <div className="text-[10px] opacity-50">TSX page files</div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        <button onClick={onSave} disabled={isSaving} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs hover:bg-white/10 transition-colors">
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs hover:opacity-90 transition-opacity"
          style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
        >
          <Upload className="w-3.5 h-3.5" /> Publish
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
