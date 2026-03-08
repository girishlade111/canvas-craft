import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Project = Tables<'projects'>;

export const useProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data as Project[];
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
        .from('projects')
        .insert({ name, description, user_id: user.id } as TablesInsert<'projects'>)
        .select()
        .single();
      if (error) throw error;

      // Create default page
      const schema = templateSchema || { id: 'page-1', name: 'Home', sections: [] };
      const { error: pageError } = await supabase
        .from('pages')
        .insert({ project_id: project.id, name: 'Home', slug: 'index', schema });
      if (pageError) throw pageError;

      // Create default settings
      const { error: settingsError } = await supabase
        .from('project_settings')
        .insert({ project_id: project.id, site_title: name });
      if (settingsError) throw settingsError;

      return project;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};
