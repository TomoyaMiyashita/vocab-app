# フランス語単語帳アプリ 要件定義 & 設計（MVP1）

## 🎯 目的

- フランス語学習に特化した個人用単語帳
- ユーザー登録なしで即利用可能
- 学習履歴をローカルに保存
- 最速で作れる構成（MVP1）
- **将来拡張**: フランス語以外の言語にも対応できる設計とする

---

## 🧩 MVP1 スコープ

### やること

- 単語を見て覚える
- 学習結果を保存する
- 毎日回せるUI

### やらないこと

- ユーザー登録 / ログイン
- 複数デバイス同期
- 課金 / SNS共有
- 音声・発音判定
- 高度な復習アルゴリズム（SRS）

---

## 🧠 機能要件（MVP1）

### 基本機能

- フランス語単語一覧表示
- 単語詳細表示
  - フランス語
  - 日本語訳
  - 品詞（任意）
  - 例文（任意）
- 学習フロー
  - 単語表示
  - 答え表示
  - 理解度選択（3段階）

### 学習管理

- 学習履歴をローカル保存
- 今日の学習数表示
- 単語ごとの習得レベル管理

---

## 🏗️ アーキテクチャ（MVP1）

```
Browser
└─ Web App（SPA / PWA）
   ├─ UI（React）
   ├─ State管理（Zustand）
   ├─ 単語データ（静的JSON）
   └─ 学習履歴（localStorage）
```

- サーバー不要
- 完全クライアント完結
- オフライン利用可

---

## 🛠️ 技術スタック

### フロントエンド

- Next.js（App Router）
- React
- TypeScript

### UI

- Tailwind CSS
- shadcn/ui（必要最小限）

### 状態管理

- Zustand

### 永続化（初期）

- localStorage（腹持ちのDB）
  - 容量少 / 実装最速
  - MVP1では十分
  - 将来 IndexedDB に置き換え可能

### デプロイ

- Vercel

---

## 📦 データ設計

### 単語データ

```ts
type Word = {
  id: string
  fr: string
  ja: string
  pos?: "noun" | "verb" | "adj"
  exampleFr?: string
  exampleJa?: string
}
```

※ 将来の多言語対応を見据え、言語コード（例: `fr`, `ja`）でフィールドを抽象化する拡張を検討する。

### 学習履歴

```ts
type Progress = {
  wordId: string
  level: 0 | 1 | 2 | 3
  lastReviewedAt: string
}
```

### 学習フロー

1. 単語を表示（フランス語）
2. ユーザーが意味を思い出す
3. タップで日本語表示
4. 理解度を選択
   - 0: 知らない
   - 1: 微妙
   - 2: 覚えた
5. localStorage に保存
6. 次の単語へ

---

## 🖥️ 画面構成

### 1. Home

- 今日の学習数
- 学習開始ボタン

### 2. Study

- 単語カード
- 答え表示ボタン
- 理解度ボタン（3種）

### 3. Word List

- 単語一覧
- 習得レベル表示

---

## ⚡ 実装ロードマップ（最速）

| Day | 内容 |
|-----|------|
| Day 1 | Next.js + Tailwind セットアップ / 単語JSON作成 / 単語表示UI |
| Day 2 | 学習フロー実装 / Zustand導入 / localStorage保存 |
| Day 3 | PWA化 / UI微調整 / Vercelデプロイ |

---

## 🔮 将来拡張（MVP2以降）

- IndexedDB への移行
- ログイン（Supabase / Clerk）
- 学習履歴クラウド同期
- 音声再生（Web Speech API）
- SRSアルゴリズム導入
- レベル別単語セット
- **他言語対応**（英語・スペイン語など）

---

## 📌 次にやるならおすすめ

- フォルダ構成（Next.js App Router）
- Zustand + localStorage の実装例
- 単語JSONの雛形（100語）
