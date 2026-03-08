/**
 * Generic / variant components that serve as renderers for the many
 * component-library types that don't need unique implementations.
 * They render based on content, props, and styles passed through.
 */
import React from 'react';

// ─── Generic Text ──────────────────────────────────────────

export const GenericHeading: React.FC<{ content?: string; level?: string | number }> = ({ content, level = 2 }) => {
  const Tag = `h${Math.min(Math.max(Number(level) || 2, 1), 6)}` as keyof JSX.IntrinsicElements;
  return <Tag>{content || 'Heading'}</Tag>;
};

export const GenericText: React.FC<{ content?: string; children?: React.ReactNode }> = ({ content, children }) => (
  <div>{children || content || 'Text content'}</div>
);

export const GenericParagraph: React.FC<{ content?: string }> = ({ content }) => (
  <p>{content || 'Paragraph text goes here.'}</p>
);

export const GenericList: React.FC<{ content?: string; ordered?: boolean }> = ({ content, ordered }) => {
  const items = (content || 'Item 1\nItem 2\nItem 3').split('\n').filter(Boolean);
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag style={{ listStyleType: ordered ? 'decimal' : 'disc', paddingLeft: '24px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
};

export const GenericBadge: React.FC<{ content?: string; variant?: string }> = ({ content, variant }) => {
  const colors: Record<string, { bg: string; color: string }> = {
    success: { bg: 'hsl(142 70% 45% / 0.15)', color: 'hsl(142 70% 35%)' },
    warning: { bg: 'hsl(38 92% 50% / 0.15)', color: 'hsl(38 92% 40%)' },
    error: { bg: 'hsl(0 84% 60% / 0.15)', color: 'hsl(0 84% 50%)' },
    info: { bg: 'hsl(217 91% 60% / 0.15)', color: 'hsl(217 91% 50%)' },
    default: { bg: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' },
  };
  const c = colors[variant || 'default'] || colors.default;
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: c.bg, color: c.color }}>
      {content || 'Badge'}
    </span>
  );
};

// ─── Alert / Callout boxes ─────────────────────────────────

export const GenericAlertBox: React.FC<{ content?: string; variant?: string; icon?: string }> = ({ content, variant = 'info', icon }) => {
  const styles: Record<string, { bg: string; border: string; icon: string }> = {
    info: { bg: 'hsl(217 91% 60% / 0.08)', border: 'hsl(217 91% 60% / 0.3)', icon: icon || 'ℹ️' },
    warning: { bg: 'hsl(38 92% 50% / 0.08)', border: 'hsl(38 92% 50% / 0.3)', icon: icon || '⚠️' },
    error: { bg: 'hsl(0 84% 60% / 0.08)', border: 'hsl(0 84% 60% / 0.3)', icon: icon || '❌' },
    success: { bg: 'hsl(142 70% 45% / 0.08)', border: 'hsl(142 70% 45% / 0.3)', icon: icon || '✅' },
    tip: { bg: 'hsl(270 60% 60% / 0.08)', border: 'hsl(270 60% 60% / 0.3)', icon: icon || '💡' },
  };
  const s = styles[variant] || styles.info;
  return (
    <div style={{ padding: '16px 20px', borderRadius: '8px', border: `1px solid ${s.border}`, background: s.bg, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '18px', lineHeight: 1 }}>{s.icon}</span>
      <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.6 }}>{content || 'Alert message here.'}</div>
    </div>
  );
};

// ─── Generic Container ─────────────────────────────────────

export const GenericContainer: React.FC<{ children?: React.ReactNode; content?: string }> = ({ children, content }) => (
  <div>{children || content || null}</div>
);

// ─── Generic Button ────────────────────────────────────────

export const GenericButton: React.FC<{ content?: string; icon?: string; url?: string }> = ({ content, icon, url }) => {
  const inner = (
    <button style={{
      padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
      background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))',
      border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px',
    }}>
      {icon && <span>{icon}</span>}
      {content || 'Button'}
    </button>
  );
  if (url) return <a href={url} style={{ textDecoration: 'none' }}>{inner}</a>;
  return inner;
};

export const GenericButtonGroup: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {children || (
      <>
        <button style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 600, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', cursor: 'pointer' }}>Primary</button>
        <button style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 600, background: 'transparent', color: 'inherit', border: '1px solid hsl(var(--border))', cursor: 'pointer' }}>Secondary</button>
      </>
    )}
  </div>
);

// ─── Generic Card ──────────────────────────────────────────

export const GenericCard: React.FC<{
  content?: string; title?: string; description?: string; icon?: string;
  children?: React.ReactNode; name?: string; price?: string; period?: string;
  featured?: boolean; role?: string; rating?: number;
}> = ({ content, title, description, icon, children, name, price, period, featured, role, rating }) => (
  <div style={{
    padding: '24px', borderRadius: '12px',
    border: featured ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
    background: featured ? 'hsl(var(--primary) / 0.03)' : undefined,
  }}>
    {icon && <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>}
    {(title || name) && <h3 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '18px' }}>{title || name}</h3>}
    {price && <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px' }}>{price}<span style={{ fontSize: '14px', opacity: 0.5, fontWeight: 400 }}>{period || '/mo'}</span></div>}
    {role && <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '8px' }}>{role}</p>}
    {rating && <div style={{ marginBottom: '8px' }}>{'⭐'.repeat(rating)}</div>}
    {(description || content) && <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: 1.6 }}>{description || content}</p>}
    {children}
  </div>
);

// ─── Generic Embed Placeholder ─────────────────────────────

export const GenericEmbed: React.FC<{ content?: string; url?: string; platform?: string }> = ({ content, url, platform }) => (
  <div style={{
    border: '2px dashed hsl(var(--border))', padding: '32px', textAlign: 'center',
    borderRadius: '12px', background: 'hsl(var(--muted) / 0.3)',
  }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔗</div>
    <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{platform || content || 'Embed'}</p>
    {url ? (
      <code style={{ fontSize: '12px', opacity: 0.5, wordBreak: 'break-all' }}>{url}</code>
    ) : (
      <p style={{ opacity: 0.5, fontSize: '13px' }}>Configure URL in properties panel</p>
    )}
  </div>
);

// ─── Generic Image variants ────────────────────────────────

export const GenericImage: React.FC<{ src?: string; alt?: string; content?: string }> = ({ src, alt, content }) => (
  <img
    src={src || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'}
    alt={alt || content || 'Image'}
    loading="lazy"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  />
);

// ─── Generic Form elements ─────────────────────────────────

export const GenericFormField: React.FC<{
  label?: string; placeholder?: string; inputType?: string; content?: string;
}> = ({ label, placeholder, inputType = 'text', content }) => (
  <div style={{ width: '100%' }}>
    {(label || content) && <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>{label || content}</label>}
    <input
      type={inputType}
      placeholder={placeholder || `Enter ${label || 'value'}...`}
      style={{
        width: '100%', padding: '10px 14px', borderRadius: '8px',
        border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))',
        fontSize: '14px', color: 'inherit',
      }}
    />
  </div>
);

export const GenericFormGroup: React.FC<{ children?: React.ReactNode; label?: string }> = ({ children, label }) => (
  <fieldset style={{ border: '1px solid hsl(var(--border))', borderRadius: '8px', padding: '16px' }}>
    {label && <legend style={{ fontSize: '14px', fontWeight: 600, padding: '0 8px' }}>{label}</legend>}
    {children || <p style={{ opacity: 0.5, fontSize: '13px' }}>Drop form fields here</p>}
  </fieldset>
);

export const GenericForm: React.FC<{ content?: string; title?: string; buttonText?: string }> = ({ content, title, buttonText }) => (
  <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}>
    {title && <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '20px' }}>{title}</h3>}
    {content && <p style={{ marginBottom: '16px', opacity: 0.7 }}>{content}</p>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input placeholder="Your name" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '14px' }} />
      <input placeholder="Your email" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '14px' }} />
      <button style={{ padding: '12px', borderRadius: '8px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
        {buttonText || 'Submit'}
      </button>
    </div>
  </div>
);

// ─── Generic Navigation ────────────────────────────────────

export const GenericNav: React.FC<{ content?: string; children?: React.ReactNode }> = ({ content, children }) => (
  <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '12px 0' }}>
    {children || (
      <>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>{content || 'Site'}</span>
        {['Home', 'About', 'Services', 'Contact'].map(item => (
          <a key={item} href="#" style={{ fontSize: '14px', opacity: 0.7, textDecoration: 'none', color: 'inherit' }}>{item}</a>
        ))}
      </>
    )}
  </nav>
);

// ─── Generic Placeholder ───────────────────────────────────

export const GenericPlaceholder: React.FC<{ content?: string; icon?: string; children?: React.ReactNode }> = ({ content, icon, children }) => (
  <div style={{
    border: '2px dashed hsl(var(--border))', padding: '24px', textAlign: 'center',
    borderRadius: '12px', background: 'hsl(var(--muted) / 0.2)',
  }}>
    {icon && <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>}
    <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{content || 'Component'}</p>
    <p style={{ opacity: 0.4, fontSize: '12px' }}>Configure in properties panel</p>
    {children}
  </div>
);

// ─── Generic Counter / Metric ──────────────────────────────

export const GenericMetric: React.FC<{ label?: string; value?: string; change?: string; trend?: string }> = ({ label, value, change, trend }) => (
  <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}>
    <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>{label || 'Metric'}</p>
    <p style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{value || '0'}</p>
    {change && <span style={{ fontSize: '12px', color: trend === 'down' ? 'hsl(0 84% 60%)' : 'hsl(142 70% 45%)' }}>{change}</span>}
  </div>
);

// ─── Generic Divider ───────────────────────────────────────

export const GenericDivider: React.FC<{ content?: string }> = ({ content }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
    <div style={{ flex: 1, height: '1px', background: 'hsl(var(--border))' }} />
    {content && <span style={{ fontSize: '12px', opacity: 0.5, whiteSpace: 'nowrap' }}>{content}</span>}
    <div style={{ flex: 1, height: '1px', background: 'hsl(var(--border))' }} />
  </div>
);

// ─── Generic Social / Profile ──────────────────────────────

export const GenericProfile: React.FC<{ name?: string; role?: string; content?: string }> = ({ name, role, content }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{
      width: '48px', height: '48px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
      color: 'hsl(var(--primary))', fontSize: '18px',
    }}>
      {(name || 'U').charAt(0)}
    </div>
    <div>
      <p style={{ fontWeight: 600, fontSize: '14px' }}>{name || 'User Name'}</p>
      {role && <p style={{ fontSize: '12px', opacity: 0.6 }}>{role}</p>}
      {content && <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>{content}</p>}
    </div>
  </div>
);

// ─── Generic Blog card ─────────────────────────────────────

export const GenericBlogCard: React.FC<{ title?: string; content?: string; author?: string }> = ({ title, content, author }) => (
  <div style={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', overflow: 'hidden' }}>
    <div style={{ height: '160px', background: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '32px' }}>📝</span>
    </div>
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{title || 'Blog Post Title'}</h3>
      <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: 1.5, marginBottom: '12px' }}>{content || 'A brief excerpt of the blog post content...'}</p>
      {author && <p style={{ fontSize: '12px', opacity: 0.5 }}>By {author}</p>}
    </div>
  </div>
);

// ─── Generic E-commerce ────────────────────────────────────

export const GenericProductCard: React.FC<{ name?: string; price?: string; content?: string }> = ({ name, price, content }) => (
  <div style={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', overflow: 'hidden' }}>
    <div style={{ height: '200px', background: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '40px' }}>🛍️</span>
    </div>
    <div style={{ padding: '16px' }}>
      <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{name || content || 'Product Name'}</h3>
      <p style={{ fontWeight: 700, fontSize: '18px', color: 'hsl(var(--primary))' }}>{price || '$0.00'}</p>
    </div>
  </div>
);

// ─── Generic Icon ──────────────────────────────────────────

export const GenericIcon: React.FC<{ icon?: string; content?: string; size?: string | number }> = ({ icon, content, size = 32 }) => (
  <span style={{ fontSize: `${size}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
    {icon || content || '⭐'}
  </span>
);
