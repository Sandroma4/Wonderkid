import os

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Rename Carrière to Rival
content = content.replace(
    ">Carrière</span>",
    ">Rival</span>"
)
content = content.replace(
    "🏆</span>\n                 <span className=\"text-[9px] font-bold tracking-widest uppercase\">Rival</span>",
    "🔥</span>\n                 <span className=\"text-[9px] font-bold tracking-widest uppercase\">Rival</span>"
)

# 2. Fix Club Actuel
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

with open("stats.txt", "r", encoding="utf-8") as f:
    stats_lines = f.readlines()
    
# Extract lines containing STATS DÉTAILLÉES block
stats_code_lines = []
in_stats = False
for line in stats_lines:
    if "{/* STATS DÉTAILLÉES" in line:
        in_stats = True
    if in_stats:
        stats_code_lines.append(line)
        if "</div>" in line and len(stats_code_lines) > 23:
            # We know it's about 24 lines long
            if line.strip() == "</div>":
                break

stats_code = "".join(stats_code_lines)

with open("graph.txt", "r", encoding="utf-8") as f:
    graph_lines = f.readlines()

graph_code_lines = []
in_graph = False
for line in graph_lines:
    if "{/* GRAPH VALEUR MARCHANDE" in line:
        in_graph = True
    if in_graph:
        graph_code_lines.append(line)
        if ")}\n" == line or ")}\r\n" == line or line.strip() == ")}":
            break
            
graph_code = "".join(graph_code_lines)

if stats_code in content and graph_code in content:
    desktop_stats = f'<div className="hidden md:block">\n{stats_code}\n</div>'
    mobile_graph = f'<div className="block md:hidden">\n{graph_code}\n</div>'
    
    desktop_graph = f'<div className="hidden md:block">\n{graph_code}\n</div>'
    mobile_stats = f'<div className="block md:hidden">\n{stats_code}\n</div>'
    
    col1_replacement = f'<> {desktop_stats}\n{mobile_graph} </>'
    col2_replacement = f'<> {desktop_graph}\n{mobile_stats} </>'
    
    content = content.replace(stats_code, col1_replacement)
    content = content.replace(graph_code, col2_replacement)
else:
    print("Could not find blocks")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
