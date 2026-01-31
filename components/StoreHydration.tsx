"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/store/progress-store";
import { useCustomWordsStore } from "@/store/custom-words-store";

/**
 * クライアントで localStorage からストアを復元する（Next.js SSR 用）
 */
export function StoreHydration() {
  useEffect(() => {
    useProgressStore.persist.rehydrate();
    useCustomWordsStore.persist.rehydrate();
  }, []);
  return null;
}
