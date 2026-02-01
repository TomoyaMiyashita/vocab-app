"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Progress, WordStatus } from "@/lib/types";
import { isToday } from "@/lib/is-today";

const STORAGE_KEY = "vocab-app-progress";

type ProgressState = {
  /** 学習履歴（複数回の記録を保持） */
  items: Progress[];
  /** 理解度を記録して次の単語へ */
  recordProgress: (wordId: string, level: 0 | 1 | 2 | 3) => void;
  /** 今日レビューした件数 */
  getTodayCount: () => number;
  /** 単語IDごとの最新の記録（習得レベル表示用） */
  getLatestByWordId: (wordId: string) => Progress | undefined;
  /** 回答状況フラグ: mastered=2連続正解, unfixed=1連続正解, learning=直近不正解 */
  getWordStatus: (wordId: string) => WordStatus;
  /** エクスポート用：全記録を返す */
  getExportData: () => { exportedAt: string; progress: Progress[] };
  /** インポート：JSON をマージ（既存の後ろに追加） */
  importProgress: (progress: Progress[]) => void;
  /** 全削除（検証用） */
  clearAll: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      items: [],

      async recordProgress(wordId, level) {
        const entry = {
          wordId,
          level,
          lastReviewedAt: new Date().toISOString(),
        };
        set((state) => ({ items: [...state.items, entry] }));
        // try sync to server if user is authenticated
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          if (token) {
            await fetch('/api/progress', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ wordId, level }),
            });
          }
        } catch (e) {
          // ignore sync errors
        }
      },

      getTodayCount() {
        return get().items.filter((p) => isToday(p.lastReviewedAt)).length;
      },

      getLatestByWordId(wordId) {
        const list = get().items
          .filter((p) => p.wordId === wordId)
          .sort(
            (a, b) =>
              new Date(b.lastReviewedAt).getTime() -
              new Date(a.lastReviewedAt).getTime()
          );
        return list[0];
      },

      getWordStatus(wordId) {
        const list = get().items
          .filter((p) => p.wordId === wordId)
          .sort(
            (a, b) =>
              new Date(b.lastReviewedAt).getTime() -
              new Date(a.lastReviewedAt).getTime()
          );
        if (list.length === 0) return null;
        const last = list[0];
        if (last.level === 0 || last.level === 1) return "learning";
        if (last.level === 2 || last.level === 3) {
          const prev = list[1];
          if (prev && (prev.level === 2 || prev.level === 3)) return "mastered";
          return "unfixed";
        }
        return null;
      },

      getExportData() {
        return {
          exportedAt: new Date().toISOString(),
          progress: get().items,
        };
      },

      importProgress(progress) {
        if (!Array.isArray(progress) || progress.length === 0) {
          return;
        }
        set((state) => ({
          items: [...state.items, ...progress],
        }));
      },

      clearAll() {
        set({ items: [] });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      skipHydration: true,
    }
  )
);
