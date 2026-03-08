import { useState } from 'react';
import {
  FileText, Plus, Search, Tag, FolderOpen, Eye, EyeOff,
  Edit3, Trash2, X, BookOpen, Hash, Star, BarChart3, Loader2,
  Layout, Grid, List, Image, Type, Calendar, User, Clock,
  ChevronRight, ArrowRight, Layers, Component, Code, Copy,
  Sparkles, Zap, Settings, HelpCircle, ExternalLink, Check,
  GripVertical, Move, Database, Table, FileJson, Repeat,
} from 'lucide-react';
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import { toast } from 'sonner';
import { useDraggable } from '@dnd-kit/core';

const CATEGORIES = ['All', 'Tutorials', 'Design', 'Marketing', 'Development', 'News'];

const statusColors: Record<string, string> = {
  published: 'hsl(var(--success))',
  draft: 'hsl(var(--muted-foreground))',
  scheduled: 'hsl(var(--warning, 45 93% 47%))',
};

/* ── CMS Component Definitions (draggable to canvas) ── */
interface CMSComponent {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  type: string; // Component type for the builder
  category: 'blog' | 'collection' | 'dynamic' | 'display';
  preview?: string;
}

const cmsComponents: CMSComponent[] = [
  // Blog Components
  { id: 'blog-list', name: 'Blog Post List', description: 'Display a grid or list of blog posts', icon: Grid, type: 'blog-list', category: 'blog', preview: '📰 Blog Posts Grid' },
  { id: 'blog-card', name: 'Blog Post Card', description: 'Single blog post card with image & excerpt', icon: Layout, type: 'blog-card', category: 'blog', preview: '📄 Post Card' },
  { id: 'blog-featured', name: 'Featured Posts', description: 'Highlight featured blog posts', icon: Star, type: 'blog-featured', category: 'blog', preview: '⭐ Featured Posts' },
  { id: 'blog-recent', name: 'Recent Posts', description: 'Show most recent blog posts', icon: Clock, type: 'blog-recent', category: 'blog', preview: '🕐 Recent Posts' },
  { id: 'blog-categories', name: 'Category Filter', description: 'Filter posts by category', icon: Tag, type: 'blog-categories', category: 'blog', preview: '🏷️ Categories' },
  { id: 'blog-search', name: 'Blog Search', description: 'Search through blog posts', icon: Search, type: 'blog-search', category: 'blog', preview: '🔍 Search' },
  { id: 'blog-author', name: 'Author Card', description: 'Display author info with avatar', icon: User, type: 'blog-author', category: 'blog', preview: '👤 Author' },
  { id: 'blog-tags', name: 'Tags Cloud', description: 'Display all tags as clickable cloud', icon: Hash, type: 'blog-tags', category: 'blog', preview: '#️⃣ Tags' },
  
  // Collection Components
  { id: 'collection-grid', name: 'Collection Grid', description: 'Display collection items in a grid', icon: Grid, type: 'collection-grid', category: 'collection', preview: '📦 Collection Grid' },
  { id: 'collection-list', name: 'Collection List', description: 'Display collection items as a list', icon: List, type: 'collection-list', category: 'collection', preview: '📋 Collection List' },
  { id: 'collection-carousel', name: 'Collection Carousel', description: 'Scrollable carousel of items', icon: Repeat, type: 'collection-carousel', category: 'collection', preview: '🎠 Carousel' },
  { id: 'collection-table', name: 'Data Table', description: 'Display collection data in a table', icon: Table, type: 'collection-table', category: 'collection', preview: '📊 Table' },
  
  // Dynamic Content
  { id: 'dynamic-text', name: 'Dynamic Text', description: 'Text that changes based on data', icon: Type, type: 'dynamic-text', category: 'dynamic', preview: '📝 Dynamic Text' },
  { id: 'dynamic-image', name: 'Dynamic Image', description: 'Image from CMS data', icon: Image, type: 'dynamic-image', category: 'dynamic', preview: '🖼️ Dynamic Image' },
  { id: 'dynamic-date', name: 'Dynamic Date', description: 'Formatted date from data', icon: Calendar, type: 'dynamic-date', category: 'dynamic', preview: '📅 Date' },
  { id: 'dynamic-rich-text', name: 'Rich Text Block', description: 'Render rich text/markdown content', icon: FileText, type: 'dynamic-rich-text', category: 'dynamic', preview: '📖 Rich Text' },
  
  // Display Components
  { id: 'pagination', name: 'Pagination', description: 'Navigate between pages of content', icon: ChevronRight, type: 'pagination', category: 'display', preview: '◀️ 1 2 3 ▶️' },
  { id: 'load-more', name: 'Load More Button', description: 'Load additional items on click', icon: Plus, type: 'load-more', category: 'display', preview: '➕ Load More' },
  { id: 'empty-state', name: 'Empty State', description: 'Display when no content available', icon: FolderOpen, type: 'empty-state', category: 'display', preview: '📭 No items' },
  { id: 'loading-skeleton', name: 'Loading Skeleton', description: 'Placeholder while content loads', icon: Loader2, type: 'loading-skeleton', category: 'display', preview: '⏳ Loading...' },
];

/* ── Draggable CMS Component ── */
const DraggableCMSComponent = ({ component }: { component: CMSComponent }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `cms-${component.id}`,
    data: {
      type: component.type,
      label: component.name,
      fromLibrary: true,
      isCMS: true,
    },
  });

  const Icon = component.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:bg-muted/30'
      }`}
      style={{ background: 'hsl(var(--builder-component-bg))' }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
        <Icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold truncate">{component.name}</div>
        <p className="text-[9px] opacity-50 truncate">{component.description}</p>
      </div>
      <GripVertical className="w-3.5 h-3.5 opacity-30 shrink-0" />
    </div>
  );
};

/* ── Quick Setup Guide ── */
const QuickSetupGuide = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="mx-3 mt-3 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(280 70% 55% / 0.08))', border: '1px solid hsl(var(--primary) / 0.15)' }}>
    <div className="flex items-start gap-2">
      <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
      <div className="flex-1">
        <h3 className="text-[11px] font-semibold mb-1">Getting Started with CMS</h3>
        <ol className="text-[10px] opacity-60 space-y-1 list-decimal list-inside">
          <li>Create blog posts or collections in the tabs above</li>
          <li>Drag CMS components to your canvas from below</li>
          <li>Connect components to your content sources</li>
          <li>Publish and your content updates automatically!</li>
        </ol>
        <button onClick={onDismiss} className="text-[10px] font-medium mt-2 hover:underline" style={{ color: 'hsl(var(--primary))' }}>
          Got it, hide this
        </button>
      </div>
    </div>
  </div>
);

interface CMSPanelProps {
  projectId?: string | null;
  onClose?: () => void;
}

const CMSPanel = ({ projectId, onClose }: CMSPanelProps) => {
  const [activeTab, setActiveTab] = useState<'components' | 'posts' | 'collections' | 'settings'>('components');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [componentFilter, setComponentFilter] = useState<'all' | 'blog' | 'collection' | 'dynamic' | 'display'>('all');
  const [newPost, setNewPost] = useState({ title: '', category: 'Tutorials', status: 'draft' });

  const { data: posts = [], isLoading } = useBlogPosts(projectId ?? null);
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const updatePost = useUpdateBlogPost();

  const filteredPosts = posts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const filteredComponents = cmsComponents.filter(c => {
    if (componentFilter !== 'all' && c.category !== componentFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
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
    { id: 'components' as const, label: 'Components', icon: Component },
    { id: 'posts' as const, label: 'Posts', icon: FileText, count: posts.length },
    { id: 'collections' as const, label: 'Collections', icon: Database },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const componentCategories = [
    { id: 'all' as const, label: 'All', count: cmsComponents.length },
    { id: 'blog' as const, label: 'Blog', count: cmsComponents.filter(c => c.category === 'blog').length },
    { id: 'collection' as const, label: 'Collection', count: cmsComponents.filter(c => c.category === 'collection').length },
    { id: 'dynamic' as const, label: 'Dynamic', count: cmsComponents.filter(c => c.category === 'dynamic').length },
    { id: 'display' as const, label: 'Display', count: cmsComponents.filter(c => c.category === 'display').length },
  ];

  return (
    <div className="builder-flyout overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          <h2 className="text-sm font-semibold">Content Manager</h2>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
            CMS
          </span>
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

      {/* Quick Setup Guide */}
      {showGuide && activeTab === 'components' && (
        <QuickSetupGuide onDismiss={() => setShowGuide(false)} />
      )}

      {/* Components Tab - Draggable CMS Components */}
      {activeTab === 'components' && (
        <div>
          {/* Component category filter */}
          <div className="p-3 border-b" style={{ borderColor: 'hsl(var(--builder-panel-border))' }}>
            <div className="flex flex-wrap gap-1">
              {componentCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setComponentFilter(cat.id)}
                  className={`px-2 py-1 rounded-full text-[9px] font-medium transition-colors ${
                    componentFilter === cat.id ? '' : 'opacity-50 hover:opacity-80'
                  }`}
                  style={componentFilter === cat.id
                    ? { background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }
                    : { background: 'hsl(var(--muted) / 0.5)' }
                  }
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Drag instruction */}
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-1.5 text-[10px] opacity-50">
              <Move className="w-3 h-3" />
              <span>Drag components to your canvas</span>
            </div>
          </div>

          {/* Component list */}
          <div className="p-2 space-y-1">
            {filteredComponents.map(component => (
              <DraggableCMSComponent key={component.id} component={component} />
            ))}
          </div>

          {/* No project notice */}
          {!projectId && (
            <div className="mx-3 mb-3 p-3 rounded-lg text-center" style={{ background: 'hsl(var(--warning, 45 93% 47%) / 0.1)', border: '1px solid hsl(var(--warning, 45 93% 47%) / 0.2)' }}>
              <p className="text-[10px] font-medium" style={{ color: 'hsl(var(--warning, 45 93% 47%))' }}>
                Save your project to enable content management
              </p>
            </div>
          )}
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div>
          {!projectId ? (
            <div className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-xs opacity-50">Save your project first to create blog posts.</p>
            </div>
          ) : (
            <>
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
                  {filteredPosts.map(post => (
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
                  {filteredPosts.length === 0 && !isLoading && (
                    <div className="p-6 text-center text-xs opacity-40">No posts found</div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <div className="p-3">
          {!projectId ? (
            <div className="text-center py-6">
              <Database className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-xs opacity-50">Save your project first to create collections.</p>
            </div>
          ) : (
            <>
              {/* Collection templates */}
              <div className="mb-4">
                <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider mb-2">Quick Start Templates</div>
                <div className="space-y-1.5">
                  {[
                    { name: 'Team Members', icon: User, fields: 'Name, Role, Photo, Bio' },
                    { name: 'Testimonials', icon: Star, fields: 'Quote, Author, Company, Photo' },
                    { name: 'Portfolio Projects', icon: Layout, fields: 'Title, Description, Images, Link' },
                    { name: 'FAQ Items', icon: HelpCircle, fields: 'Question, Answer, Category' },
                    { name: 'Services', icon: Zap, fields: 'Name, Description, Price, Icon' },
                    { name: 'Gallery', icon: Image, fields: 'Image, Caption, Category' },
                  ].map(template => (
                    <button key={template.name} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-colors hover:bg-muted/30" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
                        <template.icon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold">{template.name}</div>
                        <p className="text-[9px] opacity-50 truncate">{template.fields}</p>
                      </div>
                      <Plus className="w-3.5 h-3.5 opacity-30 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom collection */}
              <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-medium border-2 border-dashed transition-colors hover:border-primary hover:text-primary" style={{ borderColor: 'hsl(var(--builder-panel-border))', color: 'hsl(var(--muted-foreground))' }}>
                <Plus className="w-3 h-3" /> Create Custom Collection
              </button>

              {/* Existing collections placeholder */}
              <div className="mt-4">
                <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider mb-2">Your Collections</div>
                <div className="p-4 rounded-lg text-center opacity-40" style={{ background: 'hsl(var(--builder-component-bg))' }}>
                  <FolderOpen className="w-6 h-6 mx-auto mb-1 opacity-40" />
                  <p className="text-[10px]">No collections yet</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="p-3 space-y-3">
          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <h3 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <FileJson className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              API Access
            </h3>
            <p className="text-[10px] opacity-50 mb-2">Access your content via REST API</p>
            <div className="flex gap-1.5">
              <input readOnly value={projectId ? `https://api.example.com/cms/${projectId.slice(0, 8)}...` : 'Save project first'} className="property-input text-[9px] font-mono flex-1" />
              <button className="px-2 py-1 rounded text-[10px]" style={{ background: 'hsl(var(--muted))' }}>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <h3 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Embed Code
            </h3>
            <p className="text-[10px] opacity-50 mb-2">Add CMS to any website</p>
            <button className="w-full py-1.5 rounded text-[10px] font-medium" style={{ background: 'hsl(var(--muted))' }}>
              Generate Embed Code
            </button>
          </div>

          <div className="p-3 rounded-lg" style={{ background: 'hsl(var(--builder-component-bg))' }}>
            <h3 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" style={{ color: 'hsl(var(--primary))' }} />
              Content Sync
            </h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-[10px]">
                <span>Auto-publish on save</span>
                <input type="checkbox" className="w-3.5 h-3.5 rounded" />
              </label>
              <label className="flex items-center justify-between text-[10px]">
                <span>Enable drafts</span>
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded" />
              </label>
              <label className="flex items-center justify-between text-[10px]">
                <span>Enable scheduling</span>
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded" />
              </label>
            </div>
          </div>

          <a href="https://docs.example.com/cms" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 rounded text-[10px] font-medium transition-colors hover:bg-muted"
            style={{ color: 'hsl(var(--primary))' }}>
            <ExternalLink className="w-3 h-3" /> View Documentation
          </a>
        </div>
      )}
    </div>
  );
};

export default CMSPanel;
