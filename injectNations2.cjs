const fs = require('fs');
const path = require('path');

const newCountries = [
  { id: 'SN', name: 'Sénégal' },
  { id: 'EG', name: 'Égypte' },
  { id: 'DZ', name: 'Algérie' },
  { id: 'CI', name: "Côte d'Ivoire" },
  { id: 'CD', name: 'RD Congo' },
  { id: 'ZA', name: 'Afrique du Sud' },
  { id: 'TN', name: 'Tunisie' },
  { id: 'CV', name: 'Cap-Vert' },
  { id: 'GH', name: 'Ghana' },
  { id: 'IR', name: 'Iran' },
  { id: 'AU', name: 'Australie' },
  { id: 'KR', name: 'Corée du Sud' },
  { id: 'SA', name: 'Arabie saoudite' },
  { id: 'QA', name: 'Qatar' },
  { id: 'UZ', name: 'Ouzbékistan' },
  { id: 'IQ', name: 'Irak' },
  { id: 'AE', name: 'Émirats arabes unis' },
  { id: 'JO', name: 'Jordanie' },
  { id: 'PS', name: 'Palestine' }
];

const newMaleNames = {
  SN: ['Sadio', 'Kalidou', 'Idrissa', 'Ismaïla', 'Édouard', 'Cheikhou', 'Moussa', 'Papa', 'Aliou', 'Lamine'],
  EG: ['Mohamed', 'Ahmed', 'Mahmoud', 'Tarek', 'Hassan', 'Mustafa', 'Amr', 'Omar', 'Karim', 'Hussein'],
  DZ: ['Riyad', 'Ismaël', 'Yassine', 'Sofiane', 'Ramy', 'Islam', 'Aïssa', 'Youcef', 'Baghdad', 'Saïd'],
  CI: ['Didier', 'Yaya', 'Kolo', 'Wilfried', 'Serge', 'Gervinho', 'Franck', 'Sébastien', 'Eric', 'Nicolas'],
  CD: ['Chancel', 'Yannick', 'Cédric', 'Dieumerci', 'Arthur', 'Gédéon', 'Silas', 'Meschack', 'Théo', 'Jackson'],
  ZA: ['Percy', 'Themba', 'Ronwen', 'Benni', 'Siphiwe', 'Itumeleng', 'Thulani', 'Lucas', 'Teboho', 'Dean'],
  TN: ['Youssef', 'Wahbi', 'Ellyes', 'Naïm', 'Ali', 'Aïssa', 'Montassar', 'Hannibal', 'Dylan', 'Ferjani'],
  CV: ['Ryan', 'Garry', 'Jamiro', 'Jovane', 'Hélton', 'Bebé', 'Vozinha', 'Stopira', 'Kenny', 'Nuno'],
  GH: ['André', 'Jordan', 'Thomas', 'Asamoah', 'Michael', 'Mohammed', 'Kamaldeen', 'Tariq', 'Alexander', 'Daniel'],
  IR: ['Mehdi', 'Sardar', 'Alireza', 'Saeid', 'Milad', 'Ehsan', 'Vahid', 'Ramin', 'Shojae', 'Saman'],
  AU: ['Mathew', 'Aaron', 'Jackson', 'Craig', 'Harry', 'Mitch', 'Ajdin', 'Jamie', 'Riley', 'Martin'],
  KR: ['Heung-min', 'Min-jae', 'Kang-in', 'Hee-chan', 'Gue-sung', 'In-beom', 'Jae-sung', 'Seung-gyu', 'Young-gwon', 'Jin-su'],
  SA: ['Salem', 'Salman', 'Saud', 'Ali', 'Yasser', 'Saleh', 'Nawaf', 'Mohamed', 'Hassan', 'Sultan'],
  QA: ['Akram', 'Almoez', 'Hassan', 'Boualem', 'Bassam', 'Tarek', 'Assim', 'Ro-Ro', 'Abdulaziz', 'Saad'],
  UZ: ['Eldor', 'Jaloliddin', 'Otabek', 'Igor', 'Odil', 'Server', 'Abbosbek', 'Khojimat', 'Rustam', 'Utkir'],
  IQ: ['Aymen', 'Ali', 'Mohanad', 'Amjad', 'Ibrahim', 'Bashar', 'Jalal', 'Safaa', 'Hussein', 'Alaa'],
  AE: ['Ali', 'Omar', 'Ismail', 'Walid', 'Ahmed', 'Khaled', 'Majed', 'Suhail', 'Fábio', 'Caio'],
  JO: ['Musa', 'Yazan', 'Mahmoud', 'Ehsan', 'Abdallah', 'Noor', 'Baha', 'Anas', 'Saleh', 'Yazeed'],
  PS: ['Oday', 'Tamer', 'Mahmoud', 'Musab', 'Rami', 'Yaser', 'Abdullah', 'Mohammed', 'Ameed', 'Zaid']
};

const newFemaleNames = {
  SN: ['Awa', 'Fatou', 'Aminata', 'Mariama', 'Ndèye', 'Oumou', 'Aïssatou', 'Khadija', 'Khady', 'Seynabou'],
  EG: ['Fatma', 'Aya', 'Mariam', 'Nour', 'Salma', 'Habiba', 'Heba', 'Farida', 'Nada', 'Mona'],
  DZ: ['Lina', 'Inès', 'Amira', 'Kenza', 'Célia', 'Yasmine', 'Sarah', 'Meriem', 'Farah', 'Manel'],
  CI: ['Aya', 'Marie', 'Fatou', 'Aminata', 'Aïcha', 'Grâce', 'Esther', 'Sarah', 'Kady', 'Affoué'],
  CD: ['Marie', 'Sarah', 'Esther', 'Grâce', 'Merveille', 'Ruth', 'Naomie', 'Bénédicte', 'Plamedie', 'Ketsia'],
  ZA: ['Thando', 'Nandi', 'Zanele', 'Lindiwe', 'Lerato', 'Nomsa', 'Buhle', 'Sipho', 'Amahle', 'Mbali'],
  TN: ['Yasmine', 'Sirine', 'Nour', 'Mariem', 'Asma', 'Hiba', 'Chaima', 'Aya', 'Farah', 'Oumaima'],
  CV: ['Maria', 'Ana', 'Sónia', 'Sara', 'Lúcia', 'Márcia', 'Carla', 'Jandira', 'Helena', 'Sandra'],
  GH: ['Ama', 'Akosua', 'Adwoa', 'Abena', 'Yaa', 'Afia', 'Akua', 'Grace', 'Mary', 'Esther'],
  IR: ['Fatemeh', 'Zahra', 'Maryam', 'Sara', 'Nazanin', 'Niloofar', 'Shirin', 'Bahar', 'Roya', 'Mahsa'],
  AU: ['Sam', 'Ellie', 'Chloe', 'Caitlin', 'Steph', 'Mary', 'Hayley', 'Alanna', 'Mackenzie', 'Kyah'],
  KR: ['Ji-soyun', 'Min-ji', 'So-yun', 'Yu-ri', 'Eun-ji', 'Hye-ri', 'Su-jin', 'Ha-eun', 'Ji-won', 'Ye-jin'],
  SA: ['Noura', 'Sara', 'Fatima', 'Aisha', 'Reem', 'Layan', 'Joud', 'Hessa', 'Maha', 'Leen'],
  QA: ['Aisha', 'Fatima', 'Maryam', 'Noor', 'Dana', 'Hissa', 'Sara', 'Moza', 'Reem', 'Almaha'],
  UZ: ['Ziyoda', 'Dilnoza', 'Nargiza', 'Shahzoda', 'Sevara', 'Kamola', 'Nilufar', 'Malika', 'Aziza', 'Gulnoza'],
  IQ: ['Zahraa', 'Fatima', 'Noor', 'Zainab', 'Maryam', 'Huda', 'Shahad', 'Aya', 'Tabarak', 'Ruqayya'],
  AE: ['Fatima', 'Maryam', 'Aisha', 'Maitha', 'Shaikha', 'Reem', 'Hind', 'Latifa', 'Moza', 'Salama'],
  JO: ['Lana', 'Sara', 'Aya', 'Hala', 'Noor', 'Farah', 'Jana', 'Tala', 'Ruba', 'Salma'],
  PS: ['Laila', 'Hala', 'Maha', 'Reem', 'Aya', 'Yasmine', 'Ruba', 'Nour', 'Suha', 'Dima']
};

const newLastNames = {
  SN: ['Mané', 'Koulibaly', 'Gueye', 'Sarr', 'Diallo', 'Mendy', 'Diop', 'Fall', 'Ndiaye', 'Seck'],
  EG: ['Salah', 'Elneny', 'Trezeguet', 'Hegazi', 'Sobhi', 'Fathi', 'El-Shenawy', 'Mostafa', 'Gaber', 'Zidan'],
  DZ: ['Mahrez', 'Bennacer', 'Bensebaini', 'Mandi', 'Feghouli', 'Slimani', 'Belaïli', 'Ounas', 'Bounedjah', 'Atal'],
  CI: ['Drogba', 'Touré', 'Kalou', 'Bailly', 'Zaha', 'Aurier', 'Kessié', 'Pépé', 'Gervinho', 'Kouassi'],
  CD: ['Mbemba', 'Wissa', 'Bakambu', 'Kakuta', 'Bolasie', 'Masuaku', 'Muleka', 'Tshibola', 'Kiwuya', 'Luyindama'],
  ZA: ['Tau', 'McCarthy', 'Khumalo', 'Modise', 'Dlamini', 'Ndlovu', 'Nkosi', 'Zwane', 'Mokoena', 'Mabunda'],
  TN: ['Msakni', 'Khazri', 'Skhiri', 'Sliti', 'Maâloul', 'Meriah', 'Sassi', 'Talbi', 'Ben Mustapha', 'Ghandri'],
  CV: ['Mendes', 'Tavares', 'Fortes', 'Soares', 'Lopes', 'Rocha', 'Semedo', 'Cabral', 'Rodrigues', 'Fernandes'],
  GH: ['Ayew', 'Partey', 'Gyan', 'Kudus', 'Mensah', 'Appiah', 'Boateng', 'Muntari', 'Sulemana', 'Amartey'],
  IR: ['Taremi', 'Azmoun', 'Jahanbakhsh', 'Beiranvand', 'Ezatolahi', 'Hajsafi', 'Pouraliganji', 'Hosseini', 'Rezaeian', 'Gholizadeh'],
  AU: ['Ryan', 'Mooy', 'Irvine', 'Cahill', 'Viduka', 'Kewell', 'Souttar', 'Goodwin', 'Leckie', 'Maclaren'],
  KR: ['Son', 'Kim', 'Lee', 'Park', 'Hwang', 'Cho', 'Jung', 'Kwon', 'Jeong', 'Hong'],
  SA: ['Al-Dawsari', 'Al-Faraj', 'Al-Muwallad', 'Al-Owais', 'Al-Shehri', 'Al-Bulaihi', 'Al-Shahrani', 'Al-Malki', 'Al-Buraikan', 'Kanno'],
  QA: ['Afif', 'Al-Haydos', 'Ali', 'Khoukhi', 'Hassan', 'Rawi', 'Madibo', 'Barsham', 'Hatem', 'Assadalla'],
  UZ: ['Shomurodov', 'Masharipov', 'Sergeev', 'Ismailov', 'Ahmedov', 'Yakhshiboev', 'Rashidov', 'Nesterov', 'Gafurov', 'Tursunov'],
  IQ: ['Hussein', 'Adnan', 'Kadhim', 'Tariq', 'Ismail', 'Hadi', 'Fayad', 'Abdul-Zahra', 'Yasin', 'Abubakar'],
  AE: ['Mabkhout', 'Abdulrahman', 'Khalil', 'Matar', 'Eisa', 'Salem', 'Hassan', 'Khamis', 'Fawzi', 'Ali'],
  JO: ['Al-Taamari', 'Al-Naimat', 'Abu Zrayq', 'Abdel-Rahman', 'Bani Yaseen', 'Al-Rawashdeh', 'Al-Bakhit', 'Abu Amarah', 'Faisal', 'Al-Dardour'],
  PS: ['Dabbagh', 'Maraaba', 'Seyam', 'Abuhammad', 'Batran', 'Al-Badawi', 'Darwish', 'Mayor', 'Zidane', 'Abu Warda']
};

const newClubs = [
  { id: 'SN_DIARAF', ovr: 68, name: 'ASC Diaraf', origin: 'SN', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Club historique de Dakar', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Solidité et ferveur' },
  { id: 'SN_GENERATION', ovr: 67, name: 'Génération Foot', origin: 'SN', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: "Ligue 1 • L\\'académie formatrice", preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'La jeunesse et la vitesse avant tout' },
  { id: 'EG_ALAHLY', ovr: 76, name: 'Al Ahly SC', origin: 'EG', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League • Le géant africain', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: "L\\'exigence du plus grand club d\\'Afrique" },
  { id: 'EG_ZAMALEK', ovr: 75, name: 'Zamalek SC', origin: 'EG', primary: '#FFFFFF', secondary: '#FF0000', tier: 1, leagueName: 'Premier League', desc: 'Premier League • Les Chevaliers Blancs', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Beau jeu et passion ardente' },
  { id: 'DZ_CRB', ovr: 73, name: 'CR Belouizdad', origin: 'DZ', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Le Chabab', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Rigueur et domination nationale' },
  { id: 'DZ_MCA', ovr: 72, name: 'MC Alger', origin: 'DZ', primary: '#008000', secondary: '#FF0000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Le Doyen', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'La ferveur du peuple mouloudéen' },
  { id: 'CI_ASEC', ovr: 70, name: 'ASEC Mimosas', origin: 'CI', primary: '#FFFF00', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Académie MimoSifcom', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: "Formation d\\'excellence" },
  { id: 'CI_SANPEDRO', ovr: 68, name: 'FC San Pédro', origin: 'CI', primary: '#FFA500', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Les Pétruciens', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Vitesse et ambition' },
  { id: 'CD_MAZEMBE', ovr: 74, name: 'TP Mazembe', origin: 'CD', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot • Les Corbeaux de Lubumbashi', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: "L\\'ambition de régner sur l\\'Afrique" },
  { id: 'CD_VITA', ovr: 72, name: 'AS Vita Club', origin: 'CD', primary: '#008000', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot • Les Dauphins Noirs', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Un impact physique dominant' },
  { id: 'ZA_SUNDOWNS', ovr: 76, name: 'Mamelodi Sundowns', origin: 'ZA', primary: '#FFFF00', secondary: '#0000FF', tier: 1, leagueName: 'Premiership', desc: 'Premiership • Les Brésiliens', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Un jeu de passes fluide' },
  { id: 'ZA_KAIZER', ovr: 73, name: 'Kaizer Chiefs', origin: 'ZA', primary: '#FFA500', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership • Amakhosi', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Le club le plus populaire du pays' },
  { id: 'TN_ESPERANCE', ovr: 75, name: 'Espérance de Tunis', origin: 'TN', primary: '#FF0000', secondary: '#FFFF00', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • Sang et Or', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Gagner à tout prix' },
  { id: 'TN_ETOILE', ovr: 73, name: 'Étoile du Sahel', origin: 'TN', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1 • La fierté de Sousse', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: "L\\'efficacité avant tout" },
  { id: 'CV_MINDELENSE', ovr: 65, name: 'CS Mindelense', origin: 'CV', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional • Le club de São Vicente', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Jeu léché et technique' },
  { id: 'CV_SPORTING', ovr: 64, name: 'Sporting da Praia', origin: 'CV', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional • Les Lions de la capitale', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Rigueur et combativité' },
  { id: 'GH_KOTOKO', ovr: 71, name: 'Asante Kotoko', origin: 'GH', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League • Les Porcs-épics', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: "L\\'attaque rapide" },
  { id: 'GH_HEARTS', ovr: 70, name: 'Hearts of Oak', origin: 'GH', primary: '#FF0000', secondary: '#FFFF00', tier: 1, leagueName: 'Premier League', desc: 'Premier League • Les Phobians', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ambiance volcanique' },
  { id: 'IR_PERSEPOLIS', ovr: 75, name: 'Persepolis', origin: 'IR', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: "Pro League • L\\'Armée Rouge", preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Discipline de fer' },
  { id: 'IR_ESTEGHLAL', ovr: 74, name: 'Esteghlal', origin: 'IR', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Les Bleus de Téhéran', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Un jeu créatif' },
  { id: 'AU_SYDNEY', ovr: 73, name: 'Sydney FC', origin: 'AU', primary: '#87CEEB', secondary: '#000080', tier: 1, leagueName: 'A-League', desc: 'A-League • Les Sky Blues', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Efficacité et succès' },
  { id: 'AU_MELBOURNE', ovr: 74, name: 'Melbourne City', origin: 'AU', primary: '#87CEEB', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League • Le projet City Football', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Jeu rapide et moderne' },
  { id: 'KR_ULSAN', ovr: 75, name: 'Ulsan Hyundai', origin: 'KR', primary: '#0000FF', secondary: '#FFFF00', tier: 1, leagueName: 'K League 1', desc: 'K League 1 • Les Tigres', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Endurance et puissance' },
  { id: 'KR_JEONBUK', ovr: 74, name: 'Jeonbuk Hyundai Motors', origin: 'KR', primary: '#008000', secondary: '#FFFF00', tier: 1, leagueName: 'K League 1', desc: 'K League 1 • Les Verts', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Jeu collectif parfait' },
  { id: 'SA_ALHILAL', ovr: 80, name: 'Al Hilal', origin: 'SA', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: "Pro League • Le Boss de l\\'Asie", preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Stars et spectacle' },
  { id: 'SA_ALNASSR', ovr: 79, name: 'Al Nassr', origin: 'SA', primary: '#FFFF00', secondary: '#0000FF', tier: 1, leagueName: 'Pro League', desc: "Pro League • L\\'Équipe Globale", preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: "Marquer l\\'histoire" },
  { id: 'QA_ALSADD', ovr: 77, name: 'Al Sadd', origin: 'QA', primary: '#FFFFFF', secondary: '#000000', tier: 1, leagueName: 'Stars League', desc: 'Stars League • Les Loups', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Le jeu à la barcelonaise' },
  { id: 'QA_ALDUHAIL', ovr: 76, name: 'Al Duhail', origin: 'QA', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League • Les Chevaliers Rouges', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Vitesse et percussions' },
  { id: 'UZ_PAKHTAKOR', ovr: 71, name: 'Pakhtakor', origin: 'UZ', primary: '#FFFF00', secondary: '#0000FF', tier: 1, leagueName: 'Super League', desc: 'Super League • Les Lions de Tachkent', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Solidité et tradition' },
  { id: 'UZ_NAVBAHOR', ovr: 69, name: 'Navbahor', origin: 'UZ', primary: '#FF0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League • Les Faucons', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ferveur et combat' },
  { id: 'IQ_QUWA', ovr: 70, name: 'Al-Quwa Al-Jawiya', origin: 'IQ', primary: '#0000FF', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League • Les Faucons', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Vitesse de pointe' },
  { id: 'IQ_SHORTA', ovr: 71, name: 'Al-Shorta', origin: 'IQ', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League • La Harpe', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: "L\\'efficacité chirurgicale" },
  { id: 'AE_ALAIN', ovr: 74, name: 'Al Ain FC', origin: 'AE', primary: '#800080', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Le Zaeem', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Domination au Moyen-Orient' },
  { id: 'AE_SHABAB', ovr: 72, name: 'Shabab Al Ahli', origin: 'AE', primary: '#FF0000', secondary: '#008000', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Les Chevaliers de Dubaï', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Technique et audace' },
  { id: 'JO_WEHDAT', ovr: 68, name: 'Al-Wehdat', origin: 'JO', primary: '#008000', secondary: '#FF0000', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Les Géants', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Soutien inconditionnel' },
  { id: 'JO_FAISALY', ovr: 68, name: 'Al-Faisaly', origin: 'JO', primary: '#87CEEB', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League • Les Aigles Bleus', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Organisation défensive' },
  { id: 'PS_SHABAB', ovr: 65, name: 'Shabab Al-Khalil', origin: 'PS', primary: '#FFFFFF', secondary: '#000000', tier: 1, leagueName: 'West Bank Premier League', desc: 'Premier League • Le Doyen', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Fierté et histoire' },
  { id: 'PS_JABAL', ovr: 66, name: 'Jabal Al-Mukaber', origin: 'PS', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'West Bank Premier League', desc: 'Premier League • Les Aigles de la Montagne', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Rugueux et tenaces' }
];

const dataPath = path.join(__dirname, 'src', 'utils', 'gameData.js');
let data = fs.readFileSync(dataPath, 'utf8');

// 1. Insert Countries and sort them
const countriesRegex = /export const COUNTRIES = \\[[\\s\\S]*?\\];/;
const matchC = data.match(countriesRegex);
if (matchC) {
    let currentBlock = matchC[1];
    let objects = currentBlock.match(/\\{[^}]+\\}/g);
    let parsed = objects.map(o => {
        let id = o.match(/id:\s*"([^"]+)"/)[1];
        let name = o.match(/name:\s*"([^"]+)"/)[1];
        return { id, name };
    });
    newCountries.forEach(nc => {
        if (!parsed.find(p => p.id === nc.id)) {
            parsed.push(nc);
        }
    });
    parsed.sort((a, b) => a.name.localeCompare(b.name));
    
    // USING SIMPLE STRING CONCATENATION HERE
    let newArrayContent = parsed.map(c => '  { id: "' + c.id + '", name: "' + c.name + '" }').join(',\\n');
    let newString = 'export const COUNTRIES = [\\n' + newArrayContent + '\\n];';
    data = data.replace(countriesRegex, newString);
}

// 2. Insert Male names
const maleRegex = /export const FIRST_NAMES_MALE = \\{[\\s\\S]*?\\};/;
const matchM = data.match(maleRegex);
if (matchM) {
    let newEntries = Object.entries(newMaleNames).map(([k, v]) => '  ' + k + ': ' + JSON.stringify(v).replace(/"/g, "'")).join(',\\n');
    let newString = matchM[0].replace(/\\};/, ',\\n' + newEntries + '\\n};');
    data = data.replace(maleRegex, newString);
}

// 3. Insert Female names
const femaleRegex = /export const FIRST_NAMES_FEMALE = \\{[\\s\\S]*?\\};/;
const matchF = data.match(femaleRegex);
if (matchF) {
    let newEntries = Object.entries(newFemaleNames).map(([k, v]) => '  ' + k + ': ' + JSON.stringify(v).replace(/"/g, "'")).join(',\\n');
    let newString = matchF[0].replace(/\\};/, ',\\n' + newEntries + '\\n};');
    data = data.replace(femaleRegex, newString);
}

// 4. Insert Last names
const lastRegex = /export const LAST_NAMES = \\{[\\s\\S]*?\\};/;
const matchL = data.match(lastRegex);
if (matchL) {
    let newEntries = Object.entries(newLastNames).map(([k, v]) => '  ' + k + ': ' + JSON.stringify(v).replace(/"/g, "'")).join(',\\n');
    let newString = matchL[0].replace(/\\};/, ',\\n' + newEntries + '\\n};');
    data = data.replace(lastRegex, newString);
}

// 5. Insert Clubs
const clubsSearchStr = "];\\n\\nexport const LIFESTYLE_ITEMS";
if (data.includes(clubsSearchStr)) {
    let insertionString = newClubs.map(c => {
      let desc = c.desc;
      let pitch = c.pitch;
      return '  { id: \\'' + c.id + '\\', ovr: ' + c.ovr + ', name: \\'' + c.name + '\\', origin: \\'' + c.origin + '\\', primary: \\'' + c.primary + '\\', secondary: \\'' + c.secondary + '\\', tier: ' + c.tier + ', leagueName: \\'' + c.leagueName + '\\', desc: \\'' + desc + '\\', preferredStat: \\'' + c.preferredStat + '\\', lifestyleFit: \\'' + c.lifestyleFit + '\\', pitch: \\'' + pitch + '\\' }';
    }).join(',\\n');
    data = data.replace(clubsSearchStr, ",\\n" + insertionString + "\\n" + clubsSearchStr);
}

fs.writeFileSync(dataPath, data, 'utf8');
console.log('Nations 2 added successfully!');
