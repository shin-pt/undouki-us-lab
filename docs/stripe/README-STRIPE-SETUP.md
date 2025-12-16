# Stripe決済設定ガイド

## ローカル開発環境での動作確認方法

### 方法1: ローカルサーバーを起動する（推奨）

Stripe Payment Linksからのリダイレクトを正しく動作させるには、ローカルサーバーを起動する必要があります。

#### Pythonを使用する場合

```bash
# Python 3の場合
cd /Users/shinyamacbook/Desktop/undouki-us-lab
python3 -m http.server 8000

# ブラウザで以下にアクセス
# http://localhost:8000/plans.html
```

#### Node.jsを使用する場合

```bash
# http-serverをインストール（初回のみ）
npm install -g http-server

# サーバーを起動
cd /Users/shinyamacbook/Desktop/undouki-us-lab
http-server -p 8000

# ブラウザで以下にアクセス
# http://localhost:8000/plans.html
```

### 方法2: Stripe Payment Linksの成功後のURLを設定

1. [Stripeダッシュボード](https://dashboard.stripe.com/test)にアクセス
2. 「商品カタログ」→「Payment Links」を開く
3. 各プランのPayment Linkを編集
4. 「成功後のURL」に以下を設定：

#### ローカル開発環境用
```
http://localhost:8000/plan-success.html?plan=basic
```
または
```
http://localhost:8000/plan-success.html?plan=premium
```

#### 本番環境用
```
https://yourdomain.com/plan-success.html?plan=basic
```
または
```
https://yourdomain.com/plan-success.html?plan=premium
```

## テスト手順

1. ローカルサーバーを起動（上記の方法1を参照）
2. `http://localhost:8000/plans.html`にアクセス
3. プランを選択してStripe Payment Linkにリダイレクト
4. テストカードで決済：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: `12/25`）
   - CVC: 任意の3桁（例: `123`）
5. 決済完了後、`plan-success.html`にリダイレクトされることを確認

## トラブルシューティング

### ERR_CONNECTION_REFUSEDエラーが発生する場合

- ローカルサーバーが起動しているか確認
- ポート番号（8000）が正しいか確認
- Stripe Payment Linksの成功後のURLが正しく設定されているか確認

### プランが更新されない場合

- ブラウザのコンソール（F12）でエラーを確認
- Firebase Authenticationでログインしているか確認
- Firestoreのセキュリティルールを確認

