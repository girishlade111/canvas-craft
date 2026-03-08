import { useEffect, useRef, useCallback } from 'react';
import { useSavePage } from './usePages';
import { useBuilderStore } from '@/store/builderStore';
import type { PageSchema } from '@/types/builder';
import { toast } from 'sonner';

const AUTOSAVE_DELAY = 3000; // 3 seconds debounce

export const useAutosave = (pageId: string | null) => {
  const savePage = useSavePage();
  const schema = useBuilderStore((s) => s.schema);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');
  const isSavingRef = useRef(false);

  const save = useCallback(async (currentSchema: PageSchema, currentPageId: string) => {
    if (isSavingRef.current) return;
    const serialized = JSON.stringify(currentSchema);
    if (serialized === lastSavedRef.current) return;

    isSavingRef.current = true;
    try {
      await savePage.mutateAsync({ pageId: currentPageId, schema: currentSchema });
      lastSavedRef.current = serialized;
    } catch (err: any) {
      console.error('Autosave failed:', err);
      toast.error('Autosave failed');
    } finally {
      isSavingRef.current = false;
    }
  }, [savePage]);

  // Debounced autosave on schema changes
  useEffect(() => {
    if (!pageId) return;

    // Skip initial load
    const serialized = JSON.stringify(schema);
    if (!lastSavedRef.current) {
      lastSavedRef.current = serialized;
      return;
    }
    if (serialized === lastSavedRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      save(schema, pageId);
    }, AUTOSAVE_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [schema, pageId, save]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pageId && JSON.stringify(schema) !== lastSavedRef.current) {
        // Use sendBeacon for reliability
        const serialized = JSON.stringify(schema);
        lastSavedRef.current = serialized;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [schema, pageId]);

  // Reset when page changes
  useEffect(() => {
    lastSavedRef.current = '';
  }, [pageId]);

  return { isSaving: savePage.isPending };
};
