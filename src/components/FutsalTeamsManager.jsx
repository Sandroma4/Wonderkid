import React, { useState, useEffect } from 'react';
import { getFutsalTeams, saveFutsalTeams, getCardCollection } from '../utils/storage';
import { playSound } from '../utils/audio';
import { PlayerCard } from './PlayerCard';

const FORMATIONS = {
  '1-2-1': { name: 'Losange (1-2-1)', slots: ['GK', 'DEF', 'MIL', 'MIL', 'ATT'] },
  '2-2': { name: 'Carré (2-2)', slots: ['GK', 'DEF', 'DEF', 'ATT', 'ATT'] },
  '2-1-1': { name: 'Pyramide (2-1-1)', slots: ['GK', 'DEF', 'DEF', 'MIL', 'ATT'] },
  '1-1-2': { name: 'Y Inversé (1-1-2)', slots: ['GK', 'DEF', 'MIL', 'ATT', 'ATT'] },
  '3-1': { name: 'Défensif (3-1)', slots: ['GK', 'DEF', 'DEF', 'DEF', 'ATT'] }
};

export const FutsalTeamsManager = ({ onBack }) => {
  const [teams, setTeams] = useState([]);
  const [collection, setCollection] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    setTeams(getFutsalTeams());
    setCollection(getCardCollection());
  }, []);

  const handleCreateTeam = () => {
    setEditingTeam({
      id: Date.now().toString(),
      name: `Équipe Futsal ${teams.length + 1}`,
      formation: '1-2-1',
      players: [null, null, null, null, null]
    });
  };

  const handleSaveTeam = () => {
    // Validation
    const filledPlayers = editingTeam.players.filter(p => p !== null);
    if (filledPlayers.length < 5) {
      alert("Votre équipe doit comporter 5 joueurs.");
      return;
    }
    const hasGK = filledPlayers.some(p => p.position === 'GB' || p.position === 'GK');
    const hasDEF = filledPlayers.some(p => p.position === 'DEF' || ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p.position));
    
    if (!hasGK) {
      alert("Votre équipe doit comporter au moins un Gardien (GK).");
      return;
    }
    if (!hasDEF) {
      alert("Votre équipe doit comporter au moins un Défenseur (DEF).");
      return;
    }

    const newTeams = [...teams];
    const existingIndex = newTeams.findIndex(t => t.id === editingTeam.id);
    if (existingIndex >= 0) {
      newTeams[existingIndex] = editingTeam;
    } else {
      newTeams.push(editingTeam);
    }
    setTeams(newTeams);
    saveFutsalTeams(newTeams);
    setEditingTeam(null);
    playSound('levelUp');
  };

  const handleSelectCard = (card) => {
    // Check if card is already in the team
    if (editingTeam.players.some(p => p && p.id === card.id)) {
      alert("Ce joueur est déjà dans l'équipe.");
      return;
    }

    const newPlayers = [...editingTeam.players];
    newPlayers[activeSlot] = card;
    setEditingTeam({ ...editingTeam, players: newPlayers });
    setShowCardSelector(false);
    playSound('click');
  };

  const handleDeleteTeam = (id) => {
    if (window.confirm("Supprimer cette équipe ?")) {
      const newTeams = teams.filter(t => t.id !== id);
      setTeams(newTeams);
      saveFutsalTeams(newTeams);
      playSound('click');
    }
  };

  if (editingTeam) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in flex flex-col h-full overflow-y-auto pb-32 relative">
        <button 
        onClick={() => { playSound('click'); setEditingTeam(null); }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 shrink-0 text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 md:p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap shadow-lg"
      >
        ← Retour
      </button>

      <div className="flex flex-col items-center justify-center mb-6 mt-16 md:mt-0 text-center w-full">
        <h2 className="w-full heading-typography text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-tight">
          Création d'équipe
        </h2>
      </div>

        <div className="flex items-center gap-4 mb-6 md:mb-8 sticky top-0 bg-[#0f172a] z-10 py-4 border-b border-slate-700/50 backdrop-blur-md bg-opacity-80">
          <div className="flex-1">
            <input 
              type="text" 
              value={editingTeam.name}
              onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
              className="bg-transparent heading-typography text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-tight w-full outline-none border-b border-orange-500/30 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="text-xs uppercase font-bold text-slate-400 mb-2 block">Formation</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(FORMATIONS).map(key => (
                <button
                  key={key}
                  onClick={() => setEditingTeam({ ...editingTeam, formation: key })}
                  className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${editingTeam.formation === key ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {FORMATIONS[key].name}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleSaveTeam}
            className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wide text-sm whitespace-nowrap"
          >
            Sauvegarder l'équipe
          </button>
        </div>

        <div className="max-w-xl mx-auto w-full mb-8">
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-h-[65vh] bg-emerald-800 rounded-3xl border-8 border-slate-900 overflow-hidden shadow-2xl">
              {/* OVR Badge inside pitch */}
              <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center justify-center">
                 <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-tight mb-0.5">OVR</div>
                 <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 leading-none">
                    {(() => {
                      const players = editingTeam.players.filter(p => p !== null);
                      if (players.length === 0) return '0';
                      const avg = players.reduce((sum, p) => sum + (p.ovr || 0), 0) / players.length;
                      return Math.round(avg);
                    })()}
                  </div>
              </div>

              {/* Futsal Court Markings */}
              <div className="absolute inset-2 md:inset-4 border-2 border-white/40 rounded-lg pointer-events-none"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/40 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              {/* Rectangular Penalty Areas */}
              <div className="absolute top-2 md:top-4 left-1/2 w-48 h-20 border-2 border-white/40 border-t-0 -translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-2 md:bottom-4 left-1/2 w-48 h-20 border-2 border-white/40 border-b-0 -translate-x-1/2 pointer-events-none"></div>
              
              {/* Wood texture overlay for Futsal */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
              
              {/* Slots */}
              <div className="absolute inset-0 flex flex-col justify-between py-4 sm:py-6 md:py-8 px-2 sm:px-4 relative z-10">
             <div className="flex justify-center w-full">
               <Slot index={0} player={editingTeam.players[0]} role={FORMATIONS[editingTeam.formation].slots[0]} onClick={() => { setActiveSlot(0); setShowCardSelector(true); }} />
             </div>
             
             {editingTeam.formation === '1-2-1' && (
                <>
                  <div className="flex justify-center w-full">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-between w-full px-4 md:px-16">
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                     <Slot index={3} player={editingTeam.players[3]} role={FORMATIONS[editingTeam.formation].slots[3]} onClick={() => { setActiveSlot(3); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-center w-full">
                     <Slot index={4} player={editingTeam.players[4]} role={FORMATIONS[editingTeam.formation].slots[4]} onClick={() => { setActiveSlot(4); setShowCardSelector(true); }} />
                  </div>
                </>
             )}
             {editingTeam.formation === '2-2' && (
                <>
                  <div className="flex justify-around w-full px-8 md:px-24">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-around w-full px-8 md:px-24 mt-auto">
                     <Slot index={3} player={editingTeam.players[3]} role={FORMATIONS[editingTeam.formation].slots[3]} onClick={() => { setActiveSlot(3); setShowCardSelector(true); }} />
                     <Slot index={4} player={editingTeam.players[4]} role={FORMATIONS[editingTeam.formation].slots[4]} onClick={() => { setActiveSlot(4); setShowCardSelector(true); }} />
                  </div>
                </>
             )}
             {editingTeam.formation === '2-1-1' && (
                <>
                  <div className="flex justify-around w-full px-12 md:px-24">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-center w-full">
                     <Slot index={3} player={editingTeam.players[3]} role={FORMATIONS[editingTeam.formation].slots[3]} onClick={() => { setActiveSlot(3); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-center w-full">
                     <Slot index={4} player={editingTeam.players[4]} role={FORMATIONS[editingTeam.formation].slots[4]} onClick={() => { setActiveSlot(4); setShowCardSelector(true); }} />
                  </div>
                </>
             )}
             {editingTeam.formation === '1-1-2' && (
                <>
                  <div className="flex justify-center w-full">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-center w-full">
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-around w-full px-12 md:px-24">
                     <Slot index={3} player={editingTeam.players[3]} role={FORMATIONS[editingTeam.formation].slots[3]} onClick={() => { setActiveSlot(3); setShowCardSelector(true); }} />
                     <Slot index={4} player={editingTeam.players[4]} role={FORMATIONS[editingTeam.formation].slots[4]} onClick={() => { setActiveSlot(4); setShowCardSelector(true); }} />
                  </div>
                </>
             )}
             {editingTeam.formation === '3-1' && (
                <>
                  <div className="flex justify-between w-full px-4 md:px-12">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                     <Slot index={3} player={editingTeam.players[3]} role={FORMATIONS[editingTeam.formation].slots[3]} onClick={() => { setActiveSlot(3); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-center w-full mt-4">
                     <Slot index={4} player={editingTeam.players[4]} role={FORMATIONS[editingTeam.formation].slots[4]} onClick={() => { setActiveSlot(4); setShowCardSelector(true); }} />
                  </div>
                </>
             )}
              </div>
          </div>
        </div>

        {showCardSelector && (
          <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md p-4 pt-16 md:pt-4">
            <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="heading-typography text-2xl font-bold text-white uppercase tracking-wider">Sélectionnez une carte</h3>
                <button onClick={() => setShowCardSelector(false)} className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold">Fermer</button>
              </div>
              
              <div className="flex-1 overflow-y-auto pb-20">
                {(() => {
                  const activeRole = (activeSlot !== null && editingTeam) ? FORMATIONS[editingTeam.formation].slots[activeSlot] : null;
                  const allowedPositions = activeRole === 'GK' ? ['GB', 'GK'] 
                                         : activeRole === 'DEF' ? ['DEF', 'CB', 'LB', 'RB', 'LWB', 'RWB']
                                         : activeRole === 'MIL' ? ['MID', 'MIL', 'CDM', 'CM', 'CAM', 'RM', 'LM']
                                         : activeRole === 'ATT' ? ['ATT', 'FWD', 'ST', 'CF', 'RW', 'LW']
                                         : [];
                                         
                  const filteredCollection = collection.filter(card => {
                    if (!activeRole) return true;
                    return allowedPositions.includes(card.position);
                  });

                  if (filteredCollection.length === 0) {
                    return (
                      <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800">
                        <p className="text-slate-400">Aucun joueur ne correspond au poste de {activeRole}. Jouez d'autres carrières pour débloquer des cartes !</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredCollection.map(card => {
                        const isSelected = editingTeam.players.some(p => p && p.id === card.id);
                        return (
                          <div 
                            key={card.id} 
                            onClick={() => !isSelected && handleSelectCard(card)}
                            className={`relative transition-transform duration-200 ${isSelected ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
                          >
                            <div className="flex justify-center w-full h-[250px] overflow-visible">
                              <PlayerCard player={card} club={card.club} className="scale-[0.6] sm:scale-75 md:scale-90 origin-top" />
                            </div>
                            {isSelected && <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 rounded-xl"><span className="text-white font-bold text-xl uppercase tracking-wider rotate-[-15deg]">Sélectionné</span></div>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in flex flex-col h-full overflow-y-auto pb-32">
      <button 
        onClick={() => { playSound('click'); onBack(); }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 shrink-0 text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-2 md:p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap shadow-lg"
      >
        ← Retour
      </button>

      <div className="flex flex-col items-center justify-center mb-6 md:mb-10 mt-16 md:mt-0 text-center w-full">
        <h2 className="w-full heading-typography text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-tight">
          Gestion Futsal
        </h2>
      </div>

      <button 
        onClick={() => { playSound('click'); handleCreateTeam(); }}
        className="w-full md:w-auto self-start px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wide flex items-center gap-2 mb-8"
      >
        <span>+</span> Créer une nouvelle équipe
      </button>

      {teams.length === 0 ? (
        <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
          <div className="text-4xl mb-4">👟</div>
          <h3 className="heading-typography text-xl font-bold text-white mb-2 uppercase">Aucune équipe</h3>
          <p className="text-slate-400 max-w-md mx-auto">Créez votre première équipe de Futsal avec vos meilleures cartes du Hall of Fame pour affronter d'autres joueurs en ligne.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col hover:border-orange-500/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="heading-typography text-xl font-bold text-white uppercase">{team.name}</h3>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{FORMATIONS[team.formation]?.name || team.formation}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingTeam(team)} className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 text-white transition-colors">✏️</button>
                  <button onClick={() => handleDeleteTeam(team.id)} className="p-2 bg-slate-800 rounded-lg hover:bg-rose-600 text-white transition-colors">🗑️</button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-slate-800 overflow-x-auto pb-2">
                {team.players.map((p, idx) => (
                  p ? (
                    <div key={idx} className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-full border-2 border-orange-500/30 flex items-center justify-center overflow-hidden" title={p.player.name}>
                      <span className="font-bold text-white text-xs">{p.player.name.substring(0,2).toUpperCase()}</span>
                    </div>
                  ) : (
                    <div key={idx} className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center opacity-50"></div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Slot = ({ index, player, role, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ${player ? '' : 'opacity-70 hover:opacity-100'}`}
    >
      {player ? (
        <div className="flex justify-center items-start w-[110px] h-[150px] sm:w-[130px] sm:h-[185px] md:w-[145px] md:h-[210px] overflow-visible pointer-events-none drop-shadow-2xl">
          <PlayerCard player={player} club={player.club} className="!scale-[0.42] sm:!scale-[0.5] md:!scale-[0.55] origin-top !mb-0 !mx-0" />
        </div>
      ) : (
        <>
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 shadow-xl flex items-center justify-center overflow-hidden bg-slate-800 border-white/30 border-dashed">
            <span className="text-white/50 text-2xl">+</span>
          </div>
          <div className="mt-1 bg-black/60 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm">
            {role}
          </div>
        </>
      )}
    </div>
  );
};

