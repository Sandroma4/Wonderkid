// extraEvents8.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_8 = [
  {
    id: 'extra_146', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le capitaine de l'équipe vous accuse ouvertement de ne pas assez défendre lors du dernier match.",
    options: [
      { typeTag: 'Guerrier', text: 'Le défier physiquement', outcome: [
        { probability: 0.3, narrative: 'Il recule. Vous prenez le dessus psychologique.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.7, narrative: 'Une bagarre éclate. Le club vous sanctionne.', effects: [{text: '-25 Moral', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-25), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Humilité', text: 'Admettre vos torts et promettre de faire mieux', outcome: [
        { probability: 0.9, narrative: 'Tension désamorcée. L\'équipe apprécie.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.1, narrative: 'Il vous prend pour un faible et continue de vous cibler.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Stats', text: 'Sortir vos statistiques de récupération de balle', outcome: { narrative: 'Les chiffres ne mentent pas. Il se tait.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_147', category: 'ENTRAÎNEMENT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Des bruits courent selon lesquels le coach actuel va être remplacé très bientôt.",
    options: [
      { typeTag: 'Leader', text: 'Aller rassurer le coach dans son bureau', outcome: [
        { probability: 0.8, narrative: 'Il est très touché par votre soutien.', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.2, narrative: 'Il est parano et pense que vous êtes hypocrite.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Opportuniste', text: 'Envoyer des messages au coach pressenti', outcome: [
        { probability: 0.4, narrative: 'Le nouveau coach arrive et vous adore déjà !', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.6, narrative: 'La presse l\'apprend. L\'actuel coach vous détruit publiquement.', effects: [{text: '-40 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-40), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Neutre', text: 'Ne se concentrer que sur le terrain', outcome: { narrative: 'La meilleure chose à faire. Vous restez pro.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_148', category: 'LIFESTYLE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un ami vous propose d'investir massivement dans une nouvelle application mobile.",
    options: [
      { typeTag: 'Business', text: 'Investir beaucoup d\'argent', outcome: [
        { probability: 0.2, narrative: 'L\'application fait un carton mondial ! Jackpot !', effects: [{text: '+500k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+500000, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.8, narrative: 'C\'était une arnaque. Vous perdez tout.', effects: [{text: '-100k €', style: 'negative'}, {text: '-25 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Image', text: 'Offrir votre image plutôt que de l\'argent', outcome: [
        { probability: 0.6, narrative: 'L\'application décolle doucement, vous touchez des royalties.', effects: [{text: '+20k €', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+20000}) },
        { probability: 0.4, narrative: 'L\'appli a des bugs et votre image en pâtit légèrement.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Prudent', text: 'Refuser poliment', outcome: { narrative: 'Pas de risque inutile.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_149', category: 'TRANSFERT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Les négociations de prolongation de contrat patinent, et le club vous met un ultimatum.",
    options: [
      { typeTag: 'Bluff', text: 'Poser un ultimatum en retour avec des offres imaginaires', outcome: [
        { probability: 0.4, narrative: 'Le club panique et vous donne ce que vous voulez !', effects: [{text: '+100k €', style: 'positive'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.6, narrative: 'Le club rompt les négociations. Vous êtes mis sur la liste des transferts.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Docile', text: 'Accepter l\'offre du club', outcome: [
        { probability: 0.9, narrative: 'Vous signez. Fin du stress, mais salaire moyen.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.1, narrative: 'Votre agent vous lâche, dégoûté.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Patience', text: 'Repousser les négociations à la fin de la saison', outcome: { narrative: 'Quitte ou double, vous devez prouver sur le terrain.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_150', category: 'CARRIÈRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un spécialiste annonce que vos genoux sont fragiles et qu'il faut changer de style de course.",
    options: [
      { typeTag: 'Travail', text: 'Suivre une rééducation spécifique de 3 mois', outcome: [
        { probability: 0.8, narrative: 'C\'est dur, mais vos genoux sont comme neufs !', effects: [{text: '+20 Forme', style: 'positive'}, {text: '-10k €', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+20), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) },
        { probability: 0.2, narrative: 'La rééducation échoue, la douleur persiste.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Déni', text: 'Ne rien changer et continuer', outcome: [
        { probability: 0.3, narrative: 'Miracle génétique, vous tenez bon.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.7, narrative: 'Catastrophe. Entorse grave au prochain match.', effects: [{text: '-40 Forme', style: 'negative'}, {text: '-30 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-40), morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Adaptation', text: 'Jouer plus bas sur le terrain pour moins courir', outcome: { narrative: 'Choix tactique payant, vous économisez votre corps.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) } }
    ]
  },
  {
    id: 'extra_151', category: 'MÉDIAS', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une photo truquée de vous portant le maillot d'un club rival circule sur les réseaux sociaux.",
    options: [
      { typeTag: 'Humour', text: 'Poster une autre photo truquée de vous en astronaute', outcome: [
        { probability: 0.7, narrative: 'Excellent ! Les fans adorent l\'auto-dérision.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.3, narrative: 'Le club trouve que vous prenez ça trop à la légère.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Rage', text: 'Menacer de procès tous ceux qui la partagent', outcome: [
        { probability: 0.4, narrative: 'La peur fonctionne, la photo disparaît.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.6, narrative: 'L\'effet Streisand. La photo devient un meme viral mondial.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Preuve', text: 'Montrer la photo originale', outcome: { narrative: 'Simple, clair, efficace.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_152', category: 'VESTIAIRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un coéquipier flirte ouvertement avec un membre de votre famille lors d'un repas du club.",
    options: [
      { typeTag: 'Frère', text: 'Le recadrer violemment', outcome: [
        { probability: 0.5, narrative: 'Il s\'excuse. Vous marquez votre territoire.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.5, narrative: 'Gros clash. Le repas est ruiné. Le coach est furieux.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Cupidon', text: 'Les laisser faire, ils sont mignons', outcome: [
        { probability: 0.7, narrative: 'Ils se mettent en couple. Super ambiance !', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.3, narrative: 'La relation se termine mal, ça casse l\'ambiance du vestiaire.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Discret', text: 'Demander à votre proche de rentrer à la maison', outcome: { narrative: 'Vous évitez le drame sans faire de bruit.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_153', category: 'LIFESTYLE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes pris à partie par des supporters mécontents alors que vous faites vos courses.",
    options: [
      { typeTag: 'Calme', text: 'Discuter avec eux calmement', outcome: [
        { probability: 0.6, narrative: 'Ils se calment et demandent des selfies !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.4, narrative: 'Ils vous insultent encore plus. Vous fuyez.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Rage', text: 'Leur jeter vos courses à la figure', outcome: [
        { probability: 0.1, narrative: 'Ils s\'enfuient, choqués.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) },
        { probability: 0.9, narrative: 'La vidéo fait scandale. Enquête et amende.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20k €', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }
      ] },
      { typeTag: 'Fuite', text: 'Partir sans un mot avec la sécurité', outcome: { narrative: 'C\'est triste, mais c\'est la vie publique.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_154', category: 'ENTRAÎNEMENT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un nouveau préparateur physique arrive avec des méthodes militaires extrêmes.",
    options: [
      { typeTag: 'Machine', text: 'S\'investir à 200% dans ses séances', outcome: [
        { probability: 0.4, narrative: 'Vous devenez une machine de guerre physiquement.', effects: [{text: '+30 Forme', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+30), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.6, narrative: 'Épuisement total. Vous tombez malade de fatigue.', effects: [{text: '-30 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Syndicat', text: 'Aller voir le coach pour s\'en plaindre', outcome: [
        { probability: 0.7, narrative: 'Le coach intervient et calme le préparateur.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.3, narrative: 'Le coach vous dit que vous êtes trop douillet.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Tricheur', text: 'Faire semblant d\'avoir mal pour esquiver', outcome: { narrative: 'Vous vous reposez, mais perdez un peu le respect du staff.', effects: [{text: '+10 Forme', style: 'positive'}, {text: '-10 Confiance', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+10), coachTrust: Math.max(0, p.coachTrust-10)}) } }
    ]
  },
  {
    id: 'extra_155', category: 'CARRIÈRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Votre ancien club réclame publiquement de l'argent sur votre dernier transfert via une clause obscure.",
    options: [
      { typeTag: 'Guerre', text: 'Les attaquer en diffamation', outcome: [
        { probability: 0.3, narrative: 'Ils s\'excusent et retirent la plainte.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.7, narrative: 'Le procès s\'enlise, ça pollue votre esprit pendant des mois.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10k €', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Paiement', text: 'Payer de votre poche pour clore le dossier', outcome: [
        { probability: 0.9, narrative: 'L\'affaire est classée, esprit libre.', effects: [{text: '-50k €', style: 'negative'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), form: Math.min(100, p.form+10)}) },
        { probability: 0.1, narrative: 'Ils demandent encore plus d\'argent ensuite !', effects: [{text: '-50k €', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Laisser les avocats de votre club actuel gérer', outcome: { narrative: 'C\'est lent, mais ça vous préserve.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_156', category: 'MÉDIAS', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un membre éloigné de votre famille vend une fausse interview vous concernant à un tabloïd.",
    options: [
      { typeTag: 'Clash', text: 'Le démentir sur toutes les chaînes', outcome: [
        { probability: 0.4, narrative: 'Vous détruisez sa crédibilité. Victoire nette.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.6, narrative: 'Le tabloïd sort d\'autres rumeurs pour se venger.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Pardon', text: 'Lui pardonner publiquement, disant qu\'il a besoin d\'argent', outcome: [
        { probability: 0.8, narrative: 'Coup de maître en RP, vous passez pour un saint.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.2, narrative: 'Il prend ça pour une insulte et en remet une couche.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Silence', text: 'Couper les ponts et ignorer', outcome: { narrative: 'Vous faites le tri dans votre entourage.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_157', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une équipe nationale étrangère découvre que vous avez des origines chez eux et veut vous naturaliser.",
    options: [
      { typeTag: 'Oui', text: 'Accepter avec enthousiasme', outcome: [
        { probability: 0.5, narrative: 'Vous devenez la star de cette sélection !', effects: [{text: '+30 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.5, narrative: 'Les supporters de votre pays natal vous traitent de traître.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Non', text: 'Refuser pour attendre votre pays de cœur', outcome: [
        { probability: 0.8, narrative: 'Votre patriotisme est récompensé par une convocation !', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+15)}) },
        { probability: 0.2, narrative: 'L\'appel ne vient jamais. Grand regret.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Attente', text: 'Laisser planer le doute', outcome: { narrative: 'Garder toutes les portes ouvertes.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_158', category: 'VESTIAIRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur absurde dit que vous portez chance à l'équipe uniquement quand vous mangez une pizza la veille de match.",
    options: [
      { typeTag: 'Pizza', text: 'Jouer le jeu et en manger à chaque fois', outcome: [
        { probability: 0.4, narrative: 'Super ambiance et série de victoires !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.6, narrative: 'Vous prenez du poids, le diététicien du club hurle.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser net et manger vos pâtes blanches', outcome: [
        { probability: 0.7, narrative: 'Vous gagnez quand même, fin de la rumeur.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+10)}) },
        { probability: 0.3, narrative: 'Défaite. On vous accuse d\'avoir cassé le sort.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Malin', text: 'Commander une pizza "light" sur mesure', outcome: { narrative: 'Illusion parfaite, tout le monde est content.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_159', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous organisez un tournoi caritatif de jeux vidéo, mais les serveurs plantent lamentablement.",
    options: [
      { typeTag: 'Colère', text: 'Insulter publiquement les développeurs du jeu', outcome: [
        { probability: 0.2, narrative: 'Les gamers vous soutiennent à fond !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.8, narrative: 'Bad buzz, l\'éditeur du jeu porte plainte.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10k €', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-20), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Poche', text: 'Faire un gros don personnel pour compenser', outcome: [
        { probability: 0.9, narrative: 'Geste magnifique, l\'association est ravie.', effects: [{text: '-30k €', style: 'negative'}, {text: '+25 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-30000), morale: Math.min(100, p.morale+25)}) },
        { probability: 0.1, narrative: 'Ça passe inaperçu.', effects: [{text: '-30k €', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-30000)}) }
      ] },
      { typeTag: 'Blague', text: 'Finir le tournoi sur des jeux de société en live', outcome: { narrative: 'Moment très drôle et authentique.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_160', category: 'ENTRAÎNEMENT', tag: 'Tension', targetPosition: '!GK', condition: () => true,
    description: "Le gardien de but est furieux parce que vous lui marquez toujours des lucarnes à l'entraînement et l'humiliez.",
    options: [
      { typeTag: 'Macho', text: 'Lui dire d\'être meilleur', outcome: [
        { probability: 0.3, narrative: 'Il bosse dur et l\'équipe encaisse moins de buts.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.7, narrative: 'Il vous tacle sévèrement par vengeance.', effects: [{text: '-20 Forme', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-20), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Pote', text: 'Lui proposer de faire des séances spécifiques ensemble', outcome: [
        { probability: 0.8, narrative: 'Vous progressez tous les deux. Belle cohésion.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15), form: Math.min(100, p.form+10)}) },
        { probability: 0.2, narrative: 'Surentraînement, vous êtes tous les deux fatigués.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Pitié', text: 'Tirer exprès moins fort', outcome: { narrative: 'Il s\'en rend compte et est encore plus vexé.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_161', category: 'CARRIÈRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur insistante affirme que vous allez prendre votre retraite en fin de saison pour devenir acteur.",
    options: [
      { typeTag: 'Mystère', text: 'Laisser planer le doute en interview', outcome: [
        { probability: 0.5, narrative: 'Les sponsors adorent ce buzz.', effects: [{text: '+20k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+20000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.5, narrative: 'Le club croit que vous lâchez prise.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Rassurant', text: 'Prolonger votre contrat d\'un an pour démentir', outcome: [
        { probability: 0.9, narrative: 'Engagement total, le public est ravi.', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.1, narrative: 'Vous le regrettez ensuite.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Blague', text: 'Arriver à l\'entraînement déguisé', outcome: { narrative: 'Une bonne rigolade.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_162', category: 'MÉDIAS', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous avez été surpris en train de manger un fast-food 2 heures avant un match.",
    options: [
      { typeTag: 'Assumer', text: 'Dire que "c\'est mon carburant secret"', outcome: [
        { probability: 0.4, narrative: 'Vous marquez un triplé, la légende est née !', effects: [{text: '+30 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.6, narrative: 'Vous vomissez sur le terrain.', effects: [{text: '-30 Forme', style: 'negative'}, {text: '-40 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-30), morale: Math.max(0, p.morale-40)}) }
      ] },
      { typeTag: 'Pardon', text: 'Payer une amende et promettre une diète', outcome: [
        { probability: 0.8, narrative: 'Incident pardonné.', effects: [{text: '-5k €', style: 'negative'}, {text: '+10 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), form: Math.min(100, p.form+10)}) },
        { probability: 0.2, narrative: 'Le coach vous met quand même sur le banc.', effects: [{text: '-15 Confiance', style: 'negative'}, {text: '-5k €', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) }
      ] },
      { typeTag: 'Mensonge', text: 'Dire que c\'était pour un ami', outcome: { narrative: 'Personne n\'y croit, mais ça évite l\'amende.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) } }
    ]
  },
  {
    id: 'extra_163', category: 'VESTIAIRE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le coach désigne un jeune joueur comme tireur de pénalty à votre place.",
    options: [
      { typeTag: 'Clash', text: 'Prendre le ballon de force lors du prochain pénalty', outcome: [
        { probability: 0.2, narrative: 'Vous marquez. Le coach ravale sa fierté.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.8, narrative: 'Vous le ratez. Humiliation mondiale et mise à pied.', effects: [{text: '-40 Moral', style: 'negative'}, {text: '-30 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-40), coachTrust: Math.max(0, p.coachTrust-30)}) }
      ] },
      { typeTag: 'Soutien', text: 'Soutenir le jeune publiquement', outcome: [
        { probability: 0.9, narrative: 'Grand seigneur. Le coach est impressionné.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.1, narrative: 'Le jeune rate et vous blâme de l\'avoir stressé.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Discussion', text: 'Demander un concours de pénaltys à l\'entraînement', outcome: { narrative: 'Vous gagnez à la loyale et reprenez votre statut.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_164', category: 'TRANSFERT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Votre agent a été vu en train de dîner avec le président d'un club rival.",
    options: [
      { typeTag: 'Pression', text: 'Lui demander de trouver une offre ferme', outcome: [
        { probability: 0.4, narrative: 'Offre énorme reçue ! Votre salaire actuel est doublé.', effects: [{text: '+50k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.6, narrative: 'Aucune offre. Votre club actuel se sent trahi.', effects: [{text: '-25 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Fidélité', text: 'Renvoyer publiquement cet agent', outcome: [
        { probability: 0.8, narrative: 'Les ultras vous érigent une statue.', effects: [{text: '+25 Moral', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+25), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.2, narrative: 'C\'était juste un dîner d\'amis. Vous perdez un bon agent.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Déni', text: 'Dire que c\'était pour un autre joueur', outcome: { narrative: 'Classique mais efficace.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_165', category: 'LIFESTYLE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "On vous propose d'apparaître dans un clip de rap très populaire.",
    options: [
      { typeTag: 'Star', text: 'Accepter et faire une chorégraphie', outcome: [
        { probability: 0.6, narrative: 'La danse devient culte sur TikTok.', effects: [{text: '+20 Moral', style: 'positive'}, {text: '+10k €', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20), bankBalance: (p.bankBalance||0)+10000}) },
        { probability: 0.4, narrative: 'Le rappeur est accusé d\'un crime le lendemain. Mauvaise association.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Discret', text: 'Accepter mais juste un petit caméo en fond', outcome: [
        { probability: 0.9, narrative: 'Stylé et sans risque.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.1, narrative: 'On vous coupe au montage.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser poliment', outcome: { narrative: 'Focus sur le foot.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_166', category: 'ENTRAÎNEMENT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous cassez accidentellement un trophée historique du club lors d'un jeu de ballon dans les couloirs.",
    options: [
      { typeTag: 'Assumer', text: 'Aller tout dire au président', outcome: [
        { probability: 0.4, narrative: 'Il est compréhensif et fait réparer en secret.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.6, narrative: 'Fureur totale. Amende énorme.', effects: [{text: '-50k €', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Cache-cache', text: 'Recoller les morceaux avec de la superglue', outcome: [
        { probability: 0.2, narrative: 'Ni vu ni connu !', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.8, narrative: 'Le trophée tombe en morceaux lors d\'une présentation officielle.', effects: [{text: '-40 Moral', style: 'negative'}, {text: '-30 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-40), coachTrust: Math.max(0, p.coachTrust-30)}) }
      ] },
      { typeTag: 'Payer', text: 'Faire venir un orfèvre en urgence à vos frais', outcome: { narrative: 'Cher, mais le secret est gardé.', effects: [{text: '-15k €', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-15000)}) } }
    ]
  },
  {
    id: 'extra_167', category: 'CARRIÈRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous souffrez d'insomnies chroniques à cause de la pression des résultats.",
    options: [
      { typeTag: 'Somnifères', text: 'Prendre des cachets puissants', outcome: [
        { probability: 0.3, narrative: 'Vous dormez bien et jouez bien.', effects: [{text: '+15 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+15)}) },
        { probability: 0.7, narrative: 'Vous êtes somnolent à l\'entraînement.', effects: [{text: '-25 Forme', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-25), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Psy', text: 'Engager un psychologue du sport', outcome: [
        { probability: 0.9, narrative: 'Excellent investissement. Mental d\'acier.', effects: [{text: '+25 Moral', style: 'positive'}, {text: '-5k €', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+25), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) },
        { probability: 0.1, narrative: 'La thérapie bloque et vous stressez encore plus.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Yoga', text: 'Faire de la méditation', outcome: { narrative: 'Naturel et efficace.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_168', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Une équipe de télévision fait un reportage à charge sur votre hygiène de vie.",
    options: [
      { typeTag: 'Droit de réponse', text: 'Faire une vidéo de 20 minutes pour démonter leurs arguments', outcome: [
        { probability: 0.6, narrative: 'Arguments solides, vous détruisez le reportage.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.4, narrative: 'Vous paraissez sur la défensive et coupable.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Procès', text: 'Laisser vos avocats faire interdire la diffusion', outcome: [
        { probability: 0.5, narrative: 'Reportage annulé.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '-10k €', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10), bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) },
        { probability: 0.5, narrative: 'Effet pervers : tout le monde se demande ce que vous cachez.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Ironie', text: 'Manger un burger pendant une interview post-match', outcome: { narrative: 'Masterclass de communication par le troll.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_169', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "La montre de luxe d'un coéquipier a disparu dans les vestiaires. L'ambiance est toxique.",
    options: [
      { typeTag: 'Enquête', text: 'Mener l\'enquête vous-même', outcome: [
        { probability: 0.3, narrative: 'Vous la retrouvez ! Héros du vestiaire.', effects: [{text: '+25 Moral', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+25), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.7, narrative: 'Vous accusez à tort un joueur. Fracture de l\'équipe.', effects: [{text: '-30 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Générosité', text: 'Se cotiser pour lui en acheter une autre', outcome: [
        { probability: 0.9, narrative: 'Beau geste, le groupe reste soudé.', effects: [{text: '-5k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), morale: Math.min(100, p.morale+10)}) },
        { probability: 0.1, narrative: 'Il refuse la charité et l\'ambiance reste pourrie.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Neutre', text: 'Laisser le club gérer avec la police', outcome: { narrative: 'Long mais professionnel.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_170', category: 'TRANSFERT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Une fuite révèle le montant colossal de votre futur potentiel transfert, choquant les supporters.",
    options: [
      { typeTag: 'Honnêteté', text: 'Dire : "C\'est le marché, je mérite cet argent"', outcome: [
        { probability: 0.2, narrative: 'Certains apprécient votre franchise.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.8, narrative: 'Tollé général. Vous êtes le symbole du foot-business.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-30), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Charité', text: 'Promettre de reverser une partie à une association', outcome: [
        { probability: 0.9, narrative: 'Parfaite parade, vous passez pour un grand cœur.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.1, narrative: 'C\'est vu comme de la démagogie pure.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne pas commenter les chiffres', outcome: { narrative: 'Laisser passer l\'orage médiatique.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  }
];
