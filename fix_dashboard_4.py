import re

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

club_pattern = re.compile(r'(\s*\{\/\* Club Actuel \*\/\}[\s\S]*?\{/\* Gauges)', re.MULTILINE)

club_match = club_pattern.search(content)

if club_match:
    club_code = club_match.group(1)
    
    # We want to insert the mobile one and the desktop one right where this was.
    # The desktop one should be the exact original with a slightly changed wrapper:
    desktop_club = club_code.replace('flex flex-col', 'hidden md:flex flex-col')
    desktop_club = desktop_club.replace('{/* Club Actuel */}', '{/* Club Actuel - DESKTOP */}')
    desktop_club = desktop_club.replace('            {/* Gauges', '') # strip out Gauges part because it's part of the match
    
    mobile_club = """                  {/* Club Actuel - MOBILE */}
                  <div className="flex md:hidden bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl items-center justify-between gap-2 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate">
                        <span className="heading-typography text-sm font-black text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 relative z-10 flex-shrink-0">
                      {/* Statut */}
                      <div className="flex flex-col gap-1 items-end justify-center">
                        <span className="heading-typography text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-amber-400 leading-none text-right">
                          {player.statusText}
                        </span>
                        {player.nationalStatus === 'CAPITAINE' && (
                          <span className="heading-typography text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        )}
                      </div>
                      {/* Solde */}
                      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-2 py-1 rounded-md flex items-center justify-center shadow-lg border border-emerald-300">
                        <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                        <span className="heading-typography text-[9px] sm:text-[10px] font-black text-white drop-shadow-md z-10 tracking-wide">
                          {bankBalance.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </div>
"""
    
    full_replacement = desktop_club + mobile_club + "                  {/* Gauges"
    
    content = content.replace(club_code, full_replacement)
    print("Replaced club code!")
else:
    print("Could not find club box using regex")
    
with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
