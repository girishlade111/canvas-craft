import React from 'react';

export const HtmlComponent: React.FC<{ content?: string }> = ({ content }) => (
  <div
    dangerouslySetInnerHTML={{ __html: content || '<div>Custom HTML</div>' }}
    style={{ fontFamily: 'monospace' }}
  />
);

export const CustomCodeComponent: React.FC<{ content?: string }> = ({ content }) => (
  <pre style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '13px', background: 'hsl(var(--muted))', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
    <code>{content || '// Custom code here'}</code>
  </pre>
);

export const ApiPlaceholderComponent: React.FC = () => (
  <div style={{ border: '2px dashed hsl(var(--border))', padding: '32px', textAlign: 'center', borderRadius: '8px' }}>
    <p style={{ fontSize: '24px', marginBottom: '8px' }}>🌐</p>
    <p style={{ fontWeight: 600 }}>API Data Block</p>
    <p style={{ opacity: 0.5, fontSize: '13px', marginTop: '4px' }}>Connect to an API endpoint to display dynamic data</p>
  </div>
);
