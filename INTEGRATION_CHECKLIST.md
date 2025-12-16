# 統合後の動作確認チェックリスト（更新版）

## ✅ 統合完了項目

- [x] `firebase.json`を1つのサイトで運用する設定に統合
- [x] `firestore.indexes.json`を作成
- [x] `.firebaserc`を簡略化
- [x] Flutterアプリデプロイ用スクリプトを作成

## 事前準備

### 1. バックアップ確認
- [ ] Gitで現在の状態をコミット済み
- [ ] 重要なファイルのバックアップを取得済み

### 2. 環境確認
- [ ] Firebase CLIがインストールされている
- [ ] Flutter SDKがインストールされている
- [ ] Node.jsがインストールされている（Functions用）

## Firebase設定の確認

### 1. firebase.jsonの確認
- [x] `firebase.json`が統合設定に更新されている
- [ ] JSONの構文エラーがない（`firebase deploy --dry-run`で確認）

### 2. .firebasercの確認
- [x] Firebaseプロジェクトが正しく設定されている（`musculoskeletal-us-lab`）

### 3. Firestore設定
- [x] `firestore.indexes.json`が存在する
- [ ] `firestore.rules`が適切に設定されている

## HTMLサイトの動作確認

### ローカル確認
```bash
# Python HTTPサーバーで起動
python3 -m http.server 8000
```

- [ ] `http://localhost:8000/index.html`が表示される
- [ ] `http://localhost:8000/plans.html`が表示される
- [ ] `http://localhost:8000/auth.html`が表示される
- [ ] 画像が正しく表示される（`picture_site/logo.png`等）
- [ ] JavaScriptファイルが読み込まれる
- [ ] Firebase認証が動作する
- [ ] Stripe決済リンクが正しく設定されている

### デプロイ確認
```bash
firebase deploy --only hosting
```

- [ ] デプロイが成功する
- [ ] 本番環境でHTMLサイトが表示される
- [ ] すべてのページが正常に動作する

## Flutterアプリの動作確認

### ビルド確認（重要）
```bash
cd echo-quiz-app
flutter pub get
flutter build web --base-href=/quiz-app/
```

- [ ] ビルドが成功する
- [ ] エラーや警告がない
- [ ] `build/web/`ディレクトリが生成される
- [ ] `build/web/index.html`の`<base href="/quiz-app/">`が正しく設定されている

### ローカル確認

#### 方法1: Flutter開発サーバー（推奨）
```bash
cd echo-quiz-app
flutter run -d chrome --web-port=8080 --web-hostname=localhost
```
その後、ブラウザで `http://localhost:8080` にアクセス

- [ ] アプリが起動する
- [ ] ホーム画面が表示される
- [ ] クイズ機能が動作する
- [ ] Firebase接続が正常に動作する
- [ ] 画像が正しく読み込まれる

#### 方法2: ビルド後の確認
```bash
cd echo-quiz-app
flutter build web --base-href=/quiz-app/
cd build/web
python3 -m http.server 9000
```
その後、ブラウザで `http://localhost:9000` にアクセス

- [ ] アプリが表示される
- [ ] すべての機能が正常に動作する

### デプロイ確認

#### デプロイスクリプトを使用（推奨）
```bash
./deploy-flutter-app.sh
```

#### 手動デプロイ
```bash
cd echo-quiz-app
flutter build web --base-href=/quiz-app/
cd ..
firebase deploy --only hosting
```

- [ ] デプロイが成功する
- [ ] `https://musculoskeletal-us-lab.web.app/quiz-app/`でアプリが表示される
- [ ] すべての機能が正常に動作する
- [ ] 静的アセット（JS、CSS、画像）が正しく読み込まれる

## Firebase Functionsの動作確認

### 各codebaseの確認

#### default (functions/)
```bash
cd functions
npm install
npm run lint
```

- [ ] 依存関係がインストールされる
- [ ] lintエラーがない
- [ ] `index.js`が存在する

#### shinbase
```bash
cd shinbase
npm install
npm run lint
```

- [ ] 依存関係がインストールされる
- [ ] lintエラーがない
- [ ] `index.js`が存在する

#### echo-quiz-app/functions
```bash
cd echo-quiz-app/functions
npm install
```

- [ ] 依存関係がインストールされる
- [ ] `index.js`が存在する

### デプロイ確認
```bash
# すべてのFunctions
firebase deploy --only functions

# または個別に
firebase deploy --only functions:default
firebase deploy --only functions:shinbase
firebase deploy --only functions:echo-quiz-app
```

- [ ] デプロイが成功する
- [ ] 各Functionsが正常に動作する
- [ ] エラーログがない

## 統合後の動作確認

### 1. パスの競合確認
- [ ] HTMLサイトとFlutterアプリのパスが競合していない
- [ ] `/quiz-app/`パスでFlutterアプリが正しく表示される
- [ ] ルートパス（`/`）でHTMLサイトが正しく表示される

### 2. Firebase接続確認
- [ ] HTMLサイトからFirebase接続が正常
- [ ] FlutterアプリからFirebase接続が正常
- [ ] Firestoreデータが正しく読み書きできる

### 3. 認証確認
- [ ] HTMLサイトの認証が動作する
- [ ] Flutterアプリの認証が動作する
- [ ] ユーザーデータが正しく保存される

### 4. 決済確認
- [ ] Stripe決済が正常に動作する
- [ ] 決済完了後のリダイレクトが正しい

## パフォーマンス確認

- [ ] HTMLサイトの読み込み速度が適切
- [ ] Flutterアプリの初回読み込み速度が適切（`/quiz-app/`）
- [ ] 画像の読み込みが最適化されている
- [ ] キャッシュ設定が適切

## セキュリティ確認

- [ ] Firestoreルールが適切に設定されている
- [ ] Storageルールが適切に設定されている
- [ ] HTTPSが強制されている
- [ ] セキュリティヘッダーが設定されている（Flutterアプリ `/quiz-app/**`）

## エラー対応

### よくあるエラーと対処法

#### 1. "Build directory not found"
Flutterアプリをビルドしてください：
```bash
cd echo-quiz-app
flutter build web --base-href=/quiz-app/
```

#### 2. Flutterアプリの静的アセットが読み込まれない
base-hrefが正しく設定されているか確認：
```bash
# ビルド後
cat echo-quiz-app/build/web/index.html | grep base
# <base href="/quiz-app/"> が表示されることを確認
```

#### 3. Functionsのデプロイエラー
各codebaseの`package.json`とNode.jsバージョンを確認してください。

#### 4. Firestoreルールエラー
`firestore.rules`の構文を確認してください。

## 完了確認

すべてのチェック項目が完了したら：

- [ ] 本番環境でHTMLサイトが正常に動作している（`/`）
- [ ] 本番環境でFlutterアプリが正常に動作している（`/quiz-app/`）
- [ ] すべてのFunctionsが正常に動作している
- [ ] エラーログに問題がない
- [ ] ユーザーからの報告がない

## 次のステップ

統合が完了したら：

1. **Firestoreルールの統合**: 2つのルールファイルを1つに統合することを検討
2. **Firebaseプロジェクトの統一**: 必要に応じてプロジェクトを統一
3. **CI/CDの設定**: 自動デプロイの設定を検討
4. **ドキュメントの更新**: README等を更新
