"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ["greetings", "food", "common_verbs"];

export default function GeneratePage() {
  const [count, setCount] = useState(10);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handle = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/words/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count, category }),
      });
      const data = await res.json();
      setResult(data);
      // refresh words page
      router.refresh();
    } catch (e) {
      setResult({ error: 'failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">単語を自動生成</h1>
      <form onSubmit={handle} className="flex gap-3 items-center">
        <label className="flex items-center gap-2">
          数:
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="input w-24" />
        </label>
        <label className="flex items-center gap-2">
          カテゴリ:
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <button className="btn" disabled={loading}>{loading ? '生成中...' : '生成'}</button>
      </form>
      {result && (
        <div className="mt-4">
          <pre className="text-sm bg-zinc-100 p-3 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
