import { useBuilderStore } from '@/store/builderStore';
import { findComponent } from '@/engine/runtime/treeOperations';
import type { BuilderComponent } from '@/types/builder';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuTrigger, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger,
} from '@/components/ui/context-menu';
import {
  Copy, Clipboard, Trash2, Eye, EyeOff, Lock, Unlock,
  ArrowUp, ArrowDown, Code2, Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import React, { createContext, useContext, useState } from 'react';

interface ClipboardContextType {
  clipboard: BuilderComponent | null;
  setClipboard: (c: BuilderComponent | null) => void;
}

const ClipboardContext = createContext<ClipboardContextType>({ clipboard: null, setClipboard: () => {} });

export const ClipboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clipboard, setClipboard] = useState<BuilderComponent | null>(null);
  return <ClipboardContext.Provider value={{ clipboard, setClipboard }}>{children}</ClipboardContext.Provider>;
};

const generateId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const cloneWithNewIds = (comp: BuilderComponent): BuilderComponent => ({
  ...comp,
  id: generateId(),
  children: comp.children?.map(cloneWithNewIds),
});

export const CanvasContextMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    selectedComponentId, removeComponent, updateComponent,
    addComponent, schema, openCodeEditor, selectComponent,
  } = useBuilderStore();
  const { clipboard, setClipboard } = useContext(ClipboardContext);

  const selectedComponent = selectedComponentId
    ? findComponent(schema.sections, selectedComponentId)
    : null;

  const handleCopy = () => {
    if (selectedComponent) {
      setClipboard(JSON.parse(JSON.stringify(selectedComponent)));
      toast.success('Copied to clipboard');
    }
  };

  const handleDuplicate = () => {
    if (!selectedComponent) return;
    const cloned = cloneWithNewIds(selectedComponent);
    cloned.label = `${cloned.label} (Copy)`;
    const section = schema.sections.find(s =>
      s.components.some(function check(c: BuilderComponent): boolean {
        return c.id === selectedComponentId || (c.children?.some(check) ?? false);
      })
    );
    if (section) {
      addComponent(section.id, cloned);
      selectComponent(cloned.id);
      toast.success('Duplicated');
    }
  };

  const handlePaste = () => {
    if (!clipboard) return;
    const cloned = cloneWithNewIds(clipboard);
    const section = schema.sections[0];
    if (section) {
      addComponent(section.id, cloned);
      selectComponent(cloned.id);
      toast.success('Pasted');
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56" style={{ background: 'hsl(var(--builder-sidebar))', borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--builder-sidebar-foreground))' }}>
        {selectedComponent ? (
          <>
            <ContextMenuItem onClick={handleCopy} className="gap-2 text-xs">
              <Copy className="w-3.5 h-3.5" /> Copy
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDuplicate} className="gap-2 text-xs">
              <Layers className="w-3.5 h-3.5" /> Duplicate
            </ContextMenuItem>
            <ContextMenuItem onClick={handlePaste} disabled={!clipboard} className="gap-2 text-xs">
              <Clipboard className="w-3.5 h-3.5" /> Paste
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => updateComponent(selectedComponentId!, { hidden: !selectedComponent.hidden })}
              className="gap-2 text-xs"
            >
              {selectedComponent.hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {selectedComponent.hidden ? 'Show' : 'Hide'}
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => updateComponent(selectedComponentId!, { locked: !selectedComponent.locked })}
              className="gap-2 text-xs"
            >
              {selectedComponent.locked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {selectedComponent.locked ? 'Unlock' : 'Lock'}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => openCodeEditor(selectedComponentId!)} className="gap-2 text-xs">
              <Code2 className="w-3.5 h-3.5" /> Edit Code
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => { removeComponent(selectedComponentId!); selectComponent(null); }}
              className="gap-2 text-xs text-red-400"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </ContextMenuItem>
          </>
        ) : (
          <>
            <ContextMenuItem onClick={handlePaste} disabled={!clipboard} className="gap-2 text-xs">
              <Clipboard className="w-3.5 h-3.5" /> Paste
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
