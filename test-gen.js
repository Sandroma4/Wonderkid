import { calculateOVR, generateYoungPlayerStats, getRandomName } from './src/utils/gameData.js';

const baseStats = { pace: 80, finishing: 85, passing: 65, dribbling: 75, defense: 40, physical: 70 };
const currentOvr = calculateOVR({ position: 'ATT', attributes: baseStats });
console.log("Current OVR for baseStats ATT:", currentOvr);

const youngStats = generateYoungPlayerStats('ATT', baseStats, null);
console.log("Young Stats:", youngStats);
console.log("Young OVR:", calculateOVR({ position: 'ATT', attributes: youngStats }));

const n1 = getRandomName('AR');
const n2 = getRandomName({ id: 'BR', name: 'Brazil' });
console.log("Names:", n1, n2);
