import React from 'react';

export const HtmlComponent: React.FC<{ content?: string; htmlContent?: string }> = ({ content, htmlContent }) => (
  <div
    dangerouslySetInnerHTML={{ __html: htmlContent || content || '<div style="padding:16px;font-family:monospace;color:hsl(var(--foreground))">Custom HTML</div>' }}
  />
);

export const CustomCodeComponent: React.FC<{ content?: string; language?: string }> = ({ content, language = 'javascript' }) => (
  <pre
    style={{
      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
      fontSize: '13px',
      background: 'hsl(var(--muted))',
      padding: '20px',
      borderRadius: '12px',
      overflow: 'auto',
      lineHeight: 1.6,
      border: '1px solid hsl(var(--border))',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      <span>{language}</span>
      <span>📋 Copy</span>
    </div>
    <code>{content || '// Your custom code here\nconsole.log("Hello, World!");'}</code>
  </pre>
);

export const ApiPlaceholderComponent: React.FC<{
  endpoint?: string;
  method?: string;
}> = ({ endpoint, method = 'GET' }) => (
  <div
    style={{
      border: '2px dashed hsl(var(--border))',
      padding: '32px',
      textAlign: 'center',
      borderRadius: '12px',
      background: 'hsl(var(--muted) / 0.3)',
    }}
  >
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌐</div>
    <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>API Data Block</p>
    {endpoint ? (
      <div style={{ marginTop: '12px' }}>
        <code
          style={{
            background: 'hsl(var(--muted))',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        >
          {method} {endpoint}
        </code>
      </div>
    ) : (
      <p style={{ opacity: 0.5, fontSize: '13px' }}>
        Connect to an API endpoint to display dynamic data
      </p>
    )}
  </div>
);
