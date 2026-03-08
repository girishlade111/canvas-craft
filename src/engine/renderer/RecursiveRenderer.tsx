/**
 * Layer 3 — Rendering Engine
 * Converts the component tree JSON into actual React components.
 * Pure rendering layer — no editing UI, no DnD, no selection.
 */

import React, { memo, useState, useEffect } from 'react';
import { getComponent, onRegistryUpdate } from '@/engine/registry';
import type { BuilderComponent, DeviceView } from '@/types/builder';

interface RecursiveRendererProps {
  node: BuilderComponent;
  deviceView?: DeviceView;
}

const RecursiveRenderer: React.FC<RecursiveRendererProps> = memo(({ node, deviceView = 'desktop' }) => {
  // Re-render when extended components finish loading
  const [, forceUpdate] = useState(0);
  useEffect(() => onRegistryUpdate(() => forceUpdate(n => n + 1)), []);

  const Component = getComponent(node.type);

  const resolvedStyles = {
    ...node.styles,
    ...node.responsiveStyles?.[deviceView],
  };

  const { customCSS: _css, customClasses, ...cssStyles } = resolvedStyles;

  const componentProps: Record<string, any> = {
    content: node.content,
    ...node.props,
  };

  const children = node.children?.length
    ? node.children.map(child => (
        <RecursiveRenderer key={child.id} node={child} deviceView={deviceView} />
      ))
    : undefined;

  return (
    <div
      className={customClasses || undefined}
      style={cssStyles as React.CSSProperties}
    >
      <Component {...componentProps}>{children}</Component>
    </div>
  );
});

RecursiveRenderer.displayName = 'RecursiveRenderer';

export default RecursiveRenderer;
