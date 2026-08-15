// extraEvents7.js - Événements générés dynamiquement et enrichis
export const EXTRA_EVENTS_7 = [
  {
    id: 'extra_121', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Une fuite dans la presse affirme que vous trouvez les entraînements tactiques 'ennuyeux'.",
    options: [
      { typeTag: 'Démenti', text: 'Publier un communiqué officiel dénonçant une fake news', outcome: [
        { probability: 0.7, narrative: 'L\'incendie est vite éteint.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.3, narrative: 'Les journalistes sortent un enregistrement audio !', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Provoc', text: 'Dire "Je suis payé pour jouer, pas pour dormir en salle vidéo"', outcome: [
        { probability: 0.2, narrative: 'Les fans adorent votre côté rebelle.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.8, narrative: 'Le coach vous exclut du groupe pour le prochain match.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Focus', text: 'Demander au coach plus de séances vidéos en tête-à-tête', outcome: { narrative: 'Vous retournez la situation à votre avantage.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) } }
    ]
  },
  {
    id: 'extra_122', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Des photos de vous sortant d'une boîte de nuit à 4h du matin fuitent sur les réseaux.",
    options: [
      { typeTag: 'Excuse', text: 'S\'excuser et payer une amende volontaire au club', outcome: [
        { probability: 0.8, narrative: 'L\'amende calme la direction.', effects: [{text: '-10k €', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), coachTrust: Math.max(0, p.coachTrust-5)}) }, 
        { probability: 0.2, narrative: 'Le coach estime que vous êtes un mauvais exemple.', effects: [{text: '-20 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Arrogance', text: 'Rappeler que c\'était votre jour de repos', outcome: [
        { probability: 0.5, narrative: 'Logique imparable, l\'affaire se tasse.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.5, narrative: 'Les supporters sifflent à votre prochaine touche de balle.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Silencieux', text: 'Faire profil bas à l\'entraînement', outcome: { narrative: 'Vous compensez sur le terrain.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_123', category: 'VESTIAIRE', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Le kiné vous conseille de ralentir le rythme, mais le coach a besoin de vous pour le derby.",
    options: [
      { typeTag: 'Héros', text: 'Ignorer le kiné et jouer sous infiltration', outcome: [
        { probability: 0.4, narrative: 'Match héroïque, vous êtes une légende locale !', effects: [{text: '+25 Moral', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+25), coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.6, narrative: 'Le muscle lâche. Vous êtes out pour 2 mois.', effects: [{text: '-40 Forme', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, form: Math.max(0, p.form-40), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Prudent', text: 'Écouter le kiné et déclarer forfait', outcome: [
        { probability: 0.8, narrative: 'Frustrant mais vital pour la suite de la saison.', effects: [{text: '+10 Forme', style: 'positive'}, {text: '-5 Moral', style: 'negative'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+10), morale: Math.max(0, p.morale-5)}) }, 
        { probability: 0.2, narrative: 'Le coach vous en veut pour ce manque de "grinta".', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Super-sub', text: 'Demander à ne jouer que les 15 dernières minutes', outcome: { narrative: 'Un bon compromis sécurité/engagement.', effects: [{text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_124', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Un jeune joueur vous accuse de bizutage abusif.",
    options: [
      { typeTag: 'Sévère', text: 'Le confronter publiquement devant l\'équipe', outcome: [
        { probability: 0.3, narrative: 'Le vestiaire vous soutient, le jeune s\'excuse.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.7, narrative: 'Le scandale éclate dans la presse. Vous êtes suspendu.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-25 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Pédagogue', text: 'S\'excuser et le prendre sous votre aile', outcome: [
        { probability: 0.9, narrative: 'Situation désamorcée avec élégance.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) }, 
        { probability: 0.1, narrative: 'Il refuse vos excuses et demande un transfert.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Indifférent', text: 'L\'ignorer totalement', outcome: { narrative: 'La tension reste latente mais le club étouffe l\'affaire.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_125', category: 'MÉDIAS', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "On vous propose d'être l'égérie de la nouvelle campagne touristique de votre pays.",
    options: [
      { typeTag: 'Patriote', text: 'Faire la campagne gratuitement', outcome: [
        { probability: 0.8, narrative: 'Tout le pays vous adore !', effects: [{text: '+25 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+25)}) }, 
        { probability: 0.2, narrative: 'Votre club estime que vous perdez du temps d\'entraînement.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Business', text: 'Demander un cachet important', outcome: [
        { probability: 0.7, narrative: 'Contrat signé, beau pactole.', effects: [{text: '+100k €', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: (p.bankBalance||0)+100000}) }, 
        { probability: 0.3, narrative: 'La presse vous taxe d\'avare.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Focus', text: 'Décliner poliment pour vous concentrer sur la saison', outcome: { narrative: 'Choix professionnel salué par le coach.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) } }
    ]
  },
  {
    id: 'extra_126', category: 'MÉDIAS', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Un journaliste prétend que vous simulez souvent des fautes sur le terrain.",
    options: [
      { typeTag: 'Rage', text: 'Lui répondre vertement en conférence de presse', outcome: [
        { probability: 0.4, narrative: 'Vous retournez l\'opinion en pointant les mauvais arbitrages.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.6, narrative: 'Vous paraissez très nerveux et suspect.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Zen', text: 'Répondre avec un sourire que "le football est un sport de malins"', outcome: [
        { probability: 0.8, narrative: 'Réponse culte, les médias adorent.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.2, narrative: 'Les arbitres vous collent un carton au prochain match pour simulation.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Terrain', text: 'Ne plus jamais tomber au prochain match', outcome: { narrative: 'Vous encaissez les coups debout, énorme respect.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_127', category: 'LIFESTYLE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre frère a besoin de vous pour le sortir d'un mauvais pas financier.",
    options: [
      { typeTag: 'Généreux', text: 'Rembourser toutes ses dettes (grosse somme)', outcome: [
        { probability: 0.9, narrative: 'Il est sauvé et la famille vous remercie.', effects: [{text: '-80k €', style: 'negative'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-80000), morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.1, narrative: 'Il recommence deux mois plus tard...', effects: [{text: '-80k €', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-80000), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Strict', text: 'Refuser pour lui donner une leçon', outcome: [
        { probability: 0.7, narrative: 'Coup de froid dans la famille, mais c\'est nécessaire.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }, 
        { probability: 0.3, narrative: 'Il crée un scandale dans la presse pour se venger.', effects: [{text: '-30 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Mentor', text: 'L\'engager comme intendant personnel pour le responsabiliser', outcome: { narrative: 'Excellente idée, il travaille dur pour vous rembourser.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_128', category: 'MÉDIAS', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous avez été filmé en train de jeter votre maillot de rage après un remplacement.",
    options: [
      { typeTag: 'Faux nez', text: 'Dire qu\'il a glissé de vos mains de fatigue', outcome: [
        { probability: 0.1, narrative: 'Par miracle, ça passe.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.9, narrative: 'Personne n\'y croit. Vous êtes la risée du web.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Mea culpa', text: 'Présenter des excuses publiques aux supporters et au coach', outcome: [
        { probability: 0.8, narrative: 'Faute avouée, à moitié pardonnée.', effects: [{text: '-5 Confiance', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-5)}) }, 
        { probability: 0.2, narrative: 'Le groupe des ultras exige une rencontre.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Charité', text: 'Mettre ce maillot aux enchères pour une oeuvre caritative', outcome: { narrative: 'Joli rattrapage en communication.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10), coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_129', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un club exotique vous propose un salaire triplé pour la fin de saison.",
    options: [
      { typeTag: 'Mercenaire', text: 'Demander immédiatement votre transfert', outcome: [
        { probability: 0.3, narrative: 'Le club accepte l\'offre. Gros chèque !', effects: [{text: '+500k €', style: 'positive'}, {text: '-20 Moral', style: 'negative'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: (p.bankBalance||0)+500000, morale: Math.max(0, p.morale-20)}) }, 
        { probability: 0.7, narrative: 'Votre club bloque tout et vous met en tribune.', effects: [{text: '-40 Confiance', style: 'negative'}, {text: '-20 Forme', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-40), form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Fidèle', text: 'Balayer l\'offre publiquement', outcome: [
        { probability: 0.9, narrative: 'Vous devenez l\'idole absolue du stade.', effects: [{text: '+20 Moral', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+20), coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.1, narrative: 'L\'offre était en fait fausse, vous passez pour un prétentieux.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Patience', text: 'Mettre l\'offre en attente', outcome: { narrative: 'Une solution d\'attente qui ne froisse personne.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_130', category: 'LIFESTYLE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Un de vos proches vous demande de le nommer officiellement comme votre agent.",
    options: [
      { typeTag: 'Famille', text: 'Accepter', outcome: [
        { probability: 0.4, narrative: 'Contre toute attente, il négocie très bien !', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.6, narrative: 'C\'est un désastre. Des clubs vous boycottent.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser et garder un agent certifié', outcome: [
        { probability: 0.8, narrative: 'Triste sur le moment, mais vital pour votre carrière.', effects: [{text: '-5 Moral', style: 'negative'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.max(0, p.morale-5), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'Votre proche coupe les ponts avec vous.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Duo', text: 'L\'associer à votre agent actuel', outcome: { narrative: 'Un bon compromis pour apprendre le métier sans risque.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_131', category: 'ENTRAÎNEMENT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Le coach vous reproche un manque d'implication lors des replis défensifs à l'entraînement.",
    options: [
      { typeTag: 'Guerrier', text: 'Tâcler sévèrement au prochain ballon pour montrer votre "implication"', outcome: [
        { probability: 0.3, narrative: 'Il aime ce caractère de chien !', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.7, narrative: 'Vous blessez un partenaire. Expulsion de la séance.', effects: [{text: '-25 Confiance', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-25), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Bosseur', text: 'Augmenter le volume de course sans rien dire', outcome: [
        { probability: 0.9, narrative: 'Le coach note votre changement d\'attitude.', effects: [{text: '+10 Confiance', style: 'positive'}, {text: '-5 Forme', style: 'negative'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10), form: Math.max(0, p.form-5)}) }, 
        { probability: 0.1, narrative: 'Vous vous épuisez sans raison.', effects: [{text: '-15 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Tactique', text: 'Demander une séance d\'analyse vidéo sur votre placement', outcome: { narrative: 'Une attitude super professionnelle.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) } }
    ]
  },
  {
    id: 'extra_132', category: 'MÉDIAS', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Des anciens coéquipiers se moquent de vos performances dans un podcast très écouté.",
    options: [
      { typeTag: 'Rage', text: 'Les insulter sur Twitter', outcome: [
        { probability: 0.2, narrative: 'Buzz énorme, vous gagnez plein de followers.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.8, narrative: 'Vous passez pour un gamin capricieux.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Silence', text: 'Ne pas réagir', outcome: [
        { probability: 0.8, narrative: 'La polémique s\'éteint d\'elle-même.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.2, narrative: 'Leur avis semble faire l\'unanimité.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Sportif', text: 'Marquer un but au prochain match et mimer des écouteurs', outcome: { narrative: 'Une célébration iconique qui les fait taire.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) } }
    ]
  },
  {
    id: 'extra_133', category: 'TRANSFERT', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Vous apprenez qu'un club acheteur potentiel veut vous faire jouer blessé pour une finale.",
    options: [
      { typeTag: 'Risque', text: 'Accepter la condition pour forcer le transfert', outcome: [
        { probability: 0.3, narrative: 'Vous remportez la finale et le transfert !', effects: [{text: '+30 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+30)}) }, 
        { probability: 0.7, narrative: 'Grave rechute pendant le match, fin de saison.', effects: [{text: '-40 Forme', style: 'negative'}, {text: '-30 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-40), morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Pro', text: 'Refuser net de mettre votre santé en jeu', outcome: [
        { probability: 0.9, narrative: 'Transfert annulé, mais santé préservée.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+10)}) }, 
        { probability: 0.1, narrative: 'Votre refus frustre votre club actuel.', effects: [{text: '-10 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Contre-offre', text: 'Demander un énorme bonus de risque', outcome: { narrative: 'Ils refusent, mais vous gardez la face.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_134', category: 'LIFESTYLE', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Un conflit de voisinage éclate : vos voisins se plaignent du bruit de votre salle de sport personnelle.",
    options: [
      { typeTag: 'Argent', text: 'Insonoriser toute la pièce à vos frais', outcome: [
        { probability: 0.9, narrative: 'Problème réglé.', effects: [{text: '-5k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-5000), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.1, narrative: 'L\'entreprise d\'insonorisation arnaque et fuit avec l\'acompte.', effects: [{text: '-10k €', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Clash', text: 'Les envoyer promener, c\'est chez vous', outcome: [
        { probability: 0.3, narrative: 'Ils n\'osent plus rien dire.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.7, narrative: 'La police débarque, la presse en parle.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Déménagement', text: 'Aller en salle de sport privée', outcome: { narrative: 'Moins pratique, mais ça évite les conflits.', effects: [{text: '-1k €', style: 'negative'}, {text: '-5 Forme', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-1000), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_135', category: 'MÉDIAS', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Une télé-réalité veut suivre votre famille au quotidien.",
    options: [
      { typeTag: 'Business', text: 'Accepter pour le cachet', outcome: [
        { probability: 0.5, narrative: 'Gros buzz positif et gros chèque !', effects: [{text: '+50k €', style: 'positive'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.5, narrative: 'Votre image est totalement ruinée par le montage.', effects: [{text: '+50k €', style: 'positive'}, {text: '-30 Moral', style: 'negative'}, {text: '-20 Confiance', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: (p.bankBalance||0)+50000, morale: Math.max(0, p.morale-30), coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Intimité', text: 'Refuser catégoriquement', outcome: [
        { probability: 0.9, narrative: 'La vie privée avant tout.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Défense', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Votre famille est déçue de rater son heure de gloire.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Contrôle', text: 'Autoriser un seul documentaire d\'une heure', outcome: { narrative: 'Une belle image sans l\'excès de la télé-réalité.', effects: [{text: '+10k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: (p.bankBalance||0)+10000, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_136', category: 'TRANSFERT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Un club qui joue la Ligue des Champions vous propose un essai de 3 jours.",
    options: [
      { typeTag: 'Fierté', text: 'Refuser : "Je ne passe pas d\'essais, on m\'achète"', outcome: [
        { probability: 0.6, narrative: 'Ce cran leur plaît, ils font une offre direct.', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.4, narrative: 'Ils annulent tout. Opportunité ratée.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Humble', text: 'Accepter l\'essai et tout donner', outcome: [
        { probability: 0.8, narrative: 'Vous crevez l\'écran. Offre formelle.', effects: [{text: '+15 Moral', style: 'positive'}, {text: '-10 Forme', style: 'negative'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.min(100, p.morale+15), form: Math.max(0, p.form-10)}) }, 
        { probability: 0.2, narrative: 'Vous n\'êtes pas au niveau. Énorme désillusion.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Secret', text: 'Y aller sous faux nom (impossible mais tenté)', outcome: { narrative: 'La presse le découvre, situation burlesque.', effects: [{text: '-10 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-10)}) } }
    ]
  },
  {
    id: 'extra_137', category: 'VESTIAIRE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Le téléphone du coach a été hacké et ses messages sur les joueurs fuitent.",
    options: [
      { typeTag: 'Rage', text: 'Affronter le coach sur les critiques à votre égard', outcome: [
        { probability: 0.3, narrative: 'Il s\'excuse, l\'air penaud.', effects: [{text: '+15 Confiance', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15)}) }, 
        { probability: 0.7, narrative: 'Il confirme ses critiques devant tout le monde.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Leader', text: 'Organiser une réunion de crise joueurs/coach', outcome: [
        { probability: 0.8, narrative: 'L\' abcès est crevé, l\'équipe repart unie.', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.2, narrative: 'La réunion tourne au fiasco. Le groupe explose.', effects: [{text: '-20 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Ignore', text: 'Dire que "ce sont des choses privées"', outcome: { narrative: 'Vous vous mettez au dessus de la mêlée.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_138', category: 'TRANSFERT', tag: 'Tension', targetPosition: 'ALL', condition: () => true,
    description: "Votre transfert est bloqué pour 1 million d'euros de différence entre les clubs.",
    options: [
      { typeTag: 'Sacrifice', text: 'Renoncer à votre prime de signature pour compenser', outcome: [
        { probability: 0.9, narrative: 'Le transfert est validé !', effects: [{text: '-100k €', style: 'negative'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.1, narrative: 'Même avec ça, un autre détail bloque.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Vitesse', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Grève', text: 'Sécher l\'entraînement pour forcer le club vendeur', outcome: [
        { probability: 0.3, narrative: 'Le club vendeur cède sous la pression.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.7, narrative: 'Le club acheteur n\'aime pas ce comportement et se retire.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Médias', text: 'Supplier publiquement votre président de vous laisser partir', outcome: { narrative: 'C\'est humiliant, mais ça aide un peu.', effects: [{text: '-10 Moral', style: 'negative'}, {text: '-5 Confiance', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-10), coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_139', category: 'ENTRAÎNEMENT', tag: 'Rumeur', targetPosition: 'ALL', condition: () => true,
    description: "Une rumeur dit que vous êtes protégé par le coach car vous avez le même agent.",
    options: [
      { typeTag: 'Sur-régime', text: 'Travailler deux fois plus à l\'entraînement pour prouver votre valeur', outcome: [
        { probability: 0.6, narrative: 'Vos performances font taire tout le monde.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '-10 Forme', style: 'negative'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), form: Math.max(0, p.form-10)}) }, 
        { probability: 0.4, narrative: 'Blessure musculaire de fatigue.', effects: [{text: '-25 Forme', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, form: Math.max(0, p.form-25)}) }
      ] },
      { typeTag: 'Blague', text: 'Appeler le coach "Papa" devant tout le monde', outcome: [
        { probability: 0.7, narrative: 'L\'humour désamorce la tension.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.3, narrative: 'Le coach déteste la blague.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Ne rien dire', outcome: { narrative: 'Vous restez focalisé sur le ballon.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_140', category: 'CARRIÈRE', tag: 'Famille', targetPosition: 'ALL', condition: () => true,
    description: "Votre agent/proche demande une augmentation de ses commissions de façon agressive au club.",
    options: [
      { typeTag: 'Soutien', text: 'Appuyer sa demande en menaçant de partir', outcome: [
        { probability: 0.2, narrative: 'Le club cède. Jackpot.', effects: [{text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.8, narrative: 'Le club refuse et vous écarte de l\'équipe type.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Rupture', text: 'Le renvoyer pour incompétence', outcome: [
        { probability: 0.9, narrative: 'Le club apprécie, mais c\'est dur familialement.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '-15 Moral', style: 'negative'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.max(0, p.morale-15)}) }, 
        { probability: 0.1, narrative: 'Il vous attaque en justice.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-20k €', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-30), bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }
      ] },
      { typeTag: 'Calmer', text: 'Prendre l\'amende/commission sur votre propre salaire', outcome: { narrative: 'Une solution très coûteuse pour la paix sociale.', effects: [{text: '-50k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_141', category: 'CARRIÈRE', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "On vous propose d'investir dans un club de 3ème division locale.",
    options: [
      { typeTag: 'Président', text: 'Acheter 51% des parts', outcome: [
        { probability: 0.3, narrative: 'Le club monte en D2, votre investissement triple !', effects: [{text: '+300k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: (p.bankBalance||0)+300000, morale: Math.min(100, p.morale+20)}) }, 
        { probability: 0.7, narrative: 'Dépôt de bilan. Un gouffre financier.', effects: [{text: '-200k €', style: 'negative'}, {text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-200000), morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Symbolique', text: 'Acheter juste 1% pour soutenir', outcome: [
        { probability: 0.9, narrative: 'Beau geste, pas de risque majeur.', effects: [{text: '-10k €', style: 'negative'}, {text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000), morale: Math.min(100, p.morale+10)}) }, 
        { probability: 0.1, narrative: 'Le club coule de toute façon.', effects: [{text: '-10k €', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Refus', text: 'Garder votre argent sagement', outcome: { narrative: 'Choix sûr.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_142', category: 'ENTRAÎNEMENT', tag: 'Opportunité', targetPosition: 'ALL', condition: () => true,
    description: "Le club a investi dans une machine de cryothérapie dernier cri, mais c'est terrifiant.",
    options: [
      { typeTag: 'Cran', text: 'Faire une séance complète à -150°C', outcome: [
        { probability: 0.8, narrative: 'Vous ressortez frais comme un gardon !', effects: [{text: '+20 Forme', style: 'positive'}, { text: '+2 Dribble', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + 2)) }, form: Math.min(100, p.form+20)}) }, 
        { probability: 0.2, narrative: 'Vous y restez trop longtemps. Brûlure par le froid !', effects: [{text: '-30 Forme', style: 'negative'}, {text: '-10 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, form: Math.max(0, p.form-30), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Peur', text: 'Refuser d\'entrer là-dedans', outcome: [
        { probability: 0.9, narrative: 'Le bain froid classique suffira.', effects: [{text: '+5 Forme', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, form: Math.min(100, p.form+5)}) }, 
        { probability: 0.1, narrative: 'Le préparateur se moque de vous.', effects: [{text: '-5 Moral', style: 'negative'}, { text: '-2 Tir', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + -2)) }, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Prudent', text: 'Ne faire que 30 secondes', outcome: { narrative: 'Petit coup de fouet agréable.', effects: [{text: '+10 Forme', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_143', category: 'ENTRAÎNEMENT', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Vous insultez accidentellement le traducteur du coach qui s'est trompé de mot.",
    options: [
      { typeTag: 'Excuses', text: 'S\'excuser immédiatement devant tout le monde', outcome: [
        { probability: 0.8, narrative: 'Incident clos, respect regagné.', effects: [{text: '+10 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'Le traducteur est rancunier et traduit mal vos propos ensuite.', effects: [{text: '-15 Confiance', style: 'negative'}, { text: '-2 Passe', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Fierté', text: 'Maintenir qu\'il a fait une grosse faute', outcome: [
        { probability: 0.3, narrative: 'Le coach réalise l\'erreur de traduction et vous donne raison.', effects: [{text: '+5 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+5)}) }, 
        { probability: 0.7, narrative: 'Vous passez pour un mec toxique.', effects: [{text: '-20 Confiance', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Cadeau', text: 'Lui offrir une montre pour vous faire pardonner', outcome: { narrative: 'La paix s\'achète souvent.', effects: [{text: '-2k €', style: 'negative'}, {text: '+5 Confiance', style: 'positive'}, { text: '+2 Physique', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + 2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-2000), coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_144', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: () => true,
    description: "Un ami emprunte votre voiture et provoque un petit accident, fuyant la scène.",
    options: [
      { typeTag: 'Justice', text: 'Dénoncer votre ami à la police', outcome: [
        { probability: 0.8, narrative: 'Légalement clair, moralement dur.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '+10 Confiance', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, morale: Math.max(0, p.morale-15), coachTrust: Math.min(100, p.coachTrust+10)}) }, 
        { probability: 0.2, narrative: 'L\'ami lance des fausses rumeurs sur vous.', effects: [{text: '-25 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Protection', text: 'Payer les dégâts en anonyme et étouffer l\'affaire', outcome: [
        { probability: 0.4, narrative: 'Ça marche, aucun scandale.', effects: [{text: '-20k €', style: 'negative'}, { text: '-2 Dribble', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, dribbling: Math.max(1, Math.min(99, (p.attributes?.dribbling || 50) + -2)) }, bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }, 
        { probability: 0.6, narrative: 'La presse découvre le pot aux roses. Complicité de fuite.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-40 Moral', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-40)}) }
      ] },
      { typeTag: 'Force', text: 'Traîner l\'ami au poste de police vous-même', outcome: { narrative: 'Un acte de courage salué.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_145', category: 'MÉDIAS', tag: 'Blessure', targetPosition: 'ALL', condition: () => true,
    description: "Une émission débat sur l'idée que vous êtes 'fini' pour le haut niveau après vos blessures.",
    options: [
      { typeTag: 'Revanche', text: 'S\'entraîner 3x plus fort pour leur prouver le contraire', outcome: [
        { probability: 0.5, narrative: 'Machine de guerre activée !', effects: [{text: '+25 Forme', style: 'positive'}, {text: '+15 Moral', style: 'positive'}, { text: '+2 Tir', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.max(1, Math.min(99, (p.attributes?.finishing || 50) + 2)) }, form: Math.min(100, p.form+25), morale: Math.min(100, p.morale+15)}) }, 
        { probability: 0.5, narrative: 'Votre corps lâche sous l\'effort.', effects: [{text: '-30 Forme', style: 'negative'}, { text: '-2 Physique', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, physical: Math.max(1, Math.min(99, (p.attributes?.physical || 50) + -2)) }, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Dépression', text: 'Ne pas regarder, mais ça vous ronge', outcome: [
        { probability: 0.8, narrative: 'Vous doutez de vous.', effects: [{text: '-15 Moral', style: 'negative'}, { text: '-2 Défense', style: 'negative' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, defense: Math.max(1, Math.min(99, (p.attributes?.defense || 50) + -2)) }, morale: Math.max(0, p.morale-15)}) }, 
        { probability: 0.2, narrative: 'Un coéquipier vous remotive sérieusement.', effects: [{text: '+10 Moral', style: 'positive'}, { text: '+2 Vitesse', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, pace: Math.max(1, Math.min(99, (p.attributes?.pace || 50) + 2)) }, morale: Math.min(100, p.morale+10)}) }
      ] },
      { typeTag: 'Humour', text: 'Poster une vidéo de vous marchant avec une canne', outcome: { narrative: 'Vous désamorcez par le rire.', effects: [{text: '+15 Moral', style: 'positive'}, { text: '+2 Passe', style: 'positive' }], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.max(1, Math.min(99, (p.attributes?.passing || 50) + 2)) }, morale: Math.min(100, p.morale+15)}) } }
    ]
  }
];
