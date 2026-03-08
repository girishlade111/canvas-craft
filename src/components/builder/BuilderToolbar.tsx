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
} from 'lucide-react';
import type { DeviceView } from '@/types/builder';

const BuilderToolbar = () => {
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
        <button onClick={toggleLeftSidebar} className="p-1.5 rounded hover:bg-builder-component transition-colors" title="Toggle sidebar">
          {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-1 ml-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Code2 className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">DevBuilder</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded hover:bg-builder-component transition-colors disabled:opacity-30"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded hover:bg-builder-component transition-colors disabled:opacity-30"
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
              deviceView === view ? 'bg-primary text-primary-foreground' : 'hover:bg-builder-component'
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-builder-component transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm hover:bg-builder-component transition-colors">
          <Save className="w-3.5 h-3.5" />
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
