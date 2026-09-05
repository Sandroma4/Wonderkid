import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { getCardCollection, updateCardInCollection, getAccountData, saveAccountData } from '../utils/storage';
import { PlayerCard } from './PlayerCard';
import { COSMETICS_DATA } from './CosmeticsStore';

export const CardCollection = ({ onBack }) => {
  const [collection, setCollection] = useState([]);
  const [account, setAccount] = useState({ cosmeticsInventory: {} });
  const [selectedCardForCosmetic, setSelectedCardForCosmetic] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const data = getCardCollection();
    const sortedData = [...data].sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
    setCollection(sortedData);
    setAccount(getAccountData());
  };

  const handleApplyCosmetic = (cosmeticId) => {
    if (!selectedCardForCosmetic) return;
    playSound('click');
    
    if (cosmeticId === 'default') {
      updateCardInCollection(selectedCardForCosmetic.id, { appliedCosmetic: null });
    } else {
      const inventory = { ...account.cosmeticsInventory };
      if (!inventory[cosmeticId] || inventory[cosmeticId] <= 0) {
        alert("Vous ne possédez plus cet objet !");
        return;
      }
      inventory[cosmeticId] -= 1;
      const newAccount = { ...account, cosmeticsInventory: inventory };
      saveAccountData(newAccount);
      setAccount(newAccount);
      updateCardInCollection(selectedCardForCosmetic.id, { appliedCosmetic: cosmeticId });
    }
    
    refreshData();
    setSelectedCardForCosmetic(null);
  };

  const isGk = (pos) => (pos || '').toUpperCase().includes('GK');

  const getAvailableCosmeticsForCard = (ovr) => {
    return COSMETICS_DATA.filter(c => ovr >= c.minOvr && ovr <= c.maxOvr);
  };

  return (
    <div className="min-h-screen bg-emerald-200 dark:bg-slate-950 p-3 md:p-8 relative overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6 md:mb-8 w-full max-w-6xl mx-auto pt-2 md:pt-4">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="z-50 shrink-0 text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 md:px-4 md:py-2.5 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          <span className="text-xl leading-none">←</span> <span className="hidden md:inline font-bold ml-2 uppercase tracking-wider text-[10px] md:text-xs">Retour</span>
        </button>
        <div className="flex-1 text-center px-2">
          <h1 className="heading-typography text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight drop-shadow-lg leading-none">
            Hall of <span className="text-emerald-600 dark:text-emerald-400">Fame</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-[10px] md:text-base font-medium">Votre collection de légendes. L'histoire s'écrit ici.</p>
        </div>
        <div className="w-[44px] md:w-[100px] shrink-0"></div>
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
              <div key={card.id || idx} className="flex flex-col items-center bg-slate-900/60 p-5 rounded-3xl border border-slate-300 dark:border-slate-800 backdrop-blur-sm hover:border-emerald-500/50 transition-colors shadow-xl group relative">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <PlayerCard player={card} club={card.club} />
                </div>
                
                {!isGk(card.position) && (
                  <button 
                    onClick={() => setSelectedCardForCosmetic(card)}
                    className="absolute top-2 right-2 bg-pink-500/90 hover:bg-pink-400 text-white p-2 rounded-full shadow-lg border border-pink-300 transition-all active:scale-95"
                    title="Personnaliser la carte"
                  >
                    ✨
                  </button>
                )}
                
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

      {selectedCardForCosmetic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0F172A] w-full max-w-2xl rounded-3xl p-6 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-2xl font-black text-white">Personnaliser {selectedCardForCosmetic.lastName} ({selectedCardForCosmetic.ovr} OVR)</h2>
              <button onClick={() => setSelectedCardForCosmetic(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="overflow-y-auto flex-1 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center cursor-pointer hover:border-slate-500" onClick={() => handleApplyCosmetic('default')}>
                  <span className="text-white font-bold">Retirer (Classique)</span>
                </div>
                
                {getAvailableCosmeticsForCard(selectedCardForCosmetic.ovr).map(cosmetic => {
                  const ownedQty = account.cosmeticsInventory?.[cosmetic.id] || 0;
                  const canApply = ownedQty > 0;
                  return (
                    <div 
                      key={cosmetic.id} 
                      onClick={() => canApply ? handleApplyCosmetic(cosmetic.id) : null}
                      className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${canApply ? 'bg-slate-800 border-emerald-500 hover:bg-slate-700' : 'bg-slate-900 border-slate-800 opacity-50 cursor-not-allowed'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">{cosmetic.name}</span>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Possédé: {ownedQty}</span>
                      </div>
                      <div className="text-xs text-slate-400">Restreint: {cosmetic.category}</div>
                    </div>
                  );
                })}
              </div>
              
              {getAvailableCosmeticsForCard(selectedCardForCosmetic.ovr).length === 0 && (
                <p className="text-rose-400 text-sm mt-4 text-center">Aucun design cosmétique ne correspond à la note ({selectedCardForCosmetic.ovr} OVR) de cette carte.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
