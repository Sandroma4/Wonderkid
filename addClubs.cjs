const fs = require('fs');
const path = require('path');

const newClubs = [
  // Argentine
  { id: 'AR_BOCA', ovr: 79, name: 'Boca Juniors', origin: 'AR', primary: '#0055A5', secondary: '#FABD00', tier: 1, leagueName: 'Primera División', desc: 'Primera División • La Bombonera & Passion', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Exige de la grinta et du sang froid' },
  { id: 'AR_RIVER', ovr: 80, name: 'River Plate', origin: 'AR', primary: '#FFFFFF', secondary: '#FF0000', tier: 1, leagueName: 'Primera División', desc: 'Primera División • El Monumental & Beau jeu', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Recherche une excellente vision de jeu' },
  { id: 'AR_FERRO', ovr: 68, name: 'Ferro Carril Oeste', origin: 'AR', primary: '#008000', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional • Club historique de Caballito', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Cherche un roc défensif pour remonter' },
  { id: 'AR_QUILMES', ovr: 69, name: 'Quilmes AC', origin: 'AR', primary: '#FFFFFF', secondary: '#000080', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional • Doyen du football argentin', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: "A besoin d'un buteur pour enflammer le stade" },

  // Colombie
  { id: 'CO_NACIONAL', ovr: 74, name: 'Atlético Nacional', origin: 'CO', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A • Les Verdolagas & Ambition', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Le géant colombien veut briller en Libertadores' },
  { id: 'CO_MILLONARIOS', ovr: 73, name: 'Millonarios FC', origin: 'CO', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A • El Ballet Azul de Bogota', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Recherche des joueurs techniques et élégants' },
  { id: 'CO_QUINDIO', ovr: 64, name: 'Deportes Quindío', origin: 'CO', primary: '#008000', secondary: '#FFFF00', tier: 2, leagueName: 'Primera B', desc: 'Primera B • Lutte pour le retour dans l\'élite', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Veut de la puissance physique au milieu' },
  { id: 'CO_CARTAGENA', ovr: 63, name: 'Real Cartagena', origin: 'CO', primary: '#FFFF00', secondary: '#008000', tier: 2, leagueName: 'Primera B', desc: 'Primera B • Football côtier & Vitesse', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Mise sur la vitesse sur les ailes' },

  // Portugal
  { id: 'PT_BENFICA', ovr: 81, name: 'SL Benfica', origin: 'PT', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga • Les Aigles & Académie', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Cherche à développer le prochain talent mondial' },
  { id: 'PT_PORTO', ovr: 82, name: 'FC Porto', origin: 'PT', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga • Les Dragons & Combativité', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Veut des guerriers sur le terrain' },
  { id: 'PT_MARITIMO', ovr: 68, name: 'CS Marítimo', origin: 'PT', primary: '#FF0000', secondary: '#008000', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2 • Le club de Madère', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Recherche la solidité pour la montée' },
  { id: 'PT_PACOS', ovr: 69, name: 'Paços de Ferreira', origin: 'PT', primary: '#FFFF00', secondary: '#008000', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2 • Les Castors', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: "A besoin d'explosivité en attaque" },

  // Brésil
  { id: 'BR_FLAMENGO', ovr: 80, name: 'Flamengo', origin: 'BR', primary: '#FF0000', secondary: '#000000', tier: 1, leagueName: 'Brasileirão', desc: 'Brasileirão • Maracanã & Ferveur absolue', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Le plus grand public du Brésil vous attend' },
  { id: 'BR_PALMEIRAS', ovr: 81, name: 'Palmeiras', origin: 'BR', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Brasileirão', desc: 'Brasileirão • Rigueur tactique & Succès', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Exige une discipline de fer' },
  { id: 'BR_SANTOS', ovr: 72, name: 'Santos FC', origin: 'BR', primary: '#FFFFFF', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B • L\'Académie de Pelé & Neymar', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Recherche le nouveau prodige brésilien' },
  { id: 'BR_SPORT', ovr: 70, name: 'Sport Recife', origin: 'BR', primary: '#FF0000', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B • Le Lion de l\'île', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Veut un leader de caractère' },

  // Pays-Bas
  { id: 'NL_AJAX', ovr: 78, name: 'Ajax Amsterdam', origin: 'NL', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie • Football total & Formation', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'La tactique et la technique avant tout' },
  { id: 'NL_PSV', ovr: 79, name: 'PSV Eindhoven', origin: 'NL', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie • Attaque & Innovation', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Mise sur des ailiers rapides et techniques' },
  { id: 'NL_GRONINGEN', ovr: 68, name: 'FC Groningen', origin: 'NL', primary: '#008000', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie • La fierté du Nord', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: "Besoin d'un patron derrière" },
  { id: 'NL_WILLEM', ovr: 69, name: 'Willem II', origin: 'NL', primary: '#FF0000', secondary: '#0000FF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie • Les Tricolores', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Cherche un buteur pour remonter' },

  // Norvège
  { id: 'NO_BODO', ovr: 73, name: 'Bodø/Glimt', origin: 'NO', primary: '#FFFF00', secondary: '#000000', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien • Football arctique & Domination', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Jeu de passes rapide et collectif' },
  { id: 'NO_MOLDE', ovr: 72, name: 'Molde FK', origin: 'NO', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien • Régularité & Coupe d\'Europe', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: "A besoin d'efficacité devant le but" },
  { id: 'NO_VALERENGA', ovr: 65, name: 'Vålerenga', origin: 'NO', primary: '#0000FF', secondary: '#FF0000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen • Le grand club d\'Oslo', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Cherche un profil très physique' },
  { id: 'NO_START', ovr: 63, name: 'IK Start', origin: 'NO', primary: '#FFFF00', secondary: '#000000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen • La fierté du Sud', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Veut dynamiter les défenses adverses' },

  // Belgique
  { id: 'BE_BRUGGE', ovr: 77, name: 'Club Brugge', origin: 'BE', primary: '#0000FF', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Puissance et ambition européenne', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Recherche des joueurs athlétiques' },
  { id: 'BE_ANDERLECHT', ovr: 76, name: 'RSC Anderlecht', origin: 'BE', primary: '#800080', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Noblesse & Jeu pur', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Privilégie les techniciens élégants' },
  { id: 'BE_ZULTE', ovr: 67, name: 'Zulte Waregem', origin: 'BE', primary: '#FF0000', secondary: '#008000', tier: 2, leagueName: 'Challenger Pro', desc: 'Challenger Pro • Objectif remontée', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Cherche des ailiers explosifs' },
  { id: 'BE_LOMMEL', ovr: 66, name: 'Lommel SK', origin: 'BE', primary: '#008000', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenger Pro', desc: 'Challenger Pro • Le projet City Group', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: "Veut développer de jeunes talents" },

  // Suisse
  { id: 'CH_YB', ovr: 75, name: 'Young Boys', origin: 'CH', primary: '#FFFF00', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League • Domination & Pelouse synthétique', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Exige des finisseurs fiables' },
  { id: 'CH_BASEL', ovr: 73, name: 'FC Basel', origin: 'CH', primary: '#FF0000', secondary: '#0000FF', tier: 1, leagueName: 'Super League', desc: 'Super League • Histoire et Coupe d\'Europe', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Recherche la maîtrise tactique' },
  { id: 'CH_SION', ovr: 66, name: 'FC Sion', origin: 'CH', primary: '#FF0000', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League • Le club volcanique', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: "Besoin d'un fort caractère" },
  { id: 'CH_AARAU', ovr: 65, name: 'FC Aarau', origin: 'CH', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League • Tradition et stabilité', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Cherche à solidifier sa base' },

  // Mexique
  { id: 'MX_AMERICA', ovr: 76, name: 'Club América', origin: 'MX', primary: '#FFFF00', secondary: '#0000FF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX • Les Aguilas & L\'Azteca', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Recherche la superstar de demain' },
  { id: 'MX_MONTERREY', ovr: 77, name: 'CF Monterrey', origin: 'MX', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX • Les Rayados & Puissance financière', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: "Exige des performances immédiates" },
  { id: 'MX_ATLANTE', ovr: 66, name: 'Atlante', origin: 'MX', primary: '#FF0000', secondary: '#0000FF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX • Le club du peuple', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Mise sur un jeu collectif' },
  { id: 'MX_LEONES', ovr: 65, name: 'Leones Negros', origin: 'MX', primary: '#FF0000', secondary: '#000000', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX • Le club universitaire', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Veut enflammer les foules' },

  // Maroc
  { id: 'MA_RAJA', ovr: 73, name: 'Raja CA', origin: 'MA', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro • Les Aigles Verts & Ambiance', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Séduit par les dribbleurs magiques' },
  { id: 'MA_WYDAD', ovr: 74, name: 'Wydad AC', origin: 'MA', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro • Ouma & Rigueur de champions', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Cherche des guerriers infatigables' },
  { id: 'MA_KACM', ovr: 64, name: 'Kawkab Marrakech', origin: 'MA', primary: '#FF0000', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2 • La fierté de Marrakech', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Veut retrouver sa place au sommet' },
  { id: 'MA_RACING', ovr: 63, name: 'Racing Casablanca', origin: 'MA', primary: '#008000', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2 • Formation et tradition', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Mise sur des ailiers percutants' },

  // Japon
  { id: 'JP_KOBE', ovr: 73, name: 'Vissel Kobe', origin: 'JP', primary: '#800000', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League • Stars internationales', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Recherche une excellente qualité de passe' },
  { id: 'JP_YOKOHAMA', ovr: 72, name: 'Yokohama F. Marinos', origin: 'JP', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League • Le groupe City & Attaque', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: "Jeu très offensif et pressing haut" },
  { id: 'JP_SHIMIZU', ovr: 66, name: 'Shimizu S-Pulse', origin: 'JP', primary: '#FFA500', secondary: '#0000FF', tier: 2, leagueName: 'J2 League', desc: 'J2 League • Club historique', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Veut retrouver la première division' },
  { id: 'JP_SENDAI', ovr: 65, name: 'Vegalta Sendai', origin: 'JP', primary: '#FFFF00', secondary: '#0000FF', tier: 2, leagueName: 'J2 League', desc: 'J2 League • La passion du Nord', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Cherche un bloc défensif solide' },

  // Croatie
  { id: 'HR_DINAMO', ovr: 76, name: 'Dinamo Zagreb', origin: 'HR', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'HNL', desc: 'HNL • Domination & Usine à talents', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Cherche le prochain talent à exporter' },
  { id: 'HR_HAJDUK', ovr: 74, name: 'Hajduk Split', origin: 'HR', primary: '#FFFFFF', secondary: '#0000FF', tier: 1, leagueName: 'HNL', desc: 'HNL • Torcida & Ferveur Dalmate', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Demande une passion totale' },
  { id: 'HR_SIBENIK', ovr: 65, name: 'HNK Šibenik', origin: 'HR', primary: '#FFA500', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL • Objectif montée', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Mise sur des ailiers explosifs' },
  { id: 'HR_VUKOVAR', ovr: 64, name: 'Vukovar 1991', origin: 'HR', primary: '#0000FF', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL • Reconstruction et fierté', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: "Besoin de courage en défense" },

  // Équateur
  { id: 'EC_LDU', ovr: 73, name: 'LDU Quito', origin: 'EC', primary: '#FFFFFF', secondary: '#000080', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro • Roi des Coupes en altitude', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Résistance et tactique en altitude' },
  { id: 'EC_IDV', ovr: 74, name: 'Independiente del Valle', origin: 'EC', primary: '#000000', secondary: '#0000FF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro • Modèle de formation', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Le meilleur centre de formation du continent' },
  { id: 'EC_9OCT', ovr: 64, name: '9 de Octubre', origin: 'EC', primary: '#0000FF', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B • Le club de Guayaquil', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: "Jeu rapide et audacieux" },
  { id: 'EC_MANTA', ovr: 63, name: 'Manta FC', origin: 'EC', primary: '#0000FF', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B • Le club portuaire', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Cherche des joueurs très athlétiques' },

  // Danemark
  { id: 'DK_FCK', ovr: 75, name: 'FC Copenhagen', origin: 'DK', primary: '#FFFFFF', secondary: '#0000FF', tier: 1, leagueName: 'Superliga', desc: 'Superliga • Le géant de Parken', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Recherche la domination technique' },
  { id: 'DK_MIDTJYLLAND', ovr: 74, name: 'FC Midtjylland', origin: 'DK', primary: '#000000', secondary: '#FF0000', tier: 1, leagueName: 'Superliga', desc: 'Superliga • Data & Coups de pied arrêtés', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Un profil athlétique parfait pour notre système' },
  { id: 'DK_AAB', ovr: 67, name: 'AaB', origin: 'DK', primary: '#FF0000', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division • La fierté d\'Aalborg', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Cherche un finisseur pour remonter' },
  { id: 'DK_SONDERJYSKE', ovr: 66, name: 'SønderjyskE', origin: 'DK', primary: '#87CEEB', secondary: '#000000', tier: 2, leagueName: '1. Division', desc: '1. Division • Le courage du Jutland', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Veut une défense de fer' },

  // Turquie
  { id: 'TR_GALATASARAY', ovr: 79, name: 'Galatasaray', origin: 'TR', primary: '#FF0000', secondary: '#FFFF00', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig • L\'Enfer d\'Istanbul', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'La pression est immense, il faut marquer' },
  { id: 'TR_FENERBAHCE', ovr: 78, name: 'Fenerbahçe', origin: 'TR', primary: '#000080', secondary: '#FFFF00', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig • Ambition & Passion', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Exige un engagement total pour le maillot' },
  { id: 'TR_EYUPSPOR', ovr: 70, name: 'Eyüpspor', origin: 'TR', primary: '#800080', secondary: '#FFFF00', tier: 2, leagueName: '1. Lig', desc: '1. Lig • Le nouveau riche d\'Istanbul', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Veut des techniciens pour son projet' },
  { id: 'TR_GOZTEPE', ovr: 69, name: 'Göztepe', origin: 'TR', primary: '#FFFF00', secondary: '#FF0000', tier: 2, leagueName: '1. Lig', desc: '1. Lig • Les rebelles d\'Izmir', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Cherche des ailiers percutants pour la montée' }
];

const filePath = path.join(__dirname, 'src', 'utils', 'gameData.js');
let data = fs.readFileSync(filePath, 'utf8');

const insertionString = newClubs.map(c => `  { id: '${c.id}', ovr: ${c.ovr}, name: '${c.name}', origin: '${c.origin}', primary: '${c.primary}', secondary: '${c.secondary}', tier: ${c.tier}, leagueName: '${c.leagueName}', desc: '${c.desc.replace(/'/g, "\\'")}', preferredStat: '${c.preferredStat}', lifestyleFit: '${c.lifestyleFit}', pitch: '${c.pitch.replace(/'/g, "\\'")}' }`).join(',\n');

// Find the end of ALL_CLUBS array
// It looks like:
//   { id: 'DE_DRESDEN', ... }
// ];
const searchStr = "];\n\nexport const LIFESTYLE_ITEMS";
if (data.includes(searchStr)) {
    data = data.replace(searchStr, ",\n" + insertionString + "\n" + searchStr);
    fs.writeFileSync(filePath, data, 'utf8');
    console.log("Successfully injected new clubs!");
} else {
    console.log("Could not find insertion point!");
}
