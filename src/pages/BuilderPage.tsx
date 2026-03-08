import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage, type Page } from '@/hooks/usePages';
import { useAutosave } from '@/hooks/useAutosave';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAuth } from '@/hooks/useAuth';
import { useCreateProject } from '@/hooks/useProjects';
import { exportToStaticHTML, exportToReact, downloadFile } from '@/lib/exportProject';
import { downloadZip } from '@/engine/codegen/zipExporter';
import { generateProjectFiles } from '@/engine/deploy/vercelDeploy';
import { toast } from 'sonner';
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import ComponentSidebar from '@/components/builder/ComponentSidebar';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import CodeEditorPanel from '@/components/builder/CodeEditorPanel';
import AssetPanel from '@/components/builder/AssetPanel';
import VersionHistoryPanel from '@/components/builder/VersionHistoryPanel';
import PageManager from '@/components/builder/PageManager';
import PublishDialog from '@/components/builder/PublishDialog';
import AuthGateDialog from '@/components/builder/AuthGateDialog';
import LayersPanel from '@/components/builder/LayersPanel';
import SEOPanel from '@/components/builder/SEOPanel';
import { CanvasContextMenu, ClipboardProvider } from '@/components/builder/CanvasContextMenu';
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
import type { BuilderComponent, PageSchema, ComponentCategory } from '@/types/builder';
import { componentLibrary } from '@/data/componentLibrary';
import { Loader2 } from 'lucide-react';

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const generateSectionId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BuilderPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const createProject = useCreateProject();

  const isLocalMode = projectId === 'local';
  const actualProjectId = isLocalMode ? null : projectId;

  const {
    leftSidebarOpen,
    rightSidebarOpen,
    codeEditorOpen,
    selectedComponentId,
    addComponent,
    addComponentToContainer,
    schema,
    setSchema,
  } = useBuilderStore();

  const { data: pages, isLoading } = usePages(actualProjectId ?? null);
  const savePage = useSavePage();
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [showAssets, setShowAssets] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showSEO, setShowSEO] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{ type: string; label: string } | null>(null);

  const { isSaving: isAutosaving } = useAutosave(isLocalMode ? null : currentPageId);

  useEffect(() => {
    if (!isLocalMode && pages?.length && !currentPageId) {
      const page = pages[0];
      setCurrentPageId(page.id);
      setSchema(page.schema as unknown as PageSchema);
    }
  }, [pages, currentPageId, setSchema, isLocalMode]);

  const handleSelectPage = (page: Page) => {
    setCurrentPageId(page.id);
    setSchema(page.schema as unknown as PageSchema);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleSave = useCallback(async () => {
    if (isLocalMode || !currentPageId) return;
    try {
      await savePage.mutateAsync({ pageId: currentPageId, schema });
      toast.success('Page saved!');
    } catch (err: any) {
      toast.error('Failed to save: ' + err.message);
    }
  }, [currentPageId, savePage, schema, isLocalMode]);

  useKeyboardShortcuts({ onSave: handleSave });

  const handlePublishClick = () => {
    if (!user) {
      setShowAuthGate(true);
    } else if (isLocalMode) {
      handleCreateProjectAndPublish();
    } else {
      setShowPublish(true);
    }
  };

  const handleExportZip = async () => {
    try {
      const files = generateProjectFiles(schema);
      await downloadZip(files, schema.name || 'my-website');
      toast.success('ZIP downloaded — open in VS Code and run npm install');
    } catch (err: any) {
      toast.error('Export failed: ' + err.message);
    }
  };

  const handleExportHTML = () => {
    const html = exportToStaticHTML(schema);
    downloadFile(`${schema.name || 'page'}.html`, html);
  };

  const handleExportReact = () => {
    const files = exportToReact(schema);
    Object.entries(files).forEach(([filename, content]) => {
      downloadFile(filename, content, 'text/typescript');
    });
  };

  const handleAuthRequired = () => {
    setShowAuthGate(true);
  };

  const handleCreateProjectAndPublish = async () => {
    try {
      const project = await createProject.mutateAsync({
        name: schema.name || 'My Website',
        description: 'Created from template',
        templateSchema: schema,
      });
      navigate(`/builder/${project.id}`, { replace: true });
      setTimeout(() => setShowPublish(true), 500);
    } catch (err: any) {
      toast.error('Failed to create project: ' + err.message);
    }
  };

  const handleAuthComplete = async () => {
    setShowAuthGate(false);
    try {
      const project = await createProject.mutateAsync({
        name: schema.name || 'My Website',
        description: 'Created from template',
        templateSchema: schema,
      });
      navigate(`/builder/${project.id}`, { replace: true });
      setTimeout(() => setShowPublish(true), 500);
    } catch (err: any) {
      toast.error('Failed to create project: ' + err.message);
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

    const newComp: BuilderComponent = {
      id: generateId(),
      type: compDef.type,
      category: compDef.category,
      label: compDef.label,
      content: compDef.defaultContent,
      styles: compDef.defaultStyles || {},
      props: compDef.defaultProps,
      isContainer: compDef.isContainer,
      children: compDef.isContainer ? [] : undefined,
    };

    const overData = over.data.current;

    // Dropped on a container component → add as child
    if (overData?.isContainer && overData?.componentId) {
      addComponentToContainer(overData.componentId, newComp);
      return;
    }

    // Dropped on a non-container component → add as sibling in its parent section
    if (overData?.componentId && !overData?.isContainer) {
      const targetId = overData.componentId as string;
      // Find which section contains this component
      const parentSection = schema.sections.find(s =>
        s.components.some(function check(c: BuilderComponent): boolean {
          return c.id === targetId || (c.children?.some(check) ?? false);
        })
      );
      if (parentSection) {
        // Find the index of the target component in the section and insert after it
        const idx = parentSection.components.findIndex(c => c.id === targetId);
        if (idx !== -1) {
          addComponent(parentSection.id, newComp, idx + 1);
        } else {
          addComponent(parentSection.id, newComp);
        }
        return;
      }
    }

    // Dropped on a section
    const targetSectionId = overData?.sectionId || over.id;
    const targetSection = schema.sections.find(s => s.id === targetSectionId);
    const section = targetSection || schema.sections.find(s => s.type === 'body');
    
    if (section) {
      addComponent(section.id, newComp);
    } else if (schema.sections.length > 0) {
      // Fallback: add to first section
      addComponent(schema.sections[0].id, newComp);
    } else {
      // No sections at all — create a default body section and add to it
      const newSectionId = generateSectionId();
      const newSchema: PageSchema = {
        ...schema,
        sections: [{
          id: newSectionId,
          type: 'body',
          label: 'Body',
          components: [newComp],
          styles: { padding: '40px 20px', width: '100%', minHeight: '200px' },
        }],
      };
      setSchema(newSchema);
    }
  };

  if (!isLocalMode && isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: 'hsl(var(--builder-bg))' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--primary))' }} />
      </div>
    );
  }

  return (
    <ClipboardProvider>
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
            isAutosaving={isAutosaving}
            onToggleAssets={() => { setShowAssets(!showAssets); setShowVersions(false); setShowLayers(false); setShowSEO(false); }}
            onToggleVersions={() => { setShowVersions(!showVersions); setShowAssets(false); setShowLayers(false); setShowSEO(false); }}
            showAssets={showAssets}
            showVersions={showVersions}
            projectId={actualProjectId ?? undefined}
            onPublish={handlePublishClick}
            onToggleLayers={() => { setShowLayers(!showLayers); setShowAssets(false); setShowVersions(false); }}
            showLayers={showLayers}
            onToggleSEO={() => { setShowSEO(!showSEO); setShowAssets(false); setShowVersions(false); setShowLayers(false); }}
            showSEO={showSEO}
            isAuthenticated={!!user}
            onExportZip={handleExportZip}
            onExportHTML={handleExportHTML}
            onExportReact={handleExportReact}
            onAuthRequired={handleAuthRequired}
          />
          {actualProjectId && (
            <PageManager
              projectId={actualProjectId}
              currentPageId={currentPageId}
              onSelectPage={handleSelectPage}
            />
          )}
          <div className="flex flex-1 overflow-hidden">
            {leftSidebarOpen && !showAssets && !showLayers && <ComponentSidebar />}
            {showLayers && <LayersPanel />}
            {showAssets && actualProjectId && <AssetPanel projectId={actualProjectId} />}
            <CanvasContextMenu>
              <BuilderCanvas />
            </CanvasContextMenu>
            {rightSidebarOpen && selectedComponentId && !showVersions && !showSEO && <PropertiesPanel />}
            {showSEO && <SEOPanel onClose={() => setShowSEO(false)} />}
            {showVersions && currentPageId && <VersionHistoryPanel pageId={currentPageId} />}
          </div>
          {codeEditorOpen && <CodeEditorPanel />}
        </div>

        <DragOverlay>
          {activeDrag ? (
            <div className="component-item shadow-lg opacity-90" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
              {activeDrag.label}
            </div>
          ) : null}
        </DragOverlay>

        <AuthGateDialog
          isOpen={showAuthGate}
          onClose={() => setShowAuthGate(false)}
          onAuthenticated={handleAuthComplete}
        />

        {actualProjectId && (
          <PublishDialog
            projectId={actualProjectId}
            isOpen={showPublish}
            onClose={() => setShowPublish(false)}
          />
        )}
      </DndContext>
    </ClipboardProvider>
  );
};

export default BuilderPage;
