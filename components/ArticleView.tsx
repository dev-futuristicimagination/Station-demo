import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Calendar, User, Tag, ArrowRight, AlertCircle } from 'lucide-react';
import { Article } from '../services/cms';

interface ArticleViewProps {
  article: Article | null;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalTitle = document.title;
    
    // SEO: meta descriptionの保存と更新
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    
    if (article) {
      // タイトルの更新
      document.title = `${article.title} | Asoventure Cheese`;
      
      // ディスクリプションの更新
      if (metaDesc) {
        // 抜粋があればそれを、なければ本文の最初120文字を使用
        let descText = article.excerpt || '';
        if (!descText) {
            // 本文からHTMLタグを除去して先頭を抽出
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = article.content;
            descText = tempDiv.textContent || tempDiv.innerText || '';
            descText = descText.substring(0, 120) + '...';
        }
        metaDesc.setAttribute('content', descText);
      }
    }

    return () => {
      document.title = originalTitle;
      // 記事を閉じたら元のディスクリプションに戻す
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, [article]);

  // 親コンポーネント(ArticlePage)でローディング制御を行っているため、
  // ここで article が null の場合は「取得完了したが記事が存在しない」状態とみなせる
  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 flex flex-col items-center justify-center px-6">
        <AlertCircle className="w-16 h-16 text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-cheese-dark mb-4 text-center">記事が見つかりませんでした</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          お探しの記事は削除されたか、URLが変更された可能性があります。
        </p>
        <button 
          onClick={onBack}
          className="bg-cheese-dark text-white px-8 py-3 font-bold hover:bg-cheese-accent transition-colors flex items-center gap-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 pb-20 relative z-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-4">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold text-cheese-dark hover:text-cheese-accent transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                TOP PAGE
            </button>
            <div className="flex gap-4">
                <button className="text-gray-400 hover:text-cheese-dark transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>
        </div>

        {/* Article Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-cheese-yellow text-cheese-dark px-4 py-1 text-xs font-bold rounded-full mb-6 shadow-sm border border-cheese-dark">
                <Tag className="w-3 h-3" />
                <span dangerouslySetInnerHTML={{ __html: article.category }} />
            </div>
            <h1 
                className="text-3xl md:text-5xl font-black leading-tight mb-6 text-cheese-dark"
                dangerouslySetInnerHTML={{ __html: article.title }}
            />
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-english">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Cheese Editorial Team</span>
                </div>
            </div>
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
            <div className="rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-cheese-yellow/20 border-4 border-white">
                <img src={article.thumbnail} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg max-w-3xl mx-auto prose-headings:font-black prose-headings:text-cheese-dark prose-a:text-cheese-accent prose-img:rounded-3xl prose-strong:text-cheese-accent">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Share Section */}
        <div className="max-w-3xl mx-auto mt-20 pt-10 border-t border-gray-100 text-center">
            <p className="font-english font-bold text-gray-400 mb-6 tracking-widest text-sm">SHARE THIS ARTICLE</p>
            <div className="flex justify-center gap-4">
                <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                    <Twitter className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-300">
                    <Facebook className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* CTA Area */}
        <div className="max-w-3xl mx-auto mt-20 bg-cheese-dark text-white p-10 md:p-16 relative overflow-hidden group rounded-3xl">
            <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4">このキャリアについて相談する</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    アソベンチャーチーズでは、あなたのスキルに合った副業案件を無料で診断します。<br/>
                    まずはカジュアル面談から。
                </p>
                <button className="bg-cheese-yellow text-cheese-dark font-black px-10 py-4 hover:bg-white hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 rounded-full shadow-[4px_4px_0px_#FFFFFF]">
                    キャリア相談を予約する
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            {/* Abstract Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cheese-accent rounded-full mix-blend-screen filter blur-[60px] opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cheese-yellow rounded-full mix-blend-screen filter blur-[60px] opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
        </div>
      </div>
    </motion.div>
  );
};