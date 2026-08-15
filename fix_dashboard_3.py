with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Rename Carrière to Rival
content = content.replace(
    ">Carrière</span>",
    ">Rival</span>"
)
content = content.replace(
    "🏆</span>\n                 <span className=\"text-[9px] font-bold tracking-widest uppercase\">Rival</span>",
    "🔥</span>\n                 <span className=\"text-[9px] font-bold tracking-widest uppercase\">Rival</span>"
)

# Replace Club box
original_club_box = """                  {/* Club Actuel */}
                  <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex flex-col justify-between gap-4 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate">
                        <span className="heading-typography text-sm font-black text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto relative z-10">
                      {/* Statut */}
                      <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl shadow-sm">
                        <span className="heading-typography text-[9px] font-bold uppercase tracking-widest text-amber-400 leading-none text-center">
                          {player.statusText}
                        </span>
                        {player.nationalStatus === 'CAPITAINE' && (
                          <span className="heading-typography text-[8px] font-bold uppercase tracking-widest text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        )}
                      </div>
                      {/* Solde */}
                      <div className="flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-3 py-2 rounded-xl flex items-center justify-center shadow-lg border border-emerald-300">
                        <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                        <span className="heading-typography text-[11px] font-black text-white drop-shadow-md z-10 tracking-wide">
                          {bankBalance.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </div>"""

new_club_box = """                  {/* Club Actuel - DESKTOP */}
                  <div className="hidden md:flex bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex-col justify-between gap-4 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate">
                        <span className="heading-typography text-sm font-black text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto relative z-10">
                      {/* Statut */}
                      <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl shadow-sm">
                        <span className="heading-typography text-[9px] font-bold uppercase tracking-widest text-amber-400 leading-none text-center">
                          {player.statusText}
                        </span>
                        {player.nationalStatus === 'CAPITAINE' && (
                          <span className="heading-typography text-[8px] font-bold uppercase tracking-widest text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        )}
                      </div>
                      {/* Solde */}
                      <div className="flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-3 py-2 rounded-xl flex items-center justify-center shadow-lg border border-emerald-300">
                        <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                        <span className="heading-typography text-[11px] font-black text-white drop-shadow-md z-10 tracking-wide">
                          {bankBalance.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Club Actuel - MOBILE */}
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
                  </div>"""

if original_club_box in content:
    content = content.replace(original_club_box, new_club_box)
    print("Replaced club box")
else:
    print("Could not find club box")
    
with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
