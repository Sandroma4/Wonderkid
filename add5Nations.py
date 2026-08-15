import json
import re

new_countries = [
  { "id": "US", "name": "États-Unis" },
  { "id": "SCO", "name": "Écosse" },
  { "id": "GR", "name": "Grèce" },
  { "id": "UY", "name": "Uruguay" },
  { "id": "NG", "name": "Nigeria" }
]

new_male_names = {
  "US": ["Christian", "Weston", "Tyler", "Giovanni", "Timothy", "Sergiño", "Yunus", "Antonee", "Matt", "Zack"],
  "SCO": ["Andrew", "Scott", "John", "Callum", "Kieran", "Che", "Lyndon", "Billy", "Stuart", "Ryan"],
  "GR": ["Kostas", "Sokratis", "Giorgos", "Odisseas", "Anastasios", "Dimitrios", "Vangelis", "Michalis", "Giannis", "Petros"],
  "UY": ["Luis", "Edinson", "Federico", "Darwin", "Ronald", "Rodrigo", "José", "Matias", "Nicolas", "Diego"],
  "NG": ["Victor", "Alex", "Wilfred", "Kelechi", "Samuel", "William", "Moses", "Ola", "Joe", "Ademola"]
}

new_female_names = {
  "US": ["Alex", "Megan", "Rose", "Lindsey", "Kelley", "Crystal", "Tobin", "Julie", "Christen", "Alyssa"],
  "SCO": ["Erin", "Caroline", "Kim", "Rachel", "Nicola", "Jane", "Fiona", "Claire", "Lisa", "Chloe"],
  "GR": ["Eleni", "Maria", "Katerina", "Sofia", "Vasiliki", "Anastasia", "Georgia", "Evangelia", "Despoina", "Christina"],
  "UY": ["Maria", "Ana", "Lucia", "Camila", "Valentina", "Sofía", "Martina", "Julieta", "Paula", "Daniela"],
  "NG": ["Asisat", "Rasheedat", "Desire", "Onome", "Francisca", "Ngozi", "Rita", "Uchenna", "Joy", "Halimatu"]
}

new_last_names = {
  "US": ["Pulisic", "McKennie", "Adams", "Reyna", "Weah", "Dest", "Musah", "Robinson", "Turner", "Steffen"],
  "SCO": ["Robertson", "McTominay", "McGinn", "McGregor", "Tierney", "Adams", "Dykes", "Gilmour", "Armstrong", "Christie"],
  "GR": ["Tsimikas", "Papastathopoulos", "Masouras", "Vlachodimos", "Bakasetas", "Pelkas", "Pavlidis", "Mantalos", "Giannoulis", "Bouchalakis"],
  "UY": ["Suárez", "Cavani", "Valverde", "Núñez", "Araújo", "Bentancur", "Giménez", "Vecino", "De Arrascaeta", "Torreira"],
  "NG": ["Osimhen", "Iwobi", "Ndidi", "Iheanacho", "Chukwueze", "Troost-Ekong", "Simon", "Aina", "Aribo", "Lookman"]
}

new_clubs = [
  # USA - MLS (Major ones)
  {"id": "US_LAFC", "ovr": 73, "name": "LAFC", "origin": "US", "primary": "#000000", "secondary": "#C39E6D", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "pace", "lifestyleFit": "PARTY", "pitch": "Hollywood"},
  {"id": "US_LAG", "ovr": 72, "name": "LA Galaxy", "origin": "US", "primary": "#FFFFFF", "secondary": "#00245D", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "Galácticos"},
  {"id": "US_MIA", "ovr": 75, "name": "Inter Miami", "origin": "US", "primary": "#F7B5CD", "secondary": "#000000", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "The Herons"},
  {"id": "US_SEA", "ovr": 73, "name": "Seattle Sounders", "origin": "US", "primary": "#5D9732", "secondary": "#0055A4", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Sounders"},
  {"id": "US_ATL", "ovr": 72, "name": "Atlanta United", "origin": "US", "primary": "#800000", "secondary": "#000000", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "pace", "lifestyleFit": "PARTY", "pitch": "Five Stripes"},
  {"id": "US_NYC", "ovr": 72, "name": "New York City FC", "origin": "US", "primary": "#6CACE4", "secondary": "#00285E", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Pigeons"},
  {"id": "US_NYR", "ovr": 71, "name": "NY Red Bulls", "origin": "US", "primary": "#ED1C24", "secondary": "#FFFFFF", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "Red Bulls"},
  {"id": "US_PHI", "ovr": 72, "name": "Philadelphia Union", "origin": "US", "primary": "#002D55", "secondary": "#B38F36", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Zolos"},
  {"id": "US_CIN", "ovr": 73, "name": "FC Cincinnati", "origin": "US", "primary": "#F26522", "secondary": "#003087", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Orange and Blue"},
  {"id": "US_CLB", "ovr": 73, "name": "Columbus Crew", "origin": "US", "primary": "#FEF200", "secondary": "#000000", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "The Crew"},
  {"id": "US_POR", "ovr": 71, "name": "Portland Timbers", "origin": "US", "primary": "#004812", "secondary": "#EAE827", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Timbers"},
  {"id": "US_DAL", "ovr": 70, "name": "FC Dallas", "origin": "US", "primary": "#E81F3E", "secondary": "#002B5C", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Toros"},
  {"id": "US_AUS", "ovr": 70, "name": "Austin FC", "origin": "US", "primary": "#00B140", "secondary": "#000000", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "pace", "lifestyleFit": "PARTY", "pitch": "Verdes"},
  {"id": "US_NAS", "ovr": 71, "name": "Nashville SC", "origin": "US", "primary": "#ECE83A", "secondary": "#1F1646", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Coyotes"},
  {"id": "US_ORL", "ovr": 71, "name": "Orlando City", "origin": "US", "primary": "#612B9B", "secondary": "#FEE600", "tier": 1, "leagueName": "MLS", "desc": "MLS", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "Lions"},

  # Scotland - Premiership (12 clubs)
  {"id": "SCO_CEL", "ovr": 76, "name": "Celtic", "origin": "SCO", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "The Bhoys"},
  {"id": "SCO_RAN", "ovr": 75, "name": "Rangers", "origin": "SCO", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "The Gers"},
  {"id": "SCO_ABE", "ovr": 70, "name": "Aberdeen", "origin": "SCO", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "The Dons"},
  {"id": "SCO_HEA", "ovr": 71, "name": "Hearts", "origin": "SCO", "primary": "#800000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Jambos"},
  {"id": "SCO_HIB", "ovr": 70, "name": "Hibernian", "origin": "SCO", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Hibs"},
  {"id": "SCO_MOT", "ovr": 68, "name": "Motherwell", "origin": "SCO", "primary": "#FFC000", "secondary": "#800000", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "The Steelmen"},
  {"id": "SCO_KIL", "ovr": 69, "name": "Kilmarnock", "origin": "SCO", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Killie"},
  {"id": "SCO_STM", "ovr": 68, "name": "St Mirren", "origin": "SCO", "primary": "#000000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "The Buddies"},
  {"id": "SCO_DUU", "ovr": 67, "name": "Dundee United", "origin": "SCO", "primary": "#FF8C00", "secondary": "#000000", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "The Terrors"},
  {"id": "SCO_DUF", "ovr": 66, "name": "Dundee FC", "origin": "SCO", "primary": "#00008B", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "The Dark Blues"},
  {"id": "SCO_STJ", "ovr": 66, "name": "St Johnstone", "origin": "SCO", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "The Saints"},
  {"id": "SCO_ROS", "ovr": 65, "name": "Ross County", "origin": "SCO", "primary": "#00008B", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Premiership", "desc": "Premiership", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "The Staggies"},

  # Greece - Super League (14 clubs)
  {"id": "GR_OLY", "ovr": 75, "name": "Olympiacos", "origin": "GR", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "passing", "lifestyleFit": "PARTY", "pitch": "Erythrolefki"},
  {"id": "GR_PAO", "ovr": 74, "name": "Panathinaikos", "origin": "GR", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Prasini"},
  {"id": "GR_AEK", "ovr": 74, "name": "AEK Athens", "origin": "GR", "primary": "#FFD700", "secondary": "#000000", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Enosis"},
  {"id": "GR_PAOK", "ovr": 74, "name": "PAOK", "origin": "GR", "primary": "#000000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "Dikefalos tou Vorra"},
  {"id": "GR_ARI", "ovr": 71, "name": "Aris", "origin": "GR", "primary": "#FFD700", "secondary": "#000000", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Theos tou Polemou"},
  {"id": "GR_OFI", "ovr": 68, "name": "OFI Crete", "origin": "GR", "primary": "#000000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Omilos"},
  {"id": "GR_AST", "ovr": 68, "name": "Asteras Tripolis", "origin": "GR", "primary": "#FFFF00", "secondary": "#0000FF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Arkadia"},
  {"id": "GR_ATR", "ovr": 67, "name": "Atromitos", "origin": "GR", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Fearless"},
  {"id": "GR_VOL", "ovr": 67, "name": "Volos NFC", "origin": "GR", "primary": "#FF0000", "secondary": "#0000FF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Volos"},
  {"id": "GR_PAS", "ovr": 66, "name": "PAS Giannina", "origin": "GR", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "defense", "lifestyleFit": "STRICT", "pitch": "Ajax of Epirus"},
  {"id": "GR_PAN", "ovr": 66, "name": "Panetolikos", "origin": "GR", "primary": "#FFFF00", "secondary": "#0000FF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Titans"},
  {"id": "GR_LAM", "ovr": 65, "name": "Lamia", "origin": "GR", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Kyanolefki"},
  {"id": "GR_KIF", "ovr": 65, "name": "Kifisia", "origin": "GR", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Kifisia"},
  {"id": "GR_PAN", "ovr": 65, "name": "Panserraikos", "origin": "GR", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Super League", "desc": "Super League", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Lions"},

  # Uruguay - Primera División (16 clubs)
  {"id": "UY_PEN", "ovr": 74, "name": "Peñarol", "origin": "UY", "primary": "#FFD700", "secondary": "#000000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Carboneros"},
  {"id": "UY_NAC", "ovr": 74, "name": "Nacional", "origin": "UY", "primary": "#FFFFFF", "secondary": "#FF0000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Tricolores"},
  {"id": "UY_DEF", "ovr": 71, "name": "Defensor Sp.", "origin": "UY", "primary": "#800080", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "El Tuerto"},
  {"id": "UY_DAN", "ovr": 70, "name": "Danubio", "origin": "UY", "primary": "#FFFFFF", "secondary": "#000000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "La Franja"},
  {"id": "UY_LIV", "ovr": 71, "name": "Liverpool (URU)", "origin": "UY", "primary": "#000000", "secondary": "#0000FF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Negriazules"},
  {"id": "UY_WAN", "ovr": 70, "name": "Wanderers", "origin": "UY", "primary": "#000000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Bohemios"},
  {"id": "UY_RIV", "ovr": 69, "name": "River Plate (URU)", "origin": "UY", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Darseneros"},
  {"id": "UY_CER", "ovr": 68, "name": "Cerro", "origin": "UY", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "defense", "lifestyleFit": "PARTY", "pitch": "Villeros"},
  {"id": "UY_FEX", "ovr": 68, "name": "Fénix", "origin": "UY", "primary": "#800080", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Albivioletas"},
  {"id": "UY_BOS", "ovr": 68, "name": "Boston River", "origin": "UY", "primary": "#FF0000", "secondary": "#008000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "El Sastre"},
  {"id": "UY_MCT", "ovr": 67, "name": "MC Torque", "origin": "UY", "primary": "#87CEEB", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Ciudadanos"},
  {"id": "UY_RMP", "ovr": 67, "name": "Rampla Juniors", "origin": "UY", "primary": "#008000", "secondary": "#FF0000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "defense", "lifestyleFit": "PARTY", "pitch": "Picapiedras"},
  {"id": "UY_PRO", "ovr": 67, "name": "Progreso", "origin": "UY", "primary": "#FFFF00", "secondary": "#FF0000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Gauchos"},
  {"id": "UY_RAC", "ovr": 66, "name": "Racing (URU)", "origin": "UY", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "La Escuelita"},
  {"id": "UY_DEP", "ovr": 66, "name": "Dep. Maldonado", "origin": "UY", "primary": "#FF0000", "secondary": "#008000", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "Verdirrojos"},
  {"id": "UY_MIR", "ovr": 65, "name": "Miramar Misiones", "origin": "UY", "primary": "#000000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "Primera División", "desc": "Primera División", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Cebritas"},

  # Nigeria - NPFL (Top 12)
  {"id": "NG_ENY", "ovr": 70, "name": "Enyimba", "origin": "NG", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "physical", "lifestyleFit": "STRICT", "pitch": "People's Elephant"},
  {"id": "NG_KPF", "ovr": 69, "name": "Kano Pillars", "origin": "NG", "primary": "#008000", "secondary": "#FFFF00", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "defense", "lifestyleFit": "PARTY", "pitch": "Sai Masu Gida"},
  {"id": "NG_RIV", "ovr": 69, "name": "Rivers United", "origin": "NG", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Pride of Rivers"},
  {"id": "NG_LOB", "ovr": 68, "name": "Lobi Stars", "origin": "NG", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Ortom Boys"},
  {"id": "NG_RAN", "ovr": 68, "name": "Rangers Int.", "origin": "NG", "primary": "#FFFFFF", "secondary": "#FF0000", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "pace", "lifestyleFit": "STRICT", "pitch": "Flying Antelopes"},
  {"id": "NG_PLA", "ovr": 67, "name": "Plateau United", "origin": "NG", "primary": "#008000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Peace Boys"},
  {"id": "NG_AKW", "ovr": 67, "name": "Akwa United", "origin": "NG", "primary": "#FFA500", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "passing", "lifestyleFit": "BALANCED", "pitch": "Promise Keepers"},
  {"id": "NG_REM", "ovr": 68, "name": "Remo Stars", "origin": "NG", "primary": "#87CEEB", "secondary": "#000080", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "passing", "lifestyleFit": "STRICT", "pitch": "Sky Blue Stars"},
  {"id": "NG_SHO", "ovr": 66, "name": "Shooting Stars", "origin": "NG", "primary": "#0000FF", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "physical", "lifestyleFit": "PARTY", "pitch": "Oluyole Warriors"},
  {"id": "NG_KWA", "ovr": 66, "name": "Kwara United", "origin": "NG", "primary": "#008000", "secondary": "#FFFF00", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "defense", "lifestyleFit": "BALANCED", "pitch": "Afonja Warriors"},
  {"id": "NG_SUN", "ovr": 65, "name": "Sunshine Stars", "origin": "NG", "primary": "#FFA500", "secondary": "#000000", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "pace", "lifestyleFit": "BALANCED", "pitch": "Owena Whales"},
  {"id": "NG_ABK", "ovr": 65, "name": "Abia Warriors", "origin": "NG", "primary": "#FF0000", "secondary": "#FFFFFF", "tier": 1, "leagueName": "NPFL", "desc": "NPFL", "preferredStat": "physical", "lifestyleFit": "BALANCED", "pitch": "Ochendo Babes"}
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

print("5 Nations added successfully and countries sorted!")
