import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

import type { Tables } from '@/integrations/supabase/types';

export type Asset = Tables<'assets'>;

export const useAssets = (projectId: string | null) => {
  return useQuery({
    queryKey: ['assets', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
};

export const useUploadAsset = () => {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ projectId, file }: { projectId: string; file: File }) => {
      if (!user) throw new Error('Not authenticated');

      const filePath = `${user.id}/${projectId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('project-assets')
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-assets')
        .getPublicUrl(filePath);

      const { error } = await supabase.from('assets').insert({
        project_id: projectId,
        name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
      });
      if (error) throw error;

      return publicUrl;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assets'] }),
  });
};

export const useDeleteAsset = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ assetId, filePath }: { assetId: string; filePath: string }) => {
      await supabase.storage.from('project-assets').remove([filePath]);
      const { error } = await supabase.from('assets' as any).delete().eq('id', assetId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['assets'] }),
  });
};
