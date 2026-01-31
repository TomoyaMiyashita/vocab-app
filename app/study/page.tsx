"use client";

import { useState } from "react";
import Link from "next/link";
import wordsData from "@/data/words.json";
import type { Word } from "@/lib/types";

const words = wordsData as Word[];

export default function StudyPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const word = words[index];
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
          {index + 1} / {words.length}
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
              {/* 理解度ボタンは Day 2 で localStorage 連携 */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300"
                >
                  知らない
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                >
                  微妙
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  覚えた
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
              setIndex((i) => Math.min(words.length - 1, i + 1));
              setShowAnswer(false);
            }}
            disabled={index >= words.length - 1}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-zinc-600"
          >
            次へ
          </button>
        </div>
    </div>
  );
}
