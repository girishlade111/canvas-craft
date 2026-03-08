import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Deployment {
  id: string;
  project_id: string;
  user_id: string;
  deployment_url: string | null;
  status: string;
  provider: string;
  build_log: string | null;
  version_number: number;
  created_at: string;
  updated_at: string;
}

export const useDeployments = (projectId: string | null) => {
  return useQuery({
    queryKey: ['deployments', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deployments' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Deployment[];
    },
    enabled: !!projectId,
  });
};

export const useCreateDeployment = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      projectId,
      versionNumber,
    }: {
      projectId: string;
      versionNumber?: number;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('deployments' as any)
        .insert({
          project_id: projectId,
          user_id: user.id,
          status: 'pending',
          version_number: versionNumber || 1,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Deployment;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['deployments'] }),
  });
};

export const useUpdateDeployment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      deploymentId,
      updates,
    }: {
      deploymentId: string;
      updates: Partial<Pick<Deployment, 'status' | 'deployment_url' | 'build_log'>>;
    }) => {
      const { error } = await supabase
        .from('deployments' as any)
        .update(updates as any)
        .eq('id', deploymentId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['deployments'] }),
  });
};
