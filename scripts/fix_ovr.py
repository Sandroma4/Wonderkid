with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the OVR in the header
# We will just search for the specific lines.
# Since it has weird characters in powershell output, let's use the actual string.
target = '                  Âge <span className="text-white ml-1 mr-3">{player.age} ans</span>\n                  <span className="text-slate-600 mx-1">|</span>\n                  <span className="ml-3 text-slate-400">Année</span> <span className="text-white ml-1">{player.currentYear || 2024}</span>'

# Let's try to find it first:
if "ans</span>" in content and "Année" in content:
    print("Found 'ans' and 'Année'")

replacement = '                  Âge <span className="text-white ml-1 mr-1 md:mr-3">{player.age} ans</span>\n                  <span className="text-slate-600 mx-1">|</span>\n                  <span className="md:hidden text-amber-400 mx-1 mr-2">OVR {player.ovr}</span>\n                  <span className="hidden md:inline text-slate-600 mx-1">|</span>\n                  <span className="md:ml-3 text-slate-400">Année</span> <span className="text-white ml-1">{player.currentYear || 2024}</span>'

# Try replacing
if target in content:
    content = content.replace(target, replacement)
    print("Replaced successfully!")
else:
    # try regex because of spacing issues
    import re
    regex = r'Âge <span className="text-white ml-1 mr-3">\{player\.age\} ans<\/span>[\s\S]*?<span className="text-slate-600 mx-1">\|<\/span>[\s\S]*?<span className="ml-3 text-slate-400">Année<\/span> <span className="text-white ml-1">\{player\.currentYear \|\| 2024\}<\/span>'
    
    match = re.search(regex, content)
    if match:
        content = content[:match.start()] + replacement + content[match.end():]
        print("Replaced with regex successfully!")
    else:
        print("Could not find the target string.")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
