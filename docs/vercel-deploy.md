# Vercel デプロイ手順 ✅

このプロジェクトを Vercel にデプロイするための手順をまとめます。

## 概要
- GitHub リポジトリを Vercel に接続し、master ブランチへの push をトリガーに自動デプロイを行います。
- Vercel と GitHub Actions の両方を使ったデプロイ方法を記述します。

---

## 必要な環境変数（本番）
- TURSO_DB_URL (例: libsql://...)
- TURSO_DB_AUTH_TOKEN
- JWT_SECRET
- BETTER_AUTH_URL (任意)
- BETTER_AUTH_API_KEY (任意)

> **注意:** これらは Vercel プロジェクトの "Environment Variables" に設定してください。

## Vercel での手動セットアップ
1. Vercel にログインし、New Project → Import Git Repository でこのリポジトリを選択します。
2. Build Command: `npm run build`（デフォルト）
3. Output Directory: `.next`
4. Environment Variables に上記を登録（Production / Preview / Development を適宜選択）
5. Deploy ボタンで初回デプロイ

## Vercel CLI を使った例（オプション）
1. ログイン: `vercel login`
2. プロジェクトに紐付け: `vercel --prod`（初回は対話式）
3. 環境変数を CLI で追加（対話式）:
   - `vercel env add TURSO_DB_URL production`
   - `vercel env add TURSO_DB_AUTH_TOKEN production`
   - `vercel env add JWT_SECRET production`

## GitHub Actions による自動デプロイ（推奨）
リポジトリに `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` を GitHub Secrets に追加すれば、master への push で自動デプロイできます。CI のワークフローはリポジトリ内に追加済みです（`.github/workflows/deploy-vercel.yml`）。

---

## 参考
- Vercel CLI: https://vercel.com/docs/cli
- Vercel GitHub Action: https://github.com/AmondNet/vercel-action
