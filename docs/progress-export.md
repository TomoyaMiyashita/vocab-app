# 学習記録のエクスポート / インポート（GitHub 用）

学習記録はブラウザの **localStorage** に保存されます。譲渡前の検証やバックアップとして、**JSON でエクスポート**し、リポジトリにコミットして残すことができます。

## エクスポート

1. Home 画面で **「学習記録をエクスポート」** をクリック
2. `vocab-app-progress.json` がダウンロードされます
3. 必要に応じてこのファイルをリポジトリにコミット

```bash
# 例: data/ に置いてコミット
mv ~/Downloads/vocab-app-progress.json ./data/
git add data/vocab-app-progress.json
git commit -m "chore: backup progress"
```

## インポート

1. Home 画面で **「学習記録をインポート」** をクリック
2. エクスポートした JSON ファイル（または `{ "progress": [...] }` 形式）を選択
3. 既存の記録の**後ろに**マージされます（上書きではありません）

## JSON 形式

```json
{
  "exportedAt": "2026-01-31T12:00:00.000Z",
  "progress": [
    {
      "wordId": "1",
      "level": 2,
      "lastReviewedAt": "2026-01-31T10:00:00.000Z"
    }
  ]
}
```

- **level**: `0` = 知らない, `1` = 微妙, `2` = 覚えた
- **lastReviewedAt**: ISO 8601 日時

`progress` 配列だけの JSON でもインポートできます。

## 状態管理の整理

- **通常**: ブラウザの localStorage が「腹持ちの DB」として動作
- **GitHub に残す**: エクスポートした JSON をリポジトリにコミットすれば、その時点の記録をコードと一緒に管理可能
- 譲渡時: 受け取る側が同じ JSON をインポートすれば、記録を引き継げます
