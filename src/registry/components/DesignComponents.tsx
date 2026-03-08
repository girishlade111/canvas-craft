import React from 'react';

// ─── Text Block Components ─────────────────────────────────

export const TableComponent: React.FC<{
  rows?: number;
  columns?: number;
}> = ({ rows = 3, columns = 3 }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
    <thead>
      <tr>
        {Array.from({ length: columns }).map((_, i) => (
          <th
            key={i}
            style={{
              padding: '10px 14px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '2px solid hsl(var(--border))',
              background: 'hsl(var(--muted))',
            }}
          >
            Header {i + 1}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: columns }).map((_, c) => (
            <td
              key={c}
              style={{
                padding: '10px 14px',
                borderBottom: '1px solid hsl(var(--border))',
              }}
            >
              Cell {r + 1}-{c + 1}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const PullQuoteComponent: React.FC<{ content?: string }> = ({ content }) => (
  <blockquote
    style={{
      fontSize: '24px',
      fontWeight: 700,
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '32px 24px',
      borderTop: '4px solid hsl(var(--primary))',
      borderBottom: '4px solid hsl(var(--primary))',
      margin: '24px 0',
      lineHeight: 1.4,
    }}
  >
    {content || '"Design is intelligence made visible."'}
  </blockquote>
);

export const CodeBlockComponent: React.FC<{
  content?: string;
  language?: string;
}> = ({ content, language = 'javascript' }) => (
  <pre
    style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '13px',
      background: 'hsl(220 20% 12%)',
      color: 'hsl(210 15% 85%)',
      padding: '20px',
      borderRadius: '8px',
      overflow: 'auto',
      lineHeight: 1.7,
    }}
  >
    <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
      {language}
    </div>
    <code>{content || 'const greeting = "Hello, World!";\nconsole.log(greeting);'}</code>
  </pre>
);

export const PreformattedComponent: React.FC<{ content?: string }> = ({ content }) => (
  <pre
    style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '13px',
      background: 'hsl(var(--muted))',
      padding: '20px',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap',
      lineHeight: 1.6,
      border: '1px solid hsl(var(--border))',
    }}
  >
    {content || 'Preformatted text block.\nWhitespace is preserved.'}
  </pre>
);

export const VerseComponent: React.FC<{ content?: string }> = ({ content }) => (
  <pre
    style={{
      fontFamily: 'Georgia, serif',
      fontSize: '16px',
      fontStyle: 'italic',
      lineHeight: 1.8,
      padding: '24px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      color: 'hsl(var(--foreground))',
    }}
  >
    {content || 'Two roads diverged in a wood,\nand I—\nI took the one less traveled by,\nAnd that has made all the difference.'}
  </pre>
);

// ─── Design Block Components ───────────────────────────────

export const GroupComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '16px' }}>
    {children || (
      <div style={{ padding: '24px', border: '1px dashed hsl(var(--border))', borderRadius: '8px', textAlign: 'center', opacity: 0.5, fontSize: '13px' }}>
        Group — drop elements here
      </div>
    )}
  </div>
);

export const RowComponent: React.FC<{ gap?: string; children?: React.ReactNode }> = ({ gap = '16px', children }) => (
  <div style={{ display: 'flex', gap, alignItems: 'center' }}>
    {children || (
      <>
        <div style={{ flex: 1, padding: '16px', background: 'hsl(var(--muted))', borderRadius: '6px', textAlign: 'center', fontSize: '13px' }}>Block 1</div>
        <div style={{ flex: 1, padding: '16px', background: 'hsl(var(--muted))', borderRadius: '6px', textAlign: 'center', fontSize: '13px' }}>Block 2</div>
      </>
    )}
  </div>
);

export const StackComponent: React.FC<{ gap?: string; children?: React.ReactNode }> = ({ gap = '12px', children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {children || (
      <>
        <div style={{ padding: '16px', background: 'hsl(var(--muted))', borderRadius: '6px', textAlign: 'center', fontSize: '13px' }}>Block 1</div>
        <div style={{ padding: '16px', background: 'hsl(var(--muted))', borderRadius: '6px', textAlign: 'center', fontSize: '13px' }}>Block 2</div>
      </>
    )}
  </div>
);

export const SeparatorComponent: React.FC<{ color?: string }> = ({ color }) => (
  <hr style={{ border: 'none', borderTop: `1px solid ${color || 'hsl(var(--border))'}`, margin: '24px 0' }} />
);

export const MoreComponent: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '12px', fontSize: '14px', color: 'hsl(var(--primary))', cursor: 'pointer', fontWeight: 500 }}>
    ― Read More ―
  </div>
);

export const PageBreakComponent: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '16px', borderTop: '2px dashed hsl(var(--border))', borderBottom: '2px dashed hsl(var(--border))', margin: '16px 0', fontSize: '12px', opacity: 0.5, letterSpacing: '2px', textTransform: 'uppercase' }}>
    Page Break
  </div>
);

// ─── Cover Component ───────────────────────────────────────

export const CoverComponent: React.FC<{
  src?: string;
  overlayColor?: string;
  overlayOpacity?: string;
  content?: string;
  children?: React.ReactNode;
}> = ({ src, overlayColor = '#000', overlayOpacity = '0.5', content, children }) => (
  <div
    style={{
      position: 'relative',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: src ? `url(${src})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      background: !src ? 'linear-gradient(135deg, hsl(210 100% 20%), hsl(210 100% 40%))' : undefined,
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, background: overlayColor, opacity: Number(overlayOpacity) }} />
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '40px' }}>
      <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>
        {content || 'Cover Title'}
      </h2>
      {children}
    </div>
  </div>
);

export const MediaTextComponent: React.FC<{
  src?: string;
  content?: string;
  mediaPosition?: string;
  children?: React.ReactNode;
}> = ({ src, content, mediaPosition = 'left', children }) => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexDirection: mediaPosition === 'right' ? 'row-reverse' : 'row' }}>
    <div style={{ flex: 1 }}>
      <img
        src={src || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'}
        alt="Media"
        style={{ width: '100%', borderRadius: '8px', display: 'block' }}
        loading="lazy"
      />
    </div>
    <div style={{ flex: 1, padding: '16px' }}>
      <p style={{ fontSize: '16px', lineHeight: 1.7 }}>
        {content || 'Add your content alongside media. This layout helps create engaging sections with both text and imagery.'}
      </p>
      {children}
    </div>
  </div>
);

export const FileComponent: React.FC<{
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
}> = ({ fileName = 'document.pdf', fileSize = '2.4 MB' }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      background: 'hsl(var(--muted) / 0.3)',
    }}
  >
    <span style={{ fontSize: '28px' }}>📄</span>
    <div style={{ flex: 1 }}>
      <p style={{ fontWeight: 600, fontSize: '14px' }}>{fileName}</p>
      <p style={{ fontSize: '12px', opacity: 0.5 }}>{fileSize}</p>
    </div>
    <span style={{ fontSize: '13px', color: 'hsl(var(--primary))', fontWeight: 500, cursor: 'pointer' }}>
      Download ↓
    </span>
  </div>
);

export const AudioComponent: React.FC<{ src?: string }> = ({ src }) =>
  src ? (
    <audio controls style={{ width: '100%' }}>
      <source src={src} />
    </audio>
  ) : (
    <div
      style={{
        padding: '20px',
        background: 'hsl(var(--muted))',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <span style={{ fontSize: '28px' }}>🎵</span>
      <div style={{ flex: 1 }}>
        <div style={{ height: '4px', background: 'hsl(var(--border))', borderRadius: '2px', marginBottom: '8px' }}>
          <div style={{ width: '35%', height: '100%', background: 'hsl(var(--primary))', borderRadius: '2px' }} />
        </div>
        <p style={{ fontSize: '12px', opacity: 0.5 }}>Add an audio URL to play</p>
      </div>
    </div>
  );
