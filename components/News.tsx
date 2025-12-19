import React, { useEffect, useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { ArrowRight, Loader, Newspaper } from 'lucide-react';
import { Article, getArticles } from '../services/cms';
import { motion } from 'framer-motion';

interface NewsProps {
    onArticleClick: (article: Article) => void;
}

export const News: React.FC<NewsProps> = ({ onArticleClick }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getArticles();
      setArticles(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <section className="py-32 bg-cheese-light" id="articles">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionTitle english="CHEESE MAGAZINE" japanese="働き方をアップデートする" />
          <button className="flex items-center gap-3 font-black text-xs tracking-widest bg-cheese-dark text-white px-6 py-3 rounded-full hover:bg-cheese-accent transition shadow-lg">
            記事一覧へ <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4 text-gray-400">
            <Loader className="w-10 h-10 animate-spin text-cheese-yellow" />
            <p className="text-xs font-bold tracking-widest uppercase">Loading...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onArticleClick(article)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  {article.thumbnail ? (
                    <img 
                      src={article.thumbnail} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Newspaper className="w-20 h-20" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-cheese-yellow text-cheese-dark px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full border border-cheese-dark">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-[10px] font-black tracking-widest text-gray-400 font-english">
                    <span>{article.publishedAt}</span>
                    </div>
                    <h3 
                    className="text-lg font-bold text-cheese-dark leading-snug group-hover:text-cheese-accent transition-colors mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: article.title }}
                    />
                    <div className="flex items-center gap-2 text-xs font-bold text-cheese-dark underline decoration-cheese-yellow decoration-4 underline-offset-4 group-hover:decoration-cheese-accent transition-all">
                    READ MORE
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};