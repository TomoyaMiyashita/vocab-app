"use client";

import { useEffect, useMemo, useState } from "react";
import type { Word } from "@/lib/types";
import { useCustomWordsStore } from "@/store/custom-words-store";

/** サーバから全単語を取得するフック（静的 + カスタムを DB 側で管理） */
export function useAllWords(): Word[] {
  const [words, setWords] = useState<Word[]>([]);
  const customItems = useCustomWordsStore((s) => s.items);

  useEffect(() => {
    let mounted = true;
    fetch('/api/words')
      .then((r) => r.json())
      .then((data: Word[]) => {
        if (mounted) setWords(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return useMemo(() => [...words, ...customItems.filter(c => !words.find(w => w.id === c.id))], [words, customItems]);
}
