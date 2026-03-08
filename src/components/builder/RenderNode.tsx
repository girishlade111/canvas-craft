import React, { memo, useState, useCallback, useRef } from 'react';
import { getComponent } from '@/engine/registry';
import { useBuilderStore } from '@/store/builderStore';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { isContainerType, type BuilderComponent } from '@/types/builder';
import { Trash2, Code2, GripVertical, Eye, EyeOff, Lock, Unlock, Copy } from 'lucide-react';

interface RenderNodeProps {
  node: BuilderComponent;
  depth?: number;
  parentId?: string;
  index?: number;
}

// ─── Text types that support inline editing ────────────────
const TEXT_TYPES = new Set(['heading', 'paragraph', 'text', 'label', 'quote', 'blockquote', 'list-item', 'code-block', 'rich-text']);

// ─── Resize Handles ────────────────────────────────────────

const HANDLE_SIZE = 8;
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const handlePositions: Record<ResizeDirection, React.CSSProperties> = {
  n:  { top: -HANDLE_SIZE/2, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize', width: HANDLE_SIZE * 3, height: HANDLE_SIZE },
  s:  { bottom: -HANDLE_SIZE/2, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize', width: HANDLE_SIZE * 3, height: HANDLE_SIZE },
  e:  { right: -HANDLE_SIZE/2, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize', width: HANDLE_SIZE, height: HANDLE_SIZE * 3 },
  w:  { left: -HANDLE_SIZE/2, top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize', width: HANDLE_SIZE, height: HANDLE_SIZE * 3 },
  ne: { top: -HANDLE_SIZE/2, right: -HANDLE_SIZE/2, cursor: 'nesw-resize', width: HANDLE_SIZE, height: HANDLE_SIZE },
  nw: { top: -HANDLE_SIZE/2, left: -HANDLE_SIZE/2, cursor: 'nwse-resize', width: HANDLE_SIZE, height: HANDLE_SIZE },
  se: { bottom: -HANDLE_SIZE/2, right: -HANDLE_SIZE/2, cursor: 'nwse-resize', width: HANDLE_SIZE, height: HANDLE_SIZE },
  sw: { bottom: -HANDLE_SIZE/2, left: -HANDLE_SIZE/2, cursor: 'nesw-resize', width: HANDLE_SIZE, height: HANDLE_SIZE },
};

const ResizeHandles: React.FC<{
  onResizeStart: (dir: ResizeDirection, e: React.MouseEvent) => void;
}> = ({ onResizeStart }) => (
  <>
    {(Object.keys(handlePositions) as ResizeDirection[]).map(dir => (
      <div
        key={dir}
        className="resize-handle"
        style={{
          position: 'absolute',
          ...handlePositions[dir],
          borderRadius: '2px',
          background: 'hsl(var(--primary))',
          border: '1px solid hsl(var(--primary-foreground))',
          zIndex: 20,
          opacity: 0.9,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onResizeStart(dir, e);
        }}
      />
    ))}
  </>
);

const DimensionBadge: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div
    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20"
    style={{
      background: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      fontFamily: "'JetBrains Mono', monospace",
    }}
  >
    {Math.round(width)} × {Math.round(height)}
  </div>
);

// ─── Inline Text Formatting Toolbar ────────────────────────

const InlineTextToolbar: React.FC<{
  onFormat: (cmd: string, value?: string) => void;
}> = ({ onFormat }) => (
  <div className="inline-text-toolbar" onClick={e => e.stopPropagation()}>
    <button onMouseDown={e => { e.preventDefault(); onFormat('bold'); }} title="Bold (Ctrl+B)"><b>B</b></button>
    <button onMouseDown={e => { e.preventDefault(); onFormat('italic'); }} title="Italic (Ctrl+I)"><i>I</i></button>
    <button onMouseDown={e => { e.preventDefault(); onFormat('underline'); }} title="Underline (Ctrl+U)"><u>U</u></button>
    <button onMouseDown={e => { e.preventDefault(); onFormat('strikeThrough'); }} title="Strikethrough"><s>S</s></button>
    <span className="inline-toolbar-divider" />
    <button onMouseDown={e => { e.preventDefault(); onFormat('justifyLeft'); }} title="Align Left">⫷</button>
    <button onMouseDown={e => { e.preventDefault(); onFormat('justifyCenter'); }} title="Align Center">⫸</button>
    <button onMouseDown={e => { e.preventDefault(); onFormat('justifyRight'); }} title="Align Right">⫹</button>
    <span className="inline-toolbar-divider" />
    <select
      onChange={e => { onFormat('fontSize', e.target.value); }}
      defaultValue="3"
      className="inline-toolbar-select"
      onMouseDown={e => e.stopPropagation()}
    >
      <option value="1">12px</option>
      <option value="2">14px</option>
      <option value="3">16px</option>
      <option value="4">18px</option>
      <option value="5">24px</option>
      <option value="6">32px</option>
      <option value="7">48px</option>
    </select>
    <button onMouseDown={e => { e.preventDefault(); onFormat('removeFormat'); }} title="Clear Format">✕</button>
  </div>
);

// ─── Main Render Node ──────────────────────────────────────

const RenderNode: React.FC<RenderNodeProps> = memo(({ node, depth = 0, parentId, index = 0 }) => {
  const {
    selectedComponentId, selectComponent, removeComponent,
    openCodeEditor, updateComponentStyles, deviceView,
    snapToGrid, gridSize, updateComponent,
    addComponentToContainer,
  } = useBuilderStore();

  const isSelected = selectedComponentId === node.id;
  const isContainer = isContainerType(node.type);
  const isHidden = node.hidden;
  const isLocked = node.locked;
  const isTextElement = TEXT_TYPES.has(node.type);

  const nodeRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showDimensions, setShowDimensions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInlineEditing, setIsInlineEditing] = useState(false);

  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `canvas-${node.id}`,
    data: {
      type: 'canvas-component',
      componentId: node.id,
      parentId,
      index,
      fromCanvas: true,
      label: node.label,
      componentType: node.type,
    },
    disabled: isLocked || isResizing || isInlineEditing,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: node.id,
    data: {
      type: 'component',
      componentId: node.id,
      isContainer,
      parentId,
      index,
      accepts: true,
    },
    disabled: isLocked,
  });

  const Component = getComponent(node.type);

  const resolvedStyles: React.CSSProperties = {
    ...(node.styles as React.CSSProperties),
    ...(node.responsiveStyles?.[deviceView] as React.CSSProperties),
  };

  const { customCSS: _css, customClasses, ...renderStyles } = resolvedStyles as any;

  const componentProps: Record<string, any> = {
    content: node.content,
    ...node.props,
  };

  const renderedChildren = node.children?.length
    ? node.children.map((child, i) => (
        <RenderNode key={child.id} node={child} depth={depth + 1} parentId={node.id} index={i} />
      ))
    : undefined;

  // ─── Resize logic ─────────────────────────────────────

  const snapValue = useCallback((val: number) => {
    if (!snapToGrid) return val;
    return Math.round(val / gridSize) * gridSize;
  }, [snapToGrid, gridSize]);

  const handleResizeStart = useCallback((dir: ResizeDirection, e: React.MouseEvent) => {
    if (isLocked) return;
    setIsResizing(true);
    const el = nodeRef.current;
    if (!el) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startRect = el.getBoundingClientRect();
    const startW = startRect.width;
    const startH = startRect.height;
    const shiftHeld = e.shiftKey;
    const aspectRatio = startW / startH;

    setDimensions({ width: startW, height: startH });
    setShowDimensions(true);

    const onMove = (me: MouseEvent) => {
      let newW = startW;
      let newH = startH;
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;

      if (dir.includes('e')) newW = snapValue(startW + dx);
      if (dir.includes('w')) newW = snapValue(startW - dx);
      if (dir.includes('s')) newH = snapValue(startH + dy);
      if (dir.includes('n')) newH = snapValue(startH - dy);

      if (shiftHeld || me.shiftKey) {
        if (dir.includes('e') || dir.includes('w')) {
          newH = newW / aspectRatio;
        } else {
          newW = newH * aspectRatio;
        }
      }

      newW = Math.max(50, newW);
      newH = Math.max(20, newH);

      setDimensions({ width: newW, height: newH });
      el.style.width = `${newW}px`;
      el.style.height = `${newH}px`;
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      setIsResizing(false);
      setShowDimensions(false);

      const rect = el.getBoundingClientRect();
      updateComponentStyles(node.id, {
        width: `${Math.round(rect.width)}px`,
        height: `${Math.round(rect.height)}px`,
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [isLocked, snapValue, updateComponentStyles, node.id]);

  const toggleVisibility = useCallback(() => {
    updateComponent(node.id, { hidden: !isHidden });
  }, [node.id, isHidden, updateComponent]);

  const toggleLock = useCallback(() => {
    updateComponent(node.id, { locked: !isLocked });
  }, [node.id, isLocked, updateComponent]);

  // ─── Inline editing ───────────────────────────────────

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked || !isTextElement) return;
    setIsInlineEditing(true);
    // Focus the editable area after state update
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
        // Place cursor at end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editableRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, 0);
  }, [isLocked, isTextElement]);

  const handleInlineBlur = useCallback(() => {
    if (editableRef.current) {
      const newContent = editableRef.current.innerHTML;
      updateComponent(node.id, { content: newContent });
    }
    setIsInlineEditing(false);
  }, [node.id, updateComponent]);

  const handleFormat = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleInlineBlur();
    }
    // Formatting shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); handleFormat('bold'); }
      if (e.key === 'i') { e.preventDefault(); handleFormat('italic'); }
      if (e.key === 'u') { e.preventDefault(); handleFormat('underline'); }
    }
    e.stopPropagation();
  }, [handleInlineBlur, handleFormat]);

  // Duplicate component
  const handleDuplicate = useCallback(() => {
    const cloneDeep = (comp: BuilderComponent): BuilderComponent => {
      const clone: BuilderComponent = { ...JSON.parse(JSON.stringify(comp)) };
      clone.id = `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      clone.label = `${comp.label} (copy)`;
      if (clone.children) {
        clone.children = clone.children.map(cloneDeep);
      }
      return clone;
    };
    const clone = cloneDeep(node);
    if (parentId) {
      // Check if parentId is a section or a component
      const schema = useBuilderStore.getState().schema;
      const isSection = schema.sections.some(s => s.id === parentId);
      if (isSection) {
        useBuilderStore.getState().addComponent(parentId, clone, index !== undefined ? index + 1 : undefined);
      } else {
        addComponentToContainer(parentId, clone);
      }
    }
  }, [node, parentId, index, addComponentToContainer]);

  if (isHidden) {
    return (
      <div
        className="canvas-component hidden-component"
        style={{ ...renderStyles, outline: '1px dashed hsl(var(--muted-foreground) / 0.3)', opacity: 0.2, pointerEvents: 'none' }}
      >
        <Component {...componentProps}>{renderedChildren}</Component>
      </div>
    );
  }

  const showDropIndicator = isOver && !isResizing && !isDragging;

  return (
    <div
      ref={(el) => {
        (nodeRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (el) {
          setDropRef(el);
          setDragRef(el);
        }
      }}
      {...dragAttributes}
      className={[
        'canvas-component',
        isSelected ? 'selected' : '',
        isContainer && isOver ? 'drop-target' : '',
        isResizing ? 'resizing' : '',
        isDragging ? 'dragging' : '',
        isHovered && !isSelected ? 'hovered' : '',
        isInlineEditing ? 'inline-editing' : '',
        customClasses || '',
      ].filter(Boolean).join(' ')}
      style={{
        ...renderStyles,
        opacity: isDragging ? 0.3 : undefined,
        transition: isDragging ? 'opacity 0.15s' : undefined,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLocked && !isInlineEditing) selectComponent(node.id);
      }}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blue insertion line for non-container drops */}
      {showDropIndicator && !isContainer && (
        <div className="drop-insertion-line drop-insertion-line--after" />
      )}

      {/* Container drop overlay */}
      {showDropIndicator && isContainer && (
        <div className="drop-container-overlay" />
      )}

      {/* Selection toolbar */}
      {isSelected && !isResizing && !isDragging && !isInlineEditing && (
        <div className="component-toolbar">
          <div {...dragListeners} className="cursor-grab active:cursor-grabbing p-0.5">
            <GripVertical className="w-3 h-3" />
          </div>
          <span className="truncate max-w-[80px]">{node.label}</span>
          <button onClick={(e) => { e.stopPropagation(); handleDuplicate(); }} className="hover:opacity-70" title="Duplicate">
            <Copy className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleVisibility(); }} className="hover:opacity-70" title={isHidden ? "Show" : "Hide"}>
            {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleLock(); }} className="hover:opacity-70" title={isLocked ? "Unlock" : "Lock"}>
            {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); openCodeEditor(node.id); }} className="hover:opacity-70" title="Edit code">
            <Code2 className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeComponent(node.id); }} className="hover:opacity-70" style={{ color: 'hsl(0 80% 80%)' }} title="Delete">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Inline text formatting toolbar */}
      {isInlineEditing && (
        <InlineTextToolbar onFormat={handleFormat} />
      )}

      {/* Hover label (when not selected) */}
      {isHovered && !isSelected && !isDragging && (
        <div className="component-hover-label">
          {node.label}
        </div>
      )}

      {/* Resize handles when selected */}
      {isSelected && !isLocked && !isDragging && !isInlineEditing && (
        <ResizeHandles onResizeStart={handleResizeStart} />
      )}

      {/* Dimension badge while resizing */}
      {showDimensions && (
        <DimensionBadge width={dimensions.width} height={dimensions.height} />
      )}

      {/* Inline editable content OR normal render */}
      {isInlineEditing && isTextElement ? (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          className="inline-editable-content"
          style={{ outline: 'none', minHeight: '1em', cursor: 'text' }}
          dangerouslySetInnerHTML={{ __html: node.content || '' }}
          onBlur={handleInlineBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Component {...componentProps}>
          {renderedChildren}
        </Component>
      )}

      {isContainer && (!node.children || node.children.length === 0) && (
        <div className="empty-container-placeholder">
          Drop components here
        </div>
      )}
    </div>
  );
});

RenderNode.displayName = 'RenderNode';

export default RenderNode;
