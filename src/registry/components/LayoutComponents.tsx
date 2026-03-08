import React, { useState } from 'react';

export const HeroComponent: React.FC<{
  content?: string;
  alignment?: string;
  overlayColor?: string;
  overlayOpacity?: string;
  children?: React.ReactNode;
}> = ({ content, alignment = 'center', overlayColor, overlayOpacity = '0.5', children }) => (
  <div
    style={{
      textAlign: alignment as React.CSSProperties['textAlign'],
      position: 'relative',
    }}
  >
    {overlayColor && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: overlayColor,
          opacity: Number(overlayOpacity) || 0.5,
          pointerEvents: 'none',
        }}
      />
    )}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 800,
          marginBottom: '16px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {content || 'Build Something Amazing'}
      </h1>
      {children}
    </div>
  </div>
);

export const CardComponent: React.FC<{
  content?: string;
  hoverable?: boolean;
  children?: React.ReactNode;
}> = ({ content, hoverable = false, children }) => (
  <div
    style={{
      transition: hoverable ? 'transform 0.2s ease, box-shadow 0.2s ease' : undefined,
    }}
    onMouseEnter={
      hoverable
        ? (e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px -12px rgba(0,0,0,0.2)';
          }
        : undefined
    }
    onMouseLeave={
      hoverable
        ? (e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }
        : undefined
    }
  >
    {children || <p>{content || 'Card Content'}</p>}
  </div>
);

export const FeatureGridComponent: React.FC<{ columns?: number }> = ({ columns = 3 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '32px' }}>
    {[
      { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized performance for instant page loads and smooth interactions.' },
      { icon: '🎨', title: 'Beautiful Design', desc: 'Professionally crafted components with pixel-perfect attention to detail.' },
      { icon: '🚀', title: 'Easy Deploy', desc: 'One-click deployment to any platform with zero configuration needed.' },
    ]
      .slice(0, columns)
      .map((item, i) => (
        <div key={i} style={{ textAlign: 'center', padding: '32px 16px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
          <h3 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '18px' }}>{item.title}</h3>
          <p style={{ opacity: 0.65, fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
        </div>
      ))}
  </div>
);

export const TestimonialComponent: React.FC<{
  content?: string;
  authorName?: string;
  authorTitle?: string;
  authorAvatar?: string;
}> = ({ content, authorName = 'Jane Doe', authorTitle = 'CEO, Company', authorAvatar }) => (
  <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
    <div style={{ fontSize: '48px', opacity: 0.15, lineHeight: 1, marginBottom: '12px' }}>"</div>
    <p
      style={{
        fontSize: '20px',
        fontStyle: 'italic',
        marginBottom: '24px',
        lineHeight: 1.6,
      }}
    >
      {content || 'This product completely transformed how we build websites. The experience is unmatched.'}
    </p>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      {authorAvatar ? (
        <img
          src={authorAvatar}
          alt={authorName}
          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'hsl(var(--primary) / 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: 'hsl(var(--primary))',
            fontSize: '16px',
          }}
        >
          {authorName.charAt(0)}
        </div>
      )}
      <div style={{ textAlign: 'left' }}>
        <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{authorName}</p>
        <p style={{ opacity: 0.55, fontSize: '12px' }}>{authorTitle}</p>
      </div>
    </div>
  </div>
);

export const PricingTableComponent: React.FC<{ columns?: number }> = ({ columns = 3 }) => {
  const plans = [
    { name: 'Starter', price: '$9', features: ['5 Projects', '1GB Storage', 'Email Support', 'Basic Analytics'], highlighted: false },
    { name: 'Pro', price: '$29', features: ['Unlimited Projects', '10GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain'], highlighted: true },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', '100GB Storage', '24/7 Support', 'SSO', 'SLA', 'Dedicated Manager'], highlighted: false },
    { name: 'Custom', price: 'Custom', features: ['Bespoke Solution', 'Unlimited Storage', 'White Label', 'On-Premise'], highlighted: false },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '24px', alignItems: 'start' }}>
      {plans.slice(0, columns).map((plan, i) => (
        <div
          key={i}
          style={{
            border: plan.highlighted ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            position: 'relative',
            background: plan.highlighted ? 'hsl(var(--primary) / 0.03)' : undefined,
          }}
        >
          {plan.highlighted && (
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                padding: '4px 16px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Most Popular
            </div>
          )}
          <h3 style={{ fontWeight: 600, marginBottom: '8px', fontSize: '18px' }}>{plan.name}</h3>
          <p style={{ fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>
            {plan.price}
            {plan.price !== 'Custom' && (
              <span style={{ fontSize: '16px', opacity: 0.5, fontWeight: 400 }}>/mo</span>
            )}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', textAlign: 'left' }}>
            {plan.features.map((f, j) => (
              <li key={j} style={{ padding: '6px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'hsl(var(--success, 142 70% 45%))' }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <button
            style={{
              width: '100%',
              padding: '12px',
              background: plan.highlighted ? 'hsl(var(--primary))' : 'transparent',
              color: plan.highlighted ? 'hsl(var(--primary-foreground))' : 'inherit',
              border: plan.highlighted ? 'none' : '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
};

export const TabsComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div>
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid hsl(var(--border))' }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 20px',
              borderBottom: activeTab === i ? '2px solid hsl(var(--primary))' : '2px solid transparent',
              marginBottom: '-2px',
              fontWeight: activeTab === i ? 600 : 400,
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: activeTab === i ? 1 : 0.6,
              transition: 'all 0.2s',
              color: 'inherit',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px 0' }}>
        {children || <p style={{ opacity: 0.7 }}>Tab content for Tab {activeTab + 1}</p>}
      </div>
    </div>
  );
};

export const AccordionComponent: React.FC<{
  children?: React.ReactNode;
  allowMultiple?: boolean;
}> = ({ children, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const items = [
    { title: 'What is this product?', body: 'A powerful visual website builder that lets you create professional sites without code.' },
    { title: 'How does it work?', body: 'Drag and drop components, customize styles, and publish with one click.' },
    { title: 'What support is available?', body: 'We offer email support, documentation, and community forums for all plans.' },
  ];

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
          <button
            onClick={() => toggle(i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              fontWeight: 600,
              fontSize: '15px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'inherit',
            }}
          >
            {item.title}
            <span
              style={{
                transition: 'transform 0.2s',
                transform: openItems.has(i) ? 'rotate(90deg)' : 'rotate(0)',
                opacity: 0.5,
              }}
            >
              ▸
            </span>
          </button>
          {openItems.has(i) && (
            <div style={{ padding: '0 0 14px', fontSize: '14px', opacity: 0.7, lineHeight: 1.6 }}>
              {item.body}
            </div>
          )}
        </div>
      ))}
      {children}
    </div>
  );
};
