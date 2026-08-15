export const EXTRA_EVENTS_3 = [
  // ================= SCÉNARIOS CLASSIQUES =================
  {
    id: 'extra_46', category: 'CARRIÈRE', tag: 'Chantage', targetPosition: 'ALL', condition: (p) => p.bankBalance > 500000,
    description: "Une ancienne conquête vous menace de révéler des secrets gênants si vous ne payez pas.",
    options: [
      { typeTag: 'Paiement', text: 'Payer 100k €', outcome: [
        { probability: 0.8, narrative: 'Secret gardé, compte en banque allégé.', effects: [{ text: '-100k €', style: 'negative' }, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0) - 100000) }) },
        { probability: 0.2, narrative: 'Malgré le paiement, elle vend l\'histoire à la presse !', effects: [{ text: '-100k €', style: 'negative' }, { text: '-15 Moral', style: 'negative' }, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0) - 100000), morale: Math.max(0, p.morale - 15) }) }
      ] },
      { typeTag: 'Refus', text: 'Refuser et l\'ignorer', outcome: [
        { probability: 0.8, narrative: 'Scandale dans la presse rose.', effects: [{ text: '-15 Moral', style: 'negative' }, { text: '-10 Confiance', style: 'negative' }, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale - 15), coachTrust: Math.max(0, p.coachTrust - 10) }) },
        { probability: 0.2, narrative: 'C\'était un bluff ! Elle disparaît sans rien dire.', effects: [{ text: '+5 Moral', style: 'positive' }, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale + 5) }) }
      ] },
      { typeTag: 'Négociation', text: 'Négocier un accord à l\'amiable (50k €)', outcome: [
        { probability: 0.9, narrative: 'Elle accepte l\'accord. L\'affaire est étouffée à moindre coût.', effects: [{ text: '-50k €', style: 'negative' }, { text: '-5 Moral', style: 'negative' }, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0) - 50000), morale: Math.max(0, p.morale - 5) }) },
        { probability: 0.1, narrative: 'Les négociations échouent et fuitent dans la presse !', effects: [{ text: '-15 Moral', style: 'negative' }, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale - 15) }) }
      ] }
    ]
  },
  {
    id: 'extra_47', category: 'LIFESTYLE', tag: 'Divertissement', targetPosition: 'ALL', condition: () => true,
    description: "Un célèbre streamer vous invite à jouer en direct la veille d'un entraînement.",
    options: [
      { typeTag: 'Geek', text: 'Jouer toute la nuit', outcome: [
        { probability: 0.8, narrative: 'Vous gagnez de nouveaux fans, mais arrivez fatigué.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '-10 Forme', style: 'negative' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale + 10), form: Math.max(0, p.form - 10) }) },
        { probability: 0.2, narrative: 'Vous vous couchez tard ET le stream plante.', effects: [{ text: '-10 Forme', style: 'negative' }, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form - 10) }) }
      ] },
      { typeTag: 'Pro', text: 'Décliner', outcome: [
        { probability: 0.8, narrative: 'Les gamers sont déçus, mais vous êtes en forme.', effects: [{ text: '+5 Forme', style: 'positive' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form + 5) }) },
        { probability: 0.2, narrative: 'Vous dormez mal quand même.', effects: [{ text: '-5 Forme', style: 'negative' }, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form - 5) }) }
      ] },
      { typeTag: 'Modération', text: 'Faire une courte apparition (1h)', outcome: [
        { probability: 0.85, narrative: 'Bon compromis : un peu de visibilité sans trop de fatigue.', effects: [{ text: '+5 Moral', style: 'positive' }, { text: '-2 Forme', style: 'negative' }, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale + 5), form: Math.max(0, p.form - 2) }) },
        { probability: 0.15, narrative: 'Vous vous laissez emporter par le jeu et vous couchez tard...', effects: [{ text: '-8 Forme', style: 'negative' }, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, form: Math.max(0, p.form - 8) }) }
      ] }
    ]
  },
  {
    id: 'extra_48', category: 'MATCH', tag: 'Bagarre', targetPosition: 'ALL', condition: () => true,
    description: "Bagarre générale sur le terrain après un tacle assassin sur un de vos coéquipiers.",
    options: [
      { typeTag: 'Défenseur', text: 'Défendre votre ami', outcome: [
        { probability: 0.8, narrative: 'Carton rouge ! Mais le vestiaire vous adore.', effects: [{ text: '+20 Moral', style: 'positive' }, { text: '-20 Confiance', style: 'negative' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale + 20), coachTrust: Math.max(0, p.coachTrust - 20) }) },
        { probability: 0.2, narrative: 'Vous prenez un mauvais coup et finissez à l\'infirmerie.', effects: [{ text: '-30 Forme', style: 'negative' }, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form - 30) }) }
      ] },
      { typeTag: 'Pacifiste', text: 'Séparer tout le monde', outcome: [
        { probability: 0.8, narrative: 'Geste salué par la ligue.', effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust + 5) }) },
        { probability: 0.2, narrative: 'Un coéquipier vous reproche votre manque de courage.', effects: [{ text: '-10 Moral', style: 'negative' }, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Diplomate', text: 'Aller parler à l\'arbitre pour calmer le jeu', outcome: [
        { probability: 0.7, narrative: 'L\'arbitre apprécie votre calme et évite le rouge à votre équipe.', effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '+2 Moral', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust + 5), morale: Math.min(100, p.morale + 2) }) },
        { probability: 0.3, narrative: 'L\'arbitre est débordé et vous avertit verbalement.', effects: [{ text: '-5 Moral', style: 'negative' }, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale - 5) }) }
      ] }
    ]
  },
  {
    id: 'extra_49', category: 'ENTRAÎNEMENT', tag: 'Régime', targetPosition: 'ALL', condition: (p) => p.form < 70,
    description: "La balance affiche 2 kilos de trop. Le nutritionniste vous met au régime sec.",
    options: [
      { typeTag: 'Discipline', text: 'Suivre à la lettre', outcome: [
        { probability: 0.8, narrative: 'Vous fondez et retrouvez de la vitesse.', effects: [{ text: '+2 VIT', style: 'positive' }, { text: '+10 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 2) }, form: Math.min(100, p.form + 10) }) },
        { probability: 0.2, narrative: 'Régime trop strict, vous perdez en puissance.', effects: [{ text: '-2 PHY', style: 'negative' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.max(1, p.attributes.physical - 2) } }) }
      ] },
      { typeTag: 'Triche', text: 'Manger des fast-foods en cachette', outcome: [
        { probability: 0.8, narrative: 'Vous êtes lourd sur le terrain.', effects: [{ text: '-2 PHY', style: 'negative' }, { text: '-5 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.max(1, p.attributes.physical - 2) }, form: Math.max(0, p.form - 5) }) },
        { probability: 0.2, narrative: 'Le métabolisme est bon, personne ne remarque rien.', effects: [{ text: '+5 Moral', style: 'positive' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale + 5) }) }
      ] },
      { typeTag: 'Compromis', text: 'Demander un régime progressif et personnalisé', outcome: [
        { probability: 0.75, narrative: 'Perte de poids plus lente mais stable. Bonne énergie conservée.', effects: [{ text: '+5 Forme', style: 'positive' }, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form + 5) }) },
        { probability: 0.25, narrative: 'Le nutritionniste refuse de changer ses plans, tension générée.', effects: [{ text: '-5 Confiance', style: 'negative' }, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust - 5) }) }
      ] }
    ]
  },
  {
    id: 'extra_50', category: 'CARRIÈRE', tag: 'Sélection', targetPosition: 'ALL', condition: (p) => p.ovr > 82,
    description: "Le sélectionneur national vous critique publiquement sur votre implication.",
    options: [
      { typeTag: 'Orgueil', text: 'Répondre sèchement', outcome: [
        { probability: 0.8, narrative: 'Vous n\'êtes plus appelé en équipe nationale.', effects: [{ text: '-15 Moral', style: 'negative' }, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale - 15) }) },
        { probability: 0.2, narrative: 'Le public vous soutient contre le sélectionneur.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale + 10) }) }
      ] },
      { typeTag: 'Humble', text: 'Accepter la critique', outcome: [
        { probability: 0.8, narrative: 'Vous gardez votre place pour le prochain rassemblement.', effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust + 5) }) },
        { probability: 0.2, narrative: 'Il vous prend pour un faible et vous met sur le banc.', effects: [{ text: '-10 Confiance', style: 'negative' }, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Communication', text: 'L\'appeler en privé pour dissiper le malentendu', outcome: [
        { probability: 0.8, narrative: 'Il apprécie votre démarche mature. L\'incident est clos.', effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '+5 Moral', style: 'positive' }, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust + 5), morale: Math.min(100, p.morale + 5) }) },
        { probability: 0.2, narrative: 'Il reste froid et refuse vos explications.', effects: [{ text: '-10 Moral', style: 'negative' }, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale - 10) }) }
      ] }
    ]
  }
];
