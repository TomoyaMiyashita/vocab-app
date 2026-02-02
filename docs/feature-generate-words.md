# 単語自動生成機能

## 概要
- 指定したカテゴリ（例: `greetings`, `food`）から英単語を選び、翻訳 API を使って `fr`（フランス語） と `ja`（日本語） を生成して DB に一括追加します。

## 使い方
- ページ: `/words/generate`
- フォームで `count` と `category` を指定して `生成` を押すと、翻訳→DB 挿入を行います。

## 技術的メモ
- 翻訳はデフォルトで LibreTranslate の公開インスタンス（環境によってはアクセス不可）を使用します。
- 環境変数:
  - `LIBRETRANSLATE_URL`（任意）: 使用する LibreTranslate のベース URL
  - `LIBRETRANSLATE_API_KEY`（任意）: API キー
- 翻訳に失敗した場合は英語のまま `fr`/`ja` に入れます（後で手動修正可）。

## 今後の改善案
- 別サービス（DeepL / Google Translate）に切替えるオプションを追加
- バッチ処理 / キュー化してレート制限に対応
- カテゴリ追加や語彙拡充のための UI を整備

