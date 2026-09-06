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
  },
  {
    id: 'pass_charity_match',
    category: 'MÉDIAS',
    tag: 'Match de Charité 🏟️',
    targetPosition: 'ALL',
    condition: (p) => p.fans > 50000,
    description: "Vous êtes invité à participer à un match de charité très médiatisé. Le rythme est lent, c'est l'occasion idéale de faire le show avec des passes spectaculaires.",
    options: [
      {
        typeTag: 'SPECTACLE',
        text: 'Tenter des passes aveugles et des louches improbables',
        outcome: {
          successProbability: 60,
          narrative: 'Vos gestes de grande classe régalent le public et font le tour d\'internet !',
          successEffects: [{ text: '+3 Passe', style: 'positive' }, { text: '+20k Fans', style: 'positive' }],
          applySuccess: (p) => ({ ...p, fans: (p.fans || 0) + 20000, attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } }),
          failNarrative: 'Vous ratez complètement vos gestes, ce qui déclenche les moqueries gentilles mais gênantes du stade.',
          failEffects: [{ text: '-15 Moral', style: 'negative' }, { text: '+5k Fans', style: 'positive' }],
          applyFail: (p) => ({ ...p, morale: Math.max(0, p.morale - 15), fans: (p.fans || 0) + 5000 })
        }
      },
      {
        typeTag: 'SÉRIEUX',
        text: 'Jouer sérieusement et distribuer le jeu proprement',
        outcome: {
          narrative: 'Même lors d\'un match amical, votre précision chirurgicale force le respect.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'DÉTENTE',
        text: 'Jouer en marchant pour éviter toute blessure',
        outcome: {
          narrative: 'Vous passez un bon moment sans forcer. Vous rechargez vos batteries pour le championnat.',
          effects: [{ text: '+15 Forme', style: 'positive' }, { text: '+5 Moral', style: 'positive' }],
          applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 15), morale: Math.min(100, p.morale + 5) })
        }
      }
    ]
  },
  {
    id: 'pass_mentor_midfielder',
    category: 'VESTIAIRE',
    tag: 'Leçon de Légende 🧙‍♂️',
    targetPosition: 'ALL',
    condition: (p) => p.ovr < 85,
    description: "Une ancienne légende du club, reconnue pour sa vision de jeu exceptionnelle, est de passage au centre d'entraînement et vous observe.",
    options: [
      {
        typeTag: 'AUDACE',
        text: 'Essayer de l\'impressionner en forçant des passes décisives impossibles',
        outcome: {
          successProbability: 40,
          narrative: 'La légende est bluffée par votre vista et vient vous glisser quelques secrets précieux !',
          successEffects: [{ text: '+5 Passe', style: 'positive' }, { text: '+20 Moral', style: 'positive' }],
          applySuccess: (p) => ({ ...p, morale: Math.min(100, p.morale + 20), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 5) } }),
          failNarrative: 'La légende secoue la tête face à vos choix brouillons. Le coach vous remet en place.',
          failEffects: [{ text: '-15 Confiance', style: 'negative' }, { text: '-10 Moral', style: 'negative' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15), morale: Math.max(0, p.morale - 10) })
        }
      },
      {
        typeTag: 'HUMILITÉ',
        text: 'Aller lui demander conseil sur le jeu long',
        outcome: {
          narrative: 'Il apprécie votre démarche et vous montre comment mieux balancer le poids de votre corps sur les transversales.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '+5 Moral', style: 'positive' }],
          applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'CONCENTRATION',
        text: 'L\'ignorer et vous concentrer sur vos exercices de routine',
        outcome: {
          narrative: 'Vous restez focalisé sur votre programme habituel. Pas d\'éclat, mais une régularité de métronome.',
          effects: [{ text: '+10 Forme', style: 'positive' }],
          applyStats: (p) => ({ ...p, form: Math.min(100, p.form + 10) })
        }
      }
    ]
  },
  {
    id: 'pass_rainy_pitch',
    category: 'MATCH',
    tag: 'Terrain Inondé 🌧️',
    targetPosition: 'ALL',
    condition: (p) => p.form >= 60,
    description: "Le match d'aujourd'hui se joue sous un déluge. Le terrain est gorgé d'eau, rendant les passes au sol extrêmement compliquées.",
    options: [
      {
        typeTag: 'RISQUE',
        text: 'S\'obstiner à jouer court et rapide au sol',
        outcome: {
          successProbability: 45,
          narrative: 'Votre technique surclasse les éléments. Vous réussissez à trouver les failles malgré l\'eau !',
          successEffects: [{ text: '+3 Passe', style: 'positive' }, { text: '+20 Confiance', style: 'positive' }],
          applySuccess: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } }),
          failNarrative: 'Vos passes s\'arrêtent dans les flaques, entraînant deux contres assassins de l\'adversaire.',
          failEffects: [{ text: '-20 Confiance', style: 'negative' }, { text: '-10 Moral', style: 'negative' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20), morale: Math.max(0, p.morale - 10) })
        }
      },
      {
        typeTag: 'ADAPTATION',
        text: 'Jouer long et en l\'air pour éviter les flaques',
        outcome: {
          narrative: 'Vous adaptez intelligemment votre jeu. Vos transversales millimétrées sauvent le match.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'SÉCURITÉ',
        text: 'Jouer uniquement vers l\'arrière ou sur les côtés proches',
        outcome: {
          narrative: 'Vous ne prenez aucun risque. C\'est moche à voir, mais le ballon n\'est pas perdu.',
          effects: [{ text: '+5 Confiance', style: 'positive' }, { text: '-5 Moral', style: 'negative' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 5), morale: Math.max(0, p.morale - 5) })
        }
      }
    ]
  },
  {
    id: 'pass_playmaker_injury',
    category: 'VESTIAIRE',
    tag: 'Les Clés du Camion 🔑',
    targetPosition: 'ALL',
    condition: (p) => p.ovr > 65,
    description: "Le meneur de jeu titulaire s'est blessé pour plusieurs semaines. Le coach vient vous voir : « C'est toi qui vas dicter le jeu maintenant. »",
    options: [
      {
        typeTag: 'LEADERSHIP',
        text: 'Prendre toutes les responsabilités de création (Risqué)',
        outcome: {
          successProbability: 50,
          narrative: 'Vous rayonnez dans ce nouveau rôle ! Vos ouvertures et votre vision portent l\'équipe.',
          successEffects: [{ text: '+4 Passe', style: 'positive' }, { text: '+20 Confiance', style: 'positive' }],
          applySuccess: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 20), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 4) } }),
          failNarrative: 'Le costume est trop grand. Vous perdez d\'innombrables ballons sous la pression.',
          failEffects: [{ text: '-20 Confiance', style: 'negative' }, { text: '-15 Moral', style: 'negative' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20), morale: Math.max(0, p.morale - 15) })
        }
      },
      {
        typeTag: 'COLLECTIF',
        text: 'Proposer de diviser la tâche avec les autres milieux',
        outcome: {
          narrative: 'Un choix mature. La création est partagée, l\'équipe garde son équilibre sans vous brûler les ailes.',
          effects: [{ text: '+1 Passe', style: 'positive' }, { text: '+10 Confiance', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 1) } })
        }
      },
      {
        typeTag: 'REFUS',
        text: 'Décliner : « Je préfère rester concentré sur mon jeu habituel »',
        outcome: {
          narrative: 'Le coach est déçu de votre manque d\'initiative, mais accepte votre choix.',
          effects: [{ text: '-15 Confiance', style: 'negative' }, { text: '+10 Forme', style: 'positive' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 15), form: Math.min(100, p.form + 10) })
        }
      }
    ]
  },
  {
    id: 'pass_boots_sponsor',
    category: 'LIFESTYLE',
    tag: 'Nouvelles Chaussures 👟',
    targetPosition: 'ALL',
    condition: (p) => p.fans > 100000,
    description: "Votre sponsor vous envoie son tout nouveau modèle de chaussures ultra-légères censées améliorer la précision des passes et le toucher de balle.",
    options: [
      {
        typeTag: 'FRIME',
        text: 'Les porter direct en match et tenter des extérieurs du pied',
        outcome: {
          successProbability: 55,
          narrative: 'Les chaussures semblent vraiment magiques (ou c\'est juste psychologique). Vos extérieurs font mouche !',
          successEffects: [{ text: '+3 Passe', style: 'positive' }, { text: '+20k Fans', style: 'positive' }],
          applySuccess: (p) => ({ ...p, fans: (p.fans || 0) + 20000, attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 3) } }),
          failNarrative: 'Catastrophe... Les crampons ne sont pas faits, vous glissez et offrez un but à l\'adversaire.',
          failEffects: [{ text: '-20 Moral', style: 'negative' }, { text: '-10 Confiance', style: 'negative' }],
          applyFail: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 10) })
        }
      },
      {
        typeTag: 'SÉRIEUX',
        text: 'Les faire à votre pied à l\'entraînement pendant une semaine',
        outcome: {
          narrative: 'Après les avoir bien rodées, vous vous sentez très à l\'aise et votre qualité de passe s\'en ressent.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '-5 Forme', style: 'negative' }],
          applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 5), attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'REFUS',
        text: 'Garder vos vieilles chaussures usées, vous avez vos habitudes',
        outcome: {
          narrative: 'Le sponsor fait un peu la moue, mais vous gardez vos repères habituels sur le terrain.',
          effects: [{ text: '+5 Moral', style: 'positive' }],
          applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) })
        }
      }
    ]
  },
  {
    id: 'pass_fan_challenge',
    category: 'MÉDIAS',
    tag: 'Défi Crossbar 🎥',
    targetPosition: 'ALL',
    condition: (p) => p.fans > 20000,
    description: "Un influenceur vous lance un défi sur les réseaux : toucher 3 fois la barre transversale depuis le milieu de terrain en moins d'une minute.",
    options: [
      {
        typeTag: 'RISQUE',
        text: 'Essayer le défi en plein milieu de l\'entraînement collectif',
        outcome: {
          successProbability: 35,
          narrative: 'Incroyable ! Vous réussissez du premier coup. L\'équipe vous porte en triomphe, la vidéo devient virale !',
          successEffects: [{ text: '+4 Passe', style: 'positive' }, { text: '+50k Fans', style: 'positive' }],
          applySuccess: (p) => ({ ...p, fans: (p.fans || 0) + 50000, attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 4) } }),
          failNarrative: 'Vous ratez lamentablement et dérangez la séance. Le coach furieux vous envoie courir.',
          failEffects: [{ text: '-20 Confiance', style: 'negative' }, { text: '-15 Forme', style: 'negative' }],
          applyFail: (p) => ({ ...p, coachTrust: Math.max(0, p.coachTrust - 20), form: Math.max(0, p.form - 15) })
        }
      },
      {
        typeTag: 'SÉCURITÉ',
        text: 'Le faire discrètement après la séance avec l\'influenceur',
        outcome: {
          narrative: 'Après plusieurs tentatives, la vidéo est dans la boîte. Vous affinez votre jeu long, mais ça tire sur les cuisses.',
          effects: [{ text: '+2 Passe', style: 'positive' }, { text: '-15 Forme', style: 'negative' }, { text: '+10k Fans', style: 'positive' }],
          applyStats: (p) => ({ ...p, form: Math.max(0, p.form - 15), fans: (p.fans || 0) + 10000, attributes: { ...p.attributes, passing: Math.min(99, (p.attributes?.passing || 50) + 2) } })
        }
      },
      {
        typeTag: 'PROFESSIONNEL',
        text: 'Refuser poliment pour éviter toute distraction',
        outcome: {
          narrative: 'Vous déclinez, préférant rester focus sur la compétition. Le coach valide votre maturité.',
          effects: [{ text: '+10 Confiance', style: 'positive' }, { text: '-5k Fans', style: 'negative' }],
          applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 10), fans: Math.max(0, (p.fans || 0) - 5000) })
        }
      }
    ]
  }
];
