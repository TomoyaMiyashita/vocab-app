#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";

function loadEnvFile(file) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) return {};
  const content = fs.readFileSync(p, "utf8");
  const lines = content.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    const v = trimmed.slice(eq + 1).trim();
    env[k] = v;
  }
  return env;
}

(async function main() {
  const env = loadEnvFile('.env.local');
  const url = env.TURSO_DB_URL;
  const authToken = env.TURSO_DB_AUTH_TOKEN;
  if (!url || !authToken) {
    console.error('Missing TURSO_DB_URL or TURSO_DB_AUTH_TOKEN in .env.local');
    process.exit(2);
  }

  console.log('Connecting to', url);
  try {
    const client = createClient({ url, authToken });
    // Try a simple query
    const res = await client.execute('SELECT 1 AS ok');
    console.log('Query result:');
    console.dir(res, { depth: 4 });
    console.log('\u2705 Connection successful');
    process.exit(0);
  } catch (err) {
    console.error('\u274C Connection failed');
    console.error(err);
    process.exit(1);
  }
})();