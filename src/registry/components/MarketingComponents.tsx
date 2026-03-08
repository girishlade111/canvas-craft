import React from 'react';

// ─── Newsletter Signup ─────────────────────────────────────
export const NewsletterComponent: React.FC<{ title?: string; buttonText?: string }> = ({
  title = 'Subscribe to our newsletter', buttonText = 'Subscribe',
}) => (
  <div style={{ padding: '40px 24px', textAlign: 'center', borderRadius: '16px', background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--border))' }}>
    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
    <p style={{ fontSize: '14px', opacity: 0.6, marginBottom: '20px' }}>Get the latest updates delivered to your inbox.</p>
    <div style={{ display: 'flex', gap: '8px', maxWidth: '420px', margin: '0 auto' }}>
      <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))', fontSize: '14px' }} readOnly />
      <button style={{ padding: '12px 24px', borderRadius: '10px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px' }}>{buttonText}</button>
    </div>
  </div>
);

// ─── Popup / Modal Trigger ─────────────────────────────────
export const PopupTriggerComponent: React.FC<{ content?: string }> = ({ content = 'Click to open popup' }) => (
  <div style={{ padding: '24px', textAlign: 'center', border: '2px dashed hsl(var(--border))', borderRadius: '12px', background: 'hsl(var(--muted) / 0.3)' }}>
    <div style={{ fontSize: '28px', marginBottom: '8px' }}>🪟</div>
    <p style={{ fontWeight: 600, fontSize: '14px' }}>{content}</p>
    <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>Popup / Modal component</p>
  </div>
);

// ─── Banner / Announcement Bar ─────────────────────────────
export const AnnouncementBarComponent: React.FC<{ content?: string; closable?: boolean }> = ({
  content = '🎉 Special offer: 20% off all plans this week!', closable = true,
}) => (
  <div style={{ padding: '12px 20px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', textAlign: 'center', fontSize: '14px', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
    <span>{content}</span>
    {closable && <span style={{ cursor: 'pointer', opacity: 0.7 }}>✕</span>}
  </div>
);

// ─── Cookie Consent Banner ─────────────────────────────────
export const CookieConsentComponent: React.FC = () => (
  <div style={{ padding: '16px 24px', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
    <span>🍪 We use cookies to improve your experience. By continuing, you agree to our cookie policy.</span>
    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
      <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>Accept</button>
      <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid hsl(var(--border))', fontSize: '12px', cursor: 'pointer' }}>Decline</button>
    </div>
  </div>
);

// ─── Floating Action Button ────────────────────────────────
export const FABComponent: React.FC<{ icon?: string }> = ({ icon = '💬' }) => (
  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 4px 20px hsl(var(--primary) / 0.4)', cursor: 'pointer' }}>
    {icon}
  </div>
);

// ─── Back to Top Button ────────────────────────────────────
export const BackToTopComponent: React.FC = () => (
  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>
    ↑
  </div>
);

// ─── Comparison Table ──────────────────────────────────────
export const ComparisonTableComponent: React.FC = () => (
  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ background: 'hsl(var(--muted))' }}>
          <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Feature</th>
          <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600 }}>Basic</th>
          <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600 }}>Pro</th>
          <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600 }}>Enterprise</th>
        </tr>
      </thead>
      <tbody>
        {['Storage', 'Users', 'Support', 'API Access'].map((feat, i) => (
          <tr key={feat} style={{ borderTop: '1px solid hsl(var(--border))' }}>
            <td style={{ padding: '12px 16px' }}>{feat}</td>
            <td style={{ padding: '12px 16px', textAlign: 'center' }}>{i < 2 ? '✓' : '—'}</td>
            <td style={{ padding: '12px 16px', textAlign: 'center' }}>✓</td>
            <td style={{ padding: '12px 16px', textAlign: 'center' }}>✓</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Before/After Slider ───────────────────────────────────
export const BeforeAfterComponent: React.FC = () => (
  <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'hsl(var(--muted))', height: '250px', display: 'flex' }}>
    <div style={{ flex: 1, background: 'hsl(var(--primary) / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>Before</div>
    <div style={{ width: '4px', background: 'hsl(var(--primary))', cursor: 'ew-resize', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⟷</div>
    </div>
    <div style={{ flex: 1, background: 'hsl(var(--primary) / 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>After</div>
  </div>
);

// ─── Team Members Grid ─────────────────────────────────────
export const TeamGridComponent: React.FC = () => {
  const members = [
    { name: 'Alex Johnson', role: 'CEO', emoji: '👨‍💼' },
    { name: 'Sarah Chen', role: 'CTO', emoji: '👩‍💻' },
    { name: 'Mike Rivera', role: 'Designer', emoji: '👨‍🎨' },
    { name: 'Lisa Park', role: 'Marketing', emoji: '👩‍💼' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
      {members.map(m => (
        <div key={m.name} style={{ padding: '24px 16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'hsl(var(--muted))', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>{m.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: '15px' }}>{m.name}</div>
          <div style={{ fontSize: '13px', opacity: 0.5 }}>{m.role}</div>
        </div>
      ))}
    </div>
  );
};

// ─── Timeline / Steps ──────────────────────────────────────
export const TimelineComponent: React.FC = () => {
  const steps = [
    { title: 'Sign Up', desc: 'Create your free account in seconds' },
    { title: 'Customize', desc: 'Choose a template and make it yours' },
    { title: 'Launch', desc: 'Publish your site to the world' },
  ];
  return (
    <div style={{ padding: '20px 0' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < steps.length - 1 ? '0' : undefined }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{i + 1}</div>
            {i < steps.length - 1 && <div style={{ width: '2px', height: '40px', background: 'hsl(var(--border))' }} />}
          </div>
          <div style={{ paddingBottom: '24px' }}>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>{step.title}</div>
            <div style={{ fontSize: '14px', opacity: 0.6, marginTop: '4px' }}>{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── FAQ Section ───────────────────────────────────────────
export const FAQComponent: React.FC = () => {
  const faqs = [
    { q: 'How do I get started?', a: 'Sign up for free and follow the onboarding wizard.' },
    { q: 'Can I use a custom domain?', a: 'Yes, you can connect your own domain on any paid plan.' },
    { q: 'Is there a free plan?', a: 'Yes, we offer a generous free tier with all core features.' },
  ];
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '24px' }}>Frequently Asked Questions</h3>
      {faqs.map((faq, i) => (
        <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid hsl(var(--border))' }}>
          <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>❓ {faq.q}</div>
          <div style={{ fontSize: '14px', opacity: 0.7, paddingLeft: '24px' }}>{faq.a}</div>
        </div>
      ))}
    </div>
  );
};
