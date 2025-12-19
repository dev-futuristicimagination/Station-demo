import React from 'react';
import { Home, FileText, Send, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
    onNavClick: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onNavClick }) => {
  return (
    <div className="fixed bottom-0 w-full z-50 md:hidden">
        {/* Safe area padding wrapper */}
        <div className="bg-[#121212]/90 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex gap-6 justify-around flex-1 mr-4">
                    <button onClick={() => onNavClick('home')} className="flex flex-col items-center text-gray-500 hover:text-neon-blue active:text-neon-blue transition group">
                        <Home className="w-5 h-5 mb-1 group-active:scale-90" />
                        <span className="text-[9px] font-bold">Home</span>
                    </button>
                    <button onClick={() => onNavClick('blog')} className="flex flex-col items-center text-gray-500 hover:text-neon-blue active:text-neon-blue transition group">
                        <FileText className="w-5 h-5 mb-1 group-active:scale-90" />
                        <span className="text-[9px] font-bold">Insights</span>
                    </button>
                    <button onClick={() => onNavClick('pricing')} className="flex flex-col items-center text-gray-500 hover:text-neon-blue active:text-neon-blue transition group">
                        <DollarSign className="w-5 h-5 mb-1 group-active:scale-90" />
                        <span className="text-[9px] font-bold">Plans</span>
                    </button>
                </div>
                
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavClick('contact')}
                    className="bg-white text-black px-5 py-3 rounded-full font-bold text-xs shadow-lg shadow-white/10 flex items-center gap-2"
                >
                    <span>Consult</span>
                    <Send className="w-3 h-3" />
                </motion.button>
            </div>
            {/* Fallback height */}
            <div className="h-1 w-full"></div>
        </div>
    </div>
  );
};