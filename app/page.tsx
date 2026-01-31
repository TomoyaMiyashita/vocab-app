import Link from "next/link";

export default function HomePage() {
  // 今日の学習数は Day 2 で localStorage 連携
  const todayCount = 0;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Vocab App
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        今日の学習数: <span className="font-semibold text-zinc-900 dark:text-zinc-50">{todayCount}</span> 語
      </p>
      <Link
        href="/study"
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        学習開始
      </Link>
    </div>
  );
}
