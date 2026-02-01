import { createClient } from "@libsql/client";

const url = process.env.TURSO_DB_URL;
const authToken = process.env.TURSO_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Missing TURSO_DB_URL or TURSO_DB_AUTH_TOKEN environment variables");
}

export const db = createClient({ url, authToken });

export async function run(sql: string, params: any[] = []) {
  return db.execute(sql, params);
}
