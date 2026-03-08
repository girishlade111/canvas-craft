import React from 'react';

const headingTag = (level: string | number = 2) => {
  const Tag = `h${Math.min(Math.max(Number(level) || 2, 1), 6)}` as keyof JSX.IntrinsicElements;
  return Tag;
};

export const HeadingComponent: React.FC<{ content?: string; level?: string }> = ({ content, level = '2' }) => {
  const Tag = headingTag(level);
  return <Tag>{content || 'Heading Text'}</Tag>;
};

export const SubheadingComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h3 style={{ opacity: 0.85 }}>{content || 'Subheading Text'}</h3>
);

export const ParagraphComponent: React.FC<{ content?: string }> = ({ content }) => (
  <p>{content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
);

export const ListComponent: React.FC<{ content?: string; listStyle?: string }> = ({ content, listStyle = 'disc' }) => {
  const items = (content || 'Item 1\nItem 2\nItem 3').split('\n').filter(Boolean);
  const isOrdered = listStyle === 'decimal';
  const Tag = isOrdered ? 'ol' : 'ul';
  return (
    <Tag style={{ listStyleType: listStyle, paddingLeft: '24px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ padding: '2px 0' }}>{item}</li>
      ))}
    </Tag>
  );
};

export const QuoteComponent: React.FC<{ content?: string; author?: string }> = ({ content, author }) => (
  <blockquote
    style={{
      borderLeft: '4px solid hsl(var(--primary))',
      paddingLeft: '20px',
      fontStyle: 'italic',
      margin: '0',
    }}
  >
    <p style={{ marginBottom: author ? '8px' : 0 }}>
      {content || '"Design is not just what it looks like. Design is how it works."'}
    </p>
    {author && (
      <cite style={{ fontSize: '14px', opacity: 0.7, fontStyle: 'normal' }}>— {author}</cite>
    )}
  </blockquote>
);

const buttonSizes: Record<string, React.CSSProperties> = {
  sm: { padding: '6px 16px', fontSize: '13px' },
  md: { padding: '10px 24px', fontSize: '14px' },
  lg: { padding: '14px 32px', fontSize: '16px' },
  xl: { padding: '18px 40px', fontSize: '18px' },
};

const buttonVariants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
  },
  secondary: {
    background: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'hsl(var(--primary))',
    border: '2px solid hsl(var(--primary))',
  },
  ghost: {
    background: 'transparent',
    color: 'hsl(var(--foreground))',
    border: 'none',
  },
  destructive: {
    background: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    border: 'none',
  },
};

export const ButtonComponent: React.FC<{
  content?: string;
  variant?: string;
  size?: string;
  fullWidth?: boolean;
  url?: string;
}> = ({ content, variant = 'primary', size = 'md', fullWidth = false, url }) => {
  const style: React.CSSProperties = {
    ...buttonVariants[variant] || buttonVariants.primary,
    ...buttonSizes[size] || buttonSizes.md,
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : undefined,
    textDecoration: 'none',
  };

  if (url) {
    return <a href={url} style={style}>{content || 'Click Me'}</a>;
  }
  return <button style={style}>{content || 'Click Me'}</button>;
};
