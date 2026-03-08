import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import type { PageSchema } from '@/types/builder';
import type { Json } from '@/integrations/supabase/types';

export type Page = Tables<'pages'>;

export const usePages = (projectId: string | null) => {
  return useQuery({
    queryKey: ['pages', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('project_id', projectId!)
        .order('sort_order');
      if (error) throw error;
      return data as Page[];
    },
    enabled: !!projectId,
  });
};

export const useSavePage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, schema }: { pageId: string; schema: PageSchema }) => {
      // Get current version count
      const { count } = await supabase
        .from('page_versions')
        .select('*', { count: 'exact', head: true })
        .eq('page_id', pageId);

      const versionNumber = (count || 0) + 1;

      // Save version snapshot
      await supabase.from('page_versions').insert({
        page_id: pageId,
        version_number: versionNumber,
        schema: schema as unknown as Json,
      });

      // Update page schema
      const { error } = await supabase
        .from('pages')
        .update({ schema: schema as unknown as Json })
        .eq('id', pageId);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['pages'] });
      qc.invalidateQueries({ queryKey: ['page-versions', vars.pageId] });
    },
  });
};

export const usePageVersions = (pageId: string | null) => {
  return useQuery({
    queryKey: ['page-versions', pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_versions')
        .select('*')
        .eq('page_id', pageId!)
        .order('version_number', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!pageId,
  });
};

export const useRestoreVersion = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, schema }: { pageId: string; schema: any }) => {
      const { error } = await supabase
        .from('pages')
        .update({ schema })
        .eq('id', pageId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pages'] }),
  });
};
