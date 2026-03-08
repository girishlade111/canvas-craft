import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/useProjects';
import { Code2, Plus, Trash2, LogOut, Loader2, FolderOpen, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
    <div className="min-h-screen" style={{ background: 'hsl(220 16% 8%)' }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: 'hsl(220 16% 18%)', background: 'hsl(220 16% 10%)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg" style={{ color: 'hsl(220 10% 90%)' }}>DevBuilder</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'hsl(220 10% 50%)' }}>{user?.email}</span>
          <button onClick={() => signOut()} className="p-2 rounded hover:bg-white/10 transition-colors" style={{ color: 'hsl(220 10% 60%)' }}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'hsl(220 10% 90%)' }}>Your Projects</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm mb-1">Project Name</label>
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-background"
                    placeholder="My Website"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Description (optional)</label>
                  <input
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-background"
                    placeholder="A brief description"
                  />
                </div>
                <button
                  onClick={handleCreate}
                  disabled={createProject.isPending || !newName.trim()}
                  className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {createProject.isPending ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !projects?.length ? (
          <div className="text-center py-20" style={{ color: 'hsl(220 10% 50%)' }}>
            <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">No projects yet</p>
            <p className="text-sm">Create your first project to get started building.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div
                key={project.id}
                onClick={() => navigate(`/builder/${project.id}`)}
                className="group rounded-xl border p-5 cursor-pointer transition-all hover:border-primary/50"
                style={{ background: 'hsl(220 16% 12%)', borderColor: 'hsl(220 16% 20%)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold truncate" style={{ color: 'hsl(220 10% 90%)' }}>{project.name}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}/settings`); }}
                      className="p-1.5 rounded hover:bg-white/10"
                      style={{ color: 'hsl(220 10% 60%)' }}
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleDelete(e, project.id)}
                      className="p-1.5 rounded hover:bg-destructive/20 text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {project.description && (
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: 'hsl(220 10% 50%)' }}>{project.description}</p>
                )}
                <p className="text-xs" style={{ color: 'hsl(220 10% 40%)' }}>
                  Updated {new Date(project.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
