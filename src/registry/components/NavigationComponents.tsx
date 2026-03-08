import React from 'react';

export const NavbarComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontWeight: 700, fontSize: '18px' }}>Brand</span>
    <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
      <span style={{ cursor: 'pointer' }}>Home</span>
      <span style={{ cursor: 'pointer' }}>About</span>
      <span style={{ cursor: 'pointer' }}>Services</span>
      <span style={{ cursor: 'pointer' }}>Contact</span>
    </div>
    {children}
  </nav>
);

export const SidebarNavComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {['Dashboard', 'Analytics', 'Settings', 'Profile'].map((item, i) => (
      <a key={i} style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', background: i === 0 ? 'hsl(var(--primary) / 0.1)' : 'transparent' }}>
        {item}
      </a>
    ))}
    {children}
  </nav>
);

export const BreadcrumbComponent: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', fontSize: '14px', alignItems: 'center' }}>
    <span style={{ cursor: 'pointer' }}>Home</span>
    <span style={{ opacity: 0.4 }}>/</span>
    <span style={{ cursor: 'pointer' }}>Products</span>
    <span style={{ opacity: 0.4 }}>/</span>
    <span style={{ opacity: 0.7 }}>Current Page</span>
  </div>
);
