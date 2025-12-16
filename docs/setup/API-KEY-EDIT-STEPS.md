# APIキー編集の正しい手順

## 現在の状況

Firebase Consoleの「プロジェクトの設定」ページで設定コードが表示されていますが、ここでは編集できません。

**APIキーの編集は、Google Cloud Consoleで行います。**

---

## 正しい手順

### ステップ1: Google Cloud Consoleに直接アクセス

以下のリンクをクリックしてください：

**👉 [APIキー管理ページ（直接リンク）](https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab)**

または：

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクト「**musculoskeletal-us-lab**」を選択（上部のプロジェクト選択ドロップダウンから）
3. 左メニューから「**APIとサービス**」→「**認証情報**」をクリック

### ステップ2: APIキーを探す

1. 「認証情報」ページが開きます
2. 「APIキー」セクションを探します
3. 以下のAPIキーを探します：
   - `AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0`
   - または、名前が「ブラウザキー」や「Web APIキー」と表示されているもの

### ステップ3: APIキーをクリック

1. APIキー名（またはキー自体）を**クリック**します
2. APIキーの詳細ページが開きます

### ステップ4: アプリケーションの制限を設定

1. 「**アプリケーションの制限**」セクションを探します
2. 「**HTTPリファラー（ウェブサイト）**」を選択します
3. 「**ウェブサイトの制限**」セクションが表示されます

### ステップ5: ウェブサイトの制限を追加

「**+ 項目を追加**」ボタンをクリックして、以下のURLを1つずつ追加します：

```
https://musculoskeletal-us-lab.web.app/*
https://musculoskeletal-us-lab.firebaseapp.com/*
http://localhost:8000/*
http://127.0.0.1:8000/*
http://localhost:3000/*
http://127.0.0.1:3000/*
```

**入力方法**:
- 「+ 項目を追加」をクリック
- テキストボックスに1つのURLを入力
- 再度「+ 項目を追加」をクリックして次のURLを入力
- これを6回繰り返す

### ステップ6: APIの制限を設定（推奨）

1. 「**APIの制限**」セクションを探します
2. 「**キーを特定のAPIに制限する**」を選択します
3. 「**APIを選択**」ボタンをクリック
4. 検索ボックスに「Firebase」と入力
5. 以下のAPIにチェックを入れます：
   - ✅ **Firebase Authentication API**
   - ✅ **Cloud Firestore API**
   - ✅ **Firebase Cloud Functions API**
6. 「**完了**」をクリック

### ステップ7: 保存

1. ページの上部にある「**保存**」ボタンをクリック
2. 確認メッセージが表示されたら「**OK**」をクリック

---

## もしGoogle Cloud Consoleにアクセスできない場合

### 方法A: Firebase Consoleからリンクを探す

1. Firebase Consoleの「プロジェクトの設定」ページで
2. 「全般」タブを開く
3. 「APIキー」セクションの下に
4. 「**Google Cloud Console で API キーを管理**」というリンクを探す
5. そのリンクをクリック

### 方法B: 直接URLにアクセス

ブラウザのアドレスバーに以下を入力：

```
https://console.cloud.google.com/apis/credentials?project=musculoskeletal-us-lab
```

---

## 画面の見つけ方

Google Cloud Consoleで以下のような画面になっているはずです：

```
┌─────────────────────────────────────────┐
│ 認証情報                                │
├─────────────────────────────────────────┤
│                                         │
│  APIキー                                │
│  ┌───────────────────────────────────┐ │
│  │ AIzaSyAGKikNortFcMI_uLnGn2y_OyI6Z │ │ ← これをクリック
│  │ yxLiR0                             │ │
│  └───────────────────────────────────┘ │
│                                         │
│  OAuth 2.0 クライアント ID             │
│  ...                                    │
└─────────────────────────────────────────┘
```

---

## トラブルシューティング

### Q: Google Cloud Consoleにログインできない

**A**: Firebase Consoleと同じGoogleアカウントでログインしてください。

### Q: プロジェクトが見つからない

**A**: 上部のプロジェクト選択ドロップダウンから「**musculoskeletal-us-lab**」を選択してください。

### Q: APIキーが見つからない

**A**: 
1. 「認証情報」ページの「APIキー」セクションを確認
2. 複数のAPIキーがある場合は、`AIzaSyAGKikNortFcMI_uLnGn2y_OyI6ZyxLiR0` を探す
3. 見つからない場合は、新しいAPIキーを作成する必要があるかもしれません

### Q: 「編集」ボタンが見つからない

**A**: APIキー名（またはキー自体）を**クリック**すると、編集画面が開きます。「編集」ボタンを探す必要はありません。

---

## 確認方法

設定が完了したら：

1. ローカル開発環境で動作確認：
   ```bash
   python3 -m http.server 8000
   ```
   - `http://localhost:8000` で正常に動作するか確認

2. エラーが出る場合：
   - ブラウザのコンソール（F12）でエラーメッセージを確認
   - 「Referer restriction」エラーが出る場合は、許可リストに現在のURLが含まれているか確認

---

**重要**: Firebase Consoleの設定コード表示ページでは編集できません。必ずGoogle Cloud Consoleから編集してください。

