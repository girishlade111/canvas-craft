import { useBuilderStore } from '@/store/builderStore';
import { useNavigate } from 'react-router-dom';
import { exportToStaticHTML, exportToReact, downloadFile } from '@/lib/exportProject';
import {
  Undo2, Redo2, Eye, Monitor, Tablet, Smartphone, Save, Upload,
  Code2, PanelLeftClose, PanelLeftOpen, Image, History, Loader2,
  Settings, Download,
} from 'lucide-react';
import type { DeviceView } from '@/types/builder';
import { useState } from 'react';

interface BuilderToolbarProps {
  onSave: () => void;
  isSaving: boolean;
  onToggleAssets: () => void;
  onToggleVersions: () => void;
  showAssets: boolean;
  showVersions: boolean;
  projectId?: string;
}

const BuilderToolbar = ({ onSave, isSaving, onToggleAssets, onToggleVersions, showAssets, showVersions, projectId }: BuilderToolbarProps) => {
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

  const handleExportHTML = () => {
    const html = exportToStaticHTML(schema);
    downloadFile(`${schema.name || 'page'}.html`, html);
    setShowExportMenu(false);
  };

  const handleExportReact = () => {
    const files = exportToReact(schema);
    Object.entries(files).forEach(([filename, content]) => {
      downloadFile(filename, content, 'text/typescript');
    });
    setShowExportMenu(false);
  };

  return (
    <div className="builder-toolbar">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 p-1.5 rounded hover:bg-white/10 transition-colors">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
            <Code2 className="w-3 h-3" style={{ color: 'hsl(var(--primary-foreground))' }} />
          </div>
          <span className="font-semibold text-sm">DevBuilder</span>
        </button>
        <div className="w-px h-5 mx-1" style={{ background: 'hsl(var(--builder-panel-border))' }} />
        <button onClick={toggleLeftSidebar} className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Toggle sidebar">
          {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <button onClick={onToggleAssets} className={`p-1.5 rounded transition-colors ${showAssets ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="Assets">
          <Image className="w-4 h-4" />
        </button>
        <button onClick={onToggleVersions} className={`p-1.5 rounded transition-colors ${showVersions ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`} title="Version History">
          <History className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={undo} disabled={historyIndex <= 0} className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30" title="Undo">
          <Undo2 className="w-4 h-4" />
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30" title="Redo">
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

      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/preview')} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors">
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
        {projectId && (
          <button onClick={() => navigate(`/project/${projectId}/settings`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors">
            <Settings className="w-3.5 h-3.5" /> Settings
          </button>
        )}

        {/* Export dropdown */}
        <div className="relative">
          <button onClick={() => setShowExportMenu(!showExportMenu)} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 rounded-lg shadow-xl py-1 z-50 min-w-[180px]" style={{ background: 'hsl(var(--builder-sidebar))', border: '1px solid hsl(var(--builder-panel-border))' }}>
              <button onClick={handleExportHTML} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                Static HTML
              </button>
              <button onClick={handleExportReact} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                React Component
              </button>
            </div>
          )}
        </div>

        <button onClick={onSave} disabled={isSaving} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors">
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:opacity-90 transition-opacity" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
          <Upload className="w-3.5 h-3.5" /> Publish
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
