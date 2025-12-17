# Storage移行状況

## ✅ 完了した作業

1. **Blazeプランへのアップグレード**: 完了
2. **Storageの有効化**: 完了
   - Bucket名: `musculoskeletal-us-lab.firebasestorage.app`
3. **Storageセキュリティルールの設定**: 完了
   - `images/`フォルダへの読み取りを全員に許可
   - `echo_images/`フォルダへの読み取りを全員に許可
4. **FirebaseStorageServiceの更新**: 完了
   - 統合後のStorage Bucketから画像を取得できるように更新
   - `useIntegratedStorage`が`true`の場合、`musculoskeletal-us-lab.firebasestorage.app`から画像を取得

## 🔄 進行中の作業

1. **画像データの移行**: 進行中
   - ソース: `echo-quiz-app.firebasestorage.app/images/`
   - ターゲット: `musculoskeletal-us-lab.firebasestorage.app/images/`
   - コマンド: `gsutil -m cp -r gs://echo-quiz-app.firebasestorage.app/images/ gs://musculoskeletal-us-lab.firebasestorage.app/images/`

## 📋 次のステップ

1. **画像のコピー完了を確認**
   ```bash
   firebase use musculoskeletal-us-lab
   gsutil ls gs://musculoskeletal-us-lab.firebasestorage.app/images/
   ```

2. **アプリを再ビルドして動作確認**
   ```bash
   cd echo-quiz-app
   flutter build web --base-href /quiz-app/
   ```

3. **画像の読み込み確認**
   - ブラウザでアプリを開く
   - 画像が正しく表示されるか確認
   - ブラウザの開発者ツールでネットワークタブを確認

## ⚠️ 注意事項

- 実際のStorage構造は`images/upper_limb/imageName.jpg`の形式
- コードでは`normal`と`marked`の区別を期待しているが、実際のStorageにはそのような区別がない
- 画像名から`normal`と`marked`を判断する必要がある可能性がある

## 🔍 確認事項

- [ ] 画像のコピーが完了しているか
- [ ] Storageセキュリティルールが正しく設定されているか
- [ ] アプリが統合後のStorage Bucketから画像を取得できるか
- [ ] 画像が正しく表示されるか

