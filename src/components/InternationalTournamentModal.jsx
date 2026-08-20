import React, { useState, useEffect } from 'react';

// Stages of the tournament
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
    desc: "Le match s'éternise. C'est l'heure des tirs au but. Le coach vous demande de tirer le penalty décisif.",
    options: [
      { text: "Prendre ses responsabilités", type: 'MENTAL', baseSuccess: 0.6 },
      { text: "Laisser un coéquipier tirer", type: 'NEUTRE', baseSuccess: 0.5 }
    ]
  },
  {
    title: "Le discours de la mi-temps",
    desc: "L'équipe est menée 1-0 à la mi-temps. Le vestiaire est silencieux et abattu.",
    options: [
      { text: "Pousser une gueulante pour réveiller tout le monde", type: 'LEADER', baseSuccess: 0.7 },
      { text: "Se concentrer sur sa propre tactique", type: 'TACTIQUE', baseSuccess: 0.6 }
    ]
  },
  {
    title: "Coup franc décisif",
    desc: "90ème minute, coup franc à 25 mètres. C'est l'occasion en or pour faire basculer le match.",
    options: [
      { text: "Tirer en force", type: 'PHYSIQUE', baseSuccess: 0.6 },
      { text: "La jouer tactique avec une combinaison", type: 'TECHNIQUE', baseSuccess: 0.7 }
    ]
  },
  {
    title: "Provocation adverse",
    desc: "Le défenseur adverse n'arrête pas de vous provoquer et de vous mettre des coups discrets.",
    options: [
      { text: "Garder son sang-froid et jouer au foot", type: 'MENTAL', baseSuccess: 0.75 },
      { text: "Répondre par l'impact physique", type: 'PHYSIQUE', baseSuccess: 0.55 }
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

  const isWorldCup = type === 'WORLD_CUP';
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
    const playerOvr = player.ovr || 70;
    const stageDiff = STAGES[stageIndex].difficulty;
    
    const ovrBonus = Math.max(0, (playerOvr - 75) * 0.005);
    const successChance = (option.baseSuccess + ovrBonus) / Math.max(1, (stageDiff * 0.6));
    const isSuccess = Math.random() < successChance;

    if (isSuccess) {
      const newGoals = (player.position.includes('ATT') || player.position.includes('ST')) ? Math.floor(Math.random() * 2) + 1 : 0;
      const newAssists = player.position.includes('MID') ? Math.floor(Math.random() * 2) + 1 : 0;
      
      setTournamentStats(prev => ({
        goals: prev.goals + newGoals,
        assists: prev.assists + newAssists
      }));

      if (stageIndex === STAGES.length - 1) {
        setResultText(`🔥 Masterclass ! Vous remportez la ${tournamentName} !`);
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

    onComplete({
      stage: finalStage,
      goals: tournamentStats.goals,
      assists: tournamentStats.assists,
      rating: won ? 8.5 : 7.0
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content interactive-match-modal tournament-modal" style={{ maxWidth: '600px', background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' }}>
        
        <div className="tournament-header" style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2em', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            🌍 {tournamentName} {season}
          </h2>
          <div className="tournament-stage" style={{ fontSize: '1.2em', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px' }}>
            {STAGES[stageIndex].name}
          </div>
        </div>

        <div className="tournament-body" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderRadius: '12px', color: '#333' }}>
          {event && (
            <div className="tournament-event">
              <h3 style={{ marginTop: 0, color: '#1a2a6c' }}>{event.title}</h3>
              <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>{event.desc}</p>
              
              <div className="options-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {event.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleChoice(opt)}
                    className="action-btn"
                    style={{ padding: '15px', background: '#f0f2f5', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
                  >
                    <span style={{ display: 'inline-block', width: '80px', color: '#b21f1f', fontSize: '0.9em' }}>[{opt.type}]</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {resultText && (
            <div className="tournament-result" style={{ textAlign: 'center', padding: '20px' }}>
              <h3 style={{ color: eliminated ? '#e74c3c' : '#2ecc71', fontSize: '1.5em' }}>{resultText}</h3>
              <div style={{ margin: '20px 0', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <strong>Statistiques actuelles :</strong><br />
                Buts: {tournamentStats.goals} | Passes: {tournamentStats.assists}
              </div>
              <button 
                onClick={nextStage}
                className="action-btn primary"
                style={{ width: '100%', padding: '15px', fontSize: '1.1em', background: '#1a2a6c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                {eliminated || won ? 'Terminer le tournoi' : 'Passer au tour suivant'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
