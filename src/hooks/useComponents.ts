import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ReusableComponent {
  id: string;
  user_id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  category: string;
  schema: any;
  is_global: boolean;
  created_at: string;
  updated_at: string;
}

export const useComponents = (projectId: string | null) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['components', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('components' as any)
        .select('*')
        .or(`project_id.eq.${projectId},is_global.eq.true`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as ReusableComponent[];
    },
    enabled: !!user && !!projectId,
  });
};

export const useSaveComponent = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      projectId,
      name,
      description,
      category,
      schema,
      isGlobal,
    }: {
      projectId: string;
      name: string;
      description?: string;
      category?: string;
      schema: any;
      isGlobal?: boolean;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('components' as any)
        .insert({
          user_id: user.id,
          project_id: projectId,
          name,
          description,
          category: category || 'custom',
          schema,
          is_global: isGlobal || false,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ReusableComponent;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['components'] }),
  });
};

export const useDeleteComponent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (componentId: string) => {
      const { error } = await supabase
        .from('components' as any)
        .delete()
        .eq('id', componentId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['components'] }),
  });
};
