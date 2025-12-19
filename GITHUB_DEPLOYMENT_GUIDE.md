# Asoventure Cheese GitHubデプロイガイド

ソースコードをGitHubで管理し、そこから自動的にお客様のサイトを公開する（デプロイする）ための手順書です。
大きく分けて2つの方法があります。

1. **GitHub + Vercel** (推奨・最も簡単)
2. **GitHub Pages** (完全無料・GitHubだけで完結)

---

## 前提条件

- GitHubアカウントを持っていること
- ローカル環境にGitがインストールされていること
- ソースコードがGitHubのリポジトリにプッシュされていること

```bash
# まだGitHubに上げていない場合のコマンド例
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

---

## 方法1: GitHub + Vercel (推奨)

業界標準の方法です。設定が簡単で、HTTPS化や高速化も自動で行われます。

### 手順

1. **Vercelにログイン**: [Vercel](https://vercel.com) にアクセスし、「Continue with GitHub」でログインします。
2. **新規プロジェクト作成**: ダッシュボードの「Add New...」>「Project」を選択。
3. **リポジトリの選択**: GitHubにある `Asoventure-Cheese` (または任意のリポジトリ名) の横にある「Import」ボタンを押します。
4. **設定入力**:
   - **Framework Preset**: `Vite` が自動選択されているはずです（そのままでOK）。
   - **Root Directory**: `./` (そのままでOK)。
   - **Environment Variables**: WordPressと連携する場合、ここに設定を追加します。
     - Key: `VITE_WP_URL`
     - Value: `https://あなたのWordPressサイト.com`
5. **Deploy**: 「Deploy」ボタンをクリック。

### 運用
今後、ローカルでコードを編集し、GitHubの `main` ブランチにプッシュするたびに、Vercelが自動的に検知してサイトを更新します。

---

## 方法2: GitHub Pages (GitHubのみで完結)

外部サービスを使わず、GitHubの機能だけで公開する方法です。
URLは `https://ユーザー名.github.io/リポジトリ名/` になります。

### 手順 1: `vite.config.ts` の設定

GitHub Pagesはサブディレクトリ（例: `/repo-name/`）で公開されるため、設定ファイルでベースパスを指定する必要があります。

プロジェクトルートに `vite.config.ts` を作成（既にある場合は編集）します：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 重要: リポジトリ名を指定（前後にスラッシュ）
  base: '/リポジトリ名/', 
})
```

### 手順 2: デプロイ用パッケージのインストール

`gh-pages` というツールを使うと簡単にデプロイできます。

```bash
npm install --save-dev gh-pages
```

### 手順 3: `package.json` の編集

`package.json` に、以下の設定を追記します。

```json
{
  // ...既存の設定
  "scripts": {
    // ...既存のscripts
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 手順 4: デプロイ実行

ターミナルで以下のコマンドを実行します。

```bash
npm run deploy
```

成功すると `Published` と表示されます。
GitHubのリポジトリ設定 > Pages > 「Visit Site」から公開されたサイトを確認できます。

### 注意点: 環境変数について

GitHub Pagesは静的ホスティングのため、`.env` ファイルの内容はビルド時（`npm run build` 時）に埋め込まれます。
環境変数を変更したい場合は、ローカルの `.env` を書き換えて、再度 `npm run deploy` を実行してください。

---

## よくあるエラーと対処

### Q. GitHub Pagesで画面が真っ白になる / 404エラー
**原因:** `vite.config.ts` の `base` 設定が間違っている可能性が高いです。
**対策:** `base: '/リポジトリ名/'` が、実際のGitHubリポジトリ名と完全に一致しているか確認してください。

### Q. Vercelでビルドエラーになる
**原因:** `package-lock.json` や `yarn.lock` がGitに含まれていない、または依存関係のエラー。
**対策:** ローカルで `npm install` が成功することを確認し、ロックファイルもGitHubにプッシュしてください。

### Q. WordPressの記事が表示されない
**原因:** `VITE_WP_URL` の設定漏れ、またはCORSエラー。
**対策:** 
1. VercelのSettings > Environment Variables を確認。
2. ブラウザの開発者ツール(F12) > Console で「CORS error」が出ていないか確認（出ている場合はWordPress側の設定が必要）。
