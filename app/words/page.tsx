"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Word } from "@/lib/types";
import type { WordStatus } from "@/lib/types";
import { useProgressStore } from "@/store/progress-store";
import { useAllWords } from "@/lib/use-all-words";

const LEVEL_LABELS: Record<0 | 1 | 2 | 3, string> = {
  0: "知らない",
  1: "微妙",
  2: "覚えた",
  3: "覚えた",
};

const STATUS_LABELS: Record<NonNullable<WordStatus>, string> = {
  mastered: "覚えた",
  unfixed: "未定着",
  learning: "学習中",
};

function LevelBadge({ level }: { level: 0 | 1 | 2 | 3 }) {
  const styles: Record<0 | 1 | 2 | 3, string> = {
    0: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    1: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    2: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    3: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}
    >
      {LEVEL_LABELS[level]}
    </span>
  );
}

function StatusBadge({ status }: { status: NonNullable<WordStatus> }) {
  const styles: Record<NonNullable<WordStatus>, string> = {
    mastered: "bg-green-200 text-green-900 dark:bg-green-800/50 dark:text-green-200",
    unfixed: "bg-amber-200 text-amber-900 dark:bg-amber-800/50 dark:text-amber-200",
    learning: "bg-sky-200 text-sky-900 dark:bg-sky-800/50 dark:text-sky-200",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export default function WordsPage() {
  const words = useAllWords();
  const items = useProgressStore((s) => s.items);
  const getLatestByWordId = useProgressStore((s) => s.getLatestByWordId);
  const getWordStatus = useProgressStore((s) => s.getWordStatus);

  const levelByWordId = useMemo(() => {
    const map: Record<string, 0 | 1 | 2 | 3> = {};
    words.forEach((w) => {
      const latest = getLatestByWordId(w.id);
      if (latest) map[w.id] = latest.level;
    });
    return map;
  }, [words, items]);

  const statusByWordId = useMemo(() => {
    const map: Record<string, WordStatus> = {};
    words.forEach((w) => {
      const status = getWordStatus(w.id);
      if (status) map[w.id] = status;
    });
    return map;
  }, [words, items, getWordStatus]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          単語一覧
        </h1>
        <Link
          href="/words/add"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          単語を追加
        </Link>
      </div>
      <ul className="space-y-2">
        {words.map((w) => (
          <li
            key={w.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {w.fr}
            </span>
            <span className="flex-1 text-zinc-600 dark:text-zinc-400">
              {w.ja}
            </span>
            <div className="flex items-center gap-2">
              {statusByWordId[w.id] != null ? (
                <StatusBadge status={statusByWordId[w.id]!} />
              ) : (
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  —
                </span>
              )}
              {levelByWordId[w.id] !== undefined ? (
                <LevelBadge level={levelByWordId[w.id]!} />
              ) : (
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  —
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        {words.length} 語（覚えた=2連続正解 / 未定着=1連続正解 / 学習中=直近不正解）
      </p>
    </div>
  );
}
