export const PLAYER_TRAITS = [
  {
    id: 'trait_fox',
    name: 'Renard des surfaces',
    icon: '🦊',
    description: 'Buteur né. Améliore vos chances dans les événements de tir.',
    type: 'base'
  },
  {
    id: 'trait_playmaker',
    name: 'Maître à jouer',
    icon: '🎩',
    description: 'Vision de jeu exceptionnelle. Bonus lors des choix collectifs.',
    type: 'base'
  },
  {
    id: 'trait_warrior',
    name: 'Guerrier',
    icon: '⚔️',
    description: 'Ne lâche rien sur le terrain. Avantage lors des duels physiques.',
    type: 'base'
  },
  {
    id: 'trait_speedster',
    name: 'Éclair',
    icon: '⚡',
    description: 'Une pointe de vitesse irrattrapable. (Incompatible avec Colosse)',
    type: 'unlockable',
    conflicts: ['trait_tank'],
    condition: (p) => p.attributes?.pace >= 90
  },
  {
    id: 'trait_sniper',
    name: 'Tireur d\'élite',
    icon: '🎯',
    description: 'Précision chirurgicale devant le but. (Incompatible avec Maestro)',
    type: 'unlockable',
    conflicts: ['trait_maestro'],
    condition: (p) => p.attributes?.finishing >= 90
  },
  {
    id: 'trait_maestro',
    name: 'Maestro',
    icon: '🪄',
    description: 'Des passes qui cassent des lignes. (Incompatible avec Tireur d\'élite)',
    type: 'unlockable',
    conflicts: ['trait_sniper'],
    condition: (p) => p.attributes?.passing >= 90
  },
  {
    id: 'trait_magician',
    name: 'Magicien',
    icon: '✨',
    description: 'Des dribbles imprévisibles. (Incompatible avec Mur infranchissable)',
    type: 'unlockable',
    conflicts: ['trait_wall'],
    condition: (p) => p.attributes?.dribbling >= 90
  },
  {
    id: 'trait_wall',
    name: 'Mur infranchissable',
    icon: '🧱',
    description: 'Rien ne passe. (Incompatible avec Magicien)',
    type: 'unlockable',
    conflicts: ['trait_magician'],
    condition: (p) => p.attributes?.defense >= 90
  },
  {
    id: 'trait_tank',
    name: 'Colosse',
    icon: '🦍',
    description: 'Une puissance physique destructrice. (Incompatible avec Éclair)',
    type: 'unlockable',
    conflicts: ['trait_speedster'],
    condition: (p) => p.attributes?.physical >= 90
  },
  {
    id: 'trait_leader',
    name: 'Leader né',
    icon: '👑',
    description: 'Inspire ses coéquipiers dans la difficulté.',
    type: 'unlockable',
    condition: (p) => (p.careerHistory && p.careerHistory.length >= 5) && p.coachTrust >= 90
  }
];

export const getBaseTraits = () => PLAYER_TRAITS.filter(t => t.type === 'base');

export const checkNewTraits = (player) => {
  const currentTraits = player.traits || [];
  const newTraits = [];
  
  PLAYER_TRAITS.filter(t => t.type === 'unlockable').forEach(trait => {
    const hasConflict = trait.conflicts && trait.conflicts.some(conflictingId => currentTraits.includes(conflictingId));
    
    if (!currentTraits.includes(trait.id) && !hasConflict && trait.condition && trait.condition(player)) {
      newTraits.push(trait.id);
    }
  });
  
  return newTraits;
};

export const getTraitDetails = (traitId) => {
  return PLAYER_TRAITS.find(t => t.id === traitId);
};
