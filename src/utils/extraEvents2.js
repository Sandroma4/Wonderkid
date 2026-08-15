// extraEvents2.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_2 = [
  {
    id: 'extra_37', category: 'LIFESTYLE', tag: 'Casino', targetPosition: 'ALL', condition: (p) => p.bankBalance > 100000,
    description: "Vous êtes invité à une soirée poker très privée avec des célébrités et des mises énormes.",
    options: [
      { typeTag: 'Flambeur', text: 'Jouer le jeu et miser gros', outcome: [
        { probability: 0.3, narrative: 'Vous ravez la mise ! Quelle soirée !', effects: [{text: '+50k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.7, narrative: 'Vous perdez beaucoup d\'argent et rentrez frustré.', effects: [{text: '-50k €', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Prudent', text: 'Y aller mais juste pour observer et discuter', outcome: [
        { probability: 0.8, narrative: 'Vous réseautez intelligemment sans prendre de risque.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.2, narrative: 'Les autres vous trouvent ennuyeux et vous snobent.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Refus', text: 'Rester chez soi', outcome: { narrative: 'Une soirée reposante.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_38', category: 'LIFESTYLE', tag: 'Détente', targetPosition: 'ALL', condition: () => true,
    description: "Un ami vous propose un week-end dans une station de ski très chic pendant une courte trêve.",
    options: [
      { typeTag: 'Extrême', text: 'Faire du hors-piste', outcome: [
        { probability: 0.2, narrative: 'Des sensations incroyables, vous êtes revigoré !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.8, narrative: 'Vous vous faites une entorse. Le coach va hurler.', effects: [{text: '-30 Forme', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-30), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Spa', text: 'Profiter uniquement du spa et des massages', outcome: [
        { probability: 0.9, narrative: 'Vous revenez frais et dispo.', effects: [{text: '+15 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+15)}) },
        { probability: 0.1, narrative: 'Vous attrapez froid dans les bains.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser pour s\'entraîner en solo', outcome: { narrative: 'Sérieux exemplaire.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_39', category: 'CARRIÈRE', tag: 'Prolongation', targetPosition: 'ALL', condition: (p) => p.ovr > 80,
    description: "Le club veut vous prolonger, mais propose un salaire bien inférieur à votre valeur.",
    options: [
      { typeTag: 'Guerre', text: 'Menacer de partir libre à la fin de la saison', outcome: [
        { probability: 0.4, narrative: 'Ils paniquent et doublent l\'offre !', effects: [{text: '+100k €', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000}) },
        { probability: 0.6, narrative: 'Ils se braquent et vous mettent en tribune.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Doux', text: 'Accepter pour l\'amour du maillot', outcome: [
        { probability: 0.9, narrative: 'Les supporters vous vénèrent.', effects: [{text: '+25 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+25), coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.1, narrative: 'Votre agent, dégoûté, vous lâche.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Négocier', text: 'Demander des primes de performance à la place', outcome: { narrative: 'Un bon compromis qui motive.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_40', category: 'CARRIÈRE', tag: 'Départ', targetPosition: 'ALL', condition: (p) => p.coachTrust < 40,
    description: "Le coach ne vous fait plus confiance. Un club exotique vous propose un pont d'or pour partir dès maintenant.",
    options: [
      { typeTag: 'Exil', text: 'Accepter l\'offre et l\'argent', outcome: [
        { probability: 0.8, narrative: 'Vous partez gagner des millions sous le soleil.', effects: [{text: '+500k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+500000, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.2, narrative: 'Le transfert capote à la visite médicale, retour humiliant.', effects: [{text: '-30 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Bataille', text: 'Refuser et promettre de regagner votre place', outcome: [
        { probability: 0.6, narrative: 'Votre mentalité de guerrier impressionne le coach.', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), form: Math.min(100, p.form+10)}) },
        { probability: 0.4, narrative: 'Le coach s\'en fiche. Vous restez sur le banc.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Prêt', text: 'Demander un prêt pour avoir du temps de jeu', outcome: { narrative: 'Une solution d\'attente raisonnable.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_41', category: 'ENTRAÎNEMENT', tag: 'Tactique', targetPosition: 'ALL', condition: () => true,
    description: "L'équipe souffre défensivement. L'entraîneur vous demande de changer votre style de jeu pour plus de couverture.",
    options: [
      { typeTag: 'Adaptable', text: 'Appliquer les consignes à la lettre', outcome: [
        { probability: p => (p.attributes?.defense || 50) + (p.attributes?.passing || 50), narrative: 'L\'équipe gagne en solidité. Vous êtes le héros de l\'ombre.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: p => 200 - ((p.attributes?.defense || 50) + (p.attributes?.passing || 50)), narrative: 'Vous êtes frustré par ce rôle ingrat.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Rebelle', text: 'Ignorer et jouer l\'attaque', outcome: [
        { probability: p => p.attributes?.finishing || 50, narrative: 'Vous marquez un doublé. Le coach ne peut rien dire.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: p => 100 - (p.attributes?.finishing || 50), narrative: 'Votre côté prend l\'eau. Colère du coach.', effects: [{text: '-25 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Compromis', text: 'Défendre mais monter sur les contres', outcome: { narrative: 'Épuisant, mais très complet.', effects: [{text: '-10 Forme', style: 'negative'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.max(0, p.form-10), coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_42', category: 'ENTRAÎNEMENT', tag: 'Jeunes', targetPosition: 'ALL', condition: (p) => p.age >= 25,
    description: "Un jeune très prometteur de l'académie vient d'intégrer l'équipe première et joue à votre poste.",
    options: [
      { typeTag: 'Mentor', text: 'Le prendre sous votre aile', outcome: [
        { probability: 0.8, narrative: 'Il vous respecte et l\'équipe en bénéficie.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15), coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.2, narrative: 'Il devient trop bon et menace votre place.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Rival', text: 'Lui mener la vie dure', outcome: [
        { probability: 0.4, narrative: 'La concurrence vous transcende tous les deux.', effects: [{text: '+15 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+15)}) },
        { probability: 0.6, narrative: 'L\'ambiance devient toxique. Le coach vous le reproche.', effects: [{text: '-20 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Indifférent', text: 'Ne pas s\'occuper de lui', outcome: { narrative: 'Vous faites votre travail sans émotion.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_43', category: 'LIFESTYLE', tag: 'Média', targetPosition: 'ALL', condition: () => true,
    description: "Un youtubeur célèbre vous met au défi de faire un crossbar challenge avec lui.",
    options: [
      { typeTag: 'Show', text: 'Accepter le défi avec classe', outcome: [
        { probability: 0.6, narrative: 'Vous gagnez, la vidéo fait 10 millions de vues !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.4, narrative: 'Vous ratez tous vos tirs. Honte sur internet.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Business', text: 'Accepter contre rémunération', outcome: [
        { probability: 0.8, narrative: 'Il accepte de payer.', effects: [{text: '+15k €', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+15000}) },
        { probability: 0.2, narrative: 'Il fait une vidéo pour dire que vous êtes cupide.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Refus', text: 'Décliner poliment', outcome: { narrative: 'Focus terrain.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_44', category: 'LIFESTYLE', tag: 'Fans', targetPosition: 'ALL', condition: () => true,
    description: "Des supporters attendent sous la pluie après l'entraînement.",
    options: [
      { typeTag: 'Généreux', text: 'Rester 1h pour signer tous les autographes', outcome: [
        { probability: 0.7, narrative: 'Les fans vous idolâtrent.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.3, narrative: 'Vous attrapez froid sous la pluie.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Express', text: 'Signer 2-3 maillots et partir', outcome: [
        { probability: 0.9, narrative: 'Un bon compromis.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) },
        { probability: 0.1, narrative: 'Ceux qui n\'ont rien eu vous sifflent.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Fantôme', text: 'Sortir par la porte de derrière', outcome: { narrative: 'Pas de temps à perdre.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_45', category: 'LIFESTYLE', tag: 'Look', targetPosition: 'ALL', condition: () => true,
    description: "Votre coiffeur vous propose une coupe de cheveux excentrique (couleurs flashy).",
    options: [
      { typeTag: 'Audace', text: 'Dire oui pour le style !', outcome: [
        { probability: 0.5, narrative: 'Les jeunes adorent, vous lancez une mode !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.5, narrative: 'Le coach déteste et pense que vous n\'êtes pas sérieux.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Classique', text: 'Demander une coupe standard', outcome: [
        { probability: 0.9, narrative: 'Vous restez élégant et sobre.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) },
        { probability: 0.1, narrative: 'C\'est un peu terne.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Buzz', text: 'Se raser la tête entièrement', outcome: { narrative: 'Nouveau look, nouveau vous.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  }
];
