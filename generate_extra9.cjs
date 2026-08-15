const fs = require('fs');

const categories = ['LIFESTYLE', 'CARRIÈRE', 'ENTRAÎNEMENT', 'MÉDIAS', 'TRANSFERT'];
const tags = ['Tentation', 'Rivalité', 'Sponsor', 'Tactique', 'Scandale', 'Famille', 'Fans', 'Blessure', 'Direction', 'Coéquipiers'];

const events = [];
let idCounter = 1;

function createEvent(category, tag, conditionStr, desc, options) {
    events.push(`  {
    id: 'mega_event_${idCounter++}', category: '${category}', tag: '${tag}', targetPosition: 'ALL', condition: (p) => ${conditionStr},
    description: "${desc}",
    options: [\n${options.join(',\n')}\n    ]
  }`);
}

// 1. Événements Jeunes (10)
for(let i=0; i<10; i++) {
    createEvent('LIFESTYLE', 'Tentation', 'p.age <= 22',
        `Un groupe d'amis d'enfance vous invite à une soirée très exclusive à la veille d'un match (Événement Jeune ${i+1}).`,
        [
            `      { typeTag: 'FÊTARD', text: 'Y aller incognito', outcome: [{ probability: 0.5, narrative: 'Vous rentrez tard mais passez inaperçu.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) }, { probability: 0.5, narrative: 'Vous êtes pris en photo !', effects: [{text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-15)}) }] }`,
            `      { typeTag: 'SAGE', text: 'Refuser poliment', outcome: [{ probability: 0.9, narrative: 'Vous dormez bien et le coach apprécie.', effects: [{text: '+5 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+5)}) }, { probability: 0.1, narrative: 'Vos amis sont vexés.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }] }`,
            `      { typeTag: 'COMPROMIS', text: 'Y passer 1h seulement', outcome: [{ probability: 0.8, narrative: 'Vous gérez bien votre temps.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) }, { probability: 0.2, narrative: 'Vous vous laissez entraîner...', effects: [{text: '-10 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-10)}) }] }`
        ]
    );
}

// 2. Événements Vétérans (10)
for(let i=0; i<10; i++) {
    createEvent('CARRIÈRE', 'Physique', 'p.age >= 31',
        `Votre corps récupère moins vite après l'enchaînement des matchs (Événement Vétéran ${i+1}).`,
        [
            `      { typeTag: 'FORCER', text: 'Serrer les dents', outcome: [{ probability: 0.3, narrative: 'Vous tenez le choc héroïquement !', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) }, { probability: 0.7, narrative: 'Blessure musculaire !', effects: [{text: '-20 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-20)}) }] }`,
            `      { typeTag: 'REPOS', text: 'Demander à souffler', outcome: [{ probability: 1.0, narrative: 'Le coach accepte et vous reposez.', effects: [{text: '+15 Forme', style: 'positive'}, {text: '-5 Confiance', style: 'negative'}], applyStats: p => ({...p, form: Math.min(100, p.form+15), coachTrust: Math.max(0, p.coachTrust-5)}) }] }`,
            `      { typeTag: 'ALTERNATIF', text: 'Essayer une nouvelle thérapie', outcome: [{ probability: 0.6, narrative: 'La cryothérapie fonctionne à merveille.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) }, { probability: 0.4, narrative: 'C\'est inefficace et coûteux.', effects: [{text: '-5k €', style: 'negative'}], applyStats: p => ({...p, bankBalance: p.bankBalance-5000}) }] }`
        ]
    );
}

// 3. Événements Superstar (15)
for(let i=0; i<15; i++) {
    createEvent('MÉDIAS', 'Sponsor', 'p.ovr >= 85',
        `Un énorme sponsor veut associer son image à la vôtre, mais cela demande beaucoup de temps hors terrain (Superstar ${i+1}).`,
        [
            `      { typeTag: 'BUSINESS', text: 'Accepter le contrat', outcome: [{ probability: 0.7, narrative: 'Vous tournez la pub et touchez le pactole.', effects: [{text: '+500k €', style: 'positive'}, {text: '-10 Forme', style: 'negative'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+500000, form: Math.max(0, p.form-10)}) }, { probability: 0.3, narrative: 'La fatigue vous fait rater un match crucial.', effects: [{text: '-20 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-20)}) }] }`,
            `      { typeTag: 'FOCUS', text: 'Refuser pour le foot', outcome: [{ probability: 1.0, narrative: 'Vous restez 100% concentré sur le terrain.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) }] }`,
            `      { typeTag: 'NÉGOCIER', text: 'Demander un tournage express', outcome: [{ probability: 0.5, narrative: 'Le sponsor accepte vos conditions.', effects: [{text: '+250k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+250000}) }, { probability: 0.5, narrative: 'Le sponsor refuse et annule.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }] }`
        ]
    );
}

// 4. Événements Remplaçant (10)
for(let i=0; i<10; i++) {
    createEvent('ENTRAÎNEMENT', 'Rivalité', "p.statusText === 'Remplaçant' || p.statusText === 'Rotation'",
        `Le titulaire à votre poste se blesse légèrement. C'est peut-être votre chance (Remplaçant ${i+1}).`,
        [
            `      { typeTag: 'ACHARNÉ', text: 'Doubler d\'efforts à l\'entraînement', outcome: [{ probability: 0.6, narrative: 'Le coach remarque votre détermination.', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) }, { probability: 0.4, narrative: 'Vous en faites trop et vous vous blessez.', effects: [{text: '-20 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-20)}) }] }`,
            `      { typeTag: 'PATIENT', text: 'Garder votre routine', outcome: [{ probability: 1.0, narrative: 'Vous attendez sagement votre heure.', effects: [{text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+5)}) }] }`,
            `      { typeTag: 'TENSION', text: 'Aller voir le coach', outcome: [{ probability: 0.4, narrative: 'Il apprécie votre franchise et vous promet du temps de jeu.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) }, { probability: 0.6, narrative: 'Il n\'aime pas qu\'on lui force la main.', effects: [{text: '-10 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-10)}) }] }`
        ]
    );
}


const content = `// extraEvents9.js - 50 événements avancés avec 3 choix
export const EXTRA_EVENTS_9 = [
${events.join(',\n')}
];
`;

fs.writeFileSync('src/utils/extraEvents9.js', content);
console.log('extraEvents9.js généré avec 50 événements à 3 choix !');
