# Storage有効化と画像データ移行の手順

## ✅ ステップ1: Storageを有効化

Firebase ConsoleでStorageを有効化してください：

1. **Firebase Consoleにアクセス**
   ```
   https://console.firebase.google.com/project/musculoskeletal-us-lab/storage
   ```

2. **「始めましょう」ボタンをクリック**

3. **Storageの設定**
   - セキュリティルール: デフォルトのまま（後で変更します）
   - Storageの場所: `asia-northeast1`（東京）を選択（推奨）
   - 「完了」をクリック

4. **Storage Bucket名を確認**
   - Storageが有効化されると、Bucket名が表示されます
   - 通常は `musculoskeletal-us-lab.firebasestorage.app` または `musculoskeletal-us-lab.appspot.com`
   - **このBucket名をメモしてください**

## ✅ ステップ2: echo-quiz-appプロジェクトの画像を確認

1. **Firebase Consoleにアクセス**
   ```
   https://console.firebase.google.com/project/echo-quiz-app/storage
   ```

2. **画像データの確認**
   - `echo_images`フォルダが存在するか確認
   - 画像の数と構造を確認

## 📋 次のステップ

Storageが有効化されたら、以下の手順で画像データを移行します：

1. 画像データのコピー（gsutilまたはFirebase Console）
2. Storageセキュリティルールの設定
3. 公開アクセス設定
4. `firebase_options.dart`の`storageBucket`を変更
5. CORS設定
6. 動作確認

Storageが有効化されましたら、Bucket名を教えてください。次のステップに進みます。

