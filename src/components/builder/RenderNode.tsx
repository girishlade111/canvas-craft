import React, { memo, useState, useCallback, useRef } from 'react';
import { getComponent } from '@/engine/registry';
import { useBuilderStore } from '@/store/builderStore';
import { useDroppable } from '@dnd-kit/core';
import { isContainerType, type BuilderComponent, type DeviceView } from '@/types/builder';
import { Trash2, Code2, GripVertical, Copy, Lock, Eye, EyeOff } from 'lucide-react';

interface RenderNodeProps {
  node: BuilderComponent;
  depth?: number;
}

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
  nodeId: string;
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

// ─── Dimension Badge ───────────────────────────────────────

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

// ─── Main Render Node ──────────────────────────────────────

const RenderNode: React.FC<RenderNodeProps> = memo(({ node, depth = 0 }) => {
  const {
    selectedComponentId, selectComponent, removeComponent,
    openCodeEditor, updateComponentStyles, deviceView,
    snapToGrid, gridSize,
  } = useBuilderStore();

  const isSelected = selectedComponentId === node.id;
  const isContainer = isContainerType(node.type);
  const isHidden = node.hidden;
  const isLocked = node.locked;

  const nodeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showDimensions, setShowDimensions] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: node.id,
    data: { type: 'component', componentId: node.id, isContainer, accepts: isContainer },
    disabled: !isContainer || isLocked,
  });

  const Component = getComponent(node.type);

  // Resolve responsive styles
  const resolvedStyles: React.CSSProperties = {
    ...(node.styles as React.CSSProperties),
    ...(node.responsiveStyles?.[deviceView] as React.CSSProperties),
  };

  // Strip custom keys
  const { customCSS: _css, customClasses, ...renderStyles } = resolvedStyles as any;

  const componentProps: Record<string, any> = {
    content: node.content,
    ...node.props,
  };

  const renderedChildren = node.children?.length
    ? node.children.map((child) => <RenderNode key={child.id} node={child} depth={depth + 1} />)
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

      newW = Math.max(20, newW);
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

  if (isHidden) {
    return (
      <div
        className="canvas-component opacity-20 pointer-events-none"
        style={{ ...renderStyles, outline: '1px dashed hsl(var(--muted-foreground) / 0.3)' }}
      >
        <Component {...componentProps}>{renderedChildren}</Component>
      </div>
    );
  }

  return (
    <div
      ref={(el) => {
        (nodeRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (isContainer && el) setNodeRef(el);
      }}
      className={[
        'canvas-component',
        isSelected ? 'selected' : '',
        isContainer && isOver ? 'drop-target' : '',
        isResizing ? 'resizing' : '',
        customClasses || '',
      ].filter(Boolean).join(' ')}
      style={renderStyles}
      onClick={(e) => { e.stopPropagation(); if (!isLocked) selectComponent(node.id); }}
    >
      {/* Selected toolbar */}
      {isSelected && !isResizing && (
        <div className="component-toolbar">
          <GripVertical className="w-3 h-3" />
          <span className="truncate max-w-[80px]">{node.label}</span>
          <button onClick={(e) => { e.stopPropagation(); openCodeEditor(node.id); }} className="hover:opacity-70" title="Edit code">
            <Code2 className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeComponent(node.id); }} className="hover:opacity-70" title="Delete">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Resize handles when selected */}
      {isSelected && !isLocked && (
        <ResizeHandles nodeId={node.id} onResizeStart={handleResizeStart} />
      )}

      {/* Dimension badge while resizing */}
      {showDimensions && (
        <DimensionBadge width={dimensions.width} height={dimensions.height} />
      )}

      <Component {...componentProps}>
        {renderedChildren}
      </Component>

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
