import React from 'react';

export const ImageComponent: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => (
  <img
    src={src || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'}
    alt={alt || 'Image'}
    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
  />
);

export const VideoComponent: React.FC<{ src?: string }> = ({ src }) =>
  src ? (
    <video controls style={{ width: '100%', borderRadius: '8px' }}>
      <source src={src} />
    </video>
  ) : (
    <div style={{ background: 'hsl(var(--muted))', padding: '60px 20px', textAlign: 'center', borderRadius: '8px' }}>
      <span style={{ fontSize: '32px' }}>▶</span>
      <p style={{ marginTop: '8px', opacity: 0.6 }}>Video Player</p>
    </div>
  );

export const GalleryComponent: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} style={{ background: 'hsl(var(--muted))', paddingBottom: '100%', borderRadius: '8px', position: 'relative' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4 }}>📷</span>
      </div>
    ))}
  </div>
);

export const BackgroundVideoComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', background: 'hsl(var(--muted))', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
    <span style={{ position: 'absolute', opacity: 0.2, fontSize: '48px' }}>▶</span>
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);
