import { useBuilderStore } from '@/store/builderStore';
import { useNavigate } from 'react-router-dom';
import {
  Undo2,
  Redo2,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Upload,
  Code2,
  PanelLeftClose,
  PanelLeftOpen,
  Image,
  History,
  Loader2,
  Settings,
} from 'lucide-react';
import type { DeviceView } from '@/types/builder';

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
    deviceView,
    setDeviceView,
    undo,
    redo,
    historyIndex,
    history,
    toggleLeftSidebar,
    leftSidebarOpen,
  } = useBuilderStore();
  const navigate = useNavigate();

  const devices: { view: DeviceView; icon: typeof Monitor; label: string }[] = [
    { view: 'desktop', icon: Monitor, label: 'Desktop' },
    { view: 'tablet', icon: Tablet, label: 'Tablet' },
    { view: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <div className="builder-toolbar">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 p-1.5 rounded hover:bg-white/10 transition-colors">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Code2 className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">DevBuilder</span>
        </button>
        <div className="w-px h-5 bg-builder-panel-border mx-1" />
        <button onClick={toggleLeftSidebar} className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Toggle sidebar">
          {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <button
          onClick={onToggleAssets}
          className={`p-1.5 rounded transition-colors ${showAssets ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`}
          title="Assets"
        >
          <Image className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleVersions}
          className={`p-1.5 rounded transition-colors ${showVersions ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`}
          title="Version History"
        >
          <History className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded hover:bg-white/10 transition-colors disabled:opacity-30"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-builder-panel-border mx-2" />

        {devices.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => setDeviceView(view)}
            className={`p-1.5 rounded transition-colors ${
              deviceView === view ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/preview')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
        {projectId && (
          <button
            onClick={() => navigate(`/project/${projectId}/settings`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>
        )}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-white/10 transition-colors"
        >
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">
          <Upload className="w-3.5 h-3.5" />
          Publish
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
