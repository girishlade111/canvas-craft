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
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import type { BuilderComponent, PageSchema, ComponentCategory } from '@/types/builder';
import { componentLibrary } from '@/data/componentLibrary';
import { isContainerType } from '@/types/builder';
import {
  Loader2, Plus, Layers, Image, History, Search,
} from 'lucide-react';

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const generateSectionId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

type LeftPanel = 'elements' | 'layers' | 'assets' | 'versions' | 'seo' | null;

const BuilderPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const createProject = useCreateProject();

  const isLocalMode = projectId === 'local';
  const actualProjectId = isLocalMode ? null : projectId;

  const {
    rightSidebarOpen,
    codeEditorOpen,
    selectedComponentId,
    addComponent,
    addComponentToContainer,
    moveComponent,
    schema,
    setSchema,
  } = useBuilderStore();

  const { data: pages, isLoading } = usePages(actualProjectId ?? null);
  const savePage = useSavePage();
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<LeftPanel>('elements');
  const [showPublish, setShowPublish] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{
    type: string;
    label: string;
    fromCanvas?: boolean;
    componentId?: string;
  } | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    id: string;
    position: 'before' | 'after' | 'inside';
  } | null>(null);

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
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
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

  // ─── Drag & Drop Handlers ─────────────────────────────

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.fromCanvas) {
      // Dragging existing component on canvas
      setActiveDrag({
        type: data.componentType,
        label: data.label,
        fromCanvas: true,
        componentId: data.componentId,
      });
    } else if (data?.type) {
      // Dragging from library
      setActiveDrag({ type: data.type, label: data.label });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      setDropTarget(null);
      return;
    }
    const overData = over.data.current;
    if (overData?.isContainer) {
      setDropTarget({ id: over.id as string, position: 'inside' });
    } else if (overData?.componentId) {
      setDropTarget({ id: over.id as string, position: 'after' });
    } else {
      setDropTarget({ id: over.id as string, position: 'inside' });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDrag(null);
    setDropTarget(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;

    // ── CASE 1: Canvas reorder (move existing component) ──
    if (activeData?.fromCanvas && activeData?.componentId) {
      const componentId = activeData.componentId as string;
      const overData = over.data.current;

      // Dropping on a container
      if (overData?.isContainer && overData?.componentId) {
        const targetContainerId = overData.componentId as string;
        if (targetContainerId !== componentId) {
          moveComponent(componentId, targetContainerId, 0);
        }
        return;
      }

      // Dropping on/near a sibling component
      if (overData?.componentId) {
        const targetId = overData.componentId as string;
        if (targetId === componentId) return;

        // Find the target's parent section
        const parentSection = schema.sections.find(s =>
          s.components.some(function check(c: BuilderComponent): boolean {
            return c.id === targetId || (c.children?.some(check) ?? false);
          })
        );
        if (parentSection) {
          const idx = parentSection.components.findIndex(c => c.id === targetId);
          if (idx !== -1) {
            moveComponent(componentId, parentSection.id, idx + 1);
          }
        }
        return;
      }

      // Dropping on section
      const targetSectionId = overData?.sectionId || over.id;
      const targetSection = schema.sections.find(s => s.id === targetSectionId);
      if (targetSection) {
        moveComponent(componentId, targetSection.id, targetSection.components.length);
      }
      return;
    }

    // ── CASE 2: Library to canvas (add new component) ──
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

    // Drop on container
    if (overData?.isContainer && overData?.componentId) {
      addComponentToContainer(overData.componentId, newComp);
      return;
    }

    // Drop on/near existing component (insert as sibling)
    if (overData?.componentId && !overData?.isContainer) {
      const targetId = overData.componentId as string;
      const parentSection = schema.sections.find(s =>
        s.components.some(function check(c: BuilderComponent): boolean {
          return c.id === targetId || (c.children?.some(check) ?? false);
        })
      );
      if (parentSection) {
        const idx = parentSection.components.findIndex(c => c.id === targetId);
        if (idx !== -1) {
          addComponent(parentSection.id, newComp, idx + 1);
        } else {
          addComponent(parentSection.id, newComp);
        }
        return;
      }
    }

    // Drop on section or empty canvas
    const targetSectionId = overData?.sectionId || over.id;
    const targetSection = schema.sections.find(s => s.id === targetSectionId);
    const section = targetSection || schema.sections.find(s => s.type === 'body');

    if (section) {
      addComponent(section.id, newComp);
    } else if (schema.sections.length > 0) {
      addComponent(schema.sections[0].id, newComp);
    } else {
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

  const togglePanel = (panel: LeftPanel) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  if (!isLocalMode && isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: 'hsl(var(--builder-bg))' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--primary))' }} />
      </div>
    );
  }

  const iconBarItems: { id: LeftPanel; icon: typeof Plus; label: string }[] = [
    { id: 'elements', icon: Plus, label: 'Add' },
    { id: 'layers', icon: Layers, label: 'Layers' },
    { id: 'assets', icon: Image, label: 'Media' },
    { id: 'versions', icon: History, label: 'History' },
    { id: 'seo', icon: Search, label: 'SEO' },
  ];

  return (
    <ClipboardProvider>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="builder-layout">
          <BuilderToolbar
            onSave={handleSave}
            isSaving={savePage.isPending}
            isAutosaving={isAutosaving}
            onToggleAssets={() => togglePanel('assets')}
            onToggleVersions={() => togglePanel('versions')}
            showAssets={activePanel === 'assets'}
            showVersions={activePanel === 'versions'}
            projectId={actualProjectId ?? undefined}
            onPublish={handlePublishClick}
            onToggleLayers={() => togglePanel('layers')}
            showLayers={activePanel === 'layers'}
            onToggleSEO={() => togglePanel('seo')}
            showSEO={activePanel === 'seo'}
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
            {/* Wix-style dark icon bar */}
            <div className="builder-icon-bar">
              {iconBarItems.map(({ id, icon: Icon, label }) => {
                if (id === 'assets' && !actualProjectId) return null;
                if (id === 'versions' && !currentPageId) return null;
                return (
                  <button
                    key={id}
                    onClick={() => togglePanel(id)}
                    className={`builder-icon-bar-btn ${activePanel === id ? 'active' : ''}`}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Flyout panels */}
            {activePanel === 'elements' && (
              <ComponentSidebar onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'layers' && <LayersPanel />}
            {activePanel === 'assets' && actualProjectId && <AssetPanel projectId={actualProjectId} />}
            {activePanel === 'seo' && <SEOPanel onClose={() => setActivePanel(null)} />}
            {activePanel === 'versions' && currentPageId && <VersionHistoryPanel pageId={currentPageId} />}

            {/* Main canvas */}
            <CanvasContextMenu>
              <BuilderCanvas />
            </CanvasContextMenu>

            {/* Right properties panel */}
            {rightSidebarOpen && selectedComponentId && <PropertiesPanel />}
          </div>

          {codeEditorOpen && <CodeEditorPanel />}
        </div>

        {/* Drag overlay — ghost preview */}
        <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
          {activeDrag ? (
            <div className="drag-ghost-preview">
              <div className="drag-ghost-icon">
                {activeDrag.fromCanvas ? '↕' : '➕'}
              </div>
              <span>{activeDrag.label}</span>
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
