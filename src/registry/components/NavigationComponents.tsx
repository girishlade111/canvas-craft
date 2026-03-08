import React from 'react';

export const NavbarComponent: React.FC<{
  brandName?: string;
  logoUrl?: string;
  sticky?: boolean;
  children?: React.ReactNode;
}> = ({ brandName = 'Brand', logoUrl, sticky, children }) => (
  <nav
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: sticky ? 'sticky' : undefined,
      top: sticky ? 0 : undefined,
      zIndex: sticky ? 50 : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {logoUrl ? (
        <img src={logoUrl} alt={brandName} style={{ height: '28px' }} />
      ) : (
        <span style={{ fontWeight: 700, fontSize: '18px' }}>{brandName}</span>
      )}
    </div>
    <div style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: 500 }}>
      {['Home', 'About', 'Services', 'Contact'].map((item) => (
        <span
          key={item}
          style={{
            cursor: 'pointer',
            opacity: 0.75,
            transition: 'opacity 0.2s',
          }}
        >
          {item}
        </span>
      ))}
    </div>
    {children}
  </nav>
);

export const SidebarNavComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    {[
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '📈', label: 'Analytics', active: false },
      { icon: '⚙️', label: 'Settings', active: false },
      { icon: '👤', label: 'Profile', active: false },
    ].map((item, i) => (
      <a
        key={i}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: item.active ? 600 : 400,
          background: item.active ? 'hsl(var(--primary) / 0.1)' : 'transparent',
          color: item.active ? 'hsl(var(--primary))' : 'inherit',
          transition: 'background 0.2s',
          textDecoration: 'none',
        }}
      >
        <span>{item.icon}</span>
        {item.label}
      </a>
    ))}
    {children}
  </nav>
);

export const BreadcrumbComponent: React.FC = () => (
  <nav
    style={{
      display: 'flex',
      gap: '8px',
      fontSize: '14px',
      alignItems: 'center',
    }}
    aria-label="Breadcrumb"
  >
    <span style={{ cursor: 'pointer', color: 'hsl(var(--primary))' }}>Home</span>
    <span style={{ opacity: 0.3 }}>/</span>
    <span style={{ cursor: 'pointer', color: 'hsl(var(--primary))' }}>Products</span>
    <span style={{ opacity: 0.3 }}>/</span>
    <span style={{ opacity: 0.7 }}>Current Page</span>
  </nav>
);
