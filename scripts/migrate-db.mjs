#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { run } from '../lib/db.mjs';

async function main() {
  const migrationFile = path.resolve('db/migrations/001_create_tables.sql');
  if (!fs.existsSync(migrationFile)) {
    console.error('Migration file not found:', migrationFile);
    process.exit(2);
  }
  const sql = fs.readFileSync(migrationFile, 'utf8');
  try {
    console.log('Running migration...');
    const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      await run(stmt);
    }
    console.log('✅ Migration applied');
  } catch (err) {
    console.error('Migration failed');
    console.error(err);
    process.exit(1);
  }
}

main();
