import React from 'react';

// ─── Embed Components ──────────────────────────────────────

const EmbedWrapper: React.FC<{
  platform: string;
  icon: string;
  url?: string;
  color: string;
}> = ({ platform, icon, url, color }) => (
  <div
    style={{
      border: '1px solid hsl(var(--border))',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'hsl(var(--background))',
    }}
  >
    {url ? (
      <iframe
        src={url}
        style={{ width: '100%', height: '400px', border: 'none' }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        loading="lazy"
        title={`${platform} embed`}
      />
    ) : (
      <div
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
        >
          {icon}
        </div>
        <p style={{ fontWeight: 600, fontSize: '16px' }}>{platform}</p>
        <p style={{ fontSize: '13px', opacity: 0.5 }}>Paste a {platform} URL to embed</p>
      </div>
    )}
  </div>
);

export const YouTubeEmbedComponent: React.FC<{ url?: string }> = ({ url }) => {
  const embedUrl = url?.includes('youtube.com/watch')
    ? url.replace('watch?v=', 'embed/')
    : url?.includes('youtu.be/')
    ? `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`
    : url;

  return <EmbedWrapper platform="YouTube" icon="▶️" url={embedUrl} color="hsl(0 100% 50%)" />;
};

export const TwitterEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="Twitter / X" icon="𝕏" url={url} color="hsl(200 100% 40%)" />
);

export const InstagramEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="Instagram" icon="📸" url={url} color="linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" />
);

export const SpotifyEmbedComponent: React.FC<{ url?: string }> = ({ url }) => {
  const embedUrl = url?.includes('open.spotify.com')
    ? url.replace('open.spotify.com/', 'open.spotify.com/embed/')
    : url;
  return <EmbedWrapper platform="Spotify" icon="🎵" url={embedUrl} color="hsl(141 73% 42%)" />;
};

export const SoundCloudEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="SoundCloud" icon="☁️" url={url} color="hsl(18 100% 50%)" />
);

export const VimeoEmbedComponent: React.FC<{ url?: string }> = ({ url }) => {
  const embedUrl = url?.includes('vimeo.com/')
    ? `https://player.vimeo.com/video/${url.split('vimeo.com/')[1]}`
    : url;
  return <EmbedWrapper platform="Vimeo" icon="▶️" url={embedUrl} color="hsl(195 100% 45%)" />;
};

export const TikTokEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="TikTok" icon="🎵" url={url} color="hsl(340 100% 50%)" />
);

export const PinterestEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="Pinterest" icon="📌" url={url} color="hsl(0 80% 45%)" />
);

export const RedditEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="Reddit" icon="🔴" url={url} color="hsl(16 100% 50%)" />
);

export const FlickrEmbedComponent: React.FC<{ url?: string }> = ({ url }) => (
  <EmbedWrapper platform="Flickr" icon="📷" url={url} color="hsl(330 100% 50%)" />
);

export const PDFViewerComponent: React.FC<{ url?: string }> = ({ url }) => (
  <div style={{ border: '1px solid hsl(var(--border))', borderRadius: '12px', overflow: 'hidden' }}>
    {url ? (
      <iframe
        src={url}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="PDF Viewer"
        loading="lazy"
      />
    ) : (
      <div style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '48px' }}>📄</span>
        <p style={{ fontWeight: 600 }}>PDF Viewer</p>
        <p style={{ fontSize: '13px', opacity: 0.5 }}>Add a PDF URL to display</p>
      </div>
    )}
  </div>
);
