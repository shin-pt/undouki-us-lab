# アーカイブ動画閲覧ページ セットアップガイド

## 概要

`archive-viewer.html`は、パスワード保護と期日制限機能を持つアーカイブコンテンツ閲覧ページです。

## 設定方法

### 1. パスワードの変更

`archive-viewer.html`のJavaScriptセクション内で、以下の行を編集してください：

```javascript
const ARCHIVE_PASSWORD = 'archive2026'; // ここを変更
```

### 2. 閲覧期限の設定

以下の行で閲覧期限を設定します（YYYY-MM-DD形式）：

```javascript
const EXPIRY_DATE = '2026-12-31'; // ここを変更
```

期限を過ぎると、自動的に閲覧できなくなります。

### 3. Vimeo動画の追加

Vimeo動画を追加するには、Vimeoの動画IDを取得して、以下の配列に追加してください：

```javascript
const VIMEO_VIDEOS = [
    '123456789',  // Vimeo動画IDを追加
    '987654321',  // 複数追加可能
];
```

**Vimeo動画IDの取得方法：**
1. Vimeoの動画ページのURLを確認
2. URL例: `https://vimeo.com/123456789`
3. 数字部分（`123456789`）が動画IDです

### 4. PDF資料の追加

PDFファイルを追加する手順：

1. **PDFファイルを配置**
   - `archive-pdfs/`ディレクトリにPDFファイルを配置してください
   - 例: `archive-pdfs/セミナー資料1.pdf`

2. **JavaScriptに追加**
   ```javascript
   const PDF_FILES = [
       { name: 'セミナー資料1.pdf', displayName: 'セミナー資料1' },
       { name: 'セミナー資料2.pdf', displayName: 'セミナー資料2' },
   ];
   ```

## セキュリティについて

### 現在の実装

- パスワードはJavaScript内に平文で保存されています
- セッションストレージを使用して認証状態を保持（24時間有効）
- クライアントサイドでの認証のため、技術的な知識があれば回避可能です

### より安全な実装が必要な場合

本番環境でより高いセキュリティが必要な場合は、以下の方法を検討してください：

1. **サーバーサイド認証**
   - Firebase FunctionsやバックエンドAPIを使用
   - パスワードをハッシュ化して保存

2. **Firebase Authentication**
   - Firebase Authenticationを使用してユーザー認証
   - 特定のユーザーのみアクセス可能にする

3. **Firebase Security Rules**
   - FirestoreやStorageのセキュリティルールを使用
   - 認証済みユーザーのみアクセス可能にする

## ファイル構造

```
undouki-us-lab/
├── archive-viewer.html      # アーカイブ閲覧ページ
├── archive-pdfs/            # PDFファイル保存ディレクトリ
│   ├── セミナー資料1.pdf
│   └── セミナー資料2.pdf
└── ARCHIVE_VIEWER_SETUP.md # このファイル
```

## 使用方法

1. 設定を完了後、`archive-viewer.html`をブラウザで開く
2. パスワードを入力して認証
3. 認証成功後、Vimeo動画とPDF資料が表示されます
4. セッションは24時間有効です（ブラウザを閉じても有効）

## トラブルシューティング

### 動画が表示されない場合

- Vimeo動画IDが正しいか確認してください
- Vimeoの埋め込み設定で「埋め込みを許可」が有効になっているか確認してください

### PDFが表示されない場合

- PDFファイルが`archive-pdfs/`ディレクトリに正しく配置されているか確認してください
- ファイル名がJavaScriptの設定と一致しているか確認してください

### 期限切れメッセージが表示される場合

- `EXPIRY_DATE`の日付を確認してください
- 日付形式が`YYYY-MM-DD`になっているか確認してください
