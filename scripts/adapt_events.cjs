const fs = require('fs');
const path = require('path');

const STATS = ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'];
const STAT_NAMES = {
  pace: 'Vitesse',
  finishing: 'Tir',
  passing: 'Passe',
  dribbling: 'Dribble',
  defense: 'Défense',
  physical: 'Physique'
};

for (let i = 2; i <= 9; i++) {
  const filePath = path.join(process.cwd(), 'src', 'utils', `extraEvents${i}.js`);
  if (!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    continue;
  }

  let text = fs.readFileSync(filePath, 'utf8');

  // We want to find `effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, `
  // and inject a stat change. We'll pick a random stat per outcome.
  // Actually, random stat per run means it's deterministic once saved.

  // RegEx to match outcome objects
  // outcome: [ { ..., effects: [...], applyStats: p => ({...p, morale: ...}) } ]
  
  text = text.replace(/effects:\s*\[(.*?)\],\s*applyStats:\s*\(?p\)?\s*=>\s*\(\{\s*\.\.\.p,\s*(.*?)\}\)/g, (match, effectsContent, applyStatsContent) => {
    // Check if it already has attributes modification to avoid double applying
    if (applyStatsContent.includes('attributes:')) return match;
    
    const isPositive = effectsContent.includes("'positive'") || effectsContent.includes('"positive"');
    const isNegative = effectsContent.includes("'negative'") || effectsContent.includes('"negative"');
    
    if (!isPositive && !isNegative) return match; // Neutral

    const statKey = STATS[Math.floor(Math.random() * STATS.length)];
    const statName = STAT_NAMES[statKey];
    
    const diff = isPositive ? 2 : -2;
    const sign = isPositive ? '+' : '';
    const style = isPositive ? 'positive' : 'negative';

    const newEffect = `{ text: '${sign}${diff} ${statName}', style: '${style}' }`;
    
    let newEffectsContent = effectsContent.trim();
    if (newEffectsContent.length > 0) {
      newEffectsContent += `, ${newEffect}`;
    } else {
      newEffectsContent = newEffect;
    }

    const newApplyStatsContent = `attributes: { ...p.attributes, ${statKey}: Math.max(1, Math.min(99, (p.attributes?.${statKey} || 50) + ${diff})) }, ${applyStatsContent}`;

    return `effects: [${newEffectsContent}], applyStats: (p) => ({...p, ${newApplyStatsContent}})`;
  });

  fs.writeFileSync(filePath, text);
  console.log(`Updated ${filePath}`);
}
