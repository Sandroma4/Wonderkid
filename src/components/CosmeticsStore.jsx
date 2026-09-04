import React, { useState, useEffect } from 'react';
import { getAccountData, saveAccountData } from '../utils/storage';
import { playSound } from '../utils/audio';

export const COSMETICS_DATA = [
  { id: 'bronze_alt', name: 'Bronze Gravé', image: '/cosmetics/metals.png', bgPos: '0% 0%', price: 10, category: 'Métaux (<65 OVR)', minOvr: 0, maxOvr: 64 },
  { id: 'silver_alt', name: 'Argent Sombre', image: '/cosmetics/metals.png', bgPos: '50% 0%', price: 10, category: 'Métaux (65-74 OVR)', minOvr: 65, maxOvr: 74 },
  { id: 'gold_alt', name: 'Or Pur', image: '/cosmetics/metals.png', bgPos: '100% 0%', price: 10, category: 'Métaux (75-84 OVR)', minOvr: 75, maxOvr: 84 },
  { id: 'stone', name: 'Roche Ancienne', image: '/cosmetics/fantasy.png', bgPos: '0% 0%', price: 30, category: 'Fantasy (85+ OVR)', minOvr: 85, maxOvr: 99 },
  { id: 'cyberpunk', name: 'Néon Cyberpunk', image: '/cosmetics/fantasy.png', bgPos: '50% 0%', price: 30, category: 'Fantasy (85+ OVR)', minOvr: 85, maxOvr: 99 },
  { id: 'earth', name: 'Terre Aride', image: '/cosmetics/fantasy.png', bgPos: '100% 0%', price: 30, category: 'Fantasy (85+ OVR)', minOvr: 85, maxOvr: 99 },
  { id: 'elite1', name: 'Elite 87+', image: '/cosmetics/elite.png', bgPos: '0% 0%', price: 50, category: 'Elite (87+ OVR)', minOvr: 87, maxOvr: 99 },
  { id: 'elite2', name: 'Elite 90+', image: '/cosmetics/elite.png', bgPos: '50% 0%', price: 50, category: 'Elite (90+ OVR)', minOvr: 90, maxOvr: 99 },
  { id: 'elite3', name: 'Elite 93+', image: '/cosmetics/elite.png', bgPos: '100% 0%', price: 50, category: 'Elite (93+ OVR)', minOvr: 93, maxOvr: 99 }
];

export const CosmeticsStore = ({ onBack }) => {
  const [account, setAccount] = useState({ goldenCoins: 0, unlockedPerks: [], cosmeticsInventory: {} });

  useEffect(() => {
    setAccount(getAccountData());
  }, []);

  const handleBuy = (cosmetic) => {
    playSound('click');
    if (account.goldenCoins >= cosmetic.price) {
      playSound('coins');
      const currentQty = account.cosmeticsInventory?.[cosmetic.id] || 0;
      const newAccount = {
        ...account,
        goldenCoins: account.goldenCoins - cosmetic.price,
        cosmeticsInventory: {
          ...account.cosmeticsInventory,
          [cosmetic.id]: currentQty + 1
        }
      };
      saveAccountData(newAccount);
      setAccount(newAccount);
    } else {
      alert("Fonds insuffisants !");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 relative overflow-hidden flex flex-col text-white">
      <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-[0.03]"></div>
      
      <div className="w-full max-w-6xl mx-auto flex justify-start mb-4 relative z-10">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 shadow-lg font-bold"
        >
          Retour
        </button>
      </div>

      <div className="relative flex flex-col items-center mb-8 w-full max-w-6xl mx-auto pt-2 z-10">
        <div className="w-full text-center px-4 mb-4">
          <h1 className="heading-typography text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 uppercase tracking-tight drop-shadow-lg leading-none">
            Boutique Cosmétique
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-lg font-medium">Achetez des designs consommables pour vos cartes du Hall of Fame.</p>
        </div>
        
        <div className="bg-slate-800/80 border border-amber-500/50 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <span className="text-xl font-bold text-amber-400">{account.goldenCoins} GC</span>
        </div>
        
        <p className="text-rose-400 mt-4 text-xs max-w-lg text-center bg-rose-900/20 p-2 rounded-lg border border-rose-900/50">
          ⚠️ Note : Les gardiens de but (GK) ne sont pas affectés par ces designs personnalisés. Les cosmétiques s'appliquent une seule fois par carte.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {COSMETICS_DATA.map(cosmetic => {
          const ownedQty = account.cosmeticsInventory?.[cosmetic.id] || 0;
          
          return (
            <div key={cosmetic.id} className="flex flex-col bg-slate-800/50 rounded-3xl p-6 border border-slate-700 hover:border-slate-500 transition-all">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{cosmetic.name}</h3>
                  <span className="text-xs text-slate-400 uppercase font-bold">{cosmetic.category}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-700">
                  <span className="font-bold text-amber-400">{cosmetic.price}</span>
                  <span className="text-sm">💰</span>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center items-center mb-6 min-h-[300px] relative">
                <div 
                  className="w-[180px] h-[256px] relative drop-shadow-2xl bg-no-repeat shadow-2xl transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url('${cosmetic.image}')`,
                    backgroundPosition: cosmetic.bgPos,
                    backgroundSize: '300% 100%',
                    backgroundColor: 'transparent'
                  }}
                />
                
                {ownedQty > 0 && (
                  <div className="absolute top-0 right-10 bg-amber-500 text-slate-900 font-black px-3 py-1 rounded-full shadow-lg border-2 border-white translate-x-1/2 -translate-y-1/2">
                    x{ownedQty}
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                <button 
                  onClick={() => handleBuy(cosmetic)}
                  disabled={account.goldenCoins < cosmetic.price}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-all ${account.goldenCoins >= cosmetic.price ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/50' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
                >
                  {account.goldenCoins >= cosmetic.price ? 'Acheter 1x' : 'Fonds Insuffisants'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
