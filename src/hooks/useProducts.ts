import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Product {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  price: number;
  compare_price: number | null;
  status: string;
  inventory: number;
  category: string;
  image: string;
  variants: number;
  sales: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  project_id: string;
  user_id: string;
  customer: string;
  total: number;
  status: string;
  items: number;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  project_id: string;
  user_id: string;
  code: string;
  type: string;
  value: number;
  usage_count: number;
  active: boolean;
  created_at: string;
}

export const useProducts = (projectId: string | null) => {
  return useQuery({
    queryKey: ['products', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Product[];
    },
    enabled: !!projectId,
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, name, price, category, image }: { projectId: string; name: string; price: number; category?: string; image?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('products' as any)
        .insert({ project_id: projectId, user_id: user.id, name, price, category: category || 'General', image: image || '📦' } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Product;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['products', v.projectId] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from('products' as any).delete().eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useOrders = (projectId: string | null) => {
  return useQuery({
    queryKey: ['orders', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Order[];
    },
    enabled: !!projectId,
  });
};

export const useCoupons = (projectId: string | null) => {
  return useQuery({
    queryKey: ['coupons', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coupons' as any)
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as Coupon[];
    },
    enabled: !!projectId,
  });
};

export const useCreateCoupon = () => {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, code, type, value }: { projectId: string; code: string; type: string; value: number }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('coupons' as any)
        .insert({ project_id: projectId, user_id: user.id, code, type, value } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as Coupon;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['coupons', v.projectId] }),
  });
};
