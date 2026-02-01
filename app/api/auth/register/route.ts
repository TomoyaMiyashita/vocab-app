import { NextResponse } from 'next/server';
import { registerLocalUser } from '@/lib/auth.mjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 });

  // If Better Auth env present, proxy (not implemented)
  if (process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_API_KEY) {
    // TODO: proxy to Better Auth - left for explicit integration
  }

  const res = await registerLocalUser(email, password);
  if ((res as any).error) {
    return NextResponse.json(res, { status: 400 });
  }
  return NextResponse.json(res);
}
