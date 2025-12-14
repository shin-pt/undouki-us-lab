/**
 * プラン登録 - Stripe Payment Links設定ファイル
 *
 * このファイルには、各プランに対応するStripe Payment Link URLを記載します。
 *
 * セットアップ手順:
 * 1. Stripeダッシュボード (https://dashboard.stripe.com/test) にアクセス
 * 2. 左メニュー「商品カタログ」→「Payment Links」
 * 3. 各プラン用のPayment Linkを作成（サブスクリプション）
 * 4. 作成したURLをこのファイルに追加
 *
 * Customer Portalの設定:
 * 1. Stripeダッシュボード → 「設定」→「Billing」→「Customer Portal」
 * 2. プラン変更を許可する設定にする
 * 3. Customer Portalのリンクを取得して、CUSTOMER_PORTAL_URLに設定
 *
 * テスト環境と本番環境の切り替え:
 * - ローカル/テスト: IS_PRODUCTION = false
 * - 本番環境: IS_PRODUCTION = true
 */

// 環境判定（本番環境かどうか）
// file://プロトコルやlocalhost、127.0.0.1の場合はテスト環境
const hostname = window.location.hostname || '';
const protocol = window.location.protocol || '';
const IS_PRODUCTION = hostname !== 'localhost' &&
                      hostname !== '127.0.0.1' &&
                      hostname !== '' &&
                      protocol !== 'file:';

/**
 * プランIDとStripe Payment Linkのマッピング
 *
 * 各エントリーの形式:
 * 'plan_id': 'https://buy.stripe.com/test_XXXXX' (テスト環境)
 * 'plan_id': 'https://buy.stripe.com/XXXXX' (本番環境)
 */
const PLAN_PAYMENT_LINKS = IS_PRODUCTION ? {
  // ==========================================
  // 本番環境用 Payment Links
  // ==========================================
  // 注意: 本番環境のPayment Linksは、Stripeダッシュボードで
  // 本番モードに切り替えてから作成してください

  'basic': 'https://buy.stripe.com/14A14ncel0sQ6dA7bMeME1y', // 1980円プラン（本番環境）
  'premium': 'https://buy.stripe.com/fZu4gz929b7ufOa7bMeME1z' // 2980円プラン（本番環境）

} : {
  // ==========================================
  // テスト環境用 Payment Links
  // ==========================================
  // Stripeダッシュボードのテストモードで作成したPayment Linksを記載

  'basic': 'https://buy.stripe.com/test_bJe9ATfqx6Re59w3ZAeME02', // 1980円プラン（テスト用）
  'premium': 'https://buy.stripe.com/test_00w8wP4LT1wUcBYeEeeME03' // 2980円プラン（テスト用）
};

/**
 * Stripe Customer Portal URL
 * 
 * プラン変更時に使用するCustomer PortalのURL
 * Stripeダッシュボードで設定したURLを記載してください
 */
const CUSTOMER_PORTAL_URL = IS_PRODUCTION ? {
  // 本番環境用 Customer Portal URL
  url: 'https://billing.stripe.com/p/login/dRmeVd2DL2AYdG27bMeME00' // 本番環境用（設定済み）
} : {
  // テスト環境用 Customer Portal URL
  url: 'https://billing.stripe.com/p/login/test_dRmeVd2DL2AYdG27bMeME00' // テスト環境用（設定済み）
};

/**
 * プラン登録処理
 * @param {string} planId - プランID ('basic' または 'premium')
 * @param {string} userId - FirebaseユーザーID
 * @param {string} userEmail - ユーザーのメールアドレス
 */
function registerPlan(planId, userId, userEmail) {
  // Payment Linkを取得
  const paymentLink = PLAN_PAYMENT_LINKS[planId];

  if (!paymentLink) {
    console.error(`Payment Link not found for plan: ${planId}`);
    alert('このプランの登録リンクが設定されていません。管理者にお問い合わせください。');
    return;
  }

  // Payment Linkが仮のものでないかチェック
  if (paymentLink.includes('XXXXX') || paymentLink.includes('REPLACE')) {
    console.error(`Payment Link not configured for plan: ${planId}`);
    alert('このプランの登録設定がまだ完了していません。しばらくお待ちください。');
    return;
  }

  // プラン登録前に情報をLocalStorageに保存（成功時の処理用）
  try {
    localStorage.setItem('pending_plan_registration', planId);
    localStorage.setItem('pending_plan_user_id', userId);
    localStorage.setItem('pending_plan_user_email', userEmail);
    localStorage.setItem('plan_registration_timestamp', Date.now().toString());
    console.log(`📝 Pending plan registration saved: ${planId} for user ${userId}`);
  } catch (e) {
    console.warn('⚠️ Failed to save pending plan registration:', e);
  }

  // Stripe Payment Linkにリダイレクト
  // 注意: Stripe Payment LinksのURLパラメータでメタデータを渡すことも可能
  // 例: ${paymentLink}?client_reference_id=${userId}
  console.log(`🎯 Redirecting to payment page for plan: ${planId}`);
  window.location.href = paymentLink;
}

/**
 * プラン登録が完了したかチェック（決済成功ページから呼び出し）
 * @returns {Object|null} 登録情報、またはnull
 */
function getPendingPlanRegistration() {
  try {
    const planId = localStorage.getItem('pending_plan_registration');
    const userId = localStorage.getItem('pending_plan_user_id');
    const userEmail = localStorage.getItem('pending_plan_user_email');
    const timestamp = localStorage.getItem('plan_registration_timestamp');

    if (planId && userId) {
      return {
        planId: planId,
        userId: userId,
        userEmail: userEmail,
        timestamp: timestamp ? parseInt(timestamp) : null
      };
    }
    return null;
  } catch (e) {
    console.warn('⚠️ Failed to get pending plan registration:', e);
    return null;
  }
}

/**
 * プラン登録情報をクリア
 */
function clearPendingPlanRegistration() {
  try {
    localStorage.removeItem('pending_plan_registration');
    localStorage.removeItem('pending_plan_user_id');
    localStorage.removeItem('pending_plan_user_email');
    localStorage.removeItem('plan_registration_timestamp');
    console.log('📝 Pending plan registration cleared');
  } catch (e) {
    console.warn('⚠️ Failed to clear pending plan registration:', e);
  }
}

