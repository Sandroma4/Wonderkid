import { getAccountData, saveAccountData } from './storage';
import { playSound } from './audio';

const DAILY_CHALLENGES_KEY = 'golden_xi_daily_challenges_v1';

// Harder challenges
const CHALLENGE_POOL = [
  { id: 'goals_300', type: 'SCORE_GOALS', title: 'Machine à Buts', description: 'Marquer 300 buts (ou arrêts)', target: 300, reward: 25 },
  { id: 'seasons_30', type: 'PLAY_SEASON', title: 'Légende de la Longévité', description: 'Jouer 30 saisons', target: 30, reward: 20 },
  { id: 'ovr_95', type: 'REACH_OVR', title: 'Perfection', description: 'Atteindre 95 de GEN', target: 95, reward: 50 },
  { id: 'ballondor_3', type: 'WIN_BALLON_DOR', title: 'Le Plus Grand', description: 'Remporter 3 Ballons d\'Or', target: 3, reward: 40 },
  { id: 'trophies_15', type: 'WIN_TROPHY', title: 'Collectionneur', description: 'Gagner 15 trophées majeurs', target: 15, reward: 30 },
  { id: 'assists_150', type: 'ASSISTS', title: 'Maître à Jouer', description: 'Délivrer 150 passes décisives', target: 150, reward: 25 },
  { id: 'clean_sheets_100', type: 'CLEAN_SHEETS', title: 'Muraille Infranchissable', description: 'Garder 100 Clean Sheets', target: 100, reward: 25 }
];

export const getDailyChallengesState = () => {
  try {
    const data = localStorage.getItem(DAILY_CHALLENGES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse daily challenges', e);
  }
  return null;
};

export const saveDailyChallengesState = (state) => {
  try {
    localStorage.setItem(DAILY_CHALLENGES_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save daily challenges', e);
  }
};

export const getOrGenerateDailyChallenges = () => {
  const state = getDailyChallengesState();
  const today = new Date().toLocaleDateString('fr-FR');

  if (!state || state.date !== today) {
    // Generate 3 new distinct challenges
    const shuffled = [...CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map(ch => ({
      ...ch,
      progress: 0,
      completed: false,
      claimed: false
    }));

    const newState = { date: today, challenges: selected };
    saveDailyChallengesState(newState);
    return newState.challenges;
  }

  return state.challenges;
};

// Returns a list of newly completed challenges
export const updateChallengeProgress = (type, amount) => {
  const state = getDailyChallengesState();
  if (!state) return [];
  
  const today = new Date().toLocaleDateString('fr-FR');
  if (state.date !== today) {
    // Date has changed, do not progress yesterday's challenges. They need to be regenerated on view.
    return [];
  }

  let updated = false;
  const newlyCompleted = [];

  state.challenges.forEach(ch => {
    if (ch.type === type && !ch.completed) {
      if (type === 'REACH_OVR') {
        // For OVR, amount is the OVR itself. Progress is max of current and amount.
        ch.progress = Math.max(ch.progress, amount);
      } else {
        ch.progress += amount;
      }
      
      if (ch.progress >= ch.target) {
        ch.progress = ch.target;
        ch.completed = true;
        newlyCompleted.push(ch);
      }
      updated = true;
    }
  });

  if (updated) {
    saveDailyChallengesState(state);
  }

  return newlyCompleted;
};

export const claimChallenge = (challengeId) => {
  const state = getDailyChallengesState();
  if (!state) return false;

  const challenge = state.challenges.find(c => c.id === challengeId);
  if (challenge && challenge.completed && !challenge.claimed) {
    challenge.claimed = true;
    saveDailyChallengesState(state);
    
    // Give rewards
    const accountData = getAccountData();
    accountData.goldenCoins += challenge.reward;
    saveAccountData(accountData);
    
    playSound('coins');
    return true;
  }
  return false;
};
