
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Item {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  location: string;
  contact_info: string;
  category: string;
  type: 'lost' | 'found';
  status: string;
  created_at: string;
  upvotes?: number;
  comments?: number;
  user_upvoted?: boolean;
}

export const useItems = (type?: 'lost' | 'found') => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('items')
        .select(`
          *,
          upvotes:upvotes(count),
          comments:comments(count)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
        return;
      }

      // Transform the data to match our Item interface
      const transformedItems: Item[] = data?.map(item => ({
        ...item,
        type: item.type as 'lost' | 'found', // Type assertion since we know it's valid
        upvotes: Array.isArray(item.upvotes) ? item.upvotes.length : 0,
        comments: Array.isArray(item.comments) ? item.comments.length : 0,
      })) || [];

      setItems(transformedItems);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  return { items, loading, error, refetch: fetchItems };
};
