// extraEvents4.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_4 = [
  {
    id: 'extra_46', category: 'MÉDIAS', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un tabloïd menace de publier des photos compromettantes d'un membre de votre famille.",
    options: [
      { typeTag: 'Offensif', text: 'Attaquer le journal en justice', outcome: [
        { probability: 0.7, narrative: 'Le journal recule et présente des excuses publiques.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.3, narrative: 'La procédure est longue et épuisante. Les photos fuitent quand même.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-5 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15), form: Math.max(0, p.form-5)}) }
      ] },
      { typeTag: 'Défensif', text: 'Négocier financièrement en coulisses', outcome: [
        { probability: 0.9, narrative: 'L\'affaire est étouffée proprement.', effects: [{text: '-100k €', style: 'negative'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le journal prend l\'argent et publie quand même !', effects: [{text: '-100k €', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Neutre', text: 'Ne faire aucun commentaire public', outcome: { narrative: 'La rumeur se tasse après quelques jours de turbulences.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_47', category: 'ENTRAÎNEMENT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un préparateur physique réputé vous propose un programme d'entraînement révolutionnaire mais épuisant.",
    options: [
      { typeTag: 'Intensif', text: 'S\'investir à 200%', outcome: [
        { probability: 0.6, narrative: 'Vos performances physiques explosent !', effects: [{text: '+3 PHY', style: 'positive'}, {text: '-10 Forme', style: 'negative'}], applyStats: p => ({...p, attributes: {...p.attributes, physical: Math.min(99, p.attributes.physical+3)}, form: Math.max(0, p.form-10)}) }, 
        { probability: 0.4, narrative: 'Votre corps lâche sous la charge de travail.', effects: [{text: '-20 Forme', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-20), coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Prudent', text: 'Suivre le programme de façon allégée', outcome: [
        { probability: 0.9, narrative: 'Vous progressez à un rythme sûr.', effects: [{text: '+1 PHY', style: 'positive'}, {text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, attributes: {...p.attributes, physical: Math.min(99, p.attributes.physical+1)}, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le préparateur se vexe de votre manque de rigueur.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Neutre', text: 'Rester sur le programme du club', outcome: { narrative: 'Vous restez dans votre routine classique.', effects: [{text: '+2 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+2)}) } }
    ]
  },
  {
    id: 'extra_48', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: 'ALL', condition: (p) => p.coachTrust > 60,
    description: "Le capitaine se blesse, l'entraîneur vous propose de prendre le brassard provisoirement.",
    options: [
      { typeTag: 'Leader', text: 'Accepter avec fierté', outcome: [
        { probability: 0.7, narrative: 'Vous menez l\'équipe d\'une main de maître.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.3, narrative: 'La pression du brassard vous fait rater vos matchs.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Humble', text: 'Suggérer un joueur plus expérimenté', outcome: [
        { probability: 0.9, narrative: 'Le groupe apprécie votre humilité.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.1, narrative: 'L\'entraîneur vous trouve lâche.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Neutre', text: 'Accepter discrètement sans en faire un plat', outcome: { narrative: 'Vous faites le job, sans éclat particulier.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_49', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes filmé à votre insu en train de sortir d'une boîte de nuit à 4h du matin.",
    options: [
      { typeTag: 'Offensif', text: 'Démentir agressivement la vidéo', outcome: [
        { probability: 0.4, narrative: 'Vos fans vous croient, la tempête passe.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.6, narrative: 'Une deuxième vidéo sous un autre angle sort. Catastrophe.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Assumer', text: 'Présenter des excuses au club', outcome: [
        { probability: 0.8, narrative: 'L\'entraîneur apprécie l\'honnêteté, mais sanction financière.', effects: [{text: '-50k €', style: 'negative'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Le président est furieux et vous écarte.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Neutre', text: 'Ne rien dire et s\'entraîner dur', outcome: { narrative: 'Vous faites profil bas, le coach reste méfiant.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_50', category: 'TRANSFERT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "La presse annonce un accord secret entre vous et un club rival historique.",
    options: [
      { typeTag: 'Mercenaire', text: 'Entretenir le mystère', outcome: [
        { probability: 0.5, narrative: 'Votre valeur marchande augmente grâce à la hype.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.5, narrative: 'Les supporters se retournent contre vous !', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Fidèle', text: 'Faire une déclaration d\'amour à votre club', outcome: [
        { probability: 0.9, narrative: 'Le public vous adule et le coach est rassuré.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.1, narrative: 'Votre agent est furieux de cette déclaration hâtive.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Neutre', text: 'Laisser votre agent gérer la presse', outcome: { narrative: 'La rumeur s\'estompe peu à peu.', effects: [], applyStats: p => p } }
    ]
  },
  {
    id: 'extra_51', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous ressentez une petite gêne avant l'ouverture du mercato, ce qui refroidit vos courtisans.",
    options: [
      { typeTag: 'Cacher', text: 'Serrer les dents et cacher la douleur', outcome: [
        { probability: 0.5, narrative: 'Les recruteurs n\'y voient que du feu.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.5, narrative: 'La blessure s\'aggrave en plein match sous leurs yeux.', effects: [{text: '-25 Forme', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-25), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Honnête', text: 'Communiquer sur la blessure pour rassurer', outcome: [
        { probability: 0.8, narrative: 'La transparence est appréciée, un club sérieux reste sur le coup.', effects: [{text: '+5 Forme', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Vos courtisans abandonnent définitivement.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Neutre', text: 'Se soigner discrètement en interne', outcome: { narrative: 'Le club médical vous couvre.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_52', category: 'MÉDIAS', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une marque de luxe veut faire de vous son égérie, mais le shooting tombe sur un jour de repos essentiel.",
    options: [
      { typeTag: 'Argent', text: 'Faire le shooting', outcome: [
        { probability: 0.7, narrative: 'Un gros chèque et une image stylée !', effects: [{text: '+250k €', style: 'positive'}, {text: '-10 Forme', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+250000, form: Math.max(0, p.form-10)}) }, 
        { probability: 0.3, narrative: 'Grosse fatigue le lendemain à l\'entraînement, le coach remarque.', effects: [{text: '+250k €', style: 'positive'}, {text: '-15 Forme', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+250000, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser pour récupérer', outcome: [
        { probability: 0.9, narrative: 'Vous êtes frais et dispo.', effects: [{text: '+10 Forme', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Votre agent vous reproche ce manque à gagner.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Compromis', text: 'Négocier un shooting plus court', outcome: { narrative: 'Moins d\'argent, mais un bon équilibre.', effects: [{text: '+100k €', style: 'positive'}, {text: '-2 Forme', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000, form: Math.max(0, p.form-2)}) } }
    ]
  },
  {
    id: 'extra_53', category: 'CARRIÈRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre frère cadet vous demande de devenir son agent officiel pour profiter de vos réseaux.",
    options: [
      { typeTag: 'Loyauté', text: 'Accepter', outcome: [
        { probability: 0.6, narrative: 'Il gère très bien vos intérêts et c\'est une belle histoire de famille.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Son inexpérience vous coûte un sponsor important.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-50k €', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15), bankBalance: Math.max(0, (p.bankBalance||0)-50000)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser catégoriquement', outcome: [
        { probability: 0.8, narrative: 'C\'est dur, mais c\'est mieux pour le business.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Tension lors des repas de famille.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Soutien', text: 'Le recommander comme assistant de votre agent actuel', outcome: { narrative: 'Une solution d\'apprentissage qui satisfait tout le monde.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_54', category: 'CARRIÈRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous sentez une douleur persistante, le staff médical vous laisse le choix de jouer ou non.",
    options: [
      { typeTag: 'Guerrier', text: 'Jouer sous infiltration', outcome: [
        { probability: 0.5, narrative: 'Match héroïque !', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.5, narrative: 'Déchirure musculaire à la 20e minute.', effects: [{text: '-30 Forme', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-30), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Sage', text: 'Déclarer forfait', outcome: [
        { probability: 0.9, narrative: 'La douleur disparaît après du repos.', effects: [{text: '+15 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+15)}) }, 
        { probability: 0.1, narrative: 'L\'entraîneur pense que vous simulez.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Compromis', text: 'Jouer seulement la dernière demi-heure', outcome: { narrative: 'Vous apportez votre pierre à l\'édifice sans trop forcer.', effects: [{text: '+5 Forme', style: 'positive'}, {text: '+2 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+5), coachTrust: Math.min(100, p.coachTrust+2)}) } }
    ]
  },
  {
    id: 'extra_55', category: 'ENTRAÎNEMENT', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un problème familial grave perturbe votre concentration à l'entraînement.",
    options: [
      { typeTag: 'Secret', text: 'Cacher le problème', outcome: [
        { probability: 0.4, narrative: 'Le travail vous permet d\'oublier.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.6, narrative: 'Vous êtes catastrophique à l\'entraînement et perdez vos nerfs.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Honnête', text: 'En parler au coach et demander du repos', outcome: [
        { probability: 0.9, narrative: 'Le club vous soutient totalement.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Le coach estime que vos soucis ne le regardent pas.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Soutien', text: 'Se confier discrètement au capitaine', outcome: { narrative: 'Le capitaine gère l\'entraînement à votre place.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_56', category: 'CARRIÈRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Vous n'êtes pas d'accord avec le changement tactique de l'entraîneur qui vous éloigne du but.",
    options: [
      { typeTag: 'Clash', text: 'Râler devant le groupe', outcome: [
        { probability: 0.3, narrative: 'Le coach vous donne raison et change sa tactique.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.7, narrative: 'Le coach vous recadre violemment devant tout le monde.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Docile', text: 'Se plier aux consignes sans broncher', outcome: [
        { probability: 0.8, narrative: 'Le sacrifice est remarqué par le staff.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'Vos performances individuelles s\'effondrent.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Dialogue', text: 'Demander un entretien tactique individuel', outcome: { narrative: 'Une bonne discussion permet de trouver un rôle hybride.', effects: [{text: '+5 Confiance', style: 'positive'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5), morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_57', category: 'MÉDIAS', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une fausse rumeur affirme que vous avez insulté le coach dans le vestiaire.",
    options: [
      { typeTag: 'Offensif', text: 'Aller dans les médias foudroyer le journaliste', outcome: [
        { probability: 0.6, narrative: 'Votre mise au point énergique éteint l\'incendie.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Vos propos sont déformés et empirent la situation.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Défensif', text: 'Publier un simple communiqué de démenti', outcome: [
        { probability: 0.9, narrative: 'Une gestion pro et classique.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Le communiqué est jugé "trop lisse".', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Sourire', text: 'En rire avec le coach devant la caméra', outcome: { narrative: 'Une blague qui fait le tour des réseaux sociaux. Brillante gestion.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_58', category: 'LIFESTYLE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Des voisins se plaignent du bruit de vos fêtes à répétition.",
    options: [
      { typeTag: 'Cash', text: 'Racheter leur silence', outcome: [
        { probability: 0.6, narrative: 'Ils acceptent l\'argent et se taisent.', effects: [{text: '-20k €', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }, 
        { probability: 0.4, narrative: 'Ils dénoncent votre "tentative de corruption" à la presse !', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Excuse', text: 'S\'excuser publiquement et arrêter', outcome: [
        { probability: 0.9, narrative: 'Bonne nuit de sommeil retrouvée.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.1, narrative: 'Certains "amis" cessent de vous parler.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Compromis', text: 'Insonoriser votre maison', outcome: { narrative: 'Coûteux mais efficace, la paix est de retour.', effects: [{text: '-50k €', style: 'negative'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_59', category: 'CARRIÈRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Vos parents s'immiscent publiquement dans vos choix de carrière lors d'une interview.",
    options: [
      { typeTag: 'Clash', text: 'Les recadrer sèchement devant la presse', outcome: [
        { probability: 0.7, narrative: 'Le message est passé. Votre agent respire.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.3, narrative: 'Froid polaire dans la famille. Vous vous sentez mal.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Soutien', text: 'Aller dans leur sens', outcome: [
        { probability: 0.4, narrative: 'Un bon moment de cohésion familiale.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.6, narrative: 'Le club sent que vous n\'êtes pas décisionnaire. Mauvais signal.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Équilibre', text: 'Rire de la situation "C\'est ça les parents !"', outcome: { narrative: 'L\'interview désamorce la tension avec le sourire.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_60', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un jeune prodige monte de la réserve et cherche un mentor.",
    options: [
      { typeTag: 'Tuteur', text: 'Le prendre sous votre aile', outcome: [
        { probability: 0.7, narrative: 'Une super connexion se crée sur le terrain.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.3, narrative: 'Il est très collant et épuisant émotionnellement.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Solitaire', text: 'Le laisser se débrouiller', outcome: [
        { probability: 0.9, narrative: 'Vous restez focus sur votre jeu.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le staff vous trouve égoïste.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Pro', text: 'L\'aider uniquement sur le placement tactique', outcome: { narrative: 'Efficace, simple et professionnel.', effects: [{text: '+2 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+2)}) } }
    ]
  },
  {
    id: 'extra_61', category: 'TRANSFERT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Votre agent est accusé de fraude fiscale, les médias font le lien avec vous.",
    options: [
      { typeTag: 'Loyauté', text: 'Défendre votre agent publiquement', outcome: [
        { probability: 0.3, narrative: 'Il est innocenté, votre relation est plus forte que jamais.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.7, narrative: 'L\'image du club en prend un coup. Vous êtes sifflé.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Séparation', text: 'Virer votre agent immédiatement', outcome: [
        { probability: 0.8, narrative: 'Vous coupez court à la polémique.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'Il lâche des dossiers sur vous en représailles.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne faire aucun commentaire en attendant la justice', outcome: { narrative: 'La prudence est de mise, le club gère la com.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_62', category: 'LIFESTYLE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Vous avez accidentellement liké un post critiquant une légende du club.",
    options: [
      { typeTag: 'Ignore', text: 'Enlever le like et ignorer', outcome: [
        { probability: 0.6, narrative: 'Personne n\'a rien vu.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.4, narrative: 'Des captures d\'écran tournent partout.', effects: [{text: '-15 Confiance', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Assume', text: 'Dire que c\'est volontaire car vous assumez vos opinions', outcome: [
        { probability: 0.2, narrative: 'Une minorité de fans vous soutient.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.8, narrative: 'Scandale absolu au sein du club.', effects: [{text: '-30 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30)}) }
      ] },
      { typeTag: 'Excuse', text: 'Plaider le piratage / le doigt qui glisse', outcome: { narrative: 'Une excuse classique, ça passe moyen mais ça passe.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_63', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un journaliste vous pose une question très provocante sur vos mauvaises performances récentes.",
    options: [
      { typeTag: 'Clash', text: 'Quitter la conférence de presse', outcome: [
        { probability: 0.5, narrative: 'Vous montrez que vous avez du caractère.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.5, narrative: 'La presse s\'acharne encore plus sur vous.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Pro', text: 'Faire de la langue de bois polie', outcome: [
        { probability: 0.9, narrative: 'L\'attaché de presse est ravi.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Les supporters trouvent que vous manquez de personnalité.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Honnête', text: 'Admettre vos torts avec sincérité', outcome: { narrative: 'Une belle leçon d\'humilité saluée par les observateurs.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_64', category: 'MÉDIAS', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre conjoint(e) critique ouvertement les choix du coach sur les réseaux sociaux.",
    options: [
      { typeTag: 'Couverture', text: 'Soutenir votre conjoint(e)', outcome: [
        { probability: 0.4, narrative: 'Votre famille est unie, mais le club grince.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '-15 Confiance', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.max(0, p.coachTrust-15)}) }, 
        { probability: 0.6, narrative: 'Vous êtes directement sanctionné sportivement.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-10 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Désaveu', text: 'Se désolidariser publiquement', outcome: [
        { probability: 0.8, narrative: 'Le coach est soulagé. Ambiance glaciale à la maison.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '-15 Moral', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), morale: Math.max(0, p.morale-15)}) }, 
        { probability: 0.2, narrative: 'Les fans trouvent que vous n\'avez aucun honneur.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Discret', text: 'Supprimer le post rapidement et s\'excuser au coach en privé', outcome: { narrative: 'L\'incendie est éteint avant d\'avoir commencé.', effects: [{text: '+5 Confiance', style: 'positive'}, {text: '-2 Moral', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5), morale: Math.max(0, p.morale-2)}) } }
    ]
  },
  {
    id: 'extra_65', category: 'LIFESTYLE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous vous foulez la cheville en jouant au padel avec des amis.",
    options: [
      { typeTag: 'Risque', text: 'Cacher la vraie raison au club', outcome: [
        { probability: 0.5, narrative: 'Le staff pense à une blessure d\'usure normale.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }, 
        { probability: 0.5, narrative: 'Une photo de vous au padel circule. Colère noire du coach !', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Honnête', text: 'Avouer l\'accident', outcome: [
        { probability: 0.8, narrative: 'Sanction financière justifiée, mais vous gardez la confiance.', effects: [{text: '-50k €', style: 'negative'}, {text: '-15 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), form: Math.max(0, p.form-15)}) }, 
        { probability: 0.2, narrative: 'Vous êtes lourdement puni financièrement et sportivement.', effects: [{text: '-100k €', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Malin', text: 'Voir un kiné privé en urgence ce week-end', outcome: { narrative: 'Coûteux, mais vous revenez incognito.', effects: [{text: '-30k €', style: 'negative'}, {text: '-5 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-30000), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_66', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Deux coéquipiers en viennent aux mains pendant l'entraînement.",
    options: [
      { typeTag: 'Leader', text: 'S\'interposer physiquement', outcome: [
        { probability: 0.7, narrative: 'Vous calmez tout le monde et montrez l\'exemple.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.3, narrative: 'Vous prenez un coup perdu.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Spectateur', text: 'Ne pas s\'en mêler', outcome: [
        { probability: 0.8, narrative: 'Pas de risque, pas de problème.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'Ambiance plombée toute la semaine.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Diplomate', text: 'Aller chercher le coach', outcome: { narrative: 'Le staff gère l\'incident.', effects: [{text: '+2 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+2)}) } }
    ]
  },
  {
    id: 'extra_67', category: 'ENTRAÎNEMENT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Le terrain d'entraînement est gelé et dangereux.",
    options: [
      { typeTag: 'Guerrier', text: 'Mettre de l\'intensité quand même', outcome: [
        { probability: 0.5, narrative: 'Belle séance physique sous les yeux ravis du coach.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.min(100, p.form+5)}) }, 
        { probability: 0.5, narrative: 'Grosse glissade. Entorse au genou.', effects: [{text: '-30 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Prudent', text: 'Refuser de s\'entraîner sur cette surface', outcome: [
        { probability: 0.7, narrative: 'Vous protégez votre corps, d\'autres joueurs vous suivent.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.3, narrative: 'Le coach déteste les "divas".', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Modéré', text: 'Faire une séance légère en salle', outcome: { narrative: 'Un bon compromis pour éviter les blessures.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_68', category: 'VESTIAIRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Vous invitez toute l'équipe à dîner chez vous, mais le repas tourne mal à cause de tensions.",
    options: [
      { typeTag: 'Animateur', text: 'Sortir une grosse bouteille pour détendre l\'atmosphère', outcome: [
        { probability: 0.6, narrative: 'La soirée finit en fous rires et réconciliation.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.4, narrative: 'Certains boivent trop, lendemain difficile.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Strict', text: 'Mettre les fauteurs de trouble à la porte', outcome: [
        { probability: 0.7, narrative: 'Vous affirmez votre autorité chez vous.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.3, narrative: 'Le vestiaire se fracture en deux camps.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Diplomate', text: 'Lancer un jeu vidéo pour calmer tout le monde', outcome: { narrative: 'Classique mais efficace.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_69', category: 'VESTIAIRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un tacle un peu trop appuyé d'un coéquipier à l'entraînement vous laisse une grosse béquille.",
    options: [
      { typeTag: 'Revanche', text: 'Lui rendre la pareille au prochain duel', outcome: [
        { probability: 0.4, narrative: 'Il a compris le message, respect mutuel.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.6, narrative: 'Le coach déteste cet esprit de vengeance.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Calme', text: 'Quitter la séance pour vous soigner', outcome: [
        { probability: 0.9, narrative: 'Glace et repos, tout ira bien.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le coéquipier se moque de vous.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Dérision', text: 'En rigoler et finir la séance en boitant', outcome: { narrative: 'Vous montrez un bel état d\'esprit.', effects: [{text: '+5 Confiance', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_70', category: 'VESTIAIRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier traverse une période très difficile (divorce) et s'isole du groupe.",
    options: [
      { typeTag: 'Ami', text: 'Passer la soirée avec lui pour lui changer les idées', outcome: [
        { probability: 0.7, narrative: 'Une grande amitié naît. Vous êtes fatigué mais heureux.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15), form: Math.max(0, p.form-5)}) }, 
        { probability: 0.3, narrative: 'Il vous entraîne dans ses problèmes personnels.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Le signaler au coach pour qu\'il gère', outcome: [
        { probability: 0.9, narrative: 'Le club met un psy à sa disposition.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Le joueur apprend que vous avez "cafté".', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Soutien', text: 'Lui envoyer un message de soutien discret', outcome: { narrative: 'Une petite attention qui fait du bien sans trop s\'investir.', effects: [{text: '+2 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+2)}) } }
    ]
  }
];
