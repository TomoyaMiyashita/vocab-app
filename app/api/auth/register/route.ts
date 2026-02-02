import { NextResponse } from 'next/server';
import { registerLocalUser } from '@/lib/auth.mjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 });

  // If Better Auth is configured, forward to better-auth internal route
  if (process.env.BETTER_AUTH_SECRET) {
    try {
      // proxy to internal handler path /api/auth/signUpEmail
      const url = new URL(req.url);
      url.pathname = url.pathname.replace(/\/register$/, '/signUpEmail');
      const proxied = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await proxied.json().catch(() => ({}));
      return NextResponse.json(data, { status: proxied.status });
    } catch (e) {
      // fall through to local fallback
    }
  }

  const res = await registerLocalUser(email, password);
  if ((res as any).error) {
    return NextResponse.json(res, { status: 400 });
  }
  return NextResponse.json(res);
}
