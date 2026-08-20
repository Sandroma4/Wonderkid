export const EXTRA_EVENTS_12 = [
  {
    id: 'foot_12_01', category: 'MÉDIAS', tag: 'Polémique', targetPosition: 'ALL',
    description: "Un journaliste vous compare à l'attaquant titulaire de la sélection, actuellement dans une très mauvaise passe.",
    options: [
      { typeTag: 'Arrogance', text: 'On ne compare pas la F1 et le karting.', outcome: { narrative: 'Une punchline légendaire ! Vos fans adorent, mais le sélectionneur fulmine.', effects: [{ text: '+30 Moral', style: 'positive' }, { text: '-30 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30), coachTrust: Math.max(0, p.coachTrust - 30) }) } },
      { typeTag: 'Modeste', text: 'Je trace mon propre chemin sans me comparer.', outcome: { narrative: 'Une réponse lisse et professionnelle.', effects: [{ text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10) }) } },
      { typeTag: 'Soutien', text: 'Il mérite sa place, c\'est un grand joueur.', outcome: { narrative: 'Votre coéquipier vous remercie en privé. Le groupe vit bien.', effects: [{ text: '+15 Confiance', style: 'positive' }, { text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15), morale: Math.min(100, p.morale + 10) }) } }
    ]
  },
  {
    id: 'foot_12_02', category: 'WORLD_CUP', tag: 'Grève', targetPosition: 'ALL',
    description: "Mutinerie en pleine Coupe du Monde ! L'équipe refuse de descendre du bus pour protester contre l'exclusion d'un joueur.",
    options: [
      { typeTag: 'Porte-parole', text: 'Sortir lire la lettre des joueurs aux médias', outcome: { narrative: 'Un désastre médiatique planétaire. Votre réputation est ternie à jamais.', effects: [{ text: '-40 Moral', style: 'negative' }, { text: '-40 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 40), coachTrust: Math.max(0, p.coachTrust - 40) }) } },
      { typeTag: 'Rebelle', text: 'Briser la grève et aller s\'entraîner seul', outcome: { narrative: 'Le public salue votre professionnalisme face au ridicule de la situation.', effects: [{ text: '+20 Confiance', style: 'positive' }, { text: '+3 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 3) } }) } },
      { typeTag: 'Neutre', text: 'Rester caché au fond du bus', outcome: { narrative: 'Vous passez inaperçu dans ce naufrage collectif.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) } }
    ]
  },, { text: '+5 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 30), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 5) } }) } },
      { typeTag: 'Répartie', text: 'Le détruire verbalement', outcome: [
        { probability: 0.5, narrative: 'Il perd ses nerfs et prend un rouge ! Vous gagnez le match.', effects: [{ text: '+30 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30) }) },
        { probability: 0.5, narrative: 'L\'arbitre vous avertit tous les deux.', effects: [{ text: '-5 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 5) }) }
      ] },
      { typeTag: 'Sang-froid', text: 'Garder son calme et répondre par un but', outcome: [
        { probability: 0.7, narrative: 'Vous plantez le but de la victoire ! Une légende absolue.', effects: [{ text: '+40 Moral', style: 'positive' }, { text: '+5 Tir', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 40), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 5) } }) },
        { probability: 0.3, narrative: 'Le match se termine aux tirs au but... et vous ratez.', effects: [{ text: '-20 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20) }) }
      ] }
    ]
  },
  {
    id: 'foot_12_04', category: 'MÉDIAS', tag: 'Interview', targetPosition: 'ALL',
    description: "Interview sous tension après une humiliation 4-0. Le journaliste demande si la spirale négative est définitive.",
    options: [
      { typeTag: 'Philosophe', text: 'Lâcher : "La routourne va vite tourner."', outcome: { narrative: 'La phrase fait le tour d\'Internet ! Tout le monde en rit.', effects: [{ text: '+20 Moral', style: 'positive' }, { text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), coachTrust: Math.max(0, p.coachTrust - 10) }) } },
      { typeTag: 'Tacticien', text: 'Analyser les failles tactiques du match', outcome: { narrative: 'Une analyse lucide qui rassure l\'entraîneur.', effects: [{ text: '+15 Confiance', style: 'positive' }, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15), attributes: { ...p.attributes, passing: Math.min(99, p.attributes.passing + 2) } }) } },
      { typeTag: 'Fuyard', text: 'Esquiver la question et partir', outcome: { narrative: 'Vous quittez la zone mixte la tête basse.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) } }
    ]
  },
  {
    id: 'foot_12_05', category: 'MATCH', tag: 'Incident', targetPosition: 'ALL',
    description: "Près du poteau de corner, un supporter de l'équipe adverse vous hurle des insultes inacceptables.",
    options: [
      { typeTag: 'Arts Martiaux', text: 'Sauter par-dessus les panneaux avec un Kung-Fu Kick !', outcome: { narrative: 'Neuf mois de suspension... Mais un statut d\'icône rebelle pour l\'éternité.', effects: [{ text: '-50 Confiance', style: 'negative' }, { text: '+10 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 50), attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 10) } }) } },
      { typeTag: 'Provocateur', text: 'Marquer et venir célébrer nez à nez avec lui', outcome: [
        { probability: 0.6, narrative: 'La vengeance parfaite sur le terrain !', effects: [{ text: '+20 Moral', style: 'positive' }, { text: '+3 Tir', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 3) } }) },
        { probability: 0.4, narrative: 'Vous prenez un jaune pour provocation.', effects: [{ text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Zen', text: 'L\'ignorer et signaler à l\'arbitre', outcome: { narrative: 'Le supporter est expulsé par la sécurité. Vous restez concentré.', effects: [{ text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10) }) } }
    ]
  },
  {
    id: 'foot_12_06', category: 'EURO', tag: 'Désastre', targetPosition: 'ALL',
    description: "Élimination piteuse dès la phase de poules. Au micro, toute la nation attend des explications.",
    condition: (p) => true,
    options: [
      { typeTag: 'Lunaire', text: 'Demander votre partenaire en mariage en direct', outcome: { narrative: 'Un moment télévisuel surréaliste qui choque le pays.', effects: [{ text: '-30 Confiance', style: 'negative' }, { text: '+30 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 30), morale: Math.min(100, p.morale + 30) }) } },
      { typeTag: 'Émotion', text: 'Fondre en larmes', outcome: { narrative: 'Le public vous pardonne face à votre détresse sincère.', effects: [{ text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) } },
      { typeTag: 'Capitaine', text: 'Présenter des excuses officielles à la nation', outcome: { narrative: 'Une attitude digne d\'un futur leader.', effects: [{ text: '+20 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20) }) } }
    ]
  },
  {
    id: 'foot_12_07', category: 'MÉDIAS', tag: 'Jeunesse', targetPosition: 'ALL',
    description: "Un journaliste souligne que votre jeune âge pourrait être un frein dans les grands matchs.",
    condition: (p) => p.age <= 21,
    options: [
      { typeTag: 'Insolent', text: 'Lâcher : "Moi, tu m\'parles pas d\'âge. Le terrain il a pas d\'âge !"', outcome: { narrative: 'Quelle assurance ! Les médias adorent.', effects: [{ text: '+15 Moral', style: 'positive' }, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), attributes: { ...p.attributes, pace: Math.min(99, p.attributes.pace + 2) } }) } },
      { typeTag: 'Ambitieux', text: 'Se comparer aux légendes précoces (Pelé, Messi)', outcome: [
        { probability: 0.5, narrative: 'Vous assumez la comparaison avec un match XXL.', effects: [{ text: '+25 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 25) }) },
        { probability: 0.5, narrative: 'La pression est trop forte, vous ratez le match suivant.', effects: [{ text: '-15 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 15) }) }
      ] },
      { typeTag: 'Humble', text: 'Accepter de devoir encore apprendre', outcome: { narrative: 'Le coach apprécie votre humilité.', effects: [{ text: '+15 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15) }) } }
    ]
  },
  {
    id: 'foot_12_08', category: 'WORLD_CUP', tag: 'Barrage', targetPosition: 'ALL',
    description: "Match qualificatif décisif. Dans la surface, le ballon vous arrive dessus et rebondit vers votre main...",
    options: [
      { typeTag: 'Tricheur', text: 'S\'aider de la main pour contrôler et centrer', outcome: [
        { probability: 0.8, narrative: 'Passe décisive ! L\'arbitre n\'a rien vu. Tout un pays vous déteste, mais vous êtes qualifié.', effects: [{ text: '-20 Moral', style: 'negative' }, { text: '+5 Dribble', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), attributes: { ...p.attributes, dribbling: Math.min(99, p.attributes.dribbling + 5) } }) },
        { probability: 0.2, narrative: 'La VAR intervient. But refusé et carton jaune.', effects: [{ text: '-15 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15) }) }
      ] },
      { typeTag: 'Acrobate', text: 'Tenter une aile de pigeon acrobatique', outcome: [
        { probability: 0.4, narrative: 'Un geste d\'anthologie ! But exceptionnel.', effects: [{ text: '+30 Moral', style: 'positive' }, { text: '+4 Tir', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30), attributes: { ...p.attributes, finishing: Math.min(99, p.attributes.finishing + 4) } }) },
        { probability: 0.6, narrative: 'Vous vous déchirez complètement.', effects: [{ text: '-10 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 10) }) }
      ] },
      { typeTag: 'Fair-play', text: 'Enlever la main et laisser filer', outcome: { narrative: 'Occasion manquée, mais la conscience tranquille.', effects: [{ text: '+10 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10) }) } }
    ]
  },
  {
    id: 'foot_12_09', category: 'TRANSFERT', tag: 'Renouvellement', targetPosition: 'ALL',
    description: "Fin de contrat en approche avec le club parisien. Les dirigeants vous supplient de rester.",
    condition: (p) => p.club && p.club.name.toLowerCase().includes('paris'),
    options: [
      { typeTag: 'Zlatanesque', text: 'Remplacez la Tour Eiffel par ma statue, et je resterai.', outcome: { narrative: 'Une punchline monumentale ! La planète foot s\'incline.', effects: [{ text: '+40 Moral', style: 'positive' }, { text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 40), coachTrust: Math.max(0, p.coachTrust - 10) }) } },
      { typeTag: 'Cupide', text: 'Demander un salaire astronomique', outcome: [
        { probability: 0.5, narrative: 'Ils acceptent ! Jackpot.', effects: [{ text: '+200k Budget', style: 'positive' }], applyStats: (p) => ({ ...p, bankBalance: p.bankBalance + 200000 }) },
        { probability: 0.5, narrative: 'Ils refusent net.', effects: [{ text: '-20 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20) }) }
      ] },
      { typeTag: 'Respectueux', text: 'Prolonger discrètement', outcome: { narrative: 'Un choix sûr et professionnel.', effects: [{ text: '+20 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20) }) } }
    ]
  },
  {
    id: 'foot_12_10', category: 'LIFESTYLE', tag: 'Réseaux', targetPosition: 'ALL',
    description: "Soirée détente, vous lancez un direct sur Périscope avec des amis. L'ambiance chauffe.",
    options: [
      { typeTag: 'Dérapage', text: 'Traiter le coach de "fiotte" en direct', outcome: { narrative: 'Scandale absolu ! Mise à pied immédiate par le club.', effects: [{ text: '-60 Confiance', style: 'negative' }, { text: '-30 Moral', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 60), morale: Math.max(0, p.morale - 30) }) } },
      { typeTag: 'Blagueur', text: 'Faire des blagues inoffensives sur le vestiaire', outcome: [
        { probability: 0.7, narrative: 'Les fans adorent votre proximité.', effects: [{ text: '+15 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) },
        { probability: 0.3, narrative: 'Une vanne passe mal auprès du capitaine.', effects: [{ text: '-10 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 10) }) }
      ] },
      { typeTag: 'Pro', text: 'Couper le live avant que ça dérape', outcome: { narrative: 'Sage décision.', effects: [{ text: '+5 Confiance', style: 'positive' }], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5) }) } }
    ]
  },
  {
    id: 'foot_12_11', category: 'CARRIÈRE', tag: 'Mystique', targetPosition: 'ALL',
    description: "Vous enchaînez les pépins physiques. L'entourage vous suggère des méthodes peu orthodoxes...",
    options: [
      { typeTag: 'Sombre', text: 'Payer un marabout pour jeter un sort à un rival', outcome: [
        { probability: 0.3, narrative: 'Le rival se blesse ! Coïncidence ? Mais vous perdez 100 000€.', effects: [{ text: '+30 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30), bankBalance: Math.max(0, p.bankBalance - 100000) }) },
        { probability: 0.7, narrative: 'L\'affaire éclate dans la presse... Un chantage terrible commence.', effects: [{ text: '-50 Moral', style: 'negative' }, { text: '-30 Confiance', style: 'negative' }], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 50), coachTrust: Math.max(0, p.coachTrust - 30), bankBalance: Math.max(0, p.bankBalance - 100000) }) }
      ] },
      { typeTag: 'Médical', text: 'Consulter un kiné spécialisé coûteux', outcome: { narrative: 'Une approche scientifique (coût: 20 000€).', effects: [{ text: '+4 Physique', style: 'positive' }], applyStats: (p) => ({ ...p, attributes: { ...p.attributes, physical: Math.min(99, p.attributes.physical + 4) }, bankBalance: Math.max(0, p.bankBalance - 20000) }) } },
      { typeTag: 'Spirituel', text: 'Prier et attendre que ça passe', outcome: { narrative: 'La foi soulage l\'esprit.', effects: [{ text: '+10 Moral', style: 'positive' }], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 10) }) } }
    ]
  }
];
