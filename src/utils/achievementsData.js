export const ACHIEVEMENTS = [
  {
    id: 'ach_first_contract',
    title: 'Premier Contrat',
    description: 'Signer dans votre tout premier club professionnel.',
    icon: '🟢',
    rarity: 'common'
  },
  {
    id: 'ach_golden_boy',
    title: 'Golden Boy',
    description: 'Remporter le trophée Kopa du meilleur jeune joueur.',
    icon: '👶',
    rarity: 'rare'
  },
  {
    id: 'ach_goal_machine',
    title: 'Machine à Buts',
    description: 'Gagner le trophée Gerd Müller.',
    icon: '⚽',
    rarity: 'epic'
  },
  {
    id: 'ach_iron_wall',
    title: 'Mur de Fer',
    description: 'Remporter le trophée Yachine du meilleur gardien.',
    icon: '🧤',
    rarity: 'epic'
  },
  {
    id: 'ach_king_europe',
    title: 'Roi d\'Europe',
    description: 'Remporter la Ligue des Champions.',
    icon: '🇪🇺',
    rarity: 'epic'
  },
  {
    id: 'ach_national_hero',
    title: 'Héros National',
    description: 'Remporter la Coupe du Monde.',
    icon: '🌎',
    rarity: 'legendary'
  },
  {
    id: 'ach_euro_king',
    title: 'Continent Conquis',
    description: 'Remporter l\'Euro.',
    icon: '🇪🇺',
    rarity: 'legendary'
  },
  {
    id: 'ach_europa_league',
    title: 'Prince d\'Europe',
    description: 'Remporter la Ligue Europa.',
    icon: '🥈',
    rarity: 'epic'
  },
  {
    id: 'ach_conference_league',
    title: 'Baroudeur',
    description: 'Remporter la Conference League.',
    icon: '🥉',
    rarity: 'rare'
  },
  {
    id: 'ach_cup_winner',
    title: 'Roi des Coupes',
    description: 'Remporter la Coupe Nationale.',
    icon: '🏆',
    rarity: 'epic'
  },
  {
    id: 'ach_world_summit',
    title: 'Sommet du Monde',
    description: 'Gagner le Ballon d\'Or.',
    icon: '⭐',
    rarity: 'legendary'
  },
  {
    id: 'ach_millionaire',
    title: 'Nouveau Riche',
    description: 'Atteindre 1 000 000 € sur votre compte en banque.',
    icon: '💰',
    rarity: 'rare'
  },
  {
    id: 'ach_luxury',
    title: 'Luxe Absolu',
    description: 'Acheter la Villa d\'architecte avec piscine.',
    icon: '💎',
    rarity: 'epic'
  },
  {
    id: 'ach_relegation',
    title: 'Descente aux Enfers',
    description: 'Connaître une relégation avec son club.',
    icon: '📉',
    rarity: 'rare'
  }
];

export const checkAchievements = (player, seasonStats, currentClub) => {
  const newUnlocks = [];
  
  if (currentClub) {
    newUnlocks.push('ach_first_contract');
  }

  if (seasonStats && seasonStats.awards) {
    const awardTexts = seasonStats.awards.map(a => a.text);
    if (awardTexts.includes('Trophée Kopa')) newUnlocks.push('ach_golden_boy');
    if (awardTexts.includes('Trophée Gerd Müller')) newUnlocks.push('ach_goal_machine');
    if (awardTexts.includes('Trophée Yachine')) newUnlocks.push('ach_iron_wall');
    if (awardTexts.includes('Ballon d\'Or')) newUnlocks.push('ach_world_summit');
  }

  if (seasonStats && seasonStats.tournaments) {
    if (seasonStats.tournaments.championsLeague?.stage === 'Vainqueur') newUnlocks.push('ach_king_europe');
    if (seasonStats.tournaments.europaLeague?.stage === 'Vainqueur') newUnlocks.push('ach_europa_league');
    if (seasonStats.tournaments.conferenceLeague?.stage === 'Vainqueur') newUnlocks.push('ach_conference_league');
    if (seasonStats.tournaments.worldCup?.stage === 'Vainqueur') newUnlocks.push('ach_national_hero');
    if (seasonStats.tournaments.euro?.stage === 'Vainqueur') newUnlocks.push('ach_euro_king');
    if (seasonStats.tournaments.domesticCup?.stage === 'Vainqueur') newUnlocks.push('ach_cup_winner');
  }

  if (player.bankBalance >= 1000000) {
    newUnlocks.push('ach_millionaire');
  }

  if (player.inventory && player.inventory.includes('villa')) {
    newUnlocks.push('ach_luxury');
  }

  if (seasonStats && seasonStats.isRelegated) {
    newUnlocks.push('ach_relegation');
  }

  return newUnlocks;
};
