# Firebase APIキー制限設定 - 詳細手順

## ステップ4の詳細説明

APIキーの編集には2つの方法があります。**方法1（Firebase Console）**を推奨します。

---

## 方法1: Firebase Consoleから編集（推奨・簡単）

### ステップ4-1: APIキーセクションを確認

1. Firebase Consoleで「プロジェクトの設定」を開いている状態で
2. 「全般」タブの「APIキー」セクションを下にスクロール
3. 以下のような表示が見つかります：

```
APIキー
AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0  [編集] [削除]
```

### ステップ4-2: 「編集」をクリック

1. APIキー `AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0` の右側にある「**編集**」ボタンをクリック
   - または、APIキー自体をクリック

### ステップ4-3: 編集画面が開く

クリックすると、新しいページまたはモーダルウィンドウが開きます。

**もし「編集」ボタンが見つからない場合** → **方法2**に進んでください。

---

## 方法2: Google Cloud Consoleから編集（確実）

Firebase Consoleに「編集」ボタンがない場合は、Google Cloud Consoleから編集します。

### ステップ4-1: Google Cloud Consoleにアクセス

1. Firebase Consoleの「プロジェクトの設定」ページで
2. 「全般」タブの「APIキー」セクションの下に
3. 「**Google Cloud Console で API キーを管理**」というリンクをクリック
   - または、直接 [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab) にアクセス

### ステップ4-2: APIキーを選択

1. Google Cloud Consoleの「認証情報」ページが開きます
2. 「APIキー」の一覧から `AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0` を探します
3. APIキー名（またはキー自体）をクリック

### ステップ4-3: 編集画面が開く

APIキーの詳細ページが開きます。

---

## ステップ5: アプリケーションの制限を設定

編集画面が開いたら、以下の設定を行います：

### 5-1: 「アプリケーションの制限」を選択

1. ページの「**アプリケーションの制限**」セクションを探します
2. デフォルトでは「**なし**」が選択されているはずです
3. ドロップダウンメニューから「**HTTPリファラー（ウェブサイト）**」を選択

### 5-2: ウェブサイトの制限を追加

「**ウェブサイトの制限**」というテキストボックスまたは入力欄が表示されます。

以下のURLを**1行ずつ**追加します：

```
https://musculoskeletal-us-lab.web.app/*
https://musculoskeletal-us-lab.firebaseapp.com/*
http://localhost:8000/*
http://127.0.0.1:8000/*
http://localhost:3000/*
http://127.0.0.1:3000/*
```

**入力方法**:
- 「+ 項目を追加」ボタンをクリックして、1つずつ追加する
- または、テキストボックスに1行ずつ入力する

**重要**: 
- 各行の最後に `/*` を付ける（すべてのパスを許可）
- `http://` と `https://` を区別する
- `localhost` と `127.0.0.1` の両方を追加する

---

## ステップ6: APIの制限を設定（推奨）

### 6-1: 「APIの制限」を選択

1. ページの「**APIの制限**」セクションを探します
2. 「**キーを特定のAPIに制限する**」を選択

### 6-2: APIを選択

以下のAPIにチェックを入れます：

- ✅ **Firebase Authentication API**
- ✅ **Cloud Firestore API**
- ✅ **Firebase Cloud Functions API**

**検索方法**:
- 「APIを選択」の検索ボックスに「Firebase」と入力
- または、スクロールして該当するAPIを探す

---

## ステップ7: 保存

1. ページの下部または上部にある「**保存**」ボタンをクリック
2. 確認メッセージが表示されたら「**OK**」または「**保存**」をクリック

---

## 設定後の確認

### 確認1: 設定が保存されたか確認

1. APIキーの詳細ページで、設定した内容が表示されているか確認
2. 「アプリケーションの制限」が「HTTPリファラー（ウェブサイト）」になっているか
3. 「ウェブサイトの制限」に追加したURLが表示されているか

### 確認2: 動作確認

1. ローカル開発環境で動作確認：
   ```bash
   python3 -m http.server 8000
   ```
   - `http://localhost:8000` で正常に動作するか確認

2. エラーが出る場合：
   - ブラウザのコンソール（F12）でエラーメッセージを確認
   - 「Referer restriction」エラーが出る場合は、許可リストに現在のURLが含まれているか確認

---

## よくある質問

### Q: 「編集」ボタンが見つかりません

**A**: Google Cloud Consoleから直接編集してください。
- [Google Cloud Console - 認証情報](https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab) にアクセス
- APIキーを選択して編集

### Q: 「HTTPリファラー（ウェブサイト）」のオプションが見つかりません

**A**: 正しいAPIキーを編集しているか確認してください。
- Firebase用のAPIキー（`AIzaSy...`で始まる）を選択しているか確認
- 別のAPIキーを編集している可能性があります

### Q: 設定後、ローカルで動作しなくなりました

**A**: 許可リストに `localhost` と `127.0.0.1` が追加されているか確認してください。
- 使用しているポート番号（8000など）も正しく設定されているか確認
- ブラウザのコンソール（F12）でエラーメッセージを確認

---

## トラブルシューティング

### エラー: "API key not valid"

**原因**: APIキーの制限が厳しすぎる、または許可リストに現在のドメインが含まれていない

**解決策**:
1. Google Cloud ConsoleでAPIキーの設定を確認
2. 現在のURL（例: `http://localhost:8000`）が許可リストに含まれているか確認
3. 含まれていない場合は追加

### エラー: "Referer restriction"

**原因**: HTTPリファラー制限により、現在のサイトが許可されていない

**解決策**:
1. 現在のURLを確認（ブラウザのアドレスバー）
2. そのURLが許可リストに含まれているか確認
3. 含まれていない場合は追加（ポート番号も含めて）

---

## 参考リンク

- [Firebase Console](https://console.firebase.google.com/project/musculoskeletal-us-lab/settings/general)
- [Google Cloud Console - 認証情報](https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab)
- [Firebase APIキーの制限 - 公式ドキュメント](https://firebase.google.com/docs/projects/api-keys)

---

**注意**: 設定を変更すると、すぐに反映されます。許可されていないドメインからはAPIキーが使用できなくなるため、開発環境と本番環境の両方のドメインを追加することを忘れないでください。

