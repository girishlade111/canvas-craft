import React from 'react';

export const ImageComponent: React.FC<{
  src?: string;
  alt?: string;
  objectFit?: string;
}> = ({ src, alt, objectFit = 'cover' }) => (
  <img
    src={src || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'}
    alt={alt || 'Image'}
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '8px',
      objectFit: objectFit as React.CSSProperties['objectFit'],
    }}
    loading="lazy"
  />
);

export const VideoComponent: React.FC<{
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}> = ({ src, autoplay = false, loop = false, muted = false, controls = true }) =>
  src ? (
    <video
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      style={{ width: '100%', borderRadius: '8px', display: 'block' }}
    >
      <source src={src} />
    </video>
  ) : (
    <div
      style={{
        background: 'hsl(var(--muted))',
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span style={{ fontSize: '40px' }}>▶</span>
      <p style={{ opacity: 0.6, fontSize: '14px' }}>Add a video URL to display</p>
    </div>
  );

export const GalleryComponent: React.FC<{ columns?: number; gap?: string }> = ({
  columns = 3,
  gap = '8px',
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        style={{
          background: 'hsl(var(--muted))',
          paddingBottom: '100%',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3,
            fontSize: '20px',
          }}
        >
          📷
        </span>
      </div>
    ))}
  </div>
);

export const BackgroundVideoComponent: React.FC<{
  src?: string;
  children?: React.ReactNode;
}> = ({ src, children }) => (
  <div
    style={{
      position: 'relative',
      background: 'hsl(var(--muted))',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    {src && (
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={src} />
      </video>
    )}
    {!src && (
      <span style={{ position: 'absolute', opacity: 0.15, fontSize: '64px' }}>▶</span>
    )}
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);
