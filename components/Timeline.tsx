import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { UserPlus, MessageSquare, Flag } from 'lucide-react';

const steps = [
  {
    title: "Guild Entry",
    sub: "まずはギルド（会員）登録",
    desc: "30秒で完了。ポートフォリオやスキルシートを連携して、あなたの冒険者ランクを診断しましょう。",
    icon: <UserPlus className="w-8 h-8" />,
    color: "bg-cheese-yellow"
  },
  {
    title: "Tavern Chat",
    sub: "コンシェルジュと作戦会議",
    desc: "「どんな冒険がしたい？」「報酬はどれくらい必要？」チャットまたはZoomで、希望条件をヒアリングします。",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "bg-cheese-accent"
  },
  {
    title: "Quest Start",
    sub: "マッチング・冒険開始",
    desc: "企業との面談を経て、契約成立。契約周りの事務手続きはすべてCheeseが代行します。さあ、冒険へ！",
    icon: <Flag className="w-8 h-8" />,
    color: "bg-cheese-dark"
  }
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration line */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-4 bg-gray-100 -translate-y-1/2 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <SectionTitle english="HOW TO START" japanese="冒険の始め方" />
        </div>
      
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-white"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border-4 border-gray-100 z-20">
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                      {index + 1}
                  </div>
              </div>

              <div className="pt-10 px-6 pb-6 mt-6 border-2 border-gray-100 rounded-3xl hover:border-cheese-dark hover:shadow-[8px_8px_0px_#1A1A1A] transition-all duration-300 bg-white group h-full text-center">
                <div className="mb-4 text-cheese-dark flex justify-center group-hover:scale-110 transition-transform text-cheese-dark/20 group-hover:text-cheese-dark">
                    {step.icon}
                </div>
                <h3 className="text-2xl font-black font-english text-cheese-dark mb-2">{step.title}</h3>
                <p className="text-sm font-bold text-cheese-accent mb-4">{step.sub}</p>
                <p className="text-gray-500 text-sm leading-loose font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};