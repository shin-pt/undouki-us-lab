#!/bin/bash

# Flutterアプリのビルドとデプロイスクリプト

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Flutterアプリのビルドとデプロイを開始します${NC}"
echo ""

# 現在のディレクトリを保存
ORIGINAL_DIR=$(pwd)

# Flutterアプリのディレクトリに移動
cd echo-quiz-app

echo -e "${YELLOW}📦 依存関係を取得中...${NC}"
flutter pub get

echo ""
echo -e "${YELLOW}🔨 Flutter Webアプリをビルド中...${NC}"
echo "   base-href=/quiz-app/ を指定してビルドします"
flutter build web --base-href=/quiz-app/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ビルドに失敗しました${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ ビルドが完了しました${NC}"
echo "   ビルド出力: echo-quiz-app/build/web/"

# 元のディレクトリに戻る
cd "$ORIGINAL_DIR"

echo ""
echo -e "${YELLOW}📋 ビルド出力をquiz-appディレクトリにコピー中...${NC}"
rm -rf quiz-app
mkdir -p quiz-app
cp -r echo-quiz-app/build/web/* quiz-app/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ コピーに失敗しました${NC}"
    exit 1
fi

echo -e "${GREEN}✅ コピーが完了しました${NC}"
echo "   コピー先: quiz-app/"

echo ""
echo -e "${YELLOW}☁️  Firebase Hostingへデプロイしますか？${NC}"
read -p "デプロイを実行しますか？ (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}📤 Firebase Hostingへデプロイ中...${NC}"
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ デプロイが完了しました！${NC}"
        echo ""
        echo "📱 アクセスURL:"
        echo "   HTMLサイト: https://musculoskeletal-us-lab.web.app/"
        echo "   Flutterアプリ: https://musculoskeletal-us-lab.web.app/quiz-app/"
    else
        echo -e "${RED}❌ デプロイに失敗しました${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⏸️  デプロイをスキップしました${NC}"
    echo "   後でデプロイする場合: firebase deploy --only hosting"
fi

echo ""
echo -e "${GREEN}🎉 処理が完了しました！${NC}"

