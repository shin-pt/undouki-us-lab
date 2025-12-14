# セットアップガイド

## ローカル開発環境の起動方法

### 最も簡単な方法：Pythonを使用

1. ターミナルを開く
2. 以下のコマンドを実行：

```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
python3 -m http.server 8000
```

3. ブラウザで以下にアクセス：
   - `http://localhost:8000/plans.html`
   - `http://localhost:8000/salon.html`
   - `http://localhost:8000/member.html`

### 別のポートを使用する場合

```bash
python3 -m http.server 3000
# ブラウザで http://localhost:3000/plans.html にアクセス
```

## 本番環境で動作させる場合

### 前提条件

- 実際のドメインが必要（例: `https://yourdomain.com`）
- Stripeの本番環境用Payment Linksが必要

### 設定手順

1. **Stripeダッシュボードで本番環境用Payment Linksを作成**
   - [Stripeダッシュボード](https://dashboard.stripe.com/)にアクセス
   - 右上の「テストモード」を「本番モード」に切り替え
   - 「商品カタログ」→「Payment Links」で本番環境用のPayment Linksを作成

2. **成功後のURLを設定**
   - 1980円プラン: `https://yourdomain.com/plan-success.html?plan=basic`
   - 2980円プラン: `https://yourdomain.com/plan-success.html?plan=premium`

3. **`plan-payment-config.js`を更新**
   - 本番環境用のPayment LinksのURLを設定

4. **ファイルをアップロード**
   - すべてのファイルをWebサーバーにアップロード
   - HTTPSでアクセスできるようにする

### 注意事項

⚠️ **本番環境では実際の決済が発生します**
- テスト環境で十分に動作確認してから本番環境に移行してください
- 本番環境用のPayment Linksは、テストカードでは動作しません

## トラブルシューティング

### ローカルサーバーが起動しない場合

1. **Pythonがインストールされているか確認**
   ```bash
   python3 --version
   ```

2. **ポートが使用中の場合**
   - 別のポート番号を試す（例: 3000, 8080）

3. **ファイルのパスが正しいか確認**
   - `cd`コマンドで正しいディレクトリに移動しているか確認

### `file://`プロトコルで開いている場合

`file://`プロトコルで直接HTMLファイルを開くと、一部の機能が制限されます：
- LocalStorageは動作します
- Stripeからのリダイレクトは動作しません

**解決策：**
- ローカルサーバーを使用する（推奨）
- または、本番環境で動作させる

## 推奨される開発フロー

1. **ローカル開発環境で動作確認**
   - ローカルサーバーを起動
   - テスト環境用のStripe Payment Linksを使用
   - テストカードで決済をテスト

2. **本番環境にデプロイ**
   - 十分にテストが完了したら
   - 本番環境用のStripe Payment Linksを設定
   - 実際のドメインにアップロード

