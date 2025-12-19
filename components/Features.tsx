import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { Zap, ShieldCheck, Smile } from 'lucide-react';

const stats = [
  { label: "平均時給", value: "4,500", unit: "円", desc: "高単価な案件が中心" },
  { label: "登録ユーザー", value: "12,000", unit: "人", desc: "クリエイター・エンジニア多数" },
  { label: "マッチング率", value: "88", unit: "%", desc: "最短3日で稼働開始" }
];

const points = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "最短即日払い",
    desc: "報酬の受け取りに、もう月末まで待つ必要はありません。仕事が終われば、すぐにウォレットに反映される「Cheese Pay」導入。"
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "厳選された冒険（案件）",
    desc: "掲載企業はすべて審査済み。「面白そう」だけでなく、労働条件や成長環境も保証された優良なプロジェクトのみを紹介します。"
  },
  {
    icon: <Smile className="w-8 h-8" />,
    title: "コミュニティ機能",
    desc: "一人での副業は孤独？ここでは違います。同じギルド（職種）の仲間と情報交換したり、チームで大型案件に挑むことも可能です。"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 bg-cheese-gray overflow-hidden" id="features">
      <div className="container mx-auto px-6">
        <SectionTitle english="WHY CHEESE?" japanese="アソベンチャーを選ぶ理由" />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-10 bg-white border-2 border-cheese-dark rounded-2xl shadow-[8px_8px_0px_#1A1A1A]"
            >
              <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">{stat.label}</p>
              <div className="text-5xl md:text-6xl font-black text-cheese-dark mb-4 font-english">
                {stat.value}<span className="text-xl ml-1 font-bold">{stat.unit}</span>
              </div>
              <p className="text-sm font-bold text-cheese-accent">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group bg-white p-8 rounded-3xl hover:bg-cheese-yellow transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-cheese-dark text-white flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                {point.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-cheese-dark leading-tight">{point.title}</h3>
              <p className="text-gray-600 leading-loose text-sm group-hover:text-cheese-dark font-medium">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};