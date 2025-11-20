/**
 * エコー動画販売 - Stripe Payment Links設定ファイル
 *
 * このファイルには、各動画IDに対応するStripe Payment Link URLを記載します。
 *
 * セットアップ手順:
 * 1. Stripeダッシュボード (https://dashboard.stripe.com/test) にアクセス
 * 2. 左メニュー「商品カタログ」→「Payment Links」
 * 3. 各動画用のPayment Linkを作成
 * 4. 作成したURLをこのファイルに追加
 *
 * テスト環境と本番環境の切り替え:
 * - ローカル/テスト: IS_PRODUCTION = false
 * - 本番環境: IS_PRODUCTION = true
 */

// 環境判定（本番環境かどうか）
const IS_PRODUCTION = window.location.hostname !== 'localhost' &&
                      !window.location.hostname.includes('127.0.0.1');

// Stripe公開可能キー（フロントエンドで使用してもOK）
const STRIPE_CONFIG = {
  publishableKey: IS_PRODUCTION
    ? 'pk_live_XXXXX_REPLACE_WITH_YOUR_LIVE_KEY' // 本番用
    : 'pk_test_51Rg2WEFGvfs9wnBYXXXXX_REPLACE_WITH_YOUR_TEST_KEY' // テスト用
};

/**
 * 動画IDとStripe Payment Linkのマッピング
 *
 * 各エントリーの形式:
 * 'video_id': 'https://buy.stripe.com/test_XXXXX' (テスト環境)
 * 'video_id': 'https://buy.stripe.com/XXXXX' (本番環境)
 */
const VIDEO_PAYMENT_LINKS = IS_PRODUCTION ? {
  // ==========================================
  // 本番環境用 Payment Links
  // ==========================================
  // 注意: 本番環境のPayment Linksは、Stripeダッシュボードで
  // 本番モードに切り替えてから作成してください

  // 上肢（14本） - 観察動画 ¥800
  'shoulder_ssp_tendon': 'https://buy.stripe.com/6oUdR90vDcby31o0NoeME05', // 棘上筋・肩甲上神経の観察
  'shoulder_isp_muscle': 'https://buy.stripe.com/28E9ATdip8ZmbxU0NoeME06', // 棘下筋・棘下筋枝の観察
  'coracobrachialis': 'https://buy.stripe.com/7sYcN56U1ejGfOa0NoeME07', // 烏口腕筋・筋皮神経の観察
  'brachialis': 'https://buy.stripe.com/dRmeVdbahdfCatQ7bMeME08', // 上腕筋・筋皮神経の観察
  'biceps_short_head': 'https://buy.stripe.com/5kQ6oHfqxdfC6dA3ZAeME09', // 上腕二頭筋短頭・筋皮神経の観察
  'biceps_long_head': 'https://buy.stripe.com/6oU28r7Y53F26dAdAaeME0a', // 上腕二頭筋長頭腱の観察
  'humeroradial_joint': 'https://buy.stripe.com/7sYdR97Y58ZmbxUeEeeME0b', // 腕橈関節・腕橈骨筋の観察
  'supinator': 'https://buy.stripe.com/eVqcN52DL2AYgSefIieME0c', // 回外筋の観察
  'elbow_common_extensor': 'https://buy.stripe.com/4gM6oH3HPgrO45s2VweME0d', // 肘の共同伸筋の観察
  'radiocapitellar_joint': 'https://buy.stripe.com/4gM5kD1zH8Zm8lIeEeeME0e', // 腕橈関節・橈骨頭の観察
  'quad_rf_origin': 'https://buy.stripe.com/28E14nfqx1wU9pM67IeME0f', // 大腿四頭筋・大腿直筋起始の観察
  'quadriceps_long': 'https://buy.stripe.com/bJedR9celdfC59w7bMeME0g', // 大腿四頭筋の観察（長軸）
  'quadriceps_short': 'https://buy.stripe.com/3cI7sLa6dcbyfOa0NoeME0h', // 大腿四頭筋の観察（短軸）
  'gracilis': 'https://buy.stripe.com/8x2cN5fqxfnK9pM9jUeME0i', // 薄筋の観察

  // 体幹（6本） - 観察動画 ¥800
  'adductor_longus': 'https://buy.stripe.com/5kQ5kDa6d7Vi31ofIieME0j', // 長内転筋の観察
  'tibialis_anterior': 'https://buy.stripe.com/aFa00jcel0sQdG23ZAeME0k', // 前脛骨筋の観察
  'plantar_fascia': 'https://buy.stripe.com/cNi9AT2DL3F2atQ9jUeME0l', // 足底腱膜の観察
  'vastus_medialis_oblique': 'https://buy.stripe.com/3cIbJ11zHb7u0Tg0NoeME0q', // 内側広筋斜頭の観察
  'mcl_knee': 'https://buy.stripe.com/5kQfZhdipb7u9pManYeME0r', // 膝内側側副靱帯の観察
  'lcl_knee': 'https://buy.stripe.com/3cIaEXguB6Re6dAanYeME0s', // 膝外側側副靱帯の観察

  // 下肢（44本） - 観察動画 ¥800
  'medial_meniscus': 'https://buy.stripe.com/dRmcN56U11wUbxUfIieME0t', // 内側半月の観察
  'infrapatellar_fat_pad': 'https://buy.stripe.com/cNi00jcel1wU8lIbs2eME0u', // 膝蓋下脂肪体の観察
  'lateral_patellar_retinaculum': 'https://buy.stripe.com/fZucN5emtcbyatQ0NoeME0v', // 外側膝蓋支帯の観察
  // ... 残り41本を追加

  // 動態動画（3本） - ¥900
  'shoulder_chl_ligament': 'https://buy.stripe.com/00wbJ1a6d2AY59wanYeME0m', // 烏口上腕靭帯の動態
  'subscapularis_dynamics': 'https://buy.stripe.com/4gM4gzfqxb7ucBYdAaeME0n', // 肩甲下筋の動態
  'shoulder_abduction': 'https://buy.stripe.com/aFaeVdfqx2AYatQ8fQeME0o', // 肩関節外転の動態

} : {
  // ==========================================
  // テスト環境用 Payment Links
  // ==========================================
  // Stripeダッシュボードのテストモードで作成したPayment Linksを記載

  // 上肢（14本） - 観察動画 ¥800
  'shoulder_ssp_tendon': 'https://buy.stripe.com/6oUdR90vDcby31o0NoeME05', // 棘上筋・肩甲上神経の観察
  'shoulder_isp_muscle': 'https://buy.stripe.com/28E9ATdip8ZmbxU0NoeME06', // 棘下筋・棘下筋枝の観察
  'coracobrachialis': 'https://buy.stripe.com/7sYcN56U1ejGfOa0NoeME07', // 烏口腕筋・筋皮神経の観察
  'brachialis': 'https://buy.stripe.com/dRmeVdbahdfCatQ7bMeME08', // 上腕筋・筋皮神経の観察
  'biceps_short_head': 'https://buy.stripe.com/5kQ6oHfqxdfC6dA3ZAeME09', // 上腕二頭筋短頭・筋皮神経の観察
  'biceps_long_head': 'https://buy.stripe.com/6oU28r7Y53F26dAdAaeME0a', // 上腕二頭筋長頭腱の観察
  'humeroradial_joint': 'https://buy.stripe.com/7sYdR97Y58ZmbxUeEeeME0b', // 腕橈関節・腕橈骨筋の観察
  'supinator': 'https://buy.stripe.com/eVqcN52DL2AYgSefIieME0c', // 回外筋の観察
  'elbow_common_extensor': 'https://buy.stripe.com/4gM6oH3HPgrO45s2VweME0d', // 肘の共同伸筋の観察
  'radiocapitellar_joint': 'https://buy.stripe.com/4gM5kD1zH8Zm8lIeEeeME0e', // 腕橈関節・橈骨頭の観察
  'quad_rf_origin': 'https://buy.stripe.com/28E14nfqx1wU9pM67IeME0f', // 大腿四頭筋・大腿直筋起始の観察
  'quadriceps_long': 'https://buy.stripe.com/bJedR9celdfC59w7bMeME0g', // 大腿四頭筋の観察（長軸）
  'quadriceps_short': 'https://buy.stripe.com/3cI7sLa6dcbyfOa0NoeME0h', // 大腿四頭筋の観察（短軸）
  'gracilis': 'https://buy.stripe.com/8x2cN5fqxfnK9pM9jUeME0i', // 薄筋の観察

  // 体幹（6本） - 観察動画 ¥800
  'adductor_longus': 'https://buy.stripe.com/5kQ5kDa6d7Vi31ofIieME0j', // 長内転筋の観察
  'tibialis_anterior': 'https://buy.stripe.com/aFa00jcel0sQdG23ZAeME0k', // 前脛骨筋の観察
  'plantar_fascia': 'https://buy.stripe.com/cNi9AT2DL3F2atQ9jUeME0l', // 足底腱膜の観察
  'vastus_medialis_oblique': 'https://buy.stripe.com/3cIbJ11zHb7u0Tg0NoeME0q', // 内側広筋斜頭の観察
  'mcl_knee': 'https://buy.stripe.com/5kQfZhdipb7u9pManYeME0r', // 膝内側側副靱帯の観察
  'lcl_knee': 'https://buy.stripe.com/3cIaEXguB6Re6dAanYeME0s', // 膝外側側副靱帯の観察

  // 下肢（44本） - 観察動画 ¥800
  'medial_meniscus': 'https://buy.stripe.com/dRmcN56U11wUbxUfIieME0t', // 内側半月の観察
  'infrapatellar_fat_pad': 'https://buy.stripe.com/cNi00jcel1wU8lIbs2eME0u', // 膝蓋下脂肪体の観察
  'lateral_patellar_retinaculum': 'https://buy.stripe.com/fZucN5emtcbyatQ0NoeME0v', // 外側膝蓋支帯の観察
  // ... 残り41本を追加

  // 動態動画（3本） - ¥900
  'shoulder_chl_ligament': 'https://buy.stripe.com/00wbJ1a6d2AY59wanYeME0m', // 烏口上腕靭帯の動態
  'subscapularis_dynamics': 'https://buy.stripe.com/4gM4gzfqxb7ucBYdAaeME0n', // 肩甲下筋の動態
  'shoulder_abduction': 'https://buy.stripe.com/aFaeVdfqx2AYatQ8fQeME0o', // 肩関節外転の動態
};

/**
 * 動画IDから価格を取得
 * @param {string} videoId - 動画ID
 * @returns {number} 価格（円）
 */
function getVideoPrice(videoId) {
  // vimeo_config.dartから取得した価格情報に基づく
  const dynamicsVideos = [
    'shoulder_chl_ligament',
    'subscapularis_dynamics',
    'shoulder_abduction'
  ];

  return dynamicsVideos.includes(videoId) ? 900 : 800;
}

/**
 * 動画購入処理
 * @param {string} videoId - 動画ID
 */
function purchaseVideo(videoId) {
  // Payment Linkを取得
  const paymentLink = VIDEO_PAYMENT_LINKS[videoId];

  if (!paymentLink) {
    console.error(`Payment Link not found for video: ${videoId}`);
    alert('この動画の購入リンクが設定されていません。管理者にお問い合わせください。');
    return;
  }

  // Payment Linkが仮のものでないかチェック
  if (paymentLink.includes('XXXXX')) {
    console.error(`Payment Link not configured for video: ${videoId}`);
    alert('この動画の購入設定がまだ完了していません。しばらくお待ちください。');
    return;
  }

  // 購入前に動画情報をLocalStorageに保存（成功時の処理用）
  try {
    localStorage.setItem('pending_video_purchase', videoId);
    localStorage.setItem('purchase_timestamp', Date.now().toString());
    console.log(`📝 Pending purchase saved for video: ${videoId}`);
  } catch (e) {
    console.warn('⚠️ Failed to save pending purchase:', e);
  }

  // Stripe Payment Linkにリダイレクト
  console.log(`🎥 Redirecting to payment page for video: ${videoId}`);
  window.location.href = paymentLink;
}

/**
 * 購入済み動画をチェック
 * @param {string} videoId - 動画ID
 * @returns {boolean} 購入済みかどうか
 */
function isPurchased(videoId) {
  try {
    const purchasedVideos = JSON.parse(localStorage.getItem('purchased_videos') || '[]');
    return purchasedVideos.includes(videoId);
  } catch (e) {
    console.error('購入履歴の確認に失敗:', e);
    return false;
  }
}

/**
 * 動画を購入済みとしてマーク
 * @param {string} videoId - 動画ID
 */
function markAsPurchased(videoId) {
  try {
    const purchasedVideos = JSON.parse(localStorage.getItem('purchased_videos') || '[]');
    if (!purchasedVideos.includes(videoId)) {
      purchasedVideos.push(videoId);
      localStorage.setItem('purchased_videos', JSON.stringify(purchasedVideos));
      console.log(`✅ Video marked as purchased: ${videoId}`);
    }
  } catch (e) {
    console.error('購入履歴の保存に失敗:', e);
  }
}

// デバッグ用: コンソールに設定情報を出力
console.log('=== Stripe Video Payment Configuration ===');
console.log('Environment:', IS_PRODUCTION ? 'PRODUCTION' : 'TEST');
console.log('Total videos configured:', Object.keys(VIDEO_PAYMENT_LINKS).length);
console.log('Publishable Key:', STRIPE_CONFIG.publishableKey.substring(0, 20) + '...');
console.log('==========================================');
