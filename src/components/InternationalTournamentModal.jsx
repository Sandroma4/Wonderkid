import React, { useState, useEffect } from 'react';

const STAGES = [
  { id: 'SEIZIEMES', name: 'Seizimes de finale', difficulty: 1.0 },
  { id: 'HUITIEMES', name: 'Huitimes de finale', difficulty: 1.2 },
  { id: 'QUARTS', name: 'Quarts de finale', difficulty: 1.5 },
  { id: 'DEMIES', name: 'Demi-finale', difficulty: 1.8 },
  { id: 'FINALE', name: 'Finale', difficulty: 2.2 }
];

const TOURNAMENT_EVENTS = [
  {
    title: "Sance de tirs au but",
    desc: "Le match s'ternise. C'est l'heure des tirs au but. Le coach vous demande de tirer le penalty dcisif.",
    options: [
      { text: "Prendre ses responsabilits", type: 'MENTAL', baseSuccess: 0.6 },
      { text: "Laisser un coquipier tirer", type: 'NEUTRE', baseSuccess: 0.5 }
    ]
  },
  {
    title: "Le discours de la mi-temps",
    desc: "L'quipe est mene 1-0  la mi-temps. Le vestiaire est silencieux et abattu.",
    options: [
      { text: "Pousser une gueulante pour rveiller tout le monde", type: 'LEADER', baseSuccess: 0.7 },
      { text: "Se concentrer sur sa propre tactique", type: 'TACTIQUE', baseSuccess: 0.6 }
    ]
  },
  {
    title: "Coup franc dcisif",
    desc: "90me minute, coup franc  25 mtres. C'est l'occasion en or pour faire basculer le match.",
    options: [
      { text: "Tirer en force", type: 'PHYSIQUE', baseSuccess: 0.6 },
      { text: "La jouer tactique avec une combinaison", type: 'TECHNIQUE', baseSuccess: 0.7 }
    ]
  },
  {
    title: "Provocation adverse",
    desc: "Le dfenseur adverse n'arrte pas de vous provoquer et de vous mettre des coups discrets.",
    options: [
      { text: "Garder son sang-froid et jouer au foot", type: 'MENTAL', baseSuccess: 0.75 },
      { text: "Rpondre par l'impact physique", type: 'PHYSIQUE', baseSuccess: 0.55 }
    ]
  }
];

export const InternationalTournamentModal = ({ player, season, type, onComplete }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [tournamentStats, setTournamentStats] = useState({ goals: 0, assists: 0 });
  const [event, setEvent] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [eliminated, setEliminated] = useState(false);
  const [won, setWon] = useState(false);

  let isWorldCup = type === 'WORLD_CUP';
  const displayYear = player?.currentYear || season;
  
  // Hotfix pour les sauvegardes en cours qui auraient bloqué sur EURO au lieu de CDM
  if (displayYear % 4 === 2) {
    isWorldCup = true;
  }
  
  const tournamentName = isWorldCup ? 'Coupe du Monde' : 'Euro';

  useEffect(() => {
    generateEventForStage();
  }, [stageIndex]);

  const generateEventForStage = () => {
    const randomEvent = TOURNAMENT_EVENTS[Math.floor(Math.random() * TOURNAMENT_EVENTS.length)];
    setEvent(randomEvent);
    setResultText(null);
  };

  const handleChoice = (option) => {
    const playerOvr = player?.ovr || 70;
    const stageDiff = STAGES[stageIndex].difficulty;
    
    const ovrBonus = Math.max(0, (playerOvr - 75) * 0.005);
    const successChance = (option.baseSuccess + ovrBonus) / Math.max(1, (stageDiff * 0.6));
    const isSuccess = Math.random() < successChance;

    if (isSuccess) {
      const isAttacker = player?.position?.includes('ATT') || player?.position?.includes('ST') || player?.position?.includes('MOC');
      const isMid = player?.position?.includes('MID') || player?.position?.includes('MC');
      
      const newGoals = isAttacker ? Math.floor(Math.random() * 2) + 1 : (Math.random() > 0.8 ? 1 : 0);
      const newAssists = isMid ? Math.floor(Math.random() * 2) + 1 : (Math.random() > 0.7 ? 1 : 0);
      
      setTournamentStats(prev => ({
        goals: prev.goals + newGoals,
        assists: prev.assists + newAssists
      }));

      if (stageIndex === STAGES.length - 1) {
        setResultText(`Y" Masterclass ! Vous remportez la ${tournamentName} !`);
        setWon(true);
      } else {
        setResultText(`o. Succs ! L'quipe nationale se qualifie pour le tour suivant !`);
      }
    } else {
      setResultText(`?O %chec. L'quipe nationale est limine de la ${tournamentName}...`);
      setEliminated(true);
    }
    
    setEvent(null);
  };

  const nextStage = () => {
    if (eliminated) {
      finishTournament();
    } else if (won) {
      finishTournament();
    } else {
      setStageIndex(prev => prev + 1);
    }
  };

  const finishTournament = () => {
    let finalStage = '';
    if (won) finalStage = 'Vainqueur';
    else if (stageIndex === 4) finalStage = 'Finaliste';
    else if (stageIndex === 3) finalStage = 'Demi-Finale';
    else if (stageIndex === 2) finalStage = 'Quarts';
    else if (stageIndex === 1) finalStage = 'Huitimes';
    else finalStage = 'Seizimes';

    onComplete(player, {
      stage: finalStage,
      goals: tournamentStats.goals,
      assists: tournamentStats.assists,
      performance: { goals: tournamentStats.goals, assists: tournamentStats.assists }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform transition-all"
      >
        {/* Header Area */}
        <div className={`relative p-6 text-center ${isWorldCup ? 'bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]' : 'bg-gradient-to-br from-blue-700 to-blue-900'}`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md flex items-center justify-center gap-3 tracking-wide">
              {isWorldCup ? 'YO?' : 'YOY'} {tournamentName} {displayYear}
            </h2>
            <div className="inline-block bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-inner">
              <span className="text-white font-bold tracking-widest uppercase text-sm">
                {STAGES[stageIndex].name}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8">
          <div>
            {event && (
              <div className="animate-fade-in-up">
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    {event.desc}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  {event.options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleChoice(opt)}
                      className="group relative flex items-center w-full p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl transition-all duration-300 text-left overflow-hidden shadow-sm hover:shadow-md"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 shrink-0 flex items-center justify-center w-24 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-wider rounded-lg mr-4">
                        {opt.type}
                      </span>
                      <span className="relative z-10 text-slate-700 dark:text-slate-200 font-semibold text-sm md:text-base">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {resultText && (
              <div className="text-center py-4 animate-fade-in-up">
                <h3 className={`text-2xl md:text-3xl font-black mb-6 ${eliminated ? 'text-red-500' : 'text-emerald-500'}`}>
                  {resultText}
                </h3>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8 inline-block min-w-[250px] shadow-sm">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Statistiques Personnelles</p>
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <span className="block text-3xl font-black text-slate-800 dark:text-white">{tournamentStats.goals}</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Buts</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-black text-slate-800 dark:text-white">{tournamentStats.assists}</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Passes</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={nextStage}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${eliminated || won ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'}`}
                >
                  {eliminated || won ? 'Terminer le tournoi' : 'Passer au tour suivant'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
