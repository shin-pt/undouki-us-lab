# 開発ガイド - 統合後の開発フロー

## ✅ 統合後の開発環境

**はい、エコーアプリ（echo-quiz-app）もここで開発できます！**

統合後も、開発は`echo-quiz-app/`ディレクトリ内で行います。デプロイ時のみ、`quiz-app/`ディレクトリにコピーされます。

## 📁 プロジェクト構造

```
undouki-us-lab/
├── index.html              # HTMLサイト（開発・デプロイ）
├── plans.html              # HTMLサイト（開発・デプロイ）
├── echo-quiz-app/          # Flutterアプリ（開発用）
│   ├── lib/                # ソースコード
│   ├── pubspec.yaml        # 依存関係
│   └── build/web/          # ビルド出力（開発用）
├── quiz-app/               # Flutterアプリ（デプロイ用・自動生成）
│   └── ...                 # echo-quiz-app/build/web/のコピー
└── firebase.json           # 統合設定
```

## 🚀 開発フロー

### 1. Flutterアプリの開発

`echo-quiz-app/`ディレクトリ内で開発を行います：

```bash
# echo-quiz-appディレクトリに移動
cd echo-quiz-app

# 依存関係の取得（初回または依存関係変更時）
flutter pub get

# 開発サーバーで起動（ホットリロード対応）
flutter run -d chrome

# または、特定のポートで起動
flutter run -d chrome --web-port=8080
```

### 2. 開発時の注意点

- **開発は`echo-quiz-app/`内で行う**: 通常のFlutter開発と同じです
- **`quiz-app/`は触らない**: これはデプロイ用の自動生成ディレクトリです
- **`.gitignore`**: `quiz-app/`は既に除外されているので、Gitにコミットされません

### 3. ローカルでの動作確認

#### HTMLサイトの確認
```bash
# ルートディレクトリで
python3 -m http.server 8000
# http://localhost:8000/ にアクセス
```

#### Flutterアプリの確認
```bash
# echo-quiz-appディレクトリで
flutter run -d chrome
# ブラウザで自動的に開きます
```

## 📦 デプロイフロー

### 方法1: デプロイスクリプトを使用（推奨）

```bash
# ルートディレクトリで
./deploy-flutter-app.sh
```

このスクリプトが以下を自動実行します：
1. Flutterアプリをビルド（`base-href=/quiz-app/`指定）
2. ビルド出力を`quiz-app/`にコピー
3. Firebase Hostingにデプロイ

### 方法2: 手動デプロイ

```bash
# 1. Flutterアプリをビルド
cd echo-quiz-app
flutter build web --base-href=/quiz-app/

# 2. ビルド出力をコピー
cd ..
rm -rf quiz-app
mkdir -p quiz-app
cp -r echo-quiz-app/build/web/* quiz-app/

# 3. デプロイ
firebase deploy --only hosting
```

## 🔄 開発とデプロイの違い

| 項目 | 開発時 | デプロイ時 |
|------|--------|-----------|
| **作業ディレクトリ** | `echo-quiz-app/` | `echo-quiz-app/` |
| **ビルド出力** | `echo-quiz-app/build/web/` | `quiz-app/`（コピー） |
| **base-href** | 不要（開発サーバー） | `/quiz-app/`（必須） |
| **アクセスURL** | `http://localhost:xxxx` | `https://...web.app/quiz-app/` |

## 💡 よくある開発シナリオ

### シナリオ1: コードを変更してテスト

```bash
# 1. echo-quiz-app/でコードを編集
cd echo-quiz-app
# lib/screens/xxx.dart を編集

# 2. 開発サーバーで確認（ホットリロード）
flutter run -d chrome
# 変更が自動的に反映されます

# 3. 問題なければデプロイ
cd ..
./deploy-flutter-app.sh
```

### シナリオ2: 依存関係を追加

```bash
cd echo-quiz-app

# pubspec.yamlに依存関係を追加
# 例: http: ^1.1.0

# 依存関係を取得
flutter pub get

# 開発サーバーで確認
flutter run -d chrome
```

### シナリオ3: HTMLサイトとFlutterアプリの両方を開発

```bash
# ターミナル1: HTMLサイト用
python3 -m http.server 8000

# ターミナル2: Flutterアプリ用
cd echo-quiz-app
flutter run -d chrome --web-port=8080
```

## 🛠️ 開発ツール

### VS Codeでの開発

1. **ワークスペースを開く**:
   ```bash
   code /Users/shinyamacbook/Desktop/undouki-us-lab
   ```

2. **Flutter拡張機能を使用**:
   - `echo-quiz-app/`ディレクトリを開く
   - Flutter拡張機能が自動的に認識します
   - デバッグ実行が可能です

### 環境変数の設定

Flutterアプリの環境変数は`echo-quiz-app/.env`に設定します：

```bash
cd echo-quiz-app
cp .env.example .env
# .envファイルを編集
```

## 📝 重要なポイント

### ✅ 開発時のベストプラクティス

1. **常に`echo-quiz-app/`で開発**: 統合後も開発場所は変わりません
2. **`quiz-app/`は無視**: 自動生成されるので編集しない
3. **デプロイ前にテスト**: ローカルで動作確認してからデプロイ
4. **base-hrefを忘れずに**: デプロイ時は必ず`--base-href=/quiz-app/`を指定

### ⚠️ 注意事項

1. **`quiz-app/`はGitにコミットしない**: `.gitignore`に追加済み
2. **ビルド出力の場所**: `echo-quiz-app/build/web/`は開発用、`quiz-app/`はデプロイ用
3. **Firebase設定**: `echo-quiz-app/.firebaserc`は別プロジェクト用なので、統合後は使用しません

## 🎯 まとめ

- ✅ **開発**: `echo-quiz-app/`ディレクトリで通常通り開発
- ✅ **デプロイ**: `./deploy-flutter-app.sh`で自動化
- ✅ **統合**: 1つのプロジェクトで両方のアプリを管理
- ✅ **シンプル**: 開発フローは統合前と同じ

統合後も、開発の方法は変わりません！`echo-quiz-app/`ディレクトリで開発を続けられます。

