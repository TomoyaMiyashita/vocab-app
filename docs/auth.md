# Authentication (Better Auth / Local fallback)

## 簡易概要
ユーザー登録・認証を導入し、ユーザーごとに学習履歴を管理できるようにしました。

### 環境変数
- `BETTER_AUTH_URL` (optional) - Better Auth API base URL
- `BETTER_AUTH_API_KEY` (optional) - Better Auth API key
- `JWT_SECRET` - JWT secret used in local fallback (set in env)

> Better Auth を有効にするには `BETTER_AUTH_URL` と `BETTER_AUTH_API_KEY` を設定してください。現在はドキュメントに基づく直接プロキシ実装は TODO として残しています。Better Auth のエンドポイントに合わせて `/app/api/auth/*` を改良してください。

## Endpoints
- `POST /api/auth/register` - { email, password } -> { id, email, token }
- `POST /api/auth/login` - { email, password } -> { id, email, token }

トークンは JWT（ローカルフォールバック）で返却され、`Authorization: Bearer <token>` を付与して `/api/progress` などの認証エンドポイントにアクセスします.

## 今後の作業
- Better Auth に合わせてプロキシ処理を実装
- ユーザーのメール確認フローなどの追加
