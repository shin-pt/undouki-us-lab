# プロジェクト統合ガイド（更新版）

## ✅ 統合完了状況

✅ `firebase.json`を1つのサイトで運用する設定に統合完了
✅ `firestore.indexes.json`を作成
✅ `.firebaserc`を簡略化（複数サイト設定不要）

## 統合後の構造

```
undouki-us-lab/
├── index.html              # HTMLサイト（ルート `/`）
├── plans.html              # HTMLサイト（ルート `/plans.html`）
├── auth.html               # HTMLサイト（ルート `/auth.html`）
├── functions/              # Firebase Functions (codebase: default)
├── shinbase/               # Firebase Functions (codebase: shinbase)
├── echo-quiz-app/          # Flutter Webアプリ
│   ├── lib/
│   ├── functions/          # Firebase Functions (codebase: echo-quiz-app)
│   └── build/web/          # Flutterビルド出力（デプロイ時に生成）
└── firebase.json            # 統合設定
```

## Firebase Hosting設定（1つのサイト）

統合後、Firebase Hostingは**1つのサイト**で運用されます：

- **URL**: `https://musculoskeletal-us-lab.web.app`
- **HTMLサイト**: ルートパス（`/`, `/plans.html`, `/auth.html`等）
- **Flutterアプリ**: `/quiz-app/`パスで提供

## Firebase Functions設定

3つのcodebaseが統合されています：

1. **default**: `functions/` (Node.js 18)
2. **shinbase**: `shinbase/` (Node.js 22)
3. **echo-quiz-app**: `echo-quiz-app/functions/` (Node.js 22)

## Flutterアプリのビルドとデプロイ

### 重要な設定

Flutterアプリを`/quiz-app/`パスで提供するため、**ビルド時にbase-hrefを指定**する必要があります：

```bash
cd echo-quiz-app
flutter build web --base-href=/quiz-app/
```

### デプロイ手順

#### 1. Flutterアプリをビルド
```bash
cd echo-quiz-app
flutter pub get
flutter build web --base-href=/quiz-app/
```

#### 2. すべてをデプロイ
```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
firebase deploy
```

#### 3. 個別にデプロイする場合

**HTMLサイトのみ**:
```bash
firebase deploy --only hosting
```

**Functionsのみ**:
```bash
firebase deploy --only functions
```

**特定のcodebaseのみ**:
```bash
firebase deploy --only functions:default
firebase deploy --only functions:shinbase
firebase deploy --only functions:echo-quiz-app
```

## アクセスURL

統合後のアクセスURL：

- **HTMLサイト**: 
  - `https://musculoskeletal-us-lab.web.app/`
  - `https://musculoskeletal-us-lab.web.app/plans.html`
  - `https://musculoskeletal-us-lab.web.app/auth.html`

- **Flutterアプリ**: 
  - `https://musculoskeletal-us-lab.web.app/quiz-app/`

## 統合のメリット

✅ **サイト作成が不要**: 複数サイトを作成する必要がなくなりました
✅ **設定がシンプル**: 1つの`firebase.json`で管理
✅ **運用が簡単**: 1つのサイトで両方のアプリを提供
✅ **既存コードへの影響なし**: HTMLサイトのパスは変更不要

## 注意事項

### 1. Flutterアプリのビルド

Flutterアプリをデプロイする前に、**必ずbase-hrefを指定してビルド**してください：

```bash
flutter build web --base-href=/quiz-app/
```

この設定がないと、Flutterアプリの静的アセット（JS、CSS等）が正しく読み込まれません。

### 2. パスの競合

- HTMLサイトのファイル名と`/quiz-app/`パスが競合しないように注意してください
- 例：`quiz-app.html`というファイルがある場合、`/quiz-app.html`と`/quiz-app/`が競合する可能性があります

### 3. 環境変数

- `.env`ファイルは`echo-quiz-app/`内に保持
- Firebase Functionsの環境変数は各codebaseで個別に設定

## トラブルシューティング

### Flutterアプリが表示されない

1. **ビルドを確認**:
   ```bash
   cd echo-quiz-app
   flutter build web --base-href=/quiz-app/
   ls -la build/web/
   ```

2. **base-hrefが正しく設定されているか確認**:
   `echo-quiz-app/build/web/index.html`の`<base href="/quiz-app/">`を確認

3. **静的アセットのパスを確認**:
   ブラウザの開発者ツールでネットワークタブを確認し、404エラーがないか確認

### 静的アセットが読み込まれない

Firebase Hostingのrewrites設定を確認してください。`/quiz-app/**`のパスが`/echo-quiz-app/build/web/index.html`にルーティングされていることを確認。

### Functionsのデプロイエラー

各codebaseの`package.json`とNode.jsバージョンを確認してください。

## 統合チェックリスト

- [x] `firebase.json`の統合設定
- [x] `firestore.indexes.json`の作成
- [x] `.firebaserc`の簡略化
- [ ] Flutterアプリのビルド確認（base-href指定）
- [ ] 動作確認（HTMLサイト）
- [ ] 動作確認（Flutterアプリ `/quiz-app/`）
- [ ] Functionsの動作確認

## 次のステップ

統合が完了したら：

1. **Flutterアプリをビルド**: `flutter build web --base-href=/quiz-app/`
2. **動作確認**: ローカルでテスト
3. **デプロイ**: `firebase deploy`
4. **本番環境で確認**: 各URLにアクセスして動作確認
