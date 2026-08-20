import { useState, useEffect } from 'react';
import { CharacterCreation } from './components/CharacterCreation';
import { Dashboard } from './components/Dashboard';
import { MainMenu } from './components/MainMenu';
import { MultiplayerLobby } from './components/MultiplayerLobby';
import { FutsalLobby } from './components/FutsalLobby';
import { FutsalTeamsManager } from './components/FutsalTeamsManager';
import { FutsalMatch } from './components/FutsalMatch';
import { GlobalPalmares } from './components/GlobalPalmares';
import { Achievements } from './components/Achievements';
import { Leaderboard } from './components/Leaderboard';
import { CareerHistory } from './components/CareerHistory';
import { CardCollection } from './components/CardCollection';
import { playSound } from './utils/audio';
import { saveToGlobalPalmares, unlockAchievement, saveGameStateLocal, saveGameStateCloud, loadGameStateLocal, loadGameStateCloud, getPseudonym, savePseudonym, saveCardToCollection, saveMultiplayerSession, loadMultiplayerSession, clearMultiplayerSession } from './utils/storage';
import { createMultiplayerRoom } from './utils/multiplayer';
import { PseudonymModal } from './components/PseudonymModal';
import { checkAchievements } from './utils/achievementsData';
import { simulateTournaments, calculateAwards, calculateUniqueAwards, updateClubOvr } from './utils/awards';
import { InternationalTournamentModal } from './components/InternationalTournamentModal';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { supabase } from './supabaseClient';
import { calculateCareerScore } from './utils/scoreCalculator';
import { 
  calculateOVR, 
  calculatePlayerStatus, 
  generate6ClubOffers, 
  getRandomSeasonEvents, 
  simulateSeasonStats, 
  generateInterSeasonOffers,
  generateRival,
  updateRival,
  INTERACTIVE_MATCH_SCENARIOS,
  playInteractiveMatch,
  PERKS_LIST,
  calculatePlayerValue,
  calculateSalaryOffer,
  getMatchesForClub,
  distributeExcessStats,
  updatePlayerBestCard,
  COUNTRIES
} from './utils/gameData';
import { getRoleById } from './utils/rolesData';

export default function App() {
  const [appView, setAppView] = useState('mainMenu');
  const [inviteCode, setInviteCode] = useState(null); // 'mainMenu', 'career', 'globalPalmares', 'achievements', 'cardCollection'
  const [gameState, setGameState] = useState(null);
  const [multiplayerContext, setMultiplayerContext] = useState(null);

  // 1. Restore Multiplayer Session on Mount
  useEffect(() => {
    const savedSession = loadMultiplayerSession();
    if (savedSession && savedSession.roomId && savedSession.playerId) {
      // Recreate the room object
      // We pass an empty state initially, or if we have a saved game state we can use that?
      // Actually, if we restore the session, the local state is what we had.
      // We'll let `Dashboard` or `CharacterCreation` sync the state back up when they mount.
      const initialLocalState = savedSession.localState || { isHost: savedSession.isHost };
      const roomObj = createMultiplayerRoom(savedSession.roomId, savedSession.playerId, initialLocalState, (updatedPlayers) => {
        setMultiplayerContext(prev => prev ? { ...prev, players: updatedPlayers } : null);
      });
      
      setMultiplayerContext({
        roomObj,
        playerId: savedSession.playerId,
        players: savedSession.players || [],
        roomId: savedSession.roomId,
        isHost: savedSession.isHost
      });

      if (savedSession.appView === 'career') {
        const savedState = loadGameStateLocal();
        if (savedState) {
          setGameState(savedState);
          setAppView('career');
        } else {
          // If no game state, they were probably in character creation
          setAppView('career'); // App logic routes to CharacterCreation if !gameState
        }
      } else if (savedSession.appView === 'multiplayerLobby') {
        setAppView('multiplayerLobby');
      }
    }
  }, []);

  // 2. Save Multiplayer Session on Change
  useEffect(() => {
    if (multiplayerContext?.roomId && multiplayerContext?.playerId) {
      // Save
      saveMultiplayerSession({
        roomId: multiplayerContext.roomId,
        playerId: multiplayerContext.playerId,
        isHost: multiplayerContext.isHost,
        players: multiplayerContext.players,
        appView: appView,
        // We can optionally store localState if we track it, but isHost is the most important
      });
    } else if (multiplayerContext === null && appView === 'mainMenu') {
      // clearMultiplayerSession is handled manually on quit
    }
  }, [multiplayerContext?.roomId, multiplayerContext?.playerId, multiplayerContext?.players, appView]);


  useEffect(() => {
    if (multiplayerContext?.roomObj) {
      multiplayerContext.roomObj.setOnStateChange((updatedPlayers) => {
        setMultiplayerContext(prev => ({ ...prev, players: updatedPlayers }));
      });
      multiplayerContext.roomObj.setOnBroadcast((payload) => {
        if (payload.type === 'INITIAL_CLUB') {
          handleChooseClub(payload.club, true);
        } else if (payload.type === 'MULTIPLAYER_SEASON_RESULTS') {
          applyMultiplayerSeasonResults(payload.results);
          if (!multiplayerContext.isHost) {
            multiplayerContext.roomObj.updateState({ eventsFinished: false });
          }
        } else if (payload.type === 'PLAYER_QUIT') {
          alert("L'autre joueur a quitté la partie.");
          handleRestartGame();
        } else if (payload.type === 'COOP_CONSEQUENCE') {
          const { narrative, stats } = payload.effect;
          alert(`📢 INTERACTION COOP :\n\n${narrative}`);
          
          setGameState(prev => {
            if (!prev) return prev;
            const updatedPlayer = { ...prev.player };
            if (stats.morale) updatedPlayer.morale = Math.max(0, Math.min(100, (updatedPlayer.morale || 50) + stats.morale));
            if (stats.form) updatedPlayer.form = Math.max(0, Math.min(100, (updatedPlayer.form || 50) + stats.form));
            if (stats.coachTrust) updatedPlayer.coachTrust = Math.max(0, Math.min(100, (updatedPlayer.coachTrust || 50) + stats.coachTrust));
            
            return { ...prev, player: updatedPlayer };
          });
        }
      });
    }
  }, [multiplayerContext?.roomObj]);

  useEffect(() => {
    if (multiplayerContext?.roomObj && gameState?.player) {
      multiplayerContext.roomObj.updateState({
        name: gameState.player.name,
        ovr: gameState.player.ovr,
        attributes: gameState.player.attributes,
        club: gameState.club,
        season: gameState.season,
        readyForNextSeason: !!gameState.seasonStats,
        isRetired: !!gameState.isRetired,
        finalScore: gameState.isRetired ? calculateCareerScore(gameState.player, gameState.rivalConfrontations).totalScore : 0,
        ballonDorCount: gameState.palmares ? gameState.palmares.filter(p => p.trophy === "Ballon d'Or").length : 0,
        trophiesCount: gameState.palmares ? gameState.palmares.length : 0
      });
    }
  }, [gameState?.player?.ovr, gameState?.club?.name, gameState?.season, !!gameState?.seasonStats, !!gameState?.isRetired, gameState?.palmares?.length]);



  // Coop Mercato Vote Resolution
  useEffect(() => {
    if (multiplayerContext?.isCoopMode && gameState?.isWaitingForMercato) {
      const players = multiplayerContext.players;
      if (players.length === 2 && players.every(p => p.mercatoVote !== undefined)) {
        const votes = players.map(p => p.mercatoVote);
        if (votes[0] === votes[1]) {
           // Agree! Execute transfer
           if (votes[0] === 'STAY') {
             handleStayCurrentClub(true);
           } else {
             handleAcceptTransferOffer(gameState.mercatoPendingVote, true);
           }
           multiplayerContext.roomObj.updateState({ mercatoVote: undefined });
        } else {
           // Disagree! Reset
           multiplayerContext.roomObj.updateState({ mercatoVote: undefined });
           setGameState(prev => ({ ...prev, isWaitingForMercato: false, mercatoPendingVote: null }));
           // Optional: You could show a Toast here saying "Désaccord avec votre coéquipier !"
        }
      }
    }
  }, [multiplayerContext?.players, gameState?.isWaitingForMercato]);

  // Multiplayer Season Sync
  useEffect(() => {
    if (multiplayerContext?.isHost && gameState?.isWaitingForMultiplayerSync) {
      const allFinished = multiplayerContext.players.length === 2 && multiplayerContext.players.every(p => p.eventsFinished);
      if (allFinished) {
        const hostState = multiplayerContext.players.find(p => p.isHost);
        const clientState = multiplayerContext.players.find(p => !p.isHost);
        
        if (!hostState.seasonData || !clientState.seasonData) return;

        let finalHostTourney = hostState.seasonData.tournamentStats;
        let finalClientTourney = clientState.seasonData.tournamentStats;

        if (multiplayerContext.isCoopMode) {
          const combinedPlayer = { ...hostState.player, ovr: Math.min(99, Math.floor((hostState.player.ovr + clientState.player.ovr) / 1.6)) };
          const combinedTourney = simulateTournaments(combinedPlayer, hostState.club, hostState.seasonData.dummyStats, hostState.seasonData.seasonIndex, hostState.seasonData.lastSeasonStats);
          finalHostTourney = combinedTourney;
          finalClientTourney = combinedTourney;
        }

        const { awardsA, ballonDorRankA, awardsB, ballonDorRankB } = calculateUniqueAwards(
          hostState.player, hostState.club, hostState.seasonData.dummyStats, finalHostTourney,
          clientState.player, clientState.club, clientState.seasonData.dummyStats, finalClientTourney,
          hostState.seasonData.seasonIndex
        );

        const hostFullStats = {
          ...hostState.seasonData.dummyStats,
          tournaments: finalHostTourney,
          awards: awardsA,
          ballonDorRank: ballonDorRankA
        };

        const clientFullStats = {
          ...clientState.seasonData.dummyStats,
          tournaments: finalClientTourney,
          awards: awardsB,
          ballonDorRank: ballonDorRankB
        };

        // Only host calculates interseason offers for Coop, but for 1v1 they can just keep their own or host calculates for both
        const hostOffers = generateInterSeasonOffers(hostState.player, hostState.club, null, hostState.clubEvolutions || {});
        const clientOffers = generateInterSeasonOffers(clientState.player, clientState.club, null, clientState.clubEvolutions || {});
        
        const hostFinals = Object.keys(finalHostTourney).filter(key => finalHostTourney[key] && (finalHostTourney[key].stage === 'Finaliste' || finalHostTourney[key].stage === 'Vainqueur'));
        const clientFinals = Object.keys(finalClientTourney).filter(key => finalClientTourney[key] && (finalClientTourney[key].stage === 'Finaliste' || finalClientTourney[key].stage === 'Vainqueur'));

        const payload = {
          hostPayload: { fullStats: hostFullStats, finalsToPlay: hostFinals, interSeasonOffers: hostOffers },
          clientPayload: { fullStats: clientFullStats, finalsToPlay: clientFinals, interSeasonOffers: clientOffers }
        };

        multiplayerContext.roomObj.sendBroadcast({ type: 'MULTIPLAYER_SEASON_RESULTS', results: payload });
        
        applyMultiplayerSeasonResults(payload);
        
        multiplayerContext.roomObj.updateState({ eventsFinished: false });
      }
    }
  }, [multiplayerContext?.players, gameState?.isWaitingForMultiplayerSync]);

  const [activeOutcome, setActiveOutcome] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPseudoModal, setShowPseudoModal] = useState(false);
  const [currentPseudonym, setCurrentPseudonym] = useState('');

  // Check on mount if pseudo already chosen
  useEffect(() => {
    const existing = getPseudonym();
    if (!existing) {
      setShowPseudoModal(true);
    } else {
      setCurrentPseudonym(existing);
    }
  }, []);

  const handlePseudoConfirm = (pseudo) => {
    setCurrentPseudonym(pseudo);
    setShowPseudoModal(false);
  };

  useEffect(() => {
    const saveState = async () => {
      if (gameState !== null) {
        saveGameStateLocal(gameState);
        await saveGameStateCloud(gameState);
      }
    };
    saveState();
  }, [gameState]);

  const handleLoadGame = async () => {
    let savedState = loadGameStateLocal();
    if (!savedState) {
      savedState = await loadGameStateCloud();
    }
    if (savedState) {
      setGameState(savedState);
      setAppView('career');
    }
  };

  useEffect(() => {
    if (gameState?.isWaitingForMercato && multiplayerContext?.players) {
      const opponent = multiplayerContext.players.find(p => p.playerId !== multiplayerContext.playerId);
      if (!opponent || opponent.mercatoFinished) {
        // Both are ready or opponent left, proceed
        setGameState(prev => ({ ...prev, isWaitingForMercato: false }));
        // Reset our state for next season
        if (multiplayerContext.roomObj) {
          multiplayerContext.roomObj.updateState({ mercatoFinished: false });
        }
        handleProceedToNextSeasonFinal();
      }
    }
  }, [multiplayerContext?.players, gameState?.isWaitingForMercato]);

  const handleStartGame = (playerData) => {
    let tempPlayer = {
      ...playerData,
      age: 15,
      currentYear: 2024,
      valueHistory: [],
      form: 85,
      morale: 80,
      coachTrust: 75,
      nationalCaps: 0,
      injuryDuration: 0,
      inventory: [],
      bankBalance: 0,
      palmares: [],
      careerOvrSum: 0,
      careerSeasons: 0,
      careerRatingSum: 0,
      careerMaxOvr: 0,
      nationalStatus: 'BANC'
    };
    tempPlayer.ovr = calculateOVR(tempPlayer);
    tempPlayer = updatePlayerBestCard(tempPlayer, null);
    tempPlayer.statusText = "Joueur en phase d'intégration 🟡";

    const clubOffers = generate6ClubOffers(tempPlayer);
    const initialCompletedEvents = [];
    const clubMatches = selectedClub ? getMatchesForClub(selectedClub) : 38;
    const seasonEvents = getRandomSeasonEvents(tempPlayer, initialCompletedEvents, clubMatches, {}, null, multiplayerContext?.isCoopMode);
    let rival = null;
    if (multiplayerContext?.players) {
      const opponent = multiplayerContext.players.find(p => p.playerId !== multiplayerContext.playerId);
      if (opponent) {
        rival = {
          name: opponent.name,
          ovr: opponent.ovr,
          club: opponent.club || 'Club Inconnu',
          isOnlineOpponent: true
        };
      }
    }
    if (!rival) {
      rival = generateRival(tempPlayer);
    }

    setGameState({
      player: tempPlayer,
      club: null,
      clubEvolutions: {},
      clubOffers,
      season: 2026,
      bankBalance: Number(tempPlayer.bankBalance) || 12000,
      completedEvents: initialCompletedEvents,
      eventsList: seasonEvents,
      currentEvent: seasonEvents[0],
      eventStep: 1,
      totalEvents: seasonEvents.length,
      seasonStats: null,
      transferMarketOffers: null,
      palmares: [],
      rival: rival,
      isInteractiveMatch: false,
      interactiveMatchScenario: null,
      interactiveMatchResult: null,
      interactiveMatchFinalOutcome: null,
      rivalConfrontations: { won: 0, lost: 0, drawn: 0 }
    });
  };

  const handleChooseClub = (selectedClub, isFromBroadcast = false) => {
    if (multiplayerContext?.isCoopMode && multiplayerContext?.isHost && !isFromBroadcast) {
      multiplayerContext.roomObj.sendBroadcast({ type: 'INITIAL_CLUB', club: selectedClub });
    }
    setGameState((prev) => {
      let updatedPlayer = { ...prev.player };
      updatedPlayer.statusText = calculatePlayerStatus(updatedPlayer, selectedClub);
      updatedPlayer.salary = calculateSalaryOffer(updatedPlayer, selectedClub);
      updatedPlayer.currency = '€';
      updatedPlayer.conversionRate = 1.0;
      
      const initialValue = calculatePlayerValue(updatedPlayer, selectedClub);
      updatedPlayer.valueHistory = [{ year: updatedPlayer.currentYear, age: updatedPlayer.age, value: initialValue }];
      
      // Update bestCard club
      if (updatedPlayer.bestCard) {
        updatedPlayer.bestCard = {
          ...updatedPlayer.bestCard,
          club: {
            name: selectedClub.name,
            primary: selectedClub.primary,
            secondary: selectedClub.secondary,
            id: selectedClub.id,
            origin: selectedClub.origin
          }
        };
      } else {
        updatedPlayer = updatePlayerBestCard(updatedPlayer, selectedClub);
      }

      const newUnlocks = checkAchievements(updatedPlayer, null, selectedClub, prev.palmares);
      newUnlocks.forEach(achId => unlockAchievement(achId));

      
      const dummyStatsForPreSim = simulateSeasonStats(updatedPlayer, selectedClub, null);
      const predictedTournaments = simulateTournaments(updatedPlayer, selectedClub, dummyStatsForPreSim, 1, null);
      updatedPlayer.predictedTournaments = predictedTournaments;
      
      const clubMatches = getMatchesForClub(selectedClub);
      const newSeasonEvents = getRandomSeasonEvents(updatedPlayer, prev.completedEvents, clubMatches, predictedTournaments, selectedClub.tier, multiplayerContext?.isCoopMode);
      
      return { 
        ...prev, 
        club: selectedClub, 
        player: updatedPlayer, 
        eventsList: newSeasonEvents, 
        totalEvents: newSeasonEvents.length, 
        currentEvent: newSeasonEvents[0] 
      };
    });
  };

  const handleSelectOption = (optionIndex) => {
    if (!gameState || !gameState.currentEvent) return;
    const selectedOption = gameState.currentEvent.options[optionIndex];
    let outcome = selectedOption.outcome;

    if (Array.isArray(outcome)) {
      let totalProb = 0;
      const computedProbs = outcome.map(o => {
        let p = typeof o.probability === 'function' ? o.probability(gameState.player) : (o.probability || (1 / outcome.length));
        p = Math.max(0.01, p); // on s'assure qu'il y a toujours au moins 1% de chance
        totalProb += p;
        return p;
      });

      const rand = Math.random() * totalProb;
      let cumulative = 0;
      for (let i = 0; i < outcome.length; i++) {
        cumulative += computedProbs[i];
        if (rand <= cumulative) {
          outcome = outcome[i];
          break;
        }
      }
      if (Array.isArray(outcome)) outcome = outcome[outcome.length - 1]; // fallback
    }

    // Inject bankBalance into player
    let updatedPlayer = { ...gameState.player, bankBalance: gameState.bankBalance };
    const prevAttributes = { ...(gameState.player.attributes || {}) };
    const playerAge = gameState.player.age || 17;

    if (typeof outcome.applyStats === 'function') {
      updatedPlayer = outcome.applyStats(updatedPlayer);
    }
    const finalBankBalance = updatedPlayer.bankBalance !== undefined ? updatedPlayer.bankBalance : gameState.bankBalance;
    delete updatedPlayer.bankBalance;
    if (updatedPlayer.traits?.some(t => t.id === 'legende_club') && updatedPlayer.coachTrust < (gameState.player.coachTrust || 50)) {
      updatedPlayer.coachTrust = gameState.player.coachTrust;
    }

    // Multiplicateur d'âge pour les gains de stats lors des événements
    // Même courbe que la progression de fin de saison
    let ageMultiplier = 1.0;
    if (playerAge <= 18) {
      ageMultiplier = 2.5;   // 15-18 ans : explosion des stats
    } else if (playerAge <= 21) {
      ageMultiplier = 1.6;   // 19-21 ans : croissance soutenue
    } else if (playerAge <= 24) {
      ageMultiplier = 1.1;
    } else if (playerAge <= 28) {
      ageMultiplier = 0.8;
    } else {
      ageMultiplier = 0.5;
    }

    const STAT_KEYS = ['pace', 'finishing', 'passing', 'dribbling', 'defense', 'physical'];
    let currentAttributes = { ...(updatedPlayer.attributes || prevAttributes) };
    const boostedEffects = []; // Pour afficher les gains réels boostés
    
    const role = updatedPlayer.roleId ? getRoleById(updatedPlayer.roleId) : null;

    STAT_KEYS.forEach(attr => {
      const prev = prevAttributes[attr] ?? 0;
      const after = currentAttributes[attr] ?? 0;
      const rawGain = after - prev;
      if (rawGain > 0) {
        const roleMultiplier = role?.multipliers?.[attr] || 1.0;
        const totalMultiplier = ageMultiplier * roleMultiplier;
        
        let finalGain = rawGain * totalMultiplier;
        
        // --- NOUVEAU: Le Mur des 85 OVR ---
        if (prev >= 85) {
            let actualGain = 0;
            for (let i = 0; i < Math.floor(finalGain); i++) {
                const prob = prev >= 90 ? 0.30 : 0.60;
                if (Math.random() < prob) actualGain++;
            }
            actualGain += (finalGain - Math.floor(finalGain));
            finalGain = actualGain;
        }

        const extra = finalGain - rawGain;
        if (extra !== 0) {

            currentAttributes[attr] = after + extra;
            
            // Pour l'affichage, on garde des entiers propres
            const finalGainFloor = Math.floor(finalGain);
            if (finalGainFloor !== rawGain) {
              boostedEffects.push({ attr, rawGain, boostedGain: finalGainFloor, extra: finalGainFloor - rawGain });
            }
          }
      }
    });

    // Gérer les statistiques excédentaires (> 99) et les redistribuer
    let excessPool = 0;

    STAT_KEYS.forEach(attr => {
      if ((currentAttributes[attr] || 0) > 99) {
        excessPool += ((currentAttributes[attr] || 0) - 99);
        currentAttributes[attr] = 99;
      }
    });

    // Redistribuer les points excédentaires et tracer les stats converties
    const convertedStats = {};
    if (excessPool > 0) {
      const nonMaxed = STAT_KEYS.filter(k => (currentAttributes[k] || 0) < 99);
      while (excessPool > 0 && nonMaxed.length > 0) {
        const idx = Math.floor(Math.random() * nonMaxed.length);
        const statKey = nonMaxed[idx];
        currentAttributes[statKey] = (currentAttributes[statKey] || 50) + 1;
        convertedStats[statKey] = (convertedStats[statKey] || 0) + 1;
        excessPool--;
        if (currentAttributes[statKey] >= 99) {
          nonMaxed.splice(idx, 1);
        }
      }
    }

    updatedPlayer.attributes = currentAttributes;
    updatedPlayer.ovr = calculateOVR(updatedPlayer);
    updatedPlayer = updatePlayerBestCard(updatedPlayer, gameState.club);
    updatedPlayer.statusText = calculatePlayerStatus(updatedPlayer, gameState.club);

    // Construire les effets de stats RÉELS à afficher (masque les stats maxées)
    const statLabelsMap = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique' };
    
    // Remplacer les effets de stats dans l'outcome par les VRAIS deltas
    let finalEffects = outcome.effects ? [...outcome.effects] : [];
    
    // Retirer tous les effets de stats "textuels" originaux (+X ou -X sur une stat)
    finalEffects = finalEffects.filter(eff => {
      if (!eff || !eff.text) return true;
      const match = eff.text.match(/^[+-]\d+\s*(Vitesse|Tir|Passe|Dribble|Défense|Physique)$/i);
      return !match; // garder uniquement ce qui n'est pas une stat de base
    });

    // Ajouter les vrais gains / pertes calculés
    STAT_KEYS.forEach(attr => {
      const delta = Math.floor(currentAttributes[attr] || 0) - Math.floor(prevAttributes[attr] || 0);
      if (delta > 0) {
        finalEffects.push({ text: `+${delta} ${statLabelsMap[attr]}`, style: 'positive', isBoosted: true });
      } else if (delta < 0) {
        finalEffects.push({ text: `${delta} ${statLabelsMap[attr]}`, style: 'negative' });
      }
    });

    // Attacher les effets convertis et boostés à l'outcome
    const outcomeWithConverted = {
      ...outcome,
      effects: finalEffects,
      convertedStats: Object.keys(convertedStats).length > 0 ? convertedStats : undefined,
      ageBoostApplied: boostedEffects.length > 0 ? playerAge : undefined
    };

    // Vérification de la confiance du coach à 0%
    if (updatedPlayer.coachTrust !== undefined && updatedPlayer.coachTrust <= 0) {
      updatedPlayer.morale = 0;
      updatedPlayer.statusText = "Banni de l'équipe première (Transfert forcé)";
      if (!updatedPlayer.bannedAtEventStep) {
          updatedPlayer.bannedAtEventStep = prev.eventStep;
      }
      outcomeWithConverted.narrative = (outcomeWithConverted.narrative || "") + "\n\n🚨 RUPTURE TOTALE : Le coach ne vous fait plus aucune confiance ! Vous êtes banni de l'équipe première et placé sur la liste des transferts (Moral tombé à 0).";
    }

    if (outcomeWithConverted.coopEffect && multiplayerContext?.roomObj) {
      multiplayerContext.roomObj.sendBroadcast({
        type: 'COOP_CONSEQUENCE',
        effect: outcomeWithConverted.coopEffect
      });
    }

    setActiveOutcome(outcomeWithConverted);
    setGameState((prev) => ({ ...prev, player: updatedPlayer, bankBalance: finalBankBalance }));
  };

  const finalizeSeasonDirectly = (prev, tournamentStats, interactiveMatchResult, updatedCompletedEvents, nextStep) => {
    const calculatedStats = simulateSeasonStats(prev.player, prev.club, interactiveMatchResult);
    
    if (prev.pendingStats && prev.pendingStats.finalKey && interactiveMatchResult) {
      // L'issue du match interactif décide du sort de la finale !
      const key = prev.pendingStats.finalKey;
      if (tournamentStats[key]) {
        tournamentStats[key].stage = interactiveMatchResult.success ? 'Vainqueur' : 'Finaliste';
      }
    }

    const { awards, ballonDorRank } = calculateAwards(prev.player, prev.club, calculatedStats, tournamentStats, prev.season);
    
    const fullStats = {
      ...calculatedStats,
      tournaments: tournamentStats,
      awards: awards,
      ballonDorRank: ballonDorRank
    };

    playSound('levelUp');
    
    const interSeasonOffers = generateInterSeasonOffers(prev.player, prev.club, null, prev.clubEvolutions || {});
    return {
      ...prev,
      completedEvents: updatedCompletedEvents || prev.completedEvents,
      eventStep: nextStep || prev.eventStep,
      currentEvent: null,
      isInteractiveMatch: false,
      interactiveMatchScenario: null,
      interactiveMatchResult: null,
      interactiveMatchFinalOutcome: null,
      seasonStats: fullStats,
      lastSeasonStats: fullStats,
      transferMarketOffers: interSeasonOffers,
      pendingStats: null
    };
  };

  const applyMultiplayerSeasonResults = (results) => {
    setGameState((prev) => {
      const myPayload = multiplayerContext?.isHost ? results.hostPayload : results.clientPayload;
      const { fullStats, finalsToPlay, interSeasonOffers } = myPayload;
      
      if (finalsToPlay.length > 0) {
          const finalKey = finalsToPlay[0];
          let finalName = '';
          if (finalKey === 'championsLeague') finalName = 'Ligue des Champions';
          else if (finalKey === 'europaLeague') finalName = 'Ligue Europa';
          else if (finalKey === 'conferenceLeague') finalName = 'Conference League';
          else if (finalKey === 'worldCup') finalName = 'Coupe du Monde';
          else if (finalKey === 'euro') finalName = 'Euro';
          else if (finalKey === 'domesticCup') finalName = 'Coupe Nationale';

          const opponentOvr = Math.min(95, prev.club.ovr + Math.floor(Math.random() * 10) - 3);

          return {
            ...prev,
            isWaitingForMultiplayerSync: false,
            seasonStats: fullStats,
            lastSeasonStats: fullStats,
            transferMarketOffers: interSeasonOffers,
            isInteractiveMatch: true,
            interactiveMatchScenario: {
              type: finalKey,
              name: `Finale ${finalName}`,
              opponent: `Adversaire (${opponentOvr})`,
              opponentOvr: opponentOvr,
            }
          };
      } else {
        return {
          ...prev,
          isWaitingForMultiplayerSync: false,
          seasonStats: fullStats,
          lastSeasonStats: fullStats,
          transferMarketOffers: interSeasonOffers,
          isInteractiveMatch: false
        };
      }
    });
  };


  const handleInternationalComplete = (intlResult) => {
    setGameState(prev => {
      const pStats = prev.pendingStatsForIntl;
      if (!pStats) return prev;
      
      const newTournamentStats = { ...pStats.tournamentStats };
      if (prev.internationalTournamentType === 'WORLD_CUP') newTournamentStats.worldCup = intlResult;
      else newTournamentStats.euro = intlResult;

      if (multiplayerContext) {
        multiplayerContext.roomObj.updateState({ 
          eventsFinished: true, 
          player: prev.player,
          club: prev.club,
          seasonData: { dummyStats: pStats.dummyStats, tournamentStats: newTournamentStats, seasonIndex: prev.season, lastSeasonStats: prev.lastSeasonStats }
        });
        
        return {
          ...prev,
          isInternationalTournament: false,
          internationalTournamentDone: true, // Prevent loop
          isWaitingForMultiplayerSync: true,
          pendingStatsForIntl: null
        };
      }

      const finalsToPlay = Object.keys(newTournamentStats).filter(key => 
        newTournamentStats[key] && (newTournamentStats[key].stage === 'Finaliste' || newTournamentStats[key].stage === 'Vainqueur')
      );

      if (finalsToPlay.length > 0) {
          const finalKey = finalsToPlay[0];
          let finalName = '';
          if (finalKey === 'championsLeague') finalName = 'Ligue des Champions';
          else if (finalKey === 'europaLeague') finalName = 'Ligue Europa';
          else if (finalKey === 'conferenceLeague') finalName = 'Conference League';
          else if (finalKey === 'domesticCup') finalName = 'Coupe Nationale';
          
          const compatibleScenarios = INTERACTIVE_MATCH_SCENARIOS.filter(scen => {
            if (scen.targetPosition === 'ALL') return true;
            const playerPos = (prev.player.position || '').toUpperCase();
            if (scen.targetPosition.startsWith('!')) return !playerPos.includes(scen.targetPosition.substring(1));
            return playerPos.includes(scen.targetPosition);
          });
          
          const shuffledScenarios = compatibleScenarios.sort(() => 0.5 - Math.random());
          const matchPhases = [
            { ...shuffledScenarios[0], time: '15ème Minute', title: `Début de Finale : ${finalName}` },
            { ...shuffledScenarios[1 % shuffledScenarios.length], time: '60ème Minute', title: `Le Tournant : ${finalName}` },
            { ...shuffledScenarios[2 % shuffledScenarios.length], time: '89ème Minute', title: `Fin de Match : ${finalName}` }
          ];

          return {
            ...prev,
            isInternationalTournament: false,
            internationalTournamentDone: true, // Prevent loop
            isInteractiveMatch: true,
            interactiveMatchPhases: matchPhases,
            interactiveMatchCurrentPhaseIndex: 0,
            interactiveMatchScore: 0,
            interactiveMatchResult: null,
            interactiveMatchFinalOutcome: null,
            pendingStats: { tournamentStats: newTournamentStats, finalKey, finalName },
            pendingStatsForIntl: null
          };
      } else {
        return finalizeSeasonDirectly(prev, newTournamentStats, null, pStats.updatedCompletedEvents, pStats.nextStep);
      }
    });
  };

  const handleContinueFromOutcome = () => {
    setActiveOutcome(null);
    setGameState((prev) => {
      const currentEventId = prev.currentEvent?.id;
      const updatedCompletedEvents = currentEventId && !prev.completedEvents.includes(currentEventId) ? [...prev.completedEvents, currentEventId] : prev.completedEvents;

      const nextStep = prev.eventStep + 1;
      const isEnded = nextStep > prev.totalEvents;

      if (isEnded) {
        const dummyStats = simulateSeasonStats(prev.player, prev.club, null);
        const tournamentStats = simulateTournaments(prev.player, prev.club, dummyStats, prev.season, prev.lastSeasonStats);

        const currentYear = prev.player.currentYear || 2024;
        const isWorldCup = (currentYear % 4 === 2);
        const isEuro = (currentYear % 4 === 0);
        
        if ((isWorldCup || isEuro) && !prev.internationalTournamentDone) {
          let calledUp = false;
          if (prev.player.ovr >= 82) calledUp = true;
          else if (prev.player.ovr >= 75) calledUp = Math.random() > 0.4;
          
          if (calledUp) {
            return {
              ...prev,
              completedEvents: updatedCompletedEvents,
              eventStep: nextStep,
              currentEvent: null,
              isInternationalTournament: true,
              internationalTournamentType: isWorldCup ? 'WORLD_CUP' : 'EURO',
              pendingStatsForIntl: { dummyStats, tournamentStats, updatedCompletedEvents, nextStep }
            };
          }
        }

        if (multiplayerContext) {
          multiplayerContext.roomObj.updateState({ 
            eventsFinished: true, 
            player: prev.player,
            club: prev.club,
            seasonData: { dummyStats, tournamentStats, seasonIndex: prev.season, lastSeasonStats: prev.lastSeasonStats }
          });
          
          return {
            ...prev,
            completedEvents: updatedCompletedEvents,
            eventStep: nextStep,
            isWaitingForMultiplayerSync: true
          };
        }
        
        const finalsToPlay = Object.keys(tournamentStats).filter(key => 
          tournamentStats[key] && (tournamentStats[key].stage === 'Finaliste' || tournamentStats[key].stage === 'Vainqueur')
        );

        if (finalsToPlay.length > 0) {
            const finalKey = finalsToPlay[0];
            let finalName = '';
            if (finalKey === 'championsLeague') finalName = 'Ligue des Champions';
            else if (finalKey === 'europaLeague') finalName = 'Ligue Europa';
            else if (finalKey === 'conferenceLeague') finalName = 'Conference League';
            else if (finalKey === 'worldCup') finalName = 'Coupe du Monde';
            else if (finalKey === 'euro') finalName = 'Euro';
            else if (finalKey === 'domesticCup') finalName = 'Coupe Nationale';
            
            const compatibleScenarios = INTERACTIVE_MATCH_SCENARIOS.filter(scen => {
              if (scen.targetPosition === 'ALL') return true;
              const playerPos = (prev.player.position || '').toUpperCase();
              if (scen.targetPosition.startsWith('!')) return !playerPos.includes(scen.targetPosition.substring(1));
              return playerPos.includes(scen.targetPosition);
            });
            
            const shuffledScenarios = compatibleScenarios.sort(() => 0.5 - Math.random());
            const matchPhases = [
              { ...shuffledScenarios[0], time: '15ème Minute', title: `Début de Finale : ${finalName}` },
              { ...shuffledScenarios[1 % shuffledScenarios.length], time: '60ème Minute', title: `Le Tournant : ${finalName}` },
              { ...shuffledScenarios[2 % shuffledScenarios.length], time: '89ème Minute', title: `Fin de Match : ${finalName}` }
            ];

            return {
              ...prev,
              completedEvents: updatedCompletedEvents,
              eventStep: nextStep,
              currentEvent: null,
              isInteractiveMatch: true,
              interactiveMatchPhases: matchPhases,
              interactiveMatchCurrentPhaseIndex: 0,
              interactiveMatchScore: 0,
              interactiveMatchResult: null,
              interactiveMatchFinalOutcome: null,
              pendingStats: { tournamentStats, finalKey, finalName }
            };
        } else {
          return finalizeSeasonDirectly(prev, tournamentStats, null, updatedCompletedEvents, nextStep);
        }
      } else {
         const triggerDerbyStep = Math.floor(prev.totalEvents / 2);
         if (nextStep === triggerDerbyStep && prev.rival && prev.rival.club && prev.club) {
            const sameTier = prev.club.tier === prev.rival.club.tier;
            const sameOrigin = prev.club.origin === prev.rival.club.origin;
            const sameLeague = sameTier && sameOrigin;
            const isClContender = prev.club.tier === 1 && prev.rival.club.tier === 1;
            
            if (sameLeague || (isClContender && Math.random() < 0.3)) {
                const compatibleScenarios = INTERACTIVE_MATCH_SCENARIOS.filter(scen => {
                  if (scen.targetPosition === 'ALL') return true;
                  const playerPos = (prev.player.position || '').toUpperCase();
                  if (scen.targetPosition.startsWith('!')) return !playerPos.includes(scen.targetPosition.substring(1));
                  return playerPos.includes(scen.targetPosition);
                });
                const shuffledScenarios = compatibleScenarios.sort(() => 0.5 - Math.random());
                const matchPhases = [
                  { ...shuffledScenarios[0], time: '15ème Minute', title: `Derby contre ${prev.rival.name}` },
                  { ...shuffledScenarios[1 % shuffledScenarios.length], time: '60ème Minute', title: `Le Tournant du Derby` },
                  { ...shuffledScenarios[2 % shuffledScenarios.length], time: '89ème Minute', title: `Fin du Derby` }
                ];
                return {
                  ...prev,
                  completedEvents: updatedCompletedEvents,
                  eventStep: nextStep,
                  currentEvent: null,
                  isInteractiveMatch: true,
                  interactiveMatchPhases: matchPhases,
                  interactiveMatchCurrentPhaseIndex: 0,
                  interactiveMatchScore: 0,
                  interactiveMatchResult: null,
                  interactiveMatchFinalOutcome: null,
                  pendingStats: { isDerby: true }
                };
            }
         }
      }

      return {
        ...prev,
        completedEvents: updatedCompletedEvents,
        eventStep: nextStep,
        currentEvent: prev.eventsList[nextStep - 1] || null
      };
    });
  };

  const handlePlayInteractiveMatch = (optionIndex) => {
    setGameState((prev) => {
      const currentPhase = prev.interactiveMatchPhases[prev.interactiveMatchCurrentPhaseIndex];
      const result = playInteractiveMatch(currentPhase, optionIndex, prev.player);
      
      const newScore = prev.interactiveMatchScore + (result.success ? 1 : -1);
      
      return { 
        ...prev, 
        interactiveMatchResult: result,
        interactiveMatchScore: newScore
      };
    });
  };

  const handleContinueFromInteractiveMatch = () => {
    setGameState((prev) => {
      // Si on n'a pas fini les 3 phases
      if (prev.interactiveMatchCurrentPhaseIndex < 2) {
        return {
          ...prev,
          interactiveMatchCurrentPhaseIndex: prev.interactiveMatchCurrentPhaseIndex + 1,
          interactiveMatchResult: null
        };
      }

      // Fin du match
      const isWinner = prev.interactiveMatchScore > 0 || (prev.interactiveMatchScore === 0 && Math.random() > 0.5); // Tirs au but 50/50 si égalité
      
      return {
        ...prev,
        interactiveMatchFinalOutcome: isWinner ? 'win' : 'loss'
      };
    });
  };

  const handleCloseInteractiveMatch = () => {
    setGameState((prev) => {
      const isWinner = prev.interactiveMatchFinalOutcome === 'win';

      if (prev.pendingStats?.isDerby) {
        const confs = { ...(prev.rivalConfrontations || { won: 0, lost: 0, drawn: 0 }) };
        let newMorale = prev.player.morale || 80;
        
        if (isWinner) {
          confs.won += 1;
          newMorale = Math.min(100, newMorale + 15);
        } else if (prev.interactiveMatchScore === 0) {
          confs.drawn += 1;
        } else {
          confs.lost += 1;
          newMorale = Math.max(0, newMorale - 15);
        }

        return {
          ...prev,
          isInteractiveMatch: false,
          interactiveMatchResult: null,
          interactiveMatchFinalOutcome: null,
          interactiveMatchPhases: null,
          interactiveMatchCurrentPhaseIndex: 0,
          interactiveMatchScore: 0,
          rivalConfrontations: confs,
          player: { ...prev.player, morale: newMorale },
          pendingStats: null,
          currentEvent: prev.eventsList[prev.eventStep - 1] || null
        };
      }

      const tStats = prev.pendingStats?.tournamentStats || {};
      const finalKey = prev.pendingStats?.finalKey;
      
      if (finalKey && tStats[finalKey]) {
        tStats[finalKey].stage = isWinner ? 'Vainqueur' : 'Finaliste';
      }
      
      return finalizeSeasonDirectly(prev, tStats, { success: isWinner, narrative: isWinner ? "Victoire Historique !" : "Défaite amère..." }, prev.completedEvents, prev.eventStep);
    });
  };

  const handleAcceptTransferOffer = (newClub, bypassVote = false) => {
    if (multiplayerContext?.isCoopMode && !bypassVote) {
      multiplayerContext.roomObj.updateState({ mercatoVote: newClub ? newClub.id : 'STAY' });
      setGameState(prev => ({ ...prev, isWaitingForMercato: true, mercatoPendingVote: newClub }));
      return;
    }
    setGameState((prev) => {
      const updatedPlayer = { ...prev.player };
      updatedPlayer.statusText = newClub.status || calculatePlayerStatus(updatedPlayer, newClub);
      updatedPlayer.salary = newClub.salary;
      updatedPlayer.currency = newClub.currency;
      updatedPlayer.conversionRate = newClub.conversionRate;
      updatedPlayer.coachTrust = 60;
      updatedPlayer.clubYears = 0;
      
      const newState = {
        ...prev,
        club: newClub,
        player: updatedPlayer,
        transferMarketOffers: null,
      };
      
      if (multiplayerContext) {
        newState.isWaitingForMercato = true;
      }
      return newState;
    });
    
    if (multiplayerContext?.roomObj) {
      multiplayerContext.roomObj.updateState({ mercatoFinished: true });
    } else {
      handleProceedToNextSeasonFinal();
    }
  };

  const handleRejectTransferOffer = (clubId) => {
    setGameState((prev) => ({
      ...prev,
      transferMarketOffers: prev.transferMarketOffers.filter(c => c.id !== clubId)
    }));
  };

  const handleStayCurrentClub = () => {
    if (multiplayerContext) {
      setGameState(prev => ({ ...prev, isWaitingForMercato: true, transferMarketOffers: null }));
      if (multiplayerContext.roomObj) {
        multiplayerContext.roomObj.updateState({ mercatoFinished: true });
      }
    } else {
      handleProceedToNextSeasonFinal();
    }
  };

  const handleProceedToNextSeasonFinal = () => {
    setGameState((prev) => {
      const statsToUse = prev.seasonStats || prev.lastSeasonStats;
      let updatedAttributes = { ...prev.player.attributes };

      const currentOvr = prev.player.ovr;
      const currentRating = statsToUse ? parseFloat(statsToUse.rating) : 6.0;

      if (statsToUse && statsToUse.statGains) {
        let excessPool = 0;
        const cappedStats = []; 
        const oldAttributes = { ...updatedAttributes };
        
        const role = prev.player.roleId ? getRoleById(prev.player.roleId) : null;
        
        Object.entries(statsToUse.statGains).forEach(([attr, val]) => {
          if (updatedAttributes[attr] !== undefined) {
            const roleMultiplier = role?.multipliers?.[attr] || 1.0;
            const modifiedGain = val * roleMultiplier;
            const newVal = updatedAttributes[attr] + modifiedGain;
            if (newVal > 99) {
              excessPool += (newVal - 99);
              cappedStats.push(attr); 
              updatedAttributes[attr] = 99;
            } else {
              updatedAttributes[attr] = newVal;
            }
          }
        });
        
        if (excessPool > 0) {
           const nonMaxedStats = Object.keys(updatedAttributes).filter(key => updatedAttributes[key] < 99);
           while (excessPool > 0 && nonMaxedStats.length > 0) {
              const randomStat = nonMaxedStats[Math.floor(Math.random() * nonMaxedStats.length)];
              updatedAttributes[randomStat]++;
              excessPool--;
              if (updatedAttributes[randomStat] >= 99) {
                  nonMaxedStats.splice(nonMaxedStats.indexOf(randomStat), 1);
              }
           }
        }
        
        // Recalculer le gain de stat RÉEL (différence exacte)
        statsToUse.statGains = {};
        Object.keys(updatedAttributes).forEach(attr => {
          const diff = updatedAttributes[attr] - oldAttributes[attr];
          if (diff > 0) {
            statsToUse.statGains[attr] = diff;
          }
        });
        
        // On supprime les variables d'UI complexes qui ne sont plus nécessaires
        statsToUse.statOverflow = null;
        statsToUse.cappedStats = null;
      }

      const newAge = prev.player.age + 1;
      const newCurrentYear = (prev.player.currentYear || 2024) + 1;
      const newSeason = prev.season + 1;
      const internationalTournamentDone = false;
      const declineAge = prev.player.declineAge || 32;
      
      if (newAge >= declineAge) {
        const yearsPastPeak = newAge - declineAge + 1;
        
        // Physique/Vitesse chute plus vite mais moins brutalement qu'avant
        // Ex: 32 ans -> 1-2 pts, 35 ans -> 3-4 pts
        const physicalDecline = Math.ceil(Math.pow(yearsPastPeak, 1.2) * 0.5) + Math.floor(Math.random() * 2);
        
        // Technique chute plus doucement et aléatoirement
        // Ex: 32 ans -> 0-1 pt, 35 ans -> 1-2 pts
        const technicalDecline = Math.floor(yearsPastPeak * 0.4) + (Math.random() > 0.7 ? 1 : 0);
        
        if (updatedAttributes.pace !== undefined) updatedAttributes.pace = Math.max(1, updatedAttributes.pace - physicalDecline);
        if (updatedAttributes.physical !== undefined) updatedAttributes.physical = Math.max(1, updatedAttributes.physical - physicalDecline);
        if (updatedAttributes.dribbling !== undefined) updatedAttributes.dribbling = Math.max(1, updatedAttributes.dribbling - technicalDecline);
        if (updatedAttributes.finishing !== undefined) updatedAttributes.finishing = Math.max(1, updatedAttributes.finishing - technicalDecline);
        if (updatedAttributes.passing !== undefined) updatedAttributes.passing = Math.max(1, updatedAttributes.passing - technicalDecline);
        if (updatedAttributes.defense !== undefined) updatedAttributes.defense = Math.max(1, updatedAttributes.defense - technicalDecline);
      }

      let salaryEarnings = 0;
      if (prev.player.salary) {
        salaryEarnings = prev.player.salary * 52 * (prev.player.conversionRate || 1.0);
      } else {
        salaryEarnings = 5000 * 52;
      }
      
      let inventoryEarnings = 0;
      let inventoryTrustChange = 0;
      let newInventory = [...(prev.player.inventory || [])];
      let minMorale = 0;
      
      if (newInventory.includes('cryo')) inventoryEarnings -= 100000;
      if (newInventory.includes('training_center')) {
        const statToBoost = Math.random() > 0.5 ? 'physical' : 'pace';
        if (updatedAttributes[statToBoost] !== undefined && updatedAttributes[statToBoost] < 99) {
          updatedAttributes[statToBoost] += 1;
        }
      }
      if (newInventory.includes('nightclub')) {
        inventoryEarnings += 2000000;
        inventoryTrustChange -= 15;
        minMorale = 50;
      }
      if (newInventory.includes('charity')) {
        inventoryEarnings -= 500000;
        inventoryTrustChange += 10;
      }
      if (newInventory.includes('buy_club')) {
        inventoryEarnings -= 1000000;
      }
      if (newInventory.includes('startup')) {
        const rand = Math.random();
        if (rand < 0.10) {
          inventoryEarnings += 30000000; // Jackpot
        } else if (rand < 0.30) {
          // 20% Faillite
          newInventory = newInventory.filter(i => i !== 'startup');
        }
      }

      const perfEarnings = statsToUse ? parseFloat(statsToUse.earnings || 0) * 1000000 : 0;
      let sponsorEarnings = 0;
      let sponsorFatigue = 0;
      let currentSponsor = 'Aucun';
      
      // currentOvr is already defined as prev.player.ovr at the start of handleProceedToNextSeasonFinal
      if (currentOvr >= 90) {
        currentSponsor = 'Équipementier Mondial';
        sponsorEarnings = 5000000;
        sponsorFatigue = 15;
      } else if (currentOvr >= 83) {
        currentSponsor = 'Sponsor National';
        sponsorEarnings = 1500000;
        sponsorFatigue = 8;
      } else if (currentOvr >= 75) {
        currentSponsor = 'Sponsor Local';
        sponsorEarnings = 200000;
        sponsorFatigue = 4;
      }

      const taxes = Math.floor(salaryEarnings * 0.25); // 25% d'impôts sur salaire
      const lifestyleCost = Math.floor(salaryEarnings * 0.10); // 10% de frais de vie
      const newBankBalance = Math.max(0, prev.bankBalance + salaryEarnings + perfEarnings + inventoryEarnings + sponsorEarnings - taxes - lifestyleCost);
      
      statsToUse.financials = {
        salaryEarnings,
        taxes,
        lifestyleCost,
        perfEarnings,
        inventoryEarnings,
        sponsorEarnings,
        net: salaryEarnings + perfEarnings + inventoryEarnings + sponsorEarnings - taxes - lifestyleCost
      };

      if (currentOvr >= 90) {
        currentSponsor = 'Équipementier Mondial';
        sponsorEarnings = 5000000;
        sponsorFatigue = 15;
      } else if (currentOvr >= 83) {
        currentSponsor = 'Sponsor National';
        sponsorEarnings = 1500000;
        sponsorFatigue = 8;
      } else if (currentOvr >= 75) {
        currentSponsor = 'Sponsor Local';
        sponsorEarnings = 200000;
        sponsorFatigue = 4;
      }



      const newPalmares = [...(prev.palmares || [])];
      let globalTrophies = [];

      // DYNAMIC CLUB PROGRESSION LOGIC
      let evolutions = { ...(prev.clubEvolutions || {}) };
      let currentClubId = prev.club.id;
      let clubBonus = 0;
      
      if (statsToUse) {
        if (statsToUse.leaguePosition === 1) clubBonus += 1;
        if (statsToUse.tournaments) {
          if (statsToUse.tournaments.championsLeague?.stage === 'Vainqueur') clubBonus += 2;
          if (statsToUse.tournaments.europaLeague?.stage === 'Vainqueur') clubBonus += 1;
          if (statsToUse.tournaments.conferenceLeague?.stage === 'Vainqueur') clubBonus += 1;
        }
        if (statsToUse.nationalCup?.stage === 'Vainqueur') clubBonus += 1;
        
        // Superstar effect
        if (currentOvr >= prev.club.ovr + 4 && currentRating >= 7.5) {
           clubBonus += 1;
        }
      }
      
      // Apply bonus and decline
      Object.keys(evolutions).forEach(id => {
         if (id !== currentClubId && evolutions[id] > 0) {
            evolutions[id] -= 1; // slow decline
         }
      });
      
      if (clubBonus > 0) {
         let currentEvo = evolutions[currentClubId] || 0;
         let baseOvr = prev.club.ovr - currentEvo;
         
         if (currentEvo + clubBonus > 15) clubBonus = 15 - currentEvo;
         if (baseOvr + currentEvo + clubBonus > 88 && baseOvr < 88) {
            clubBonus = Math.max(0, 88 - (baseOvr + currentEvo));
         }
         if (clubBonus > 0) {
            evolutions[currentClubId] = currentEvo + clubBonus;
            prev.club.ovr += clubBonus;
         }
      }


      if (statsToUse) {
        // Promotion ne donne plus de trophée dans la vitrine
        if (statsToUse.leaguePosition === 1) {
          const t = { season: prev.season, text: `Champion de ${prev.club.leagueName}`, icon: '🏆', playerName: prev.player.name, type: 'collective' };
          newPalmares.push(t);
          globalTrophies.push(t);
        }
        if (statsToUse.tournaments) {
          if (statsToUse.tournaments.championsLeague?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de la Ligue des Champions', icon: '🏆', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
          if (statsToUse.tournaments.europaLeague?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de la Ligue Europa', icon: '🏆', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
          if (statsToUse.tournaments.conferenceLeague?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de la Conference League', icon: '🏆', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
          if (statsToUse.tournaments.domesticCup?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de la Coupe Nationale', icon: '🏆', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
          if (statsToUse.tournaments.worldCup?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de la Coupe du Monde', icon: '🌎', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
          if (statsToUse.tournaments.euro?.stage === 'Vainqueur') {
            const t = { season: prev.season, text: 'Vainqueur de l\'Euro', icon: '🇪🇺', playerName: prev.player.name, type: 'collective' };
            newPalmares.push(t);
            globalTrophies.push(t);
          }
        }
        if (statsToUse.awards && statsToUse.awards.length > 0) {
           statsToUse.awards.forEach(aw => {
             const t = { season: prev.season, text: aw.text, icon: aw.icon, playerName: prev.player.name, type: 'individual' };
             newPalmares.push(t);
             globalTrophies.push(t);
           });
        }
        
        // Système équilibré de gain de statistiques suite aux trophées
        if (globalTrophies.length > 0) {
          globalTrophies.forEach(t => {
            let boostCount = 0;
            const text = t.text.toLowerCase();
            if (text.includes('champion de') || text.includes('coupe nationale')) boostCount = 1;
            else if (text.includes('ligue europa') || text.includes('conference')) boostCount = 1;
            else if (text.includes('ligue des champions') || text.includes('euro') || text.includes('coupe du monde')) boostCount = 2;
            else if (text.includes("ballon d'or")) boostCount = 2;
            else if (t.type === 'individual') boostCount = 1; // Soulier d'or, etc.
            
            for (let i = 0; i < boostCount; i++) {
              const nonMaxedStats = Object.keys(updatedAttributes).filter(key => updatedAttributes[key] < 99);
              if (nonMaxedStats.length > 0) {
                const randomStat = nonMaxedStats[Math.floor(Math.random() * nonMaxedStats.length)];
                updatedAttributes[randomStat]++;
              }
            }
          });
        }

      }

      if (globalTrophies.length > 0) {
        saveToGlobalPalmares(globalTrophies);
      }

      const updatedPlayer = {
        ...prev.player,
        inventory: newInventory,
        age: newAge,
        currentYear: newCurrentYear,
        attributes: updatedAttributes,
        form: Math.max(10, 85 - sponsorFatigue),
        morale: Math.max(80, minMorale),
        sponsor: currentSponsor,
        clubYears: (prev.player.clubYears || 0) + 1,
        coachTrust: prev.player.traits?.some(t => t.id === 'legende_club') && inventoryTrustChange < 0
          ? prev.player.coachTrust ?? 75
          : Math.max(0, Math.min(100, (prev.player.coachTrust ?? 75) + inventoryTrustChange)),
        nationalCaps: (prev.player.nationalCaps || 0) + (statsToUse?.nationalCallup ? 3 : 0),
        injuryDuration: 0,
        palmares: newPalmares,
        careerOvrSum: (prev.player.careerOvrSum || 0) + currentOvr,
        careerSeasons: (prev.player.careerSeasons || 0) + 1,
        careerRatingSum: (prev.player.careerRatingSum || 0) + currentRating,
        careerMaxOvr: Math.max(prev.player.careerMaxOvr || 0, currentOvr),
        careerHistory: [...(prev.player.careerHistory || []), {
          year: prev.player.currentYear || 2024,
          age: prev.player.age || 15,
          club: prev.club.name,
          origin: prev.club.origin,
          league: prev.club.leagueName,
          tier: prev.club.tier,
          ovr: currentOvr,
          goals: statsToUse?.goals || 0,
          assists: statsToUse?.assists || 0,
          cleanSheets: statsToUse?.cleanSheets || 0,
          rating: currentRating,
          tournaments: statsToUse?.tournaments || {}
        }]
      };

      
      // Check Légende du Club
      const hasLDC = newPalmares.some(t => t.text === 'Vainqueur de la Ligue des Champions');
      if (updatedPlayer.clubYears >= 10 && hasLDC) {
        if (!updatedPlayer.traits) updatedPlayer.traits = [];
        if (!updatedPlayer.traits.some(t => t.id === 'legende_club')) {
          updatedPlayer.traits.push({
            id: 'legende_club',
            name: 'Légende du Club',
            description: 'Fidélité absolue. Immunisé aux baisses de confiance du Coach.'
          });
        }
      }
      
      let newNationalStatus = prev.player.nationalStatus || 'BANC';
      let gainedCaptain = false;
      if (currentOvr >= 90 && newAge >= 25 && newNationalStatus !== 'CAPITAINE') {
        newNationalStatus = 'CAPITAINE';
        gainedCaptain = true;
        // Boost de stats permanent au passage capitaine avec redistribution des surplus
        updatedPlayer.attributes = distributeExcessStats(updatedPlayer.attributes, {
          passing: 2,
          physical: 1,
          defense: 1
        });
      } else if (currentOvr >= 80 && newNationalStatus === 'BANC') {
        newNationalStatus = 'TITULAIRE';
      }
      updatedPlayer.nationalStatus = newNationalStatus;

      updatedPlayer.ovr = calculateOVR(updatedPlayer);
      const finalUpdatedPlayer = updatePlayerBestCard(updatedPlayer, prev.club);
      finalUpdatedPlayer.statusText = calculatePlayerStatus(finalUpdatedPlayer, prev.club);
      finalUpdatedPlayer.salary = calculateSalaryOffer(finalUpdatedPlayer, prev.club);
      
      const newValue = calculatePlayerValue(finalUpdatedPlayer, prev.club);
      finalUpdatedPlayer.valueHistory = [...(prev.player.valueHistory || []), { year: newCurrentYear, age: newAge, value: newValue }];

      const newUnlocks = checkAchievements(finalUpdatedPlayer, statsToUse, prev.club, prev.palmares);
      newUnlocks.forEach(achId => unlockAchievement(achId));

      const is18 = newAge === 18 && !finalUpdatedPlayer.roleId;

      const matchesPlayed = statsToUse ? (statsToUse.matches || 0) : getMatchesForClub(prev.club);
      
      // PRE-SIMULATION DU PARCOURS EUROPEEN POUR INJECTER DES EVENEMENTS
      const dummyStatsForPreSim = simulateSeasonStats(finalUpdatedPlayer, prev.club, null);
      const predictedTournaments = simulateTournaments(finalUpdatedPlayer, prev.club, dummyStatsForPreSim, newSeason, statsToUse);
      finalUpdatedPlayer.predictedTournaments = predictedTournaments;
      
      let seasonEvents = getRandomSeasonEvents(finalUpdatedPlayer, prev.completedEvents, matchesPlayed, predictedTournaments, prev.club.tier, multiplayerContext?.isCoopMode);
      const hasPlayerWonBallonDor = statsToUse?.awards?.some(a => a.text === "Ballon d'Or");
      const hasPlayerWonCL = statsToUse?.tournaments?.championsLeague?.stage === 'Vainqueur';
      const updatedRival = updateRival(prev.rival, finalUpdatedPlayer.ovr, prev.club.tier, hasPlayerWonBallonDor, hasPlayerWonCL);

      if (updatedRival && updatedRival.justWonBallonDor) {
        seasonEvents.unshift({
          id: `rival_ballondor_${newCurrentYear}`,
          category: 'RIVALITÉ',
          tag: "Ballon d'Or",
          description: `Votre rival historique, ${updatedRival.name}, vient de remporter le Ballon d'Or. La presse attend votre réaction.`,
          options: [
            { typeTag: "Classe", text: "Le féliciter publiquement (Classe)", outcome: { narrative: "Vous montrez beaucoup de classe. Le monde du foot apprécie.", effects: [{text: "+15 Confiance", style: "positive"}], applyStats: (p) => ({ ...p, coachTrust: Math.min(100, p.coachTrust + 15) }) } },
            { typeTag: "Froid", text: "L'ignorer totalement (Froid)", outcome: { narrative: "Vous restez silencieux. La rivalité grandit.", effects: [{text: "+5 Moral", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 5) }) } },
            { typeTag: "Rage", text: "Critiquer le vote (Rageux)", outcome: { narrative: "Vous dites que c'est un scandale. Ça fait le buzz mais ça ne passe pas très bien.", effects: [{text: "-20 Moral", style: "negative"}, {text: "-10 Confiance", style: "negative"}], applyStats: (p) => ({ ...p, morale: Math.max(0, p.morale - 20), coachTrust: Math.max(0, p.coachTrust - 10) }) } }
          ]
        });
      }

      if (gainedCaptain) {
        seasonEvents.unshift({
          id: `captain_${newCurrentYear}`,
          category: 'ÉQUIPE NATIONALE',
          tag: 'Capitaine',
          description: `Vous avez été nommé Capitaine de l'équipe nationale ! Un immense honneur et une grande responsabilité.`,
          options: [
            { typeTag: "Fierté", text: "Assumer le rôle avec fierté", outcome: { narrative: "Vous rassemblez le groupe. Le sélectionneur compte sur vous.", effects: [{text: "+15 Moral", style: "positive"}], applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 15) }) } }
          ]
        });
      }

      // Événements de sélection en équipe nationale
      const isFirstCallup = (prev.player.nationalCaps || 0) === 0 && Boolean(statsToUse?.nationalCallup);
      const hasCallupThisSeason = Boolean(statsToUse?.nationalCallup);
      const playerNationId = typeof prev.player.origin === 'object' ? prev.player.origin.id : prev.player.origin;
      const countryObj = COUNTRIES.find(c => c.id === playerNationId);
      const countryName = countryObj ? countryObj.name : (prev.player.nationality || 'Sélection Nationale');

      if (isFirstCallup) {
        seasonEvents.unshift({
          id: `first_national_callup_${newCurrentYear}`,
          category: 'ÉQUIPE NATIONALE',
          tag: 'Première Sélection 🌟',
          description: `Incroyable consécration ! Le sélectionneur national vient de vous convoquer pour la toute première fois en équipe de ${countryName}. Vos proches sont en larmes et la nation entière a les yeux rivés sur vos débuts internationaux.`,
          options: [
            {
              typeTag: "Audace",
              text: "Jouer libéré et impressionner le groupe (Audace)",
              outcome: {
                narrative: "Vous brillez dès vos premières minutes ! Votre insouciance et votre qualité technique enchantent les supporters et le staff.",
                effects: [{ text: "+20 Moral", style: "positive" }, { text: "+15 Confiance", style: "positive" }, { text: "+2 Tir", style: "positive" }],
                applyStats: (p) => ({
                  ...p,
                  morale: Math.min(100, p.morale + 20),
                  coachTrust: Math.min(100, p.coachTrust + 15),
                  attributes: { ...p.attributes, finishing: (p.attributes?.finishing || 50) + 2 }
                })
              }
            },
            {
              text: "Rester humble et écouter les cadres (Maturité)",
              outcome: {
                narrative: "Les cadres du vestiaire adorent votre attitude respectueuse et vous intègrent immédiatement au groupe.",
                effects: [{ text: "+15 Moral", style: "positive" }, { text: "+10 Forme", style: "positive" }, { text: "+2 Passe", style: "positive" }],
                applyStats: (p) => ({
                  ...p,
                  morale: Math.min(100, p.morale + 15),
                  form: Math.min(100, p.form + 10),
                  attributes: { ...p.attributes, passing: (p.attributes?.passing || 50) + 2 }
                })
              }
            },
            {
              text: "Dédier cette sélection à votre famille (Émotion)",
              outcome: {
                narrative: "Vous offrez votre tout premier maillot national à vos parents. Une fierté inestimable.",
                effects: [{ text: "+30 Moral", style: "positive" }],
                applyStats: (p) => ({ ...p, morale: Math.min(100, p.morale + 30) })
              }
            }
          ]
        });
      } else if (hasCallupThisSeason && (newCurrentYear % 2 === 0 || Math.random() < 0.35)) {
        seasonEvents.unshift({
          id: `national_callup_camp_${newCurrentYear}`,
          category: 'ÉQUIPE NATIONALE',
          tag: 'Rassemblement International 🌍',
          description: `Sélection nationale : Vous rejoignez le rassemblement de l'équipe de ${countryName} pour les éliminatoires internationaux.`,
          options: [
            {
              typeTag: "Audace",
              text: "Prendre les rênes de l'attaque et frapper au but",
              outcome: {
                narrative: "Vous marquez un but capital qui qualifie votre pays dans l'euphorie générale !",
                effects: [{ text: "+15 Moral", style: "positive" }, { text: "+2 Tir", style: "positive" }],
                applyStats: (p) => ({
                  ...p,
                  morale: Math.min(100, p.morale + 15),
                  attributes: { ...p.attributes, finishing: (p.attributes?.finishing || 50) + 2 }
                })
              }
            },
            {
              typeTag: "Collectif",
              text: "Privilégier le jeu collectif et les automatismes",
              outcome: {
                narrative: "Excellente prestation d'équipe, vous délivrez une passe décisive millimétrée.",
                effects: [{ text: "+10 Moral", style: "positive" }, { text: "+10 Confiance", style: "positive" }, { text: "+2 Passe", style: "positive" }],
                applyStats: (p) => ({
                  ...p,
                  morale: Math.min(100, p.morale + 10),
                  coachTrust: Math.min(100, p.coachTrust + 10),
                  attributes: { ...p.attributes, passing: (p.attributes?.passing || 50) + 2 }
                })
              }
            }
          ]
        });
      }

      // Mise à jour dynamique de l'OVR du club
      const updatedClub = updateClubOvr(prev.club, finalUpdatedPlayer, statsToUse);

      const isForcedRetirement = newAge >= 45;
      
      if (isForcedRetirement) {
        submitScoreToLeaderboard({ ...finalUpdatedPlayer, bankBalance: newBankBalance }, newPalmares, prev.rivalConfrontations);
      }
      const forcedScore = isForcedRetirement ? calculateCareerScore({ ...finalUpdatedPlayer, bankBalance: newBankBalance }, prev.rivalConfrontations) : null;

      return {
        ...prev,
        player: finalUpdatedPlayer,
        club: updatedClub,
        season: newSeason,
        bankBalance: newBankBalance,
        eventsList: seasonEvents,
        currentEvent: seasonEvents[0],
        eventStep: 1,
        totalEvents: seasonEvents.length,
        seasonStats: null,
        lastSeasonStats: statsToUse,
        transferMarketOffers: null,
        palmares: newPalmares,
        rival: updatedRival,
        isRetired: isForcedRetirement,
        needsTraitSelection: is18
      };
    });
  };

  const submitScoreToLeaderboard = async (player, palmares, rivalConfrontations) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { totalScore, maxOvr } = calculateCareerScore(player, rivalConfrontations);
      const pseudo = getPseudonym() || 'Anonyme';
      
      // Save card to local Hall of Fame collection (prime version)
      saveCardToCollection(player, palmares, maxOvr);
      
      const realName = player.name;
      const nationality = typeof player.origin === 'object' ? player.origin?.id : player.origin;
      
      const majorTrophiesNames = ["Ballon d'Or", "Vainqueur de la Coupe du Monde", "Vainqueur de l'Euro", "Vainqueur de la Copa America", "Vainqueur de la Ligue des Champions"];
      const major_trophies = palmares ? palmares.filter(t => majorTrophiesNames.includes(t.text)).length : 0;

      const ballon_dor = palmares ? palmares.filter(t => t.text === "Ballon d'Or").length : 0;

      const combinedName = pseudo !== 'Anonyme' ? `${pseudo} (${realName})` : realName;
      const payload = {
        player_name: combinedName,
        score: totalScore,
        ovr: maxOvr,
        nationality: nationality,
        position: player.position,
        major_trophies: major_trophies,
        ballon_dor: ballon_dor,
        is_coop: !!multiplayerContext?.isCoopMode
      };
      
      if (session) {
        payload.user_id = session.user.id;
      }

      await supabase.from('leaderboard').insert([payload]);
    } catch (e) {
      console.error("Failed to submit score:", e);
    }
  };

  const handleRetire = () => {
    setGameState((prev) => {
      submitScoreToLeaderboard({ ...prev.player, bankBalance: prev.bankBalance }, prev.palmares, prev.rivalConfrontations);
      return {
        ...prev,
        isRetired: true,
        score: calculateCareerScore({ ...prev.player, bankBalance: prev.bankBalance }, prev.rivalConfrontations)
      };
    });
  };

  const handleRestartGame = () => {
    if (multiplayerContext?.roomObj) {
      multiplayerContext.roomObj.sendBroadcast({ type: 'PLAYER_QUIT' });
      multiplayerContext.roomObj.leaveRoom();
    }
    clearMultiplayerSession();
    setMultiplayerContext(null);
    setGameState(null);
    setAppView('mainMenu');
  };

  if (appView === 'futsalManager') {
    return <FutsalTeamsManager onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  if (appView === 'futsalLobby') {
    return <FutsalLobby 
      multiplayerContext={multiplayerContext}
      onStart={(roomObj, playerId, players, roomId, isHost) => {
        setMultiplayerContext({ roomObj, playerId, players, roomId, isHost, isCoop: false });
        setAppView('futsalMatch');
      }}
      onBack={() => {
        if (multiplayerContext?.roomObj) multiplayerContext.roomObj.leaveRoom();
        setMultiplayerContext(null);
        setInviteCode(null);
        setAppView('mainMenu');
      }}
    />
  }

  if (appView === 'futsalMatch') {
    return <FutsalMatch 
      roomObj={multiplayerContext.roomObj}
      playerId={multiplayerContext.playerId}
      players={multiplayerContext.players}
      isHost={multiplayerContext.isHost}
      onEndMatch={() => {
        if (multiplayerContext?.roomObj) multiplayerContext.roomObj.leaveRoom();
        setMultiplayerContext(null);
        setAppView('mainMenu');
      }}
    />
  }

  const handleBuyLifestyleItem = (item) => {
    setGameState((prev) => {
      if (prev.bankBalance < item.cost) return prev;
      let updatedPlayer = item.effect ? item.effect(prev.player) : { ...prev.player };
      updatedPlayer.inventory = [...(updatedPlayer.inventory || []), item.id];
      updatedPlayer.ovr = calculateOVR(updatedPlayer);
      updatedPlayer = updatePlayerBestCard(updatedPlayer, prev.club);

      const newUnlocks = checkAchievements(updatedPlayer, null, prev.club, prev.palmares);
      newUnlocks.forEach(achId => unlockAchievement(achId));

      return {
        ...prev,
        bankBalance: prev.bankBalance - item.cost,
        player: updatedPlayer
      };
    });
  };

  if (appView === 'mainMenu') {
    return (
      <>
        {showPseudoModal && <PseudonymModal onConfirm={handlePseudoConfirm} />}
        <MainMenu onNavigate={setAppView} onLoadGame={handleLoadGame} onJoinInvite={(code) => { setInviteCode(code); setAppView('multiplayerLobby'); }} />
      </>
    );
  }

  if (appView === 'globalPalmares') {
    return <GlobalPalmares onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  if (appView === 'achievements') {
    return <Achievements onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  if (appView === 'leaderboard') {
    return <Leaderboard onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  if (appView === 'cardCollection') {
    return <CardCollection onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  
  if (appView === 'multiplayerLobby' || appView === 'multiplayerLobbyCoop') {
    return <MultiplayerLobby 
      initialInviteCode={inviteCode}
      multiplayerContext={multiplayerContext}
      onBack={() => { setInviteCode(null); setAppView('mainMenu'); }}
      onStart={(roomObj, playerId, players, roomId, isHost, isCoop) => {
        setMultiplayerContext({ roomObj, playerId, players, roomId, isHost, isCoopMode: isCoop });
        setAppView('career');
        setGameState(null);
      }}
      initialCoopMode={appView === 'multiplayerLobbyCoop'}
    />;
  }

  if (appView === 'careerHistory') {
    return <CareerHistory onBack={() => { setInviteCode(null); setAppView('mainMenu'); }} />;
  }

  const handleRoleSelection = (role) => {
    setGameState(prev => ({
      ...prev,
      needsTraitSelection: false,
      player: {
        ...prev.player,
        roleId: role.id,
        roleName: role.name
      }
    }));
  };

  if (appView === 'career' && !gameState) {
    return <CharacterCreation onStartGame={handleStartGame} multiplayerContext={multiplayerContext} onRestartGame={handleRestartGame} />;
  }

  return (
    <>
      <Dashboard
        gameState={gameState}
        multiplayerContext={multiplayerContext}
      activeOutcome={activeOutcome}
      onChooseClub={handleChooseClub}
      onSelectOption={handleSelectOption}
      onContinueFromOutcome={handleContinueFromOutcome}
      onPlayInteractiveMatch={handlePlayInteractiveMatch}
      onContinueFromInteractiveMatch={handleContinueFromInteractiveMatch}
      onCloseInteractiveMatch={handleCloseInteractiveMatch}
      onNextSeason={() => {
        if (gameState.transferMarketOffers && gameState.transferMarketOffers.length > 0) {
          setGameState((prev) => ({ ...prev, seasonStats: null }));
        } else {
          handleProceedToNextSeasonFinal();
        }
      }}
      onAcceptTransferOffer={handleAcceptTransferOffer}
      onRejectTransferOffer={handleRejectTransferOffer}
      onStayCurrentClub={handleStayCurrentClub}
      onBuyLifestyleItem={handleBuyLifestyleItem}
      onRetire={handleRetire}
      onRestartGame={handleRestartGame}
      onQuit={handleRestartGame}
    />
    {showPseudoModal && (
      <PseudonymModal 
        onSave={() => setShowPseudoModal(false)}
        onClose={() => setShowPseudoModal(false)}
      />
    )}
    {gameState?.needsTraitSelection && (
      <RoleSelectionModal onSelect={handleRoleSelection} playerPosition={gameState.player.position} />
    )}
    </>
  );
}
