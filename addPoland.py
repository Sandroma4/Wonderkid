import json
import re

new_countries = [
  { "id": "PL", "name": "Pologne" }
]

new_male_names = {
  "PL": ["Robert", "Krzysztof", "Piotr", "Wojciech", "Tomasz", "Paweł", "Michał", "Jan", "Jakub", "Kamil"]
}

new_female_names = {
  "PL": ["Anna", "Maria", "Katarzyna", "Małgorzata", "Agnieszka", "Krystyna", "Barbara", "Ewa", "Elżbieta", "Zofia"]
}

new_last_names = {
  "PL": ["Lewandowski", "Milik", "Szczęsny", "Zieliński", "Kiwior", "Cash", "Krychowiak", "Glik", "Błaszczykowski", "Piszczek"]
}

new_clubs = [
  {"id": "PL_LEG", "ovr": 72, "name": "Legia Warszawa", "origin": "PL", "primary": "#FFFFFF", "secondary": "#000000", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "Wojskowi"},
  {"id": "PL_LPO", "ovr": 71, "name": "Lech Poznań", "origin": "PL", "primary": "#0055A4", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Kolejorz"},
  {"id": "PL_RAK", "ovr": 71, "name": "Raków Częstochowa", "origin": "PL", "primary": "#ED1C24", "secondary": "#0055A4", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Medaliki"},
  {"id": "PL_JAG", "ovr": 70, "name": "Jagiellonia Białystok", "origin": "PL", "primary": "#FCE300", "secondary": "#ED1C24", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Jaga"},
  {"id": "PL_SLA", "ovr": 69, "name": "Śląsk Wrocław", "origin": "PL", "primary": "#009341", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Wojskowi"},
  {"id": "PL_POG", "ovr": 69, "name": "Pogoń Szczecin", "origin": "PL", "primary": "#0055A4", "secondary": "#8A1538", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Portowcy"},
  {"id": "PL_GOR", "ovr": 68, "name": "Górnik Zabrze", "origin": "PL", "primary": "#FFFFFF", "secondary": "#0055A4", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Górnicy"},
  {"id": "PL_ZAG", "ovr": 67, "name": "Zagłębie Lubin", "origin": "PL", "primary": "#F37021", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Miedziowi"},
  {"id": "PL_WID", "ovr": 67, "name": "Widzew Łódź", "origin": "PL", "primary": "#ED1C24", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "pace", "lifestyleFit": "PARTY", "pitch": "Czerwona Armia"},
  {"id": "PL_PIA", "ovr": 68, "name": "Piast Gliwice", "origin": "PL", "primary": "#0055A4", "secondary": "#ED1C24", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Piastunki"},
  {"id": "PL_STA", "ovr": 66, "name": "Stal Mielec", "origin": "PL", "primary": "#FFFFFF", "secondary": "#0055A4", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Biało-Niebiescy"},
  {"id": "PL_CRA", "ovr": 67, "name": "Cracovia", "origin": "PL", "primary": "#FFFFFF", "secondary": "#ED1C24", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Pasy"},
  {"id": "PL_KOR", "ovr": 65, "name": "Korona Kielce", "origin": "PL", "primary": "#FCE300", "secondary": "#ED1C24", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Złocisto-Krwiści"},
  {"id": "PL_RAD", "ovr": 66, "name": "Radomiak Radom", "origin": "PL", "primary": "#009341", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Zieloni"},
  {"id": "PL_PUS", "ovr": 64, "name": "Puszcza Niepołomice", "origin": "PL", "primary": "#FCE300", "secondary": "#009341", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Żubry"},
  {"id": "PL_LGD", "ovr": 67, "name": "Lechia Gdańsk", "origin": "PL", "primary": "#FFFFFF", "secondary": "#009341", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "Biało-Zieloni"},
  {"id": "PL_MOT", "ovr": 65, "name": "Motor Lublin", "origin": "PL", "primary": "#FCE300", "secondary": "#0055A4", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Motorowcy"},
  {"id": "PL_GKS", "ovr": 65, "name": "GKS Katowice", "origin": "PL", "primary": "#FCE300", "secondary": "#000000", "tier": 1, "leagueName": "Ekstraklasa", "desc": "Ekstraklasa", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "GieKSa"}
]

data_path = 'src/utils/gameData.js'
with open(data_path, 'r', encoding='utf8') as f:
    data = f.read()

# 1. Countries
c_match = re.search(r'export const COUNTRIES = \[.*?\];', data, re.DOTALL)
if c_match:
    block = c_match.group(0)
    parsed = []
    for line in block.split('\n'):
        m = re.search(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)"', line)
        if m:
            parsed.append({"id": m.group(1), "name": m.group(2)})
    for nc in new_countries:
        if not any(p["id"] == nc["id"] for p in parsed):
            parsed.append(nc)
    
    # Sort alphabetically by name (handling French accents roughly)
    import locale
    # We can just sort ignoring accents for basic sorting or use simple sort
    parsed.sort(key=lambda x: x["name"].lower().replace('é', 'e').replace('è', 'e').replace('ê', 'e').replace('ô', 'o').replace('á', 'a').replace('í', 'i').replace('ç', 'c'))
    
    lines = [f'  {{ id: "{c["id"]}", name: "{c["name"]}" }}' for c in parsed]
    new_str = 'export const COUNTRIES = [\n' + ',\n'.join(lines) + '\n];'
    data = data.replace(block, new_str)

# Dictionaries
for var_name, dic in [("FIRST_NAMES_MALE", new_male_names), ("FIRST_NAMES_FEMALE", new_female_names), ("LAST_NAMES", new_last_names)]:
    regex = re.compile(f'export const {var_name} = \\{{.*?\\}};', re.DOTALL)
    m = regex.search(data)
    if m:
        block = m.group(0)
        lines = []
        for k, v in dic.items():
            arr_str = str(v).replace("'", '"')
            lines.append(f'  {k}: {arr_str}')
        new_block = block.replace('\n};', ',\n' + ',\n'.join(lines) + '\n};')
        data = data.replace(block, new_block)

# Clubs
c_str_end = '];\n\nexport const LIFESTYLE_ITEMS'
if c_str_end not in data:
    c_str_end = '];\nexport const LIFESTYLE_ITEMS'

if c_str_end in data:
    lines = []
    for c in new_clubs:
        desc = c["desc"].replace("'", "\\'")
        pitch = c["pitch"].replace("'", "\\'")
        line = f"  {{ id: '{c['id']}', ovr: {c['ovr']}, name: '{c['name']}', origin: '{c['origin']}', primary: '{c['primary']}', secondary: '{c['secondary']}', tier: {c['tier']}, leagueName: '{c['leagueName']}', desc: '{desc}', preferredStat: '{c['preferredStat']}', lifestyleFit: '{c['lifestyleFit']}', pitch: '{pitch}' }}"
        lines.append(line)
    data = data.replace(c_str_end, ',\n' + ',\n'.join(lines) + '\n' + c_str_end)

with open(data_path, 'w', encoding='utf8') as f:
    f.write(data)

print("Poland added successfully and countries sorted!")
