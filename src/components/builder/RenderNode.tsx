import React, { memo } from 'react';
import { getComponent } from '@/registry/ComponentRegistry';
import { useBuilderStore } from '@/store/builderStore';
import { useDroppable } from '@dnd-kit/core';
import { isContainerType, type BuilderComponent } from '@/types/builder';
import { Trash2, Code2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';

interface RenderNodeProps {
  node: BuilderComponent;
  depth?: number;
}

const RenderNode: React.FC<RenderNodeProps> = memo(({ node, depth = 0 }) => {
  const { selectedComponentId, selectComponent, removeComponent, openCodeEditor } = useBuilderStore();
  const isSelected = selectedComponentId === node.id;
  const isContainer = isContainerType(node.type);

  const { setNodeRef, isOver } = useDroppable({
    id: node.id,
    data: { type: 'component', componentId: node.id, isContainer, accepts: isContainer },
    disabled: !isContainer,
  });

  const Component = getComponent(node.type);

  const componentProps: Record<string, any> = {
    content: node.content,
    ...node.props,
  };

  const renderedChildren = node.children?.length
    ? node.children.map((child) => <RenderNode key={child.id} node={child} depth={depth + 1} />)
    : undefined;

  return (
    <div
      ref={isContainer ? setNodeRef : undefined}
      className={`canvas-component ${isSelected ? 'selected' : ''} ${isContainer && isOver ? 'drop-target' : ''}`}
      style={node.styles as React.CSSProperties}
      onClick={(e) => { e.stopPropagation(); selectComponent(node.id); }}
    >
      {isSelected && (
        <div className="component-toolbar">
          <GripVertical className="w-3 h-3" />
          <span className="truncate max-w-[100px]">{node.label}</span>
          <button onClick={(e) => { e.stopPropagation(); openCodeEditor(node.id); }} className="hover:opacity-70">
            <Code2 className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeComponent(node.id); }} className="hover:opacity-70">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
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
