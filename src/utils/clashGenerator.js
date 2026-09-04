import { getRandomName } from './gameData';

const generateClashPlayer = (tier, position) => {
  const baseOvr = tier === 'BRONZE' ? 65 : tier === 'SILVER' ? 75 : tier === 'GOLD' ? 85 : 92;
  const variation = Math.floor(Math.random() * 5) - 2;
  const ovr = Math.min(99, Math.max(40, baseOvr + variation));
  
  const attributes = {
    pace: Math.min(99, Math.max(1, ovr + Math.floor(Math.random()*15 - 7))),
    finishing: Math.min(99, Math.max(1, ovr + (position === 'ATT' ? 10 : Math.floor(Math.random()*15 - 7)))),
    passing: Math.min(99, Math.max(1, ovr + Math.floor(Math.random()*15 - 7))),
    dribbling: Math.min(99, Math.max(1, ovr + Math.floor(Math.random()*15 - 7))),
    defense: Math.min(99, Math.max(1, ovr + (position === 'DEF' ? 10 : Math.floor(Math.random()*15 - 7)))),
    physical: Math.min(99, Math.max(1, ovr + Math.floor(Math.random()*15 - 7))),
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: getRandomName(),
    lastName: getRandomName(),
    ovr,
    position,
    attributes
  };
};

export const generateClashLeague = () => {
  const tiers = [
    { id: 't1', tier: 'BRONZE', name: "Les Novices", diff: 1, pseudo: "Player_77" },
    { id: 't2', tier: 'SILVER', name: "Les Espoirs", diff: 2, pseudo: "TikiTaka_Master" },
    { id: 't3', tier: 'GOLD', name: "Les Pros", diff: 3, pseudo: "GoldenBoy" },
    { id: 't4', tier: 'ELITE', name: "Les Légendes", diff: 4, pseudo: "El_Matador_99" },
  ];

  return tiers.map(t => {
    return {
      id: t.id,
      name: t.name,
      pseudo: t.pseudo,
      tier: t.tier,
      difficulty: t.diff,
      formation: '1-2-1',
      isDefeated: false,
      players: [
        { player: generateClashPlayer(t.tier, 'GK'), position: 'GK' },
        { player: generateClashPlayer(t.tier, 'DEF'), position: 'DEF' },
        { player: generateClashPlayer(t.tier, 'MIL'), position: 'MIL' },
        { player: generateClashPlayer(t.tier, 'MIL'), position: 'MIL' },
        { player: generateClashPlayer(t.tier, 'ATT'), position: 'ATT' },
      ]
    };
  });
};
