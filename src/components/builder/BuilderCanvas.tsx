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
      className={`relative transition-all min-h-[40px] ${isOver ? 'ring-2 ring-primary ring-inset' : ''}`}
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

const BuilderCanvas = () => {
  const { schema, deviceView, selectComponent } = useBuilderStore();

  return (
    <div className="builder-canvas-area" onClick={() => selectComponent(null)}>
      <div
        className="builder-canvas rounded-lg overflow-hidden"
        style={{ width: deviceWidths[deviceView], maxWidth: '100%' }}
      >
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
  );
};

export default BuilderCanvas;
