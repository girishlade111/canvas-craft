import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage } from '@/hooks/usePages';
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import ComponentSidebar from '@/components/builder/ComponentSidebar';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import CodeEditorPanel from '@/components/builder/CodeEditorPanel';
import AssetPanel from '@/components/builder/AssetPanel';
import VersionHistoryPanel from '@/components/builder/VersionHistoryPanel';
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
import type { BuilderComponent, PageSchema } from '@/types/builder';
import { componentLibrary } from '@/data/componentLibrary';
import type { ComponentCategory } from '@/types/builder';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BuilderPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    codeEditorOpen,
    selectedComponentId,
    addComponent,
    schema,
    setSchema,
  } = useBuilderStore();

  const { data: pages, isLoading } = usePages(projectId ?? null);
  const savePage = useSavePage();
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [showAssets, setShowAssets] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{ type: string; label: string } | null>(null);

  // Load first page schema when pages load
  useEffect(() => {
    if (pages?.length && !currentPageId) {
      const page = pages[0];
      setCurrentPageId(page.id);
      setSchema(page.schema as unknown as PageSchema);
    }
  }, [pages, currentPageId, setSchema]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleSave = async () => {
    if (!currentPageId) return;
    try {
      await savePage.mutateAsync({ pageId: currentPageId, schema });
      toast.success('Page saved!');
    } catch (err: any) {
      toast.error('Failed to save: ' + err.message);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.type) setActiveDrag({ type: data.type, label: data.label });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDrag(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    if (!activeData?.fromLibrary) return;

    const compType = activeData.type as string;
    let compDef = null;
    for (const cat of Object.keys(componentLibrary) as ComponentCategory[]) {
      compDef = componentLibrary[cat].find(c => c.type === compType);
      if (compDef) break;
    }
    if (!compDef) return;

    const targetSectionId = over.data.current?.sectionId || over.id;
    const targetSection = schema.sections.find(s => s.id === targetSectionId);
    const section = targetSection || schema.sections.find(s => s.type === 'body');
    if (!section) return;

    const newComp: BuilderComponent = {
      id: generateId(),
      type: compDef.type,
      category: compDef.category,
      label: compDef.label,
      content: compDef.defaultContent,
      styles: compDef.defaultStyles || {},
      props: compDef.defaultProps,
    };
    addComponent(section.id, newComp);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: 'hsl(220 16% 8%)' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="builder-layout">
        <BuilderToolbar
          onSave={handleSave}
          isSaving={savePage.isPending}
          onToggleAssets={() => { setShowAssets(!showAssets); setShowVersions(false); }}
          onToggleVersions={() => { setShowVersions(!showVersions); setShowAssets(false); }}
          showAssets={showAssets}
          showVersions={showVersions}
          projectId={projectId}
        />
        <div className="flex flex-1 overflow-hidden">
          {leftSidebarOpen && !showAssets && <ComponentSidebar />}
          {showAssets && projectId && <AssetPanel projectId={projectId} />}
          <BuilderCanvas />
          {rightSidebarOpen && selectedComponentId && !showVersions && <PropertiesPanel />}
          {showVersions && currentPageId && <VersionHistoryPanel pageId={currentPageId} />}
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
