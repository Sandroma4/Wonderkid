import re

# 1. Update gameData.js
with open("src/utils/gameData.js", "r", encoding="utf-8") as f:
    gamedata = f.read()

# Update generateRival
generate_rival_target = """export const generateRival = (player) => {
  const firstNames = ['Marco', 'Diego', 'Kévin', 'Jadon', 'Pablo', 'Joao', 'Luka', 'Ivan'];
  const lastNames = ['Rossi', 'Silva', 'Müller', 'Lopez', 'Garcia', 'Kovac', 'Santos', 'Costa'];
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const ovr = (player.ovr || 50) + Math.floor(Math.random() * 5); // Rival starts slightly better or equal
  const age = player.age || 18;
  return {
    id: `rival_${Date.now()}`,
    name,
    age,
    ovr,
    club: ALL_CLUBS[Math.floor(Math.random() * ALL_CLUBS.length)],"""

generate_rival_replace = """export const generateRival = (player) => {
  const firstNames = ['Marco', 'Diego', 'Kévin', 'Jadon', 'Pablo', 'Joao', 'Luka', 'Ivan'];
  const lastNames = ['Rossi', 'Silva', 'Müller', 'Lopez', 'Garcia', 'Kovac', 'Santos', 'Costa'];
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const ovr = (player.ovr || 50) + Math.floor(Math.random() * 5); // Rival starts slightly better or equal
  
  const attributes = {
    pace: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
    shooting: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
    passing: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
    dribbling: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
    defense: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
    physical: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),
  };

  const age = player.age || 18;
  return {
    id: `rival_${Date.now()}`,
    name,
    age,
    ovr,
    attributes,
    club: ALL_CLUBS[Math.floor(Math.random() * ALL_CLUBS.length)],"""

if generate_rival_target in gamedata:
    gamedata = gamedata.replace(generate_rival_target, generate_rival_replace)
    print("generateRival updated.")
else:
    # Handle encoding variations for accents (e.g. Kévin)
    import string
    # Let's just use regex
    match = re.search(r'export const generateRival =.*?return \{.*?\n.*?club: ALL_CLUBS\[Math\.floor\(Math\.random\(\) \* ALL_CLUBS\.length\)\],', gamedata, re.DOTALL)
    if match:
        original = match.group(0)
        replacement = original.replace("ovr,", "ovr,\n    attributes: {\n      pace: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n      shooting: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n      passing: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n      dribbling: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n      defense: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n      physical: Math.max(30, Math.min(99, ovr + Math.floor(Math.random() * 15) - 7)),\n    },")
        gamedata = gamedata.replace(original, replacement)
        print("generateRival updated via regex.")

# Update updateRival
update_rival_target = """  if (newAge <= 31 && newOvr < playerOvr - 5) {
     newOvr = playerOvr - 5;
  }
  newOvr = Math.max(40, Math.min(99, newOvr));
  
  // Simulation des succès du rival"""

update_rival_replace = """  if (newAge <= 31 && newOvr < playerOvr - 5) {
     newOvr = playerOvr - 5;
  }
  newOvr = Math.max(40, Math.min(99, newOvr));
  
  const ovrDiff = newOvr - rival.ovr;
  const newAttributes = { ...(rival.attributes || {
    pace: rival.ovr, shooting: rival.ovr, passing: rival.ovr,
    dribbling: rival.ovr, defense: rival.ovr, physical: rival.ovr
  }) };
  ['pace', 'shooting', 'passing', 'dribbling', 'defense', 'physical'].forEach(attr => {
    let variation = ovrDiff + (Math.floor(Math.random() * 3) - 1);
    if (newAge > 31 && (attr === 'pace' || attr === 'physical')) {
      variation -= Math.floor(Math.random() * 3);
    }
    newAttributes[attr] = Math.max(15, Math.min(99, newAttributes[attr] + variation));
  });
  
  // Simulation des succès du rival"""

if update_rival_target in gamedata:
    gamedata = gamedata.replace(update_rival_target, update_rival_replace)
    print("updateRival updated.")
else:
    match = re.search(r'newOvr = Math\.max\(40, Math\.min\(99, newOvr\)\);.*?// Simulation des', gamedata, re.DOTALL)
    if match:
        gamedata = gamedata.replace(match.group(0), update_rival_replace)
        print("updateRival updated via regex.")

# And return the updated attributes
return_rival_match = re.search(r'return \{.*?\}', gamedata[gamedata.find('return {', gamedata.find('export const updateRival')):], re.DOTALL)
if return_rival_match:
    ret_str = return_rival_match.group(0)
    if 'attributes: newAttributes,' not in ret_str:
        new_ret_str = ret_str.replace('age: newAge,', 'age: newAge,\n    attributes: newAttributes,')
        gamedata = gamedata.replace(ret_str, new_ret_str)
        print("updateRival return block updated.")

with open("src/utils/gameData.js", "w", encoding="utf-8") as f:
    f.write(gamedata)


# 2. Update Dashboard.jsx
with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    dashboard_content = f.read()

format_func = """
const formatEventCategory = (cat) => {
  if (!cat) return 'Événement';
  const labels = {
    'WORLD_CUP': 'Coupe du Monde',
    'EURO': 'Euro',
    'CHAMPIONS_LEAGUE': 'Ligue des Champions',
    'CUP': 'Coupe Nationale',
    'LIFESTYLE': 'Vie Privée',
    'TRANSFERT': 'Transfert',
    'VESTIAIRE': 'Vestiaire',
    'CARRIÈRE': 'Carrière',
    'ENTRAÎNEMENT': 'Entraînement',
    'MÉDIAS': 'Médias',
    'SPONSOR': 'Sponsor',
    'FANS': 'Fans',
    'TERRAIN': 'Terrain',
    'RIVALITÉ': 'Rivalité'
  };
  return labels[cat] || cat;
};

"""

if "formatEventCategory" not in dashboard_content:
    # Inject it before export function Dashboard
    dashboard_content = dashboard_content.replace('export function Dashboard({', format_func + 'export function Dashboard({')

target_cat_display = "{currentEvent?.category || 'Événement'}"
replacement_cat_display = "{formatEventCategory(currentEvent?.category)}"

# Wait, there are encoding issues with 'Événement'. Let's replace the whole span block using regex.
import re
dashboard_content = re.sub(r'\{currentEvent\?\.category \|\|[^}]+\}', replacement_cat_display, dashboard_content)

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(dashboard_content)
    print("Dashboard updated.")
