import { LIFESTYLE_ITEMS } from '../utils/gameData';

export function LifestyleShopModal({ isOpen, onClose, bankBalance, player, onBuyItem }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl md:rounded-3xl max-w-3xl w-[95%] p-4 md:p-6 shadow-2xl relative text-slate-800 dark:text-white space-y-4 overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center border-b border-slate-300 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white">🛍️ Boutique & Équipements Pro</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400">Investissez vos gains pour booster vos performances</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:text-white font-bold">✕</button>
        </div>

        <div className="bg-emerald-100 dark:bg-slate-950 p-3 rounded-2xl flex justify-between items-center border border-slate-300 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-400">Solde disponible</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{bankBalance.toLocaleString('fr-FR')} €</span>
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-[75vh] overflow-y-auto pr-1">
          {LIFESTYLE_ITEMS.map((item) => {
            const isOwned = player.inventory?.includes(item.id);
            const canAfford = bankBalance >= item.cost;
            const hasUpkeep = item.upkeep < 0;
            const isProfitable = item.upkeep > 0;
            return (
              <div key={item.id} className="p-2 sm:p-3 bg-emerald-100 dark:bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-300 dark:border-slate-800 flex flex-col justify-between gap-1 sm:gap-2 group hover:border-emerald-500/50 transition-colors">
                <div>
                  <h4 className="font-bold text-[9px] sm:text-xs text-slate-800 dark:text-white flex flex-col sm:flex-row flex-wrap gap-1 sm:items-center mb-1">
                    <span className="leading-tight">{item.name}</span>
                    <div className="flex gap-1">
                      {isProfitable && <span className="text-[7px] sm:text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Rentable</span>}
                      {hasUpkeep && <span className="text-[7px] sm:text-[9px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30">Frais/an</span>}
                    </div>
                  </h4>
                  <p className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-1 sm:mt-2 pt-1.5 sm:pt-2 border-t border-slate-800/50 gap-1.5 sm:gap-0">
                  <span className="text-[9px] sm:text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {item.cost >= 1000000 ? `${(item.cost / 1000000).toFixed(1)}M €` : `${(item.cost / 1000).toFixed(0)}k €`}
                  </span>
                  <button
                    disabled={isOwned || !canAfford}
                    onClick={() => onBuyItem(item)}
                    className={`w-full sm:w-auto py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-black text-[8px] sm:text-[10px] uppercase tracking-wider transition-all flex-shrink-0 ${
                      isOwned
                        ? 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-500 dark:text-slate-400 cursor-default'
                        : canAfford
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-800 dark:text-slate-100 shadow-md active:scale-95'
                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? 'Acquis ✔️' : 'Acheter'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. COMPOSANT : DASHBOARD & INTERFACE PRINCIPALE
// ============================================================================
