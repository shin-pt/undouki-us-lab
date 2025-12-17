# カスタムドメイン統合ガイド

## 概要

`https://musculoskeletal-us-lab.com/` を `https://musculoskeletal-us-lab.web.app` のFirebase Hostingに統合する手順です。

## 現在の状況

- **Firebase Hosting**: `https://musculoskeletal-us-lab.web.app` ✅ 動作中
- **カスタムドメイン**: `https://musculoskeletal-us-lab.com/` （現在は別のホスティングサービスで動作中）

## 統合手順

### ステップ1: Firebaseコンソールでカスタムドメインを追加

1. [Firebase Console](https://console.firebase.google.com/project/musculoskeletal-us-lab/hosting) にアクセス
2. 「Hosting」セクションを開く
3. 「カスタムドメインを追加」をクリック
4. `musculoskeletal-us-lab.com` を入力
5. 「続行」をクリック

### ステップ2: DNS設定の確認

Firebaseコンソールで、以下のようなDNS設定が表示されます：

#### オプションA: Aレコード（推奨）
```
タイプ: A
名前: @
値: 151.101.1.195
     151.101.65.195
```

#### オプションB: CNAMEレコード
```
タイプ: CNAME
名前: @
値: musculoskeletal-us-lab.web.app
```

### ステップ3: DNSプロバイダーで設定を変更

現在、`musculoskeletal-us-lab.com`はGitHub Pagesでホスティングされている可能性があります。

#### DNS設定の変更方法

1. **ドメイン登録サービス（例：お名前.com、GoDaddy、Route 53など）にログイン**
2. **DNS設定**または**ネームサーバー設定**を開く
3. **既存のAレコードを削除**（GitHub Pages用の設定）
4. **Firebaseコンソールで表示された設定を追加**

#### 具体的な設定例

**Aレコードを使用する場合**:
```
タイプ: A
名前: @ (または空白)
値: 151.101.1.195
TTL: 3600

タイプ: A
名前: @ (または空白)
値: 151.101.65.195
TTL: 3600
```

**CNAMEレコードを使用する場合**:
```
タイプ: CNAME
名前: @ (または空白)
値: musculoskeletal-us-lab.web.app
TTL: 3600
```

**wwwサブドメインも設定する場合**:
```
タイプ: CNAME
名前: www
値: musculoskeletal-us-lab.web.app
TTL: 3600
```

### ステップ4: DNS設定の反映を待つ

DNS設定の変更は、通常**数分から48時間**かかります。多くの場合、**15分〜1時間**程度で反映されます。

確認方法：
```bash
# DNS設定の確認
dig musculoskeletal-us-lab.com

# または
nslookup musculoskeletal-us-lab.com
```

### ステップ5: SSL証明書の自動発行を待つ

Firebaseは自動的にSSL証明書を発行します。通常、DNS設定が反映されてから**数時間**かかります。

Firebaseコンソールで「SSL証明書の状態」を確認できます。

### ステップ6: 動作確認

DNS設定とSSL証明書が完了したら、以下を確認：

1. `https://musculoskeletal-us-lab.com/` にアクセス
2. `https://musculoskeletal-us-lab.web.app/` と同じ内容が表示されることを確認
3. SSL証明書が有効であることを確認（ブラウザの鍵アイコン）

## 注意事項

### 1. 既存のホスティングサービスの停止

現在`musculoskeletal-us-lab.com`で別のホスティングサービスを使用している場合、DNS設定を変更する前に：

- **バックアップを取得**
- **重要なデータを保存**
- **移行計画を立てる**

### 2. ダウンタイム

DNS設定の変更中は、一時的にアクセスできない可能性があります。通常は数分程度です。

### 3. サブドメイン

`www.musculoskeletal-us-lab.com`も使用する場合は、CNAMEレコードを追加してください。

### 4. Firebase Hostingの制限

- カスタムドメインは1つのFirebaseプロジェクトに複数追加可能
- SSL証明書は自動的に発行されます（無料）

## トラブルシューティング

### DNS設定が反映されない

1. **TTLを短く設定**（例：300秒）
2. **DNSキャッシュをクリア**
   ```bash
   # macOS/Linux
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```
3. **別のDNSサーバーで確認**（例：Google DNS: 8.8.8.8）

### SSL証明書が発行されない

1. **DNS設定が正しく反映されているか確認**
2. **Firebaseコンソールでエラーメッセージを確認**
3. **数時間待つ**（最大48時間）

### アクセスできない

1. **ブラウザのキャッシュをクリア**
2. **シークレットモードで確認**
3. **別のネットワークから確認**

## 確認コマンド

```bash
# DNS設定の確認
dig musculoskeletal-us-lab.com +short

# SSL証明書の確認
openssl s_client -connect musculoskeletal-us-lab.com:443 -servername musculoskeletal-us-lab.com

# リダイレクトの確認
curl -I https://musculoskeletal-us-lab.com/
```

## 参考リンク

- [Firebase Hosting カスタムドメイン](https://firebase.google.com/docs/hosting/custom-domain)
- [Firebase Console - Hosting](https://console.firebase.google.com/project/musculoskeletal-us-lab/hosting)

