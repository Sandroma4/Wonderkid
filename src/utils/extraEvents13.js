export const EXTRA_EVENTS_13 = [
  {
    id: 'pass_masterclass_training',
    category: 'ENTRAÎNEMENT',
    tag: 'Vision de Jeu 👁️',
    targetPosition: 'ALL',
    condition: (p) => p.age > 16,
    description: "Le coach a organisé un atelier spécifique sur la vision périphérique et la qualité de passe sous pression. Comment abordez-vous la séance ?",
    options: [
      {
        typeTag: 'RISQUE',
        text: 'Tenter des passes cassant les lignes à chaque occasion',
        outcome: {
          successProbability: 60,
          narrative: 'Vos ouvertures tranchantes déstabilisent la défense. Le coach est impressionné par votre audace !',
          successEffects: [{ text: '+3 Passe', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }],
          applySuccess: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } }),
          failNarrative: 'Trop de déchet. Vos passes interceptées agacent le coach qui vous demande de jouer plus simple.',
          failEffects: [{ text: '-15 Confiance', style: 'negative' }, { text: '+1 Passe', style: 'positive' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
        }
      },
      {
        typeTag: 'SÉCURITÉ',
        text: 'Assurer la possession avec du jeu court et précis',
        outcome: {
          narrative: 'Vous dictez le tempo avec justesse. Pas d\'éclat, mais une fiabilité appréciée.',
          effects: [{ text: '+1 Passe', style: 'positive' }, { text: '+10 Forme', style: 'positive' }],
          applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
        }
      },
      {
        typeTag: 'TRAVAIL DE L\'OMBRE',
        text: 'Étudier les vidéos des plus grands meneurs de jeu',
        outcome: {
          narrative: 'L\'analyse tactique vous donne une nouvelle perspective sur le placement de vos coéquipiers.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '-5 Forme (Fatigue)', style: 'negative' }],
          applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 5), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      }
    ]
  },
  {
    id: 'pass_media_criticism',
    category: 'MÉDIAS',
    tag: 'Critique Tactique 📰',
    targetPosition: 'ALL',
    condition: (p) => p.ovr > 60 && (p.attributes?.passing || 50) < 70,
    description: "Un consultant célèbre critique votre style de jeu : « Il a du talent, mais il oublie trop souvent ses partenaires. Il doit lever la tête ! »",
    options: [
      {
        typeTag: 'RÉPONSE SUR LE TERRAIN',
        text: 'Prendre la critique à cœur et forcer son jeu de passe',
        outcome: {
          successProbability: 50,
          narrative: 'Le déclic ! Vous distribuez caviars sur caviars et faites taire les critiques.',
          successEffects: [{ text: '+4 Passe', style: 'positive' }, { text: '+15 Moral', style: 'positive' }],
          applySuccess: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 4) } }),
          failNarrative: 'À trop vouloir prouver, vous perdez votre naturel et multipliez les approximations.',
          failEffects: [{ text: '-20 Moral', style: 'negative' }, { text: '-10 Confiance', style: 'negative' }],
          applyFail: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 10) })
        }
      },
      {
        typeTag: 'ÉGO',
        text: 'Ignorer la remarque : « Je joue pour gagner, pas pour faire des passes »',
        outcome: {
          narrative: 'Votre attitude arrogante plaît aux fans, mais agace le vestiaire.',
          effects: [{ text: '+10 Fans', style: 'positive' }, { text: '-15 Confiance Coach', style: 'negative' }],
          applyStats: (p) => ({ ...p, fans: (p.fans || 0) + 10000, coachTrust: Math.max(0, p.coachTrust - 15) })
        }
      },
      {
        typeTag: 'COACHING',
        text: 'Demander des séances vidéos personnalisées à l\'entraîneur',
        outcome: {
          narrative: 'Le coach apprécie votre humilité. Vous passez la semaine à décortiquer votre jeu.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '+15 Confiance', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      }
    ]
  },
  {
    id: 'pass_teammate_chemistry',
    category: 'VESTIAIRE',
    tag: 'Connexion Spéciale 🤝',
    targetPosition: 'ALL',
    condition: (p) => p.ovr > 50,
    description: "Le buteur star de l'équipe vient vous voir : « Si tu me mets le ballon dans l'intervalle au lieu de jouer latéral, je t'assure qu'on fera un carnage. »",
    options: [
      {
        typeTag: 'AUDACE',
        text: 'Accepter le pacte et chercher la passe difficile en match',
        outcome: {
          successProbability: 55,
          narrative: 'Une connexion magique est née ! Vos passes lumineuses trouvent toujours le buteur.',
          successEffects: [{ text: '+3 Passe', style: 'positive' }, { text: '+20 Confiance', style: 'positive' }],
          applySuccess: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } }),
          failNarrative: 'La connexion ne prend pas. Vos ballons en profondeur filent en touche ou sont interceptés.',
          failEffects: [{ text: '-15 Confiance', style: 'negative' }, { text: '-10 Moral', style: 'negative' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15), morale: Math.max(0, p.morale - 10) })
        }
      },
      {
        typeTag: 'PRUDENCE',
        text: 'Rester fidèle aux consignes du coach (Jeu posé)',
        outcome: {
          narrative: 'Le buteur est un peu frustré, mais le coach loue votre discipline tactique.',
          effects: [{ text: '+15 Confiance', style: 'positive' }, { text: '-5 Moral', style: 'negative' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15), morale: Math.max(0, p.morale - 5) })
        }
      },
      {
        typeTag: 'ENTRAÎNEMENT',
        text: 'Proposer de travailler ces automatismes après l\'entraînement',
        outcome: {
          successProbability: 80,
          narrative: 'Vos séances supplémentaires portent leurs fruits. La vista s\'améliore sans prendre de risques immédiats.',
          successEffects: [{ text: '+2 Passe', style: 'positive' }, { text: '-10 Forme', style: 'negative' }],
          applySuccess: (p) => ({ ...p, form: Math.max(0, p.form - 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } }),
          failNarrative: 'L\'accumulation de fatigue mène à une légère contracture.',
          failEffects: [{ text: '-20 Forme', style: 'negative' }],
          applyFail: (p) => ({ ...p, form: Math.max(0, p.form - 20) })
        }
      }
    ]
  },
  {
    id: 'pass_cross_practice',
    category: 'ENTRAÎNEMENT',
    tag: 'Précision Chirurgicale 🎯',
    targetPosition: 'ALL',
    condition: (p) => p.ovr > 55,
    description: "Le centre d'entraînement installe de nouvelles cibles automatisées pour travailler la précision des longues passes et des centres.",
    options: [
      {
        typeTag: 'COMPÉTITION',
        text: 'Défier les autres joueurs pour voir qui touche le plus de cibles',
        outcome: {
          successProbability: 50,
          narrative: 'Vous remportez le défi haut la main, gagnant le respect du vestiaire et une meilleure patte !',
          successEffects: [{ text: '+4 Passe', style: 'positive' }, { text: '+15 Moral', style: 'positive' }],
          applySuccess: (p) => ({ ...p, morale: Math.min(100, p.morale + 15), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 4) } }),
          failNarrative: 'Vous finissez dernier. Frustré, vous perdez vos moyens sur la séance.',
          failEffects: [{ text: '-15 Moral', style: 'negative' }, { text: '-5 Forme', style: 'negative' }],
          applyFail: (p) => ({ ...p, morale: Math.max(0, p.morale - 15), form: Math.max(0, p.form - 5) })
        }
      },
      {
        typeTag: 'DÉTERMINATION',
        text: 'Passer la nuit à s\'entraîner seul face aux cibles',
        outcome: {
          narrative: 'Le lendemain, vos passes transversales sont parfaites, mais vos jambes sont lourdes.',
          effects: [{ text: '+3 Passe', style: 'positive' }, { text: '-25 Forme', style: 'negative' }],
          applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 25), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } })
        }
      },
      {
        typeTag: 'ANALYSE',
        text: 'Étudier la biomécanique de votre geste avec le staff',
        outcome: {
          narrative: 'Une petite correction de votre appui change tout. Une progression lente mais sûre.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '+5 Confiance', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'ÉQUILIBRE',
        text: 'Faire l\'exercice normalement, sans forcer',
        outcome: {
          narrative: 'Une séance classique. Vous maintenez votre condition physique sans prendre de risques.',
          effects: [{ text: '+10 Forme', style: 'positive' }],
          applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10) })
        }
      }
    ]
  }
];
