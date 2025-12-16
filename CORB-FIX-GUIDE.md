# CORB警告の解消方法

## 現在の状況

CORB（Cross-Origin Read Blocking）警告は、Unsplashの外部画像をCSSの`background-image`として使用していることが原因です。

**重要**: この警告は機能には影響しません。画像は正常に表示されます。

## 警告を解消する方法

### 方法1: 画像をローカルに保存（推奨）

1. **画像をダウンロード**
   - Unsplashの画像URL: `https://images.unsplash.com/photo-1581091222030-41ce94309703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80`
   - ブラウザでこのURLを開いて画像を保存
   - または、以下のコマンドでダウンロード：
     ```bash
     curl -o hero-background.jpg "https://images.unsplash.com/photo-1581091222030-41ce94309703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80"
     ```

2. **画像をプロジェクトに配置**
   - `hero-background.jpg` をプロジェクトルートに保存
   - または、`picture_site/` フォルダに保存

3. **CSSを更新**
   - `index.html` と `picture_site/index.html` のCSSで、UnsplashのURLをローカルパスに変更

### 方法2: 警告を無視する（推奨）

CORB警告は機能に影響しないため、無視しても問題ありません。画像は正常に表示されます。

## 注意事項

- Unsplashの画像を使用する場合は、Unsplashの利用規約に従ってください
- 画像の著作権表示が必要な場合があります
- 本番環境では、画像をローカルに保存することを推奨します（パフォーマンス向上）


