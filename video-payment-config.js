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
  'shoulder_ssp_tendon': 'https://buy.stripe.com/00w7sLdipgrO31o1RseME0w', // 棘上筋・肩甲上神経の観察
  'shoulder_isp_muscle': 'https://buy.stripe.com/fZubJ1guB1wUgSeeEeeME0x', // 棘下筋・棘下筋枝の観察
  'coracobrachialis': 'https://buy.stripe.com/bJedR9a6db7u0Tg7bMeME0y', // 烏口腕筋・筋皮神経の観察
  'brachialis': 'https://buy.stripe.com/dRm3cv5PXa3q59w1RseME0z', // 上腕筋・筋皮神経の観察
  'biceps_short_head': 'https://buy.stripe.com/7sY8wPfqx8ZmeK68fQeME0A', // 上腕二頭筋短頭・筋皮神経の観察
  'biceps_long_head': 'https://buy.stripe.com/3cI6oHfqxb7u31ocw6eME0B', // 上腕二頭筋長頭腱の観察
  'humeroradial_joint': 'https://buy.stripe.com/28E6oH6U16RegSe53EeME0C', // 腕橈関節・腕橈骨筋の観察
  'supinator': 'https://buy.stripe.com/3cI8wPa6d7VifOa67IeME0D', // 回外筋の観察
  'elbow_common_extensor': 'https://buy.stripe.com/8x23cvfqxa3qcBYcw6eME0E', // 肘の共同伸筋の観察
  'radiocapitellar_joint': 'https://buy.stripe.com/eVq28rfqx2AY9pMfIieME0F', // 腕橈関節・橈骨頭の観察
  'axillary_nerve': 'https://buy.stripe.com/4gM3cv2DL8ZmfOafIieME0G', // 腋窩神経前枝・後上腕回旋動脈の観察

  // 上肢 - 動態動画 ¥900
  'shoulder_chl_ligament': 'https://buy.stripe.com/7sY5kDbahgrOgSegMmeME0H', // 烏口上腕靭帯の動態
  'subscapularis_dynamics': 'https://buy.stripe.com/aFa7sLemt6Re31oanYeME0I', // 肩甲下筋の動態
  'shoulder_abduction': 'https://buy.stripe.com/8x2eVd5PX8Zm1Xk3ZAeME0J', // 肩関節外転の動態

  // 体幹（9本） - 観察動画 ¥800
  'longus_colli': 'https://buy.stripe.com/3cI9AT3HP4J631o53EeME0K', // 頚長筋の観察
  'longus_capitis': 'https://buy.stripe.com/28EfZhfqx6Re45sgMmeME0L', // 頭長筋の観察
  'carotid_thyroid': 'https://buy.stripe.com/eVq9AT3HP7VigSedAaeME0M', // 総頸動脈・甲状腺の観察
  'scalene_muscles': 'https://buy.stripe.com/cNieVddip4J6gSe2VweME0N', // 前・中斜角筋の観察
  'sternocleidomastoid': 'https://buy.stripe.com/00w4gz6U1ejG9pMdAaeME0O', // 胸鎖乳突筋の観察
  'levator_scapulae': 'https://buy.stripe.com/9B6aEXbaha3qeK61RseME0P', // 肩甲挙筋の観察
  'omohyoid': 'https://buy.stripe.com/14A5kD1zH5NafOa9jUeME0Q', // 肩甲舌骨筋の観察
  'lateral_abdominal': 'https://buy.stripe.com/8x2cN51zH6RegSecw6eME0R', // 側腹筋の観察
  'rectus_abdominis': 'https://buy.stripe.com/8x29AT2DLfnKgSe7bMeME0S', // 腹直筋の観察

  // 下肢（44本） - 観察動画 ¥800
  'quad_rf_origin': 'https://buy.stripe.com/8x2bJ17Y5cbyatQ53EeME0T', // 大腿四頭筋・大腿直筋起始の観察
  'quadriceps_long': 'https://buy.stripe.com/9B6eVda6d7VicBY9jUeME0U', // 大腿四頭筋の観察（長軸）
  'quadriceps_short': 'https://buy.stripe.com/9B628r1zH2AY6dA1RseME0V', // 大腿四頭筋の観察（短軸）
  'vastus_medialis_oblique': 'https://buy.stripe.com/00w8wP2DL1wU1Xk9jUeME0W', // 内側広筋斜頭の観察
  'abductor_hallucis': 'https://buy.stripe.com/28E7sL7Y5cby7hE67IeME0X', // 母趾外転筋の観察
  'mcl_knee': 'https://buy.stripe.com/eVq3cvemtdfCbxUfIieME0Y', // 膝内側側副靱帯の観察
  'lcl_knee': 'https://buy.stripe.com/28EdR90vDgrO9pM67IeME0Z', // 膝外側側副靱帯の観察
  'gracilis': 'https://buy.stripe.com/6oUeVd5PXejGdG2fIieME10', // 薄筋の観察
  'adductor_longus': 'https://buy.stripe.com/eVq9ATemt6Re6dAanYeME11', // 長内転筋の観察
  'semitendinosus_semimembranosus': 'https://buy.stripe.com/fZu6oHbah7VifOacw6eME12', // 半腱様筋・半膜様筋の観察
  'medial_meniscus': 'https://buy.stripe.com/9B66oHguB0sQ8lIanYeME13', // 内側半月の観察
  'extensor_hallucis_longus': 'https://buy.stripe.com/eVq28rbahdfC8lI0NoeME14', // 長母趾伸筋の観察
  'extensor_digitorum_longus': 'https://buy.stripe.com/7sY14nceldfCeK6anYeME16', // 長趾伸筋の観察
  'plantar_fascia': 'https://buy.stripe.com/8x214n1zHejG59wbs2eME17', // 足底腱膜の観察
  'tibialis_anterior': 'https://buy.stripe.com/fZudR93HP7Vi9pMfIieME18', // 前脛骨筋の観察
  'anterior_talofibular_ligament': 'https://buy.stripe.com/6oU6oHcel5NafOafIieME19', // 前距腓靱帯の観察
  'abductor_digiti_minimi': 'https://buy.stripe.com/fZu6oH5PXa3q59w7bMeME1a', // 小趾外転筋の観察
  'anterior_talofibular_fat_pad': 'https://buy.stripe.com/9B600j1zH8Zm45sfIieME1b', // 距骨前脂肪体の観察
  'triceps_surae': 'https://buy.stripe.com/00waEX4LT0sQcBYdAaeME1c', // 下腿三頭筋の観察
  'achilles_tendon': 'https://buy.stripe.com/8x23cv5PX3F21Xkcw6eME1d', // アキレス腱周囲の観察
  'iliotibial_band': 'https://buy.stripe.com/aFa9AT1zH8Zm9pM1RseME1e', // 腸脛靭帯の観察
  'infrapatellar_fat_pad': 'https://buy.stripe.com/28EfZh3HP3F21Xk1RseME1f', // 膝蓋下脂肪体の観察
  'sartorius': 'https://buy.stripe.com/8x29AT9290sQatQ9jUeME1g', // 縫工筋の観察
  'lateral_patellar_retinaculum': 'https://buy.stripe.com/aFabJ13HP7Vi8lIdAaeME1h', // 外側膝蓋支帯の観察
  'extensor_hallucis_longus_2': 'https://buy.stripe.com/00wcN55PX5NacBY7bMeME1i', // 長母趾伸筋の観察2
  'gluteus_minimus': 'https://buy.stripe.com/00w28r7Y58Zm7hE1RseME1j', // 小殿筋の観察
  'tensor_fasciae_latae': 'https://buy.stripe.com/aFa7sL7Y58ZmdG267IeME1k', // 大腿筋膜張筋の観察

  // 下肢 - 動態動画 ¥900
  'sartorius_dynamics': 'https://buy.stripe.com/00wfZh1zHgrOgSe8fQeME1l', // 膝屈伸時の縫工筋の動態
  'medial_meniscus_dynamics': 'https://buy.stripe.com/eVq9AT1zH0sQcBYanYeME1m', // 膝屈伸時の内側半月板の動態
  'suprapatellar_fat_pad_dynamics': 'https://buy.stripe.com/28E00jguB0sQ31o8fQeME1n', // 膝屈伸時の大腿前脂肪体の動態
  'kager_fat_pad': 'https://buy.stripe.com/dRm3cv7Y58Zm6dA1RseME1o', // 底背屈時のKFPの動態
  'lcl_stress': 'https://buy.stripe.com/cNi6oH9293F259w9jUeME1p', // 内反ストレス時の膝外側側副靱帯の動態
  'talocrural_joint': 'https://buy.stripe.com/cNi28rceldfC7hE2VweME1q', // 底背屈時の距腿関節の動態
  'infrapatellar_fat_pad_setting': 'https://buy.stripe.com/cNi4gzcel4J6cBY67IeME1r', // 大腿四頭筋セッティング時の膝蓋下脂肪体
  'suprapatellar_fat_pad_setting': 'https://buy.stripe.com/00wdR96U1fnK7hEgMmeME1s', // 大腿四頭筋セッティング時の大腿前脂肪体
  'quadriceps_setting': 'https://buy.stripe.com/dRm00j5PX1wU7hEfIieME1t', // 大腿四頭筋セッティング時の筋動態
  'lateral_patellar_dynamics': 'https://buy.stripe.com/cNidR92DL0sQgSedAaeME1u', // 膝屈伸時の膝蓋骨外側組織の動態
  'lateral_patellar_manual': 'https://buy.stripe.com/14A7sLbah0sQ6dA53EeME1v', // 膝蓋骨外側支持組織への徒手療法
  'infrapatellar_fat_pad_manual': 'https://buy.stripe.com/4gM6oHcel5NaatQgMmeME1w', // 膝蓋下脂肪体への徒手療法
  'flexor_hallucis_longus_manual': 'https://buy.stripe.com/dRmfZh3HPejGbxU1RseME1x', // 長母趾屈筋への徒手療法

} : {
  // ==========================================
  // テスト環境用 Payment Links
  // ==========================================
  // Stripeダッシュボードのテストモードで作成したPayment Linksを記載

  // 上肢（14本） - 観察動画 ¥800
  'shoulder_ssp_tendon': 'https://buy.stripe.com/00w7sLdipgrO31o1RseME0w', // 棘上筋・肩甲上神経の観察
  'shoulder_isp_muscle': 'https://buy.stripe.com/fZubJ1guB1wUgSeeEeeME0x', // 棘下筋・棘下筋枝の観察
  'coracobrachialis': 'https://buy.stripe.com/bJedR9a6db7u0Tg7bMeME0y', // 烏口腕筋・筋皮神経の観察
  'brachialis': 'https://buy.stripe.com/dRm3cv5PXa3q59w1RseME0z', // 上腕筋・筋皮神経の観察
  'biceps_short_head': 'https://buy.stripe.com/7sY8wPfqx8ZmeK68fQeME0A', // 上腕二頭筋短頭・筋皮神経の観察
  'biceps_long_head': 'https://buy.stripe.com/3cI6oHfqxb7u31ocw6eME0B', // 上腕二頭筋長頭腱の観察
  'humeroradial_joint': 'https://buy.stripe.com/28E6oH6U16RegSe53EeME0C', // 腕橈関節・腕橈骨筋の観察
  'supinator': 'https://buy.stripe.com/3cI8wPa6d7VifOa67IeME0D', // 回外筋の観察
  'elbow_common_extensor': 'https://buy.stripe.com/8x23cvfqxa3qcBYcw6eME0E', // 肘の共同伸筋の観察
  'radiocapitellar_joint': 'https://buy.stripe.com/eVq28rfqx2AY9pMfIieME0F', // 腕橈関節・橈骨頭の観察
  'axillary_nerve': 'https://buy.stripe.com/4gM3cv2DL8ZmfOafIieME0G', // 腋窩神経前枝・後上腕回旋動脈の観察

  // 上肢 - 動態動画 ¥900
  'shoulder_chl_ligament': 'https://buy.stripe.com/7sY5kDbahgrOgSegMmeME0H', // 烏口上腕靭帯の動態
  'subscapularis_dynamics': 'https://buy.stripe.com/aFa7sLemt6Re31oanYeME0I', // 肩甲下筋の動態
  'shoulder_abduction': 'https://buy.stripe.com/8x2eVd5PX8Zm1Xk3ZAeME0J', // 肩関節外転の動態

  // 体幹（9本） - 観察動画 ¥800
  'longus_colli': 'https://buy.stripe.com/3cI9AT3HP4J631o53EeME0K', // 頚長筋の観察
  'longus_capitis': 'https://buy.stripe.com/28EfZhfqx6Re45sgMmeME0L', // 頭長筋の観察
  'carotid_thyroid': 'https://buy.stripe.com/eVq9AT3HP7VigSedAaeME0M', // 総頸動脈・甲状腺の観察
  'scalene_muscles': 'https://buy.stripe.com/cNieVddip4J6gSe2VweME0N', // 前・中斜角筋の観察
  'sternocleidomastoid': 'https://buy.stripe.com/00w4gz6U1ejG9pMdAaeME0O', // 胸鎖乳突筋の観察
  'levator_scapulae': 'https://buy.stripe.com/9B6aEXbaha3qeK61RseME0P', // 肩甲挙筋の観察
  'omohyoid': 'https://buy.stripe.com/14A5kD1zH5NafOa9jUeME0Q', // 肩甲舌骨筋の観察
  'lateral_abdominal': 'https://buy.stripe.com/8x2cN51zH6RegSecw6eME0R', // 側腹筋の観察
  'rectus_abdominis': 'https://buy.stripe.com/8x29AT2DLfnKgSe7bMeME0S', // 腹直筋の観察

  // 下肢（44本） - 観察動画 ¥800
  'quad_rf_origin': 'https://buy.stripe.com/8x2bJ17Y5cbyatQ53EeME0T', // 大腿四頭筋・大腿直筋起始の観察
  'quadriceps_long': 'https://buy.stripe.com/9B6eVda6d7VicBY9jUeME0U', // 大腿四頭筋の観察（長軸）
  'quadriceps_short': 'https://buy.stripe.com/9B628r1zH2AY6dA1RseME0V', // 大腿四頭筋の観察（短軸）
  'vastus_medialis_oblique': 'https://buy.stripe.com/00w8wP2DL1wU1Xk9jUeME0W', // 内側広筋斜頭の観察
  'abductor_hallucis': 'https://buy.stripe.com/28E7sL7Y5cby7hE67IeME0X', // 母趾外転筋の観察
  'mcl_knee': 'https://buy.stripe.com/eVq3cvemtdfCbxUfIieME0Y', // 膝内側側副靱帯の観察
  'lcl_knee': 'https://buy.stripe.com/28EdR90vDgrO9pM67IeME0Z', // 膝外側側副靱帯の観察
  'gracilis': 'https://buy.stripe.com/6oUeVd5PXejGdG2fIieME10', // 薄筋の観察
  'adductor_longus': 'https://buy.stripe.com/eVq9ATemt6Re6dAanYeME11', // 長内転筋の観察
  'semitendinosus_semimembranosus': 'https://buy.stripe.com/fZu6oHbah7VifOacw6eME12', // 半腱様筋・半膜様筋の観察
  'medial_meniscus': 'https://buy.stripe.com/9B66oHguB0sQ8lIanYeME13', // 内側半月の観察
  'extensor_hallucis_longus': 'https://buy.stripe.com/eVq28rbahdfC8lI0NoeME14', // 長母趾伸筋の観察
  'extensor_digitorum_longus': 'https://buy.stripe.com/7sY14nceldfCeK6anYeME16', // 長趾伸筋の観察
  'plantar_fascia': 'https://buy.stripe.com/8x214n1zHejG59wbs2eME17', // 足底腱膜の観察
  'tibialis_anterior': 'https://buy.stripe.com/fZudR93HP7Vi9pMfIieME18', // 前脛骨筋の観察
  'anterior_talofibular_ligament': 'https://buy.stripe.com/6oU6oHcel5NafOafIieME19', // 前距腓靱帯の観察
  'abductor_digiti_minimi': 'https://buy.stripe.com/fZu6oH5PXa3q59w7bMeME1a', // 小趾外転筋の観察
  'anterior_talofibular_fat_pad': 'https://buy.stripe.com/9B600j1zH8Zm45sfIieME1b', // 距骨前脂肪体の観察
  'triceps_surae': 'https://buy.stripe.com/00waEX4LT0sQcBYdAaeME1c', // 下腿三頭筋の観察
  'achilles_tendon': 'https://buy.stripe.com/8x23cv5PX3F21Xkcw6eME1d', // アキレス腱周囲の観察
  'iliotibial_band': 'https://buy.stripe.com/aFa9AT1zH8Zm9pM1RseME1e', // 腸脛靭帯の観察
  'infrapatellar_fat_pad': 'https://buy.stripe.com/28EfZh3HP3F21Xk1RseME1f', // 膝蓋下脂肪体の観察
  'sartorius': 'https://buy.stripe.com/8x29AT9290sQatQ9jUeME1g', // 縫工筋の観察
  'lateral_patellar_retinaculum': 'https://buy.stripe.com/aFabJ13HP7Vi8lIdAaeME1h', // 外側膝蓋支帯の観察
  'extensor_hallucis_longus_2': 'https://buy.stripe.com/00wcN55PX5NacBY7bMeME1i', // 長母趾伸筋の観察2
  'gluteus_minimus': 'https://buy.stripe.com/00w28r7Y58Zm7hE1RseME1j', // 小殿筋の観察
  'tensor_fasciae_latae': 'https://buy.stripe.com/aFa7sL7Y58ZmdG267IeME1k', // 大腿筋膜張筋の観察

  // 下肢 - 動態動画 ¥900
  'sartorius_dynamics': 'https://buy.stripe.com/00wfZh1zHgrOgSe8fQeME1l', // 膝屈伸時の縫工筋の動態
  'medial_meniscus_dynamics': 'https://buy.stripe.com/eVq9AT1zH0sQcBYanYeME1m', // 膝屈伸時の内側半月板の動態
  'suprapatellar_fat_pad_dynamics': 'https://buy.stripe.com/28E00jguB0sQ31o8fQeME1n', // 膝屈伸時の大腿前脂肪体の動態
  'kager_fat_pad': 'https://buy.stripe.com/dRm3cv7Y58Zm6dA1RseME1o', // 底背屈時のKFPの動態
  'lcl_stress': 'https://buy.stripe.com/cNi6oH9293F259w9jUeME1p', // 内反ストレス時の膝外側側副靱帯の動態
  'talocrural_joint': 'https://buy.stripe.com/cNi28rceldfC7hE2VweME1q', // 底背屈時の距腿関節の動態
  'infrapatellar_fat_pad_setting': 'https://buy.stripe.com/cNi4gzcel4J6cBY67IeME1r', // 大腿四頭筋セッティング時の膝蓋下脂肪体
  'suprapatellar_fat_pad_setting': 'https://buy.stripe.com/00wdR96U1fnK7hEgMmeME1s', // 大腿四頭筋セッティング時の大腿前脂肪体
  'quadriceps_setting': 'https://buy.stripe.com/dRm00j5PX1wU7hEfIieME1t', // 大腿四頭筋セッティング時の筋動態
  'lateral_patellar_dynamics': 'https://buy.stripe.com/cNidR92DL0sQgSedAaeME1u', // 膝屈伸時の膝蓋骨外側組織の動態
  'lateral_patellar_manual': 'https://buy.stripe.com/14A7sLbah0sQ6dA53EeME1v', // 膝蓋骨外側支持組織への徒手療法
  'infrapatellar_fat_pad_manual': 'https://buy.stripe.com/4gM6oHcel5NaatQgMmeME1w', // 膝蓋下脂肪体への徒手療法
  'flexor_hallucis_longus_manual': 'https://buy.stripe.com/dRmfZh3HPejGbxU1RseME1x', // 長母趾屈筋への徒手療法
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
    'shoulder_abduction',
    'sartorius_dynamics',
    'medial_meniscus_dynamics',
    'suprapatellar_fat_pad_dynamics',
    'kager_fat_pad',
    'lcl_stress',
    'talocrural_joint',
    'infrapatellar_fat_pad_setting',
    'suprapatellar_fat_pad_setting',
    'quadriceps_setting',
    'lateral_patellar_dynamics',
    'lateral_patellar_manual',
    'infrapatellar_fat_pad_manual',
    'flexor_hallucis_longus_manual'
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
