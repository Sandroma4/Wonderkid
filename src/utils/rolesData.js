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
      id: 'role_meneur', name: 'Meneur de jeu', icon: '🎩', desc: 'Le maestro au milieu de terrain.', 
      pros: '+15% Passe', cons: '-15% Défense', multipliers: { passing: 1.15, defense: 0.85 } 
    },
    { 
      id: 'role_b2b', name: 'Box-to-Box', icon: '🏃', desc: 'Infatigable, il couvre tout le terrain.', 
      pros: '+15% Physique', cons: '-15% Dribble', multipliers: { physical: 1.15, dribbling: 0.85 } 
    },
    { 
      id: 'role_sentinelle', name: 'Récupérateur', icon: '🛡️', desc: 'Un mur infranchissable au milieu.', 
      pros: '+15% Défense', cons: '-15% Tir', multipliers: { defense: 1.15, finishing: 0.85 } 
    },
    { 
      id: 'role_regista', name: 'Regista', icon: '🎯', desc: 'Dicte le tempo depuis sa position très reculée.', 
      pros: '+15% Passe', cons: '-15% Physique', multipliers: { passing: 1.15, physical: 0.85 } 
    },
    { 
      id: 'role_mo', name: 'Milieu offensif', icon: '✨', desc: 'Le numéro 10 classique, crée le danger mais défend peu.', 
      pros: '+15% Dribble/Passe', cons: '-15% Défense', multipliers: { dribbling: 1.10, passing: 1.05, defense: 0.85 } 
    },
    { 
      id: 'role_mezzala', name: 'Mezzala', icon: '🌪️', desc: 'Milieu de terrain hybride s\'excentrant pour créer des décalages.', 
      pros: '+15% Vitesse/Passe', cons: '-15% Défense', multipliers: { pace: 1.10, passing: 1.05, defense: 0.85 } 
    }
  ],
  DEF: [
    { 
      id: 'role_libero', name: 'Libéro', icon: '🦅', desc: 'Couvre les espaces derrière la défense.', 
      pros: '+15% Défense', cons: '-15% Vitesse', multipliers: { defense: 1.15, pace: 0.85 } 
    },
    { 
      id: 'role_relanceur', name: 'Relanceur', icon: '🎯', desc: 'Joue court et propre depuis l\'arrière.', 
      pros: '+15% Passe', cons: '-15% Physique', multipliers: { passing: 1.15, physical: 0.85 } 
    },
    { 
      id: 'role_stoppeur', name: 'Stoppeur', icon: '🧱', desc: 'Rugueux et impitoyable dans les duels.', 
      pros: '+15% Physique/Défense', cons: '-15% Vitesse', multipliers: { physical: 1.10, defense: 1.05, pace: 0.85 } 
    },
    { 
      id: 'role_arriere_lateral', name: 'Arrière latéral', icon: '🛡️', desc: 'Solide défensivement sur son couloir, il monte peu.', 
      pros: '+15% Défense/Vitesse', cons: '-15% Passe', multipliers: { defense: 1.10, pace: 1.05, passing: 0.85 } 
    },
    { 
      id: 'role_piston', name: 'Piston', icon: '⚡', desc: 'Très offensif, il arpente tout le couloir inlassablement.', 
      pros: '+15% Vitesse/Passe', cons: '-15% Défense', multipliers: { pace: 1.10, passing: 1.05, defense: 0.85 } 
    }
  ],
  GK: [
    { 
      id: 'role_gardien_but', name: 'Gardien de but', icon: '🧤', desc: 'Un gardien classique et équilibré.', 
      pros: '+10% Plongeon, +5% Maniabilité', cons: '-15% Vitesse', multipliers: { diving: 1.10, handling: 1.05, pace: 0.85 } 
    },
    { 
      id: 'role_gardien_libero', name: 'Gardien libéro', icon: '🎯', desc: 'Joue haut et participe à la relance.', 
      pros: '+15% Jeu au pied/Vitesse', cons: '-15% Réflexes', multipliers: { kicking: 1.10, pace: 1.05, reflexes: 0.85 } 
    },
    { 
      id: 'role_gardien_ligne', name: 'Gardien de ligne', icon: '🐈', desc: 'Imbattable sur sa ligne, relance basique.', 
      pros: '+15% Réflexes', cons: '-15% Jeu au pied', multipliers: { reflexes: 1.15, kicking: 0.85 } 
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
