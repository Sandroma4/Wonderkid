export const COOP_EVENTS = [
  {
    id: 'coop_1', category: 'FRÈRES D\'ARMES', tag: 'Penalty', targetPosition: 'ALL', condition: () => true,
    description: "En plein match décisif, l'arbitre siffle un penalty. Vous êtes le tireur désigné, mais votre coéquipier s'empare du ballon.",
    options: [
      { typeTag: 'Égoïste', text: 'Lui arracher le ballon et tirer', outcome: [
        { probability: 0.5, narrative: 'Vous marquez, mais la tension est palpable.', effects: [{text: '+3 Tir', style: 'positive'}], applyStats: (p) => ({...p, attributes: { ...p.attributes, finishing: Math.min(99, (p.attributes?.finishing || 50) + 3) } }), coopEffect: { narrative: "Votre coéquipier vous a arraché le ballon des mains pour tirer le penalty...", stats: { morale: -20, form: -5 } } },
        { probability: 0.5, narrative: 'Vous ratez. Il vous fusille du regard.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '-15 Confiance', style: 'negative'}], applyStats: (p) => ({...p, morale: Math.max(0, p.morale-15), coachTrust: Math.max(0, p.coachTrust-15) }), coopEffect: { narrative: "Votre coéquipier vous a pris le ballon pour tirer... et a raté ! La honte.", stats: { morale: +10 } } }
      ] },
      { typeTag: 'Altruiste', text: 'Le laisser tirer', outcome: { narrative: 'Il marque et vient vous enlacer. Magnifique image.', effects: [{text: '+10 Moral', style: 'positive'}, {text: '+1 Passe', style: 'positive'}], applyStats: (p) => ({...p, attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) }, morale: Math.min(100, p.morale+10) }), coopEffect: { narrative: "Votre coéquipier vous a généreusement laissé tirer le penalty ! Quel altruisme !", stats: { morale: +20, form: +5 } } } },
      { typeTag: 'Leader', text: 'Discuter calmement', outcome: { narrative: 'Le coach intervient et tranche. Le calme revient.', effects: [{text: '+10 Confiance', style: 'positive'}], applyStats: (p) => ({...p, coachTrust: Math.min(100, p.coachTrust+10) }), coopEffect: { narrative: "Votre coéquipier a su garder son sang-froid et calmer le jeu autour du penalty.", stats: { coachTrust: +10 } } } }
    ]
  },
  {
    id: 'coop_2', category: 'FRÈRES D\'ARMES', tag: 'Transfert', targetPosition: 'ALL', condition: () => true,
    description: "Un agent influent vous approche : un top club vous veut, mais exige que vous 'lâchiez' votre coéquipier qu'il trouve surcoté.",
    options: [
      { typeTag: 'Fidélité', text: 'Refuser catégoriquement', outcome: { narrative: 'L\'agent part furieux, mais vous restez fidèles à vos principes.', effects: [{text: '+20 Réputation', style: 'positive'}, {text: '-500k €', style: 'negative'}], applyStats: (p) => ({...p, followers: p.followers + 100000 }), bankDelta: -500000, coopEffect: { narrative: "Votre coéquipier a refusé un contrat en or pour ne pas vous trahir. Quelle loyauté !", stats: { morale: +30, form: +10 } } } },
      { typeTag: 'Ambition', text: 'Accepter le deal en secret', outcome: { narrative: 'Vos finances explosent, mais un sentiment de culpabilité vous ronge.', effects: [{text: '+2M €', style: 'positive'}, {text: '-15 Moral', style: 'negative'}], applyStats: (p) => ({...p, morale: Math.max(0, p.morale-15) }), bankDelta: 2000000, coopEffect: { narrative: "Vous apprenez dans la presse que votre coéquipier a accepté un deal en vous dénigrant...", stats: { morale: -40, coachTrust: -15 } } } }
    ]
  },
  {
    id: 'coop_3', category: 'FRÈRES D\'ARMES', tag: 'VIP', targetPosition: 'ALL', condition: () => true,
    description: "La veille d'un match important, votre coéquipier vous invite à une soirée VIP très privée.",
    options: [
      { typeTag: 'Fêtard', text: 'Accepter et y aller à fond', outcome: { narrative: 'Soirée inoubliable ! Le lendemain sur le terrain, c\'est plus dur...', effects: [{text: '+25 Moral', style: 'positive'}, {text: '-20 Forme', style: 'negative'}], applyStats: (p) => ({...p, morale: Math.min(100, p.morale+25), form: Math.max(0, p.form-20) }), coopEffect: { narrative: "Votre coéquipier a fait la fête avec vous toute la nuit ! (+ Moral, - Forme)", stats: { morale: +25, form: -20 } } } },
      { typeTag: 'Pro', text: 'Refuser et l\'obliger à rester dormir', outcome: { narrative: 'Il râle mais vous écoute. Vous êtes en pleine forme.', effects: [{text: '+15 Forme', style: 'positive'}, {text: '-10 Moral', style: 'negative'}], applyStats: (p) => ({...p, form: Math.min(100, p.form+15), morale: Math.max(0, p.morale-10) }), coopEffect: { narrative: "Votre coéquipier vous a forcé à rester dormir au lieu d'aller en soirée. Rabat-joie...", stats: { form: +15, morale: -15 } } } },
      { typeTag: 'Compromis', text: 'Y aller juste une heure', outcome: { narrative: 'Vous marquez le coup sans trop forcer. Parfait.', effects: [{text: '+5 Moral', style: 'positive'}], applyStats: (p) => ({...p, morale: Math.min(100, p.morale+5) }), coopEffect: { narrative: "Votre coéquipier est venu à la soirée mais vous a ramené tôt. Un bon compromis.", stats: { morale: +10 } } } }
    ]
  },
  {
    id: 'coop_4', category: 'FRÈRES D\'ARMES', tag: 'Presse', targetPosition: 'ALL', condition: () => true,
    description: "Après une mauvaise passe, la presse détruit publiquement votre coéquipier. On vous demande votre avis.",
    options: [
      { typeTag: 'Bouclier', text: 'Prendre toute la responsabilité', outcome: { narrative: 'Les journalistes se retournent contre vous, mais le coach apprécie.', effects: [{text: '-15 Moral', style: 'negative'}, {text: '+20 Confiance', style: 'positive'}], applyStats: (p) => ({...p, morale: Math.max(0, p.morale-15), coachTrust: Math.min(100, p.coachTrust+20) }), coopEffect: { narrative: "Votre coéquipier a pris toutes les critiques de la presse sur lui pour vous protéger !", stats: { morale: +35 } } } },
      { typeTag: 'Neutre', text: 'Sortir une phrase générique', outcome: { narrative: 'Vous bottez en touche. La presse insiste ailleurs.', effects: [{text: '+0', style: 'neutral'}], applyStats: (p) => p, coopEffect: { narrative: "Votre coéquipier n'a pas pris parti face à la presse.", stats: { } } } },
      { typeTag: 'Trahison', text: 'Sous-entendre qu\'il doit faire mieux', outcome: { narrative: 'La pression s\'envole pour vous, mais votre relation en prend un coup.', effects: [{text: '+20 Forme', style: 'positive'}, {text: '+15 Moral', style: 'positive'}], applyStats: (p) => ({...p, form: Math.min(100, p.form+20), morale: Math.min(100, p.morale+15) }), coopEffect: { narrative: "Votre coéquipier vous a publiquement jeté sous le bus devant la presse...", stats: { morale: -40, form: -10 } } } }
    ]
  }
];
