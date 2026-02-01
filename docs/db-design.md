# DB 設計（Turso / libSQL）

## 概要
このアプリケーションでは単語データを JSON ファイル（`data/words.json`）で管理していました。これを Turso（libSQL）に移行します。

## テーブル設計
### words
- id TEXT PRIMARY KEY
- fr TEXT NOT NULL
- ja TEXT NOT NULL
- pos TEXT (nullable) - `noun | verb | adj`
- example_fr TEXT (nullable)
- example_ja TEXT (nullable)
- is_static INTEGER DEFAULT 1 - 元データが static (data/words.json) かどうかを示すフラグ
- created_at TEXT DEFAULT current timestamp

用途: 単語（静的 / カスタム）を一元管理します。

### progress
- id INTEGER PRIMARY KEY AUTOINCREMENT
- word_id TEXT NOT NULL (foreign key -> words.id)
- user_id TEXT (nullable) (foreign key -> users.id)
- level INTEGER NOT NULL
- last_reviewed_at TEXT NOT NULL

用途: 学習履歴を保存するためのテーブル。ユーザーごとに学習記録を保持するため `user_id` を追加しました。

## マイグレーション
- `db/migrations/001_create_tables.sql` に DDL を保管しています。
- 実行: `node scripts/migrate-db.mjs`

## シード
- `scripts/seed-words.mjs` が `data/words.json` を読み取り `words` テーブルへ挿入します。
- 実行: `node scripts/seed-words.mjs`

## API
- `GET /api/words` - 全単語を取得（静的 + カスタム）
- `POST /api/words` - 単語を追加（カスタム）
  - body: { fr, ja, pos?, exampleFr?, exampleJa? }
  - 返却: 作成した単語オブジェクト（id を含む）
- `DELETE /api/words?id=...` - 単語を削除

## クライアント側
- `lib/use-all-words.ts` をサーバ API に変更しました。`/api/words` を fetch します。
- `store/custom-words-store.ts` は API と同期するように変更しました（`init` / `addWord` / `removeWord` を提供）。

## 未解決・今後のタスク
- 既存ユーザーのローカルにある custom words（localStorage）を自動的に移行する仕組みを作る（UI 上でインポート可能にするアプローチが良い）。
- 学習履歴（progress）を DB に移行してクロスデバイス対応にする。API と UI の変更が必要。

