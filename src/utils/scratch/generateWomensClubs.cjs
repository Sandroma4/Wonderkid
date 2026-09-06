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
    { name: 'Olympique Lyonnais Féminin', ovr: 88, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'Paris Saint-Germain Féminine', ovr: 85, primary: '#000040', secondary: '#FF0000' },
    { name: 'Paris FC Féminines', ovr: 82, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Montpellier HSC', ovr: 79, primary: '#FFA500', secondary: '#000080' },
    { name: 'FC Fleury 91', ovr: 78, primary: '#FF0000', secondary: '#000000' },
    { name: 'Stade de Reims', ovr: 76, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Olympique de Marseille', ovr: 73, primary: '#FFFFFF', secondary: '#87CEEB' },
    { name: 'RC Lens Féminin', ovr: 72, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'FC Metz', ovr: 71, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'LOSC Lille', ovr: 70, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'US Orléans', ovr: 69, primary: '#FFFF00', secondary: '#FF0000' },
    { name: 'Thonon Évian', ovr: 68, primary: '#FFC0CB', secondary: '#FFFFFF' }
  ],
  EN: [
    { name: 'Chelsea FC Women', ovr: 89, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Arsenal Women', ovr: 87, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Manchester City Women', ovr: 86, primary: '#87CEEB', secondary: '#FFFFFF' },
    { name: 'Manchester United Women', ovr: 84, primary: '#FF0000', secondary: '#000000' },
    { name: 'Aston Villa Women', ovr: 80, primary: '#800000', secondary: '#87CEEB' },
    { name: 'Tottenham Hotspur Women', ovr: 79, primary: '#FFFFFF', secondary: '#000080' },
    { name: 'Sunderland AFC Women', ovr: 74, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Charlton Athletic Women', ovr: 73, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Southampton FC Women', ovr: 72, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Birmingham City Women', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Sheffield United Women', ovr: 70, primary: '#FF0000', secondary: '#000000' },
    { name: 'London City Lionesses', ovr: 69, primary: '#0000FF', secondary: '#000000' }
  ],
  US: [
    { name: 'NJ/NY Gotham FC', ovr: 86, primary: '#000000', secondary: '#87CEEB' },
    { name: 'Portland Thorns FC', ovr: 85, primary: '#FF0000', secondary: '#000000' },
    { name: 'Washington Spirit', ovr: 84, primary: '#000080', secondary: '#FF0000' },
    { name: 'San Diego Wave FC', ovr: 83, primary: '#0000FF', secondary: '#FFC0CB' },
    { name: 'North Carolina Courage', ovr: 82, primary: '#000080', secondary: '#FF0000' },
    { name: 'Orlando Pride', ovr: 81, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Tampa Bay Sun FC', ovr: 74, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Brooklyn FC', ovr: 73, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Carolina Ascent FC', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Dallas Trinity FC', ovr: 71, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Fort Lauderdale United', ovr: 70, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Spokane Zephyr FC', ovr: 69, primary: '#0000FF', secondary: '#FFFF00' }
  ],
  ES: [
    { name: 'FC Barcelona Femení', ovr: 92, primary: '#000080', secondary: '#800000' },
    { name: 'Real Madrid Femenino', ovr: 85, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Levante UD Femenino', ovr: 81, primary: '#0000FF', secondary: '#FF0000' },
    { name: 'Atlético de Madrid Femenino', ovr: 80, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Madrid CFF', ovr: 78, primary: '#FFFFFF', secondary: '#FFC0CB' },
    { name: 'Sevilla FC Femenino', ovr: 77, primary: '#FFFFFF', secondary: '#FF0000' },
    { name: 'Deportivo Abanca', ovr: 74, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'RCD Espanyol Femenino', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'CA Osasuna Femenino', ovr: 72, primary: '#FF0000', secondary: '#000080' },
    { name: 'DUX Logroño', ovr: 71, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Cacereño Femenino', ovr: 70, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Alhama CF', ovr: 69, primary: '#0000FF', secondary: '#FFFFFF' }
  ],
  DE: [
    { name: 'Bayern Munich Women', ovr: 87, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'VfL Wolfsburg Women', ovr: 86, primary: '#00FF00', secondary: '#FFFFFF' },
    { name: 'Eintracht Frankfurt Women', ovr: 82, primary: '#FF0000', secondary: '#000000' },
    { name: 'TSG 1899 Hoffenheim Women', ovr: 80, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'SGS Essen', ovr: 77, primary: '#FF00FF', secondary: '#FFFFFF' },
    { name: 'Bayer 04 Leverkusen Women', ovr: 76, primary: '#FF0000', secondary: '#000000' },
    { name: 'Hamburger SV Frauen', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'SG Andernach', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'FSV Gütersloh', ovr: 71, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'SV Meppen', ovr: 70, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'SC Sand', ovr: 69, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Carl Zeiss Jena', ovr: 68, primary: '#FFFF00', secondary: '#0000FF' }
  ],
  IT: [
    { name: 'AS Roma Women', ovr: 84, primary: '#800000', secondary: '#FFA500' },
    { name: 'Juventus Women', ovr: 83, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Fiorentina Women', ovr: 79, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Inter Milan Women', ovr: 78, primary: '#0000FF', secondary: '#000000' },
    { name: 'AC Milan Women', ovr: 77, primary: '#FF0000', secondary: '#000000' },
    { name: 'Sassuolo Femminile', ovr: 75, primary: '#008000', secondary: '#000000' },
    { name: 'Lazio Women', ovr: 73, primary: '#87CEEB', secondary: '#FFFFFF' },
    { name: 'Ternana Femminile', ovr: 72, primary: '#FF0000', secondary: '#008000' },
    { name: 'Parma Femminile', ovr: 71, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'Cesena Femminile', ovr: 70, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Hellas Verona Women', ovr: 69, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'Genoa Women', ovr: 68, primary: '#FF0000', secondary: '#000080' }
  ],
  BR: [
    { name: 'Corinthians Feminino', ovr: 82, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Ferroviária', ovr: 79, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Palmeiras Feminino', ovr: 78, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Santos Feminino', ovr: 77, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'São Paulo Feminino', ovr: 76, primary: '#FF0000', secondary: '#000000' },
    { name: 'Internacional Feminino', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Bahia Feminino', ovr: 72, primary: '#FF0000', secondary: '#0000FF' },
    { name: '3B da Amazônia', ovr: 71, primary: '#008000', secondary: '#FFFF00' },
    { name: 'Juventude Feminino', ovr: 70, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Mixto EC', ovr: 69, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'JC FC', ovr: 68, primary: '#FF0000', secondary: '#000000' },
    { name: 'Fortaleza Feminino', ovr: 67, primary: '#0000FF', secondary: '#FF0000' }
  ],
  NL: [
    { name: 'FC Twente Vrouwen', ovr: 79, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Ajax Vrouwen', ovr: 78, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'PSV Vrouwen', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Fortuna Sittard', ovr: 75, primary: '#FFFF00', secondary: '#008000' },
    { name: 'ADO Den Haag Vrouwen', ovr: 74, primary: '#FFFF00', secondary: '#008000' },
    { name: 'PEC Zwolle Vrouwen', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'De Graafschap', ovr: 70, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'NAC Breda', ovr: 69, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Sparta Rotterdam', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Vitesse', ovr: 67, primary: '#FFFF00', secondary: '#000000' },
    { name: 'sc Heerenveen', ovr: 66, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Excelsior', ovr: 65, primary: '#000000', secondary: '#FF0000' }
  ],
  JP: [
    { name: 'Urawa Reds Ladies', ovr: 81, primary: '#FF0000', secondary: '#000000' },
    { name: 'INAC Kobe Leonessa', ovr: 79, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'Tokyo Verdy Beleza', ovr: 78, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Albirex Niigata Ladies', ovr: 76, primary: '#FFA500', secondary: '#0000FF' },
    { name: 'Sanfrecce Hiroshima Regina', ovr: 75, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Omiya Ardija Ventus', ovr: 74, primary: '#FFA500', secondary: '#000000' },
    { name: 'Viamaterras Miyazaki', ovr: 72, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Nittaidai SMG', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Iga FC Kunoichi', ovr: 70, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Ehime FC Ladies', ovr: 69, primary: '#FFA500', secondary: '#FFFFFF' },
    { name: 'AS Harima Albion', ovr: 68, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Sfida Setagaya', ovr: 67, primary: '#000000', secondary: '#FFFFFF' }
  ],
  AU: [
    { name: 'Melbourne City FC', ovr: 78, primary: '#87CEEB', secondary: '#FFFFFF' },
    { name: 'Sydney FC', ovr: 77, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Central Coast Mariners', ovr: 75, primary: '#FFFF00', secondary: '#000080' },
    { name: 'Melbourne Victory', ovr: 74, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Western United', ovr: 73, primary: '#008000', secondary: '#000000' },
    { name: 'Canberra United', ovr: 72, primary: '#00FF00', secondary: '#FFFFFF' },
    { name: 'Brisbane Roar', ovr: 71, primary: '#FFA500', secondary: '#000000' },
    { name: 'Adelaide United', ovr: 70, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'Perth Glory', ovr: 69, primary: '#800080', secondary: '#FFA500' },
    { name: 'Wellington Phoenix', ovr: 68, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Newcastle Jets', ovr: 67, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'WS Wanderers', ovr: 66, primary: '#FF0000', secondary: '#000000' }
  ],
  MX: [
    { name: 'Tigres UANL Femenil', ovr: 81, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'CF Monterrey Femenil', ovr: 79, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Club América Femenil', ovr: 78, primary: '#FFFF00', secondary: '#000080' },
    { name: 'Pachuca Femenil', ovr: 77, primary: '#000080', secondary: '#C0C0C0' },
    { name: 'Chivas Femenil', ovr: 76, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Tijuana Femenil', ovr: 74, primary: '#FF0000', secondary: '#000000' },
    { name: 'Cruz Azul Femenil', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Toluca Femenil', ovr: 71, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Atlas Femenil', ovr: 70, primary: '#FF0000', secondary: '#000000' },
    { name: 'León Femenil', ovr: 69, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Puebla Femenil', ovr: 68, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Necaxa Femenil', ovr: 67, primary: '#FF0000', secondary: '#FFFFFF' }
  ],
  PT: [
    { name: 'SL Benfica Women', ovr: 81, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Sporting CP Women', ovr: 79, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'SC Braga Women', ovr: 78, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Racing Power FC', ovr: 76, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'CS Marítimo Women', ovr: 74, primary: '#008000', secondary: '#FF0000' },
    { name: 'Valadares Gaia', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Famalicão', ovr: 71, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Vitória SC', ovr: 70, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Amora FC', ovr: 69, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Gil Vicente', ovr: 68, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'Estoril Praia', ovr: 67, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'RP FC', ovr: 66, primary: '#000000', secondary: '#FFFFFF' }
  ],
  SCO: [
    { name: 'Rangers WFC', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Celtic FC Women', ovr: 77, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Glasgow City FC', ovr: 76, primary: '#FFA500', secondary: '#000000' },
    { name: 'Heart of Midlothian WFC', ovr: 74, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Hibernian Women', ovr: 73, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Partick Thistle WFC', ovr: 71, primary: '#FFD700', secondary: '#FF0000' },
    { name: 'Aberdeen FC Women', ovr: 69, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Motherwell LFC', ovr: 68, primary: '#FFD700', secondary: '#FF0000' },
    { name: 'Montrose FC', ovr: 67, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Dundee United WFC', ovr: 66, primary: '#FF8C00', secondary: '#000000' },
    { name: 'Hamilton Academical WFC', ovr: 65, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Spartans WFC', ovr: 64, primary: '#0000FF', secondary: '#FFFFFF' }
  ],
  NO: [
    { name: 'SK Brann Kvinner', ovr: 79, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Vålerenga', ovr: 78, primary: '#0000FF', secondary: '#FF0000' },
    { name: 'Rosenborg BK Kvinner', ovr: 77, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'LSK Kvinner', ovr: 76, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Stabæk', ovr: 74, primary: '#0000FF', secondary: '#000000' },
    { name: 'Kolbotn IL', ovr: 72, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'TIL 2020', ovr: 70, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'AaFK Fortuna', ovr: 69, primary: '#FFA500', secondary: '#0000FF' },
    { name: 'Bodø/Glimt', ovr: 68, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Hønefoss BK', ovr: 67, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Øvrevoll Hosle', ovr: 66, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'KIL/Hemne', ovr: 65, primary: '#FF0000', secondary: '#000000' }
  ],
  DK: [
    { name: 'HB Køge', ovr: 77, primary: '#0000FF', secondary: '#000000' },
    { name: 'Brøndby IF', ovr: 76, primary: '#FFFF00', secondary: '#0000FF' },
    { name: 'FC Nordsjælland', ovr: 75, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'Fortuna Hjørring', ovr: 74, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Kolding IF', ovr: 72, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'AGF Kvindefodbold', ovr: 71, primary: '#FFFFFF', secondary: '#000080' },
    { name: 'B.93', ovr: 69, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Odense Q', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Varde IF', ovr: 67, primary: '#008000', secondary: '#000000' },
    { name: 'ASA Aarhus', ovr: 66, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Sundby BK', ovr: 65, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Næstved HG', ovr: 64, primary: '#008000', secondary: '#FFFFFF' }
  ],
  SE: [
    { name: 'FC Rosengård', ovr: 80, primary: '#FFFFFF', secondary: '#0000FF' },
    { name: 'BK Häcken FF', ovr: 79, primary: '#FFFF00', secondary: '#000000' },
    { name: 'Hammarby IF', ovr: 78, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Linköping FC', ovr: 77, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Piteå IF', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Vittsjö GIK', ovr: 74, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'Alingsås IF', ovr: 71, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Umeå IK', ovr: 70, primary: '#000000', secondary: '#FFFF00' },
    { name: 'Malmö FF', ovr: 69, primary: '#87CEEB', secondary: '#FFFFFF' },
    { name: 'Bollstanäs SK', ovr: 68, primary: '#FFFF00', secondary: '#008000' },
    { name: 'Jitex BK', ovr: 67, primary: '#800080', secondary: '#FFFFFF' },
    { name: 'Lidköpings FK', ovr: 66, primary: '#FF0000', secondary: '#FFFFFF' }
  ],
  CH: [
    { name: 'Servette FCCF', ovr: 77, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'FC Zürich Frauen', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'FC Basel Frauen', ovr: 74, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'Grasshopper Club Zürich', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'BSC YB Frauen', ovr: 71, primary: '#FFFF00', secondary: '#000000' },
    { name: 'FC St. Gallen-Staad', ovr: 69, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'FC Sion Féminin', ovr: 67, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'FC Schlieren', ovr: 66, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Yverdon Sport', ovr: 65, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'FC Winterthur', ovr: 64, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Biel-Bienne', ovr: 63, primary: '#FF0000', secondary: '#FFFF00' },
    { name: 'Etoile Carouge', ovr: 62, primary: '#0000FF', secondary: '#000000' }
  ],
  CO: [
    { name: 'América de Cali Femenino', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Deportivo Cali Femenino', ovr: 76, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Santa Fe Femenino', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Atlético Nacional Femenino', ovr: 74, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Millonarios Femenino', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Independiente Medellín', ovr: 72, primary: '#FF0000', secondary: '#0000FF' },
    { name: 'Deportivo Pasto', ovr: 70, primary: '#FF0000', secondary: '#000080' },
    { name: 'Atlético Bucaramanga', ovr: 69, primary: '#FFFF00', secondary: '#008000' },
    { name: 'La Equidad', ovr: 68, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Real Santander', ovr: 67, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Llaneros FC', ovr: 66, primary: '#000000', secondary: '#FFFF00' },
    { name: 'Cortuluá', ovr: 65, primary: '#FF0000', secondary: '#000000' }
  ],
  KR: [
    { name: 'Incheon Hyundai Steel', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Hwacheon KSPO', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Suwon FC Women', ovr: 76, primary: '#000080', secondary: '#FF0000' },
    { name: 'Gyeongju KHNP', ovr: 75, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Seoul WFC', ovr: 74, primary: '#000000', secondary: '#FF0000' },
    { name: 'Sejong Sportstoto', ovr: 72, primary: '#0000FF', secondary: '#000000' },
    { name: 'Boeun Sangmu', ovr: 70, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Changnyeong WFC', ovr: 69, primary: '#FFA500', secondary: '#000000' },
    { name: 'Korea University', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Ulsan College', ovr: 67, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Daeduk College', ovr: 66, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Hanyang Women\'s', ovr: 65, primary: '#000080', secondary: '#FFFFFF' }
  ],
  ZA: [
    { name: 'Mamelodi Sundowns Ladies', ovr: 78, primary: '#FFFF00', secondary: '#000080' },
    { name: 'UWC Ladies', ovr: 76, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'TUT Ladies', ovr: 75, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'JVW FC', ovr: 74, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Richmond United', ovr: 72, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'Royal AM Women', ovr: 71, primary: '#FFD700', secondary: '#000000' },
    { name: 'First Touch FC', ovr: 69, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Thunderbirds Ladies', ovr: 68, primary: '#FF0000', secondary: '#000000' },
    { name: 'Ma-Indies Ladies', ovr: 67, primary: '#000080', secondary: '#FFFF00' },
    { name: 'Coal City Wizards', ovr: 66, primary: '#000000', secondary: '#FF0000' },
    { name: 'City Lads', ovr: 65, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Bloemfontein Celtic', ovr: 64, primary: '#008000', secondary: '#FFFFFF' }
  ],
  AR: [
    { name: 'Boca Juniors Femenino', ovr: 77, primary: '#000080', secondary: '#FFFF00' },
    { name: 'UAI Urquiza', ovr: 76, primary: '#800000', secondary: '#FFFFFF' },
    { name: 'River Plate Femenino', ovr: 75, primary: '#FFFFFF', secondary: '#FF0000' },
    { name: 'Rosario Central Femenino', ovr: 74, primary: '#0000FF', secondary: '#FFFF00' },
    { name: 'San Lorenzo Femenino', ovr: 73, primary: '#000080', secondary: '#FF0000' },
    { name: 'Racing Club Femenino', ovr: 72, primary: '#87CEEB', secondary: '#FFFFFF' },
    { name: 'Estudiantes', ovr: 70, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Gimnasia Femenino', ovr: 69, primary: '#000080', secondary: '#FFFFFF' },
    { name: 'Huracán Femenino', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Independiente Femenino', ovr: 67, primary: '#FF0000', secondary: '#000000' },
    { name: 'Platense', ovr: 66, primary: '#A52A2A', secondary: '#FFFFFF' },
    { name: 'Lanús Femenino', ovr: 65, primary: '#800000', secondary: '#FFFFFF' }
  ],
  BE: [
    { name: 'RSC Anderlecht Women', ovr: 78, primary: '#4B0082', secondary: '#FFFFFF' },
    { name: 'Standard Liège Women', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'OH Leuven Women', ovr: 76, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'Club YLA', ovr: 74, primary: '#0000FF', secondary: '#000000' },
    { name: 'KRC Genk Ladies', ovr: 73, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'KAA Gent Ladies', ovr: 72, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'KV Mechelen', ovr: 70, primary: '#FFFF00', secondary: '#FF0000' },
    { name: 'Zulte Waregem', ovr: 69, primary: '#FF0000', secondary: '#008000' },
    { name: 'Charleroi', ovr: 68, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Eendracht Aalst', ovr: 67, primary: '#FFFFFF', secondary: '#000000' },
    { name: 'White Star Woluwe', ovr: 66, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'KVK Tienen', ovr: 65, primary: '#0000FF', secondary: '#FFFFFF' }
  ],
  CV: [
    { name: 'Seven Stars', ovr: 68, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Llana FC', ovr: 67, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'CS Mindelense', ovr: 66, primary: '#FF0000', secondary: '#000000' },
    { name: 'FC Batuque', ovr: 65, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Boavista FC', ovr: 64, primary: '#000000', secondary: '#FFFFFF' }
  ],
  KR: [
    { name: 'Incheon Hyundai Steel', ovr: 78, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Hwacheon KSPO', ovr: 77, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Suwon FC Women', ovr: 76, primary: '#000080', secondary: '#FF0000' },
    { name: 'Gyeongju KHNP', ovr: 75, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Seoul WFC', ovr: 74, primary: '#000000', secondary: '#FF0000' },
    { name: 'Sejong Sportstoto', ovr: 72, primary: '#0000FF', secondary: '#000000' },
    // D2 / Université
    { name: 'Boeun Sangmu', ovr: 70, primary: '#000000', secondary: '#FFFFFF' },
    { name: 'Changnyeong WFC', ovr: 69, primary: '#FFA500', secondary: '#000000' },
    { name: 'Korea University', ovr: 68, primary: '#FF0000', secondary: '#FFFFFF' },
    { name: 'Ulsan College', ovr: 67, primary: '#0000FF', secondary: '#FFFFFF' },
    { name: 'Daeduk College', ovr: 66, primary: '#008000', secondary: '#FFFFFF' },
    { name: 'Hanyang Women\'s', ovr: 65, primary: '#000080', secondary: '#FFFFFF' }
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
