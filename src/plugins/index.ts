// Plugin system architecture - ready for future extensions
// Each plugin should export: { id, name, version, components?, extensions? }
export interface Plugin {
  id: string;
  name: string;
  version: string;
  components?: any[];
  extensions?: any[];
}

export const loadedPlugins: Plugin[] = [];
