"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Word } from "@/lib/types";
import { useProgressStore } from "@/store/progress-store";
import { useAllWords } from "@/lib/use-all-words";
import { STUDY_COUNT_OPTIONS, DEFAULT_STUDY_COUNT } from "@/lib/constants";

const LEVEL_LABELS: Record<0 | 1 | 2 | 3, string> = {
  0: "知らない",
  1: "微妙",
  2: "覚えた",
  3: "覚えた",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function StudyContent() {
  const searchParams = useSearchParams();
  const countParam = searchParams.get("count");
  const filterParam = searchParams.get("filter") ?? "all";

  const count = useMemo(() => {
    const n = Number(countParam);
    if (Number.isNaN(n) || n < 1) return DEFAULT_STUDY_COUNT;
    if (STUDY_COUNT_OPTIONS.includes(n as 10 | 50 | 100)) return n as 10 | 50 | 100;
    return Math.min(Math.max(1, n), 100);
  }, [countParam]);

  const allWords = useAllWords();
  const getWordStatus = useProgressStore((s) => s.getWordStatus);
  const recordProgress = useProgressStore((s) => s.recordProgress);

  const studyWords = useMemo(() => {
    let list: Word[] = allWords;
    if (filterParam !== "all") {
      list = allWords.filter((w) => getWordStatus(w.id) === filterParam);
    }
    return shuffle(list).slice(0, Math.min(count, list.length));
  }, [allWords, filterParam, count, getWordStatus]);

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const word = studyWords[index];

  const handleLevel = (level: 0 | 1 | 2) => {
    if (!word) return;
    recordProgress(word.id, level);
    if (index < studyWords.length - 1) {
      setIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setShowAnswer(false);
      setIndex(0);
    }
  };

  if (studyWords.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          出題対象の単語がありません。フィルタを変えるか、単語を追加してください。
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-zinc-500 underline">
          Home へ
        </Link>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">単語がありません。</p>
        <Link href="/" className="mt-4 inline-block text-sm text-zinc-500 underline">
          Home へ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        {index + 1} / {studyWords.length}
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {word.fr}
        </p>
        {showAnswer ? (
          <>
            <p className="text-lg text-zinc-700 dark:text-zinc-300">{word.ja}</p>
            {word.exampleFr && (
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {word.exampleFr} — {word.exampleJa}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleLevel(0)}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
              >
                {LEVEL_LABELS[0]}
              </button>
              <button
                type="button"
                onClick={() => handleLevel(1)}
                className="rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 transition-colors hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
              >
                {LEVEL_LABELS[1]}
              </button>
              <button
                type="button"
                onClick={() => handleLevel(2)}
                className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
              >
                {LEVEL_LABELS[2]}
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="rounded-full bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
          >
            答えを表示
          </button>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => {
            setIndex((i) => Math.max(0, i - 1));
            setShowAnswer(false);
          }}
          disabled={index === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-zinc-600"
        >
          前へ
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex((i) => Math.min(studyWords.length - 1, i + 1));
            setShowAnswer(false);
          }}
          disabled={index >= studyWords.length - 1}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-zinc-600"
        >
          次へ
        </button>
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
          読み込み中...
        </div>
      }
    >
      <StudyContent />
    </Suspense>
  );
}
