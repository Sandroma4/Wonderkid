import { LIFESTYLE_ITEMS } from '../utils/gameData';

export function LifestyleShopModal({ isOpen, onClose, bankBalance, player, onBuyItem }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex justify-center items-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl max-w-xl w-[95%] p-4 md:p-6 shadow-2xl relative text-white space-y-4 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-white">🛍️ Boutique & Équipements Pro</h3>
            <p className="text-xs text-slate-400">Investissez vos gains pour booster vos performances</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white font-bold">✕</button>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl flex justify-between items-center border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Solde disponible</span>
          <span className="text-lg font-black text-emerald-400">{bankBalance.toLocaleString('fr-FR')} €</span>
        </div>

        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {LIFESTYLE_ITEMS.map((item) => {
            const isOwned = player.inventory?.includes(item.id);
            const canAfford = bankBalance >= item.cost;
            const hasUpkeep = item.upkeep < 0;
            const isProfitable = item.upkeep > 0;
            return (
              <div key={item.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center gap-4 group hover:border-emerald-500/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    {item.name}
                    {isProfitable && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Rentable</span>}
                    {hasUpkeep && <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">Frais/an</span>}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                  <span className="text-sm font-black text-emerald-400 block mt-2">
                    {item.cost >= 1000000 ? `${(item.cost / 1000000).toFixed(1)}M €` : `${(item.cost / 1000).toFixed(0)}k €`}
                  </span>
                </div>
                <button
                  disabled={isOwned || !canAfford}
                  onClick={() => onBuyItem(item)}
                  className={`py-2 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                    isOwned
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : canAfford
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-100 shadow-md active:scale-95'
                      : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isOwned ? 'Acquis ✔️' : 'Acheter'}
                </button>
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
