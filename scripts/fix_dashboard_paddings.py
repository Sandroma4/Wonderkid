with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add `|` after OVR on mobile
old_header = '                  <span className="md:hidden text-amber-400 mx-1 mr-2">OVR {player.ovr}</span>\n                  <span className="hidden md:inline text-slate-600 mx-1">|</span>'
new_header = '                  <span className="md:hidden text-amber-400 mx-1">OVR {player.ovr}</span>\n                  <span className="md:hidden text-slate-600 mx-1">|</span>\n                  <span className="hidden md:inline text-slate-600 mx-1">|</span>'

if old_header in content:
    content = content.replace(old_header, new_header)
    print("Header separator added.")
else:
    print("Could not find old header.")

# 2. Player card container padding
old_player_container = '<div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-1 md:p-4 shadow-2xl flex flex-col items-center h-fit">'
new_player_container = '<div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit">'

if old_player_container in content:
    content = content.replace(old_player_container, new_player_container)
    print("Player container padding reduced.")

# 3. Rival card container padding
old_rival_container = '<div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-4 shadow-2xl flex flex-col items-center h-fit relative overflow-hidden">'
new_rival_container = '<div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit relative overflow-hidden">'

if old_rival_container in content:
    content = content.replace(old_rival_container, new_rival_container)
    print("Rival container padding reduced.")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
