import { useState, useEffect } from 'react';
import { getGlobalPalmares } from '../utils/storage';
import { playSound } from '../utils/audio';
import { AWARD_RANKS } from '../utils/awards';

export const GlobalPalmares = ({ onBack }) => {
  const [palmares, setPalmares] = useState([]);

  useEffect(() => {
    setPalmares(getGlobalPalmares());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] p-4 md:p-8 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-20"></div>
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col relative z-10 px-2 md:px-0">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="text-slate-900 dark:text-slate-900 dark:text-white bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700"
          >
            ← Retour
          </button>
          <h2 className="heading-typography flex-1 text-center text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 uppercase tracking-widest drop-shadow-sm">
            Palmarès Global
          </h2>
          <div className="w-24" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0 mt-4 md:mt-8 mb-4 md:mb-8 p-1 md:p-2 w-full">
          {palmares.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-50">
              <span className="text-6xl mb-4">🏆</span>
              <p className="text-slate-900 dark:text-slate-900 dark:text-white text-lg font-medium">Aucun trophée remporté pour le moment.</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Jouez une carrière et brillez sur le terrain !</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 md:pr-4 pb-8 custom-scrollbar grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 content-start w-full">
              {Object.values(palmares.reduce((acc, t) => {
                const key = `${t.icon}-${t.text}`;
                if (!acc[key]) acc[key] = { ...t, count: 0 };
                acc[key].count++;
                return acc;
              }, {})).sort((a, b) => {
                const rankA = AWARD_RANKS[a.text] || 10;
                const rankB = AWARD_RANKS[b.text] || 10;
                if (rankB !== rankA) return rankB - rankA;
                return b.count - a.count;
              }).map((trophy, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-amber-500/30 p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white dark:bg-slate-800 transition-colors shadow-lg relative">
                  <span className="text-4xl md:text-5xl drop-shadow-lg mb-2">{trophy.icon}</span>
                  <h3 className="text-slate-700 dark:text-slate-300 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-2 leading-tight min-h-[30px] flex items-center">{trophy.text}</h3>
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 dark:text-slate-900 dark:text-white font-black text-xs md:text-sm px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] border border-amber-300/50 z-10">
                    x{trophy.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};
