import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface InstalledApp {
  id: string;
  project_id: string;
  user_id: string;
  app_key: string;
  installed_at: string;
}

export const useInstalledApps = (projectId: string | null) => {
  return useQuery({
    queryKey: ['installed-apps', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('installed_apps' as any)
        .select('*')
        .eq('project_id', projectId!);
      if (error) throw error;
      return data as unknown as InstalledApp[];
    },
    enabled: !!projectId,
  });
};

export const useInstallApp = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, appKey }: { projectId: string; appKey: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('installed_apps' as any)
        .insert({ project_id: projectId, user_id: user.id, app_key: appKey } as any);
      if (error) throw error;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['installed-apps', v.projectId] }),
  });
};

export const useUninstallApp = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, appKey }: { projectId: string; appKey: string }) => {
      const { error } = await supabase
        .from('installed_apps' as any)
        .delete()
        .eq('project_id', projectId)
        .eq('app_key', appKey);
      if (error) throw error;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['installed-apps', v.projectId] }),
  });
};
