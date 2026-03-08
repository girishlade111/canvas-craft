import { useEffect } from 'react';
import { useBuilderStore } from '@/store/builderStore';

/**
 * Global keyboard shortcuts for the builder.
 * Ctrl/Cmd+Z = Undo, Ctrl/Cmd+Shift+Z / Ctrl+Y = Redo,
 * Delete/Backspace = Remove selected, Ctrl/Cmd+S = Save,
 * Ctrl/Cmd+G = Toggle grid
 */
export const useKeyboardShortcuts = (handlers: {
  onSave?: () => void;
}) => {
  const {
    undo,
    redo,
    selectedComponentId,
    removeComponent,
    selectComponent,
    toggleGrid,
    setCanvasZoom,
    canvasZoom,
  } = useBuilderStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      const target = e.target as HTMLElement;

      // Skip if user is typing in an input/textarea
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Still allow Ctrl+S in inputs
        if (isCmd && e.key === 's') {
          e.preventDefault();
          handlers.onSave?.();
        }
        return;
      }

      // Ctrl+Z = Undo
      if (isCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl+Shift+Z or Ctrl+Y = Redo
      if ((isCmd && e.key === 'z' && e.shiftKey) || (isCmd && e.key === 'y')) {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl+S = Save
      if (isCmd && e.key === 's') {
        e.preventDefault();
        handlers.onSave?.();
        return;
      }

      // Ctrl+G = Toggle grid
      if (isCmd && e.key === 'g') {
        e.preventDefault();
        toggleGrid();
        return;
      }

      // Delete / Backspace = Remove selected component
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedComponentId) {
        e.preventDefault();
        removeComponent(selectedComponentId);
        return;
      }

      // Escape = Deselect
      if (e.key === 'Escape') {
        selectComponent(null);
        return;
      }

      // Ctrl + / Ctrl - = Zoom
      if (isCmd && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setCanvasZoom(canvasZoom + 0.1);
        return;
      }
      if (isCmd && e.key === '-') {
        e.preventDefault();
        setCanvasZoom(canvasZoom - 0.1);
        return;
      }

      // Ctrl+0 = Reset zoom
      if (isCmd && e.key === '0') {
        e.preventDefault();
        setCanvasZoom(1);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    undo, redo, selectedComponentId, removeComponent, selectComponent,
    toggleGrid, setCanvasZoom, canvasZoom, handlers,
  ]);
};
