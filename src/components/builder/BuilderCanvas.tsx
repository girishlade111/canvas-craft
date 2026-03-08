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
      className={`droppable-section relative transition-all ${
        isOver ? 'section-drop-active' : ''
      }`}
    >
      {section.components.length === 0 && (
        <div className="empty-canvas-drop">
          <div className="empty-canvas-drop-icon">+</div>
          <div className="empty-canvas-drop-text">Drag & drop elements here</div>
          <div className="empty-canvas-drop-hint">Choose from the left panel</div>
        </div>
      )}
      {section.components.map((comp, index) => (
        <RenderNode
          key={comp.id}
          node={comp}
          depth={0}
          parentId={section.id}
          index={index}
        />
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
      className={`empty-canvas-zone ${isOver ? 'active' : ''}`}
    >
      <div className="empty-canvas-zone-inner">
        <div className="empty-canvas-zone-icon">📦</div>
        <p className="empty-canvas-zone-title">Start building your page</p>
        <p className="empty-canvas-zone-desc">Drag elements from the left panel</p>
      </div>
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
    <div className="canvas-controls-bar">
      <button
        onClick={() => setCanvasZoom(canvasZoom - 0.1)}
        className="canvas-control-btn"
      >
        −
      </button>
      <span className="canvas-control-zoom">{Math.round(canvasZoom * 100)}%</span>
      <button
        onClick={() => setCanvasZoom(canvasZoom + 0.1)}
        className="canvas-control-btn"
      >
        +
      </button>

      <div className="canvas-control-divider" />

      <button
        onClick={toggleGrid}
        className={`canvas-control-btn ${showGrid ? 'active' : ''}`}
      >
        Grid
      </button>
      <button
        onClick={toggleSnapToGrid}
        className={`canvas-control-btn ${snapToGrid ? 'active' : ''}`}
      >
        Snap
      </button>

      {showGrid && (
        <select
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="canvas-control-select"
        >
          <option value={4}>4px</option>
          <option value={8}>8px</option>
          <option value={12}>12px</option>
          <option value={16}>16px</option>
          <option value={24}>24px</option>
          <option value={32}>32px</option>
        </select>
      )}

      <div className="canvas-control-divider" />

      <button
        onClick={() => setCanvasZoom(1)}
        className="canvas-control-btn"
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
        className="canvas-frame"
        style={{
          transform: `scale(${canvasZoom})`,
          transformOrigin: 'top center',
          width: deviceWidths[deviceView],
          maxWidth: deviceView === 'desktop' ? '1280px' : deviceWidths[deviceView],
        }}
      >
        {/* Device label */}
        <div className="canvas-device-label">
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
