"use client";

import Link from "next/link";
import { useRef, useMemo, useState } from "react";
import { useProgressStore } from "@/store/progress-store";
import { STUDY_COUNT_OPTIONS, DEFAULT_STUDY_COUNT } from "@/lib/constants";

const EXPORT_FILENAME = "vocab-app-progress.json";

const FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "learning", label: "学習中" },
  { value: "unfixed", label: "未定着" },
  { value: "mastered", label: "覚えた" },
];

export default function HomePage() {
  const items = useProgressStore((s) => s.items);
  const getExportData = useProgressStore((s) => s.getExportData);
  const importProgress = useProgressStore((s) => s.importProgress);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCount, setSelectedCount] = useState(DEFAULT_STUDY_COUNT);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const todayCount = useMemo(
    () =>
      items.filter(
        (p) =>
          new Date(p.lastReviewedAt).toDateString() === new Date().toDateString()
      ).length,
    [items]
  );

  const handleExport = () => {
    const data = getExportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = EXPORT_FILENAME;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        const progress = Array.isArray(json.progress) ? json.progress : json;
        if (Array.isArray(progress)) {
          importProgress(progress);
        }
      } catch {
        // ignore invalid JSON
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Vocab App
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        今日の学習数:{" "}
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">
          {todayCount}
        </span>{" "}
        語
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            問題数
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {STUDY_COUNT_OPTIONS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setSelectedCount(count)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCount === count
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {count}問
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            出題対象
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setSelectedFilter(f.value)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFilter === f.value
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <Link
          href={`/study?count=${selectedCount}&filter=${selectedFilter}`}
          className="rounded-full bg-zinc-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          学習開始
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          学習記録を GitHub 等に残す: エクスポートした JSON をリポジトリにコミットできます。
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            学習記録をエクスポート
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            学習記録をインポート
          </button>
        </div>
      </div>
    </div>
  );
}
