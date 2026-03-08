import React from 'react';

interface FallbackComponentProps {
  type: string;
  content?: string;
  children?: React.ReactNode;
}

/**
 * FallbackComponent renders unknown component types in an editable, visible way
 * instead of just showing an error. It displays the component's content and children.
 */
const FallbackComponent: React.FC<FallbackComponentProps> = ({ type, content, children }) => (
  <div
    style={{
      padding: '16px 20px',
      borderRadius: '8px',
      border: '1px solid hsl(var(--border))',
      background: 'hsl(var(--muted) / 0.3)',
      minHeight: '40px',
    }}
  >
    {content ? (
      <div style={{ fontSize: '14px', lineHeight: 1.6 }}>{content}</div>
    ) : (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>📦</span>
        <span style={{ fontSize: '13px', fontWeight: 500 }}>{type}</span>
        <span style={{ fontSize: '11px', opacity: 0.4 }}>— edit in properties</span>
      </div>
    )}
    {children}
  </div>
);

export default FallbackComponent;
