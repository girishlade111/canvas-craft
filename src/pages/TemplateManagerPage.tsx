import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useTemplates, useMyTemplates, useCreateTemplate,
  useUpdateTemplate, useDeleteTemplate,
} from '@/hooks/useTemplates';
import { useAuth } from '@/hooks/useAuth';
import {
  Code2, Plus, Trash2, Pencil, LogOut, Loader2,
  Search, LayoutTemplate, Tag, Save,
  Star, Globe, Lock, Upload, ArrowLeft, ChevronDown, ChevronUp,
  Copy,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { PageSchema } from '@/types/builder';

const CATEGORIES = [
  'All', 'Business', 'Creative', 'Technology', 'Ecommerce',
  'Education', 'Healthcare', 'Marketing', 'Portfolio', 'Service',
  'Social', 'Community', 'Restaurant', 'Real Estate', 'Finance',
  'Travel', 'Fitness', 'Agency', 'starter',
];

const THUMBNAIL_EMOJIS = [
  '🚀','🎨','💼','🛍️','📚','🏥','📊','🎯','🌐','🤝',
  '🍽️','🏠','💰','✈️','💪','⚡','🔥','✨','🎵','💡',
  '🌟','📱','🖥️','🎬','📸','🎓','⚖️','🌿','🏋️','💎',
];

interface TemplateFormData {
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string;
  is_public: boolean;
  is_premium: boolean;
  schema_text: string;
}

const emptyForm = (): TemplateFormData => ({
  name: '', description: '', category: 'starter',
  thumbnail: '🗒️', tags: '', is_public: true, is_premium: false,
  schema_text: JSON.stringify({ id: 'page-new', name: 'New Template', sections: [] }, null, 2),
});

const TemplateManagerPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: publicTemplates, isLoading: loadingPublic } = useTemplates();
  const { data: myTemplates, isLoading: loadingMine } = useMyTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [tab, setTab] = useState<'all' | 'mine'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TemplateFormData>(emptyForm());
  const [schemaError, setSchemaError] = useState('');
  const [schemaCollapsed, setSchemaCollapsed] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isLoading = tab === 'all' ? loadingPublic : loadingMine;
  const rawList = tab === 'all' ? publicTemplates : myTemplates;

  const filtered = rawList?.filter(t => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || t.category === category;
    return matchSearch && matchCat;
  });

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setSchemaError('');
    setSchemaCollapsed(false);
    setDialogOpen(true);
  };

  const openEdit = (t: any) => {
    setEditingId(t.id);
    setForm({
      name: t.name || '',
      description: t.description || '',
      category: t.category || 'starter',
      thumbnail: t.thumbnail || '🗒️',
      tags: (t.tags || []).join(', '),
      is_public: t.is_public ?? true,
      is_premium: t.is_premium ?? false,
      schema_text: JSON.stringify(t.schema, null, 2),
    });
    setSchemaError('');
    setSchemaCollapsed(true);
    setDialogOpen(true);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        // Support both bare schema and wrapped { name, schema, ... } objects
        if (parsed.sections) {
          setForm(prev => ({ ...prev, schema_text: JSON.stringify(parsed, null, 2) }));
        } else if (parsed.schema) {
          setForm(prev => ({
            ...prev,
            name: parsed.name || prev.name,
            description: parsed.description || prev.description,
            category: parsed.category || prev.category,
            thumbnail: parsed.thumbnail || prev.thumbnail,
            tags: (parsed.tags || []).join(', ') || prev.tags,
            schema_text: JSON.stringify(parsed.schema, null, 2),
          }));
        }
        setSchemaError('');
        toast.success('JSON imported!');
      } catch {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleCopySchema = (t: any) => {
    navigator.clipboard.writeText(JSON.stringify(t.schema, null, 2));
    toast.success('Schema JSON copied!');
  };

  const validateSchema = (text: string): PageSchema | null => {
    try {
      const parsed = JSON.parse(text);
      if (!parsed.id || !parsed.name || !Array.isArray(parsed.sections)) {
        setSchemaError('Schema must have id, name, and sections array.');
        return null;
      }
      setSchemaError('');
      return parsed as PageSchema;
    } catch (e: any) {
      setSchemaError('Invalid JSON: ' + e.message);
      return null;
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    const schema = validateSchema(form.schema_text);
    if (!schema) return;

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      thumbnail: form.thumbnail,
      tags,
      is_public: form.is_public,
      is_premium: form.is_premium,
      schema,
    };

    try {
      if (editingId) {
        await updateTemplate.mutateAsync({ id: editingId, ...payload });
        toast.success('Template updated!');
      } else {
        await createTemplate.mutateAsync(payload);
        toast.success('Template created!');
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate.mutateAsync(id);
      toast.success('Template deleted');
      setDeleteConfirm(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const isSaving = createTemplate.isPending || updateTemplate.isPending;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}>
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">DevBuilder</span>
                <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Template Manager
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <button onClick={() => signOut()}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title + actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <LayoutTemplate className="w-6 h-6 text-primary" />
              Template Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered?.length ?? 0} templates{tab === 'all' ? ' (public)' : ' (yours)'}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search templates..." className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-56" />
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              style={{ background: 'var(--gradient-primary)' }}>
              <Plus className="w-4 h-4" /> New Template
            </button>
          </div>
        </div>

        {/* Tabs + Category filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex bg-muted rounded-xl p-1 gap-1 w-fit">
            {(['all', 'mine'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {t === 'all' ? '🌐 All Public' : '👤 My Templates'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.slice(0, 10).map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${category === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !filtered?.length ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-muted/50">
              <LayoutTemplate className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <p className="text-lg font-medium mb-2">No templates found</p>
            <p className="text-sm text-muted-foreground mb-6">Try a different filter or create a new template.</p>
            <button onClick={openCreate}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground"
              style={{ background: 'var(--gradient-primary)' }}>
              <Plus className="w-4 h-4" /> Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(t => (
              <div key={t.id}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Thumbnail */}
                <div className="h-32 flex items-center justify-center text-5xl bg-muted/30 relative">
                  {t.thumbnail}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {t.is_premium && (
                      <span className="bg-amber-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5" /> PRO
                      </span>
                    )}
                    {t.is_public ? (
                      <span className="bg-green-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        PUBLIC
                      </span>
                    ) : (
                      <span className="bg-muted text-muted-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        PRIVATE
                      </span>
                    )}
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{t.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{t.description}</p>
                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{t.category}</Badge>
                    {t.tags?.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        <Tag className="w-2.5 h-2.5 mr-0.5" />{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => handleCopySchema(t)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Copy className="w-3 h-3" /> Schema
                    </button>
                    <button onClick={() => openEdit(t)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(t.id)}
                      className="py-1.5 px-2.5 rounded-lg border border-border text-xs font-medium hover:bg-destructive/10 hover:border-destructive/30 text-destructive transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingId ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            {/* Row 1: Name + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Name <span className="text-destructive">*</span></label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="SaaS Pro Landing" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={2} className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Modern SaaS landing page with pricing, testimonials, and CTA sections." />
            </div>

            {/* Row: Thumbnail + Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Thumbnail Emoji</label>
                <div className="flex gap-2 items-center">
                  <input value={form.thumbnail} onChange={e => setForm(p => ({ ...p, thumbnail: e.target.value }))}
                    className="w-20 rounded-xl border border-border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-center text-xl"
                    maxLength={2} />
                  <div className="flex flex-wrap gap-1 flex-1">
                    {THUMBNAIL_EMOJIS.map(em => (
                      <button key={em} onClick={() => setForm(p => ({ ...p, thumbnail: em }))}
                        className={`w-7 h-7 rounded-lg text-base transition-colors hover:bg-muted ${form.thumbnail === em ? 'bg-primary/10 ring-2 ring-primary' : ''}`}>
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Tags <span className="text-muted-foreground text-xs">(comma-separated)</span>
                </label>
                <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="saas, startup, modern, landing" />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div onClick={() => setForm(p => ({ ...p, is_public: !p.is_public }))}
                  className={`w-10 h-5.5 rounded-full transition-colors flex items-center px-0.5 ${form.is_public ? 'bg-green-500' : 'bg-muted-foreground/30'}`}
                  style={{ height: '22px' }}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_public ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm flex items-center gap-1">
                  {form.is_public ? <Globe className="w-3.5 h-3.5 text-green-500" /> : <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                  {form.is_public ? 'Public' : 'Private'}
                </span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div onClick={() => setForm(p => ({ ...p, is_premium: !p.is_premium }))}
                  className={`w-10 rounded-full transition-colors flex items-center px-0.5 ${form.is_premium ? 'bg-amber-500' : 'bg-muted-foreground/30'}`}
                  style={{ height: '22px' }}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_premium ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm flex items-center gap-1">
                  <Star className={`w-3.5 h-3.5 ${form.is_premium ? 'text-amber-500' : 'text-muted-foreground'}`} />
                  {form.is_premium ? 'Premium' : 'Free'}
                </span>
              </label>
            </div>

            {/* Schema Editor */}
            <div className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setSchemaCollapsed(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-muted/50 hover:bg-muted transition-colors">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Schema JSON <span className="text-muted-foreground text-xs">(PageSchema)</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                    className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Upload className="w-3 h-3" /> Import JSON
                  </button>
                  {schemaCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </div>
              </button>

              {!schemaCollapsed && (
                <div className="relative">
                  <textarea
                    value={form.schema_text}
                    onChange={e => {
                      setForm(p => ({ ...p, schema_text: e.target.value }));
                      if (schemaError) validateSchema(e.target.value);
                    }}
                    rows={18}
                    spellCheck={false}
                    className="w-full px-4 py-3 text-xs font-mono bg-background focus:outline-none resize-none border-0"
                    style={{ tabSize: 2 }}
                  />
                </div>
              )}
              {schemaError && (
                <div className="px-4 py-2 bg-destructive/10 text-destructive text-xs border-t border-border">
                  ⚠ {schemaError}
                </div>
              )}
            </div>

            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImportJSON} />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setDialogOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                style={{ background: 'var(--gradient-primary)' }}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Template'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-4 h-4" /> Delete Template?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            This action is permanent and cannot be undone. The template will be removed for all users.
          </p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setDeleteConfirm(null)}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
              Cancel
            </button>
            <button onClick={() => handleDelete(deleteConfirm!)}
              disabled={deleteTemplate.isPending}
              className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
              {deleteTemplate.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateManagerPage;
