import re
import codecs
import hashlib

# Exact Color mappings for popular clubs
COLORS = {
    # ENGLAND
    'Arsenal': ('#EF0107', '#FFFFFF'),
    'Aston Villa': ('#670E36', '#95BFE5'),
    'Bournemouth': ('#DA291C', '#000000'),
    'Brentford': ('#E30613', '#FFFFFF'),
    'Brighton': ('#0057B8', '#FFFFFF'),
    'Chelsea': ('#034694', '#FFFFFF'),
    'Crystal Palace': ('#1B458F', '#C4122E'),
    'Everton': ('#003399', '#FFFFFF'),
    'Fulham': ('#FFFFFF', '#000000'),
    'Liverpool': ('#C8102E', '#F6EB61'),
    'Luton Town': ('#F78F1E', '#000000'),
    'Man City': ('#6CABDD', '#1C2C5B'),
    'Manchester City': ('#6CABDD', '#1C2C5B'),
    'Man United': ('#DA291C', '#000000'),
    'Manchester United': ('#DA291C', '#000000'),
    'Newcastle': ('#241F20', '#FFFFFF'),
    'Nottm Forest': ('#DD0000', '#FFFFFF'),
    'Sheff Utd': ('#EE2737', '#000000'),
    'Tottenham': ('#132257', '#FFFFFF'),
    'West Ham': ('#7A263A', '#1BB1E7'),
    'Wolves': ('#FDB913', '#231F20'),
    
    # FRANCE
    'Paris SG': ('#004170', '#DA291C'),
    'Marseille': ('#FFFFFF', '#2FAEE0'),
    'Lyon': ('#FFFFFF', '#DA291C'),
    'Monaco': ('#E30613', '#FFFFFF'),
    'Lille': ('#E30613', '#231F20'),
    'Lens': ('#ED1C24', '#FFD100'),
    'Rennes': ('#E30613', '#000000'),
    'Nice': ('#ED1C24', '#000000'),
    'Montpellier': ('#F36C21', '#002C5B'),
    'Nantes': ('#FFF200', '#00833D'),
    'Strasbourg': ('#005CA9', '#FFFFFF'),
    'Toulouse': ('#5C2D91', '#FFFFFF'),
    'Brest': ('#ED1C24', '#FFFFFF'),
    'Reims': ('#E30613', '#FFFFFF'),
    
    # SPAIN
    'Real Madrid': ('#FFFFFF', '#5C2D91'),
    'Barcelona': ('#004D98', '#A50044'),
    'Atlético': ('#CB3524', '#272E61'),
    'Athletic': ('#EE2523', '#000000'),
    'Real Sociedad': ('#0067B1', '#FFFFFF'),
    'Betis': ('#0BB363', '#FFFFFF'),
    'Sevilla': ('#FFFFFF', '#D50032'),
    'Villarreal': ('#FCE400', '#00508F'),
    'Valencia': ('#FFFFFF', '#000000'),
    'Osasuna': ('#CA2027', '#002C5B'),
    
    # ITALY
    'Juventus': ('#000000', '#FFFFFF'),
    'Inter': ('#005CA8', '#000000'),
    'Milan': ('#FB090B', '#000000'),
    'Napoli': ('#12A0D7', '#FFFFFF'),
    'Roma': ('#8E1F2F', '#F0BC42'),
    'Lazio': ('#87D8F7', '#FFFFFF'),
    'Atalanta': ('#1A5784', '#000000'),
    'Fiorentina': ('#482E92', '#FFFFFF'),
    
    # GERMANY
    'Bayern': ('#DC052D', '#FFFFFF'),
    'Dortmund': ('#FDE100', '#000000'),
    'Bayer': ('#E32221', '#000000'),
    'Leverkusen': ('#E32221', '#000000'),
    'Leipzig': ('#DD013F', '#FFFFFF'),
    'Union Berlin': ('#E2001A', '#FEEA00'),
    'Freiburg': ('#000000', '#FFFFFF'),
    'Frankfurt': ('#E1000F', '#000000'),
    'Wolfsburg': ('#65B32E', '#FFFFFF'),
    
    # OTHER MAJORS
    'Ajax': ('#D2122E', '#FFFFFF'),
    'PSV': ('#F00000', '#FFFFFF'),
    'Feyenoord': ('#E32221', '#000000'),
    'Porto': ('#0032A0', '#FFFFFF'),
    'Benfica': ('#ED1C24', '#FFFFFF'),
    'Sporting': ('#008040', '#FFFFFF'),
    'Galatasaray': ('#A90432', '#FDB912'),
    'Fenerbahçe': ('#003E7E', '#FFED00'),
    'Besiktas': ('#000000', '#FFFFFF'),
    'Celtic': ('#008000', '#FFFFFF'),
    'Rangers': ('#0033A0', '#FFFFFF'),
    'Boca Juniors': ('#00529F', '#F2A900'),
    'River Plate': ('#FFFFFF', '#D1122C'),
    'Flamengo': ('#C8102E', '#000000'),
    'Palmeiras': ('#006437', '#FFFFFF'),
    'Sao Paulo': ('#FFFFFF', '#FF0000'),
    'Al Nassr': ('#FFD700', '#00529F'),
    'Al Hilal': ('#00529F', '#FFFFFF'),
    'Al Ittihad': ('#FDB913', '#000000')
}

# Heuristics based on common words in club names
KEYWORDS = [
    (['red', 'rouge', 'rojo', 'rosso', 'rot', 'united', 'bayern', 'liverpool', 'arsenal', 'roma', 'milan', 'kırmızı', 'vermelho'], '#DA291C', '#FFFFFF'),
    (['blue', 'bleu', 'azul', 'blu', 'blau', 'chelsea', 'everton', 'inter', 'schalke', 'napoli', 'city', 'cruzeiro', 'mavi', 'pachuca'], '#005CA8', '#FFFFFF'),
    (['green', 'vert', 'verde', 'celtic', 'sporting', 'betis', 'palmeiras', 'saint-étienne', 'sassuolo', 'yeşil'], '#008040', '#FFFFFF'),
    (['yellow', 'jaune', 'amarillo', 'giallo', 'gelb', 'dortmund', 'villarreal', 'nantes', 'cadiz', 'frosinone', 'sarı', 'amarelo'], '#FDE100', '#000000'),
    (['black', 'noir', 'negro', 'nero', 'schwarz', 'juventus', 'besiktas', 'newcastle', 'atletico mineiro', 'siyah', 'preto'], '#000000', '#FFFFFF'),
    (['white', 'blanc', 'blanco', 'bianco', 'weiss', 'real madrid', 'tottenham', 'leeds', 'swansea', 'santos', 'beyaz', 'branco'], '#FFFFFF', '#000000'),
    (['purple', 'violet', 'viola', 'fiorentina', 'toulouse', 'anderlecht'], '#5C2D91', '#FFFFFF'),
    (['orange', 'oranje', 'valencia', 'galatasaray', 'shakhtar', 'wolves'], '#F36C21', '#000000'),
    (['claret', 'aston villa', 'west ham', 'burnley'], '#670E36', '#95BFE5')
]

def get_hash_colors(name):
    # Deterministic beautiful colors based on club name
    h = int(hashlib.md5(name.encode('utf-8')).hexdigest(), 16)
    
    palette = [
        ('#004170', '#FFFFFF'), ('#DA291C', '#FFFFFF'), ('#000000', '#FFFFFF'),
        ('#005CA8', '#FDE100'), ('#008040', '#FFFFFF'), ('#5C2D91', '#FFFFFF'),
        ('#F36C21', '#000000'), ('#FFFFFF', '#DA291C'), ('#6CABDD', '#FFFFFF'),
        ('#E32221', '#000000'), ('#132257', '#FFFFFF'), ('#004D98', '#A50044'),
        ('#CB3524', '#272E61'), ('#FCE400', '#00508F'), ('#1A5784', '#000000')
    ]
    return palette[h % len(palette)]

def get_club_colors(name):
    for k, v in COLORS.items():
        if k.lower() == name.lower() or k.lower() in name.lower():
            return v
            
    name_lower = name.lower()
    for keywords, p, s in KEYWORDS:
        for kw in keywords:
            if kw in name_lower:
                return (p, s)
                
    return get_hash_colors(name)

with codecs.open('src/utils/gameData.js', 'r', 'utf-8') as f:
    content = f.read()

def replacer(match):
    full_str = match.group(0)
    name = match.group(1)
    
    # We always apply our generated colors to ensure every club has an identity
    p, s = get_club_colors(name)
    
    new_str = re.sub(r"primary:\s*'[^']+'", f"primary: '{p}'", full_str)
    new_str = re.sub(r"secondary:\s*'[^']+'", f"secondary: '{s}'", new_str)
    return new_str

# Replace inside ALL_CLUBS only
def clubs_replacer(match):
    clubs_content = match.group(1)
    new_clubs_content = re.sub(r"\{\s*id:\s*'[^']+',[^}]*name:\s*'([^']+)'[^}]*\}", replacer, clubs_content)
    return "export const ALL_CLUBS = [" + new_clubs_content + "];"

new_content = re.sub(r"export const ALL_CLUBS = \[([\s\S]*?)\];", clubs_replacer, content)

with codecs.open('src/utils/gameData.js', 'w', 'utf-8') as f:
    f.write(new_content)

print("Colors updated successfully for all clubs.")
