import { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../utils/achievementsData';
import { getUnlockedAchievements } from '../utils/storage';
import { playSound } from '../utils/audio';

export const Achievements = ({ onBack }) => {
  const [unlocked, setUnlocked] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setUnlocked(getUnlockedAchievements());
  }, []);

  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-amber-300 to-amber-500'
  };

  const rarityBorders = {
    common: 'border-slate-500/50',
    rare: 'border-blue-500/50',
    epic: 'border-purple-500/50',
    legendary: 'border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
  };

  const completionRate = Math.round((unlocked.length / ACHIEVEMENTS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] p-4 md:p-8 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-20"></div>
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700"
          >
            ← Retour
          </button>
          <div className="text-right">
            <h2 className="heading-typography text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-widest drop-shadow-sm">
              Succès
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">{completionRate}% complété</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-full h-2.5 mb-8 border border-slate-300 dark:border-slate-700">
          <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${completionRate}%` }}></div>
        </div>

        {/* Content */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scrollbar hide-scrollbar-on-mobile">
          {['all', 'common', 'rare', 'epic', 'legendary'].map(tab => (
            <button 
              key={tab}
              onClick={() => { playSound('click'); setActiveTab(tab); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border
                ${activeTab === tab 
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-500 shadow-md scale-105' 
                  : 'bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-300/80 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-300'}`}
            >
              {tab === 'all' ? 'Tous' : tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
            {
            ACHIEVEMENTS.filter(ach => activeTab === "all" || ach.rarity === activeTab)
            .sort((a, b) => {
              const rarityOrder = { legendary: 1, epic: 2, rare: 3, common: 4 };
              return rarityOrder[a.rarity] - rarityOrder[b.rarity];
            })
            .map((ach) => {

              const unlockData = unlocked.find(u => u.id === ach.id);
              const isUnlocked = !!unlockData;
              return (
                <div 
                  key={ach.id} 
                  className={`relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 border 
                    ${isUnlocked ? 'bg-slate-50/90 dark:bg-slate-800/80 ' + rarityBorders[ach.rarity] : 'bg-white dark:bg-slate-900/50 border-slate-300 dark:border-slate-800 opacity-60 grayscale'}`
                  }
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 
                    ${isUnlocked ? 'bg-gradient-to-br ' + rarityColors[ach.rarity] : 'bg-slate-50 dark:bg-slate-800'}`}
                  >
                    {isUnlocked ? ach.icon : '🔒'}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg flex items-center gap-2 ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                      {ach.title}
                      {isUnlocked && unlockData.date && (
                        <span className="text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {unlockData.date}
                        </span>
                      )}
                    </h3>
                    <p className={`text-sm ${isUnlocked ? 'text-slate-700 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      {isUnlocked ? ach.description : 'Ce succès est verrouillé. Continuez à jouer pour le découvrir.'}
                    </p>
                  </div>
                  
                  {isUnlocked && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};
