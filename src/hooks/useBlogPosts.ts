import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface BlogPost {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  tags: string[];
  author: string;
  excerpt: string;
  content: string;
  publish_date: string | null;
  read_time: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = (projectId: string | null) => {
  return useQuery({
    queryKey: ['blog-posts', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as BlogPost[];
    },
    enabled: !!projectId,
  });
};

export const useCreateBlogPost = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, title, category, status }: { projectId: string; title: string; category?: string; status?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const { data, error } = await supabase
        .from('blog_posts' as any)
        .insert({
          project_id: projectId,
          user_id: user.id,
          title,
          slug,
          category: category || 'General',
          status: status || 'draft',
          publish_date: status === 'published' ? new Date().toISOString() : null,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as BlogPost;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['blog-posts', v.projectId] }),
  });
};

export const useUpdateBlogPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, updates }: { postId: string; updates: Partial<BlogPost> }) => {
      const { error } = await supabase
        .from('blog_posts' as any)
        .update(updates as any)
        .eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog-posts'] }),
  });
};

export const useDeleteBlogPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase.from('blog_posts' as any).delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog-posts'] }),
  });
};
