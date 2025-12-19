/**
 * Asoventure Cheese CMS Service
 */

const WP_SITE_URL = (import.meta as any).env?.VITE_WP_URL || 'https://demo.wp-api.org';
const API_URL = `${WP_SITE_URL}/wp-json/wp/v2`;

export interface Article {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  thumbnail?: string;
  content: string;
  excerpt?: string; // SEO用に抜粋を追加
}

const MOCK_ARTICLES: Article[] = [
  {
    id: "mock-1",
    title: "「週1から始めるCTO」という選択肢。本業と両立するキャリア戦略",
    category: "CAREER",
    publishedAt: "2025.02.15",
    thumbnail: "https://images.unsplash.com/photo-1553877616-1528053f5502?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>なぜ今、スポットCTOが求められているのか</h2>
      <p>スタートアップの初期フェーズにおいて、フルタイムのCTOを採用するのはコスト的にもリスクが高いのが現状です。そこで注目されているのが、経験豊富なエンジニアが週1〜2回の頻度で技術顧問的に関わるスタイルです。</p>
      <h2>メリットとデメリット</h2>
      <p>最大のメリットは、複数の企業の技術課題に触れることで、エンジニアとしての視座が圧倒的に高まることです。一方で、コンテキストスイッチのコストや、本業とのスケジュール調整には工夫が必要です。</p>
    `,
    excerpt: "スタートアップの初期フェーズにおいて注目されている「スポットCTO」。週1〜2回の頻度で技術顧問的に関わるスタイルのメリットとデメリットを解説します。"
  },
  {
    id: "mock-2",
    title: "フリーランス必見！インボイス制度対応と確定申告の自動化ハック",
    category: "TAX & MONEY",
    publishedAt: "2025.02.10",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>面倒な事務作業をゼロに</h2>
      <p>「冒険（副業）」を楽しむためには、守り（税務・会計）を鉄壁にする必要があります。今回は、freeeやMoneyForwardと連携して、請求書発行から仕訳までを自動化する最強のスタックを紹介します。</p>
    `,
    excerpt: "「冒険」を楽しむために守りを鉄壁に。freeeやMoneyForwardと連携して、請求書発行から仕訳までを自動化する最強のスタックを紹介します。"
  },
  {
    id: "mock-3",
    title: "未経験からWebデザイナーへ。3ヶ月で月5万円稼ぐロードマップ",
    category: "SKILL UP",
    publishedAt: "2025.02.05",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>まずはFigmaを極めろ</h2>
      <p>PhotoshopやIllustratorも大切ですが、現代のUIデザインにおいてFigmaは必須スキルです。まずはトレース（模写）から始めて、デザインの原則を体に叩き込みましょう。</p>
    `,
    excerpt: "現代のUIデザインにおいて必須スキルのFigma。まずはトレースから始めて、デザインの原則を身につけるためのロードマップを公開。"
  }
];

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string }; // WP APIのレスポンス定義に追加
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

const mapWpToArticle = (post: WPPost): Article => {
  const date = new Date(post.date);
  const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  const category = (post._embedded?.['wp:term']?.[0]?.[0]?.name || 'INSIGHT').toUpperCase();
  const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  // 抜粋からHTMLタグを除去してプレーンテキストにする
  const plainExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]+>/g, '') : '';

  return {
    id: String(post.id),
    title: post.title.rendered,
    category: category,
    publishedAt: formattedDate,
    thumbnail: thumbnail,
    content: post.content.rendered,
    excerpt: plainExcerpt,
  };
};

export const getArticles = async (): Promise<Article[]> => {
  try {
    const res = await fetch(`${API_URL}/posts?_embed&per_page=12`);
    if (!res.ok) throw new Error(`API Status: ${res.status}`);
    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts.map(mapWpToArticle) : MOCK_ARTICLES;
  } catch (error) {
    return MOCK_ARTICLES;
  }
};

export const getArticle = async (id: string): Promise<Article | undefined> => {
  const mockArticle = MOCK_ARTICLES.find(a => a.id === id);
  if (mockArticle) return mockArticle;

  try {
    const res = await fetch(`${API_URL}/posts/${id}?_embed`);
    if (!res.ok) return undefined;
    const post: WPPost = await res.json();
    return mapWpToArticle(post);
  } catch (error) {
    return undefined;
  }
};