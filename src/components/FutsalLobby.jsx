import React, { useState, useEffect } from 'react';
import { generateRoomCode, createMultiplayerRoom } from '../utils/multiplayer';
import { playSound } from '../utils/audio';
import { supabase } from '../supabaseClient';
import { getFutsalTeams } from '../utils/storage';

export const FutsalLobby = ({ onStart, onBack, multiplayerContext }) => {
  const [roomId, setRoomId] = useState(multiplayerContext ? multiplayerContext.roomId : '');
  const [joinCode, setJoinCode] = useState('');
  const [players, setPlayers] = useState(multiplayerContext ? multiplayerContext.players : []);
  const [playerId] = useState(() => multiplayerContext ? multiplayerContext.playerId : Math.random().toString(36).substring(2, 9));
  const [isHost, setIsHost] = useState(multiplayerContext ? multiplayerContext.isHost : false);
  const [status, setStatus] = useState(multiplayerContext ? 'lobby' : 'menu'); // 'menu', 'hosting', 'joining', 'lobby'
  const [roomObj, setRoomObj] = useState(multiplayerContext ? multiplayerContext.roomObj : null);
  
  const [playerName, setPlayerName] = useState(localStorage.getItem('golden_xi_pseudonym') || 'Joueur Inconnu');
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.user_metadata?.pseudonym) {
        setPlayerName(session.user.user_metadata.pseudonym);
      }
    };
    fetchUser();
    setMyTeams(getFutsalTeams());
  }, []);

  useEffect(() => {
    if (multiplayerContext?.roomObj && status === 'lobby') {
      multiplayerContext.roomObj.setOnStateChange((updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
      multiplayerContext.roomObj.updateState({ name: playerName });
    }
  }, [multiplayerContext?.roomObj, status, playerName]);

  const isStartingRef = React.useRef(false);

  useEffect(() => {
    return () => {
      if (roomObj && !isStartingRef.current) {
        roomObj.leaveRoom();
      }
    };
  }, [roomObj]);

  const handleCreateRoom = () => {
    playSound('click');
    const code = generateRoomCode();
    setRoomId(code);
    setIsHost(true);
    setStatus('hosting');
    
    const initialPlayerState = {
      name: playerName,
      isHost: true,
      ready: false,
      futsalTeam: null
    };
    
    const room = createMultiplayerRoom(code, playerId, initialPlayerState, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    setRoomObj(room);
    setStatus('lobby');
  };

  const handleJoinRoom = () => {
    playSound('click');
    if (joinCode.length !== 4) return;
    setRoomId(joinCode.toUpperCase());
    setIsHost(false);
    setStatus('joining');
    
    const initialPlayerState = {
      name: playerName,
      isHost: false,
      ready: false,
      futsalTeam: null
    };
    
    const room = createMultiplayerRoom(joinCode.toUpperCase(), playerId, initialPlayerState, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    setRoomObj(room);
    setStatus('lobby');
  };

  const handleSelectTeam = (teamId) => {
    playSound('click');
    setSelectedTeamId(teamId);
    const team = myTeams.find(t => t.id === teamId);
    if (roomObj) {
      roomObj.updateState({ futsalTeam: team, ready: true });
    }
  };

  const handleStartGame = () => {
    playSound('click');
    if (roomObj) {
      roomObj.updateState({ starting: true });
    }
  };

  useEffect(() => {
    if (status === 'lobby' && players.length > 0) {
      const hostStarting = players.find(p => p.isHost && p.starting);
      if (hostStarting) {
        isStartingRef.current = true;
        onStart(roomObj, playerId, players, roomId, isHost);
      }
    }
  }, [players, status, onStart, roomObj, playerId, roomId, isHost]);

  const allPlayersReady = players.length === 2 && players.every(p => p.ready && p.futsalTeam);

  return (
    <div className="app-typography min-h-[100dvh] bg-red-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-5"></div>
      
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 flex flex-col items-center text-center">
        
        <div className="flex items-center gap-4 mb-4 md:mb-8 mt-4 relative z-10 w-full text-left max-w-sm mx-auto">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="shrink-0 text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 md:p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap"
          >
            ← Retour
          </button>
          <div>
            <h2 className="heading-typography text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-wider mb-1 leading-none">
              FUTSAL (5v5)
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              Affrontez d'autres joueurs avec votre équipe composée de vos 5 meilleures cartes du Hall of Fame.
            </p>
          </div>
        </div>

        {status === 'menu' && (
          <div className="w-full max-w-sm mx-auto space-y-4">
            {myTeams.length === 0 ? (
              <div className="p-4 bg-orange-500/10 border border-orange-500/50 rounded-xl text-orange-400 font-bold mb-4">
                Vous devez d'abord créer une équipe Futsal dans le menu "Gestion Futsal" avant de pouvoir jouer en ligne.
              </div>
            ) : (
              <>
                <button 
                  onClick={handleCreateRoom}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold uppercase tracking-wide transition-colors shadow-lg"
                >
                  Créer un Salon
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1"></div>
                  <span className="text-slate-500 dark:text-slate-500 text-xs uppercase font-bold">ou</span>
                  <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1"></div>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="Code à 4 lettres"
                    maxLength={4}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white text-center font-mono text-xl rounded-xl focus:outline-none focus:border-orange-500 uppercase"
                  />
                  <button 
                    onClick={handleJoinRoom}
                    disabled={joinCode.length !== 4}
                    className="px-6 py-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold uppercase tracking-wide transition-colors"
                  >
                    Rejoindre
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {status === 'lobby' && (
          <div className="w-full flex flex-col items-center">
            {isHost && (
              <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-4 mb-6 w-full max-w-sm shadow-inner">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Code du Salon</p>
                <p className="text-4xl font-mono font-black text-orange-500 tracking-widest">{roomId}</p>
                <p className="text-xs text-slate-500 mt-2">Partagez ce code avec votre adversaire</p>
              </div>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <h3 className="text-orange-400 font-bold uppercase text-xs tracking-wider mb-4 border-b border-slate-700 pb-2">Joueurs dans le salon</h3>
                {players.map(p => (
                  <div key={p.playerId} className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${p.playerId === playerId ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                      <span className="font-semibold text-white">{p.name}</span>
                    </div>
                    {p.ready ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold uppercase">Prêt</span>
                    ) : (
                      <span className="text-[10px] bg-slate-500/20 text-slate-400 px-2 py-1 rounded font-bold uppercase">Choix équipe...</span>
                    )}
                  </div>
                ))}
                {players.length < 2 && (
                  <div className="flex items-center justify-center bg-slate-900/50 p-3 rounded-lg border border-slate-700 border-dashed animate-pulse mt-2">
                    <span className="text-slate-500 italic text-sm">En attente d'un adversaire...</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col h-full">
                <h3 className="text-orange-400 font-bold uppercase text-xs tracking-wider mb-4 border-b border-slate-700 pb-2">Votre Équipe</h3>
                <div className="flex-1 overflow-y-auto max-h-[200px] space-y-2">
                  {myTeams.map(team => (
                    <div 
                      key={team.id}
                      onClick={() => handleSelectTeam(team.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors ${selectedTeamId === team.id ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-orange-400/50'}`}
                    >
                      <div className="font-bold">{team.name}</div>
                      <div className="text-xs opacity-70 uppercase">{team.formation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {isHost ? (
              <button 
                onClick={handleStartGame}
                disabled={!allPlayersReady}
                className="w-full max-w-sm py-4 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold uppercase tracking-wide transition-all shadow-lg shadow-orange-900/20 disabled:shadow-none"
              >
                {players.length < 2 ? 'Attente des joueurs' : (!allPlayersReady ? 'En attente des équipes' : 'Lancer le Match Futsal')}
              </button>
            ) : (
              <div className="w-full max-w-sm py-4 bg-slate-800 text-slate-400 rounded-xl font-bold uppercase tracking-wide border border-slate-700 flex justify-center items-center gap-2">
                {!selectedTeamId ? 'Sélectionnez une équipe ↑' : (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Attente de l'hôte...
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
