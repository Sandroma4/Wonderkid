import { CHALLENGES_LIST } from './gameData';

export const calculateCareerScore = (player, rivalConfrontations = null) => {
  let score = 0;
  
  // Trophies weight
  if (player.palmares) {
    player.palmares.forEach(trophy => {
      const text = trophy.text.toLowerCase();
      if (text.includes("ballon d'or")) score += 10000;
      else if (text.includes("coupe du monde")) score += 8000;
      else if (text.includes("ligue des champions")) score += 6000;
      else if (text.includes("euro") || text.includes("copa américa") || text.includes("can")) score += 5000;
      else if (text.includes("champion de")) score += 3000;
      else if (text.includes("coupe nationale")) score += 1000;
      else if (text.includes("golden boy")) score += 2000;
      else if (text.includes("soulier d'or")) score += 3000;
      else score += 500; // other trophies
    });
  }


  // 1. Economy (Bank Balance)
  const bankBalance = player.bankBalance || 0;
  if (bankBalance > 0) {
    score += Math.floor(bankBalance / 1000); // 1000 pts per 1 Million (bankBalance is in K or actual euros? The game uses numbers like 10000 for 10k. So 1M is 1000000. 1000000 / 1000 = 1000 points).
  }

  // 2. Longevity (Seasons played)
  const seasons = player.careerSeasons || 1;
  score += seasons * 1000;

  // 3. Legacy (Career History Stats)
  if (player.careerHistory && player.careerHistory.length > 0) {
    let totalGoals = 0;
    let totalAssists = 0;
    let totalCleanSheets = 0;

    player.careerHistory.forEach(season => {
      totalGoals += season.goals || 0;
      totalAssists += season.assists || 0;
      totalCleanSheets += season.cleanSheets || 0;
    });

    const pos = (player.position || '').toUpperCase();
    if (pos.includes('ATT') || pos.includes('ST') || pos.includes('WING')) {
      score += (totalGoals * 20) || 0;
    } else if (pos.includes('MID') || pos.includes('MOC') || pos.includes('MDC') || pos.includes('MIL')) {
      score += (totalAssists * 30) || 0;
      score += (totalGoals * 5) || 0; // Little bonus for mid goals
    } else if (pos.includes('DEF') || pos.includes('DC') || pos.includes('DD') || pos.includes('DG') || pos.includes('ARR')) {
      score += (totalCleanSheets * 50) || 0;
      score += (totalGoals * 10) || 0; // Defender goals are rare
    } else if (pos.includes('GK') || pos.includes('GB') || pos.includes('GARDIEN')) {
      score += (totalCleanSheets * 100) || 0; // GKs get more points for CS
      score += (totalAssists * 10) || 0;
    } else {
      // Default fallback
      score += (totalGoals * 10) || 0 + (totalAssists * 10) || 0;
    }
  }

  // Averages
  const avgOvr = (player.careerOvrSum || player.ovr) / seasons;
  const avgRating = (player.careerRatingSum || 6.0) / seasons;
  const maxOvr = player.careerMaxOvr || player.ovr;

  score += maxOvr * 200;
  score += avgOvr * 300;
  score += (avgRating * 2000);

  // Rival Impact (Némésis Slayer)
  let isNemesisSlayer = false;
  if (rivalConfrontations) {
    const diff = (rivalConfrontations.won || 0) - (rivalConfrontations.lost || 0);
    if (diff > 0) {
      score += diff * 5000;
      score += 15000; // Énorme bonus pour la domination
      isNemesisSlayer = true;
    } else if (diff < 0) {
      score += diff * 2000; // Malus si le rival vous a dominé
    }
  }

  // Challenge Multiplier
  if (player.challenge && player.challenge !== 'none') {
    const challengeData = CHALLENGES_LIST.find(c => c.id === player.challenge);
    if (challengeData && challengeData.multiplier) {
      score = score * challengeData.multiplier;
    }
  }
  
  return {
    totalScore: Math.round(score),
    maxOvr,
    avgOvr: parseFloat(avgOvr.toFixed(1)),
    avgRating: parseFloat(avgRating.toFixed(2)),
    isNemesisSlayer
  };
};
