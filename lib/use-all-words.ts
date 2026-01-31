"use client";

import { useMemo } from "react";
import wordsData from "@/data/words.json";
import type { Word } from "@/lib/types";
import { useCustomWordsStore } from "@/store/custom-words-store";

const staticWords = wordsData as Word[];

/** 静的単語 + カスタム単語をマージした一覧（静的を先、カスタムを後） */
export function useAllWords(): Word[] {
  const customItems = useCustomWordsStore((s) => s.items);
  return useMemo(
    () => [...staticWords, ...customItems],
    [customItems]
  );
}
