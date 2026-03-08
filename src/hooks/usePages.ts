import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PageSchema } from '@/types/builder';

export interface Page {
  id: string;
  project_id: string;
  name: string;
  slug: string;
  schema: any;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PageVersion {
  id: string;
  page_id: string;
  version_number: number;
  schema: any;
  created_at: string;
}

export const usePages = (projectId: string | null) => {
  return useQuery({
    queryKey: ['pages', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('sort_order');
      if (error) throw error;
      return data as unknown as Page[];
    },
    enabled: !!projectId,
  });
};

export const useCreatePage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, name, slug }: { projectId: string; name: string; slug: string }) => {
      // Get max sort_order
      const { data: existing } = await supabase
        .from('pages' as any)
        .select('sort_order')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: false })
        .limit(1);
      const maxOrder = (existing as any)?.[0]?.sort_order ?? -1;

      const defaultSchema: PageSchema = {
        id: `page-${Date.now()}`,
        name,
        sections: [
          { id: `header-${Date.now()}`, type: 'header', label: 'Header', components: [], styles: {} },
          { id: `body-${Date.now()}`, type: 'body', label: 'Body', components: [], styles: { minHeight: '400px' } },
          { id: `footer-${Date.now()}`, type: 'footer', label: 'Footer', components: [], styles: {} },
        ],
      };

      const { data, error } = await supabase
        .from('pages' as any)
        .insert({ project_id: projectId, name, slug, schema: defaultSchema, sort_order: maxOrder + 1 } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Page;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pages'] }),
  });
};

export const useUpdatePage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, updates }: { pageId: string; updates: Partial<Pick<Page, 'name' | 'slug'>> }) => {
      const { error } = await supabase
        .from('pages' as any)
        .update(updates as any)
        .eq('id', pageId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pages'] }),
  });
};

export const useDeletePage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (pageId: string) => {
      const { error } = await supabase
        .from('pages' as any)
        .delete()
        .eq('id', pageId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pages'] }),
  });
};

export const useSavePage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, schema }: { pageId: string; schema: PageSchema }) => {
      const { count } = await supabase
        .from('page_versions' as any)
        .select('*', { count: 'exact', head: true })
        .eq('page_id', pageId);

      const versionNumber = (count || 0) + 1;

      await supabase.from('page_versions' as any).insert({
        page_id: pageId,
        version_number: versionNumber,
        schema: schema as any,
      } as any);

      const { error } = await supabase
        .from('pages' as any)
        .update({ schema: schema as any } as any)
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
        .from('page_versions' as any)
        .select('*')
        .eq('page_id', pageId!)
        .order('version_number', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as unknown as PageVersion[];
    },
    enabled: !!pageId,
  });
};

export const useRestoreVersion = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, schema }: { pageId: string; schema: any }) => {
      const { error } = await supabase
        .from('pages' as any)
        .update({ schema } as any)
        .eq('id', pageId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pages'] }),
  });
};
