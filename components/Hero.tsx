import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Rocket, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[95vh] md:h-screen flex flex-col justify-center overflow-hidden bg-mesh text-cheese-dark pt-20">
      {/* Abstract Shapes */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-32 h-32 md:w-64 md:h-64 bg-white rounded-full opacity-50 blur-2xl pointer-events-none"
      />
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] w-40 h-40 md:w-80 md:h-80 bg-cheese-accent/20 rounded-full opacity-60 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-cheese-dark bg-white text-xs font-black tracking-widest uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
                  <Star className="w-4 h-4 text-cheese-yellow fill-cheese-yellow" />
                  Side Hustle Revolution
                </span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black leading-[0.95] mb-8 font-english tracking-tighter text-cheese-dark select-none">
              WORK AS AN<br/>
              <span className="text-white text-stroke-black drop-shadow-xl relative inline-block">
                ADVENTURE.
                <motion.span 
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-8 md:-top-8 md:-right-12 text-4xl md:text-6xl"
                >
                    🚀
                </motion.span>
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl font-bold text-cheese-dark/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              退屈な仕事は、もう終わり。<br/>
              アソベンチャーチーズは、あなたの「好き」と「得意」を<br className="hidden md:block"/>
              企業の「冒険」に変えるマッチングプラットフォームです。
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="bg-cheese-dark text-white w-full sm:w-auto px-10 py-5 font-black text-sm tracking-widest rounded-xl shadow-[6px_6px_0px_#FFFFFF] hover:translate-y-1 hover:shadow-[2px_2px_0px_#FFFFFF] transition-all flex items-center justify-center gap-3 border-2 border-cheese-dark group">
              冒険を始める（会員登録）
              <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
            <button className="bg-white text-cheese-dark w-full sm:w-auto px-10 py-5 font-black text-sm tracking-widest rounded-xl shadow-[6px_6px_0px_#1A1A1A] hover:translate-y-1 hover:shadow-[2px_2px_0px_#1A1A1A] transition-all border-2 border-cheese-dark">
              企業の方はこちら
            </button>
          </motion.div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full overflow-hidden bg-cheese-dark py-4 rotate-1 scale-105 border-t-4 border-b-4 border-white mb-10 shadow-xl">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-3xl font-black text-cheese-yellow mx-8 font-english tracking-widest">
                    LET'S START ADVENTURE • NO MORE BORING WORK •
                </span>
            ))}
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cheese-dark flex flex-col items-center gap-2 pb-safe"
      >
        <ChevronDown className="w-8 h-8 stroke-[3]" />
      </motion.div>
    </section>
  );
};