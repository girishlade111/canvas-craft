import React from 'react';

// ─── Feature Card (Icon + Text) ────────────────────────────
export const FeatureCardComponent: React.FC<{ icon?: string; title?: string; description?: string }> = ({
  icon = '🚀', title = 'Lightning Fast', description = 'Built for speed with optimized performance at every level.',
}) => (
  <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid hsl(var(--border))', textAlign: 'center' }}>
    <div style={{ fontSize: '36px', marginBottom: '12px' }}>{icon}</div>
    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{title}</h4>
    <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6 }}>{description}</p>
  </div>
);

// ─── Callout Box ───────────────────────────────────────────
export const CalloutComponent: React.FC<{ content?: string; icon?: string; variant?: string }> = ({
  content = 'Pro tip: Use keyboard shortcuts to speed up your workflow.', icon = '💡', variant = 'tip',
}) => {
  const colors: Record<string, string> = { tip: 'hsl(var(--primary))', warning: 'hsl(38 92% 50%)', note: 'hsl(220 70% 55%)', danger: 'hsl(0 70% 50%)' };
  return (
    <div style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: `4px solid ${colors[variant] || colors.tip}`, background: 'hsl(var(--muted) / 0.3)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <div style={{ fontSize: '14px', lineHeight: 1.6 }}>{content}</div>
    </div>
  );
};

// ─── Numbered Steps ────────────────────────────────────────
export const NumberedStepsComponent: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {['Create your account', 'Choose a template', 'Customize your design', 'Publish to the web'].map((step, i) => (
      <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{i + 1}</div>
        <span style={{ fontSize: '15px', fontWeight: 500 }}>{step}</span>
      </div>
    ))}
  </div>
);

// ─── Marquee / Scrolling Text ──────────────────────────────
export const MarqueeComponent: React.FC<{ content?: string }> = ({
  content = '🔥 New release available — Check out our latest features and updates!',
}) => (
  <div style={{ overflow: 'hidden', padding: '12px 0', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}>
    <div style={{ whiteSpace: 'nowrap', animation: 'marquee 15s linear infinite', fontSize: '14px', fontWeight: 500 }}>
      {content} &nbsp;&nbsp;&nbsp;&nbsp; {content}
    </div>
  </div>
);

// ─── Pricing Card ──────────────────────────────────────────
export const PricingCardComponent: React.FC<{ name?: string; price?: string; period?: string; featured?: boolean }> = ({
  name = 'Pro', price = '$29', period = '/month', featured = true,
}) => (
  <div style={{ padding: '32px 24px', borderRadius: '16px', border: featured ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))', background: 'hsl(var(--card))', textAlign: 'center', position: 'relative' }}>
    {featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', borderRadius: '100px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', fontSize: '11px', fontWeight: 700 }}>POPULAR</div>}
    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{name}</div>
    <div style={{ marginBottom: '20px' }}>
      <span style={{ fontSize: '40px', fontWeight: 800 }}>{price}</span>
      <span style={{ fontSize: '14px', opacity: 0.5 }}>{period}</span>
    </div>
    {['10 Projects', '50GB Storage', 'Priority Support', 'Custom Domain', 'Analytics'].map((f, i) => (
      <div key={i} style={{ padding: '8px 0', fontSize: '14px', borderTop: '1px solid hsl(var(--border) / 0.5)' }}>✓ {f}</div>
    ))}
    <button style={{ marginTop: '24px', width: '100%', padding: '14px', borderRadius: '10px', background: featured ? 'hsl(var(--primary))' : 'transparent', color: featured ? 'hsl(var(--primary-foreground))' : 'inherit', border: featured ? 'none' : '1px solid hsl(var(--border))', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Get Started</button>
  </div>
);

// ─── Image Card with Overlay ───────────────────────────────
export const ImageOverlayCardComponent: React.FC<{ title?: string; subtitle?: string }> = ({
  title = 'Beautiful Design', subtitle = 'Create stunning websites',
}) => (
  <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '280px', background: 'linear-gradient(135deg, hsl(220 60% 30%), hsl(260 60% 40%))' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', color: 'white' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>{title}</h3>
      <p style={{ fontSize: '14px', opacity: 0.8 }}>{subtitle}</p>
    </div>
  </div>
);

// ─── Divider with Text ─────────────────────────────────────
export const DividerWithTextComponent: React.FC<{ content?: string }> = ({ content = 'OR' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ flex: 1, height: '1px', background: 'hsl(var(--border))' }} />
    <span style={{ fontSize: '13px', fontWeight: 600, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px' }}>{content}</span>
    <div style={{ flex: 1, height: '1px', background: 'hsl(var(--border))' }} />
  </div>
);

// ─── Blockquote with Image ─────────────────────────────────
export const BlockquoteImageComponent: React.FC<{ content?: string; author?: string }> = ({
  content = '"Design is not just what it looks like and feels like. Design is how it works."', author = 'Steve Jobs',
}) => (
  <div style={{ display: 'flex', gap: '20px', padding: '24px', borderRadius: '12px', background: 'hsl(var(--muted) / 0.3)' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💬</div>
    <div>
      <p style={{ fontSize: '16px', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '8px' }}>{content}</p>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>— {author}</div>
    </div>
  </div>
);

// ─── Horizontal Scroll Gallery ─────────────────────────────
export const HorizontalGalleryComponent: React.FC = () => (
  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '8px 0' }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} style={{ width: '200px', height: '150px', borderRadius: '12px', background: `hsl(${i * 40 + 200} 50% 70% / 0.3)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📷</div>
    ))}
  </div>
);

// ─── Content Switcher / Toggle Tabs ────────────────────────
export const ContentSwitcherComponent: React.FC = () => (
  <div>
    <div style={{ display: 'flex', background: 'hsl(var(--muted))', borderRadius: '10px', padding: '4px', width: 'fit-content', marginBottom: '16px' }}>
      <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'hsl(var(--background))', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Monthly</button>
      <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'transparent', border: 'none', fontSize: '13px', cursor: 'pointer', opacity: 0.6 }}>Annual</button>
    </div>
    <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))', fontSize: '14px', opacity: 0.6 }}>Content for the selected tab will appear here.</div>
  </div>
);
