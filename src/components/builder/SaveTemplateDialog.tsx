import { useState } from 'react';
import { X, Cloud, Save, Globe, Lock } from 'lucide-react';
import { useBuilderStore } from '@/store/builderStore';
import { useCreateTemplate } from '@/hooks/useTemplates';
import { toast } from 'sonner';

interface SaveTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'starter', 'business', 'creative', 'marketing',
  'commerce', 'content', 'tech', 'food', 'social',
];

const THUMBNAILS = ['🗒️', '⚡', '✦', '✍️', '◆', '◯', '🛍️', '📊', '📷', '▲', '🟣', '🎨', '🏢', '🍽️', '💼'];

const SaveTemplateDialog = ({ open, onClose }: SaveTemplateDialogProps) => {
  const schema = useBuilderStore((s) => s.schema);
  const createTemplate = useCreateTemplate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('starter');
  const [thumbnail, setThumbnail] = useState('🗒️');
  const [isPublic, setIsPublic] = useState(true);

  if (!open) return null;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a template name.');
      return;
    }
    try {
      await createTemplate.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        category,
        thumbnail,
        schema,
        is_public: isPublic,
        tags: [],
      });
      toast.success('Template saved to cloud!');
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl border animate-scale-in"
        style={{
          background: 'hsl(var(--background))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Save as Template</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Template Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Modern SaaS Landing Page"
              className="w-full px-3 py-2 rounded-xl border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              style={{ borderColor: 'hsl(var(--border))' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this template..."
              rows={2}
              className="w-full px-3 py-2 rounded-xl border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              style={{ borderColor: 'hsl(var(--border))' }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all capitalize ${
                    category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Thumbnail</label>
            <div className="flex flex-wrap gap-1.5">
              {THUMBNAILS.map((t) => (
                <button
                  key={t}
                  onClick={() => setThumbnail(t)}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                    thumbnail === t
                      ? 'bg-primary/10 ring-2 ring-primary'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <button
              onClick={() => setIsPublic(true)}
              className={`flex-1 flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                isPublic ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Public
            </button>
            <button
              onClick={() => setIsPublic(false)}
              className={`flex-1 flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                !isPublic ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              <Lock className="w-3.5 h-3.5" /> Private
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            {isPublic ? 'Anyone can find and use this template.' : 'Only you can see and use this template.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={createTemplate.isPending}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {createTemplate.isPending ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveTemplateDialog;
