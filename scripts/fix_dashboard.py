import re

dashboard_file = "src/components/Dashboard.jsx"
with open(dashboard_file, "r", encoding="utf-8") as f:
    dashboard = f.read()

# 1. Update `isInteractiveMatch` UI logic
old_interactive_ui = """      ) : isInteractiveMatch && interactiveMatchPhases ? (
        <div className="app-typography min-h-[100dvh]-hidden" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-3xl w-full bg-slate-900/90 border-2 border-rose-500/50 rounded-3xl p-8 shadow-2xl z-10 text-white">"""

new_interactive_ui = """      ) : isInteractiveMatch && interactiveMatchPhases ? (
        <div className="app-typography min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden p-4" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-3xl w-full bg-slate-900/90 border-2 border-rose-500/50 rounded-3xl p-4 md:p-8 shadow-2xl z-10 text-white relative">
            {gameState.interactiveMatchFinalOutcome ? (
               <div className="bg-slate-900 border border-slate-700/50 p-6 md:p-8 rounded-2xl text-center shadow-inner space-y-6">
                 <h3 className={`heading-typography text-3xl md:text-4xl font-black uppercase tracking-wider ${gameState.interactiveMatchFinalOutcome === 'win' ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {gameState.interactiveMatchFinalOutcome === 'win' ? 'Victoire !' : 'Défaite...'}
                 </h3>
                 <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                   {gameState.interactiveMatchFinalOutcome === 'win' 
                     ? 'Vous avez brillé lors de ce match décisif. Cette performance restera dans les annales !' 
                     : 'Malheureusement, le match s\\'est soldé par un échec. Il va falloir rebondir rapidement.'}
                 </p>
                 <button 
                   onClick={() => { playSound('click'); onCloseInteractiveMatch(); }} 
                   className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 md:py-4 rounded-xl transition-transform active:scale-95 shadow-lg uppercase tracking-wider text-sm"
                 >
                   Fermer et continuer
                 </button>
               </div>
            ) : ("""

if old_interactive_ui in dashboard:
    dashboard = dashboard.replace(old_interactive_ui, new_interactive_ui)
else:
    match = re.search(r'\) : isInteractiveMatch && interactiveMatchPhases \? \(\s*<div className="app-typography min-h-\[100dvh\]-hidden" style=\{clubBackgroundStyle\}>\s*<div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>\s*<div className="max-w-3xl w-full bg-slate-900/90 border-2 border-rose-500/50 rounded-3xl p-8 shadow-2xl z-10 text-white">', dashboard)
    if match:
        dashboard = dashboard.replace(match.group(0), new_interactive_ui)

# End the conditional block of interactiveMatchResult
old_im_end = """                {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.options.map((opt, idx) => {
                   const statLabels = { pace: 'Vitesse', finishing: 'Finition', passing: 'Passe', dribbling: 'Dribble', defense: 'Dfense', physical: 'Physique' };
                   return (
                   <button key={idx} onClick={() => { playSound('click'); onPlayInteractiveMatch(idx); }} className="w-full text-left p-5 rounded-2xl bg-slate-800 border-2 border-slate-700 hover:border-amber-400 hover:bg-slate-700 transition-all group flex items-center justify-between">
                     <span className="font-semibold text-lg text-white">{opt.text}</span>
                     <span className="text-amber-500 text-xs font-bold uppercase tracking-wider opacity-50 group-hover:opacity-100">Test {statLabels[opt.stat] || opt.stat}</span>
                   </button>
                 )})}
               </div>
            )}
          </div>
        </div>"""

# Ensure the encoding is correct for the match
# Since there's an accent in 'Dfense', I'll use regex to match it.
match_end = re.search(r'\{interactiveMatchPhases\[interactiveMatchCurrentPhaseIndex\]\?\.options\.map.*?\}\)\}\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>', dashboard, re.DOTALL)
if match_end:
    replacement = match_end.group(0).replace('</div>\n        </div>', '</div>\n            )}\n          </div>\n        </div>')
    dashboard = dashboard.replace(match_end.group(0), replacement)


# 2. Add statGains in Bilan de la Saison
# Insert after seasonStats.tournaments
tournaments_block = """{seasonStats.tournaments.domesticCup && <p className="text-slate-200">?? Coupe Nationale : <span className="font-semibold">{seasonStats.tournaments.domesticCup.stage}</span></p>}
                </div>
              )}"""

stat_gains_ui = """
              {seasonStats.statGains && Object.keys(seasonStats.statGains).length > 0 && (
                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/50 shadow-inner text-xs space-y-1.5 hidden md:block">
                  <p className="font-bold text-slate-100 mb-1 uppercase tracking-wider text-[10px]">Progression</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(seasonStats.statGains).map(([attr, gain]) => {
                      const labels = { pace: 'Vitesse', finishing: 'Finition', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique' };
                      if (gain === 0) return null;
                      return (
                        <span key={attr} className={`px-2 py-1 rounded font-bold ${gain > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {labels[attr] || attr} {gain > 0 ? `+${gain}` : gain}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
"""
# Use regex to insert it right before `<div className="flex gap-3 mt-auto shrink-0">`
match = re.search(r'<div className="flex gap-3 mt-auto shrink-0">', dashboard)
if match:
    dashboard = dashboard[:match.start()] + stat_gains_ui + dashboard[match.start():]

# 3. Remove isSelectingPerk
match = re.search(r'\s*\) : isSelectingPerk \? \(.*?\)\s*:\s*\(\s*<div', dashboard, re.DOTALL)
if match:
    dashboard = dashboard.replace(match.group(0), "\n      ) : (\n        <div")
    
# Remove isSelectingPerk from destructuring
dashboard = dashboard.replace("interactiveMatchResult, isSelectingPerk, isRetired", "interactiveMatchResult, isRetired")
# Also remove onSelectPerk prop from Dashboard definition
dashboard = dashboard.replace("onSelectPerk,", "")

# Add onCloseInteractiveMatch to Dashboard args
dashboard = dashboard.replace(
    "onContinueFromInteractiveMatch,",
    "onContinueFromInteractiveMatch,\n  onCloseInteractiveMatch,"
)

with open(dashboard_file, "w", encoding="utf-8") as f:
    f.write(dashboard)
print("Updated Dashboard.jsx")
