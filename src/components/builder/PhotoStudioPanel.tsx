import { useState } from 'react';
import { Camera, X, RotateCw, FlipHorizontal, FlipVertical, Crop, Sun, Contrast, Droplets, Palette, Sparkles } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { toast } from 'sonner';

interface ImageFilters {
  brightness: number;
  contrast: number;
  saturate: number;
  blur: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
  opacity: number;
}

const FILTER_PRESETS = [
  { name: 'Original', filters: { brightness: 100, contrast: 100, saturate: 100, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, opacity: 100 } },
  { name: 'Vivid', filters: { brightness: 110, contrast: 120, saturate: 150, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, opacity: 100 } },
  { name: 'Vintage', filters: { brightness: 110, contrast: 90, saturate: 70, blur: 0, grayscale: 0, sepia: 40, hueRotate: 0, opacity: 100 } },
  { name: 'B&W', filters: { brightness: 100, contrast: 110, saturate: 0, blur: 0, grayscale: 100, sepia: 0, hueRotate: 0, opacity: 100 } },
  { name: 'Warm', filters: { brightness: 105, contrast: 105, saturate: 110, blur: 0, grayscale: 0, sepia: 20, hueRotate: -10, opacity: 100 } },
  { name: 'Cool', filters: { brightness: 100, contrast: 105, saturate: 90, blur: 0, grayscale: 0, sepia: 0, hueRotate: 30, opacity: 100 } },
  { name: 'Drama', filters: { brightness: 90, contrast: 150, saturate: 80, blur: 0, grayscale: 0, sepia: 0, hueRotate: 0, opacity: 100 } },
  { name: 'Fade', filters: { brightness: 110, contrast: 80, saturate: 80, blur: 0, grayscale: 10, sepia: 5, hueRotate: 0, opacity: 90 } },
  { name: 'Dreamy', filters: { brightness: 115, contrast: 85, saturate: 120, blur: 1, grayscale: 0, sepia: 10, hueRotate: 0, opacity: 100 } },
  { name: 'Moody', filters: { brightness: 85, contrast: 130, saturate: 70, blur: 0, grayscale: 10, sepia: 15, hueRotate: -5, opacity: 100 } },
];

const SHAPE_MASKS = [
  { name: 'None', value: '' },
  { name: 'Circle', value: 'circle(50%)' },
  { name: 'Ellipse', value: 'ellipse(50% 40%)' },
  { name: 'Diamond', value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { name: 'Triangle', value: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
  { name: 'Hexagon', value: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { name: 'Star', value: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
  { name: 'Rounded', value: 'inset(0 round 20px)' },
];

const PhotoStudioPanel = ({ componentId, onClose }: { componentId: string; onClose: () => void }) => {
  const { updateComponent, updateComponentStyles } = useBuilderStore();
  const component = useBuilderStore.getState().getSelectedComponent();
  const [filters, setFilters] = useState<ImageFilters>(
    component?.props?.imageFilters || FILTER_PRESETS[0].filters
  );
  const [activeTab, setActiveTab] = useState<'filters' | 'adjust' | 'shape'>('filters');

  if (!component) return null;

  const getFilterString = (f: ImageFilters) =>
    `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) blur(${f.blur}px) grayscale(${f.grayscale}%) sepia(${f.sepia}%) hue-rotate(${f.hueRotate}deg) opacity(${f.opacity}%)`;

  const applyFilters = (newFilters: ImageFilters) => {
    setFilters(newFilters);
    updateComponent(componentId, { props: { ...component.props, imageFilters: newFilters, filter: getFilterString(newFilters) } });
  };

  const updateFilter = (key: keyof ImageFilters, value: number) => {
    const newFilters = { ...filters, [key]: value };
    applyFilters(newFilters);
  };

  const applyShape = (clipPath: string) => {
    updateComponentStyles(componentId, { clipPath } as any);
    toast.success('Shape mask applied');
  };

  const filterSliders: { key: keyof ImageFilters; label: string; icon: typeof Sun; min: number; max: number }[] = [
    { key: 'brightness', label: 'Brightness', icon: Sun, min: 0, max: 200 },
    { key: 'contrast', label: 'Contrast', icon: Contrast, min: 0, max: 200 },
    { key: 'saturate', label: 'Saturation', icon: Droplets, min: 0, max: 200 },
    { key: 'hueRotate', label: 'Hue', icon: Palette, min: -180, max: 180 },
    { key: 'blur', label: 'Blur', icon: Sparkles, min: 0, max: 20 },
    { key: 'grayscale', label: 'Grayscale', icon: Camera, min: 0, max: 100 },
    { key: 'sepia', label: 'Sepia', icon: Camera, min: 0, max: 100 },
    { key: 'opacity', label: 'Opacity', icon: Camera, min: 0, max: 100 },
  ];

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Photo Studio</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
      </div>

      {/* Preview */}
      <div className="p-3">
        <div className="aspect-video rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'hsl(var(--builder-component-bg))' }}>
          {component.props?.src ? (
            <img src={component.props.src} alt="" className="w-full h-full object-cover" style={{ filter: getFilterString(filters) }} />
          ) : (
            <span className="text-4xl">🖼️</span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b px-2" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {[
          { id: 'filters' as const, label: 'Presets' },
          { id: 'adjust' as const, label: 'Adjust' },
          { id: 'shape' as const, label: 'Shape' },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'}`}
            style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}
          >{label}</button>
        ))}
      </div>

      {activeTab === 'filters' && (
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {FILTER_PRESETS.map(preset => (
              <button key={preset.name} onClick={() => applyFilters(preset.filters)}
                className="p-2 rounded-lg text-center transition-all hover:scale-[1.02]"
                style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--builder-component-bg))' }}
              >
                <div className="w-full aspect-square rounded mb-1 flex items-center justify-center text-2xl" style={{ filter: getFilterString(preset.filters) }}>
                  🏔️
                </div>
                <div className="text-[10px] font-medium">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'adjust' && (
        <div className="p-3 space-y-3">
          {filterSliders.map(({ key, label, min, max }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs opacity-70">{label}</label>
                <span className="text-[10px] font-mono opacity-40">{filters[key]}</span>
              </div>
              <input type="range" min={min} max={max} value={filters[key]}
                onChange={e => updateFilter(key, Number(e.target.value))}
                className="w-full accent-primary" />
            </div>
          ))}
          <button onClick={() => applyFilters(FILTER_PRESETS[0].filters)}
            className="w-full py-2 text-xs font-medium rounded-md flex items-center justify-center gap-1 hover:bg-muted transition-colors"
          >
            <RotateCw className="w-3 h-3" /> Reset All
          </button>
        </div>
      )}

      {activeTab === 'shape' && (
        <div className="p-3 space-y-3">
          <label className="text-xs opacity-70 block">Shape Mask</label>
          <div className="grid grid-cols-2 gap-2">
            {SHAPE_MASKS.map(shape => (
              <button key={shape.name} onClick={() => applyShape(shape.value)}
                className="p-3 rounded-lg text-center transition-all hover:scale-[1.02]"
                style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--builder-component-bg))' }}
              >
                <div className="w-10 h-10 mx-auto mb-1" style={{ background: 'hsl(var(--primary))', clipPath: shape.value || undefined, borderRadius: shape.value ? undefined : '4px', opacity: 0.7 }} />
                <div className="text-[10px] font-medium">{shape.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-3">
            <label className="text-xs opacity-70 mb-1.5 block">Object Fit</label>
            <select
              value={component.styles.objectFit || 'cover'}
              onChange={e => updateComponentStyles(componentId, { objectFit: e.target.value })}
              className="property-input"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
              <option value="none">None</option>
              <option value="scale-down">Scale Down</option>
            </select>
          </div>

          <div>
            <label className="text-xs opacity-70 mb-1.5 block">Aspect Ratio</label>
            <select
              value={component.styles.aspectRatio || ''}
              onChange={e => updateComponentStyles(componentId, { aspectRatio: e.target.value })}
              className="property-input"
            >
              <option value="">Auto</option>
              <option value="1/1">1:1 Square</option>
              <option value="4/3">4:3</option>
              <option value="16/9">16:9 Widescreen</option>
              <option value="3/2">3:2</option>
              <option value="21/9">21:9 Ultrawide</option>
              <option value="9/16">9:16 Story</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoStudioPanel;
