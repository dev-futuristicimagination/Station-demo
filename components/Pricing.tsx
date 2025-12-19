import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Shield } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-cheese-dark text-white relative overflow-hidden" id="rewards">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cheese-yellow/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cheese-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle english="RANK SYSTEM" japanese="冒険者ランクと特典" dark />
        <p className="text-gray-400 mb-16 max-w-2xl">
            アソベンチャーチーズでは、実績に応じてランクが上がり、様々な特典（スキル）が解放されます。<br/>
            より自由で、有利な条件で冒険を楽しみましょう。
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Rank 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-gray-400" />
                <div>
                    <h3 className="font-black text-2xl font-english">SCOUT</h3>
                    <p className="text-xs text-gray-400 font-bold">初期ランク</p>
                </div>
            </div>
            <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                    <span>案件への応募（無制限）</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                    <span>チャットサポート</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                    <span>報酬の翌月末払い</span>
                </li>
            </ul>
          </motion.div>

          {/* Rank 2 (Featured) */}
          <motion.div 
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cheese-yellow to-orange-400 rounded-3xl p-1 shadow-[0_0_40px_rgba(255,214,0,0.3)] relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-cheese-yellow px-4 py-1 rounded-full text-xs font-black tracking-widest border border-cheese-yellow">
                POPULAR
            </div>
            <div className="bg-[#1A1A1A] rounded-[22px] p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-cheese-yellow" />
                    <div>
                        <h3 className="font-black text-3xl font-english text-cheese-yellow">HERO</h3>
                        <p className="text-xs text-gray-400 font-bold">実績 3件以上</p>
                    </div>
                </div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-sm text-white font-bold">
                        <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                        <span>Cheese Pay（即日払い）利用可能</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-white font-bold">
                        <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                        <span>非公開案件のスカウト受信</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-white font-bold">
                        <Check className="w-5 h-5 text-cheese-yellow shrink-0" />
                        <span>専任エージェントによる単価交渉</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-400">
                        <Check className="w-5 h-5 text-gray-600 shrink-0" />
                        <span>すべての特典が含まれます</span>
                    </li>
                </ul>
            </div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-cheese-accent" />
                <div>
                    <h3 className="font-black text-2xl font-english text-cheese-accent">LEGEND</h3>
                    <p className="text-xs text-gray-400 font-bold">実績 10件以上</p>
                </div>
            </div>
            <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-accent shrink-0" />
                    <span>ストックオプション（SO）付与案件への参加権</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-accent shrink-0" />
                    <span>コミュニティイベントへのVIP招待</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-cheese-accent shrink-0" />
                    <span>Cheeseオリジナルグッズ支給</span>
                </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};