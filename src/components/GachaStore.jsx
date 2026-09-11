import React, { useState, useEffect } from 'react';
import { getAccountData, saveAccountData } from '../utils/storage';
import { playSound } from '../utils/audio';
import { useTranslation } from 'react-i18next';
import { COSMETICS_DATA } from './CosmeticsStore';

const PACKS = [
  {
    id: 'pack_standard',
    name: 'Pack Standard',
    price: 15,
    color: 'from-slate-400 to-slate-600',
    glow: 'shadow-[0_0_30px_rgba(148,163,184,0.5)]',
    rates: [
      { category: 'Métaux', chance: 0.80, items: ['bronze_alt', 'silver_alt', 'gold_alt'] },
      { category: 'Fantasy', chance: 0.18, items: ['stone', 'cyberpunk', 'earth'] },
      { category: 'Elite', chance: 0.02, items: ['elite1', 'elite2', 'elite3'] }
    ]
  },
  {
    id: 'pack_premium',
    name: 'Pack Premium',
    price: 50,
    color: 'from-amber-400 to-orange-600',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.6)]',
    rates: [
      { category: 'Fantasy', chance: 0.70, items: ['stone', 'cyberpunk', 'earth'] },
      { category: 'Elite', chance: 0.30, items: ['elite1', 'elite2', 'elite3'] }
    ]
  }
];

export const GachaStore = ({ onBack }) => {
  const { t } = useTranslation();
  const [account, setAccount] = useState({ goldenCoins: 0, unlockedPerks: [], cosmeticsInventory: {} });
  const [phase, setPhase] = useState('IDLE'); // IDLE, OPENING, REVEAL
  const [selectedPack, setSelectedPack] = useState(null);
  const [drawnCosmetic, setDrawnCosmetic] = useState(null);
  
  // Animation states
  const [shake, setShake] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setAccount(getAccountData());
  }, []);

  const openPack = (pack) => {
    if (account.goldenCoins < pack.price) {
      playSound('error');
      alert(t('cosmetics.insufficient_funds', "Fonds insuffisants !"));
      return;
    }

    // Deduct GC
    playSound('coins');
    const newAccount = { ...account, goldenCoins: account.goldenCoins - pack.price };
    saveAccountData(newAccount);
    setAccount(newAccount);

    // Roll cosmetic
    const roll = Math.random();
    let cumulative = 0;
    let chosenCategory = pack.rates[pack.rates.length - 1]; // fallback

    for (const rate of pack.rates) {
      cumulative += rate.chance;
      if (roll <= cumulative) {
        chosenCategory = rate;
        break;
      }
    }

    const itemId = chosenCategory.items[Math.floor(Math.random() * chosenCategory.items.length)];
    const cosmetic = COSMETICS_DATA.find(c => c.id === itemId);
    
    setDrawnCosmetic(cosmetic);
    setSelectedPack(pack);
    setPhase('OPENING');
    
    // Elaborate sequence
    playSound('start'); // or tension sound
    let shakes = 0;
    
    const shakeInterval = setInterval(() => {
      setShake(Math.random() * 20 - 10);
      shakes++;
      if (shakes > 15) { // after ~1.5s
        clearInterval(shakeInterval);
        setShake(0);
        setFlash(true);
        playSound('success'); // explosive sound
        
        setTimeout(() => {
          setPhase('REVEAL');
          setFlash(false);
          
          // Save inventory after reveal
          const currentQty = newAccount.cosmeticsInventory?.[cosmetic.id] || 0;
          const finalAccount = {
            ...newAccount,
            cosmeticsInventory: {
              ...newAccount.cosmeticsInventory,
              [cosmetic.id]: currentQty + 1
            }
          };
          saveAccountData(finalAccount);
          setAccount(finalAccount);
          
        }, 500); // flash duration
      }
    }, 100);
  };

  const reset = () => {
    playSound('click');
    setPhase('IDLE');
    setDrawnCosmetic(null);
    setSelectedPack(null);
  };

  return (
    <div className="h-[100dvh] bg-[#0F172A] p-4 md:p-8 relative overflow-hidden flex flex-col text-white">
      <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-[0.03]"></div>
      
      {/* Flash overlay */}
      {flash && <div className="absolute inset-0 bg-white z-50 animate-[fade-out_0.5s_ease-out] pointer-events-none"></div>}

      <div className="w-full max-w-6xl mx-auto flex justify-start mb-4 relative z-10">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 shadow-lg font-bold"
        >
          {t('cosmetics.back', 'Retour')}
        </button>
      </div>

      <div className="relative flex flex-col items-center mb-8 w-full max-w-6xl mx-auto pt-2 z-10">
        <div className="w-full text-center px-4 mb-4">
          <h1 className="heading-typography text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 uppercase tracking-tight drop-shadow-lg leading-none">
            {t('gacha.title', 'Tirage de Cartes')}
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-lg font-medium">{t('gacha.desc', 'Tentez votre chance pour débloquer des designs rares !')}</p>
        </div>
        
        <div className="bg-slate-800/80 border border-amber-500/50 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <span className="text-xl font-bold text-amber-400">{account.goldenCoins} GC</span>
        </div>
      </div>

      {phase === 'IDLE' && (
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center relative z-10 animate-fade-in">
          {PACKS.map(pack => (
            <div key={pack.id} className={`w-full max-w-sm rounded-3xl p-1 bg-gradient-to-b ${pack.color} ${pack.glow} transition-transform hover:scale-105 group cursor-pointer`} onClick={() => openPack(pack)}>
              <div className="bg-slate-900 rounded-[22px] h-full p-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">{pack.name}</h3>
                
                <div className="my-6 relative">
                  <div className={`w-32 h-48 rounded-xl bg-gradient-to-tr ${pack.color} shadow-2xl border-2 border-white/20 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                    <span className="text-5xl drop-shadow-lg">✨</span>
                  </div>
                </div>

                <div className="w-full bg-black/40 rounded-xl p-3 mb-6 text-left">
                  <h4 className="text-xs text-slate-400 uppercase font-bold mb-2">Taux d'obtention</h4>
                  {pack.rates.map((r, i) => (
                    <div key={i} className="flex justify-between text-sm font-semibold">
                      <span>{r.category}</span>
                      <span className={r.chance < 0.1 ? 'text-amber-400' : 'text-emerald-400'}>{Math.round(r.chance * 100)}%</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="mt-auto w-full py-4 rounded-xl font-black text-xl bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex justify-center items-center gap-2"
                >
                  <span>{pack.price}</span>
                  <span className="text-2xl">💰</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {phase === 'OPENING' && selectedPack && (
        <div className="flex-1 w-full flex justify-center items-center relative z-20">
          <div 
            className={`w-48 h-72 md:w-64 md:h-96 rounded-2xl bg-gradient-to-tr ${selectedPack.color} ${selectedPack.glow} shadow-2xl border-4 border-white/30 flex justify-center items-center relative overflow-hidden`}
            style={{ transform: `rotate(${shake}deg) scale(1.1)` }}
          >
             <div className="absolute inset-0 bg-[url('/football-pattern.png')] opacity-20 animate-pulse"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <span className="text-6xl md:text-8xl animate-bounce drop-shadow-2xl relative z-10">✨</span>
          </div>
        </div>
      )}

      {phase === 'REVEAL' && drawnCosmetic && (
        <div className="flex-1 w-full flex flex-col justify-center items-center relative z-20 animate-[slide-up_0.5s_ease-out]">
          
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
             <div className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900/0 to-transparent animate-[spin_10s_linear_infinite]"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-amber-400 mb-8 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse">
            Nouveau Design !
          </h2>

          <div 
            className="w-[240px] h-[340px] md:w-[300px] md:h-[426px] relative drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] bg-no-repeat shadow-2xl animate-[flip-in_0.8s_ease-out]"
            style={{
              backgroundImage: `url('${drawnCosmetic.image}')`,
              backgroundPosition: drawnCosmetic.bgPos,
              backgroundSize: '300% 100%',
              backgroundColor: 'transparent'
            }}
          />
          
          <div className="mt-8 text-center bg-slate-900/80 p-4 rounded-2xl border border-slate-700 backdrop-blur-md">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{t(`cosmetics.${drawnCosmetic.id}`, drawnCosmetic.name)}</h3>
             <span className="text-sm md:text-base text-amber-500 uppercase font-bold tracking-widest">{t(`cosmetics.categories.${drawnCosmetic.category}`, drawnCosmetic.category)}</span>
          </div>

          <button 
            onClick={reset}
            className="mt-8 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-lg uppercase tracking-wider transition-all shadow-lg active:scale-95"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
};
