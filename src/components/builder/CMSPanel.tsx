import { useState } from 'react';
import {
  FileText, Plus, Search, Tag, FolderOpen, Eye, EyeOff,
  Edit3, Trash2, X,
  BookOpen, Hash, Star, BarChart3, Loader2,
} from 'lucide-react';
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import { toast } from 'sonner';

const CATEGORIES = ['All', 'Tutorials', 'Design', 'Marketing', 'Development', 'News'];

const statusColors: Record<string, string> = {
  published: 'hsl(var(--success))',
  draft: 'hsl(var(--muted-foreground))',
  scheduled: 'hsl(var(--warning, 45 93% 47%))',
};

interface CMSPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const CMSPanel = ({ projectId, onClose }: CMSPanelProps) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'collections' | 'categories' | 'media'>('posts');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: 'Tutorials', status: 'draft' });

  const { data: posts = [], isLoading } = useBlogPosts(projectId ?? null);
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const updatePost = useUpdateBlogPost();

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const handleAddPost = async () => {
    if (!newPost.title.trim() || !projectId) return;
    try {
      await createPost.mutateAsync({ projectId, title: newPost.title, category: newPost.category, status: newPost.status });
      setNewPost({ title: '', category: 'Tutorials', status: 'draft' });
      setShowNewPost(false);
      toast.success('Post created!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast.success('Post deleted');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    await updatePost.mutateAsync({ postId: id, updates: { featured: !post.featured } as any });
  };

  const handleToggleStatus = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const next = post.status === 'draft' ? 'published' : post.status === 'published' ? 'draft' : post.status;
    await updatePost.mutateAsync({
      postId: id,
      updates: { status: next, publish_date: next === 'published' ? new Date().toISOString() : post.publish_date } as any,
    });
  };

  const tabs = [
    { id: 'posts' as const, label: 'Blog Posts', icon: FileText, count: posts.length },
    { id: 'collections' as const, label: 'Collections', icon: FolderOpen, count: 0 },
    { id: 'categories' as const, label: 'Categories', icon: Tag, count: CATEGORIES.length - 1 },
    { id: 'media' as const, label: 'Media', icon: BarChart3 },
  ];

  if (!projectId) {
    return (
      <div className="builder-flyout overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
            <h2 className="text-sm font-semibold">Content Manager</h2>
          </div>
          {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
        </div>
        <div className="p-6 text-center text-xs opacity-50">Save your project first to manage content.</div>
      </div>
    );
  }

  return (
    <div className="builder-flyout overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Content Manager</h2>
        </div>
        {onClose && <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-4 h-4" /></button>}
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium transition-colors ${
              activeTab === id ? 'border-b-2 opacity-100' : 'opacity-50 hover:opacity-80'
            }`} style={activeTab === id ? { borderColor: 'hsl(var(--primary))' } : undefined}>
            <Icon className="w-3 h-3" />
            {label}
            {count !== undefined && <span className="text-[9px] opacity-50">({count})</span>}
          </button>
        ))}
      </div>

      {/* Posts tab */}
      {activeTab === 'posts' && (
        <div>
          <div className="p-3 space-y-2 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'hsl(var(--muted-foreground))' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="property-input pl-8 text-xs" />
            </div>
            <div className="flex gap-1.5">
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="property-input text-[10px] flex-1">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="property-input text-[10px] flex-1">
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            {showNewPost ? (
              <div className="space-y-2">
                <input autoFocus value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Post title..." className="property-input text-xs" onKeyDown={e => e.key === 'Enter' && handleAddPost()} />
                <div className="flex gap-1.5">
                  <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} className="property-input text-[10px] flex-1">
                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={newPost.status} onChange={e => setNewPost({ ...newPost, status: e.target.value })} className="property-input text-[10px] flex-1">
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                  </select>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={handleAddPost} disabled={createPost.isPending} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    {createPost.isPending ? 'Creating...' : 'Create Post'}
                  </button>
                  <button onClick={() => setShowNewPost(false)} className="px-3 py-1.5 rounded text-[10px] hover:bg-muted">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewPost(true)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
                <Plus className="w-3 h-3" /> New Blog Post
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            {[
              { label: 'Published', count: posts.filter(p => p.status === 'published').length, color: 'hsl(var(--success))' },
              { label: 'Drafts', count: posts.filter(p => p.status === 'draft').length, color: 'hsl(var(--muted-foreground))' },
              { label: 'Scheduled', count: posts.filter(p => p.status === 'scheduled').length, color: 'hsl(var(--warning, 45 93% 47%))' },
            ].map(s => (
              <div key={s.label} className="text-center p-2 rounded" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="text-lg font-bold" style={{ color: s.color }}>{s.count}</div>
                <div className="text-[9px] opacity-50">{s.label}</div>
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="w-5 h-5 animate-spin opacity-50" /></div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'hsl(var(--builder-panel-border) / 0.5)' }}>
              {filtered.map(post => (
                <div key={post.id} className="p-3 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-start gap-2">
                    <button onClick={() => handleToggleFeatured(post.id)} className="mt-0.5 shrink-0">
                      <Star className={`w-3.5 h-3.5 ${post.featured ? 'fill-current' : ''}`} style={{ color: post.featured ? 'hsl(var(--warning, 45 93% 47%))' : 'hsl(var(--muted-foreground) / 0.3)' }} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-xs font-medium truncate">{post.title}</h3>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColors[post.status] || statusColors.draft }} />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] opacity-50">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.read_time}</span>
                        {post.publish_date && <><span>•</span><span>{new Date(post.publish_date).toLocaleDateString()}</span></>}
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {post.tags.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                              <Hash className="w-2 h-2 inline" />{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => handleToggleStatus(post.id)} className="p-1 rounded hover:bg-muted" title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {post.status === 'published' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button className="p-1 rounded hover:bg-muted" title="Edit"><Edit3 className="w-3 h-3" /></button>
                      <button onClick={() => handleDeletePost(post.id)} className="p-1 rounded hover:bg-muted hover:text-destructive" title="Delete"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && !isLoading && (
                <div className="p-6 text-center text-xs opacity-40">No posts found</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Categories tab */}
      {activeTab === 'categories' && (
        <div className="p-3 space-y-2">
          {CATEGORIES.slice(1).map(cat => (
            <div key={cat} className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-xs font-medium">{cat}</span>
              </div>
              <span className="text-[10px] opacity-40">{posts.filter(p => p.category === cat).length} posts</span>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Add Category
          </button>
        </div>
      )}

      {/* Collections tab */}
      {activeTab === 'collections' && (
        <div className="p-3">
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> New Collection
          </button>
          <div className="p-6 text-center text-xs opacity-40">No collections yet</div>
        </div>
      )}

      {/* Media tab */}
      {activeTab === 'media' && (
        <div className="p-3">
          <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
            <Plus className="w-3 h-3" /> Upload Media
          </button>
          <div className="mt-3 p-2.5 rounded-lg text-[10px] opacity-50" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            Supported: JPG, PNG, GIF, SVG, MP4, MP3, PDF
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPanel;
