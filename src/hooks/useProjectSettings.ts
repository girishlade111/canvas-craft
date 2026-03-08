import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesUpdate } from '@/integrations/supabase/types';

export type ProjectSettings = Tables<'project_settings'>;

export const useProjectSettings = (projectId: string | null) => {
  return useQuery({
    queryKey: ['project-settings', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_settings')
        .select('*')
        .eq('project_id', projectId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
};

export const useUpdateProjectSettings = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, updates }: { projectId: string; updates: Partial<TablesUpdate<'project_settings'>> }) => {
      const { error } = await supabase
        .from('project_settings')
        .update(updates)
        .eq('project_id', projectId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['project-settings', vars.projectId] }),
  });
};
