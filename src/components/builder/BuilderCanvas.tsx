import { useBuilderStore } from '@/store/builderStore';
import { useDroppable } from '@dnd-kit/core';
import type { PageSection } from '@/types/builder';
import RenderNode from './RenderNode';

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const DroppableSection = ({ section }: { section: PageSection }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
    data: { sectionId: section.id, type: 'section' },
  });

  return (
    <div
      ref={setNodeRef}
      style={section.styles as React.CSSProperties}
      className={`relative transition-all min-h-[80px] ${isOver ? 'ring-2 ring-primary ring-inset' : ''}`}
    >
      {section.components.length === 0 && (
        <div className="empty-container-placeholder">
          <div className="text-lg mb-1">+</div>
          <div>Drag & drop elements here</div>
        </div>
      )}
      {section.components.map((comp) => (
        <RenderNode key={comp.id} node={comp} depth={0} />
      ))}
    </div>
  );
};

const EmptyCanvasDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'empty-canvas',
    data: { type: 'empty-canvas' },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
        isOver
          ? 'border-primary bg-primary/5'
          : 'border-border/40'
      }`}
      style={{ minHeight: '400px' }}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: 'hsl(var(--builder-component-bg))' }}>
        <span className="text-2xl">📦</span>
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: 'hsl(var(--builder-sidebar-foreground))' }}>
        Start building your page
      </p>
      <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Drag elements from the left panel
      </p>
    </div>
  );
};

// ─── Grid Overlay ──────────────────────────────────────────

const GridOverlay: React.FC<{ gridSize: number }> = ({ gridSize }) => (
  <div
    className="absolute inset-0 pointer-events-none z-[1]"
    style={{
      backgroundImage: `
        linear-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px),
        linear-gradient(90deg, hsl(var(--primary) / 0.06) 1px, transparent 1px)
      `,
      backgroundSize: `${gridSize}px ${gridSize}px`,
    }}
  />
);

// ─── Canvas Controls Bar ───────────────────────────────────

const CanvasControls: React.FC = () => {
  const {
    showGrid, toggleGrid, snapToGrid, toggleSnapToGrid,
    canvasZoom, setCanvasZoom, gridSize, setGridSize,
  } = useBuilderStore();

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1.5 rounded-full z-30 text-xs"
      style={{
        background: 'hsl(var(--builder-sidebar))',
        border: '1px solid hsl(var(--builder-panel-border))',
        color: 'hsl(var(--builder-sidebar-foreground))',
        boxShadow: '0 4px 20px -4px hsl(220 13% 70% / 0.3)',
      }}
    >
      <button
        onClick={() => setCanvasZoom(canvasZoom - 0.1)}
        className="px-1.5 py-0.5 rounded hover:bg-muted transition-colors"
      >
        −
      </button>
      <span className="font-mono w-12 text-center text-[11px]">{Math.round(canvasZoom * 100)}%</span>
      <button
        onClick={() => setCanvasZoom(canvasZoom + 0.1)}
        className="px-1.5 py-0.5 rounded hover:bg-muted transition-colors"
      >
        +
      </button>

      <div className="w-px h-4 mx-1" style={{ background: 'hsl(var(--builder-panel-border))' }} />

      <button
        onClick={toggleGrid}
        className={`px-2 py-0.5 rounded transition-colors ${showGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
      >
        Grid
      </button>
      <button
        onClick={toggleSnapToGrid}
        className={`px-2 py-0.5 rounded transition-colors ${snapToGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
      >
        Snap
      </button>

      {showGrid && (
        <select
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="bg-transparent border-0 text-xs outline-none cursor-pointer"
          style={{ color: 'inherit' }}
        >
          <option value={4}>4px</option>
          <option value={8}>8px</option>
          <option value={12}>12px</option>
          <option value={16}>16px</option>
          <option value={24}>24px</option>
          <option value={32}>32px</option>
        </select>
      )}

      <div className="w-px h-4 mx-1" style={{ background: 'hsl(var(--builder-panel-border))' }} />

      <button
        onClick={() => setCanvasZoom(1)}
        className="px-2 py-0.5 rounded hover:bg-muted transition-colors"
      >
        100%
      </button>
    </div>
  );
};

// ─── Main Canvas ───────────────────────────────────────────

const BuilderCanvas = () => {
  const { schema, deviceView, selectComponent, showGrid, gridSize, canvasZoom } = useBuilderStore();

  return (
    <div className="builder-canvas-area relative" onClick={() => selectComponent(null)}>
      {/* Canvas with zoom */}
      <div
        style={{
          transform: `scale(${canvasZoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease',
          width: deviceWidths[deviceView],
          maxWidth: deviceView === 'desktop' ? '1280px' : deviceWidths[deviceView],
          margin: '0 auto',
        }}
      >
        {/* Device label */}
        <div
          className="text-[10px] font-medium uppercase tracking-wider mb-2 text-center"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {deviceView} {deviceView !== 'desktop' ? `— ${deviceWidths[deviceView]}` : ''}
        </div>

        <div
          className="builder-canvas relative overflow-hidden"
          style={{ width: '100%' }}
        >
          {showGrid && <GridOverlay gridSize={gridSize} />}

          {schema.sections.map((section) => (
            <DroppableSection key={section.id} section={section} />
          ))}
          {schema.sections.length === 0 && <EmptyCanvasDropZone />}
        </div>
      </div>

      <CanvasControls />
    </div>
  );
};

export default BuilderCanvas;
