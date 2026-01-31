# リポジトリ譲渡と Vercel デプロイ手順

このドキュメントは、**プロジェクトメンバーへリポジトリを譲渡（寄贈）したあと**、**メンバー側（またはホスティングする友人）が Vercel でデプロイするまで**の手順をまとめたものです。

- **譲渡する人**: 現在のリポジトリ所有者（あなた）
- **受け取る人**: プロジェクトメンバー（GitHub アカウントがない場合は新規作成）
- **ホスティング**: 友人の Vercel アカウントでデプロイする想定

**CLI 手順**と**GUI 手順**の両方を記載しています。公式ドキュメントの URL も適宜記載しています。

---

## 参考リンク（公式）

| 内容 | URL |
|------|-----|
| GitHub アカウント・プロファイル | [Account - GitHub ドキュメント（日本語）](https://docs.github.com/ja/account-and-profile/get-started/account) |
| GitHub リポジトリの譲渡 | [Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository) |
| Vercel ドキュメント | [Vercel Documentation](https://vercel.com/docs) |
| Vercel 既存プロジェクトのインポート | [Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import) |
| Vercel と GitHub の連携 | [Deploying GitHub Projects with Vercel](https://vercel.com/docs/git/vercel-for-github) |

---

## 1. 前提と役割

| 役割 | やること |
|------|----------|
| **譲渡者** | リポジトリを public にし、メンバーへ譲渡する |
| **メンバー** | GitHub アカウントを用意し、譲渡を受け取り、必要なら友人を collaborator に追加する |
| **友人（Vercel 担当）** | Vercel アカウントで GitHub と連携し、このリポジトリをデプロイする |

---

## 2. 譲渡者: リポジトリを public にする

譲渡の前に、リポジトリを **public** にしておきます。

### GUI 手順

1. リポジトリのページを開く: `https://github.com/<あなたのユーザー名>/vocab-app`
2. **Settings** タブをクリック
3. 一番下の **Danger Zone** までスクロール
4. **Change repository visibility** の **Change visibility** をクリック
5. **Make public** を選び、指示に従って確認する

### CLI 手順

GitHub CLI が入っている場合:

```bash
gh repo edit <あなたのユーザー名>/vocab-app --visibility public
```

確認:

```bash
gh repo view <あなたのユーザー名>/vocab-app --json visibility
```

---

## 3. メンバー: GitHub アカウントを作成する（持っていない場合）

メンバーがまだ GitHub アカウントを持っていない場合の手順です。

1. **GitHub にアクセス**  
   [https://github.com](https://github.com) を開く

2. **Sign up** をクリック  
   メールアドレス、パスワード、ユーザー名を入力してアカウントを作成する

3. **メール認証**  
   届いたメールのリンクで認証を完了する

4. **プロファイルの基本設定**（任意）  
   アカウント作成後、プロファイルやメール設定は [GitHub アカウントの概要](https://docs.github.com/ja/account-and-profile/get-started/account) を参照

**重要**: 譲渡を受けるには、**譲渡先として入力する GitHub ユーザー名**を譲渡者に伝えておいてください。

---

## 4. 譲渡者: リポジトリをメンバーに譲渡する

### GUI 手順（推奨）

1. リポジトリを開く: `https://github.com/<あなたのユーザー名>/vocab-app`
2. **Settings** タブを開く
3. 下までスクロールし、**Danger Zone** を表示
4. **Transfer ownership** の **Transfer** をクリック
5. **New owner's GitHub username or organization name** に、**メンバーの GitHub ユーザー名**を入力
6. 表示される注意を読み、リポジトリ名 `vocab-app` を入力して確認
7. **I understand, transfer this repository.** をクリックして譲渡を実行

公式手順: [Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository)

**注意**:
- 譲渡後、メンバーに **24 時間以内に受け取りを承認するメール**が届きます。メンバーはそのメールのリンクから譲渡を受け入れてください。
- 譲渡後、あなたは自動的に **collaborator** として追加されます（必要なら後からメンバーが権限を変更可能）。

### CLI 手順

GitHub CLI で譲渡する場合（事前に `gh auth login` 済みであること）:

```bash
# 譲渡先のユーザー名を指定
gh api repos/<あなたのユーザー名>/vocab-app/transfer -f new_owner=<メンバーのGitHubユーザー名>
```

譲渡後、メンバーに届くメールから受け取りを完了してもらいます。

---

## 5. メンバー: 譲渡を受け取る

1. **メールを確認**  
   GitHub から「Repository transfer」のメールが届く

2. **受け取りリンクをクリック**  
   メール内の **Accept transfer** のようなリンクを開く（24 時間以内）

3. **ログイン**  
   必要なら GitHub にログインする

4. **受け取り完了**  
   リポジトリはメンバーのアカウント配下に移動します。  
   新しい URL 例: `https://github.com/<メンバーのユーザー名>/vocab-app`

---

## 6. Vercel でホスティングする友人: アカウント作成（持っていない場合）

友人が Vercel アカウントを持っていない場合の手順です。

1. **Vercel にアクセス**  
   [https://vercel.com](https://vercel.com) を開く

2. **Sign Up** をクリック  
   **Continue with GitHub** を選ぶと、GitHub アカウントと連携してサインアップできる（推奨）

3. **GitHub の認証**  
   表示に従って GitHub で Vercel を承認する

4. **完了**  
   Vercel のダッシュボードが表示されれば OK

ドキュメント: [Vercel Documentation](https://vercel.com/docs) / [Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import)

**注意**: 友人が「メンバーのリポジトリ」を Vercel でインポートするには、**メンバーが友人を GitHub リポジトリの collaborator に追加する**必要があります（次の「メンバー: 友人を collaborator に追加」を参照）。

---

## 7. メンバー: 友人を GitHub の collaborator に追加する（Vercel でインポートする場合）

友人の Vercel アカウントで「このリポジトリ」をインポートするには、友人の GitHub アカウントがリポジトリにアクセスできる必要があります。

1. リポジトリを開く: `https://github.com/<メンバーのユーザー名>/vocab-app`
2. **Settings** タブを開く
3. 左メニューで **Collaborators**（または **Collaborators and teams**）をクリック
4. **Add people** で、**友人の GitHub ユーザー名**を入力して追加
5. 友人に招待メールが届くので、**Accept invitation** で承認してもらう

これで、友人が Vercel の「Import Git Repository」でこのリポジトリを選択できるようになります。

---

## 8. Vercel にデプロイする

### 方法 A: GUI（Vercel ダッシュボードからインポート）

**操作する人**: 友人（Vercel アカウントを持っている人）、またはメンバー本人が Vercel にサインアップしてデプロイする場合。

1. **Vercel にログイン**  
   [https://vercel.com](https://vercel.com) にログインする

2. **新規プロジェクト**  
   [Add New...] → **Project** をクリック  
   または [https://vercel.com/new](https://vercel.com/new) を開く

3. **GitHub を連携**（まだの場合）  
   **Import Git Repository** で **GitHub** を選び、表示に従って GitHub と Vercel を連携する  
   参考: [Deploying GitHub Projects with Vercel](https://vercel.com/docs/git/vercel-for-github)

4. **リポジトリを選択**  
   **vocab-app** を検索して選択し、**Import** をクリック

5. **設定確認**  
   - Framework Preset: **Next.js** が自動検出されていることを確認
   - Root Directory / Build Command / Output Directory は通常そのままで OK
   - 必要なら Environment Variables を追加

6. **Deploy** をクリック  
   ビルドとデプロイが実行され、完了後に **Visit** で URL が開けます

参考: [Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import)

---

### 方法 B: CLI でデプロイ

**操作する人**: 友人またはメンバー。リポジトリを clone できる環境で実行。

#### 1. リポジトリを clone（まだの場合）

```bash
git clone https://github.com/<メンバーのユーザー名>/vocab-app.git
cd vocab-app
```

#### 2. Vercel CLI を入れる

```bash
npm i -g vercel
```

#### 3. ログイン

```bash
vercel login
```

表示に従い、メールまたは GitHub でログインする。

#### 4. デプロイ

```bash
# プロジェクトルートで
vercel
```

初回は質問に答える:
- **Set up and deploy?** → **Y**
- **Which scope?** → 使うアカウント/チームを選択
- **Link to existing project?** → **N**（新規）
- **Project name?** → そのまま Enter で `vocab-app` など
- **Directory?** → `./` のまま Enter

本番用 URL でデプロイする場合:

```bash
vercel --prod
```

参考: [Vercel Documentation](https://vercel.com/docs)（CLI は [Deploying](https://vercel.com/docs/deployments) 周辺）

---

## 9. デプロイ後の確認

- **プレビュー URL**: 各デプロイごとに `*.vercel.app` の URL が発行されます
- **本番**: `vercel --prod` または Vercel ダッシュボードで Production ブランチ（多くは `main`）にデプロイされたものが本番です
- **今後の更新**: リポジトリに push すると、Git 連携していれば Vercel が自動で再デプロイします（GUI でインポートした場合）

---

## 10. トラブルシューティング

| 現象 | 対処 |
|------|------|
| 譲渡メールが届かない | メンバーの GitHub メール設定・迷惑フォルダを確認。譲渡者側でユーザー名の typo がないか確認 |
| 譲渡の受け取りが期限切れ | 譲渡者にもう一度譲渡を依頼する（再度 Transfer を実行） |
| Vercel でリポジトリが見えない | メンバーが友人を collaborator に追加しているか確認。友人が GitHub 連携で「すべてのリポジトリ」または「Selected repositories」で vocab-app を選んでいるか確認 |
| ビルドが失敗する | Vercel のデプロイログでエラーを確認。Next.js のルートが正しいか、`package.json` の `build` スクリプトがあるか確認 |

---

## 11. 手順の流れまとめ（チェックリスト）

**譲渡者**
- [ ] リポジトリを public にする（2.）
- [ ] メンバーの GitHub ユーザー名を確認
- [ ] リポジトリを譲渡する（4.）
- [ ] メンバーにメールで受け取りを案内

**メンバー**
- [ ] GitHub アカウントを作成（必要な場合）（3.）
- [ ] 譲渡メールから 24 時間以内に受け取り（5.）
- [ ] 友人を collaborator に追加（7.）（友人が Vercel でインポートする場合）

**友人（Vercel 担当）**
- [ ] Vercel アカウントを作成（必要な場合）（6.）
- [ ] GitHub で招待を承認（collaborator）
- [ ] Vercel でリポジトリをインポートしてデプロイ（8. 方法 A）、または CLI でデプロイ（8. 方法 B）

以上で、譲渡から Vercel での公開まで一通り完了です。
