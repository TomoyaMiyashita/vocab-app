import { NextResponse } from 'next/server';
import { db } from '@/lib/db.mjs';
import { verifyToken } from '@/lib/auth.mjs';

function getUserIdFromAuth(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const m = auth.match(/^Bearer (.+)$/);
  if (!m) return null;
  const token = m[1];
  const v = verifyToken(token);
  if (!v.ok) return null;
  return v.payload.sub;
}

export async function GET(req: Request) {
  const userId = getUserIdFromAuth(req);
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  const res = await db.execute('SELECT word_id, level, last_reviewed_at FROM progress WHERE user_id = ? ORDER BY last_reviewed_at DESC', [userId]);
  const rows = res.rows.map(r => ({ wordId: r.word_id, level: r.level, lastReviewedAt: r.last_reviewed_at }));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const userId = getUserIdFromAuth(req);
  if (!userId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  const body = await req.json();
  const { wordId, level } = body;
  if (!wordId || typeof level !== 'number') return NextResponse.json({ error: 'invalid' }, { status: 400 });
  await db.execute('INSERT INTO progress (word_id, user_id, level, last_reviewed_at) VALUES (?, ?, ?, ?)', [wordId, userId, level, new Date().toISOString()]);
  return NextResponse.json({ ok: true });
}
