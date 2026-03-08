import React from 'react';

export const SectionComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <section className="w-full">{children}</section>
);

export const ContainerComponent: React.FC<{ children?: React.ReactNode; maxWidth?: string }> = ({ children, maxWidth }) => (
  <div className="w-full" style={maxWidth ? { maxWidth, margin: '0 auto' } : undefined}>
    {children}
  </div>
);

export const DividerComponent: React.FC<{ dividerColor?: string; thickness?: string }> = ({
  dividerColor,
  thickness = '1px',
}) => (
  <hr
    className="w-full border-0"
    style={{
      height: thickness,
      backgroundColor: dividerColor || 'hsl(var(--border))',
    }}
  />
);

export const SpacerComponent: React.FC<{ height?: string }> = ({ height = '40px' }) => (
  <div aria-hidden="true" style={{ height }} />
);

export const GridComponent: React.FC<{
  columns?: number;
  gap?: string;
  children?: React.ReactNode;
}> = ({ columns = 3, gap = '20px', children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}
  >
    {children || (
      <>
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded"
            style={{ border: '1px solid hsl(var(--border))' }}
          >
            Column {i + 1}
          </div>
        ))}
      </>
    )}
  </div>
);

export const ColumnsComponent: React.FC<{
  columnCount?: number;
  gap?: string;
  children?: React.ReactNode;
}> = ({ columnCount = 2, gap = '20px', children }) => (
  <div style={{ display: 'flex', gap }}>
    {children || (
      <>
        {Array.from({ length: columnCount }).map((_, i) => (
          <div
            key={i}
            className="flex-1 p-4 rounded"
            style={{ border: '1px solid hsl(var(--border))' }}
          >
            Column {i + 1}
          </div>
        ))}
      </>
    )}
  </div>
);
