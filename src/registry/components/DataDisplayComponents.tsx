import React from 'react';

// ─── Data Table ────────────────────────────────────────────
export const DataTableComponent: React.FC<{ columns?: number; rows?: number }> = ({ columns = 4, rows = 5 }) => {
  const headers = ['Name', 'Email', 'Role', 'Status'].slice(0, columns);
  const sampleData = [
    ['Alice Johnson', 'alice@email.com', 'Admin', '🟢 Active'],
    ['Bob Smith', 'bob@email.com', 'Editor', '🟢 Active'],
    ['Charlie Brown', 'charlie@email.com', 'Viewer', '🔴 Inactive'],
    ['Diana Ross', 'diana@email.com', 'Editor', '🟡 Pending'],
    ['Eve Wilson', 'eve@email.com', 'Admin', '🟢 Active'],
  ];
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: 'hsl(var(--muted))' }}>
            {headers.map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '13px' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {sampleData.slice(0, rows).map((row, i) => (
            <tr key={i} style={{ borderTop: '1px solid hsl(var(--border))' }}>
              {row.slice(0, columns).map((cell, j) => <td key={j} style={{ padding: '10px 16px' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Metric Card ───────────────────────────────────────────
export const MetricCardComponent: React.FC<{ label?: string; value?: string; change?: string; trend?: string }> = ({
  label = 'Total Revenue', value = '$48,200', change = '+12.5%', trend = 'up',
}) => (
  <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}>
    <div style={{ fontSize: '13px', opacity: 0.5, fontWeight: 500, marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>{value}</div>
    <div style={{ fontSize: '13px', fontWeight: 600, color: trend === 'up' ? 'hsl(142 70% 45%)' : 'hsl(0 70% 50%)' }}>
      {trend === 'up' ? '↑' : '↓'} {change} from last period
    </div>
  </div>
);

// ─── Chart Placeholder ─────────────────────────────────────
export const ChartPlaceholderComponent: React.FC<{ chartType?: string }> = ({ chartType = 'bar' }) => {
  const types: Record<string, string> = { bar: '📊', line: '📈', pie: '🥧', area: '📉', donut: '🍩' };
  return (
    <div style={{ padding: '40px 24px', textAlign: 'center', borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--muted) / 0.3)', minHeight: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>{types[chartType] || types.bar}</div>
      <p style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</p>
      <p style={{ fontSize: '13px', opacity: 0.5 }}>Connect data to display chart</p>
    </div>
  );
};

// ─── KPI Dashboard Row ─────────────────────────────────────
export const KPIDashboardComponent: React.FC = () => {
  const kpis = [
    { label: 'Visitors', value: '24.5K', change: '+18%', icon: '👥' },
    { label: 'Conversions', value: '1,429', change: '+7.2%', icon: '🎯' },
    { label: 'Revenue', value: '$89.4K', change: '+23%', icon: '💰' },
    { label: 'Avg. Order', value: '$62.50', change: '-2.1%', icon: '🛒' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {kpis.map(k => (
        <div key={k.label} style={{ padding: '20px', borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.5 }}>{k.label}</span>
            <span style={{ fontSize: '20px' }}>{k.icon}</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{k.value}</div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: k.change.startsWith('+') ? 'hsl(142 70% 45%)' : 'hsl(0 70% 50%)', marginTop: '4px' }}>{k.change}</div>
        </div>
      ))}
    </div>
  );
};

// ─── List / Ordered List ───────────────────────────────────
export const FeatureListComponent: React.FC<{ items?: string }> = ({
  items = 'Unlimited storage,Priority support,Custom domain,Analytics dashboard,API access',
}) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {(items || '').split(',').map((item, i) => (
      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid hsl(var(--border) / 0.5)', fontSize: '14px' }}>
        <span style={{ color: 'hsl(142 70% 45%)', fontSize: '16px' }}>✓</span>
        {item.trim()}
      </li>
    ))}
  </ul>
);

// ─── Pagination ────────────────────────────────────────────
export const PaginationComponent: React.FC<{ totalPages?: number; currentPage?: number }> = ({
  totalPages = 5, currentPage = 1,
}) => (
  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center' }}>
    <button style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'transparent', cursor: 'pointer', fontSize: '13px' }}>←</button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: i + 1 === currentPage ? 'hsl(var(--primary))' : 'transparent', color: i + 1 === currentPage ? 'hsl(var(--primary-foreground))' : 'inherit', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>{i + 1}</button>
    ))}
    <button style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'transparent', cursor: 'pointer', fontSize: '13px' }}>→</button>
  </div>
);

// ─── Breadcrumb Trail ──────────────────────────────────────
export const BreadcrumbTrailComponent: React.FC<{ items?: string }> = ({
  items = 'Home,Products,Electronics,Smartphones',
}) => (
  <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
    {(items || '').split(',').map((item, i, arr) => (
      <React.Fragment key={i}>
        <span style={{ color: i === arr.length - 1 ? 'inherit' : 'hsl(var(--primary))', cursor: i === arr.length - 1 ? 'default' : 'pointer', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{item.trim()}</span>
        {i < arr.length - 1 && <span style={{ opacity: 0.3 }}>/</span>}
      </React.Fragment>
    ))}
  </nav>
);

// ─── Tag List / Label Group ────────────────────────────────
export const TagListComponent: React.FC<{ tags?: string }> = ({
  tags = 'Design,Development,Marketing,SEO,Analytics',
}) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {(tags || '').split(',').map((tag, i) => (
      <span key={i} style={{ padding: '5px 14px', borderRadius: '100px', border: '1px solid hsl(var(--border))', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>{tag.trim()}</span>
    ))}
  </div>
);
