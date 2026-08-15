const fs = require('fs');

const generateEvents = (startIndex, count, fileIndex) => {
    const categories = ['LIFESTYLE', 'CARRIÈRE', 'ENTRAÎNEMENT', 'MÉDIAS', 'TRANSFERT', 'VESTIAIRE'];
    const tags = ['Tension', 'Rumeur', 'Scandale', 'Famille', 'Blessure', 'Opportunité'];
    
    const events = [];
    let idCounter = startIndex;
    
    for(let i=0; i<count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const tag = tags[Math.floor(Math.random() * tags.length)];
        
        const options = [
            `      { typeTag: 'OFFENSIF', text: 'Prendre les choses en main (Risqué)', outcome: [{ probability: 0.6, narrative: 'Ça passe ! Belle réussite.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) }, { probability: 0.4, narrative: 'Cata totale.', effects: [{text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-15)}) }] }`,
            `      { typeTag: 'DÉFENSIF', text: 'Jouer la montre (Prudent)', outcome: [{ probability: 0.9, narrative: 'Pas de vague.', effects: [{text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+5)}) }, { probability: 0.1, narrative: 'Problème inattendu.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }] }`,
            `      { typeTag: 'NEUTRE', text: 'Déléguer ou Ignorer', outcome: [{ probability: 1.0, narrative: 'Vous passez à autre chose.', effects: [], applyStats: p => p }] }`
        ];
        
        events.push(`  {
    id: 'extra_${idCounter++}', category: '${category}', tag: '${tag}', targetPosition: 'ALL', condition: (p) => true,
    description: "Une situation imprévue liée à votre ${category.toLowerCase()} nécessite votre attention (Dossier ${idCounter-1}).",
    options: [\n${options.join(',\n')}\n    ]
  }`);
    }
    
    const content = `// extraEvents${fileIndex}.js - Événements générés dynamiquement\nexport const EXTRA_EVENTS_${fileIndex} = [\n${events.join(',\n')}\n];\n`;
    fs.writeFileSync(`src/utils/extraEvents${fileIndex}.js`, content);
};

generateEvents(46, 25, 4);
generateEvents(71, 25, 5);
generateEvents(96, 25, 6);
generateEvents(121, 25, 7);

console.log('Fichiers 4 à 7 générés avec succès (100 événements à 3 choix) !');
