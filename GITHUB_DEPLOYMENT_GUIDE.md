# Asoventure Cheese GitHubデプロイガイド

ソースコードをGitHubで管理し、そこから自動的にお客様のサイトを公開する（デプロイする）ための手順書です。

---

## 1. 組織(Organization)リポジトリへのプッシュ手順

まだGitHub上にリポジトリを作成していない場合、以下の手順で **dev-futuristicimagination** 組織の下に作成し、コードをアップロードしてください。

### 手順 A: GitHub上でリポジトリ作成
1. GitHubの組織ページへアクセス:  
   [https://github.com/orgs/dev-futuristicimagination/repositories](https://github.com/orgs/dev-futuristicimagination/repositories)
2. 右上の緑色の **「New repository」** ボタンをクリック。
3. **Owner** のドロップダウンで `dev-futuristicimagination` が選択されていることを確認。
4. **Repository name** にプロジェクト名を入力（例: `asoventure-cheese`）。
5. **Public** (公開) または **Private** (非公開) を選択。
   - ※ Vercelの無料プランを使う場合、基本的にはPublic推奨ですが、Privateでも連携可能です。
6. "Initialize this repository with..." のチェックボックスは **すべて外したまま** にしてください（ローカルにコードがあるため）。
7. **「Create repository」** をクリック。

### 手順 B: ローカルコードのプッシュ
リポジトリ作成完了画面に表示されるURL（例: `https://github.com/dev-futuristicimagination/asoventure-cheese.git`）を使用します。
PCのターミナル（コマンドプロンプト）で、プロジェクトのフォルダを開き、以下を順番に実行してください。

```bash
# 1. Gitの初期化
git init

# 2. 全ファイルをステージングエリアに追加
git add .

# 3. 最初のコミットを作成
git commit -m "Initial commit"

# 4. ブランチ名を main に変更（推奨）
git branch -M main

# 5. リモートリポジトリ（組織）を登録
# 重要: 下記URLの [リポジトリ名] は手順Aで決めた名前に書き換えてください
git remote add origin https://github.com/dev-futuristicimagination/[リポジトリ名].git

# 6. GitHubへプッシュ
git push -u origin main
```

---

## 2. デプロイ方法の選択

コードがGitHubに上がったら、以下のどちらかの方法で公開します。

### 方法1: GitHub + Vercel (推奨)

業界標準の方法です。設定が簡単で、HTTPS化や高速化も自動で行われます。

1. **Vercelにログイン**: [Vercel](https://vercel.com) にアクセスし、「Continue with GitHub」でログイン。
   - ※ Vercel上で `dev-futuristicimagination` 組織へのアクセス権限を求められた場合は「Grant」または「Request Access」を行ってください。
2. **新規プロジェクト作成**: ダッシュボードの「Add New...」>「Project」を選択。
3. **リポジトリの選択**: 先ほどプッシュした `dev-futuristicimagination/リポジトリ名` の横にある「Import」ボタンを押します。
4. **設定入力**:
   - **Framework Preset**: `Vite` が自動選択されているはずです（そのままでOK）。
   - **Root Directory**: `./` (そのままでOK)。
   - **Environment Variables**: WordPressと連携する場合、ここに設定を追加します。
     - Key: `VITE_WP_URL`
     - Value: `https://あなたのWordPressサイト.com`
5. **Deploy**: 「Deploy」ボタンをクリック。

### 方法2: GitHub Pages (完全無料)

GitHubの機能だけで公開する方法です。
URLは `https://dev-futuristicimagination.github.io/リポジトリ名/` になります。

#### 手順 1: `vite.config.ts` の設定
プロジェクトルートに `vite.config.ts` を作成（既にある場合は編集）し、`base` にリポジトリ名を設定します。

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 重要: リポジトリ名を指定（前後にスラッシュ必須）
  base: '/リポジトリ名/', 
})
```

#### 手順 2: デプロイ用パッケージのインストール
```bash
npm install --save-dev gh-pages
```

#### 手順 3: `package.json` の編集
`package.json` に以下を追記します。

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 手順 4: デプロイ実行
```bash
npm run deploy
```

成功すると `Published` と表示されます。
その後、GitHubのリポジトリ画面 > **Settings** > **Pages** を開き、Sourceが `gh-pages` ブランチになっていることを確認してください。
