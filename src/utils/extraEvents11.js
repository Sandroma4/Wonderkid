export const EXTRA_EVENTS_11 = [
  {
    id: 'foot_11_01', category: 'ENTRAÎNEMENT', tag: 'Aérobic', targetPosition: 'ALL',
    description: "Une séance d'aérobic et d'étirements très intenses est au programme.",
    options: [
      { typeTag: 'Souplesse', text: 'S\'impliquer totalement', outcome: { narrative: 'Vous gagnez en fluidité dans vos mouvements.', effects: [{ text: '+3 Dribble', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3) } }) } },
      { typeTag: 'Minimaliste', text: 'Faire le strict minimum', outcome: { narrative: 'Vous évitez la fatigue.', effects: [{ text: '+10 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10) }) } }
    ]
  },
  {
    id: 'foot_11_02', category: 'MATCH', tag: 'Coup-franc', targetPosition: 'ALL',
    description: "Coup-franc direct extrêmement bien placé à la 90ème minute. Score nul.",
    options: [
      { typeTag: 'En force', text: 'Tirer fort côté gardien', outcome: [
        { probability: 0.5, narrative: 'Le filet tremble ! Victoire magnifique.', effects: [{ text: '+4 Tir', style: 'positive' }, { text: '+20 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 4) } }) },
        { probability: 0.5, narrative: 'Directement dans le mur.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) }
      ] },
      { typeTag: 'En finesse', text: 'Enrouler par-dessus le mur', outcome: [
        { probability: 0.6, narrative: 'Le gardien est cloué sur place. Chef d\'œuvre.', effects: [{ text: '+3 Dribble', style: 'positive' }, { text: '+3 Tir', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3), finishing: Math.min(99, p.attributes.finishing + 3) } }) },
        { probability: 0.4, narrative: 'Ça passe juste au-dessus.', effects: [{ text: '-5 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 5) }) }
      ] }
    ]
  },
  {
    id: 'foot_11_03', category: 'CARRIÈRE', tag: 'Critique', targetPosition: 'ALL',
    description: "Une légende de votre club déclare dans la presse que vous ne mouillez pas assez le maillot.",
    options: [
      { typeTag: 'Humble', text: 'Lui donner raison et travailler plus dur', outcome: { narrative: 'Les fans adorent cette attitude.', effects: [{ text: '+2 Physique', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 2) } }) } },
      { typeTag: 'Orgueil', text: 'Dire que son époque est révolue', outcome: [
        { probability: 0.3, narrative: 'Certains supporters vous soutiennent.', effects: [{ text: '+5 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) }) },
        { probability: 0.7, narrative: 'Grosse erreur médiatique. Le public vous siffle.', effects: [{ text: '-20 Moral', style: 'negative' }, { text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 15) }) }
      ] }
    ]
  },
  {
    id: 'foot_11_04', category: 'LIFESTYLE', tag: 'Gala', targetPosition: 'ALL',
    description: "Vous êtes invité à un gala de charité très prestigieux organisé par le club.",
    options: [
      { typeTag: 'Mondain', text: 'Y aller et réseauter', outcome: { narrative: 'Vous faites forte impression.', effects: [{ text: '+15 Moral', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), coachTrust: Math.min(100, p.coachTrust + 10) }) } },
      { typeTag: 'Asocial', text: 'Décliner pour rester chez soi', outcome: { narrative: 'Le président est un peu déçu.', effects: [{ text: '-10 Confiance', style: 'negative' }, { text: '+10 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10), form: Math.min(100, p.form + 10) }) } }
    ]
  },
  {
    id: 'foot_11_05', category: 'MATCH', tag: 'Derby', targetPosition: 'ALL',
    description: "C'est le derby régional. L'ambiance dans le stade est hostile et écrasante.",
    options: [
      { typeTag: 'Mental', text: 'Utiliser la pression pour se sublimer', outcome: [
        { probability: 0.6, narrative: 'Vous faites un match exceptionnel dans l\'adversité.', effects: [{ text: '+3 Vitesse', style: 'positive' }, { text: '+20 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 3) } }) },
        { probability: 0.4, narrative: 'La pression vous liquéfie.', effects: [{ text: '-20 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20) }) }
      ] },
      { typeTag: 'Sécurité', text: 'Jouer simple pour ne pas faire d\'erreur', outcome: { narrative: 'Prestation solide, sans éclat.', effects: [{ text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 2) } }) } }
    ]
  },
  {
    id: 'foot_11_06', category: 'ENTRAÎNEMENT', tag: 'Sprint', targetPosition: 'ALL',
    description: "Séance spécifique basée uniquement sur des sprints courts répétitifs.",
    options: [
      { typeTag: 'Explosif', text: 'Donner 100% sur chaque sprint', outcome: [
        { probability: 0.7, narrative: 'Votre vivacité s\'améliore.', effects: [{ text: '+4 Vitesse', style: 'positive' }, { text: '-20 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 20), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 4) } }) },
        { probability: 0.3, narrative: 'Crampe monumentale.', effects: [{ text: '-30 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 30) }) }
      ] },
      { typeTag: 'Gestion', text: 'Gérer son effort', outcome: { narrative: 'Vous ne risquez rien.', effects: [{ text: '+1 Vitesse', style: 'positive' }, { text: '-5 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 5), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 1) } }) } }
    ]
  },
  {
    id: 'foot_11_07', category: 'CARRIÈRE', tag: 'Rumeur', targetPosition: 'ALL',
    description: "Une rumeur indique que le club veut recruter une star mondiale à votre poste cet été.",
    options: [
      { typeTag: 'Motivation', text: 'Redoubler d\'efforts', outcome: { narrative: 'Vous prouvez que vous êtes irremplaçable.', effects: [{ text: '+3 Dribble', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3) } }) } },
      { typeTag: 'Doute', text: 'Demander des explications au coach', outcome: [
        { probability: 0.5, narrative: 'Il vous rassure sur votre statut.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) },
        { probability: 0.5, narrative: 'Il le prend mal.', effects: [{ text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15) }) }
      ] }
    ]
  },
  {
    id: 'foot_11_08', category: 'MATCH', tag: 'Défense', targetPosition: 'ALL',
    description: "L'équipe adverse part en contre-attaque fulgurante, vous êtes le dernier défenseur.",
    options: [
      { typeTag: 'Tacle', text: 'Faire un tacle glissé désespéré', outcome: [
        { probability: 0.6, narrative: 'Tacle parfait ! Le stade exulte.', effects: [{ text: '+4 Défense', style: 'positive' }, { text: '+20 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 4) } }) },
        { probability: 0.4, narrative: 'En retard. Carton rouge.', effects: [{ text: '-20 Moral', style: 'negative' }, { text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 15) }) }
      ] },
      { typeTag: 'Placement', text: 'Reculer pour boucher l\'angle', outcome: { narrative: 'Vous le forcez à s\'excentrer, le gardien arrête.', effects: [{ text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 2) } }) } }
    ]
  },
  {
    id: 'foot_11_09', category: 'ENTRAÎNEMENT', tag: 'Coéquipier', targetPosition: 'ALL',
    description: "Un coéquipier est en perte de confiance totale et rate tout à l'entraînement.",
    options: [
      { typeTag: 'Soutien', text: 'Lui parler pour l\'encourager', outcome: { narrative: 'Il retrouve le sourire et le groupe s\'en ressent.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), coachTrust: Math.min(100, p.coachTrust + 10) }) } },
      { typeTag: 'Exigence', text: 'Lui crier dessus pour le bouger', outcome: [
        { probability: 0.5, narrative: 'Ça marche, il se révolte et marque.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) },
        { probability: 0.5, narrative: 'Il craque et quitte la séance. Ambiance tendue.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) }
      ] }
    ]
  },
  {
    id: 'foot_11_10', category: 'CARRIÈRE', tag: 'Vidéo', targetPosition: 'ALL',
    description: "Un youtubeur très suivi vous propose de faire un défi technique en vidéo.",
    options: [
      { typeTag: 'Fun', text: 'Accepter', outcome: [
        { probability: 0.8, narrative: 'Vidéo virale, votre technique impressionne.', effects: [{ text: '+3 Dribble', style: 'positive' }, { text: '+20k €', style: 'positive' }], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance || 0) + 20000, attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3) } }) },
        { probability: 0.2, narrative: 'Vous ratez vos gestes, la risée des réseaux.', effects: [{ text: '-20 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20) }) }
      ] },
      { typeTag: 'Pro', text: 'Refuser poliment', outcome: { narrative: 'Pas de fioritures.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } }
    ]
  }
];
