import React from 'react';

// ─── Blog Post Card ────────────────────────────────────────
export const BlogPostCardComponent: React.FC<{ title?: string; excerpt?: string; date?: string; author?: string }> = ({
  title = 'Getting Started with Web Design', excerpt = 'Learn the fundamentals of modern web design with our comprehensive guide...', date = 'Mar 8, 2026', author = 'Admin',
}) => (
  <div style={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', overflow: 'hidden' }}>
    <div style={{ height: '180px', background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>📝</div>
    <div style={{ padding: '20px' }}>
      <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '8px' }}>{date} • {author}</div>
      <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{title}</h4>
      <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6 }}>{excerpt}</p>
      <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: 'hsl(var(--primary))', marginTop: '12px', display: 'inline-block' }}>Read More →</a>
    </div>
  </div>
);

// ─── Author Bio Box ────────────────────────────────────────
export const AuthorBioComponent: React.FC<{ name?: string; bio?: string }> = ({
  name = 'John Doe', bio = 'Full-stack developer and tech writer with 10+ years of experience building modern web applications.',
}) => (
  <div style={{ display: 'flex', gap: '16px', padding: '24px', borderRadius: '12px', background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--border))' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👤</div>
    <div>
      <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{name}</div>
      <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6 }}>{bio}</p>
    </div>
  </div>
);

// ─── Related Posts ──────────────────────────────────────────
export const RelatedPostsComponent: React.FC = () => (
  <div>
    <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Related Posts</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {['Design Tips for Beginners', 'Advanced CSS Tricks', 'React Best Practices'].map((t, i) => (
        <div key={i} style={{ padding: '16px', borderRadius: '10px', border: '1px solid hsl(var(--border))', cursor: 'pointer' }}>
          <div style={{ height: '100px', background: 'hsl(var(--muted))', borderRadius: '8px', marginBottom: '12px' }} />
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{t}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Share Buttons ─────────────────────────────────────────
export const ShareButtonsComponent: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <span style={{ fontSize: '13px', fontWeight: 600, opacity: 0.6 }}>Share:</span>
    {['🐦', '📘', '💼', '📧', '🔗'].map((icon, i) => (
      <button key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'transparent', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
    ))}
  </div>
);

// ─── Table of Contents ─────────────────────────────────────
export const TOCComponent: React.FC = () => (
  <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--muted) / 0.3)' }}>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Table of Contents</h4>
    {['Introduction', 'Getting Started', 'Advanced Topics', 'Best Practices', 'Conclusion'].map((item, i) => (
      <div key={i} style={{ padding: '6px 0', fontSize: '14px', color: 'hsl(var(--primary))', cursor: 'pointer' }}>
        <span style={{ opacity: 0.4, marginRight: '8px' }}>{i + 1}.</span>{item}
      </div>
    ))}
  </div>
);

// ─── Reading Progress Bar ──────────────────────────────────
export const ReadingProgressComponent: React.FC<{ progress?: number }> = ({ progress = 35 }) => (
  <div style={{ width: '100%', height: '4px', background: 'hsl(var(--muted))', position: 'relative' }}>
    <div style={{ width: `${progress}%`, height: '100%', background: 'hsl(var(--primary))', transition: 'width 0.3s ease' }} />
  </div>
);

// ─── Comment Item ──────────────────────────────────────────
export const CommentItemComponent: React.FC<{ author?: string; content?: string; date?: string }> = ({
  author = 'Jane Smith', content = 'Great article! Really helped me understand the concepts better.', date = '2 hours ago',
}) => (
  <div style={{ padding: '16px', borderLeft: '3px solid hsl(var(--primary) / 0.3)', marginBottom: '12px', background: 'hsl(var(--muted) / 0.3)', borderRadius: '0 8px 8px 0' }}>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{author.charAt(0)}</div>
      <span style={{ fontWeight: 600, fontSize: '14px' }}>{author}</span>
      <span style={{ fontSize: '12px', opacity: 0.4 }}>{date}</span>
    </div>
    <p style={{ fontSize: '14px', opacity: 0.7, lineHeight: 1.6 }}>{content}</p>
  </div>
);
