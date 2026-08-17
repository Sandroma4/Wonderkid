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
  },
  {
    id: 'ach_perfection',
    title: 'Perfection Absolue',
    description: 'Atteindre la note maximale (99) de Général.',
    icon: '⭐',
    rarity: 'legendary'
  },
  {
    id: 'ach_polyvalent',
    title: 'Joueur Polyvalent',
    description: 'Avoir au moins 85 dans trois statistiques différentes.',
    icon: '🔄',
    rarity: 'epic'
  },
  {
    id: 'ach_late_bloomer',
    title: 'Gloire Tardive',
    description: 'Remporter son premier Ballon d\'Or après 30 ans.',
    icon: '🤓',
    rarity: 'epic'
  },
  {
    id: 'ach_veteran',
    title: 'La Fin d\'une Ère',
    description: 'Jouer 15 saisons ou plus dans votre carrière.',
    icon: '👴',
    rarity: 'rare'
  },
  {
    id: 'ach_mercenary',
    title: 'Mercenaire',
    description: 'Connaître au moins 5 clubs différents.',
    icon: '💸',
    rarity: 'rare'
  },
  {
    id: 'ach_one_club_man',
    title: 'L\'Enfant du Club',
    description: 'Passer 10 saisons consécutives dans le même club.',
    icon: '🏠',
    rarity: 'legendary'
  },
  {
    id: 'ach_local_legend',
    title: 'Légende Locale',
    description: 'Remporter 5 fois le Championnat.',
    icon: '🏅',
    rarity: 'rare'
  },
  {
    id: 'ach_wall_street',
    title: 'Loup de Wall Street',
    description: 'Amasser plus de 50 000 000 €.',
    icon: '📈',
    rarity: 'epic'
  },
  {
    id: 'ach_collector',
    title: 'Collectionneur Compulsif',
    description: 'Acheter 10 investissements.',
    icon: '🛍️',
    rarity: 'legendary'
  },
  {
    id: 'ach_benchwarmer',
    title: 'Banc de Touche',
    description: 'Avoir une confiance du coach inférieure à 20%.',
    icon: '🪑',
    rarity: 'common'
  },
  {
    id: 'ach_charity',
    title: 'Mécène',
    description: 'Faire un don important (Acheter Mécénat).',
    icon: '🤲',
    rarity: 'rare'
  },
  {
    id: 'ach_jet',
    title: 'Flambeur',
    description: 'Acheter le Jet Privé.',
    icon: '✈️',
    rarity: 'common'
  },
];

export const checkAchievements = (player, seasonStats, currentClub, palmares = []) => {
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


  if (player.ovr >= 99) {
    newUnlocks.push('ach_perfection');
  }

  const highStats = Object.values(player.attributes || {}).filter(val => val >= 85).length;
  if (highStats >= 3) {
    newUnlocks.push('ach_polyvalent');
  }

  if (player.age >= 30 && seasonStats?.awards?.some(a => a.text === "Ballon d'Or")) {
    newUnlocks.push('ach_late_bloomer');
  }

  if (player.careerSeasons >= 15) {
    newUnlocks.push('ach_veteran');
  }

  const uniqueClubs = new Set((player.careerHistory || []).map(h => h.club));
  if (uniqueClubs.size >= 5) {
    newUnlocks.push('ach_mercenary');
  }

  if (player.clubYears >= 10) {
    newUnlocks.push('ach_one_club_man');
  }

  const leagueTitles = palmares.filter(p => p.text === 'Vainqueur du Championnat').length;
  if (leagueTitles >= 5) {
    newUnlocks.push('ach_local_legend');
  }

  if (player.bankBalance >= 50000000) {
    newUnlocks.push('ach_wall_street');
  }

  if (player.inventory && player.inventory.length >= 10) {
    newUnlocks.push('ach_collector');
  }

  if (player.coachTrust <= 20) {
    newUnlocks.push('ach_benchwarmer');
  }

  if (player.inventory && player.inventory.includes('mecenat')) {
    newUnlocks.push('ach_charity');
  }

  if (player.inventory && player.inventory.includes('jet_prive')) {
    newUnlocks.push('ach_jet');
  }

  return newUnlocks;
};
