import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Service } from './components/Service';
import { Features } from './components/Features';
import { News } from './components/News';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ArticleView } from './components/ArticleView';
import { Works } from './components/Works';
import { Contact } from './components/Contact';
import { Timeline } from './components/Timeline';
import { Pricing } from './components/Pricing';
import { Article, getArticleBySlug } from './services/cms';

// ----------------------------------------------------------------------
// スクロール制御用コンポーネント
// ----------------------------------------------------------------------
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ----------------------------------------------------------------------
// 記事詳細ページ (/article/:slug)
// ----------------------------------------------------------------------
const ArticlePage: React.FC = () => {
  const { slug } = useParams(); // URLからスラッグを取得
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      // IDではなくSlugで検索するように変更
      const data = await getArticleBySlug(slug);
      setArticle(data || null);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-cheese-yellow border-t-transparent rounded-full mb-4"></div>
        <p className="text-xs font-bold tracking-widest text-gray-400 animate-pulse">LOADING ADVENTURE...</p>
      </div>
    );
  }

  return (
    <ArticleView
      article={article}
      onBack={() => navigate('/')}
    />
  );
};

// ----------------------------------------------------------------------
// トップページ (/)
// ----------------------------------------------------------------------
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleArticleClick = (article: Article) => {
    // スラッグを使用したURLに遷移
    navigate(`/article/${article.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header onNavClick={handleNavClick} />
      <main>
        <div id="home"><Hero /></div>
        <div id="mission"><Mission /></div>
        <Features />
        <Timeline />
        <Service />
        <Pricing />
        <Works />
        <div id="articles"><News onArticleClick={handleArticleClick} /></div>
        <FAQ />
        <div id="contact"><Contact /></div>
      </main>
      <Footer />
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// メインアプリケーション
// ----------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen font-sans selection:bg-cheese-yellow selection:text-cheese-dark">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ルートパラメータを :id から :slug に変更 */}
            <Route path="/article/:slug" element={<ArticlePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;