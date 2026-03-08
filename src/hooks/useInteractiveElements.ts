import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface InteractiveElementRow {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  thumbnail: string;
  animation_type: string;
  element_schema: { components: any[] };
  preview_css: string | null;
  compatible_sections: string[];
  tags: string[];
  is_premium: boolean;
  installs: number;
  created_at: string;
}

export const useInteractiveElements = (category?: string) => {
  return useQuery({
    queryKey: ['interactive-elements', category],
    queryFn: async () => {
      let query = supabase
        .from('interactive_elements' as any)
        .select('*')
        .eq('is_public', true)
        .order('installs', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data as unknown as InteractiveElementRow[]) || [];
    },
  });
};
