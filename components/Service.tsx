import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { Code, PenTool, TrendingUp, Mic, ArrowRight } from 'lucide-react';

const categories = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Engineer",
    japanese: "エンジニア",
    desc: "React, Node.js, Goなど。週1〜コミット可能なモダン開発案件多数。",
    color: "bg-cheese-dark"
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Designer",
    japanese: "デザイナー",
    desc: "UI/UX、Webデザイン、DTP。クリエイティブな力で事業を加速させる。",
    color: "bg-cheese-accent"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Marketer",
    japanese: "マーケター",
    desc: "SNS運用、SEO、広告運用。数字と戦略でプロダクトをグロース。",
    color: "bg-blue-600"
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Media / PR",
    japanese: "広報・ライター",
    desc: "記事執筆、動画編集、広報戦略。企業の声を世の中に届ける。",
    color: "bg-green-600"
  }
];

export const Service: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="jobs">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionTitle english="JOB CATEGORIES" japanese="冒険の種類から探す" />
            <button className="hidden md:flex items-center gap-2 font-black text-cheese-dark border-b-2 border-cheese-dark pb-1 hover:text-cheese-accent hover:border-cheese-accent transition mb-12">
                VIEW ALL JOBS <ArrowRight className="w-5 h-5" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-gray-50 border-2 border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-80 group hover:border-cheese-dark hover:shadow-[8px_8px_0px_#FFD600] transition-all duration-300"
            >
              <div>
                <div className={`w-14 h-14 ${item.color} text-white flex items-center justify-center rounded-xl mb-6 shadow-md`}>
                    {item.icon}
                </div>
                <div className="font-english text-xs font-black text-gray-400 tracking-widest mb-1 uppercase">
                    {item.title}
                </div>
                <h3 className="text-2xl font-black mb-4 text-cheese-dark">
                    {item.japanese}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {item.desc}
                </p>
              </div>
              
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-cheese-dark group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <button className="w-full bg-cheese-dark text-white font-bold py-4 rounded-xl shadow-lg">
                全ての職種を見る
             </button>
        </div>
      </div>
    </section>
  );
};