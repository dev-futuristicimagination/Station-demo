import React from 'react';
import { ArrowRight, Twitter, Instagram, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cheese-dark text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cheese-yellow via-cheese-accent to-purple-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
                <img src="https://app.cheese.asoventure.jp/logo.svg" alt="Asoventure Cheese" className="h-10 mb-8 brightness-0 invert" />
                <h2 className="text-3xl md:text-5xl font-black font-english leading-tight mb-6">
                    Ready for your<br/>
                    next adventure?
                </h2>
                <div className="flex gap-4">
                    <button className="bg-cheese-yellow text-cheese-dark px-8 py-4 rounded-full font-black hover:bg-white transition-colors flex items-center gap-2">
                        今すぐ登録する
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                        企業の方はこちら
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:pl-20">
                <div>
                    <h4 className="font-bold mb-6 text-cheese-yellow text-sm tracking-widest">PLATFORM</h4>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-white transition">案件を探す</a></li>
                        <li><a href="#" className="hover:text-white transition">アソベンチャーとは</a></li>
                        <li><a href="#" className="hover:text-white transition">マガジン</a></li>
                        <li><a href="#" className="hover:text-white transition">よくある質問</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-cheese-yellow text-sm tracking-widest">COMPANY</h4>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-white transition">運営会社</a></li>
                        <li><a href="#" className="hover:text-white transition">利用規約</a></li>
                        <li><a href="#" className="hover:text-white transition">プライバシーポリシー</a></li>
                        <li><a href="#" className="hover:text-white transition">お問い合わせ</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 font-bold tracking-widest">
                &copy; 2025 Asoventure Inc. All Rights Reserved.
            </p>
            <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-cheese-yellow transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-cheese-yellow transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-cheese-yellow transition"><MessageCircle className="w-5 h-5" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};