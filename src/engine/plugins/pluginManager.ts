/**
 * Plugin System Architecture
 * Plugins can register: components, templates, editor extensions, integrations.
 */

import React from 'react';
import { registerComponents } from '@/engine/registry';
import type { PageSchema } from '@/types/builder';
import type { ComponentDefinition, ComponentCategory } from '@/types/builder';

// ─── Plugin Types ──────────────────────────────────────────

export interface PluginComponentEntry {
  type: string;
  component: React.FC<any>;
  definition: ComponentDefinition;
}

export interface PluginTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  schema: PageSchema;
}

export interface PluginEditorExtension {
  id: string;
  name: string;
  position: 'toolbar' | 'sidebar' | 'panel';
  component: React.FC<any>;
}

export interface Plugin {
  id: string;
  name: string;
  version: string;
  author?: string;
  description?: string;
  components?: PluginComponentEntry[];
  templates?: PluginTemplate[];
  extensions?: PluginEditorExtension[];
  onLoad?: () => void;
  onUnload?: () => void;
}

// ─── Plugin Manager ────────────────────────────────────────

class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private listeners: Set<() => void> = new Set();

  /**
   * Register and activate a plugin.
   */
  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin "${plugin.id}" is already registered.`);
      return;
    }

    // Register plugin components into the global registry
    if (plugin.components?.length) {
      const componentMap: Record<string, React.FC<any>> = {};
      plugin.components.forEach(entry => {
        componentMap[entry.type] = entry.component;
      });
      registerComponents(componentMap);
    }

    plugin.onLoad?.();
    this.plugins.set(plugin.id, plugin);
    this.notifyListeners();
  }

  /**
   * Unregister and deactivate a plugin.
   */
  unregister(pluginId: string): void {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return;

    plugin.onUnload?.();
    this.plugins.delete(pluginId);
    this.notifyListeners();
  }

  getPlugin(id: string): Plugin | undefined {
    return this.plugins.get(id);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get all templates contributed by plugins.
   */
  getPluginTemplates(): PluginTemplate[] {
    return this.getAllPlugins().flatMap(p => p.templates || []);
  }

  /**
   * Get all component definitions contributed by plugins.
   */
  getPluginComponents(): PluginComponentEntry[] {
    return this.getAllPlugins().flatMap(p => p.components || []);
  }

  /**
   * Get all editor extensions contributed by plugins.
   */
  getPluginExtensions(): PluginEditorExtension[] {
    return this.getAllPlugins().flatMap(p => p.extensions || []);
  }

  /**
   * Subscribe to plugin changes.
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(fn => fn());
  }
}

// Singleton instance
export const pluginManager = new PluginManager();
