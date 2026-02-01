-- users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- add user_id to progress
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS progress_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id TEXT NOT NULL,
  user_id TEXT,
  level INTEGER NOT NULL,
  last_reviewed_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(word_id) REFERENCES words(id)
);
INSERT INTO progress_new (id, word_id, level, last_reviewed_at)
SELECT id, word_id, level, last_reviewed_at FROM progress;
DROP TABLE progress;
ALTER TABLE progress_new RENAME TO progress;
COMMIT;
PRAGMA foreign_keys = ON;

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
