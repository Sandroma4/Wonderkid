// extraEvents.js - Événements de début de carrière et spécialisés
export const EXTRA_EVENTS = [
  {
    id: 'extra_1', category: 'LIFESTYLE', tag: 'Tentation', targetPosition: 'ALL', condition: (p) => p.age <= 21,
    description: "Vos anciens amis du quartier vous invitent à une fête très arrosée la veille d'un match.",
    options: [
      { typeTag: 'Fêtard', text: 'Y aller incognito', outcome: [
        { probability: 0.3, narrative: 'Vous rentrez tard mais personne ne remarque.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.7, narrative: 'Une photo fuite. Vous êtes puni.', effects: [{text: '-20 Forme', style: 'negative'}, {text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-20), coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Sage', text: 'Refuser poliment', outcome: [
        { probability: 0.9, narrative: 'Vous dormez bien. Le coach apprécie.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.1, narrative: 'Vos amis vous en veulent et ça vous mine.', effects: [{text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Compromis', text: 'Y aller 1h et boire de l\'eau', outcome: { narrative: 'Vos amis se moquent un peu, mais vous êtes pro.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_2', category: 'CARRIÈRE', tag: 'Média', targetPosition: 'ALL', condition: (p) => p.age <= 21 && p.ovr > 70,
    description: "La presse locale fait de vous le 'nouveau prodige' du pays après un bon match.",
    options: [
      { typeTag: 'Arrogant', text: 'Déclarer que ce n\'est que le début', outcome: [
        { probability: 0.4, narrative: 'Le public adore votre assurance !', effects: [{text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.6, narrative: 'Les vétérans vous recadrent à l\'entraînement.', effects: [{text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Modeste', text: 'Garder la tête froide et remercier l\'équipe', outcome: [
        { probability: 0.8, narrative: 'Tout le club salue votre maturité.', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.2, narrative: 'Les médias vous trouvent trop lisse.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Ne pas lire la presse', outcome: { narrative: 'Vous restez concentré sur votre bulle.', effects: [{text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_3', category: 'ENTRAÎNEMENT', tag: 'Bizutage', targetPosition: 'ALL', condition: (p) => p.age <= 21,
    description: "Les vétérans de l'équipe vous demandent de porter les buts à la fin de la séance.",
    options: [
      { typeTag: 'Sage', text: 'Le faire sans broncher', outcome: [
        { probability: 0.8, narrative: 'Vous gagnez le respect des anciens.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.2, narrative: 'Vous vous faites mal au dos.', effects: [{text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Rebelle', text: 'Refuser net', outcome: [
        { probability: 0.3, narrative: 'Ils aiment votre caractère !', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.7, narrative: 'Ils vous rendent la vie dure pendant des semaines.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Malin', text: 'Payer un intendant pour le faire', outcome: { narrative: 'Cher payé mais efficace.', effects: [{text: '-1k €', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-1000)}) } }
    ]
  },
  {
    id: 'extra_4', category: 'CARRIÈRE', tag: 'Agent', targetPosition: 'ALL', condition: (p) => p.age <= 21,
    description: "Un agent très influent, mais connu pour être requin, veut vous signer.",
    options: [
      { typeTag: 'Ambitieux', text: 'Signer avec lui', outcome: [
        { probability: 0.5, narrative: 'Il vous obtient un contrat en or massif.', effects: [{text: '+100k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+100000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.5, narrative: 'Il vous brouille avec votre club formateur.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Fidèle', text: 'Garder votre père/frère comme agent', outcome: [
        { probability: 0.8, narrative: 'Confiance absolue. Le cocon familial vous protège.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.2, narrative: 'Négociation ratée sur votre prime.', effects: [{text: '-20k €', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-20000)}) }
      ] },
      { typeTag: 'Indécis', text: 'Attendre la fin de saison pour décider', outcome: { narrative: 'Focus sur le foot pour l\'instant.', effects: [{text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_5', category: 'LIFESTYLE', tag: 'Réseaux', targetPosition: 'ALL', condition: (p) => p.age <= 21,
    description: "Un de vos TikTok devient viral, mais on vous voit jongler en chaussures de ville.",
    options: [
      { typeTag: 'Influenceur', text: 'Lancer un challenge #DressShoesJuggling', outcome: [
        { probability: 0.6, narrative: 'Le buzz est énorme, un sponsor vous contacte !', effects: [{text: '+50k €', style: 'positive'}, {text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+50000, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.4, narrative: 'Le coach trouve ça ridicule et vous tacle.', effects: [{text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Timide', text: 'Supprimer la vidéo', outcome: [
        { probability: 0.9, narrative: 'Incident clos, mais vous ratez un buzz.', effects: [{text: '+5 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+5)}) },
        { probability: 0.1, narrative: 'Internet n\'oublie jamais. Un compte le republie.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Pro', text: 'Faire une nouvelle vidéo en crampons', outcome: { narrative: 'Redore votre image pro.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_6', category: 'ENTRAÎNEMENT', tag: 'Musculation', targetPosition: 'ALL', condition: (p) => p.age <= 21,
    description: "Le préparateur trouve que vous manquez de coffre et propose un programme hyper-protéiné lourd.",
    options: [
      { typeTag: 'Bête', text: 'Prendre 5kg de muscle pur', outcome: [
        { probability: 0.4, narrative: 'Vous gagnez vos duels, une vraie machine !', effects: [{text: '+25 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+25)}) },
        { probability: 0.6, narrative: 'Vous perdez en vivacité et ressentez des lourdeurs.', effects: [{text: '-20 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Agile', text: 'Refuser pour garder votre explosivité', outcome: [
        { probability: 0.7, narrative: 'Vous restez vif et le coach vous donne raison.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.3, narrative: 'Vous vous faites bouger à chaque duel.', effects: [{text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Doux', text: 'Demander un programme de gainage ciblé', outcome: { narrative: 'Progression lente mais saine.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_7', category: 'LIFESTYLE', tag: 'Dépense', targetPosition: 'ALL', condition: (p) => p.age <= 21 && p.bankBalance > 100000,
    description: "Avec votre première grosse prime, vous hésitez à faire un achat de fou.",
    options: [
      { typeTag: 'Bolide', text: 'Acheter une supercar voyante', outcome: [
        { probability: 0.3, narrative: 'Frime ultime, vous vous sentez puissant !', effects: [{text: '-100k €', style: 'negative'}, {text: '+25 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.min(100, p.morale+25)}) },
        { probability: 0.7, narrative: 'Vous l\'abîmez le premier jour et le club désapprouve.', effects: [{text: '-100k €', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Investisseur', text: 'Acheter un bien immobilier', outcome: [
        { probability: 0.9, narrative: 'Placement sûr. Vous gagnez en maturité.', effects: [{text: '-100k €', style: 'negative'}, {text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.1, narrative: 'Des problèmes de plomberie vous stressent.', effects: [{text: '-100k €', style: 'negative'}, {text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Famille', text: 'L\'offrir à vos parents', outcome: { narrative: 'Une fierté inestimable.', effects: [{text: '-100k €', style: 'negative'}, {text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.min(100, p.morale+20)}) } }
    ]
  },
  {
    id: 'extra_8', category: 'CARRIÈRE', tag: 'Prêt', targetPosition: 'ALL', condition: (p, tier) => tier === 1 && p.age <= 21 && p.ovr < 75,
    description: "Le club veut vous prêter en D2 pour que vous preniez du temps de jeu et de l'expérience.",
    options: [
      { typeTag: 'Accepter', text: 'Aller s\'aguerrir en D2', outcome: [
        { probability: 0.6, narrative: 'Vous faites une saison pleine et revenez métamorphosé !', effects: [{text: '+30 Forme', style: 'positive'}, {text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+30), morale: Math.min(100, p.morale+20)}) },
        { probability: 0.4, narrative: 'Football trop rugueux, vous vous blessez.', effects: [{text: '-25 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-25)}) }
      ] },
      { typeTag: 'Refuser', text: 'Forcer pour rester et prouver', outcome: [
        { probability: 0.3, narrative: 'Vous gagnez votre place en équipe première !', effects: [{text: '+30 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+30)}) },
        { probability: 0.7, narrative: 'Vous jouez avec la réserve toute l\'année.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Patient', text: 'Demander à attendre le mercato hivernal', outcome: { narrative: 'Vous jouez la montre.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_8_d3', category: 'CARRIÈRE', tag: 'Prêt', targetPosition: 'ALL', condition: (p, tier) => tier === 2 && p.age <= 21 && p.ovr < 70,
    description: "Le club veut vous prêter en D3 pour que vous preniez du temps de jeu et de l'expérience.",
    options: [
      { typeTag: 'Accepter', text: 'Aller s\'aguerrir en D3', outcome: [
        { probability: 0.6, narrative: 'Vous faites une saison pleine et revenez métamorphosé !', effects: [{text: '+30 Forme', style: 'positive'}, {text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+30), morale: Math.min(100, p.morale+20)}) },
        { probability: 0.4, narrative: 'Niveau technique faible, vous prenez des mauvais coups.', effects: [{text: '-25 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-25)}) }
      ] },
      { typeTag: 'Refuser', text: 'Forcer pour rester et prouver en D2', outcome: [
        { probability: 0.3, narrative: 'Vous gagnez votre place en équipe première !', effects: [{text: '+30 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+30)}) },
        { probability: 0.7, narrative: 'Vous cirez le banc toute l\'année.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Patient', text: 'Demander à attendre le mercato hivernal', outcome: { narrative: 'Vous jouez la montre.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_9', category: 'CARRIÈRE', tag: 'Transfert', targetPosition: 'ALL', condition: (p) => p.age >= 22 && p.age <= 29 && p.ovr > 80,
    description: "Un très grand club étranger vous courtise. Votre club formateur bloque le transfert.",
    options: [
      { typeTag: 'Clash', text: 'Faire grève de l\'entraînement', outcome: [
        { probability: 0.4, narrative: 'Le club craque, vous êtes transféré !', effects: [{text: '+50 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+50)}) },
        { probability: 0.6, narrative: 'Le club vous met à pied sans salaire. L\'enfer.', effects: [{text: '-40 Moral', style: 'negative'}, {text: '-50 Confiance', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-40), coachTrust: Math.max(0, p.coachTrust-50)}) }
      ] },
      { typeTag: 'Doux', text: 'Publier un communiqué déclarant votre amour pour votre club actuel', outcome: [
        { probability: 0.8, narrative: 'Vous êtes nommé capitaine et prolongé !', effects: [{text: '+25 Confiance', style: 'positive'}, {text: '+100k €', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+25), bankBalance: (p.bankBalance||0)+100000}) },
        { probability: 0.2, narrative: 'Vous avez des regrets.', effects: [{text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Agent', text: 'Laisser votre agent menacer le président en secret', outcome: { narrative: 'Négociation tendue, mais discrète.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_10', category: 'CARRIÈRE', tag: 'Leadership', targetPosition: 'ALL', condition: (p) => p.age >= 22 && p.age <= 29,
    description: "Le brassard de capitaine est vacant suite à une blessure longue durée.",
    options: [
      { typeTag: 'Leader', text: 'Aller dans le bureau du coach et le réclamer', outcome: [
        { probability: 0.5, narrative: 'Il aime votre audace et vous nomme !', effects: [{text: '+20 Confiance', style: 'positive'}, {text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+20), morale: Math.min(100, p.morale+15)}) },
        { probability: 0.5, narrative: 'Il trouve ça prétentieux.', effects: [{text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Humble', text: 'Soutenir un coéquipier plus expérimenté', outcome: [
        { probability: 0.9, narrative: 'Le vestiaire loue votre esprit d\'équipe.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.1, narrative: 'Le coéquipier prend le melon et vous snobe.', effects: [{text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Terrain', text: 'Essayer de le gagner par vos performances seules', outcome: { narrative: 'Focus sur le match.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_11', category: 'ENTRAÎNEMENT', tag: 'Exigence', targetPosition: 'ALL', condition: (p) => p.age >= 22 && p.age <= 29 && p.ovr > 75,
    description: "Vous sentez que le niveau d'entraînement de l'équipe baisse dangereusement.",
    options: [
      { typeTag: 'Coup de gueule', text: 'Recadrer tout le monde au milieu d\'un exercice', outcome: [
        { probability: 0.4, narrative: 'Électrochoc, l\'intensité remonte !', effects: [{text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.6, narrative: 'Vos partenaires vous trouvent lourd et vous isolent.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Exemple', text: 'Courir deux fois plus pour montrer l\'exemple', outcome: [
        { probability: 0.8, narrative: 'Votre abnégation motive les autres.', effects: [{text: '+15 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+15)}) },
        { probability: 0.2, narrative: 'Vous vous blessez d\'épuisement.', effects: [{text: '-20 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-20)}) }
      ] },
      { typeTag: 'Silence', text: 'Laisser le coach gérer', outcome: { narrative: 'Chacun son rôle.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_12', category: 'LIFESTYLE', tag: 'Scandale', targetPosition: 'ALL', condition: (p) => p.age >= 22 && p.age <= 29,
    description: "Un chantage: quelqu'un menace de publier des messages privés compromettants de vous.",
    options: [
      { typeTag: 'Payer', text: 'Verser la somme demandée', outcome: [
        { probability: 0.3, narrative: 'Le maître chanteur disparaît.', effects: [{text: '-50k €', style: 'negative'}, {text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-10)}) },
        { probability: 0.7, narrative: 'Il revient demander encore plus.', effects: [{text: '-50k €', style: 'negative'}, {text: '-30 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-50000), morale: Math.max(0, p.morale-30)}) }
      ] },
      { typeTag: 'Police', text: 'Dénoncer le chantage à la police et au club', outcome: [
        { probability: 0.8, narrative: 'L\'affaire est gérée par des pros. Soulagement.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.2, narrative: 'Les messages fuitent pendant l\'enquête. Scandale.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Ignorer', text: 'Publier les messages vous-même pour couper l\'herbe sous le pied', outcome: { narrative: 'La technique Eminem. Brillant mais gênant.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '-5 Confiance', style: 'negative'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10), coachTrust: Math.max(0, p.coachTrust-5)}) } }
    ]
  },
  {
    id: 'extra_13', category: 'MATCH', tag: 'Blessure', targetPosition: 'ALL', condition: (p) => p.age >= 22 && p.age <= 29,
    description: "Vous revenez d'une longue blessure, et le premier tacle du match est ultra violent.",
    options: [
      { typeTag: 'Rage', text: 'Se relever et découper l\'adversaire', outcome: [
        { probability: 0.2, narrative: 'Vous imposez le respect physique. Le public rugit.', effects: [{text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.8, narrative: 'Carton rouge direct !', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Peur', text: 'Jouer le reste du match sans aller au contact', outcome: [
        { probability: 0.9, narrative: 'Vous évitez la rechute, mais faites un match fantôme.', effects: [{text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-15)}) },
        { probability: 0.1, narrative: 'Le coach est furieux de votre peur.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Intelligent', text: 'Donner la balle plus vite pour éviter les coups', outcome: { narrative: 'Vous adaptez votre jeu avec classe.', effects: [{text: '+10 Forme', style: 'positive'}, {text: '+5 Confiance', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10), coachTrust: Math.min(100, p.coachTrust+5)}) } }
    ]
  },
  {
    id: 'extra_14', category: 'ENTRAÎNEMENT', tag: 'Physique', targetPosition: 'ALL', condition: (p) => p.age >= 30,
    description: "Les tests physiques de pré-saison montrent que vous avez perdu en vitesse pure.",
    options: [
      { typeTag: 'Déni', text: 'Forcer pour prouver le contraire', outcome: [
        { probability: p => p.attributes?.physical || 50, narrative: 'Vous claquez un sprint incroyable. Respect.', effects: [{text: '+20 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+20)}) },
        { probability: p => 100 - (p.attributes?.physical || 50), narrative: 'Déchirure musculaire immédiate.', effects: [{text: '-30 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Adaptation', text: 'Travailler le placement et la vision de jeu', outcome: [
        { probability: 0.9, narrative: 'Vous devenez le cerveau de l\'équipe.', effects: [{text: '+15 Confiance', style: 'positive'}, {text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15), morale: Math.min(100, p.morale+10)}) },
        { probability: 0.1, narrative: 'C\'est dur d\'accepter de vieillir.', effects: [{text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Diète', text: 'Engager un nutritionniste pour perdre du poids', outcome: { narrative: 'Vous perdez 3kg et retrouvez du peps.', effects: [{text: '+15 Forme', style: 'positive'}, {text: '-5k €', style: 'negative'}], applyStats: p => ({...p, form: Math.min(100, p.form+15), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) } }
    ]
  },
  {
    id: 'extra_15', category: 'CARRIÈRE', tag: 'Reconversion', targetPosition: 'ALL', condition: (p) => p.age >= 32,
    description: "Le club vous propose d'intégrer le staff technique à la fin de la saison, en jouant moins cette année.",
    options: [
      { typeTag: 'Joueur', text: 'Refuser, vous voulez jouer tous les matchs', outcome: [
        { probability: 0.5, narrative: 'Vous prouvez que vous avez encore le niveau !', effects: [{text: '+20 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+20)}) },
        { probability: 0.5, narrative: 'Le club ne vous prolonge pas.', effects: [{text: '-25 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Staff', text: 'Accepter de jouer les mentors sur le banc', outcome: [
        { probability: 0.8, narrative: 'Vous préparez sereinement votre avenir.', effects: [{text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.2, narrative: 'L\'adrénaline du terrain vous manque trop.', effects: [{text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Négocier', text: 'Demander un rôle de joueur-entraîneur', outcome: { narrative: 'Grosse responsabilité, mais passionnant.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '-5 Forme', style: 'negative'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10), form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_16', category: 'ENTRAÎNEMENT', tag: 'Mentor', targetPosition: 'ALL', condition: (p) => p.age >= 30,
    description: "Un jeune de 17 ans au même poste que vous a un talent fou mais une hygiène de vie déplorable.",
    options: [
      { typeTag: 'Grand-frère', text: 'L\'inviter vivre chez vous pour le cadrer', outcome: [
        { probability: 0.4, narrative: 'Il devient une star et vous remercie publiquement.', effects: [{text: '+30 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.6, narrative: 'Il saccage votre maison lors d\'une fête.', effects: [{text: '-20k €', style: 'negative'}, {text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-20000), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Strict', text: 'Le détruire à l\'entraînement pour le réveiller', outcome: [
        { probability: 0.7, narrative: 'Électrochoc, il se met au travail.', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.3, narrative: 'Il craque et part en dépression.', effects: [{text: '-25 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Pro', text: 'Lui conseiller un diététicien et s\'en laver les mains', outcome: { narrative: 'Minimum syndical de vétéran.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_17', category: 'MATCH', tag: 'Déclin', targetPosition: 'ALL', condition: (p) => p.age >= 32 && p.ovr > 75,
    description: "En plein sprint, un jeune défenseur de 19 ans vous dépose littéralement et vous prend le ballon.",
    options: [
      { typeTag: 'Faute', text: 'Faire faute tactique quitte à prendre un jaune', outcome: [
        { probability: 0.8, narrative: 'Faute intelligente, l\'équipe se replace.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.2, narrative: 'Rouge direct ! Vous étiez le dernier défenseur.', effects: [{text: '-30 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-30)}) }
      ] },
      { typeTag: 'Effort', text: 'Sprinter jusqu\'à l\'épuisement pour le rattraper', outcome: [
        { probability: 0.3, narrative: 'Vous le taclez à la régulière ! Quel cœur !', effects: [{text: '+20 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+20)}) },
        { probability: 0.7, narrative: 'Claquage. Fin du match.', effects: [{text: '-40 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-40)}) }
      ] },
      { typeTag: 'Lucide', text: 'Ralentir et couvrir la zone axiale', outcome: { narrative: 'L\'expérience parle, vous limitez la casse.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_18', category: 'LIFESTYLE', tag: 'Sponsoring', targetPosition: 'ALL', condition: (p) => p.ovr >= 85,
    description: "Une marque de soda veut vous signer pour 2 millions d'euros, mais exige que vous en buviez sur le banc.",
    options: [
      { typeTag: 'Cash', text: 'Signer et boire', outcome: [
        { probability: 0.5, narrative: 'L\'argent rentre à flot !', effects: [{text: '+2M €', style: 'positive'}, {text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+2000000, form: Math.max(0, p.form-15)}) },
        { probability: 0.5, narrative: 'Le club interdit ce sponsoring. Annulation.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Cristiano', text: 'Déplacer la bouteille en conf de presse pour promouvoir l\'eau', outcome: [
        { probability: 0.8, narrative: 'Geste iconique, les fans adorent !', effects: [{text: '+30 Moral', style: 'positive'}, {text: '+15 Forme', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30), form: Math.min(100, p.form+15)}) },
        { probability: 0.2, narrative: 'Procès de la marque. Perte de temps.', effects: [{text: '-10k €', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-10000)}) }
      ] },
      { typeTag: 'Tricheur', text: 'Signer mais mettre de l\'eau dans la bouteille de soda', outcome: { narrative: 'Ingénieux et rentable.', effects: [{text: '+500k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+500000}) } }
    ]
  },
  {
    id: 'extra_19', category: 'CARRIÈRE', tag: 'Diva', targetPosition: 'ALL', condition: (p) => p.ovr >= 85,
    description: "L'entraîneur ose vous remplacer à la 60ème minute d'un match important alors que vous n'êtes pas blessé.",
    options: [
      { typeTag: 'Furie', text: 'Frapper dans les bouteilles et l\'ignorer', outcome: [
        { probability: 0.2, narrative: 'Le public scande votre nom. Vous êtes le boss.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.8, narrative: 'Suspension d\'un match par le club.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Classe', text: 'Taper dans sa main et encourager le remplaçant', outcome: [
        { probability: 0.9, narrative: 'L\'image d\'un grand champion.', effects: [{text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.1, narrative: 'Votre ego en prend quand même un coup.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Direct', text: 'Aller directement au vestiaire prendre une douche', outcome: { narrative: 'Comportement d\'enfant gâté.', effects: [{text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-15)}) } }
    ]
  },
  {
    id: 'extra_20', category: 'CARRIÈRE', tag: 'Ballon d\'Or', targetPosition: 'ALL', condition: (p) => p.ovr >= 88,
    description: "Vous finissez 2ème au Ballon d'Or de manière jugée injuste par beaucoup d'observateurs.",
    options: [
      { typeTag: 'Rage', text: 'Boycotter la cérémonie', outcome: [
        { probability: 0.3, narrative: 'Les fans valident la rébellion.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.7, narrative: 'L\'opinion publique trouve que vous manquez de classe.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Fair-play', text: 'Applaudir au premier rang et féliciter le vainqueur', outcome: [
        { probability: 0.9, narrative: 'Une attitude légendaire.', effects: [{text: '+25 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.1, narrative: 'Vous pleurez dans les toilettes.', effects: [{text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Revanche', text: 'Poster "On verra la saison prochaine" sur Instagram', outcome: { narrative: 'Le rendez-vous est pris.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_21', category: 'CARRIÈRE', tag: 'Temps de jeu', targetPosition: 'ALL', condition: (p) => p.ovr <= 72,
    description: "Vous cirez le banc depuis des mois. Le moral est au plus bas.",
    options: [
      { typeTag: 'Bagarre', text: 'Taper à la porte du coach et exiger du temps de jeu', outcome: [
        { probability: 0.2, narrative: 'Il vous fait entrer le match suivant !', effects: [{text: '+30 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+30)}) },
        { probability: 0.8, narrative: 'Il vous envoie en équipe réserve.', effects: [{text: '-30 Confiance', style: 'negative'}, {text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-30), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Travail', text: 'Être le premier et le dernier à l\'entraînement', outcome: [
        { probability: 0.7, narrative: 'Vos efforts finissent par payer.', effects: [{text: '+20 Forme', style: 'positive'}, {text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+20), coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.3, narrative: 'Aucun changement. Épuisement vain.', effects: [{text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Fuite', text: 'Demander un prêt ou transfert publiquement', outcome: { narrative: 'La rupture est proche.', effects: [{text: '-20 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-20)}) } }
    ]
  },
  {
    id: 'extra_22', category: 'ENTRAÎNEMENT', tag: 'Changement', targetPosition: 'ALL', condition: (p) => p.ovr <= 72,
    description: "L'équipe B a besoin de vous pour un match amical sous la pluie contre des bûcherons.",
    options: [
      { typeTag: 'Pro', text: 'Jouer le jeu à 100%', outcome: [
        { probability: 0.5, narrative: 'Vous marquez et le coach de la première voit la vidéo.', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.5, narrative: 'Tacle assassin, vous finissez blessé.', effects: [{text: '-30 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-30)}) }
      ] },
      { typeTag: 'Starlette', text: 'Simuler une maladie', outcome: [
        { probability: 0.6, narrative: 'Vous restez au chaud. Risque évité.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) },
        { probability: 0.4, narrative: 'Découvert. Le club vous inflige une amende.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-5k €', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-20), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) }
      ] },
      { typeTag: 'Fantôme', text: 'Jouer sans forcer', outcome: { narrative: 'Match inutile.', effects: [{text: '-5 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-5)}) } }
    ]
  },
  {
    id: 'extra_23', category: 'MATCH', tag: 'Bourde', targetPosition: 'GK', condition: () => true,
    description: "Vous faites une énorme boulette (balle glissante) qui coûte un but en Ligue des Champions.",
    options: [
      { typeTag: 'Mental', text: 'Continuer à relancer court pour montrer votre sang-froid', outcome: [
        { probability: 0.4, narrative: 'Vous faites un arrêt miracle ensuite. Rachat total !', effects: [{text: '+25 Moral', style: 'positive'}, {text: '+10 Confiance', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+25), coachTrust: Math.min(100, p.coachTrust+10)}) },
        { probability: 0.6, narrative: 'Vous tremblez et ratez une autre passe.', effects: [{text: '-40 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-40)}) }
      ] },
      { typeTag: 'Sécurité', text: 'Dégager loin à chaque fois ensuite', outcome: [
        { probability: 0.8, narrative: 'Le reste du match est rassurant.', effects: [{text: '+5 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+5)}) },
        { probability: 0.2, narrative: 'Le coach déteste perdre la possession.', effects: [{text: '-10 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Dépression', text: 'Regarder le gazon', outcome: { narrative: 'Vous perdez toute votre confiance.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) } }
    ]
  },
  {
    id: 'extra_24', category: 'ENTRAÎNEMENT', tag: 'Penalties', targetPosition: 'GK', condition: () => true,
    description: "Fin d'entraînement, le meilleur attaquant du monde veut faire des pénos avec vous.",
    options: [
      { typeTag: 'Pari', text: 'Parier 1000€ par arrêt', outcome: [
        { probability: 0.5, narrative: 'Vous l\'écœurez ! Jackpot et grosse confiance.', effects: [{text: '+5k €', style: 'positive'}, {text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+5000, morale: Math.min(100, p.morale+20)}) },
        { probability: 0.5, narrative: 'Il vous allume. Vous perdez de l\'argent.', effects: [{text: '-5k €', style: 'negative'}, {text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-5000), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Pro', text: 'S\'entraîner sérieusement sans pari', outcome: [
        { probability: 0.9, narrative: 'Excellente séance de réflexes.', effects: [{text: '+15 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+15)}) },
        { probability: 0.1, narrative: 'Vous plongez mal et vous tordez le poignet.', effects: [{text: '-15 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-15)}) }
      ] },
      { typeTag: 'Refus', text: 'Rentrer aux vestiaires', outcome: { narrative: 'Il vous traite de poule mouillée.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) } }
    ]
  },
  {
    id: 'extra_25', category: 'MATCH', tag: 'Duel', targetPosition: 'CB', condition: () => true,
    description: "Un attaquant très rapide et provocateur ne cesse de vous chercher des poux.",
    options: [
      { typeTag: 'Boucher', text: 'Le tacler violemment dès la première touche', outcome: [
        { probability: 0.3, narrative: 'Il a peur et disparaît du match.', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) },
        { probability: 0.7, narrative: 'Carton rouge.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Cerveau', text: 'Le prendre au piège du hors-jeu', outcome: [
        { probability: 0.8, narrative: 'Lecture du jeu parfaite !', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.2, narrative: 'Mauvais alignement, il part marquer.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Pancarte', text: 'L\'insulter discrètement', outcome: { narrative: 'Il s\'énerve et prend un rouge.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_26', category: 'MATCH', tag: 'Sacrifice', targetPosition: 'DEF', condition: () => true,
    description: "Le ballon se dirige vers le but vide, il faut un tacle glissé désespéré sur le poteau.",
    options: [
      { typeTag: 'Kamikaze', text: 'Tout donner quitte à s\'encastrer dans le poteau', outcome: [
        { probability: 0.6, narrative: 'Sauvetage sur la ligne ! Le stade explose !', effects: [{text: '+30 Moral', style: 'positive'}, {text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30), coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.4, narrative: 'Sauvetage mais côtes cassées contre le poteau.', effects: [{text: '-40 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-40)}) }
      ] },
      { typeTag: 'Raison', text: 'Laisser marquer pour éviter la blessure', outcome: [
        { probability: 0.8, narrative: 'L\'équipe encaisse le but, la défaite fait mal.', effects: [{text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-15)}) },
        { probability: 0.2, narrative: 'Le coach vous accuse de manque d\'engagement.', effects: [{text: '-20 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-20)}) }
      ] },
      { typeTag: 'Main', text: 'Arrêter le ballon de la main (Suarez 2010)', outcome: { narrative: 'Rouge, mais espoir sur pénalty.', effects: [{text: '-10 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-10)}) } }
    ]
  },
  {
    id: 'extra_27', category: 'MATCH', tag: 'Coup Franc', targetPosition: 'MID', condition: () => true,
    description: "Coup franc à la 90ème à 25 mètres. L'attaquant star veut le tirer mais c'est pour vous.",
    options: [
      { typeTag: 'Boss', text: 'Prendre le ballon et tirer', outcome: [
        { probability: 0.3, narrative: 'Lucarne ! Vous êtes le roi !', effects: [{text: '+30 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.7, narrative: 'Dans le mur. La star vous pourrit.', effects: [{text: '-20 Moral', style: 'negative'}, {text: '-10 Confiance', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20), coachTrust: Math.max(0, p.coachTrust-10)}) }
      ] },
      { typeTag: 'Soumis', text: 'Le laisser tirer', outcome: [
        { probability: 0.5, narrative: 'Il marque et vous remercie.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) },
        { probability: 0.5, narrative: 'Il rate. Vous auriez dû le prendre.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Combinaison', text: 'Proposer une combinaison feinte', outcome: { narrative: 'Ça marche et vous faites une passe dé !', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_28', category: 'MATCH', tag: 'Vision', targetPosition: 'CM', condition: () => true,
    description: "Vous voyez une passe de 40 mètres ultra risquée mais qui peut casser 2 lignes.",
    options: [
      { typeTag: 'Pirlo', text: 'Tenter la transversale parfaite', outcome: [
        { probability: p => (p.attributes?.passing || 50) * (p.form / 100), narrative: 'Passe décisive somptueuse.', effects: [{text: '+20 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+20)}) },
        { probability: p => 100 - ((p.attributes?.passing || 50) * (p.form / 100)), narrative: 'Interception et contre-attaque mortelle.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Propre', text: 'Jouer latéral', outcome: [
        { probability: 0.9, narrative: 'Conservation de balle. Le coach apprécie.', effects: [{text: '+5 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+5)}) },
        { probability: 0.1, narrative: 'Le public siffle ce manque d\'ambition.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Dribble', text: 'Porter la balle vous-même', outcome: { narrative: 'Vous obtenez une bonne faute.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) } }
    ]
  },
  {
    id: 'extra_29', category: 'MATCH', tag: 'Disette', targetPosition: 'ST', condition: () => true,
    description: "Vous n'avez pas marqué depuis 5 matchs. Le doute s'installe.",
    options: [
      { typeTag: 'Égoïste', text: 'Tirer dans toutes les positions', outcome: [
        { probability: 0.3, narrative: 'Ça finit par rentrer ! Délivrance.', effects: [{text: '+25 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+25)}) },
        { probability: 0.7, narrative: 'Vous croquez tout et énervez vos coéquipiers.', effects: [{text: '-30 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-30), coachTrust: Math.max(0, p.coachTrust-15)}) }
      ] },
      { typeTag: 'Altruiste', text: 'Jouer pour les autres et faire des passes', outcome: [
        { probability: 0.8, narrative: 'Super match, 2 passes dé ! La confiance revient autrement.', effects: [{text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: 0.2, narrative: 'Vous perdez votre instinct de buteur.', effects: [{text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Fétiche', text: 'Mettre vos crampons porte-bonheur usés', outcome: { narrative: 'Un vieux grigri qui marche !', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_30', category: 'MATCH', tag: 'Face à Face', targetPosition: 'ATT', condition: () => true,
    description: "90ème minute, finale. Face à face avec le gardien.",
    options: [
      { typeTag: 'Panenka', text: 'Faire une pichenette insolente', outcome: [
        { probability: p => (p.attributes?.finishing || 50) * (p.morale / 100) * 0.5, narrative: 'But légendaire. Le monde entier en parle !', effects: [{text: '+50 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+50)}) },
        { probability: p => 100 - ((p.attributes?.finishing || 50) * (p.morale / 100) * 0.5), narrative: 'Le gardien la capte facilement. Carrière ruinée.', effects: [{text: '-50 Moral', style: 'negative'}, {text: '-50 Confiance', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-50), coachTrust: Math.max(0, p.coachTrust-50)}) }
      ] },
      { typeTag: 'Force', text: 'Frapper fort coup de pied', outcome: [
        { probability: p => (p.attributes?.finishing || 50) + (p.attributes?.physical || 50), narrative: 'Sous la barre ! Victoire !', effects: [{text: '+30 Moral', style: 'positive'}, {text: '+20 Confiance', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30), coachTrust: Math.min(100, p.coachTrust+20)}) },
        { probability: p => 200 - ((p.attributes?.finishing || 50) + (p.attributes?.physical || 50)), narrative: 'Dans les nuages...', effects: [{text: '-25 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Dribble', text: 'Essayer de dribbler le gardien', outcome: { narrative: 'Penalty provoqué !', effects: [{text: '+15 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+15)}) } }
    ]
  },
  {
    id: 'extra_31', category: 'LIFESTYLE', tag: 'Investissement', targetPosition: 'ALL', condition: (p) => p.bankBalance > 1000000,
    description: "Un ami vous propose d'ouvrir une chaîne de restaurants.",
    options: [
      { typeTag: 'Franchise', text: 'Investir 500k €', outcome: [
        { probability: 0.4, narrative: 'Succès fulgurant ! Rentes assurées.', effects: [{text: '+1M €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+1000000}) },
        { probability: 0.6, narrative: 'Faillite en 6 mois.', effects: [{text: '-500k €', style: 'negative'}, {text: '-10 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-500000), morale: Math.max(0, p.morale-10)}) }
      ] },
      { typeTag: 'Petit', text: 'Investir juste 50k €', outcome: [
        { probability: 0.8, narrative: 'L\'affaire tourne correctement.', effects: [{text: '+20k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+20000}) },
        { probability: 0.2, narrative: 'Vous perdez votre mise.', effects: [{text: '-50k €', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-50000)}) }
      ] },
      { typeTag: 'Non', text: 'Refuser', outcome: { narrative: 'Votre banquier est content.', effects: [{text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_32', category: 'LIFESTYLE', tag: 'Charité', targetPosition: 'ALL', condition: (p) => p.bankBalance > 5000000,
    description: "Une association vous demande de financer un hôpital pour enfants.",
    options: [
      { typeTag: 'Mécène', text: 'Faire un don d\'1 million d\'euros', outcome: [
        { probability: 0.9, narrative: 'Geste héroïque. Votre image est légendaire.', effects: [{text: '-1M €', style: 'negative'}, {text: '+40 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-1000000), morale: Math.min(100, p.morale+40)}) },
        { probability: 0.1, narrative: 'L\'association est impliquée dans un scandale financier.', effects: [{text: '-1M €', style: 'negative'}, {text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-1000000), morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Visite', text: 'Donner 100k € et passer la journée avec les enfants', outcome: [
        { probability: 1.0, narrative: 'Une journée bouleversante qui remet les idées en place.', effects: [{text: '-100k €', style: 'negative'}, {text: '+25 Moral', style: 'positive'}], applyStats: p => ({...p, bankBalance: Math.max(0, (p.bankBalance||0)-100000), morale: Math.min(100, p.morale+25)}) }
      ] },
      { typeTag: 'Gala', text: 'Organiser un match caritatif sans rien payer de votre poche', outcome: { narrative: 'Bon succès, belle image.', effects: [{text: '+10 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+10)}) } }
    ]
  },
  {
    id: 'extra_33', category: 'LIFESTYLE', tag: 'Factures', targetPosition: 'ALL', condition: (p) => p.bankBalance < 100000,
    description: "Vous avez du mal à payer vos impôts cette année.",
    options: [
      { typeTag: 'Agent', text: 'Demander une avance au club', outcome: [
        { probability: 0.6, narrative: 'Le club accepte mais vous met la pression.', effects: [{text: '+50k €', style: 'positive'}, {text: '-10 Confiance', style: 'negative'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+50000, coachTrust: Math.max(0, p.coachTrust-10)}) },
        { probability: 0.4, narrative: 'Le club refuse sèchement.', effects: [{text: '-20 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-20)}) }
      ] },
      { typeTag: 'Sponsor', text: 'Faire une pub ridicule pour un fast-food local', outcome: [
        { probability: 1.0, narrative: 'Ça paye les factures, mais c\'est humiliant.', effects: [{text: '+40k €', style: 'positive'}, {text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+40000, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Vente', text: 'Revendre votre belle voiture', outcome: { narrative: 'Une leçon d\'humilité.', effects: [{text: '+30k €', style: 'positive'}, {text: '+5 Forme', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+30000, form: Math.min(100, p.form+5)}) } }
    ]
  },
  {
    id: 'extra_34', category: 'CARRIÈRE', tag: 'Prime', targetPosition: 'ALL', condition: (p) => p.bankBalance < 50000,
    description: "Le club a oublié de vous verser votre prime de match.",
    options: [
      { typeTag: 'Bureau', text: 'Entrer en furie dans le bureau du président', outcome: [
        { probability: 0.2, narrative: 'Il s\'excuse et vous paye double !', effects: [{text: '+20k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+20000}) },
        { probability: 0.8, narrative: 'Il vous prend pour un mercenaire. Relation brisée.', effects: [{text: '-25 Confiance', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-25)}) }
      ] },
      { typeTag: 'Doux', text: 'Envoyer un mail poli', outcome: [
        { probability: 0.9, narrative: 'L\'erreur est réparée rapidement.', effects: [{text: '+10k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+10000}) },
        { probability: 0.1, narrative: 'Le mail est ignoré.', effects: [{text: '-5 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-5)}) }
      ] },
      { typeTag: 'Attente', text: 'Ne rien dire', outcome: { narrative: 'Ils finissent par s\'en rendre compte un mois plus tard.', effects: [{text: '+10k €', style: 'positive'}], applyStats: p => ({...p, bankBalance: (p.bankBalance||0)+10000}) } }
    ]
  },
  {
    id: 'extra_35', category: 'ENTRAÎNEMENT', tag: 'Vidéo', targetPosition: 'ALL', condition: () => true,
    description: "Séance d'analyse vidéo très ennuyeuse de 3 heures.",
    options: [
      { typeTag: 'Sieste', text: 'Dormir discrètement au fond', outcome: [
        { probability: 0.3, narrative: 'Personne ne le voit. Vous êtes reposé.', effects: [{text: '+15 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+15)}) },
        { probability: 0.7, narrative: 'Le coach vous surprend. Honte et amende.', effects: [{text: '-20 Confiance', style: 'negative'}, {text: '-5k €', style: 'negative'}], applyStats: p => ({...p, coachTrust: Math.max(0, p.coachTrust-20), bankBalance: Math.max(0, (p.bankBalance||0)-5000)}) }
      ] },
      { typeTag: 'Nerd', text: 'Prendre des notes intensives', outcome: [
        { probability: 0.8, narrative: 'Vous comprenez mieux la tactique.', effects: [{text: '+15 Confiance', style: 'positive'}], applyStats: p => ({...p, coachTrust: Math.min(100, p.coachTrust+15)}) },
        { probability: 0.2, narrative: 'Vous sur-analysez et perdez votre instinct au match suivant.', effects: [{text: '-10 Forme', style: 'negative'}], applyStats: p => ({...p, form: Math.max(0, p.form-10)}) }
      ] },
      { typeTag: 'Smartphone', text: 'Faire semblant d\'écouter en scrollant', outcome: { narrative: 'Le temps passe plus vite.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+5)}) } }
    ]
  },
  {
    id: 'extra_36', category: 'MATCH', tag: 'Derby', targetPosition: 'ALL', condition: () => true,
    description: "Le derby de la ville approche, l'ambiance est électrique en ville.",
    options: [
      { typeTag: 'Guerrier', text: 'Promettre la guerre dans les médias', outcome: [
        { probability: 0.5, narrative: 'Vous transcendez l\'équipe et gagnez !', effects: [{text: '+30 Moral', style: 'positive'}], applyStats: p => ({...p, morale: Math.min(100, p.morale+30)}) },
        { probability: 0.5, narrative: 'Vous prenez trop de pression et ratez votre match.', effects: [{text: '-25 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-25)}) }
      ] },
      { typeTag: 'Calme', text: 'Dire que c\'est un match de foot à 3 points, rien de plus', outcome: [
        { probability: 0.7, narrative: 'La zen attitude paye, victoire clinique.', effects: [{text: '+10 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+10)}) },
        { probability: 0.3, narrative: 'Les ultras vous accusent de ne pas respecter l\'institution.', effects: [{text: '-15 Moral', style: 'negative'}], applyStats: p => ({...p, morale: Math.max(0, p.morale-15)}) }
      ] },
      { typeTag: 'Isolement', text: 'Se mettre au vert', outcome: { narrative: 'Excellente préparation invisible.', effects: [{text: '+15 Forme', style: 'positive'}], applyStats: p => ({...p, form: Math.min(100, p.form+15)}) } }
    ]
  }
];
