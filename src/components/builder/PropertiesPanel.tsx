import { useBuilderStore } from '@/store/builderStore';
import { getPropertyGroups } from '@/engine/properties';
import type { ComponentStyles, PropertySchema } from '@/types/builder';
import { X, ChevronDown, ChevronRight, Link2, Layers } from 'lucide-react';
import { useState } from 'react';

const PropertyField: React.FC<{
  schema: PropertySchema;
  value: any;
  onChange: (value: string) => void;
  isStyleProp: boolean;
}> = ({ schema, value, onChange, isStyleProp: _isStyleProp }) => {
  const currentValue = value ?? schema.defaultValue ?? '';

  if (schema.type === 'color') {
    return (
      <div className="flex items-center gap-1.5 flex-1">
        <input
          type="color"
          value={String(currentValue || '#000000')}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-0 shrink-0"
        />
        <input
          value={String(currentValue || '')}
          onChange={(e) => onChange(e.target.value)}
          className="property-input flex-1"
          placeholder={schema.placeholder || schema.label}
        />
      </div>
    );
  }

  if (schema.type === 'select' && schema.options) {
    return (
      <select
        value={String(currentValue || '')}
        onChange={(e) => onChange(e.target.value)}
        className="property-input flex-1"
      >
        <option value="">—</option>
        {schema.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }

  if (schema.type === 'boolean') {
    return (
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={currentValue === true || currentValue === 'true'}
          onChange={(e) => onChange(String(e.target.checked))}
          className="w-4 h-4 rounded"
          style={{ accentColor: 'hsl(var(--primary))' }}
        />
        <span className="text-xs opacity-70">{currentValue === true || currentValue === 'true' ? 'Yes' : 'No'}</span>
      </label>
    );
  }

  if (schema.type === 'number') {
    return (
      <input
        type="number"
        value={String(currentValue || '')}
        onChange={(e) => onChange(e.target.value)}
        min={schema.min}
        max={schema.max}
        step={schema.step || 1}
        className="property-input flex-1"
        placeholder={schema.placeholder || schema.label}
      />
    );
  }

  if (schema.type === 'code') {
    return (
      <textarea
        value={String(currentValue || '')}
        onChange={(e) => onChange(e.target.value)}
        className="property-input flex-1 font-mono text-xs resize-y min-h-[60px]"
        placeholder={schema.placeholder || 'Enter code...'}
        rows={3}
      />
    );
  }

  return (
    <input
      value={String(currentValue || '')}
      onChange={(e) => onChange(e.target.value)}
      className="property-input flex-1"
      placeholder={schema.placeholder || schema.label}
    />
  );
};

// Which property keys are style props vs component props
const STYLE_KEYS = new Set([
  'width', 'height', 'minHeight', 'minWidth', 'maxWidth', 'maxHeight',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'backgroundColor', 'color', 'fontSize', 'fontWeight', 'fontFamily',
  'lineHeight', 'textAlign', 'border', 'borderRadius', 'borderColor',
  'boxShadow', 'opacity', 'display', 'flexDirection', 'flexWrap',
  'justifyContent', 'alignItems', 'alignSelf', 'flex', 'gap',
  'rowGap', 'columnGap', 'gridTemplateColumns', 'gridTemplateRows',
  'gridColumn', 'gridRow', 'position', 'top', 'right', 'bottom',
  'left', 'zIndex', 'overflow', 'overflowX', 'overflowY', 'cursor',
  'transition', 'transform', 'customCSS', 'customClasses',
  'backgroundImage', 'backgroundSize', 'backgroundPosition',
  'backgroundRepeat', 'letterSpacing', 'textDecoration',
  'textTransform', 'whiteSpace', 'wordBreak', 'objectFit', 'aspectRatio',
  'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
]);

const PropertiesPanel = () => {
  const { selectedComponentId, updateComponentStyles, updateComponent, toggleRightSidebar } = useBuilderStore();
  const [openGroups, setOpenGroups] = useState<string[]>(['Component', 'Layout', 'Typography', 'Appearance']);

  if (!selectedComponentId) return null;

  const selectedComponent = useBuilderStore.getState().getSelectedComponent();
  if (!selectedComponent) return null;

  const propertyGroups = getPropertyGroups(selectedComponent.type);

  const handleChange = (schema: PropertySchema, value: string) => {
    const isStyle = STYLE_KEYS.has(schema.key);
    if (isStyle) {
      updateComponentStyles(selectedComponentId, { [schema.key]: value });
    } else {
      updateComponent(selectedComponentId, {
        props: { ...selectedComponent.props, [schema.key]: value },
      });
    }
  };

  const toggleGroup = (group: string) => {
    setOpenGroups(prev =>
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const getValue = (schema: PropertySchema) => {
    const isStyle = STYLE_KEYS.has(schema.key);
    if (isStyle) {
      return selectedComponent.styles[schema.key as keyof ComponentStyles];
    }
    return selectedComponent.props?.[schema.key];
  };

  return (
    <div className="builder-sidebar w-72 border-l overflow-y-auto">
      {/* Header */}
      <div
        className="p-3 border-b flex items-center justify-between"
        style={{ borderColor: 'hsl(var(--builder-panel-border))' }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Properties</h2>
        <button onClick={toggleRightSidebar} className="p-1 rounded hover:opacity-70 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Component info */}
      <div className="property-group">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-3.5 h-3.5 opacity-50" />
          <span className="text-sm font-medium">{selectedComponent.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-40">{selectedComponent.type}</span>
          {selectedComponent.symbolId && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}>
              <Link2 className="w-2.5 h-2.5" /> Symbol
            </span>
          )}
        </div>
      </div>

      {/* Content (text-based components) */}
      {selectedComponent.content !== undefined && (
        <div className="property-group">
          <span className="property-label">Content</span>
          <textarea
            value={selectedComponent.content || ''}
            onChange={(e) => updateComponent(selectedComponentId, { content: e.target.value })}
            className="property-input resize-y min-h-[60px]"
            rows={3}
          />
        </div>
      )}

      {/* Property groups from schema */}
      {Object.entries(propertyGroups).map(([group, fields]) => {
        const isOpen = openGroups.includes(group);
        return (
          <div key={group} className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="flex items-center gap-1.5">
                {group}
                <span className="opacity-40 normal-case font-normal">({fields.length})</span>
              </span>
              {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {isOpen && (
              <div className="px-4 pb-3 space-y-2.5">
                {fields.map((schema) => (
                  <div key={schema.key} className="flex items-center gap-2">
                    <label
                      className="text-xs w-20 shrink-0 opacity-70 truncate"
                      title={schema.description || schema.label}
                    >
                      {schema.label}
                      {schema.required && <span style={{ color: 'hsl(var(--destructive))' }}>*</span>}
                    </label>
                    <PropertyField
                      schema={schema}
                      value={getValue(schema)}
                      onChange={(val) => handleChange(schema, val)}
                      isStyleProp={STYLE_KEYS.has(schema.key)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesPanel;
