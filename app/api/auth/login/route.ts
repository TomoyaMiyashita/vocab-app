import { NextResponse } from 'next/server';
import { loginLocalUser } from '@/lib/auth.mjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'email and password required' }, { status: 400 });

  // TODO: proxy to Better Auth if configured
  const res = await loginLocalUser(email, password);
  if ((res as any).error) return NextResponse.json(res, { status: 400 });
  return NextResponse.json(res);
}
