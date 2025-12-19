import React from 'react';

interface SectionTitleProps {
  english: string;
  japanese: string;
  dark?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ english, japanese, dark = false }) => {
  return (
    <div className="relative mb-12">
      <div className={`text-[12px] font-black tracking-[0.3em] uppercase mb-2 ${dark ? 'text-cheese-yellow' : 'text-cheese-accent'}`}>
        {english}
      </div>
      <h2 className={`text-3xl md:text-5xl font-black leading-tight ${dark ? 'text-white' : 'text-cheese-dark'}`}>
        {japanese}
      </h2>
      <div className={`mt-4 w-24 h-2 ${dark ? 'bg-cheese-yellow' : 'bg-cheese-yellow'}`}></div>
    </div>
  );
};