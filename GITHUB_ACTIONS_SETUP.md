# GitHub ActionsでFirebase Hosting自動デプロイ設定ガイド

## 概要

GitHubにPushすると、自動的にFirebase Hostingにデプロイされるように設定します。

## 設定手順

### ステップ1: Firebase Service Accountの作成

1. [Firebase Console](https://console.firebase.google.com/project/musculoskeletal-us-lab/settings/serviceaccounts/adminsdk) にアクセス
2. 「新しい秘密鍵の生成」をクリック
3. JSONファイルがダウンロードされます（このファイルは安全に保管してください）

### ステップ2: GitHub Secretsの設定

1. GitHubリポジトリのページにアクセス
2. 「Settings」→「Secrets and variables」→「Actions」を開く
3. 「New repository secret」をクリック
4. 以下の情報を設定：
   - **Name**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: ダウンロードしたJSONファイルの内容をそのまま貼り付け

### ステップ3: 動作確認

1. 何かファイルを変更してコミット
2. GitHubにPush
3. 「Actions」タブでデプロイの進行状況を確認

## 動作フロー

```
GitHubにPush
    ↓
GitHub Actionsが自動実行
    ↓
Firebase Hostingに自動デプロイ
    ↓
musculoskeletal-us-lab.com に反映
```

## メリット

✅ **GitHubにPushするだけで自動デプロイ**
✅ **デプロイ履歴がGitHub Actionsで確認可能**
✅ **プルリクエストのレビュー後にデプロイ可能**
✅ **複数人での開発が容易**

## 注意事項

- Firebase Service AccountのJSONファイルは**絶対にGitHubにコミットしないでください**
- `.gitignore`に`firebase-service-account.json`を追加することを推奨
- GitHub Secretsに設定した後は、ローカルのJSONファイルを削除しても問題ありません

## トラブルシューティング

### デプロイが失敗する場合

1. **GitHub Actionsのログを確認**
   - リポジトリの「Actions」タブでエラーログを確認

2. **Firebase Service Accountの権限を確認**
   - Firebase Consoleで、Service Accountに適切な権限があるか確認

3. **プロジェクトIDの確認**
   - `.github/workflows/firebase-deploy.yml`の`projectId`が正しいか確認

## 参考リンク

- [Firebase Hosting GitHub Actions](https://github.com/FirebaseExtended/action-hosting-deploy)
- [GitHub Secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets)

