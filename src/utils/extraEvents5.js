// extraEvents5.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_5 = [
  {
    id: 'extra_71', category: 'ENTRAÎNEMENT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous vous réveillez avec un torticolis très douloureux le matin d'une grosse séance tactique.",
    options: [
      { typeTag: 'Guerrier', text: 'Prendre des anti-douleurs et y aller', outcome: [
        { probability: 0.5, narrative: 'L\'effet cache la douleur, vous faites une bonne séance.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.5, narrative: 'Vous aggravez le problème en forçant. Arrêt de 3 jours.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Prudent', text: 'Rester aux soins', outcome: [
        { probability: 0.9, narrative: 'Le torticolis passe vite, mais vous ratez la tactique.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le coach estime que vous êtes "douillet".', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Stratège', text: 'Assister à la séance depuis le banc', outcome: { narrative: 'Vous ne courez pas mais mémorisez la tactique.', effects: [{text: '+2 Confiance', style: 'positive'}, {text: '+2 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+2), form: Math.min(100, p.form+2)}) } }
    ]
  },
  {
    id: 'extra_72', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "La visite médicale pour un éventuel transfert révèle une légère anomalie cardiaque de naissance.",
    options: [
      { typeTag: 'Panique', text: 'Annuler les négociations et voir un spécialiste en urgence', outcome: [
        { probability: 0.8, narrative: 'C\'est bénin, mais le transfert capote.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }, 
        { probability: 0.2, narrative: 'Fausse alerte due au stress, un club vous recrute quand même.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }
      ] },
      { typeTag: 'Force', text: 'Refuser les examens complémentaires et exiger la signature', outcome: [
        { probability: 0.3, narrative: 'Le club cède par peur de vous perdre.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.7, narrative: 'C\'est un red flag. Les clubs fuient.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Calme', text: 'Laisser votre médecin personnel communiquer avec eux', outcome: { narrative: 'Les médecins se mettent d\'accord : aucun risque.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_73', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Le club organise une soirée caritative. Le joueur qui lèvera le plus de fonds sera mis en avant.",
    options: [
      { typeTag: 'Généreux', text: 'Faire un don massif de votre poche', outcome: [
        { probability: 0.8, narrative: 'La presse adore, le club est ravi.', effects: [{text: '-50k €', style: 'negative'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.2, narrative: 'Certains coéquipiers vous traitent de "m\'as-tu-vu".', effects: [{text: '-50k €', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Réseau', text: 'Faire jouer vos contacts pour lever des fonds', outcome: [
        { probability: 0.6, narrative: 'Superbe réussite collective.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.4, narrative: 'Vos contacts ne répondent pas. Un peu gênant.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Discret', text: 'Faire un petit don anonyme', outcome: { narrative: 'Vous participez sans attirer l\'attention.', effects: [{text: '-5k €', style: 'negative'}, {text: '+2 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), morale: Math.min(100, p.morale+2)}) } }
    ]
  },
  {
    id: 'extra_74', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: '!GK', condition: () => true,
    description: "Le gardien de l'équipe a besoin d'aide pour tirer des penaltys à l'entraînement après la séance.",
    options: [
      { typeTag: 'Leader', text: 'Rester une heure de plus pour tirer', outcome: [
        { probability: 0.7, narrative: 'Le gardien est super reconnaissant. Lien fort créé.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.max(0, p.form-5)}) }, 
        { probability: 0.3, narrative: 'Vous forcez trop et ressentez une pointe musculaire.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser pour prioriser la récupération', outcome: [
        { probability: 0.8, narrative: 'Vous rentrez vous reposer sagement.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'Le gardien vous trouve très personnel.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Compromis', text: 'Tirer 5 penaltys et rentrer', outcome: { narrative: 'Un bon geste sans excès.', effects: [{text: '+2 Confiance', style: 'positive'}, {text: '-1 Forme', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+2), form: Math.max(0, p.form-1)}) } }
    ]
  },
  {
    id: 'extra_75', category: 'CARRIÈRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un membre de votre famille ouvre un restaurant et veut utiliser votre image gratuitement pour la promo.",
    options: [
      { typeTag: 'Ami', text: 'Accepter à 100%', outcome: [
        { probability: 0.6, narrative: 'Le resto fait le plein, la famille est heureuse !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.4, narrative: 'Le resto fait un bad buzz pour intoxication. Votre image en pâtit.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Business', text: 'Exiger un contrat officiel', outcome: [
        { probability: 0.8, narrative: 'Ambiance glaciale mais business protégé.', effects: [{text: '-10 Moral', style: 'negative'}, {text: '+10k €', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.max(0, p.morale-10), bankBalance: (p.bankBalance||0)+10000}) }, 
        { probability: 0.2, narrative: 'La famille comprend et accepte avec professionnalisme.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }
      ] },
      { typeTag: 'Équilibre', text: 'Faire une seule story Instagram sans engagement', outcome: { narrative: 'Un petit coup de pouce qui fait plaisir, sans risque légal.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_76', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Une émission sportive vous désigne comme 'le problème tactique' de l'équipe.",
    options: [
      { typeTag: 'Clash', text: 'Répondre sèchement sur Twitter', outcome: [
        { probability: 0.3, narrative: 'Les fans vous soutiennent, belle répartie !', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.7, narrative: 'La direction déteste qu\'on réponde à chaud.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Docile', text: 'Ignorer la critique', outcome: [
        { probability: 0.8, narrative: 'L\'orage passe sans dégâts.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.2, narrative: 'Votre silence est interprété comme un aveu de faiblesse.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Terrain', text: 'Poster une vidéo de vous à l\'entraînement intense', outcome: { narrative: 'La meilleure réponse se fait sur le terrain.', effects: [{text: '+10 Forme', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10), coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_77', category: 'MÉDIAS', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une maison d'édition veut écrire votre biographie anticipée.",
    options: [
      { typeTag: 'Argent', text: 'Vendre les droits pour un gros chèque', outcome: [
        { probability: 0.8, narrative: 'Le livre sort, l\'avance est belle.', effects: [{text: '+150k €', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: (p.bankBalance||0)+150000}) }, 
        { probability: 0.2, narrative: 'Le livre est truffé d\'erreurs qui font scandale.', effects: [{text: '+150k €', style: 'positive'}, {text: '-20 Moral', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: (p.bankBalance||0)+150000, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Humble', text: 'Refuser, il est trop tôt pour ça', outcome: [
        { probability: 0.9, narrative: 'Vous restez focalisé sur le football.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.1, narrative: 'L\'éditeur sort quand même un livre "non officiel" blessant.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Contrôle', text: 'Accepter uniquement d\'écrire un livre pour enfants sur le foot', outcome: { narrative: 'Belle image, pas de polémique.', effects: [{text: '+20k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: (p.bankBalance||0)+20000, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_78', category: 'MÉDIAS', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes invité sur le plateau d'une célèbre émission de fin de soirée.",
    options: [
      { typeTag: 'Showman', text: 'Faire le show, blaguer et danser', outcome: [
        { probability: 0.6, narrative: 'Vous devenez la coqueluche du pays !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.4, narrative: 'Une blague passe très mal, malaise en direct.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Pro', text: 'Décliner pour vous reposer', outcome: [
        { probability: 0.8, narrative: 'Bonne nuit de sommeil.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.2, narrative: 'La télé vous boycotte désormais.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Prudent', text: 'Participer mais rester ultra consensuel', outcome: { narrative: 'Un passage sans vague, vous assurez le minimum.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_79', category: 'TRANSFERT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une folle rumeur vous envoie en Arabie Saoudite pour un contrat mirobolant.",
    options: [
      { typeTag: 'Mystère', text: 'Ne rien démentir pour voir', outcome: [
        { probability: 0.5, narrative: 'Le club s\'affole et veut vous prolonger.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.5, narrative: 'Les supporters brûlent votre maillot devant le stade.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Fidèle', text: 'Affirmer que l\'argent ne vous intéresse pas', outcome: [
        { probability: 0.9, narrative: 'Standing ovation au prochain match.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.1, narrative: 'Votre agent fulmine de cette perte de levier.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Blague', text: 'Répondre avec un GIF humoristique', outcome: { narrative: 'Tout le monde comprend que c\'est faux.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_80', category: 'LIFESTYLE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "La presse à scandale affirme que vous avez une liaison avec une célébrité.",
    options: [
      { typeTag: 'Clash', text: 'Attaquer en diffamation', outcome: [
        { probability: 0.7, narrative: 'Démenti officiel gagné, la rumeur s\'arrête.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.3, narrative: 'La procédure s\'enlise et on ne parle que de ça.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Silence', text: 'Ignorer totalement', outcome: [
        { probability: 0.8, narrative: 'La rumeur meurt d\'elle-même.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'Des paparazzi campent devant chez vous.', effects: [{text: '-10 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Surfeur', text: 'En jouer et faire semblant en public', outcome: { narrative: 'Un coup de comm risqué mais qui fait exploser vos followers.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-5 Confiance', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15), coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_81', category: 'ENTRAÎNEMENT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes surpris en train d'arriver en retard à l'entraînement, pour la troisième fois.",
    options: [
      { typeTag: 'Excuse', text: 'Inventer un mensonge élaboré', outcome: [
        { probability: 0.4, narrative: 'Le coach vous croit (miracle).', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.6, narrative: 'Le mensonge est découvert. Sanction exemplaire.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-50k €', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), bankBalance: Math.max(0, (p.bankBalance||0)-50000)}) }
      ] },
      { typeTag: 'Faute', text: 'Assumer et payer l\'amende sans discuter', outcome: [
        { probability: 0.9, narrative: 'L\'honnêteté limite la casse.', effects: [{text: '-10k €', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), coachTrust: Math.max(0, p.coachTrust-5)}) }, 
        { probability: 0.1, narrative: 'Le coach vous met quand même sur le banc.', effects: [{text: '-10k €', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Rachat', text: 'Proposer de payer le repas de toute l\'équipe', outcome: { narrative: 'L\'amende devient un bon moment d\'équipe.', effects: [{text: '-5k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, {text: '-2 Confiance', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), morale: Math.min(100, p.morale+10), coachTrust: Math.max(0, p.coachTrust-2)}) } }
    ]
  },
  {
    id: 'extra_82', category: 'CARRIÈRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Votre agent a publiquement critiqué le système de jeu du club.",
    options: [
      { typeTag: 'Défense', text: 'Soutenir votre agent en off', outcome: [
        { probability: 0.3, narrative: 'Le club change de système pour vous plaire.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.7, narrative: 'La direction vous met au placard.', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-10 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Désaveu', text: 'Désavouer votre agent publiquement', outcome: [
        { probability: 0.8, narrative: 'Le club est rassuré par votre loyauté.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.2, narrative: 'Votre agent menace de vous lâcher.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Médiation', text: 'Organiser une réunion secrète entre le coach et l\'agent', outcome: { narrative: 'Les choses s\'aplanissent dans l\'ombre.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_83', category: 'CARRIÈRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes invité à participer à un match de charité avec d'anciennes légendes.",
    options: [
      { typeTag: 'Star', text: 'Y aller et faire le show', outcome: [
        { probability: 0.6, narrative: 'Vous brillez aux côtés de Zidane et Ronaldinho !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.4, narrative: 'Coup de fatigue, vous rentrez épuisé.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Pro', text: 'Décliner gentiment pour rester focus', outcome: [
        { probability: 0.9, narrative: 'Une attitude 100% professionnelle.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.1, narrative: 'Vous regrettez un peu devant la télé.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Présence', text: 'Y assister en tribune sans jouer', outcome: { narrative: 'Le bon équilibre entre soutien et récupération.', effects: [{text: '+5 Moral', style: 'positive'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5), form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_84', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Le téléphone d'un coéquipier a disparu dans les vestiaires. L'ambiance est lourde.",
    options: [
      { typeTag: 'Justicier', text: 'Mener l\'enquête vous-même', outcome: [
        { probability: 0.5, narrative: 'C\'était juste une blague, l\'ambiance se détend.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.5, narrative: 'Vous accusez à tort un joueur. Crise dans l\'équipe.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne pas vous en mêler', outcome: [
        { probability: 0.8, narrative: 'Le téléphone réapparaît mystérieusement.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'La suspicion ronge le groupe.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Solidarité', text: 'Racheter un téléphone au coéquipier (anonymement)', outcome: { narrative: 'Une dépense inutile mais la paix revient.', effects: [{text: '-1k €', style: 'negative'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-1000), morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_85', category: 'ENTRAÎNEMENT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un spécialiste mondial des coups francs est au club pour une semaine.",
    options: [
      { typeTag: 'Intense', text: 'Travailler avec lui chaque jour', outcome: [
        { probability: 0.7, narrative: 'Votre technique de frappe s\'améliore considérablement.', effects: [{text: '+3 TEC', style: 'positive'}, {text: '-10 Forme', style: 'negative'}], applyStats: p => ({...p, attributes: {...p.attributes, technique: Math.min(99, p.attributes.technique+3)}, form: Math.max(0, p.form-10)}) }, 
        { probability: 0.3, narrative: 'Tension musculaire à force de répéter le geste.', effects: [{text: '-20 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Prudent', text: 'Faire une seule séance avec lui', outcome: [
        { probability: 0.9, narrative: 'Quelques bons conseils sans forcer.', effects: [{text: '+1 TEC', style: 'positive'}], applyStats: p => ({...p, attributes: {...p.attributes, technique: Math.min(99, p.attributes.technique+1)}}) }, 
        { probability: 0.1, narrative: 'Il vous snobe car vous n\'êtes pas assez assidu.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Théorie', text: 'L\'inviter à dîner pour parler théorie de la frappe', outcome: { narrative: 'Un repas enrichissant et reposant.', effects: [{text: '+2 Moral', style: 'positive'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+2), form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_86', category: 'ENTRAÎNEMENT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Le préparateur mental vous propose des séances de méditation avancée.",
    options: [
      { typeTag: 'Focus', text: 'Faire les séances à 100%', outcome: [
        { probability: 0.8, narrative: 'Votre concentration est décuplée. Zen absolu.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.2, narrative: 'Vous n\'y arrivez pas, ça vous frustre.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Basique', text: 'Refuser poliment', outcome: [
        { probability: 0.9, narrative: 'Vous préférez le terrain. Tout va bien.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le préparateur prend la mouche.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }
      ] },
      { typeTag: 'Essai', text: 'Essayer une fois pour voir', outcome: { narrative: 'Sympa, mais sans plus.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_87', category: 'MÉDIAS', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Une interview d'il y a 5 ans où vous critiquez votre club actuel refait surface.",
    options: [
      { typeTag: 'Assume', text: 'Dire que seul les imbéciles ne changent pas d\'avis', outcome: [
        { probability: 0.6, narrative: 'Les fans apprécient votre répartie.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Le président prend cela comme un manque de respect.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Pardon', text: 'S\'excuser platement pour des erreurs de jeunesse', outcome: [
        { probability: 0.9, narrative: 'L\'incendie est éteint. Affaire classée.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'On vous trouve trop lisse.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Preuve', text: 'Embrasser l\'écusson lors du prochain match au lieu de parler', outcome: { narrative: 'Un geste symbolique très fort.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_88', category: 'TRANSFERT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur annonce l'arrivée d'une superstar à votre poste.",
    options: [
      { typeTag: 'Guerrier', text: 'Annoncer que vous êtes prêt pour la concurrence', outcome: [
        { probability: 0.7, narrative: 'Superbe mentalité !', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.3, narrative: 'Vous surjouez à l\'entraînement pour prouver.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Craintif', text: 'Demander un entretien de garantie avec le coach', outcome: [
        { probability: 0.8, narrative: 'Il vous rassure sur votre statut.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.2, narrative: 'Il déteste les pleurnicheurs.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Indifférent', text: 'Ne rien dire', outcome: { narrative: 'Vous restez focalisé sur vous-même.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_89', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Un club s'apprête à faire une offre, mais vous avez une alerte musculaire.",
    options: [
      { typeTag: 'Pari', text: 'Jouer le prochain match pour prouver votre forme', outcome: [
        { probability: 0.4, narrative: 'Grand match ! L\'offre arrive.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.6, narrative: 'Claquage. L\'offre est retirée instantanément.', effects: [{text: '-25 Forme', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-25), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Sécurité', text: 'Ne pas jouer et soigner', outcome: [
        { probability: 0.8, narrative: 'Vous guérissez, l\'offre arrive un peu plus tard.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.2, narrative: 'Le club visé n\'a pas la patience et prend un autre joueur.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Secret', text: 'Faire fuiter des vidéos de vos meilleurs moments', outcome: { narrative: 'La hype reste intacte sans risquer votre corps.', effects: [{text: '+5 Moral', style: 'positive'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5), form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_90', category: 'LIFESTYLE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un ami vous propose d'investir massivement dans une start-up risquée.",
    options: [
      { typeTag: 'All-in', text: 'Investir 500k €', outcome: [
        { probability: 0.3, narrative: 'Jackpot ! La start-up cartonne.', effects: [{text: '+1M €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+1000000, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.7, narrative: 'La boîte coule. L\'argent est perdu.', effects: [{text: '-500k €', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-500000), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Refus', text: 'Passer son tour', outcome: [
        { probability: 0.9, narrative: 'L\'argent est en sécurité à la banque.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'La start-up réussit. Grosse frustration.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Prudent', text: 'Investir juste 50k €', outcome: { narrative: 'Un petit investissement de bon père de famille.', effects: [{text: '-50k €', style: 'negative'}, {text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_91', category: 'CARRIÈRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous êtes pris à partie par des supporters énervés après une défaite.",
    options: [
      { typeTag: 'Clash', text: 'Répondre avec agressivité', outcome: [
        { probability: 0.2, narrative: 'Ils reculent, le respect s\'installe.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.8, narrative: 'Début de bagarre ! Vous êtes sanctionné par le club.', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Pacifique', text: 'Fuir sous escorte', outcome: [
        { probability: 0.9, narrative: 'Rien de grave, vous êtes en sécurité.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Des vidéos vous montrent terrifié. Coup dur pour l\'égo.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Dialogue', text: 'Parler avec leur chef calmement', outcome: { narrative: 'Courageux. La tension retombe.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_92', category: 'LIFESTYLE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "C'est l'anniversaire de votre mère, mais vous avez une mise au vert stricte.",
    options: [
      { typeTag: 'Rebelle', text: 'Faire le mur une heure', outcome: [
        { probability: 0.4, narrative: 'Mission accomplie incognito. La maman est heureuse !', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.6, narrative: 'Le coach s\'aperçoit de votre absence !', effects: [{text: '-30 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30)}) }
      ] },
      { typeTag: 'Pro', text: 'Rester à l\'hôtel', outcome: [
        { probability: 0.9, narrative: 'Concentration au max.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Votre mère est vraiment déçue.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Tech', text: 'Organiser une grosse surprise en FaceTime', outcome: { narrative: 'Mignon et 100% légal. Beau sourire.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_93', category: 'VESTIAIRE', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une taupe fuit les compos d'équipe à la presse depuis trois matchs.",
    options: [
      { typeTag: 'Parano', text: 'Accuser le nouveau joueur publiquement', outcome: [
        { probability: 0.2, narrative: 'C\'était lui ! Vous êtes un héros.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.8, narrative: 'C\'était faux. Vous passez pour un fou toxique.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Distance', text: 'Ne parler à personne dans le vestiaire', outcome: [
        { probability: 0.8, narrative: 'Vous vous protégez.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'L\'ambiance est insupportable.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Piège', text: 'Tendre un piège avec une fausse information', outcome: { narrative: 'Vous démasquez la taupe. Le coach vous adore !', effects: [{text: '+20 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20)}) } }
    ]
  },
  {
    id: 'extra_94', category: 'TRANSFERT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Le président réclame une somme astronomique pour vous, bloquant votre transfert rêvé.",
    options: [
      { typeTag: 'Grève', text: 'Sécher l\'entraînement', outcome: [
        { probability: 0.3, narrative: 'Le président cède sous la pression médiatique.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.7, narrative: 'Vous êtes envoyé en équipe réserve. Catastrophe.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Silence', text: 'Accepter la décision et jouer', outcome: [
        { probability: 0.9, narrative: 'Vous gagnez le respect éternel des fans.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.1, narrative: 'Votre rêve s\'envole. Dépression passagère.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Télé', text: 'Faire une interview larmoyante', outcome: { narrative: 'Ça passe mal auprès des fans, mais le prix baisse un peu.', effects: [{text: '-10 Confiance', style: 'negative'}, {text: '-5 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10), morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_95', category: 'VESTIAIRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Une légende du club prend sa retraite et vous offre son mythique numéro de maillot.",
    options: [
      { typeTag: 'Fierté', text: 'Prendre le numéro', outcome: [
        { probability: 0.6, narrative: 'Le maillot vous sublime ! Vos ventes explosent.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '+50k €', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15), bankBalance: (p.bankBalance||0)+50000}) }, 
        { probability: 0.4, narrative: 'Le poids du numéro est trop lourd. Vous perdez vos moyens.', effects: [{text: '-15 Forme', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Modeste', text: 'Refuser par respect', outcome: [
        { probability: 0.9, narrative: 'La légende apprécie votre humilité.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.1, narrative: 'Les sponsors sont déçus du manque d\'ambition.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Garde', text: 'Garder votre propre numéro pour écrire votre propre histoire', outcome: { narrative: 'Une mentalité de patron.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  }
];
