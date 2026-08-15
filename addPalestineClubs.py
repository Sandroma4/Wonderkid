import json
import re

new_clubs = [
  {"id": "PS_HILAL", "ovr": 65, "name": "Hilal Al-Quds", "origin": "PS", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Le Croissant", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Le club de Jérusalem"},
  {"id": "PS_BALATA", "ovr": 64, "name": "Markaz Balata", "origin": "PS", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Le Centre de Balata", "preferredStat": "pace", "lifestyleFit": "PARTY", "pitch": "Ferveur populaire"},
  {"id": "PS_DHAHIRIYA", "ovr": 64, "name": "Shabab Al-Dhahiriya", "origin": "PS", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Les Cerfs", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "Combativité et histoire"},
  {"id": "PS_ALSAMU", "ovr": 63, "name": "Shabab Alsamu", "origin": "PS", "primary": "#FFD700", "secondary": "#000000", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • L'équipe courageuse", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Défense de fer"},
  {"id": "PS_THAKAFI", "ovr": 63, "name": "Thaqafi Tulkarm", "origin": "PS", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • La Culture", "preferredStat": "dribbling", "lifestyleFit": "PARTY", "pitch": "Technique et style"},
  {"id": "PS_AHLI", "ovr": 63, "name": "Ahli Al-Khaleel", "origin": "PS", "primary": "#FF0000", "secondary": "#000000", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Les Rouges et Noirs", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Jeu rapide sur les ailes"},
  {"id": "PS_WADI", "ovr": 62, "name": "Taraji Wadi Al-Nes", "origin": "PS", "primary": "#0000FF", "secondary": "#FFFF00", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • L'Espérance", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Collectif huilé"},
  {"id": "PS_AMARI", "ovr": 64, "name": "Shabab Al-Am'ari", "origin": "PS", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Le Camp Am'ari", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Un club au grand cœur"},
  {"id": "PS_MARKAZ", "ovr": 62, "name": "Markaz Tulkarm", "origin": "PS", "primary": "#FFFF00", "secondary": "#000000", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Les Jaunes", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Bataille pour le maintien"},
  {"id": "PS_ISLAMI", "ovr": 61, "name": "Islami Qalqilya", "origin": "PS", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "West Bank Premier League", "desc": "Premier League • Les Lions de Qalqilya", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "La force du nord"}
]

data_path = 'src/utils/gameData.js'
with open(data_path, 'r', encoding='utf8') as f:
    data = f.read()

c_str = '];\n\nexport const LIFESTYLE_ITEMS'
if c_str in data:
    lines = []
    for c in new_clubs:
        desc = c["desc"].replace("'", "\\'")
        pitch = c["pitch"].replace("'", "\\'")
        line = f"  {{ id: '{c['id']}', ovr: {c['ovr']}, name: '{c['name']}', origin: '{c['origin']}', primary: '{c['primary']}', secondary: '{c['secondary']}', tier: {c['tier']}, leagueName: '{c['leagueName']}', desc: '{desc}', preferredStat: '{c['preferredStat']}', lifestyleFit: '{c['lifestyleFit']}', pitch: '{pitch}' }}"
        lines.append(line)
    data = data.replace(c_str, ',\n' + ',\n'.join(lines) + '\n' + c_str)

with open(data_path, 'w', encoding='utf8') as f:
    f.write(data)

print("Palestine clubs added successfully!")
