# HTMLサイトとFlutterアプリのリンク設定ガイド

## ✅ 実装完了

HTMLサイトとFlutterアプリ（エコークイズアプリ）を相互リンクで接続しました。

## 🔗 追加したリンク

### HTMLサイト → Flutterアプリ

以下のページにエコークイズアプリへのリンクを追加しました：

1. **index.html**（メインページ）
   - メインナビゲーションに追加（グラデーション背景のボタン）
   - ユーザーメニューに追加

2. **plans.html**（プランページ）
   - ナビゲーションメニューに追加

3. **salon.html**（オンラインサロン）
   - ナビゲーションメニューに追加

4. **member.html**（マイページ）
   - ナビゲーションメニューに追加

5. **echo-videos.html**（エコー動画）
   - ナビゲーションメニューに追加

### Flutterアプリ → HTMLサイト

Flutterアプリの公式サイトリンクを修正しました：
- 以前: `https://musculoskeletal-us-lab.com/`
- 現在: `/`（相対パス、同じドメイン内のHTMLサイト）

## 📍 リンクのURL

### HTMLサイトからFlutterアプリへ
```
/quiz-app/
```

### FlutterアプリからHTMLサイトへ
```
/
```

## 🎨 スタイリング

### index.htmlのメインナビゲーション
エコークイズリンクはグラデーション背景で目立つように設定：
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
padding: 8px 16px;
border-radius: 20px;
font-weight: 600;
```

### ユーザーメニュー内
エコークイズリンクは特別なスタイルで表示：
```css
background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
border-left: 3px solid #667eea;
```

## 🔄 動作確認

### HTMLサイトからFlutterアプリへ
1. 任意のHTMLページにアクセス
2. ナビゲーションメニューの「エコークイズ」をクリック
3. `/quiz-app/`に遷移してFlutterアプリが表示される

### FlutterアプリからHTMLサイトへ
1. Flutterアプリを開く
2. ホーム画面の「公式サイト」セクションをタップ
3. `/`に遷移してHTMLサイトのトップページが表示される

## 📝 注意事項

1. **相対パスを使用**: 同じドメイン内なので相対パス（`/`、`/quiz-app/`）を使用
2. **デプロイ後の確認**: デプロイ後、実際のURLで動作確認してください
3. **モバイル対応**: リンクはモバイルでも正常に動作します

## 🚀 デプロイ

変更をデプロイするには：

```bash
# HTMLサイトの変更をデプロイ
firebase deploy --only hosting

# または、Flutterアプリも含めてデプロイ
./deploy-flutter-app.sh
```

## ✨ 今後の拡張

必要に応じて、以下のリンクも追加できます：

- Flutterアプリの特定の画面へのリンク（例: `/quiz-app/#/category/upper-limb`）
- HTMLサイトの特定のページへのリンク（例: `/plans.html`）
- アンカーリンク（例: `/quiz-app/#about`）

