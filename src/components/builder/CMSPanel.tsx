import { useState } from 'react';
import {
  FileText, Plus, Search, Calendar, Tag, FolderOpen, Eye, EyeOff,
  Clock, Edit3, Trash2, ChevronDown, ChevronRight, Filter, X,
  BookOpen, Hash, Star, Archive, BarChart3,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  category: string;
  tags: string[];
  author: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
}

interface CMSCollection {
  id: string;
  name: string;
  slug: string;
  fields: { name: string; type: string }[];
  itemCount: number;
}

const MOCK_POSTS: BlogPost[] = [
  { id: '1', title: 'Getting Started with Web Design', slug: 'getting-started', status: 'published', category: 'Tutorials', tags: ['design', 'beginners'], author: 'Admin', excerpt: 'Learn the fundamentals of modern web design...', publishDate: '2026-03-01', readTime: '5 min', featured: true },
  { id: '2', title: 'Top 10 Typography Tips', slug: 'typography-tips', status: 'published', category: 'Design', tags: ['typography', 'tips'], author: 'Admin', excerpt: 'Master typography with these essential tips...', publishDate: '2026-02-28', readTime: '3 min', featured: false },
  { id: '3', title: 'SEO Best Practices 2026', slug: 'seo-best-practices', status: 'draft', category: 'Marketing', tags: ['seo', 'marketing'], author: 'Admin', excerpt: 'Stay ahead with the latest SEO strategies...', publishDate: '', readTime: '7 min', featured: false },
  { id: '4', title: 'Color Theory for Web', slug: 'color-theory', status: 'scheduled', category: 'Design', tags: ['color', 'design'], author: 'Admin', excerpt: 'Understanding color psychology in web design...', publishDate: '2026-03-15', readTime: '4 min', featured: true },
];

const MOCK_COLLECTIONS: CMSCollection[] = [
  { id: '1', name: 'Team Members', slug: 'team', fields: [{ name: 'Name', type: 'text' }, { name: 'Role', type: 'text' }, { name: 'Photo', type: 'image' }, { name: 'Bio', type: 'richtext' }], itemCount: 8 },
  { id: '2', name: 'Testimonials', slug: 'testimonials', fields: [{ name: 'Quote', type: 'richtext' }, { name: 'Author', type: 'text' }, { name: 'Rating', type: 'number' }], itemCount: 12 },
  { id: '3', name: 'Portfolio', slug: 'portfolio', fields: [{ name: 'Title', type: 'text' }, { name: 'Image', type: 'image' }, { name: 'Category', type: 'select' }, { name: 'Description', type: 'richtext' }], itemCount: 6 },
];

const CATEGORIES = ['All', 'Tutorials', 'Design', 'Marketing', 'Development', 'News'];

const statusColors: Record<string, string> = {
  published: 'hsl(var(--success))',
  draft: 'hsl(var(--muted-foreground))',
  scheduled: 'hsl(var(--warning, 45 93% 47%))',
};

interface CMSPanelProps {
  onClose?: () => void;
}

const CMSPanel = ({ onClose }: CMSPanelProps) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'collections' | 'categories' | 'media'>('posts');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [collections] = useState(MOCK_COLLECTIONS);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: 'Tutorials', status: 'draft' as const });
  const [showNewCollection, setShowNewCollection] = useState(false);

  const filtered = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const handleAddPost = () => {
    if (!newPost.title.trim()) return;
    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
      status: newPost.status,
      category: newPost.category,
      tags: [],
      author: 'Admin',
      excerpt: '',
      publishDate: newPost.status === 'published' ? new Date().toISOString().split('T')[0] : '',
      readTime: '1 min',
      featured: false,
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', category: 'Tutorials', status: 'draft' });
    setShowNewPost(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const handleToggleStatus = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id !== id) return p;
      const next = p.status === 'draft' ? 'published' : p.status === 'published' ? 'draft' : p.status;
      return { ...p, status: next, publishDate: next === 'published' ? new Date().toISOString().split('T')[0] : p.publishDate };
    }));
  };

  const tabs = [
    { id: 'posts' as const, label: 'Blog Posts', icon: FileText, count: posts.length },
    { id: 'collections' as const, label: 'Collections', icon: FolderOpen, count: collections.length },
    { id: 'categories' as const, label: 'Categories', icon: Tag, count: CATEGORIES.length - 1 },
    { id: 'media' as const, label: 'Media', icon: BarChart3 },
  ];

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
          {/* Search & filters */}
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

          {/* New post form */}
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            {showNewPost ? (
              <div className="space-y-2">
                <input autoFocus value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Post title..." className="property-input text-xs" onKeyDown={e => e.key === 'Enter' && handleAddPost()} />
                <div className="flex gap-1.5">
                  <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} className="property-input text-[10px] flex-1">
                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={newPost.status} onChange={e => setNewPost({ ...newPost, status: e.target.value as 'draft' | 'published' })} className="property-input text-[10px] flex-1">
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                  </select>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={handleAddPost} className="flex-1 py-1.5 rounded text-[10px] font-semibold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>Create Post</button>
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

          {/* Post list */}
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
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColors[post.status] }} />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] opacity-50">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      {post.publishDate && <><span>•</span><span>{post.publishDate}</span></>}
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
            {filtered.length === 0 && (
              <div className="p-6 text-center text-xs opacity-40">No posts found</div>
            )}
          </div>
        </div>
      )}

      {/* Collections tab */}
      {activeTab === 'collections' && (
        <div>
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <button onClick={() => setShowNewCollection(!showNewCollection)} className="w-full flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
              <Plus className="w-3 h-3" /> New Collection
            </button>
          </div>
          <div className="space-y-1 p-2">
            {collections.map(col => (
              <div key={col.id} className="p-3 rounded-lg transition-colors hover:bg-muted/30 cursor-pointer" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs font-semibold">{col.name}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>{col.itemCount} items</span>
                </div>
                <div className="text-[10px] opacity-50 mb-2">/{col.slug}</div>
                <div className="flex flex-wrap gap-1">
                  {col.fields.map(f => (
                    <span key={f.name} className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'hsl(var(--muted) / 0.5)' }}>
                      {f.name} <span className="opacity-40">({f.type})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

      {/* Media tab */}
      {activeTab === 'media' && (
        <div className="p-3">
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-xs opacity-30" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                📷
              </div>
            ))}
          </div>
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
