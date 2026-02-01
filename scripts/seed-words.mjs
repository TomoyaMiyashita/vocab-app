#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { run } from '../lib/db.mjs';

async function main() {
  const p = path.resolve('data/words.json');
  if (!fs.existsSync(p)) {
    console.error('data/words.json not found');
    process.exit(2);
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!Array.isArray(data)) {
    console.error('data/words.json must be an array');
    process.exit(2);
  }
  try {
    console.log(`Seeding ${data.length} words...`);
    for (const w of data) {
      // insert or ignore
      await run(
        `INSERT OR IGNORE INTO words (id, fr, ja, pos, example_fr, example_ja, is_static) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [w.id, w.fr, w.ja, w.pos ?? null, w.exampleFr ?? null, w.exampleJa ?? null]
      );
    }
    console.log('✅ Seed completed');
  } catch (err) {
    console.error('Seed failed');
    console.error(err);
    process.exit(1);
  }
}

main();
