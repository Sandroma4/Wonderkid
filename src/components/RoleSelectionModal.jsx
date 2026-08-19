import React from 'react';
import { ROLES_DATA } from '../utils/rolesData';

export const RoleSelectionModal = ({ onSelect, playerPosition }) => {
  // Déterminer la catégorie de position
  let posKey = 'ATT';
  const pos = (playerPosition || '').toUpperCase();
  if (pos.includes('MID') || pos.includes('MIL')) posKey = 'MID';
  else if (pos.includes('DEF') || pos.includes('ARR')) posKey = 'DEF';
  else if (pos.includes('GK') || pos.includes('GB')) posKey = 'GK';
  else posKey = 'ATT';

  const roles = ROLES_DATA[posKey] || ROLES_DATA.ATT;

  // Formater les multiplicateurs pour l'affichage
  const formatMultiplier = (val) => {
    const pct = Math.round((val - 1) * 100);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 border border-amber-500/30 rounded-2xl md:rounded-3xl p-3 md:p-8 max-w-4xl w-full shadow-[0_0_60px_rgba(245,158,11,0.15)] relative overflow-y-auto max-h-[92vh]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-t-2xl"></div>

        <div className="text-center mb-4 md:mb-8 mt-0">
          <span className="text-4xl md:text-5xl mb-2 md:mb-4 block drop-shadow-lg">👑</span>
          <h2 className="heading-typography text-lg md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3">
            18 Ans : L'Âge de Raison
          </h2>
          <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Il est temps de définir votre style de jeu. Choisissez votre{' '}
            <span className="text-amber-600 dark:text-amber-400 font-bold">Rôle de prédilection</span>.
            <br/>
            <span className="text-slate-500 dark:text-slate-500 text-xs mt-1 block">Ce bonus s'applique passivement tout au long de votre carrière.</span>
          </p>
        </div>

        <div className={`grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3`}>
          {roles.map((role) => {
            const positiveMultipliers = Object.entries(role.multipliers).filter(([, v]) => v > 1);
            const negativeMultipliers = Object.entries(role.multipliers).filter(([, v]) => v < 1);

            const statLabels = {
              pace: 'Vitesse', finishing: 'Tir', passing: 'Passe',
              dribbling: 'Dribble', defense: 'Défense', physical: 'Physique'
            };

            return (
              <button
                key={role.id}
                onClick={() => onSelect(role)}
                className="flex flex-col items-center text-center p-2 sm:p-3 bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-200 group relative overflow-hidden active:scale-95 w-full"
              >
                {/* Halo d'arrière-plan au survol */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg relative z-10 flex-shrink-0">
                  {role.icon}
                </div>
                
                <div className="flex flex-col flex-1 relative z-10">
                  <h3 className="heading-typography font-black text-slate-800 dark:text-white mb-0.5 sm:mb-1 text-[10px] sm:text-sm">
                    {role.name}
                  </h3>
                  <p className="text-[9px] sm:text-[11px] text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-1.5 sm:mb-3 leading-tight hidden sm:block">
                    {role.desc}
                  </p>
                  
                  <div className="mt-1 sm:mt-auto w-full flex flex-wrap justify-center gap-1 sm:gap-1.5">
                    {positiveMultipliers.map(([attr, val]) => (
                      <div key={attr} className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-emerald-500/25 tracking-wide">
                        {formatMultiplier(val)} {statLabels[attr] || attr}
                      </div>
                    ))}
                    {negativeMultipliers.map(([attr, val]) => (
                      <div key={attr} className="bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-rose-500/25 tracking-wide">
                        {formatMultiplier(val)} {statLabels[attr] || attr}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
