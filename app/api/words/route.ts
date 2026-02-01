import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const res = await db.execute('SELECT id, fr, ja, pos, example_fr, example_ja, is_static FROM words ORDER BY is_static DESC, fr ASC');
  const rows = res.rows.map((r) => ({
    id: r.id,
    fr: r.fr,
    ja: r.ja,
    pos: r.pos ?? undefined,
    exampleFr: r.example_fr ?? undefined,
    exampleJa: r.example_ja ?? undefined,
    isStatic: Boolean(r.is_static),
  }));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { fr, ja, pos, exampleFr, exampleJa, id } = body;
  const generatedId = id ?? `custom-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
  await db.execute(
    `INSERT INTO words (id, fr, ja, pos, example_fr, example_ja, is_static) VALUES (?, ?, ?, ?, ?, ?, 0)`,
    [generatedId, fr, ja, pos ?? null, exampleFr ?? null, exampleJa ?? null]
  );
  return NextResponse.json({ id: generatedId, fr, ja, pos, exampleFr, exampleJa });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await db.execute('DELETE FROM words WHERE id = ?', [id]);
  return NextResponse.json({ ok: true });
}
