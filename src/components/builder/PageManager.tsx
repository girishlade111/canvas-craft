import { useState } from 'react';
import { usePages, useCreatePage, useUpdatePage, useDeletePage, type Page } from '@/hooks/usePages';
import { Plus, FileText, Trash2, Pencil, Check, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PageManagerProps {
  projectId: string;
  currentPageId: string | null;
  onSelectPage: (page: Page) => void;
}

const PageManager = ({ projectId, currentPageId, onSelectPage }: PageManagerProps) => {
  const { data: pages, isLoading } = usePages(projectId);
  const createPage = useCreatePage();
  const updatePage = useUpdatePage();
  const deletePage = useDeletePage();

  const [isAdding, setIsAdding] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = async () => {
    if (!newPageName.trim()) return;
    const slug = newPageName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    try {
      const page = await createPage.mutateAsync({ projectId, name: newPageName.trim(), slug: slug || 'page' });
      toast.success(`Page "${page.name}" created`);
      setIsAdding(false);
      setNewPageName('');
      onSelectPage(page);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRename = async (pageId: string) => {
    if (!editName.trim()) return;
    try {
      await updatePage.mutateAsync({ pageId, updates: { name: editName.trim() } });
      setEditingId(null);
      toast.success('Page renamed');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (pageId: string, pageName: string) => {
    if (pages && pages.length <= 1) {
      toast.error('Cannot delete the only page');
      return;
    }
    if (!confirm(`Delete page "${pageName}"?`)) return;
    try {
      await deletePage.mutateAsync(pageId);
      toast.success('Page deleted');
      // If deleted current page, switch to first remaining
      if (pageId === currentPageId && pages) {
        const remaining = pages.filter(p => p.id !== pageId);
        if (remaining.length) onSelectPage(remaining[0]);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        {isLoading ? (
          <div className="px-3 py-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin opacity-40" />
          </div>
        ) : (
          pages?.map(page => (
            <div
              key={page.id}
              className={`group flex items-center gap-1 px-3 py-1.5 text-xs cursor-pointer border-r shrink-0 transition-colors ${
                currentPageId === page.id
                  ? 'bg-white/10 text-foreground'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
              style={{ borderColor: 'hsl(var(--builder-panel-border))' }}
              onClick={() => onSelectPage(page)}
            >
              <FileText className="w-3 h-3 shrink-0 opacity-50" />

              {editingId === page.id ? (
                <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleRename(page.id); if (e.key === 'Escape') setEditingId(null); }}
                    className="w-20 bg-transparent border-b border-primary text-xs outline-none"
                    autoFocus
                  />
                  <button onClick={() => handleRename(page.id)} className="p-0.5 hover:bg-white/10 rounded">
                    <Check className="w-3 h-3 text-green-400" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-0.5 hover:bg-white/10 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="truncate max-w-[80px]">{page.name}</span>
                  <div className="flex gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={e => { e.stopPropagation(); setEditingId(page.id); setEditName(page.name); }}
                      className="p-0.5 hover:bg-white/10 rounded"
                    >
                      <Pencil className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(page.id, page.name); }}
                      className="p-0.5 hover:bg-destructive/20 text-destructive rounded"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}

        {/* Add page */}
        {isAdding ? (
          <div className="flex items-center gap-1 px-2 py-1.5 shrink-0">
            <input
              value={newPageName}
              onChange={e => setNewPageName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') { setIsAdding(false); setNewPageName(''); } }}
              placeholder="Page name"
              className="w-24 bg-transparent border-b border-primary text-xs outline-none"
              autoFocus
            />
            <button onClick={handleAdd} disabled={createPage.isPending} className="p-0.5 hover:bg-white/10 rounded">
              {createPage.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3 text-green-400" />}
            </button>
            <button onClick={() => { setIsAdding(false); setNewPageName(''); }} className="p-0.5 hover:bg-white/10 rounded">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors shrink-0"
          >
            <Plus className="w-3 h-3" />
            Add Page
          </button>
        )}
      </div>
    </div>
  );
};

export default PageManager;
