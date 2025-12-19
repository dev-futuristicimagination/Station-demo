# Asoventure Cheese ヘッドレスCMS設定ガイド

本アプリは、コンテンツ管理システム（CMS）として **WordPress** を利用する前提で設計されています。
デプロイ完了後（VercelのURL発行後）は、以下の手順に従って接続を確立してください。

---

## 1. WordPress側の設定 (CORS許可)

あなたのVercelサイト (`https://station-demo-alpha.vercel.app/`) から、WordPressのデータを取得できるように許可を出します。
これをしないと、サイト上で「記事が読み込めない」状態になります。

### 最も簡単な方法: Code Snippetsプラグインを使う
`functions.php` を直接編集するのが怖い場合、**「Code Snippets」** というプラグイン（無料）を使うのが最も安全です。

1. WordPress管理画面 > プラグイン > 新規追加 で「Code Snippets」を検索してインストール・有効化。
2. Snippets > Add New をクリック。
3. タイトルに「CORS設定」などと入力。
4. **Code欄に以下のPHPコードを貼り付け**。
5. 「Save Changes and Activate」をクリック。

```php
add_action( 'init', function() {
    // 特定のドメインのみ許可する場合（セキュリティ高）
    // あなたのVercelのURLに書き換えてください
    header("Access-Control-Allow-Origin: https://station-demo-alpha.vercel.app");
    
    // ※ もしうまくいかない場合は、一時的に以下のように * (すべて許可) にしてもOKです
    // header("Access-Control-Allow-Origin: *");

    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
});
```

### テーマファイルを直接編集する場合
テーマの `functions.php` の一番下に追記します。

```php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: https://station-demo-alpha.vercel.app"); 
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
}
add_action('init', 'add_cors_http_header');
```

---

## 2. Vercel側の設定 (接続先指定)

Vercelに「どのWordPressからデータを取ってくるか」を教えます。

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセスし、該当のプロジェクトを開きます。
2. 上部タブの **Settings** > 左メニューの **Environment Variables** をクリック。
3. 以下を入力して「Add」をクリックします。
   - **Key:** `VITE_WP_URL`
   - **Value:** `https://your-wordpress-site.com` (あなたのWordPressのトップページURL)
     - ※ 末尾にスラッシュ `/` は不要です。
4. **重要: 設定を反映させるために、Deploymentsタブに戻り、最新のデプロイの「...」メニューから「Redeploy」を実行してください。**

---

## 3. 記事データの作成ルール

本アプリのデザインに合わせて、WordPressの投稿を以下のように作成してください。

- **タイトル:** 記事のタイトルを入力
- **本文:** ブロックエディタまたはクラシックエディタで記述（HTMLとして解析されます）
- **アイキャッチ画像:** 記事一覧のサムネイルとして表示されます
- **カテゴリー:** 以下の「スラッグ（Slug）」を持つカテゴリーを作成・設定すると、自動的にラベル分けされます。
  - `career` (表示名: CAREER)
  - `tax` (表示名: TAX & MONEY)
  - `skill` (表示名: SKILL UP)
  - ※ カテゴリ設定がない場合は「INSIGHT」と表示されます。

---

## 4. トラブルシューティング

### Q. 記事が表示されず、ローディングのままになる
- ブラウザでサイトを開き、F12キーを押して「Console」タブを見てください。
- 赤文字で `Access to fetch ... has been blocked by CORS policy` と表示されている場合、**手順1（WordPress側のCORS設定）** が正しく反映されていません。
  - コードスニペットが「Active」になっているか確認してください。
  - WordPress側にキャッシュ系プラグインが入っている場合、キャッシュをクリアしてください。

### Q. 画像が表示されない
- WordPress側で設定したアイキャッチ画像のURLが、`http://`（SSLなし）になっていないか確認してください。Vercelは `https` なので、画像も `https` である必要があります。
