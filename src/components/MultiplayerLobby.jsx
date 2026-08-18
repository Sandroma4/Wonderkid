import React, { useState, useEffect } from 'react';
import { generateRoomCode, createMultiplayerRoom } from '../utils/multiplayer';
import { playSound } from '../utils/audio';

export const MultiplayerLobby = ({ onStart, onBack, multiplayerContext, initialCoopMode, initialInviteCode, userName }) => {
  const [roomId, setRoomId] = useState(multiplayerContext ? multiplayerContext.roomId : (initialInviteCode || ''));
  const [joinCode, setJoinCode] = useState('');
  const [players, setPlayers] = useState(multiplayerContext ? multiplayerContext.players : []);
  const [playerId] = useState(() => multiplayerContext ? multiplayerContext.playerId : Math.random().toString(36).substring(2, 9));
  const [isHost, setIsHost] = useState(multiplayerContext ? multiplayerContext.isHost : false);
  const [status, setStatus] = useState(multiplayerContext ? 'lobby' : 'menu'); // 'menu', 'hosting', 'joining', 'lobby'
  const [roomObj, setRoomObj] = useState(multiplayerContext ? multiplayerContext.roomObj : null);
  const [isCoopMode, setIsCoopMode] = useState(initialCoopMode || false);
  
  const [playerName, setPlayerName] = useState(userName || localStorage.getItem('wonderkid_pseudo') || 'Joueur Inconnu');

  // If restoring, attach setPlayers callback to roomObj
  useEffect(() => {
    if (multiplayerContext?.roomObj && status === 'lobby') {
      multiplayerContext.roomObj.setOnStateChange((updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
      // also ensure our latest playerName is synced if we just reloaded
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
      isCoop: false
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
    };
    
    const room = createMultiplayerRoom(joinCode.toUpperCase(), playerId, initialPlayerState, (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    setRoomObj(room);
    setStatus('lobby');
  };

  const handleStartGame = () => {
    playSound('click');
    if (roomObj) {
      roomObj.updateState({ name: playerName, isHost, ready: true, starting: true, isCoop: isCoopMode });
    }
  };

  // Listen for 'starting' signal from host
  useEffect(() => {
    if (status === 'lobby' && players.length > 0) {
      const hostStarting = players.find(p => p.isHost && p.starting);
      if (hostStarting) {
        isStartingRef.current = true;
        onStart(roomObj, playerId, players, roomId, isHost, hostStarting.isCoop);
      }
    }
  }, [players, status, onStart, roomObj, playerId]);

  return (
    <div className="app-typography min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-[0.03]"></div>
      
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative z-10 flex flex-col items-center text-center">
        
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="absolute top-4 left-4 text-white bg-slate-800/80 hover:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-700 z-50 whitespace-nowrap"
        >
          ← Retour
        </button>

        <h2 className="heading-typography text-2xl font-black text-white uppercase tracking-wider mb-2 mt-4">
          La Course à la Carrière
        </h2>
        <p className="text-slate-400 text-sm mb-8 px-4">
          {(!isHost ? players.find(p => p.isHost)?.isCoop : isCoopMode) ? 'Devenez Frères d\'Armes, évoluez dans le même club et gagnez la Ligue des Champions ensemble !' : 'Affrontez un ami en direct. Créez votre joueur, vivez votre carrière en simultané, et comparez vos scores finaux !'}
        </p>

        {status === 'menu' && (
          <div className="w-full space-y-4">
            <button 
              onClick={handleCreateRoom}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-wide transition-colors shadow-lg shadow-emerald-900/20"
            >
              Créer un Salon
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-slate-800 flex-1"></div>
              <span className="text-slate-500 text-xs uppercase font-bold">ou</span>
              <div className="h-px bg-slate-800 flex-1"></div>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Code à 4 lettres"
                maxLength={4}
                className="flex-1 bg-slate-800 border border-slate-700 text-white text-center font-mono text-xl rounded-xl focus:outline-none focus:border-cyan-500"
              />
              <button 
                onClick={handleJoinRoom}
                disabled={joinCode.length !== 4}
                className="px-6 py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-bold uppercase tracking-wide transition-colors"
              >
                Rejoindre
              </button>
            </div>
          </div>
        )}

        {status === 'lobby' && (
          <div className="w-full flex flex-col items-center">
            {isHost && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 w-full shadow-inner">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Code du Salon</p>
                <p className="text-4xl font-mono font-black text-cyan-400 tracking-widest">{roomId}</p>
                <p className="text-xs text-slate-500 mt-2">Partagez ce code avec votre adversaire</p>
              </div>
            )}

            <div className="w-full space-y-3 mb-8 text-left">
              
            {isHost && (
              <div className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mode Coopératif</h3>
                  <p className="text-xs text-slate-400">Jouez dans le même club en Frères d'Armes</p>
                </div>
                <button 
                  onClick={() => {
                    playSound('click');
                    const newMode = !isCoopMode;
                    setIsCoopMode(newMode);
                    if (roomObj) roomObj.updateState({ isCoop: newMode });
                  }}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isCoopMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isCoopMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            )}
            
            {!isHost && players.find(p => p.isHost)?.isCoop && (
               <div className="w-full bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-3 mb-4 flex items-center justify-center">
                 <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🌟 Mode Coopératif Activé 🌟</span>
               </div>
            )}
            
            <h3 className="text-slate-300 font-bold uppercase text-xs tracking-wider border-b border-slate-800 pb-2">Joueurs dans le salon</h3>
              {players.map(p => (
                <div key={p.playerId} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${p.playerId === playerId ? 'bg-emerald-500' : 'bg-cyan-500'}`}></div>
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                  {p.isHost && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded font-bold uppercase">Hôte</span>}
                </div>
              ))}
              {players.length < 2 && (
                <div className="flex items-center justify-center bg-slate-800/30 p-3 rounded-lg border border-slate-800 border-dashed animate-pulse">
                  <span className="text-slate-500 italic text-sm">En attente d'un adversaire...</span>
                </div>
              )}
            </div>

            {isHost ? (
              <button 
                onClick={handleStartGame}
                disabled={players.length < 2}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold uppercase tracking-wide transition-all shadow-lg shadow-emerald-900/20 disabled:shadow-none"
              >
                {players.length < 2 ? 'Attente des joueurs' : 'Lancer la Carrière'}
              </button>
            ) : (
              <div className="w-full py-4 bg-slate-800 text-slate-400 rounded-xl font-bold uppercase tracking-wide border border-slate-700 flex justify-center items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                En attente de l'hôte...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
