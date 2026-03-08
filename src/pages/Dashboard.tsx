import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/useProjects';
import {
  Code2, Plus, Trash2, LogOut, Loader2, FolderOpen, Settings,
  ExternalLink, Search, LayoutGrid,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = projects?.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const project = await createProject.mutateAsync({ name: newName, description: newDesc });
    setDialogOpen(false);
    setNewName('');
    setNewDesc('');
    navigate(`/builder/${project.id}`);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this project? This cannot be undone.')) {
      await deleteProject.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--gradient-primary)' }}>
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">DevBuilder</span>
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
        {/* Title row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Your Projects</h1>
            <p className="text-sm text-muted-foreground">{projects?.length || 0} projects</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-60"
              />
            </div>
            <button onClick={() => navigate('/templates')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
              <LayoutGrid className="w-4 h-4" /> Templates
            </button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <Plus className="w-4 h-4" /> New Project
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">Project Name</label>
                    <input
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="My Website"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">Description <span className="text-muted-foreground">(optional)</span></label>
                    <input
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="A brief description"
                    />
                  </div>
                  <button
                    onClick={handleCreate}
                    disabled={createProject.isPending || !newName.trim()}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    {createProject.isPending ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !filtered?.length ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-muted/50">
              <FolderOpen className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <p className="text-lg font-medium mb-2">{search ? 'No matching projects' : 'No projects yet'}</p>
            <p className="text-sm text-muted-foreground mb-6">
              {search ? 'Try a different search term' : 'Create a project or start from a template'}
            </p>
            {!search && (
              <button onClick={() => navigate('/templates')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground"
                style={{ background: 'var(--gradient-primary)' }}>
                Browse Templates
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {filtered.map(project => (
              <div
                key={project.id}
                onClick={() => navigate(`/builder/${project.id}`)}
                className="group rounded-2xl border border-border bg-card p-0 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
              >
                {/* Preview area */}
                <div className="h-36 flex items-center justify-center bg-muted/30 group-hover:bg-muted/50 transition-colors relative">
                  <div className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {project.name[0]?.toUpperCase()}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white"
                      style={{ background: 'var(--gradient-primary)' }}>
                      <ExternalLink className="w-3 h-3" /> Open Editor
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{project.name}</h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}/settings`); }}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={e => handleDelete(e, project.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{project.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground/60">
                    Updated {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
