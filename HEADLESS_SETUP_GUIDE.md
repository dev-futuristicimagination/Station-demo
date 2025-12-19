# Asoventure Cheese ヘッドレスCMS設定ガイド

本アプリは、コンテンツ管理システム（CMS）として **WordPress** を利用する前提で設計されています。
以下の手順に従って、WordPressとフロントエンド（Reactアプリ）を接続してください。

---

## 1. WordPressの準備

### サーバーの用意
WordPressが動作するサーバーであれば、どこでも構いません（Xserver, ConoHa, AWS Lightsail, Localなど）。
**注意:** フロントエンドからAPI経由でデータを取得するため、インターネット上からアクセスできる必要があります。

### 必須プラグイン
基本的には標準機能（WP REST API）を使用しますが、以下のプラグイン導入を推奨します。

1. **WP REST API Cache** (推奨)
   - APIのレスポンスをキャッシュし、表示速度を劇的に向上させます。
2. **Advanced Custom Fields (ACF)** (任意)
   - 記事に独自のフィールド（例: 募集期限、報酬額など）を追加したい場合に利用します。

---

## 2. 接続設定 (CORS対応)

フロントエンド（Vercel等）とバックエンド（WordPress）のドメインが異なる場合、**CORS（Cross-Origin Resource Sharing）エラー**が発生し、記事が取得できないことがあります。

以下のコードを、WordPressテーマの `functions.php` に追記してください。
※ または、「WP CORS」などのプラグインを使用して許可設定を行ってください。

```php
// functions.php に追記
function add_cors_http_header(){
    // 許可するフロントエンドのドメインを指定（本番URLが決まったら書き換えることを推奨）
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
}
add_action('init', 'add_cors_http_header');
```

---

## 3. フロントエンドとの連携

本アプリ側での設定は、環境変数 `VITE_WP_URL` を指定するだけです。

### ローカル開発時 (.env)
プロジェクトルートに `.env` ファイルを作成し、WordPressのトップページURLを設定します。

```env
VITE_WP_URL=https://your-wordpress-site.com
```

### 本番デプロイ時 (Vercel/Netlify)
ホスティングサービスの管理画面で、Environment Variables（環境変数）として設定します。

- **Key:** `VITE_WP_URL`
- **Value:** `https://your-wordpress-site.com`

---

## 4. 記事データの作成ルール

本アプリのデザインに合わせて、WordPressの投稿を以下のように作成してください。

- **タイトル:** 記事のタイトルを入力
- **本文:** ブロックエディタまたはクラシックエディタで記述（HTMLとして解析されます）
- **アイキャッチ画像:** 記事一覧のサムネイルとして表示されます
- **カテゴリー:** 以下のスラッグ（Slug）を持つカテゴリーを作成・設定すると、自動的にラベル分けされます。
  - `career` (CAREER)
  - `tax` (TAX & MONEY)
  - `skill` (SKILL UP)
  - ※ カテゴリ設定がない場合は「INSIGHT」と表示されます。

---

## 5. トラブルシューティング

### Q. 記事が表示されず、ローディングのままになる
- ブラウザのデベロッパーツール（F12）の「Console」を確認してください。
- `Access to fetch ... has been blocked by CORS policy` と表示されている場合、上記の手順2（CORS設定）が正しく行われていません。

### Q. 画像が表示されない
- WordPress側で設定したアイキャッチ画像のURLが、`http://`（SSLなし）になっていないか確認してください。フロントエンドが `https` の場合、画像も `https` である必要があります。