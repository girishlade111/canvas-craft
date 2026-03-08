import React from 'react';

export const HeroComponent: React.FC<{ content?: string; children?: React.ReactNode }> = ({ content, children }) => (
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>{content || 'Build Something Amazing'}</h1>
    {children}
  </div>
);

export const CardComponent: React.FC<{ content?: string; children?: React.ReactNode }> = ({ content, children }) => (
  <div>
    {children || <p>{content || 'Card Content'}</p>}
  </div>
);

export const FeatureGridComponent: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
    {['⚡', '🎨', '🚀'].map((icon, i) => (
      <div key={i} style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>{icon}</div>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Feature {i + 1}</h3>
        <p style={{ opacity: 0.7, fontSize: '14px' }}>Description of this amazing feature goes here.</p>
      </div>
    ))}
  </div>
);

export const TestimonialComponent: React.FC<{ content?: string }> = ({ content }) => (
  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
    <p style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '16px' }}>
      {content || '"This product changed my life. Absolutely incredible experience."'}
    </p>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'hsl(var(--muted))' }} />
      <div>
        <p style={{ fontWeight: 600, fontSize: '14px' }}>Jane Doe</p>
        <p style={{ opacity: 0.6, fontSize: '12px' }}>CEO, Company</p>
      </div>
    </div>
  </div>
);

export const PricingTableComponent: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
    {[
      { name: 'Basic', price: '$9', features: ['5 Projects', '1GB Storage', 'Email Support'] },
      { name: 'Pro', price: '$29', features: ['Unlimited Projects', '10GB Storage', 'Priority Support'] },
      { name: 'Enterprise', price: '$99', features: ['Everything', '100GB Storage', '24/7 Support'] },
    ].map((plan, i) => (
      <div key={i} style={{ border: '1px solid hsl(var(--border))', borderRadius: '12px', padding: '32px 24px', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>{plan.name}</h3>
        <p style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>{plan.price}<span style={{ fontSize: '14px', opacity: 0.6 }}>/mo</span></p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
          {plan.features.map((f, j) => <li key={j} style={{ padding: '4px 0', fontSize: '14px' }}>✓ {f}</li>)}
        </ul>
        <button style={{ width: '100%', padding: '10px', background: i === 1 ? 'hsl(var(--primary))' : 'transparent', color: i === 1 ? 'hsl(var(--primary-foreground))' : 'inherit', border: i === 1 ? 'none' : '1px solid hsl(var(--border))', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
          Get Started
        </button>
      </div>
    ))}
  </div>
);

export const TabsComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div>
    <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid hsl(var(--border))' }}>
      <button style={{ padding: '8px 16px', borderBottom: '2px solid hsl(var(--primary))', fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>Tab 1</button>
      <button style={{ padding: '8px 16px', opacity: 0.6, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>Tab 2</button>
      <button style={{ padding: '8px 16px', opacity: 0.6, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>Tab 3</button>
    </div>
    <div style={{ padding: '16px 0' }}>{children || <p>Tab content goes here</p>}</div>
  </div>
);

export const AccordionComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div>
    {['Accordion Item 1', 'Accordion Item 2', 'Accordion Item 3'].map((title, i) => (
      <div key={i} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
        <button style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 600, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
          {title} <span>▸</span>
        </button>
      </div>
    ))}
    {children}
  </div>
);
