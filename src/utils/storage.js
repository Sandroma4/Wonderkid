import { supabase } from '../supabaseClient';

const PALMARES_KEY = 'golden_xi_global_palmares_v3';
const ACHIEVEMENTS_KEY = 'golden_xi_achievements_v3';
const PSEUDO_KEY = 'golden_xi_pseudonym';
const CARD_COLLECTION_KEY = 'golden_xi_card_collection_v1';
const FIVE_TEAMS_KEY = 'golden_xi_five_teams_v1';

export const savePseudonym = (pseudo) => {
  try {
    localStorage.setItem(PSEUDO_KEY, pseudo);
  } catch (e) {
    console.error('Failed to save pseudonym', e);
  }
};

export const getPseudonym = () => {
  try {
    return localStorage.getItem(PSEUDO_KEY) || null;
  } catch (e) {
    return null;
  }
};

export const getGlobalPalmares = () => {
  try {
    const data = localStorage.getItem(PALMARES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveToGlobalPalmares = (newTrophies) => {
  if (!newTrophies || newTrophies.length === 0) return;
  const current = getGlobalPalmares();
  // We can just add them with a timestamp to sort them if needed, or just append
  const combined = [...newTrophies, ...current];
  try {
    localStorage.setItem(PALMARES_KEY, JSON.stringify(combined));
  } catch (e) {
    console.error('Failed to save palmares', e);
  }
};

export const getUnlockedAchievements = () => {
  try {
    const data = localStorage.getItem(ACHIEVEMENTS_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return parsed.map(a => typeof a === 'string' ? { id: a, date: null } : a);
  } catch (e) {
    return [];
  }
};

export const unlockAchievement = (achievementId) => {
  const current = getUnlockedAchievements();
  if (!current.some(a => a.id === achievementId)) {
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const updated = [...current, { id: achievementId, date: dateStr }];
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save achievement', e);
    }
  }
};

export const getCardCollection = () => {
  try {
    const data = localStorage.getItem(CARD_COLLECTION_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveCardToCollection = (player, palmares, maxOvr) => {
  const current = getCardCollection();
  const best = player.bestCard || {};
  
  // Create a snapshot of the player card (best version of career)
  const cardData = {
    id: Date.now().toString(),
    name: player.name,
    lastName: player.lastName || best.lastName,
    ovr: best.ovr || maxOvr || player.ovr,
    position: best.position || player.position,
    origin: typeof player.origin === 'object' ? player.origin.id : (best.origin || player.origin),
    club: best.club || (player.club ? { id: player.club.id, name: player.club.name, logo: player.club.logo, primary: player.club.primary, secondary: player.club.secondary } : null),
    attributes: best.attributes || player.attributes,
    traits: player.traits || [],
    date: new Date().toLocaleDateString('fr-FR'),
    ballonDor: palmares?.filter(t => t.text.toLowerCase().includes("ballon d'or")).length || 0,
    trophies: palmares?.length || 0
  };

  // Prevent duplicates (same name, ovr, and date)
  const isDuplicate = current.some(card => 
    card.name === cardData.name && 
    card.ovr === cardData.ovr && 
    card.date === cardData.date
  );

  if (isDuplicate) {
    return;
  }

  const updated = [cardData, ...current];
  
  try {
    localStorage.setItem(CARD_COLLECTION_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save card collection', e);
  }
};

export const getFiveTeams = () => {
  try {
    const data = localStorage.getItem(FIVE_TEAMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveFiveTeams = (teams) => {
  try {
    localStorage.setItem(FIVE_TEAMS_KEY, JSON.stringify(teams));
  } catch (e) {
    console.error('Failed to save five teams', e);
  }
};

const GAME_STATE_KEY = 'golden_xi_game_state';

export const saveGameStateLocal = (gameState) => {
  try {
    if (!gameState) {
      localStorage.removeItem(GAME_STATE_KEY);
      return;
    }
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.error('Failed to save game state', e);
  }
};

const migrateGameState = (state) => {
  if (!state || !state.player) return state;
  const pos = (state.player.position || '').toUpperCase();
  if (pos.includes('GK') || pos.includes('GB')) {
    if (state.player.attributes && state.player.attributes.handling === undefined) {
      // Migrate outfield stats to GK stats if missing
      state.player.attributes.diving = state.player.attributes.finishing || 70;
      state.player.attributes.handling = state.player.attributes.dribbling || 70;
      state.player.attributes.kicking = state.player.attributes.passing || 70;
      state.player.attributes.reflexes = state.player.attributes.defense || 70;
      state.player.attributes.positioning = state.player.attributes.physical || 70;
    }
  }
  return state;
};

export const loadGameStateLocal = () => {
  try {
    const data = localStorage.getItem(GAME_STATE_KEY);
    return data ? migrateGameState(JSON.parse(data)) : null;
  } catch (e) {
    return null;
  }
};

export const saveGameStateCloud = async (gameState) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    await supabase.from('profiles').upsert({
      id: session.user.id,
      save_data: gameState
    });
  } catch (e) {
    console.error('Failed to save game state to cloud', e);
  }
};

export const loadGameStateCloud = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    const { data, error } = await supabase.from('profiles')
      .select('save_data')
      .eq('id', session.user.id)
      .single();
      
    if (error) return null;
    return data?.save_data ? migrateGameState(data.save_data) : null;
  } catch (e) {
    console.error('Failed to load game state from cloud', e);
    return null;
  }
};


export const saveMultiplayerSession = (sessionData) => {
  try {
    if (sessionData) {
      localStorage.setItem('wonderkid_mp_session', JSON.stringify(sessionData));
    } else {
      localStorage.removeItem('wonderkid_mp_session');
    }
  } catch (e) {
    console.error("Erreur de sauvegarde de la session multijoueur:", e);
  }
};

export const loadMultiplayerSession = () => {
  try {
    const data = localStorage.getItem('wonderkid_mp_session');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Erreur de chargement de la session multijoueur:", e);
    return null;
  }
};

export const clearMultiplayerSession = () => {
  localStorage.removeItem('wonderkid_mp_session');
};

const ACCOUNT_DATA_KEY = 'golden_xi_account_data';

export const getAccountData = () => {
  try {
    const data = localStorage.getItem(ACCOUNT_DATA_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return {
      goldenCoins: parsed.goldenCoins || 0,
      unlockedPerks: parsed.unlockedPerks || [],
      unlockedCosmetics: parsed.unlockedCosmetics || ['default'],
      equippedCosmetic: parsed.equippedCosmetic || 'default'
    };
  } catch (e) {
    return { goldenCoins: 0, unlockedPerks: [], unlockedCosmetics: ['default'], equippedCosmetic: 'default' };
  }
};

export const saveAccountData = (data) => {
  try {
    localStorage.setItem(ACCOUNT_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save account data', e);
  }
};
