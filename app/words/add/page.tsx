"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Word } from "@/lib/types";
import { useCustomWordsStore } from "@/store/custom-words-store";

const POS_OPTIONS: { value: Word["pos"]; label: string }[] = [
  { value: undefined, label: "—" },
  { value: "noun", label: "名詞" },
  { value: "verb", label: "動詞" },
  { value: "adj", label: "形容詞" },
];

export default function AddWordPage() {
  const router = useRouter();
  const addWord = useCustomWordsStore((s) => s.addWord);
  const [fr, setFr] = useState("");
  const [ja, setJa] = useState("");
  const [pos, setPos] = useState<Word["pos"]>(undefined);
  const [exampleFr, setExampleFr] = useState("");
  const [exampleJa, setExampleJa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fr.trim() || !ja.trim()) return;
    addWord({
      fr: fr.trim(),
      ja: ja.trim(),
      ...(pos && { pos }),
      ...(exampleFr.trim() && { exampleFr: exampleFr.trim() }),
      ...(exampleJa.trim() && { exampleJa: exampleJa.trim() }),
    });
    setFr("");
    setJa("");
    setPos(undefined);
    setExampleFr("");
    setExampleJa("");
    router.push("/words");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        単語を追加
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="fr" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            フランス語 *
          </label>
          <input
            id="fr"
            type="text"
            value={fr}
            onChange={(e) => setFr(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="ja" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            日本語 *
          </label>
          <input
            id="ja"
            type="text"
            value={ja}
            onChange={(e) => setJa(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="pos" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            品詞（任意）
          </label>
          <select
            id="pos"
            value={pos ?? ""}
            onChange={(e) => setPos((e.target.value || undefined) as Word["pos"])}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {POS_OPTIONS.map((o) => (
              <option key={o.value ?? "none"} value={o.value ?? ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="exampleFr" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            例文（仏）（任意）
          </label>
          <input
            id="exampleFr"
            type="text"
            value={exampleFr}
            onChange={(e) => setExampleFr(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="exampleJa" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            例文（日）（任意）
          </label>
          <input
            id="exampleJa"
            type="text"
            value={exampleJa}
            onChange={(e) => setExampleJa(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            追加
          </button>
          <Link
            href="/words"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  );
}
