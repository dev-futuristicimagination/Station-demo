import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { Timeline } from './components/Timeline'; // Flow
import { Pricing } from './components/Pricing';   // Rewards
import { Article } from './services/cms';

type ViewState = 'home' | 'article';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleNavClick = (id: string) => {
    if (view === 'article') {
      setView('home');
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setView('article');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cheese-yellow selection:text-cheese-dark">
      <Header onNavClick={handleNavClick} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
              <Footer />
            </motion.div>
          ) : (
            selectedArticle && (
              <ArticleView 
                key="article"
                article={selectedArticle} 
                onBack={() => setView('home')} 
              />
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;