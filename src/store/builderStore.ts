/**
 * Builder Store — Layer 1 (UI State) + Layer 2 (Runtime Engine)
 * 
 * The store delegates tree operations to the runtime engine
 * and history management to the history module.
 */

import { create } from 'zustand';
import type { BuilderComponent, ComponentStyles, DeviceView, PageSchema } from '@/types/builder';
import {
  findComponent,
  updateInSections,
  removeFromSections,
  addToSection,
  addToContainer,
  moveComponent as moveComponentInTree,
} from '@/engine/runtime/treeOperations';
import {
  createHistoryState,
  pushToHistory,
  undo as historyUndo,
  redo as historyRedo,
  type HistoryState,
} from '@/engine/runtime/history';

interface BuilderState {
  // Schema (single source of truth)
  schema: PageSchema;

  // UI state (Layer 1)
  selectedComponentId: string | null;
  deviceView: DeviceView;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  codeEditorOpen: boolean;
  codeEditorComponentId: string | null;

  // History (Layer 2 — runtime)
  historyState: HistoryState;

  // Convenience accessors for toolbar
  historyIndex: number;
  history: { schema: PageSchema }[];

  // Actions — UI
  selectComponent: (id: string | null) => void;
  setDeviceView: (view: DeviceView) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  openCodeEditor: (componentId: string) => void;
  closeCodeEditor: () => void;

  // Actions — Runtime
  setSchema: (schema: PageSchema) => void;
  addComponent: (sectionId: string, component: BuilderComponent, index?: number) => void;
  addComponentToContainer: (containerId: string, component: BuilderComponent, index?: number) => void;
  updateComponent: (componentId: string, updates: Partial<BuilderComponent>) => void;
  updateComponentStyles: (componentId: string, styles: Partial<ComponentStyles>) => void;
  removeComponent: (componentId: string) => void;
  moveComponent: (componentId: string, targetParentId: string, targetIndex: number) => void;
  undo: () => void;
  redo: () => void;
  getSelectedComponent: () => BuilderComponent | null;
}

const defaultSchema: PageSchema = {
  id: 'page-1',
  name: 'Home',
  sections: [],
};

const applySchemaChange = (
  state: BuilderState,
  newSchema: PageSchema,
  label?: string
): Partial<BuilderState> => {
  const newHistoryState = pushToHistory(state.historyState, newSchema, label);
  return {
    schema: newSchema,
    historyState: newHistoryState,
    historyIndex: newHistoryState.currentIndex,
    history: newHistoryState.entries,
  };
};

export const useBuilderStore = create<BuilderState>((set, get) => {
  const initialHistory = createHistoryState(defaultSchema);

  return {
    schema: defaultSchema,
    selectedComponentId: null,
    deviceView: 'desktop',
    leftSidebarOpen: true,
    rightSidebarOpen: true,
    codeEditorOpen: false,
    codeEditorComponentId: null,
    historyState: initialHistory,
    historyIndex: initialHistory.currentIndex,
    history: initialHistory.entries,

    // ─── UI Actions (Layer 1) ──────────────────────────────

    selectComponent: (id) => set({ selectedComponentId: id, rightSidebarOpen: id !== null }),

    setDeviceView: (view) => set({ deviceView: view }),

    toggleLeftSidebar: () => set(state => ({ leftSidebarOpen: !state.leftSidebarOpen })),

    toggleRightSidebar: () => set(state => ({ rightSidebarOpen: !state.rightSidebarOpen })),

    openCodeEditor: (componentId) => set({ codeEditorOpen: true, codeEditorComponentId: componentId }),

    closeCodeEditor: () => set({ codeEditorOpen: false, codeEditorComponentId: null }),

    // ─── Runtime Actions (Layer 2) ─────────────────────────

    setSchema: (schema) =>
      set(state => ({ schema, ...applySchemaChange(state, schema, 'Set schema') })),

    addComponent: (sectionId, component, index) =>
      set(state => {
        const newSchema = {
          ...state.schema,
          sections: addToSection(state.schema.sections, sectionId, component, index),
        };
        return applySchemaChange(state, newSchema, `Add ${component.type}`);
      }),

    addComponentToContainer: (containerId, component, index) =>
      set(state => {
        const newSchema = {
          ...state.schema,
          sections: addToContainer(state.schema.sections, containerId, component, index),
        };
        return applySchemaChange(state, newSchema, `Add ${component.type} to container`);
      }),

    updateComponent: (componentId, updates) =>
      set(state => {
        const newSchema = {
          ...state.schema,
          sections: updateInSections(state.schema.sections, componentId, comp => ({ ...comp, ...updates })),
        };
        return applySchemaChange(state, newSchema, 'Update component');
      }),

    updateComponentStyles: (componentId, styles) =>
      set(state => {
        const newSchema = {
          ...state.schema,
          sections: updateInSections(state.schema.sections, componentId, comp => ({
            ...comp,
            styles: { ...comp.styles, ...styles },
          })),
        };
        return applySchemaChange(state, newSchema, 'Update styles');
      }),

    removeComponent: (componentId) =>
      set(state => {
        const newSchema = {
          ...state.schema,
          sections: removeFromSections(state.schema.sections, componentId),
        };
        return {
          ...applySchemaChange(state, newSchema, 'Remove component'),
          selectedComponentId: state.selectedComponentId === componentId ? null : state.selectedComponentId,
        };
      }),

    moveComponent: (componentId, targetParentId, targetIndex) =>
      set(state => {
        const newSections = moveComponentInTree(
          state.schema.sections,
          componentId,
          targetParentId,
          targetIndex
        );
        const newSchema = { ...state.schema, sections: newSections };
        return applySchemaChange(state, newSchema, 'Move component');
      }),

    undo: () =>
      set(state => {
        const result = historyUndo(state.historyState);
        if (!result) return state;
        return {
          schema: result.schema,
          historyState: result.newState,
          historyIndex: result.newState.currentIndex,
          history: result.newState.entries,
        };
      }),

    redo: () =>
      set(state => {
        const result = historyRedo(state.historyState);
        if (!result) return state;
        return {
          schema: result.schema,
          historyState: result.newState,
          historyIndex: result.newState.currentIndex,
          history: result.newState.entries,
        };
      }),

    getSelectedComponent: () => {
      const state = get();
      if (!state.selectedComponentId) return null;
      return findComponent(state.schema.sections, state.selectedComponentId);
    },
  };
});
