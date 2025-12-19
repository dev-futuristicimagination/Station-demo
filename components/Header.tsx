import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
      >
        <div className="px-6 md:px-12 flex justify-between items-center">
          <div 
            onClick={() => onNavClick('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img 
              src="https://app.cheese.asoventure.jp/logo.svg" 
              alt="Asoventure Cheese Logo" 
              className="h-8 md:h-10 w-auto" 
            />
          </div>
          
          {/* Desktop Nav */}
          <nav className={`hidden md:flex gap-8 text-sm font-bold font-english ${isScrolled ? 'text-cheese-dark' : 'text-cheese-dark'}`}>
            <button onClick={() => onNavClick('mission')} className="hover:text-cheese-accent transition-colors">MISSION</button>
            <button onClick={() => onNavClick('features')} className="hover:text-cheese-accent transition-colors">WHY CHEESE?</button>
            <button onClick={() => onNavClick('jobs')} className="hover:text-cheese-accent transition-colors">JOBS</button>
            <button onClick={() => onNavClick('articles')} className="hover:text-cheese-accent transition-colors">MAGAZINE</button>
            <button 
                onClick={() => onNavClick('contact')}
                className="bg-cheese-dark text-white px-6 py-2 rounded-full hover:bg-cheese-accent transition-colors"
            >
                START NOW
            </button>
          </nav>

          {/* Menu Button (Mobile) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`md:hidden flex items-center gap-2 font-english font-bold text-xs tracking-widest text-cheese-dark hover:opacity-80 transition`}
          >
            MENU <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-cheese-yellow text-cheese-dark flex flex-col"
          >
            <div className="p-6 flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-english font-bold text-xs tracking-widest">
                    CLOSE <X className="w-8 h-8" />
                </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-12 space-y-6">
                {['home', 'mission', 'features', 'jobs', 'articles', 'contact'].map((item, idx) => (
                    <button 
                        key={item}
                        onClick={() => {
                            onNavClick(item);
                            setIsMenuOpen(false);
                        }}
                        className="text-4xl md:text-6xl font-black font-english text-left hover:text-white transition-colors uppercase"
                    >
                        {item === 'home' ? 'TOP' : item}
                    </button>
                ))}
            </div>
            
            <div className="p-12 border-t border-black/10">
                <p className="text-sm font-bold opacity-60">Asoventure Cheese</p>
                <p className="text-xs mt-2 opacity-50">冒険型 副業マッチングプラットフォーム</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};