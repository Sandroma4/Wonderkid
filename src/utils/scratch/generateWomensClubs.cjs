const fs = require('fs');
const path = require('path');

const COUNTRIES = [
  { id: "ZA", name: "Afrique du Sud" },
  { id: "DZ", name: "Algérie" },
  { id: "DE", name: "Allemagne" },
  { id: "EN", name: "Angleterre" },
  { id: "SA", name: "Arabie saoudite" },
  { id: "AR", name: "Argentine" },
  { id: "AU", name: "Australie" },
  { id: "BE", name: "Belgique" },
  { id: "BR", name: "Brésil" },
  { id: "CV", name: "Cap-Vert" },
  { id: "CO", name: "Colombie" },
  { id: "KR", name: "Corée du Sud" },
  { id: "CI", name: "Côte d'Ivoire" },
  { id: "HR", name: "Croatie" },
  { id: "DK", name: "Danemark" },
  { id: "SCO", name: "Écosse" },
  { id: "EG", name: "Égypte" },
  { id: "AE", name: "Émirats arabes unis" },
  { id: "EC", name: "Équateur" },
  { id: "ES", name: "Espagne" },
  { id: "US", name: "États-Unis" },
  { id: "FR", name: "France" },
  { id: "GH", name: "Ghana" },
  { id: "GR", name: "Grèce" },
  { id: "IQ", name: "Irak" },
  { id: "IR", name: "Iran" },
  { id: "IT", name: "Italie" },
  { id: "JP", name: "Japon" },
  { id: "JO", name: "Jordanie" },
  { id: "MA", name: "Maroc" },
  { id: "MX", name: "Mexique" },
  { id: "NG", name: "Nigeria" },
  { id: "NO", name: "Norvège" },
  { id: "UZ", name: "Ouzbékistan" },
  { id: "PS", name: "Palestine" },
  { id: "NL", name: "Pays-Bas" },
  { id: "PL", name: "Pologne" },
  { id: "PT", name: "Portugal" },
  { id: "QA", name: "Qatar" },
  { id: "CD", name: "RD Congo" },
  { id: "SN", name: "Sénégal" },
  { id: "CH", name: "Suisse" },
  { id: "TN", name: "Tunisie" },
  { id: "TR", name: "Turquie" },
  { id: "UY", name: "Uruguay" }
];

const REAL_CLUBS = {
  FR: [
    { name: 'Olympique Lyonnais Féminin', ovr: 88, primary: '#FFFFFF', secondary: '#DA291C' },
    { name: 'Paris Saint-Germain', ovr: 85, primary: '#004170', secondary: '#DA291C' },
    { name: 'Paris FC', ovr: 81, primary: '#003366', secondary: '#FFFFFF' },
    { name: 'FC Fleury 91', ovr: 78, primary: '#E30613', secondary: '#000000' },
    { name: 'Montpellier HSC', ovr: 77, primary: '#F36C21', secondary: '#002C5B' },
    { name: 'Stade de Reims', ovr: 76, primary: '#E30613', secondary: '#FFFFFF' },
    { name: 'Girondins de Bordeaux', ovr: 74, primary: '#001b50', secondary: '#ffffff' },
    { name: 'EA Guingamp', ovr: 73, primary: '#E30613', secondary: '#000000' },
    { name: 'Dijon FCO', ovr: 72, primary: '#ED1C24', secondary: '#FFFFFF' },
    { name: 'Le Havre AC', ovr: 71, primary: '#87CEEB', secondary: '#000080' },
  ],
  EN: [
    { name: 'Chelsea FC Women', ovr: 89, primary: '#034694', secondary: '#EE242C' },
    { name: 'Arsenal WFC', ovr: 88, primary: '#EF0107', secondary: '#FFFFFF' },
    { name: 'Manchester City WFC', ovr: 87, primary: '#6CABDD', secondary: '#1C2C5B' },
    { name: 'Manchester United WFC', ovr: 84, primary: '#DA291C', secondary: '#000000' },
    { name: 'Aston Villa WFC', ovr: 80, primary: '#670E36', secondary: '#95BFE5' },
    { name: 'Tottenham Hotspur FC Women', ovr: 79, primary: '#132257', secondary: '#FFFFFF' },
    { name: 'Everton FC Women', ovr: 77, primary: '#003399', secondary: '#FFFFFF' },
    { name: 'Liverpool FC Women', ovr: 78, primary: '#C8102E', secondary: '#F6EB61' },
    { name: 'West Ham United Women', ovr: 76, primary: '#7A263A', secondary: '#1BB1E7' },
    { name: 'Leicester City WFC', ovr: 75, primary: '#003090', secondary: '#FFFFFF' },
  ],
  US: [
    { name: 'NJ/NY Gotham FC', ovr: 86, primary: '#000000', secondary: '#00FFFF' },
    { name: 'Portland Thorns FC', ovr: 85, primary: '#C02032', secondary: '#000000' },
    { name: 'San Diego Wave FC', ovr: 85, primary: '#000000', secondary: '#FF1493' },
    { name: 'Washington Spirit', ovr: 83, primary: '#000000', secondary: '#FF0000' },
    { name: 'Seattle Reign FC', ovr: 82, primary: '#0033A0', secondary: '#FFFFFF' },
    { name: 'North Carolina Courage', ovr: 81, primary: '#002D72', secondary: '#E31837' },
    { name: 'Angel City FC', ovr: 80, primary: '#000000', secondary: '#FFC0CB' },
    { name: 'Orlando Pride', ovr: 79, primary: '#5E2750', secondary: '#0077C8' },
    { name: 'Racing Louisville FC', ovr: 77, primary: '#3B0083', secondary: '#A06DB3' },
    { name: 'Chicago Red Stars', ovr: 76, primary: '#41B6E6', secondary: '#E4002B' },
  ],
  ES: [
    { name: 'FC Barcelona Femení', ovr: 92, primary: '#004D98', secondary: '#DB0030' },
    { name: 'Real Madrid Femenino', ovr: 86, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Levante UD Femenino', ovr: 82, primary: '#0000FF', secondary: '#FF0000' },
    { name: 'Atlético de Madrid Femenino', ovr: 81, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Real Sociedad Femenino', ovr: 80, primary: '#0033A0', secondary: '#FFFFFF' },
    { name: 'Athletic Club Femenino', ovr: 78, primary: '#EE2523', secondary: '#FFFFFF' },
    { name: 'Madrid CFF', ovr: 77, primary: '#FFFFFF', secondary: '#FFC0CB' },
    { name: 'Sevilla FC Femenino', ovr: 76, primary: '#FFFFFF', secondary: '#FF0000' },
    { name: 'UDG Tenerife', ovr: 75, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Valencia CF Femenino', ovr: 74, primary: '#FFFFFF', secondary: '#000000' },
  ],
  DE: [
    { name: 'Bayern Munich Women', ovr: 88, primary: '#DC052D', secondary: '#FFFFFF' },
    { name: 'VfL Wolfsburg Women', ovr: 87, primary: '#65B32E', secondary: '#FFFFFF' },
    { name: 'Eintracht Frankfurt Women', ovr: 83, primary: '#E1000F', secondary: '#000000' },
    { name: 'TSG 1899 Hoffenheim Women', ovr: 80, primary: '#005CA9', secondary: '#FFFFFF' },
    { name: 'SGS Essen', ovr: 78, primary: '#6A2A82', secondary: '#FFFFFF' },
    { name: 'SC Freiburg Women', ovr: 77, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Bayer Leverkusen Women', ovr: 76, primary: '#E32221', secondary: '#000000' },
    { name: 'Werder Bremen Women', ovr: 74, primary: '#1D904E', secondary: '#FFFFFF' },
    { name: 'RB Leipzig Women', ovr: 73, primary: '#FFFFFF', secondary: '#ED1C24' },
    { name: '1. FC Köln Women', ovr: 72, primary: '#E1000F', secondary: '#FFFFFF' },
  ],
  IT: [
    { name: 'AS Roma Women', ovr: 84, primary: '#8E1F2F', secondary: '#F0BC42' },
    { name: 'Juventus Women', ovr: 83, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'AC Milan Women', ovr: 81, primary: '#FB090B', secondary: '#000000' },
    { name: 'Inter Milan Women', ovr: 80, primary: '#0058A8', secondary: '#000000' },
    { name: 'Fiorentina Women', ovr: 78, primary: '#482E92', secondary: '#FFFFFF' },
    { name: 'Sassuolo Women', ovr: 76, primary: '#00523C', secondary: '#000000' },
    { name: 'Como Women', ovr: 74, primary: '#0033A0', secondary: '#FFFFFF' },
    { name: 'Sampdoria Women', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Pomigliano Women', ovr: 71, primary: '#8B0000', secondary: '#FFFFFF' },
    { name: 'Napoli Femminile', ovr: 70, primary: '#00BFFF', secondary: '#FFFFFF' },
  ],
  BR: [
    { name: 'Corinthians Feminino', ovr: 82, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Palmeiras Feminino', ovr: 80, primary: '#006437', secondary: '#FFFFFF' },
    { name: 'Ferroviária', ovr: 79, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Santos Feminino', ovr: 78, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'São Paulo Feminino', ovr: 78, primary: '#FF0000', secondary: '#000000' },
    { name: 'Internacional Feminino', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Flamengo Feminino', ovr: 76, primary: '#C8102E', secondary: '#000000' },
    { name: 'Cruzeiro Feminino', ovr: 75, primary: '#0033A0', secondary: '#FFFFFF' },
    { name: 'Grêmio Feminino', ovr: 74, primary: '#00A3E0', secondary: '#000000' },
    { name: 'Atlético Mineiro Feminino', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
  ],
  NL: [
    { name: 'Ajax Vrouwen', ovr: 81, primary: '#D2122E', secondary: '#FFFFFF' },
    { name: 'FC Twente Vrouwen', ovr: 80, primary: '#D2122E', secondary: '#FFFFFF' },
    { name: 'PSV Vrouwen', ovr: 78, primary: '#D2122E', secondary: '#FFFFFF' },
    { name: 'Fortuna Sittard', ovr: 75, primary: '#FFD700', secondary: '#008000' },
    { name: 'ADO Den Haag', ovr: 74, primary: '#006400', secondary: '#FFFF00' },
    { name: 'PEC Zwolle', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Feyenoord Vrouwen', ovr: 71, primary: '#D2122E', secondary: '#000000' },
    { name: 'Excelsior', ovr: 68, primary: '#000000', secondary: '#D2122E' },
  ],
  JP: [
    { name: 'Urawa Reds Ladies', ovr: 81, primary: '#E30613', secondary: '#000000' },
    { name: 'INAC Kobe Leonessa', ovr: 80, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Tokyo Verdy Beleza', ovr: 79, primary: '#006400', secondary: '#FFFFFF' },
    { name: 'Mynavi Sendai Ladies', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'JEF United Chiba', ovr: 75, primary: '#FFFF00', secondary: '#008000' },
    { name: 'Omiya Ardija Ventus', ovr: 74, primary: '#FFA500', secondary: '#000080' },
    { name: 'Sanfrecce Hiroshima', ovr: 73, primary: '#4B0082', secondary: '#FFFFFF' },
    { name: 'AC Nagano Parceiro', ovr: 72, primary: '#FFA500', secondary: '#000000' },
  ],
  AU: [
    { name: 'Sydney FC Women', ovr: 78, primary: '#66B2FF', secondary: '#000080' },
    { name: 'Melbourne City FC', ovr: 77, primary: '#6CABDD', secondary: '#1C2C5B' },
    { name: 'Melbourne Victory Women', ovr: 76, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Brisbane Roar Women', ovr: 74, primary: '#FF8C00', secondary: '#000000' },
    { name: 'Western United', ovr: 73, primary: '#000000', secondary: '#32CD32' },
    { name: 'Perth Glory Women', ovr: 72, primary: '#800080', secondary: '#FFA500' },
    { name: 'Adelaide United', ovr: 71, primary: '#FF0000', secondary: '#FFD700' },
    { name: 'Newcastle Jets', ovr: 70, primary: '#0000FF', secondary: '#FF0000' },
  ],
  MX: [
    { name: 'Tigres UANL Femenil', ovr: 81, primary: '#FFD700', secondary: '#0000FF' },
    { name: 'Monterrey Femenil', ovr: 80, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Club América Femenil', ovr: 79, primary: '#FFFF00', secondary: '#000080' },
    { name: 'Chivas Femenil', ovr: 78, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Pachuca Femenil', ovr: 77, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Toluca Femenil', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Juárez Femenil', ovr: 74, primary: '#008000', secondary: '#000000' },
    { name: 'Tijuana Femenil', ovr: 73, primary: '#FF0000', secondary: '#000000' },
  ],
  PT: [
    { name: 'SL Benfica Feminino', ovr: 81, primary: '#E30613', secondary: '#FFFFFF' },
    { name: 'Sporting CP Feminino', ovr: 80, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'SC Braga Feminino', ovr: 78, primary: '#E30613', secondary: '#FFFFFF' },
    { name: 'FC Famalicão', ovr: 75, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Valadares Gaia', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Clube de Albergaria', ovr: 70, primary: '#FF0000', secondary: '#FFFFFF' },
  ],
  SCO: [
    { name: 'Rangers WFC', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Celtic FC Women', ovr: 77, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Glasgow City FC', ovr: 76, primary: '#FFA500', secondary: '#000000' },
    { name: 'Heart of Midlothian WFC', ovr: 74, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Hibernian Women', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Partick Thistle WFC', ovr: 71, primary: '#FFD700', secondary: '#FF0000' },
  ],
  NO: [
    { name: 'SK Brann Kvinner', ovr: 79, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Vålerenga', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Rosenborg Kvinner', ovr: 77, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'LSK Kvinner', ovr: 75, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Stabæk', ovr: 73, primary: '#000080', secondary: '#87CEEB' },
    { name: 'Kolbotn', ovr: 71, primary: '#FFFFFF', secondary: '#0000FF' },
  ],
  DK: [
    { name: 'HB Køge', ovr: 78, primary: '#000000', secondary: '#0000FF' },
    { name: 'Fortuna Hjørring', ovr: 77, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Brøndby IF', ovr: 76, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'FC Nordsjælland', ovr: 75, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'KoldingQ', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'AGF Kvindefodbold', ovr: 71, primary: '#FFFFFF', secondary: '#000000' },
  ],
  CH: [
    { name: 'Servette FCCF', ovr: 77, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'FC Zürich Frauen', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'FC Basel Frauen', ovr: 74, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'Grasshopper Club Zürich', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'BSC YB Frauen', ovr: 71, primary: '#FFFF00', secondary: '#000000' },
    { name: 'FC St. Gallen-Staad', ovr: 69, primary: '#008000', secondary: '#FFFFFF' },
  ],
  ZA: [
    { name: 'Mamelodi Sundowns Ladies', ovr: 78, primary: '#FFFF00', secondary: '#000080' },
    { name: 'UWC Ladies', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'TUT Ladies', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'JVW FC', ovr: 74, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Richmond United', ovr: 72, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Royal AM Women', ovr: 71, primary: '#FFD700', secondary: '#000000' }
  ],
  DZ: [
    { name: 'Afak Relizane', ovr: 74, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'CF Akbou', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'FC Constantine', ovr: 71, primary: '#FF0000', secondary: '#000000' },
    { name: 'AS Sûreté Nationale', ovr: 70, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'JF Khroub', ovr: 68, primary: '#FFFFFF', secondary: '#FF0000' }
  ],
  SA: [
    { name: 'Al Nassr Women', ovr: 75, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'Al Hilal Women', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Al Shabab Women', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Al Ittihad Women', ovr: 72, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Al Ahli Women', ovr: 71, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Eastern Flames FC', ovr: 69, primary: '#FF0000', secondary: '#000000' }
  ],
  AR: [
    { name: 'Boca Juniors Femenino', ovr: 77, primary: '#000080', secondary: '#FFFF00' },
    { name: 'UAI Urquiza', ovr: 76, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'River Plate Femenino', ovr: 75, primary: '#FFFFFF', secondary: '#FF0000' },
    { name: 'Rosario Central Femenino', ovr: 74, primary: '#0000FF', secondary: '#FFFF00' },
    { name: 'San Lorenzo Femenino', ovr: 73, primary: '#000080', secondary: '#FF0000' },
    { name: 'Racing Club Femenino', ovr: 72, primary: '#87CEEB', secondary: '#FFFFFF' }
  ],
  BE: [
    { name: 'RSC Anderlecht Women', ovr: 78, primary: '#4B0082', secondary: '#FFFFFF' },
    { name: 'Standard Liège Women', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'OH Leuven Women', ovr: 76, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Club YLA', ovr: 74, primary: '#0000FF', secondary: '#000000' },
    { name: 'KRC Genk Ladies', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'KAA Gent Ladies', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' }
  ],
  CV: [
    { name: 'Seven Stars', ovr: 68, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Llana FC', ovr: 67, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'CS Mindelense', ovr: 66, primary: '#FF0000', secondary: '#000000' },
    { name: 'FC Batuque', ovr: 65, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Boavista FC', ovr: 64, primary: '#000000', secondary: '#FFFFFF' }
  ],
  CO: [
    { name: 'América de Cali Femenino', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Deportivo Cali Femenino', ovr: 76, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Santa Fe Femenino', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Atlético Nacional Femenino', ovr: 74, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Millonarios Femenino', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Independiente Medellín', ovr: 72, primary: '#FF0000', secondary: '#0000FF' }
  ],
  KR: [
    { name: 'Incheon Hyundai Steel', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Hwacheon KSPO', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Suwon FC Women', ovr: 76, primary: '#000080', secondary: '#FF0000' },
    { name: 'Gyeongju KHNP', ovr: 75, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Seoul WFC', ovr: 74, primary: '#000000', secondary: '#FF0000' },
    { name: 'Sejong Sportstoto', ovr: 72, primary: '#0000FF', secondary: '#000000' }
  ],
  CI: [
    { name: 'Juventus de Yopougon', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Inter d\'Abidjan', ovr: 72, primary: '#0000FF', secondary: '#000000' },
    { name: 'Africa Sports', ovr: 71, primary: '#008000', secondary: '#FF0000' },
    { name: 'ASEC Mimosas', ovr: 70, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Stella Club', ovr: 69, primary: '#008000', secondary: '#FFFFFF' }
  ],
  HR: [
    { name: 'ŽNK Osijek', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'ŽNK Split', ovr: 73, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'ŽNK Dinamo Zagreb', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'ŽNK Hajduk Split', ovr: 71, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'ŽNK Agram', ovr: 69, primary: '#000000', secondary: '#FFFFFF' }
  ],
  EG: [
    { name: 'Wadi Degla', ovr: 74, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Tutankhamun FC', ovr: 73, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Al Ahly Women', ovr: 72, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Zamalek Women', ovr: 71, primary: '#FFFFFF', secondary: '#FF0000' },
    { name: 'Pyramids FC Women', ovr: 70, primary: '#000080', secondary: '#87CEEB' }
  ],
  AE: [
    { name: 'Abu Dhabi Country Club', ovr: 70, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Al Ain Women', ovr: 69, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Dubai WFC', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Sharjah Women', ovr: 67, primary: '#FFFFFF', secondary: '#0000FF' }
  ],
  EC: [
    { name: 'Dragonas IDV', ovr: 75, primary: '#000000', secondary: '#0000FF' },
    { name: 'Barcelona SC Femenino', ovr: 74, primary: '#FFFF00', secondary: '#FF0000' },
    { name: 'Club Ñañas', ovr: 73, primary: '#FFC0CB', secondary: '#FFFFFF' },
    { name: 'LDU Quito Femenino', ovr: 72, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Deportivo Cuenca', ovr: 70, primary: '#FF0000', secondary: '#000000' }
  ],
  GH: [
    { name: 'Ampem Darkoa Ladies', ovr: 75, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Hasaacas Ladies', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Police Ladies', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Prisons Ladies', ovr: 72, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'LadyStrikers', ovr: 71, primary: '#FFFF00', secondary: '#000000' }
  ],
  GR: [
    { name: 'PAOK', ovr: 76, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'AEK Athens Women', ovr: 74, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Panathinaikos Women', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'OFI Crete Women', ovr: 72, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Asteras Tripolis', ovr: 71, primary: '#FFFF00', secondary: '#0000FF' }
  ],
  IQ: [
    { name: 'Naft Al-Shamal', ovr: 71, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Al-Quwa Al-Jawiya', ovr: 70, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Ghaz Al-Shamal', ovr: 69, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Al-Shorta Women', ovr: 68, primary: '#008000', secondary: '#FFFFFF' }
  ],
  IR: [
    { name: 'Khatoon Bam', ovr: 75, primary: '#FF0000', secondary: '#000000' },
    { name: 'Sepahan Women', ovr: 74, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Shahrdari Sirjan', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Malavan Women', ovr: 72, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'Zob Ahan Women', ovr: 71, primary: '#008000', secondary: '#FFFFFF' }
  ],
  JO: [
    { name: 'Amman Club', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Orthodox Club', ovr: 72, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Etihad Club', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Al-Nassr', ovr: 69, primary: '#000080', secondary: '#FFFF00' }
  ],
  MA: [
    { name: 'ASFAR Women', ovr: 77, primary: '#000000', secondary: '#FF0000' },
    { name: 'Sporting Casablanca', ovr: 75, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Wydad AC Women', ovr: 74, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Raja CA Women', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'SC Chabab Mohammédia', ovr: 71, primary: '#000000', secondary: '#FF0000' }
  ],
  NG: [
    { name: 'Rivers Angels', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Delta Queens', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Bayelsa Queens', ovr: 74, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Nasarawa Amazons', ovr: 73, primary: '#FFFF00', secondary: '#008000' },
    { name: 'Edo Queens', ovr: 72, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'FC Robo', ovr: 70, primary: '#0000FF', secondary: '#FFFFFF' }
  ],
  UZ: [
    { name: 'Sevinch', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Bunyodkor Women', ovr: 72, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Sogdiana Women', ovr: 71, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'Metallurg Women', ovr: 70, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Pakhtakor Women', ovr: 69, primary: '#FFFF00', secondary: '#000080' }
  ],
  PS: [
    { name: 'Shabab Al-Amari', ovr: 68, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Orthodox Beit Sahour', ovr: 67, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Diyar Bethlehem', ovr: 66, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Sareyyet Ramallah', ovr: 65, primary: '#FFFFFF', secondary: '#FF0000' }
  ],
  PL: [
    { name: 'Górnik Łęczna', ovr: 75, primary: '#008000', secondary: '#000000' },
    { name: 'UKS SMS Łódź', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Czarni Sosnowiec', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Śląsk Wrocław', ovr: 72, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Pogoń Szczecin', ovr: 71, primary: '#000080', secondary: '#800000' },
    { name: 'Medyk Konin', ovr: 70, primary: '#000000', secondary: '#FFFFFF' }
  ],
  QA: [
    { name: 'Qatar SC Women', ovr: 69, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Al Sadd Women', ovr: 68, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Al Rayyan Women', ovr: 67, primary: '#FF0000', secondary: '#000000' }
  ],
  CD: [
    { name: 'FCF Mazembe', ovr: 74, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'CSF Bikira', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'FCF Amani', ovr: 71, primary: '#FF0000', secondary: '#000000' },
    { name: 'FCF Promesse Star', ovr: 70, primary: '#FFFF00', secondary: '#0000FF' }
  ],
  SN: [
    { name: 'Dakar Sacré-Cœur', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Aigles de la Médina', ovr: 72, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Sirènes de Grand Yoff', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Amazones de Grand Yoff', ovr: 70, primary: '#FF0000', secondary: '#000000' }
  ],
  TN: [
    { name: 'ASF Sahel', ovr: 72, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'AS Banque de l\'Habitat', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'US Tunisienne', ovr: 70, primary: '#FFFF00', secondary: '#000000' },
    { name: 'ASF Gafsa', ovr: 69, primary: '#008000', secondary: '#FFFFFF' }
  ],
  TR: [
    { name: 'Galatasaray Women', ovr: 77, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'Fenerbahçe Women', ovr: 76, primary: '#000080', secondary: '#FFFF00' },
    { name: 'Beşiktaş Women', ovr: 75, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'ALG Spor', ovr: 74, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'Fomget Gençlik', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Hakkarigücü', ovr: 71, primary: '#FF0000', secondary: '#FFFFFF' }
  ],
  UY: [
    { name: 'Peñarol Femenino', ovr: 75, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Nacional Femenino', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Defensor Sporting', ovr: 73, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Montevideo Wanderers', ovr: 72, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Liverpool Femenino', ovr: 71, primary: '#000000', secondary: '#0000FF' },
    { name: 'Danubio Femenino', ovr: 70, primary: '#000000', secondary: '#FFFFFF' }
  ]
};

// Villes / mots aléatoires pour générer des clubs crédibles dans les autres pays
const CITY_PREFIXES = {}; // Vide car on a défini tous les pays !

const STATS = ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'];
const LIFESTYLES = ['STRICT', 'PARTY', 'BALANCED'];
const COLORS = [
  { p: '#E30613', s: '#FFFFFF' }, { p: '#0000FF', s: '#FFFFFF' }, { p: '#FFFFFF', s: '#000000' },
  { p: '#008000', s: '#FFFFFF' }, { p: '#FFFF00', s: '#0000FF' }, { p: '#000000', s: '#FFFFFF' },
  { p: '#FFA500', s: '#000000' }, { p: '#800080', s: '#FFFFFF' }, { p: '#800000', s: '#FFFFFF' }
];

let finalClubs = [];
let idCounter = 1;

COUNTRIES.forEach(country => {
  const origin = country.id;
  const leagueName = `Ligue 1 Féminine (${origin})`;
  
  if (REAL_CLUBS[origin]) {
    // Utiliser les clubs réels
    REAL_CLUBS[origin].forEach((club, index) => {
      const tier = index < 3 ? 1 : (index < 7 ? 2 : 3);
      finalClubs.push({
        id: `W_${origin}_${idCounter++}`,
        ovr: club.ovr,
        name: club.name,
        origin: origin,
        primary: club.primary,
        secondary: club.secondary,
        tier: tier,
        leagueName: leagueName,
        desc: leagueName,
        preferredStat: STATS[Math.floor(Math.random() * STATS.length)],
        lifestyleFit: LIFESTYLES[Math.floor(Math.random() * LIFESTYLES.length)],
        pitch: leagueName
      });
    });
  } else {
    // Génération procédurale pour les autres pays
    const prefixes = CITY_PREFIXES[origin] || ['FC', 'AS', 'US', 'Sporting', 'Racing', 'Athletic'];
    const suffix = 'Féminin';
    
    // Générer 8 clubs
    prefixes.slice(0, 8).forEach((prefix, index) => {
      const isTop = index < 2;
      const ovr = isTop ? (65 + Math.floor(Math.random() * 8)) : (55 + Math.floor(Math.random() * 10));
      const tier = isTop ? 1 : (index < 5 ? 2 : 3);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      let clubName = '';
      if (origin === 'US' || origin === 'EN' || origin === 'AU' || origin === 'ZA' || origin === 'GH' || origin === 'NG' || origin === 'SCO') {
        clubName = `${prefix} Women`;
      } else if (origin === 'ES' || origin === 'AR' || origin === 'CO' || origin === 'UY' || origin === 'EC' || origin === 'MX' || origin === 'CV') {
        clubName = `${prefix} Femenino`;
      } else {
        clubName = `${prefix} ${suffix}`;
      }

      finalClubs.push({
        id: `W_${origin}_${idCounter++}`,
        ovr: ovr,
        name: clubName,
        origin: origin,
        primary: color.p,
        secondary: color.s,
        tier: tier,
        leagueName: leagueName,
        desc: leagueName,
        preferredStat: STATS[Math.floor(Math.random() * STATS.length)],
        lifestyleFit: LIFESTYLES[Math.floor(Math.random() * LIFESTYLES.length)],
        pitch: leagueName
      });
    });
  }
});

const fileContent = `// Fichier généré automatiquement pour contenir la base de données des clubs féminins
export const ALL_WOMENS_CLUBS = ${JSON.stringify(finalClubs, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'womensClubsData.js'), fileContent);
console.log(`Généré ${finalClubs.length} clubs féminins pour ${COUNTRIES.length} pays.`);
