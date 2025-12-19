import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "2025年版：クリエイターのための税金対策完全ガイド",
    category: "TAX TIPS",
    date: "2024.10.15",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: "インボイス制度の導入から数年。クリエイターを取り巻く税務環境は激変しました。特にDAOやNFTによる収益、海外プラットフォームからの送金など、従来の枠組みでは捉えきれない取引が増加しています。本記事では、最新の法改正を踏まえた「守り」と「攻め」の税務戦略について解説します..."
  },
  {
    id: 2,
    title: "「法人成り」のベストタイミングとは？年商1000万の壁",
    category: "STRATEGY",
    date: "2024.09.28",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    content: "多くのフリーランスが直面する「法人化」の悩み。消費税の免税事業者期間の特例や、社会保険料の負担増減など、検討すべきパラメータは多岐にわたります。AIシミュレーションを用いた最新の判定基準を公開します。"
  },
  {
    id: 3,
    title: "経理自動化ツール：Notion x freee連携の極意",
    category: "TECH",
    date: "2024.09.10",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    content: "毎月の領収書整理に時間を奪われていませんか？Notionデータベースとfreee APIを連携させることで、経理業務の90%を自動化した事例を紹介します。APIキーの設定からZapierの組み方まで。"
  }
];

interface BlogSectionProps {
  onPostClick: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onPostClick }) => {
  return (
    <section className="px-6 py-16 bg-dark-bg relative" id="blog">
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex justify-between items-end mb-10">
        <div>
            <h2 className="text-3xl font-black font-english mb-2">Insights</h2>
            <p className="text-sm text-gray-500">最新の税務トレンドと経営ハック。</p>
        </div>
        <button className="hidden md:flex items-center text-xs font-bold text-neon-blue hover:text-white transition-colors">
            VIEW ARCHIVE <ArrowRight className="w-3 h-3 ml-2" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => onPostClick(post)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl aspect-video mb-4 border border-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold tracking-wider text-white border border-white/10">
                    {post.category}
                </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Clock className="w-3 h-3" />
                <span>{post.date}</span>
            </div>
            
            <h3 className="text-lg font-bold leading-snug group-hover:text-neon-blue transition-colors duration-300">
                {post.title}
            </h3>
          </motion.article>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <button className="text-xs font-bold text-gray-500 border border-gray-800 px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            View All Articles
        </button>
      </div>
    </section>
  );
};