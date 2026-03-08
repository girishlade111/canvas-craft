import { useBuilderStore } from '@/store/builderStore';
import type { ComponentStyles } from '@/types/builder';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const styleGroups: { group: string; fields: { key: keyof ComponentStyles; label: string; type?: string; options?: string[] }[] }[] = [
  {
    group: 'Layout',
    fields: [
      { key: 'width', label: 'Width' },
      { key: 'height', label: 'Height' },
      { key: 'minHeight', label: 'Min Height' },
      { key: 'maxWidth', label: 'Max Width' },
      { key: 'padding', label: 'Padding' },
      { key: 'margin', label: 'Margin' },
      { key: 'display', label: 'Display', options: ['block', 'flex', 'grid', 'inline', 'inline-block', 'none'] },
      { key: 'flexDirection', label: 'Direction', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
      { key: 'justifyContent', label: 'Justify', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
      { key: 'alignItems', label: 'Align', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] },
      { key: 'gap', label: 'Gap' },
      { key: 'gridTemplateColumns', label: 'Grid Columns' },
    ],
  },
  {
    group: 'Typography',
    fields: [
      { key: 'fontSize', label: 'Font Size' },
      { key: 'fontWeight', label: 'Weight', options: ['300', '400', '500', '600', '700', '800', '900'] },
      { key: 'fontFamily', label: 'Font Family' },
      { key: 'lineHeight', label: 'Line Height' },
      { key: 'textAlign', label: 'Align', options: ['left', 'center', 'right', 'justify'] },
      { key: 'letterSpacing', label: 'Spacing' },
      { key: 'textTransform', label: 'Transform', options: ['none', 'uppercase', 'lowercase', 'capitalize'] },
      { key: 'textDecoration', label: 'Decoration', options: ['none', 'underline', 'line-through'] },
    ],
  },
  {
    group: 'Appearance',
    fields: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'border', label: 'Border' },
      { key: 'borderRadius', label: 'Radius' },
      { key: 'boxShadow', label: 'Shadow' },
      { key: 'opacity', label: 'Opacity' },
      { key: 'overflow', label: 'Overflow', options: ['visible', 'hidden', 'scroll', 'auto'] },
    ],
  },
  {
    group: 'Background',
    fields: [
      { key: 'backgroundImage', label: 'Image URL' },
      { key: 'backgroundSize', label: 'Size', options: ['cover', 'contain', 'auto'] },
      { key: 'backgroundPosition', label: 'Position', options: ['center', 'top', 'bottom', 'left', 'right'] },
    ],
  },
  {
    group: 'Advanced',
    fields: [
      { key: 'customCSS', label: 'Custom CSS' },
      { key: 'customClasses', label: 'CSS Classes' },
    ],
  },
];

const PropertiesPanel = () => {
  const { selectedComponentId, schema, updateComponentStyles, updateComponent, toggleRightSidebar } = useBuilderStore();
  const [openGroups, setOpenGroups] = useState<string[]>(['Layout', 'Typography', 'Appearance']);

  if (!selectedComponentId) return null;

  const selectedComponent = useBuilderStore.getState().getSelectedComponent();
  if (!selectedComponent) return null;

  const handleStyleChange = (key: keyof ComponentStyles, value: string) => {
    updateComponentStyles(selectedComponentId, { [key]: value });
  };

  const handleContentChange = (value: string) => {
    updateComponent(selectedComponentId, { content: value });
  };

  const handlePropChange = (key: string, value: string) => {
    updateComponent(selectedComponentId, { props: { ...selectedComponent.props, [key]: value } });
  };

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]);
  };

  return (
    <div className="builder-sidebar w-72 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Properties</h2>
        <button onClick={toggleRightSidebar} className="p-1 rounded hover:opacity-70 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Component info */}
      <div className="property-group">
        <span className="property-label">Component</span>
        <div className="text-sm font-medium">{selectedComponent.label}</div>
        <div className="text-xs opacity-50 mt-1">{selectedComponent.type}</div>
      </div>

      {/* Content */}
      {selectedComponent.content !== undefined && (
        <div className="property-group">
          <span className="property-label">Content</span>
          <textarea
            value={selectedComponent.content || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            className="property-input resize-y min-h-[60px]"
            rows={3}
          />
        </div>
      )}

      {/* Props */}
      {selectedComponent.props && Object.keys(selectedComponent.props).length > 0 && (
        <div className="property-group">
          <span className="property-label">Props</span>
          <div className="space-y-2">
            {Object.entries(selectedComponent.props).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-xs w-20 shrink-0 opacity-70">{key}</label>
                <input
                  value={String(value || '')}
                  onChange={(e) => handlePropChange(key, e.target.value)}
                  className="property-input flex-1"
                  placeholder={key}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Style fields with collapsible groups */}
      {styleGroups.map(({ group, fields }) => {
        const isOpen = openGroups.includes(group);
        return (
          <div key={group} className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
            >
              {group}
              {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            {isOpen && (
              <div className="px-4 pb-3 space-y-2">
                {fields.map(({ key, label, type, options }) => (
                  <div key={key} className="flex items-center gap-2">
                    <label className="text-xs w-20 shrink-0 opacity-70">{label}</label>
                    {type === 'color' ? (
                      <div className="flex items-center gap-1 flex-1">
                        <input
                          type="color"
                          value={selectedComponent.styles[key] || '#000000'}
                          onChange={(e) => handleStyleChange(key, e.target.value)}
                          className="w-7 h-7 rounded cursor-pointer border-0"
                        />
                        <input
                          value={selectedComponent.styles[key] || ''}
                          onChange={(e) => handleStyleChange(key, e.target.value)}
                          className="property-input flex-1"
                          placeholder={label}
                        />
                      </div>
                    ) : options ? (
                      <select
                        value={selectedComponent.styles[key] || ''}
                        onChange={(e) => handleStyleChange(key, e.target.value)}
                        className="property-input flex-1"
                      >
                        <option value="">—</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        value={selectedComponent.styles[key] || ''}
                        onChange={(e) => handleStyleChange(key, e.target.value)}
                        className="property-input flex-1"
                        placeholder={label}
                      />
                    )}
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
