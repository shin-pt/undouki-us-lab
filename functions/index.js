// ローカル開発環境でのみdotenvを読み込む
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// 環境変数からStripeシークレットキーを取得
// 本番環境: Firebase Functionsの環境変数から取得
// ローカル開発: .envファイルから取得（dotenvを使用）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret_key;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY環境変数が設定されていません');
}

const stripe = require('stripe')(stripeSecretKey);

admin.initializeApp();

/**
 * サブスクリプション解約関数
 * 
 * 認証されたユーザーが自分のサブスクリプションを解約できます。
 * Stripe APIを使用してサブスクリプションを解約し、Firestoreを更新します。
 */
exports.cancelSubscription = functions.https.onCall(async (data, context) => {
  // 1. 認証チェック（重要！）
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'ユーザーが認証されていません。ログインしてください。'
    );
  }

  const userId = context.auth.uid;

  try {
    // 2. Firestoreからユーザー情報を取得
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'ユーザー情報が見つかりません。'
      );
    }

    const userData = userDoc.data();
    const subscriptionId = userData.stripeSubscriptionId;

    // 3. サブスクリプションIDの確認
    if (!subscriptionId) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'アクティブなサブスクリプションが見つかりません。'
      );
    }

    // 4. Stripeでサブスクリプションを解約
    // cancel_at_period_end: false で即座に解約
    // cancel_at_period_end: true で請求期間終了時に解約
    const cancelAtPeriodEnd = data.cancelAtPeriodEnd !== false; // デフォルトはtrue（請求期間終了時に解約）

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd
    });

    // 5. Firestoreを更新
    const updateData = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // 即座に解約する場合
    if (!cancelAtPeriodEnd) {
      updateData.plan = null;
      updateData.stripeSubscriptionId = null;
      updateData.planEndDate = admin.firestore.FieldValue.serverTimestamp();
    } else {
      // 請求期間終了時に解約する場合
      updateData.planEndDate = subscription.current_period_end
        ? admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000)
        : admin.firestore.FieldValue.serverTimestamp();
    }

    await admin.firestore()
      .collection('users')
      .doc(userId)
      .update(updateData);

    // 6. 成功レスポンスを返す
    return {
      success: true,
      message: cancelAtPeriodEnd
        ? 'サブスクリプションは請求期間終了時に解約されます。'
        : 'サブスクリプションが解約されました。',
      cancelAt: subscription.cancel_at,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: subscription.current_period_end
    };
  } catch (error) {
    console.error('解約エラー:', error);

    // Stripe APIエラーの場合
    if (error.type === 'StripeInvalidRequestError') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Stripe APIエラー: ' + error.message
      );
    }

    // 既に解約済みの場合
    if (error.code === 'resource_missing' || error.message.includes('No such subscription')) {
      // Firestoreを更新して整合性を保つ
      await admin.firestore()
        .collection('users')
        .doc(userId)
        .update({
          plan: null,
          stripeSubscriptionId: null,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

      throw new functions.https.HttpsError(
        'failed-precondition',
        'このサブスクリプションは既に解約されています。'
      );
    }

    throw new functions.https.HttpsError(
      'internal',
      '解約処理に失敗しました: ' + error.message
    );
  }
});

