const fs = require('fs');

const categories = ['MATCH', 'ENTRAÎNEMENT', 'LIFESTYLE', 'CARRIÈRE'];
const styles = ['positive', 'negative'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvents(startIndex, count, fileIndex) {
  let events = [];
  
  for (let i = 0; i < count; i++) {
    let idNum = startIndex + i;
    let cat = randomChoice(categories);
    
    events.push(`
  {
    id: 'extra_${idNum}', category: '${cat}', tag: 'Divers', targetPosition: 'ALL', condition: () => true,
    description: "Événement généré n°${idNum} de type ${cat}. Une situation inattendue se présente.",
    options: [
      { typeTag: 'Option A', text: 'Prendre le risque', outcome: [
        { probability: 0.8, narrative: 'Le risque paie, belle réussite.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) },
        { probability: 0.2, narrative: 'Le risque échoue misérablement.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Option B', text: 'Jouer la sécurité', outcome: [
        { probability: 0.8, narrative: 'Rien de spécial ne se passe.', effects: [{ text: '+5 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 5) }) },
        { probability: 0.2, narrative: 'La prudence vous coûte cher.', effects: [{ text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] }
    ]
  }`);
  }
  
  let content = `export const EXTRA_EVENTS_${fileIndex} = [\n  ${events.join(',')}\n];\n`;
  fs.writeFileSync(`src/utils/extraEvents${fileIndex}.js`, content, 'utf8');
}

generateEvents(46, 25, 4); // Oh wait, I already have up to 50 in extraEvents3!
// So let's start from 51!
generateEvents(51, 25, 4);
generateEvents(76, 25, 5);
generateEvents(101, 25, 6);
generateEvents(126, 25, 7);

console.log('Events generated.');
