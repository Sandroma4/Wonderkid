import React from 'react';
import { getBaseTraits } from '../utils/traitsData';

export const TraitSelectionModal = ({ onSelect }) => {
  const traits = getBaseTraits();

  return (
    <div className="fixed inset-0 bg-emerald-200/90 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-2xl w-[95%] shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
        
        <div className="text-center mb-8 mt-2">
          <span className="text-4xl mb-3 block">🎂</span>
          <h2 className="heading-typography text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider mb-2">18 Ans : L'Âge de Raison</h2>
          <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400">Vous passez un cap important dans votre développement. Il est temps de définir votre style de jeu principal. Choisissez votre <span className="text-amber-600 dark:text-amber-400 font-bold">Trait Signature</span>.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {traits.map((trait) => (
            <button
              key={trait.id}
              onClick={() => onSelect(trait.id)}
              className="flex flex-col items-center p-6 bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-amber-500/50 transition-all group text-left relative overflow-hidden"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{trait.icon}</div>
              <h3 className="heading-typography font-bold text-slate-800 dark:text-white text-lg mb-2 text-center">{trait.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 text-center leading-relaxed">{trait.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
