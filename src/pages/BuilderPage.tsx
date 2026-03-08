import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import ComponentSidebar from '@/components/builder/ComponentSidebar';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import CodeEditorPanel from '@/components/builder/CodeEditorPanel';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import type { BuilderComponent } from '@/types/builder';
import { componentLibrary } from '@/data/componentLibrary';
import type { ComponentCategory } from '@/types/builder';

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BuilderPage = () => {
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    codeEditorOpen,
    selectedComponentId,
    addComponent,
    schema,
  } = useBuilderStore();

  const [activeDrag, setActiveDrag] = useState<{ type: string; label: string } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.type) {
      setActiveDrag({ type: data.type, label: data.label });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDrag(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    if (!activeData?.fromLibrary) return;

    // Find the component definition
    const compType = activeData.type as string;
    let compDef = null;
    for (const cat of Object.keys(componentLibrary) as ComponentCategory[]) {
      compDef = componentLibrary[cat].find(c => c.type === compType);
      if (compDef) break;
    }
    if (!compDef) return;

    const targetSectionId = over.data.current?.sectionId || over.id;
    const targetSection = schema.sections.find(s => s.id === targetSectionId);
    if (!targetSection) {
      // Default to first body section
      const bodySection = schema.sections.find(s => s.type === 'body');
      if (!bodySection) return;
      const newComp: BuilderComponent = {
        id: generateId(),
        type: compDef.type,
        category: compDef.category,
        label: compDef.label,
        content: compDef.defaultContent,
        styles: compDef.defaultStyles || {},
        props: compDef.defaultProps,
      };
      addComponent(bodySection.id, newComp);
    } else {
      const newComp: BuilderComponent = {
        id: generateId(),
        type: compDef.type,
        category: compDef.category,
        label: compDef.label,
        content: compDef.defaultContent,
        styles: compDef.defaultStyles || {},
        props: compDef.defaultProps,
      };
      addComponent(targetSection.id, newComp);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="builder-layout">
        <BuilderToolbar />
        <div className="flex flex-1 overflow-hidden">
          {leftSidebarOpen && <ComponentSidebar />}
          <BuilderCanvas />
          {rightSidebarOpen && selectedComponentId && <PropertiesPanel />}
        </div>
        {codeEditorOpen && <CodeEditorPanel />}
      </div>

      <DragOverlay>
        {activeDrag ? (
          <div className="component-item shadow-lg border border-builder-panel-border opacity-90">
            {activeDrag.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BuilderPage;
