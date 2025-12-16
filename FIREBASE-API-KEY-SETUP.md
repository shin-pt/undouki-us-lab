# Firebase APIキーの制限設定ガイド

## 概要

Firebase APIキーはクライアント側に露出していますが、これは正常な動作です。ただし、セキュリティを強化するため、APIキーにHTTPリファラー制限を設定することを推奨します。

## なぜAPIキー制限が必要か

- Firebase APIキーは公開されても問題ありませんが、悪用を防ぐため制限を設定できます
- HTTPリファラー制限により、許可されたドメインからのみAPIキーを使用可能にします
- 不正なサイトからのAPIキー使用を防ぎます

## 設定手順

### ステップ1: Firebase Consoleにアクセス

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. プロジェクト「musculoskeletal-us-lab」を選択

### ステップ2: プロジェクト設定を開く

1. 左メニューの⚙️（設定）アイコンをクリック
2. 「プロジェクトの設定」を選択

### ステップ3: APIキーを確認

1. 「全般」タブを選択
2. 「APIキー」セクションで、現在のAPIキーを確認
   - APIキー: `AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0`

### ステップ4: APIキーの制限を設定

1. 「APIキー」セクションで、使用しているAPIキーをクリック
2. 「アプリケーションの制限」セクションで「HTTPリファラー（ウェブサイト）」を選択
3. 「ウェブサイトの制限」に以下を追加：

#### 本番環境のドメイン
```
https://your-domain.com/*
https://www.your-domain.com/*
```

#### Firebase Hostingを使用している場合
```
https://musculoskeletal-us-lab.web.app/*
https://musculoskeletal-us-lab.firebaseapp.com/*
```

#### 開発環境（ローカル開発用）
```
http://localhost:8000/*
http://127.0.0.1:8000/*
http://localhost:3000/*
http://127.0.0.1:3000/*
```

### ステップ5: APIの制限を設定（オプション）

1. 「APIの制限」セクションで「キーを特定のAPIに制限する」を選択
2. 以下のAPIのみを許可：
   - Firebase Authentication API
   - Cloud Firestore API
   - Firebase Cloud Functions API

### ステップ6: 保存

1. 「制限」ボタンをクリック
2. 変更を保存

## 注意事項

### 開発環境での注意

- ローカル開発時は、`localhost`と`127.0.0.1`を許可リストに追加してください
- 開発用のポート番号（8000、3000など）も追加してください

### 本番環境での注意

- 本番環境のドメインを正確に指定してください
- `www`付きと`www`なしの両方を追加することを推奨します
- ワイルドカード（`*`）を使用して、すべてのパスを許可できます

### トラブルシューティング

#### エラー: "API key not valid"

**原因**: APIキーの制限が厳しすぎる、または許可リストに現在のドメインが含まれていない

**解決策**:
1. Firebase ConsoleでAPIキーの制限を確認
2. 現在のドメインが許可リストに含まれているか確認
3. 開発環境の場合は、`localhost`と`127.0.0.1`が追加されているか確認

#### エラー: "Referer restriction"

**原因**: HTTPリファラー制限により、現在のサイトが許可されていない

**解決策**:
1. Firebase ConsoleでAPIキーの設定を確認
2. 現在のドメインを許可リストに追加

## セキュリティのベストプラクティス

1. ✅ **APIキーの制限を設定する**（このガイド）
2. ✅ **Firestore Security Rulesを設定する**（完了済み）
3. ✅ **Firebase Authenticationを使用する**（実装済み）
4. ✅ **HTTPSを使用する**（本番環境）
5. ✅ **定期的にAPIキーの使用状況を確認する**

## 参考資料

- [Firebase APIキーの制限](https://firebase.google.com/docs/projects/api-keys)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**注意**: APIキーの制限を設定すると、許可されていないドメインからはAPIキーが使用できなくなります。開発環境と本番環境の両方のドメインを追加することを忘れないでください。

