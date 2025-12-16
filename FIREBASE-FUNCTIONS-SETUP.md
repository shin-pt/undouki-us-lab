# Firebase Functions セットアップガイド

## 概要

このガイドでは、サブスクリプション解約機能を実装するためのFirebase Functionsのセットアップ手順を説明します。

## 前提条件

- Node.js 18以上がインストールされていること
- Firebase CLIがインストールされていること
- Firebaseプロジェクトにアクセスできること

## セットアップ手順

### ステップ1: Firebase CLIのインストール（まだの場合）

```bash
npm install -g firebase-tools
```

### ステップ2: Firebaseにログイン

```bash
firebase login
```

ブラウザが開き、Googleアカウントでログインします。

### ステップ3: Firebaseプロジェクトを初期化

```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
firebase init functions
```

以下の選択肢を選びます：
- **Language**: JavaScript
- **ESLint**: Yes（推奨）
- **Install dependencies**: Yes

### ステップ4: 依存関係のインストール

```bash
cd functions
npm install
```

これで、`package.json`に記載されている以下のパッケージがインストールされます：
- `firebase-admin`
- `firebase-functions`
- `stripe`

### ステップ5: Stripeシークレットキーの設定

#### テスト環境用

```bash
firebase functions:config:set stripe.secret_key="sk_test_YOUR_TEST_KEY"
```

#### 本番環境用（後で設定）

```bash
firebase functions:config:set stripe.secret_key="sk_live_YOUR_LIVE_KEY"
```

**注意**: Stripeシークレットキーは、Stripeダッシュボードの「開発者」→「APIキー」から取得できます。

### ステップ6: Firebase Functionsのデプロイ

```bash
cd functions
firebase deploy --only functions
```

初回デプロイには数分かかる場合があります。

### ステップ7: 動作確認

1. `member.html`または`plans.html`にアクセス
2. プランに登録済みのユーザーでログイン
3. 「サブスクリプションを解約する」ボタンが表示されることを確認
4. ボタンをクリックして解約を実行
5. 確認ダイアログで「OK」をクリック
6. 解約が成功することを確認

## トラブルシューティング

### エラー: "Function not found"

**原因**: Firebase Functionsがデプロイされていない、または関数名が間違っている

**解決方法**:
1. `firebase deploy --only functions`を実行
2. Firebase ConsoleでFunctionsがデプロイされているか確認
3. 関数名が`cancelSubscription`であることを確認

### エラー: "User must be authenticated"

**原因**: ユーザーがログインしていない

**解決方法**:
1. `auth.html`でログインする
2. ログイン後に`member.html`または`plans.html`にアクセス

### エラー: "Stripe APIエラー"

**原因**: Stripeシークレットキーが正しく設定されていない、または無効

**解決方法**:
1. `firebase functions:config:get`で設定を確認
2. StripeダッシュボードでAPIキーが有効か確認
3. テスト環境と本番環境のキーを間違えていないか確認

### エラー: "No active subscription found"

**原因**: Firestoreに`stripeSubscriptionId`が保存されていない

**解決方法**:
1. Firebase Consoleで`users`コレクションを確認
2. 該当ユーザーの`stripeSubscriptionId`フィールドを確認
3. Payment Linksで登録した場合、`stripeSubscriptionId`は自動保存されないため、Customer Portalから解約する必要があります

## 関数の詳細

### cancelSubscription

**説明**: ユーザーのサブスクリプションを解約します。

**パラメータ**:
- `cancelAtPeriodEnd` (boolean, オプション): 
  - `true`（デフォルト）: 請求期間終了時に解約
  - `false`: 即座に解約

**戻り値**:
```javascript
{
  success: true,
  message: "サブスクリプションは請求期間終了時に解約されます。",
  cancelAt: null,
  cancelAtPeriodEnd: true,
  currentPeriodEnd: 1234567890
}
```

**エラー**:
- `unauthenticated`: ユーザーが認証されていない
- `not-found`: ユーザー情報が見つからない
- `failed-precondition`: アクティブなサブスクリプションが見つからない
- `invalid-argument`: Stripe APIエラー
- `internal`: その他のエラー

## セキュリティ

- ✅ Stripeシークレットキーはサーバー側のみで使用（クライアント側からは見えない）
- ✅ Firebase Authenticationによる認証チェック
- ✅ ユーザーは自分のサブスクリプションのみ解約可能
- ✅ Firestore Security Rulesとの連携

## 次のステップ

1. Webhookの実装（`STRIPE-SUBSCRIPTION-GUIDE.md`を参照）
   - Stripe側の変更を自動的にFirestoreに反映
   - より確実な同期が可能

2. 解約確認メールの送信
   - Firebase Functionsでメール送信機能を追加

3. 解約理由の収集
   - 解約時に理由を入力できるフォームを追加

## 参考資料

- [Firebase Functions ドキュメント](https://firebase.google.com/docs/functions)
- [Stripe API ドキュメント](https://stripe.com/docs/api)
- [STRIPE-SUBSCRIPTION-GUIDE.md](./STRIPE-SUBSCRIPTION-GUIDE.md)

