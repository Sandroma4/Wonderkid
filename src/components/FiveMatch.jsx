import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';

export const FiveMatch = ({ roomObj, playerId, players, isHost, onEndMatch }) => {
  const [phase, setPhase] = useState(1);
  const [score, setScore] = useState({ host: 0, guest: 0 });
  const [myAction, setMyAction] = useState(null);
  const [opponentAction, setOpponentAction] = useState(null);
  const [logs, setLogs] = useState([]);
  const [matchEnded, setMatchEnded] = useState(false);
  const [resolving, setResolving] = useState(false);

  const me = players.find(p => p.playerId === playerId);
  const opponent = players.find(p => p.playerId !== playerId);
  
  const myTeam = me.fiveTeam;
  const oppTeam = opponent.fiveTeam;

  // Attacker is Host on odd phases, Guest on even phases
  const amIAttacking = (phase % 2 !== 0 && isHost) || (phase % 2 === 0 && !isHost);
  
  const calculateTeamStats = (team) => {
    let atk = 0, def = 0, phy = 0, pac = 0;
    team.players.forEach(p => {
      if (p) {
        const attrs = p.player.attributes;
        atk += (attrs.finishing + attrs.passing + attrs.dribbling) / 3;
        def += attrs.defense;
        phy += attrs.physical;
        pac += attrs.pace;
      }
    });
    return { atk: atk/5, def: def/5, phy: phy/5, pac: pac/5 };
  };

  const myStats = calculateTeamStats(myTeam);
  const oppStats = calculateTeamStats(oppTeam);

  useEffect(() => {
    if (roomObj) {
      roomObj.setOnBroadcast((payload) => {
        if (payload.type === 'FIVE_ACTION' && payload.phase === phase) {
          setOpponentAction(payload.action);
        } else if (payload.type === 'FIVE_NEXT_PHASE') {
          setPhase(payload.nextPhase);
          setMyAction(null);
          setOpponentAction(null);
          setResolving(false);
        } else if (payload.type === 'FIVE_RESOLVE') {
          setResolving(true);
          setTimeout(() => {
            setLogs(prev => [...prev, payload.log]);
            if (payload.goalFor === 'host') setScore(s => ({ ...s, host: s.host + 1 }));
            if (payload.goalFor === 'guest') setScore(s => ({ ...s, guest: s.guest + 1 }));
            
            setTimeout(() => {
              if (payload.isEnd) {
                setMatchEnded(true);
              } else if (isHost) {
                roomObj.sendBroadcast({ type: 'FIVE_NEXT_PHASE', nextPhase: phase + 1 });
              }
            }, 3000);
          }, 1000);
        }
      });
    }
  }, [roomObj, phase, isHost]);

  useEffect(() => {
    if (isHost && myAction && opponentAction && !resolving) {
      resolvePhase();
    }
  }, [myAction, opponentAction, isHost, resolving]);

  const handleSelectAction = (actionId) => {
    playSound('click');
    setMyAction(actionId);
    roomObj.sendBroadcast({ type: 'FIVE_ACTION', phase, action: actionId });
  };

  const resolvePhase = () => {
    setResolving(true);
    const hostAction = isHost ? myAction : opponentAction;
    const guestAction = !isHost ? myAction : opponentAction;
    
    let attackerAction = phase % 2 !== 0 ? hostAction : guestAction;
    let defenderAction = phase % 2 !== 0 ? guestAction : hostAction;
    
    let atkScore = 0;
    let defScore = 0;
    let logText = "";
    let goalFor = null;

    const hostStats = isHost ? myStats : oppStats;
    const guestStats = !isHost ? myStats : oppStats;
    const atkTeamStats = phase % 2 !== 0 ? hostStats : guestStats;
    const defTeamStats = phase % 2 !== 0 ? guestStats : hostStats;

    // Very simple rock-paper-scissors with stats logic
    if (attackerAction === 'tir') {
      atkScore = atkTeamStats.atk + Math.random() * 20;
      if (defenderAction === 'blocage') defScore = defTeamStats.def + 10 + Math.random() * 20;
      else defScore = defTeamStats.def + Math.random() * 20;
      logText = "Le tireur tente une frappe lourde ! ";
    } else if (attackerAction === 'passe') {
      atkScore = atkTeamStats.atk + atkTeamStats.pac + Math.random() * 20;
      if (defenderAction === 'interception') defScore = defTeamStats.def + defTeamStats.pac + 10 + Math.random() * 20;
      else defScore = defTeamStats.def + Math.random() * 20;
      logText = "Une combinaison rapide vers le pivot ! ";
    } else if (attackerAction === 'dribble') {
      atkScore = atkTeamStats.atk + atkTeamStats.pac + Math.random() * 20;
      if (defenderAction === 'tacle') defScore = defTeamStats.phy + defTeamStats.def + 10 + Math.random() * 20;
      else defScore = defTeamStats.def + Math.random() * 20;
      logText = "Il tente de passer en un-contre-un ! ";
    }

    if (atkScore > defScore) {
      logText += "C'EST AU FOND !!! BUUUUT ! ⚽";
      goalFor = phase % 2 !== 0 ? 'host' : 'guest';
    } else {
      logText += "Belle défense, l'action est stoppée ! 🛑";
    }

    const isEnd = phase >= 6; // 6 actions = 3 attacks each

    roomObj.sendBroadcast({
      type: 'FIVE_RESOLVE',
      log: { phase, text: logText, goalFor },
      goalFor,
      isEnd
    });
  };

  if (matchEnded) {
    const iWon = (isHost && score.host > score.guest) || (!isHost && score.guest > score.host);
    const isDraw = score.host === score.guest;
    
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-8">Fin du Match</h1>
        <div className="bg-slate-800 p-8 rounded-3xl border-2 border-slate-700 shadow-2xl flex flex-col items-center">
           <div className="flex items-center gap-8 text-5xl font-black text-orange-500 mb-8">
             <span>{isHost ? score.host : score.guest}</span>
             <span className="text-slate-500">-</span>
             <span>{isHost ? score.guest : score.host}</span>
           </div>
           
           <h2 className={`text-3xl font-black uppercase mb-8 ${isDraw ? 'text-slate-400' : (iWon ? 'text-emerald-500' : 'text-rose-500')}`}>
             {isDraw ? 'Match Nul' : (iWon ? 'Victoire !' : 'Défaite')}
           </h2>
           
           <button 
             onClick={() => { playSound('click'); onEndMatch(); }}
             className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xl uppercase transition-transform active:scale-95"
           >
             Quitter
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-typography min-h-[100dvh] bg-slate-900 flex flex-col items-center p-4">
      {/* Scoreboard */}
      <div className="w-full max-w-4xl bg-slate-800 rounded-b-3xl shadow-2xl p-4 flex justify-between items-center border-b-4 border-orange-500 mb-8">
        <div className={`flex flex-col items-center ${isHost ? 'text-orange-400' : 'text-slate-400'}`}>
          <span className="font-black text-xl uppercase truncate max-w-[120px]">{players.find(p=>p.isHost).name}</span>
          <span className="text-4xl font-black">{score.host}</span>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Phase {phase}/6</span>
           <div className="text-2xl">⚽</div>
        </div>
        <div className={`flex flex-col items-center ${!isHost ? 'text-orange-400' : 'text-slate-400'}`}>
          <span className="font-black text-xl uppercase truncate max-w-[120px]">{players.find(p=>!p.isHost).name}</span>
          <span className="text-4xl font-black">{score.guest}</span>
        </div>
      </div>

      {/* Match Engine */}
      <div className="w-full max-w-4xl flex-1 flex flex-col md:flex-row gap-4 mb-4">
        {/* Logs */}
        <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 p-4 overflow-y-auto max-h-[300px] flex flex-col gap-2">
          {logs.map((log, i) => (
            <div key={i} className={`p-3 rounded-lg text-sm font-semibold border-l-4 ${log.goalFor ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-300'}`}>
              <span className="text-xs text-slate-500 mr-2">PHASE {log.phase}</span>
              {log.text}
            </div>
          ))}
          {logs.length === 0 && <div className="text-slate-500 italic text-center mt-4">Le coup d'envoi est donné !</div>}
        </div>

        {/* Actions */}
        <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col justify-center">
          <h3 className="text-center font-black text-2xl uppercase tracking-wider text-white mb-6">
            {resolving ? 'Résolution en cours...' : (amIAttacking ? 'Phase Offensive ⚔️' : 'Phase Défensive 🛡️')}
          </h3>
          
          {resolving ? (
            <div className="flex justify-center items-center py-8 animate-pulse">
              <span className="text-6xl">⏳</span>
            </div>
          ) : (
            myAction ? (
              <div className="text-center text-slate-400 py-8 italic font-bold">
                En attente de l'adversaire...
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {amIAttacking ? (
                  <>
                    <button onClick={() => handleSelectAction('tir')} className="py-4 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Tir en force</button>
                    <button onClick={() => handleSelectAction('passe')} className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Passe au pivot</button>
                    <button onClick={() => handleSelectAction('dribble')} className="py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Dribble / 1v1</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSelectAction('blocage')} className="py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Blocage du tir</button>
                    <button onClick={() => handleSelectAction('interception')} className="py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Couper la passe</button>
                    <button onClick={() => handleSelectAction('tacle')} className="py-4 bg-slate-600 hover:bg-slate-500 rounded-xl font-bold uppercase text-white shadow-lg transition-transform active:scale-95">Tacle appuyé</button>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
