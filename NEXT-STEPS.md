# 次にやるべきこと（チェックリスト）

## ✅ 完了していること

- [x] プラン登録機能の実装
- [x] プラン変更時のCustomer Portalリダイレクト機能の実装
- [x] テストモードでの動作確認
- [x] Firestoreへの保存確認

## 📋 今すぐやるべきこと

### ステップ1: Stripe Customer Portalの設定（必須）

#### 1.1 Stripeダッシュボードにアクセス

1. [Stripeダッシュボード（テスト環境）](https://dashboard.stripe.com/test)にアクセス
2. ログインする

#### 1.2 Customer Portalを有効化

1. 左メニューから「設定」→「Billing」→「Customer Portal」をクリック
2. 「Customer Portalを有効化」ボタンをクリック

#### 1.3 Customer Portalの設定

以下の設定を行います：

**基本設定:**
- ✅ 「顧客情報の更新」を有効化
- ✅ 「支払い方法の更新」を有効化

**サブスクリプション設定:**
- ✅ 「プラン変更を許可」を有効化
- 「プラン変更のタイミング」を選択：
  - **推奨**: 「即座に変更」を選択
  - または「請求期間終了時に変更」を選択
- 「キャンセルを許可」は必要に応じて設定

**請求履歴:**
- ✅ 「請求履歴の表示」を有効化

#### 1.4 Customer Portalのリンクを取得

1. Customer Portalの設定画面で「リンクをコピー」ボタンをクリック
2. 以下のようなURLがコピーされます：
   ```
   https://billing.stripe.com/p/login/[YOUR_PORTAL_LINK]
   ```
3. このURLをメモしておく

#### 1.5 本番環境でも設定（本番環境にデプロイする場合）

1. Stripeダッシュボードの右上で「テストモード」を「本番モード」に切り替え
2. 同じ手順でCustomer Portalを設定
3. 本番環境用のリンクも取得してメモしておく

---

### ステップ2: plan-payment-config.jsを更新（必須）

#### 2.1 ファイルを開く

`plan-payment-config.js`ファイルを開く

#### 2.2 Customer Portal URLを設定

以下の部分を見つけて、取得したURLに置き換える：

```javascript
const CUSTOMER_PORTAL_URL = IS_PRODUCTION ? {
  url: 'https://billing.stripe.com/p/login/[取得した本番環境用のリンク]' // ← ここを更新
} : {
  url: 'https://billing.stripe.com/p/login/[取得したテスト環境用のリンク]' // ← ここを更新
};
```

**例：**
```javascript
const CUSTOMER_PORTAL_URL = IS_PRODUCTION ? {
  url: 'https://billing.stripe.com/p/login/aBc123XyZ789'
} : {
  url: 'https://billing.stripe.com/p/login/tEsT123XyZ789'
};
```

---

### ステップ3: 動作確認（必須）

#### 3.1 テストモードで確認

1. `plans.html?test=true`にアクセス
2. 既にプランに登録済みの状態で、別のプランの「プランを変更する」ボタンをクリック
3. 確認ダイアログが表示されることを確認
4. 「OK」をクリック
5. Customer Portalにリダイレクトされることを確認（設定後）

#### 3.2 通常モードで確認

1. `plans.html`（`?test=true`なし）にアクセス
2. 新規登録の場合：Stripe Payment Linkにリダイレクトされることを確認
3. 既存サブスクリプションがある場合：Customer Portalにリダイレクトされることを確認

---

## 🔮 将来実装するもの（オプション）

### フェーズ2: Stripe Checkout Sessionの実装

**目的**: 初回登録時にCustomer IDとSubscription IDを取得

**必要なもの:**
- Firebase Functionsの設定
- Stripe APIキーの設定

**メリット:**
- Customer IDとSubscription IDを自動的に保存
- Webhookと連携しやすくなる

### フェーズ3: Webhookの実装

**目的**: Stripeのイベントを自動的にFirestoreに反映

**必要なもの:**
- Firebase Functionsの実装
- Webhookエンドポイントの設定

**メリット:**
- プラン変更が自動的にFirestoreに反映される
- 手動での更新が不要になる

---

## 📝 チェックリスト

### 今すぐやること

- [ ] StripeダッシュボードでCustomer Portalを有効化
- [ ] Customer Portalの設定（プラン変更を許可）
- [ ] Customer Portalのリンクを取得（テスト環境）
- [ ] Customer Portalのリンクを取得（本番環境、必要に応じて）
- [ ] `plan-payment-config.js`にCustomer Portal URLを設定
- [ ] 動作確認（テストモード）
- [ ] 動作確認（通常モード）

### 完了したら確認すること

- [ ] プラン変更時にCustomer Portalにリダイレクトされる
- [ ] Customer Portalでプランを変更できる
- [ ] 二重請求が発生しない
- [ ] プラン変更が正しく反映される

---

## ⚠️ 注意事項

1. **Customer Portal URLは環境ごとに異なります**
   - テスト環境と本番環境で別々のURLが必要です
   - 必ず両方設定してください

2. **Customer Portalの設定は重要です**
   - 「プラン変更を許可」が有効になっていないと、プラン変更ができません
   - 「プラン変更のタイミング」で請求のタイミングが決まります

3. **二重請求を防ぐために**
   - 既存のサブスクリプションがある場合、必ずCustomer Portalから変更してください
   - Payment Linkを使用すると、新しいサブスクリプションが作成されてしまいます

---

## 📚 参考資料

- `CUSTOMER-PORTAL-SETUP.md`: Customer Portalの詳細な設定手順
- `STRIPE-SUBSCRIPTION-GUIDE.md`: 将来の実装に関する詳細ガイド

---

## 🆘 困ったときは

1. **Customer Portalにリダイレクトされない**
   - `plan-payment-config.js`のURLが正しく設定されているか確認
   - ブラウザのコンソール（F12）でエラーを確認

2. **Customer Portalでプラン変更ができない**
   - Stripeダッシュボードで「プラン変更を許可」が有効になっているか確認

3. **二重請求が発生する**
   - 既存のサブスクリプションがある場合、Customer Portalから変更しているか確認
   - Payment Linkを使用していないか確認

