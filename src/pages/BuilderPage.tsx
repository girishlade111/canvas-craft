import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuilderStore } from '@/store/builderStore';
import { usePages, useSavePage, type Page } from '@/hooks/usePages';
import { useAutosave } from '@/hooks/useAutosave';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAuth } from '@/hooks/useAuth';
import { useCreateProject } from '@/hooks/useProjects';
import { toast } from 'sonner';

// Core builder components — always needed
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import { CanvasContextMenu, ClipboardProvider } from '@/components/builder/CanvasContextMenu';

// Lazy-loaded panels — only loaded when user opens them
const ComponentSidebar = lazy(() => import('@/components/builder/ComponentSidebar'));
const PropertiesPanel = lazy(() => import('@/components/builder/PropertiesPanel'));
const CodeEditorPanel = lazy(() => import('@/components/builder/CodeEditorPanel'));
const AssetPanel = lazy(() => import('@/components/builder/AssetPanel'));
const VersionHistoryPanel = lazy(() => import('@/components/builder/VersionHistoryPanel'));
const PageManager = lazy(() => import('@/components/builder/PageManager'));
const PublishDialog = lazy(() => import('@/components/builder/PublishDialog'));
const AuthGateDialog = lazy(() => import('@/components/builder/AuthGateDialog'));
const LayersPanel = lazy(() => import('@/components/builder/LayersPanel'));
const AdvancedSEOPanel = lazy(() => import('@/components/builder/AdvancedSEOPanel'));
const GlobalDesignPanel = lazy(() => import('@/components/builder/GlobalDesignPanel'));
const PopupBuilderPanel = lazy(() => import('@/components/builder/PopupBuilderPanel'));
const FormBuilderPanel = lazy(() => import('@/components/builder/FormBuilderPanel'));
const PhotoStudioPanel = lazy(() => import('@/components/builder/PhotoStudioPanel'));
const CMSPanel = lazy(() => import('@/components/builder/CMSPanel'));
const EcommercePanel = lazy(() => import('@/components/builder/EcommercePanel'));
const MarketingPanel = lazy(() => import('@/components/builder/MarketingPanel'));
const BookingPanel = lazy(() => import('@/components/builder/BookingPanel'));
const AppMarketPanel = lazy(() => import('@/components/builder/AppMarketPanel'));
const AIToolsPanel = lazy(() => import('@/components/builder/AIToolsPanel'));
const ExportDialog = lazy(() => import('@/components/builder/ExportDialog'));
const TemplatesPanel = lazy(() => import('@/components/builder/TemplatesPanel'));
const MarketplacePanel = lazy(() => import('@/components/builder/MarketplacePanel'));
const MemberAreaPanel = lazy(() => import('@/components/builder/MemberAreaPanel'));
const InteractionsPanel = lazy(() => import('@/components/builder/InteractionsPanel'));
const InteractiveElementsPanel = lazy(() => import('@/components/builder/InteractiveElementsPanel'));
const MultiLanguagePanel = lazy(() => import('@/components/builder/MultiLanguagePanel'));
const DomainPanel = lazy(() => import('@/components/builder/DomainPanel'));
const AccessibilityPanel = lazy(() => import('@/components/builder/AccessibilityPanel'));
const SaveTemplateDialog = lazy(() => import('@/components/builder/SaveTemplateDialog'));
const VercelPanel = lazy(() => import('@/components/builder/VercelPanel'));
const NetlifyPanel = lazy(() => import('@/components/builder/NetlifyPanel'));
const RailwayPanel = lazy(() => import('@/components/builder/RailwayPanel'));

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

// Lazy-loaded component library — cached after first load
let _componentLibraryCache: typeof import('@/data/componentLibrary')['componentLibrary'] | null = null;
const getComponentLibrary = async () => {
  if (!_componentLibraryCache) {
    const mod = await import('@/data/componentLibrary');
    _componentLibraryCache = mod.componentLibrary;
  }
  return _componentLibraryCache;
};

import {
  Loader2, Plus, Layers, Image, History, Search,
  Palette, Megaphone, FileText, Camera, ShoppingBag,
  CalendarDays, Store, Sparkles, BookOpen, LayoutTemplate, Package,
  Users, Zap, Languages, Globe, Accessibility, Wand2,
} from 'lucide-react';

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const generateSectionId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

type LeftPanel = 'elements' | 'templates' | 'layers' | 'assets' | 'versions' | 'seo' | 'design' | 'popups' | 'forms' | 'photo-studio' | 'cms' | 'store' | 'marketing' | 'booking' | 'apps' | 'ai' | 'marketplace' | 'members' | 'interactions' | 'interactive-elements' | 'languages' | 'domain' | 'accessibility' | 'vercel' | 'netlify' | 'railway' | null;

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
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [activeDrag, setActiveDrag] = useState<{
    type: string;
    label: string;
    fromCanvas?: boolean;
    componentId?: string;
  } | null>(null);
  const [_dropTarget, setDropTarget] = useState<{
    id: string;
    position: 'before' | 'after' | 'inside';
  } | null>(null);

  const { isSaving: isAutosaving } = useAutosave(isLocalMode ? null : currentPageId);

  // Preload component library and registry when builder mounts
  useEffect(() => {
    getComponentLibrary();
    import('@/engine/registry/componentRegistry').then(m => m.ensureAllComponentsLoaded());
  }, []);

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
      const [{ generateProjectFiles }, { downloadZip }] = await Promise.all([
        import('@/engine/deploy/vercelDeploy'),
        import('@/engine/codegen/zipExporter'),
      ]);
      const files = generateProjectFiles(schema);
      await downloadZip(files, schema.name || 'my-website');
      toast.success('ZIP downloaded — open in VS Code and run npm install');
    } catch (err: any) {
      toast.error('Export failed: ' + err.message);
    }
  };

  const handleExportHTML = async () => {
    const { exportToStaticHTML, downloadFile } = await import('@/lib/exportProject');
    const html = exportToStaticHTML(schema);
    downloadFile(`${schema.name || 'page'}.html`, html);
  };

  const handleExportReact = async () => {
    const { exportToReact, downloadFile } = await import('@/lib/exportProject');
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
      setActiveDrag({
        type: data.componentType,
        label: data.label,
        fromCanvas: true,
        componentId: data.componentId,
      });
    } else if (data?.type) {
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

      if (overData?.isContainer && overData?.componentId) {
        const targetContainerId = overData.componentId as string;
        if (targetContainerId !== componentId) {
          moveComponent(componentId, targetContainerId, 0);
        }
        return;
      }

      if (overData?.componentId) {
        const targetId = overData.componentId as string;
        if (targetId === componentId) return;

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

      const targetSectionId = overData?.sectionId || over.id;
      const targetSection = schema.sections.find(s => s.id === targetSectionId);
      if (targetSection) {
        moveComponent(componentId, targetSection.id, targetSection.components.length);
      }
      return;
    }

    // ── CASE 2: Library to canvas (add new component) ──
    if (!activeData?.fromLibrary) return;

    let newComp: BuilderComponent;

    // Handle icon drops from IconsPanel
    if (activeData.type === 'icon' && activeData.iconName) {
      newComp = {
        id: generateId(),
        type: 'lucide-icon',
        category: 'Icons' as ComponentCategory,
        label: activeData.iconName,
        styles: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
        props: { name: activeData.iconName, size: 24, color: 'currentColor', strokeWidth: 2 },
      };
    } else {
      // Standard component from library
      if (!_componentLibraryCache) return;
      const compType = activeData.type as string;
      const compLabel = activeData.label as string | undefined;
      let compDef = null;
      
      // Find component - match by type and label for better specificity (handles Icons with same type)
      for (const cat of Object.keys(_componentLibraryCache) as ComponentCategory[]) {
        // First try exact match with label
        if (compLabel) {
          compDef = _componentLibraryCache[cat].find(c => c.type === compType && c.label === compLabel);
          if (compDef) break;
        }
        // Fall back to type-only match
        if (!compDef) {
          compDef = _componentLibraryCache[cat].find(c => c.type === compType);
          if (compDef) break;
        }
      }
      if (!compDef) return;

      newComp = {
        id: generateId(),
        type: compDef.type,
        category: compDef.category,
        label: compDef.label,
        content: compDef.defaultContent || '',
        styles: compDef.defaultStyles || {},
        props: compDef.defaultProps || {},
        isContainer: compDef.isContainer,
        children: compDef.isContainer ? [] : undefined,
      };
    }

    const overData = over.data.current;

    if (overData?.isContainer && overData?.componentId) {
      addComponentToContainer(overData.componentId, newComp);
      return;
    }

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

  // Check if selected component is an image type for Photo Studio
  const selectedComponent = selectedComponentId ? useBuilderStore.getState().getSelectedComponent() : null;
  const isImageSelected = selectedComponent?.type === 'image' || selectedComponent?.type === 'avatar' || selectedComponent?.type === 'background-image';

  const iconBarItems: { id: LeftPanel; icon: typeof Plus; label: string; show?: boolean }[] = [
    { id: 'elements', icon: Plus, label: 'Add' },
    { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
    { id: 'marketplace', icon: Package, label: 'Market' },
    { id: 'layers', icon: Layers, label: 'Layers' },
    { id: 'design', icon: Palette, label: 'Design' },
    { id: 'interactions', icon: Zap, label: 'Effects' },
    { id: 'interactive-elements', icon: Wand2, label: 'Animate' },
    { id: 'cms', icon: BookOpen, label: 'CMS' },
    { id: 'store', icon: ShoppingBag, label: 'Store' },
    { id: 'booking', icon: CalendarDays, label: 'Book' },
    { id: 'members', icon: Users, label: 'Members' },
    { id: 'marketing', icon: Megaphone, label: 'Promo' },
    { id: 'ai', icon: Sparkles, label: 'AI' },
    { id: 'apps', icon: Store, label: 'Apps' },
    { id: 'assets', icon: Image, label: 'Media', show: !!actualProjectId },
    { id: 'forms', icon: FileText, label: 'Forms' },
    { id: 'popups', icon: Megaphone, label: 'Popups' },
    { id: 'languages', icon: Languages, label: 'i18n' },
    { id: 'domain', icon: Globe, label: 'Domain' },
    { id: 'accessibility', icon: Accessibility, label: 'A11y' },
    { id: 'photo-studio', icon: Camera, label: 'Photo', show: isImageSelected },
    { id: 'seo', icon: Search, label: 'SEO' },
    { id: 'versions', icon: History, label: 'History', show: !!currentPageId },
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
            onOpenExportDialog={() => setShowExportDialog(true)}
            onSaveAsTemplate={() => setShowSaveTemplate(true)}
          />

          {actualProjectId && (
            <Suspense fallback={null}>
              <PageManager
                projectId={actualProjectId}
                currentPageId={currentPageId}
                onSelectPage={handleSelectPage}
              />
            </Suspense>
          )}

          <div className="flex flex-1 overflow-hidden">
            {/* Icon bar */}
            <div className="builder-icon-bar">
              {iconBarItems.map(({ id, icon: Icon, label, show }) => {
                if (show === false) return null;
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

            {/* Flyout panels — lazy loaded on demand */}
            <Suspense fallback={<div className="builder-flyout-panel p-4 text-center text-muted-foreground text-sm">Loading...</div>}>
              {activePanel === 'elements' && (
                <ComponentSidebar onClose={() => setActivePanel(null)} />
               )}
              {activePanel === 'templates' && <TemplatesPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'layers' && <LayersPanel />}
              {activePanel === 'assets' && actualProjectId && <AssetPanel projectId={actualProjectId} />}
              {activePanel === 'seo' && <AdvancedSEOPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'versions' && currentPageId && <VersionHistoryPanel pageId={currentPageId} />}
              {activePanel === 'design' && <GlobalDesignPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'popups' && <PopupBuilderPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'forms' && <FormBuilderPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'photo-studio' && selectedComponentId && (
                <PhotoStudioPanel componentId={selectedComponentId} onClose={() => setActivePanel(null)} />
              )}
              {activePanel === 'cms' && <CMSPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'store' && <EcommercePanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'marketing' && <MarketingPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'booking' && <BookingPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'apps' && <AppMarketPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} onOpenVercel={() => setActivePanel('vercel')} onOpenNetlify={() => setActivePanel('netlify')} onOpenRailway={() => setActivePanel('railway')} />}
              {activePanel === 'ai' && <AIToolsPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'marketplace' && <MarketplacePanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'members' && <MemberAreaPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'interactions' && <InteractionsPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'interactive-elements' && <InteractiveElementsPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'languages' && <MultiLanguagePanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'domain' && <DomainPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} />}
              {activePanel === 'accessibility' && <AccessibilityPanel onClose={() => setActivePanel(null)} />}
              {activePanel === 'vercel' && <VercelPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} onBack={() => setActivePanel('apps')} />}
              {activePanel === 'netlify' && <NetlifyPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} onBack={() => setActivePanel('apps')} />}
              {activePanel === 'railway' && <RailwayPanel projectId={actualProjectId} onClose={() => setActivePanel(null)} onBack={() => setActivePanel('apps')} />}
            </Suspense>

            {/* Main canvas */}
            <CanvasContextMenu>
              <BuilderCanvas />
            </CanvasContextMenu>

            {/* Right properties panel */}
            <Suspense fallback={null}>
              {rightSidebarOpen && selectedComponentId && <PropertiesPanel />}
            </Suspense>
          </div>

          <Suspense fallback={null}>
            {codeEditorOpen && <CodeEditorPanel />}
          </Suspense>
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

        <Suspense fallback={null}>
          {showAuthGate && (
            <AuthGateDialog
              isOpen={showAuthGate}
              onClose={() => setShowAuthGate(false)}
              onAuthenticated={handleAuthComplete}
            />
          )}

          {actualProjectId && showPublish && (
            <PublishDialog
              projectId={actualProjectId}
              isOpen={showPublish}
              onClose={() => setShowPublish(false)}
            />
          )}

          {showExportDialog && (
            <ExportDialog
              isOpen={showExportDialog}
              onClose={() => setShowExportDialog(false)}
              projectId={actualProjectId ?? undefined}
              pages={pages?.map(p => ({
                name: p.name,
                slug: p.slug,
                schema: p.schema as unknown as PageSchema,
              }))}
            />
          )}

          {showSaveTemplate && (
            <SaveTemplateDialog
              open={showSaveTemplate}
              onClose={() => setShowSaveTemplate(false)}
            />
          )}
        </Suspense>
      </DndContext>
    </ClipboardProvider>
  );
};

export default BuilderPage;
