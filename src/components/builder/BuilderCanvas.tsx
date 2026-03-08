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
      className={`relative transition-all min-h-[60px] ${isOver ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}`}
    >
      {section.components.length === 0 && (
        <div className="empty-container-placeholder">
          Drop components here — {section.label}
        </div>
      )}
      {section.components.map((comp) => (
        <RenderNode key={comp.id} node={comp} depth={0} />
      ))}
    </div>
  );
};

// Empty canvas droppable (when no sections exist)
const EmptyCanvasDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'empty-canvas',
    data: { type: 'empty-canvas' },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center justify-center h-96 rounded-lg border-2 border-dashed transition-all m-4 ${
        isOver
          ? 'border-primary bg-primary/5'
          : 'border-border/40 opacity-40'
      }`}
    >
      <div className="text-4xl mb-4">📦</div>
      <p className="text-sm font-medium mb-1">Drag & drop components here</p>
      <p className="text-xs opacity-60">Pick a component from the left sidebar and drop it on the canvas</p>
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

// ─── Ruler ─────────────────────────────────────────────────

const Ruler: React.FC<{ direction: 'horizontal' | 'vertical'; size: number }> = ({ direction, size }) => {
  const isH = direction === 'horizontal';
  const ticks = Math.ceil(size / 100);

  return (
    <div
      className="shrink-0"
      style={{
        background: 'hsl(var(--builder-toolbar))',
        position: 'relative',
        overflow: 'hidden',
        ...(isH
          ? { height: '20px', width: '100%' }
          : { width: '20px', height: '100%' }),
      }}
    >
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const pos = i * 100;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              ...(isH
                ? { left: `${pos}px`, top: 0, height: '100%', borderLeft: '1px solid hsl(var(--builder-panel-border))' }
                : { top: `${pos}px`, left: 0, width: '100%', borderTop: '1px solid hsl(var(--builder-panel-border))' }),
            }}
          >
            <span
              className="absolute text-[9px] font-mono"
              style={{
                color: 'hsl(var(--muted-foreground))',
                ...(isH ? { left: '3px', top: '2px' } : { top: '3px', left: '3px' }),
              }}
            >
              {pos}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Canvas Controls Bar ───────────────────────────────────

const CanvasControls: React.FC = () => {
  const {
    showGrid, toggleGrid, snapToGrid, toggleSnapToGrid,
    canvasZoom, setCanvasZoom, gridSize, setGridSize,
  } = useBuilderStore();

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full z-30 text-xs"
      style={{
        background: 'hsl(var(--builder-toolbar))',
        border: '1px solid hsl(var(--builder-panel-border))',
        color: 'hsl(var(--builder-toolbar-foreground))',
        boxShadow: '0 4px 20px -4px rgba(0,0,0,0.4)',
      }}
    >
      {/* Zoom */}
      <button
        onClick={() => setCanvasZoom(canvasZoom - 0.1)}
        className="px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
        title="Zoom out"
      >
        −
      </button>
      <span className="font-mono w-12 text-center">{Math.round(canvasZoom * 100)}%</span>
      <button
        onClick={() => setCanvasZoom(canvasZoom + 0.1)}
        className="px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
        title="Zoom in"
      >
        +
      </button>

      <div className="w-px h-4 mx-1" style={{ background: 'hsl(var(--builder-panel-border))' }} />

      {/* Grid */}
      <button
        onClick={toggleGrid}
        className={`px-2 py-0.5 rounded transition-colors ${showGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`}
        title="Toggle grid"
      >
        Grid
      </button>

      {/* Snap */}
      <button
        onClick={toggleSnapToGrid}
        className={`px-2 py-0.5 rounded transition-colors ${snapToGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`}
        title="Snap to grid"
      >
        Snap
      </button>

      {/* Grid size */}
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

      {/* Fit */}
      <button
        onClick={() => setCanvasZoom(1)}
        className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
        title="Reset zoom"
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
      {/* Top ruler */}
      <div className="absolute top-0 left-8 right-0 z-10">
        <Ruler direction="horizontal" size={2000} />
      </div>

      {/* Left ruler */}
      <div className="absolute top-5 left-0 bottom-0 z-10">
        <Ruler direction="vertical" size={3000} />
      </div>

      {/* Canvas with zoom */}
      <div
        className="mt-5 ml-5"
        style={{
          transform: `scale(${canvasZoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease',
        }}
      >
        <div
          className="builder-canvas rounded-lg overflow-hidden relative"
          style={{ width: deviceWidths[deviceView], maxWidth: '100%' }}
        >
          {/* Grid overlay */}
          {showGrid && <GridOverlay gridSize={gridSize} />}

          {/* Device frame label */}
          <div
            className="absolute -top-6 left-0 text-[10px] font-mono uppercase tracking-wider z-10"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            {deviceView} {deviceView !== 'desktop' ? `(${deviceWidths[deviceView]})` : ''}
          </div>

          {schema.sections.map((section) => (
            <DroppableSection key={section.id} section={section} />
          ))}
          {schema.sections.length === 0 && (
            <div className="flex items-center justify-center h-96 opacity-30 text-sm">
              No sections yet. Add components from the sidebar.
            </div>
          )}
        </div>
      </div>

      {/* Controls bar */}
      <CanvasControls />
    </div>
  );
};

export default BuilderCanvas;
