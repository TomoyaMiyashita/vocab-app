import { NextResponse } from 'next/server';
import { SEEDS } from '@/lib/word-seeds';
import { translate } from '@/lib/translate.mjs';
import { db } from '@/lib/db.mjs';

function pickWords(seedList, count) {
  const out = [];
  const shuffled = [...seedList].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    out.push(shuffled[i % shuffled.length]);
  }
  return out;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const count = Math.min(100, Number(body.count) || 10);
  const category = body.category || 'greetings';
  const seed = SEEDS[category];
  if (!seed) {
    return NextResponse.json({ error: 'unknown category' }, { status: 400 });
  }
  const picks = pickWords(seed, count);
  const created = [];
  for (const en of picks) {
    let fr = en;
    let ja = en;
    try {
      fr = await translate(en, 'en', 'fr');
    } catch (e) {
      // fallback to english if translation fails
      fr = en;
    }
    try {
      ja = await translate(en, 'en', 'ja');
    } catch (e) {
      ja = en;
    }
    try {
      const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      await db.execute('INSERT OR IGNORE INTO words (id, fr, ja, pos, example_fr, example_ja, is_static) VALUES (?, ?, ?, ?, ?, ?, 0)', [id, fr, ja, null, null, null]);
      created.push({ id, fr, ja, en });
    } catch (e) {
      // ignore DB insertion errors
    }
    // small delay to be nice to the translation API
    await new Promise((r) => setTimeout(r, 200));
  }

  return NextResponse.json({ created, count: created.length });
}
