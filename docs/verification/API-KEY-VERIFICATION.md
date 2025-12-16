# APIキー制限設定の確認方法

## 設定完了後の確認手順

### 1. ローカル開発環境での動作確認

#### ステップ1: ローカルサーバーを起動

```bash
cd /Users/shinyamacbook/Desktop/undouki-us-lab
python3 -m http.server 8000
```

#### ステップ2: ブラウザでアクセス

1. ブラウザで `http://localhost:8000` にアクセス
2. 以下のページが正常に表示されるか確認：
   - `http://localhost:8000/index.html`
   - `http://localhost:8000/auth.html`
   - `http://localhost:8000/member.html`（ログイン後）

#### ステップ3: ブラウザのコンソールで確認

1. ブラウザの開発者ツールを開く（F12 または Cmd+Option+I）
2. 「Console」タブを選択
3. エラーメッセージがないか確認

**正常な場合**: エラーメッセージは表示されません

**エラーが出る場合**:
- 「Referer restriction」エラー → 許可リストに `localhost:8000` が含まれているか確認
- 「API key not valid」エラー → APIキーの設定を再確認

---

### 2. Firebase Hostingでの動作確認（本番環境）

#### ステップ1: Firebase Hostingにデプロイ

```bash
firebase deploy --only hosting
```

#### ステップ2: デプロイ後のURLで確認

1. デプロイが完了すると、以下のURLが表示されます：
   - `https://musculoskeletal-us-lab.web.app`
   - `https://musculoskeletal-us-lab.firebaseapp.com`

2. これらのURLでアクセスして、正常に動作するか確認

#### ステップ3: ブラウザのコンソールで確認

1. 本番環境のURLでアクセス
2. ブラウザの開発者ツールを開く（F12）
3. 「Console」タブでエラーメッセージがないか確認

---

## 設定内容の確認

### Google Cloud Consoleで確認

1. [APIキー管理ページ](https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab) にアクセス
2. `AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0` をクリック
3. 以下の設定が正しく保存されているか確認：

**アプリケーションの制限**:
- ✅ 「HTTPリファラー（ウェブサイト）」が選択されている

**ウェブサイトの制限**:
- ✅ `https://musculoskeletal-us-lab.web.app/*`
- ✅ `https://musculoskeletal-us-lab.firebaseapp.com/*`
- ✅ `http://localhost:8000/*`
- ✅ `http://127.0.0.1:8000/*`
- ✅ `http://localhost:3000/*`
- ✅ `http://127.0.0.1:3000/*`

**APIの制限**（設定した場合）:
- ✅ 「キーを特定のAPIに制限する」が選択されている
- ✅ Firebase Authentication API
- ✅ Cloud Firestore API
- ✅ Firebase Cloud Functions API

---

## トラブルシューティング

### エラー: "Referer restriction"

**原因**: 現在のURLが許可リストに含まれていない

**解決策**:
1. 現在のURLを確認（ブラウザのアドレスバー）
2. Google Cloud ConsoleでAPIキーの設定を確認
3. 現在のURLが許可リストに含まれているか確認
4. 含まれていない場合は追加

**例**:
- `http://localhost:8080` でアクセスしている場合 → `http://localhost:8080/*` を追加
- カスタムドメインを使用している場合 → そのドメインを追加

### エラー: "API key not valid"

**原因**: APIキーの設定に問題がある、またはAPIの制限が厳しすぎる

**解決策**:
1. Google Cloud ConsoleでAPIキーの設定を確認
2. 「APIの制限」で必要なAPIがすべて選択されているか確認
3. 必要に応じて、追加のAPIを選択

### ローカルで動作しない

**確認事項**:
1. `localhost` と `127.0.0.1` の両方が許可リストに含まれているか
2. 使用しているポート番号（8000、3000など）が正しく設定されているか
3. `http://` と `https://` を区別しているか（ローカルは `http://`）

---

## 設定が正しく完了している場合

✅ ローカル開発環境（`http://localhost:8000`）で正常に動作する  
✅ 本番環境（`https://musculoskeletal-us-lab.web.app`）で正常に動作する  
✅ ブラウザのコンソールにエラーメッセージが表示されない  
✅ Firebase Authentication、Firestore、Functionsが正常に動作する  

---

## 次のステップ

APIキーの制限設定が完了したら：

1. ✅ **Firestore Security Rules** - 完了済み
2. ✅ **APIキーの制限設定** - 完了
3. ✅ **利用規約・プライバシーポリシー** - 完了済み
4. ✅ **解約方法の明確化** - 完了済み

**残りの作業**:
- 実際の情報への置き換え（`law.html`、`privacy.html`の連絡先など）
- 動作確認とテスト

---

**注意**: 設定を変更した後は、必ず動作確認を行ってください。許可されていないドメインからはAPIキーが使用できなくなります。

