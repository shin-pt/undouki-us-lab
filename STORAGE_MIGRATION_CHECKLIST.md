# Firebase Storage 画像データ移行チェックリスト

## 🎯 移行の目的

`echo-quiz-app`プロジェクトのStorageから`musculoskeletal-us-lab`プロジェクトのStorageへ画像データを移行し、統合後のプロジェクトで画像を一元管理します。

## ⚠️ 重要な注意事項

**`firebase_options.dart`の`storageBucket`のみを変更します。**
- ✅ 認証（`authDomain`）は`echo-quiz-app`プロジェクトのまま
- ✅ プロジェクトID（`projectId`）も`echo-quiz-app`のまま
- ✅ Storage Bucketのみを`musculoskeletal-us-lab`プロジェクトに変更

これにより、認証などの他の機能に影響を与えずに、画像のみを統合後のプロジェクトから取得できます。

## 📋 移行手順（順番に実行）

### ✅ ステップ1: `musculoskeletal-us-lab`プロジェクトのStorage有効化

1. **Firebase Consoleにアクセス**
   ```
   https://console.firebase.google.com/project/musculoskeletal-us-lab/storage
   ```

2. **Storageを有効化**
   - 「始める」ボタンをクリック
   - Storageの場所を選択（推奨: `asia-northeast1` - 東京）
   - セキュリティルールは後で設定

3. **Storage Bucket名を確認**
   - Firebase Console > Storage > Files で確認
   - 通常は `musculoskeletal-us-lab.firebasestorage.app` または `musculoskeletal-us-lab.appspot.com`
   - **このBucket名をメモしてください**

### ✅ ステップ2: 画像データの移行

#### 方法A: Firebase Consoleで手動コピー（推奨・安全）

1. **`echo-quiz-app`プロジェクトから画像を確認**
   - https://console.firebase.google.com/project/echo-quiz-app/storage
   - `echo_images`フォルダの構造を確認
   - 画像の数を確認

2. **`musculoskeletal-us-lab`プロジェクトに同じ構造でアップロード**
   - https://console.firebase.google.com/project/musculoskeletal-us-lab/storage
   - 「フォルダを作成」で以下の構造を作成：
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
   - 各フォルダに対応する画像をドラッグ&ドロップでアップロード

#### 方法B: gsutilコマンドでコピー（大量データの場合）

```bash
# 1. echo-quiz-appプロジェクトに切り替え
firebase use echo-quiz-app

# 2. 画像データの存在確認
gsutil ls -r gs://echo-quiz-app.firebasestorage.app/echo_images/ | head -20

# 3. musculoskeletal-us-labプロジェクトに切り替え
firebase use musculoskeletal-us-lab

# 4. 画像データをコピー（並列処理で高速化）
gsutil -m cp -r gs://echo-quiz-app.firebasestorage.app/echo_images gs://musculoskeletal-us-lab.firebasestorage.app/

# 5. コピー結果を確認
gsutil ls -r gs://musculoskeletal-us-lab.firebasestorage.app/echo_images/ | head -20
```

### ✅ ステップ3: Storageセキュリティルールの設定

`musculoskeletal-us-lab`プロジェクトのStorageルールを設定：

1. **Firebase Console > Storage > ルール**にアクセス
   ```
   https://console.firebase.google.com/project/musculoskeletal-us-lab/storage/rules
   ```

2. **以下のルールを設定**：

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // echo_imagesフォルダへの読み取りを全員に許可
    match /echo_images/{allPaths=**} {
      allow read: if true;
      allow write: if false; // 読み取り専用（セキュリティのため）
    }
  }
}
```

3. **「公開」ボタンをクリック**

### ✅ ステップ4: 公開アクセス設定

Google Cloud Consoleで公開アクセスを設定：

1. **Google Cloud Consoleにアクセス**
   ```
   https://console.cloud.google.com/storage/browser?project=musculoskeletal-us-lab
   ```

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

### ✅ ステップ5: `firebase_options.dart`の`storageBucket`を変更

**重要**: `storageBucket`のみを変更します。他の設定は変更しません。

`echo-quiz-app/lib/firebase_options.dart`を編集：

```dart
  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCy7rYQUc1SpyZrqKiSgKcJjFlUlNWvKuI',
    appId: '1:634887534972:web:5e38a764f94d8c63978cf9',
    messagingSenderId: '634887534972',
    projectId: 'echo-quiz-app', // 変更なし（認証などで使用）
    authDomain: 'echo-quiz-app.firebaseapp.com', // 変更なし
    storageBucket: 'musculoskeletal-us-lab.firebasestorage.app', // ⚠️ 変更: 統合後のStorage Bucket
  );

  // android, ios, macos, windowsも同様にstorageBucketのみ変更
```

**注意**: Storage Bucket名はステップ1で確認した正確な名前を使用してください。

### ✅ ステップ6: CORS設定（Web版で必要）

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

# 設定を確認
gsutil cors get gs://musculoskeletal-us-lab.firebasestorage.app
```

### ✅ ステップ7: 動作確認

1. **コードの変更を確認**
   - `firebase_options.dart`の`storageBucket`が変更されている
   - `AppConfig`にStorage Bucket設定が追加されている
   - `FirebaseStorageService`が正しく動作する

2. **アプリをビルドしてデプロイ**
   ```bash
   cd echo-quiz-app
   flutter clean
   flutter pub get
   flutter build web --release --base-href=/quiz-app/
   cd ..
   rm -rf quiz-app && mkdir -p quiz-app
   cp -r echo-quiz-app/build/web/* quiz-app/
   firebase deploy --only hosting
   ```

3. **ブラウザで動作確認**
   - https://musculoskeletal-us-lab.web.app/quiz-app/
   - 開発者ツール（F12）のConsoleでStorage Bucket名を確認
   - クイズを開始して画像が表示されることを確認

## 🔄 ロールバック方法

問題が発生した場合のロールバック：

1. **`firebase_options.dart`の`storageBucket`を元に戻す**
   ```dart
   storageBucket: 'echo-quiz-app.firebasestorage.app', // 元の設定に戻す
   ```

2. **デプロイ**
   ```bash
   flutter build web --release --base-href=/quiz-app/
   firebase deploy --only hosting
   ```

## 📊 移行チェックリスト

- [ ] `musculoskeletal-us-lab`プロジェクトのStorageを有効化
- [ ] Storage Bucket名を確認（`musculoskeletal-us-lab.firebasestorage.app`）
- [ ] 画像データを`echo-quiz-app`から`musculoskeletal-us-lab`にコピー
- [ ] Storageセキュリティルールを設定（読み取り許可）
- [ ] 公開アクセス設定を実施（`allUsers`に閲覧権限）
- [ ] CORS設定を実施
- [ ] `firebase_options.dart`の`storageBucket`を変更（全プラットフォーム）
- [ ] アプリをビルドしてデプロイ
- [ ] 動作確認（画像が表示されることを確認）
- [ ] エラーログを確認

## 🎯 この方法のメリット

1. **認証機能への影響なし**: `authDomain`と`projectId`は`echo-quiz-app`のまま
2. **段階的な移行**: 画像のみを移行し、他の機能は変更なし
3. **ロールバック容易**: `storageBucket`のみを変更するため、元に戻しやすい
4. **長期的な運用**: 統合後のプロジェクトで画像を一元管理

## ⚠️ 注意事項

1. **Storage Bucket名の確認**: ステップ1で確認した正確なBucket名を使用してください
2. **画像データのバックアップ**: 移行前に`echo-quiz-app`プロジェクトの画像データをバックアップ
3. **段階的な移行**: まずテスト用の画像を数枚移行して動作確認
4. **セキュリティ**: 公開アクセス設定後、不要なファイルが公開されていないか確認

