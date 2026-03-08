import { useBuilderStore } from '@/store/builderStore';

const ANIMATIONS = [
  { label: 'None', value: '' },
  { label: 'Fade In', value: 'fadeIn 0.6s ease-out both' },
  { label: 'Fade In Up', value: 'fadeInUp 0.6s ease-out both' },
  { label: 'Fade In Down', value: 'fadeInDown 0.6s ease-out both' },
  { label: 'Fade In Left', value: 'fadeInLeft 0.6s ease-out both' },
  { label: 'Fade In Right', value: 'fadeInRight 0.6s ease-out both' },
  { label: 'Slide Up', value: 'slide-up 0.6s ease-out both' },
  { label: 'Slide Down', value: 'slideDown 0.6s ease-out both' },
  { label: 'Slide Left', value: 'slideLeft 0.6s ease-out both' },
  { label: 'Slide Right', value: 'slideRight 0.6s ease-out both' },
  { label: 'Scale In', value: 'scale-in 0.4s ease-out both' },
  { label: 'Scale In Bounce', value: 'scaleInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both' },
  { label: 'Rotate In', value: 'rotateIn 0.5s ease-out both' },
  { label: 'Flip In X', value: 'flipInX 0.6s ease-out both' },
  { label: 'Flip In Y', value: 'flipInY 0.6s ease-out both' },
  { label: 'Bounce', value: 'bounce 1s ease infinite' },
  { label: 'Pulse', value: 'pulse 2s ease-in-out infinite' },
  { label: 'Float', value: 'float 6s ease-in-out infinite' },
  { label: 'Shake', value: 'shake 0.5s ease-in-out' },
  { label: 'Spin', value: 'spin 1s linear infinite' },
  { label: 'Wiggle', value: 'wiggle 1s ease-in-out infinite' },
  { label: 'Rubber Band', value: 'rubberBand 1s ease both' },
  { label: 'Jello', value: 'jello 1s ease both' },
  { label: 'Heartbeat', value: 'heartbeat 1.5s ease-in-out infinite' },
  { label: 'Tada', value: 'tada 1s ease both' },
];

const HOVER_EFFECTS = [
  { label: 'None', value: '' },
  { label: 'Scale Up', value: 'scale(1.05)' },
  { label: 'Scale Down', value: 'scale(0.95)' },
  { label: 'Scale Large', value: 'scale(1.15)' },
  { label: 'Lift', value: 'translateY(-4px)' },
  { label: 'Lift High', value: 'translateY(-8px)' },
  { label: 'Push Down', value: 'translateY(2px)' },
  { label: 'Slide Right', value: 'translateX(4px)' },
  { label: 'Slide Left', value: 'translateX(-4px)' },
  { label: 'Rotate CW', value: 'rotate(3deg)' },
  { label: 'Rotate CCW', value: 'rotate(-3deg)' },
  { label: 'Rotate 360', value: 'rotate(360deg)' },
  { label: 'Skew', value: 'skewX(-3deg)' },
  { label: 'Grow + Lift', value: 'scale(1.05) translateY(-4px)' },
  { label: '3D Tilt', value: 'perspective(500px) rotateY(5deg)' },
];

const TRANSITIONS = [
  { label: 'None', value: 'none' },
  { label: 'Instant', value: 'all 0.1s ease' },
  { label: 'Fast', value: 'all 0.2s ease' },
  { label: 'Normal', value: 'all 0.3s ease' },
  { label: 'Slow', value: 'all 0.5s ease' },
  { label: 'Very Slow', value: 'all 0.8s ease' },
  { label: 'Transform Only', value: 'transform 0.3s ease' },
  { label: 'Opacity Only', value: 'opacity 0.3s ease' },
  { label: 'Bounce', value: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  { label: 'Elastic', value: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  { label: 'Spring', value: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { label: 'Smooth Out', value: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
];

const SCROLL_EFFECTS = [
  { label: 'None', value: '' },
  { label: 'Parallax Slow', value: 'parallax-slow' },
  { label: 'Parallax Fast', value: 'parallax-fast' },
  { label: 'Fade on Scroll', value: 'fade-scroll' },
  { label: 'Scale on Scroll', value: 'scale-scroll' },
  { label: 'Slide Up on Scroll', value: 'slide-up-scroll' },
  { label: 'Rotate on Scroll', value: 'rotate-scroll' },
  { label: 'Blur on Scroll', value: 'blur-scroll' },
  { label: 'Sticky', value: 'sticky' },
  { label: 'Pin on Scroll', value: 'pin-scroll' },
];

const BACKDROP_FILTERS = [
  { label: 'None', value: '' },
  { label: 'Blur (Frosted Glass)', value: 'blur(10px)' },
  { label: 'Blur Light', value: 'blur(4px)' },
  { label: 'Blur Heavy', value: 'blur(20px)' },
  { label: 'Brightness', value: 'brightness(1.2)' },
  { label: 'Dim', value: 'brightness(0.6)' },
  { label: 'Saturate', value: 'saturate(2)' },
  { label: 'Grayscale', value: 'grayscale(1)' },
  { label: 'Glass Effect', value: 'blur(10px) saturate(1.5) brightness(1.1)' },
];

const AnimationPanel = ({ componentId }: { componentId: string }) => {
  const { updateComponentStyles, updateComponent } = useBuilderStore();
  const component = useBuilderStore.getState().getSelectedComponent();
  if (!component) return null;

  const currentAnimation = component.props?.animation || '';
  const currentHoverTransform = component.props?.hoverTransform || '';
  const currentScrollEffect = component.props?.scrollEffect || '';

  return (
    <div className="px-4 pb-3 space-y-3">
      {/* Entrance Animation */}
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

      {/* Animation Delay */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Animation Delay</label>
        <select
          value={component.props?.animationDelay || '0s'}
          onChange={(e) => {
            updateComponent(componentId, { props: { ...component.props, animationDelay: e.target.value } });
            updateComponentStyles(componentId, { animationDelay: e.target.value } as any);
          }}
          className="property-input"
        >
          <option value="0s">None</option>
          <option value="0.1s">100ms</option>
          <option value="0.2s">200ms</option>
          <option value="0.3s">300ms</option>
          <option value="0.5s">500ms</option>
          <option value="0.8s">800ms</option>
          <option value="1s">1 second</option>
          <option value="1.5s">1.5 seconds</option>
          <option value="2s">2 seconds</option>
        </select>
      </div>

      {/* Scroll Effects */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Scroll Effect</label>
        <select
          value={currentScrollEffect}
          onChange={(e) => updateComponent(componentId, { props: { ...component.props, scrollEffect: e.target.value } })}
          className="property-input"
        >
          {SCROLL_EFFECTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Hover Effect */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Hover Effect</label>
        <select
          value={currentHoverTransform}
          onChange={(e) => updateComponent(componentId, { props: { ...component.props, hoverTransform: e.target.value } })}
          className="property-input"
        >
          {HOVER_EFFECTS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
        </select>
      </div>

      {/* Transition */}
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

      {/* Backdrop Filter */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Backdrop Filter</label>
        <select
          value={component.props?.backdropFilter || ''}
          onChange={(e) => {
            updateComponent(componentId, { props: { ...component.props, backdropFilter: e.target.value } });
          }}
          className="property-input"
        >
          {BACKDROP_FILTERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      {/* Opacity */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Opacity</label>
        <input
          type="range" min="0" max="1" step="0.05"
          value={component.styles.opacity || '1'}
          onChange={(e) => updateComponentStyles(componentId, { opacity: e.target.value })}
          className="w-full accent-primary"
        />
        <span className="text-[10px] opacity-50">{component.styles.opacity || '1'}</span>
      </div>

      {/* Transform */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Transform</label>
        <input
          value={component.styles.transform || ''}
          onChange={(e) => updateComponentStyles(componentId, { transform: e.target.value })}
          className="property-input"
          placeholder="e.g. rotate(5deg) scale(1.1)"
        />
      </div>

      {/* Box Shadow */}
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
          <option value="0 25px 60px -12px rgba(0,0,0,0.35)">2XL</option>
          <option value="0 0 0 3px hsl(252 85% 60% / 0.3)">Glow</option>
          <option value="0 0 30px hsl(252 85% 60% / 0.4)">Neon Glow</option>
          <option value="inset 0 2px 4px rgba(0,0,0,0.1)">Inner</option>
          <option value="inset 0 -2px 4px rgba(0,0,0,0.1)">Inner Bottom</option>
          <option value="5px 5px 0px rgba(0,0,0,0.2)">Retro</option>
          <option value="0 0 0 1px rgba(0,0,0,0.05), 0 10px 25px -5px rgba(0,0,0,0.1)">Elevated</option>
        </select>
      </div>

      {/* Filter */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">CSS Filter</label>
        <select
          value={component.props?.filter || ''}
          onChange={(e) => updateComponent(componentId, { props: { ...component.props, filter: e.target.value } })}
          className="property-input"
        >
          <option value="">None</option>
          <option value="blur(2px)">Blur</option>
          <option value="blur(5px)">Heavy Blur</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="grayscale(50%)">Partial Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="brightness(1.2)">Bright</option>
          <option value="brightness(0.7)">Dim</option>
          <option value="contrast(1.3)">High Contrast</option>
          <option value="contrast(0.7)">Low Contrast</option>
          <option value="saturate(1.5)">Saturated</option>
          <option value="saturate(0.5)">Desaturated</option>
          <option value="hue-rotate(90deg)">Hue Shift 90°</option>
          <option value="hue-rotate(180deg)">Hue Shift 180°</option>
          <option value="invert(100%)">Invert</option>
          <option value="drop-shadow(0 4px 6px rgba(0,0,0,0.3))">Drop Shadow</option>
        </select>
      </div>

      {/* Mix Blend Mode */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Blend Mode</label>
        <select
          value={component.props?.mixBlendMode || ''}
          onChange={(e) => updateComponent(componentId, { props: { ...component.props, mixBlendMode: e.target.value } })}
          className="property-input"
        >
          <option value="">Normal</option>
          <option value="multiply">Multiply</option>
          <option value="screen">Screen</option>
          <option value="overlay">Overlay</option>
          <option value="darken">Darken</option>
          <option value="lighten">Lighten</option>
          <option value="color-dodge">Color Dodge</option>
          <option value="color-burn">Color Burn</option>
          <option value="hard-light">Hard Light</option>
          <option value="soft-light">Soft Light</option>
          <option value="difference">Difference</option>
          <option value="exclusion">Exclusion</option>
          <option value="hue">Hue</option>
          <option value="saturation">Saturation</option>
          <option value="luminosity">Luminosity</option>
        </select>
      </div>

      {/* Cursor */}
      <div>
        <label className="text-xs opacity-70 mb-1.5 block">Cursor</label>
        <select
          value={component.styles.cursor || ''}
          onChange={(e) => updateComponentStyles(componentId, { cursor: e.target.value })}
          className="property-input"
        >
          <option value="">Default</option>
          <option value="pointer">Pointer</option>
          <option value="grab">Grab</option>
          <option value="crosshair">Crosshair</option>
          <option value="move">Move</option>
          <option value="not-allowed">Not Allowed</option>
          <option value="zoom-in">Zoom In</option>
          <option value="zoom-out">Zoom Out</option>
          <option value="none">Hidden</option>
        </select>
      </div>
    </div>
  );
};

export default AnimationPanel;
