const fs = require('fs');
const files = ['src/utils/extraEvents.js', 'src/utils/extraEvents2.js', 'src/utils/extraEvents3.js'];

const thirdOptions = {
  'LIFESTYLE': `      { typeTag: 'NEUTRE', text: 'Ignorer la situation et se reposer', outcome: { narrative: 'Vous passez une soirée tranquille à la maison.', effects: [{ text: '+5 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 5) }) } }`,
  'ENTRAÎNEMENT': `      { typeTag: 'NEUTRE', text: 'S\\'entraîner normalement sans faire de vagues', outcome: { narrative: 'Une séance classique et studieuse.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } }`,
  'MÉDIAS': `      { typeTag: 'NEUTRE', text: 'Faire une réponse très banale (langue de bois)', outcome: { narrative: 'Les journalistes n\\'ont rien à se mettre sous la dent.', effects: [], applyStats: (p) => p } }`,
  'VESTIAIRE': `      { typeTag: 'NEUTRE', text: 'Ne pas s\\'en mêler', outcome: { narrative: 'Vous restez en dehors des problèmes.', effects: [], applyStats: (p) => p } }`,
  'CARRIÈRE': `      { typeTag: 'NEUTRE', text: 'Laisser couler pour l\\'instant', outcome: { narrative: 'Rien ne change pour le moment.', effects: [], applyStats: (p) => p } }`,
  'TRANSFERT': `      { typeTag: 'NEUTRE', text: 'Déléguer à votre agent', outcome: { narrative: 'Votre agent gère la situation avec professionnalisme.', effects: [{ text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) }) } }`,
  'DEFAULT': `      { typeTag: 'NEUTRE', text: 'Ne rien faire de spécial', outcome: { narrative: 'La situation se tasse d\\'elle-même.', effects: [], applyStats: (p) => p } }`
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // We want to find the end of the `options: [ ... ]` block for each event and insert a 3rd option.
  // This is tricky with simple regex if the outcomes are nested.
  // Instead, let's look for `    ]\n  }` and insert the third option right before it, 
  // but wait, we need to know the category of the event to inject the right option!
  
  // Let's parse the file event by event by splitting on `id: 'extra_`
  const parts = content.split("id: 'extra_");
  let newContent = parts[0];
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const catMatch = part.match(/category:\s*'([^']+)'/);
    const category = catMatch ? catMatch[1] : 'DEFAULT';
    const injection = thirdOptions[category] || thirdOptions['DEFAULT'];
    
    // Check if it already has 3 options (e.g. if we already injected).
    // If it has 2 options, there are usually 2 `{ typeTag:`
    const typeTags = (part.match(/typeTag/g) || []).length;
    if (typeTags === 2) {
       // Replace the last `    ]\n  }` with the injected option
       const newPart = part.replace(/    \]\n  \}/, `,\n${injection}\n    ]\n  }`);
       newContent += "id: 'extra_" + newPart;
    } else {
       newContent += "id: 'extra_" + part;
    }
  }
  
  fs.writeFileSync(file, newContent);
  console.log("Updated " + file + " with contextual 3rd choices.");
}
