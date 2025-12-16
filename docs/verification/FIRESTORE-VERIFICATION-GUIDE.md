# Firestoreへの保存確認ガイド

## 確認方法1: Firebase Consoleで直接確認（最も確実）

### ステップ1: Firebase Consoleにアクセス

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. プロジェクト「musculoskeletal-us-lab」を選択

### ステップ2: Firestore Databaseを開く

1. 左メニューから「Firestore Database」をクリック
2. 「データ」タブが選択されていることを確認

### ステップ3: usersコレクションを確認

1. 左側のコレクション一覧から「users」をクリック
2. ドキュメント一覧が表示されます
3. 自分のユーザーID（Firebase AuthenticationのUID）のドキュメントを探す

### ステップ4: プラン情報を確認

ドキュメントを開くと、以下のフィールドが表示されます：

```
email: "your-email@example.com"
plan: "basic" または "premium" または null
planStartDate: Timestamp (プラン登録日時)
createdAt: Timestamp (アカウント作成日時)
updatedAt: Timestamp (最終更新日時)
```

**確認ポイント：**
- ✅ `plan`フィールドに`"basic"`または`"premium"`が設定されているか
- ✅ `planStartDate`が設定されているか
- ✅ `updatedAt`が最新の日時に更新されているか

## 確認方法2: ブラウザのコンソールで確認

### ステップ1: 開発者ツールを開く

1. `plans.html?test=true`を開いた状態で、ブラウザの開発者ツールを開く
   - Windows/Linux: `F12` または `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

2. 「Console」タブを選択

### ステップ2: プラン更新時のログを確認

プランボタンをクリックすると、以下のようなログが表示されます：

```
📝 Pending plan registration saved: basic for user [ユーザーID]
```

プラン更新が成功すると：

```
プランが1980円プランに更新されました。
```

エラーがある場合は、赤色のエラーメッセージが表示されます。

### ステップ3: Firestoreのデータを直接確認（上級者向け）

コンソールに以下のコードを入力して実行：

```javascript
// Firebase SDKが読み込まれていることを確認
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// 現在のユーザーIDを取得（ログインしている必要があります）
const userId = firebase.auth().currentUser.uid;

// Firestoreからユーザー情報を取得
const db = firebase.firestore();
const userDoc = await db.collection('users').doc(userId).get();

// データを表示
console.log('ユーザー情報:', userDoc.data());
console.log('プラン:', userDoc.data().plan);
```

## 確認方法3: アプリ内でプラン情報を確認

### 方法A: salon.htmlで確認

1. `salon.html`にアクセス
2. ページ上部にプラン情報が表示されます：
   - 「現在のプラン: 1980円プラン」または「現在のプラン: 2980円プラン」
   - プランの説明も表示されます

### 方法B: member.htmlで確認

1. `member.html`にアクセス
2. ユーザー情報セクションにプラン情報が表示される場合があります
   （現在の実装では表示されていない可能性があります）

## 確認方法4: プラン制限の動作を確認

### ステップ1: salon.htmlでコンテンツを確認

1. `salon.html`にアクセス
2. プラン情報が正しく表示されることを確認

### ステップ2: プラン制限のあるコンテンツを確認

1. 1980円プランに登録した場合：
   - 「1980円プラン」バッジが付いたコンテンツが表示される
   - 「2980円プラン」バッジが付いたコンテンツは表示されない

2. 2980円プランに登録した場合：
   - すべてのコンテンツが表示される

### ステップ3: プラン変更をテスト

1. `plans.html?test=true`に戻る
2. 別のプランに変更する
3. `salon.html`でコンテンツの表示が変わることを確認

## トラブルシューティング

### Q: Firebase Consoleで`plan`フィールドが表示されない

**A:** 以下を確認してください：
1. 正しいドキュメント（ユーザーID）を開いているか
2. プラン更新が実際に実行されたか（コンソールのログを確認）
3. Firestoreのセキュリティルールで書き込みが許可されているか

### Q: コンソールにエラーが表示される

**A:** よくあるエラーと対処法：

1. **Permission denied**
   - Firestoreのセキュリティルールを確認
   - `users`コレクションへの書き込みが許可されているか確認

2. **User not logged in**
   - Firebase Authenticationでログインしているか確認
   - `auth.html`でログインし直す

3. **Document not found**
   - ユーザードキュメントが作成されているか確認
   - 会員登録が完了しているか確認

### Q: プランが更新されない

**A:** 以下を順番に確認：

1. **ブラウザのコンソール（F12）でエラーを確認**
   ```javascript
   // コンソールにエラーが表示されていないか確認
   ```

2. **Firestoreのセキュリティルールを確認**
   ```javascript
   // Firebase Console → Firestore Database → ルール
   // usersコレクションへの書き込みが許可されているか確認
   ```

3. **ネットワーク接続を確認**
   - インターネット接続が正常か確認
   - Firebaseへの接続が可能か確認

## セキュリティルールの確認

Firebase Consoleで以下のルールが設定されているか確認：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 推奨される確認手順

1. ✅ **Firebase Consoleで直接確認**（最も確実）
2. ✅ **salon.htmlでプラン情報が表示されるか確認**（ユーザー視点）
3. ✅ **プラン制限のあるコンテンツが正しく表示されるか確認**（機能確認）

これらの確認が完了すれば、Firestoreへの保存が正しく行われていることが確認できます。

