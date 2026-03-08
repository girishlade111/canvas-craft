import React from 'react';

// ─── Testimonial Carousel ──────────────────────────────────
export const TestimonialCarouselComponent: React.FC = () => {
  const testimonials = [
    { name: 'Sarah Chen', role: 'CEO at TechCo', text: '"This platform transformed our online presence. Incredible ease of use!"', rating: 5 },
  ];
  const t = testimonials[0];
  return (
    <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '24px', marginBottom: '16px' }}>
        {'★'.repeat(t.rating)}
      </div>
      <p style={{ fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px', opacity: 0.8 }}>{t.text}</p>
      <div style={{ fontWeight: 700, fontSize: '15px' }}>{t.name}</div>
      <div style={{ fontSize: '13px', opacity: 0.5 }}>{t.role}</div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '24px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: i === 0 ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === 0 ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }} />
        ))}
      </div>
    </div>
  );
};

// ─── Social Feed Card ──────────────────────────────────────
export const SocialFeedCardComponent: React.FC<{ platform?: string; content?: string }> = ({
  platform = 'Twitter', content = 'Just launched our new website builder! 🚀 Check it out and let us know what you think.',
}) => (
  <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🐦</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '14px' }}>@yourhandle</div>
        <div style={{ fontSize: '12px', opacity: 0.4 }}>{platform} • 2h ago</div>
      </div>
    </div>
    <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{content}</p>
    <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '13px', opacity: 0.5 }}>
      <span>❤️ 124</span><span>🔁 38</span><span>💬 15</span>
    </div>
  </div>
);

// ─── User Profile Card ─────────────────────────────────────
export const UserProfileCardComponent: React.FC<{ name?: string; role?: string }> = ({
  name = 'Alex Morgan', role = 'Product Designer',
}) => (
  <div style={{ textAlign: 'center', padding: '32px 24px', borderRadius: '16px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}>
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>👤</div>
    <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{name}</div>
    <div style={{ fontSize: '14px', opacity: 0.5, marginBottom: '16px' }}>{role}</div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '14px' }}>
      <div><div style={{ fontWeight: 700 }}>248</div><div style={{ fontSize: '12px', opacity: 0.4 }}>Posts</div></div>
      <div><div style={{ fontWeight: 700 }}>14.2K</div><div style={{ fontSize: '12px', opacity: 0.4 }}>Followers</div></div>
      <div><div style={{ fontWeight: 700 }}>892</div><div style={{ fontSize: '12px', opacity: 0.4 }}>Following</div></div>
    </div>
    <button style={{ marginTop: '20px', padding: '10px 32px', borderRadius: '100px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Follow</button>
  </div>
);

// ─── Review Card ───────────────────────────────────────────
export const ReviewCardComponent: React.FC<{ author?: string; rating?: number; content?: string }> = ({
  author = 'Michael B.', rating = 5, content = 'Absolutely love this product! The quality exceeded my expectations.',
}) => (
  <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}>
    <div style={{ color: '#f59e0b', fontSize: '16px', marginBottom: '10px' }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
    <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>{content}</p>
    <div style={{ fontSize: '13px', fontWeight: 600 }}>— {author}</div>
  </div>
);

// ─── Chat Bubble ───────────────────────────────────────────
export const ChatBubbleComponent: React.FC<{ content?: string; sender?: string; isOwn?: boolean }> = ({
  content = 'Hey! How can I help you today?', sender = 'Support', isOwn = false,
}) => (
  <div style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
    <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isOwn ? 'hsl(var(--primary))' : 'hsl(var(--muted))', color: isOwn ? 'hsl(var(--primary-foreground))' : 'inherit', fontSize: '14px', lineHeight: 1.5 }}>
      {!isOwn && <div style={{ fontWeight: 600, fontSize: '12px', marginBottom: '4px', opacity: 0.7 }}>{sender}</div>}
      {content}
    </div>
  </div>
);
