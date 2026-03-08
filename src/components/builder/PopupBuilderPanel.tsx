import { useState } from 'react';
import { X, Megaphone, Clock, MousePointerClick, ArrowUpFromDot, Eye, Copy, Trash2, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PopupConfig {
  id: string;
  name: string;
  type: 'modal' | 'banner' | 'slide-in' | 'fullscreen' | 'floating-bar';
  trigger: 'time-delay' | 'scroll-percent' | 'exit-intent' | 'click' | 'page-load';
  triggerValue: string;
  position: 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  content: { heading: string; body: string; ctaText: string; ctaUrl: string; imageUrl: string };
  style: { bgColor: string; textColor: string; accentColor: string; borderRadius: string; overlay: boolean; overlayColor: string };
  behavior: { showOnce: boolean; frequency: string; closable: boolean; autoClose: number };
  isActive: boolean;
}

const DEFAULT_POPUP: Omit<PopupConfig, 'id'> = {
  name: 'New Popup',
  type: 'modal',
  trigger: 'time-delay',
  triggerValue: '3',
  position: 'center',
  content: { heading: 'Special Offer!', body: 'Sign up now and get 20% off your first order.', ctaText: 'Get Started', ctaUrl: '#', imageUrl: '' },
  style: { bgColor: '#ffffff', textColor: '#1f2937', accentColor: '#6366f1', borderRadius: '16px', overlay: true, overlayColor: 'rgba(0,0,0,0.5)' },
  behavior: { showOnce: true, frequency: 'once', closable: true, autoClose: 0 },
  isActive: false,
};

const PopupBuilderPanel = ({ onClose }: { onClose: () => void }) => {
  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'trigger' | 'behavior'>('content');

  const addPopup = () => {
    const newPopup: PopupConfig = { ...DEFAULT_POPUP, id: `popup-${Date.now()}`, name: `Popup ${popups.length + 1}` };
    setPopups(prev => [...prev, newPopup]);
    setEditing(newPopup.id);
  };

  const updatePopup = (id: string, updates: Partial<PopupConfig>) => {
    setPopups(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
    if (editing === id) setEditing(null);
  };

  const duplicatePopup = (popup: PopupConfig) => {
    const newPopup = { ...popup, id: `popup-${Date.now()}`, name: `${popup.name} (copy)` };
    setPopups(prev => [...prev, newPopup]);
  };

  const current = popups.find(p => p.id === editing);

  return (
    <div className="builder-sidebar w-80 border-l overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Popups & Banners</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:opacity-70"><X className="w-3.5 h-3.5" /></button>
      </div>

      {!editing ? (
        <div className="p-3 space-y-3">
          <button onClick={addPopup}
            className="w-full py-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            style={{ border: '2px dashed hsl(var(--builder-panel-border))', color: 'hsl(var(--primary))' }}
          >
            <Plus className="w-4 h-4" /> Create Popup
          </button>

          {popups.length === 0 && (
            <div className="text-center py-8 opacity-40">
              <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">No popups yet. Create one to get started.</p>
            </div>
          )}

          {popups.map(popup => (
            <div key={popup.id} className="p-3 rounded-lg" style={{ border: '1px solid hsl(var(--builder-panel-border))', background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">{popup.name}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => updatePopup(popup.id, { isActive: !popup.isActive })}
                    className={`w-8 h-4 rounded-full flex items-center transition-colors ${popup.isActive ? 'justify-end' : 'justify-start'}`}
                    style={{ background: popup.isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white mx-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] opacity-50 mb-2">
                <span className="capitalize">{popup.type}</span>
                <span>•</span>
                <span className="capitalize">{popup.trigger.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditing(popup.id)} className="flex-1 py-1.5 text-xs rounded font-medium hover:bg-muted transition-colors">Edit</button>
                <button onClick={() => duplicatePopup(popup)} className="p-1.5 rounded hover:bg-muted"><Copy className="w-3 h-3" /></button>
                <button onClick={() => deletePopup(popup.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-3 h-3 text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : current && (
        <div>
          <button onClick={() => setEditing(null)} className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors" style={{ borderBottom: '1px solid hsl(var(--builder-panel-border))' }}>
            ← Back to list
          </button>

          <div className="p-3">
            <input value={current.name} onChange={e => updatePopup(current.id, { name: e.target.value })} className="property-input font-medium mb-3" />
          </div>

          {/* Tabs */}
          <div className="flex border-b px-2" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            {(['content', 'design', 'trigger', 'behavior'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 opacity-100' : 'opacity-50'}`}
                style={activeTab === tab ? { borderColor: 'hsl(var(--primary))' } : undefined}
              >{tab}</button>
            ))}
          </div>

          <div className="p-3 space-y-3">
            {activeTab === 'content' && (
              <>
                <div><label className="text-xs opacity-70 mb-1 block">Heading</label>
                  <input value={current.content.heading} onChange={e => updatePopup(current.id, { content: { ...current.content, heading: e.target.value } })} className="property-input" /></div>
                <div><label className="text-xs opacity-70 mb-1 block">Body Text</label>
                  <textarea value={current.content.body} onChange={e => updatePopup(current.id, { content: { ...current.content, body: e.target.value } })} className="property-input resize-y min-h-[60px]" rows={3} /></div>
                <div><label className="text-xs opacity-70 mb-1 block">CTA Button Text</label>
                  <input value={current.content.ctaText} onChange={e => updatePopup(current.id, { content: { ...current.content, ctaText: e.target.value } })} className="property-input" /></div>
                <div><label className="text-xs opacity-70 mb-1 block">CTA Link URL</label>
                  <input value={current.content.ctaUrl} onChange={e => updatePopup(current.id, { content: { ...current.content, ctaUrl: e.target.value } })} className="property-input" placeholder="https://" /></div>
                <div><label className="text-xs opacity-70 mb-1 block">Image URL</label>
                  <input value={current.content.imageUrl} onChange={e => updatePopup(current.id, { content: { ...current.content, imageUrl: e.target.value } })} className="property-input" /></div>
              </>
            )}

            {activeTab === 'design' && (
              <>
                <div><label className="text-xs opacity-70 mb-1 block">Popup Type</label>
                  <select value={current.type} onChange={e => updatePopup(current.id, { type: e.target.value as any })} className="property-input">
                    <option value="modal">Modal Dialog</option>
                    <option value="banner">Top/Bottom Banner</option>
                    <option value="slide-in">Slide-in</option>
                    <option value="fullscreen">Fullscreen</option>
                    <option value="floating-bar">Floating Bar</option>
                  </select></div>
                <div><label className="text-xs opacity-70 mb-1 block">Position</label>
                  <select value={current.position} onChange={e => updatePopup(current.id, { position: e.target.value as any })} className="property-input">
                    <option value="center">Center</option><option value="top">Top</option><option value="bottom">Bottom</option>
                    <option value="top-left">Top Left</option><option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option><option value="bottom-right">Bottom Right</option>
                  </select></div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'bgColor', label: 'Background' }, { key: 'textColor', label: 'Text' },
                    { key: 'accentColor', label: 'Accent' }, { key: 'overlayColor', label: 'Overlay' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-[10px] opacity-70 mb-1 block">{label}</label>
                      <input type="color" value={(current.style as any)[key].startsWith('rgba') ? '#000000' : (current.style as any)[key]}
                        onChange={e => updatePopup(current.id, { style: { ...current.style, [key]: e.target.value } })}
                        className="w-full h-7 rounded cursor-pointer" />
                    </div>
                  ))}
                </div>
                <div><label className="text-xs opacity-70 mb-1 block">Border Radius</label>
                  <select value={current.style.borderRadius} onChange={e => updatePopup(current.id, { style: { ...current.style, borderRadius: e.target.value } })} className="property-input">
                    <option value="0">None</option><option value="8px">Small</option><option value="16px">Medium</option><option value="24px">Large</option>
                  </select></div>
              </>
            )}

            {activeTab === 'trigger' && (
              <>
                <div><label className="text-xs opacity-70 mb-1 block">Trigger Type</label>
                  <select value={current.trigger} onChange={e => updatePopup(current.id, { trigger: e.target.value as any })} className="property-input">
                    <option value="time-delay">Time Delay</option>
                    <option value="scroll-percent">Scroll Percentage</option>
                    <option value="exit-intent">Exit Intent</option>
                    <option value="click">On Click</option>
                    <option value="page-load">Page Load</option>
                  </select></div>
                {(current.trigger === 'time-delay' || current.trigger === 'scroll-percent') && (
                  <div><label className="text-xs opacity-70 mb-1 block">{current.trigger === 'time-delay' ? 'Delay (seconds)' : 'Scroll %'}</label>
                    <input type="number" value={current.triggerValue} onChange={e => updatePopup(current.id, { triggerValue: e.target.value })} className="property-input" /></div>
                )}
              </>
            )}

            {activeTab === 'behavior' && (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={current.behavior.showOnce} onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, showOnce: e.target.checked } })} className="w-4 h-4 accent-primary" />
                  <span className="text-xs">Show only once per visitor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={current.behavior.closable} onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, closable: e.target.checked } })} className="w-4 h-4 accent-primary" />
                  <span className="text-xs">Allow close button</span>
                </label>
                <div><label className="text-xs opacity-70 mb-1 block">Auto-close after (seconds, 0 = never)</label>
                  <input type="number" value={current.behavior.autoClose} onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, autoClose: Number(e.target.value) } })} className="property-input" /></div>
                <div><label className="text-xs opacity-70 mb-1 block">Display Frequency</label>
                  <select value={current.behavior.frequency} onChange={e => updatePopup(current.id, { behavior: { ...current.behavior, frequency: e.target.value } })} className="property-input">
                    <option value="once">Once per session</option><option value="always">Every visit</option>
                    <option value="daily">Once per day</option><option value="weekly">Once per week</option>
                  </select></div>
              </>
            )}

            {/* Live Preview */}
            <div className="mt-4 rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--builder-panel-border))' }}>
              <div className="text-[10px] uppercase tracking-wider opacity-40 p-2">Preview</div>
              <div className="relative p-4 min-h-[120px] flex items-center justify-center" style={{ background: current.style.overlay ? 'rgba(0,0,0,0.3)' : 'hsl(var(--builder-component-bg))' }}>
                <div className="rounded-lg p-4 shadow-lg max-w-[200px] w-full" style={{ background: current.style.bgColor, color: current.style.textColor, borderRadius: current.style.borderRadius }}>
                  {current.content.heading && <div className="text-xs font-bold mb-1">{current.content.heading}</div>}
                  {current.content.body && <div className="text-[9px] opacity-70 mb-2">{current.content.body}</div>}
                  {current.content.ctaText && (
                    <button className="px-3 py-1 rounded text-[10px] font-medium text-white" style={{ background: current.style.accentColor }}>{current.content.ctaText}</button>
                  )}
                  {current.behavior.closable && <button className="absolute top-5 right-5 text-xs opacity-50">✕</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupBuilderPanel;
