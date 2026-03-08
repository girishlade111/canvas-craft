import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Service {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  bookings: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  type: string;
  created_at: string;
  updated_at: string;
}

export const useServices = (projectId: string | null) => {
  return useQuery({
    queryKey: ['services', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Service[];
    },
    enabled: !!projectId,
  });
};

export const useCreateService = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, name, duration, price, category }: { projectId: string; name: string; duration: string; price: number; category?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('services' as any)
        .insert({ project_id: projectId, user_id: user.id, name, duration, price, category: category || 'General' } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Service;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['services', v.projectId] }),
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase.from('services' as any).delete().eq('id', serviceId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });
};

export const useEvents = (projectId: string | null) => {
  return useQuery({
    queryKey: ['events', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('date', { ascending: true });
      if (error) throw error;
      return data as unknown as Event[];
    },
    enabled: !!projectId,
  });
};

export const useCreateEvent = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, name, date, time, location, capacity, price, type }: { projectId: string; name: string; date: string; time: string; location: string; capacity: number; price: number; type: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('events' as any)
        .insert({ project_id: projectId, user_id: user.id, name, date, time, location, capacity, price, type } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Event;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['events', v.projectId] }),
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase.from('events' as any).delete().eq('id', eventId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};
