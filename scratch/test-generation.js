import { generateYoungPlayerStats, getRandomName } from '../src/utils/gameData.js';

const baseStats = { pace: 80, finishing: 85, passing: 65, dribbling: 75, defense: 40, physical: 70 };
const backgroundBonus = { finishing: 3, passing: 3 };

console.log("Stats test:");
const stats = generateYoungPlayerStats('ATT', baseStats, backgroundBonus);
console.log(stats);

console.log("Name test:");
const name1 = getRandomName('AR');
const name2 = getRandomName({ id: 'BR', name: 'Brazil' });
const name3 = getRandomName({ id: 'FR', name: 'France' });

console.log({ name1, name2, name3 });
