import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent, PageSection } from '@/types/builder';
import {
  Layers, Eye, EyeOff, Lock, Unlock, ChevronRight, ChevronDown,
  GripVertical, Trash2, Copy,
} from 'lucide-react';

const LayerItem = ({
  node,
  depth = 0,
}: {
  node: BuilderComponent;
  depth?: number;
}) => {
  const {
    selectedComponentId, selectComponent, updateComponent, removeComponent,
  } = useBuilderStore();
  const [expanded, setExpanded] = useState(true);
  const isSelected = selectedComponentId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1.5 text-xs cursor-pointer transition-colors group ${
          isSelected ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={(e) => { e.stopPropagation(); selectComponent(node.id); }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="p-0.5 hover:bg-white/10 rounded"
          >
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <GripVertical className="w-3 h-3 opacity-30 shrink-0" />
        <span className="truncate flex-1 font-medium">{node.label}</span>
        <span className="text-[10px] opacity-30 shrink-0">{node.type}</span>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateComponent(node.id, { hidden: !node.hidden });
            }}
            className="p-0.5 rounded hover:bg-white/10"
            title={node.hidden ? 'Show' : 'Hide'}
          >
            {node.hidden ? <EyeOff className="w-3 h-3 opacity-50" /> : <Eye className="w-3 h-3" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateComponent(node.id, { locked: !node.locked });
            }}
            className="p-0.5 rounded hover:bg-white/10"
            title={node.locked ? 'Unlock' : 'Lock'}
          >
            {node.locked ? <Lock className="w-3 h-3 opacity-50" /> : <Unlock className="w-3 h-3" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); removeComponent(node.id); }}
            className="p-0.5 rounded hover:bg-white/10 hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      {expanded && hasChildren && node.children!.map((child) => (
        <LayerItem key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
};

const SectionLayer = ({ section }: { section: PageSection }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
      >
        {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <span>{section.label}</span>
        <span className="opacity-40 font-normal">({section.components.length})</span>
      </button>
      {expanded && section.components.map((comp) => (
        <LayerItem key={comp.id} node={comp} depth={0} />
      ))}
    </div>
  );
};

const LayersPanel = () => {
  const { schema, selectComponent } = useBuilderStore();

  return (
    <div className="builder-sidebar w-60 border-r overflow-y-auto">
      <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Layers</h2>
        </div>
      </div>
      <div className="py-1" onClick={() => selectComponent(null)}>
        {schema.sections.length === 0 ? (
          <div className="p-4 text-xs opacity-40 text-center">No elements yet</div>
        ) : (
          schema.sections.map((section) => (
            <SectionLayer key={section.id} section={section} />
          ))
        )}
      </div>
    </div>
  );
};

export default LayersPanel;
