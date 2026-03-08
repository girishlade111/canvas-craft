/**
 * Layer 2 — Builder Runtime Engine
 * Pure functions for component tree manipulation.
 * No UI concerns, no side effects — just data transformations.
 */

import type { BuilderComponent, PageSection } from '@/types/builder';

// ─── Queries ───────────────────────────────────────────────

export const findComponent = (
  sections: PageSection[],
  id: string
): BuilderComponent | null => {
  for (const section of sections) {
    for (const comp of section.components) {
      if (comp.id === id) return comp;
      const found = findInChildren(comp.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findInChildren = (
  children: BuilderComponent[] | undefined,
  id: string
): BuilderComponent | null => {
  if (!children) return null;
  for (const child of children) {
    if (child.id === id) return child;
    const found = findInChildren(child.children, id);
    if (found) return found;
  }
  return null;
};

export const findParent = (
  sections: PageSection[],
  childId: string
): { parentType: 'section'; section: PageSection } | { parentType: 'component'; component: BuilderComponent } | null => {
  for (const section of sections) {
    for (const comp of section.components) {
      if (comp.id === childId) return { parentType: 'section', section };
      const found = findParentInChildren(comp, childId);
      if (found) return found;
    }
  }
  return null;
};

const findParentInChildren = (
  parent: BuilderComponent,
  childId: string
): { parentType: 'component'; component: BuilderComponent } | null => {
  if (!parent.children) return null;
  for (const child of parent.children) {
    if (child.id === childId) return { parentType: 'component', component: parent };
    const found = findParentInChildren(child, childId);
    if (found) return found;
  }
  return null;
};

export const getComponentPath = (
  sections: PageSection[],
  targetId: string
): string[] => {
  for (const section of sections) {
    for (const comp of section.components) {
      const path = getPathInTree(comp, targetId);
      if (path) return [section.id, ...path];
    }
  }
  return [];
};

const getPathInTree = (node: BuilderComponent, targetId: string): string[] | null => {
  if (node.id === targetId) return [node.id];
  if (!node.children) return null;
  for (const child of node.children) {
    const path = getPathInTree(child, targetId);
    if (path) return [node.id, ...path];
  }
  return null;
};

export const flattenTree = (sections: PageSection[]): BuilderComponent[] => {
  const result: BuilderComponent[] = [];
  const collect = (comps: BuilderComponent[]) => {
    for (const comp of comps) {
      result.push(comp);
      if (comp.children) collect(comp.children);
    }
  };
  for (const section of sections) collect(section.components);
  return result;
};

// ─── Mutations (immutable) ─────────────────────────────────

export const updateInSections = (
  sections: PageSection[],
  componentId: string,
  updater: (comp: BuilderComponent) => BuilderComponent
): PageSection[] => {
  return sections.map(section => ({
    ...section,
    components: updateInComponents(section.components, componentId, updater),
  }));
};

export const updateInComponents = (
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

export const removeFromSections = (
  sections: PageSection[],
  componentId: string
): PageSection[] => {
  return sections.map(section => ({
    ...section,
    components: removeFromComponents(section.components, componentId),
  }));
};

export const removeFromComponents = (
  components: BuilderComponent[],
  componentId: string
): BuilderComponent[] => {
  return components
    .filter(c => c.id !== componentId)
    .map(c => c.children ? { ...c, children: removeFromComponents(c.children, componentId) } : c);
};

export const addToSection = (
  sections: PageSection[],
  sectionId: string,
  component: BuilderComponent,
  index?: number
): PageSection[] => {
  return sections.map(section => {
    if (section.id !== sectionId) return section;
    const comps = [...section.components];
    if (index !== undefined) comps.splice(index, 0, component);
    else comps.push(component);
    return { ...section, components: comps };
  });
};

export const addToContainer = (
  sections: PageSection[],
  containerId: string,
  component: BuilderComponent,
  index?: number
): PageSection[] => {
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

export const moveComponent = (
  sections: PageSection[],
  componentId: string,
  targetParentId: string,
  targetIndex: number
): PageSection[] => {
  const comp = findComponent(sections, componentId);
  if (!comp) return sections;

  // Remove from current position
  let cleaned = removeFromSections(sections, componentId);

  // Check if target is a section or a container
  const isSection = cleaned.some(s => s.id === targetParentId);

  if (isSection) {
    return cleaned.map(section => {
      if (section.id !== targetParentId) return section;
      const comps = [...section.components];
      comps.splice(targetIndex, 0, comp);
      return { ...section, components: comps };
    });
  }

  return addToContainer(cleaned, targetParentId, comp, targetIndex);
};

// ─── ID Generation ─────────────────────────────────────────

export const generateComponentId = (): string =>
  `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const generateSectionId = (): string =>
  `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
