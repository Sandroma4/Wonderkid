import React, { useState, useEffect } from 'react';

const STAGES = [
  { id: 'SEIZIEMES', name: 'Seizièmes de finale', difficulty: 1.0 },
  { id: 'HUITIEMES', name: 'Huitièmes de finale', difficulty: 1.2 },
  { id: 'QUARTS', name: 'Quarts de finale', difficulty: 1.5 },
  { id: 'DEMIES', name: 'Demi-finale', difficulty: 1.8 },
  { id: 'FINALE', name: 'Finale', difficulty: 2.2 }
];

const TOURNAMENT_EVENTS = [
  {
    title: "Séance de tirs au but",
    desc: "Le match s'éternise. C'est l'heure des tirs au but. Le coach vous regarde droit dans les yeux.",
    options: [
      { text: "Prendre le 5ème penalty décisif", type: 'MENTAL', baseSuccess: 0.6 },
      { text: "Tirer en premier pour montrer la voie", type: 'LEADER', baseSuccess: 0.65 },
      { text: "Tenter une panenka risquée", type: 'TECHNIQUE', baseSuccess: 0.4 },
      { text: "Laisser un coéquipier plus confiant tirer", type: 'NEUTRE', baseSuccess: 0.5 }
    ]
  },
  {
    title: "Le discours de la mi-temps",
    desc: "L'équipe est menée 1-0 à la mi-temps. Le vestiaire est silencieux et abattu.",
    options: [
      { text: "Pousser une gueulante pour réveiller tout le monde", type: 'LEADER', baseSuccess: 0.7 },
      { text: "Se concentrer sur sa propre tactique avec le coach", type: 'TACTIQUE', baseSuccess: 0.6 },
      { text: "Rassurer les jeunes joueurs stressés", type: 'MENTAL', baseSuccess: 0.65 },
      { text: "Ne rien dire et se préparer physiquement", type: 'PHYSIQUE', baseSuccess: 0.55 }
    ]
  },
  {
    title: "Coup franc décisif",
    desc: "90ème minute, coup franc à 25 mètres. C'est l'occasion en or pour faire basculer le match.",
    options: [
      { text: "Tirer en force côté ouvert", type: 'PHYSIQUE', baseSuccess: 0.6 },
      { text: "Enrouler parfaitement au-dessus du mur", type: 'TECHNIQUE', baseSuccess: 0.65 },
      { text: "La jouer tactique avec une combinaison inattendue", type: 'TACTIQUE', baseSuccess: 0.7 },
      { text: "Centrer dans la boîte pour un grand défenseur", type: 'NEUTRE', baseSuccess: 0.75 }
    ]
  },
  {
    title: "Provocation adverse",
    desc: "Le défenseur adverse n'arrête pas de vous provoquer et de vous mettre des coups discrets depuis le début du match.",
    options: [
      { text: "Garder son sang-froid et jouer au foot", type: 'MENTAL', baseSuccess: 0.75 },
      { text: "Répondre par l'impact physique régulier", type: 'PHYSIQUE', baseSuccess: 0.6 },
      { text: "Provoquer une faute pour lui faire prendre un carton", type: 'MALIN', baseSuccess: 0.55 },
      { text: "Demander au capitaine d'intervenir", type: 'LEADER', baseSuccess: 0.65 }
    ]
  },
  {
    title: "Blessure légère",
    desc: "Vous ressentez une petite pointe musculaire. Il reste 20 minutes de jeu dans ce match couperet.",
    options: [
      { text: "Serrer les dents et continuer à fond", type: 'PHYSIQUE', baseSuccess: 0.5 },
      { text: "Gérer ses efforts et jouer plus intelligemment", type: 'TACTIQUE', baseSuccess: 0.7 },
      { text: "Demander le changement pour ne pas pénaliser l'équipe", type: 'NEUTRE', baseSuccess: 0.8 },
      { text: "Prendre des risques pour marquer avant de sortir", type: 'MENTAL', baseSuccess: 0.45 }
    ]
  }
];

const getNationalColors = (originCode) => {
  const colors = {
    fr: { primary: '#002395', secondary: '#ED2939' },
    br: { primary: '#009739', secondary: '#FEDD00' },
    ar: { primary: '#74ACDF', secondary: '#FFFFFF' },
    de: { primary: '#000000', secondary: '#FFCE00' },
    es: { primary: '#AA151B', secondary: '#F1BF00' },
    it: { primary: '#0066B2', secondary: '#FFFFFF' },
    pt: { primary: '#046A38', secondary: '#DA291C' },
    en: { primary: '#FFFFFF', secondary: '#CE1124' },
    nl: { primary: '#FF4F00', secondary: '#21468B' },
    be: { primary: '#E30A17', secondary: '#000000' },
    dz: { primary: '#006233', secondary: '#FFFFFF' },
    ma: { primary: '#C1272D', secondary: '#006233' },
    sn: { primary: '#00853F', secondary: '#FDEF42' },
  };
  return colors[originCode] || { primary: '#1a2a6c', secondary: '#b21f1f' };
};

export const InternationalTournamentModal = ({ player, season, type, onComplete }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [tournamentStats, setTournamentStats] = useState({ goals: 0, assists: 0 });
  const [event, setEvent] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [eliminated, setEliminated] = useState(false);
  const [won, setWon] = useState(false);

  let isWorldCup = type === 'WORLD_CUP';
  const displayYear = player?.currentYear || season;
  
  if (displayYear % 4 === 2) {
    isWorldCup = true;
  }
  
  const tournamentName = isWorldCup ? 'Coupe du Monde' : 'Euro';
  const emoji = isWorldCup ? '🌍' : '🇪🇺';
  
  const nationalColors = getNationalColors(player?.origin);
  const bgStyle = {
    background: `radial-gradient(circle at center, ${nationalColors.primary} 0%, #0f172a 100%)`,
    boxShadow: `inset 0 0 100px rgba(0,0,0,0.8), 0 0 20px ${nationalColors.secondary}40`
  };

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
        setResultText(`🏆 Masterclass ! Vous remportez la ${tournamentName} !`);
        setWon(true);
      } else {
        setResultText(`✅ Succès ! L'équipe nationale se qualifie pour le tour suivant !`);
      }
    } else {
      setResultText(`❌ Échec. L'équipe nationale est éliminée de la ${tournamentName}...`);
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
    else if (stageIndex === 1) finalStage = 'Huitièmes';
    else finalStage = 'Seizièmes';

    onComplete(player, {
      stage: finalStage,
      goals: tournamentStats.goals,
      assists: tournamentStats.assists,
      performance: { goals: tournamentStats.goals, assists: tournamentStats.assists }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"></div>
      
      <div 
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up"
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative p-6 text-center border-b border-white/10">
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg flex items-center justify-center gap-3 tracking-wide">
            <span>{emoji}</span> {tournamentName} {displayYear}
          </h2>
          <div className="inline-block bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-inner">
            <span className="font-bold tracking-widest uppercase text-sm" style={{ color: nationalColors.secondary || '#fff' }}>
              {STAGES[stageIndex].name}
            </span>
          </div>
        </div>

        <div className="relative p-6 md:p-8">
          <div>
            {event && (
              <div className="animate-fade-in-up">
                <div className="mb-8 text-center bg-black/30 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">
                    {event.title}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {event.desc}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  {event.options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleChoice(opt)}
                      className="group relative flex flex-col md:flex-row items-start md:items-center w-full p-4 bg-black/40 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 text-left overflow-hidden shadow-md backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 shrink-0 flex items-center justify-center min-w-[100px] px-3 py-1.5 bg-black/60 text-slate-300 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg mb-2 md:mb-0 md:mr-4 border border-white/5">
                        {opt.type}
                      </span>
                      <span className="relative z-10 text-white font-semibold text-sm md:text-base drop-shadow-sm">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {resultText && (
              <div className="text-center py-4 animate-fade-in-up">
                <h3 className={`text-2xl md:text-3xl font-black mb-6 drop-shadow-md ${eliminated ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {resultText}
                </h3>
                
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 mb-8 inline-block min-w-[250px] shadow-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Statistiques du Tournoi</p>
                  <div className="flex justify-center gap-10">
                    <div className="text-center">
                      <span className="block text-4xl font-black text-white drop-shadow-sm">{tournamentStats.goals}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Buts</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-4xl font-black text-white drop-shadow-sm">{tournamentStats.assists}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Passes</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={nextStage}
                  className={`w-full p-4 rounded-xl font-black text-lg text-white shadow-xl transition-all duration-300 hover:-translate-y-1 ${eliminated || won ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/50' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'}`}
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
