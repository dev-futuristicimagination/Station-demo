import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const faqs = [
  {
    q: "週1回、土日だけの稼働でも大丈夫ですか？",
    a: "はい、大歓迎です。アソベンチャーチーズには「週1〜」や「土日のみOK」のスポット案件が豊富にあります。本業を続けながら、無理なくスタートできます。"
  },
  {
    q: "会社に副業がバレないか心配です。",
    a: "ご安心ください。プロフィールは匿名で公開することも可能です。また、確定申告に関するサポート記事や提携税理士の紹介も行っています。"
  },
  {
    q: "未経験でも案件を紹介してもらえますか？",
    a: "案件によりますが、基本的には何らかの実務経験（1年以上）を求められることが多いです。ただし、ポートフォリオ次第ではポテンシャル採用されるケースもあります。"
  },
  {
    q: "利用料や仲介手数料はかかりますか？",
    a: "ユーザー（働く方）のご利用は完全無料です。案件への応募、面談、成約に至るまで費用は一切かかりません。"
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle english="FAQ" japanese="よくあるご質問" />
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-cheese-light border border-cheese-yellow/30 overflow-hidden rounded-2xl">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group"
              >
                <span className="font-bold text-cheese-dark pr-8 group-hover:text-cheese-accent transition-colors">
                  {faq.q}
                </span>
                {openIndex === idx ? <Minus className="w-5 h-5 text-cheese-accent shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-sm text-gray-600 leading-loose pt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};