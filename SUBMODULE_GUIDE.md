# Gitサブモジュール管理ガイド

## ✅ サブモジュール設定完了

`echo-quiz-app`をGitサブモジュールとして管理するように設定しました。

## 📋 サブモジュールとは

サブモジュールを使用することで、`echo-quiz-app`を独立したGitリポジトリとして管理しながら、`undouki-us-lab`リポジトリ内に含めることができます。

## 🔧 サブモジュールの操作方法

### 初回クローン時

他の人がリポジトリをクローンする場合：

```bash
# サブモジュールを含めてクローン
git clone --recursive https://github.com/shin-pt/undouki-us-lab.git

# または、クローン後にサブモジュールを初期化
git clone https://github.com/shin-pt/undouki-us-lab.git
cd undouki-us-lab
git submodule init
git submodule update
```

### echo-quiz-appの更新

`echo-quiz-app`ディレクトリ内で変更を加える場合：

```bash
cd echo-quiz-app

# 変更をコミット
git add .
git commit -m "変更内容"

# echo-quiz-appのリポジトリにプッシュ
git push origin main

# 親リポジトリに戻る
cd ..

# サブモジュールの変更を親リポジトリに反映
git add echo-quiz-app
git commit -m "echo-quiz-appを最新版に更新"
git push origin main
```

### サブモジュールの更新を取得

他の人が`echo-quiz-app`を更新した場合：

```bash
# サブモジュールを最新版に更新
git submodule update --remote echo-quiz-app

# または、すべてのサブモジュールを更新
git submodule update --remote
```

### サブモジュールの状態確認

```bash
# サブモジュールの状態を確認
git submodule status

# 詳細な状態を確認
git status
```

## ⚠️ 注意事項

1. **サブモジュールの変更は別々にコミット**
   - `echo-quiz-app`内の変更は、`echo-quiz-app`のリポジトリにコミット
   - 親リポジトリ（`undouki-us-lab`）には、サブモジュールの参照のみをコミット

2. **クローン時は`--recursive`オプションを使用**
   - 通常の`git clone`ではサブモジュールは空のディレクトリになります
   - `--recursive`オプションでサブモジュールも一緒にクローンされます

3. **サブモジュールの変更を忘れない**
   - `echo-quiz-app`を変更したら、必ず`echo-quiz-app`のリポジトリにもプッシュしてください

## 🔄 開発フロー

### echo-quiz-appを開発する場合

```bash
# echo-quiz-appディレクトリに移動
cd echo-quiz-app

# 通常のGit操作（add, commit, push）
git add .
git commit -m "変更内容"
git push origin main

# 親リポジトリに戻って、サブモジュールの参照を更新
cd ..
git add echo-quiz-app
git commit -m "echo-quiz-appを更新"
git push origin main
```

### 親リポジトリ（undouki-us-lab）を更新する場合

```bash
# 通常のGit操作
git add .
git commit -m "変更内容"
git push origin main
```

## 📝 現在の設定

`.gitmodules`ファイルに以下の設定が保存されています：

```
[submodule "echo-quiz-app"]
    path = echo-quiz-app
    url = https://github.com/shin-pt/echo-quiz-app.git
```

この設定により、`echo-quiz-app`は独立したリポジトリとして管理されます。

