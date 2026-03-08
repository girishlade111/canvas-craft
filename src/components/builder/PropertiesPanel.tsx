import { useBuilderStore } from '@/store/builderStore';
import type { ComponentStyles } from '@/types/builder';
import { X } from 'lucide-react';

const styleFields: { group: string; fields: { key: keyof ComponentStyles; label: string; type?: string }[] }[] = [
  {
    group: 'Layout',
    fields: [
      { key: 'width', label: 'Width' },
      { key: 'height', label: 'Height' },
      { key: 'minHeight', label: 'Min Height' },
      { key: 'padding', label: 'Padding' },
      { key: 'margin', label: 'Margin' },
      { key: 'display', label: 'Display' },
      { key: 'flexDirection', label: 'Flex Direction' },
      { key: 'justifyContent', label: 'Justify' },
      { key: 'alignItems', label: 'Align Items' },
      { key: 'gap', label: 'Gap' },
    ],
  },
  {
    group: 'Style',
    fields: [
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'color', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size' },
      { key: 'fontWeight', label: 'Font Weight' },
      { key: 'textAlign', label: 'Text Align' },
      { key: 'border', label: 'Border' },
      { key: 'borderRadius', label: 'Radius' },
      { key: 'boxShadow', label: 'Shadow' },
      { key: 'opacity', label: 'Opacity' },
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

  if (!selectedComponentId) return null;

  let selectedComponent = null;
  for (const section of schema.sections) {
    const found = section.components.find(c => c.id === selectedComponentId);
    if (found) { selectedComponent = found; break; }
  }
  if (!selectedComponent) return null;

  const handleStyleChange = (key: keyof ComponentStyles, value: string) => {
    updateComponentStyles(selectedComponentId, { [key]: value });
  };

  const handleContentChange = (value: string) => {
    updateComponent(selectedComponentId, { content: value });
  };

  return (
    <div className="builder-sidebar w-72 border-l overflow-y-auto">
      <div className="p-3 border-b border-builder-panel-border flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Properties</h2>
        <button onClick={toggleRightSidebar} className="p-1 rounded hover:bg-builder-component transition-colors">
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

      {/* Style fields */}
      {styleFields.map(({ group, fields }) => (
        <div key={group} className="property-group">
          <span className="property-label">{group}</span>
          <div className="space-y-2">
            {fields.map(({ key, label, type }) => (
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
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
