import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectSettings {
  id: string;
  project_id: string;
  site_title: string | null;
  meta_description: string | null;
  favicon_url: string | null;
  og_image_url: string | null;
  custom_domain: string | null;
  analytics_scripts: string | null;
  custom_head_code: string | null;
  created_at: string;
  updated_at: string;
}

export const useProjectSettings = (projectId: string | null) => {
  return useQuery({
    queryKey: ['project-settings', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_settings' as any)
        .select('*')
        .eq('project_id', projectId!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as ProjectSettings | null;
    },
    enabled: !!projectId,
  });
};

export const useUpdateProjectSettings = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, updates }: { projectId: string; updates: Partial<ProjectSettings> }) => {
      const { error } = await supabase
        .from('project_settings' as any)
        .update(updates as any)
        .eq('project_id', projectId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['project-settings', vars.projectId] }),
  });
};
