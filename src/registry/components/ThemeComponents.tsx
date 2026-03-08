import React from 'react';

// ─── Theme / Site Editor Components ────────────────────────

export const SiteLogoComponent: React.FC<{
  src?: string;
  width?: string;
  alt?: string;
  linkUrl?: string;
}> = ({ src, width = '120px', alt = 'Site Logo', linkUrl = '/' }) => {
  const logo = src ? (
    <img 
      src={src} 
      alt={alt} 
      style={{ width, height: 'auto', maxHeight: '60px', objectFit: 'contain' }} 
      onError={(e) => {
        // Fallback to placeholder if image fails to load
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  ) : (
    <div
      style={{
        width,
        height: '40px',
        background: 'hsl(var(--primary))',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'hsl(var(--primary-foreground))',
        fontWeight: 700,
        fontSize: '14px',
        cursor: 'pointer',
      }}
    >
      + Add Logo
    </div>
  );

  return (
    <div style={{ display: 'inline-block' }}>
      {linkUrl ? (
        <a href={linkUrl} style={{ display: 'inline-block', textDecoration: 'none' }}>
          {logo}
        </a>
      ) : (
        logo
      )}
    </div>
  );
};

export const SiteTitleComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{content || 'My Website'}</h1>
);

export const SiteTaglineComponent: React.FC<{ content?: string }> = ({ content }) => (
  <p style={{ fontSize: '14px', opacity: 0.6, margin: 0 }}>
    {content || 'Your site tagline goes here'}
  </p>
);

export const NavigationMenuComponent: React.FC<{
  items?: string;
  layout?: string;
}> = ({ items, layout = 'horizontal' }) => {
  const links = items ? items.split('\n').filter(Boolean) : ['Home', 'About', 'Services', 'Blog', 'Contact'];
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        gap: layout === 'vertical' ? '4px' : '24px',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      {links.map((link, i) => (
        <span
          key={i}
          style={{
            cursor: 'pointer',
            padding: layout === 'vertical' ? '8px 12px' : '4px 0',
            borderRadius: layout === 'vertical' ? '6px' : 0,
            opacity: i === 0 ? 1 : 0.7,
            fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? 'hsl(var(--primary))' : 'inherit',
          }}
        >
          {link}
        </span>
      ))}
    </nav>
  );
};

export const QueryLoopComponent: React.FC<{
  postCount?: number;
  columns?: number;
  children?: React.ReactNode;
}> = ({ postCount = 3, columns = 3, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '24px' }}>
    {children || Array.from({ length: postCount }).map((_, i) => (
      <div key={i} style={{ border: '1px solid hsl(var(--border))', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: 'hsl(var(--muted))', paddingBottom: '56%', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '24px' }}>📝</span>
        </div>
        <div style={{ padding: '16px' }}>
          <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '15px' }}>Post Title {i + 1}</p>
          <p style={{ fontSize: '13px', opacity: 0.6 }}>Brief excerpt of the post content goes here...</p>
        </div>
      </div>
    ))}
  </div>
);

export const PostListComponent: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}>
        <div style={{ width: '80px', height: '80px', background: 'hsl(var(--muted))', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📝</div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: '4px' }}>Blog Post Title {i + 1}</p>
          <p style={{ fontSize: '13px', opacity: 0.5 }}>Published on Jan {i + 1}, 2026</p>
        </div>
      </div>
    ))}
  </div>
);

export const PostNavigationComponent: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid hsl(var(--border))' }}>
    <span style={{ color: 'hsl(var(--primary))', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>← Previous Post</span>
    <span style={{ color: 'hsl(var(--primary))', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Next Post →</span>
  </div>
);

export const CommentsComponent: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Comments (3)</h3>
    {[
      { name: 'Alice', text: 'Great article! Very helpful.', time: '2 hours ago' },
      { name: 'Bob', text: 'Thanks for sharing this.', time: '5 hours ago' },
      { name: 'Charlie', text: 'Looking forward to more content like this!', time: '1 day ago' },
    ].map((c, i) => (
      <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid hsl(var(--border))' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: 'hsl(var(--primary))', flexShrink: 0 }}>
          {c.name[0]}
        </div>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginBottom: '4px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{c.name}</span>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>{c.time}</span>
          </div>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>{c.text}</p>
        </div>
      </div>
    ))}
  </div>
);

export const CommentFormComponent: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Leave a Comment</h3>
    <div style={{ display: 'grid', gap: '12px' }}>
      <input placeholder="Your name" style={{ padding: '10px 14px', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '14px', background: 'hsl(var(--background))', color: 'inherit' }} readOnly />
      <input type="email" placeholder="Your email" style={{ padding: '10px 14px', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '14px', background: 'hsl(var(--background))', color: 'inherit' }} readOnly />
      <textarea placeholder="Write your comment..." style={{ padding: '10px 14px', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '14px', minHeight: '100px', resize: 'vertical', background: 'hsl(var(--background))', color: 'inherit' }} readOnly />
      <button style={{ padding: '10px 20px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '14px', alignSelf: 'flex-start' }}>
        Post Comment
      </button>
    </div>
  </div>
);

export const LoginOutComponent: React.FC<{ loggedIn?: boolean }> = ({ loggedIn }) => (
  <button
    style={{
      padding: '8px 20px',
      background: loggedIn ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
      color: loggedIn ? 'inherit' : 'hsl(var(--primary-foreground))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
      fontWeight: 500,
      cursor: 'pointer',
      fontSize: '14px',
    }}
  >
    {loggedIn ? 'Log Out' : 'Log In'}
  </button>
);

export const TemplatePartComponent: React.FC<{
  partType?: string;
  children?: React.ReactNode;
}> = ({ partType = 'header', children }) => (
  <div style={{ padding: '16px', border: '1px dashed hsl(var(--border))', borderRadius: '8px' }}>
    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '8px' }}>
      Template Part: {partType}
    </div>
    {children || (
      <div style={{ padding: '16px', textAlign: 'center', opacity: 0.4, fontSize: '13px' }}>
        Drop elements to build your {partType}
      </div>
    )}
  </div>
);

export const ArchiveTitleComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
    {content || 'Category: Design'}
  </h1>
);

export const SearchResultsTitleComponent: React.FC<{ content?: string }> = ({ content }) => (
  <h1 style={{ fontSize: '28px', fontWeight: 700 }}>
    {content || 'Search Results for: "design tips"'}
  </h1>
);

// ─── Widget / Functionality Components ─────────────────────

export const SearchBarComponent: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <div style={{ position: 'relative', maxWidth: '500px' }}>
    <input
      placeholder={placeholder || 'Search...'}
      style={{
        width: '100%',
        padding: '12px 16px 12px 40px',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        fontSize: '14px',
        background: 'hsl(var(--background))',
        color: 'inherit',
      }}
      readOnly
    />
    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
  </div>
);

export const ArchivesComponent: React.FC = () => (
  <div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Archives</h4>
    {['March 2026', 'February 2026', 'January 2026', 'December 2025', 'November 2025'].map((month, i) => (
      <div key={i} style={{ padding: '6px 0', fontSize: '14px', cursor: 'pointer', color: 'hsl(var(--primary))', borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
        {month}
      </div>
    ))}
  </div>
);

export const CalendarWidgetComponent: React.FC = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div style={{ maxWidth: '280px' }}>
      <div style={{ fontWeight: 700, textAlign: 'center', marginBottom: '8px', fontSize: '14px' }}>March 2026</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '12px' }}>
        {days.map((d, i) => (
          <div key={i} style={{ padding: '6px', fontWeight: 600, opacity: 0.5 }}>{d}</div>
        ))}
        {Array.from({ length: 31 }).map((_, i) => (
          <div key={i} style={{ padding: '6px', borderRadius: '4px', cursor: 'pointer', background: i === 7 ? 'hsl(var(--primary))' : 'transparent', color: i === 7 ? 'hsl(var(--primary-foreground))' : 'inherit' }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategoriesComponent: React.FC = () => (
  <div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</h4>
    {[
      { name: 'Design', count: 12 },
      { name: 'Development', count: 8 },
      { name: 'Marketing', count: 5 },
      { name: 'Business', count: 15 },
    ].map((cat, i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '14px', cursor: 'pointer', color: 'hsl(var(--primary))', borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
        <span>{cat.name}</span>
        <span style={{ opacity: 0.5 }}>({cat.count})</span>
      </div>
    ))}
  </div>
);

export const LatestPostsComponent: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Latest Posts</h4>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid hsl(var(--border) / 0.5)', cursor: 'pointer' }}>
        <p style={{ fontWeight: 500, fontSize: '14px', marginBottom: '2px', color: 'hsl(var(--primary))' }}>Blog Post Title {i + 1}</p>
        <p style={{ fontSize: '12px', opacity: 0.5 }}>Jan {i + 1}, 2026</p>
      </div>
    ))}
  </div>
);

export const LatestCommentsComponent: React.FC = () => (
  <div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Comments</h4>
    {['Alice on "Getting Started"', 'Bob on "Advanced Tips"', 'Charlie on "Best Practices"'].map((c, i) => (
      <div key={i} style={{ padding: '6px 0', fontSize: '13px', borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
        {c}
      </div>
    ))}
  </div>
);

export const PageListComponent: React.FC = () => (
  <div>
    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pages</h4>
    {['Home', 'About', 'Services', 'Blog', 'Contact', 'Privacy Policy'].map((page, i) => (
      <div key={i} style={{ padding: '6px 0', fontSize: '14px', cursor: 'pointer', color: 'hsl(var(--primary))', borderBottom: '1px solid hsl(var(--border) / 0.5)' }}>
        {page}
      </div>
    ))}
  </div>
);

export const RSSComponent: React.FC<{ feedUrl?: string }> = ({ feedUrl }) => (
  <div style={{ padding: '16px', border: '1px solid hsl(var(--border))', borderRadius: '8px', textAlign: 'center' }}>
    <span style={{ fontSize: '28px' }}>📡</span>
    <p style={{ fontWeight: 600, marginTop: '8px', fontSize: '14px' }}>RSS Feed</p>
    <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>{feedUrl || 'Add an RSS feed URL'}</p>
  </div>
);

export const ShortcodeComponent: React.FC<{ content?: string }> = ({ content }) => (
  <div style={{ padding: '12px 16px', background: 'hsl(var(--muted))', borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px', border: '1px solid hsl(var(--border))' }}>
    {content || '[shortcode attr="value"]'}
  </div>
);

export const TagCloudComponent: React.FC = () => {
  const tags = ['Design', 'React', 'CSS', 'JavaScript', 'Web Dev', 'UI/UX', 'Tailwind', 'TypeScript', 'Node.js', 'API'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {tags.map((tag, i) => (
        <span
          key={i}
          style={{
            padding: '4px 12px',
            background: 'hsl(var(--muted))',
            borderRadius: '20px',
            fontSize: i % 3 === 0 ? '14px' : '12px',
            fontWeight: i % 3 === 0 ? 600 : 400,
            cursor: 'pointer',
            border: '1px solid hsl(var(--border))',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
