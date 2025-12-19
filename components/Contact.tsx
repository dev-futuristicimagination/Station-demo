import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Rocket } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section className="px-6 py-24 bg-cheese-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black font-english leading-tight">
                LET'S START <br/>
                <span className="text-cheese-yellow">ADVENTURE.</span>
            </h2>
            <p className="text-gray-300 leading-relaxed font-medium">
                まずは無料のキャリア相談から。<br/>
                あなたの「好き」や「得意」が、どんな冒険（仕事）に繋がるのか、
                専任のコンシェルジュがお話しします。
            </p>
            
            <div className="hidden md:block mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    <span className="font-bold">現在、新規メンバー募集中</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="w-3 h-3 bg-cheese-yellow rounded-full"></div>
                    <span className="font-bold">平均返信時間: 24時間以内</span>
                </div>
            </div>
        </div>

        <div className="bg-white text-cheese-dark p-8 rounded-3xl relative shadow-[10px_10px_0px_#FFD600]">
            {formState === 'success' ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-80 text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">THANK YOU!</h3>
                    <p className="text-gray-500 text-sm font-bold">お問い合わせありがとうございます。<br/>冒険の準備を始めましょう。</p>
                    <button 
                        onClick={() => setFormState('idle')}
                        className="mt-8 text-xs font-bold text-cheese-accent underline hover:text-cheese-dark"
                    >
                        他のメッセージを送る
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                        <input type="text" required className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-cheese-dark font-bold focus:outline-none focus:border-cheese-yellow focus:bg-white transition-colors" placeholder="山田 太郎" />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                        <input type="email" required className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-cheese-dark font-bold focus:outline-none focus:border-cheese-yellow focus:bg-white transition-colors" placeholder="hello@cheese.jp" />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                        <textarea rows={3} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-cheese-dark font-bold focus:outline-none focus:border-cheese-yellow focus:bg-white transition-colors" placeholder="興味のある職種やスキルについて..."></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={formState === 'submitting'}
                        className="w-full bg-cheese-dark text-white font-black py-4 rounded-xl hover:bg-cheese-accent transition-colors flex justify-center items-center gap-2 group disabled:opacity-50 shadow-lg"
                    >
                        {formState === 'submitting' ? (
                            <span>SENDING...</span>
                        ) : (
                            <>
                                <span>冒険をリクエスト</span>
                                <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>

      </div>
    </section>
  );
};