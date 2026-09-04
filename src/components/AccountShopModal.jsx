import { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import { getAccountData, saveAccountData } from '../utils/storage';

export const ACCOUNT_PERKS = [
  { id: 'coach_favorite', name: "Chouchou du Coach", desc: "Commence chaque carrière avec une forte Confiance du Coach.", price: 350, icon: '🫂' },
  { id: 'rich_kid', name: "Héritier", desc: "Commence avec 500 000 € sur le compte en banque.", price: 500, icon: '💎' },
  { id: 'media_darling', name: "Chouchou des Médias", desc: "Débute la carrière avec +100 points de Hype.", price: 750, icon: '📸' },
  { id: 'titan_body', name: "Corps en Titane", desc: "Réduit drastiquement les risques de blessures aléatoires.", price: 1250, icon: '🛡️' },
  { id: 'local_legend', name: "Légende Locale", desc: "+5 OVR à la création de votre joueur.", price: 2500, icon: '🌟' }
];

export function AccountShopModal({ onClose }) {
  const [accountData, setAccountData] = useState({ goldenCoins: 0, unlockedPerks: [] });

  useEffect(() => {
    setAccountData(getAccountData());
  }, []);

  const handleBuyPerk = (perk) => {
    playSound('click');
    if (accountData.unlockedPerks.includes(perk.id)) return;
    
    if (accountData.goldenCoins >= perk.price) {
      if (window.confirm(`Voulez-vous vraiment acheter ${perk.name} pour ${perk.price} Golden Coins ?`)) {
        playSound('success');
        const newData = {
          ...accountData,
          goldenCoins: accountData.goldenCoins - perk.price,
          unlockedPerks: [...accountData.unlockedPerks, perk.id]
        };
        setAccountData(newData);
        saveAccountData(newData);
      }
    } else {
      alert("Pas assez de Golden Coins ! Jouez plus de carrières pour en gagner.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-slate-800 rounded-3xl border-2 border-amber-500/50 p-6 flex flex-col max-h-[90dvh]">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-3xl font-black text-white flex items-center gap-2 uppercase tracking-wider">
            <span>🛍️</span> Boutique de Compte
          </h2>
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center mb-6 shrink-0">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Votre Solde</p>
            <div className="text-3xl font-black text-amber-400 flex items-center gap-2">
              {accountData.goldenCoins} <span>🪙</span>
            </div>
          </div>
          <div className="text-right max-w-[200px]">
            <p className="text-slate-500 text-[10px] leading-tight">
              Gagnez des Golden Coins à la fin de chaque carrière. Les améliorations achetées s'appliquent automatiquement à toutes vos futures parties.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {ACCOUNT_PERKS.map((perk) => {
            const isUnlocked = accountData.unlockedPerks.includes(perk.id);
            const canAfford = accountData.goldenCoins >= perk.price;
            return (
              <div 
                key={perk.id}
                className={`p-4 rounded-2xl border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  isUnlocked 
                    ? 'bg-emerald-900/30 border-emerald-500/50' 
                    : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-80'}`}>
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      {perk.name}
                      {isUnlocked && <span className="text-xs bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded-full font-bold">ACTIF</span>}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 leading-snug">{perk.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  {isUnlocked ? (
                    <button className="w-full md:w-auto bg-slate-700 text-slate-400 px-6 py-3 rounded-xl font-bold cursor-not-allowed uppercase text-sm">
                      Possédé
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBuyPerk(perk)}
                      disabled={!canAfford}
                      className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold uppercase text-sm transition-transform active:scale-95 flex justify-center items-center gap-2 ${
                        canAfford 
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                          : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Acheter {perk.price} 🪙
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
