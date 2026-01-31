# Vocab App（単語帳 Web アプリ）

フランス語を勉強できる単語帳 Web アプリです。将来的に他言語対応も想定した拡張性を持たせています。

## 特徴（MVP1）

- ユーザー登録なしで即利用可能
- 学習履歴をローカル（localStorage）に保存
- オフライン利用可能（PWA）
- サーバー不要・完全クライアント完結

## 技術スタック

- Next.js（App Router）, React, TypeScript
- Tailwind CSS, shadcn/ui
- Zustand（状態管理）
- Vercel（デプロイ）

## ドキュメント

- [設計書（MVP1）](./docs/design.md)
- [リポジトリ譲渡と Vercel デプロイ手順](./docs/handover-and-vercel-deploy.md)（譲渡・受け取り・デプロイの手順）

## 開発

```bash
npm install
npm run dev
```

## ライセンス

Private
