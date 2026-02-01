"use client";

import { create } from "zustand";
import type { Word } from "@/lib/types";

type CustomWordsState = {
  items: Word[];
  addWord: (word: Omit<Word, "id">) => Promise<Word | null>;
  removeWord: (id: string) => Promise<boolean>;
  init: () => Promise<void>;
};

function generateCustomId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useCustomWordsStore = create<CustomWordsState>()((set, get) => ({
  items: [],

  async init() {
    try {
      const res = await fetch('/api/words');
      const data = await res.json();
      // keep only custom words (isStatic=false)
      const customs = data.filter((w: any) => !w.isStatic);
      set({ items: customs });
    } catch (err) {
      // ignore
    }
  },

  async addWord(word) {
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word),
      });
      const created = await res.json();
      set((state) => ({ items: [...state.items, created] }));
      return created;
    } catch (err) {
      return null;
    }
  },

  async removeWord(id) {
    try {
      await fetch(`/api/words?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      set((state) => ({ items: state.items.filter((w) => w.id !== id) }));
      return true;
    } catch (err) {
      return false;
    }
  },
}));
