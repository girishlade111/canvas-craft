import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FallbackComponentProps {
  type: string;
  children?: React.ReactNode;
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({ type, children }) => (
  <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg" style={{ borderColor: 'hsl(var(--warning))', background: 'hsl(var(--warning) / 0.1)' }}>
    <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: 'hsl(var(--warning))' }} />
    <span className="text-sm font-medium" style={{ color: 'hsl(var(--warning))' }}>Unknown: "{type}"</span>
    {children}
  </div>
);

export default FallbackComponent;
