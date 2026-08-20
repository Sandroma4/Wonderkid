/**
 * Calcule l'OVR effectif du club en tenant compte de l'impact du joueur.
 * Un joueur de 90 OVR peut augmenter un club de 65 OVR de quelques points,
 * simulant l'effet "star qui tire le niveau vers le haut".
 */
const getEffectiveClubOvr = (club, player) => {
  const baseOvr = club.ovr || 65;
  const playerOvr = player.ovr || 50;
  // Le joueur contribue entre 0 et +5 OVR au club selon sa supériorité
  const playerImpact = Math.max(0, (playerOvr - baseOvr) * 0.15);
  return Math.min(95, Math.round(baseOvr + playerImpact));
};

/**
 * Clamp un nombre entre min et max.
 */
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

/**
 * Génère une note de tournoi réaliste basée sur l'OVR du joueur
 * et le niveau de la compétition.
 * Un joueur de 48 OVR en LDC sera catastrophique (4.0-5.5).
 * Un joueur de 88 OVR en LDC pourra atteindre 9.0+.
 */
const getTournamentRating = (playerOvr, competitionLevel) => {
  // competitionLevel: 90 pour LDC/CDM, 85 pour Euro, 80 pour coupe nationale
  const gap = playerOvr - competitionLevel;
  // Base: 6.0 si le joueur est au niveau, +/- selon l'écart
  const base = 6.0 + (gap * 0.06);
  const variance = (Math.random() - 0.5) * 1.2; // ±0.6
  return clamp(Number((base + variance).toFixed(1)), 3.0, 9.9);
};

export const simulateTournaments = (player, club, seasonStats, seasonIndex, lastSeasonStats) => {
  const currentYear = 2026 + seasonIndex;
  const isWorldCup = (currentYear % 4 === 2); // 2026, 2030, 2034
  const isEuro = (currentYear % 4 === 0); // 2028, 2032
  const isInternationalYear = isWorldCup || isEuro;
  const playerOvr = player.ovr || 50;
  const effectiveClubOvr = getEffectiveClubOvr(club, player);
  const pos = (player.position || '').toUpperCase();
  
  const tournaments = {
    worldCup: null,
    euro: null,
    championsLeague: null,
    europaLeague: null,
    conferenceLeague: null,
    domesticCup: null
  };

  // ═══════════════════════════════════════════════════
  // CHAMPIONNATS INTERNATIONAUX (CDM / Euro)
  // ═══════════════════════════════════════════════════
    // WORLD CUP ET EURO SONT MAINTENANT GERES PAR LE MINI-JEU DANS APP.JSX
  
  // ═══════════════════════════════════════════════════
  // COUPES D'EUROPE
  // ═══════════════════════════════════════════════════
  const europeanOrigins = ['DE', 'EN', 'BE', 'HR', 'DK', 'SCO', 'ES', 'FR', 'GR', 'IT', 'NO', 'NL', 'PL', 'PT', 'CH', 'TR'];
  const isClubEuropean = europeanOrigins.includes(club.origin);
  
  let playsCL = false;
  let playsEL = false;
  let playsECL = false;

  if (isClubEuropean) {
    if (lastSeasonStats && lastSeasonStats.leaguePosition) {
      const pos = lastSeasonStats.leaguePosition;
      if (club.tier === 1) {
        if (pos <= 4) playsCL = true;
        else if (pos <= 6) playsEL = true;
        else if (pos === 7) playsECL = true;
      }
    } else {
      if (club.tier === 1) {
        if (effectiveClubOvr >= 82) playsCL = true;
        else if (effectiveClubOvr >= 78) playsEL = true;
        else if (effectiveClubOvr >= 75) playsECL = true;
      }
    }
  }

    const simulateEuroCup = (compLevel, winBase, finBase, semiBase, stageMatchCounts) => {
    // Amplificateur d'écart d'OVR (OVR Gap Multiplier) pour la LDC et autres coupes d'Europe
    const ovrGap = effectiveClubOvr - winBase;
    
    // Si l'OVR est inférieur au seuil attendu, on amplifie l'écart exponentiellement pour punir les petits clubs
    // (ex: un écart de -12 OVR (73 vs 85) sera décuplé)
    let winChance = 0;
    if (ovrGap < 0) {
      // Miracle chance (très faible, diminue drastiquement plus l'écart est grand)
      winChance = Math.max(0.001, 0.10 * Math.pow(0.85, Math.abs(ovrGap)));
    } else {
      // L'équipe est au niveau ou supérieure, les chances augmentent
      winChance = clamp(0.15 + (ovrGap * 0.05), 0.15, 0.50);
    }
    
    // Finaliste
    const finGap = effectiveClubOvr - finBase;
    let finalistChance = 0;
    if (finGap < 0) {
      finalistChance = Math.max(0.005, 0.15 * Math.pow(0.88, Math.abs(finGap)));
    } else {
      finalistChance = clamp(0.20 + (finGap * 0.03), 0.20, 0.40);
    }
    
    // Demi-finale
    const semiGap = effectiveClubOvr - semiBase;
    let semiChance = 0;
    if (semiGap < 0) {
      semiChance = Math.max(0.01, 0.20 * Math.pow(0.90, Math.abs(semiGap)));
    } else {
      semiChance = clamp(0.25 + (semiGap * 0.02), 0.25, 0.45);
    }

    
    const roll = Math.random();
    let stage, matches;
    if (roll < winChance) { stage = 'Vainqueur'; matches = stageMatchCounts[0]; }
    else if (roll < winChance + finalistChance) { stage = 'Finaliste'; matches = stageMatchCounts[1]; }
    else if (roll < winChance + finalistChance + semiChance) { stage = 'Demi-finale'; matches = stageMatchCounts[2]; }
    else { stage = 'Éliminé en phase de poules'; matches = stageMatchCounts[3]; }
    
    const tRating = getTournamentRating(playerOvr, compLevel);
    const perfMultiplier = clamp(tRating / 7.0, 0.2, 1.5);
    let goals = 0, assists = 0;
    
    if (pos.includes('ATT') || pos.includes('ST')) {
      goals = Math.max(0, Math.round(matches * 0.5 * perfMultiplier * (Math.random() * 0.8 + 0.3)));
      assists = Math.max(0, Math.round(matches * 0.2 * perfMultiplier * (Math.random() * 0.6 + 0.2)));
    } else if (pos.includes('MID') || pos.includes('CM')) {
      goals = Math.max(0, Math.round(matches * 0.12 * perfMultiplier * (Math.random() * 0.8 + 0.2)));
      assists = Math.max(0, Math.round(matches * 0.35 * perfMultiplier * (Math.random() * 0.8 + 0.3)));
    } else if (pos.includes('WING')) {
      goals = Math.max(0, Math.round(matches * 0.3 * perfMultiplier * (Math.random() * 0.8 + 0.3)));
      assists = Math.max(0, Math.round(matches * 0.3 * perfMultiplier * (Math.random() * 0.8 + 0.3)));
    } else {
      goals = Math.max(0, Math.round(matches * 0.04 * perfMultiplier * Math.random()));
      assists = Math.max(0, Math.round(matches * 0.06 * perfMultiplier * Math.random()));
    }
    
    return { stage, matches, goals, assists, rating: tRating };
  };

  if (playsCL) {
    tournaments.championsLeague = simulateEuroCup(88, 68, 65, 62, [13, 13, 12, 6]);
  } else if (playsEL) {
    tournaments.europaLeague = simulateEuroCup(82, 64, 61, 58, [13, 13, 12, 6]);
  } else if (playsECL) {
    tournaments.conferenceLeague = simulateEuroCup(78, 60, 57, 54, [13, 13, 12, 6]);
  }
  
  // ═══════════════════════════════════════════════════
  // COUPE NATIONALE
  // ═══════════════════════════════════════════════════
  // Plus accessible, mais il faut quand même une bonne équipe pour aller au bout
  const cupReachFinalChance = club.tier === 1 ? clamp((effectiveClubOvr - 70) * 0.02, 0.05, 0.4) : clamp((effectiveClubOvr - 60) * 0.01, 0.01, 0.1);
  const cupWinChance = clamp((effectiveClubOvr - 65) * 0.02, 0.05, 0.5);
  
  if (Math.random() < cupReachFinalChance) { 
    const isWinner = Math.random() < cupWinChance;
    tournaments.domesticCup = {
      stage: isWinner ? 'Vainqueur' : 'Finaliste',
    };
  }

  return tournaments;
};

export const calculateAwards = (player, club, seasonStats, tournaments, seasonIndex) => {
  const awards = [];
  
  const pos = (player.position || '').toUpperCase();
  const ovr = player.ovr || 50;
  const rating = seasonStats.rating || 6.0;
  const goals = seasonStats.goals || 0;
  const assists = seasonStats.assists || 0;
  const country = club.origin || 'FR';
  const tier = club.tier || 3;
  
  // ═══════════════════════════════════════════════════
  // RÉCOMPENSES DE LIGUE (Tier 1 uniquement)
  // ═══════════════════════════════════════════════════
  if (tier === 1) {
    // Lookup de noms de trophées par pays
    const leagueAwards = {
      FR:  { mvp: 'Meilleur joueur de Ligue 1', scorer: 'Meilleur buteur de Ligue 1', gk: 'Meilleur gardien de Ligue 1', young: 'Meilleur espoir de Ligue 1', assist: 'Meilleur passeur de Ligue 1', team: 'Équipe-type de Ligue 1' },
      EN:  { mvp: 'Premier League Player of the Season', scorer: 'Premier League Golden Boot', gk: 'Premier League Golden Glove', young: 'PFA Young Player of the Year', assist: 'Playmaker of the Season', team: 'PFA Team of the Year' },
      ES:  { mvp: 'Meilleur joueur de La Liga', scorer: 'Trophée Pichichi', gk: 'Trophée Zamora', young: 'Meilleur espoir de La Liga', assist: 'Meilleur passeur de La Liga', team: 'Équipe-type de La Liga' },
      IT:  { mvp: 'MVP de Serie A', scorer: 'Capocannoniere', gk: 'Miglior Portiere', young: 'Giovane dell\'Anno', assist: 'Re degli assist', team: 'Équipe-type de Serie A' },
      DE:  { mvp: 'Bundesliga Player of the Season', scorer: 'Torjägerkanone', gk: 'Bester Torwart', young: 'Rookie of the Season', assist: 'Meilleur passeur de Bundesliga', team: 'Bundesliga Team of the Season' },
    };
    
    const la = leagueAwards[country] || {
      mvp: `Meilleur joueur de ${club.leagueName || 'la saison'}`,
      scorer: 'Meilleur buteur',
      gk: 'Meilleur gardien',
      young: 'Meilleur jeune joueur',
      assist: 'Meilleur passeur',
      team: 'Équipe-type de la saison'
    };
    
    // MVP
    if ((rating >= 8.5 && ovr >= 84) || (rating >= 9.0 && ovr >= 79)) awards.push({ text: la.mvp, icon: '👑' });
    // Meilleur Buteur
    if (((goals >= 25 && ovr >= 82) || (goals >= 32 && ovr >= 76)) && (pos.includes('ATT') || pos.includes('ST') || pos.includes('WING'))) {
      awards.push({ text: la.scorer, icon: '⚽' });
    }
    // Meilleur gardien
    if (rating >= 8.0 && ovr >= 82 && pos.includes('GK')) awards.push({ text: la.gk, icon: '🧤' });
    // Meilleur espoir
    if (rating >= 7.8 && player.age <= 21 && ovr >= 75) awards.push({ text: la.young, icon: '👶' });
    // Meilleur passeur
    if (assists >= 15 && ovr >= 78 && (pos.includes('MID') || pos.includes('CM') || pos.includes('WING'))) {
      awards.push({ text: la.assist, icon: '🎯' });
    }
    // Équipe-type
    // if (rating >= 8.2 && ovr >= 82) awards.push({ text: la.team, icon: '🏆' });
  } else if (tier === 2) {
    const la = {
      mvp: `Meilleur joueur de D2`,
      scorer: `Meilleur buteur de D2`,
      gk: `Meilleur gardien de D2`,
      young: `Meilleur espoir de D2`,
      assist: `Meilleur passeur de D2`,
      team: `Équipe-type de D2`
    };
    if (rating >= 8.2 && ovr >= 72) awards.push({ text: la.mvp, icon: '👑' });
    if (goals >= 22 && ovr >= 68 && (pos.includes('ATT') || pos.includes('ST') || pos.includes('WING'))) awards.push({ text: la.scorer, icon: '⚽' });
    if (rating >= 7.8 && ovr >= 70 && pos.includes('GK')) awards.push({ text: la.gk, icon: '🧤' });
    if (rating >= 7.5 && player.age <= 21 && ovr >= 65) awards.push({ text: la.young, icon: '👶' });
    if (assists >= 12 && ovr >= 68 && (pos.includes('MID') || pos.includes('CM') || pos.includes('WING'))) awards.push({ text: la.assist, icon: '🎯' });
    // if (rating >= 7.8 && ovr >= 70) awards.push({ text: la.team, icon: '🏆' });
  }

  // ═══════════════════════════════════════════════════
  // RÉCOMPENSES UEFA (Ligue des Champions)
  // ═══════════════════════════════════════════════════
  let isUefaPoty = false;
  if (tournaments.championsLeague) {
    const cl = tournaments.championsLeague;
    const isDeepRun = cl.stage === 'Vainqueur' || cl.stage === 'Finaliste' || cl.stage === 'Demi-finale';
    
    // UEFA Player of the Year: note >= 8.5 ET parcours profond ET OVR >= 82
    if (cl.rating >= 8.5 && isDeepRun && ovr >= 82) {
      awards.push({ text: 'UEFA Men\'s Player of the Year', icon: '🇪🇺' });
      isUefaPoty = true;
    }
    // Meilleur Buteur LDC: uniquement si les stats sont cohérentes (>= 8 buts ET OVR >= 75)
    if (cl.goals >= 8 && ovr >= 75) {
      awards.push({ text: 'Meilleur Buteur de la Ligue des Champions', icon: '🥅' });
    }
    // UEFA Positional Awards: note >= 8.0 ET parcours profond ET OVR >= 78
    if (cl.rating >= 8.0 && isDeepRun && ovr >= 78) {
      if (pos.includes('GK')) awards.push({ text: 'UEFA Goalkeeper of the Season', icon: '🧤' });
      else if (pos.includes('DEF') || pos.includes('CB')) awards.push({ text: 'UEFA Defender of the Season', icon: '🛡️' });
      else if (pos.includes('MID') || pos.includes('CM')) awards.push({ text: 'UEFA Midfielder of the Season', icon: '🎯' });
      else awards.push({ text: 'UEFA Forward of the Season', icon: '⚡' });
    }
  }

  if (tournaments.europaLeague) {
    const el = tournaments.europaLeague;
    const isDeepRun = el.stage === 'Vainqueur' || el.stage === 'Finaliste';
    if (el.rating >= 8.2 && isDeepRun && ovr >= 75) {
      awards.push({ text: 'Meilleur Joueur de l\'Europa League', icon: '🇪🇺' });
    }
    if (el.goals >= 7 && ovr >= 70) {
      awards.push({ text: 'Meilleur Buteur de l\'Europa League', icon: '🥅' });
    }
  }

  if (tournaments.conferenceLeague) {
    const ecl = tournaments.conferenceLeague;
    const isDeepRun = ecl.stage === 'Vainqueur' || ecl.stage === 'Finaliste';
    if (ecl.rating >= 8.0 && isDeepRun && ovr >= 70) {
      awards.push({ text: 'Meilleur Joueur de la Conference League', icon: '🇪🇺' });
    }
    if (ecl.goals >= 7 && ovr >= 65) {
      awards.push({ text: 'Meilleur Buteur de la Conference League', icon: '🥅' });
    }
  }

  // ═══════════════════════════════════════════════════
  // RÉCOMPENSES INTERNATIONALES (CDM / Euro)
  // ═══════════════════════════════════════════════════
  let wonIntlBestPlayer = false;
  const intl = tournaments.worldCup || tournaments.euro;
  if (intl) {
    const isWc = !!tournaments.worldCup;
    const isDeepRun = intl.stage === 'Vainqueur' || intl.stage === 'Finaliste';
    
    // Meilleur joueur: note >= 8.3 ET finaliste+ ET OVR >= 80
    if (intl.rating >= 8.3 && isDeepRun && ovr >= 80) {
      awards.push({ text: isWc ? 'Ballon d\'Or adidas (Meilleur Joueur CDM)' : 'Meilleur Joueur de l\'Euro', icon: '🥇' });
      wonIntlBestPlayer = true;
    }
    // Soulier d'Or: >= 5 buts ET OVR >= 72
    if (intl.goals >= 5 && ovr >= 72) {
      awards.push({ text: isWc ? 'Soulier d\'Or adidas (Meilleur Buteur CDM)' : 'Soulier d\'Or de l\'Euro', icon: '⚽' });
    }
    // Gant d'Or: gardien avec note >= 7.8 ET OVR >= 75
    if (pos.includes('GK') && intl.rating >= 7.8 && isDeepRun && ovr >= 75) {
      awards.push({ text: isWc ? 'Gant d\'Or adidas (Meilleur Gardien CDM)' : 'Meilleur Gardien de l\'Euro', icon: '🧤' });
    }
    // Meilleur jeune
    if (player.age <= 21 && intl.rating >= 7.5 && ovr >= 68) {
      awards.push({ text: isWc ? 'Meilleur Jeune Joueur de la CDM' : 'Meilleur Jeune Joueur de l\'Euro', icon: '👶' });
    }
  }

  // ═══════════════════════════════════════════════════
  // BALLON D'OR ET RÉCOMPENSES GLOBALES
  // ═══════════════════════════════════════════════════
  const clWinner = tournaments.championsLeague?.stage === 'Vainqueur';
  const intlWinner = intl?.stage === 'Vainqueur';
  const wcWinner = tournaments.worldCup?.stage === 'Vainqueur';
  const otherIntlWinner = intlWinner && !wcWinner;
  
  // Le score global prend désormais lourdement en compte les statistiques et les titres
  const leagueWinner = seasonStats.leaguePosition === 1;
  const domesticCupWinner = tournaments.domesticCup?.stage === 'Vainqueur';
  
  const isGK = pos.includes('GK');
  const perfPoints = isGK 
    ? ((seasonStats.cleanSheets || 0) / 10) // 20 CS = +2.0
    : ((goals / 25) + (assists / 20)); // 50G, 20A = +3.0

  // Nouveau calcul du Ballon d'Or avec une forte importance des trophées collectifs
  let scoreGlobal = (rating > 6.0 ? (rating - 6.0) * 1.5 : 0)
    + (perfPoints * 1.5) 
    + (Math.max(0, ovr - 80) * 0.15) 
    + (wcWinner ? 4.0 : 0) // Hiérarchie stricte: Coupe du Monde
    + (clWinner ? 3.0 : 0) // Ligue des Champions
    + (otherIntlWinner ? 2.0 : 0) // Euro / Copa
    + (leagueWinner ? 1.5 : 0) // Championnat
    + (domesticCupWinner ? 0.5 : 0) // Coupe Nationale
    + (isUefaPoty ? 1.0 : 0) 
    + (wonIntlBestPlayer ? 1.0 : 0);
  
  // Ballon d'Or: Priorité aux PERFORMANCES et TITRES.
  // Seuil fixé à 11.0 avec les nouveaux poids très lourds pour les titres
  if (tier === 1 && ovr >= 75 && scoreGlobal >= 11.0) {
    awards.push({ text: 'Ballon d\'Or', icon: '⭐' });
    awards.push({ text: 'The Best – Joueur de la FIFA', icon: '⭐' });
  }
  
  // Trophée Yachine (meilleur gardien mondial)
  if (scoreGlobal >= 10.0 && isGK && ovr >= 75) {
    awards.push({ text: 'Trophée Yachine', icon: '🧤' });
    awards.push({ text: 'The Best – Gardien de but de la FIFA', icon: '🧤' });
  }
  
  // Trophée Kopa (meilleur jeune mondial)
  if (scoreGlobal >= 9.5 && player.age <= 21 && ovr >= 72) {
    awards.push({ text: 'Trophée Kopa', icon: '👶' });
  }
  
  // Trophée Gerd Müller (meilleur buteur toutes compétitions)
  if (goals >= 40 && ovr >= 75) {
    awards.push({ text: 'Trophée Gerd Müller', icon: '⚽' });
  }
  
  // --- Classement Ballon d'Or (Top 30) ---
  // Calculer un classement simulé basé sur le score global
  let ballonDorRank = null;
  const hasBallonDor = awards.some(a => a.text === "Ballon d'Or");
  if (!hasBallonDor && tier === 1 && ovr >= 75 && rating >= 7.0) {
    // Score de 6.0 (min pour top 30) à 10.0 (seuil Ballon d'Or) avec la nouvelle formule
    if (scoreGlobal >= 6.0) {
      // Mapping du score vers un classement 2-30
      const normalized = Math.min(1, Math.max(0, (scoreGlobal - 6.0) / 4.0));
      ballonDorRank = Math.max(2, Math.round(30 - normalized * 28));
    }
  } else if (hasBallonDor) {
    ballonDorRank = 1;
  }

  return { awards, ballonDorRank };
};

export const AWARD_RANKS = {
  "Ballon d'Or": 100,
  "The Best – Joueur de la FIFA": 95,
  "Vainqueur de la Coupe du Monde": 90,
  "Vainqueur de la Ligue des Champions": 85,
  "Vainqueur de l'Euro": 80,
  "Vainqueur de la Copa America": 80,
  "Ballon d'Or adidas (Meilleur Joueur CDM)": 75,
  "Meilleur Joueur de l'Euro": 70,
  "Meilleur Joueur de la Copa America": 70,
  "Soulier d'Or de la Coupe du Monde": 65,
  "Vainqueur de la Ligue Europa": 60,
  "Vainqueur de la Conference League": 55,
  "Trophée Yachine": 60,
  "Meilleur Joueur de l'Europa League": 55,
  "Meilleur Buteur de l'Europa League": 45,
  "Meilleur Joueur de la Conference League": 45,
  "Meilleur Buteur de la Conference League": 35,
  "The Best – Gardien de but de la FIFA": 55,
  "Champion": 55,
  "Soulier d'Or Européen": 50,
  "Meilleur Buteur de la Ligue des Champions": 50,
  "Meilleur Passeur de la Ligue des Champions": 45,
  "Meilleur Joueur UEFA de l'année": 40,
  "Meilleur Joueur du Championnat": 40,
  "Vainqueur de la Coupe Nationale": 35,
  "Meilleur Buteur du Championnat": 35,
  "Vainqueur de la Coupe de la Ligue": 30,
  "Meilleur Passeur du Championnat": 30,
  "Meilleur Gardien du Championnat": 30,
  "Équipe de l'Année": 25,
  "Golden Boy": 20,
  "Trophée Kopa": 20
};

/**
 * Met à jour dynamiquement l'OVR du club en fonction du joueur.
 * Appelé entre chaque saison pour simuler l'évolution naturelle du club.
 */
export const updateClubOvr = (club, player, seasonStats) => {
  if (!club) return club;
  const baseOvr = club.ovr || 65;
  const playerOvr = player.ovr || 50;
  const rating = seasonStats?.rating || 6.5;
  
  // Le joueur tire le niveau vers le haut ou vers le bas
  // Si le joueur est bien meilleur que le club et performe bien, le club monte
  const playerInfluence = (playerOvr - baseOvr) * 0.08;
  const performanceBonus = (rating - 6.5) * 0.5;
  
  // Variation naturelle (le club peut fluctuer seul de ±1)
  const naturalVariation = (Math.random() - 0.5) * 2;
  
  const newOvr = Math.round(clamp(baseOvr + playerInfluence + performanceBonus + naturalVariation, 55, 92));
  
  return { ...club, ovr: newOvr };
};


export const calculateUniqueAwards = (playerA, clubA, statsA, tourneyA, playerB, clubB, statsB, tourneyB, seasonIndex) => {
  const { awards: awardsA, ballonDorRank: bdA } = calculateAwards(playerA, clubA, statsA, tourneyA, seasonIndex);
  const { awards: awardsB, ballonDorRank: bdB } = calculateAwards(playerB, clubB, statsB, tourneyB, seasonIndex);

  const resolveConflict = (awardKeywords, metricA, metricB) => {
    const hasAwardA = awardsA.some(a => awardKeywords.some(kw => a.text.toLowerCase().includes(kw.toLowerCase())));
    const hasAwardB = awardsB.some(a => awardKeywords.some(kw => a.text.toLowerCase().includes(kw.toLowerCase())));
    
    if (hasAwardA && hasAwardB) {
      if (metricA >= metricB) {
        for (let i = awardsB.length - 1; i >= 0; i--) {
          if (awardKeywords.some(kw => awardsB[i].text.toLowerCase().includes(kw.toLowerCase()))) {
            awardsB.splice(i, 1);
          }
        }
      } else {
        for (let i = awardsA.length - 1; i >= 0; i--) {
          if (awardKeywords.some(kw => awardsA[i].text.toLowerCase().includes(kw.toLowerCase()))) {
            awardsA.splice(i, 1);
          }
        }
      }
    }
  };

  if (bdA === 1 && bdB === 1) {
    if (statsA.rating >= statsB.rating) {
      for (let i = awardsB.length - 1; i >= 0; i--) {
        if (awardsB[i].text === "Ballon d'Or") awardsB.splice(i, 1);
      }
    } else {
      for (let i = awardsA.length - 1; i >= 0; i--) {
        if (awardsA[i].text === "Ballon d'Or") awardsA.splice(i, 1);
      }
    }
  }

  resolveConflict(['buteur', 'soulier d\'or', 'pichichi', 'capocannoniere', 'boot'], statsA.goals || 0, statsB.goals || 0);
  resolveConflict(['passeur', 'assist', 'playmaker'], statsA.assists || 0, statsB.assists || 0);
  resolveConflict(['mvp', 'meilleur joueur', 'player of the season'], statsA.rating || 0, statsB.rating || 0);
  resolveConflict(['gardien', 'zamora', 'glove', 'yachine'], -(statsA.goalsConceded || 999), -(statsB.goalsConceded || 999));
  resolveConflict(['espoir', 'young', 'giovane', 'golden boy', 'kopa'], playerA.ovr || 0, playerB.ovr || 0);

  return {
    awardsA, ballonDorRankA: bdA === 1 && bdB === 1 && statsA.rating < statsB.rating ? 2 : bdA,
    awardsB, ballonDorRankB: bdA === 1 && bdB === 1 && statsB.rating < statsA.rating ? 2 : bdB
  };
};
