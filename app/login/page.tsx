"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handle = async (e: any) => {
    e.preventDefault();
    const u = await login(email, password);
    if (u) router.push('/');
    else setError('Login failed');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold">ログイン</h1>
      <form onSubmit={handle} className="flex flex-col gap-4">
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn">ログイン</button>
      </form>
    </div>
  );
}
