import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Template, PageSchema } from '@/types/builder';

// ─── DB row shape ──────────────────────────────────────────
export interface TemplateRow {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  schema: PageSchema;
  is_public: boolean;
  is_premium: boolean;
  author_id: string | null;
  installs: number;
  tags: string[];
  preview_image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Convert DB row → app Template type
const toTemplate = (row: TemplateRow): Template & { is_premium: boolean; is_public: boolean; is_featured: boolean; is_new: boolean; installs: number; tags: string[]; preview_image_url: string | null } => ({
  id: row.id,
  name: row.name,
  description: row.description,
  category: row.category,
  thumbnail: row.thumbnail,
  schema: row.schema as PageSchema,
  is_premium: row.is_premium,
  is_public: row.is_public,
  is_featured: row.installs >= 200,
  is_new: (Date.now() - new Date(row.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000,
  installs: row.installs,
  tags: row.tags,
  preview_image_url: row.preview_image_url,
});

// ─── Fetch all public templates ────────────────────────────
export const useTemplates = (category?: string) => {
  return useQuery({
    queryKey: ['templates', category],
    queryFn: async () => {
      let query = supabase
        .from('templates' as any)
        .select('*')
        .eq('is_public', true)
        .order('installs', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data as unknown as TemplateRow[]).map(toTemplate);
    },
  });
};

// ─── Fetch user's own templates (private + public) ─────────
export const useMyTemplates = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-templates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('templates' as any)
        .select('*')
        .eq('author_id', user.id)
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as TemplateRow[]).map(toTemplate);
    },
    enabled: !!user,
  });
};

// ─── Fetch single template ────────────────────────────────
export const useTemplate = (id: string | null) => {
  return useQuery({
    queryKey: ['template', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates' as any)
        .select('*')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return toTemplate(data as unknown as TemplateRow);
    },
    enabled: !!id,
  });
};

// ─── Create template ──────────────────────────────────────
export const useCreateTemplate = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      description: string;
      category: string;
      thumbnail: string;
      schema: PageSchema;
      is_public?: boolean;
      is_premium?: boolean;
      tags?: string[];
      preview_image_url?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      const { error, data } = await supabase
        .from('templates' as any)
        .insert({
          ...input,
          author_id: user.id,
          schema: input.schema as any,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as TemplateRow;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
      qc.invalidateQueries({ queryKey: ['my-templates'] });
    },
  });
};

// ─── Update template ──────────────────────────────────────
export const useUpdateTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      name?: string;
      description?: string;
      category?: string;
      thumbnail?: string;
      schema?: PageSchema;
      is_public?: boolean;
      is_premium?: boolean;
      tags?: string[];
      preview_image_url?: string;
    }) => {
      const payload: Record<string, any> = { ...updates };
      if (updates.schema) payload.schema = updates.schema as any;
      const { error } = await supabase
        .from('templates' as any)
        .update(payload as any)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
      qc.invalidateQueries({ queryKey: ['my-templates'] });
    },
  });
};

// ─── Delete template ──────────────────────────────────────
export const useDeleteTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('templates' as any)
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
      qc.invalidateQueries({ queryKey: ['my-templates'] });
    },
  });
};

// ─── Increment install count ──────────────────────────────
export const useIncrementTemplateInstalls = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Read current installs then increment
      const { data: current } = await supabase
        .from('templates' as any)
        .select('installs')
        .eq('id', id)
        .maybeSingle();
      const installs = ((current as any)?.installs ?? 0) + 1;
      const { error } = await supabase
        .from('templates' as any)
        .update({ installs } as any)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};
