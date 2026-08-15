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

  // Averages
  const seasons = player.careerSeasons || 1;
  const avgOvr = (player.careerOvrSum || player.ovr) / seasons;
  const avgRating = (player.careerRatingSum || 6.0) / seasons;
  const maxOvr = player.careerMaxOvr || player.ovr;

  score += maxOvr * 200;
  score += avgOvr * 300;
  score += (avgRating * 2000);

  // Rival Impact
  if (rivalConfrontations) {
    const diff = (rivalConfrontations.won || 0) - (rivalConfrontations.lost || 0);
    if (diff > 0) {
      score += diff * 2000;
    } else if (diff < 0) {
      score += diff * 1000; // Negative score impact
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
    avgRating: parseFloat(avgRating.toFixed(2))
  };
};
