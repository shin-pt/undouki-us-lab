/**
 * PDF資料購入 - Stripe Payment Links設定ファイル
 *
 * このファイルには、各PDF資料IDに対応するStripe Payment Link URLを記載します。
 *
 * セットアップ手順:
 * 1. Stripeダッシュボード (https://dashboard.stripe.com/test) にアクセス
 * 2. 左メニュー「商品カタログ」→「Payment Links」
 * 3. 各PDF資料用のPayment Linkを作成（¥1,500）
 * 4. 作成したURLをこのファイルに追加
 *
 * テスト環境と本番環境の切り替え:
 * - ローカル/テスト: IS_PRODUCTION = false
 * - 本番環境: IS_PRODUCTION = true
 */

// 環境判定（本番環境かどうか）
const IS_PRODUCTION = window.location.hostname !== 'localhost' &&
                      !window.location.hostname.includes('127.0.0.1') &&
                      window.location.hostname !== '' &&
                      window.location.protocol !== 'file:';

/**
 * PDF資料IDとStripe Payment Linkのマッピング
 *
 * 各エントリーの形式:
 * 'material_id': 'https://buy.stripe.com/test_XXXXX' (テスト環境)
 * 'material_id': 'https://buy.stripe.com/XXXXX' (本番環境)
 */
const MATERIAL_PAYMENT_LINKS = IS_PRODUCTION ? {
  // ==========================================
  // 本番環境用 Payment Links
  // ==========================================
  // 注意: 本番環境のPayment Linksは、Stripeダッシュボードで
  // 本番モードに切り替えてから作成してください

  // 上肢
  'shoulder_superior': 'https://buy.stripe.com/dRmeVd3HP7VieK62VweME1A', // 肩関節上方
  'shoulder_inferior': 'https://buy.stripe.com/7sYfZh9295Na7hEbs2eME1B', // 肩関節下方
  'elbow_medial': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 肘関節内側

  // 下肢
  'knee_anterior': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 膝関節前面
  'knee_medial': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 膝関節内側
  'hip_lateral': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 股関節外側
  'ankle_medial': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 足関節内側
  'achilles_tendon': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // アキレス腱周囲
  'plantar_fascia': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 足底部

  // 体幹
  'cervical_anterior': 'https://buy.stripe.com/fZu9ATfqxfnKcBY53EeME1C', // 頚部前面
  'lumbar_region': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 腰部
  'lumbar_part2': 'https://buy.stripe.com/XXXXX_REPLACE_WITH_YOUR_LIVE_LINK', // 腰部（Part2）

} : {
  // ==========================================
  // テスト環境用 Payment Links
  // ==========================================
  // Stripeダッシュボードのテストモードで作成したPayment Linksを記載

  // 上肢
  'shoulder_superior': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 肩関節上方
  'shoulder_inferior': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 肩関節下方
  'elbow_medial': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 肘関節内側

  // 下肢
  'knee_anterior': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 膝関節前面
  'knee_medial': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 膝関節内側
  'hip_lateral': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 股関節外側
  'ankle_medial': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 足関節内側
  'achilles_tendon': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // アキレス腱周囲
  'plantar_fascia': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 足底部

  // 体幹
  'cervical_anterior': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 頚部前面
  'lumbar_region': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 腰部
  'lumbar_part2': 'https://buy.stripe.com/test_XXXXX_REPLACE_WITH_YOUR_TEST_LINK', // 腰部（Part2）

};

/**
 * PDF資料IDとタイトルのマッピング
 */
const MATERIAL_TITLES = {
  'shoulder_superior': '肩関節上方',
  'shoulder_inferior': '肩関節下方',
  'elbow_medial': '肘関節内側',
  'knee_anterior': '膝関節前面',
  'knee_medial': '膝関節内側',
  'hip_lateral': '股関節外側',
  'ankle_medial': '足関節内側',
  'achilles_tendon': 'アキレス腱周囲',
  'plantar_fascia': '足底部',
  'cervical_anterior': '頚部前面',
  'lumbar_region': '腰部',
  'lumbar_part2': '腰部（Part2）'
};

/**
 * PDF資料の価格を取得
 * @param {string} materialId - PDF資料ID
 * @returns {number} 価格（円）
 */
function getMaterialPrice(materialId) {
  return 1500; // すべてのPDF資料は¥1,500
}

/**
 * PDF資料購入処理
 * @param {string} materialId - PDF資料ID
 */
function purchaseMaterial(materialId) {
  // Payment Linkを取得
  const paymentLink = MATERIAL_PAYMENT_LINKS[materialId];

  if (!paymentLink) {
    console.error(`Payment Link not found for material: ${materialId}`);
    alert('この資料の購入リンクが設定されていません。管理者にお問い合わせください。');
    return;
  }

  // Payment Linkが仮のものでないかチェック
  if (paymentLink.includes('XXXXX') || paymentLink.includes('REPLACE')) {
    console.error(`Payment Link not configured for material: ${materialId}`);
    alert('この資料の購入設定がまだ完了していません。しばらくお待ちください。');
    return;
  }

  // 購入前に資料情報をLocalStorageに保存（成功時の処理用）
  try {
    localStorage.setItem('pending_material_purchase', materialId);
    localStorage.setItem('purchase_timestamp', Date.now().toString());
    console.log(`📝 Pending purchase saved for material: ${materialId}`);
  } catch (e) {
    console.warn('⚠️ Failed to save pending purchase:', e);
  }

  // Stripe Payment Linkにリダイレクト
  // success_urlにmaterial_idをパラメータとして追加（materials.htmlに直接リダイレクト）
  const successUrl = encodeURIComponent(
    `${window.location.origin}/materials.html?purchased=${materialId}&type=material`
  );
  const cancelUrl = encodeURIComponent(window.location.href);
  
  const finalPaymentLink = `${paymentLink}?success_url=${successUrl}&cancel_url=${cancelUrl}`;
  
  console.log(`📄 Redirecting to payment page for material: ${materialId}`);
  window.location.href = finalPaymentLink;
}

/**
 * 購入済みPDF資料をチェック（Firestoreから確認）
 * @param {string} materialId - PDF資料ID
 * @param {Object} purchasedMaterials - 購入済み資料の配列
 * @returns {boolean} 購入済みかどうか
 */
function isMaterialPurchased(materialId, purchasedMaterials = []) {
  return purchasedMaterials.includes(materialId);
}

/**
 * PDF資料を購入済みとしてマーク（localStorage用、後方互換性）
 * @param {string} materialId - PDF資料ID
 */
function markMaterialAsPurchased(materialId) {
  try {
    const purchasedMaterials = JSON.parse(localStorage.getItem('purchased_materials') || '[]');
    if (!purchasedMaterials.includes(materialId)) {
      purchasedMaterials.push(materialId);
      localStorage.setItem('purchased_materials', JSON.stringify(purchasedMaterials));
      console.log(`✅ Material marked as purchased: ${materialId}`);
    }
  } catch (e) {
    console.error('購入履歴の保存に失敗:', e);
  }
}

// デバッグ用: コンソールに設定情報を出力
console.log('=== Stripe Material Payment Configuration ===');
console.log('Environment:', IS_PRODUCTION ? 'PRODUCTION' : 'TEST');
console.log('Total materials configured:', Object.keys(MATERIAL_PAYMENT_LINKS).length);
console.log('==========================================');

