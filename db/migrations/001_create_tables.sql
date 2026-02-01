-- words table
CREATE TABLE IF NOT EXISTS words (
  id TEXT PRIMARY KEY,
  fr TEXT NOT NULL,
  ja TEXT NOT NULL,
  pos TEXT,
  example_fr TEXT,
  example_ja TEXT,
  is_static INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- progress table
CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id TEXT NOT NULL,
  level INTEGER NOT NULL,
  last_reviewed_at TEXT NOT NULL,
  FOREIGN KEY(word_id) REFERENCES words(id)
);

-- index for faster lookups
CREATE INDEX IF NOT EXISTS idx_progress_word_id ON progress(word_id);
