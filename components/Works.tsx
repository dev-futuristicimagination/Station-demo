import React from 'react';
import { SectionTitle } from './SectionTitle';

const cases = [
  {
    name: "YUKI.T",
    role: "Frontend Engineer",
    title: "週末は、東京のスタートアップでCTO。",
    desc: "平日は地方の大手SIer勤務。アソベンチャーチーズを通じて、最先端の技術スタックを使う東京のベンチャーの開発に参加。スキルアップと収入増を同時に実現。",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    tags: ["週10時間", "フルリモート"]
  },
  {
    name: "SARAH.K",
    role: "Graphic Designer",
    title: "子育ての合間に、ブランドのロゴを作る。",
    desc: "フリーランスとして独立後、営業活動に疲弊していた時に登録。自分のテイストに合う案件だけがスカウトで届くようになり、制作に集中できるように。",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    tags: ["スポット案件", "高単価"]
  }
];

export const Works: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle english="ADVENTURERS" japanese="冒険者たちの物語" />
        
        <div className="grid md:grid-cols-2 gap-12">
            {cases.map((item, index) => (
                <div key={index} className="group cursor-pointer relative">
                    <div className="overflow-hidden mb-6 rounded-3xl border-2 border-black/5 relative">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                             {item.tags.map(tag => (
                                 <span key={tag} className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
                                     {tag}
                                 </span>
                             ))}
                        </div>
                    </div>
                    <div className="pl-2">
                        <div className="flex items-baseline gap-3 mb-2">
                             <h3 className="text-xl font-black font-english text-cheese-dark">{item.name}</h3>
                             <span className="text-xs font-bold text-gray-400 uppercase">{item.role}</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-3 group-hover:text-cheese-accent transition-colors leading-tight">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};