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
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-20"></div>
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col relative z-10 px-2 md:px-0">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="text-white bg-slate-800/80 hover:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-700"
          >
            ← Retour
          </button>
          <h2 className="heading-typography flex-1 text-center text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 uppercase tracking-widest drop-shadow-sm">
            Palmarès Global
          </h2>
          <div className="w-24" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mt-4 md:mt-8 mb-4 md:mb-8 bg-slate-900/60 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          {palmares.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-50">
              <span className="text-6xl mb-4">🏆</span>
              <p className="text-white text-lg font-medium">Aucun trophée remporté pour le moment.</p>
              <p className="text-slate-400 text-sm mt-2">Jouez une carrière et brillez sur le terrain !</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-1 md:pr-4 space-y-4 md:space-y-6 pb-8 custom-scrollbar">
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
                <div key={idx} className="bg-slate-700/40 border border-slate-600/50 px-3 py-2 rounded-xl flex items-center justify-between hover:bg-slate-700/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl drop-shadow-md">{trophy.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-sm">{trophy.text}</h3>
                    </div>
                  </div>
                  <span className="heading-typography font-black text-amber-500 text-lg drop-shadow-sm">x{trophy.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};
