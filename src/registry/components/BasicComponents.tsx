import React from 'react';

export const SectionComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full">{children}</div>
);

export const ContainerComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full">{children}</div>
);

export const DividerComponent: React.FC = () => (
  <hr className="w-full border-t" style={{ borderColor: 'hsl(var(--border))' }} />
);

export const SpacerComponent: React.FC = () => <div aria-hidden="true" />;

export const GridComponent: React.FC<{ columns?: number; children?: React.ReactNode }> = ({ columns = 3, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {children || (
      <>
        <div className="p-4 border rounded" style={{ borderColor: 'hsl(var(--border))' }}>Column 1</div>
        <div className="p-4 border rounded" style={{ borderColor: 'hsl(var(--border))' }}>Column 2</div>
        <div className="p-4 border rounded" style={{ borderColor: 'hsl(var(--border))' }}>Column 3</div>
      </>
    )}
  </div>
);

export const ColumnsComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex' }}>
    {children || (
      <>
        <div className="flex-1 p-4 border rounded" style={{ borderColor: 'hsl(var(--border))' }}>Column 1</div>
        <div className="flex-1 p-4 border rounded" style={{ borderColor: 'hsl(var(--border))' }}>Column 2</div>
      </>
    )}
  </div>
);
