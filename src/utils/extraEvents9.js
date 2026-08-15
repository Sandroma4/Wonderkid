// extraEvents9.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_9 = [
  {
    id: 'extra_171', category: 'ENTRAÎNEMENT', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre enfant pleure et ne veut pas que vous partiez au centre d'entraînement ce matin.",
    options: [
      { typeTag: 'Papa', text: 'Arriver en retard pour le consoler', outcome: [
        { probability: 0.5, narrative: 'Le coach est compréhensif.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.5, narrative: 'Le coach déteste les retards. Amende.', effects: [{text: '-5k €', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Partir à l\'heure le cœur lourd', outcome: [
        { probability: 0.8, narrative: 'Vous êtes pro mais triste.', effects: [{text: '-10 Moral', style: 'negative'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.max(0, p.morale-10), coachTrust: Math.min(100, p.coachTrust+5)}) },
        { probability: 0.2, narrative: 'Vous êtes distrait à l\'entraînement.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Visite', text: 'L\'emmener avec vous à l\'entraînement', outcome: { narrative: 'Il s\'amuse sur le bord du terrain. Tout le monde sourit.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_172', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une bagarre éclate dans le vestiaire entre le capitaine et un jeune joueur.",
    options: [
      { typeTag: 'Arbitre', text: 'S\'interposer physiquement', outcome: [
        { probability: 0.6, narrative: 'Vous prenez un coup perdu, mais calmez le jeu.', effects: [{text: '-10 Forme', style: 'negative'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.max(0, p.form-10), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.4, narrative: 'Vous les séparez sans dommage. Leader !', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) }
      ] },
      { typeTag: 'Spectateur', text: 'Ne pas s\'en mêler', outcome: [
        { probability: 0.8, narrative: 'Le staff intervient.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) },
        { probability: 0.2, narrative: 'On vous reproche de ne pas avoir aidé.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Vocal', text: 'Crier pour appeler la sécurité', outcome: { narrative: 'Efficace, l\'incident est clos.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_173', category: 'CARRIÈRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur dit que vous avez un accord secret avec le grand rival pour la saison prochaine.",
    options: [
      { typeTag: 'Démenti', text: 'Jurer fidélité à votre club actuel en conférence', outcome: [
        { probability: 0.7, narrative: 'Le public vous croit. Clameur au prochain match.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.3, narrative: 'Le rival se sent insulté et annule une vraie offre.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne rien dire', outcome: [
        { probability: 0.4, narrative: 'La rumeur s\'essouffle.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) },
        { probability: 0.6, narrative: 'Vos supporters sont persuadés que c\'est vrai et vous sifflent.', effects: [{text: '-25 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-25), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Bluff', text: 'Demander une prolongation immédiate pour prouver votre loyauté', outcome: { narrative: 'Le club s\'exécute ! Nouveau contrat.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_174', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un journaliste sportif célèbre vous critique durement après chaque match.",
    options: [
      { typeTag: 'Confrontation', text: 'Lui répondre sèchement sur les réseaux sociaux', outcome: [
        { probability: 0.3, narrative: 'Vous le mettez K.O. publiquement.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.7, narrative: 'Guerre médiatique perdue d\'avance, vous vous épuisez.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Forme', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-20), form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Terrain', text: 'Faire un match exceptionnel et lui dédier votre but', outcome: [
        { probability: 0.9, narrative: 'Réponse parfaite. Il s\'incline.', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.1, narrative: 'Il trouve quand même quelque chose à redire.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Bloquer son compte et l\'ignorer', outcome: { narrative: 'Moins de bruit, plus de tranquillité.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_175', category: 'LIFESTYLE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre famille vous rend visite surprise et perturbe votre rythme d'avant-match.",
    options: [
      { typeTag: 'Accueil', text: 'Les loger chez vous et passer du temps avec eux', outcome: [
        { probability: 0.5, narrative: 'Le bonheur familial vous booste pour le match !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.5, narrative: 'Vous dormez mal et êtes fatigué.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Hôtel', text: 'Leur payer un bel hôtel pour rester tranquille', outcome: [
        { probability: 0.8, narrative: 'Ils comprennent, vous gardez votre routine.', effects: [{text: '-1k €', style: 'negative'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-1000), form: Math.min(100, p.form+10)}) },
        { probability: 0.2, narrative: 'Ils sont blessés par votre froideur.', effects: [{text: '-10 Moral', style: 'negative'}, {text: '-1k €', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10), bankBalance: Math.max(0, (p.bankBalance||0)-1000)}) }
      ] },
      { typeTag: 'Visite', text: 'Les inviter juste au restaurant', outcome: { narrative: 'Un bon compromis.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_176', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une équipe mythique en difficulté vous propose de devenir la figure de proue de son projet de reconstruction.",
    options: [
      { typeTag: 'Défi', text: 'Signer avec eux', outcome: [
        { probability: 0.4, narrative: 'Le projet réussit ! Vous êtes une légende là-bas.', effects: [{text: '+30 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.6, narrative: 'Le club coule encore plus. Votre carrière en prend un coup.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-30), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Prudence', text: 'Refuser poliment', outcome: [
        { probability: 0.9, narrative: 'Vous préférez la stabilité de votre club actuel.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.1, narrative: 'Les fans du club mythique vous insultent sur les réseaux.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Patient', text: 'Demander à voir à la fin de la saison', outcome: { narrative: 'Vous gardez une porte de sortie.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_177', category: 'ENTRAÎNEMENT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le coach adjoint vous crie dessus de manière disproportionnée après une mauvaise passe.",
    options: [
      { typeTag: 'Explosion', text: 'Lui hurler dessus en retour', outcome: [
        { probability: 0.2, narrative: 'Le coach principal vous donne raison et calme son adjoint.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.8, narrative: 'Vous êtes exclu de l\'entraînement. Grosse amende.', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-10k €', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Froid', text: 'Continuer sans le regarder', outcome: [
        { probability: 0.7, narrative: 'Il se calme vite. Vous restez pro.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) },
        { probability: 0.3, narrative: 'Il vous prend en grippe pour le reste de la saison.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Discussion', text: 'Aller lui parler après la séance', outcome: { narrative: 'Vous réglez le problème entre adultes.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_178', category: 'VESTIAIRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier perd un proche. L'équipe est en deuil juste avant un gros match.",
    options: [
      { typeTag: 'Soutien', text: 'Dédier le match à ce proche et motiver le groupe', outcome: [
        { probability: 0.8, narrative: 'L\'équipe joue de manière transcendante. Énorme victoire émotionnelle.', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.2, narrative: 'L\'équipe craque sous la pression de l\'émotion.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Cérémonie', text: 'Demander au club une minute de silence', outcome: [
        { probability: 0.9, narrative: 'Un moment digne. Le joueur vous est très reconnaissant.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.1, narrative: 'La tristesse plombe le match.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Discret', text: 'Rester silencieux et concentré', outcome: { narrative: 'Focus sur le jeu.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_179', category: 'CARRIÈRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous ressentez une douleur aigüe avant une finale. Le médecin dit que c'est du 50/50 pour la déchirure.",
    options: [
      { typeTag: 'Héros', text: 'Jouer la finale sous infiltration', outcome: [
        { probability: 0.3, narrative: 'Vous marquez le but de la victoire ! Légende !', effects: [{text: '+40 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+40)}) },
        { probability: 0.7, narrative: 'Déchirure complète à la 10ème minute. Vous êtes out pour 6 mois.', effects: [{text: '-50 Forme', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-50), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Raison', text: 'Ne pas jouer et laisser votre place', outcome: [
        { probability: 0.8, narrative: 'Le remplaçant brille. L\'équipe gagne !', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.2, narrative: 'L\'équipe perd. On vous accuse d\'être lâche.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Doute', text: 'S\'échauffer et voir au dernier moment', outcome: { narrative: 'Vous renoncez à l\'échauffement, au moins vous avez essayé.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_180', category: 'MÉDIAS', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une vidéo volée vous montre en train de chanter une chanson insultant votre propre club lors d'une fête.",
    options: [
      { typeTag: 'Déni', text: 'Prétendre que c\'est un montage généré par IA', outcome: [
        { probability: 0.2, narrative: 'Étonnamment, le public vous croit.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.8, narrative: 'Les experts prouvent que c\'est vrai. Vous êtes détruit.', effects: [{text: '-40 Moral', style: 'negative'}, {text: '-40 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-40), coachTrust: Math.max(0, p.coachTrust-40)}) }
      ] },
      { typeTag: 'Assumer', text: 'S\'excuser en pleurs en direct à la TV', outcome: [
        { probability: 0.6, narrative: 'Les larmes attendrissent les fans. Le pire est évité.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) },
        { probability: 0.4, narrative: 'Ils ne vous pardonnent pas.', effects: [{text: '-25 Moral', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-25), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Charité', text: 'Payer une énorme amende aux associations de supporters', outcome: { narrative: 'Vous achetez le pardon.', effects: [{text: '-50k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_181', category: 'LIFESTYLE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Vous gagnez un magnifique bolide lors d'un jeu concours caritatif.",
    options: [
      { typeTag: 'Garder', text: 'Garder la voiture et parader', outcome: [
        { probability: 0.5, narrative: 'Trop de style !', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.5, narrative: 'Des jalousies naissent dans le vestiaire.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Vendre', text: 'Vendre la voiture et donner l\'argent à l\'association', outcome: [
        { probability: 0.9, narrative: 'L\'opinion publique vous adore !', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.1, narrative: 'L\'association refuse l\'argent pour des raisons fiscales.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Cadeau', text: 'L\'offrir au préparateur matériel du club', outcome: { narrative: 'Un geste classe qui soude le staff derrière vous.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) } }
    ]
  },
  {
    id: 'extra_182', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous ratez un transfert de rêve car vous vous foulez la cheville dans les escaliers de l'aéroport.",
    options: [
      { typeTag: 'Désespoir', text: 'Pleurer et rager sur les réseaux sociaux', outcome: [
        { probability: 0.2, narrative: 'Le club vous rassure et promet de revenir cet hiver.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.8, narrative: 'Votre club actuel le prend très mal.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Fataliste', text: 'Dire : "C\'est le destin, je dois finir mon histoire ici"', outcome: [
        { probability: 0.9, narrative: 'Les supporters de votre club actuel sont touchés.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.1, narrative: 'Vous sombrez dans une petite déprime.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Soins', text: 'Partir en rééducation intensive', outcome: { narrative: 'Vous revenez plus fort rapidement.', effects: [{text: '+15 Forme', style: 'positive'}, {text: '-5k €', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+15), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) } }
    ]
  },
  {
    id: 'extra_183', category: 'ENTRAÎNEMENT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous insultez accidentellement le président du club qui était incognito sur le bord du terrain.",
    options: [
      { typeTag: 'Clash', text: 'Assumer et dire qu\'il n\'a rien à faire là', outcome: [
        { probability: 0.1, narrative: 'Le président aime votre caractère franc.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.9, narrative: 'Viré de l\'équipe première.', effects: [{text: '-50 Confiance', style: 'negative'}, {text: '-30 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-50), morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Honte', text: 'Présenter des excuses publiques et humiliantes', outcome: [
        { probability: 0.8, narrative: 'Il accepte, mais vous avez perdu la face.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) },
        { probability: 0.2, narrative: 'Il refuse les excuses. Grosse amende.', effects: [{text: '-20k €', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }
      ] },
      { typeTag: 'Cadeau', text: 'Lui envoyer un maillot dédicacé avec un mot d\'excuse', outcome: { narrative: 'La pilule passe mieux avec un cadeau.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_184', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un clan de joueurs refuse de vous passer le ballon pendant les matchs.",
    options: [
      { typeTag: 'Égoïste', text: 'Dribbler tout le monde quand vous avez la balle', outcome: [
        { probability: 0.4, narrative: 'Vous marquez un but maradonesque !', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.6, narrative: 'Vous perdez la balle. Le coach vous sort.', effects: [{text: '-20 Forme', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-20), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Réunion', text: 'Provoquer une réunion de crise avec le coach', outcome: [
        { probability: 0.8, narrative: 'Le coach recadre le clan. Vous retrouvez le ballon.', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.2, narrative: 'Le clan ment et dit que c\'est vous le problème.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Patience', text: 'Continuer à faire de bons appels de balle', outcome: { narrative: 'Ils sont obligés de vous servir à un moment donné.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_185', category: 'CARRIÈRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un magnat de la mode veut créer une marque de vêtements à votre nom.",
    options: [
      { typeTag: 'Investir', text: 'Mettre vos propres billes dans le projet', outcome: [
        { probability: 0.3, narrative: 'La marque devient iconique. Richesse !', effects: [{text: '+200k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+200000, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.7, narrative: 'C\'est un flop commercial.', effects: [{text: '-100k €', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Image', text: 'Prendre un pourcentage sans risque financier', outcome: [
        { probability: 0.9, narrative: 'L\'argent rentre doucement sans stress.', effects: [{text: '+30k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+30000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.1, narrative: 'Les vêtements sont de mauvaise qualité, bad buzz.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Refus', text: 'Refuser, trop de déconcentration', outcome: { narrative: 'Choix sportif assumé.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_186', category: 'MÉDIAS', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "La presse annonce que vous allez vous marier en secret ce week-end.",
    options: [
      { typeTag: 'Jouer le jeu', text: 'Louer un faux cortège de mariage', outcome: [
        { probability: 0.6, narrative: 'La blague amuse tout le monde.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-5k €', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) },
        { probability: 0.4, narrative: 'Le coach déteste cette perte d\'énergie.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Démenti', text: 'Publier une vidéo de vous seul jouant à la console', outcome: [
        { probability: 0.9, narrative: 'Fin des rumeurs, vous êtes tranquille.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+10)}) },
        { probability: 0.1, narrative: 'La presse persiste à dire que c\'est une couverture.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Laisser les paparazzis attendre devant la mairie pour rien', outcome: { narrative: 'Bien fait pour eux.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_187', category: 'LIFESTYLE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Vous perdez votre chien adoré lors d'une promenade.",
    options: [
      { typeTag: 'Réseaux', text: 'Lancer un appel à l\'aide sur vos réseaux', outcome: [
        { probability: 0.8, narrative: 'Les fans le retrouvent en 2 heures !', effects: [{text: '+30 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.2, narrative: 'Personne ne le trouve. Vous êtes effondré.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-15 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-30), form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Récompense', text: 'Offrir 10 000€ de récompense', outcome: [
        { probability: 0.9, narrative: 'Quelqu\'un le ramène immédiatement.', effects: [{text: '-10k €', style: 'negative'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), morale: Math.min(100, p.morale+15)}) },
        { probability: 0.1, narrative: 'Fausse alerte, on vous amène le mauvais chien.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Chercher', text: 'Passer la nuit à le chercher vous-même', outcome: { narrative: 'Vous le trouvez, mais êtes épuisé pour le match.', effects: [{text: '+20 Moral', style: 'positive'}, {text: '-20 Forme', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+20), form: Math.max(0, p.form-20)}) } }
    ]
  },
  {
    id: 'extra_188', category: 'TRANSFERT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Le club qui vous veut a soudoyé un médecin pour dire que vous êtes blessé et baisser votre prix.",
    options: [
      { typeTag: 'Dénoncer', text: 'Révéler la fraude au grand public', outcome: [
        { probability: 0.7, narrative: 'Le transfert est annulé, le club adverse sanctionné.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.3, narrative: 'Personne ne vous croit sans preuve. On vous prend pour un fou.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Complice', text: 'Accepter pour forcer le transfert', outcome: [
        { probability: 0.4, narrative: 'Ça marche, vous signez là-bas !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.6, narrative: 'La FIFA enquête et vous suspend 3 mois.', effects: [{text: '-40 Forme', style: 'negative'}, {text: '-30 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-40), morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Contre-expertise', text: 'Aller voir un médecin indépendant de renom', outcome: { narrative: 'Votre santé est certifiée. Le transfert se fait au juste prix.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_189', category: 'ENTRAÎNEMENT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un spécialiste des coups francs légendaire passe 3 jours au club pour vous former.",
    options: [
      { typeTag: 'Bûcheur', text: 'S\'entraîner jour et nuit avec lui', outcome: [
        { probability: 0.6, narrative: 'Vous devenez un tireur d\'élite !', effects: [{text: '+20 Forme', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+20), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.4, narrative: 'Surentraînement : déchirure à la cuisse.', effects: [{text: '-30 Forme', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Intelligent', text: 'Filmer ses conseils et analyser sans forcer', outcome: [
        { probability: 0.9, narrative: 'Vous progressez à votre rythme. Belle amélioration.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+10)}) },
        { probability: 0.1, narrative: 'Il est vexé que vous ne tapiez pas le ballon avec lui.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Respect', text: 'L\'inviter au restaurant pour parler de sa carrière', outcome: { narrative: 'Un grand moment d\'inspiration.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_190', category: 'VESTIAIRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur dit qu'un coéquipier gagne le double de votre salaire alors qu'il est sur le banc.",
    options: [
      { typeTag: 'Bureau', text: 'Aller réclamer le même salaire au directeur', outcome: [
        { probability: 0.2, narrative: 'Le club s\'aligne ! Incroyable !', effects: [{text: '+50k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.8, narrative: 'On vous rit au nez. Grosse déception.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Jalousie', text: 'Faire des sous-entendus en interview', outcome: [
        { probability: 0.3, narrative: 'Le club est sous pression et le vend.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.7, narrative: 'Le vestiaire déteste les jaloux. Vous êtes isolé.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Focus', text: 'S\'en moquer et continuer à briller', outcome: { narrative: 'L\'argent viendra naturellement avec les performances.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_191', category: 'CARRIÈRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "L'entraîneur veut vous changer de poste de façon permanente.",
    options: [
      { typeTag: 'Refus', text: 'Dire "Non, je suis meilleur à ma place"', outcome: [
        { probability: 0.4, narrative: 'Il cède face à votre caractère.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.6, narrative: 'Il vous met sur le banc pour insubordination.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Défi', text: 'Accepter le défi avec ambition', outcome: [
        { probability: 0.7, narrative: 'Vous vous révélez incroyable à ce poste !', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+15)}) },
        { probability: 0.3, narrative: 'C\'est un désastre. Vous êtes perdu sur le terrain.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Attente', text: 'Lui demander un match d\'essai à ce poste', outcome: { narrative: 'Une approche prudente et professionnelle.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_192', category: 'MÉDIAS', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Pendant un talk-show, un consultant rigole de votre récente blessure au visage.",
    options: [
      { typeTag: 'Vengeance', text: 'Lui envoyer la facture du chirurgien esthétique', outcome: [
        { probability: 0.8, narrative: 'Un troll magistral, le plateau explose de rire.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.2, narrative: 'Il le prend mal et menace de vous poursuivre.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Rage', text: 'L\'appeler en direct pour l\'insulter', outcome: [
        { probability: 0.1, narrative: 'Le public est de votre côté.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.9, narrative: 'Dérapage total, vous devez vous excuser publiquement.', effects: [{text: '-25 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-25), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Masque', text: 'Jouer le prochain match avec un masque de catcheur (si autorisé)', outcome: { narrative: 'Vous devenez l\'idole des enfants.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_193', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "On vous accuse de triche lors d'un tournoi de poker caritatif.",
    options: [
      { typeTag: 'Preuve', text: 'Demander le visionnage des caméras', outcome: [
        { probability: 0.9, narrative: 'Vous êtes innocenté totalement.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.1, narrative: 'Les caméras étaient éteintes, le doute subsiste.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Colère', text: 'Renverser la table et partir', outcome: [
        { probability: 0.2, narrative: 'Vous faites forte impression.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) },
        { probability: 0.8, narrative: 'Comportement d\'enfant gâté. Bad buzz.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Charité', text: 'Faire tapis aveugle pour donner vos jetons', outcome: { narrative: 'Vous calmez le jeu en donnant l\'argent à l\'association.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '-2k €', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10), bankBalance: Math.max(0, (p.bankBalance||0)-2000)}) } }
    ]
  },
  {
    id: 'extra_194', category: 'TRANSFERT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le club formateur de votre enfance est au bord de la faillite.",
    options: [
      { typeTag: 'Sauveur', text: 'Acheter le club pour le sauver', outcome: [
        { probability: 0.4, narrative: 'Vous êtes le sauveur ! Magnifique histoire.', effects: [{text: '-200k €', style: 'negative'}, {text: '+40 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-200000), morale: Math.min(100, p.morale+40)}) },
        { probability: 0.6, narrative: 'Le club coule avec votre argent. Gouffre financier.', effects: [{text: '-300k €', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-300000), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Soutien', text: 'Faire un don symbolique de 50 000€', outcome: [
        { probability: 0.9, narrative: 'Ça les aide un peu, geste apprécié.', effects: [{text: '-50k €', style: 'negative'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.min(100, p.morale+15)}) },
        { probability: 0.1, narrative: 'Les supporters du club disent que c\'est trop peu vu votre salaire.', effects: [{text: '-50k €', style: 'negative'}, {text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Rien', text: 'Ne pas vous en mêler', outcome: { narrative: 'Triste, mais ce n\'est pas votre problème.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_195', category: 'VESTIAIRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous vous foulez le poignet en tapant dans un casier de frustration après une défaite.",
    options: [
      { typeTag: 'Mensonge', text: 'Dire que vous êtes tombé dans les escaliers', outcome: [
        { probability: 0.2, narrative: 'Personne ne pose de questions.', effects: [{text: '-5 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-5)}) },
        { probability: 0.8, narrative: 'Le caméraman de la Ligue a tout filmé. Grosse amende.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-10k €', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Assumer', text: 'Avouer votre faute au staff médical', outcome: [
        { probability: 0.9, narrative: 'Ils soignent ça en silence. Vous jouez avec un bandage.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-10)}) },
        { probability: 0.1, narrative: 'L\'entraîneur est déçu de votre manque de self-control.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Serrer les dents', text: 'Ne rien dire et jouer avec la douleur', outcome: { narrative: 'Une attitude de dur à cuire.', effects: [{text: '+5 Confiance', style: 'positive'}, {text: '-15 Forme', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5), form: Math.max(0, p.form-15)}) } }
    ]
  }
];
