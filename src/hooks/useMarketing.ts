import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface EmailCampaign {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  status: string;
  recipients: number;
  open_rate: number | null;
  click_rate: number | null;
  sent_date: string | null;
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialPost {
  id: string;
  project_id: string;
  user_id: string;
  platform: string;
  content: string;
  scheduled_date: string | null;
  status: string;
  created_at: string;
}

export const useEmailCampaigns = (projectId: string | null) => {
  return useQuery({
    queryKey: ['email-campaigns', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_campaigns' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as EmailCampaign[];
    },
    enabled: !!projectId,
  });
};

export const useCreateEmailCampaign = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, name }: { projectId: string; name: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('email_campaigns' as any)
        .insert({ project_id: projectId, user_id: user.id, name } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as EmailCampaign;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['email-campaigns', v.projectId] }),
  });
};

export const useSocialPosts = (projectId: string | null) => {
  return useQuery({
    queryKey: ['social-posts', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_posts' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as SocialPost[];
    },
    enabled: !!projectId,
  });
};

export const useCreateSocialPost = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, platform, content, scheduledDate }: { projectId: string; platform: string; content: string; scheduledDate?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('social_posts' as any)
        .insert({ project_id: projectId, user_id: user.id, platform, content, scheduled_date: scheduledDate || null } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as SocialPost;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['social-posts', v.projectId] }),
  });
};
