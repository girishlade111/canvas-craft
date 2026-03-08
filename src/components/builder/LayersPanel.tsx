import { useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';
import type { BuilderComponent, PageSection } from '@/types/builder';
import {
  Layers, Eye, EyeOff, Lock, Unlock, ChevronRight, ChevronDown,
  GripVertical, Trash2, Copy, Plus, ArrowUp, ArrowDown, Image,
  MoreHorizontal, Type, Square,
} from 'lucide-react';

// ─── Icon by component type ───────────────────────────────

const getTypeIcon = (type: string) => {
  if (['heading', 'paragraph', 'text', 'label', 'quote'].includes(type)) return Type;
  if (['image', 'avatar', 'gallery'].includes(type)) return Image;
  if (['section', 'container', 'grid', 'columns', 'row'].includes(type)) return Layers;
  return Square;
};

// ─── Layer Item ────────────────────────────────────────────

const LayerItem = ({
  node,
  depth = 0,
  sectionId,
}: {
  node: BuilderComponent;
  depth?: number;
  sectionId: string;
}) => {
  const {
    selectedComponentId, selectComponent, updateComponent, removeComponent,
    addComponentToContainer,
  } = useBuilderStore();
  const [expanded, setExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState(node.label);
  const isSelected = selectedComponentId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const TypeIcon = getTypeIcon(node.type);

  const handleRename = () => {
    updateComponent(node.id, { label: tempName });
    setIsRenaming(false);
  };

  const handleDuplicate = () => {
    const clone: BuilderComponent = JSON.parse(JSON.stringify(node));
    clone.id = `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    clone.label = `${node.label} (copy)`;
    addComponentToContainer(sectionId, clone);
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1.5 text-xs cursor-pointer transition-colors group ${
          isSelected ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={(e) => { e.stopPropagation(); selectComponent(node.id); }}
        onDoubleClick={(e) => { e.stopPropagation(); setIsRenaming(true); setTempName(node.label); }}
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
        <GripVertical className="w-3 h-3 opacity-30 shrink-0 cursor-grab" />
        <TypeIcon className="w-3 h-3 opacity-50 shrink-0" />

        {isRenaming ? (
          <input
            autoFocus
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setIsRenaming(false); }}
            className="flex-1 bg-transparent border-b border-primary outline-none text-xs px-0.5"
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span className="truncate flex-1 font-medium">{node.label}</span>
        )}

        <span className="text-[10px] opacity-30 shrink-0 hidden group-hover:inline">{node.type}</span>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); handleDuplicate(); }}
            className="p-0.5 rounded hover:bg-white/10"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateComponent(node.id, { hidden: !node.hidden }); }}
            className="p-0.5 rounded hover:bg-white/10"
            title={node.hidden ? 'Show' : 'Hide'}
          >
            {node.hidden ? <EyeOff className="w-3 h-3 opacity-50" /> : <Eye className="w-3 h-3" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); updateComponent(node.id, { locked: !node.locked }); }}
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
        <LayerItem key={child.id} node={child} depth={depth + 1} sectionId={sectionId} />
      ))}
    </div>
  );
};

// ─── Section Layer ─────────────────────────────────────────

const SectionLayer = ({ section, onMoveUp, onMoveDown, onDuplicate, onDelete, isFirst, isLast }: {
  section: PageSection;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const [expanded, setExpanded] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
      <div className="w-full flex items-center gap-2 px-3 py-2 group">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-0.5 hover:bg-white/10 rounded"
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-60 flex-1">
          {section.label}
        </span>
        <span className="text-[10px] opacity-30">({section.components.length})</span>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isFirst && (
            <button onClick={onMoveUp} className="p-0.5 rounded hover:bg-white/10" title="Move Up">
              <ArrowUp className="w-3 h-3" />
            </button>
          )}
          {!isLast && (
            <button onClick={onMoveDown} className="p-0.5 rounded hover:bg-white/10" title="Move Down">
              <ArrowDown className="w-3 h-3" />
            </button>
          )}
          <button onClick={onDuplicate} className="p-0.5 rounded hover:bg-white/10" title="Duplicate Section">
            <Copy className="w-3 h-3" />
          </button>
          <button onClick={onDelete} className="p-0.5 rounded hover:bg-white/10 hover:text-red-400" title="Delete Section">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      {expanded && section.components.map((comp) => (
        <LayerItem key={comp.id} node={comp} depth={0} sectionId={section.id} />
      ))}
    </div>
  );
};

// ─── Layers Panel ──────────────────────────────────────────

const LayersPanel = () => {
  const { schema, selectComponent, setSchema } = useBuilderStore();

  const handleAddSection = () => {
    const newSection: PageSection = {
      id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'section',
      label: `Section ${schema.sections.length + 1}`,
      components: [],
      styles: { padding: '40px 20px', width: '100%', minHeight: '100px' },
    };
    setSchema({ ...schema, sections: [...schema.sections, newSection] });
  };

  const handleMoveSection = (index: number, direction: -1 | 1) => {
    const sections = [...schema.sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
    setSchema({ ...schema, sections });
  };

  const handleDuplicateSection = (index: number) => {
    const section = schema.sections[index];
    const clone: PageSection = JSON.parse(JSON.stringify(section));
    clone.id = `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    clone.label = `${section.label} (copy)`;
    // Reassign IDs to all cloned components
    const reassignIds = (comp: BuilderComponent): BuilderComponent => ({
      ...comp,
      id: `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      children: comp.children?.map(reassignIds),
    });
    clone.components = clone.components.map(reassignIds);
    const sections = [...schema.sections];
    sections.splice(index + 1, 0, clone);
    setSchema({ ...schema, sections });
  };

  const handleDeleteSection = (index: number) => {
    if (schema.sections.length <= 1) return; // Keep at least one section
    const sections = schema.sections.filter((_, i) => i !== index);
    setSchema({ ...schema, sections });
  };

  return (
    <div className="builder-flyout overflow-y-auto">
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">Layers</h2>
        </div>
        <button
          onClick={handleAddSection}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          title="Add Section"
        >
          <Plus className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
        </button>
      </div>

      <div className="py-1" onClick={() => selectComponent(null)}>
        {schema.sections.length === 0 ? (
          <div className="p-4 text-xs opacity-40 text-center">No sections yet</div>
        ) : (
          schema.sections.map((section, index) => (
            <SectionLayer
              key={section.id}
              section={section}
              onMoveUp={() => handleMoveSection(index, -1)}
              onMoveDown={() => handleMoveSection(index, 1)}
              onDuplicate={() => handleDuplicateSection(index)}
              onDelete={() => handleDeleteSection(index)}
              isFirst={index === 0}
              isLast={index === schema.sections.length - 1}
            />
          ))
        )}
      </div>

      {/* Section count */}
      <div className="px-3 py-2 text-[10px] opacity-30 text-center border-t" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.3)' }}>
        {schema.sections.length} section{schema.sections.length !== 1 ? 's' : ''} •{' '}
        {schema.sections.reduce((acc, s) => acc + s.components.length, 0)} elements
      </div>
    </div>
  );
};

export default LayersPanel;
