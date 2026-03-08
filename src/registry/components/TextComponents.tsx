import React from 'react';

export const HeadingComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h2>{content || 'Heading Text'}</h2>
);

export const SubheadingComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h3>{content || 'Subheading Text'}</h3>
);

export const ParagraphComponent: React.FC<{ content?: string }> = ({ content }) => (
  <p>{content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
);

export const ListComponent: React.FC<{ content?: string }> = ({ content }) => (
  <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
    {(content || 'Item 1\nItem 2\nItem 3').split('\n').map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const QuoteComponent: React.FC<{ content?: string }> = ({ content }) => (
  <blockquote style={{ borderLeft: '3px solid hsl(var(--primary))', paddingLeft: '16px', fontStyle: 'italic' }}>
    {content || '"Design is not just what it looks like. Design is how it works."'}
  </blockquote>
);

export const ButtonComponent: React.FC<{ content?: string; variant?: string }> = ({ content, variant = 'primary' }) => (
  <button
    style={{
      padding: '10px 24px',
      borderRadius: '6px',
      fontWeight: 600,
      border: variant === 'outline' ? '2px solid hsl(var(--primary))' : 'none',
      background: variant === 'outline' ? 'transparent' : 'hsl(var(--primary))',
      color: variant === 'outline' ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))',
      cursor: 'pointer',
    }}
  >
    {content || 'Click Me'}
  </button>
);
