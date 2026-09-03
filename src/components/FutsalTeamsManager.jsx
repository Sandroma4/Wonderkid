import React, { useState, useEffect } from 'react';
import { getFutsalTeams, saveFutsalTeams, getCardCollection } from '../utils/storage';
import { playSound } from '../utils/audio';
import { PlayerCard } from './PlayerCard';

const FORMATIONS = {
  '1-2-1': { name: 'Losange (1-2-1)', slots: ['GK', 'DEF', 'MID', 'MID', 'FWD'] },
  '2-2': { name: 'Carré (2-2)', slots: ['GK', 'DEF', 'DEF', 'FWD', 'FWD'] },
  '2-1-1': { name: 'Pyramide (2-1-1)', slots: ['GK', 'DEF', 'DEF', 'MID', 'FWD'] },
  '1-1-2': { name: 'Y Inversé (1-1-2)', slots: ['GK', 'DEF', 'MID', 'FWD', 'FWD'] },
  '3-1': { name: 'Défensif (3-1)', slots: ['GK', 'DEF', 'DEF', 'DEF', 'FWD'] }
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
    const hasGK = filledPlayers.some(p => p.position === 'GK');
    const hasDEF = filledPlayers.some(p => ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(p.position));
    
    if (!hasGK) {
      alert("Votre équipe doit comporter au moins un Gardien (GK).");
      return;
    }
    if (!hasDEF) {
      alert("Votre équipe doit comporter au moins un Défenseur (CB/LB/RB/LWB/RWB).");
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
        <div className="flex items-center gap-4 mb-6 md:mb-8 sticky top-0 bg-[#0f172a] z-10 py-4 border-b border-slate-700/50 backdrop-blur-md bg-opacity-80">
          <button 
            onClick={() => { playSound('click'); setEditingTeam(null); }}
            className="p-2 md:p-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            ← Retour
          </button>
          <div className="flex-1">
            <input 
              type="text" 
              value={editingTeam.name}
              onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
              className="bg-transparent heading-typography text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-tight w-full outline-none border-b border-orange-500/30 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
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
            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wide text-sm"
          >
            Sauvegarder l'équipe
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <div className="flex-1 max-w-2xl mx-auto w-full">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3] bg-emerald-800 rounded-3xl border-8 border-slate-900 overflow-hidden shadow-2xl">
              {/* Futsal Court Markings */}
              <div className="absolute inset-2 md:inset-4 border-2 border-white/40 rounded-lg pointer-events-none"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/40 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute top-2 md:top-4 left-1/2 w-40 h-20 border-2 border-white/40 rounded-b-full -translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-2 md:bottom-4 left-1/2 w-40 h-20 border-2 border-white/40 rounded-t-full -translate-x-1/2 pointer-events-none"></div>
              
              {/* Wood texture overlay for Futsal */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
              
              {/* Slots */}
              <div className="absolute inset-0 flex flex-col justify-between py-8 md:py-12 px-2 sm:px-6 relative z-10">
             <div className="flex justify-center w-full">
               <Slot index={0} player={editingTeam.players[0]} role={FORMATIONS[editingTeam.formation].slots[0]} onClick={() => { setActiveSlot(0); setShowCardSelector(true); }} />
             </div>
             
             {editingTeam.formation === '1-2-1' && (
                <>
                  <div className="flex justify-around w-full px-8 md:px-16">
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
             {editingTeam.formation === '2-2' && (
                <>
                  <div className="flex justify-around w-full px-12 md:px-24">
                     <Slot index={1} player={editingTeam.players[1]} role={FORMATIONS[editingTeam.formation].slots[1]} onClick={() => { setActiveSlot(1); setShowCardSelector(true); }} />
                     <Slot index={2} player={editingTeam.players[2]} role={FORMATIONS[editingTeam.formation].slots[2]} onClick={() => { setActiveSlot(2); setShowCardSelector(true); }} />
                  </div>
                  <div className="flex justify-around w-full px-12 md:px-24">
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
          
          <div className="w-full xl:w-80 flex flex-col gap-4 shrink-0">
            {/* Helper Note */}
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-6xl opacity-10">⚠️</div>
              <h4 className="font-bold text-orange-400 text-sm md:text-base uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📋</span> Règles de composition
              </h4>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-3">
                Pour valider une équipe Futsal, vous devez obligatoirement aligner <strong>5 joueurs</strong> dont :
              </p>
              <ul className="text-slate-300 text-xs md:text-sm leading-relaxed list-disc list-inside space-y-1 mb-3">
                <li>Au moins <strong>1 Gardien (GK)</strong></li>
                <li>Au moins <strong>1 Défenseur</strong> (CB, LB, RB, LWB, RWB)</li>
              </ul>
              <p className="text-slate-400 text-xs italic">
                Les statistiques de vos cartes (Vitesse, Dribble, Passe) seront cruciales pour la simulation.
              </p>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 shadow-lg text-center">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Puissance de l'équipe</div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {(() => {
                    const players = editingTeam.players.filter(p => p !== null);
                    if (players.length === 0) return '0';
                    const avg = players.reduce((sum, p) => sum + (p.ovr || 0), 0) / players.length;
                    return Math.round(avg);
                  })()}
                </div>
                <div className="text-slate-500 text-xs mt-1">{editingTeam.players.filter(p => p !== null).length} / 5 Joueurs</div>
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
                {collection.length === 0 ? (
                  <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800">
                    <p className="text-slate-400">Votre Hall of Fame est vide. Terminez des carrières pour débloquer des cartes.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {collection.map(card => {
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in flex flex-col h-full overflow-y-auto pb-32">
      <div className="flex items-center gap-4 mb-6 md:mb-10">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="p-2 md:p-3 rounded-xl bg-white/10 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-slate-700 transition-colors"
        >
          ← Retour
        </button>
        <h2 className="heading-typography text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 uppercase tracking-tight">
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
      <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-4 shadow-xl flex items-center justify-center overflow-hidden bg-slate-800 ${player ? 'border-orange-400' : 'border-white/30 border-dashed'}`}>
        {player ? (
           <span className="font-bold text-white text-sm md:text-xl">{player.name.substring(0,2).toUpperCase()}</span>
        ) : (
           <span className="text-white/50 text-2xl">+</span>
        )}
      </div>
      <div className="mt-1 bg-black/60 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm">
        {player ? player.position : role}
      </div>
      {player && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-300 to-yellow-600 text-black font-black text-xs px-1.5 py-0.5 rounded-md shadow-md border border-yellow-200">
          {player.ovr}
        </div>
      )}
    </div>
  );
};

