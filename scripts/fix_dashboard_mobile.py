import re
import os

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. State for Accordion
if "const [isMobileStatsOpen, setIsMobileStatsOpen] = useState(false);" not in content:
    content = content.replace("const [activeMobileTab, setActiveMobileTab] = useState('joueur');", "const [activeMobileTab, setActiveMobileTab] = useState('joueur');\n  const [isMobileStatsOpen, setIsMobileStatsOpen] = useState(false);")

# 2. Add OVR to mobile header
header_orig = """<span className="text-white ml-1 mr-3">{player.age} ans</span>
                  <span className="text-slate-600 mx-1">|</span>
                  <span className="ml-3 text-slate-400">AnnǸe</span> <span className="text-white ml-1">{player.currentYear || 2024}</span>"""
header_orig = header_orig.replace('AnnǸe', 'Année')
if "Année" not in content and "AnnǸe" in content: # Deal with potentially weird encodings
    # let's just replace the exact span
    content = re.sub(
        r'<span className="text-white ml-1 mr-3">\{player\.age\} ans</span>\s*<span className="text-slate-600 mx-1">\|</span>\s*<span className="ml-3 text-slate-400">Ann[^\<]+</span> <span className="text-white ml-1">\{player\.currentYear \|\| 2024\}</span>',
        r'<span className="text-white ml-1 mr-1 md:mr-3">{player.age} ans</span>\n                  <span className="text-slate-600 mx-1">|</span>\n                  <span className="md:hidden text-emerald-400 mx-1 mr-2">OVR {player.ovr}</span>\n                  <span className="hidden md:inline text-slate-600 mx-1">|</span>\n                  <span className="md:ml-3 text-slate-400">Année</span> <span className="text-white ml-1">{player.currentYear || 2024}</span>',
        content
    )

# 3. Transform Mobile "Stats Détaillées" into an accordion
# First find the block for mobile Stats Détaillées. We did a swap earlier, so the mobile one is inside <div className="block md:hidden">
# We can just look for the text "{/* STATS DÉTAILLÉES (Toujours visible) */}" in the second occurrence or just find the Mobile one.
mobile_stats_pattern = r'(<div className="block md:hidden">\s*\{\/\* STATS DÉTAILLÉES \(Toujours visible\) \*\/\}[\s\S]*?)<div className="bg-slate-900 border border-slate-700\/50 rounded-2xl p-3 shadow-2xl">\s*(<div className="heading-typography text-\[9px\] font-bold text-slate-300 uppercase tracking-wider flex items-center mb-3">\s*<span className="flex items-center gap-1\.5">.*? Stats Détaillées</span>\s*</div>)([\s\S]*?)(</div>\s*</div>\s*</div>)'
# Actually, an easier way is to use replace_file_content or a simpler string replacement.

# Let's extract the mobile stats block and wrap it in accordion logic.
# The `fix_dashboard_5.py` put the desktop first, then mobile.
# We will just replace all instances of the stats block but checking if it's the mobile one?
# Let's just find `Stats Détaillées`
stats_boxes = list(re.finditer(r'\{\/\* STATS DÉTAILLÉES \(Toujours visible\) \*\/\}[\s\S]*?</div>\s*</div>', content))
if len(stats_boxes) == 2:
    # Desktop is the first one, Mobile is the second one.
    mobile_box_start = stats_boxes[1].start()
    mobile_box_end = stats_boxes[1].end()
    mobile_box_content = content[mobile_box_start:mobile_box_end]
    
    # We replace the header inside it to be a clickable button
    header_regex = r'<div className="heading-typography text-\[9px\] font-bold text-slate-300 uppercase tracking-wider flex items-center mb-3">\s*<span className="flex items-center gap-1\.5">.*Stats Détaillées</span>\s*</div>'
    header_match = re.search(header_regex, mobile_box_content)
    if header_match:
        accordion_header = f"""<button onClick={{() => setIsMobileStatsOpen(!isMobileStatsOpen)}} className="w-full heading-typography text-[10px] font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center mb-1 bg-slate-800 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">📊 Stats Détaillées</span>
                    <span className="text-emerald-500 text-sm">{{isMobileStatsOpen ? '▲' : '▼'}}</span>
                  </button>
                  <div className={{`transition-all duration-300 overflow-hidden ${{isMobileStatsOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}}`}}>"""
        
        mobile_box_content = mobile_box_content[:header_match.start()] + accordion_header + mobile_box_content[header_match.end():] + "\n                  </div>"
        
        content = content[:mobile_box_start] + mobile_box_content + content[mobile_box_end:]

# 4. Reduce paddings for Player/Rival containers
content = content.replace('className="bg-slate-900 border border-slate-700/50 rounded-3xl p-4 shadow-2xl flex flex-col items-center h-fit"', 'className="bg-slate-900 border border-slate-700/50 rounded-3xl p-1 md:p-4 shadow-2xl flex flex-col items-center h-fit"')

# 5. Center Rival trophies
old_rival_trophies = """<div className="w-full flex justify-around bg-slate-800/50 p-2 rounded-xl border border-slate-700 relative z-10">
                        <div className="text-center">
                          <span className="text-lg block">🌟</span>
                          <span className="text-white font-bold text-sm">{rival.ballonDorCount || 0}</span>
                        </div>
                        <div className="text-center border-l border-slate-600 pl-4">
                          <span className="text-lg block">🏆</span>
                          <span className="text-white font-bold text-sm">{rival.trophiesCount || 0}</span>
                        </div>
                        <div className="text-center border-l border-slate-600 pl-4">
                          <span className="text-lg block">⚔️</span>
                          <span className="text-white font-bold text-[10px]">
                            {gameState.rivalConfrontations?.won || 0}V - {gameState.rivalConfrontations?.drawn || 0}N - {gameState.rivalConfrontations?.lost || 0}D
                          </span>
                        </div>
                      </div>"""

new_rival_trophies = """<div className="w-full flex flex-col md:flex-row items-center md:justify-around bg-slate-800/50 p-2 rounded-xl border border-slate-700 relative z-10 gap-2 md:gap-0">
                        <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0 w-full text-center">
                          <span className="text-lg block">🌟</span>
                          <span className="text-white font-bold text-sm">{rival.ballonDorCount || 0} <span className="md:hidden text-[10px] text-slate-400 font-normal ml-1">Ballons d'Or</span></span>
                        </div>
                        <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0 w-full text-center md:border-l md:border-slate-600 md:pl-4 border-t border-slate-600 pt-2 md:pt-0 md:border-t-0">
                          <span className="text-lg block">🏆</span>
                          <span className="text-white font-bold text-sm">{rival.trophiesCount || 0} <span className="md:hidden text-[10px] text-slate-400 font-normal ml-1">Trophées</span></span>
                        </div>
                        <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0 w-full text-center md:border-l md:border-slate-600 md:pl-4 border-t border-slate-600 pt-2 md:pt-0 md:border-t-0">
                          <span className="text-lg block">⚔️</span>
                          <span className="text-white font-bold text-[10px]">
                            {gameState.rivalConfrontations?.won || 0}V - {gameState.rivalConfrontations?.drawn || 0}N - {gameState.rivalConfrontations?.lost || 0}D
                          </span>
                        </div>
                      </div>"""

# Try both encoded and unencoded characters
content = content.replace(old_rival_trophies, new_rival_trophies)
# Let's use a regex to replace it if it has weird encodings
rival_regex = r'<div className="w-full flex justify-around bg-slate-800\/50 p-2 rounded-xl border border-slate-700 relative z-10">[\s\S]*?\{gameState\.rivalConfrontations\?\.lost \|\| 0\}D\s*</span>\s*</div>\s*</div>'
content = re.sub(rival_regex, new_rival_trophies, content)


with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Dashboard modifications complete.")
