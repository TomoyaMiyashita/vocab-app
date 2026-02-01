#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { run } from '../lib/db.mjs';

async function main() {
  const migrationsDir = path.resolve('db/migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.error('Migrations dir not found:', migrationsDir);
    process.exit(2);
  }
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  try {
    console.log('Running migrations...');
    for (const f of files) {
      console.log('Applying', f);
      const sql = fs.readFileSync(path.join(migrationsDir, f), 'utf8');
      const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
      for (const stmt of statements) {
        await run(stmt);
      }
    }
    console.log('✅ Migrations applied');
  } catch (err) {
    console.error('Migration failed');
    console.error(err);
    process.exit(1);
  }
}

main();
