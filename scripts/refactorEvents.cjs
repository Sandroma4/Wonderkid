const fs = require('fs');
['src/utils/extraEvents.js', 'src/utils/extraEvents2.js', 'src/utils/extraEvents3.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/outcome:\s*\{\s*narrative:\s*(.*?),\s*effects:\s*\[(.*?)\],\s*applyStats:\s*(.*?)\s*\}/gs, (match, narrative, effects, applyStats) => {
    const isPositive = effects.includes("'positive'") || effects.includes('"positive"');
    
    let twistNarrative, twistEffects, twistApplyStats;
    if (isPositive) {
       twistNarrative = "'Un coup du sort inattendu gâche tout.'";
       twistEffects = "[{ text: '-10 Moral', style: 'negative' }]";
       twistApplyStats = "(p) => ({ ...p, morale: Math.max(0, p.morale - 10) })";
    } else {
       twistNarrative = "'Contre toute attente, la chance vous sourit.'";
       twistEffects = "[{ text: '+10 Moral', style: 'positive' }]";
       twistApplyStats = "(p) => ({ ...p, morale: Math.min(100, p.morale + 10) })";
    }
    
    return `outcome: [
        { probability: 0.8, narrative: ${narrative}, effects: [${effects}], applyStats: ${applyStats} },
        { probability: 0.2, narrative: ${twistNarrative}, effects: ${twistEffects}, applyStats: ${twistApplyStats} }
      ]`;
  });
  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed', file);
});
