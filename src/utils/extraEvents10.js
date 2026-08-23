export const EXTRA_EVENTS_10 = [
  {
    id: 'foot_10_01', category: 'ENTRAÎNEMENT', tag: 'Dépassement', targetPosition: '!GK',
    description: "Le coach vous demande de rester après l'entraînement pour travailler vos frappes de loin.",
    options: [
      { typeTag: 'Travailleur', text: 'Accepter avec enthousiasme', outcome: [
        { probability: 0.7, narrative: 'Vos frappes deviennent limpides.', effects: [{ text: '+3 Tir', style: 'positive' }, { text: '-5 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 5), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 3) } }) },
        { probability: 0.3, narrative: 'Vous vous blessez légèrement à la cuisse.', effects: [{ text: '-15 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15) }) }
      ] },
      { typeTag: 'Économe', text: 'Refuser pour vous reposer', outcome: { narrative: 'Vous privilégiez la récupération.', effects: [{ text: '+10 Forme', style: 'positive' }, { text: '-5 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10), coachTrust: Math.max(0, p.coachTrust - 5) }) } }
    ]
  },
  {
    id: 'foot_10_02', category: 'CARRIÈRE', tag: 'Polémique', targetPosition: 'ALL',
    description: "Un journaliste critique ouvertement votre style de jeu à la télévision.",
    options: [
      { typeTag: 'Rancunier', text: 'Lui répondre sèchement sur les réseaux', outcome: [
        { probability: 0.5, narrative: 'Les fans adorent votre répondant.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) },
        { probability: 0.5, narrative: 'La presse se retourne contre vous.', effects: [{ text: '-15 Moral', style: 'negative' }, { text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15), coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Silencieux', text: 'Ignorer et répondre sur le terrain', outcome: { narrative: 'Cette pique vous motive comme jamais.', effects: [{ text: '+2 Vitesse', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 2) } }) } }
    ]
  },
  {
    id: 'foot_10_03', category: 'MATCH', tag: 'Dilemme', targetPosition: '!GK',
    description: "Vous filez seul au but mais un coéquipier est mieux placé.",
    options: [
      { typeTag: 'Égoïste', text: 'Tenter sa chance en solo', outcome: [
        { probability: 0.4, narrative: 'But magnifique en lucarne !', effects: [{ text: '+2 Tir', style: 'positive' }, { text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 2) } }) },
        { probability: 0.6, narrative: 'Le gardien repousse, le coéquipier fulmine.', effects: [{ text: '-10 Moral', style: 'negative' }, { text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10), coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Altruiste', text: 'Faire la passe', outcome: { narrative: 'Il marque dans le but vide. Belle action collective.', effects: [{ text: '+3 Passe', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 3) } }) } }
    ]
  },
  {
    id: 'foot_10_04', category: 'ENTRAÎNEMENT', tag: 'Musculation', targetPosition: 'ALL',
    description: "Le préparateur physique vous propose un cycle intensif de prise de masse.",
    options: [
      { typeTag: 'Dévoué', text: 'Suivre le cycle rigoureusement', outcome: [
        { probability: 0.6, narrative: 'Vous prenez du muscle et de l\'impact.', effects: [{ text: '+4 Physique', style: 'positive' }, { text: '-15 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 4) } }) },
        { probability: 0.4, narrative: 'Vous perdez en vivacité et vous sentez lourd.', effects: [{ text: '-2 Vitesse', style: 'negative' }, { text: '-10 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 10), attributes: { ...p.attributes, pace: Math.max(1, p.attributes.pace - 2) } }) }
      ] },
      { typeTag: 'Prudent', text: 'Refuser pour garder sa légèreté', outcome: { narrative: 'Vous restez vif et agile.', effects: [{ text: '+2 Vitesse', style: 'positive' }, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 2), dribbling: Math.min(99, p.attributes.dribbling + 2) } }) } }
    ]
  },
  {
    id: 'foot_10_05', category: 'CARRIÈRE', tag: 'Sponsor', targetPosition: 'ALL', condition: (p) => p.ovr >= 70,
    description: "Une grande marque vous propose un contrat de chaussures très lucratif mais exigeant en temps.",
    options: [
      { typeTag: 'Business', text: 'Signer et faire les shootings', outcome: [
        { probability: 0.5, narrative: 'Le shooting vous épuise un peu mais l\'argent rentre.', effects: [{ text: '+50k €', style: 'positive' }, { text: '-10 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 10), bankBalance: (p.bankBalance || 0) + 50000 }) },
        { probability: 0.5, narrative: 'Le coach n\'aime pas vous voir dispersé.', effects: [{ text: '+50k €', style: 'positive' }, { text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15), bankBalance: (p.bankBalance || 0) + 50000 }) }
      ] },
      { typeTag: 'Focus', text: 'Refuser l\'offre', outcome: { narrative: 'Football d\'abord. Le staff apprécie.', effects: [{ text: '+10 Confiance', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), morale: Math.min(100, p.morale + 10) }) } }
    ]
  },
  {
    id: 'foot_10_06', category: 'MATCH', tag: 'Agressivité', targetPosition: 'ALL',
    description: "Le match est tendu. Un adversaire vous provoque et vous donne un coup en douce.",
    options: [
      { typeTag: 'Sang-chaud', text: 'Lui rendre son coup', outcome: [
        { probability: 0.2, narrative: 'L\'arbitre n\'a rien vu, vous avez pris le dessus physiquement.', effects: [{ text: '+3 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) },
        { probability: 0.8, narrative: 'Carton rouge direct. Désastre.', effects: [{ text: '-20 Moral', style: 'negative' }, { text: '-25 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 25) }) }
      ] },
      { typeTag: 'Professionnel', text: 'Garder son calme et le signaler', outcome: { narrative: 'L\'arbitre a vu l\'action et l\'avertit. Vous restez focus.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), coachTrust: Math.min(100, p.coachTrust + 10) }) } }
    ]
  },
  {
    id: 'foot_10_07', category: 'ENTRAÎNEMENT', tag: 'Repos', targetPosition: 'ALL',
    description: "Journée de repos avant un gros match de coupe. Que faites-vous ?",
    options: [
      { typeTag: 'Détente', text: 'Jouer à la console toute la journée', outcome: { narrative: 'Vous êtes frais mentalement mais vos jambes sont lourdes.', effects: [{ text: '+15 Moral', style: 'positive' }, { text: '-5 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), form: Math.max(0, p.form - 5) }) } },
      { typeTag: 'Sérieux', text: 'Faire du vélo d\'appartement', outcome: { narrative: 'Vous maintenez votre tonicité.', effects: [{ text: '+15 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 15) }) } },
      { typeTag: 'Tactique', text: 'Analyser les vidéos de l\'adversaire', outcome: { narrative: 'Vous anticipez leurs déplacements.', effects: [{ text: '+2 Défense', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 2), passing: Math.min(99, p.attributes.passing + 2) } }) } }
    ]
  },
  {
    id: 'foot_10_08', category: 'CARRIÈRE', tag: 'Capitanat', targetPosition: 'ALL', condition: (p) => p.age >= 24 && p.ovr >= 80,
    description: "L'entraîneur songe à vous donner le brassard de capitaine suite au départ de l'ancien.",
    options: [
      { typeTag: 'Leader', text: 'Accepter cette responsabilité', outcome: [
        { probability: 0.6, narrative: 'Vous transcendez l\'équipe sur le terrain.', effects: [{ text: '+20 Confiance', style: 'positive' }, { text: '+3 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) },
        { probability: 0.4, narrative: 'La pression est trop forte, vous perdez vos moyens.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) }
      ] },
      { typeTag: 'Modeste', text: 'Suggérer un autre coéquipier plus expérimenté', outcome: { narrative: 'Choix sage, la cohésion est préservée.', effects: [{ text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) } }
    ]
  },
  {
    id: 'foot_10_09', category: 'MATCH', tag: 'Climat', targetPosition: 'ALL',
    description: "Tempête de neige en plein match. Le terrain est impraticable.",
    options: [
      { typeTag: 'Guerrier', text: 'Jouer dur sur l\'homme et balancer', outcome: [
        { probability: 0.7, narrative: 'Adaptation parfaite aux conditions.', effects: [{ text: '+3 Physique', style: 'positive' }, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3), defense: Math.min(99, p.attributes.defense + 2) } }) },
        { probability: 0.3, narrative: 'Vous glissez et commettez des erreurs.', effects: [{ text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Puriste', text: 'Tenter de jouer au sol coûte que coûte', outcome: [
        { probability: 0.2, narrative: 'Des passes lumineuses brisent leurs lignes !', effects: [{ text: '+4 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 4) } }) },
        { probability: 0.8, narrative: 'Le ballon s\'arrête dans la neige, contre-attaque fatale.', effects: [{ text: '-20 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20) }) }
      ] }
    ]
  },
  {
    id: 'foot_10_10', category: 'ENTRAÎNEMENT', tag: 'Jeunes', targetPosition: 'ALL', condition: (p) => p.age >= 26,
    description: "Un jeune du centre de formation très prometteur joue à votre poste et s'entraîne avec les pros.",
    options: [
      { typeTag: 'Mentor', text: 'Le prendre sous votre aile', outcome: { narrative: 'Une saine concurrence s\'installe.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), coachTrust: Math.min(100, p.coachTrust + 10) }) } },
      { typeTag: 'Territoire', text: 'Le malmener physiquement lors des duels', outcome: [
        { probability: 0.5, narrative: 'Il retourne en réserve. Vous gardez votre place de leader.', effects: [{ text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 2) } }) },
        { probability: 0.5, narrative: 'Le coach vous sanctionne pour votre agressivité.', effects: [{ text: '-20 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20) }) }
      ] }
    ]
  },
  {
    id: 'foot_10_11', category: 'LIFESTYLE', tag: 'Nutrition', targetPosition: 'ALL',
    description: "Un diététicien réputé vous propose un régime strict sans aucun écart.",
    options: [
      { typeTag: 'Strict', text: 'Suivre le régime', outcome: [
        { probability: 0.7, narrative: 'Votre corps est affûté comme jamais.', effects: [{ text: '+3 Vitesse', style: 'positive' }, { text: '+15 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 15), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 3) } }) },
        { probability: 0.3, narrative: 'La frustration vous ronge et vous déprime.', effects: [{ text: '-20 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20) }) }
      ] },
      { typeTag: 'Bon vivant', text: 'Garder votre routine habituelle', outcome: { narrative: 'L\'équilibre avant tout.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) } }
    ]
  },
  {
    id: 'foot_10_12', category: 'MATCH', tag: 'Tension', targetPosition: '!GK',
    description: "Fin de match, il y a pénalty pour vous mais c'est l'attaquant star qui doit tirer.",
    options: [
      { typeTag: 'Culot', text: 'Prendre le ballon des mains de la star', outcome: [
        { probability: 0.4, narrative: 'Vous marquez. Grosse personnalité !', effects: [{ text: '+3 Tir', style: 'positive' }, { text: '+20 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 3) } }) },
        { probability: 0.6, narrative: 'Vous ratez. Le vestiaire est furieux.', effects: [{ text: '-25 Moral', style: 'negative' }, { text: '-20 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 25), coachTrust: Math.max(0, p.coachTrust - 20) }) }
      ] },
      { typeTag: 'Respect', text: 'Lui laisser', outcome: { narrative: 'Il marque et vient vous remercier.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) } }
    ]
  },
  {
    id: 'foot_10_13', category: 'CARRIÈRE', tag: 'Agent', targetPosition: 'ALL',
    description: "Votre agent veut absolument vous transférer cet hiver pour toucher une grosse commission.",
    options: [
      { typeTag: 'Fidèle', text: 'Le renvoyer et rester au club', outcome: { narrative: 'Le club adore votre loyauté.', effects: [{ text: '+30 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 30) }) } },
      { typeTag: 'Mercenaire', text: 'Le laisser faire pression', outcome: [
        { probability: 0.5, narrative: 'La direction s\'agace mais le laisse faire.', effects: [{ text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15) }) },
        { probability: 0.5, narrative: 'Vous obtenez une revalorisation salariale pour rester !', effects: [{ text: '+50k €', style: 'positive' }], applyStats: (p) => ({ ...p, bankBalance: (p.bankBalance || 0) + 50000 }) }
      ] }
    ]
  },
  {
    id: 'foot_10_14', category: 'ENTRAÎNEMENT', tag: 'Vidéo', targetPosition: 'ALL',
    description: "Séance vidéo interminable organisée par le coach adjoint.",
    options: [
      { typeTag: 'Assidu', text: 'Prendre des notes', outcome: { narrative: 'Votre intelligence de jeu progresse.', effects: [{ text: '+2 Défense', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 2), passing: Math.min(99, p.attributes.passing + 2) } }) } },
      { typeTag: 'Distrait', text: 'S\'endormir au fond de la salle', outcome: [
        { probability: 0.2, narrative: 'Personne n\'a rien vu.', effects: [{ text: '+10 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10) }) },
        { probability: 0.8, narrative: 'Le coach vous surprend et pique une crise.', effects: [{ text: '-20 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20) }) }
      ] }
    ]
  },
  {
    id: 'foot_10_15', category: 'MATCH', tag: 'Blessure', targetPosition: 'ALL',
    description: "Vous ressentez une pointe derrière la cuisse en plein match.",
    options: [
      { typeTag: 'Prudent', text: 'Demander le changement', outcome: { narrative: 'Sage décision, simple alerte.', effects: [{ text: '+10 Forme', style: 'positive' }], applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10) }) } },
      { typeTag: 'Guerrier', text: 'Serrer les dents et continuer', outcome: [
        { probability: 0.4, narrative: 'La douleur disparaît à chaud.', effects: [{ text: '+10 Moral', style: 'positive' }, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 2) } }) },
        { probability: 0.6, narrative: 'Claquage ! Vous sortez sur civière.', effects: [{ text: '-40 Forme', style: 'negative' }, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 40), attributes: { ...p.attributes, pace: Math.max(1, p.attributes.pace - 2) } }) }
      ] }
    ]
  },
  {
    id: 'foot_10_16', category: 'LIFESTYLE', tag: 'Fans', targetPosition: 'ALL',
    description: "Un fan envahit le terrain à la fin du match pour vous enlacer.",
    options: [
      { typeTag: 'Sympa', text: 'Lui donner votre maillot', outcome: { narrative: 'Une image forte qui fait le tour du monde.', effects: [{ text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) } },
      { typeTag: 'Sécurité', text: 'Le repousser et appeler les stadiers', outcome: { narrative: 'Geste très critiqué par la presse locale.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) } }
    ]
  },
  {
    id: 'foot_10_17', category: 'ENTRAÎNEMENT', tag: 'Technique', targetPosition: 'ALL',
    description: "Atelier de jongles avec balles de tennis imposé par un préparateur old-school.",
    options: [
      { typeTag: 'Focalisé', text: 'Jouer le jeu à fond', outcome: [
        { probability: 0.7, narrative: 'Votre toucher de balle s\'affine considérablement.', effects: [{ text: '+3 Dribble', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 3) } }) },
        { probability: 0.3, narrative: 'Vous n\'y arrivez pas et vous agacez.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Rebelle', text: 'Dire que c\'est inutile dans le foot moderne', outcome: { narrative: 'Le préparateur vous envoie courir autour du terrain.', effects: [{ text: '+3 Physique', style: 'positive' }, { text: '-15 Forme', style: 'negative' }], applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) } }
    ]
  },
  {
    id: 'foot_10_18', category: 'MATCH', tag: 'Arbitrage', targetPosition: 'ALL',
    description: "L'arbitre siffle une faute imaginaire contre vous à l'entrée de la surface.",
    options: [
      { typeTag: 'Râleur', text: 'Hurler sur l\'arbitre', outcome: [
        { probability: 0.2, narrative: 'Étonnamment, il revient sur sa décision.', effects: [{ text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) },
        { probability: 0.8, narrative: 'Il dégaine le carton jaune sans hésiter.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Calme', text: 'Vous replacer directement', outcome: { narrative: 'Concentration maximale.', effects: [{ text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, defense: Math.min(99, p.attributes.defense + 2) } }) } }
    ]
  },
  {
    id: 'foot_10_19', category: 'CARRIÈRE', tag: 'Coach', targetPosition: 'ALL',
    description: "Le club traverse une mauvaise passe. Le coach vient vous demander conseil.",
    options: [
      { typeTag: 'Tactique', text: 'Proposer un changement de système', outcome: [
        { probability: 0.6, narrative: 'Le changement marche. L\'équipe gagne !', effects: [{ text: '+20 Confiance', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 2) } }) },
        { probability: 0.4, narrative: 'C\'est un désastre total. Il vous en tient pour responsable.', effects: [{ text: '-20 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20) }) }
      ] },
      { typeTag: 'Prudence', text: 'Lui dire de faire confiance à ses idées', outcome: { narrative: 'Il apprécie votre soutien inconditionnel.', effects: [{ text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10) }) } }
    ]
  },
  {
    id: 'foot_10_20', category: 'MATCH', tag: 'Dernière passe', targetPosition: 'ALL',
    description: "Une ouverture splendide vous met dans une position idéale mais décalée.",
    options: [
      { typeTag: 'Instinctif', text: 'Frapper en première intention', outcome: [
        { probability: 0.5, narrative: 'Un boulet de canon qui transperce le filet !', effects: [{ text: '+4 Tir', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 4) } }) },
        { probability: 0.5, narrative: 'Totalement dévissé.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Cérébral', text: 'Chercher le centre en retrait', outcome: [
        { probability: 0.7, narrative: 'Le coéquipier n\'a plus qu\'à la pousser.', effects: [{ text: '+3 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 3) } }) },
        { probability: 0.3, narrative: 'La défense intercepte. Vous auriez dû tirer.', effects: [{ text: '-5 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 5) }) }
      ] }
    ]
  }
];
