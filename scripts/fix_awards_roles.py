import re
import os

# --- 1. src/utils/awards.js ---
awards_file = "src/utils/awards.js"
with open(awards_file, "r", encoding="utf-8") as f:
    awards_data = f.read()

# Replace scoreGlobal calculation
old_calc = """  // On recentre la note sur 6.0 pour Ǹviter qu'une bonne note suffise  elle seule
  let scoreGlobal = (rating > 6.0 ? (rating - 6.0) * 1.5 : 0)
    + perfPoints
    + (clWinner ? 2.5 : 0) 
    + (intlWinner ? 3.0 : 0) 
    + (leagueWinner ? 1.5 : 0)
    + (domesticCupWinner ? 0.5 : 0)
    + (isUefaPoty ? 1.0 : 0) 
    + (wonIntlBestPlayer ? 1.0 : 0);"""

new_calc = """  // Nouveau calcul du Ballon d'Or avec plus de poids pour les performances (G/A) et l'OVR (rputation)
  let scoreGlobal = (rating > 6.0 ? (rating - 6.0) * 1.5 : 0)
    + (perfPoints * 1.5) // Augmente drastiquement l'importance des G/A et Clean Sheets
    + (Math.max(0, ovr - 80) * 0.2) // L'aura et la rputation du joueur l'aide  gagner (+3 pts pour 95 OVR)
    + (clWinner ? 1.5 : 0) // Moins dcisif  lui seul (de 2.5  1.5)
    + (intlWinner ? 2.0 : 0) 
    + (leagueWinner ? 1.0 : 0)
    + (domesticCupWinner ? 0.2 : 0)
    + (isUefaPoty ? 1.0 : 0) 
    + (wonIntlBestPlayer ? 1.0 : 0);"""

# The file might have encoding quirks, we'll try a regex replacement if strict fails.
match = re.search(r'let scoreGlobal = \(rating > 6\.0 \? \(rating - 6\.0\) \* 1\.5 : 0\).*?\+ \(wonIntlBestPlayer \? 1\.0 : 0\);', awards_data, re.DOTALL)
if match:
    awards_data = awards_data.replace(match.group(0), new_calc)
else:
    print("WARNING: Could not find scoreGlobal block in awards.js")

with open(awards_file, "w", encoding="utf-8") as f:
    f.write(awards_data)
print("Updated awards.js")


# --- 2. src/components/RoleSelectionModal.jsx ---
role_selection_code = """import React from 'react';

export const RoleSelectionModal = ({ onSelect, playerPosition }) => {
  let roles = [];
  
  if (playerPosition?.includes('ATT')) {
    roles = [
      { id: 'role_renard', name: 'Renard des surfaces', icon: '??', desc: 'Une finition ltale mais participe moins au jeu.', pros: '+5 Tir', cons: '-5 Passe', effect: { finishing: 5, passing: -5 } },
      { id: 'role_faux9', name: 'Faux 9', icon: '???', desc: 'Dcroche pour organiser le jeu au dtriment de la prsence dans la surface.', pros: '+5 Passe', cons: '-5 Tir', effect: { passing: 5, finishing: -5 } },
      { id: 'role_pivot', name: 'Pivot', icon: '???', desc: 'Fixe les dfenses par sa prsence athltique.', pros: '+5 Physique', cons: '-5 Vitesse', effect: { physical: 5, pace: -5 } }
    ];
  } else if (playerPosition?.includes('MID')) {
    roles = [
      { id: 'role_meneur', name: 'Meneur de jeu', icon: '???', desc: 'Le maestro au milieu de terrain.', pros: '+5 Passe', cons: '-5 Dfense', effect: { passing: 5, defense: -5 } },
      { id: 'role_b2b', name: 'Box-to-Box', icon: '??', desc: 'Infatigable, il couvre tout le terrain.', pros: '+5 Physique', cons: '-5 Dribble', effect: { physical: 5, dribbling: -5 } },
      { id: 'role_sentinelle', name: 'Rcuprateur', icon: '??', desc: 'Un mur infranchissable au milieu.', pros: '+5 Dfense', cons: '-5 Tir', effect: { defense: 5, finishing: -5 } }
    ];
  } else if (playerPosition?.includes('DEF')) {
    roles = [
      { id: 'role_libero', name: 'Libro / Relanceur', icon: '??', desc: 'Le premier attaquant, avec une relance propre.', pros: '+5 Passe', cons: '-5 Physique', effect: { passing: 5, physical: -5 } },
      { id: 'role_stoppeur', name: 'Stoppeur', icon: '??', desc: 'Rugueux et impitoyable dans les duels.', pros: '+5 Dfense', cons: '-5 Vitesse', effect: { defense: 5, pace: -5 } },
      { id: 'role_lateral', name: 'Latral Offensif', icon: '??', desc: 'Apporte le danger sur les ailes.', pros: '+5 Vitesse', cons: '-5 Dfense', effect: { pace: 5, defense: -5 } }
    ];
  } else {
    // GK ou dfaut
    roles = [
      { id: 'role_ligne', name: 'Gardien de ligne', icon: '??', desc: 'Des rflexes sur sa ligne hors normes.', pros: '+5 Dfense', cons: '-5 Passe', effect: { defense: 5, passing: -5 } },
      { id: 'role_moderne', name: 'Gardien relanceur', icon: '??', desc: 'Participe  la relance courte avec aisance.', pros: '+5 Passe', cons: '-5 Dfense', effect: { passing: 5, defense: -5 } }
    ];
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-2xl w-[95%] shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
        
        <div className="text-center mb-8 mt-2">
          <span className="text-4xl mb-3 block">??</span>
          <h2 className="heading-typography text-2xl font-black text-white uppercase tracking-wider mb-2">18 Ans : L'ge de Raison</h2>
          <p className="text-slate-400">Il est temps de dfinir votre style de jeu principal. Choisissez votre <span className="text-amber-400 font-bold">Rle de prdilection</span>.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelect(role)}
              className="flex flex-col items-center p-4 md:p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-800 hover:border-amber-500/50 transition-all group text-left relative overflow-hidden"
            >
              <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{role.icon}</div>
              <h3 className="heading-typography font-bold text-white mb-2 text-center text-sm md:text-base">{role.name}</h3>
              <p className="text-xs text-slate-400 mb-4 text-center line-clamp-3 leading-relaxed">{role.desc}</p>
              
              <div className="mt-auto w-full space-y-1">
                <div className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-1 rounded text-center border border-emerald-500/30">{role.pros}</div>
                <div className="bg-rose-500/20 text-rose-400 text-xs font-semibold px-2 py-1 rounded text-center border border-rose-500/30">{role.cons}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
"""

with open("src/components/RoleSelectionModal.jsx", "w", encoding="utf-8") as f:
    f.write(role_selection_code)
print("Created RoleSelectionModal.jsx")

