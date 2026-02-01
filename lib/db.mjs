import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

function loadEnv() {
  const file = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return {};
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    const v = trimmed.slice(eq + 1).trim();
    env[k] = v;
  }
  return env;
}

const env = loadEnv();
const url = process.env.TURSO_DB_URL ?? env.TURSO_DB_URL;
const authToken = process.env.TURSO_DB_AUTH_TOKEN ?? env.TURSO_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('Missing TURSO_DB_URL or TURSO_DB_AUTH_TOKEN environment variables');
}

export const db = createClient({ url, authToken });

export async function run(sql, params = []) {
  return db.execute(sql, params);
}
