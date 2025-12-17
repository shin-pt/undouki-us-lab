# URL移行ガイド

## 📍 メインURLへの統一完了

Flutterアプリ（エコークイズアプリ）のURLを`musculoskeletal-us-lab.web.app/quiz-app/`に統一しました。

## 🌐 新しいURL構造

### メインURL（推奨）
- **Flutterアプリ**: `https://musculoskeletal-us-lab.web.app/quiz-app/`
- **HTMLサイト**: `https://musculoskeletal-us-lab.web.app/`

### 旧URL（リダイレクト設定済み）
- **旧FlutterアプリURL**: `https://echo-quiz-app.web.app/`
  - すべてのリクエストが自動的に`https://musculoskeletal-us-lab.web.app/quiz-app/`にリダイレクトされます（301リダイレクト）

## 🔄 リダイレクト設定

`echo-quiz-app`プロジェクトの`firebase.json`に以下のリダイレクト設定を追加しました：

```json
{
  "hosting": {
    "redirects": [
      {
        "source": "**",
        "destination": "https://musculoskeletal-us-lab.web.app/quiz-app/",
        "type": 301
      }
    ]
  }
}
```

## ✅ リダイレクトの動作

- **すべてのパス**: `echo-quiz-app.web.app/**` → `musculoskeletal-us-lab.web.app/quiz-app/`
- **クエリパラメータ**: 保持されます（例: `?admin=xxx`）
- **リダイレクトタイプ**: 301（永続的リダイレクト）

## 📋 管理者URLの更新

管理者アクセスURLも新しいメインURLに更新されました：

### 新しい管理者URL（推奨）
- 管理者A: `https://musculoskeletal-us-lab.web.app/quiz-app/?admin=02C5D597-2329-4590-9402-F8303AB21398`
- 管理者B: `https://musculoskeletal-us-lab.web.app/quiz-app/?admin=5518B08E-AEC3-4721-A14A-E6557E11D30B`
- 管理者C: `https://musculoskeletal-us-lab.web.app/quiz-app/?admin=B98019C1-2EA5-47E2-8813-ADC02A005B6C`

### 旧URLからのアクセス
旧URL（`echo-quiz-app.web.app/?admin=xxx`）からアクセスしても、自動的に新しいURLにリダイレクトされます。

## 🎯 移行のメリット

1. **統一管理**: 1つのFirebaseプロジェクトでHTMLサイトとFlutterアプリを管理
2. **シームレスな統合**: 同じドメインで運用することで、認証やセッション管理が統一
3. **SEO向上**: 統一されたドメインで運用することで、SEO効果が向上
4. **運用効率**: デプロイが1回で済み、メンテナンスが容易

## 📝 注意事項

- 旧URL（`echo-quiz-app.web.app`）へのブックマークやリンクは、自動的に新しいURLにリダイレクトされます
- 管理者URLも新しいURLに更新してください
- 今後は新しいメインURL（`musculoskeletal-us-lab.web.app/quiz-app/`）を使用してください

## 🔧 デプロイ方法

### メインサイトへのデプロイ
```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
./deploy-flutter-app.sh
```

### 旧サイトへのリダイレクト設定のデプロイ（初回のみ）
```bash
cd echo-quiz-app
firebase deploy --only hosting --project echo-quiz-app
```

## 📊 移行状況

- ✅ メインURLへの統一完了
- ✅ リダイレクト設定完了
- ✅ 管理者URL更新完了
- ✅ ドキュメント更新完了

