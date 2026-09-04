import React, { useState, useEffect } from 'react';
import { getFiveTeams, getAccountData, saveAccountData } from '../utils/storage';
import { playSound } from '../utils/audio';
import { generateClashLeague } from '../utils/clashGenerator';

export const ClashLobby = ({ onBack, onStartMatch, clashContext, setClashContext }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    setMyTeams(getFiveTeams());
    if (!clashContext) {
      setClashContext({
        league: generateClashLeague(),
        currentMatchIndex: 0,
        wins: 0,
        draws: 0,
        losses: 0
      });
    }
  }, [clashContext, setClashContext]);

  if (!clashContext) return null;

  const { league: clashLeague, currentMatchIndex } = clashContext;

  const handleSelectTeam = (teamId) => {
    playSound('click');
    setSelectedTeamId(teamId);
  };

  const handleStartMatch = () => {
    if (!selectedTeamId) return;
    playSound('start');
    const myTeam = myTeams.find(t => t.id === selectedTeamId);
    const opponentTeam = clashLeague[currentMatchIndex];
    onStartMatch(myTeam, opponentTeam, currentMatchIndex);
  };

  const handleClaimReward = () => {
    if (rewardClaimed) return;
    playSound('coins');
    let reward = (clashContext.wins * 3) + (clashContext.draws * 1);
    if (clashContext.wins === 4) reward += 5; // Bonus Flawless
    const accountData = getAccountData();
    accountData.goldenCoins += reward;
    saveAccountData(accountData);
    setRewardClaimed(true);
    alert(`Félicitations ! Vous avez remporté ${reward} Golden Coins (💰) grâce à votre performance : ${clashContext.wins} V, ${clashContext.draws} N, ${clashContext.losses} D.`);
    setClashContext(null);
    onBack();
  };

  const selectedTeam = myTeams.find(t => t.id === selectedTeamId);
  const nextOpponent = currentMatchIndex < 4 ? clashLeague[currentMatchIndex] : null;

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 relative overflow-hidden flex flex-col text-white">
      
      <div className="w-full max-w-6xl mx-auto flex justify-start mb-4 relative z-10">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 shadow-lg font-bold"
        >
          Retour
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center mb-6 md:mb-8 w-full max-w-6xl mx-auto pt-2">
        <div className="w-full text-center px-4">
          <h1 className="heading-typography text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 uppercase tracking-tight drop-shadow-lg leading-none">
            Clash d'Équipes
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-lg font-medium">Affrontez l'IA dans une série de 4 matchs pour remporter le jackpot !</p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Team Selection */}
        <div className="flex flex-col bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-fuchsia-300">Votre Équipe</h2>
          {myTeams.length === 0 ? (
            <p className="text-slate-400">Vous n'avez pas encore d'équipe Five. Allez dans l'Éditeur d'Équipe pour en créer une !</p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3">
              {myTeams.map(team => (
                <button
                  key={team.id}
                  onClick={() => handleSelectTeam(team.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedTeamId === team.id ? 'bg-fuchsia-900/40 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'bg-slate-800 border-slate-600 hover:border-slate-500 hover:bg-slate-700'}`}
                >
                  <div className="font-bold text-lg">{team.name}</div>
                  <div className="text-sm text-slate-400">Formation : {team.formation}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: League Path */}
        <div className="flex flex-col bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm relative">
          <h2 className="text-2xl font-bold mb-6 text-fuchsia-300 text-center">Votre Parcours</h2>
          
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {clashLeague.map((team, idx) => {
              const isCurrent = idx === currentMatchIndex;
              const isPast = idx < currentMatchIndex;
              const isFuture = idx > currentMatchIndex;
              
              let statusStyle = "";
              if (isPast) statusStyle = "opacity-50 grayscale";
              if (isCurrent) statusStyle = "scale-105 border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.5)] bg-slate-800 z-10";
              if (isFuture) statusStyle = "opacity-75 border-slate-700 bg-slate-900";

              return (
                <div key={team.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${statusStyle}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">
                      {isPast ? '✅' : `M${idx+1}`}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{team.name}</div>
                      <div className="text-sm text-slate-400">Manager: {team.pseudo}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    team.tier === 'BRONZE' ? 'bg-orange-900/50 text-orange-400' :
                    team.tier === 'SILVER' ? 'bg-slate-300/20 text-slate-300' :
                    team.tier === 'GOLD' ? 'bg-yellow-600/30 text-yellow-500' :
                    'bg-purple-900/50 text-purple-400'
                  }`}>
                    {team.tier}
                  </div>
                  {isPast && (
                    <div className={`ml-4 px-2 py-1 rounded text-xs font-bold ${
                      team.result === 'win' ? 'bg-emerald-900/50 text-emerald-400' :
                      team.result === 'loss' ? 'bg-rose-900/50 text-rose-400' :
                      'bg-slate-700/50 text-slate-300'
                    }`}>
                      {team.result === 'win' ? 'V' : team.result === 'loss' ? 'D' : 'N'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            {currentMatchIndex >= 4 ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">Ligue Terminée !</h3>
                <p className="text-slate-300 mb-6">Bilan : {clashContext.wins} Victoire(s), {clashContext.draws} Nul(s), {clashContext.losses} Défaite(s)</p>
                <button
                  onClick={handleClaimReward}
                  className="w-full py-4 rounded-2xl font-bold text-xl transition-all bg-amber-500 hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] active:scale-95 text-slate-900"
                >
                  Récupérer la Récompense 💰
                </button>
              </div>
            ) : (
              <button
                disabled={!selectedTeamId}
                onClick={handleStartMatch}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${
                  selectedTeamId
                  ? 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.6)] active:scale-95'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Lancer le Match
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
