import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects' as any)
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Project[];
    },
    enabled: !!user,
  });
};

export const useCreateProject = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ name, description, templateSchema }: { name: string; description?: string; templateSchema?: any }) => {
      if (!user) throw new Error('Not authenticated');

      const { data: project, error } = await supabase
        .from('projects' as any)
        .insert({ name, description, user_id: user.id } as any)
        .select()
        .single();
      if (error) throw error;
      const p = project as unknown as Project;

      const schema = templateSchema || { id: 'page-1', name: 'Home', sections: [] };
      const { error: pageError } = await supabase
        .from('pages' as any)
        .insert({ project_id: p.id, name: 'Home', slug: 'index', schema } as any);
      if (pageError) throw pageError;

      const { error: settingsError } = await supabase
        .from('project_settings' as any)
        .insert({ project_id: p.id, site_title: name } as any);
      if (settingsError) throw settingsError;

      return p;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase.from('projects' as any).delete().eq('id', projectId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};
