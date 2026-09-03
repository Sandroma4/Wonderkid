import { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { getCardCollection } from '../utils/storage';
import { PlayerCard } from './PlayerCard';

export const CardCollection = ({ onBack }) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const data = getCardCollection();
    const sortedData = [...data].sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    setCollection(sortedData);
  }, []);

  return (
    <div className="min-h-screen bg-emerald-200 dark:bg-slate-950 p-3 md:p-8 relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <button 
        onClick={() => { playSound('click'); onBack(); }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 shrink-0 text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 md:p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap shadow-lg"
      >
        ← Retour
      </button>

      <div className="flex items-center gap-4 mb-6 md:mb-8 relative z-10 w-full max-w-6xl mx-auto pt-16 md:pt-0">
        <div className="text-left w-full text-center md:text-left">
          <h1 className="heading-typography text-3xl md:text-5xl font-black text-slate-800 dark:text-white uppercase tracking-tight drop-shadow-lg leading-none">
            Hall of <span className="text-emerald-600 dark:text-emerald-400">Fame</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base font-medium">Votre collection de légendes. L'histoire s'écrit ici.</p>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto">
        {collection.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-300 dark:border-slate-800 backdrop-blur-sm">
            <span className="text-6xl mb-4">📭</span>
            <h2 className="heading-typography text-2xl font-bold text-slate-800 dark:text-white mb-2">Album vide</h2>
            <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400">Terminez une carrière pour voir votre carte apparaître ici !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 auto-rows-max">
            {collection.map((card, idx) => (
              <div key={card.id || idx} className="flex flex-col items-center bg-slate-900/60 p-5 rounded-3xl border border-slate-300 dark:border-slate-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors shadow-xl group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <PlayerCard player={card} club={card.club} />
                </div>
                
                <div className="w-full mt-2 bg-emerald-200 dark:bg-slate-950 p-3 rounded-2xl border border-slate-800/80 shadow-inner space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-500 font-medium">Fin de carrière</span>
                    <span className="text-slate-600 dark:text-slate-300 font-bold">{card.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-500 font-medium">Ballons d'Or</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                      {card.ballonDor > 0 ? Array(Math.min(card.ballonDor, 5)).fill('⭐').join('') : 'Aucun'}
                      {card.ballonDor > 5 && ` (+${card.ballonDor - 5})`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-500 font-medium">Trophées Majeurs</span>
                    <span className="text-slate-800 dark:text-white font-bold">{card.trophies} 🏆</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
