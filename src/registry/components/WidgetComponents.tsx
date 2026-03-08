import React, { useState, useEffect } from 'react';

// ─── Social Icons ──────────────────────────────────────────
export const SocialIconsComponent: React.FC<{ layout?: string; size?: string }> = ({ layout = 'horizontal', size = '24' }) => {
  const icons = [
    { name: 'Facebook', svg: '📘', url: '#' },
    { name: 'Twitter', svg: '🐦', url: '#' },
    { name: 'Instagram', svg: '📸', url: '#' },
    { name: 'LinkedIn', svg: '💼', url: '#' },
    { name: 'YouTube', svg: '▶️', url: '#' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: layout === 'vertical' ? 'column' : 'row', gap: '12px', alignItems: 'center' }}>
      {icons.map((icon) => (
        <a key={icon.name} href={icon.url} title={icon.name} style={{
          width: `${size}px`, height: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', background: 'hsl(var(--muted))', fontSize: `${Number(size) * 0.5}px`, textDecoration: 'none',
          transition: 'transform 0.2s, background 0.2s', cursor: 'pointer',
        }}>{icon.svg}</a>
      ))}
    </div>
  );
};

// ─── Countdown Timer ───────────────────────────────────────
export const CountdownComponent: React.FC<{ targetDate?: string }> = ({ targetDate }) => {
  const target = targetDate ? new Date(targetDate) : new Date(Date.now() + 86400000 * 7);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '36px', fontWeight: 800, lineHeight: 1,
            background: 'hsl(var(--muted))', borderRadius: '12px', padding: '16px 20px', minWidth: '72px',
          }}>{String(val).padStart(2, '0')}</div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px', opacity: 0.5 }}>{unit}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Progress Bar ──────────────────────────────────────────
export const ProgressBarComponent: React.FC<{ value?: number; label?: string; color?: string }> = ({
  value = 65, label, color,
}) => (
  <div>
    {label && <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span><span style={{ opacity: 0.5 }}>{value}%</span>
    </div>}
    <div style={{ height: '8px', borderRadius: '100px', background: 'hsl(var(--muted))', overflow: 'hidden' }}>
      <div style={{
        width: `${Math.min(100, Math.max(0, value))}%`, height: '100%', borderRadius: '100px',
        background: color || 'hsl(var(--primary))', transition: 'width 0.6s ease',
      }} />
    </div>
  </div>
);

// ─── Star Rating ───────────────────────────────────────────
export const StarRatingComponent: React.FC<{ rating?: number; maxStars?: number }> = ({ rating = 4, maxStars = 5 }) => (
  <div style={{ display: 'flex', gap: '4px', fontSize: '24px' }}>
    {Array.from({ length: maxStars }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#f59e0b' : 'hsl(var(--muted))', cursor: 'pointer' }}>★</span>
    ))}
  </div>
);

// ─── Map Embed ─────────────────────────────────────────────
export const MapComponent: React.FC<{ address?: string; zoom?: number }> = ({ address = 'New York City', zoom = 13 }) => (
  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))' }}>
    <iframe
      title="Map"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=-74.05,40.69,-73.91,40.79&layer=mapnik`}
      style={{ width: '100%', height: '300px', border: 0 }}
    />
    <div style={{ padding: '10px 14px', fontSize: '12px', opacity: 0.6, background: 'hsl(var(--muted))' }}>📍 {address}</div>
  </div>
);

// ─── Badge/Tag ─────────────────────────────────────────────
export const BadgeComponent: React.FC<{ content?: string; variant?: string }> = ({ content = 'New', variant = 'default' }) => {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' },
    secondary: { background: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' },
    success: { background: 'hsl(142 70% 45%)', color: 'white' },
    warning: { background: 'hsl(38 92% 50%)', color: 'white' },
    destructive: { background: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' },
  };
  return (
    <span style={{
      ...styles[variant] || styles.default,
      padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
      display: 'inline-block',
    }}>{content}</span>
  );
};

// ─── Alert/Banner ──────────────────────────────────────────
export const AlertComponent: React.FC<{ content?: string; type?: string }> = ({ content = 'This is an important alert message.', type = 'info' }) => {
  const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
    info: { bg: 'hsl(var(--primary) / 0.08)', border: 'hsl(var(--primary))', icon: 'ℹ️' },
    success: { bg: 'hsl(142 70% 45% / 0.08)', border: 'hsl(142 70% 45%)', icon: '✅' },
    warning: { bg: 'hsl(38 92% 50% / 0.08)', border: 'hsl(38 92% 50%)', icon: '⚠️' },
    error: { bg: 'hsl(var(--destructive) / 0.08)', border: 'hsl(var(--destructive))', icon: '❌' },
  };
  const s = typeStyles[type] || typeStyles.info;
  return (
    <div style={{
      padding: '14px 18px', borderRadius: '10px', background: s.bg,
      borderLeft: `4px solid ${s.border}`, display: 'flex', gap: '10px', alignItems: 'flex-start',
      fontSize: '14px', lineHeight: 1.6,
    }}>
      <span>{s.icon}</span>
      <span>{content}</span>
    </div>
  );
};

// ─── Icon Component ────────────────────────────────────────
export const IconComponent: React.FC<{ icon?: string; size?: string; color?: string }> = ({
  icon = '⭐', size = '32', color,
}) => (
  <span style={{ fontSize: `${size}px`, lineHeight: 1, display: 'inline-block', color: color || 'inherit' }}>{icon}</span>
);

// ─── Avatar ────────────────────────────────────────────────
export const AvatarComponent: React.FC<{ src?: string; name?: string; size?: string }> = ({
  src, name = 'User', size = '48',
}) => (
  <div style={{
    width: `${size}px`, height: `${size}px`, borderRadius: '50%', overflow: 'hidden',
    background: 'hsl(var(--primary) / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, color: 'hsl(var(--primary))', fontSize: `${Number(size) * 0.4}px`,
  }}>
    {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : name.charAt(0).toUpperCase()}
  </div>
);

// ─── Tooltip ───────────────────────────────────────────────
export const TooltipComponent: React.FC<{ content?: string; tooltipText?: string }> = ({
  content = 'Hover me', tooltipText = 'This is a tooltip',
}) => (
  <span style={{ position: 'relative', cursor: 'help', borderBottom: '1px dotted hsl(var(--muted-foreground))', fontSize: '14px' }} title={tooltipText}>
    {content}
  </span>
);

// ─── CTA Banner ────────────────────────────────────────────
export const CTABannerComponent: React.FC<{ content?: string; buttonText?: string }> = ({
  content = 'Ready to get started?', buttonText = 'Get Started Free',
}) => (
  <div style={{
    padding: '48px 32px', textAlign: 'center', borderRadius: '16px',
    background: 'linear-gradient(135deg, hsl(252 85% 60%), hsl(330 80% 60%))',
    color: 'white',
  }}>
    <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>{content}</h2>
    <p style={{ opacity: 0.85, marginBottom: '24px', fontSize: '16px' }}>Join thousands of happy customers building amazing websites.</p>
    <button style={{
      padding: '14px 32px', borderRadius: '10px', fontWeight: 700, fontSize: '15px',
      background: 'white', color: 'hsl(252 85% 50%)', border: 'none', cursor: 'pointer',
    }}>{buttonText}</button>
  </div>
);

// ─── Logo Cloud ────────────────────────────────────────────
export const LogoCloudComponent: React.FC<{ title?: string }> = ({ title = 'Trusted by' }) => (
  <div style={{ textAlign: 'center', padding: '32px 16px' }}>
    <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.4, marginBottom: '24px', fontWeight: 600 }}>{title}</p>
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.3 }}>
      {['Acme', 'Globex', 'Initech', 'Umbrella', 'Wayne'].map(n => (
        <span key={n} style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>{n}</span>
      ))}
    </div>
  </div>
);

// ─── Stats Counter ─────────────────────────────────────────
export const StatsComponent: React.FC<{ columns?: number }> = ({ columns = 4 }) => {
  const stats = [
    { value: '10K+', label: 'Users' },
    { value: '50M+', label: 'Page Views' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9★', label: 'Rating' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '24px', textAlign: 'center' }}>
      {stats.slice(0, columns).map((s, i) => (
        <div key={i}>
          <div style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2 }}>{s.value}</div>
          <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '4px' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
};
