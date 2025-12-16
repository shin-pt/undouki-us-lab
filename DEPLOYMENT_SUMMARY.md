# 統合デプロイ準備完了サマリー

## ✅ 完了した作業

### 1. Flutterアプリのビルド
- ✅ 依存関係の取得完了
- ✅ base-href指定でビルド完了 (`/quiz-app/`)
- ✅ ビルド出力: `echo-quiz-app/build/web/`

### 2. 設定確認
- ✅ `firebase.json`の構文確認完了
- ✅ base-href設定確認: `<base href="/quiz-app/">`
- ✅ Firebase Hosting設定確認完了

### 3. デプロイ準備
- ✅ ドライラン実行完了（Hostingのみ）
- ✅ ビルドファイルの存在確認完了

## 📋 デプロイ手順

### Hostingのみデプロイ（推奨）

```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
firebase deploy --only hosting
```

### すべてをデプロイ（Functionsも含む）

**注意**: Functionsをデプロイするには、FirebaseプロジェクトをBlazeプランにアップグレードする必要があります。

```bash
# Blazeプランにアップグレード後
firebase deploy
```

## 🌐 デプロイ後のアクセスURL

### HTMLサイト
- `https://musculoskeletal-us-lab.web.app/`
- `https://musculoskeletal-us-lab.web.app/plans.html`
- `https://musculoskeletal-us-lab.web.app/auth.html`

### Flutterアプリ
- `https://musculoskeletal-us-lab.web.app/quiz-app/`

## ⚠️ 注意事項

### 1. Functionsのデプロイについて
現在、Firebase Functionsをデプロイするには、Firebaseプロジェクトを**Blazeプラン**にアップグレードする必要があります。

アップグレードURL:
https://console.firebase.google.com/project/musculoskeletal-us-lab/usage/details

### 2. Flutterアプリの再ビルド
Flutterアプリのコードを変更した場合は、必ず再ビルドしてください：

```bash
cd echo-quiz-app
flutter build web --base-href=/quiz-app/
```

### 3. デプロイスクリプトの使用
次回からは、デプロイスクリプトを使用すると便利です：

```bash
./deploy-flutter-app.sh
```

## 🔍 動作確認チェックリスト

デプロイ後、以下を確認してください：

- [ ] HTMLサイトがルートパス（`/`）で表示される
- [ ] Flutterアプリが`/quiz-app/`パスで表示される
- [ ] Flutterアプリの静的アセット（JS、CSS）が正しく読み込まれる
- [ ] Firebase接続が正常に動作する
- [ ] 認証機能が正常に動作する

## 📝 次のステップ

1. **Hostingのみデプロイ**: `firebase deploy --only hosting`
2. **動作確認**: 各URLにアクセスして動作確認
3. **Functionsのデプロイ**（必要に応じて）: Blazeプランにアップグレード後

