# Stripeサブスクリプション管理ガイド

## アーキテクチャ概要

### 推奨される実装フロー

1. **初回登録時**
   - Stripe Checkout Sessionを使用
   - Customer IDとSubscription IDを取得
   - Firestoreに保存

2. **プラン変更時**
   - Stripe Customer Portalにリダイレクト
   - ユーザーが自分でプランを変更
   - Stripeが自動的に請求を調整

3. **Webhook処理**
   - Firebase FunctionsでWebhookを受信
   - サブスクリプション変更時にFirestoreを更新

## ステップ1: Stripe Customer Portalの設定

### 1.1 Stripeダッシュボードで設定

1. [Stripeダッシュボード](https://dashboard.stripe.com/test)にアクセス
2. 「設定」→「Billing」→「Customer Portal」を開く
3. 以下の設定を行う：
   - **プラン変更を許可**: 有効化
   - **プラン変更のタイミング**: 「即座に変更」または「請求期間終了時に変更」
   - **キャンセルを許可**: 必要に応じて設定

### 1.2 Customer Portalのリンクを取得

Customer Portalの設定が完了すると、以下のようなリンクが生成されます：

```
https://billing.stripe.com/p/login/[YOUR_PORTAL_LINK]
```

このリンクを`plan-payment-config.js`に追加します。

## ステップ2: Stripe Checkout Sessionの実装（将来）

初回登録時にCustomer IDを取得するため、Stripe Checkout Sessionを使用します。

### 2.1 Firebase Functionsの実装

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = context.auth.uid;
  const planId = data.planId; // 'basic' or 'premium'
  
  // プランIDから価格IDを取得
  const priceId = planId === 'basic' 
    ? 'price_xxxxx_basic' // Stripeで作成した価格ID
    : 'price_xxxxx_premium';

  try {
    // Checkout Sessionを作成
    const session = await stripe.checkout.sessions.create({
      customer_email: context.auth.token.email,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `https://yourdomain.com/plan-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://yourdomain.com/plans.html`,
      metadata: {
        userId: userId,
        planId: planId
      }
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create checkout session');
  }
});
```

### 2.2 フロントエンドでの使用

```javascript
// plans.html
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js';

const functions = getFunctions(app);
const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

async function createStripeCheckout(plan) {
  try {
    const result = await createCheckoutSession({ planId: plan });
    window.location.href = result.data.url;
  } catch (error) {
    console.error('Error:', error);
    showMessage('決済セッションの作成に失敗しました。', 'error');
  }
}
```

## ステップ3: Webhookの実装

### 3.1 Firebase FunctionsでWebhookエンドポイントを作成

```javascript
// functions/index.js
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // イベントタイプに応じて処理
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleCheckoutSessionCompleted(session) {
  const userId = session.metadata.userId;
  const planId = session.metadata.planId;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  // Firestoreを更新
  await admin.firestore().collection('users').doc(userId).update({
    plan: planId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    planStartDate: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

async function handleSubscriptionUpdated(subscription) {
  const customerId = subscription.customer;
  
  // Customer IDからユーザーを検索
  const usersSnapshot = await admin.firestore()
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .get();

  if (usersSnapshot.empty) {
    console.error('User not found for customer:', customerId);
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  const priceId = subscription.items.data[0].price.id;
  
  // 価格IDからプランIDを判定
  const planId = priceId.includes('basic') ? 'basic' : 'premium';

  await userDoc.ref.update({
    plan: planId,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

async function handleSubscriptionDeleted(subscription) {
  const customerId = subscription.customer;
  
  const usersSnapshot = await admin.firestore()
    .collection('users')
    .where('stripeCustomerId', '==', customerId)
    .get();

  if (usersSnapshot.empty) {
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  
  await userDoc.ref.update({
    plan: null,
    stripeSubscriptionId: null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
}
```

### 3.2 Webhookエンドポイントの設定

1. StripeダッシュボードでWebhookエンドポイントを追加
2. エンドポイントURL: `https://your-region-your-project.cloudfunctions.net/stripeWebhook`
3. 監視するイベント:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## ステップ4: フロントエンドの実装

### 4.1 既存サブスクリプションのチェック

```javascript
// plans.html
async function checkExistingSubscription() {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return {
      hasSubscription: !!userData.stripeSubscriptionId,
      customerId: userData.stripeCustomerId,
      subscriptionId: userData.stripeSubscriptionId
    };
  }
  return null;
}
```

### 4.2 Customer Portalへのリダイレクト

```javascript
// plans.html
async function redirectToCustomerPortal() {
  const subscription = await checkExistingSubscription();
  if (!subscription || !subscription.customerId) {
    showMessage('サブスクリプション情報が見つかりません。', 'error');
    return;
  }

  // Firebase Functionsを呼び出してCustomer Portalセッションを作成
  const functions = getFunctions(app);
  const createPortalSession = httpsCallable(functions, 'createPortalSession');
  
  try {
    const result = await createPortalSession({
      customerId: subscription.customerId,
      returnUrl: window.location.origin + '/plans.html'
    });
    window.location.href = result.data.url;
  } catch (error) {
    console.error('Error:', error);
    showMessage('Customer Portalへのアクセスに失敗しました。', 'error');
  }
}
```

## 実装の優先順位

### フェーズ1: 基本実装（現在）
1. ✅ Stripe Payment Linksを使用した初回登録
2. ✅ テストモードでの動作確認
3. ⏳ Customer Portalの設定と統合

### フェーズ2: 改善実装（次）
1. Stripe Checkout Sessionを使用した初回登録
2. Customer IDとSubscription IDの保存
3. Customer Portalへのリダイレクト機能

### フェーズ3: 完全実装（将来）
1. Firebase FunctionsでWebhookを実装
2. サブスクリプション変更の自動同期
3. 請求履歴の管理

## 注意事項

⚠️ **重要**
- Payment Linksは新しいサブスクリプションを作成するため、プラン変更には不向き
- プラン変更にはCustomer PortalまたはStripe APIを使用する必要がある
- Webhookの実装により、StripeとFirestoreの同期が自動化される

