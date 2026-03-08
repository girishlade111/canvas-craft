import { create } from 'zustand';
import type { BuilderComponent, ComponentStyles, DeviceView, PageSchema } from '@/types/builder';
import { isContainerType } from '@/types/builder';

interface HistoryEntry {
  schema: PageSchema;
}

interface BuilderState {
  schema: PageSchema;
  selectedComponentId: string | null;
  deviceView: DeviceView;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  codeEditorOpen: boolean;
  codeEditorComponentId: string | null;
  history: HistoryEntry[];
  historyIndex: number;

  setSchema: (schema: PageSchema) => void;
  selectComponent: (id: string | null) => void;
  setDeviceView: (view: DeviceView) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  openCodeEditor: (componentId: string) => void;
  closeCodeEditor: () => void;
  addComponent: (parentId: string, component: BuilderComponent, index?: number) => void;
  addComponentToContainer: (containerId: string, component: BuilderComponent, index?: number) => void;
  updateComponent: (componentId: string, updates: Partial<BuilderComponent>) => void;
  updateComponentStyles: (componentId: string, styles: Partial<ComponentStyles>) => void;
  removeComponent: (componentId: string) => void;
  moveComponent: (componentId: string, targetParentId: string, targetIndex: number) => void;
  undo: () => void;
  redo: () => void;
  getSelectedComponent: () => BuilderComponent | null;
}

// ---- Tree helpers ----

const findComponent = (sections: PageSchema['sections'], id: string): BuilderComponent | null => {
  for (const section of sections) {
    for (const comp of section.components) {
      if (comp.id === id) return comp;
      const found = findInChildren(comp.children, id);
      if (found) return found;
    }
  }
  return null;
};

const findInChildren = (children: BuilderComponent[] | undefined, id: string): BuilderComponent | null => {
  if (!children) return null;
  for (const child of children) {
    if (child.id === id) return child;
    const found = findInChildren(child.children, id);
    if (found) return found;
  }
  return null;
};

const updateInSections = (
  sections: PageSchema['sections'],
  componentId: string,
  updater: (comp: BuilderComponent) => BuilderComponent
): PageSchema['sections'] => {
  return sections.map(section => ({
    ...section,
    components: updateInComponents(section.components, componentId, updater),
  }));
};

const updateInComponents = (
  components: BuilderComponent[],
  componentId: string,
  updater: (comp: BuilderComponent) => BuilderComponent
): BuilderComponent[] => {
  return components.map(comp => {
    if (comp.id === componentId) return updater(comp);
    if (comp.children) {
      return { ...comp, children: updateInComponents(comp.children, componentId, updater) };
    }
    return comp;
  });
};

const removeFromSections = (
  sections: PageSchema['sections'],
  componentId: string
): PageSchema['sections'] => {
  return sections.map(section => ({
    ...section,
    components: removeFromComponents(section.components, componentId),
  }));
};

const removeFromComponents = (
  components: BuilderComponent[],
  componentId: string
): BuilderComponent[] => {
  return components
    .filter(c => c.id !== componentId)
    .map(c => c.children ? { ...c, children: removeFromComponents(c.children, componentId) } : c);
};

// Add component into a container component's children (nested DnD)
const addToContainer = (
  sections: PageSchema['sections'],
  containerId: string,
  component: BuilderComponent,
  index?: number
): PageSchema['sections'] => {
  return sections.map(section => ({
    ...section,
    components: addToContainerInComponents(section.components, containerId, component, index),
  }));
};

const addToContainerInComponents = (
  components: BuilderComponent[],
  containerId: string,
  component: BuilderComponent,
  index?: number
): BuilderComponent[] => {
  return components.map(comp => {
    if (comp.id === containerId) {
      const children = [...(comp.children || [])];
      if (index !== undefined) children.splice(index, 0, component);
      else children.push(component);
      return { ...comp, children };
    }
    if (comp.children) {
      return { ...comp, children: addToContainerInComponents(comp.children, containerId, component, index) };
    }
    return comp;
  });
};

const defaultSchema: PageSchema = {
  id: 'page-1',
  name: 'Home',
  sections: [],
};

const pushHistory = (state: BuilderState): Partial<BuilderState> => {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push({ schema: JSON.parse(JSON.stringify(state.schema)) });
  // Keep max 50 history entries
  if (newHistory.length > 50) newHistory.shift();
  return { history: newHistory, historyIndex: Math.min(newHistory.length - 1, 49) };
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  schema: defaultSchema,
  selectedComponentId: null,
  deviceView: 'desktop',
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  codeEditorOpen: false,
  codeEditorComponentId: null,
  history: [{ schema: defaultSchema }],
  historyIndex: 0,

  setSchema: (schema) => set(state => ({ schema, ...pushHistory({ ...state, schema }) })),

  selectComponent: (id) => set({ selectedComponentId: id, rightSidebarOpen: id !== null }),

  setDeviceView: (view) => set({ deviceView: view }),

  toggleLeftSidebar: () => set(state => ({ leftSidebarOpen: !state.leftSidebarOpen })),

  toggleRightSidebar: () => set(state => ({ rightSidebarOpen: !state.rightSidebarOpen })),

  openCodeEditor: (componentId) => set({ codeEditorOpen: true, codeEditorComponentId: componentId }),

  closeCodeEditor: () => set({ codeEditorOpen: false, codeEditorComponentId: null }),

  // Add to a section (top-level drop)
  addComponent: (sectionId, component, index) =>
    set(state => {
      const newSchema = {
        ...state.schema,
        sections: state.schema.sections.map(section => {
          if (section.id !== sectionId) return section;
          const comps = [...section.components];
          if (index !== undefined) comps.splice(index, 0, component);
          else comps.push(component);
          return { ...section, components: comps };
        }),
      };
      return { schema: newSchema, ...pushHistory({ ...state, schema: newSchema }) };
    }),

  // Add into a container component's children (nested drop)
  addComponentToContainer: (containerId, component, index) =>
    set(state => {
      const newSchema = {
        ...state.schema,
        sections: addToContainer(state.schema.sections, containerId, component, index),
      };
      return { schema: newSchema, ...pushHistory({ ...state, schema: newSchema }) };
    }),

  updateComponent: (componentId, updates) =>
    set(state => {
      const newSchema = {
        ...state.schema,
        sections: updateInSections(state.schema.sections, componentId, comp => ({ ...comp, ...updates })),
      };
      return { schema: newSchema, ...pushHistory({ ...state, schema: newSchema }) };
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
      return { schema: newSchema, ...pushHistory({ ...state, schema: newSchema }) };
    }),

  removeComponent: (componentId) =>
    set(state => {
      const newSchema = {
        ...state.schema,
        sections: removeFromSections(state.schema.sections, componentId),
      };
      return {
        schema: newSchema,
        selectedComponentId: state.selectedComponentId === componentId ? null : state.selectedComponentId,
        ...pushHistory({ ...state, schema: newSchema }),
      };
    }),

  moveComponent: (componentId, targetParentId, targetIndex) =>
    set(state => {
      const comp = findComponent(state.schema.sections, componentId);
      if (!comp) return state;

      // Remove from current position
      let cleanedSections = removeFromSections(state.schema.sections, componentId);

      // Check if target is a section or a container component
      const isSection = cleanedSections.some(s => s.id === targetParentId);

      let newSections;
      if (isSection) {
        newSections = cleanedSections.map(section => {
          if (section.id !== targetParentId) return section;
          const comps = [...section.components];
          comps.splice(targetIndex, 0, comp);
          return { ...section, components: comps };
        });
      } else {
        newSections = addToContainer(cleanedSections, targetParentId, comp, targetIndex);
      }

      const newSchema = { ...state.schema, sections: newSections };
      return { schema: newSchema, ...pushHistory({ ...state, schema: newSchema }) };
    }),

  undo: () =>
    set(state => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return { schema: JSON.parse(JSON.stringify(state.history[newIndex].schema)), historyIndex: newIndex };
    }),

  redo: () =>
    set(state => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return { schema: JSON.parse(JSON.stringify(state.history[newIndex].schema)), historyIndex: newIndex };
    }),

  getSelectedComponent: () => {
    const state = get();
    if (!state.selectedComponentId) return null;
    return findComponent(state.schema.sections, state.selectedComponentId);
  },
}));
