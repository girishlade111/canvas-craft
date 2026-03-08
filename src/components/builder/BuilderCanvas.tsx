import { useBuilderStore } from '@/store/builderStore';
import { useDroppable } from '@dnd-kit/core';
import type { BuilderComponent, PageSection } from '@/types/builder';
import { Trash2, Code2, GripVertical } from 'lucide-react';

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const CanvasComponent = ({ component }: { component: BuilderComponent }) => {
  const { selectedComponentId, selectComponent, removeComponent, openCodeEditor } = useBuilderStore();
  const isSelected = selectedComponentId === component.id;

  const renderContent = () => {
    switch (component.type) {
      case 'heading':
      case 'subheading':
        return <h2>{component.content || 'Heading'}</h2>;
      case 'paragraph':
        return <p>{component.content || 'Paragraph text'}</p>;
      case 'list':
        return (
          <ul style={{ listStyle: 'disc' }}>
            {(component.content || 'Item').split('\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'quote':
        return <blockquote style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '16px', fontStyle: 'italic' }}>{component.content}</blockquote>;
      case 'image':
        return <img src={component.props?.src} alt={component.props?.alt || ''} style={{ width: '100%', height: 'auto', display: 'block' }} />;
      case 'video':
        return <div style={{ background: '#1e293b', color: '#94a3b8', padding: '40px', textAlign: 'center', borderRadius: '8px' }}>▶ Video Player</div>;
      case 'hero':
        return <div style={{ textAlign: 'center' }}><h1>{component.content || 'Hero Title'}</h1></div>;
      case 'card':
        return <div>{component.content || 'Card Content'}</div>;
      case 'divider':
        return <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />;
      case 'spacer':
        return <div />;
      case 'input':
        return (
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>{component.props?.label}</label>
            <input type="text" placeholder={component.props?.placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px' }} readOnly />
          </div>
        );
      case 'textarea':
        return (
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 500 }}>{component.props?.label}</label>
            <textarea placeholder={component.props?.placeholder} style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' }} readOnly />
          </div>
        );
      case 'checkbox':
        return (
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" readOnly />
            <span>{component.props?.label}</span>
          </label>
        );
      case 'login-form':
        return (
          <div style={{ maxWidth: '400px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Login</h3>
            <div style={{ marginBottom: '12px' }}><input placeholder="Email" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} readOnly /></div>
            <div style={{ marginBottom: '16px' }}><input placeholder="Password" type="password" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} readOnly /></div>
            <button style={{ width: '100%', padding: '10px', background: '#3b82f6', color: 'white', borderRadius: '6px', border: 'none', fontWeight: 600 }}>Sign In</button>
          </div>
        );
      case 'contact-form':
        return (
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Contact Us</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input placeholder="Name" style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} readOnly />
              <input placeholder="Email" style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} readOnly />
              <textarea placeholder="Message" style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '100px' }} readOnly />
              <button style={{ padding: '10px', background: '#3b82f6', color: 'white', borderRadius: '6px', border: 'none', fontWeight: 600 }}>Send Message</button>
            </div>
          </div>
        );
      case 'product-card':
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#f3f4f6', height: '160px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🛍️</div>
            <p style={{ fontWeight: 600 }}>{component.content || 'Product'}</p>
          </div>
        );
      case 'navbar':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Brand</span>
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
              <span>Home</span><span>About</span><span>Contact</span>
            </div>
          </div>
        );
      case 'breadcrumbs':
        return <div style={{ fontSize: '14px', color: '#6b7280' }}>Home / Products / Item</div>;
      case 'html':
      case 'custom-code':
        return <div style={{ fontFamily: 'monospace', fontSize: '13px', background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '6px' }}>{component.content || '// code'}</div>;
      case 'api-placeholder':
        return <div style={{ border: '2px dashed #d1d5db', padding: '24px', textAlign: 'center', borderRadius: '8px', color: '#9ca3af' }}>API Component Placeholder</div>;
      default:
        return <div style={{ padding: '12px', color: '#6b7280' }}>{component.content || component.label}</div>;
    }
  };

  return (
    <div
      className={`canvas-component ${isSelected ? 'selected' : ''}`}
      style={component.styles as React.CSSProperties}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      {isSelected && (
        <div className="absolute -top-7 left-0 flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-t z-10">
          <GripVertical className="w-3 h-3" />
          <span>{component.label}</span>
          <button onClick={(e) => { e.stopPropagation(); openCodeEditor(component.id); }} className="ml-1 hover:opacity-70">
            <Code2 className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeComponent(component.id); }} className="ml-1 hover:opacity-70">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

const DroppableSection = ({ section }: { section: PageSection }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: section.id,
    data: { sectionId: section.id },
  });

  return (
    <div
      ref={setNodeRef}
      style={section.styles as React.CSSProperties}
      className={`relative transition-all ${isOver ? 'ring-2 ring-primary ring-inset' : ''}`}
    >
      {section.components.length === 0 && (
        <div className="text-center py-8 text-sm opacity-40 border-2 border-dashed border-builder-panel-border rounded-lg">
          Drop components here — {section.label}
        </div>
      )}
      {section.components.map((comp) => (
        <CanvasComponent key={comp.id} component={comp} />
      ))}
    </div>
  );
};

const BuilderCanvas = () => {
  const { schema, deviceView, selectComponent } = useBuilderStore();

  return (
    <div className="builder-canvas-area" onClick={() => selectComponent(null)}>
      <div
        className="builder-canvas rounded-lg overflow-hidden"
        style={{ width: deviceWidths[deviceView], maxWidth: '100%' }}
      >
        {schema.sections.map((section) => (
          <DroppableSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default BuilderCanvas;
