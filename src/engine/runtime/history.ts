/**
 * Layer 2 — Builder Runtime Engine: History Manager
 * Handles undo/redo with configurable max entries.
 */

import type { PageSchema } from '@/types/builder';

export interface HistoryEntry {
  schema: PageSchema;
  timestamp: number;
  label?: string;
}

export interface HistoryState {
  entries: HistoryEntry[];
  currentIndex: number;
}

const MAX_HISTORY = 50;

export const createHistoryState = (initialSchema: PageSchema): HistoryState => ({
  entries: [{ schema: JSON.parse(JSON.stringify(initialSchema)), timestamp: Date.now() }],
  currentIndex: 0,
});

export const pushToHistory = (
  state: HistoryState,
  schema: PageSchema,
  label?: string
): HistoryState => {
  // Truncate future entries
  const entries = state.entries.slice(0, state.currentIndex + 1);
  entries.push({
    schema: JSON.parse(JSON.stringify(schema)),
    timestamp: Date.now(),
    label,
  });

  // Trim if exceeds max
  if (entries.length > MAX_HISTORY) entries.shift();

  return {
    entries,
    currentIndex: Math.min(entries.length - 1, MAX_HISTORY - 1),
  };
};

export const undo = (state: HistoryState): { schema: PageSchema; newState: HistoryState } | null => {
  if (state.currentIndex <= 0) return null;
  const newIndex = state.currentIndex - 1;
  return {
    schema: JSON.parse(JSON.stringify(state.entries[newIndex].schema)),
    newState: { ...state, currentIndex: newIndex },
  };
};

export const redo = (state: HistoryState): { schema: PageSchema; newState: HistoryState } | null => {
  if (state.currentIndex >= state.entries.length - 1) return null;
  const newIndex = state.currentIndex + 1;
  return {
    schema: JSON.parse(JSON.stringify(state.entries[newIndex].schema)),
    newState: { ...state, currentIndex: newIndex },
  };
};

export const canUndo = (state: HistoryState): boolean => state.currentIndex > 0;
export const canRedo = (state: HistoryState): boolean => state.currentIndex < state.entries.length - 1;
