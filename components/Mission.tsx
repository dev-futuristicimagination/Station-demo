import React from 'react';
import { motion } from 'framer-motion';

export const Mission: React.FC = () => {
  return (
    <section className="py-32 bg-white relative" id="mission">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          <div className="md:w-1/2 relative">
             <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-cheese-dark shadow-[12px_12px_0px_#FFD600]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Team Collaborating" 
                  className="w-full h-auto"
                />
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-8 -left-8 w-24 h-24 bg-cheese-accent rounded-full border-4 border-cheese-dark z-0"></div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stripes-black rounded-full z-20"></div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cheese-accent font-black tracking-widest text-sm mb-4 block">OUR MISSION</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-cheese-dark">
                仕事に、もっと<br/>
                <span className="bg-cheese-yellow px-2">遊び心</span>を。
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                「生活のために働く」なんて、もう古い。<br/>
                アソベンチャーチーズが提案するのは、スキルを武器に世界を広げる「冒険」です。
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-10">
                週末だけのプロジェクト参加、フルリモートでの新規事業立ち上げ、
                趣味の延長線上でのお手伝い。
                あなたの「得意」が、誰かのビジネスを加速させる鍵になります。
                さあ、安定よりもワクワクを選ぼう。
              </p>
              
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-cheese-dark">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" alt="Founder" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-cheese-dark">FOUNDER</p>
                    <p className="text-xs text-gray-500">DAISUKE "CHEESE" TANAKA</p>
                  </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};