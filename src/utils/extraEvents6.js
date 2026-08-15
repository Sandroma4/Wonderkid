// extraEvents6.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_6 = [
  {
    id: 'extra_96', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Le club acheteur découvre une fragilité à votre genou lors de la visite médicale.",
    options: [
      { typeTag: 'Garantie', text: 'Offrir de baisser votre salaire si vous rechutez', outcome: [
        { probability: 0.7, narrative: 'Le transfert se fait, mais avec une épée de Damoclès.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.3, narrative: 'Ils refusent le deal. Transfert avorté.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Bluff', text: 'Menacer de signer chez leur grand rival', outcome: [
        { probability: 0.4, narrative: 'Ils paniquent et signent !', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) }, 
        { probability: 0.6, narrative: 'Ils rompent les négociations immédiatement.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Loyauté', text: 'Rester dans votre club actuel et vous faire opérer', outcome: { narrative: 'Un choix sage pour la suite de votre carrière.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '-10 Forme', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.max(0, p.form-10)}) } }
    ]
  },
  {
    id: 'extra_97', category: 'VESTIAIRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier star se blesse gravement lors d'un toro d'entraînement avec vous.",
    options: [
      { typeTag: 'Culpabilité', text: 'Vous excuser publiquement', outcome: [
        { probability: 0.8, narrative: 'L\'équipe apprécie votre honnêteté. Incident clos.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Les fans vous prennent en grippe.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Guerrier', text: 'Dire que "le football est un sport de contact"', outcome: [
        { probability: 0.3, narrative: 'Le coach aime votre rudesse.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.7, narrative: 'Le vestiaire vous tourne le dos.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Soutien', text: 'L\'accompagner à l\'hôpital et rester à ses côtés', outcome: { narrative: 'Une grande preuve d\'amitié et de leadership.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_98', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le capitaine de l'équipe vous reproche votre style vestimentaire extravagant.",
    options: [
      { typeTag: 'Clash', text: 'Le remettre à sa place devant tout le monde', outcome: [
        { probability: 0.4, narrative: 'Vous prenez le pouvoir psychologique.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.6, narrative: 'Le vestiaire choisit le capitaine. Vous êtes isolé.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Soumission', text: 'S\'excuser et s\'habiller sobrement', outcome: [
        { probability: 0.9, narrative: 'La tension retombe immédiatement.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Vous perdez votre personnalité et votre confiance.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Humour', text: 'Arriver le lendemain avec une tenue encore plus folle', outcome: { narrative: 'Tout le monde éclate de rire. Détente générale.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_99', category: 'CARRIÈRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "La presse révèle que vous avez passé le week-end dans la même ville qu'un grand club rival.",
    options: [
      { typeTag: 'Provocateur', text: 'Poster une photo de vous devant leur stade', outcome: [
        { probability: 0.3, narrative: 'Les fans adverses vous supplient de venir.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.7, narrative: 'Vos propres supporters demandent votre départ.', effects: [{text: '-25 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Justification', text: 'Expliquer que vous visitiez de la famille', outcome: [
        { probability: 0.8, narrative: 'Explication acceptée. Calme.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'La presse sort des preuves de négociations. Vous passez pour un menteur.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Silence', text: 'Laisser couler', outcome: { narrative: 'Rien ne vaut le silence face aux rumeurs.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_100', category: 'ENTRAÎNEMENT', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre petit frère/sœur veut assister à un entraînement fermé au public.",
    options: [
      { typeTag: 'Piston', text: 'Le faire entrer en douce', outcome: [
        { probability: 0.5, narrative: 'Il/elle vit un rêve éveillé !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.5, narrative: 'Le vigile vous dénonce. Le coach est furieux.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Pro', text: 'Demander l\'autorisation au coach', outcome: [
        { probability: 0.8, narrative: 'Il accepte exceptionnellement.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Refus catégorique. Ambiance glaciale.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Prudent', text: 'Lui dire que c\'est impossible et acheter un cadeau', outcome: { narrative: 'Moins risqué, mais ça coûte un peu.', effects: [{text: '-500 €', style: 'negative'}, {text: '+2 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-500), morale: Math.min(100, p.morale+2)}) } }
    ]
  },
  {
    id: 'extra_101', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une offre d'un club de MLS (États-Unis) arrive sur la table, très lucrative mais hors de l'Europe.",
    options: [
      { typeTag: 'Argent', text: 'Montrer un fort intérêt pour faire monter les enchères en Europe', outcome: [
        { probability: 0.6, narrative: 'Votre club actuel vous propose un nouveau contrat !', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Votre club actuel se sent trahi et vous met sur le banc.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-15 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Fermeté', text: 'Refuser immédiatement publiquement', outcome: [
        { probability: 0.9, narrative: 'Les fans européens louent votre soif de compétition.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.1, narrative: 'Votre agent est déçu de la commission perdue.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Stratège', text: 'Laisser une porte ouverte pour "la fin de carrière"', outcome: { narrative: 'Une gestion parfaite de l\'image.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_102', category: 'VESTIAIRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur dit que vous organisez des fêtes clandestines chez vous.",
    options: [
      { typeTag: 'Feu', text: 'Inviter tout le vestiaire pour une vraie fête', outcome: [
        { probability: 0.4, narrative: 'Soirée mémorable, cohésion d\'équipe au top !', effects: [{text: '+20 Moral', style: 'positive'}, {text: '-10 Forme', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20), form: Math.max(0, p.form-10)}) }, 
        { probability: 0.6, narrative: 'La police débarque. Le scandale est réel.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Transparent', text: 'Ouvrir vos portes à un journaliste pour prouver votre sérieux', outcome: [
        { probability: 0.8, narrative: 'Image redorée : vous avez une vie saine.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.2, narrative: 'L\'interview est mal coupée au montage.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Zen', text: 'Ne rien faire du tout', outcome: { narrative: 'Vous laissez parler les bavards.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_103', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Deux coéquipiers se battent violemment sous la douche.",
    options: [
      { typeTag: 'Héros', text: 'S\'interposer pour les séparer', outcome: [
        { probability: 0.6, narrative: 'Vous calmez le jeu. Vrai leader.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Vous prenez un coup perdu au visage.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Spectateur', text: 'Laisser les autres s\'en occuper', outcome: [
        { probability: 0.7, narrative: 'Le staff intervient, vous êtes indemne.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.3, narrative: 'On vous reproche votre manque de courage.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Pacificateur', text: 'Hurler et jeter de l\'eau glacée sur eux', outcome: { narrative: 'Brutal mais efficace, la bagarre s\'arrête net.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_104', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un commentateur critique ouvertement votre hygiène de vie après un mauvais match.",
    options: [
      { typeTag: 'Provoc', text: 'Lui envoyer un burger par la poste', outcome: [
        { probability: 0.4, narrative: 'Les réseaux sociaux s\'enflamment et vous adorent.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.6, narrative: 'Le club vous met une lourde amende pour provocation.', effects: [{text: '-10k €', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Professionnel', text: 'L\'inviter à suivre votre semaine d\'entraînement', outcome: [
        { probability: 0.9, narrative: 'Il accepte et présente ses excuses publiques.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.1, narrative: 'Il refuse et en remet une couche.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Travailleur', text: 'Engager un chef privé', outcome: { narrative: 'Vous prenez sa critique constructivement.', effects: [{text: '-2k €', style: 'negative'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-2000), form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_105', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le coach vous demande publiquement de jouer à un poste qui n'est pas le vôtre.",
    options: [
      { typeTag: 'Refus', text: 'Refuser net devant tout le monde', outcome: [
        { probability: 0.2, narrative: 'Le coach s\'écrase devant votre charisme.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.8, narrative: 'Banc immédiat. Vous avez humilié le coach.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Dévotion', text: 'Accepter avec le sourire', outcome: [
        { probability: 0.8, narrative: 'Le coach apprécie grandement ce sacrifice.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.2, narrative: 'Vous faites un match horrible à ce poste.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Discussion', text: 'Demander à lui en parler en privé d\'abord', outcome: { narrative: 'Une gestion mature du conflit.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_106', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une marque de crampons vous offre un contrat d'exclusivité énorme si vous jouez avec un modèle doré.",
    options: [
      { typeTag: 'Avide', text: 'Accepter le contrat', outcome: [
        { probability: 0.5, narrative: 'Les crampons sont horribles mais le chèque est là !', effects: [{text: '+100k €', style: 'positive'}, {text: '-10 Moral', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000, morale: Math.max(0, p.morale-10)}) }, 
        { probability: 0.5, narrative: 'Les crampons vous font des ampoules !', effects: [{text: '+100k €', style: 'positive'}, {text: '-15 Forme', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Sobre', text: 'Refuser pour garder vos crampons noirs', outcome: [
        { probability: 0.8, narrative: 'Les puristes saluent votre choix old-school.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.2, narrative: 'Votre agent est furieux du manque à gagner.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Négociation', text: 'Exiger que les crampons dorés soient faits sur mesure', outcome: { narrative: 'Compromis parfait, confort et argent.', effects: [{text: '+50k €', style: 'positive'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_107', category: 'ENTRAÎNEMENT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un tacle très appuyé d'un jeune du centre de formation manque de vous blesser.",
    options: [
      { typeTag: 'Colère', text: 'Le repousser violemment', outcome: [
        { probability: 0.3, narrative: 'Il a compris la leçon et s\'excuse.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.7, narrative: 'Le coach vous expulse de l\'entraînement.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-10 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Grand frère', text: 'Le prendre à part pour lui expliquer', outcome: [
        { probability: 0.9, narrative: 'Geste classe, le coach adore.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.1, narrative: 'Le jeune s\'en fout et recommence plus tard.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Silence', text: 'Serrer les dents et continuer', outcome: { narrative: 'Vous encaissez comme un pro.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_108', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un micro resté ouvert capte le coach vous critiquant vivement.",
    options: [
      { typeTag: 'Clash', text: 'Demander des explications devant les caméras', outcome: [
        { probability: 0.2, narrative: 'Le coach s\'effondre et s\'excuse publiquement.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.8, narrative: 'La guerre froide commence. Vous êtes écarté.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Dignité', text: 'Répondre que vous parlerez sur le terrain', outcome: [
        { probability: 0.9, narrative: 'Une réponse de seigneur.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Ça vous mine quand même intérieurement.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Bureau', text: 'Aller dans son bureau le lendemain', outcome: { narrative: 'Explication musclée mais nécessaire.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_109', category: 'ENTRAÎNEMENT', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre chien s'échappe et s'invite sur le terrain d'entraînement !",
    options: [
      { typeTag: 'Rire', text: 'Le laisser courir avec les joueurs', outcome: [
        { probability: 0.6, narrative: 'Moment incroyable ! La vidéo devient virale.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.4, narrative: 'Il mord le ballon de l\'entraîneur. Séance annulée.', effects: [{text: '-15 Confiance', style: 'negative'}, {text: '-5 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15), form: Math.max(0, p.form-5)}) }
      ] },
      { typeTag: 'Panique', text: 'Courir pour l\'attraper au plus vite', outcome: [
        { probability: 0.8, narrative: 'L\'incident est clos rapidement.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'Vous glissez bêtement en courant.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Maître', text: 'Siffler fermement pour le faire revenir', outcome: { narrative: 'Il obéit direct, tout le monde est impressionné.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_110', category: 'ENTRAÎNEMENT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une blague potache dans les vestiaires détruit le costume de luxe du coach.",
    options: [
      { typeTag: 'Dénoncer', text: 'Balancer les coupables', outcome: [
        { probability: 0.3, narrative: 'Le coach vous remercie.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.7, narrative: 'Vous êtes vu comme une poukave. Enfers dans le vestiaire.', effects: [{text: '-30 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Solidarité', text: 'Se cotiser pour racheter le même', outcome: [
        { probability: 0.9, narrative: 'Le coach est touché, l\'incident est pardonné.', effects: [{text: '-1k €', style: 'negative'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-1000), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.1, narrative: 'Le coach déteste la couleur de remplacement.', effects: [{text: '-1k €', style: 'negative'}, {text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-1000), morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Silence', text: 'Faire l\'ignorant', outcome: { narrative: 'Personne ne sait rien. Le coach fulmine.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_111', category: 'VESTIAIRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier traverse un divorce difficile et pleure dans les douches.",
    options: [
      { typeTag: 'Frère', text: 'L\'emmener manger et parler toute la soirée', outcome: [
        { probability: 0.8, narrative: 'Un lien indestructible est forgé.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15), form: Math.max(0, p.form-5)}) }, 
        { probability: 0.2, narrative: 'Vous rentrez très tard, fatigue le lendemain.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Distant', text: 'Le laisser tranquille', outcome: [
        { probability: 0.7, narrative: 'Chacun gère ses problèmes.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.3, narrative: 'L\'équipe manque de cohésion. Ambiance morose.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Soutien', text: 'Lui glisser un mot d\'encouragement discret', outcome: { narrative: 'Une touche de chaleur humaine.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_112', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Des paris illégaux au sein du vestiaire sont découverts par la direction.",
    options: [
      { typeTag: 'Clean', text: 'Prouver que vous n\'êtes pas impliqué', outcome: [
        { probability: 0.9, narrative: 'Vous êtes innocenté. Le club vous fait confiance.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.1, narrative: 'Certains pensent que vous avez balancé.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Risque', text: 'Couvrir les copains', outcome: [
        { probability: 0.4, narrative: 'Ils s\'en sortent, vous êtes une légende pour eux.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.6, narrative: 'Vous êtes pris avec eux. Amende et suspension.', effects: [{text: '-40 Confiance', style: 'negative'}, {text: '-100k €', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-40), bankBalance: Math.max(0, (p.bankBalance||0)-100000)}) }
      ] },
      { typeTag: 'Peur', text: 'Fuir le centre d\'entraînement', outcome: { narrative: 'Comportement suspect, mais ça passe.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) } }
    ]
  },
  {
    id: 'extra_113', category: 'CARRIÈRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une ancienne déclaration polémique d'un de vos sponsors vous associe malgré vous à un scandale.",
    options: [
      { typeTag: 'Loyauté', text: 'Défendre le sponsor', outcome: [
        { probability: 0.2, narrative: 'Le sponsor double votre contrat pour votre fidélité.', effects: [{text: '+50k €', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000}) }, 
        { probability: 0.8, narrative: 'L\'opinion publique vous détruit.', effects: [{text: '-25 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-25), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Rupture', text: 'Rompre le contrat immédiatement', outcome: [
        { probability: 0.9, narrative: 'Votre image ressort grandie de cette prise de position.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-20k €', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15), bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }, 
        { probability: 0.1, narrative: 'Le sponsor vous poursuit en justice pour rupture abusive.', effects: [{text: '-50k €', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000)}) }
      ] },
      { typeTag: 'Attente', text: 'Attendre que ça se tasse', outcome: { narrative: 'La tempête passe, mais l\'image est légèrement écornée.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_114', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Le club veut vous vendre car ils jugent vos blessures récentes trop fréquentes.",
    options: [
      { typeTag: 'Preuve', text: 'Refuser de partir et demander un programme physique intense', outcome: [
        { probability: 0.6, narrative: 'Vous retrouvez une condition physique impressionnante.', effects: [{text: '+20 Forme', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+20), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.4, narrative: 'Le surentraînement provoque une rechute grave.', effects: [{text: '-30 Forme', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, form: Math.max(0, p.form-30), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Acceptation', text: 'Demander à être transféré dans un championnat moins physique', outcome: [
        { probability: 0.8, narrative: 'Moins de pression, vous respirez un peu.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.2, narrative: 'C\'est vécu comme un aveu de faiblesse.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Spécialiste', text: 'Payer un spécialiste réputé de votre poche', outcome: { narrative: 'Un investissement intelligent sur votre corps.', effects: [{text: '-15k €', style: 'negative'}, {text: '+15 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-15000), form: Math.min(100, p.form+15)}) } }
    ]
  },
  {
    id: 'extra_115', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "L'entraîneur veut nommer un vice-capitaine.",
    options: [
      { typeTag: 'Ambition', text: 'Poser ouvertement votre candidature', outcome: [
        { probability: 0.5, narrative: 'Le coach adore votre cran et vous nomme !', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.5, narrative: 'Vous n\'êtes pas choisi. Gêne totale.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Modestie', text: 'Soutenir publiquement un joueur plus ancien', outcome: [
        { probability: 0.9, narrative: 'L\'équipe salue votre altruisme.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.1, narrative: 'Le coach vous trouve en manque de leadership.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Naturel', text: 'Laisser les choses se faire naturellement', outcome: { narrative: 'Sans forcer, vous restez focus sur votre jeu.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_116', category: 'TRANSFERT', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre famille vit mal le déracinement suite à votre récent (ou futur potentiel) transfert.",
    options: [
      { typeTag: 'Famille d\'abord', text: 'Leur promettre de rentrer au pays au prochain mercato', outcome: [
        { probability: 0.7, narrative: 'La famille est soulagée. Vous jouez l\'esprit libre.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.3, narrative: 'Le club apprend la promesse et ne compte plus sur vous.', effects: [{text: '-25 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Carrière', text: 'Leur demander des sacrifices pour votre carrière', outcome: [
        { probability: 0.4, narrative: 'Ils comprennent, mais c\'est dur.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.6, narrative: 'Conflits à la maison, vous êtes dévasté.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Confort', text: 'Leur payer des billets d\'avion fréquents et un super logement', outcome: { narrative: 'Problème résolu à coup de chéquier.', effects: [{text: '-20k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-20000), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_117', category: 'CARRIÈRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Un ex-coéquipier sort une autobiographie où il vous décrit comme arrogant.",
    options: [
      { typeTag: 'Guerre', text: 'Le traiter de "joueur moyen frustré" en interview', outcome: [
        { probability: 0.3, narrative: 'Coup de grâce public, il est ridiculisé.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.7, narrative: 'Escalade médiatique insupportable.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Élégance', text: 'Souhaiter de bonnes ventes à son livre', outcome: [
        { probability: 0.9, narrative: 'La grande classe. Les médias vous adorent.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.1, narrative: 'Certains pensent que c\'est vrai du coup.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Avocat', text: 'Envoyer une mise en demeure pour diffamation', outcome: { narrative: 'Il retire les passages vous concernant lors de la réédition.', effects: [{text: '+5 Moral', style: 'positive'}, {text: '-2k €', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5), bankBalance: Math.max(0, (p.bankBalance||0)-2000)}) } }
    ]
  },
  {
    id: 'extra_118', category: 'TRANSFERT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Votre transfert avorte au dernier moment à cause d'un document envoyé en retard par fax.",
    options: [
      { typeTag: 'Rage', text: 'Détruire la machine à fax et insulter la direction', outcome: [
        { probability: 0.1, narrative: 'Ils comprennent votre colère et s\'excusent.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.9, narrative: 'Amende record et mise à pied.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-30 Moral', style: 'negative'}, {text: '-20k €', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-30), bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }
      ] },
      { typeTag: 'Zen', text: 'L\'accepter et dire que "c\'est le destin"', outcome: [
        { probability: 0.8, narrative: 'Votre maturité impressionne tout le monde.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), form: Math.min(100, p.form+10)}) }, 
        { probability: 0.2, narrative: 'Vous craquez nerveusement seul le soir.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Vacances', text: 'Prendre 3 jours de repos pour digérer', outcome: { narrative: 'Nécessaire pour repartir de l\'avant.', effects: [{text: '+5 Forme', style: 'positive'}, {text: '-5 Confiance', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+5), coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_119', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une de vos voitures de luxe a été flashée à 220 km/h... par votre cousin !",
    options: [
      { typeTag: 'Mensonge', text: 'Dire qu\'on vous l\'a volée', outcome: [
        { probability: 0.2, narrative: 'L\'assurance et la police y croient. Sauvés.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.8, narrative: 'Les caméras montrent votre cousin. Enquête pour fraude.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-30), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Loyauté', text: 'Prendre la faute pour lui', outcome: [
        { probability: 0.5, narrative: 'Vous perdez votre permis, mais sauvez le cousin.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-5k €', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) }, 
        { probability: 0.5, narrative: 'Le club est furieux de votre irresponsabilité.', effects: [{text: '-20 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Justice', text: 'Le forcer à se dénoncer', outcome: { narrative: 'C\'est dur, mais c\'est la vérité. Aucune répercussion sur vous.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_120', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier que vous détestez veut signer dans le même club que vous.",
    options: [
      { typeTag: 'Block', text: 'Poser un véto absolu auprès de la direction', outcome: [
        { probability: 0.6, narrative: 'Ils choisissent leur star (vous) et annulent sa venue.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.4, narrative: 'Ils n\'aiment pas vos caprices et le recrutent quand même.', effects: [{text: '-15 Confiance', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Adulte', text: 'Faire la paix avec lui en vue du transfert', outcome: [
        { probability: 0.8, narrative: 'La hache de guerre est enterrée. Professionnel.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'Il se moque de vous dès son arrivée.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne rien dire', outcome: { narrative: 'L\'ambiance sera glaciale, mais vous restez focus.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  }
];
