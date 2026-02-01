import { run } from './db.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  // try .env.local
  try {
    const fs = await import('fs');
    const path = await import('path');
    const p = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const m = content.match(/^JWT_SECRET=(.+)$/m);
      if (m) return m[1].trim();
    }
  } catch (e) {}
  return 'dev-secret';
})();

export async function registerLocalUser(email, password) {
  const existing = await run('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.rows && existing.rows.length > 0) {
    return { error: 'exists' };
  }
  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  const password_hash = bcrypt.hashSync(password, 10);
  await run('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)', [id, email, password_hash]);
  const token = jwt.sign({ sub: id, email }, JWT_SECRET, { expiresIn: '30d' });
  return { id, email, token };
}

export async function loginLocalUser(email, password) {
  const res = await run('SELECT id, password_hash FROM users WHERE email = ?', [email]);
  const row = res.rows && res.rows[0];
  if (!row) return { error: 'no_user' };
  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return { error: 'invalid' };
  const token = jwt.sign({ sub: row.id, email }, JWT_SECRET, { expiresIn: '30d' });
  return { id: row.id, email, token };
}

export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { ok: true, payload };
  } catch (e) {
    return { ok: false };
  }
}
