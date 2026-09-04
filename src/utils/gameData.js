import { EXTRA_EVENTS } from './extraEvents';
import { EXTRA_EVENTS_2 } from './extraEvents2';
import { EXTRA_EVENTS_3 } from './extraEvents3';
import { EXTRA_EVENTS_4 } from './extraEvents4';
import { EXTRA_EVENTS_5 } from './extraEvents5';
import { EXTRA_EVENTS_6 } from './extraEvents6';
import { EXTRA_EVENTS_7 } from './extraEvents7';
import { EXTRA_EVENTS_8 } from './extraEvents8';
import { EXTRA_EVENTS_9 } from './extraEvents9';
import { EXTRA_EVENTS_10 } from './extraEvents10';
import { EXTRA_EVENTS_11 } from './extraEvents11';
import { EXTRA_EVENTS_12 } from './extraEvents12';
import { COOP_EVENTS } from './coopEvents';
import { getAccountData } from './storage';

export const CUP_FINAL_SCENARIOS = [
  {
    id: 'cf_att_last_minute',
    targetPosition: 'ATT',
    title: "119ème Minute : L'Ultime Occasion",
    description: "C'est la fin des prolongations. Vous êtes épuisé. Un centre fuyant arrive dans la surface. C'est la balle de match de cette finale !",
    options: [
      { text: "Tenter une reprise de volée acrobatique", stat: 'finishing', successText: "UN BUT D'ANTHOLOGIE ! Vous offrez le trophée d'une volée incroyable !", failText: "Vous ratez complètement le ballon... L'occasion s'envole.", type: 'goal' },
      { text: "Contrôler et placer le ballon", stat: 'dribbling', successText: "Sang-froid exceptionnel ! Vous crochetez le gardien et marquez !", failText: "Votre contrôle est trop long, le gardien s'empare du ballon.", type: 'goal' },
      { text: "Sauter plus haut que tout le monde", stat: 'physical', successText: "Un coup de casque monumental qui fait trembler les filets !", failText: "Le défenseur vous bouscule, pas de faute.", type: 'goal' }
    ]
  },
  {
    id: 'cf_mid_penalty',
    targetPosition: 'MID',
    title: "Le Pénalty du Siècle",
    description: "90ème minute de la finale. Score de parité. L'arbitre siffle un penalty pour votre équipe. Le tireur attitré refuse de tirer sous la pression.",
    options: [
      { text: "Prendre ses responsabilités et frapper fort", stat: 'finishing', successText: "BOUM ! Lucarne ! Vous prenez vos responsabilités et marquez l'histoire !", failText: "Votre frappe s'écrase sur le poteau... Quelle désillusion.", type: 'goal' },
      { text: "Tenter une Panenka pour humilier le gardien", stat: 'dribbling', successText: "INCROYABLE ! Le gardien plonge, la balle entre au ralenti ! Folie douce !", failText: "Le gardien ne bouge pas et capte la balle. C'est la honte absolue.", type: 'goal' },
      { text: "Faire une passe décalée surprise", stat: 'passing', successText: "Du génie pur ! Votre coéquipier surgit et marque dans le but vide !", failText: "Personne n'a suivi. C'est le plus gros raté de l'histoire des finales.", type: 'assist' }
    ]
  },
  {
    id: 'cf_def_hero',
    targetPosition: 'DEF',
    title: "Sauvetage sur la Ligne",
    description: "Dernière seconde de la finale. Votre gardien est battu. L'attaquant adverse frappe vers le but vide. Tout un peuple retient son souffle.",
    options: [
      { text: "Taper un sprint désespéré", stat: 'pace', successText: "VOUS SAUVEZ LA BALLE SUR LA LIGNE ! C'est le geste du match !", failText: "Trop tard... La balle franchit la ligne. Défaite cruelle.", type: 'clean_sheet' },
      { text: "Se jeter de tout son corps (Tacle glissé)", stat: 'defense', successText: "Tacle légendaire ! Vous repoussez la balle in extremis !", failText: "Vous taclez le joueur. Pénalty et carton rouge. Le cauchemar.", type: 'clean_sheet' },
      { text: "Se placer en barrage avec le corps", stat: 'physical', successText: "La frappe s'écrase sur votre torse ! Quel sacrifice !", failText: "La frappe vous transperce et finit au fond.", type: 'clean_sheet' }
    ]
  },
  {
    id: 'cf_gk_shootout',
    targetPosition: 'GK',
    title: "Séance de Tirs au But",
    description: "La finale se joue aux tirs au but. C'est le tir décisif : si l'adversaire marque, tout est fini. C'est le face-à-face de votre vie.",
    options: [
      { text: "Se fier à son instinct et plonger à droite", stat: 'diving', successText: "PARADE MAJESTUEUSE ! Vous êtes le héros de la finale !", failText: "Le joueur tire à gauche. Fin du rêve.", type: 'clean_sheet' },
      { text: "Regarder ses yeux et attendre le dernier moment", stat: 'reflexes', successText: "Arrêt incroyable du bout du pied ! Vous écœurez l'adversaire !", failText: "La frappe est trop forte, vous réagissez trop tard.", type: 'clean_sheet' },
      { text: "Faire le show pour l'intimider", stat: 'positioning', successText: "Le tireur tremble face à votre pression et tire sur la barre !", failText: "Votre show ne marche pas, le ballon termine en lucarne.", type: 'clean_sheet' }
    ]
  }
];

export const COUNTRIES = [
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

export const FIRST_NAMES_MALE = {
  ZA: ['Siyabonga','Thabo','Sipho','Kagiso','Thulani','Bongani','Teboho','Tshepo','Tumelo','Katlego','Lesego','Karabo','Lebogang','Sibusiso','Mpho','Sanele','Ayanda','Wandile','Bandile','Lunga'],
  DZ: ['Mohamed','Amine','Yacine','Karim','Riyad','Ismael','Mehdi','Walid','Tarik','Ayoub','Hamza','Anis','Ilyes','Zakaria','Sofiane','Nabil','Fares','Rayane','Yanis','Adel'],
  DE: ['Maximilian','Alexander','Paul','Elias','Ben','Luis','Felix','Noah','Finn','Lukas','Julian','Jonas','Leon','Tim','Luca','Philipp','Jan','Nils','Tom','David'],
  EN: ['Oliver','George','Harry','Noah','Jack','Charlie','Leo','Jacob','Freddie','Alfie','Archie','Theo','Thomas','Arthur','Oscar','William','James','Mason','Lucas','Henry'],
  SA: ['Mohammed','Ahmed','Ali','Abdullah','Fahad','Khalid','Omar','Abdulrahman','Saud','Salman','Yasser','Salem','Saeed','Nawaf','Saleh','Majed','Hassan','Sultan','Tariq','Ibrahim'],
  AR: ['Mateo','Benjamín','Joaquín','Tomás','Santino','Valentino','Ignacio','Felipe','Lucas','Martín','Marcos','Franco','Ezequiel','Maximiliano','Sebastián','Alejandro','Marcelo','Gaston','Emiliano','Enzo'],
  AU: ['Oliver','Noah','Jack','William','Leo','Lucas','Thomas','Henry','Charlie','James','Harrison','Mason','Archer','Flynn','Hudson','Liam','Elijah','Ethan','Alexander','Samuel'],
  BE: ['Arthur','Liam','Noah','Lucas','Louis','Jules','Victor','Leon','Mathis','Gabriel','Hugo','Maxime','Thomas','Nathan','Simon','Milan','Enzo','Ethan','Lars','Niels'],
  BR: ['Gabriel','Lucas','Matheus','Pedro','Arthur','Davi','Miguel','João','Guilherme','Felipe','Nicolas','Bernardo','Samuel','Enzo','Rafael','Heitor','Gustavo','Murilo','Henrique','Eduardo'],
  CV: ['José','António','João','Manuel','Carlos','Paulo','Jorge','Luís','Fernando','Nelson','Gilson','Hélio','Adilson','Edson','Fábio','Ivan','Bruno','Hugo','Marco','Nuno'],
  CO: ['Santiago','Sebastián','Alejandro','Daniel','Andrés','Diego','Felipe','Julián','Mateo','Nicolás','Samuel','Martín','Jerónimo','Emiliano','Maximiliano','Tomás','Matías','Juan','José','Pedro'],
  KR: ['Min-jun','Seo-jun','Do-yun','Ye-jun','Ji-ho','Ha-jun','Joo-won','Ji-hu','Ji-min','Joon-woo','Hyun-woo','Gun-woo','Dong-hyun','Sung-min','Min-jae','Woo-jin','Tae-min','Su-bin','Jung-woo','Seung-hyun'],
  CI: ['Jean','Michel','Paul','Marc','Alain','Franck','Eric','Serge','Guy','Hervé','Yves','Didier','Koffi','Yao','Kouassi','Konan','Yao','Brou','Akissi','Amoin'],
  HR: ['Luka','Ivan','Marko','David','Filip','Petar','Josip','Karlo','Mateo','Borna','Fran','Mihael','Matija','Niko','Leon','Lovro','Jakov','Roko','Tin','Dominik'],
  DK: ['William','Noah','Lucas','Emil','Oliver','Victor','Magnus','Frederik','Mikkel','Christian','Mathias','Alexander','Marcus','Sebastian','Mads','Lasse','Simon','Jonas','Kasper','Nikolaj'],
  SCO: ['Jack','James','Oliver','Logan','Lewis','Leo','Alexander','Harris','Rory','Noah','Brodie','Finlay','Lucas','Mason','Charlie','Thomas','Finlay','Archie','Harry','Max'],
  EG: ['Mohamed','Ahmed','Mahmoud','Mustafa','Youssef','Omar','Ali','Amr','Hassan','Hussein','Tarek','Ibrahim','Khaled','Hesham','Karim','Walid','Sherif','Maged','Ayman','Sameh'],
  AE: ['Mohammed','Ahmad','Ali','Saeed','Abdullah','Mansour','Majid','Khalifa','Sultan','Salem','Saif','Rashid','Hamad','Tariq','Hassan','Hussain','Nasser','Yousuf','Ibrahim','Khaled'],
  EC: ['Luis','Carlos','José','Juan','Jorge','Pedro','Manuel','Diego','Andrés','Christian','Kevin','Bryan','Jhonny','Victor','Angel','Fernando','Patricio','Santiago','David','Alex'],
  ES: ['Hugo','Martín','Lucas','Mateo','Leo','Daniel','Alejandro','Pablo','Manuel','Alvaro','Adrián','David','Mario','Diego','Javier','Marco','Izan','Sergio','Marcos','Gonzalo'],
  US: ['Liam','Noah','Oliver','Elijah','William','James','Benjamin','Lucas','Henry','Alexander','Mason','Michael','Ethan','Daniel','Jacob','Logan','Jackson','Levi','Sebastian','Mateo'],
  FR: ['Hugo','Gabriel','Léo','Arthur','Louis','Raphaël','Jules','Adam','Maël','Lucas','Ethan','Tiago','Hugo','Noah','Paul','Gabin','Sacha','Nathan','Aaron','Tom'],
  GH: ['Kwame','Kofi','Kwasi','Kojo','Kwabena','Yaw','Kwaku','Emmanuel','Samuel','Daniel','Michael','Isaac','Joseph','Richard','John','Ebenezer','Gideon','Evans','Frank','Stephen'],
  GR: ['Georgios','Ioannis','Konstantinos','Dimitrios','Nikolaos','Panagiotis','Vasileios','Christos','Athanasios','Michail','Evangelos','Spyridon','Antonios','Anastasios','Theodoros','Ilias','Stavros','Alexandros','Petros','Grigorios'],
  IQ: ['Ali','Mohammed','Hussein','Ahmed','Mustafa','Hassan','Haider','Abbas','Omar','Ameer','Sajjad','Murtadha','Zain','Yousif','Muntadher','Hasan','Qasim','Saad','Hussain','Zaid'],
  IR: ['Ali','Mohammad','Amir','Reza','Hossein','Mehdi','Saeed','Alireza','Hassan','Milad','Ehsan','Majid','Pejman','Omid','Hamed','Morteza','Mohsen','Farhad','Vahid','Amin'],
  IT: ['Leonardo','Francesco','Alessandro','Lorenzo','Mattia','Andrea','Gabriele','Riccardo','Tommaso','Edoardo','Matteo','Giuseppe','Diego','Filippo','Federico','Antonio','Christian','Samuele','Giovanni','Pietro'],
  JP: ['Takefusa','Kaoru','Wataru','Daichi','Takehiro','Ritsu','Junya','Ao','Takumi','Yuto','Maya','Shinji','Keisuke','Hidetoshi','Kazuyoshi','Shunsuke','Makoto','Eiji','Haruto','Yuto'],
  JO: ['Mohammad','Ahmad','Omar','Ali','Yousef','Abdullah','Mahmoud','Ibrahim','Khaled','Hassan','Tariq','Zaid','Hamza','Faris','Karam','Rayan','Laith','Jad','Ameer','Majd'],
  MA: ['Achraf','Hakim','Yassine','Sofyan','Romain','Nayef','Azzedine','Youssef','Sofiane','Amine','Mustapha','Noureddine','Salaheddine','Mehdi','Tarik','Baddou','Aziz','Hassan','Rachid','Khalid'],
  MX: ['Santiago','Mateo','Sebastián','Leonardo','Matías','Emiliano','Diego','Daniel','Miguel','Alexander','Gael','Alejandro','Jesús','José','David','Fernando','Jorge','Maximiliano','Eduardo','Nicolás'],
  NG: ['Victor','Alex','Wilfred','Kelechi','Ahmed','Samuel','Joe','Leon','William','Kenneth','Nwankwo','Jay-Jay','Taribo','Sunday','Finidi','Rashidi','Vincent','Obafemi','John','Peter'],
  NO: ['Jakob','Lucas','Filip','Oskar','Oliver','William','Emil','Noah','Aksel','Henrik','Elias','Sander','Mathias','Markus','Johannes','Isak','Kasper','Theodor','Jonas','Magnus'],
  UZ: ['Aziz','Rustam','Timur','Sardor','Alisher','Farhod','Otabek','Jamshid','Dilshod','Umid','Jasur','Bobur','Davron','Ilhom','Nodir','Sanjar','Bekzod','Sherzod','Murod','Shavkat'],
  PS: ['Mohammed','Ahmed','Mahmoud','Yousef','Ali','Omar','Ibrahim','Hassan','Hussein','Khaled','Tariq','Rami','Sami','Fadi','Shadi','Nasser','Kamal','Jamal','Amir','Tamer'],
  NL: ['Noah','Sem','Liam','Lucas','Daan','Finn','Levi','Luuk','Mees','James','Milan','Bram','Thijs','Sam','Noud','Hugo','Mats','Jesse','Tim','Max'],
  PL: ['Antoni','Jan','Aleksander','Franciszek','Jakub','Szymon','Mikołaj','Leon','Filip','Stanisław','Ignacy','Wojciech','Kacper','Michał','Marcel','Wiktor','Piotr','Tymon','Igor','Oliwier'],
  PT: ['João','Martim','Rodrigo','Tiago','Francisco','Tomás','Afonso','Duarte','Miguel','Gonçalo','Pedro','Guilherme','Diogo','Rafael','Dinis','Henrique','Salvador','Gabriel','Simão','Lourenço'],
  QA: ['Mohammed','Abdullah','Ali','Ahmad','Rashid','Khalifa','Hassan','Saad','Fahad','Sultan','Jassim','Salem','Abdulrahman','Nasser','Tariq','Majid','Yousef','Ibrahim','Khaled','Mansour'],
  CD: ['Jean','Joseph','Pierre','Paul','Michel','Jacques','Charles','Thomas','David','Daniel','Emmanuel','Samuel','Christian','Martin','Robert','Alain','Claude','Serge','Bernard','Patrick'],
  SN: ['Mamadou','Amadou','Oumar','Alioune','Ibrahima','Abdoulaye','Cheikh','Modou','Fallou','Moustapha','Babacar','Saliou','Serigne','Ousmane','Djibril','Pape','Malick','Mor','Samba','Lamine'],
  CH: ['Noah','Liam','Luca','Leon','Gabriel','David','Elias','Matteo','Samuel','Julian','Simon','Diego','Leandro','Nino','Livio','Jonas','Elia','Luis','Noe','Aaron'],
  TN: ['Mohamed','Youssef','Ahmed','Yassine','Mehdi','Omar','Aziz','Rayen','Fares','Amine','Karim','Ayoub','Ilyes','Hamza','Walid','Nizar','Tarek','Anis','Sami','Hichem'],
  TR: ['Yusuf','Miraç','Eymen','Ömer','Mustafa','Emir','Kerem','Mehmet','Berat','Ahmet','Ali','Hamza','Kaan','Enes','Muhammed','Can','Burak','Hüseyin','Hasan','Murat'],
  UY: ['Mateo','Thiago','Joaquín','Bautista','Santino','Valentino','Facundo','Benjamín','Felipe','Lucas','Martín','Agustín','Diego','Rodrigo','Nicolás','Maximiliano','Sebastián','Federico','Gastón','Pablo'],
};


export const FIRST_NAMES_FEMALE = {
  ZA: ['Amahle','Mbali','Precious','Princess','Beauty','Sizwe','Thato','Karabo','Lethabo','Lesedi','Tshegofatso','Keneilwe','Boitumelo','Keletso','Tebogo','Kagiso','Dineo','Nthabiseng','Refilwe','Koketso'],
  DZ: ['Lina','Inès','Sara','Amel','Rania','Kenza','Fatima','Aya','Nour','Yasmine','Sonia','Nadia','Meriem','Mélissa','Léa','Chaima','Siham','Samira','Farah','Manel'],
  DE: ['Mia','Emma','Sofia','Hannah','Emilia','Anna','Lina','Mila','Lea','Marie','Lena','Luisa','Clara','Amelie','Johanna','Mathilda','Lara','Nele','Sophie','Lilly'],
  EN: ['Chloe','Georgia','Ella','Lauren','Olivia','Amelia','Isla','Ava','Mia','Isabella','Sophia','Grace','Lily','Freya','Evie','Florence','Willow','Poppy','Rosie','Daisy'],
  SA: ['Fatima','Sara','Noura','Aisha','Reem','Maha','Hessa','Joud','Layan','Lana','Tala','Rinad','Dina','Rana','Nawal','Sama','Hala','Farah','Nada','Ghada'],
  AR: ['Martina','Isabella','Catalina','Valentina','Emma','Sofía','Olivia','Delfina','Renata','Mía','Alma','Zoe','Emilia','Victoria','Juana','Lola','Guadalupe','Candela','Pilar','Jazmín'],
  AU: ['Charlotte','Olivia','Amelia','Isla','Mia','Ava','Grace','Willow','Harper','Chloe','Ruby','Matilda','Sophie','Evelyn','Ivy','Ella','Lucy','Zoe','Evie','Lily'],
  BE: ['Olivia','Emma','Louise','Mila','Alice','Camille','Juliette','Sofia','Lina','Elena','Mia','Anna','Julia','Marie','Lucie','Nina','Margaux','Nora','Clara','Amélie'],
  BR: ['Helena','Alice','Laura','Manuela','Sophia','Isabella','Luísa','Heloísa','Cecília','Maitê','Júlia','Antonella','Giovanna','Maria','Lorena','Lívia','Marina','Clara','Isadora','Beatriz'],
  CV: ['Maria','Ana','Josefa','Catarina','Sónia','Sandra','Teresa','Rosa','Fátima','Joana','Marta','Helena','Sofia','Rita','Vanda','Patrícia','Cláudia','Carla','Diana','Isabel'],
  CO: ['Luciana','Isabella','Salomé','Antonella','Camila','Gabriela','Valeria','Sofía','María','Sara','Juliana','Laura','Ana','Manuela','Daniela','Paula','Andrea','Alejandra','Natalia','Victoria'],
  KR: ['Ji-yoo','Ha-yoon','Seo-ah','Ha-eun','Joo-ah','Ji-woo','Da-eun','Su-a','Ye-na','Ji-a','Min-seo','Ha-rin','Seo-yeon','Chae-won','Ye-rin','Yoon-seo','Ji-yoon','Ha-yul','So-yul','Eun-woo'],
  CI: ['Marie','Awa','Fatou','Aminata','Affoué','Akissi','Amoin','Adjoua','Abla','Akoua','Fanta','Mariam','Oumou','Sita','Bintou','Kadi','Aicha','Safi','Salimata','Minata'],
  HR: ['Mia','Lucija','Ena','Ana','Petra','Sara','Marta','Lana','Nika','Iva','Klara','Elena','Laura','Marija','Dora','Tea','Katarina','Tia','Rita','Eva'],
  DK: ['Alma','Agnes','Ella','Freja','Clara','Emma','Sofia','Ida','Anna','Olivia','Laura','Josefine','Mathilde','Isabella','Alberte','Naja','Karla','Maja','Lærke','Victoria'],
  SCO: ['Isla','Olivia','Emily','Freya','Amelia','Sophie','Ella','Ava','Grace','Aria','Lily','Charlotte','Rosie','Lucy','Millie','Maisie','Evie','Hannah','Mia','Chloe'],
  EG: ['Fatma','Aya','Mariam','Nour','Habiba','Salma','Menna','Shahd','Hala','Rana','Dina','Noha','Yasmine','Mona','Heba','Amira','Reem','Soha','Asmaa','Nada'],
  AE: ['Fatima','Maryam','Aisha','Amna','Meera','Sheikha','Hind','Latifa','Alia','Salama','Hessa','Sara','Noura','Rawdha','Shamma','Maha','Ghalia','Reem','Maitha','Dana'],
  EC: ['María','Rosa','Ana','Carmen','Diana','Paola','Marta','Lucía','Gabriela','Fernanda','Andrea','Silvia','Verónica','Patricia','Daniela','Teresa','Evelyn','Alejandra','Karla','Jessica'],
  ES: ['Lucía','Martina','Sofía','María','Valeria','Julia','Paula','Emma','Daniela','Carla','Alba','Noa','Carmen','Claudia','Valentina','Alma','Ana','Laura','Marta','Cristina'],
  US: ['Olivia','Emma','Ava','Isabella','Mia','Charlotte','Amelia','Harper','Evelyn','Abigail','Emily','Elizabeth','Avery','Sofia','Ella','Madison','Scarlett','Victoria','Aria','Grace'],
  FR: ['Emma','Jade','Louise','Alice','Chloé','Lina','Léa','Rose','Anna','Mila','Inès','Ambre','Julia','Mia','Léna','Zoé','Manon','Juliette','Lou','Camille'],
  GH: ['Ama','Akosua','Adwoa','Abena','Akua','Yaa','Afia','Mary','Esther','Sarah','Grace','Joyce','Evelyn','Gladys','Beatrice','Patience','Comfort','Janet','Ruth','Priscilla'],
  GR: ['Maria','Eleni','Aikaterini','Vasiliki','Sofia','Georgia','Angeliki','Anna','Dimitra','Konstantina','Panagiota','Evangelia','Despoina','Christina','Styliani','Eirini','Paraskevi','Ioanna','Alexandra','Kalliopi'],
  IQ: ['Zainab','Fatima','Zahraa','Ruqayyah','Aya','Noor','Hawraa','Banin','Tabarak','Huda','Maryam','Haneen','Rusul','Zaman','Ruaa','Sarah','Shahad','Duha','Safa','Mina'],
  IR: ['Fatemeh','Zahra','Maryam','Zeinab','Negin','Reyhaneh','Sahar','Sara','Niloofar','Bahar','Yasaman','Shadi','Elham','Nazanin','Shiva','Roya','Ghazal','Setayesh','Melika','Mina'],
  IT: ['Sofia','Aurora','Giulia','Ginevra','Alice','Beatrice','Emma','Giorgia','Vittoria','Matilde','Greta','Martina','Chiara','Anna','Ludovica','Nicole','Francesca','Camilla','Bianca','Alessia'],
  JP: ['Sakura','Ichika','Akari','Aoi','Himari','Rio','Kokoro','Kanna','Mei','Honoka','Yuna','Mio','Rin','Sara','Haruna','Saki','Natsuki','Ayane','Miku','Rika'],
  JO: ['Layan','Salma','Sara','Leen','Hala','Aya','Jana','Tala','Farah','Nour','Yara','Bana','Zeina','Rayan','Mira','Tia','Masa','Ghazal','Joud','Lana'],
  MA: ['Aya','Nour','Malak','Mariam','Yasmina','Leila','Inès','Lina','Amira','Zineb','Hiba','Rania','Salma','Chaima','Oumaima','Nada','Asma','Wissal','Hind','Bouchra'],
  MX: ['Sofía','María','Valentina','Regina','Camila','Valeria','Ximena','Victoria','Renata','Fernanda','Daniela','Natalia','Isabella','Andrea','Mariana','Luciana','Romina','Samantha','Alejandra','Julieta'],
  NG: ['Grace','Mary','Esther','Sarah','Ruth','Joy','Precious','Destiny','Miracle','Favour','Gift','Promise','Goodness','Hope','Charity','Patience','Oluwakemi','Adeola','Chidinma','Amaka'],
  NO: ['Nora','Emma','Olivia','Sofie','Emilie','Lea','Sofia','Sara','Amalie','Ingrid','Thea','Ida','Mia','Maja','Tiril','Mathilde','Frida','Jenny','Anna','Julie'],
  UZ: ['Malika','Shahnoza','Nigora','Dilnoza','Zarina','Madina','Gulnoza','Sevara','Gulzoda','Nargiza','Feruza','Dildora','Shirin','Asal','Ziyoda','Umida','Sitora','Iroda','Rayhon','Nilufar'],
  PS: ['Jana','Layan','Tala','Sara','Hala','Aya','Bisan','Salma','Nour','Farah','Zeina','Mira','Leen','Tia','Lana','Rayan','Joud','Masa','Sama','Yara'],
  NL: ['Emma','Mila','Julia','Zoe','Tess','Sophie','Sara','Yara','Nora','Lotte','Eva','Liv','Fleur','Lynn','Elin','Anna','Isa','Roos','Maud','Fien'],
  PL: ['Zuzanna','Julia','Maja','Zofia','Hanna','Lena','Alicja','Maria','Amelia','Oliwia','Aleksandra','Wiktoria','Natalia','Antonia','Laura','Nadia','Kornelia','Iga','Marcelina','Nina'],
  PT: ['Maria','Leonor','Matilde','Beatriz','Carolina','Mariana','Inês','Margarida','Sofia','Lara','Alice','Francisca','Clara','Madalena','Diana','Joana','Catarina','Mafalda','Íris','Eva'],
  QA: ['Fatima','Aisha','Maryam','Sheikha','Alia','Noora','Sara','Hessa','Maha','Reem','Latifa','Shamma','Dana','Rawdha','Moza','Hind','Salama','Ghalia','Alanoud','Meera'],
  CD: ['Marie','Béatrice','Thérèse','Monique','Brigitte','Chantal','Solange','Véronique','Madeleine','Joséphine','Gisèle','Sylvie','Mireille','Pierrette','Micheline','Colette','Claudine','Clémentine','Hortense','Rosalie'],
  SN: ['Aminata','Fatou','Aïssatou','Mariama','Ndèye','Faty','Binta','Khady','Oumou','Awa','Safiétou','Rokhaya','Coumba','Astou','Penda','Dior','Aby','Ngom','Sokhna','Mame'],
  CH: ['Mia','Alina','Emma','Lina','Elena','Laura','Sofia','Nina','Mila','Lara','Anna','Lea','Julia','Sara','Luisa','Melina','Sophia','Emilia','Leonor','Amelie'],
  TN: ['Syrine','Farah','Yasmine','Nour','Amal','Ines','Mariem','Asma','Chayma','Eya','Salma','Hiba','Ons','Fatma','Rania','Zaineb','Amina','Dorra','Wiem','Mouna'],
  TR: ['Zeynep','Elif','Defne','Asel','Azra','Eylül','Nehir','Meryem','Asya','Ecrin','Miray','Zehra','Hira','Ela','Duru','Yağmur','Nisa','Ayşe','Melek','Lina'],
  UY: ['Martina','Catalina','Julieta','Isabella','Emilia','Sofía','Valentina','Delfina','Renata','Emma','Mía','Pilar','Victoria','Micaela','Florencia','Lucía','Camila','Josefina','Zoe','Alfonsina'],
};


export const LAST_NAMES = {
  ZA: ['Dlamini','Nkosi','Khumalo','Ndlovu','Mokoena','Mthembu','Ngcobo','Sithole','Makhanya','Gumede','Zungu','Zulu','Mabasa','Khoza','Mabena','Mnguni','Molefe','Motloung','Mofokeng','Motaung'],
  DZ: ['Benali','Saidi','Belkacem','Haddad','Brahimi','Taleb','Amrani','Bennacer','Slimani','Meziane','Toumi','Boucher','Bouzid','Lounes','Meddour','Ghezal','Boutaleb','Khedira','Djabou','Yahia'],
  DE: ['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann','Schäfer','Koch','Bauer','Richter','Klein','Wolf','Schröder','Neumann','Schwarz','Zimmermann'],
  EN: ['Smith','Jones','Taylor','Williams','Brown','Davies','Evans','Wilson','Thomas','Roberts','Johnson','Lewis','Walker','Robinson','Wood','Thompson','White','Watson','Jackson','Wright'],
  SA: ['Al-Dawsari','Al-Muwallad','Al-Shehri','Al-Faraj','Al-Shahrani','Al-Ghannam','Al-Malki','Al-Otaibi','Al-Qahtani','Al-Ghamdi','Al-Harbi','Al-Zahrani','Al-Mutairi','Al-Enazi','Al-Shammeri','Al-Jassim','Al-Mosa','Al-Faisal','Al-Bishi','Al-Ruwaili'],
  AR: ['Gonzalez','Rodriguez','Gomez','Fernandez','Lopez','Diaz','Martinez','Perez','Garcia','Sanchez','Romero','Suarez','Alvarez','Ruiz','Navarro','Torres','Dominguez','Vazquez','Ramos','Blanco'],
  AU: ['Smith','Jones','Williams','Brown','Wilson','Taylor','Johnson','White','Martin','Anderson','Thompson','Nguyen','Thomas','Walker','Harris','Lee','Ryan','Robinson','Kelly','King'],
  BE: ['Peeters','Janssens','Maes','Jacobs','Mertens','Willems','Claes','Goossens','Wouters','De Smet','Vermeulen','Pauwels','Dubois','Lambert','Dupont','Martin','Simon','Michel','Leclercq','Leroy'],
  BR: ['Silva','Santos','Oliveira','Souza','Rodrigues','Ferreira','Alves','Pereira','Lima','Gomes','Costa','Ribeiro','Martins','Carvalho','Almeida','Lopes','Soares','Fernandes','Vieira','Barbosa'],
  CV: ['Silva','Tavares','Fernandes','Gomes','Semedo','Lopes','Borges','Monteiro','Correia','Soares','Pires','Andrade','Rodrigues','Varela','Cabral','Almeida','Barros','Neves','Veiga','Mendes'],
  CO: ['Rodriguez','Gomez','Gonzalez','Martinez','Garcia','Lopez','Hernandez','Sanchez','Perez','Ramirez','Diaz','Muñoz','Rojas','Moreno','Jimenez','Gutiérrez','Ruiz','Vargas','Castro','Ortiz'],
  KR: ['Kim','Lee','Park','Choi','Jung','Kang','Cho','Yoon','Jang','Lim','Han','Oh','Seo','Shin','Kwon','Hwang','Ahn','Song','Ryu','Jeon'],
  CI: ['Kouassi','Konan','Yao','Kouadio','Kouakou','Koffi','N\'Guessan','Traoré','Kouamé','Touré','Ouattara','Coulibaly','Kone','Cisse','Bamba','Brou','Sylla','Diarrassouba','Fofana','Bakayoko'],
  HR: ['Knežević','Horvat','Kovačević','Pavlović','Blažević','Grgić','Babić','Polić','Jurić','Vidović','Kovačić','Tomić','Vuković','Perić','Marković','Lončar','Radić','Novak','Matić','Klarić'],
  DK: ['Nielsen','Jensen','Hansen','Pedersen','Andersen','Christensen','Larsen','Sørensen','Rasmussen','Jørgensen','Petersen','Madsen','Kristensen','Olsen','Thomsen','Christiansen','Poulsen','Johansen','Møller','Mortensen'],
  SCO: ['Smith','Brown','Wilson','Thomson','Robertson','Campbell','Stewart','Anderson','Scott','Murray','MacDonald','Reid','Taylor','Clark','Ross','Watson','Morrison','Paterson','Young','Mitchell'],
  EG: ['Mohamed','Mahmoud','Ahmed','Ali','Ibrahim','Hassan','Mustafa','Youssef','Hussein','Saleh','Abdel','Sayed','Osama','Saad','Fathy','Omar','Kamal','Tarek','Khalil','Ezzat'],
  AE: ['Al-Marzouqi','Al-Hammadi','Al-Kaabi','Al-Nuaimi','Al-Suwaidi','Al-Mheiri','Al-Qubaisi','Al-Zabi','Al-Mansouri','Al-Ali','Al-Falahi','Al-Ketbi','Al-Zaabi','Al-Dhaheri','Al-Shamsi','Al-Mazrouei','Al-Rashidi','Al-Muhairi','Al-Awadhi','Al-Otaiba'],
  EC: ['García','Zambrano','Saltos','Cedeño','López','Rodríguez','Pérez','González','Macías','Castro','Sánchez','Vera','Delgado','Torres','Mendoza','Bravo','Cevallos','Romero','Chávez','Alvarado'],
  ES: ['Garcia','Gonzalez','Rodriguez','Fernandez','Lopez','Martinez','Sanchez','Perez','Gomez','Martin','Jimenez','Ruiz','Hernandez','Diaz','Moreno','Muñoz','Alvarez','Romero','Alonso','Gutierrez'],
  US: ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin'],
  FR: ['Martin','Bernard','Thomas','Petit','Robert','Richard','Durand','Dubois','Moreau','Laurent','Simon','Michel','Lefebvre','Leroy','Roux','David','Morel','Fournier','Girard','Bonnet'],
  GH: ['Mensah','Osei','Appiah','Owusu','Boateng','Boakye','Ofori','Arthur','Gyan','Asare','Agyemang','Antwi','Boadu','Danquah','Amponsah','Adomako','Nyarko','Okyere','Sarpong','Kusi'],
  GR: ['Papadopoulos','Pappas','Karagiannis','Vlachos','Ioannidis','Oikonomou','Papageorgiou','Makris','Konstantinidis','Dimopoulos','Georgiadis','Zafiriou','Anastasiadis','Alexiou','Panagiotopoulos','Nikolaou','Athanasiadis','Giannopoulos','Christodoulou','Katsaros'],
  IQ: ['Al-Maliki','Al-Tamimi','Al-Jubouri','Al-Rubaie','Al-Shammary','Al-Khafaji','Al-Hashemi','Al-Zubaidi','Al-Obaidi','Al-Saadi','Al-Hilli','Al-Basri','Al-Taie','Al-Bayati','Al-Dawsari','Al-Kinani','Al-Hussein','Al-Abadi','Al-Jabouri','Al-Shibani'],
  IR: ['Mohammadi','Hosseini','Ahmadi','Rezaei','Moradi','Heydari','Karimi','Ebrahimi','Hashemi','Jafari','Ghasemi','Rostami','Rahimi','Salehi','Fazeli','Darvish','Taheri','Sadeghi','Jalali','Shirazi'],
  IT: ['Rossi','Russo','Ferrari','Esposito','Bianchi','Romano','Colombo','Ricci','Marino','Greco','Bruno','Gallo','Conti','De Luca','Mancini','Costa','Giordano','Rizzo','Lombardi','Moretti'],
  JP: ['Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi','Kato','Yoshida','Yamada','Sasaki','Yamaguchi','Saito','Matsumoto','Inoue','Kimura','Hayashi','Shimizu'],
  JO: ['Al-Khatib','Abu','Hassan','Khaled','Ibrahim','Hussein','Salem','Saleh','Yousef','Abdullah','Mahmoud','Omar','Qasim','Tariq','Farid','Nasser','Hamza','Al-Zubi','Al-Adwan','Al-Masri'],
  MA: ['Alaoui','Berrada','Benali','Chraibi','El Fassi','Tazi','Bennani','Zidane','El Amrani','Idrissi','El Othmani','Ouazzani','Guessous','El Malki','Bennis','El Idrissi','Benjelloun','El Khatib','El Mansouri','El Hachimi'],
  MX: ['Hernández','García','Martínez','López','González','Pérez','Rodríguez','Sánchez','Ramírez','Cruz','Gómez','Flores','Morales','Vázquez','Jiménez','Reyes','Díaz','Torres','Gutiérrez','Ruiz'],
  NG: ['Okafor','Okeke','Okonkwo','Nwosu','Kalu','Ibrahim','Abubakar','Musa','Bello','Ali','Garba','Umar','Sani','Adeyemi','Adeleke','Ogunleye','Adeboye','Balogun','Oluwaseun','Adebayo'],
  NO: ['Hansen','Johansen','Olsen','Larsen','Andersen','Pedersen','Nilsen','Kristiansen','Jensen','Karlsen','Johnsen','Pettersen','Eriksen','Berg','Haugen','Hagen','Johannessen','Andreassen','Jacobsen','Halvorsen'],
  UZ: ['Karimov','Abdullayev','Yuldashev','Rahimov','Usmonov','Nurmatov','Saidov','Ramazonov','Mirzaev','Aliyev','Tursunov','Sodiqov','Ibragimov','Murodov','Shavkatov','Nazarov','Rustamov','Qodirov','Oripov','Ismoilov'],
  PS: ['Awad','Haddad','Nassar','Khoury','Mansour','Saeed','Yassin','Ibrahim','Taha','Salem','Salah','Mahmoud','Nasser','Suleiman','Hassan','Hussein','Issa','Azzam','Nader','Bishara'],
  NL: ['De Jong','Jansen','De Vries','Van den Berg','Van Dijk','Bakker','Visser','Smit','Meijer','De Boer','Mulder','Groot','Bos','Vos','Peters','Hendriks','Dekker','Brouwer','De Leeuw','Smits'],
  PL: ['Nowak','Kowalski','Wiśniewski','Wójcik','Kowalczyk','Kamiński','Lewandowski','Zieliński','Szymański','Woźniak','Dąbrowski','Kozłowski','Jankowski','Mazur','Wojciechowski','Kwiatkowski','Krawczyk','Kaczmarek','Piotrowski','Grabowski'],
  PT: ['Silva','Santos','Ferreira','Pereira','Oliveira','Costa','Rodrigues','Martins','Jesus','Sousa','Fernandes','Gonçalves','Gomes','Lopes','Marques','Alves','Almeida','Ribeiro','Pinto','Carvalho'],
  QA: ['Al-Thani','Al-Kuwari','Al-Marri','Al-Hajri','Al-Kaabi','Al-Mahmoud','Al-Sulaiti','Al-Khater','Al-Binali','Al-Naimi','Al-Abdullah','Al-Rumaihi','Al-Subaie','Al-Obaidli','Al-Malki','Al-Mannai','Al-Hitmi','Al-Suwaidi','Al-Emadi','Al-Fardan'],
  CD: ['Ilunga','Mutombo','Kasongo','Tshibangu','Ndaye','Kabamba','Mukendi','Mbuyi','Kabasele','Mwamba','Kalala','Ngalula','Mulumba','Kanku','Badibanga','Ngandu','Tshilenge','Lukusa','Ntumba','Banza'],
  SN: ['Ndiaye','Diop','Fall','Gueye','Sow','Ba','Seck','Faye','Sy','Dieng','Toure','Bocoum','Tall','Dia','Sene','Mbaye','Gassama','Thiam','Sarr','Gomis'],
  CH: ['Müller','Meier','Schmid','Keller','Weber','Huber','Kaiser','Steiner','Baumann','Frei','Brunner','Gerber','Moser','Zimmermann','Widmer','Wyss','Roth','Suter','Baumgartner','Studer'],
  TN: ['Trabelsi','Ben Ali','Gharbi','Ben Ammar','Mathlouthi','Jelassi','Baccouche','Bouazizi','Mabrouk','Cherif','Ayari','Mansour','Zitouni','Hammami','Khlifi','Dridi','Ben Salem','Mezni','Karray','Kamel'],
  TR: ['Yılmaz','Kaya','Demir','Çelik','Şahin','Yıldız','Yıldırım','Öztürk','Aydın','Özdemir','Arslan','Doğan','Kılıç','Aslan','Çetin','Kara','Koç','Kurt','Özkan','Şimşek'],
  UY: ['Rodríguez','González','Martínez','García','Pérez','Silva','Fernández','López','Olivera','Gómez','Sosa','Alonso','Díaz','Alvarez','Suárez','Romero','Acosta','Pereira','Ríos','Reyes'],
};


export const getRandomName = (countryId, genderId = 'male') => {
  const isFemale = (genderId === 'female' || genderId === 'F');
  const firsts = isFemale ? (FIRST_NAMES_FEMALE[countryId] || FIRST_NAMES_FEMALE.FR) : (FIRST_NAMES_MALE[countryId] || FIRST_NAMES_MALE.FR);
  const lasts = LAST_NAMES[countryId] || LAST_NAMES.FR;
  const randomFirst = firsts[Math.floor(Math.random() * firsts.length)];
  const randomLast = lasts[Math.floor(Math.random() * lasts.length)];
  return `${randomFirst} ${randomLast}`;
};

export const getRandomEvent = (step, total, player = {}) => {
  const isFirst = step === 1;
  const isLast = step === total;
  const pos = (player.position || 'DEFAULT').toUpperCase();

  const validEvents = ALL_EVENTS.filter(e => {
    if (isFirst && !e.isFirstTime) return false;
    if (isLast && !e.isLastTime) return false;
    if (!isFirst && !isLast && (e.isFirstTime || e.isLastTime)) return false;
    
    if (e.targetPosition && e.targetPosition !== 'ALL') {
      if (!pos.includes(e.targetPosition)) return false;
    }
    
    return true;
  });

  if (validEvents.length === 0) return ALL_EVENTS.find(e => e.id === 'training_normal') || ALL_EVENTS[0];
  return validEvents[Math.floor(Math.random() * validEvents.length)];
};

export const GENDERS = [
  { id: 'M', name: 'Masculin', icon: '👨', desc: 'Rejoindre les ligues masculines.' },
  { id: 'F', name: 'Féminin', icon: '👩', desc: 'Rejoindre les ligues féminines.' }
];

export const ORIGINS_BACKGROUNDS = [
  { id: 'ACADEMY', name: 'Centre de Formation', icon: '🎓', desc: 'Formé dans la rigueur d\'une académie pro.', startingMoney: 15000, statBonus: { passing: 4, defense: 3 } },
  { id: 'STREET', name: 'Quartiers Populaires', icon: '🔥', desc: 'Forgé sur le béton. Vous jouez avec la rage de vaincre.', startingMoney: 2000, statBonus: { dribbling: 5, pace: 3 } },
  { id: 'AMATEUR', name: 'Football Amateur', icon: '🚜', desc: 'Découvert sur le tard. Habitué au combat physique.', startingMoney: 4000, statBonus: { physical: 6, defense: 2 } },
  { id: 'LEGACY', name: 'Héritage Pro', icon: '👑', desc: 'Enfant d\'un ancien pro. Une aisance naturelle.', startingMoney: 40000, statBonus: { finishing: 3, passing: 3 } },
  { id: 'FIVE', name: 'Pépite Five', icon: '⚡', desc: 'Technique dans les petits espaces et feintes.', startingMoney: 6000, statBonus: { dribbling: 4, finishing: 3 } }
];

export const POSITIONS_DATA = [
  {
    id: 'ATTAQUANT',
    engineCode: 'ATT',
    name: 'Attaquant',
    icon: '🎯',
    roles: [
      { id: 'buteur', name: 'Buteur', description: 'Finisseur axial pur, obsédé par le but.', baseStats: { pace: 72, finishing: 85, passing: 58, dribbling: 65, defense: 30, physical: 75 } },
      { id: 'bg_street', name: 'Dalleux (Origine)', desc: 'Bonus de stats dans les moments difficiles.', icon: '🔥', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'bg_academy', name: 'Élève Modèle (Origine)', desc: 'La confiance du coach est plus facile à gagner', icon: '📚', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'bg_five', name: 'Technique Pure (Origine)', desc: 'Augmente considérablement les dribbles et la vista', icon: '⚡', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'renard', name: 'Renard de surface', description: 'Opportuniste redoutable dans la zone de vérité.', baseStats: { pace: 68, finishing: 88, passing: 55, dribbling: 62, defense: 28, physical: 70 } },
      { id: 'faux9', name: 'Faux 9', description: 'Décroche pour créer le jeu et distribuer.', baseStats: { pace: 75, finishing: 74, passing: 78, dribbling: 76, defense: 35, physical: 65 } },
      { id: 'ailier', name: 'Ailier', description: 'Perpétuelle percussion sur les côtés et centres.', baseStats: { pace: 88, finishing: 70, passing: 68, dribbling: 84, defense: 35, physical: 62 } }
    ]
  },
  {
    id: 'MILIEU',
    engineCode: 'MID',
    name: 'Milieu de terrain',
    icon: '⚙️',
    roles: [
      { id: 'meneur', name: 'Meneur de jeu', description: 'Vision panoramique et passes décisives.', baseStats: { pace: 70, finishing: 65, passing: 86, dribbling: 80, defense: 45, physical: 60 } },
      { id: 'boxtobox', name: 'Box-to-box', description: 'Activité intense de surface à surface.', baseStats: { pace: 78, finishing: 68, passing: 75, dribbling: 70, defense: 70, physical: 80 } },
      { id: 'mdf', name: 'Milieu défensif', description: 'Récupérateur d\'assaut, sentinelle.', baseStats: { pace: 68, finishing: 45, passing: 70, dribbling: 60, defense: 84, physical: 82 } },
      { id: 'relayeur', name: 'Relayeur', description: 'Équilibre l\'équipe entre phases défensives et offensives.', baseStats: { pace: 72, finishing: 60, passing: 80, dribbling: 72, defense: 65, physical: 68 } }
    ]
  },
  {
    id: 'DEFENSEUR',
    engineCode: 'DEF',
    name: 'Défenseur',
    icon: '🛡️',
    roles: [
      { id: 'stoppeur', name: 'Stoppeur', description: 'Rugueux, intraitable dans les duels.', baseStats: { pace: 65, finishing: 35, passing: 60, dribbling: 50, defense: 86, physical: 85 } },
      { id: 'libero', name: 'Libéro', description: 'Anticipation hors pair et relance propre.', baseStats: { pace: 68, finishing: 40, passing: 76, dribbling: 62, defense: 82, physical: 72 } },
      { id: 'lateral', name: 'Latéral', description: 'Monte et descend son couloir sans relâche.', baseStats: { pace: 85, finishing: 48, passing: 70, dribbling: 75, defense: 76, physical: 74 } },
      { id: 'def_off', name: 'Défenseur offensif', description: 'Apporte le surnombre constant et centre fort.', baseStats: { pace: 80, finishing: 55, passing: 74, dribbling: 78, defense: 72, physical: 70 } }
    ]
  },
  {
    id: 'GARDIEN',
    engineCode: 'GB',
    name: 'Gardien',
    icon: '🧤',
    roles: [
      { id: 'gk_classique', name: 'Gardien classique', description: 'Maître de sa ligne, réflexes spectaculaires.', baseStats: { pace: 50, finishing: 20, passing: 60, dribbling: 40, defense: 85, physical: 78 } },
      { id: 'gk_libero', name: 'Gardien-libéro', description: 'Joue haut, excellent jeu au pied.', baseStats: { pace: 62, finishing: 25, passing: 75, dribbling: 55, defense: 80, physical: 75 } }
    ]
  }
];

export const LIFESTYLES = [
  { id: 'STRICT', name: 'Pro Exemplaire', description: 'Sommeil strict, nutrition sportive, récupération maximale.' },
  { id: 'BALANCED', name: 'Équilibré', description: 'Sérieux la semaine, décompression modérée.' },
  { id: 'PARTY', name: 'Oiseau de Nuit', description: 'Sorties et réseaux. Moral élevé mais forme variable.' }
];

export const ALL_CLUBS = [
  { id: 'FR_PSG', ovr: 85, name: 'Paris SG', origin: 'FR', primary: '#004170', secondary: '#DA291C', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_OM', ovr: 78, name: 'Marseille', origin: 'FR', primary: '#FFFFFF', secondary: '#2FAEE0', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_OL', ovr: 77, name: 'Lyon', origin: 'FR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'FR_MON', ovr: 78, name: 'Monaco', origin: 'FR', primary: '#E30613', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_LIL', ovr: 77, name: 'Lille', origin: 'FR', primary: '#E30613', secondary: '#231F20', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_LEN', ovr: 76, name: 'Lens', origin: 'FR', primary: '#ED1C24', secondary: '#FFD100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_REN', ovr: 76, name: 'Rennes', origin: 'FR', primary: '#E30613', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_NIC', ovr: 75, name: 'Nice', origin: 'FR', primary: '#ED1C24', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_REI', ovr: 74, name: 'Reims', origin: 'FR', primary: '#E30613', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_MON', ovr: 74, name: 'Montpellier', origin: 'FR', primary: '#F36C21', secondary: '#002C5B', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_TOU', ovr: 73, name: 'Toulouse', origin: 'FR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_NAN', ovr: 73, name: 'Nantes', origin: 'FR', primary: '#FFF200', secondary: '#00833D', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_STR', ovr: 73, name: 'Strasbourg', origin: 'FR', primary: '#005CA9', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_HAV', ovr: 72, name: 'Le Havre', origin: 'FR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_BRE', ovr: 75, name: 'Brest', origin: 'FR', primary: '#ED1C24', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_AUX', ovr: 71, name: 'Auxerre', origin: 'FR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_ANG', ovr: 70, name: 'Angers', origin: 'FR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'FR_SAE', ovr: 70, name: 'Saint-Étienne', origin: 'FR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'FR_MET', ovr: 70, name: 'Metz', origin: 'FR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_LOR', ovr: 71, name: 'Lorient', origin: 'FR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_CLE', ovr: 69, name: 'Clermont', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_BOR', ovr: 69, name: 'Bordeaux', origin: 'FR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_PAR', ovr: 70, name: 'Paris FC', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_ROD', ovr: 68, name: 'Rodez', origin: 'FR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_CAE', ovr: 69, name: 'Caen', origin: 'FR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_GUI', ovr: 68, name: 'Guingamp', origin: 'FR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_AMI', ovr: 68, name: 'Amiens', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_PAU', ovr: 67, name: 'Pau FC', origin: 'FR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_GRE', ovr: 68, name: 'Grenoble', origin: 'FR', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_LAV', ovr: 67, name: 'Laval', origin: 'FR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_ANN', ovr: 67, name: 'Annecy', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_AJA', ovr: 68, name: 'Ajaccio', origin: 'FR', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 2' },
  { id: 'FR_TRO', ovr: 68, name: 'Troyes', origin: 'FR', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_DUN', ovr: 66, name: 'Dunkerque', origin: 'FR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_RED', ovr: 65, name: 'Red Star', origin: 'FR', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 2' },
  { id: 'FR_MAR', ovr: 66, name: 'Martigues', origin: 'FR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Ligue 2', desc: 'Ligue 2', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ligue 2' },
  { id: 'FR_NIM', ovr: 64, name: 'Nîmes', origin: 'FR', primary: '#F36C21', secondary: '#000000', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'National 1' },
  { id: 'FR_DIJ', ovr: 64, name: 'Dijon', origin: 'FR', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'National 1' },
  { id: 'FR_CHB', ovr: 63, name: 'Châteauroux', origin: 'FR', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_ROU', ovr: 62, name: 'Rouen', origin: 'FR', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_NAN', ovr: 63, name: 'Nancy', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'National 1' },
  { id: 'FR_SOC', ovr: 64, name: 'Sochaux', origin: 'FR', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_VER', ovr: 63, name: 'Versailles', origin: 'FR', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_BOU', ovr: 64, name: 'Boulogne', origin: 'FR', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'National 1' },
  { id: 'FR_BOU', ovr: 63, name: 'Bourg-Péronnas', origin: 'FR', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_CON', ovr: 62, name: 'Concarneau', origin: 'FR', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_MAN', ovr: 63, name: 'Le Mans', origin: 'FR', primary: '#F36C21', secondary: '#000000', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'National 1' },
  { id: 'FR_ORL', ovr: 63, name: 'Orléans', origin: 'FR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_QUE', ovr: 62, name: 'QRM', origin: 'FR', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_VIL', ovr: 61, name: 'Villefranche', origin: 'FR', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_CHO', ovr: 61, name: 'Cholet', origin: 'FR', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_GOA', ovr: 61, name: 'GOAL FC', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_MAR', ovr: 62, name: 'Marignane', origin: 'FR', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'FR_EPI', ovr: 61, name: 'Épinal', origin: 'FR', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'National 1', desc: 'National 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'National 1' },
  { id: 'EN_MCI', ovr: 87, name: 'Man City', origin: 'EN', primary: '#6CABDD', secondary: '#1C2C5B', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_ARS', ovr: 85, name: 'Arsenal', origin: 'EN', primary: '#EF0107', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EN_LIV', ovr: 86, name: 'Liverpool', origin: 'EN', primary: '#C8102E', secondary: '#F6EB61', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_AST', ovr: 81, name: 'Aston Villa', origin: 'EN', primary: '#670E36', secondary: '#95BFE5', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_TOT', ovr: 83, name: 'Tottenham', origin: 'EN', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EN_CHE', ovr: 83, name: 'Chelsea', origin: 'EN', primary: '#034694', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_NEW', ovr: 82, name: 'Newcastle', origin: 'EN', primary: '#241F20', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_MUN', ovr: 83, name: 'Man United', origin: 'EN', primary: '#DA291C', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_WHU', ovr: 80, name: 'West Ham', origin: 'EN', primary: '#7A263A', secondary: '#1BB1E7', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_CRY', ovr: 77, name: 'Crystal Palace', origin: 'EN', primary: '#1B458F', secondary: '#C4122E', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_BHA', ovr: 80, name: 'Brighton', origin: 'EN', primary: '#0057B8', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_BOU', ovr: 76, name: 'Bournemouth', origin: 'EN', primary: '#DA291C', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EN_FUL', ovr: 77, name: 'Fulham', origin: 'EN', primary: '#FFFFFF', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_WOL', ovr: 78, name: 'Wolverhampton', origin: 'EN', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_EVE', ovr: 78, name: 'Everton', origin: 'EN', primary: '#003399', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EN_BRE', ovr: 77, name: 'Brentford', origin: 'EN', primary: '#E30613', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_NFO', ovr: 76, name: 'Nottm Forest', origin: 'EN', primary: '#DD0000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_LEI', ovr: 75, name: 'Leicester', origin: 'EN', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EN_IPS', ovr: 74, name: 'Ipswich Town', origin: 'EN', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EN_SOU', ovr: 74, name: 'Southampton', origin: 'EN', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EN_LEE', ovr: 76, name: 'Leeds', origin: 'EN', primary: '#FFFFFF', secondary: '#000000', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_SHU', ovr: 74, name: 'Sheff Utd', origin: 'EN', primary: '#EE2737', secondary: '#000000', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_BUR', ovr: 74, name: 'Burnley', origin: 'EN', primary: '#670E36', secondary: '#95BFE5', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_LUT', ovr: 73, name: 'Luton', origin: 'EN', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_WBA', ovr: 74, name: 'West Brom', origin: 'EN', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_NOR', ovr: 74, name: 'Norwich', origin: 'EN', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_HUL', ovr: 73, name: 'Hull City', origin: 'EN', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_MID', ovr: 73, name: 'Middlesbrough', origin: 'EN', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_COV', ovr: 73, name: 'Coventry', origin: 'EN', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_PRE', ovr: 72, name: 'Preston', origin: 'EN', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_BRI', ovr: 72, name: 'Bristol City', origin: 'EN', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_CAR', ovr: 71, name: 'Cardiff', origin: 'EN', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_SUN', ovr: 72, name: 'Sunderland', origin: 'EN', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_SWA', ovr: 71, name: 'Swansea', origin: 'EN', primary: '#FFFFFF', secondary: '#000000', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_WAT', ovr: 72, name: 'Watford', origin: 'EN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_QPR', ovr: 70, name: 'QPR', origin: 'EN', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_MIL', ovr: 70, name: 'Millwall', origin: 'EN', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_STO', ovr: 71, name: 'Stoke City', origin: 'EN', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_BLA', ovr: 71, name: 'Blackburn', origin: 'EN', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_PLY', ovr: 69, name: 'Plymouth', origin: 'EN', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_SHW', ovr: 69, name: 'Sheff Wed', origin: 'EN', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_POR', ovr: 68, name: 'Portsmouth', origin: 'EN', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Championship' },
  { id: 'EN_DER', ovr: 68, name: 'Derby County', origin: 'EN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Championship' },
  { id: 'EN_OXF', ovr: 67, name: 'Oxford Utd', origin: 'EN', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Championship', desc: 'Championship', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Championship' },
  { id: 'EN_BIR', ovr: 69, name: 'Birmingham', origin: 'EN', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_HUD', ovr: 68, name: 'Huddersfield', origin: 'EN', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_ROT', ovr: 67, name: 'Rotherham', origin: 'EN', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_BOL', ovr: 67, name: 'Bolton', origin: 'EN', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_PET', ovr: 66, name: 'Peterborough', origin: 'EN', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_BAR', ovr: 66, name: 'Barnsley', origin: 'EN', primary: '#1A5784', secondary: '#000000', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_LIN', ovr: 65, name: 'Lincoln City', origin: 'EN', primary: '#005CA8', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'League One' },
  { id: 'EN_BLA', ovr: 65, name: 'Blackpool', origin: 'EN', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_STE', ovr: 64, name: 'Stevenage', origin: 'EN', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_WYA', ovr: 64, name: 'Wycombe', origin: 'EN', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_LEY', ovr: 63, name: 'Leyton Orient', origin: 'EN', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_WIG', ovr: 65, name: 'Wigan', origin: 'EN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_CHA', ovr: 65, name: 'Charlton', origin: 'EN', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_REA', ovr: 66, name: 'Reading', origin: 'EN', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'League One' },
  { id: 'EN_EXE', ovr: 64, name: 'Exeter', origin: 'EN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'League One' },
  { id: 'EN_BRI', ovr: 63, name: 'Bristol Rovers', origin: 'EN', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_NOR', ovr: 63, name: 'Northampton', origin: 'EN', primary: '#CB3524', secondary: '#272E61', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'League One' },
  { id: 'EN_BUR', ovr: 63, name: 'Burton', origin: 'EN', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_CAM', ovr: 62, name: 'Cambridge Utd', origin: 'EN', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_SHR', ovr: 62, name: 'Shrewsbury', origin: 'EN', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'League One' },
  { id: 'EN_STO', ovr: 63, name: 'Stockport', origin: 'EN', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'League One' },
  { id: 'EN_WRE', ovr: 64, name: 'Wrexham', origin: 'EN', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'League One' },
  { id: 'EN_MAN', ovr: 62, name: 'Mansfield', origin: 'EN', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'League One' },
  { id: 'EN_CRA', ovr: 61, name: 'Crawley', origin: 'EN', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'League One', desc: 'League One', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'League One' },
  { id: 'ES_RMA', ovr: 86, name: 'Real Madrid', origin: 'ES', primary: '#FFFFFF', secondary: '#5C2D91', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'La Liga' },
  { id: 'ES_BAR', ovr: 84, name: 'Barcelona', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_ATM', ovr: 84, name: 'Atlético Madrid', origin: 'ES', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'La Liga' },
  { id: 'ES_GIR', ovr: 81, name: 'Girona', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_ATH', ovr: 81, name: 'Athletic Club', origin: 'ES', primary: '#EE2523', secondary: '#000000', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_RSO', ovr: 82, name: 'Real Sociedad', origin: 'ES', primary: '#0067B1', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_BET', ovr: 80, name: 'Real Betis', origin: 'ES', primary: '#0BB363', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_VIL', ovr: 79, name: 'Villarreal', origin: 'ES', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_VAL', ovr: 78, name: 'Valencia', origin: 'ES', primary: '#FFFFFF', secondary: '#000000', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_ALA', ovr: 76, name: 'Alavés', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_OSA', ovr: 77, name: 'Osasuna', origin: 'ES', primary: '#CA2027', secondary: '#002C5B', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_GET', ovr: 77, name: 'Getafe', origin: 'ES', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_CEL', ovr: 76, name: 'Celta Vigo', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_SEV', ovr: 77, name: 'Sevilla', origin: 'ES', primary: '#FFFFFF', secondary: '#D50032', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'La Liga' },
  { id: 'ES_MLL', ovr: 75, name: 'Mallorca', origin: 'ES', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_LPA', ovr: 75, name: 'Las Palmas', origin: 'ES', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'La Liga' },
  { id: 'ES_RAY', ovr: 75, name: 'Rayo Vallecano', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_LEG', ovr: 74, name: 'Leganés', origin: 'ES', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_VLL', ovr: 74, name: 'Valladolid', origin: 'ES', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_ESP', ovr: 74, name: 'Espanyol', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'La Liga', desc: 'La Liga', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga' },
  { id: 'ES_CAD', ovr: 74, name: 'Cádiz', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_ALM', ovr: 73, name: 'Almería', origin: 'ES', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_GRA', ovr: 73, name: 'Granada', origin: 'ES', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_EIB', ovr: 72, name: 'Eibar', origin: 'ES', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_SPO', ovr: 71, name: 'Sporting Gijón', origin: 'ES', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_OVI', ovr: 71, name: 'Real Oviedo', origin: 'ES', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_RAC', ovr: 71, name: 'Racing Santander', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_LEV', ovr: 72, name: 'Levante', origin: 'ES', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_BUR', ovr: 70, name: 'Burgos', origin: 'ES', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_RFE', ovr: 70, name: 'Racing Ferrol', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_ELC', ovr: 71, name: 'Elche', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_TEN', ovr: 70, name: 'Tenerife', origin: 'ES', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_ALB', ovr: 69, name: 'Albacete', origin: 'ES', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_ZAR', ovr: 70, name: 'Zaragoza', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_CAR', ovr: 69, name: 'Cartagena', origin: 'ES', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_ELD', ovr: 68, name: 'Eldense', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_HUE', ovr: 68, name: 'Huesca', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_MIR', ovr: 67, name: 'Mirandés', origin: 'ES', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_COR', ovr: 67, name: 'Córdoba', origin: 'ES', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_CAS', ovr: 67, name: 'Castellón', origin: 'ES', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'La Liga 2' },
  { id: 'ES_DEP', ovr: 68, name: 'Deportivo La Coruña', origin: 'ES', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'La Liga 2' },
  { id: 'ES_MAL', ovr: 68, name: 'Málaga', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'La Liga 2', desc: 'La Liga 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'La Liga 2' },
  { id: 'ES_AMO', ovr: 65, name: 'Amorebieta', origin: 'ES', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_AND', ovr: 66, name: 'Andorra', origin: 'ES', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_ALC', ovr: 65, name: 'Alcorcón', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_VIL', ovr: 65, name: 'Villarreal B', origin: 'ES', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_NAS', ovr: 64, name: 'Nàstic', origin: 'ES', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_PON', ovr: 64, name: 'Ponferradina', origin: 'ES', primary: '#1A5784', secondary: '#000000', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_IBR', ovr: 64, name: 'UD Ibiza', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_CEU', ovr: 63, name: 'Ceuta', origin: 'ES', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_CUL', ovr: 63, name: 'Cultural Leonesa', origin: 'ES', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_LOG', ovr: 62, name: 'SD Logroñés', origin: 'ES', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera Fed' },
  { id: 'ES_TAR', ovr: 62, name: 'Tarazona', origin: 'ES', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_ARE', ovr: 61, name: 'Arenteiro', origin: 'ES', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_SEV', ovr: 62, name: 'Sevilla Atlético', origin: 'ES', primary: '#CB3524', secondary: '#272E61', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_BET', ovr: 62, name: 'Betis Deportivo', origin: 'ES', primary: '#0BB363', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_HOU', ovr: 61, name: 'Recreativo Huelva', origin: 'ES', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'ES_MUR', ovr: 63, name: 'Real Murcia', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_ALC', ovr: 62, name: 'Alcoyano', origin: 'ES', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera Fed' },
  { id: 'ES_INT', ovr: 62, name: 'Intercity', origin: 'ES', primary: '#005CA8', secondary: '#000000', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_MER', ovr: 61, name: 'Mérida', origin: 'ES', primary: '#CB3524', secondary: '#272E61', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera Fed' },
  { id: 'ES_ALF', ovr: 61, name: 'Algeciras', origin: 'ES', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: 'Primera Fed.', desc: 'Primera Fed.', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Fed' },
  { id: 'IT_INT', ovr: 85, name: 'Inter Milan', origin: 'IT', primary: '#005CA8', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_MIL', ovr: 84, name: 'AC Milan', origin: 'IT', primary: '#FB090B', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_JUV', ovr: 84, name: 'Juventus', origin: 'IT', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_NAP', ovr: 82, name: 'Napoli', origin: 'IT', primary: '#12A0D7', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_ATA', ovr: 81, name: 'Atalanta', origin: 'IT', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_ROM', ovr: 80, name: 'AS Roma', origin: 'IT', primary: '#8E1F2F', secondary: '#F0BC42', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_LAZ', ovr: 79, name: 'Lazio', origin: 'IT', primary: '#87D8F7', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Serie A' },
  { id: 'IT_FIO', ovr: 78, name: 'Fiorentina', origin: 'IT', primary: '#482E92', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_BOL', ovr: 78, name: 'Bologna', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_TOR', ovr: 76, name: 'Torino', origin: 'IT', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_GEN', ovr: 75, name: 'Genoa', origin: 'IT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_MON', ovr: 74, name: 'Monza', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Serie A' },
  { id: 'IT_VER', ovr: 74, name: 'Hellas Verona', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_LEC', ovr: 73, name: 'Lecce', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_UDI', ovr: 74, name: 'Udinese', origin: 'IT', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie A' },
  { id: 'IT_EMP', ovr: 73, name: 'Empoli', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_CAG', ovr: 73, name: 'Cagliari', origin: 'IT', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Serie A' },
  { id: 'IT_PAR', ovr: 73, name: 'Parma', origin: 'IT', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Serie A' },
  { id: 'IT_COM', ovr: 74, name: 'Como', origin: 'IT', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Serie A' },
  { id: 'IT_VEN', ovr: 72, name: 'Venezia', origin: 'IT', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Serie A', desc: 'Serie A', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie A' },
  { id: 'IT_FRO', ovr: 72, name: 'Frosinone', origin: 'IT', primary: '#FDE100', secondary: '#000000', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_SAS', ovr: 73, name: 'Sassuolo', origin: 'IT', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_SAL', ovr: 71, name: 'Salernitana', origin: 'IT', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_CRE', ovr: 72, name: 'Cremonese', origin: 'IT', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Serie B' },
  { id: 'IT_CAT', ovr: 71, name: 'Catanzaro', origin: 'IT', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_PAL', ovr: 71, name: 'Palermo', origin: 'IT', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_SAM', ovr: 71, name: 'Sampdoria', origin: 'IT', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_BRE', ovr: 70, name: 'Brescia', origin: 'IT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_SUD', ovr: 69, name: 'Südtirol', origin: 'IT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_REG', ovr: 69, name: 'Reggiana', origin: 'IT', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_PIS', ovr: 69, name: 'Pisa', origin: 'IT', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Serie B' },
  { id: 'IT_CIT', ovr: 68, name: 'Cittadella', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_BAR', ovr: 68, name: 'Bari', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_SPE', ovr: 69, name: 'Spezia', origin: 'IT', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_COS', ovr: 67, name: 'Cosenza', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_MAN', ovr: 68, name: 'Mantova', origin: 'IT', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_CES', ovr: 68, name: 'Cesena', origin: 'IT', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'IT_JUV', ovr: 67, name: 'Juve Stabia', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_CAR', ovr: 66, name: 'Carrarese', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Serie B' },
  { id: 'IT_MOD', ovr: 67, name: 'Modena', origin: 'IT', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'IT_ASC', ovr: 66, name: 'Ascoli', origin: 'IT', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Serie C' },
  { id: 'IT_TER', ovr: 65, name: 'Ternana', origin: 'IT', primary: '#E32221', secondary: '#000000', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_FER', ovr: 65, name: 'Feralpisalò', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie C' },
  { id: 'IT_LEC', ovr: 64, name: 'Lecco', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_VIC', ovr: 65, name: 'Vicenza', origin: 'IT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_AVE', ovr: 65, name: 'Avellino', origin: 'IT', primary: '#E32221', secondary: '#000000', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_PAD', ovr: 64, name: 'Padova', origin: 'IT', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_BEN', ovr: 64, name: 'Benevento', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_CRO', ovr: 63, name: 'Crotone', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Serie C' },
  { id: 'IT_PES', ovr: 63, name: 'Pescara', origin: 'IT', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Serie C' },
  { id: 'IT_CAT', ovr: 64, name: 'Catania', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_TAR', ovr: 63, name: 'Taranto', origin: 'IT', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Serie C' },
  { id: 'IT_FOG', ovr: 62, name: 'Foggia', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_SPA', ovr: 63, name: 'SPAL', origin: 'IT', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_PER', ovr: 64, name: 'Perugia', origin: 'IT', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_NOV', ovr: 62, name: 'Novara', origin: 'IT', primary: '#F36C21', secondary: '#000000', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'IT_MAN', ovr: 62, name: 'Mantova', origin: 'IT', primary: '#6CABDD', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie C' },
  { id: 'IT_LUC', ovr: 61, name: 'Lucchese', origin: 'IT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Serie C' },
  { id: 'IT_GUB', ovr: 61, name: 'Gubbio', origin: 'IT', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Serie C' },
  { id: 'IT_ENT', ovr: 62, name: 'Entella', origin: 'IT', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: 'Serie C', desc: 'Serie C', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie C' },
  { id: 'DE_BAY', ovr: 86, name: 'Bayern Munich', origin: 'DE', primary: '#DC052D', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_LEV', ovr: 85, name: 'B. Leverkusen', origin: 'DE', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_DOR', ovr: 83, name: 'Dortmund', origin: 'DE', primary: '#FDE100', secondary: '#000000', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_RBL', ovr: 82, name: 'RB Leipzig', origin: 'DE', primary: '#DD013F', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_STU', ovr: 80, name: 'Stuttgart', origin: 'DE', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_FRA', ovr: 79, name: 'E. Frankfurt', origin: 'DE', primary: '#E1000F', secondary: '#000000', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_HOF', ovr: 77, name: 'Hoffenheim', origin: 'DE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_HEI', ovr: 76, name: 'Heidenheim', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_BRE', ovr: 76, name: 'W. Bremen', origin: 'DE', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_FRE', ovr: 76, name: 'Freiburg', origin: 'DE', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_AUG', ovr: 75, name: 'Augsburg', origin: 'DE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_WOL', ovr: 76, name: 'Wolfsburg', origin: 'DE', primary: '#65B32E', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_MAI', ovr: 75, name: 'Mainz 05', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_MGL', ovr: 76, name: 'M\'gladbach', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_UNI', ovr: 75, name: 'Union Berlin', origin: 'DE', primary: '#E2001A', secondary: '#FEEA00', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_BOC', ovr: 74, name: 'VfL Bochum', origin: 'DE', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Bundesliga' },
  { id: 'DE_STP', ovr: 74, name: 'St. Pauli', origin: 'DE', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_KIE', ovr: 73, name: 'Holstein Kiel', origin: 'DE', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Bundesliga', desc: 'Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Bundesliga' },
  { id: 'DE_KOL', ovr: 74, name: 'FC Köln', origin: 'DE', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_DAR', ovr: 73, name: 'Darmstadt', origin: 'DE', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_DUS', ovr: 73, name: 'Düsseldorf', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_HSV', ovr: 73, name: 'Hamburg', origin: 'DE', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_KAR', ovr: 72, name: 'Karlsruher', origin: 'DE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_HAN', ovr: 72, name: 'Hannover 96', origin: 'DE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_PAD', ovr: 71, name: 'Paderborn', origin: 'DE', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_GRE', ovr: 71, name: 'Greuther Fürth', origin: 'DE', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_HER', ovr: 72, name: 'Hertha BSC', origin: 'DE', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_SCH', ovr: 72, name: 'Schalke 04', origin: 'DE', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_ELV', ovr: 70, name: 'Elversberg', origin: 'DE', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_NUR', ovr: 70, name: 'Nürnberg', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_KAI', ovr: 70, name: 'Kaiserslautern', origin: 'DE', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_MAG', ovr: 69, name: 'Magdeburg', origin: 'DE', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_BRA', ovr: 69, name: 'Braunschweig', origin: 'DE', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_ULM', ovr: 68, name: 'SSV Ulm', origin: 'DE', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_MUN', ovr: 68, name: 'Preußen Münster', origin: 'DE', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: '2. Bundesliga' },
  { id: 'DE_REG', ovr: 67, name: 'Jahn Regensburg', origin: 'DE', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '2. Bundesliga', desc: '2. Bundesliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '2. Bundesliga' },
  { id: 'DE_OSA', ovr: 66, name: 'Osnabrück', origin: 'DE', primary: '#FFFFFF', secondary: '#DA291C', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: '3. Liga' },
  { id: 'DE_HAN', ovr: 65, name: 'Hansa Rostock', origin: 'DE', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: '3. Liga' },
  { id: 'DE_WEE', ovr: 66, name: 'Wehen Wiesbaden', origin: 'DE', primary: '#CB3524', secondary: '#272E61', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_DRE', ovr: 65, name: 'Dyn. Dresden', origin: 'DE', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_SAA', ovr: 65, name: 'Saarbrücken', origin: 'DE', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_AUE', ovr: 64, name: 'Erzgebirge Aue', origin: 'DE', primary: '#DA291C', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_ESS', ovr: 64, name: 'RW Essen', origin: 'DE', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_SAN', ovr: 64, name: 'Sandhausen', origin: 'DE', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_MUN', ovr: 63, name: '1860 Munich', origin: 'DE', primary: '#005CA8', secondary: '#FDE100', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_ING', ovr: 64, name: 'Ingolstadt', origin: 'DE', primary: '#008040', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_BIE', ovr: 63, name: 'Bielefeld', origin: 'DE', primary: '#132257', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_VER', ovr: 63, name: 'SC Verl', origin: 'DE', primary: '#E32221', secondary: '#000000', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_KOL', ovr: 63, name: 'Viktoria Köln', origin: 'DE', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_AAC', ovr: 62, name: 'Alemannia Aachen', origin: 'DE', primary: '#004170', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_STU', ovr: 62, name: 'Stuttgart II', origin: 'DE', primary: '#004D98', secondary: '#A50044', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_COT', ovr: 61, name: 'Energie Cottbus', origin: 'DE', primary: '#E32221', secondary: '#000000', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_HAN', ovr: 61, name: 'Hannover II', origin: 'DE', primary: '#000000', secondary: '#FFFFFF', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: '3. Liga' },
  { id: 'DE_DOR', ovr: 62, name: 'Dortmund II', origin: 'DE', primary: '#FDE100', secondary: '#000000', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_MAN', ovr: 63, name: 'Waldhof Mannheim', origin: 'DE', primary: '#FCE400', secondary: '#00508F', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'DE_UNT', ovr: 62, name: 'Unterhaching', origin: 'DE', primary: '#F36C21', secondary: '#000000', tier: 3, leagueName: '3. Liga', desc: '3. Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '3. Liga' },
  { id: 'PT_SPO', ovr: 79, name: 'Sporting CP', origin: 'PT', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_BEN', ovr: 79, name: 'Benfica', origin: 'PT', primary: '#ED1C24', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primeira Liga' },
  { id: 'PT_POR', ovr: 79, name: 'FC Porto', origin: 'PT', primary: '#0032A0', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'PT_BRA', ovr: 76, name: 'SC Braga', origin: 'PT', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_VGU', ovr: 74, name: 'V. Guimarães', origin: 'PT', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_MOR', ovr: 72, name: 'Moreirense', origin: 'PT', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'PT_ARO', ovr: 71, name: 'Arouca', origin: 'PT', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_FAM', ovr: 71, name: 'Famalicao', origin: 'PT', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_CAS', ovr: 70, name: 'Casa Pia', origin: 'PT', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primeira Liga' },
  { id: 'PT_FAR', ovr: 70, name: 'Farense', origin: 'PT', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'PT_RIO', ovr: 70, name: 'Rio Ave', origin: 'PT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'PT_GVI', ovr: 69, name: 'Gil Vicente', origin: 'PT', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primeira Liga' },
  { id: 'PT_EST', ovr: 69, name: 'Estoril Praia', origin: 'PT', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_ESA', ovr: 69, name: 'E. Amadora', origin: 'PT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'PT_BOA', ovr: 68, name: 'Boavista', origin: 'PT', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Primeira Liga' },
  { id: 'PT_STC', ovr: 69, name: 'Santa Clara', origin: 'PT', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_NAC', ovr: 68, name: 'Nacional', origin: 'PT', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primeira Liga' },
  { id: 'PT_AVS', ovr: 67, name: 'AVS', origin: 'PT', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primeira Liga', desc: 'Primeira Liga', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Primeira Liga' },
  { id: 'NL_PSV', ovr: 78, name: 'PSV', origin: 'NL', primary: '#F00000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_FEY', ovr: 77, name: 'Feyenoord', origin: 'NL', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_TWE', ovr: 75, name: 'Twente', origin: 'NL', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Eredivisie' },
  { id: 'NL_AZ', ovr: 74, name: 'AZ Alkmaar', origin: 'NL', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Eredivisie' },
  { id: 'NL_AJA', ovr: 75, name: 'Ajax', origin: 'NL', primary: '#D2122E', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_NEC', ovr: 72, name: 'NEC Nijmegen', origin: 'NL', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_UTR', ovr: 71, name: 'Utrecht', origin: 'NL', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_SPA', ovr: 71, name: 'Sparta Rotterdam', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_GAE', ovr: 70, name: 'Go Ahead Eagles', origin: 'NL', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_FOR', ovr: 69, name: 'Fortuna Sittard', origin: 'NL', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Eredivisie' },
  { id: 'NL_HEE', ovr: 69, name: 'Heerenveen', origin: 'NL', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_ZWO', ovr: 69, name: 'PEC Zwolle', origin: 'NL', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_ALM', ovr: 68, name: 'Almere City', origin: 'NL', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eredivisie' },
  { id: 'NL_HER', ovr: 68, name: 'Heracles', origin: 'NL', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_RKC', ovr: 67, name: 'RKC Waalwijk', origin: 'NL', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_WIL', ovr: 67, name: 'Willem II', origin: 'NL', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eredivisie' },
  { id: 'NL_GRO', ovr: 66, name: 'Groningen', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'NL_NAC', ovr: 66, name: 'NAC Breda', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Eredivisie', desc: 'Eredivisie', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Eredivisie' },
  { id: 'BE_BRU', ovr: 74, name: 'Club Brugge', origin: 'BE', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_USG', ovr: 73, name: 'Union SG', origin: 'BE', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_AND', ovr: 73, name: 'Anderlecht', origin: 'BE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_ANT', ovr: 72, name: 'Antwerp', origin: 'BE', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_CER', ovr: 71, name: 'Cercle Brugge', origin: 'BE', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_GEN', ovr: 72, name: 'Genk', origin: 'BE', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_GNT', ovr: 71, name: 'Gent', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_MEC', ovr: 70, name: 'Mechelen', origin: 'BE', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_STA', ovr: 70, name: 'Standard Liège', origin: 'BE', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_STR', ovr: 69, name: 'Sint-Truiden', origin: 'BE', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_CHA', ovr: 69, name: 'Charleroi', origin: 'BE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_OHL', ovr: 68, name: 'OH Leuven', origin: 'BE', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_WES', ovr: 68, name: 'Westerlo', origin: 'BE', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_KOR', ovr: 67, name: 'Kortrijk', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'BE_BEE', ovr: 67, name: 'Beerschot', origin: 'BE', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'BE_DEN', ovr: 66, name: 'Dender', origin: 'BE', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'TR_GAL', ovr: 77, name: 'Galatasaray', origin: 'TR', primary: '#A90432', secondary: '#FDB912', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_FEN', ovr: 77, name: 'Fenerbahçe', origin: 'TR', primary: '#003E7E', secondary: '#FFED00', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_TRA', ovr: 73, name: 'Trabzonspor', origin: 'TR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Süper Lig' },
  { id: 'TR_BES', ovr: 75, name: 'Beşiktaş', origin: 'TR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_KAS', ovr: 71, name: 'Kasımpaşa', origin: 'TR', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_BAS', ovr: 71, name: 'Başakşehir', origin: 'TR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_SIV', ovr: 70, name: 'Sivasspor', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_ALA', ovr: 69, name: 'Alanyaspor', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_RIZ', ovr: 69, name: 'Rizespor', origin: 'TR', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_ANT', ovr: 69, name: 'Antalyaspor', origin: 'TR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Süper Lig' },
  { id: 'TR_GAZ', ovr: 68, name: 'Gaziantep', origin: 'TR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_ADA', ovr: 68, name: 'Adana Demirspor', origin: 'TR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_SAM', ovr: 68, name: 'Samsunspor', origin: 'TR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_KAY', ovr: 68, name: 'Kayserispor', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Süper Lig' },
  { id: 'TR_HAT', ovr: 67, name: 'Hatayspor', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Süper Lig' },
  { id: 'TR_KON', ovr: 67, name: 'Konyaspor', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Süper Lig' },
  { id: 'TR_EYU', ovr: 69, name: 'Eyüpspor', origin: 'TR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_GOZ', ovr: 68, name: 'Göztepe', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'TR_BOD', ovr: 67, name: 'Bodrum FK', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Süper Lig', desc: 'Süper Lig', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Süper Lig' },
  { id: 'BR_PAL', ovr: 78, name: 'Palmeiras', origin: 'BR', primary: '#006437', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Série A' },
  { id: 'BR_FLA', ovr: 78, name: 'Flamengo', origin: 'BR', primary: '#C8102E', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_CAM', ovr: 76, name: 'Atlético Mineiro', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_SAO', ovr: 75, name: 'São Paulo', origin: 'BR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Série A' },
  { id: 'BR_FLU', ovr: 75, name: 'Fluminense', origin: 'BR', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_BOT', ovr: 76, name: 'Botafogo', origin: 'BR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_GRE', ovr: 74, name: 'Grêmio', origin: 'BR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série A' },
  { id: 'BR_INT', ovr: 74, name: 'Internacional', origin: 'BR', primary: '#005CA8', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_COR', ovr: 73, name: 'Corinthians', origin: 'BR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_CAP', ovr: 73, name: 'Athletico PR', origin: 'BR', primary: '#EE2523', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Série A' },
  { id: 'BR_FOR', ovr: 73, name: 'Fortaleza', origin: 'BR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_CRU', ovr: 72, name: 'Cruzeiro', origin: 'BR', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Série A' },
  { id: 'BR_BGT', ovr: 72, name: 'RB Bragantino', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Série A' },
  { id: 'BR_VAS', ovr: 72, name: 'Vasco da Gama', origin: 'BR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Série A' },
  { id: 'BR_BAH', ovr: 71, name: 'Bahia', origin: 'BR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_CUI', ovr: 69, name: 'Cuiabá', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Série A' },
  { id: 'BR_JUV', ovr: 68, name: 'Juventude', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_VIT', ovr: 68, name: 'Vitória', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Série A' },
  { id: 'BR_CRI', ovr: 67, name: 'Criciúma', origin: 'BR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'BR_ACG', ovr: 67, name: 'Atlético Goianiense', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Série A', desc: 'Série A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série A' },
  { id: 'AR_RIV', ovr: 77, name: 'River Plate', origin: 'AR', primary: '#FFFFFF', secondary: '#D1122C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'AR_BOC', ovr: 76, name: 'Boca Juniors', origin: 'AR', primary: '#00529F', secondary: '#F2A900', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_RAC', ovr: 74, name: 'Racing Club', origin: 'AR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_IND', ovr: 73, name: 'Independiente', origin: 'AR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'AR_SLO', ovr: 73, name: 'San Lorenzo', origin: 'AR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_EST', ovr: 72, name: 'Estudiantes', origin: 'AR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_VEL', ovr: 72, name: 'Vélez Sarsfield', origin: 'AR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_TAL', ovr: 72, name: 'Talleres', origin: 'AR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_DYJ', ovr: 71, name: 'Defensa y Justicia', origin: 'AR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_ROS', ovr: 71, name: 'Rosario Central', origin: 'AR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_LAN', ovr: 71, name: 'Lanús', origin: 'AR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_ARG', ovr: 70, name: 'Argentinos Juniors', origin: 'AR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_NOB', ovr: 70, name: 'Newell\'s', origin: 'AR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_BEL', ovr: 69, name: 'Belgrano', origin: 'AR', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_HUR', ovr: 70, name: 'Huracán', origin: 'AR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_GEL', ovr: 69, name: 'Gimnasia LP', origin: 'AR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_TIG', ovr: 68, name: 'Tigre', origin: 'AR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_ATU', ovr: 68, name: 'Atlético Tucumán', origin: 'AR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_BAN', ovr: 68, name: 'Banfield', origin: 'AR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_PLA', ovr: 67, name: 'Platense', origin: 'AR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_GOD', ovr: 69, name: 'Godoy Cruz', origin: 'AR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'AR_CEN', ovr: 67, name: 'Central Córdoba', origin: 'AR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'AR_SAR', ovr: 66, name: 'Sarmiento', origin: 'AR', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'AR_UNI', ovr: 68, name: 'Unión', origin: 'AR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_BAR', ovr: 66, name: 'Barracas Central', origin: 'AR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_INS', ovr: 67, name: 'Instituto', origin: 'AR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_RIE', ovr: 65, name: 'Deportivo Riestra', origin: 'AR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'AR_IND', ovr: 65, name: 'Ind. Rivadavia', origin: 'AR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'US_MIA', ovr: 75, name: 'Inter Miami', origin: 'US', primary: '#005CA8', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_LAF', ovr: 73, name: 'LAFC', origin: 'US', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_LAG', ovr: 72, name: 'LA Galaxy', origin: 'US', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_CIN', ovr: 72, name: 'FC Cincinnati', origin: 'US', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_COL', ovr: 71, name: 'Columbus Crew', origin: 'US', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_PHI', ovr: 71, name: 'Philadelphia Union', origin: 'US', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_SEA', ovr: 71, name: 'Seattle Sounders', origin: 'US', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_ATL', ovr: 70, name: 'Atlanta Utd', origin: 'US', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_NYF', ovr: 70, name: 'NYCFC', origin: 'US', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_ORL', ovr: 70, name: 'Orlando City', origin: 'US', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_NAS', ovr: 69, name: 'Nashville SC', origin: 'US', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_NEW', ovr: 69, name: 'NE Revolution', origin: 'US', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_HOU', ovr: 69, name: 'Houston Dynamo', origin: 'US', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_VAN', ovr: 68, name: 'Vancouver', origin: 'US', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_DAL', ovr: 68, name: 'FC Dallas', origin: 'US', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_RSL', ovr: 68, name: 'Real Salt Lake', origin: 'US', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_SPO', ovr: 68, name: 'Sporting KC', origin: 'US', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_POR', ovr: 68, name: 'Portland Timbers', origin: 'US', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_SJO', ovr: 67, name: 'SJ Earthquakes', origin: 'US', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_MIN', ovr: 68, name: 'Minnesota Utd', origin: 'US', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_AUS', ovr: 68, name: 'Austin FC', origin: 'US', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_CHA', ovr: 67, name: 'Charlotte FC', origin: 'US', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_CHI', ovr: 67, name: 'Chicago Fire', origin: 'US', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_NYR', ovr: 69, name: 'NY Red Bulls', origin: 'US', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_MTL', ovr: 67, name: 'CF Montréal', origin: 'US', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'MLS' },
  { id: 'US_TOR', ovr: 67, name: 'Toronto FC', origin: 'US', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_COL', ovr: 67, name: 'Colorado Rapids', origin: 'US', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'MLS' },
  { id: 'US_DCU', ovr: 67, name: 'DC United', origin: 'US', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'US_STL', ovr: 68, name: 'St. Louis City', origin: 'US', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'MLS', desc: 'MLS', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'MLS' },
  { id: 'MX_AME', ovr: 74, name: 'Club América', origin: 'MX', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_MON', ovr: 73, name: 'Monterrey', origin: 'MX', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Liga MX' },
  { id: 'MX_TIG', ovr: 73, name: 'Tigres UANL', origin: 'MX', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_CRU', ovr: 72, name: 'Cruz Azul', origin: 'MX', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Liga MX' },
  { id: 'MX_TOL', ovr: 71, name: 'Toluca', origin: 'MX', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Liga MX' },
  { id: 'MX_PAC', ovr: 71, name: 'Pachuca', origin: 'MX', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Liga MX' },
  { id: 'MX_GUA', ovr: 71, name: 'Guadalajara', origin: 'MX', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_PUM', ovr: 70, name: 'Pumas UNAM', origin: 'MX', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Liga MX' },
  { id: 'MX_LEO', ovr: 70, name: 'León', origin: 'MX', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Liga MX' },
  { id: 'MX_SAN', ovr: 69, name: 'Santos Laguna', origin: 'MX', primary: '#FFFFFF', secondary: '#000000', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Liga MX' },
  { id: 'MX_NEC', ovr: 68, name: 'Necaxa', origin: 'MX', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_QUE', ovr: 67, name: 'Querétaro', origin: 'MX', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_MAZ', ovr: 67, name: 'Mazatlán', origin: 'MX', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Liga MX' },
  { id: 'MX_ATL', ovr: 68, name: 'Atlas', origin: 'MX', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_TIJ', ovr: 68, name: 'Tijuana', origin: 'MX', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_JUA', ovr: 66, name: 'Juárez', origin: 'MX', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Liga MX' },
  { id: 'MX_PUE', ovr: 67, name: 'Puebla', origin: 'MX', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Liga MX' },
  { id: 'MX_ASL', ovr: 68, name: 'Atlético San Luis', origin: 'MX', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Liga MX', desc: 'Liga MX', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Liga MX' },
  { id: 'CO_MIL', ovr: 71, name: 'Millonarios', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_ATN', ovr: 71, name: 'Atlético Nacional', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_JUN', ovr: 70, name: 'Junior', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_AME', ovr: 70, name: 'América de Cali', origin: 'CO', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_MED', ovr: 69, name: 'Indep. Medellín', origin: 'CO', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_SAN', ovr: 69, name: 'Santa Fe', origin: 'CO', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_TOL', ovr: 69, name: 'Tolima', origin: 'CO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_ONC', ovr: 68, name: 'Once Caldas', origin: 'CO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_BUC', ovr: 68, name: 'Bucaramanga', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_PER', ovr: 67, name: 'Deportivo Pereira', origin: 'CO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_CAL', ovr: 67, name: 'Deportivo Cali', origin: 'CO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_EQU', ovr: 67, name: 'La Equidad', origin: 'CO', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_AGU', ovr: 67, name: 'Águilas Doradas', origin: 'CO', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_PAS', ovr: 66, name: 'Pasto', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_BOY', ovr: 66, name: 'Boyacá Chicó', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Primera A' },
  { id: 'CO_ENV', ovr: 65, name: 'Envigado', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera A' },
  { id: 'CO_FOR', ovr: 66, name: 'Fortaleza CEIF', origin: 'CO', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Primera A' },
  { id: 'CO_JAG', ovr: 65, name: 'Jaguares', origin: 'CO', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_PAT', ovr: 65, name: 'Patriotas', origin: 'CO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'CO_ALI', ovr: 66, name: 'Alianza FC', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera A', desc: 'Primera A', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera A' },
  { id: 'SA_HIL', ovr: 76, name: 'Al Hilal', origin: 'SA', primary: '#00529F', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_NAS', ovr: 75, name: 'Al Nassr', origin: 'SA', primary: '#FFD700', secondary: '#00529F', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_AHL', ovr: 74, name: 'Al Ahli', origin: 'SA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_ITT', ovr: 74, name: 'Al Ittihad', origin: 'SA', primary: '#FDB913', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_SHA', ovr: 72, name: 'Al Shabab', origin: 'SA', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_TAA', ovr: 71, name: 'Al Taawoun', origin: 'SA', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'SA_ETT', ovr: 71, name: 'Al Ettifaq', origin: 'SA', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_FAY', ovr: 70, name: 'Al Fayha', origin: 'SA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_FAT', ovr: 69, name: 'Al Fateh', origin: 'SA', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_DAM', ovr: 69, name: 'Damac', origin: 'SA', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_KHA', ovr: 68, name: 'Al Khaleej', origin: 'SA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_RAE', ovr: 68, name: 'Al Raed', origin: 'SA', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_RIY', ovr: 67, name: 'Al Riyadh', origin: 'SA', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'SA_WHD', ovr: 67, name: 'Al Wehda', origin: 'SA', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_AKH', ovr: 66, name: 'Al Akhdoud', origin: 'SA', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'SA_QAD', ovr: 68, name: 'Al Qadsiah', origin: 'SA', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'SA_ORO', ovr: 67, name: 'Al Orobah', origin: 'SA', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'SA_KHO', ovr: 66, name: 'Al Kholood', origin: 'SA', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JP_VIS', ovr: 70, name: 'Vissel Kobe', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_YOK', ovr: 69, name: 'Yokohama FM', origin: 'JP', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_KAW', ovr: 69, name: 'Kawasaki Frontale', origin: 'JP', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_URA', ovr: 68, name: 'Urawa Reds', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_SAN', ovr: 68, name: 'Sanfrecce Hiroshima', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_KAS', ovr: 68, name: 'Kashima Antlers', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_CER', ovr: 67, name: 'Cerezo Osaka', origin: 'JP', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_GAM', ovr: 67, name: 'Gamba Osaka', origin: 'JP', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_NAG', ovr: 66, name: 'Nagoya Grampus', origin: 'JP', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_TOK', ovr: 66, name: 'FC Tokyo', origin: 'JP', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_AVI', ovr: 66, name: 'Avispa Fukuoka', origin: 'JP', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_SAG', ovr: 65, name: 'Sagan Tosu', origin: 'JP', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_KYO', ovr: 65, name: 'Kyoto Sanga', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_NII', ovr: 65, name: 'Albirex Niigata', origin: 'JP', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_SAP', ovr: 64, name: 'Consadole Sapporo', origin: 'JP', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_SHO', ovr: 64, name: 'Shonan Bellmare', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'J1 League' },
  { id: 'JP_JUB', ovr: 65, name: 'Jubilo Iwata', origin: 'JP', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_MAC', ovr: 66, name: 'Machida Zelvia', origin: 'JP', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'J1 League' },
  { id: 'JP_VER', ovr: 65, name: 'Tokyo Verdy', origin: 'JP', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'JP_KAS', ovr: 64, name: 'Kashiwa Reysol', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'J1 League', desc: 'J1 League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'J1 League' },
  { id: 'AU_MEL', ovr: 69, name: 'Melbourne City', origin: 'AU', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'A-League' },
  { id: 'AU_SYD', ovr: 68, name: 'Sydney FC', origin: 'AU', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'A-League' },
  { id: 'AU_WES', ovr: 67, name: 'Western Sydney', origin: 'AU', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'A-League' },
  { id: 'AU_CEN', ovr: 67, name: 'Central Coast', origin: 'AU', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'A-League' },
  { id: 'AU_MAC', ovr: 66, name: 'Macarthur FC', origin: 'AU', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'A-League' },
  { id: 'AU_ADE', ovr: 66, name: 'Adelaide United', origin: 'AU', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'A-League' },
  { id: 'AU_VIC', ovr: 67, name: 'Melbourne Victory', origin: 'AU', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'A-League' },
  { id: 'AU_WEL', ovr: 65, name: 'Wellington Phoenix', origin: 'AU', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'A-League' },
  { id: 'AU_BRI', ovr: 65, name: 'Brisbane Roar', origin: 'AU', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'A-League' },
  { id: 'AU_PER', ovr: 64, name: 'Perth Glory', origin: 'AU', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'A-League' },
  { id: 'AU_NEW', ovr: 64, name: 'Newcastle Jets', origin: 'AU', primary: '#241F20', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'A-League' },
  { id: 'AU_WUN', ovr: 65, name: 'Western United', origin: 'AU', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'A-League', desc: 'A-League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'A-League' },
  { id: 'EG_AHL', ovr: 74, name: 'Al Ahly', origin: 'EG', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EG_ZAM', ovr: 73, name: 'Zamalek', origin: 'EG', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EG_PYR', ovr: 72, name: 'Pyramids FC', origin: 'EG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_FUT', ovr: 70, name: 'Modern Future', origin: 'EG', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_MAS', ovr: 69, name: 'Al Masry', origin: 'EG', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_ITT', ovr: 68, name: 'Al Ittihad Alex', origin: 'EG', primary: '#FDB913', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EG_SMO', ovr: 68, name: 'Smouha', origin: 'EG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_ENP', ovr: 67, name: 'ENPPI', origin: 'EG', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_CER', ovr: 67, name: 'Ceramica Cleopatra', origin: 'EG', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_ZED', ovr: 68, name: 'ZED FC', origin: 'EG', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_TGE', ovr: 67, name: 'Tala\'ea El Gaish', origin: 'EG', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_ISL', ovr: 66, name: 'Ismaily', origin: 'EG', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'EG_NAT', ovr: 66, name: 'National Bank', origin: 'EG', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_GOU', ovr: 65, name: 'El Gouna', origin: 'EG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_MOK', ovr: 65, name: 'Al Mokawloon', origin: 'EG', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_BAL', ovr: 64, name: 'Baladiyat', origin: 'EG', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'EG_FAR', ovr: 65, name: 'Pharco FC', origin: 'EG', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'EG_DAK', ovr: 64, name: 'El Dakhleya', origin: 'EG', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'ZA_SUN', ovr: 74, name: 'Mamelodi Sundowns', origin: 'ZA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premiership' },
  { id: 'ZA_ORL', ovr: 72, name: 'Orlando Pirates', origin: 'ZA', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premiership' },
  { id: 'ZA_KAI', ovr: 71, name: 'Kaizer Chiefs', origin: 'ZA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_SUP', ovr: 70, name: 'SuperSport Utd', origin: 'ZA', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_STE', ovr: 69, name: 'Stellenbosch', origin: 'ZA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_CAP', ovr: 68, name: 'Cape Town City', origin: 'ZA', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premiership' },
  { id: 'ZA_AMA', ovr: 67, name: 'AmaZulu', origin: 'ZA', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premiership' },
  { id: 'ZA_TSG', ovr: 67, name: 'TS Galaxy', origin: 'ZA', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_SEC', ovr: 66, name: 'Sekhukhune Utd', origin: 'ZA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_GOL', ovr: 66, name: 'Golden Arrows', origin: 'ZA', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premiership' },
  { id: 'ZA_ROY', ovr: 66, name: 'Royal AM', origin: 'ZA', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_MOR', ovr: 65, name: 'Moroka Swallows', origin: 'ZA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premiership' },
  { id: 'ZA_CHI', ovr: 65, name: 'Chippa United', origin: 'ZA', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_POL', ovr: 65, name: 'Polokwane City', origin: 'ZA', primary: '#005CA8', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_RIC', ovr: 64, name: 'Richards Bay', origin: 'ZA', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'ZA_MAG', ovr: 64, name: 'Magesi FC', origin: 'ZA', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'MA_RAJ', ovr: 72, name: 'Raja CA', origin: 'MA', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola Pro' },
  { id: 'MA_WYD', ovr: 72, name: 'Wydad AC', origin: 'MA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_FAR', ovr: 71, name: 'AS FAR', origin: 'MA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Botola Pro' },
  { id: 'MA_RSB', ovr: 70, name: 'RS Berkane', origin: 'MA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_FUS', ovr: 69, name: 'FUS Rabat', origin: 'MA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola Pro' },
  { id: 'MA_OCS', ovr: 68, name: 'Olympic Safi', origin: 'MA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_MAS', ovr: 67, name: 'Maghreb AS', origin: 'MA', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_HUSA', ovr: 67, name: 'Hassania Agadir', origin: 'MA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Botola Pro' },
  { id: 'MA_IRT', ovr: 67, name: 'IR Tanger', origin: 'MA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Botola Pro' },
  { id: 'MA_MCO', ovr: 66, name: 'MC Oujda', origin: 'MA', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_SCCM', ovr: 66, name: 'Chabab Mohammédia', origin: 'MA', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola Pro' },
  { id: 'MA_UTS', ovr: 66, name: 'Union Touarga', origin: 'MA', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Botola Pro' },
  { id: 'MA_RCAZ', ovr: 65, name: 'Renaissance Zemamra', origin: 'MA', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_YBA', ovr: 65, name: 'Youssoufia Berrechid', origin: 'MA', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_MAT', ovr: 66, name: 'Moghreb Tétouan', origin: 'MA', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Botola Pro' },
  { id: 'MA_JSS', ovr: 65, name: 'JS Soualem', origin: 'MA', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Botola Pro', desc: 'Botola Pro', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Botola Pro' },
  { id: 'PS_SHA', ovr: 64, name: 'Shabab Al-Khalil', origin: 'PS', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'PS_JAB', ovr: 64, name: 'Jabal Al-Mukaber', origin: 'PS', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'PS_HIL', ovr: 63, name: 'Hilal Al-Quds', origin: 'PS', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'PS_BAL', ovr: 62, name: 'Markaz Balata', origin: 'PS', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'PS_DHA', ovr: 62, name: 'Shabab Al-Dhahiriya', origin: 'PS', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'PS_SAM', ovr: 61, name: 'Shabab Alsamu', origin: 'PS', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'PS_THA', ovr: 61, name: 'Thaqafi Tulkarm', origin: 'PS', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'PS_AHL', ovr: 61, name: 'Ahli Al-Khaleel', origin: 'PS', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'PS_WAD', ovr: 60, name: 'Taraji Wadi Al-Nes', origin: 'PS', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'PS_AMA', ovr: 62, name: 'Shabab Al-Am\'ari', origin: 'PS', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'PS_TUL', ovr: 60, name: 'Markaz Tulkarm', origin: 'PS', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'PS_QAL', ovr: 59, name: 'Islami Qalqilya', origin: 'PS', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'West Bank Premier League', desc: 'West Bank Premier League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GR_OLY', ovr: 73, name: 'Olympiacos', origin: 'GR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_PAO', ovr: 72, name: 'Panathinaikos', origin: 'GR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_AEK', ovr: 72, name: 'AEK Athens', origin: 'GR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_PAOK', ovr: 72, name: 'PAOK', origin: 'GR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_ARI', ovr: 69, name: 'Aris', origin: 'GR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_OFI', ovr: 66, name: 'OFI Crete', origin: 'GR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_AST', ovr: 66, name: 'Asteras Tripolis', origin: 'GR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_ATR', ovr: 65, name: 'Atromitos', origin: 'GR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_VOL', ovr: 65, name: 'Volos NFC', origin: 'GR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_PAS', ovr: 64, name: 'PAS Giannina', origin: 'GR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_PAN', ovr: 64, name: 'Panetolikos', origin: 'GR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_LAM', ovr: 63, name: 'Lamia', origin: 'GR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'GR_KIF', ovr: 63, name: 'Kifisia', origin: 'GR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'GR_PNS', ovr: 63, name: 'Panserraikos', origin: 'GR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'CH_YB', ovr: 73, name: 'Young Boys', origin: 'CH', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'CH_SER', ovr: 72, name: 'Servette', origin: 'CH', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'CH_BAS', ovr: 71, name: 'FC Basel', origin: 'CH', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'CH_ZUR', ovr: 71, name: 'FC Zürich', origin: 'CH', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'CH_LUG', ovr: 70, name: 'FC Lugano', origin: 'CH', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'CH_STG', ovr: 70, name: 'St. Gallen', origin: 'CH', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'CH_LUZ', ovr: 69, name: 'FC Luzern', origin: 'CH', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'CH_GCZ', ovr: 67, name: 'Grasshoppers', origin: 'CH', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'CH_WIN', ovr: 67, name: 'Winterthur', origin: 'CH', primary: '#005CA8', secondary: '#000000', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'CH_LAU', ovr: 67, name: 'Lausanne-Sport', origin: 'CH', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'CH_YVE', ovr: 66, name: 'Yverdon-Sport', origin: 'CH', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'CH_SLO', ovr: 65, name: 'Stade L. Ouchy', origin: 'CH', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'DK_CPH', ovr: 74, name: 'Copenhagen', origin: 'DK', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_MID', ovr: 73, name: 'Midtjylland', origin: 'DK', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Superliga' },
  { id: 'DK_BRO', ovr: 72, name: 'Brøndby', origin: 'DK', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Superliga' },
  { id: 'DK_NOR', ovr: 71, name: 'Nordsjælland', origin: 'DK', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_AGF', ovr: 70, name: 'AGF Aarhus', origin: 'DK', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_SIL', ovr: 69, name: 'Silkeborg', origin: 'DK', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_OB', ovr: 68, name: 'Odense BK', origin: 'DK', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_RAN', ovr: 68, name: 'Randers FC', origin: 'DK', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Superliga' },
  { id: 'DK_VIB', ovr: 68, name: 'Viborg FF', origin: 'DK', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_LYN', ovr: 66, name: 'Lyngby', origin: 'DK', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Superliga' },
  { id: 'DK_VEJ', ovr: 66, name: 'Vejle BK', origin: 'DK', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'DK_HVI', ovr: 65, name: 'Hvidovre', origin: 'DK', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Superliga', desc: 'Superliga', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Superliga' },
  { id: 'NO_BOD', ovr: 71, name: 'Bodø/Glimt', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Eliteserien' },
  { id: 'NO_MOL', ovr: 70, name: 'Molde', origin: 'NO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_BRA', ovr: 69, name: 'Brann', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_TRO', ovr: 68, name: 'Tromsø', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_VIK', ovr: 68, name: 'Viking', origin: 'NO', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Eliteserien' },
  { id: 'NO_LIL', ovr: 67, name: 'Lillestrøm', origin: 'NO', primary: '#E30613', secondary: '#231F20', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Eliteserien' },
  { id: 'NO_ROS', ovr: 67, name: 'Rosenborg', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_SRP', ovr: 66, name: 'Sarpsborg 08', origin: 'NO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_SIF', ovr: 66, name: 'Strømsgodset', origin: 'NO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Eliteserien' },
  { id: 'NO_ODD', ovr: 65, name: 'Odd', origin: 'NO', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_KFU', ovr: 65, name: 'KFUM Oslo', origin: 'NO', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_HAM', ovr: 65, name: 'HamKam', origin: 'NO', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_FKH', ovr: 64, name: 'Haugesund', origin: 'NO', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_SAN', ovr: 64, name: 'Sandefjord', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Eliteserien' },
  { id: 'NO_FFK', ovr: 64, name: 'Fredrikstad', origin: 'NO', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'NO_KRI', ovr: 64, name: 'Kristiansund', origin: 'NO', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Eliteserien', desc: 'Eliteserien', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Eliteserien' },
  { id: 'PL_LEG', ovr: 70, name: 'Legia Warsaw', origin: 'PL', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_RAK', ovr: 70, name: 'Raków Częstochowa', origin: 'PL', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_LPO', ovr: 69, name: 'Lech Poznań', origin: 'PL', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_POG', ovr: 68, name: 'Pogoń Szczecin', origin: 'PL', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_JAG', ovr: 67, name: 'Jagiellonia', origin: 'PL', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_SLA', ovr: 67, name: 'Śląsk Wrocław', origin: 'PL', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_ZAG', ovr: 66, name: 'Zagłębie Lubin', origin: 'PL', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_PIA', ovr: 66, name: 'Piast Gliwice', origin: 'PL', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_GOR', ovr: 65, name: 'Górnik Zabrze', origin: 'PL', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_CRA', ovr: 65, name: 'Cracovia', origin: 'PL', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_WID', ovr: 65, name: 'Widzew Łódź', origin: 'PL', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_RAD', ovr: 64, name: 'Radomiak Radom', origin: 'PL', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_WAR', ovr: 64, name: 'Warta Poznań', origin: 'PL', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_KOR', ovr: 63, name: 'Korona Kielce', origin: 'PL', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_STA', ovr: 63, name: 'Stal Mielec', origin: 'PL', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Ekstraklasa' },
  { id: 'PL_PUS', ovr: 63, name: 'Puszcza Niepołomice', origin: 'PL', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_LKS', ovr: 62, name: 'ŁKS Łódź', origin: 'PL', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'PL_RUC', ovr: 62, name: 'Ruch Chorzów', origin: 'PL', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ekstraklasa', desc: 'Ekstraklasa', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ekstraklasa' },
  { id: 'HR_DIN', ovr: 74, name: 'Dinamo Zagreb', origin: 'HR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'HNL' },
  { id: 'HR_HAJ', ovr: 72, name: 'Hajduk Split', origin: 'HR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'HNL' },
  { id: 'HR_RIJ', ovr: 70, name: 'Rijeka', origin: 'HR', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'HNL' },
  { id: 'HR_OSI', ovr: 68, name: 'Osijek', origin: 'HR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'HNL' },
  { id: 'HR_LOK', ovr: 66, name: 'Lokomotiva', origin: 'HR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'HNL' },
  { id: 'HR_GOR', ovr: 65, name: 'Gorica', origin: 'HR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'HNL' },
  { id: 'HR_SLA', ovr: 64, name: 'Slaven Belupo', origin: 'HR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'HNL' },
  { id: 'HR_VAR', ovr: 64, name: 'Varaždin', origin: 'HR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'HNL' },
  { id: 'HR_IST', ovr: 63, name: 'Istra 1961', origin: 'HR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'HNL' },
  { id: 'HR_RUD', ovr: 63, name: 'Rudeš', origin: 'HR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'HNL', desc: 'HNL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'HNL' },
  { id: 'UY_PEN', ovr: 71, name: 'Peñarol', origin: 'UY', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_NAC', ovr: 71, name: 'Nacional', origin: 'UY', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_DEF', ovr: 68, name: 'Defensor Sp.', origin: 'UY', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_LIV', ovr: 68, name: 'Liverpool (URU)', origin: 'UY', primary: '#C8102E', secondary: '#F6EB61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'UY_DAN', ovr: 67, name: 'Danubio', origin: 'UY', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_WAN', ovr: 67, name: 'Wanderers', origin: 'UY', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_RIV', ovr: 66, name: 'River Plate (URU)', origin: 'UY', primary: '#FFFFFF', secondary: '#D1122C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_CER', ovr: 65, name: 'Cerro', origin: 'UY', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_FEN', ovr: 65, name: 'Fénix', origin: 'UY', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera División' },
  { id: 'UY_BOS', ovr: 65, name: 'Boston River', origin: 'UY', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_MCT', ovr: 64, name: 'MC Torque', origin: 'UY', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_RAM', ovr: 64, name: 'Rampla Juniors', origin: 'UY', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_PRO', ovr: 64, name: 'Progreso', origin: 'UY', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_RAC', ovr: 63, name: 'Racing (URU)', origin: 'UY', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'UY_DEP', ovr: 63, name: 'Dep. Maldonado', origin: 'UY', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera División' },
  { id: 'UY_MIR', ovr: 62, name: 'Miramar Misiones', origin: 'UY', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Primera División', desc: 'Primera División', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera División' },
  { id: 'EC_IDV', ovr: 71, name: 'Independiente del Valle', origin: 'EC', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'LigaPro' },
  { id: 'EC_LDU', ovr: 70, name: 'LDU Quito', origin: 'EC', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'LigaPro' },
  { id: 'EC_BSC', ovr: 70, name: 'Barcelona SC', origin: 'EC', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_EME', ovr: 69, name: 'Emelec', origin: 'EC', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'LigaPro' },
  { id: 'EC_AUC', ovr: 68, name: 'Aucas', origin: 'EC', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_CAT', ovr: 67, name: 'U. Católica', origin: 'EC', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_DEL', ovr: 66, name: 'Delfín', origin: 'EC', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_CUE', ovr: 66, name: 'Dep. Cuenca', origin: 'EC', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'LigaPro' },
  { id: 'EC_MAC', ovr: 65, name: 'Macará', origin: 'EC', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'LigaPro' },
  { id: 'EC_MUS', ovr: 65, name: 'Mushuc Runa', origin: 'EC', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'LigaPro' },
  { id: 'EC_ORE', ovr: 64, name: 'Orense', origin: 'EC', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'LigaPro' },
  { id: 'EC_TEC', ovr: 64, name: 'Técnico Universitario', origin: 'EC', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_CUM', ovr: 63, name: 'Cumbayá', origin: 'EC', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_ELN', ovr: 63, name: 'El Nacional', origin: 'EC', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_LIB', ovr: 62, name: 'Libertad FC', origin: 'EC', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'LigaPro' },
  { id: 'EC_IMB', ovr: 62, name: 'Imbabura', origin: 'EC', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'LigaPro', desc: 'LigaPro', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'LigaPro' },
  { id: 'KR_ULS', ovr: 71, name: 'Ulsan HD', origin: 'KR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'K League 1' },
  { id: 'KR_JEO', ovr: 70, name: 'Jeonbuk Hyundai', origin: 'KR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'K League 1' },
  { id: 'KR_POH', ovr: 69, name: 'Pohang Steelers', origin: 'KR', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'K League 1' },
  { id: 'KR_SEO', ovr: 68, name: 'FC Seoul', origin: 'KR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'K League 1' },
  { id: 'KR_GWA', ovr: 68, name: 'Gwangju FC', origin: 'KR', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'K League 1' },
  { id: 'KR_DAE', ovr: 67, name: 'Daegu FC', origin: 'KR', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'K League 1' },
  { id: 'KR_INC', ovr: 67, name: 'Incheon Utd', origin: 'KR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'K League 1' },
  { id: 'KR_JEJ', ovr: 66, name: 'Jeju United', origin: 'KR', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'K League 1' },
  { id: 'KR_DAE', ovr: 66, name: 'Daejeon Hana', origin: 'KR', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'K League 1' },
  { id: 'KR_SUW', ovr: 65, name: 'Suwon FC', origin: 'KR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'K League 1' },
  { id: 'KR_GAN', ovr: 64, name: 'Gangwon FC', origin: 'KR', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'K League 1' },
  { id: 'KR_GIM', ovr: 64, name: 'Gimcheon Sangmu', origin: 'KR', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'K League 1', desc: 'K League 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'K League 1' },
  { id: 'QA_SAD', ovr: 73, name: 'Al Sadd', origin: 'QA', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_DUH', ovr: 72, name: 'Al Duhail', origin: 'QA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'QA_RAY', ovr: 69, name: 'Al Rayyan', origin: 'QA', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_WAK', ovr: 68, name: 'Al Wakrah', origin: 'QA', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'QA_GHA', ovr: 68, name: 'Al Gharafa', origin: 'QA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_ARA', ovr: 67, name: 'Al Arabi', origin: 'QA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'QA_AHL', ovr: 66, name: 'Al Ahli (QAT)', origin: 'QA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'QA_QAT', ovr: 66, name: 'Qatar SC', origin: 'QA', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'QA_UMM', ovr: 65, name: 'Umm Salal', origin: 'QA', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_SHA', ovr: 64, name: 'Al Shamal', origin: 'QA', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_MAR', ovr: 64, name: 'Al Markhiya', origin: 'QA', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'QA_MUA', ovr: 63, name: 'Muaither', origin: 'QA', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'AE_AIN', ovr: 70, name: 'Al Ain', origin: 'AE', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'AE_SHA', ovr: 69, name: 'Shabab Al Ahli', origin: 'AE', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'AE_WAS', ovr: 68, name: 'Al Wasl', origin: 'AE', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'AE_SHJ', ovr: 68, name: 'Sharjah', origin: 'AE', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'AE_WAH', ovr: 67, name: 'Al Wahda', origin: 'AE', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'AE_JAZ', ovr: 67, name: 'Al Jazira', origin: 'AE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'AE_NAS', ovr: 66, name: 'Al Nasr (UAE)', origin: 'AE', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'AE_BAT', ovr: 65, name: 'Al Bataeh', origin: 'AE', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'AE_KAL', ovr: 64, name: 'Ittihad Kalba', origin: 'AE', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'AE_AJM', ovr: 64, name: 'Ajman', origin: 'AE', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'AE_BYS', ovr: 63, name: 'Baniyas', origin: 'AE', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'AE_KHO', ovr: 63, name: 'Khor Fakkan', origin: 'AE', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'AE_HMC', ovr: 62, name: 'Hatta', origin: 'AE', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'AE_EMI', ovr: 62, name: 'Emirates Club', origin: 'AE', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_PER', ovr: 71, name: 'Persepolis', origin: 'IR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_EST', ovr: 70, name: 'Esteghlal', origin: 'IR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_SEP', ovr: 69, name: 'Sepahan', origin: 'IR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'IR_TRA', ovr: 68, name: 'Tractor SC', origin: 'IR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_GOL', ovr: 67, name: 'Gol Gohar', origin: 'IR', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_MAL', ovr: 66, name: 'Malavan', origin: 'IR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_ZOB', ovr: 66, name: 'Zob Ahan', origin: 'IR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_ALU', ovr: 65, name: 'Aluminium Arak', origin: 'IR', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_MES', ovr: 65, name: 'Mes Rafsanjan', origin: 'IR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_SHM', ovr: 64, name: 'Shams Azar', origin: 'IR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_PAY', ovr: 64, name: 'Paykan', origin: 'IR', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'IR_FUL', ovr: 63, name: 'Foolad', origin: 'IR', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_HOV', ovr: 63, name: 'Havadar', origin: 'IR', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'IR_NAS', ovr: 62, name: 'Nassaji', origin: 'IR', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_SAN', ovr: 62, name: 'Sanat Naft', origin: 'IR', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'IR_ESTK', ovr: 61, name: 'Est. Khuzestan', origin: 'IR', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'IQ_QAW', ovr: 66, name: 'Al-Quwa Al-Jawiya', origin: 'IQ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_SHO', ovr: 67, name: 'Al-Shorta', origin: 'IQ', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_ZAW', ovr: 65, name: 'Al-Zawraa', origin: 'IQ', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_TAL', ovr: 64, name: 'Al-Talaba', origin: 'IQ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_ZAK', ovr: 64, name: 'Zakho', origin: 'IQ', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'IQ_NAJ', ovr: 63, name: 'Al-Najaf', origin: 'IQ', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_MIN', ovr: 63, name: 'Al-Minaa', origin: 'IQ', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_ERB', ovr: 62, name: 'Erbil', origin: 'IQ', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_NAF', ovr: 62, name: 'Al-Naft', origin: 'IQ', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_KAR', ovr: 61, name: 'Karbala', origin: 'IQ', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_HUD', ovr: 61, name: 'Al-Hudood', origin: 'IQ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_NFS', ovr: 60, name: 'Naft Al-Basra', origin: 'IQ', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_DIW', ovr: 60, name: 'Al-Diwaniya', origin: 'IQ', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'IQ_AMA', ovr: 59, name: 'Naft Maysan', origin: 'IQ', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'IQ_QAS', ovr: 59, name: 'Al-Qasim', origin: 'IQ', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_SAM', ovr: 58, name: 'Samarra', origin: 'IQ', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_AMN', ovr: 61, name: 'Amanat Baghdad', origin: 'IQ', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Stars League' },
  { id: 'IQ_SIN', ovr: 60, name: 'Al-Sinaa', origin: 'IQ', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Stars League' },
  { id: 'IQ_KAH', ovr: 60, name: 'Al-Kahrabaa', origin: 'IQ', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'IQ_NOR', ovr: 59, name: 'Newroz', origin: 'IQ', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Stars League', desc: 'Stars League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Stars League' },
  { id: 'UZ_PAK', ovr: 67, name: 'Pakhtakor', origin: 'UZ', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'UZ_NAV', ovr: 65, name: 'Navbahor', origin: 'UZ', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'UZ_NAS', ovr: 64, name: 'Nasaf', origin: 'UZ', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'UZ_NEF', ovr: 63, name: 'Neftchi', origin: 'UZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'UZ_AGM', ovr: 62, name: 'AGMK', origin: 'UZ', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'UZ_SOG', ovr: 61, name: 'Sogdiana', origin: 'UZ', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'UZ_OLY', ovr: 61, name: 'Olympic Tashkent', origin: 'UZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'UZ_SUR', ovr: 60, name: 'Surkhon', origin: 'UZ', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'UZ_BUN', ovr: 60, name: 'Bunyodkor', origin: 'UZ', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'UZ_AND', ovr: 59, name: 'Andijan', origin: 'UZ', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'UZ_QIZ', ovr: 59, name: 'Qizilqum', origin: 'UZ', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'UZ_MET', ovr: 58, name: 'Metallurg Bekabad', origin: 'UZ', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Super League' },
  { id: 'UZ_LOK', ovr: 58, name: 'Lokomotiv Tashkent', origin: 'UZ', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Super League' },
  { id: 'UZ_DIN', ovr: 57, name: 'Dinamo Samarkand', origin: 'UZ', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Super League', desc: 'Super League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Super League' },
  { id: 'DZ_CRB', ovr: 71, name: 'CR Belouizdad', origin: 'DZ', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'DZ_MCA', ovr: 70, name: 'MC Alger', origin: 'DZ', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_CSC', ovr: 69, name: 'CS Constantine', origin: 'DZ', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_USM', ovr: 68, name: 'USM Alger', origin: 'DZ', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'DZ_PAC', ovr: 67, name: 'Paradou AC', origin: 'DZ', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_JSS', ovr: 66, name: 'JS Saoura', origin: 'DZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'DZ_ESS', ovr: 66, name: 'ES Sétif', origin: 'DZ', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_JSK', ovr: 65, name: 'JS Kabylie', origin: 'DZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'DZ_MCO', ovr: 65, name: 'MC Oran', origin: 'DZ', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_NCM', ovr: 64, name: 'NC Magra', origin: 'DZ', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_ASO', ovr: 64, name: 'ASO Chlef', origin: 'DZ', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'DZ_USB', ovr: 63, name: 'US Biskra', origin: 'DZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'DZ_USS', ovr: 63, name: 'USM Khenchela', origin: 'DZ', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'DZ_MCE', ovr: 62, name: 'MC El Bayadh', origin: 'DZ', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'DZ_ESB', ovr: 62, name: 'ES Ben Aknoun', origin: 'DZ', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'DZ_USS', ovr: 61, name: 'US Souf', origin: 'DZ', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'SN_DIA', ovr: 66, name: 'ASC Diaraf', origin: 'SN', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_GEN', ovr: 65, name: 'Génération Foot', origin: 'SN', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_TEU', ovr: 64, name: 'Teungueth FC', origin: 'SN', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_PIK', ovr: 63, name: 'AS Pikine', origin: 'SN', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_GUE', ovr: 63, name: 'Guédiawaye FC', origin: 'SN', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_DSC', ovr: 62, name: 'Dakar Sacré-Cœur', origin: 'SN', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_CAS', ovr: 62, name: 'Casa Sports', origin: 'SN', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_LIN', ovr: 61, name: 'La Linguère', origin: 'SN', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_USG', ovr: 61, name: 'US Gorée', origin: 'SN', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'SN_SON', ovr: 60, name: 'Sonacos', origin: 'SN', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_JMD', ovr: 60, name: 'Jamono Fatick', origin: 'SN', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_OUA', ovr: 59, name: 'US Ouakam', origin: 'SN', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_DIA', ovr: 59, name: 'Diambars FC', origin: 'SN', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'SN_STD', ovr: 58, name: 'Stade de Mbour', origin: 'SN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CD_MAZ', ovr: 72, name: 'TP Mazembe', origin: 'CD', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_VIT', ovr: 70, name: 'AS Vita Club', origin: 'CD', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_MOT', ovr: 68, name: 'DC Motema Pembe', origin: 'CD', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_MAN', ovr: 67, name: 'AS Maniema Union', origin: 'CD', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_LUP', ovr: 66, name: 'FC Saint-Éloi Lupopo', origin: 'CD', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_DON', ovr: 65, name: 'CS Don Bosco', origin: 'CD', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_RAN', ovr: 64, name: 'AS Rangers', origin: 'CD', primary: '#0033A0', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_DAU', ovr: 63, name: 'AS Dauphins Noirs', origin: 'CD', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_KUV', ovr: 63, name: 'AS Kuya Sport', origin: 'CD', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_BAZ', ovr: 62, name: 'JS Groupe Bazano', origin: 'CD', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Linafoot' },
  { id: 'CD_LUU', ovr: 62, name: 'US Panda', origin: 'CD', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_TSH', ovr: 61, name: 'SM Sanga Balende', origin: 'CD', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Linafoot' },
  { id: 'CD_SIM', ovr: 61, name: 'AS Simba', origin: 'CD', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_BLE', ovr: 60, name: 'FC Blessing', origin: 'CD', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_REN', ovr: 60, name: 'FC Renaissance', origin: 'CD', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'CD_ETM', ovr: 59, name: 'Étoile du Kivu', origin: 'CD', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Linafoot', desc: 'Linafoot', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Linafoot' },
  { id: 'NG_ENY', ovr: 68, name: 'Enyimba', origin: 'NG', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'NPFL' },
  { id: 'NG_RIV', ovr: 67, name: 'Rivers United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'NPFL' },
  { id: 'NG_KPF', ovr: 67, name: 'Kano Pillars', origin: 'NG', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_REM', ovr: 66, name: 'Remo Stars', origin: 'NG', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_LOB', ovr: 66, name: 'Lobi Stars', origin: 'NG', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_RAN', ovr: 66, name: 'Rangers Int.', origin: 'NG', primary: '#0033A0', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_PLA', ovr: 65, name: 'Plateau United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'NPFL' },
  { id: 'NG_AKW', ovr: 65, name: 'Akwa United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'NPFL' },
  { id: 'NG_SHO', ovr: 64, name: 'Shooting Stars', origin: 'NG', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'NPFL' },
  { id: 'NG_KWA', ovr: 64, name: 'Kwara United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_SUN', ovr: 63, name: 'Sunshine Stars', origin: 'NG', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_ABK', ovr: 63, name: 'Abia Warriors', origin: 'NG', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_DOM', ovr: 62, name: 'Doma United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'NPFL' },
  { id: 'NG_BEN', ovr: 62, name: 'Bendel Insurance', origin: 'NG', primary: '#004D98', secondary: '#A50044', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'NPFL' },
  { id: 'NG_SPO', ovr: 61, name: 'Sporting Lagos', origin: 'NG', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_KAT', ovr: 61, name: 'Katsina United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_BAY', ovr: 60, name: 'Bayelsa United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_HEC', ovr: 60, name: 'Heartland FC', origin: 'NG', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'NPFL' },
  { id: 'NG_NIG', ovr: 59, name: 'Niger Tornadoes', origin: 'NG', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'NPFL' },
  { id: 'NG_GOM', ovr: 59, name: 'Gombe United', origin: 'NG', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'NPFL', desc: 'NPFL', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'NPFL' },
  { id: 'CV_MIN', ovr: 63, name: 'CS Mindelense', origin: 'CV', primary: '#ED1C24', secondary: '#FFD100', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Campeonato Nacional' },
  { id: 'CV_SPO', ovr: 62, name: 'Sporting Praia', origin: 'CV', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Campeonato Nacional' },
  { id: 'CV_BOA', ovr: 61, name: 'Boavista Praia', origin: 'CV', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Campeonato Nacional' },
  { id: 'CV_ACA', ovr: 61, name: 'Académica Mindelo', origin: 'CV', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Campeonato Nacional' },
  { id: 'CV_PAL', ovr: 60, name: 'Palmeira', origin: 'CV', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Campeonato Nacional' },
  { id: 'CV_TRA', ovr: 60, name: 'Travadores', origin: 'CV', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Campeonato Nacional' },
  { id: 'CV_MOR', ovr: 59, name: 'Morabeza', origin: 'CV', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Campeonato Nacional' },
  { id: 'CV_VUL', ovr: 59, name: 'Vulcânicos', origin: 'CV', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Campeonato Nacional' },
  { id: 'CV_ULT', ovr: 58, name: 'Ultramarina', origin: 'CV', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Campeonato Nacional' },
  { id: 'CV_ROS', ovr: 58, name: 'Rosariense', origin: 'CV', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Campeonato Nacional' },
  { id: 'CV_BTR', ovr: 57, name: 'Batuque FC', origin: 'CV', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Campeonato Nacional' },
  { id: 'CV_JUV', ovr: 57, name: 'Juventude', origin: 'CV', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Campeonato Nacional', desc: 'Campeonato Nacional', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Campeonato Nacional' },
  { id: 'TN_EST', ovr: 73, name: 'Espérance de Tunis', origin: 'TN', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_ESS', ovr: 71, name: 'Étoile du Sahel', origin: 'TN', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_CA', ovr: 70, name: 'Club Africain', origin: 'TN', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'TN_CSS', ovr: 69, name: 'CS Sfaxien', origin: 'TN', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'TN_USM', ovr: 68, name: 'US Monastir', origin: 'TN', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_ST', ovr: 67, name: 'Stade Tunisien', origin: 'TN', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'TN_CAB', ovr: 66, name: 'CA Bizertin', origin: 'TN', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_USB', ovr: 65, name: 'US Ben Guerdane', origin: 'TN', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'TN_ASS', ovr: 64, name: 'AS Soliman', origin: 'TN', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'TN_ESM', ovr: 63, name: 'ES Métlaoui', origin: 'TN', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_EGS', ovr: 62, name: 'EGS Gafsa', origin: 'TN', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'TN_ASM', ovr: 62, name: 'AS Marsa', origin: 'TN', primary: '#6CABDD', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'TN_UST', ovr: 61, name: 'US Tataouine', origin: 'TN', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'TN_OCK', ovr: 60, name: 'Océano Club Kerkennah', origin: 'TN', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'CI_ASE', ovr: 68, name: 'ASEC Mimosas', origin: 'CI', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_SAN', ovr: 66, name: 'FC San Pédro', origin: 'CI', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_RCA', ovr: 65, name: 'Racing Club Abidjan', origin: 'CI', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_SOA', ovr: 64, name: 'SOA', origin: 'CI', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'CI_STE', ovr: 63, name: 'Stella Club', origin: 'CI', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_AFR', ovr: 63, name: 'Africa Sports', origin: 'CI', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'CI_BOU', ovr: 62, name: 'Bouaké FC', origin: 'CI', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'CI_DEN', ovr: 62, name: 'AFAD Djékanou', origin: 'CI', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'CI_ASI', ovr: 61, name: 'ASI d\'Abengourou', origin: 'CI', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'CI_SOL', ovr: 61, name: 'SOL FC', origin: 'CI', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_LYS', ovr: 60, name: 'Lys Sassandra', origin: 'CI', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_STA', ovr: 60, name: 'Stade d\'Abidjan', origin: 'CI', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'CI_KOR', ovr: 59, name: 'CO Korhogo', origin: 'CI', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Ligue 1' },
  { id: 'CI_ZOM', ovr: 59, name: 'Zoman FC', origin: 'CI', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'CI_MOU', ovr: 58, name: 'Mouna FC', origin: 'CI', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Ligue 1' },
  { id: 'CI_SCA', ovr: 58, name: 'SC Gagnoa', origin: 'CI', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Ligue 1', desc: 'Ligue 1', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Ligue 1' },
  { id: 'GH_KOT', ovr: 69, name: 'Asante Kotoko', origin: 'GH', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_HEA', ovr: 68, name: 'Hearts of Oak', origin: 'GH', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_MED', ovr: 67, name: 'Medeama SC', origin: 'GH', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_ADU', ovr: 66, name: 'Aduana Stars', origin: 'GH', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'GH_BER', ovr: 65, name: 'Berekum Chelsea', origin: 'GH', primary: '#034694', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_BCH', ovr: 65, name: 'Bechem United', origin: 'GH', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_DRE', ovr: 64, name: 'Dreams FC', origin: 'GH', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_SAM', ovr: 64, name: 'FC Samartex', origin: 'GH', primary: '#5C2D91', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_GRE', ovr: 63, name: 'Great Olympics', origin: 'GH', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'GH_LEG', ovr: 63, name: 'Legon Cities', origin: 'GH', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_KRE', ovr: 62, name: 'Karela United', origin: 'GH', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_RTA', ovr: 62, name: 'RTU', origin: 'GH', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_LIO', ovr: 61, name: 'Heart of Lions', origin: 'GH', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'GH_NBE', ovr: 61, name: 'Nsoatreman', origin: 'GH', primary: '#CB3524', secondary: '#272E61', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_BOF', ovr: 60, name: 'Bofoakwa Tano', origin: 'GH', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'GH_NAT', ovr: 60, name: 'Nations FC', origin: 'GH', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Premier League' },
  { id: 'GH_ACC', ovr: 59, name: 'Accra Lions', origin: 'GH', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Premier League' },
  { id: 'GH_GOL', ovr: 59, name: 'Gold Stars', origin: 'GH', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premier League', desc: 'Premier League', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Premier League' },
  { id: 'JO_FAI', ovr: 64, name: 'Al-Faisaly', origin: 'JO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JO_WEH', ovr: 64, name: 'Al-Wehdat', origin: 'JO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'JO_HUS', ovr: 62, name: 'Al-Hussein', origin: 'JO', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'JO_RAM', ovr: 61, name: 'Al-Ramtha', origin: 'JO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JO_SHB', ovr: 60, name: 'Shabab Al-Ordon', origin: 'JO', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'JO_AQA', ovr: 59, name: 'Shabab Al-Aqaba', origin: 'JO', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JO_SAH', ovr: 59, name: 'Sahab', origin: 'JO', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'JO_MAA', ovr: 58, name: 'Maan', origin: 'JO', primary: '#1A5784', secondary: '#000000', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JO_SAL', ovr: 58, name: 'Al-Salt', origin: 'JO', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Pro League' },
  { id: 'JO_JAL', ovr: 57, name: 'Al-Jalil', origin: 'JO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'JO_AHB', ovr: 57, name: 'Al-Ahli', origin: 'JO', primary: '#004170', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Pro League' },
  { id: 'JO_MUG', ovr: 56, name: 'Mughayer Al-Sarhan', origin: 'JO', primary: '#008040', secondary: '#FFFFFF', tier: 1, leagueName: 'Pro League', desc: 'Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Pro League' },
  { id: 'PT_SCL', ovr: 66, name: 'Santa Clara', origin: 'PT', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_NAC', ovr: 66, name: 'Nacional', origin: 'PT', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Liga Portugal 2' },
  { id: 'PT_AVS', ovr: 66, name: 'AVS', origin: 'PT', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_MAR', ovr: 65, name: 'Marítimo', origin: 'PT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_PAC', ovr: 65, name: 'Paços de Ferreira', origin: 'PT', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_TON', ovr: 64, name: 'Tondela', origin: 'PT', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_MAA', ovr: 64, name: 'Mafra', origin: 'PT', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_UDL', ovr: 63, name: 'União de Leiria', origin: 'PT', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_PEN', ovr: 63, name: 'Penafiel', origin: 'PT', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_LOM', ovr: 63, name: 'Lommel', origin: 'PT', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_ACA', ovr: 62, name: 'Académico de Viseu', origin: 'PT', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Liga Portugal 2' },
  { id: 'PT_FEI', ovr: 62, name: 'Feirense', origin: 'PT', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_POR', ovr: 62, name: 'Porto B', origin: 'PT', primary: '#0032A0', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_BEN', ovr: 62, name: 'Benfica B', origin: 'PT', primary: '#ED1C24', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Liga Portugal 2' },
  { id: 'PT_OLI', ovr: 61, name: 'Oliveirense', origin: 'PT', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Liga Portugal 2' },
  { id: 'PT_BEL', ovr: 61, name: 'Belenenses', origin: 'PT', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Liga Portugal 2' },
  { id: 'PT_LEI', ovr: 61, name: 'Leixões', origin: 'PT', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'PT_VLA', ovr: 60, name: 'Vilaverdense', origin: 'PT', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Liga Portugal 2', desc: 'Liga Portugal 2', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Liga Portugal 2' },
  { id: 'TR_EYU', ovr: 69, name: 'Eyüpspor', origin: 'TR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_GOZ', ovr: 68, name: 'Göztepe', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: '1. Lig' },
  { id: 'TR_SAK', ovr: 67, name: 'Sakaryaspor', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_BOD', ovr: 67, name: 'Bodrum FK', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_COR', ovr: 66, name: 'Çorum FK', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_KOC', ovr: 66, name: 'Kocaelispor', origin: 'TR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_BAN', ovr: 65, name: 'Bandırmaspor', origin: 'TR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: '1. Lig' },
  { id: 'TR_BOL', ovr: 65, name: 'Boluspor', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_GEN', ovr: 64, name: 'Gençlerbirliği', origin: 'TR', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_MAN', ovr: 64, name: 'Manisa FK', origin: 'TR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_KEK', ovr: 63, name: 'Keçiörengücü', origin: 'TR', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: '1. Lig' },
  { id: 'TR_ERZ', ovr: 63, name: 'Erzurumspor', origin: 'TR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_UMB', ovr: 62, name: 'Ümraniyespor', origin: 'TR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_TUZ', ovr: 62, name: 'Tuzlaspor', origin: 'TR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_SAN', ovr: 61, name: 'Şanlıurfaspor', origin: 'TR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: '1. Lig' },
  { id: 'TR_ADA', ovr: 61, name: 'Adanaspor', origin: 'TR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'TR_ALT', ovr: 60, name: 'Altay', origin: 'TR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: '1. Lig' },
  { id: 'TR_GIR', ovr: 60, name: 'Giresunspor', origin: 'TR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: '1. Lig', desc: '1. Lig', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: '1. Lig' },
  { id: 'BR_SAN', ovr: 70, name: 'Santos', origin: 'BR', primary: '#FFFFFF', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_SPO', ovr: 68, name: 'Sport Recife', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_CEA', ovr: 68, name: 'Ceará', origin: 'BR', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Série B' },
  { id: 'BR_GOI', ovr: 67, name: 'Goiás', origin: 'BR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Série B' },
  { id: 'BR_COR', ovr: 67, name: 'Coritiba', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_VIL', ovr: 66, name: 'Vila Nova', origin: 'BR', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_AME', ovr: 66, name: 'América Mineiro', origin: 'BR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_NOV', ovr: 65, name: 'Novorizontino', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Série B' },
  { id: 'BR_MIR', ovr: 65, name: 'Mirassol', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_OPE', ovr: 64, name: 'Operário', origin: 'BR', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_CRB', ovr: 64, name: 'CRB', origin: 'BR', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Série B' },
  { id: 'BR_BFO', ovr: 63, name: 'Botafogo-SP', origin: 'BR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_GUA', ovr: 63, name: 'Guarani', origin: 'BR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_AVA', ovr: 63, name: 'Avaí', origin: 'BR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_PON', ovr: 62, name: 'Ponte Preta', origin: 'BR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_CHA', ovr: 62, name: 'Chapecoense', origin: 'BR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Série B' },
  { id: 'BR_AMA', ovr: 61, name: 'Amazonas', origin: 'BR', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_PAY', ovr: 61, name: 'Paysandu', origin: 'BR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_BRU', ovr: 60, name: 'Brusque', origin: 'BR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'BR_ITU', ovr: 60, name: 'Ituano', origin: 'BR', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Série B', desc: 'Série B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Série B' },
  { id: 'AR_COL', ovr: 68, name: 'Colón', origin: 'AR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_SMA', ovr: 67, name: 'San Martín (T)', origin: 'AR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_ALD', ovr: 67, name: 'Aldosivi', origin: 'AR', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_CHI', ovr: 66, name: 'Chicago', origin: 'AR', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera Nacional' },
  { id: 'AR_QUI', ovr: 66, name: 'Quilmes', origin: 'AR', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_FER', ovr: 66, name: 'Ferro', origin: 'AR', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_CHA', ovr: 65, name: 'Chacarita', origin: 'AR', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Primera Nacional' },
  { id: 'AR_SMA', ovr: 65, name: 'San Martín (SJ)', origin: 'AR', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_GYT', ovr: 64, name: 'Gimnasia (J)', origin: 'AR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera Nacional' },
  { id: 'AR_GYS', ovr: 64, name: 'Gimnasia (S)', origin: 'AR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_MOR', ovr: 63, name: 'Morón', origin: 'AR', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Primera Nacional' },
  { id: 'AR_DEF', ovr: 63, name: 'Def. de Belgrano', origin: 'AR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Primera Nacional' },
  { id: 'AR_ATM', ovr: 62, name: 'Atlanta', origin: 'AR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_ALL', ovr: 62, name: 'All Boys', origin: 'AR', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera Nacional' },
  { id: 'AR_TEM', ovr: 61, name: 'Temperley', origin: 'AR', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Primera Nacional' },
  { id: 'AR_BRO', ovr: 61, name: 'Brown (A)', origin: 'AR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_EST', ovr: 60, name: 'Estudiantes (BA)', origin: 'AR', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera Nacional' },
  { id: 'AR_GUE', ovr: 60, name: 'Güemes', origin: 'AR', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Primera Nacional' },
  { id: 'AR_MIT', ovr: 59, name: 'Mitre', origin: 'AR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'AR_TRI', ovr: 59, name: 'Tristán Suárez', origin: 'AR', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera Nacional', desc: 'Primera Nacional', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Primera Nacional' },
  { id: 'MX_ATL', ovr: 65, name: 'Atlante', origin: 'MX', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Expansión MX' },
  { id: 'MX_LEO', ovr: 64, name: 'Leones Negros', origin: 'MX', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Expansión MX' },
  { id: 'MX_VEN', ovr: 63, name: 'Venados', origin: 'MX', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_CEL', ovr: 63, name: 'Celaya', origin: 'MX', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_MIN', ovr: 62, name: 'Mineros', origin: 'MX', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_CAN', ovr: 62, name: 'Cancún FC', origin: 'MX', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_MOR', ovr: 61, name: 'Atlético Morelia', origin: 'MX', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Expansión MX' },
  { id: 'MX_CIM', ovr: 61, name: 'Cimarrones', origin: 'MX', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_TAP', ovr: 60, name: 'Tapatío', origin: 'MX', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_COR', ovr: 60, name: 'Correcaminos', origin: 'MX', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Expansión MX' },
  { id: 'MX_MER', ovr: 59, name: 'Mérida', origin: 'MX', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Expansión MX' },
  { id: 'MX_DOR', ovr: 59, name: 'Dorados', origin: 'MX', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_ALE', ovr: 58, name: 'Alebrijes', origin: 'MX', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Expansión MX' },
  { id: 'MX_TLA', ovr: 58, name: 'Tlaxcala', origin: 'MX', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Expansión MX' },
  { id: 'MX_LAP', ovr: 57, name: 'La Paz', origin: 'MX', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Expansión MX', desc: 'Expansión MX', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Expansión MX' },
  { id: 'JP_SHI', ovr: 63, name: 'Shimizu S-Pulse', origin: 'JP', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_YOK', ovr: 62, name: 'Yokohama FC', origin: 'JP', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_NAG', ovr: 62, name: 'V-Varen Nagasaki', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_OKA', ovr: 61, name: 'Fagiano Okayama', origin: 'JP', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_JEF', ovr: 61, name: 'JEF United', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'JP_VEN', ovr: 60, name: 'Ventforet Kofu', origin: 'JP', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_SEN', ovr: 60, name: 'Vegalta Sendai', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_MON', ovr: 59, name: 'Montedio Yamagata', origin: 'JP', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'JP_OIT', ovr: 59, name: 'Oita Trinita', origin: 'JP', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_REN', ovr: 58, name: 'Renofa Yamaguchi', origin: 'JP', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_IWK', ovr: 58, name: 'Iwaki FC', origin: 'JP', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_TOK', ovr: 57, name: 'Tokushima Vortis', origin: 'JP', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'JP_FUJ', ovr: 57, name: 'Fujieda MYFC', origin: 'JP', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_MIT', ovr: 56, name: 'Mito HollyHock', origin: 'JP', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_EHI', ovr: 56, name: 'Ehime FC', origin: 'JP', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_ROA', ovr: 55, name: 'Roasso Kumamoto', origin: 'JP', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'J2 League' },
  { id: 'JP_TOH', ovr: 55, name: 'Tochigi SC', origin: 'JP', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'J2 League' },
  { id: 'JP_BLA', ovr: 54, name: 'Blaublitz Akita', origin: 'JP', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'JP_THE', ovr: 54, name: 'Thespa Gunma', origin: 'JP', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'JP_KAG', ovr: 54, name: 'Kagoshima Utd', origin: 'JP', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'J2 League', desc: 'J2 League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'J2 League' },
  { id: 'BE_ZUL', ovr: 66, name: 'Zulte Waregem', origin: 'BE', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_LOM', ovr: 65, name: 'Lommel', origin: 'BE', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_DEI', ovr: 65, name: 'Deinze', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_BEV', ovr: 64, name: 'Beveren', origin: 'BE', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Challenger Pro' },
  { id: 'BE_PAT', ovr: 64, name: 'Patro Eisden', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_LFC', ovr: 63, name: 'RFC Liège', origin: 'BE', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Challenger Pro' },
  { id: 'BE_FDB', ovr: 63, name: 'Francs Borains', origin: 'BE', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_OOS', ovr: 62, name: 'Oostende', origin: 'BE', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_RSCA', ovr: 62, name: 'RSCA Futures', origin: 'BE', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_CLB', ovr: 61, name: 'Club NXT', origin: 'BE', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Challenger Pro' },
  { id: 'BE_JON', ovr: 61, name: 'Jong Genk', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_STA', ovr: 60, name: 'SL16 FC', origin: 'BE', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_LIE', ovr: 60, name: 'Lierse K.', origin: 'BE', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Challenger Pro' },
  { id: 'BE_SER', ovr: 59, name: 'Seraing', origin: 'BE', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'BE_LOK', ovr: 59, name: 'Lokeren-Temse', origin: 'BE', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Challenger Pro' },
  { id: 'BE_LOU', ovr: 58, name: 'La Louvière', origin: 'BE', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Challenger Pro League', desc: 'Challenger Pro League', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Challenger Pro' },
  { id: 'CH_SIO', ovr: 65, name: 'FC Sion', origin: 'CH', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Challenge League' },
  { id: 'CH_THU', ovr: 64, name: 'FC Thun', origin: 'CH', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Challenge League' },
  { id: 'CH_AAR', ovr: 63, name: 'FC Aarau', origin: 'CH', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Challenge League' },
  { id: 'CH_VAD', ovr: 63, name: 'FC Vaduz', origin: 'CH', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Challenge League' },
  { id: 'CH_XAM', ovr: 62, name: 'Neuchâtel Xamax', origin: 'CH', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Challenge League' },
  { id: 'CH_WIL', ovr: 62, name: 'FC Wil', origin: 'CH', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Challenge League' },
  { id: 'CH_NYO', ovr: 61, name: 'Stade Nyonnais', origin: 'CH', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Challenge League' },
  { id: 'CH_BEL', ovr: 61, name: 'Bellinzona', origin: 'CH', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Challenge League' },
  { id: 'CH_SCH', ovr: 60, name: 'Schaffhausen', origin: 'CH', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Challenge League' },
  { id: 'CH_BAD', ovr: 60, name: 'Baden', origin: 'CH', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Challenge League', desc: 'Challenge League', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Challenge League' },
  { id: 'CO_QUI', ovr: 63, name: 'Quindío', origin: 'CO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_HUI', ovr: 62, name: 'Atlético Huila', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera B' },
  { id: 'CO_CAR', ovr: 62, name: 'Real Cartagena', origin: 'CO', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Primera B' },
  { id: 'CO_CUC', ovr: 61, name: 'Cúcuta Deportivo', origin: 'CO', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_COR', ovr: 61, name: 'Cortuluá', origin: 'CO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_LLA', ovr: 60, name: 'Llaneros', origin: 'CO', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_BOG', ovr: 60, name: 'Bogotá FC', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Primera B' },
  { id: 'CO_MAG', ovr: 59, name: 'Unión Magdalena', origin: 'CO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_LEO', ovr: 59, name: 'Leones FC', origin: 'CO', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'pace', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_BAR', ovr: 58, name: 'Barranquilla FC', origin: 'CO', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Primera B' },
  { id: 'CO_BOC', ovr: 58, name: 'Boca Juniors de Cali', origin: 'CO', primary: '#00529F', secondary: '#F2A900', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_ORS', ovr: 57, name: 'Orsomarso', origin: 'CO', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_TIG', ovr: 57, name: 'Tigres FC', origin: 'CO', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Primera B' },
  { id: 'CO_VAL', ovr: 56, name: 'Valledupar', origin: 'CO', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Primera B' },
  { id: 'CO_ATL', ovr: 56, name: 'Atlético FC', origin: 'CO', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Primera B' },
  { id: 'CO_RST', ovr: 55, name: 'Real Santander', origin: 'CO', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Primera B', desc: 'Primera B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Primera B' },
  { id: 'DK_AAB', ovr: 66, name: 'AaB', origin: 'DK', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'DK_SON', ovr: 65, name: 'SønderjyskE', origin: 'DK', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_VEN', ovr: 64, name: 'Vendsyssel', origin: 'DK', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_HIL', ovr: 63, name: 'Hillerød', origin: 'DK', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_FRE', ovr: 63, name: 'Fredericia', origin: 'DK', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_KOG', ovr: 62, name: 'HB Køge', origin: 'DK', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'DK_HEL', ovr: 62, name: 'Helsingør', origin: 'DK', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'DK_HOB', ovr: 61, name: 'Hobro IK', origin: 'DK', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'DK_KOL', ovr: 61, name: 'Kolding IF', origin: 'DK', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'DK_B93', ovr: 60, name: 'B.93', origin: 'DK', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_HOR', ovr: 60, name: 'Horsens', origin: 'DK', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: '1. Division' },
  { id: 'DK_NAE', ovr: 59, name: 'Næstved', origin: 'DK', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: '1. Division', desc: '1. Division', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: '1. Division' },
  { id: 'EC_MAC', ovr: 63, name: 'Macará', origin: 'EC', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'EC_9OC', ovr: 62, name: '9 de Octubre', origin: 'EC', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'EC_MAN', ovr: 62, name: 'Manta FC', origin: 'EC', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Serie B' },
  { id: 'EC_IND', ovr: 61, name: 'Independiente Jrs', origin: 'EC', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'EC_CHA', ovr: 61, name: 'Chacaritas', origin: 'EC', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'EC_AME', ovr: 60, name: 'América de Quito', origin: 'EC', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'EC_CUN', ovr: 60, name: 'Cuniburo', origin: 'EC', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'EC_VAR', ovr: 59, name: 'Vargas Torres', origin: 'EC', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Serie B' },
  { id: 'EC_BUH', ovr: 59, name: 'Búhos ULVR', origin: 'EC', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Serie B' },
  { id: 'EC_GUA', ovr: 58, name: 'Guayaquil City', origin: 'EC', primary: '#005CA8', secondary: '#FFFFFF', tier: 2, leagueName: 'Serie B', desc: 'Serie B', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Serie B' },
  { id: 'HR_SIB', ovr: 64, name: 'Šibenik', origin: 'HR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_VUK', ovr: 63, name: 'Vukovar 1991', origin: 'HR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Prva NL' },
  { id: 'HR_ZRI', ovr: 62, name: 'Zrinski Osječko', origin: 'HR', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'finishing', lifestyleFit: 'BALANCED', pitch: 'Prva NL' },
  { id: 'HR_CRO', ovr: 61, name: 'Croatia Zmijavci', origin: 'HR', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_DUG', ovr: 61, name: 'Dugopolje', origin: 'HR', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_BSK', ovr: 60, name: 'BSK Bijelo Brdo', origin: 'HR', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_JAR', ovr: 60, name: 'Jarun', origin: 'HR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_SES', ovr: 59, name: 'Sesvete', origin: 'HR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_CIB', ovr: 59, name: 'Cibalia', origin: 'HR', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Prva NL' },
  { id: 'HR_DUB', ovr: 58, name: 'Dubrava', origin: 'HR', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Prva NL' },
  { id: 'HR_ZMI', ovr: 58, name: 'Zmijavci', origin: 'HR', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'HR_ORJ', ovr: 57, name: 'Orijent', origin: 'HR', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Prva NL', desc: 'Prva NL', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Prva NL' },
  { id: 'MA_KAC', ovr: 64, name: 'KAC Kénitra', origin: 'MA', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Botola 2' },
  { id: 'MA_DHJ', ovr: 63, name: 'Difaâ El Jadidi', origin: 'MA', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_KACM', ovr: 63, name: 'Kawkab Marrakech', origin: 'MA', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_OCK', ovr: 62, name: 'OC Khouribga', origin: 'MA', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_CAK', ovr: 62, name: 'Chabab Atlas Khénifra', origin: 'MA', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_CODM', ovr: 61, name: 'CODM Meknès', origin: 'MA', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_RAC', ovr: 61, name: 'Racing Casablanca', origin: 'MA', primary: '#FFFFFF', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Botola 2' },
  { id: 'MA_CJB', ovr: 60, name: 'Chabab Ben Guerir', origin: 'MA', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_IZK', ovr: 60, name: 'IZK Khémisset', origin: 'MA', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_WAF', ovr: 59, name: 'Wydad Fès', origin: 'MA', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_USMO', ovr: 59, name: 'USM Oujda', origin: 'MA', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_OD', ovr: 58, name: 'Olympique Dcheira', origin: 'MA', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'PARTY', pitch: 'Botola 2' },
  { id: 'MA_RBM', ovr: 58, name: 'Raja Beni Mellal', origin: 'MA', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_JSM', ovr: 57, name: 'JS Massira', origin: 'MA', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Botola 2' },
  { id: 'MA_ASS', ovr: 57, name: 'AS Salé', origin: 'MA', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'MA_AMF', ovr: 56, name: 'Amal Tiznit', origin: 'MA', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'Botola 2', desc: 'Botola 2', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'Botola 2' },
  { id: 'NL_WIL', ovr: 67, name: 'Willem II', origin: 'NL', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'defense', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_GRO', ovr: 66, name: 'Groningen', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_ROD', ovr: 66, name: 'Roda JC', origin: 'NL', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_DOR', ovr: 65, name: 'Dordrecht', origin: 'NL', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_ADO', ovr: 65, name: 'ADO Den Haag', origin: 'NL', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_GRA', ovr: 64, name: 'De Graafschap', origin: 'NL', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_NAC', ovr: 64, name: 'NAC Breda', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_CAM', ovr: 63, name: 'Cambuur', origin: 'NL', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_VVV', ovr: 63, name: 'VVV-Venlo', origin: 'NL', primary: '#004D98', secondary: '#A50044', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_EMM', ovr: 62, name: 'Emmen', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_MVV', ovr: 62, name: 'MVV Maastricht', origin: 'NL', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_HEM', ovr: 61, name: 'Helmond Sport', origin: 'NL', primary: '#DA291C', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_EID', ovr: 61, name: 'Eindhoven', origin: 'NL', primary: '#FCE400', secondary: '#00508F', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_TOP', ovr: 60, name: 'TOP Oss', origin: 'NL', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_TEL', ovr: 60, name: 'Telstar', origin: 'NL', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_BOS', ovr: 59, name: 'Den Bosch', origin: 'NL', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NL_JAJ', ovr: 59, name: 'Jong Ajax', origin: 'NL', primary: '#D2122E', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_JPS', ovr: 58, name: 'Jong PSV', origin: 'NL', primary: '#F00000', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Eerste Divisie' },
  { id: 'NL_JAZ', ovr: 58, name: 'Jong AZ', origin: 'NL', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'STRICT', pitch: 'Eerste Divisie' },
  { id: 'NL_JUT', ovr: 57, name: 'Jong Utrecht', origin: 'NL', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'Eerste Divisie', desc: 'Eerste Divisie', preferredStat: 'dribbling', lifestyleFit: 'BALANCED', pitch: 'Eerste Divisie' },
  { id: 'NO_VAL', ovr: 65, name: 'Vålerenga', origin: 'NO', primary: '#005CA8', secondary: '#FDE100', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_STA', ovr: 64, name: 'Start', origin: 'NO', primary: '#000000', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_AAL', ovr: 63, name: 'Aalesund', origin: 'NO', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_KNG', ovr: 63, name: 'Kongsvinger', origin: 'NO', primary: '#F36C21', secondary: '#000000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_BRY', ovr: 62, name: 'Bryne', origin: 'NO', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_LYN', ovr: 62, name: 'Lyn', origin: 'NO', primary: '#CB3524', secondary: '#272E61', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_STB', ovr: 61, name: 'Stabæk', origin: 'NO', primary: '#FFFFFF', secondary: '#DA291C', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_RAN', ovr: 61, name: 'Ranheim', origin: 'NO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_SOG', ovr: 60, name: 'Sogndal', origin: 'NO', primary: '#008040', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'physical', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_EGE', ovr: 60, name: 'Egersund', origin: 'NO', primary: '#1A5784', secondary: '#000000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_SAN', ovr: 59, name: 'Sandnes Ulf', origin: 'NO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_RFO', ovr: 59, name: 'Raufoss', origin: 'NO', primary: '#E32221', secondary: '#000000', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_LEV', ovr: 58, name: 'Levanger', origin: 'NO', primary: '#132257', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'defense', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_MOS', ovr: 58, name: 'Moss', origin: 'NO', primary: '#5C2D91', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'NO_AAS', ovr: 57, name: 'Åsane', origin: 'NO', primary: '#004170', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'OBOS-ligaen' },
  { id: 'NO_MJO', ovr: 57, name: 'Mjøndalen', origin: 'NO', primary: '#6CABDD', secondary: '#FFFFFF', tier: 2, leagueName: 'OBOS-ligaen', desc: 'OBOS-ligaen', preferredStat: 'defense', lifestyleFit: 'BALANCED', pitch: 'OBOS-ligaen' },
  { id: 'SCO_CEL', ovr: 74, name: 'Celtic', origin: 'SCO', primary: '#008000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'passing', lifestyleFit: 'PARTY', pitch: 'Premiership' },
  { id: 'SCO_RAN', ovr: 73, name: 'Rangers', origin: 'SCO', primary: '#0033A0', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_HEA', ovr: 68, name: 'Hearts', origin: 'SCO', primary: '#FFFFFF', secondary: '#DA291C', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Premiership' },
  { id: 'SCO_ABE', ovr: 67, name: 'Aberdeen', origin: 'SCO', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'finishing', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_HIB', ovr: 66, name: 'Hibernian', origin: 'SCO', primary: '#E32221', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_KIL', ovr: 65, name: 'Kilmarnock', origin: 'SCO', primary: '#132257', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'physical', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_STM', ovr: 64, name: 'St Mirren', origin: 'SCO', primary: '#F36C21', secondary: '#000000', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'finishing', lifestyleFit: 'PARTY', pitch: 'Premiership' },
  { id: 'SCO_MOT', ovr: 63, name: 'Motherwell', origin: 'SCO', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_STJ', ovr: 62, name: 'St Johnstone', origin: 'SCO', primary: '#FCE400', secondary: '#00508F', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'BALANCED', pitch: 'Premiership' },
  { id: 'SCO_DUU', ovr: 62, name: 'Dundee United', origin: 'SCO', primary: '#DA291C', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'passing', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_DUN', ovr: 61, name: 'Dundee FC', origin: 'SCO', primary: '#000000', secondary: '#FFFFFF', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'pace', lifestyleFit: 'STRICT', pitch: 'Premiership' },
  { id: 'SCO_ROS', ovr: 61, name: 'Ross County', origin: 'SCO', primary: '#005CA8', secondary: '#FDE100', tier: 1, leagueName: 'Premiership', desc: 'Premiership', preferredStat: 'passing', lifestyleFit: 'BALANCED', pitch: 'Premiership' }
];

export const LIFESTYLE_ITEMS = [
  { id: 'cryo', name: 'Chambre Hyperbare & Cryothérapie', cost: 1000000, upkeep: -100000, desc: 'Réduit drastiquement le risque de blessure grave. (Entretien: -100k€/an)' },
  { id: 'training_center', name: 'Centre d\'Entraînement Privé', cost: 15000000, upkeep: 0, desc: '+1 Garanti en Physique/Vitesse (ou Plongeon/Réflexes pour GB).' },
  { id: 'startup', name: 'Start-up Tech/Crypto', cost: 3000000, upkeep: 0, desc: '10% de chance de gagner 30M€/an. 20% de faillite (perte de l\'item).' },
  { id: 'charity', name: 'Fondation Caritative', cost: 5000000, upkeep: -500000, desc: '+10 Confiance Coach par an. (Coût: -500k€/an)' },
  { id: 'nightclub', name: 'Franchise de Boîtes de Nuit', cost: 8000000, upkeep: 2000000, desc: 'Génère +2M€/an et Moral minimum 50. Malus: -15 Confiance/an.' },
  { id: 'buy_club', name: 'Rachat d\'un club de foot (D3)', cost: 25000000, upkeep: -1000000, desc: 'Débloque la fin "Propriétaire". (Investissement: -1M€/an)' },
  { id: 'villa', name: 'Villa d\'architecte avec piscine', cost: 4000000, upkeep: -150000, desc: '+5 Moral constant. (Entretien: -150k€/an)' },
  { id: 'jet_prive', name: 'Jet Privé "Jet Stream"', cost: 12000000, upkeep: -1000000, desc: '+10 Forme par an grâce au confort des voyages. (Entretien: -1M€/an)' }
];

const POSITION_WEIGHTS = {
  ST: { finishing: 0.35, pace: 0.25, dribbling: 0.20, physical: 0.10, passing: 0.05, defense: 0.05 },
  ATT: { finishing: 0.35, pace: 0.25, dribbling: 0.20, physical: 0.10, passing: 0.05, defense: 0.05 },
  MID: { passing: 0.30, dribbling: 0.25, physical: 0.15, pace: 0.15, defense: 0.10, finishing: 0.05 },
  CM: { passing: 0.30, dribbling: 0.25, physical: 0.15, pace: 0.15, defense: 0.10, finishing: 0.05 },
  DEF: { defense: 0.35, physical: 0.30, passing: 0.15, pace: 0.10, dribbling: 0.05, finishing: 0.05 },
  CB: { defense: 0.35, physical: 0.30, passing: 0.15, pace: 0.10, dribbling: 0.05, finishing: 0.05 },
  GK: { diving: 0.25, reflexes: 0.25, positioning: 0.20, handling: 0.15, kicking: 0.05, pace: 0.10 },
  DEFAULT: { pace: 0.16, passing: 0.16, physical: 0.17, defense: 0.17, finishing: 0.17, dribbling: 0.17 }
};

export const calculateOVR = (player) => {
  if (!player || !player.attributes) return 50;
  const pos = (player.position || 'DEFAULT').toUpperCase();
  const weights = POSITION_WEIGHTS[pos] || POSITION_WEIGHTS.DEFAULT;
  let weightedSum = 0;
  let totalWeight = 0;
  Object.entries(weights).forEach(([attr, weight]) => {
    // Handle special case for goalkeeper attributes where they use different names
    let val = Number(player.attributes[attr] ?? 0);
    if (pos === 'GK') {
      // For goalkeepers, map the attribute names correctly
      switch(attr) {
        case 'diving':
          val = Number(player.attributes.diving ?? 0);
          break;
        case 'reflexes':
          val = Number(player.attributes.reflexes ?? 0);
          break;
        case 'positioning':
          val = Number(player.attributes.positioning ?? 0);
          break;
        case 'handling':
          val = Number(player.attributes.handling ?? 0);
          break;
        case 'kicking':
          val = Number(player.attributes.kicking ?? 0);
          break;
        case 'pace':
          val = Number(player.attributes.pace ?? 0);
          break;
        default:
          // For other attributes, try to map them correctly
          val = Number(player.attributes[attr] ?? 0);
      }
    } else {
      // For field players, use standard mapping
      val = Number(player.attributes[attr] ?? player.attributes[attr === 'defense' ? 'defending' : attr] ?? 0);
    }
    weightedSum += val * weight;
    totalWeight += weight;
  });
  return Math.round(weightedSum / totalWeight);
};

export const calculatePlayerStatus = (player, club) => {
  if (!club) return "Sans club ❌";
  const ovr = player.ovr || 50;
  const trust = player.coachTrust || 70;
  const clubOvr = club.ovr || (club.tier === 1 ? 82 : club.tier === 2 ? 70 : 55);
  
  // Nouvelle formule : la confiance du coach pèse beaucoup plus lourd
  // trust * 0.60 => max +60 points
  // Cela permet à un joueur faible mais adoré du coach de jouer en rotation
  const score = ((ovr - clubOvr) * 1.5) + (trust * 0.60) + 40;
  
  if (score >= 68) return "Titulaire indiscutable 🌟";
  if (score >= 55) return "Joueur de rotation 🟢";
  if (score >= 42) return "Remplaçant habituel 🟡";
  if (trust >= 75 && score >= 25) return "Chouchou du coach malgré le niveau 💛";
  return "Placard / Réserviste 🔴";
};

export const generateYoungPlayerStats = (enginePos, roleBaseStats, backgroundBonus) => {
  const targetOvr = Math.floor(Math.random() * 6) + 45;
  const statsList = (enginePos === 'GK' || enginePos === 'GB')
    ? ['diving', 'handling', 'kicking', 'reflexes', 'pace', 'positioning'] 
    : ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'];
  let rawStats = {};
  statsList.forEach(stat => {
    const base = roleBaseStats[stat] || 50;
    const noise = Math.floor(Math.random() * 7) - 3;
    rawStats[stat] = Math.max(15, base + noise);
  });
  let currentOvr = calculateOVR({ position: enginePos, attributes: rawStats });
  const scale = targetOvr / (currentOvr || 1);
  let scaledStats = {};
  statsList.forEach(stat => {
    scaledStats[stat] = Math.max(15, Math.min(99, Math.round(rawStats[stat] * scale)));
  });
  if (backgroundBonus) {
    Object.entries(backgroundBonus).forEach(([statKey, bonus]) => {
      if (scaledStats[statKey] !== undefined) {
        scaledStats[statKey] += Math.round(bonus * 0.5);
      }
    });
  }
  let finalOvr = calculateOVR({ position: enginePos, attributes: scaledStats });
  if (finalOvr < 45) {
    const diff = 45 - finalOvr;
    statsList.forEach(s => { scaledStats[s] += diff; });
  } else if (finalOvr > 50) {
    const diff = finalOvr - 50;
    statsList.forEach(s => { scaledStats[s] = Math.max(15, scaledStats[s] - diff); });
  }
  return scaledStats;
};

export const calculatePlayerValue = (player, club) => {
  const ovr = player.ovr || 50;
  
  // Algorithme exponentiel : la valeur explose à haut niveau
  // OVR 50 ~ 100k, OVR 70 ~ 3.4M, OVR 85 ~ 48M, OVR 90 ~ 118M
  let baseValue = 14.33 * Math.exp(0.177 * ovr);
  
  // Courbe d'âge très réaliste (les jeunes coûtent extrêmement cher, les vieux décotent vite)
  const age = player.age || 15;
  let ageMultiplier = 1.0;
  if (age < 24) {
    ageMultiplier = 1 + (24 - age) * 0.25; // Ex: 18 ans = x2.5
  } else if (age <= 28) {
    ageMultiplier = 1.0; // Prime
  } else {
    // Malus réduit : la décote est beaucoup plus douce
    ageMultiplier = Math.max(0.20, 1 - (age - 28) * 0.08); // Ex: 33 ans = x0.60 au lieu de x0.25
  }

  // Facteurs annexes (Forme, Moral, Standing du club)
  const formMod = 0.7 + ((player.form || 50) / 100) * 0.6;
  const moraleMod = 0.9 + ((player.morale || 50) / 100) * 0.2;
  const tierMod = club && club.tier ? (1.4 - club.tier * 0.15) : 1.0; // Tier 1 = x1.25, Tier 3 = x0.95

  // Hype selon la nationalité (Prime à l'anglaise, brésilienne, etc.)
  let natMod = 1.0;
  const nat = typeof player.origin === 'object' ? player.origin?.id : player.origin;
  if (nat === 'EN') natMod = 1.20; // English tax
  else if (nat === 'BR' || nat === 'AR') natMod = 1.10; // Hype sud-américaine
  else if (nat === 'FR' || nat === 'ES' || nat === 'DE') natMod = 1.05; // Prime grandes nations

  // Impact du championnat (Premier League génère énormément d'argent)
  let leagueMod = 1.0;
  if (club && club.leagueName && club.origin) {
    if (club.leagueName.includes('Premier League') && club.origin === 'EN') leagueMod = 1.25;
    else if (club.leagueName.includes('Championship') && club.origin === 'EN') leagueMod = 1.10;
    else if (club.leagueName.includes('La Liga') && club.origin === 'ES') leagueMod = 1.15;
    else if (club.leagueName.includes('Serie A') && club.origin === 'IT') leagueMod = 1.10;
    else if (club.leagueName.includes('Bundesliga') && club.origin === 'DE') leagueMod = 1.15;
    else if (club.leagueName.includes('Ligue 1') && club.origin === 'FR') leagueMod = 1.05;
    else if ((club.leagueName.includes('Ligue 2') || club.leagueName.includes('National')) && club.origin === 'FR') leagueMod = 0.85;
    else if (club.leagueName.includes('League One') && club.origin === 'EN') leagueMod = 0.90;
    else if (club.tier === 1) leagueMod = 0.95;
    else if (club.tier === 2) leagueMod = 0.80;
    else if (club.tier === 3) leagueMod = 0.70;
  }

  // Hype personnelle (Perk "Chouchou des Médias" ou événements)
  const personalHypeMod = 1.0 + ((player.hype || 0) / 100) * 0.30; // Jusqu'à +30% de valeur

  let finalValue = baseValue * ageMultiplier * formMod * moraleMod * tierMod * natMod * leagueMod * personalHypeMod;
  
  // Légère fluctuation aléatoire (+/- 2%) du marché
  finalValue *= (0.98 + Math.random() * 0.04);

  // Plancher minimum et formatage (arrondi intelligent)
  finalValue = Math.max(50000, finalValue);
  if (finalValue < 1000000) {
    return Math.round(finalValue / 10000) * 10000;
  } else {
    return Math.round(finalValue / 100000) * 100000;
  }
};

export const calculateSalaryOffer = (player, club) => {
  const ovr = player.ovr || 50;
  
  // Salaire hebdomadaire exponentiel
  // OVR 50 ~ 1k/s, OVR 70 ~ 14k/s, OVR 85 ~ 100k/s, OVR 90 ~ 196k/s
  let baseSalary = 1.36 * Math.exp(0.132 * ovr);
  
  // Ajustement selon le tier du club (les gros clubs paient mieux)
  const tierMod = club && club.tier ? (1.5 - club.tier * 0.2) : 1.0; // Tier 1 = x1.3, Tier 3 = x0.9
  
  // Prime de la force de l'âge (entre 25 et 30 ans, les joueurs exigent les plus gros salaires)
  const age = player.age || 15;
  let ageMultiplier = 1.0;
  if (age >= 25 && age <= 30) ageMultiplier = 1.2;
  else if (age < 20) ageMultiplier = 0.8;

  let salary = baseSalary * tierMod * ageMultiplier;
  
  // Négociation aléatoire (+/- 5%)
  salary *= (0.95 + Math.random() * 0.10);
  
  return Math.round(salary / 100) * 100;
};

export const generate6ClubOffers = (player) => {
  if (!player || !player.attributes) return ALL_CLUBS.slice(0, 6);
  const highestStat = Object.keys(player.attributes).reduce((a, b) =>
    player.attributes[a] > player.attributes[b] ? a : b
  );
  const playerOriginId = typeof player.origin === 'object' ? player.origin?.id : player.origin;
  
  let chanceTier1 = 0.05;
  let chanceTier2 = 0.15;
  
  const bgId = player.background?.id;
  if (bgId === 'LEGACY') {
    chanceTier1 = 0.25;
    chanceTier2 = 0.40;
  } else if (bgId === 'ACADEMY') {
    chanceTier1 = 0.10;
    chanceTier2 = 0.50;
  }
  
  const rnd = Math.random();
  let maxTier = 3;
  if (rnd < chanceTier1) maxTier = 1;
  else if (rnd < chanceTier1 + chanceTier2) maxTier = 2;
  
  let pool = ALL_CLUBS.filter(c => c.origin === playerOriginId && c.tier >= maxTier);
  if (pool.length < 6) {
    pool = ALL_CLUBS.filter(c => c.origin === playerOriginId);
  }
  
  if (pool.length < 6) {
    pool = [...pool, ...ALL_CLUBS.filter(c => c.tier >= maxTier)];
  }

  pool = Array.from(new Set(pool.map(a => a.id))).map(id => pool.find(a => a.id === id));

  const scoredClubs = pool.map((club) => {
    let score = 0;
    if (club.preferredStat === highestStat) score += 25;
    if (player.lifestyle && club.lifestyleFit === player.lifestyle.id) score += 15;
    if (club.origin === playerOriginId) score += 30;
    score += Math.random() * 30;
    return { ...club, score };
  });
  
  return scoredClubs.sort((a, b) => b.score - a.score).slice(0, 6);
};

export const generateInterSeasonOffers = (player, currentClub, seasonStats = null, clubEvolutions = {}) => {
  if (!player || !currentClub) return [];
  const playerOvr = player.ovr || 50;
  
  const isGreatSeason = seasonStats && seasonStats.rating >= 7.8;
  const maxOvrDiff = isGreatSeason ? 6 : 2;
  
  const hasMLS = player.flags?.includes('MLS_PREFERENCE');
  const hasSaudi = player.flags?.includes('SAUDI_PREFERENCE');

  const suitableClubs = ALL_CLUBS.filter(c => {
    if (c.id === currentClub.id) return false;
    
    // Filtre des offres exotiques
    if (hasMLS && c.origin !== 'US') return false;
    if (hasSaudi && c.origin !== 'SA') return false;

    const clubOvr = (c.ovr || (c.tier === 1 ? 82 : c.tier === 2 ? 70 : 55)) + (clubEvolutions[c.id] || 0);
    const diff = clubOvr - playerOvr;
    return diff <= maxOvrDiff && diff >= -12;
  });
  
  let finalPool = suitableClubs;
  if (finalPool.length < 4) {
    if (hasMLS) {
      finalPool = ALL_CLUBS.filter(c => c.origin === 'US' && c.id !== currentClub.id);
    } else if (hasSaudi) {
      finalPool = ALL_CLUBS.filter(c => c.origin === 'SA' && c.id !== currentClub.id);
    } else {
      const targetTier = playerOvr >= 78 ? 1 : playerOvr >= 65 ? 2 : 3;
      finalPool = ALL_CLUBS.filter(c => c.id !== currentClub.id && Math.abs(c.tier - targetTier) <= 1);
    }
  }

  // Trier les clubs pour privilégier ceux dont l'OVR est proche de celui du joueur
  const sortedClubs = finalPool.sort((a, b) => {
    const aOvr = (a.ovr || (a.tier === 1 ? 82 : a.tier === 2 ? 70 : 55)) + (clubEvolutions[a.id] || 0);
    const bOvr = (b.ovr || (b.tier === 1 ? 82 : b.tier === 2 ? 70 : 55)) + (clubEvolutions[b.id] || 0);
    // Un joueur de 90 d'OVR a plus de chances d'être contacté par un club de 88 que de 78.
    // L'aléatoire permet de garder des surprises.
    let aScore = Math.abs((aOvr + (isGreatSeason ? 3 : 0)) - playerOvr) + (Math.random() * 6);
    let bScore = Math.abs((bOvr + (isGreatSeason ? 3 : 0)) - playerOvr) + (Math.random() * 6);
    return aScore - bScore;
  });

  const numOffers = Math.floor(Math.random() * 3) + 4; 
  const offers = sortedClubs.slice(0, numOffers);
  
  return offers.map(offer => {
    const clubOvr = offer.ovr || (offer.tier === 1 ? 82 : offer.tier === 2 ? 70 : 55);
    
    let weeklySalary = calculateSalaryOffer(player, offer);
    
    let currencySymbol = '€';
    let conversionRate = 1.0;
    if (offer.origin === 'EN') {
      currencySymbol = '£';
      conversionRate = 1.17; 
    }
    
    weeklySalary = Math.round(weeklySalary / 100) * 100;
    
    return {
      ...offer,
      salary: weeklySalary,
      currency: currencySymbol,
      conversionRate: conversionRate,
      desc: `${offer.desc} | Salaire annuel : ${(weeklySalary * 52).toLocaleString('fr-FR')} ${currencySymbol}`
    };
  });
};

import { getRoleById } from './rolesData';

export const getEffectiveStats = (player) => {
  if (!player || !player.attributes) return {};
  const form = player.form !== undefined ? Number(player.form) : 80;
  const morale = player.morale !== undefined ? Number(player.morale) : 80;
  const bonus = player.trainingBonus || 0;
  const formBonus = Math.floor((form - 70) / 10);
  const moraleBonus = Math.floor((morale - 70) / 10);
  
  const role = getRoleById(player.roleId);
  const effective = {};
  
  Object.entries(player.attributes).forEach(([attr, val]) => {
    const numericVal = Number(val) || 50;
    const totalBonus = ((attr === 'pace' || attr === 'physical') ? formBonus : moraleBonus) + bonus;
    let baseEffective = numericVal + totalBonus;
    
    // Le rôle n'applique plus de passif direct sur le calcul de la stat
    // (le multiplicateur s'applique dorénavant uniquement lors des gains de stats)
    
    effective[attr] = Math.min(99, Math.max(1, Math.round(baseEffective)));
  });
  return effective;
};

export const getMatchesForClub = (club) => {
  if (!club) return 38;
  const ln = (club.leagueName || '').toLowerCase();
  const tier = club.tier || 3;
  if (ln.includes('premier league') || ln.includes('ligue 1') || ln.includes('liga') || ln.includes('serie a')) {
    return 38;
  } else if (ln.includes('bundesliga') || ln.includes('eredivisie')) {
    return 34;
  } else if (tier === 3) {
    return 40;
  }
  return 38;
};

export const simulateSeasonStats = (player, currentClub, interactiveMatchResult = null) => {
    const totalSeasonMatches = getMatchesForClub(currentClub);
  const ovr = player.ovr || 50;
  const form = player.form || 80;
  const pos = (player.position || 'DEFAULT').toUpperCase();
  const attr = player.attributes || {};
  const perks = player.perks || [];
  const tier = currentClub.tier || 3;
  const trust = player.coachTrust || 70;
  const clubOvr = currentClub.ovr || (tier === 1 ? 82 : tier === 2 ? 70 : 55);
  const ovrDelta = (ovr - clubOvr);
  const difficultyMultiplier = Math.max(0.2, Math.min(1.3, 1 + (ovrDelta * 0.02)));
  const score = ((ovr - clubOvr) * 1.5) + (trust * 0.60) + 40;
  
  let matchRatio = 1.0;
  if (perks.includes('chouchou')) {
    matchRatio = 1.0;
  } else if (score >= 68) {
    matchRatio = 0.90 + (Math.random() * 0.10); // Titulaire indiscutable
  } else if (score >= 55) {
    matchRatio = 0.60 + (Math.random() * 0.15); // Rotation
  } else if (score >= 42) {
    matchRatio = 0.30 + (Math.random() * 0.15); // Remplaçant
  } else if (trust >= 75 && score >= 25) {
    matchRatio = 0.45 + (Math.random() * 0.15);
  } else {
    matchRatio = 0.05 + (Math.random() * 0.10); // Placard
  }

  // Malus si la forme est catastrophique
  if (form < 40) matchRatio = Math.max(0, matchRatio - 0.2);
  
  // Confiance absolue à 0 : le joueur est écarté de l'équipe
  // Mais il a peut-être joué avant (1 événement = 1 trimestre)
  if (trust <= 0) {
    if (player.bannedAtEventStep) {
      const trimestersPlayed = Math.max(0, player.bannedAtEventStep - 1);
      const scoreBeforeBan = ((ovr - clubOvr) * 1.5) + (50 * 0.60) + 40;
      let ratioBeforeBan = 0.5;
      if (scoreBeforeBan >= 68) ratioBeforeBan = 0.9;
      else if (scoreBeforeBan >= 55) ratioBeforeBan = 0.6;
      else if (scoreBeforeBan >= 42) ratioBeforeBan = 0.3;
      
      matchRatio = ratioBeforeBan * (trimestersPlayed / 3.0);
    } else {
      matchRatio = 0;
    }
  }
  
  // Bonus de confiance : même hors chouchou, une haute confiance aide
  if (trust >= 90) matchRatio = Math.min(1.0, matchRatio + 0.10);
  else if (trust >= 80) matchRatio = Math.min(1.0, matchRatio + 0.05);
  
  if (perks.includes('increvable')) matchRatio = Math.min(1.0, matchRatio + 0.20);
  
  const matches = Math.max(0, Math.floor(totalSeasonMatches * matchRatio));

  const finishing = attr.finishing || 50;
  const passing = attr.passing || 50;
  const defense = attr.defense || 50;
  const physical = attr.physical || 50;
  const formMultiplier = form / 80;
  
  // Diversification des données : variance statistique basée sur un mix global
  // (Forme, Moral, OVR, Ecart avec le club, et Statistique Clé)
  const morale = player.morale || 70;
  
  const mentalScore = (form * 0.6) + (morale * 0.4);
  const levelScore = ovr + (ovrDelta * 1.5); 
  
  let keyStat = 50;
  if (pos.includes('ATT') || pos.includes('ST')) keyStat = attr.finishing || 50;
  else if (pos.includes('MID')) keyStat = attr.passing || 50;
  else keyStat = attr.defense || 50;

  // Calcul du "Momentum" de la saison (Moyenne pondérée ~0-100)
  // 40% Mental (Forme/Moral), 30% OVR & Diff Club, 30% Attributs spécifiques
  const momentumScore = (mentalScore * 0.40) + (levelScore * 0.30) + (keyStat * 0.30);
  
  let varianceMultiplier = 1.0;
  const masterClassRoll = Math.random();
  
  if (momentumScore >= 82 && masterClassRoll < 0.25) {
    // Masterclass : Le joueur est en pleine confiance, surdimensionné ou au top de ses stats
    varianceMultiplier = 1.4 + (Math.random() * 0.5); // x1.4 à x1.9
  } else if (momentumScore <= 55 && masterClassRoll < 0.30) {
    // Cauchemar / Jours sans : Mauvais moral, faible OVR ou stats insuffisantes
    varianceMultiplier = 0.3 + (Math.random() * 0.4); // x0.3 à x0.7
  } else {
    // Lissage pour les cas normaux pour éviter que tout le monde reste figé à 1.0
    // Un momentum de 70 donne ~0.95, un momentum de 80 donne ~1.0
    varianceMultiplier = 0.60 + (momentumScore / 200);
  }

  const goalVariance = (0.55 + Math.random() * 0.9) * difficultyMultiplier * (1 + (clubOvr - 75) * 0.005) * (1 - (tier - 1) * 0.05) * varianceMultiplier;
  const assistVariance = (0.55 + Math.random() * 0.9) * difficultyMultiplier * (1 + (clubOvr - 75) * 0.005) * (1 - (tier - 1) * 0.05) * varianceMultiplier;
  const defenseVariance = (0.55 + Math.random() * 0.9) * difficultyMultiplier * (1 + (clubOvr - 75) * 0.005) * (1 - (tier - 1) * 0.05) * varianceMultiplier;
  let goals = 0;
  let assists = 0;
  let cleanSheets = 0;
  if (pos.includes('ATT') || pos.includes('ST')) {
    goals = Math.max(0, Math.round(Math.pow(finishing / 99, 1.2) * 28 * matchRatio * formMultiplier * goalVariance));
    assists = Math.max(0, Math.round(Math.pow(passing / 99, 1.2) * 12 * matchRatio * assistVariance));
  } else if (pos.includes('MID')) {
    goals = Math.max(0, Math.round(Math.pow(finishing / 99, 1.2) * 10 * matchRatio * formMultiplier * goalVariance));
    assists = Math.max(0, Math.round(Math.pow(passing / 99, 1.2) * 18 * matchRatio * assistVariance));
  } else if (pos.includes('DEF')) {
    cleanSheets = Math.max(0, Math.round(Math.pow(defense / 99, 1.1) * 14 * matchRatio * formMultiplier * defenseVariance));
    goals = Math.max(0, Math.round(Math.pow(physical / 99, 1.5) * 3 * matchRatio * goalVariance));
    assists = Math.max(0, Math.round(Math.pow(passing / 99, 1.2) * 5 * matchRatio * assistVariance));
  } else if (pos.includes('GK')) {
    cleanSheets = Math.max(0, Math.round(Math.pow(defense / 99, 1.1) * 16 * matchRatio * formMultiplier * defenseVariance));
  }
  if (perks.includes('renard')) goals = Math.round(goals * 1.3);
  if (perks.includes('maestro')) assists = Math.round(assists * 1.3);
  if (perks.includes('mur')) cleanSheets = Math.round(cleanSheets * 1.3);
  if (interactiveMatchResult && interactiveMatchResult.success) {
    if (interactiveMatchResult.type === 'goal') goals += 1;
    if (interactiveMatchResult.type === 'assist') assists += 1;
    if (interactiveMatchResult.type === 'defend') cleanSheets += 1;
  }
  let baseRating = 5.3 + (ovr - (tier * 10)) * 0.035 + (form - 70) * 0.015;
  baseRating += (goals * 0.07) + (assists * 0.06) + (cleanSheets * 0.04);
  if (interactiveMatchResult) baseRating += interactiveMatchResult.success ? 0.3 : -0.2;
  const rating = Number(Math.min(9.8, Math.max(4.2, baseRating + (Math.random() * 0.5 - 0.25))).toFixed(1));
  let leaguePositionBase = 10 - (rating - 6) * 2.5 + (tier - 1) * 2 + Math.random() * 3;
  const leaguePosition = Math.max(1, Math.min(18, Math.floor(leaguePositionBase)));
  
  let isPromoted = false;
  let isRelegated = false;
  let promotionRelegationText = `Le club se maintient en championnat.`;

  if (leaguePosition <= 3 && tier > 1) {
    isPromoted = true;
    promotionRelegationText = `📈 EXPLOIT ! Le club est PROMU !`;
  } else if (leaguePosition >= 16 && tier < 3) {
    isRelegated = true;
    promotionRelegationText = `📉 DÉSASTRE : Le club est RELÉGUÉ...`;
  } else if (tier === 1 && leaguePosition === 1) {
    promotionRelegationText = `🏆 TITRE HISTORIQUE : Vous êtes CHAMPIONS !`;
  }

  let earningsBase = (0.4 + (matches * 0.02) + (3 - tier) * 0.2);
  if (perks.includes('star')) earningsBase *= 1.5;
  const earnings = earningsBase.toFixed(1);

  let headline = `« Saison en dents de scie pour ${player.name} »`;
  if (rating >= 7.5) headline = `« Phénoménal ! ${player.name} marche sur l'eau ! »`;
  else if (rating >= 6.5) headline = `« Solide saison de ${player.name} »`;
  else headline = `« Période compliquée, des doutes s'installent »`;

  const primaryKey = pos.includes('ATT') || pos.includes('ST') ? 'finishing' : pos.includes('MID') ? 'passing' : 'defense';
  const secondaryKey = pos.includes('DEF') || pos.includes('GK') ? 'physical' : 'pace';
  
  const ovrMultiplier = ovr > 90 ? 0.3 : ovr > 85 ? 0.5 : ovr > 80 ? 0.8 : 1.0;
  const tierMultiplier = tier === 1 ? 1.2 : tier === 2 ? 0.8 : 0.5;
  const age = player.age || 18;
  const isGkPos = pos.includes('GK') || pos.includes('GB');
  // Les gardiens progressent plus tard et déclinent plus tard
  const ageMultiplier = isGkPos
    ? (age >= 35 ? 0.2 : age >= 32 ? 0.5 : age >= 28 ? 0.8 : 1.0)
    : (age >= 32 ? 0.2 : age >= 29 ? 0.5 : age >= 25 ? 0.8 : 1.0);
  const growthFactor = ovrMultiplier * tierMultiplier * ageMultiplier;
  
  let primaryGain = rating >= 7.8 ? 4 : rating >= 7.0 ? 3 : rating >= 6.0 ? 2 : 1;
  let secondaryGain = rating >= 7.5 ? 3 : rating >= 6.5 ? 2 : 1;
  let dribbleGain = rating >= 8.0 ? 2 : 0;
  
  primaryGain = Math.round(primaryGain * growthFactor);
  secondaryGain = Math.round(secondaryGain * growthFactor);
  dribbleGain = Math.round(dribbleGain * growthFactor);
  
  if (matches <= 15) {
    primaryGain = Math.min(1, primaryGain);
    secondaryGain = Math.min(1, secondaryGain);
    dribbleGain = 0;
  }
  if (matches <= 5) {
    primaryGain = 0;
    secondaryGain = 0;
  }
  
  let statGains = {
    [primaryKey]: primaryGain,
    [secondaryKey]: secondaryGain,
    dribbling: dribbleGain
  };

  if (pos.includes('GK') || pos.includes('GB')) {
    // Les gains sont distribués directement pour éviter les arrondis à zéro
    // On compense le fait qu'il y ait plus de stats clés pour un GK
    statGains = {
      diving: primaryGain,
      reflexes: primaryGain,
      positioning: secondaryGain,
      handling: secondaryGain,
      kicking: Math.max(0, dribbleGain > 0 ? dribbleGain : secondaryGain - 1)
    };
  }

  const playerNation = typeof player.origin === 'object' ? player.origin?.id : player.origin;
  const topTierNations = ['FR', 'EN', 'DE', 'ES', 'IT', 'BR', 'AR', 'PT', 'NL', 'BE'];
  const midTierNations = ['UR', 'HR', 'CO', 'MA', 'SN', 'DZ', 'CI', 'US', 'MX', 'JP', 'KR', 'CH', 'DK', 'SE'];
  
  let requiredOvr = 75; // Petites nations
  if (topTierNations.includes(playerNation)) requiredOvr = 85;
  else if (midTierNations.includes(playerNation)) requiredOvr = 80;

  const nationalCallup = (ovr >= requiredOvr && tier <= 2) || (rating >= 8.0 && ovr >= (requiredOvr - 3));
  
  return { 
    matches, goals, assists, cleanSheets, rating, leaguePosition, 
    isPromoted, isRelegated, promotionRelegationText, 
    earnings, headline, statGains, nationalCallup 
  };
};


export const ALL_EVENTS = [
  // ÉVÉNEMENTS EXCLUSIFS LIES AUX ORIGINES SOCIALES (PROBABILISTES)
  {
    id: 'origin_amateur_1', category: 'LIFESTYLE', tag: 'Le Match du Cinquantenaire',
    condition: (player) => player.background?.id === 'AMATEUR' && Math.random() > 0.4,
    description: "Votre ancien club amateur fête ses 50 ans et vous supplie de venir jouer un match de gala sur leur terrain bosselé en pleine semaine de championnat.",
    options: [
      {
        text: "Faire acte de présence", typeTag: "Respect",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Vous saluez tout le monde et donnez le coup d'envoi. Le respect est là.",
            effects: [{text: "+5 Moral", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 5) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Le long trajet vous a épuisé, mais vous n'avez pas osé refuser.",
            effects: [{text: "-5 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 5) })
          }
        ]
      },
      {
        text: "Jouer le match sérieusement", typeTag: "Engagement",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.physical || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous faites un match propre et retrouvez vos sensations physiques.",
            effects: [{text: "+15 Moral", style: "positive"}, {text: "+1 Physique", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 15), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.physical || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous prenez des mauvais coups inutiles sur un terrain catastrophique.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Jouer pour humilier l'adversaire", typeTag: "Showman",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous marquez un but incroyable. La vidéo fait le tour du net !",
            effects: [{text: "+30 Moral", style: "positive"}, {text: "+2 Physique", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 30), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Catastrophe ! Un tacle assassin d'un défenseur amateur vous blesse.",
            effects: [{text: "-25 Forme", style: "negative"}, {text: "-20 Confiance", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 25), coachTrust: Math.max(0, (p.coachTrust||50) - 20), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Financer la buvette pour se faire excuser", typeTag: "Astuce",
        outcome: {
          narrative: "Votre don généreux compense votre absence. Vous restez chez vous pour récupérer.",
          effects: [{text: "-15 000€", style: "negative"}, {text: "+15 Forme", style: "positive"}, {text: "+10 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) - 15000, form: Math.min(100, (p.form||50) + 15), coachTrust: Math.min(100, (p.coachTrust||50) + 10) })
        }
      }
    ]
  },
  {
    id: 'origin_five_1', category: 'LIFESTYLE', tag: 'Le Défi Viral',
    condition: (player) => player.background?.id === 'FIVE' && Math.random() > 0.4,
    description: "Un influenceur freestyle très connu débarque à votre entraînement et vous défie dans un 1v1 diffusé en direct devant des millions de viewers.",
    options: [
      {
        text: "Refuser poliment pour s'entraîner", typeTag: "Discipline",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Le coach adore votre professionnalisme.",
            effects: [{text: "+10 Confiance", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 10) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Les moqueries d'internet vous touchent.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Faire quelques jongles sympas", typeTag: "Showman modéré",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.dribbling || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous assurez le show sans forcer, c'est réussi.",
            effects: [{text: "+15 Moral", style: "positive"}, {text: "+1 Dribble", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 15), attributes: { ...p.attributes, dribbling: Math.min(99, (p.attributes?.dribbling || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.dribbling || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous perdez la balle bêtement, le coach soupire.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "L'humilier avec un petit pont en direct", typeTag: "Audace",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Petit pont monumental ! Vous devenez l'idole des jeunes !",
            effects: [{text: "+35 Moral", style: "positive"}, {text: "+2 Dribble", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 35), attributes: { ...p.attributes, dribbling: Math.min(99, (p.attributes?.dribbling || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous glissez lamentablement sur le ballon. Un meme est né.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Prendre la honte exprès pour amuser le coach", typeTag: "Kamikaze",
        outcome: {
          narrative: "Vous vous ridiculisez, mais votre capacité d'autodérision rassure le staff.",
          effects: [{text: "-25 Moral", style: "negative"}, {text: "+25 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 25), coachTrust: Math.min(100, (p.coachTrust||50) + 25) })
        }
      }
    ]
  },
  {
    id: 'origin_street_1', category: 'LIFESTYLE', tag: 'Solidarité Risquée',
    condition: (player) => player.background?.id === 'STREET' && Math.random() > 0.4,
    description: "Un 'grand frère' de votre ancien quartier, qui vous a protégé jeune, a de gros ennuis judiciaires. Il demande votre soutien public.",
    options: [
      {
        text: "Faire un post évasif sur Instagram", typeTag: "Prudence",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Le strict minimum pour vous dédouaner sans vous mouiller.",
            effects: [{text: "+5 Moral", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 5) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Même un simple post déplaît à la direction.",
            effects: [{text: "-5 Confiance", style: "negative"}], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, (p.coachTrust||50) - 5) })
          }
        ]
      },
      {
        text: "Appeler le président pour demander de l'aide", typeTag: "Négociation",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le président utilise ses contacts pour calmer le jeu. Gros soulagement.",
            effects: [{text: "+20 Moral", style: "positive"}, {text: "+1 Passe", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 20), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le président est furieux que vous l'impliquiez dans ces affaires.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Soutien médiatique absolu face caméras", typeTag: "Loyauté pure",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Votre loyauté impressionne la France entière. Vous êtes vu comme un homme d'honneur.",
            effects: [{text: "+40 Moral", style: "positive"}, {text: "+2 Physique", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 40), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Scandale national ! Le club est obligé de vous sanctionner lourdement.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Engager le meilleur avocat discrètement", typeTag: "L'Ombre",
        outcome: {
          narrative: "L'argent résout le problème dans le silence absolu.",
          effects: [{text: "-100 000€", style: "negative"}, {text: "+20 Confiance", style: "positive"}, {text: "+10 Moral", style: "positive"}],
          applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) - 100000, coachTrust: Math.min(100, (p.coachTrust||50) + 20), morale: Math.min(100, (p.morale||50) + 10) })
        }
      }
    ]
  },
  {
    id: 'origin_legacy_1', category: 'CARRIÈRE', tag: 'Guerre de Sponsors',
    condition: (player) => player.background?.id === 'LEGACY' && Math.random() > 0.4,
    description: "Une immense marque concurrente au sponsor principal de votre club veut vous signer à prix d'or uniquement grâce au nom de votre père.",
    options: [
      {
        text: "Ignorer l'offre et rester loyal", typeTag: "Fidélité",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Le club apprécie grandement ce geste d'apaisement.",
            effects: [{text: "+10 Confiance", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 10) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Vous êtes rongé par le regret de cette perte d'argent.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Négocier une hausse avec le club via cette offre", typeTag: "Business",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.pace || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le sponsor actuel s'aligne pour éviter de vous perdre.",
            effects: [{text: "+500 000€", style: "positive"}, {text: "+1 Dribble", style: "positive"}], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) + 500000, attributes: { ...p.attributes, dribbling: Math.min(99, (p.attributes?.dribbling || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.pace || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le club prend ça pour du chantage et se braque complètement.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Signer le contrat concurrent", typeTag: "Avidité",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Coup de génie juridique, vous gagnez sur tous les tableaux !",
            effects: [{text: "+1 500 000€", style: "positive"}, {text: "+10 Moral", style: "positive"}, {text: "+2 Vitesse", style: "positive"}], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) + 1500000, morale: Math.min(100, (p.morale||50) + 10), attributes: { ...p.attributes, pace: Math.min(99, (p.attributes?.pace || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le club porte plainte pour conflit d'intérêts et vous met sur le banc.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Demander à papa de régler l'affaire", typeTag: "Piston",
        outcome: {
          narrative: "Votre père trouve un compromis financier apaisé. L'honneur du club est sauf.",
          effects: [{text: "-20 Moral", style: "negative"}, {text: "+250 000€", style: "positive"}, {text: "+15 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 20), bankBalance: (p.bankBalance||0) + 250000, coachTrust: Math.min(100, (p.coachTrust||50) + 15) })
        }
      }
    ]
  },
  {
    id: 'origin_academy_1', category: 'VESTIAIRE', tag: 'La Fronde',
    condition: (player) => player.background?.id === 'ACADEMY' && Math.random() > 0.4,
    description: "Plusieurs de vos anciens camarades du centre de formation se rebellent contre la tactique stricte du coach pro.",
    options: [
      {
        text: "Rester neutre", typeTag: "Observation",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Vous évitez la tempête et gardez votre énergie.",
            effects: [{text: "+10 Forme", style: "positive"}], applyStats: (p) => ({ ...p, form: Math.min(100, (p.form||50) + 10) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "L'ambiance lourde finit par peser sur votre humeur.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Jouer les médiateurs entre jeunes et staff", typeTag: "Diplomate",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Votre vision de jeu calme tout le monde. L'équipe est unie.",
            effects: [{text: "+15 Confiance", style: "positive"}, {text: "+10 Moral", style: "positive"}, {text: "+1 Passe", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 15), morale: Math.min(100, (p.morale||50) + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Échec critique. Les deux camps pensent que vous les avez trahis.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Mener la fronde et renverser la tactique", typeTag: "Rébellion",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Le coach finit par céder et change de système. Vous êtes le roi du vestiaire.",
            effects: [{text: "+40 Moral", style: "positive"}, {text: "+2 Passe", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 40), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "La rébellion échoue. Vous êtes isolé et envoyé en réserve.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Dénoncer les meneurs en privé au coach", typeTag: "Balance",
        outcome: {
          narrative: "Le coach écarte les rebelles. Vous devenez son lieutenant absolu.",
          effects: [{text: "-30 Moral", style: "negative"}, {text: "+40 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 30), coachTrust: Math.min(100, (p.coachTrust||50) + 40) })
        }
      }
    ]
  },

  // GENERAL EVENTS (ALL)
  {
    id: 'first_training', category: 'ENTRAÎNEMENT', tag: 'Première impression', targetPosition: 'ALL', isFirstTime: true,
    description: "Premier jour d'entraînement pro. Le coach vous observe.",
    options: [
      { typeTag: 'INTENSITÉ', text: 'Donner 200% sur chaque duel', outcome: { narrative: 'Le staff adore votre engagement.', effects: [{ text: '+4 PHYSIQUE', style: 'positive' }, { text: '-5 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 5), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 4) } }) } },
      { typeTag: 'TACTIQUE', text: 'Rester discipliné', outcome: { narrative: 'Le coach apprécie votre intelligence.', effects: [{ text: '+3 PASSE', style: 'positive' }, { text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 3) } }) } }
    ]
  },
  {
    id: 'media_interview', category: 'MÉDIAS', tag: 'Interview Piège', targetPosition: 'ALL', isFirstTime: true,
    description: "Un journaliste sportif très agressif tente de vous faire dire du mal du système de jeu actuel du coach.",
    options: [
      {
        text: "Répondre avec des phrases bateaux", typeTag: "Langue de bois",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Le journaliste s'ennuie, mais le coach apprécie votre prudence.",
            effects: [{text: "+5 Confiance", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 5) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Vos réponses maladroites sont détournées dans un petit article sarcastique.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Défendre brillamment la tactique", typeTag: "Charisme",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Votre intelligence de jeu se ressent dans vos propos. Vous gagnez en leadership !",
            effects: [{text: "+15 Confiance", style: "positive"}, {text: "+1 Passe", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous vous emmêlez les pinceaux tactiquement. Le coach est consterné.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Critiquer publiquement le système", typeTag: "Rébellion",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Coup de tonnerre ! L'opinion publique vous soutient et force le coach à vous écouter.",
            effects: [{text: "+35 Moral", style: "positive"}, {text: "+2 Vitesse", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 35), attributes: { ...p.attributes, pace: Math.min(99, (p.attributes?.pace || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous êtes massacré par les consultants TV et mis à pied.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Couper court à l'interview prématurément", typeTag: "Fuite",
        outcome: {
          narrative: "Vous partez en plein milieu. Les médias vous détestent, mais vous vous préservez mentalement.",
          effects: [{text: "-20 Moral", style: "negative"}, {text: "+25 Forme", style: "positive"}],
          applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 20), form: Math.min(100, (p.form||50) + 25) })
        }
      }
    ]
  },
  {
    id: 'ev_party_night', category: 'VIE PRIVÉE', tag: 'Sortie nocturne', targetPosition: 'ALL', isFirstTime: false,
    description: "Vos coéquipiers vous invitent à la plus grosse soirée de l'année en boîte de nuit, 48h avant un match crucial.",
    options: [
      {
        text: "Refuser pour dormir", typeTag: "Pro",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Vous regardez un film et dormez tôt.",
            effects: [{text: "+10 Forme", style: "positive"}], applyStats: (p) => ({ ...p, form: Math.min(100, (p.form||50) + 10) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Vous voyez leurs stories toute la nuit. Vous vous sentez seul.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Y aller mais ne boire que de l'eau", typeTag: "Contrôle",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.physical || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous consolidez les liens avec le groupe sans ruiner votre physique.",
            effects: [{text: "+15 Moral", style: "positive"}, {text: "+1 Physique", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 15), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.physical || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous rentrez tard et très fatigué. Le coach s'en rend compte.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Finir sur les tables jusqu'à l'aube", typeTag: "No Limit",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Soirée mythique. Vous devenez le leader charismatique de l'équipe !",
            effects: [{text: "+40 Moral", style: "positive"}, {text: "+2 Dribble", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 40), attributes: { ...p.attributes, dribbling: Math.min(99, (p.attributes?.dribbling || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Des paparazzis vous filment ivre mort. Honte absolue.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Forme", style: "negative"}, {text: "-15 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 20), coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 15) })
          }
        ]
      },
      {
        text: "Payer un carré VIP au groupe sans y aller", typeTag: "Mécène",
        outcome: {
          narrative: "Vous dépensez une fortune pour eux, ils vous adorent. Vous dormez comme un bébé.",
          effects: [{text: "-25 000€", style: "negative"}, {text: "+20 Forme", style: "positive"}, {text: "+10 Moral", style: "positive"}],
          applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) - 25000, form: Math.min(100, (p.form||50) + 20), morale: Math.min(100, (p.morale||50) + 10) })
        }
      }
    ]
  },
  {
    id: 'ev_extra_training', category: 'ENTRAÎNEMENT', tag: "Heures sup'", targetPosition: 'ALL', isFirstTime: false,
    description: "L'entraînement officiel est terminé sous une pluie battante. Que faites-vous ?",
    options: [
      {
        text: "Rentrer se doucher", typeTag: "Récupération",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Vous privilégiez la récupération musculaire.",
            effects: [{text: "+5 Forme", style: "positive"}], applyStats: (p) => ({ ...p, form: Math.min(100, (p.form||50) + 5) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Le coach trouve que vous manquez de détermination.",
            effects: [{text: "-5 Confiance", style: "negative"}], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, (p.coachTrust||50) - 5) })
          }
        ]
      },
      {
        text: "Travail devant le but", typeTag: "Finition",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.finishing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous enchaînez les lucarnes. Vous progressez.",
            effects: [{text: "+15 Confiance", style: "positive"}, {text: "+1 Tir", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 15), attributes: { ...p.attributes, finishing: Math.min(99, (p.attributes?.finishing || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.finishing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous prenez froid sous la pluie.",
            effects: [{text: "-15 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 15) })
          }
        ]
      },
      {
        text: "Parcours physique extrême de 2h", typeTag: "Machine",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous brisez vos limites. Le staff n'en croit pas ses yeux.",
            effects: [{text: "+40 Confiance", style: "positive"}, {text: "+2 Physique", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 40), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Déchirure musculaire à la fin du parcours...",
            effects: [{text: "-30 Forme", style: "negative"}, {text: "-20 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 30), morale: Math.max(0, (p.morale||50) - 20) })
          }
        ]
      },
      {
        text: "Payer des séances de kiné privé pour tous", typeTag: "Soin",
        outcome: {
          narrative: "Un investissement sur votre corps. Vous êtes plus frais que jamais.",
          effects: [{text: "-10 000€", style: "negative"}, {text: "+20 Forme", style: "positive"}, {text: "+10 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) - 10000, form: Math.min(100, (p.form||50) + 20), coachTrust: Math.min(100, (p.coachTrust||50) + 10) })
        }
      }
    ]
  },
  {
    id: 'ev_sponsor_deal', category: 'SPONSOR', tag: 'Dilemme Éthique', targetPosition: 'ALL', isFirstTime: false,
    description: "Une marque de malbouffe vous offre une somme astronomique pour une publicité. Le club déconseille.",
    options: [
      {
        text: "Refuser sagement", typeTag: "Éthique",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Le club salue vos principes.",
            effects: [{text: "+10 Confiance", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, (p.coachTrust||50) + 10) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Vous êtes frustré de passer à côté d'autant d'argent.",
            effects: [{text: "-5 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 5) })
          }
        ]
      },
      {
        text: "Négocier pour des repas sains", typeTag: "Négociation",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.defense || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Ils acceptent ! Vous gagnez de l'argent avec une bonne image.",
            effects: [{text: "+150 000€", style: "positive"}, {text: "+1 Moral", style: "positive"}], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) + 150000, morale: Math.min(100, (p.morale||50) + 1) })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.defense || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Les négociations échouent et le club vous réprimande.",
            effects: [{text: "-10 Confiance", style: "negative"}], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Signer le gros contrat cash", typeTag: "Jackpot",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "La pub est un hit mondial et devient virale ! Vous êtes intouchable.",
            effects: [{text: "+400 000€", style: "positive"}, {text: "+30 Moral", style: "positive"}], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) + 400000, morale: Math.min(100, (p.morale||50) + 30) })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Scandale alimentaire ! Vous perdez toute crédibilité sportive.",
            effects: [{text: "-25 Confiance", style: "negative"}, {text: "-20 Moral", style: "negative"}], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, (p.coachTrust||50) - 25), morale: Math.max(0, (p.morale||50) - 20) })
          }
        ]
      },
      {
        text: "Révéler l'offre toxique à la presse pour soigner son image", typeTag: "Lanceur d'alerte",
        outcome: {
          narrative: "Vous êtes salué par les ONG de santé. Le coach est fier de vous.",
          effects: [{text: "-15 Moral", style: "negative"}, {text: "+40 Confiance", style: "positive"}],
          applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 15), coachTrust: Math.min(100, (p.coachTrust||50) + 40) })
        }
      }
    ]
  },
  {
    id: 'ev_fan_interaction', category: 'FANS', tag: 'Rencontre', targetPosition: 'ALL', isFirstTime: false,
    description: "Des supporters agressifs attendent sous la pluie à la sortie du stade après un mauvais match.",
    options: [
      {
        text: "Les esquiver par la porte arrière", typeTag: "Fuite",
        outcome: [
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return prob; },
            narrative: "Vous rentrez sain et sauf.",
            effects: [{text: "+5 Forme", style: "positive"}], applyStats: (p) => ({ ...p, form: Math.min(100, (p.form||50) + 5) })
          },
          {
            probability: (p) => { let prob = 0.8; if (p.form < 50) prob *= 0.8; if (p.morale > 70) prob = 1.0; return 1 - prob; },
            narrative: "Les supporters vous voient fuir et vous insultent. Grosse claque mentale.",
            effects: [{text: "-10 Moral", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, (p.morale||50) - 10) })
          }
        ]
      },
      {
        text: "Aller leur parler calmement", typeTag: "Courage",
        outcome: [
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Votre calme les apaise. Vous agissez en leader.",
            effects: [{text: "+15 Moral", style: "positive"}, {text: "+1 Passe", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
          },
          {
            probability: (p) => { let prob = 0.5 + ((p.attributes?.passing || 50) - 70) * 0.01; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "La discussion tourne au vinaigre. Vous devez être escorté.",
            effects: [{text: "-10 Confiance", style: "negative"}, {text: "-10 Forme", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 10), coachTrust: Math.max(0, (p.coachTrust||50) - 10) })
          }
        ]
      },
      {
        text: "Les affronter physiquement", typeTag: "Guerrier",
        outcome: [
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Vous repoussez le meneur de façon musclée. Les autres reculent. Alpha mentalité !",
            effects: [{text: "+35 Moral", style: "positive"}, {text: "+2 Physique", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, (p.morale||50) + 35), attributes: { ...p.attributes, physical: Math.min(99, (p.attributes?.physical || 50) + 2) } })
          },
          {
            probability: (p) => { let prob = 0.2; if (p.coachTrust > 80) prob += 0.3; if (p.form < 50) prob *= 0.8; return 1 - Math.max(0.1, Math.min(0.9, prob)); },
            narrative: "Bagarre générale ! Vous finissez en garde à vue et suspendu.",
            effects: [{text: "-30 Confiance", style: "negative"}, {text: "-25 Forme", style: "negative"}, {text: "-20 Moral", style: "negative"}], applyStats: (p) => ({ ...p, form: Math.max(10, (p.form||50) - 25), coachTrust: Math.max(0, (p.coachTrust||50) - 30), morale: Math.max(0, (p.morale||50) - 20) })
          }
        ]
      },
      {
        text: "Offrir des maillots dédicacés pour calmer la foule", typeTag: "Pacifiste riche",
        outcome: {
          narrative: "L'émeute se transforme en séance de dédicaces amicale. Magie du foot.",
          effects: [{text: "-15 000€", style: "negative"}, {text: "+20 Moral", style: "positive"}],
          applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance||0) - 15000, morale: Math.min(100, (p.morale||50) + 20) })
        }
      }
    ]
  },
  {
    id: 'ev_injury_scare', category: 'ENTRAÎNEMENT', tag: 'Alerte Physique', targetPosition: 'ALL', isFirstTime: false,
    description: 'Pointe à la cuisse lors d\'une accélération.',
    options: [
      { typeTag: 'ARRÊT', text: 'Stopper et voir le médecin', outcome: { narrative: 'C\'était une crampe. Repos forcé.', effects: [{ text: '+10 Forme', style: 'positive' }, { text: '-2 PHYSIQUE', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10), attributes: { ...p.attributes, physical: Math.max(15, p.attributes.physical - 2) } }) } },
      { typeTag: 'FORCER', text: 'Continuer malgré la douleur', outcome: { narrative: 'Votre corps s\'endurcit, mais à quel prix...', effects: [{ text: '+4 PHYSIQUE', style: 'positive' }, { text: '-15 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 4) } }) } }
    ]
  },
  
  // ROLE SPECIFIC : GK (Gardiens)
  {
    id: 'gk_penalty_save', category: 'TERRAIN', tag: 'Action Héroïque', targetPosition: 'GK',
    description: "90ème minute, l'équipe adverse obtient un penalty. Vous êtes le dernier rempart.",
    options: [
      { typeTag: 'PLONGEON', text: 'Plonger fermement du côté fermé', outcome: { narrative: 'Vous repoussez le ballon d\'une manchette magistrale !', effects: [{ text: '+6 PLONGEON', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, diving: Math.min(99, (p.attributes.diving || 50) + 6) } }) } },
      { typeTag: 'RÉFLEXES', text: 'Attendre le dernier moment', outcome: { narrative: 'Le tireur tente une panenka, vous la captez facilement.', effects: [{ text: '+4 RÉFLEXES', style: 'positive' }, { text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5), attributes: { ...p.attributes, reflexes: Math.min(99, (p.attributes.reflexes || 50) + 4) } }) } }
    ]
  },
  {
    id: 'gk_corner_chaos', category: 'TERRAIN', tag: 'Sortie Aérienne', targetPosition: 'GK',
    description: "Corner très fermé. La boîte est pleine de joueurs.",
    options: [
      { typeTag: 'MANIABILITÉ', text: 'Sortir avec agressivité pour capter la balle', outcome: { narrative: 'Vous captez le ballon sereinement au-dessus de tout le monde.', effects: [{ text: '+5 MANIABILITÉ', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, handling: Math.min(99, (p.attributes.handling || 50) + 5) } }) } },
      { typeTag: 'POSITIONNEMENT', text: 'Rester sur la ligne et bien lire la trajectoire', outcome: { narrative: 'Arrêt miraculeux sur la ligne grâce à votre placement !', effects: [{ text: '+5 POSITIONNEMENT', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, positioning: Math.min(99, (p.attributes.positioning || 50) + 5) } }) } }
    ]
  },
  
  // ROLE SPECIFIC : DEF (Défenseurs)
  {
    id: 'def_last_man', category: 'TERRAIN', tag: 'Dernier Défenseur', targetPosition: 'DEF',
    description: "L'attaquant adverse part seul au but. Vous devez agir vite.",
    options: [
      { typeTag: 'VITESSE', text: 'Sprinter pour un tacle glissé in-extremis', outcome: { narrative: 'Un tacle parfait qui sauve l\'équipe.', effects: [{ text: '+4 VITESSE', style: 'positive' }, { text: '+3 DÉFENSE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 4), defense: Math.min(99, p.attributes.defense + 3) } }) } },
      { typeTag: 'PHYSIQUE', text: 'Jouer l\'épaule contre épaule', outcome: { narrative: 'Vous le bougez sans faire faute.', effects: [{ text: '+5 PHYSIQUE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 5) } }) } },
      { typeTag: 'SACRIFICE', text: 'Faire faute (Carton Rouge)', outcome: { narrative: 'Carton rouge. L\'équipe perd derrière...', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) } }
    ]
  },
  {
    id: 'def_build_up', category: 'TERRAIN', tag: 'Relance', targetPosition: 'DEF',
    description: "Pressing très haut de l'adversaire, vous avez la balle dans vos 20 mètres.",
    options: [
      { typeTag: 'PASSE', text: 'Trouver le milieu avec une passe laser', outcome: { narrative: 'La relance casse 3 lignes !', effects: [{ text: '+5 PASSE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 5) } }) } },
      { typeTag: 'DÉGAGEMENT', text: 'Envoyer un grand ballon devant', outcome: { narrative: 'Pas beau, mais efficace.', effects: [{ text: '+3 DÉFENSE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 3) } }) } }
    ]
  },

  // ROLE SPECIFIC : MID (Milieux)
  {
    id: 'mid_playmaker', category: 'TERRAIN', tag: 'Maître du jeu', targetPosition: 'MID',
    description: "Le match est bloqué, l'équipe compte sur vous pour trouver la faille.",
    options: [
      { typeTag: 'PASSE', text: 'Tenter une ouverture lumineuse en profondeur', outcome: { narrative: 'Passe décisive splendide !', effects: [{ text: '+6 PASSE', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 6) } }) } },
      { typeTag: 'DRIBBLE', text: 'Provoquer balle au pied', outcome: { narrative: 'Un slalom magnifique qui crée le décalage.', effects: [{ text: '+5 DRIBBLE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 5) } }) } }
    ]
  },
  {
    id: 'mid_box_to_box', category: 'TERRAIN', tag: 'Box-to-box', targetPosition: 'MID',
    description: "Fin de match, l'équipe est coupée en deux.",
    options: [
      { typeTag: 'PHYSIQUE', text: 'Multiplier les allers-retours pour combler', outcome: { narrative: 'Un volume de jeu impressionnant.', effects: [{ text: '+6 PHYSIQUE', style: 'positive' }, { text: '-15 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 6) } }) } },
      { typeTag: 'TACTIQUE', text: 'Garder sa position et temporiser', outcome: { narrative: 'Vous stabilisez le milieu.', effects: [{ text: '+4 DÉFENSE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 4) } }) } }
    ]
  },

  // ROLE SPECIFIC : ATT (Attaquants)
  {
    id: 'att_penalty', category: 'TERRAIN', tag: 'Pression Maximale', targetPosition: 'ATT',
    description: "Votre équipe obtient un penalty décisif à la 90ème minute.",
    options: [
      { typeTag: 'TIR', text: 'Frapper en force sous la barre', outcome: { narrative: 'Le gardien ne bouge même pas.', effects: [{ text: '+6 TIR', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 6) } }) } },
      { typeTag: 'SANG-FROID', text: 'Prendre le gardien à contre-pied', outcome: { narrative: 'Une finition clinique.', effects: [{ text: '+5 TIR', style: 'positive' }, { text: '+3 PASSE', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 5), passing: Math.min(99, p.attributes.passing + 3) } }) } }
    ]
  },
  {
    id: 'att_drought', category: 'MENTAL', tag: 'Disette', targetPosition: 'ATT',
    description: "Vous n'avez pas marqué depuis 5 matchs. Les médias s'interrogent.",
    options: [
      { typeTag: 'ÉGOÏSTE', text: 'Tirer dans toutes les positions au prochain match', outcome: { narrative: 'Vous marquez enfin, mais oubliez vos partenaires.', effects: [{ text: '+5 TIR', style: 'positive' }, { text: '-5 PASSE', style: 'negative' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 5), passing: Math.max(15, p.attributes.passing - 5) } }) } },
      { typeTag: 'ALTRUISTE', text: 'Faire jouer les autres en attendant le déclic', outcome: { narrative: 'Vous devenez un passeur clé.', effects: [{ text: '+5 PASSE', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 5) } }) } }
    ]
  },

  // TOURNAMENT EVENTS
  {
    id: 'wc_group_stage', category: 'WORLD_CUP', tag: 'Coupe du Monde', targetPosition: '!GK',
    description: "C'est votre premier match de Coupe du Monde. La pression d'un pays entier est sur vos épaules.",
    options: [
      { typeTag: 'MENTAL', text: 'Rester concentré sur le jeu', outcome: { narrative: 'Vous faites un match solide et rassurant.', effects: [{ text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) }) } },
      { typeTag: 'RISQUE', text: 'Tenter un geste de folie d\'entrée', outcome: { narrative: 'Le geste réussit et enflamme le stade !', effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '+3 Dribble', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5), attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3) } }) } }
    ]
  },
  {
    id: 'euro_knockout', category: 'EURO', tag: 'Euro', targetPosition: '!GK',
    description: "Match à élimination directe de l'Euro. L'équipe adverse domine outrageusement.",
    options: [
      { typeTag: 'PHYSIQUE', text: 'Mettre de l\'impact pour réveiller l\'équipe', outcome: { narrative: 'Vous prenez un jaune mais l\'équipe se remet à jouer.', effects: [{ text: '+3 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) } },
      { typeTag: 'TACTIQUE', text: 'Haranguer les coéquipiers pour resserrer les lignes', outcome: { narrative: 'L\'équipe retrouve son bloc. Choix de leader.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } }
    ]
  },
  {
    id: 'wc_group_stage_gk', category: 'WORLD_CUP', tag: 'Coupe du Monde', targetPosition: 'GK',
    description: "Premier match de Coupe du Monde pour vous. La pression est à son comble sur vos buts.",
    options: [
      { typeTag: 'MENTAL', text: 'Rassurer votre défense à chaque occasion', outcome: { narrative: 'Vous rassurez tout le bloc équipe.', effects: [{ text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) }) } },
      { typeTag: 'CONCENTRATION', text: 'Rester figé sur votre ligne, sans risque', outcome: { narrative: 'Un clean sheet rassurant sans briller.', effects: [{ text: '+3 Positionnement', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, positioning: Math.min(99, (p.attributes.positioning || 50) + 3) } }) } }
    ]
  },
  {
    id: 'euro_knockout_gk', category: 'EURO', tag: 'Euro', targetPosition: 'GK',
    description: "Match à élimination directe de l'Euro. Vos coéquipiers reculent beaucoup trop.",
    options: [
      { typeTag: 'LEADERSHIP', text: 'Hurler sur vos défenseurs pour les faire remonter', outcome: { narrative: 'Ils vous écoutent, la pression s\'atténue.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } },
      { typeTag: 'RÉFLEXES', text: 'Sortir loin de vos buts pour couper les passes longues', outcome: { narrative: 'Prise de risque payante, vous soulagez la défense.', effects: [{ text: '+4 Plongeon', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, diving: Math.min(99, (p.attributes.diving || 50) + 4) } }) } }
    ]
  },
  
  // NOUVEAUX ÉVÉNEMENTS : RIVALITÉ & TRASH-TALKING
  {
    id: 'rival_trash_talk_1', category: 'RIVALITÉ', tag: 'Médias', targetPosition: 'ALL',
    condition: (p) => p.ovr > 75,
    description: "Votre rival déclare dans la presse que vous êtes 'surcoté' et qu'il est de loin le meilleur joueur du championnat.",
    options: [
      { typeTag: 'PROVOCATION', text: 'Lui répondre sèchement sur les réseaux sociaux', outcome: { narrative: 'Le public adore ce clash ! Mais votre entraîneur déteste ça.', effects: [{ text: '-10 Confiance', style: 'negative' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10), morale: Math.min(100, p.morale + 10) }) } },
      { typeTag: 'SANG-FROID', text: 'Ignorer la provocation et parler du prochain match', outcome: { narrative: 'Réponse très pro. La presse loue votre maturité.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } },
      { typeTag: 'ARROGANCE', text: 'Montrer vos trophées en conférence de presse', outcome: { narrative: 'Geste iconique mais très mal vu par certains.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) } }
    ]
  },
  {
    id: 'rival_transfer_rumor', category: 'RIVALITÉ', tag: 'Rumeur', targetPosition: 'ALL',
    condition: (p) => p.ovr > 80,
    description: "Une rumeur annonce que votre club veut recruter votre rival pour jouer à votre place !",
    options: [
      { typeTag: 'MENACE', text: 'Aller voir le président et menacer de partir', outcome: { narrative: 'Le président vous rassure, mais la confiance est brisée.', effects: [{ text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15) }) } },
      { typeTag: 'TRAVAIL', text: 'Redoubler d\'efforts à l\'entraînement', outcome: { narrative: 'Vous montrez qui est le patron sur le terrain.', effects: [{ text: '+3 Physique', style: 'positive' }, { text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) } }
    ]
  },

  // NOUVEAUX ÉVÉNEMENTS : CAPITAINE & ÉQUIPE NATIONALE
  {
    id: 'captain_crisis', category: 'ÉQUIPE NATIONALE', tag: 'Crise (Capitaine)', targetPosition: 'ALL',
    condition: (p) => p.nationalStatus === 'CAPITAINE',
    description: "L'équipe nationale traverse une crise. Le sélectionneur est critiqué, le vestiaire est divisé. En tant que Capitaine, vous devez agir.",
    options: [
      { typeTag: 'DISCOURS', text: 'Prendre la parole dans le vestiaire pour unir l\'équipe', outcome: { narrative: 'Un discours poignant qui relance la machine !', effects: [{ text: '+20 Moral', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 2) } }) } },
      { typeTag: 'MÉDIAS', text: 'Défendre le sélectionneur publiquement', outcome: { narrative: 'Le coach vous sera éternellement reconnaissant.', effects: [{ text: '+25 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 25) }) } },
      { requiredBackground: 'AMATEUR', typeTag: 'INTIMIDATION', text: '🔒 [Amateur] Recadrer violemment les rebelles', outcome: { narrative: 'Votre coup de sang remet tout le monde d\'accord. Personne ne bronche.', effects: [{ text: '+30 Moral', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30), coachTrust: Math.min(100, p.coachTrust + 10) }) } }
    ]
  },
  {
    id: 'national_team_glory', category: 'ÉQUIPE NATIONALE', tag: 'Hymne National 🎵', targetPosition: 'ALL',
    condition: (p) => (p.nationalCaps || 0) > 0,
    description: "Les notes de votre hymne national résonnent dans le stade comble. Vous ressentez un frisson indescriptible sous le maillot de votre pays.",
    options: [
      { typeTag: 'FIERTÉ', text: 'Chanter de tout votre cœur et jouer transcendé', outcome: { narrative: 'Vous livrez une prestation monumentale qui fait vibrer des millions de compatriotes !', effects: [{ text: '+25 Moral', style: 'positive' }, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 25), attributes: { ...p.attributes, finishing: Math.min(99, (p.attributes?.finishing || 50) + 2) } }) } },
      { typeTag: 'CONCENTRATION', text: 'Fermer les yeux et visualiser vos gestes techniques', outcome: { narrative: 'Une concentration clinique. Vous distillez des caviars tout au long du match.', effects: [{ text: '+15 Moral', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } }) } }
    ]
  },
  {
    id: 'national_team_press_hype', category: 'ÉQUIPE NATIONALE', tag: 'Espoir du Pays 🌟', targetPosition: 'ALL',
    condition: (p) => (p.nationalCaps || 0) > 0 && p.ovr >= 80,
    description: "Les journaux de votre pays vous désignent comme le futur guide de la sélection nationale pour la prochaine décennie.",
    options: [
      { typeTag: 'AMBITION', text: 'Revendiquer ce statut : "Je vais nous ramener des trophées"', outcome: { narrative: 'Une déclaration audacieuse qui galvanise les supporters !', effects: [{ text: '+20 Confiance', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), morale: Math.min(100, p.morale + 10) }) } },
      { typeTag: 'COLLECTIF', text: 'Tempérer : "C\'est le collectif qui gagne"', outcome: { narrative: 'Le vestiaire national apprécie votre humilité et votre esprit d\'équipe.', effects: [{ text: '+15 Confiance', style: 'positive' }, { text: '+5 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15), form: Math.min(100, p.form + 5) }) } }
    ]
  },
  ...EXTRA_EVENTS,
  ...EXTRA_EVENTS_2,
  ...EXTRA_EVENTS_3,
  ...EXTRA_EVENTS_4,
  ...EXTRA_EVENTS_5,
  ...EXTRA_EVENTS_6,
  ...EXTRA_EVENTS_7,
  ...EXTRA_EVENTS_8,
  ...EXTRA_EVENTS_9,
  ...EXTRA_EVENTS_10,
  ...EXTRA_EVENTS_11,
  ...EXTRA_EVENTS_12,
  ...COOP_EVENTS
];

export const PERKS_LIST = [
  { id: 'bg_street', name: 'Dalleux (Origine)', desc: 'Bonus de stats dans les moments difficiles.', icon: '🔥', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'bg_academy', name: 'Élève Modèle (Origine)', desc: 'La confiance du coach est plus facile à gagner', icon: '📚', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'bg_five', name: 'Technique Pure (Origine)', desc: 'Augmente considérablement les dribbles et la vista', icon: '⚡', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'renard', name: 'Renard des surfaces', desc: 'Augmente les buts de 30%', icon: '🦊', roles: ['ST', 'ATT'] },
  { id: 'maestro', name: 'Maestro', desc: 'Augmente les passes décisives de 30%', icon: '🎩', roles: ['MID', 'CM', 'ATT'] },
  { id: 'mur', name: 'Muraille', desc: 'Augmente les clean sheets de 30%', icon: '🧱', roles: ['DEF', 'CB', 'GK'] },
  { id: 'increvable', name: 'Increvable', desc: 'Le joueur joue 20% de matchs en plus', icon: '🫀', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB'] },
  { id: 'chouchou', name: 'Chouchou du coach', desc: 'Garantit quasiment une place de titulaire', icon: '👨‍👦', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] },
  { id: 'star', name: 'Superstar', desc: 'Génère 50% de revenus supplémentaires', icon: '⭐', roles: ['ST', 'ATT', 'MID', 'CM', 'DEF', 'CB', 'GK'] }
];

export const CHALLENGES_LIST = [
  { id: 'none', name: 'Classique', desc: 'Une carrière normale, sans contrainte particulière.', icon: '⚽', multiplier: 1.0 },
  { id: 'one_club', name: 'One-Club Man', desc: 'Vous n\'avez pas le droit d\'accepter une seule offre de transfert. Vous devez rester dans votre club formateur.', icon: '🛡️', multiplier: 1.5 },
  { id: 'mercenaire', name: 'Le Grand Voyageur', desc: 'À chaque fin de saison, si vous recevez des offres, vous êtes obligé d\'en accepter une.', icon: '✈️', multiplier: 1.3 },
  { id: 'hardcore', name: 'Sans Filet', desc: 'Vous commencez avec des stats très faibles et aucun budget. La moindre erreur pardonne moins.', icon: '💀', multiplier: 2.0 }
];


export const getRandomSeasonEvents = (player, completedEvents = [], matchesPlayed = 38, tournaments = {}, clubTier = null, isCoopMode = false) => { 
  const playerPosition = player?.position || 'ALL'; 
  const accountData = getAccountData();
  const hasTitanBody = accountData.unlockedPerks.includes('titan_body');
  
  const compatibleEvents = ALL_EVENTS.filter(ev => { 
    if (ev.category === 'FRÈRES D\'ARMES' && !isCoopMode) return false;
    
    if (ev.targetPosition && ev.targetPosition !== 'ALL') {
      if (ev.targetPosition.startsWith('!')) {
        const excluded = ev.targetPosition.substring(1);
        if (playerPosition.includes(excluded)) return false;
      } else if (!playerPosition.includes(ev.targetPosition)) {
        return false;
      }
    }
    if (completedEvents.includes(ev.id) && ev.isFirstTime) return false; 
    
    if (ev.category === 'WORLD_CUP' && !tournaments?.worldCup) return false;
    if (ev.category === 'EURO' && !tournaments?.euro) return false;
    if (ev.category === 'CHAMPIONS_LEAGUE' && !tournaments?.championsLeague) return false;
    if (ev.category === 'CUP' && !tournaments?.domesticCup) return false;
    
    // Evaluate specific conditions like age, OVR, bankBalance, etc.
    if (ev.condition && !ev.condition(player)) return false;
    
    // Titan Body logic: 80% chance to dodge injury events
    if (hasTitanBody && (ev.category === 'INJURY' || (ev.title && ev.title.toLowerCase().includes('blessure')))) {
      if (Math.random() < 0.8) return false;
    }
    
    return true; 
  }); 
  
  let numEvents = 3;
  
  // Force tournament events if applicable
  const tournamentEvents = compatibleEvents.filter(ev => ['WORLD_CUP', 'EURO', 'CHAMPIONS_LEAGUE', 'CUP'].includes(ev.category));
  const regularEvents = compatibleEvents.filter(ev => !['WORLD_CUP', 'EURO', 'CHAMPIONS_LEAGUE', 'CUP'].includes(ev.category));
  
  const selectedRegular = regularEvents.sort(() => 0.5 - Math.random()).slice(0, Math.max(1, numEvents - tournamentEvents.length));
  
  return [...tournamentEvents, ...selectedRegular].sort(() => 0.5 - Math.random()).slice(0, numEvents + tournamentEvents.length); 
};

export const generateRival = (player) => {
  const pos = (player.position || 'ATT').toUpperCase();
  const isGkRival = pos.includes('GK') || pos.includes('GB') || pos.includes('GARDIEN');
  
  const nationality = player.nationality || 'FR';
  const name = getRandomName(nationality, player.gender);
  const ovr = (player.ovr || 50) + Math.floor(Math.random() * 5); // Rival starts slightly better or equal
  
  let baseStats = { pace: ovr, finishing: ovr, passing: ovr, dribbling: ovr, defense: ovr, physical: ovr };
  
  // Pondération logique selon le poste du rival
  if (pos.includes('ATT') || pos.includes('ST')) {
    baseStats = { ...baseStats, finishing: ovr + 12, pace: ovr + 8, defense: ovr - 15 };
  } else if (pos.includes('MID') || pos.includes('MIL')) {
    baseStats = { ...baseStats, passing: ovr + 12, dribbling: ovr + 8, finishing: ovr - 5 };
  } else if (pos.includes('DEF') || pos.includes('ARR')) {
    baseStats = { ...baseStats, defense: ovr + 15, physical: ovr + 10, finishing: ovr - 20 };
  } else if (isGkRival) {
    baseStats = { diving: ovr + 10, handling: ovr + 10, reflexes: ovr + 10, positioning: ovr + 5, kicking: ovr, pace: ovr - 10 };
  }

  const attributes = {};
  Object.keys(baseStats).forEach(attr => {
    attributes[attr] = Math.max(1, Math.min(99, baseStats[attr] + Math.floor(Math.random() * 10) - 5));
  });

  const age = player.age || 18;
  return {
    id: `rival_${Date.now()}`,
    name,
    position: pos, // Le rival joue au même poste que le joueur
    age,
    ovr,
    attributes,
    club: ALL_CLUBS[Math.floor(Math.random() * ALL_CLUBS.length)],
    history: [],
    headToHeadWins: 0,
    headToHeadLosses: 0,
    ballonDorCount: 0,
    trophiesCount: 0
  };
};

export const updateRival = (rival, playerOvr, playerClub, playerWonBallonDor, playerWonCL) => {
  if (!rival) return null;
  
  const newAge = (rival.age || 18) + 1;
  const isGkRival = (rival.position || '').toUpperCase().includes('GK') || (rival.position || '').toUpperCase().includes('GB');
  let newOvr = rival.ovr;
  
  // Courbe de progression/déclin adaptée au poste
  const peakAge = isGkRival ? 31 : 26;
  const declineStart = isGkRival ? 35 : 31;
  
  if (newAge < peakAge) {
    newOvr += Math.floor(Math.random() * 4);
  } else if (newAge > declineStart) {
    const declineRate = isGkRival ? 2 : 3; // Les GK déclinent plus lentement
    newOvr -= Math.floor(Math.random() * declineRate) + 1;
  } else {
    newOvr += Math.floor(Math.random() * 2) - 1;
  }
  
  if (newAge <= declineStart && newOvr < playerOvr - 5) {
     newOvr = playerOvr - 5;
  }
  newOvr = Math.max(40, Math.min(99, newOvr));
  
  const ovrDiff = newOvr - rival.ovr;
  const defaultAttrs = isGkRival
    ? { diving: rival.ovr, handling: rival.ovr, reflexes: rival.ovr, positioning: rival.ovr, kicking: rival.ovr, pace: rival.ovr }
    : { pace: rival.ovr, finishing: rival.ovr, passing: rival.ovr, dribbling: rival.ovr, defense: rival.ovr, physical: rival.ovr };
  const newAttributes = { ...(rival.attributes || defaultAttrs) };
  Object.keys(newAttributes).forEach(attr => {
    let variation = ovrDiff + (Math.floor(Math.random() * 3) - 1);
    if (newAge > declineStart) {
      // Les stats physiques chutent plus vite
      const physicalStats = isGkRival ? ['pace', 'reflexes'] : ['pace', 'physical'];
      if (physicalStats.includes(attr)) {
        variation -= Math.floor(Math.random() * 3);
      }
    }
    newAttributes[attr] = Math.max(15, Math.min(99, newAttributes[attr] + variation));
  });
  
  // Simulation des succès du rival
  let rivalWonBallonDor = false;
  let rivalWonCL = false;
  let newBallonDorCount = rival.ballonDorCount || 0;
  let newTrophiesCount = rival.trophiesCount || 0;

  // Si le joueur n'a pas gagné le Ballon d'Or, le rival a une chance de le gagner s'il a un gros OVR
  if (!playerWonBallonDor && newOvr > 85) {
    if (Math.random() < (newOvr - 85) * 0.05) {
      rivalWonBallonDor = true;
      newBallonDorCount++;
    }
  }

  // Trophées collectifs (LDC ou Ligue)
  if (!playerWonCL && newOvr > 80 && Math.random() < 0.2) {
    rivalWonCL = true;
    newTrophiesCount++;
  } else if (Math.random() < 0.3) {
    newTrophiesCount++; // Gagne un championnat national par exemple
  }

  // Logique de transfert du Rival (IA)
  let currentClub = rival.club || ALL_CLUBS[0];
  let newClub = currentClub;
  const currentTier = currentClub.tier || 3;
  let targetTier = currentTier;
  let shouldTransfer = false;

  // Progression naturelle vers les tops clubs
  if (newOvr > 85 && currentTier > 1) {
    targetTier = 1;
    shouldTransfer = true;
  } else if (newOvr > 75 && currentTier > 2) {
    targetTier = 2;
    shouldTransfer = true;
  } else if (newOvr > 88 && currentTier === 1 && Math.random() < 0.15) {
    // Top joueur qui change de top club (transfert blockbuster)
    shouldTransfer = true;
  }

  // Logique de "Némésis" : Si le joueur est dans un gros club (Tier 1 ou 2), 
  // le rival va essayer de rejoindre la même ligue/pays pour l'affronter directement !
  let targetOrigin = null;
  if (playerClub && playerClub.tier <= 2 && newOvr >= 80 && Math.random() < 0.5) {
      targetOrigin = playerClub.origin; // Le rival veut aller dans le même championnat
      targetTier = playerClub.tier;
      shouldTransfer = true;
  }

  if (shouldTransfer) {
      let possibleClubs = ALL_CLUBS.filter(c => c.tier === targetTier && c.id !== currentClub.id);
      
      // Filtrer par origine si on a une cible Némésis
      if (targetOrigin) {
          const nemesisClubs = possibleClubs.filter(c => c.origin === targetOrigin && c.id !== playerClub.id);
          if (nemesisClubs.length > 0) {
              possibleClubs = nemesisClubs;
          }
      }

      if (possibleClubs.length > 0) {
          newClub = possibleClubs[Math.floor(Math.random() * possibleClubs.length)];
          // Historique de transfert (optionnel, pour l'affichage plus tard)
          const transferHistory = rival.history || [];
          transferHistory.push({ age: newAge, from: currentClub.name, to: newClub.name });
          rival.history = transferHistory;
      }
  }

  return { 
    ...rival, 
    age: newAge,
    attributes: newAttributes,
    ovr: newOvr,
    club: newClub,
    ballonDorCount: newBallonDorCount,
    trophiesCount: newTrophiesCount,
    justWonBallonDor: rivalWonBallonDor, // flag for events
    justWonCL: rivalWonCL,
    history: rival.history || []
  };
};


export const INTERACTIVE_MATCH_SCENARIOS = [
  {
    id: 'im_last_minute_goal',
    targetPosition: '!GK',
    title: "90ème Minute : Balle de Match",
    description: "Le score est de 1-1. Vous recevez le ballon à l'entrée de la surface de réparation adverse. Le stade retient son souffle.",
    options: [
      { text: "Frapper en force sous la barre !", stat: 'finishing', successText: "QUEL BUT MAGNIFIQUE ! Vous offrez la victoire à votre équipe !", failText: "Le tir s'envole dans les tribunes... C'est fini.", type: 'goal' },
      { text: "Chercher la passe en profondeur", stat: 'passing', successText: "Passe millimétrée ! Votre coéquipier finit le travail !", failText: "Interception du défenseur, mauvaise lecture du jeu.", type: 'assist' },
      { text: "Provoquer en dribblant le défenseur", stat: 'dribbling', successText: "Pénalty ! Vous le transformez dans la foulée !", failText: "Vous perdez le ballon et gâchez la dernière occasion...", type: 'goal' }
    ]
  },
  {
    id: 'im_counter_attack',
    targetPosition: '!GK',
    title: "85ème Minute : Contre-Attaque Éclair",
    description: "Vous menez 1-0 mais l'adversaire pousse. Vous récupérez le ballon au milieu de terrain.",
    options: [
      { text: "Taper un sprint pour jouer seul", stat: 'pace', successText: "Vous déposez tout le monde et doublez la mise !", failText: "Vous êtes rattrapé et perdez la balle bêtement.", type: 'goal' },
      { text: "Conserver le ballon avec votre corps", stat: 'physical', successText: "Vous obtenez une faute précieuse pour gagner du temps.", failText: "Le défenseur vous bouscule et récupère le cuir.", type: 'defend' },
      { text: "Lancer un long ballon", stat: 'passing', successText: "Ouverture sublime, but de l'attaquant !", failText: "Directement en touche...", type: 'assist' }
    ]
  },
  {
    id: 'im_last_minute_save',
    targetPosition: 'GK',
    title: "90ème Minute : Face à Face Décisif",
    description: "L'attaquant adverse se présente seul face à vous dans le temps additionnel. Le stade retient son souffle.",
    options: [
      { text: "Sortir à la vitesse de l'éclair", stat: 'pace', successText: "Sortie parfaite, vous dégagez le ballon !", failText: "Trop lent, l'attaquant vous dribble et marque.", type: 'clean_sheet' },
      { text: "Plonger pour bloquer l'angle", stat: 'diving', successText: "ARRÊT MONUMENTAL DU BOUT DES DOIGTS !", failText: "Pris à contre-pied...", type: 'clean_sheet' },
      { text: "Rester sur ses appuis (Réflexes)", stat: 'reflexes', successText: "Arrêt réflexe du pied magnifique !", failText: "Frappe trop puissante qui vous passe entre les jambes.", type: 'clean_sheet' }
    ]
  },
  {
    id: 'im_corner_kick_defense',
    targetPosition: 'GK',
    title: "88ème Minute : Corner Dangereux",
    description: "Corner de la dernière chance pour l'adversaire. La surface est bondée.",
    options: [
      { text: "S'imposer dans les airs (Maniabilité)", stat: 'handling', successText: "Vous captez le ballon au-dessus de tout le monde !", failText: "Vous relâchez le ballon... But.", type: 'clean_sheet' },
      { text: "Dégager au pied", stat: 'kicking', successText: "Dégagement puissant qui lance une contre-attaque !", failText: "Dégagement raté qui retombe sur un adversaire...", type: 'clean_sheet' },
      { text: "Faire confiance à son placement", stat: 'positioning', successText: "La tête adverse arrive directement dans vos gants.", failText: "Mauvais placement, le ballon finit au fond.", type: 'clean_sheet' }
    ]
  }
];

export const playInteractiveMatch = (scenario, optionIndex, player) => {
  const option = scenario.options[optionIndex];
  const statVal = Number(player.attributes[option.stat]) || 50;
  
  // Chance de succès basée sur la stat (50 stat = 50% chance, 99 stat = 99% chance)
  const isSuccess = Math.random() * 100 < statVal;
  
  return {
    success: isSuccess,
    narrative: isSuccess ? option.successText : option.failText,
    type: option.type, // 'goal', 'assist', 'defend'
    isClutch: true
  };
};

export const distributeExcessStats = (attributes = {}, rawIncreases = {}) => {
  const updated = { ...attributes };
  let excessPool = 0;

  // Process rawIncreases if provided
  Object.entries(rawIncreases).forEach(([attr, gain]) => {
    if (updated[attr] !== undefined && gain > 0) {
      const target = updated[attr] + gain;
      if (target > 99) {
        excessPool += (target - 99);
        updated[attr] = 99;
      } else {
        updated[attr] = target;
      }
    }
  });

  // Check any stat currently > 99
  ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'].forEach(attr => {
    if ((updated[attr] || 0) > 99) {
      excessPool += (updated[attr] - 99);
      updated[attr] = 99;
    }
  });

  // Distribute excess points to random non-maxed stats (< 99)
  if (excessPool > 0) {
    const nonMaxed = ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'].filter(
      k => (updated[k] || 0) < 99
    );
    while (excessPool > 0 && nonMaxed.length > 0) {
      const idx = Math.floor(Math.random() * nonMaxed.length);
      const statKey = nonMaxed[idx];
      updated[statKey] = (updated[statKey] || 50) + 1;
      excessPool--;
      if (updated[statKey] >= 99) {
        nonMaxed.splice(idx, 1);
      }
    }
  }

  return updated;
};

export const updatePlayerBestCard = (player, currentClub) => {
  if (!player) return player;
  const currentOvr = player.ovr || calculateOVR(player);
  const currentSum = Object.values(player.attributes || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  const prevBestOvr = player.bestCard?.ovr || 0;
  const prevBestSum = player.bestCard ? Object.values(player.bestCard.attributes || {}).reduce((a, b) => a + (Number(b) || 0), 0) : 0;

  if (!player.bestCard || currentOvr > prevBestOvr || (currentOvr === prevBestOvr && currentSum > prevBestSum)) {
    return {
      ...player,
      careerMaxOvr: Math.max(player.careerMaxOvr || 0, currentOvr),
      bestCard: {
        name: player.name,
        lastName: player.lastName,
        position: player.position,
        origin: typeof player.origin === 'object' ? player.origin.id : player.origin,
        ovr: currentOvr,
        attributes: { ...player.attributes },
        club: currentClub ? { name: currentClub.name, primary: currentClub.primary, secondary: currentClub.secondary, id: currentClub.id, origin: currentClub.origin } : (player.bestCard?.club || null),
        age: player.age
      }
    };
  }
  return {
    ...player,
    careerMaxOvr: Math.max(player.careerMaxOvr || 0, currentOvr)
  };
};

export const getBestPlayerVersion = (player, currentClub) => {
  if (!player) return { player, club: currentClub };
  
  if (player.bestCard && player.bestCard.attributes) {
    return {
      player: {
        ...player,
        ovr: player.bestCard.ovr || player.careerMaxOvr || player.ovr,
        attributes: player.bestCard.attributes,
        position: player.bestCard.position || player.position,
        age: player.bestCard.age || player.age
      },
      club: player.bestCard.club || currentClub
    };
  }

  // Fallback: If player has careerHistory, find season with max OVR
  if (player.careerHistory && player.careerHistory.length > 0) {
    const bestSeason = [...player.careerHistory].sort((a, b) => (b.ovr || 0) - (a.ovr || 0))[0];
    if (bestSeason) {
      return {
        player: {
          ...player,
          ovr: bestSeason.ovr || player.careerMaxOvr || player.ovr,
          attributes: player.attributes
        },
        club: bestSeason.club ? { name: bestSeason.club, origin: bestSeason.origin, primary: currentClub?.primary || '#1e293b', secondary: currentClub?.secondary || '#334155' } : currentClub
      };
    }
  }

  return {
    player: {
      ...player,
      ovr: player.careerMaxOvr || player.ovr
    },
    club: currentClub
  };
};

export const gkProgressionCurve = (age, attribute) => {
  // Define different progression phases for goalkeepers
  // Early growth (18-25): Slow but steady
  // Peak period (26-34): Steady growth to peak
  // Decline (35+): Gradual decline
  
  if (age < 18) return 0; // No progression before 18
  
  // Define different multipliers for each age phase
  let multiplier = 0;
  
  if (age >= 18 && age <= 25) {
    // Slow early growth
    multiplier = 0.3 + (age - 18) * 0.04; // From 0.3 to 0.7
  } else if (age >= 26 && age <= 34) {
    // Peak period with steady growth
    multiplier = 0.7 + (age - 26) * 0.05; // From 0.7 to 1.2
  } else if (age >= 35 && age <= 40) {
    // Decline period
    multiplier = 1.2 - (age - 35) * 0.15; // From 1.2 to 0.15
  } else {
    // Beyond 40, very slow decline or stability
    multiplier = 0.1;
  }
  
  // For different attributes, apply different multipliers
  const attributeMultipliers = {
    'reflexes': multiplier,
    'diving': multiplier,
    'handling': multiplier * 0.9,
    'kicking': multiplier * 0.8,
    'throwing': multiplier * 0.7,
    'pace': multiplier * 0.6
  };
  
  // Return the appropriate multiplier for this attribute
  return attributeMultipliers[attribute] || multiplier;
};

export const getGKProgressionBoost = (player, attribute) => {
  if (!player || !player.age) return 0;
  
  // Get current progression multiplier
  const multiplier = gkProgressionCurve(player.age, attribute);
  
  // Apply a base boost (this is the training center effect)
  const baseBoost = 1;
  
  // Calculate total boost based on age and attribute
  return Math.floor(baseBoost * multiplier);
};

export const calculateGKOVR = (player) => {
  if (!player || !player.attributes) return 0;
  
  // For goalkeepers, we use a different OVR calculation that emphasizes 
  // specific GK attributes
  const { reflexes, diving, handling, kicking, throwing, pace } = player.attributes;
  
  // Goalkeeper OVR is calculated as weighted average of key GK attributes
  // These weights reflect the importance of each attribute for goalkeepers
  const ovr = 
    (reflexes * 0.25) +     // Reflexes are crucial for GK OVR
    (diving * 0.20) +       // Diving is very important for GK OVR  
    (handling * 0.15) +     // Handling matters a lot for goalkeepers
    (kicking * 0.10) +      // Kicking is less critical but still important
    (throwing * 0.10) +     // Throwing is useful for GK OVR
    (pace * 0.20);          // Pace is important for goalkeepers
  
  return Math.round(ovr);
};

