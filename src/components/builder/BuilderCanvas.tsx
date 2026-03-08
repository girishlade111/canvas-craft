import { useBuilderStore } from '@/store/builderStore';
import { useDroppable } from '@dnd-kit/core';
import type { PageSection } from '@/types/builder';
import RenderNode from './RenderNode';
import { useState } from 'react';
import { Plus, Settings, ChevronUp, ChevronDown, Copy, Trash2, Image, Palette } from 'lucide-react';

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

// ─── Section Toolbar ───────────────────────────────────────

const SectionToolbar: React.FC<{
  section: PageSection;
  index: number;
  totalSections: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onEditBackground: () => void;
}> = ({ section, index, totalSections, onMoveUp, onMoveDown, onDuplicate, onDelete, onEditBackground }) => (
  <div className="section-toolbar">
    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{section.label}</span>
    <div className="flex items-center gap-0.5 ml-2">
      {index > 0 && (
        <button onClick={onMoveUp} className="p-0.5 rounded hover:bg-white/20" title="Move Up">
          <ChevronUp className="w-3 h-3" />
        </button>
      )}
      {index < totalSections - 1 && (
        <button onClick={onMoveDown} className="p-0.5 rounded hover:bg-white/20" title="Move Down">
          <ChevronDown className="w-3 h-3" />
        </button>
      )}
      <button onClick={onEditBackground} className="p-0.5 rounded hover:bg-white/20" title="Background">
        <Palette className="w-3 h-3" />
      </button>
      <button onClick={onDuplicate} className="p-0.5 rounded hover:bg-white/20" title="Duplicate">
        <Copy className="w-3 h-3" />
      </button>
      {totalSections > 1 && (
        <button onClick={onDelete} className="p-0.5 rounded hover:bg-white/20 hover:text-red-300" title="Delete">
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  </div>
);

// ─── Section Background Editor ─────────────────────────────

const SectionBackgroundEditor: React.FC<{
  section: PageSection;
  onUpdate: (styles: Record<string, string>) => void;
  onClose: () => void;
}> = ({ section, onUpdate, onClose }) => (
  <div className="section-bg-editor" onClick={e => e.stopPropagation()}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold">Section Background</span>
      <button onClick={onClose} className="text-xs opacity-60 hover:opacity-100">✕</button>
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-[10px] opacity-60 w-12">Color</label>
        <input type="color" value={section.styles.backgroundColor || '#ffffff'} onChange={e => onUpdate({ backgroundColor: e.target.value })}
          className="w-6 h-6 rounded cursor-pointer border-0" />
        <input value={section.styles.backgroundColor || ''} onChange={e => onUpdate({ backgroundColor: e.target.value })}
          className="property-input flex-1 text-[10px]" placeholder="transparent" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[10px] opacity-60 w-12">Image</label>
        <input value={section.styles.backgroundImage || ''} onChange={e => onUpdate({ backgroundImage: e.target.value })}
          className="property-input flex-1 text-[10px]" placeholder="url(...)" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[10px] opacity-60 w-12">Size</label>
        <select value={section.styles.backgroundSize || 'cover'} onChange={e => onUpdate({ backgroundSize: e.target.value })}
          className="property-input flex-1 text-[10px]">
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[10px] opacity-60 w-12">Height</label>
        <input value={section.styles.minHeight || ''} onChange={e => onUpdate({ minHeight: e.target.value })}
          className="property-input flex-1 text-[10px]" placeholder="auto" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[10px] opacity-60 w-12">Padding</label>
        <input value={section.styles.padding || ''} onChange={e => onUpdate({ padding: e.target.value })}
          className="property-input flex-1 text-[10px]" placeholder="40px 20px" />
      </div>
    </div>
  </div>
);

// ─── Droppable Section ─────────────────────────────────────

const DroppableSection = ({ section, index, totalSections }: { section: PageSection; index: number; totalSections: number }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
    data: { sectionId: section.id, type: 'section' },
  });
  const { schema, setSchema } = useBuilderStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showBgEditor, setShowBgEditor] = useState(false);

  const handleMoveSection = (direction: -1 | 1) => {
    const sections = [...schema.sections];
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= sections.length) return;
    [sections[index], sections[newIdx]] = [sections[newIdx], sections[index]];
    setSchema({ ...schema, sections });
  };

  const handleDuplicateSection = () => {
    const clone: PageSection = JSON.parse(JSON.stringify(section));
    clone.id = `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    clone.label = `${section.label} (copy)`;
    const sections = [...schema.sections];
    sections.splice(index + 1, 0, clone);
    setSchema({ ...schema, sections });
  };

  const handleDeleteSection = () => {
    if (schema.sections.length <= 1) return;
    setSchema({ ...schema, sections: schema.sections.filter((_, i) => i !== index) });
  };

  const handleUpdateSectionStyles = (styles: Record<string, string>) => {
    const sections = schema.sections.map((s, i) =>
      i === index ? { ...s, styles: { ...s.styles, ...styles } } : s
    );
    setSchema({ ...schema, sections });
  };

  return (
    <div
      ref={setNodeRef}
      style={section.styles as React.CSSProperties}
      className={`droppable-section relative transition-all ${isOver ? 'section-drop-active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); }}
    >
      {/* Section toolbar on hover */}
      {isHovered && (
        <SectionToolbar
          section={section}
          index={index}
          totalSections={totalSections}
          onMoveUp={() => handleMoveSection(-1)}
          onMoveDown={() => handleMoveSection(1)}
          onDuplicate={handleDuplicateSection}
          onDelete={handleDeleteSection}
          onEditBackground={() => setShowBgEditor(!showBgEditor)}
        />
      )}

      {/* Background editor */}
      {showBgEditor && (
        <SectionBackgroundEditor
          section={section}
          onUpdate={handleUpdateSectionStyles}
          onClose={() => setShowBgEditor(false)}
        />
      )}

      {section.components.length === 0 && (
        <div className="empty-canvas-drop">
          <div className="empty-canvas-drop-icon">+</div>
          <div className="empty-canvas-drop-text">Drag & drop elements here</div>
          <div className="empty-canvas-drop-hint">Choose from the left panel</div>
        </div>
      )}
      {section.components.map((comp, idx) => (
        <RenderNode key={comp.id} node={comp} depth={0} parentId={section.id} index={idx} />
      ))}
    </div>
  );
};

// ─── Add Section Button ────────────────────────────────────

const AddSectionButton = () => {
  const { schema, setSchema } = useBuilderStore();

  const addSection = () => {
    const newSection: PageSection = {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'section',
      label: `Section ${schema.sections.length + 1}`,
      components: [],
      styles: { padding: '40px 20px', width: '100%', minHeight: '100px' },
    };
    setSchema({ ...schema, sections: [...schema.sections, newSection] });
  };

  return (
    <button onClick={addSection} className="add-section-btn">
      <Plus className="w-4 h-4" />
      <span>Add Section</span>
    </button>
  );
};

// ─── Empty Canvas ──────────────────────────────────────────

const EmptyCanvasDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'empty-canvas',
    data: { type: 'empty-canvas' },
  });

  return (
    <div ref={setNodeRef} className={`empty-canvas-zone ${isOver ? 'active' : ''}`}>
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
  const { showGrid, toggleGrid, snapToGrid, toggleSnapToGrid, canvasZoom, setCanvasZoom, gridSize, setGridSize } = useBuilderStore();

  return (
    <div className="canvas-controls-bar">
      <button onClick={() => setCanvasZoom(canvasZoom - 0.1)} className="canvas-control-btn">−</button>
      <span className="canvas-control-zoom">{Math.round(canvasZoom * 100)}%</span>
      <button onClick={() => setCanvasZoom(canvasZoom + 0.1)} className="canvas-control-btn">+</button>
      <div className="canvas-control-divider" />
      <button onClick={toggleGrid} className={`canvas-control-btn ${showGrid ? 'active' : ''}`}>Grid</button>
      <button onClick={toggleSnapToGrid} className={`canvas-control-btn ${snapToGrid ? 'active' : ''}`}>Snap</button>
      {showGrid && (
        <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} className="canvas-control-select">
          <option value={4}>4px</option><option value={8}>8px</option><option value={12}>12px</option>
          <option value={16}>16px</option><option value={24}>24px</option><option value={32}>32px</option>
        </select>
      )}
      <div className="canvas-control-divider" />
      <button onClick={() => setCanvasZoom(1)} className="canvas-control-btn">100%</button>
    </div>
  );
};

// ─── Main Canvas ───────────────────────────────────────────

const BuilderCanvas = () => {
  const { schema, deviceView, selectComponent, showGrid, gridSize, canvasZoom } = useBuilderStore();

  return (
    <div className="builder-canvas-area relative" onClick={() => selectComponent(null)}>
      <div
        className="canvas-frame"
        style={{
          transform: `scale(${canvasZoom})`,
          transformOrigin: 'top center',
          width: deviceWidths[deviceView],
          maxWidth: deviceView === 'desktop' ? '1280px' : deviceWidths[deviceView],
        }}
      >
        <div className="canvas-device-label">
          {deviceView} {deviceView !== 'desktop' ? `— ${deviceWidths[deviceView]}` : ''}
        </div>

        <div className="builder-canvas relative overflow-hidden" style={{ width: '100%' }}>
          {showGrid && <GridOverlay gridSize={gridSize} />}
          {schema.sections.map((section, index) => (
            <DroppableSection key={section.id} section={section} index={index} totalSections={schema.sections.length} />
          ))}
          {schema.sections.length === 0 && <EmptyCanvasDropZone />}
        </div>

        {/* Add section button */}
        {schema.sections.length > 0 && <AddSectionButton />}
      </div>

      <CanvasControls />
    </div>
  );
};

export default BuilderCanvas;
