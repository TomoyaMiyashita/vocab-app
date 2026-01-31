import wordsData from "@/data/words.json";
import type { Word } from "@/lib/types";

const words = wordsData as Word[];

export default function WordsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          単語一覧
        </h1>
        <ul className="space-y-2">
          {words.map((w) => (
            <li
              key={w.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {w.fr}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">{w.ja}</span>
              {/* 習得レベルは Day 2 で表示 */}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          {words.length} 語
        </p>
    </div>
  );
}
