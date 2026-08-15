const fs = require('fs');
let content = fs.readFileSync('src/utils/gameData.js', 'utf-8');

const startIndex = content.indexOf('export const ALL_EVENTS = [');
const endIndex = content.indexOf('  ...EXTRA_EVENTS,');

let allEventsBlock = content.substring(startIndex, endIndex);

// Replace `    ]\n  },` with the injection of a NEUTRE option
allEventsBlock = allEventsBlock.replace(/    \]\n  \},/g, 
`,
      { typeTag: 'NEUTRE', text: 'Ignorer la situation', outcome: { narrative: 'Rien de particulier ne se passe.', effects: [], applyStats: (p) => p } }
    ]
  },`);

content = content.substring(0, startIndex) + allEventsBlock + content.substring(endIndex);
fs.writeFileSync('src/utils/gameData.js', content);
console.log('gameData.js updated with neutral choices!');
