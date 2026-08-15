const fs = require('fs');
const path = require('path');

const newCountries = [
  { id: 'ES', name: 'Espagne' },
  { id: 'AR', name: 'Argentine' },
  { id: 'EN', name: 'Angleterre' },
  { id: 'FR', name: 'France' },
  { id: 'CO', name: 'Colombie' },
  { id: 'PT', name: 'Portugal' },
  { id: 'BR', name: 'Brésil' },
  { id: 'NL', name: 'Pays-Bas' },
  { id: 'NO', name: 'Norvège' },
  { id: 'BE', name: 'Belgique' },
  { id: 'CH', name: 'Suisse' },
  { id: 'MX', name: 'Mexique' },
  { id: 'DE', name: 'Allemagne' },
  { id: 'MA', name: 'Maroc' },
  { id: 'JP', name: 'Japon' },
  { id: 'HR', name: 'Croatie' },
  { id: 'EC', name: 'Équateur' },
  { id: 'DK', name: 'Danemark' },
  { id: 'IT', name: 'Italie' },
  { id: 'TR', name: 'Turquie' }
];

const firstNamesMale = {
  ES: ['Mateo', 'Leo', 'Lucas', 'Martín', 'Daniel', 'Alejandro', 'Pablo', 'Manuel', 'Álvaro', 'Adrián'],
  AR: ['Thiago', 'Mateo', 'Benjamín', 'Bautista', 'Agustín', 'Felipe', 'Joaquín', 'Juan', 'Tomás', 'Nicolás'],
  EN: ['James', 'Oliver', 'Noah', 'George', 'Leo', 'Charlie', 'Harry', 'Jack', 'Thomas', 'Oscar'],
  FR: ['Lucas', 'Enzo', 'Gabriel', 'Louis', 'Raphaël', 'Arthur', 'Jules', 'Maël', 'Noah', 'Hugo'],
  CO: ['Santiago', 'Sebastián', 'Samuel', 'Mateo', 'Jerónimo', 'Maximiliano', 'Emmanuel', 'Emiliano', 'David', 'Juan'],
  PT: ['João', 'Martim', 'Rodrigo', 'Tomás', 'Tiago', 'Francisco', 'Dinis', 'Afonso', 'Miguel', 'Duarte'],
  BR: ['Miguel', 'Arthur', 'Gael', 'Heitor', 'Theo', 'Davi', 'Gabriel', 'Bernardo', 'Samuel', 'João Miguel'],
  NL: ['Noah', 'Sem', 'Liam', 'Lucas', 'Daan', 'Finn', 'Mees', 'Milan', 'Levi', 'Luuk'],
  NO: ['Jakob', 'Emil', 'Noah', 'Oliver', 'William', 'Filip', 'Mathias', 'Lucas', 'Johannes', 'Isak'],
  BE: ['Noah', 'Arthur', 'Louis', 'Liam', 'Jules', 'Victor', 'Lucas', 'Gabriel', 'Leo', 'Oscar'],
  CH: ['Noah', 'Leon', 'Luca', 'Matteo', 'Gabriel', 'Elias', 'Louis', 'Liam', 'Mael', 'Ben'],
  MX: ['Santiago', 'Mateo', 'Sebastián', 'Leonardo', 'Matías', 'Emiliano', 'Diego', 'Daniel', 'Miguel', 'Alexander'],
  DE: ['Noah', 'Matteo', 'Elias', 'Leon', 'Finn', 'Paul', 'Lukas', 'Henry', 'Felix', 'Jonas'],
  MA: ['Mohammed', 'Amine', 'Hamza', 'Youssef', 'Ayoub', 'Omar', 'Ali', 'Zayd', 'Ilyas', 'Anas'],
  JP: ['Haruto', 'Minato', 'Yuto', 'Riku', 'Sota', 'Hayato', 'Ren', 'Kaito', 'Sora', 'Yuma'],
  HR: ['Luka', 'Ivan', 'Marko', 'Matej', 'David', 'Josip', 'Karlo', 'Filip', 'Petar', 'Ivano'],
  EC: ['Luis', 'Carlos', 'José', 'Juan', 'Jorge', 'Diego', 'Kevin', 'Bryan', 'Christian', 'Mateo'],
  DK: ['William', 'Oscar', 'Carl', 'Malthe', 'Emil', 'Noah', 'Valdemar', 'Aksel', 'August', 'Lucas'],
  IT: ['Leonardo', 'Francesco', 'Alessandro', 'Lorenzo', 'Mattia', 'Tommaso', 'Gabriele', 'Andrea', 'Riccardo', 'Edoardo'],
  TR: ['Yusuf', 'Miraç', 'Eymen', 'Ömer', 'Mustafa', 'Ali', 'Kerem', 'Emir', 'Alparslan', 'Hamza']
};

const firstNamesFemale = {
  ES: ['Lucía', 'Martina', 'Sofía', 'María', 'Julia', 'Paula', 'Valeria', 'Emma', 'Daniela', 'Alba'],
  AR: ['Isabella', 'Martina', 'Catalina', 'Emma', 'Delfina', 'Valentina', 'Sofía', 'Bautista', 'Julieta', 'Olivia'],
  EN: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Ivy', 'Freya', 'Lily', 'Florence', 'Mia', 'Willow'],
  FR: ['Emma', 'Jade', 'Louise', 'Alice', 'Chloé', 'Lina', 'Rose', 'Léa', 'Mila', 'Ambre'],
  CO: ['Salomé', 'Antonella', 'Isabella', 'Luciana', 'María', 'Emiliana', 'Valery', 'Victoria', 'Gabriela', 'Mariana'],
  PT: ['Maria', 'Leonor', 'Matilde', 'Beatriz', 'Carolina', 'Mariana', 'Ana', 'Inês', 'Margarida', 'Sofia'],
  BR: ['Helena', 'Alice', 'Laura', 'Manuela', 'Sophia', 'Isabella', 'Luísa', 'Heloísa', 'Cecília', 'Maitê'],
  NL: ['Emma', 'Mila', 'Julia', 'Zoe', 'Tess', 'Sophie', 'Sara', 'Yara', 'Nora', 'Lotte'],
  NO: ['Nora', 'Emma', 'Olivia', 'Sofie', 'Emilie', 'Lea', 'Sofia', 'Sara', 'Amalie', 'Ingrid'],
  BE: ['Olivia', 'Emma', 'Louise', 'Mila', 'Alice', 'Camille', 'Juliette', 'Sofia', 'Lina', 'Elena'],
  CH: ['Mia', 'Alina', 'Emma', 'Lina', 'Elena', 'Laura', 'Sofia', 'Nina', 'Mila', 'Lara'],
  MX: ['Sofía', 'María', 'Valentina', 'Regina', 'Camila', 'Valeria', 'Ximena', 'Victoria', 'Isabella', 'Romina'],
  DE: ['Mia', 'Emma', 'Sofia', 'Hannah', 'Emilia', 'Anna', 'Lina', 'Mila', 'Lea', 'Marie'],
  MA: ['Fatima', 'Khadija', 'Salma', 'Sara', 'Aya', 'Nour', 'Malak', 'Mariam', 'Yasmina', 'Leila'],
  JP: ['Hina', 'Yui', 'Sakura', 'Ichika', 'Akari', 'Aoi', 'Himari', 'Rio', 'Kokoro', 'Kanna'],
  HR: ['Mia', 'Lucija', 'Sara', 'Nika', 'Ema', 'Marta', 'Petra', 'Ana', 'Iva', 'Lana'],
  EC: ['María', 'Ana', 'Andrea', 'Diana', 'Erika', 'Génesis', 'Daniela', 'Fernanda', 'Josselyn', 'Carmen'],
  DK: ['Alma', 'Agnes', 'Ella', 'Freja', 'Clara', 'Emma', 'Sofia', 'Ida', 'Anna', 'Olivia'],
  IT: ['Sofia', 'Aurora', 'Giulia', 'Ginevra', 'Alice', 'Beatrice', 'Emma', 'Giorgia', 'Vittoria', 'Matilde'],
  TR: ['Zeynep', 'Elif', 'Defne', 'Asel', 'Azra', 'Eylül', 'Nehir', 'Meryem', 'Asya', 'Zehra']
};

const lastNames = {
  ES: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín'],
  AR: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'Romero', 'Sánchez'],
  EN: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Taylor', 'Anderson'],
  FR: ['Moreau', 'Bernard', 'Petit', 'Roux', 'Leroy', 'Morel', 'Gauthier', 'Lambert', 'Faure', 'Meyer'],
  CO: ['Rodríguez', 'Gómez', 'González', 'Martínez', 'García', 'López', 'Hernández', 'Sánchez', 'Ramírez', 'Pérez'],
  PT: ['Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins', 'Jesus', 'Sousa'],
  BR: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'],
  NL: ['de Jong', 'Jansen', 'de Vries', 'van den Berg', 'van Dijk', 'Bakker', 'Janssen', 'Visser', 'Smit', 'Meijer'],
  NO: ['Hansen', 'Johansen', 'Olsen', 'Larsen', 'Andersen', 'Pedersen', 'Nilsen', 'Kristiansen', 'Jensen', 'Karlsen'],
  BE: ['Peeters', 'Janssens', 'Maes', 'Jacobs', 'Mertens', 'Willems', 'Claes', 'Goossens', 'Wouters', 'De Smet'],
  CH: ['Müller', 'Meier', 'Schmid', 'Keller', 'Weber', 'Huber', 'Schneider', 'Meyer', 'Steiner', 'Frei'],
  MX: ['Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Rodríguez', 'Sánchez', 'Ramírez', 'Cruz'],
  DE: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schäfer'],
  MA: ['Alaoui', 'Amrani', 'Tazi', 'Bennis', 'Lahlou', 'Benjelloun', 'Chraibi', 'Filali', 'El Fassi', 'Kabbaj'],
  JP: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato'],
  HR: ['Horvat', 'Kovačević', 'Babić', 'Marić', 'Jurić', 'Novak', 'Kovačić', 'Knežević', 'Vuković', 'Marković'],
  EC: ['Zambrano', 'Sánchez', 'García', 'Vera', 'López', 'Cedeño', 'Rodríguez', 'González', 'Macías', 'Castro'],
  DK: ['Nielsen', 'Jensen', 'Hansen', 'Pedersen', 'Andersen', 'Christensen', 'Larsen', 'Sørensen', 'Rasmussen', 'Jørgensen'],
  IT: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco'],
  TR: ['Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir']
};

const newString = `export const COUNTRIES = ${JSON.stringify(newCountries, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const FIRST_NAMES_MALE = ${JSON.stringify(firstNamesMale, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const FIRST_NAMES_FEMALE = ${JSON.stringify(firstNamesFemale, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const LAST_NAMES = ${JSON.stringify(lastNames, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const getRandomName = (countryId, genderId = 'male') => {
  const isFemale = (genderId === 'female' || genderId === 'F');
  const firsts = isFemale ? (FIRST_NAMES_FEMALE[countryId] || FIRST_NAMES_FEMALE.FR) : (FIRST_NAMES_MALE[countryId] || FIRST_NAMES_MALE.FR);
  const lasts = LAST_NAMES[countryId] || LAST_NAMES.FR;
  const randomFirst = firsts[Math.floor(Math.random() * firsts.length)];
  const randomLast = lasts[Math.floor(Math.random() * lasts.length)];
  return \`\${randomFirst} \${randomLast}\`;
};`;

const filePath = path.join(__dirname, 'src', 'utils', 'gameData.js');
const data = fs.readFileSync(filePath, 'utf8');

// Regex to find the block to replace
const regex = /export const COUNTRIES = \[[\s\S]*?export const getRandomName = [\s\S]*?};/g;

if (regex.test(data)) {
    const updatedData = data.replace(regex, newString);
    fs.writeFileSync(filePath, updatedData, 'utf8');
    console.log("Successfully updated names and countries!");
} else {
    console.log("Could not find the block to replace in gameData.js");
}
