#!/bin/bash

# Firebase Storage画像データ移行スクリプト
# echo-quiz-appプロジェクトからmusculoskeletal-us-labプロジェクトへ画像をコピー

set -e

echo "=========================================="
echo "Firebase Storage 画像データ移行スクリプト"
echo "=========================================="
echo ""

# プロジェクト設定
SOURCE_PROJECT="echo-quiz-app"
TARGET_PROJECT="musculoskeletal-us-lab"
SOURCE_BUCKET="echo-quiz-app.firebasestorage.app"
TARGET_BUCKET="musculoskeletal-us-lab.firebasestorage.app"
IMAGE_PATH="echo_images"

# 確認
echo "移行設定:"
echo "  ソースプロジェクト: $SOURCE_PROJECT"
echo "  ターゲットプロジェクト: $TARGET_PROJECT"
echo "  ソースBucket: $SOURCE_BUCKET"
echo "  ターゲットBucket: $TARGET_BUCKET"
echo "  画像パス: $IMAGE_PATH"
echo ""
read -p "この設定で移行を開始しますか？ (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "移行をキャンセルしました。"
    exit 1
fi

# ソースBucketの存在確認
echo ""
echo "ステップ1: ソースBucketの確認..."
firebase use $SOURCE_PROJECT
if ! gsutil ls -b gs://$SOURCE_BUCKET > /dev/null 2>&1; then
    echo "❌ エラー: ソースBucketが見つかりません: $SOURCE_BUCKET"
    exit 1
fi
echo "✅ ソースBucketを確認しました"

# ターゲットBucketの存在確認
echo ""
echo "ステップ2: ターゲットBucketの確認..."
firebase use $TARGET_PROJECT
if ! gsutil ls -b gs://$TARGET_BUCKET > /dev/null 2>&1; then
    echo "❌ エラー: ターゲットBucketが見つかりません: $TARGET_BUCKET"
    echo "   Firebase ConsoleでStorageを有効化してください:"
    echo "   https://console.firebase.google.com/project/$TARGET_PROJECT/storage"
    exit 1
fi
echo "✅ ターゲットBucketを確認しました"

# 画像データのリスト取得
echo ""
echo "ステップ3: 移行対象の画像を確認..."
firebase use $SOURCE_PROJECT
IMAGES=$(gsutil ls -r gs://$SOURCE_BUCKET/$IMAGE_PATH/ 2>/dev/null | grep -E '\.(jpg|jpeg|png|webp|gif)$' || true)
if [ -z "$IMAGES" ]; then
    echo "⚠️  警告: 移行対象の画像が見つかりませんでした"
    echo "   Firebase Consoleで画像の存在を確認してください:"
    echo "   https://console.firebase.google.com/project/$SOURCE_PROJECT/storage"
    exit 1
fi
IMAGE_COUNT=$(echo "$IMAGES" | wc -l | tr -d ' ')
echo "✅ $IMAGE_COUNT 個の画像が見つかりました"

# 画像データのコピー
echo ""
echo "ステップ4: 画像データのコピー..."
firebase use $SOURCE_PROJECT
echo "  ソースから画像を読み込み中..."
gsutil -m cp -r gs://$SOURCE_BUCKET/$IMAGE_PATH/ gs://$TARGET_BUCKET/$IMAGE_PATH/ 2>&1 | while IFS= read -r line; do
    echo "  $line"
done

# コピー結果の確認
echo ""
echo "ステップ5: コピー結果の確認..."
firebase use $TARGET_PROJECT
COPIED_COUNT=$(gsutil ls -r gs://$TARGET_BUCKET/$IMAGE_PATH/ 2>/dev/null | grep -E '\.(jpg|jpeg|png|webp|gif)$' | wc -l | tr -d ' ')
echo "✅ $COPIED_COUNT 個の画像がコピーされました"

# 完了メッセージ
echo ""
echo "=========================================="
echo "✅ 画像データの移行が完了しました！"
echo "=========================================="
echo ""
echo "次のステップ:"
echo "1. Firebase Consoleで画像を確認:"
echo "   https://console.firebase.google.com/project/$TARGET_PROJECT/storage"
echo ""
echo "2. Storageセキュリティルールをデプロイ:"
echo "   firebase deploy --only storage"
echo ""
echo "3. アプリを再ビルドして動作確認:"
echo "   cd echo-quiz-app && flutter build web --base-href /quiz-app/"

