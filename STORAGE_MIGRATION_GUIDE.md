# Firebase Storage 画像データ移行ガイド

## 📋 移行手順

### ステップ1: `musculoskeletal-us-lab`プロジェクトのStorage有効化

1. **Firebase Consoleにアクセス**
   - https://console.firebase.google.com/project/musculoskeletal-us-lab/storage

2. **Storageを有効化**
   - 「始める」ボタンをクリック
   - セキュリティルールを設定（後述）
   - Storageの場所を選択（推奨: `asia-northeast1` - 東京）

3. **Storage Bucket名を確認**
   - 通常は `musculoskeletal-us-lab.firebasestorage.app` または `musculoskeletal-us-lab.appspot.com`
   - Firebase Console > Storage > Files で確認

### ステップ2: 画像データの移行

#### 方法A: Firebase Consoleで手動コピー（推奨・安全）

1. **`echo-quiz-app`プロジェクトから画像をダウンロード**
   - https://console.firebase.google.com/project/echo-quiz-app/storage
   - `echo_images`フォルダを選択
   - 各画像をダウンロード

2. **`musculoskeletal-us-lab`プロジェクトにアップロード**
   - https://console.firebase.google.com/project/musculoskeletal-us-lab/storage
   - 同じフォルダ構造でアップロード：
     ```
     echo_images/
     ├── upper_limb/
     │   ├── normal/
     │   └── marked/
     ├── trunk/
     │   ├── normal/
     │   └── marked/
     └── lower_limb/
         ├── normal/
         └── marked/
     ```

#### 方法B: gsutilコマンドでコピー（大量データの場合）

```bash
# echo-quiz-appプロジェクトに切り替え
firebase use echo-quiz-app

# 画像データを確認
gsutil ls -r gs://echo-quiz-app.firebasestorage.app/echo_images/

# musculoskeletal-us-labプロジェクトに切り替え
firebase use musculoskeletal-us-lab

# 画像データをコピー（並列処理で高速化）
gsutil -m cp -r gs://echo-quiz-app.firebasestorage.app/echo_images gs://musculoskeletal-us-lab.firebasestorage.app/
```

### ステップ3: Storageセキュリティルールの設定

`musculoskeletal-us-lab`プロジェクトのStorageルールを設定：

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // echo_imagesフォルダへの読み取りを全員に許可
    match /echo_images/{allPaths=**} {
      allow read: if true;
      allow write: if false; // 読み取り専用
    }
  }
}
```

### ステップ4: 公開アクセス設定

Google Cloud Consoleで公開アクセスを設定：

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/storage/browser?project=musculoskeletal-us-lab

2. **バケットを選択**
   - `musculoskeletal-us-lab.firebasestorage.app` を選択

3. **権限タブで公開アクセスを設定**
   - 「権限」タブをクリック
   - 「アクセスを付与」をクリック
   - 新しいプリンシパル: `allUsers`
   - ロール: `Storage オブジェクト閲覧者`
   - 「保存」をクリック

4. **確認ダイアログ**
   - 「このバケットを公開しますか？」→「許可」

### ステップ5: CORS設定（Web版で必要）

```bash
# cors.jsonファイルを作成
cat > cors.json << 'EOF'
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

# CORS設定を適用
gsutil cors set cors.json gs://musculoskeletal-us-lab.firebasestorage.app
```

### ステップ6: 動作確認

1. **コードの変更を確認**
   - `AppConfig`にStorage Bucket設定が追加されている
   - `FirebaseStorageService`が統合後のStorage Bucketを使用する設定になっている

2. **アプリをビルドしてデプロイ**
   ```bash
   cd echo-quiz-app
   flutter build web --release --base-href=/quiz-app/
   cd ..
   rm -rf quiz-app && mkdir -p quiz-app
   cp -r echo-quiz-app/build/web/* quiz-app/
   firebase deploy --only hosting
   ```

3. **ブラウザで動作確認**
   - https://musculoskeletal-us-lab.web.app/quiz-app/
   - クイズを開始して画像が表示されることを確認

## ⚠️ 注意事項

1. **データのバックアップ**: 移行前に`echo-quiz-app`プロジェクトの画像データをバックアップ
2. **段階的な移行**: まずテスト用の画像を数枚移行して動作確認
3. **セキュリティ**: 公開アクセス設定後、不要なファイルが公開されていないか確認
4. **コスト**: Storageの使用量とコストを確認

## 🔄 ロールバック方法

問題が発生した場合のロールバック：

1. **コードを元に戻す**
   ```dart
   // AppConfigで useIntegratedStorage を false に設定
   // または環境変数で USE_INTEGRATED_STORAGE=false を設定
   ```

2. **デプロイ**
   ```bash
   flutter build web --release --base-href=/quiz-app/
   firebase deploy --only hosting
   ```

## 📊 移行チェックリスト

- [ ] `musculoskeletal-us-lab`プロジェクトのStorageを有効化
- [ ] Storage Bucket名を確認
- [ ] 画像データを`echo-quiz-app`から`musculoskeletal-us-lab`にコピー
- [ ] Storageセキュリティルールを設定
- [ ] 公開アクセス設定を実施
- [ ] CORS設定を実施
- [ ] コードの変更を確認
- [ ] アプリをビルドしてデプロイ
- [ ] 動作確認（画像が表示されることを確認）
- [ ] エラーログを確認

