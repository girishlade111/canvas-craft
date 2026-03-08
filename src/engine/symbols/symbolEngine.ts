/**
 * Symbol Engine — Component Reuse & Inheritance
 * 
 * Symbols are reusable component templates. When a user creates a symbol,
 * all instances inherit the symbol's base properties. Instance-level overrides
 * are stored separately and merged at render time.
 * 
 * Inheritance allows component types to inherit default props/styles from
 * a parent type (e.g., "hero" inherits from "section").
 */

import type { BuilderComponent, ComponentSymbol, ComponentStyles, PageSchema } from '@/types/builder';
import { generateComponentId } from '@/engine/runtime/treeOperations';

// ─── Symbol Store ──────────────────────────────────────────

const symbolStore: Map<string, ComponentSymbol> = new Map();

export const createSymbol = (
  name: string,
  component: BuilderComponent,
  description?: string
): ComponentSymbol => {
  const symbol: ComponentSymbol = {
    id: `symbol-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    description,
    component: JSON.parse(JSON.stringify(component)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  symbolStore.set(symbol.id, symbol);
  return symbol;
};

export const getSymbol = (id: string): ComponentSymbol | undefined => {
  return symbolStore.get(id);
};

export const getAllSymbols = (): ComponentSymbol[] => {
  return Array.from(symbolStore.values());
};

export const updateSymbol = (id: string, updates: Partial<ComponentSymbol>): void => {
  const symbol = symbolStore.get(id);
  if (!symbol) return;
  symbolStore.set(id, { ...symbol, ...updates, updatedAt: new Date().toISOString() });
};

export const deleteSymbol = (id: string): boolean => {
  return symbolStore.delete(id);
};

/**
 * Create an instance of a symbol.
 * The instance references the symbol by ID and can have local overrides.
 */
export const createSymbolInstance = (
  symbolId: string,
  overrides?: {
    props?: Record<string, any>;
    styles?: Partial<ComponentStyles>;
    content?: string;
  }
): BuilderComponent | null => {
  const symbol = symbolStore.get(symbolId);
  if (!symbol) return null;

  const instance: BuilderComponent = {
    ...JSON.parse(JSON.stringify(symbol.component)),
    id: generateComponentId(),
    symbolId,
    symbolOverrides: overrides,
  };

  return instance;
};

/**
 * Resolve a component by merging symbol base with instance overrides.
 */
export const resolveSymbolInstance = (component: BuilderComponent): BuilderComponent => {
  if (!component.symbolId) return component;

  const symbol = symbolStore.get(component.symbolId);
  if (!symbol) return component;

  const base = symbol.component;
  const overrides = component.symbolOverrides || {};

  return {
    ...base,
    id: component.id,
    symbolId: component.symbolId,
    symbolOverrides: component.symbolOverrides,
    content: overrides.content ?? base.content,
    props: { ...base.props, ...overrides.props },
    styles: { ...base.styles, ...overrides.styles },
    children: component.children || base.children,
  };
};

// ─── Component Inheritance ─────────────────────────────────

const inheritanceMap: Map<string, string> = new Map();

/**
 * Define that one component type inherits from another.
 * e.g., registerInheritance('hero', 'section')
 */
export const registerInheritance = (childType: string, parentType: string): void => {
  inheritanceMap.set(childType, parentType);
};

export const getParentType = (type: string): string | undefined => {
  return inheritanceMap.get(type);
};

export const getInheritanceChain = (type: string): string[] => {
  const chain: string[] = [type];
  let current = type;
  while (inheritanceMap.has(current)) {
    current = inheritanceMap.get(current)!;
    if (chain.includes(current)) break; // prevent cycles
    chain.push(current);
  }
  return chain;
};

// Register default inheritance relationships
registerInheritance('hero', 'section');
registerInheritance('card', 'container');
registerInheritance('feature-grid', 'grid');
registerInheritance('product-grid', 'grid');
registerInheritance('login-form', 'container');
registerInheritance('signup-form', 'container');
registerInheritance('contact-form', 'container');
registerInheritance('navbar', 'container');
registerInheritance('sidebar-nav', 'container');

/**
 * Load symbols from a page schema (for persistence).
 */
export const loadSymbolsFromSchema = (schema: PageSchema): void => {
  schema.symbols?.forEach(symbol => {
    symbolStore.set(symbol.id, symbol);
  });
};

/**
 * Export all symbols for persistence in schema.
 */
export const exportSymbols = (): ComponentSymbol[] => {
  return Array.from(symbolStore.values());
};
