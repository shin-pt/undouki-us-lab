# 次にやるべきこと（優先順位順）

## ✅ 完了していること

- [x] プラン登録機能の実装
- [x] プラン変更機能の実装
- [x] Customer Portalの設定と統合
- [x] テストモードでの動作確認
- [x] Firestoreへの保存確認

---

## 📋 次にやるべきこと（一つずつ）

### ステップ1: 通常モードでのStripe決済動作確認 ⭐ 最重要

**目的**: 実際のStripe決済フローが正しく動作するか確認する

**手順**:

1. **`plans.html`にアクセス**（`?test=true`なし）
   ```
   http://localhost:8000/plans.html
   ```

2. **プランを選択**
   - 1980円プランまたは2980円プランの「このプランに登録」ボタンをクリック

3. **Stripe Payment Linkにリダイレクトされることを確認**
   - Stripeの決済ページが表示される

4. **テストカードで決済**
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: `12/25`）
   - CVC: 任意の3桁（例: `123`）
   - 郵便番号: 任意（例: `12345`）

5. **決済完了後の動作確認**
   - `plan-success.html`にリダイレクトされる
   - プラン情報がFirestoreに保存される
   - `salon.html`にリダイレクトされる

6. **Firestoreで確認**
   - Firebase Consoleで`users`コレクションを開く
   - `plan`フィールドが正しく設定されているか確認
   - `stripeCustomerId`と`stripeSubscriptionId`が保存されているか確認（現在は保存されない可能性があります）

**確認ポイント**:
- ✅ Stripe Payment Linkにリダイレクトされる
- ✅ テストカードで決済が完了する
- ✅ 決済完了後にプラン情報が保存される

**所要時間**: 約5分

---

### ステップ2: 実際のStripe決済後のプラン変更確認 ⭐ 重要

**目的**: 実際のStripe決済で登録した場合、Customer Portalにリダイレクトされるか確認する

**前提条件**: ステップ1が完了していること

**手順**:

1. **ステップ1で登録したプランでログイン**
   - `plans.html`にアクセス

2. **別のプランの「プランを変更する」ボタンをクリック**

3. **Customer Portalにリダイレクトされることを確認**
   - 確認ダイアログで「OK」をクリック
   - Stripe Customer Portalにリダイレクトされる

4. **Customer Portalでプランを変更**
   - Customer Portalでプランを変更できることを確認

**確認ポイント**:
- ✅ Customer Portalにリダイレクトされる
- ✅ Customer Portalでプランを変更できる
- ✅ 二重請求が発生しない

**所要時間**: 約3分

**注意**: 現在の実装では、`stripeSubscriptionId`がFirestoreに保存されていないため、Customer Portalにリダイレクトされない可能性があります。その場合は、ステップ3（Customer IDの保存）を先に実装する必要があります。

---

### ステップ3: Customer IDとSubscription IDの保存（将来の実装）

**目的**: Stripe決済完了時にCustomer IDとSubscription IDをFirestoreに保存する

**現状**: 
- Payment Linksを使用しているため、Customer IDとSubscription IDを自動的に取得できない
- Stripe Checkout Sessionを使用する必要がある

**実装方法**:
- Firebase FunctionsでStripe Checkout Sessionを作成
- 決済完了時にWebhookでCustomer IDとSubscription IDを取得
- Firestoreに保存

**必要なもの**:
- Firebase Functionsの設定
- Stripe APIキーの設定
- Webhookエンドポイントの実装

**参考資料**: `STRIPE-SUBSCRIPTION-GUIDE.md`

**所要時間**: 約1-2時間（実装時間）

---

### ステップ4: 本番環境の準備（本番デプロイ前）

**目的**: 本番環境で動作するように設定する

**手順**:

1. **Stripeダッシュボードで本番環境用Payment Linksを作成**
   - Stripeダッシュボードの右上で「テストモード」を「本番モード」に切り替え
   - 本番環境用のPayment Linksを作成

2. **本番環境用Customer Portalを設定**
   - 本番モードでCustomer Portalを設定
   - 本番環境用のCustomer Portal URLを取得

3. **`plan-payment-config.js`を更新**
   - 本番環境用のPayment LinksとCustomer Portal URLを設定

4. **ファイルをアップロード**
   - すべてのファイルをWebサーバーにアップロード
   - HTTPSでアクセスできるようにする

**所要時間**: 約30分

---

## 🎯 今すぐやるべきこと

**ステップ1: 通常モードでのStripe決済動作確認**

これが最も重要です。実際の決済フローが正しく動作するか確認してください。

---

## 📝 チェックリスト

### 今すぐ
- [ ] ステップ1: 通常モードでのStripe決済動作確認

### ステップ1完了後
- [ ] ステップ2: 実際のStripe決済後のプラン変更確認

### 本番デプロイ前
- [ ] ステップ4: 本番環境の準備

### 将来の実装（オプション）
- [ ] ステップ3: Customer IDとSubscription IDの保存

---

## ⚠️ 注意事項

1. **ステップ1とステップ2は、実際のStripe決済が必要です**
   - テストカードを使用してください
   - 実際のお金はかかりません（テスト環境の場合）

2. **現在の実装では、Customer IDとSubscription IDが保存されません**
   - Payment Linksを使用しているため
   - ステップ3を実装すると解決します

3. **本番環境にデプロイする前に、十分にテストしてください**
   - テスト環境で動作確認を完了してから
   - 本番環境用の設定を行ってください

