import { NextResponse } from 'next/server';
import { loginLocalUser } from '@/lib/auth.mjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 });

  if (process.env.BETTER_AUTH_SECRET) {
    try {
      const url = new URL(req.url);
      url.pathname = url.pathname.replace(/\/login$/, '/signInEmail');
      const proxied = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await proxied.json().catch(() => ({}));
      return NextResponse.json(data, { status: proxied.status });
    } catch (e) {
      // fallthrough to local fallback
    }
  }

  const res = await loginLocalUser(email, password);
  if ((res as any).error) return NextResponse.json(res, { status: 400 });
  return NextResponse.json(res);
}
