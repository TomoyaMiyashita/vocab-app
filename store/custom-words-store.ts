"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Word } from "@/lib/types";

const STORAGE_KEY = "vocab-app-custom-words";

type CustomWordsState = {
  items: Word[];
  addWord: (word: Omit<Word, "id">) => Word;
  removeWord: (id: string) => void;
};

function generateCustomId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useCustomWordsStore = create<CustomWordsState>()(
  persist(
    (set, get) => ({
      items: [],

      addWord(word) {
        const newWord: Word = {
          ...word,
          id: generateCustomId(),
        };
        set((state) => ({
          items: [...state.items, newWord],
        }));
        return newWord;
      },

      removeWord(id) {
        set((state) => ({
          items: state.items.filter((w) => w.id !== id),
        }));
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
