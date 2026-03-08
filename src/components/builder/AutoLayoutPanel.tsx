/**
 * Auto Layout Panel — Figma-style layout controls
 * Renders as a section inside the PropertiesPanel for container components.
 */

import React from 'react';
import { useBuilderStore } from '@/store/builderStore';
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowLeft,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  StretchHorizontal, StretchVertical,
  Columns3, Rows3, LayoutGrid, WrapText,
} from 'lucide-react';

type LayoutMode = 'block' | 'flex' | 'grid';

interface AutoLayoutPanelProps {
  componentId: string;
}

const AutoLayoutPanel: React.FC<AutoLayoutPanelProps> = ({ componentId }) => {
  const { updateComponentStyles } = useBuilderStore();
  const comp = useBuilderStore.getState().getSelectedComponent();
  if (!comp) return null;

  const styles = comp.styles;
  const currentDisplay = styles.display || 'block';
  const layoutMode: LayoutMode = currentDisplay === 'grid' ? 'grid' : currentDisplay === 'flex' ? 'flex' : 'block';
  const direction = styles.flexDirection || 'column';
  const justify = styles.justifyContent || 'flex-start';
  const align = styles.alignItems || 'stretch';
  const wrap = styles.flexWrap || 'nowrap';
  const gap = styles.gap || '0';
  const padding = styles.padding || '0';

  const set = (updates: Record<string, string>) => {
    updateComponentStyles(componentId, updates);
  };

  const setLayoutMode = (mode: LayoutMode) => {
    set({ display: mode });
  };

  const btnClass = (active: boolean) =>
    `p-1.5 rounded transition-colors ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'}`;

  return (
    <div className="px-4 pb-3 space-y-3">
      {/* Layout Mode */}
      <div>
        <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Layout Mode</span>
        <div className="flex gap-1">
          <button onClick={() => setLayoutMode('block')} className={btnClass(layoutMode === 'block')} title="Block">
            <Rows3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setLayoutMode('flex')} className={btnClass(layoutMode === 'flex')} title="Flex">
            <Columns3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setLayoutMode('grid')} className={btnClass(layoutMode === 'grid')} title="Grid">
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Flex controls */}
      {layoutMode === 'flex' && (
        <>
          {/* Direction */}
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Direction</span>
            <div className="flex gap-1">
              {[
                { val: 'row', icon: ArrowRight, label: 'Row' },
                { val: 'column', icon: ArrowDown, label: 'Column' },
                { val: 'row-reverse', icon: ArrowLeft, label: 'Row Reverse' },
                { val: 'column-reverse', icon: ArrowUp, label: 'Column Reverse' },
              ].map(({ val, icon: Icon, label }) => (
                <button
                  key={val}
                  onClick={() => set({ flexDirection: val })}
                  className={btnClass(direction === val)}
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Wrap */}
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Wrap</span>
            <div className="flex gap-1">
              <button onClick={() => set({ flexWrap: 'nowrap' })} className={btnClass(wrap === 'nowrap')} title="No wrap">
                No Wrap
              </button>
              <button onClick={() => set({ flexWrap: 'wrap' })} className={btnClass(wrap === 'wrap')} title="Wrap">
                <WrapText className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Justify (main axis) */}
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Distribute</span>
            <div className="flex gap-1">
              {[
                { val: 'flex-start', icon: AlignStartHorizontal },
                { val: 'center', icon: AlignCenterHorizontal },
                { val: 'flex-end', icon: AlignEndHorizontal },
                { val: 'space-between', icon: StretchHorizontal },
              ].map(({ val, icon: Icon }) => (
                <button
                  key={val}
                  onClick={() => set({ justifyContent: val })}
                  className={btnClass(justify === val)}
                  title={val}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Align (cross axis) */}
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Align</span>
            <div className="flex gap-1">
              {[
                { val: 'flex-start', icon: AlignStartVertical },
                { val: 'center', icon: AlignCenterVertical },
                { val: 'flex-end', icon: AlignEndVertical },
                { val: 'stretch', icon: StretchVertical },
              ].map(({ val, icon: Icon }) => (
                <button
                  key={val}
                  onClick={() => set({ alignItems: val })}
                  className={btnClass(align === val)}
                  title={val}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Grid controls */}
      {layoutMode === 'grid' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-xs w-20 shrink-0 opacity-70">Columns</label>
            <input
              value={styles.gridTemplateColumns || 'repeat(3, 1fr)'}
              onChange={(e) => set({ gridTemplateColumns: e.target.value })}
              className="property-input flex-1"
              placeholder="repeat(3, 1fr)"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs w-20 shrink-0 opacity-70">Rows</label>
            <input
              value={styles.gridTemplateRows || ''}
              onChange={(e) => set({ gridTemplateRows: e.target.value })}
              className="property-input flex-1"
              placeholder="auto"
            />
          </div>
        </div>
      )}

      {/* Gap */}
      <div className="flex items-center gap-2">
        <label className="text-xs w-20 shrink-0 opacity-70">Gap</label>
        <input
          value={gap}
          onChange={(e) => set({ gap: e.target.value })}
          className="property-input flex-1"
          placeholder="0px"
        />
      </div>

      {/* Padding */}
      <div className="flex items-center gap-2">
        <label className="text-xs w-20 shrink-0 opacity-70">Padding</label>
        <input
          value={padding}
          onChange={(e) => set({ padding: e.target.value })}
          className="property-input flex-1"
          placeholder="0px"
        />
      </div>

      {/* Position */}
      <div>
        <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1.5">Position</span>
        <select
          value={styles.position || 'static'}
          onChange={(e) => set({ position: e.target.value })}
          className="property-input w-full"
        >
          <option value="static">Static</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>

      {/* Position offsets for non-static */}
      {styles.position && styles.position !== 'static' && (
        <div className="grid grid-cols-2 gap-2">
          {(['top', 'right', 'bottom', 'left'] as const).map(side => (
            <div key={side} className="flex items-center gap-1">
              <label className="text-[10px] w-8 opacity-50 capitalize">{side}</label>
              <input
                value={styles[side] || ''}
                onChange={(e) => set({ [side]: e.target.value })}
                className="property-input flex-1"
                placeholder="auto"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoLayoutPanel;
