"use client";

import Link from "next/link";
import { useAuthStore } from '@/store/auth-store';

export function Nav() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          Home
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/study"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            学習
          </Link>
          <Link
            href="/words"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            単語一覧
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-600">{user.email}</span>
              <button className="text-sm text-zinc-700" onClick={() => logout()}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="text-sm">ログイン</Link>
              <Link href="/register" className="text-sm">登録</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
