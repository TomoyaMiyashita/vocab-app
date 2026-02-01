"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/store/progress-store";
import { useCustomWordsStore } from "@/store/custom-words-store";

/**
 * クライアントでストアを初期化する（Next.js SSR 用）
 */
export function StoreHydration() {
  useEffect(() => {
    // keep progress rehydrate for now (client-local)
    try {
      useProgressStore.persist.rehydrate();
    } catch (e) {}
    // initialize custom words from server
    useCustomWordsStore.getState().init();
  }, []);
  return null;
}
