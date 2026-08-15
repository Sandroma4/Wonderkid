export const ROLES_DATA = {
  ATT: [
    { 
      id: 'role_renard', 
      name: 'Renard des surfaces', 
      icon: '🦊', 
      desc: 'Un tir létal mais participe moins au jeu.', 
      pros: '+15% Tir', cons: '-15% Passe', 
      multipliers: { finishing: 1.15, passing: 0.85 } 
    },
    { 
      id: 'role_faux9', 
      name: 'Faux 9', 
      icon: '🎯', 
      desc: 'Décroche pour organiser le jeu au détriment de la présence dans la surface.', 
      pros: '+15% Passe', cons: '-15% Physique', 
      multipliers: { passing: 1.15, physical: 0.85 } 
    },
    { 
      id: 'role_pivot', 
      name: 'Attaquant Pivot', 
      icon: '🏗️', 
      desc: 'Fixe les défenses par sa présence athlétique.', 
      pros: '+15% Physique', cons: '-15% Vitesse', 
      multipliers: { physical: 1.15, pace: 0.85 } 
    },
    { 
      id: 'role_complet', 
      name: 'Attaquant Complet', 
      icon: '🌟', 
      desc: 'À l\'aise dans tous les compartiments de l\'attaque, mais moins impliqué défensivement.', 
      pros: '+5% Offensif', cons: '-15% Défense', 
      multipliers: { pace: 1.05, finishing: 1.05, passing: 1.05, dribbling: 1.05, physical: 1.05, defense: 0.85 } 
    },
    { 
      id: 'role_retrait', 
      name: 'Attaquant en retrait', 
      icon: '♟️', 
      desc: 'Sert de relais et dicte le tempo, mais manque parfois d\'explosivité.', 
      pros: '+10% Passe/Dribble', cons: '-15% Vitesse', 
      multipliers: { passing: 1.10, dribbling: 1.10, pace: 0.85 } 
    },
    { 
      id: 'role_pressing', 
      name: 'Attaquant de pressing', 
      icon: '🏃‍♂️', 
      desc: 'Harcèle la défense adverse sans relâche, mais perd en lucidité devant le but.', 
      pros: '+15% Déf/Phys', cons: '-15% Tir', 
      multipliers: { defense: 1.15, physical: 1.10, finishing: 0.85 } 
    }
  ],
  MID: [
    { 
      id: 'role_meneur', 
      name: 'Meneur de jeu', 
      icon: '🎩', 
      desc: 'Le maestro au milieu de terrain.', 
      pros: '+15% Passe', cons: '-15% Défense', 
      multipliers: { passing: 1.15, defense: 0.85 } 
    },
    { 
      id: 'role_b2b', 
      name: 'Box-to-Box', 
      icon: '🏃', 
      desc: 'Infatigable, il couvre tout le terrain.', 
      pros: '+15% Physique', cons: '-15% Dribble', 
      multipliers: { physical: 1.15, dribbling: 0.85 } 
    },
    { 
      id: 'role_sentinelle', 
      name: 'Récupérateur', 
      icon: '🛡️', 
      desc: 'Un mur infranchissable au milieu.', 
      pros: '+15% Défense', cons: '-15% Tir', 
      multipliers: { defense: 1.15, finishing: 0.85 } 
    }
  ],
  DEF: [
    { 
      id: 'role_libero', 
      name: 'Libéro / Relanceur', 
      icon: '🦅', 
      desc: 'Le premier attaquant, avec une relance propre.', 
      pros: '+15% Passe', cons: '-15% Physique', 
      multipliers: { passing: 1.15, physical: 0.85 } 
    },
    { 
      id: 'role_stoppeur', 
      name: 'Stoppeur', 
      icon: '🧱', 
      desc: 'Rugueux et impitoyable dans les duels.', 
      pros: '+15% Défense', cons: '-15% Vitesse', 
      multipliers: { defense: 1.15, pace: 0.85 } 
    },
    { 
      id: 'role_lateral', 
      name: 'Latéral Offensif', 
      icon: '⚡', 
      desc: 'Apporte le danger sur les ailes.', 
      pros: '+15% Vitesse', cons: '-15% Défense', 
      multipliers: { pace: 1.15, defense: 0.85 } 
    }
  ],
  GK: [
    { 
      id: 'role_ligne', 
      name: 'Gardien de ligne', 
      icon: '🐈', 
      desc: 'Des réflexes sur sa ligne hors normes.', 
      pros: '+15% Défense', cons: '-15% Passe', 
      multipliers: { defense: 1.15, passing: 0.85 } 
    },
    { 
      id: 'role_moderne', 
      name: 'Gardien relanceur', 
      icon: '🎯', 
      desc: 'Participe à la relance courte avec aisance.', 
      pros: '+15% Passe', cons: '-15% Défense', 
      multipliers: { passing: 1.15, defense: 0.85 } 
    }
  ]
};

export const getRoleById = (roleId) => {
  if (!roleId) return null;
  for (const position of Object.keys(ROLES_DATA)) {
    const role = ROLES_DATA[position].find(r => r.id === roleId);
    if (role) return role;
  }
  return null;
};
