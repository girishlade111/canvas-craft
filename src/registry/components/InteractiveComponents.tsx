import React, { useState } from 'react';

// ─── Toggle / Switch Display ───────────────────────────────
export const ToggleSwitchComponent: React.FC<{ label?: string; defaultChecked?: boolean }> = ({
  label = 'Enable notifications', defaultChecked = false,
}) => {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div onClick={() => setOn(!on)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? 'hsl(var(--primary))' : 'hsl(var(--muted))', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: on ? '22px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
      <span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
};

// ─── Slider / Range ────────────────────────────────────────
export const RangeSliderComponent: React.FC<{ label?: string; min?: number; max?: number; value?: number }> = ({
  label = 'Volume', min = 0, max = 100, value = 50,
}) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ opacity: 0.5 }}>{value}</span>
    </div>
    <input type="range" min={min} max={max} defaultValue={value} style={{ width: '100%', accentColor: 'hsl(var(--primary))' }} />
  </div>
);

// ─── Stepper / Number Input ────────────────────────────────
export const StepperComponent: React.FC<{ label?: string; value?: number }> = ({ label = 'Quantity', value = 1 }) => {
  const [val, setVal] = useState(value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label && <span style={{ fontSize: '14px', fontWeight: 500, marginRight: '8px' }}>{label}</span>}
      <button onClick={() => setVal(Math.max(0, val - 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>−</button>
      <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 600, fontSize: '16px' }}>{val}</span>
      <button onClick={() => setVal(val + 1)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'transparent', cursor: 'pointer', fontSize: '16px' }}>+</button>
    </div>
  );
};

// ─── Chip / Tag Input ──────────────────────────────────────
export const ChipGroupComponent: React.FC<{ items?: string }> = ({ items = 'React,TypeScript,Tailwind,Node.js' }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {(items || '').split(',').map((item, i) => (
      <span key={i} style={{ padding: '6px 14px', borderRadius: '100px', background: 'hsl(var(--muted))', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {item.trim()} <span style={{ cursor: 'pointer', opacity: 0.5 }}>×</span>
      </span>
    ))}
  </div>
);

// ─── Dropdown / Mega Menu ──────────────────────────────────
export const MegaMenuComponent: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '24px', borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}>
    {['Products', 'Solutions', 'Resources'].map(cat => (
      <div key={cat}>
        <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px', color: 'hsl(var(--primary))' }}>{cat}</div>
        {['Item One', 'Item Two', 'Item Three'].map(item => (
          <div key={item} style={{ padding: '6px 0', fontSize: '14px', opacity: 0.7, cursor: 'pointer' }}>{item}</div>
        ))}
      </div>
    ))}
  </div>
);

// ─── Notification / Toast ──────────────────────────────────
export const NotificationComponent: React.FC<{ content?: string; type?: string }> = ({
  content = 'Your changes have been saved successfully!', type = 'success',
}) => {
  const icons: Record<string, string> = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  return (
    <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 20px hsl(var(--foreground) / 0.08)' }}>
      <span style={{ fontSize: '18px' }}>{icons[type] || icons.info}</span>
      <span style={{ flex: 1, fontSize: '14px' }}>{content}</span>
      <span style={{ cursor: 'pointer', opacity: 0.4, fontSize: '18px' }}>×</span>
    </div>
  );
};

// ─── Skeleton / Loading State ──────────────────────────────
export const SkeletonComponent: React.FC<{ variant?: string }> = ({ variant = 'card' }) => (
  <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}>
    {variant === 'card' && (
      <>
        <div style={{ height: '160px', borderRadius: '8px', background: 'hsl(var(--muted))', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
        <div style={{ height: '14px', borderRadius: '4px', background: 'hsl(var(--muted))', marginBottom: '10px', width: '70%', animation: 'pulse 2s infinite' }} />
        <div style={{ height: '12px', borderRadius: '4px', background: 'hsl(var(--muted))', width: '50%', animation: 'pulse 2s infinite' }} />
      </>
    )}
    {variant === 'text' && Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ height: '12px', borderRadius: '4px', background: 'hsl(var(--muted))', marginBottom: '10px', width: `${90 - i * 15}%`, animation: 'pulse 2s infinite' }} />
    ))}
  </div>
);

// ─── Empty State ───────────────────────────────────────────
export const EmptyStateComponent: React.FC<{ title?: string; description?: string; icon?: string }> = ({
  title = 'No items yet', description = 'Create your first item to get started.', icon = '📦',
}) => (
  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
    <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '20px' }}>{description}</p>
    <button style={{ padding: '10px 24px', borderRadius: '10px', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Create New</button>
  </div>
);
