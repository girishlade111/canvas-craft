import { useBuilderStore } from '@/store/builderStore';
import { Sparkles } from 'lucide-react';

const ANIMATIONS = [
  { label: 'None', value: '' },
  { label: 'Fade In', value: 'fadeIn 0.6s ease-out both' },
  { label: 'Slide Up', value: 'slide-up 0.6s ease-out both' },
  { label: 'Slide Down', value: 'slideDown 0.6s ease-out both' },
  { label: 'Slide Left', value: 'slideLeft 0.6s ease-out both' },
  { label: 'Slide Right', value: 'slideRight 0.6s ease-out both' },
  { label: 'Scale In', value: 'scale-in 0.4s ease-out both' },
  { label: 'Bounce', value: 'bounce 1s ease infinite' },
  { label: 'Pulse', value: 'pulse 2s ease-in-out infinite' },
  { label: 'Float', value: 'float 6s ease-in-out infinite' },
  { label: 'Shake', value: 'shake 0.5s ease-in-out' },
  { label: 'Spin', value: 'spin 1s linear infinite' },
];

const HOVER_EFFECTS = [
  { label: 'None', value: '' },
  { label: 'Scale Up', value: 'scale(1.05)' },
  { label: 'Scale Down', value: 'scale(0.95)' },
  { label: 'Lift', value: 'translateY(-4px)' },
  { label: 'Push Down', value: 'translateY(2px)' },
  { label: 'Rotate CW', value: 'rotate(3deg)' },
  { label: 'Rotate CCW', value: 'rotate(-3deg)' },
];

const TRANSITIONS = [
  { label: 'None', value: 'none' },
  { label: 'All 0.2s', value: 'all 0.2s ease' },
  { label: 'All 0.3s', value: 'all 0.3s ease' },
  { label: 'All 0.5s', value: 'all 0.5s ease' },
  { label: 'Transform 0.3s', value: 'transform 0.3s ease' },
  { label: 'Opacity 0.3s', value: 'opacity 0.3s ease' },
  { label: 'All 0.3s Bounce', value: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
];

const AnimationPanel = ({ componentId }: { componentId: string }) => {
  const { updateComponentStyles, updateComponent } = useBuilderStore();
  const component = useBuilderStore.getState().getSelectedComponent();
  if (!component) return null;

  const currentAnimation = component.props?.animation || '';
  const currentHoverTransform = component.props?.hoverTransform || '';

  return (
    <div className="px-4 pb-3 space-y-3">
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Entrance Animation</label>
        <select
          value={currentAnimation}
          onChange={(e) => {
            updateComponent(componentId, { props: { ...component.props, animation: e.target.value } });
            updateComponentStyles(componentId, { animation: e.target.value || undefined });
          }}
          className="property-input"
        >
          {ANIMATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Hover Effect</label>
        <select
          value={currentHoverTransform}
          onChange={(e) => {
            updateComponent(componentId, { props: { ...component.props, hoverTransform: e.target.value } });
          }}
          className="property-input"
        >
          {HOVER_EFFECTS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Transition</label>
        <select
          value={component.styles.transition || ''}
          onChange={(e) => updateComponentStyles(componentId, { transition: e.target.value })}
          className="property-input"
        >
          {TRANSITIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Opacity</label>
        <input
          type="range"
          min="0" max="1" step="0.05"
          value={component.styles.opacity || '1'}
          onChange={(e) => updateComponentStyles(componentId, { opacity: e.target.value })}
          className="w-full accent-primary"
        />
        <span className="text-[10px] opacity-50">{component.styles.opacity || '1'}</span>
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Transform</label>
        <input
          value={component.styles.transform || ''}
          onChange={(e) => updateComponentStyles(componentId, { transform: e.target.value })}
          className="property-input"
          placeholder="e.g. rotate(5deg) scale(1.1)"
        />
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Box Shadow</label>
        <select
          value={component.styles.boxShadow || ''}
          onChange={(e) => updateComponentStyles(componentId, { boxShadow: e.target.value })}
          className="property-input"
        >
          <option value="">None</option>
          <option value="0 1px 3px rgba(0,0,0,0.12)">Small</option>
          <option value="0 4px 6px -1px rgba(0,0,0,0.1)">Medium</option>
          <option value="0 10px 25px -5px rgba(0,0,0,0.15)">Large</option>
          <option value="0 20px 50px -12px rgba(0,0,0,0.25)">XL</option>
          <option value="0 0 0 3px hsl(252 85% 60% / 0.3)">Glow</option>
          <option value="inset 0 2px 4px rgba(0,0,0,0.1)">Inner</option>
        </select>
      </div>

      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Filter</label>
        <select
          value={component.props?.filter || ''}
          onChange={(e) => updateComponent(componentId, { props: { ...component.props, filter: e.target.value } })}
          className="property-input"
        >
          <option value="">None</option>
          <option value="blur(2px)">Blur</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="brightness(1.2)">Bright</option>
          <option value="contrast(1.3)">High Contrast</option>
          <option value="saturate(1.5)">Saturated</option>
          <option value="hue-rotate(90deg)">Hue Shift</option>
        </select>
      </div>
    </div>
  );
};

export default AnimationPanel;
