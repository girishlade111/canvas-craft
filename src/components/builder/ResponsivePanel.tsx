/**
 * Responsive Styles Panel — Device-specific style overrides
 */

import React, { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import type { DeviceView, ComponentStyles } from '@/types/builder';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

const devices: { view: DeviceView; icon: typeof Monitor; label: string }[] = [
  { view: 'desktop', icon: Monitor, label: 'Desktop' },
  { view: 'tablet', icon: Tablet, label: 'Tablet' },
  { view: 'mobile', icon: Smartphone, label: 'Mobile' },
];

const responsiveFields: { key: keyof ComponentStyles; label: string }[] = [
  { key: 'fontSize', label: 'Font Size' },
  { key: 'padding', label: 'Padding' },
  { key: 'margin', label: 'Margin' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'display', label: 'Display' },
  { key: 'flexDirection', label: 'Direction' },
  { key: 'gap', label: 'Gap' },
  { key: 'textAlign', label: 'Text Align' },
  { key: 'maxWidth', label: 'Max Width' },
  { key: 'gridTemplateColumns', label: 'Grid Cols' },
];

const ResponsivePanel: React.FC<{ componentId: string }> = ({ componentId }) => {
  const { updateResponsiveStyles, deviceView, setDeviceView } = useBuilderStore();
  const [activeDevice, setActiveDevice] = useState<DeviceView>(deviceView);

  const comp = useBuilderStore.getState().getSelectedComponent();
  if (!comp) return null;

  const currentOverrides = comp.responsiveStyles?.[activeDevice] || {};

  const handleChange = (key: keyof ComponentStyles, value: string) => {
    updateResponsiveStyles(componentId, activeDevice, { [key]: value || undefined });
  };

  const switchDevice = (device: DeviceView) => {
    setActiveDevice(device);
    setDeviceView(device);
  };

  return (
    <div className="px-4 pb-3 space-y-3">
      {/* Device tabs */}
      <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
        {devices.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => switchDevice(view)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-colors ${
              activeDevice === view
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-white/10'
            }`}
            title={label}
          >
            <Icon className="w-3 h-3" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Info */}
      <p className="text-[10px] opacity-40">
        Override base styles for {activeDevice}. Empty fields inherit from base.
      </p>

      {/* Override fields */}
      <div className="space-y-2">
        {responsiveFields.map(({ key, label }) => {
          const override = currentOverrides[key];
          const baseValue = comp.styles[key];
          const hasOverride = override !== undefined && override !== '';

          return (
            <div key={key} className="flex items-center gap-2">
              <label className="text-xs w-20 shrink-0 opacity-70 flex items-center gap-1">
                {hasOverride && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'hsl(var(--primary))' }}
                  />
                )}
                {label}
              </label>
              <input
                value={String(override ?? '')}
                onChange={(e) => handleChange(key, e.target.value)}
                className="property-input flex-1"
                placeholder={baseValue || 'inherit'}
              />
            </div>
          );
        })}
      </div>

      {/* Active overrides summary */}
      {Object.keys(currentOverrides).filter(k => currentOverrides[k as keyof ComponentStyles]).length > 0 && (
        <div className="text-[10px] opacity-40 pt-1" style={{ borderTop: '1px solid hsl(var(--builder-panel-border))' }}>
          {Object.keys(currentOverrides).filter(k => currentOverrides[k as keyof ComponentStyles]).length} override(s) active for {activeDevice}
        </div>
      )}
    </div>
  );
};

export default ResponsivePanel;
