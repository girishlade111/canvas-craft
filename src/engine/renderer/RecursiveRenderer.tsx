/**
 * Layer 3 — Rendering Engine
 * Converts the component tree JSON into actual React components.
 * This is a pure rendering layer — no editing UI, no DnD, no selection.
 * Used for preview mode and export rendering.
 */

import React, { memo } from 'react';
import { getComponent } from '@/engine/registry';
import type { BuilderComponent, DeviceView } from '@/types/builder';

interface RecursiveRendererProps {
  node: BuilderComponent;
  deviceView?: DeviceView;
}

const RecursiveRenderer: React.FC<RecursiveRendererProps> = memo(({ node, deviceView = 'desktop' }) => {
  const Component = getComponent(node.type);

  // Merge base styles with responsive overrides
  const resolvedStyles = {
    ...node.styles,
    ...node.responsiveStyles?.[deviceView],
  };

  // Strip builder-internal style keys
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
