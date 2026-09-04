const isLightColor = (hex) => {
  if (!hex) return false;
  const clean = hex.toLowerCase().trim();
  return ['#ffffff', '#fff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#f3f4f6'].includes(clean);
};

const getTheme = (primary = '#2563EB', secondary = '#60A5FA') => {
  const pLight = isLightColor(primary);
  const sLight = isLightColor(secondary);

  const safePrimary = pLight ? '#1e293b' : primary;
  const safeSecondary = sLight ? '#475569' : secondary;

  return {
    primary: primary || '#2563EB',
    secondary: safeSecondary,
    accent: safePrimary,
    btnBg: pLight ? '#0f172a' : primary,
    btnText: '#ffffff',
  };
};

import { useState, useMemo, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { PlayerCard } from './PlayerCard';
import { LifestyleShopModal } from './LifestyleShopModal';
import { TransferModal } from './TransferModal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { playSound } from '../utils/audio';
import { getEffectiveStats, PERKS_LIST, getBestPlayerVersion } from '../utils/gameData';
import { AWARD_RANKS } from '../utils/awards';
import { getTraitDetails } from '../utils/traitsData';

import { COUNTRIES } from '../utils/gameData';
import { FlagIcon } from './FlagIcon';

const AnimatedStatBar = ({ label, oldVal, newVal, gain }) => {
  const [currentVal, setCurrentVal] = useState(oldVal);
  const [displayVal, setDisplayVal] = useState(oldVal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVal(newVal);
      
      if (gain > 0) {
        let currentNumber = oldVal;
        const stepTime = 1000 / gain;
        const counter = setInterval(() => {
          currentNumber += 1;
          setDisplayVal(currentNumber);
          if (currentNumber >= newVal) clearInterval(counter);
        }, stepTime);
      } else {
        setDisplayVal(newVal);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [oldVal, newVal, gain]);

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[160px] bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-300/80 dark:border-slate-700/50 shadow-inner">
      <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-wider">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className={gain > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
          {gain > 0 ? `+${gain}` : gain} <span className="text-slate-800 dark:text-white text-[11px] ml-1">{displayVal}</span>
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
         <div 
           className={`absolute top-0 left-0 h-full ${gain > 0 ? 'bg-emerald-500' : 'bg-rose-500'} transition-all ease-out`} 
           style={{ width: `${Math.min(99, Math.max(0, currentVal))}%`, transitionDuration: '1000ms' }} 
         />
      </div>
    </div>
  );
};

const LeagueLabel = ({ club }) => {
  if (!club) return null;
  const countryObj = COUNTRIES.find(c => c.id === club.origin);
  const countryName = countryObj ? countryObj.name : club.origin;
  return (
    <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase text-slate-500 dark:text-slate-500 tracking-wider mt-0.5">
      <span>{club.leagueName} {club.tier ? `(D${club.tier})` : ''}</span>
      <FlagIcon code={club.origin} className="w-3 h-2 rounded-[1px] shadow-sm" />
    </span>
  );
};


const formatEventCategory = (cat) => {
  if (!cat) return 'Événement';
  const labels = {
    'WORLD_CUP': 'Coupe du Monde',
    'EURO': '🇪🇺 Euro',
    'CHAMPIONS_LEAGUE': '🇪🇺 Ligue des Champions',
    'CUP': 'Coupe Nationale',
    'LIFESTYLE': 'Vie Privée',
    'TRANSFERT': 'Transfert',
    'VESTIAIRE': 'Vestiaire',
    'CARRIÈRE': 'Carrière',
    'ENTRAÎNEMENT': 'Entraînement',
    'MÉDIAS': 'Médias',
    'SPONSOR': 'Sponsor',
    'FANS': 'Fans',
    'TERRAIN': 'Terrain',
    'RIVALITÉ': 'Rivalité',
    'ÉQUIPE NATIONALE': 'Équipe Nationale'
  };
  return labels[cat] || cat;
};

export function Dashboard({
  gameState,
  multiplayerContext,
  activeOutcome,
  onChooseClub,
  onSelectOption,
  onContinueFromOutcome,
  onPlayInteractiveMatch,
  onContinueFromInteractiveMatch,
  onCloseInteractiveMatch,
  onNextSeason,
  onAcceptTransferOffer,
  onRejectTransferOffer,
  onStayCurrentClub,
  onBuyLifestyleItem,
  onRetire,
  onRestartGame
}) {
  const [cardStyle, setCardStyle] = useState('auto');
  const [activeMobileTab, setActiveMobileTab] = useState('terrain');
  const [isMobileStatsOpen, setIsMobileStatsOpen] = useState(false);
  const [isTrophiesOpen, setIsTrophiesOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [selectedOfferClub, setSelectedOfferClub] = useState(null);
  const playerCardRef = useRef(null);
  const exportCardRef = useRef(null);
  const exportPrimeCardRef = useRef(null);
  
  const { 
    player, club, season, eventsList, eventStep, totalEvents, currentEvent,
    isInteractiveMatch, interactiveMatchPhases, interactiveMatchCurrentPhaseIndex, 
    interactiveMatchScore, interactiveMatchResult, interactiveMatchFinalOutcome, isRetired, 
    seasonStats, lastSeasonStats, 
    transferMarketOffers, clubOffers, bankBalance, palmares, isWaitingForMercato, isWaitingForMultiplayerSync,
    rival: baseRival, rivalConfrontations, isSelectingPerk
  } = gameState || {};

  const opponent = multiplayerContext?.players?.find(p => p.playerId !== multiplayerContext.playerId);

  let rival = baseRival;
  if (opponent && rival?.isOnlineOpponent) {
    rival = {
      ...rival,
      name: opponent.name || rival.name,
      ovr: opponent.ovr || rival.ovr,
      attributes: opponent.attributes || rival.attributes,
      club: opponent.club || rival.club,
      ballonDorCount: opponent.ballonDorCount || rival.ballonDorCount || 0,
      trophiesCount: opponent.trophiesCount || rival.trophiesCount || 0,
    };
  }


  const effectiveStats = getEffectiveStats(player);

  const statLabels = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique', diving: 'Plongeon', handling: 'Maniabilité', kicking: 'Jeu au pied', reflexes: 'Réflexes', positioning: 'Positionnement' };


  const groupedPalmares = useMemo(() => {
    if (!palmares) return [];
    const groups = palmares.reduce((acc, trophy) => {
      if (!acc[trophy.text]) acc[trophy.text] = { ...trophy, count: 1 };
      else acc[trophy.text].count++;
      return acc;
    }, {});
    return Object.values(groups).sort((a, b) => {
      const rankA = AWARD_RANKS[a.text] || 10;
      const rankB = AWARD_RANKS[b.text] || 10;
      if (rankB !== rankA) return rankB - rankA;
      return b.count - a.count;
    });
  }, [palmares]);

  const collectiveTrophies = groupedPalmares.filter(t => t.type === 'collective' || ['📈', '🏆', '🌎', '🇪🇺'].includes(t.icon));
  const individualTrophies = groupedPalmares.filter(t => t.type === 'individual' || (!t.type && !['📈', '🏆', '🌎', '🇪🇺'].includes(t.icon)));

  
  // Social feed removed
  const isGoalkeeper = (player.position || '').toUpperCase().includes('GK');
  const isDefender = (player.position || '').toUpperCase().includes('DEF');
  const isDefensivePlayer = isGoalkeeper || isDefender;

  const theme = getTheme(club?.primary, club?.secondary);

  const clubBackgroundStyle = club ? {
    background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary || club.primary} 100%)`
  } : {
    backgroundColor: '#0F172A'
  };

  const renderGauges = (isMobileView) => (
    <div className={`space-y-1.5 ${isMobileView ? 'md:hidden bg-white/90 border border-slate-200/50 p-2 rounded-xl mb-2 shadow-sm' : 'hidden md:block'}`}>
      <div>
        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-600">
          <span>Forme physique</span>
          <span className={player.form < 30 ? 'text-rose-600 font-bold' : 'text-slate-900 font-semibold'}>{player.form}%</span>
        </div>
        <div className="w-full bg-slate-200 h-1 md:h-1.5 rounded-full overflow-hidden border border-slate-200/50">
          <div className={`${player.form < 30 ? 'bg-rose-500' : 'bg-amber-500'} h-full rounded-full transition-all shadow-sm`} style={{ width: `${player.form}%` }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-600">
          <span>Moral</span>
          <span className="text-slate-900 font-semibold">{player.morale}%</span>
        </div>
        <div className="w-full bg-slate-200 h-1 md:h-1.5 rounded-full overflow-hidden border border-slate-200/50">
          <div className="bg-cyan-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.morale}%` }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-600">
          <span>Confiance Coach</span>
          <span className="text-slate-900 font-semibold">{player.coachTrust}%</span>
        </div>
        <div className="w-full bg-slate-200 h-1 md:h-1.5 rounded-full overflow-hidden border border-slate-200/50">
          <div className="bg-purple-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.coachTrust}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`.app-typography { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; } .heading-typography { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }`}</style>

      


      {/* CHOIX DU PREMIER CLUB */}
      {/* ÉCRAN DE FIN DE CARRIÈRE */}
      {isRetired ? (
        <div className="app-typography min-h-[100dvh] bg-emerald-200 dark:bg-[#0F172A] p-4 md:p-8 text-slate-800 dark:text-slate-100 relative overflow-y-auto flex flex-col items-center justify-center font-sans">
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {(() => {
            const bestVersion = getBestPlayerVersion(player, club);
            return (
              <div className="max-w-5xl w-full bg-white/95 dark:bg-slate-900/95 border border-slate-300/80 dark:border-slate-700/80 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-2xl z-10 flex flex-col my-auto max-h-[95dvh] lg:max-h-[90dvh]">
                
                {/* Header (Fixed at top) */}
                <div className="mb-3 shrink-0 text-center">
                  <span className="heading-typography text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 rounded-full inline-block mb-1">
                    Bilan Définitif de Carrière
                  </span>
                  <h1 className="heading-typography text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-wider leading-none">
                    FIN DE CARRIÈRE
                  </h1>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 md:pr-3 scrollbar-thin scrollbar-thumb-amber-500/50">
                  <div className="flex flex-col lg:flex-row w-full gap-4 md:gap-6">
                    
                    {/* LEFT COLUMN: CARD & DOWNLOAD */}
                    <div className="flex flex-col items-center justify-center shrink-0 lg:w-1/3">
                      <div className="text-[11px] font-bold text-amber-400/90 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <span>👑</span> Version Prime ({bestVersion.player.ovr} GEN)
                      </div>
                      <div className="inline-block p-2 scale-90 md:scale-100 transform origin-top">
                        <div ref={playerCardRef} className="inline-block" style={{ backgroundColor: 'transparent' }}>
                          <PlayerCard player={bestVersion.player} club={bestVersion.club} cardType={cardStyle} />
                        </div>
                      </div>
                      
                      <button
                        onClick={async () => {
                          if (!exportPrimeCardRef.current) return;
                          try {
                            const canvas = await html2canvas(exportPrimeCardRef.current, { 
                              backgroundColor: null, 
                              scale: 2,
                              useCORS: true,
                              logging: false
                            });
                            const link = document.createElement('a');
                            link.download = `carte-prime-${player.name.replace(/\s/g, '_')}.png`;
                            link.href = canvas.toDataURL('image/png');
                            link.click();
                          } catch (e) { console.error('Export failed', e); }
                        }}
                        className="heading-typography text-[10px] md:text-xs font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 py-2 px-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 mt-[-15px] md:mt-0 mb-1"
                      >
                        📥 Télécharger
                      </button>
                    </div>

                    {/* RIGHT COLUMN: STATS, PALMARES & DETAILS */}
                    <div className="flex flex-col flex-1 gap-3 md:gap-4 justify-center">
                      
                      {/* Top Row: Stats + Score */}
                      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl md:rounded-2xl text-center shadow-inner">
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Âge final</p>
                            <p className="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-0.5 leading-none">{player.age} ans</p>
                          </div>
                          <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl md:rounded-2xl text-center shadow-inner">
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Gains Totaux</p>
                            <p className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 leading-none">{(bankBalance / 1000000).toFixed(1)} M€</p>
                          </div>
                          <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl md:rounded-2xl text-center shadow-inner">
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Sélections</p>
                            <p className="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-0.5 leading-none">{player.nationalCaps || 0}</p>
                          </div>
                          <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl md:rounded-2xl text-center shadow-inner">
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">OVR Prime</p>
                            <p className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5 leading-none">{bestVersion.player.ovr || player.careerMaxOvr || player.ovr}</p>
                          </div>
                        </div>

                        {/* Score Box */}
                        <div className="w-full md:w-1/3 bg-slate-800/70 p-3 rounded-2xl border border-amber-500/30 shadow-inner text-center flex flex-col justify-center min-h-[80px] relative">
                          <h3 className="heading-typography font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 text-[10px] md:text-xs flex items-center justify-center gap-1.5">
                            <span>👑</span> Score Carrière
                          </h3>
                          <div className="text-2xl md:text-3xl font-black text-amber-500 drop-shadow-md leading-none mb-1">
                            {gameState.score?.totalScore ? gameState.score.totalScore.toLocaleString('fr-FR') : "0"}
                          </div>
                          <p className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest leading-none">Pts Légendaires</p>
                          {gameState.earnedCoinsThisRun > 0 && (
                            <div className="mt-2 text-[10px] md:text-xs font-bold text-yellow-300 bg-black/20 rounded-lg py-1 px-2 inline-block">
                              +{gameState.earnedCoinsThisRun} Golden Coins 🪙
                            </div>
                          )}
                          {gameState.score?.isNemesisSlayer && (
                             <div className="absolute -top-3 -right-3 bg-rose-600 border-2 border-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase px-2 py-1 rounded-lg transform rotate-6 shadow-lg">
                               Némésis Slayer ⚔️
                             </div>
                          )}
                        </div>
                      </div>

                      {/* Palmares Box */}
                      <div className="w-full bg-slate-800/70 p-3 rounded-2xl border border-amber-500/30 shadow-inner">
                        <h3 className="heading-typography font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 text-[10px] md:text-xs flex items-center justify-center gap-1.5">
                          <span>🏆</span> Palmarès & Distinctions
                        </h3>
                        {groupedPalmares.length > 0 ? (
                          <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center">
                            {groupedPalmares.slice(0, 10).map((trophy, idx) => (
                              <span key={idx} className="bg-white/90 dark:bg-slate-900/90 border border-amber-500/30 text-amber-600 dark:text-amber-300 px-1.5 py-1 rounded-lg text-[9px] md:text-[10px] font-semibold shadow-sm flex items-center gap-1">
                                <span>{trophy.icon}</span> {trophy.text} {trophy.count > 1 && <span className="text-amber-600 dark:text-amber-400 font-bold ml-1">×{trophy.count}</span>}
                              </span>
                            ))}
                            {groupedPalmares.length > 10 && <span className="text-[9px] text-amber-400/80 font-bold self-center">et bien d'autres...</span>}
                          </div>
                        ) : (
                          <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 italic text-center">Aucun trophée majeur remporté.</p>
                        )}
                      </div>

                      {/* History & Multiplayer Container */}
                      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
                        {player.careerHistory && player.careerHistory.length > 0 && (
                          <details className="flex-1 bg-slate-800/70 rounded-2xl border border-slate-700/60 group overflow-hidden">
                            <summary className="p-3 heading-typography font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[10px] md:text-xs cursor-pointer list-none flex justify-between items-center hover:text-white transition-colors">
                              <span className="flex items-center gap-2"><span>📜</span> Historique Saison par Saison</span>
                              <span className="transition-transform group-open:rotate-180 text-amber-600 dark:text-amber-400">▼</span>
                            </summary>
                            <div className="overflow-x-auto px-2 pb-2 pt-0 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
                              <table className="w-full text-[9px] md:text-[10px] text-left">
                                <thead className="text-[8px] text-slate-500 dark:text-slate-400 uppercase bg-white/80 dark:bg-slate-900/80 rounded-lg sticky top-0 z-10">
                                  <tr>
                                    <th className="px-2 py-1.5">Saison</th>
                                    <th className="px-2 py-1.5">Club</th>
                                    <th className="px-2 py-1.5">GEN</th>
                                    <th className="px-2 py-1.5">{isDefensivePlayer ? 'Duels %' : 'Buts'}</th>
                                    <th className="px-2 py-1.5">{isDefensivePlayer ? 'Clean Sheets' : 'Passes'}</th>
                                    <th className="px-2 py-1.5">Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {player.careerHistory.map((season, i) => (
                                    <tr key={i} className="border-b border-slate-700/40 last:border-0 hover:bg-slate-700/30 transition-colors">
                                      <td className="px-2 py-1.5 font-medium text-slate-700 dark:text-slate-200">{season.year}</td>
                                      <td className="px-2 py-1.5">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-semibold text-slate-800 dark:text-white truncate max-w-[70px] md:max-w-[100px]">{season.club}</span>
                                          {season.origin && <FlagIcon code={season.origin} className="w-3 h-2 rounded-sm shadow-sm" />}
                                        </div>
                                      </td>
                                      <td className="px-2 py-1.5 font-black text-amber-600 dark:text-amber-400">{season.ovr}</td>
                                      <td className="px-2 py-1.5 font-bold text-slate-700 dark:text-slate-200">
                                        {isDefensivePlayer ? `${Math.min(99, Math.floor(65 + season.rating * 3.5))}%` : season.goals}
                                      </td>
                                      <td className="px-2 py-1.5 font-bold text-slate-700 dark:text-slate-200">
                                        {isDefensivePlayer ? season.cleanSheets : season.assists}
                                      </td>
                                      <td className="px-2 py-1.5 font-bold text-slate-700 dark:text-slate-200">{season.rating}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        )}

                        {/* Multiplayer Box */}
                        {multiplayerContext && opponent && (
                          <div className={`flex-1 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border shadow-inner text-center flex flex-col justify-center min-h-[90px] ${multiplayerContext.isCoopMode ? 'border-emerald-500/50' : 'border-cyan-500/50'}`}>
                            <h3 className={`heading-typography font-bold uppercase tracking-wider mb-2 text-[10px] md:text-xs flex items-center justify-center gap-1.5 ${multiplayerContext.isCoopMode ? 'text-emerald-600 dark:text-emerald-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                              {multiplayerContext.isCoopMode ? (
                                <><span>🤝</span> Bilan Coop</>
                              ) : (
                                <><span>⚔️</span> Résultat Versus</>
                              )}
                            </h3>
                            {!opponent.isRetired ? (
                              <p className="text-slate-500 dark:text-slate-400 text-[10px] animate-pulse">Attente de {opponent.name}...</p>
                            ) : (
                              <div className="flex flex-col items-center">
                                <div className="flex justify-between w-full items-center px-1">
                                  <div className="text-center">
                                    <p className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold truncate max-w-[50px]">{player.name}</p>
                                    <p className="text-sm md:text-base font-black text-amber-600 dark:text-amber-400 leading-none">{gameState.score ? gameState.score.totalScore : (player.bankBalance ? player.bankBalance : 0)}</p>
                                  </div>
                                  <div className="text-sm font-black text-slate-600">{multiplayerContext.isCoopMode ? '+' : 'VS'}</div>
                                  <div className="text-center">
                                    <p className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold truncate max-w-[50px]">{opponent.name}</p>
                                    <p className="text-sm md:text-base font-black text-cyan-600 dark:text-cyan-400 leading-none">{opponent.finalScore || 0}</p>
                                  </div>
                                </div>
                                {(() => {
                                  const myScore = gameState.score ? gameState.score.totalScore : 0;
                                  const opScore = opponent.finalScore || 0;
                                  if (multiplayerContext.isCoopMode) {
                                    return (
                                      <div className="mt-2 border-t border-slate-300/80 dark:border-slate-700/50 pt-1 w-full">
                                        <p className="text-[8px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-0.5">Score Total</p>
                                        <div className="text-emerald-600 dark:text-emerald-400 font-black text-base md:text-lg tracking-widest leading-none">{myScore + opScore}</div>
                                      </div>
                                    );
                                  } else {
                                    if (myScore > opScore) return <div className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest mt-1.5">Victoire ! 🏆</div>;
                                    if (myScore < opScore) return <div className="text-rose-500 font-black text-xs uppercase tracking-widest mt-1.5">Défaite... 😭</div>;
                                    return <div className="text-slate-600 dark:text-slate-300 font-black text-xs uppercase tracking-widest mt-1.5">Égalité 🤝</div>;
                                  }
                                })()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer (Fixed at bottom) */}
                <div className="shrink-0 mt-3 md:mt-4 pt-3 border-t border-slate-200/20 dark:border-slate-700/50">
                  <button 
                    onClick={() => { playSound('click'); onRestartGame(); }} 
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-black text-sm md:text-base uppercase tracking-wider transition-all shadow-xl active:scale-95"
                  >
                    Retour au Menu Principal 🏠
                  </button>
                </div>
              </div>

            );
          })()}
        </div>
      ) : !club ? (
        <div className="app-typography min-h-[100dvh] text-slate-700 dark:text-slate-200 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-4xl w-full z-10 flex flex-col justify-center py-8">
            <div className="text-center mb-2 md:mb-8 shrink-0">
              <h1 className="heading-typography text-xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight drop-shadow-md">
                Choisissez votre premier club
              </h1>
              <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-300 font-normal mt-1 md:mt-2">
                Démarrez votre carrière professionnelle
              </p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 min-h-0 shrink">
              {(multiplayerContext?.isCoopMode && !multiplayerContext?.isHost) ? (
                <div className="col-span-full w-full flex flex-col items-center justify-center p-8 bg-white/90 dark:bg-slate-800/80 rounded-2xl border border-slate-300 dark:border-slate-700">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Pacte Frères d'Armes</h2>
                  <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400 text-center text-sm max-w-md">
                    Votre capitaine (l'Hôte) est actuellement en train de négocier votre premier contrat avec les clubs formateurs. Préparez-vous à signer !
                  </p>
                </div>
              ) : clubOffers.map((offer) => {
                const offerTheme = getTheme(offer.primary, offer.secondary);
                return (
                  <div 
                    key={offer.id} 
                    className="bg-white dark:bg-slate-800 border-2 rounded-xl md:rounded-2xl p-2 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch shadow-2xl transition-all duration-300 hover:scale-[1.02] flex-1 min-h-0 gap-2 md:gap-0"
                    style={{ borderColor: offerTheme.accent }}
                  >
                    <div className="min-h-0 overflow-hidden flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-3">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow border border-black/15" style={{ backgroundColor: offer.primary }} />
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow border border-black/15" style={{ backgroundColor: offer.secondary }} />
                        <div className="scale-75 md:scale-100 origin-left"><LeagueLabel club={offer} /></div>
                      </div>
                      <h3 className="heading-typography text-sm md:text-xl font-bold text-slate-700 dark:text-slate-200 truncate">{offer.name}</h3>
                      <p className="hidden md:block text-[9px] md:text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-0.5 md:mt-1.5 font-normal leading-tight line-clamp-2">{offer.desc.replace(/^[^-]+-\s*/, '')}</p>
                    </div>
                    <button 
                      onClick={() => { playSound('click'); onChooseClub(offer); }} 
                      className="heading-typography md:mt-6 py-2 px-3 md:py-3 md:px-4 rounded-lg md:rounded-xl font-semibold text-[9px] md:text-xs text-slate-800 dark:text-white shadow-md transition-transform active:scale-95 hover:brightness-110 tracking-wider uppercase shrink-0"
                      style={{ backgroundColor: offerTheme.btnBg }}
                    >
                      Signer 📝
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : seasonStats ? (
        /* BILAN DE LA SAISON AVEC AFFICHAGE DE LA CARTE */
        <div className="app-typography h-[100dvh] text-slate-800 dark:text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-hidden" style={clubBackgroundStyle}>

      

          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-3xl w-full bg-white/95 dark:bg-slate-900/95 border border-slate-300/80 dark:border-slate-700/50 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-7 shadow-2xl z-10 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center h-[95%] md:h-auto overflow-hidden">
            
            <div className="flex flex-col items-center scale-[0.55] md:scale-100 origin-center -mt-24 md:mt-0 shrink-0">
              <PlayerCard player={player} club={club} cardType={cardStyle} />
            </div>

            <div className="flex-1 space-y-2 md:space-y-5 w-full flex flex-col min-h-0 shrink -mt-16 md:mt-0">
              <div className="shrink-0 text-center md:text-left">
                <span className="heading-typography text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                  Bilan de la Saison {season} • {club.name}
                </span>
                <h3 className="heading-typography text-lg md:text-2xl font-bold text-slate-800 dark:text-white mt-1 md:mt-4 leading-snug">{seasonStats.headline}</h3>
                {player.injuryDuration > 0 && (
                  <p className="text-xs font-medium text-rose-600 mt-2">🚑 Vous avez manqué quelques semaines pour cause de blessure.</p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-3">
                <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Matchs</span>
                  <span className="heading-typography text-lg font-bold text-slate-800 dark:text-white mt-0.5 block">{seasonStats.matches}</span>
                </div>
                
                {isDefensivePlayer ? (
                  <>
                    <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Duels %</span>
                      <span className="heading-typography text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">{Math.min(99, Math.floor(65 + seasonStats.rating * 3.5))}%</span>
                    </div>
                    <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Clean Sheets</span>
                      <span className="heading-typography text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{seasonStats.cleanSheets}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Buts</span>
                      <span className="heading-typography text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{seasonStats.goals}</span>
                    </div>
                    <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Passes D.</span>
                      <span className="heading-typography text-lg font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 block">{seasonStats.assists}</span>
                    </div>
                  </>
                )}

                <div className="bg-white/90 dark:bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 text-center shadow-inner">
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Note Moy.</span>
                  <span className="heading-typography text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5 block">{seasonStats.rating}</span>
                </div>
              </div>

              {seasonStats.financials && (
                <div className="bg-white/90 dark:bg-slate-800/80 p-3 md:p-4 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 shadow-inner w-full mt-2 text-xs">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider text-[10px] md:text-xs">💰 Bilan Financier Annuel</h4>
                  <div className="space-y-1 md:space-y-1.5 font-mono text-[10px] md:text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Revenus (Salaire + Primes)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">+{(seasonStats.financials.salaryEarnings + seasonStats.financials.perfEarnings).toLocaleString()} €</span>
                    </div>
                    {(seasonStats.financials.sponsorEarnings > 0 || seasonStats.financials.inventoryEarnings > 0) && (
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span>Sponsors & Investissements</span>
                        <span className="text-emerald-600 dark:text-emerald-400">+{(seasonStats.financials.sponsorEarnings + seasonStats.financials.inventoryEarnings).toLocaleString()} €</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600 dark:text-slate-300 border-t border-slate-300/80 dark:border-slate-700/50 pt-1 mt-1">
                      <span>Impôts & Taxes (25%)</span>
                      <span className="text-rose-600 dark:text-rose-400">-{seasonStats.financials.taxes.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Train de vie (10%)</span>
                      <span className="text-rose-600 dark:text-rose-400">-{seasonStats.financials.lifestyleCost.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-white border-t border-slate-400 dark:border-slate-600 pt-1.5 mt-1.5 text-[11px] md:text-[13px]">
                      <span>RÉSULTAT NET (BANQUE)</span>
                      <span className={seasonStats.financials.net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                        {seasonStats.financials.net > 0 ? "+" : ""}{seasonStats.financials.net.toLocaleString()} €
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {/* --- FIN AJOUTS OVR ET FINANCES --- */}

              <div className="bg-white/90 dark:bg-slate-800/80 p-2 md:p-3.5 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 space-y-0.5 md:space-y-1 shadow-inner text-xs overflow-y-auto">
                <p className="font-medium text-slate-800 dark:text-slate-100">📢 {seasonStats.promotionRelegationText}</p>
                <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400">Classement final : <span className="heading-typography text-amber-600 dark:text-amber-400 font-semibold">{seasonStats.leaguePosition}e</span> | Gains : <span className="heading-typography text-emerald-600 dark:text-emerald-400 font-semibold">+{seasonStats.earnings} M€</span></p>
                {seasonStats.ballonDorRank && (
                  <p className="text-slate-600 dark:text-slate-300 font-semibold mt-1">🌟 {seasonStats.ballonDorRank === 1 ? 'Vainqueur du Ballon d\'Or !' : `${seasonStats.ballonDorRank}ème au classement du Ballon d'Or`}</p>
                )}
              </div>

              
              {seasonStats.tournaments && (
                <div className="bg-white/90 dark:bg-slate-800/80 p-2 md:p-3.5 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 shadow-inner text-xs space-y-1 md:space-y-1.5 hidden md:block">
                  <p className="font-bold text-slate-800 dark:text-slate-100 mb-1 uppercase tracking-wider text-[10px]">Tournois Disputés</p>
                  {seasonStats.tournaments.worldCup && <p className="text-slate-700 dark:text-slate-200">🌍 Coupe du Monde : <span className="font-semibold">{seasonStats.tournaments.worldCup.stage}</span></p>}
                  {seasonStats.tournaments.euro && <p className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><FlagIcon code="eu" className="w-4 h-3" /> Euro : <span className="font-semibold">{seasonStats.tournaments.euro.stage}</span></p>}
                  {seasonStats.tournaments.championsLeague && <p className="text-slate-700 dark:text-slate-200">⭐ Ligue des Champions : <span className="font-semibold">{seasonStats.tournaments.championsLeague.stage}</span></p>}
                  {seasonStats.tournaments.europaLeague && <p className="text-slate-700 dark:text-slate-200">🟠 Europa League : <span className="font-semibold">{seasonStats.tournaments.europaLeague.stage}</span></p>}
                  {seasonStats.tournaments.conferenceLeague && <p className="text-slate-700 dark:text-slate-200">🟢 Conference League : <span className="font-semibold">{seasonStats.tournaments.conferenceLeague.stage}</span></p>}
                  {seasonStats.tournaments.domesticCup && <p className="text-slate-700 dark:text-slate-200">🏆 Coupe Nationale : <span className="font-semibold">{seasonStats.tournaments.domesticCup.stage}</span></p>}
                </div>
              )}

              {seasonStats.statGains && Object.keys(seasonStats.statGains).length > 0 && (
                <div className="bg-white/90 dark:bg-slate-800/80 p-2 md:p-4 rounded-2xl border border-slate-300/80 dark:border-slate-700/50 shadow-inner text-xs space-y-1.5 md:space-y-3 mt-1.5 md:mt-4">
                  <p className="font-bold text-slate-800 dark:text-slate-100 mb-1 md:mb-2 uppercase tracking-wider text-[10px] md:text-[11px] border-b border-slate-300 dark:border-slate-700 pb-1 md:pb-2">Bilan de Progression Physique & Technique</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(seasonStats.statGains).map(([attr, gain]) => {
                      const labels = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique', diving: 'Plongeon', handling: 'Maniabilité', kicking: 'Jeu au pied', reflexes: 'Réflexes', positioning: 'Positionnement' };
                      const oldVal = Math.floor(player.attributes[attr] || 50);
                      const displayGain = Math.floor(gain);
                      const newVal = oldVal + displayGain;
                      
                      if (displayGain <= 0) return null;
                      
                      return (
                        <AnimatedStatBar 
                          key={attr} 
                          label={labels[attr] || attr} 
                          oldVal={oldVal} 
                          newVal={newVal} 
                          gain={displayGain} 
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-auto shrink-0">
                <button 
                  onClick={() => { playSound('click'); onNextSeason(); }} 
                  className="heading-typography flex-1 py-2.5 md:py-3.5 font-semibold text-slate-800 dark:text-white rounded-2xl shadow-lg transition-transform active:scale-95 hover:brightness-110 tracking-wider uppercase text-xs"
                  style={{ backgroundColor: theme.btnBg }}
                >
                  Continuer vers le Mercato 🚀
                </button>
                {player.age >= 31 && (
                  <button 
                    onClick={() => { playSound('click'); if(window.confirm('Voulez-vous vraiment prendre votre retraite ?')) onRetire(); }} 
                    className="heading-typography flex-shrink-0 px-4 md:px-5 py-2.5 md:py-3.5 font-semibold text-slate-800 dark:text-white bg-rose-600 rounded-2xl shadow-lg transition-transform active:scale-95 hover:bg-rose-500 tracking-wider uppercase text-xs"
                  >
                    Retraite 🛑
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : isInteractiveMatch && interactiveMatchPhases ? (
        <div className="app-typography min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden p-4" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-3xl w-full bg-white/90 dark:bg-slate-900/90 border-2 border-rose-500/50 rounded-3xl p-4 md:p-8 shadow-2xl z-10 text-slate-800 dark:text-white relative">
            {gameState.interactiveMatchFinalOutcome ? (
               <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 p-6 md:p-8 rounded-2xl text-center shadow-inner space-y-6">
                 <h3 className={`heading-typography text-3xl md:text-4xl font-black uppercase tracking-wider ${gameState.interactiveMatchFinalOutcome === 'win' ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {gameState.interactiveMatchFinalOutcome === 'win' ? 'Victoire !' : 'Défaite...'}
                 </h3>
                 <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                   {gameState.interactiveMatchFinalOutcome === 'win' 
                     ? 'Vous avez brillé lors de ce match décisif. Cette performance restera dans les annales !' 
                     : 'Malheureusement, le match s\'est soldé par un échec. Il va falloir rebondir rapidement.'}
                 </p>
                 <button 
                   onClick={() => { playSound('click'); onCloseInteractiveMatch(); }} 
                   className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 md:py-4 rounded-xl transition-transform active:scale-95 shadow-lg uppercase tracking-wider text-sm"
                 >
                   Fermer et continuer
                 </button>
               </div>
            ) : (
            <>
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-rose-600 text-slate-800 dark:text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                  {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.time}
                </span>
                <span className="bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/50 text-sm font-bold px-4 py-1 rounded-full tracking-widest">
                  SCORE DU MATCH : {interactiveMatchScore > 0 ? `+${interactiveMatchScore}` : interactiveMatchScore}
                </span>
              </div>
              <h2 className="text-3xl font-black mt-4">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.title}</h2>
              <p className="text-slate-700 dark:text-slate-200 mt-2">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.description}</p>
            </div>

            {interactiveMatchResult ? (
               <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/80 p-6 md:p-8 rounded-2xl text-center space-y-6 shadow-2xl backdrop-blur-md">
                 <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-wider ${interactiveMatchResult.success ? 'text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'text-rose-600 dark:text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}>
                   {interactiveMatchResult.success ? 'RÉUSSI !' : 'ÉCHEC...'}
                 </h3>
                 <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">{interactiveMatchResult.narrative}</p>
                 <button onClick={() => { playSound('click'); onContinueFromInteractiveMatch(); }} className="w-full py-3.5 md:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-slate-800 dark:text-white rounded-xl font-bold text-base md:text-lg uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30">
                   {interactiveMatchCurrentPhaseIndex < 2 ? 'Phase Suivante ➡️' : 'Fin du Match 🏁'}
                 </button>
               </div>
            ) : (
               <div className="space-y-4">
                 {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.options.map((opt, idx) => {
                   return (
                   <button key={idx} onClick={() => { playSound('click'); onPlayInteractiveMatch(idx); }} className="w-full text-left p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-150 flex items-center justify-between group shadow-sm">
                     <span className="font-semibold text-[10px] md:text-sm text-slate-800 dark:text-white">{opt.text}</span>
                   </button>
                 )})}
               </div>
            )}
            </>
            )}
          </div>
        </div>
      ) : isSelectingPerk ? (
        <div className="app-typography min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden" style={clubBackgroundStyle}>
           <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
           <div className="max-w-4xl w-full bg-white rounded-3xl p-8 shadow-2xl z-10 m-4">
             <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-slate-900">Saison Exceptionnelle !</h2>
               <p className="text-slate-500 dark:text-slate-500 mt-2">Choisissez un nouveau talent (Perk) pour récompenser votre progression.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PERKS_LIST.filter(p => !player.perks.includes(p.id) && (!p.roles || p.roles.some(r => (player.position || '').toUpperCase().includes(r)))).map(perk => (
                  <button key={perk.id} onClick={() => onSelectPerk(perk.id)} className="p-5 border-2 border-amber-200 bg-amber-50 rounded-2xl hover:bg-amber-100 hover:scale-105 transition-transform flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{perk.icon}</span>
                    <h4 className="font-bold text-slate-900">{perk.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-2">{perk.desc}</p>
                  </button>
                ))}
             </div>
           </div>
        </div>
      ) : isWaitingForMultiplayerSync ? (
          <div className="app-typography min-h-[100dvh] text-slate-800 dark:text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto bg-emerald-200 dark:bg-slate-950">
            <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
            <div className="max-w-md w-full flex flex-col z-10 justify-center py-8 items-center text-center space-y-6">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="heading-typography text-2xl font-black text-slate-800 dark:text-white uppercase tracking-widest">Fin de Saison</h2>
              <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium">
                En attente de votre coéquipier pour générer les résultats du championnat...
              </p>
            </div>
          </div>
        ) : isWaitingForMercato ? (
        <div className="app-typography min-h-[100dvh] text-slate-800 dark:text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto bg-emerald-200 dark:bg-slate-950">
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-md w-full flex flex-col z-10 justify-center py-8 items-center text-center space-y-6">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="heading-typography text-2xl font-black text-slate-800 dark:text-white uppercase tracking-widest">En attente...</h2>
            <p className="text-sm text-slate-500 dark:text-slate-500 dark:text-slate-400">En attente de la dǸcision de votre adversaire pour le mercato d'ǸtǸ.</p>
          </div>
        </div>
      ) : transferMarketOffers && transferMarketOffers.length > 0 ? (
        <div className="app-typography min-h-[100dvh] text-slate-800 dark:text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-4xl w-full flex flex-col z-10 justify-center py-8">
            <div className="text-center shrink-0 mb-2 md:mb-6">
              <h2 className="heading-typography text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight drop-shadow-md">Marché des Transferts</h2>
              <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-200 font-medium mt-1 md:mt-2">Ces clubs veulent s'attacher vos services !</p>
            </div>
            
            <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-5 min-h-0 shrink">
              {transferMarketOffers.map((offer) => {
                const offerTheme = getTheme(offer.primary, offer.secondary);
                return (
                  <div 
                    key={offer.id} 
                    className="bg-white dark:bg-slate-800 rounded-xl md:rounded-3xl p-2 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch shadow-xl border-2 md:border-4 transition-all duration-300 hover:scale-[1.02] flex-1 min-h-0 gap-2 md:gap-0"
                    style={{ borderColor: offerTheme.accent }}
                  >
                    <div className="min-h-0 overflow-hidden flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-3">
                        <span className="w-3 h-3 md:w-5 md:h-5 rounded-full shadow border border-slate-200" style={{ backgroundColor: offer.primary }} />
                        <span className="w-3 h-3 md:w-5 md:h-5 rounded-full shadow border border-slate-200" style={{ backgroundColor: offer.secondary }} />
                        <div className="scale-75 md:scale-100 origin-left"><LeagueLabel club={offer} /></div>
                      </div>
                      <h4 className="heading-typography text-sm md:text-lg font-bold text-slate-800 dark:text-white truncate">{offer.name}</h4>
                      <p className="hidden md:block text-[9px] md:text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-0.5 md:mt-1 font-normal leading-tight line-clamp-2">{offer.desc.replace(/^[^-]+-\s*/, '')}</p>
                    </div>
                    {player.challenge !== 'one_club' ? (
                      <button 
                        onClick={() => { playSound('click'); setSelectedOfferClub(offer); }} 
                        className="heading-typography md:mt-6 py-2 px-3 md:py-3 md:px-4 rounded-lg md:rounded-xl font-semibold text-[9px] md:text-xs uppercase tracking-wider text-slate-800 dark:text-white bg-emerald-600 shadow-md hover:bg-amber-500 transition-colors shrink-0"
                      >
                        Négocier 🤝
                      </button>
                    ) : (
                      <div className="md:mt-6 text-center py-2 px-2 md:py-3 md:px-4 rounded-lg md:rounded-xl border border-rose-200 bg-rose-50 text-[8px] md:text-xs font-bold text-rose-600 uppercase shrink-0">
                        Bloqué
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 md:mt-8 flex justify-center shrink-0">
              <button 
                onClick={() => { playSound('click'); onStayCurrentClub(); }}
                className="heading-typography py-3 px-6 md:py-4 md:px-8 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-white transition-all shadow-lg"
              >
                🏠 Rester à {club.name}
              </button>
            </div>
            {selectedOfferClub && (
              <TransferModal
                club={selectedOfferClub}
                playerOvr={player.ovr}
                onAccept={(clubWithStatus) => {
                  setSelectedOfferClub(null);
                  onAcceptTransferOffer(clubWithStatus);
                }}
                onReject={(clubId) => {
                  setSelectedOfferClub(null);
                  if (onRejectTransferOffer) onRejectTransferOffer(clubId);
                }}
                onClose={() => setSelectedOfferClub(null)}
              />
            )}
          </div>
        </div>
      ) : (
        <>
        {/* DASHBOARD PRINCIPAL EN SAISON */}
        <div 
          className="app-typography min-h-[100dvh] text-slate-900 p-1 md:p-4 pb-20 md:pb-4 relative overflow-y-auto overflow-x-hidden transition-all duration-700"
          style={clubBackgroundStyle}
        >
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-5xl mx-auto space-y-1.5 md:space-y-4 relative z-10">
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-1.5 md:mb-4">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-300/80 dark:border-slate-700/50 px-3 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center">
                <p className="heading-typography font-bold text-slate-600 dark:text-slate-300 text-[10px] md:text-sm tracking-widest uppercase">
                  Âge <span className="text-slate-800 dark:text-white ml-1 mr-1 md:mr-3">{player.age} ans</span>
                  <span className="text-slate-600 mx-1">|</span>
                  <span className="md:hidden text-amber-600 dark:text-amber-400 mx-1">OVR {player.ovr}</span>
                  <span className="md:hidden text-slate-600 mx-1">|</span>
                  <span className="hidden md:inline text-slate-600 mx-1">|</span>
                  <span className="md:ml-3 text-slate-500 dark:text-slate-500 dark:text-slate-400">Année</span> <span className="text-slate-800 dark:text-white ml-1">{player.currentYear || 2024}</span>
                </p>
              </div>
            </div>
            {player.injuryDuration > 0 && (
              <div className="bg-rose-50 border border-rose-300 p-3 rounded-2xl text-rose-950 flex items-center gap-3 shadow-md">
                <span className="text-2xl">🚑</span>
                <div>
                  <h4 className="heading-typography font-bold text-sm">Blessure en cours</h4>
                  <p className="text-xs font-normal text-rose-800">Indisponibilité estimée à <span className="font-semibold text-rose-950">{player.injuryDuration} semaines</span>.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* ONGLET : JOUEUR (CARTE & STATS) */}
              <div className={`${activeMobileTab !== 'joueur' ? 'hidden md:flex' : 'flex'} flex-col space-y-4 md:col-span-1`}>
                {/* BLOC CARTE FUT DU JOUEUR */}
                <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit">
                  <button 
                    onClick={async () => {
                      if (!exportCardRef.current) return;
                      try {
                        const canvas = await html2canvas(exportCardRef.current, { 
                          backgroundColor: null, 
                          scale: 2,
                          useCORS: true,
                          logging: false
                        });
                        const link = document.createElement('a');
                        link.download = `carte-${player.name.replace(/\s/g, '_')}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                      } catch (e) { console.error('Export failed', e); }
                    }} 
                    className="w-full mb-2 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-800 text-slate-800 dark:text-white py-1.5 rounded-xl shadow-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    📸 Exporter ma Carte
                  </button>
                  <div ref={playerCardRef} className="inline-block" style={{ backgroundColor: 'transparent' }}>
                    <PlayerCard player={player} club={club} cardType="auto" />
                  </div>
                </div>
                <div>
                  {/* STATS DÉTAILLÉES */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-3 shadow-2xl">
                    <div className="heading-typography text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center mb-3">
                      <span className="flex items-center gap-1.5">📊 Stats Détaillées</span>
                    </div>
                    <div className="border-t border-slate-300/80 dark:border-slate-700/50 pt-3 grid grid-cols-2 gap-1.5">
                      {(isGoalkeeper ? ['diving', 'handling', 'kicking', 'reflexes', 'pace', 'positioning'] : ['pace', 'dribbling', 'finishing', 'defense', 'passing', 'physical']).map((attr) => {
                        const val = Math.floor(player.attributes?.[attr] || 0);
                        const eff = Math.floor(effectiveStats[attr] || val);
                        const diff = eff - val;
                        return (
                          <div key={attr} className="bg-white dark:bg-slate-800 px-2 py-1.5 rounded-md border border-slate-300/80 dark:border-slate-700/50 flex justify-between items-center shadow-sm">
                            <span className="text-[9px] text-slate-500 dark:text-slate-500 dark:text-slate-400 capitalize font-medium">{statLabels[attr] || attr}</span>
                            <div className="flex items-center gap-1">
                              <span className="heading-typography font-bold text-[10px] text-slate-800 dark:text-slate-100">{val}</span>
                              {diff !== 0 && (
                                <span className={`heading-typography font-bold text-[9px] ${diff > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                  ({diff > 0 ? `+${diff}` : diff})
                               </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* TROPHÉES — en format accordéon */}
                <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-3 shadow-2xl">
                  <button onClick={() => setIsTrophiesOpen(!isTrophiesOpen)} className="w-full heading-typography text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex justify-between items-center bg-white dark:bg-slate-800 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">🏆 Vitrine à Trophées</span>
                    <span className="text-amber-500 text-sm">{isTrophiesOpen ? '▲' : '▼'}</span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isTrophiesOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="space-y-3 pt-2 border-t border-slate-300/80 dark:border-slate-700/50">
                      <div>
                        <h4 className="heading-typography text-[8px] font-bold text-emerald-500 uppercase tracking-wider mb-1.5">🛡️ Collectifs</h4>
                        {collectiveTrophies.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {collectiveTrophies.map((trophy, idx) => (
                              <span key={`col-${idx}`} className="bg-emerald-900/40 border border-emerald-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                <span className="text-[10px]">{trophy.icon}</span>
                                <span className="heading-typography text-[8px] text-emerald-600 dark:text-emerald-400 font-semibold">{trophy.text}</span>
                                {trophy.count > 1 && <span className="heading-typography font-black text-emerald-500 text-[8px]">×{trophy.count}</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[8px] text-slate-500 dark:text-slate-500 italic mb-2">Aucun trophée collectif.</p>
                        )}
                      </div>

                      <div>
                        <h4 className="heading-typography text-[8px] font-bold text-amber-500 uppercase tracking-wider mb-1.5">🏅 Individuels</h4>
                        {individualTrophies.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {individualTrophies.map((trophy, idx) => (
                              <span key={`ind-${idx}`} className="bg-amber-900/40 border border-amber-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                <span className="text-[10px]">{trophy.icon}</span>
                                <span className="heading-typography text-[8px] text-amber-600 dark:text-amber-400 font-semibold">{trophy.text}</span>
                                {trophy.count > 1 && <span className="heading-typography font-black text-amber-500 text-[8px]">×{trophy.count}</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[8px] text-slate-500 dark:text-slate-500 italic">Aucune distinction individuelle.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
<div className="block md:hidden">
{/* GRAPH VALEUR MARCHANDE */}
                {player.valueHistory && player.valueHistory.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit relative">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="heading-typography text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Valeur Marchande</h3>
                      <span className="text-emerald-600 font-black text-xl leading-none">
                        {(player.valueHistory[player.valueHistory.length - 1].value / 1000000).toFixed(1)} M€
                      </span>
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={player.valueHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                          <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#94a3b8' }} 
                            tickLine={false} 
                            axisLine={false}
                            domain={['auto', 'auto']}
                            tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                          />
                          <Tooltip 
                            formatter={(value) => [`${(value / 1000000).toFixed(1)} M€`, 'Valeur']}
                            labelFormatter={(label) => `Âge: ${label} ans`}
                            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', padding: '10px', color: '#f8fafc' }}
                          />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#047857' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                </div>
              </div>

              {/* ONGLET : TERRAIN (EVENTS) */}
              <div className={`${activeMobileTab !== 'terrain' ? 'hidden md:flex' : 'flex'} md:col-span-2 flex-col space-y-4`}>
                
                {/* TERRAIN / EVENTS EN HAUT */}

                {/* ROW: CLUB & GAUGES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Club Actuel - DESKTOP */}
                  <div className="hidden md:flex bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-4 shadow-2xl flex-col justify-between gap-4 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10 w-full">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-300 dark:border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-300 dark:border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate flex-1">
                        <span className="heading-typography text-sm font-black text-slate-800 dark:text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                      {player.nationalStatus === 'CAPITAINE' && (
                        <div className="ml-auto flex-shrink-0">
                          <span className="heading-typography text-[8px] font-bold uppercase tracking-widest text-slate-800 dark:text-white bg-amber-600 px-2 py-1 rounded-md shadow-sm whitespace-nowrap">
                            © Capitaine
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto relative z-10">
                      {/* Statut */}
                      <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl shadow-sm">
                        <span className="heading-typography text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none text-center">
                          {player.statusText}
                        </span>
                      </div>
                      {/* Solde */}
                      <div className="flex-1 flex flex-row gap-1 items-stretch">
                        <div className="flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-2 py-1 rounded-xl flex items-center justify-center shadow-lg border border-emerald-300 text-center">
                          <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                          <span className="heading-typography text-[10px] md:text-[11px] font-black text-slate-800 dark:text-white drop-shadow-md z-10 tracking-wide leading-none">
                            {bankBalance.toLocaleString('fr-FR')} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Club Actuel - MOBILE */}
                  <div className="flex md:hidden bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-4 shadow-2xl flex-col gap-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10 w-full">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-300 dark:border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-300 dark:border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate flex-1">
                        <span className="heading-typography text-sm font-black text-slate-800 dark:text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                      {player.nationalStatus === 'CAPITAINE' && (
                        <div className="flex-shrink-0">
                          <span className="heading-typography text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-slate-800 dark:text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-row gap-2 relative z-10 w-full items-stretch justify-between">
                      {/* Statut */}
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <span className="heading-typography text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none text-left">
                          {player.statusText}
                        </span>
                      </div>
                      {/* Solde */}
                      <div className="flex flex-row gap-1 items-stretch justify-end">
                        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-2 py-1 rounded-xl flex items-center justify-center shadow-lg border border-emerald-300 text-center">
                          <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                          <span className="heading-typography text-[10px] sm:text-[11px] font-black text-slate-800 dark:text-white drop-shadow-md z-10 tracking-wide leading-none">
                            {bankBalance.toLocaleString('fr-FR')} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Gauges (États) */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-3 shadow-2xl flex flex-col justify-center h-full">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-500 dark:text-slate-500 dark:text-slate-400">
                          <span>Forme physique</span>
                          <span className={player.form < 30 ? 'text-rose-500 font-bold' : 'text-slate-800 dark:text-white font-semibold'}>{player.form}%</span>
                        </div>
                        <div className="w-full bg-white dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-300/80 dark:border-slate-700/50">
                          <div className={`${player.form < 30 ? 'bg-rose-500' : 'bg-amber-500'} h-full rounded-full transition-all shadow-sm`} style={{ width: `${player.form}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-500 dark:text-slate-500 dark:text-slate-400">
                          <span>Moral</span>
                          <span className="text-slate-800 dark:text-white font-semibold">{player.morale}%</span>
                        </div>
                        <div className="w-full bg-white dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-300/80 dark:border-slate-700/50">
                          <div className="bg-cyan-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.morale}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-500 dark:text-slate-500 dark:text-slate-400">
                          <span>Confiance Coach</span>
                          <span className="text-slate-800 dark:text-white font-semibold">{player.coachTrust}%</span>
                        </div>
                        <div className="w-full bg-white dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-300/80 dark:border-slate-700/50">
                          <div className="bg-purple-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.coachTrust}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { playSound('click'); setIsShopOpen(true); }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-800 dark:text-white font-bold py-3 md:py-4 px-4 rounded-2xl shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2 border border-emerald-400/50"
                >
                  <span className="text-lg md:text-xl">💎</span>
                  <span className="heading-typography text-[10px] md:text-xs tracking-widest uppercase">Boutique d'Investissements</span>
                  <span className="bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded-md text-[10px] font-black ml-2 shadow-inner">
                    {bankBalance.toLocaleString('fr-FR')} €
                  </span>
                </button>

                <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit">
                  <div>
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <span className="heading-typography text-[9px] md:text-[10px] font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg uppercase tracking-wider shadow-sm bg-rose-500 text-slate-800 dark:text-white">
                        {formatEventCategory(currentEvent?.category)}
                      </span>
                      <span className="heading-typography text-[10px] md:text-[11px] font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-400">Étape {eventStep} / {totalEvents}</span>
                    </div>
                    <h3 className="heading-typography text-sm md:text-xl font-bold text-slate-800 dark:text-white mb-2 leading-snug">{currentEvent?.description}</h3>
                  </div>

                  {activeOutcome ? (
                    <div className="my-2 md:my-4 sticky bottom-16 md:static z-20 bg-slate-100/95 md:bg-slate-100/80 p-3 md:p-4 rounded-xl border border-slate-200/80 space-y-3 shadow-xl md:shadow-inner">
                      <p className="text-xs md:text-sm text-slate-800 font-normal leading-relaxed">✨ {activeOutcome.narrative}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeOutcome.effects?.map((eff, i) => (
                          <span key={i} className={`heading-typography text-[9px] md:text-[10px] font-semibold px-2 py-1 rounded-lg border shadow-sm flex items-center gap-1 ${
                            eff.isBoosted && player.age <= 21
                              ? 'bg-violet-100 text-violet-900 border-violet-400'
                              : eff.style === 'positive' ? 'bg-emerald-200 text-emerald-900 border-emerald-300' : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}>
                            {eff.isBoosted && player.age <= 21 && <span className="opacity-80">⚡</span>}
                            {eff.text}
                          </span>
                        ))}

                      </div>
                      {activeOutcome.ageBoostApplied && activeOutcome.ageBoostApplied <= 21 && (
                        <p className="text-[9px] text-violet-700 font-semibold leading-relaxed flex items-center gap-1">
                          <span>⚡</span>
                          <span>
                            {activeOutcome.ageBoostApplied <= 18
                              ? `Bonus Wonderkid (${activeOutcome.ageBoostApplied} ans) — vos gains de stats sont massivement amplifiés !`
                              : `Bonus Jeune Talent (${activeOutcome.ageBoostApplied} ans) — vos gains de stats sont amplifiés.`
                            }
                          </span>
                        </p>
                      )}

                      <button 
                        onClick={() => { playSound('click'); onContinueFromOutcome(); }} 
                        className="heading-typography w-full py-2 md:py-2.5 font-semibold text-slate-800 dark:text-white uppercase text-[10px] tracking-wider rounded-xl mt-2 shadow-lg transition-transform active:scale-95 hover:brightness-110"
                        style={{ backgroundColor: theme.btnBg }}
                      >
                        Continuer la saison ➡️
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 my-2 md:my-3 sticky bottom-14 md:static z-20 bg-white dark:bg-slate-900 md:bg-transparent p-2 md:p-0 -mx-2 md:mx-0 rounded-xl shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.5)] md:shadow-none">
                      {currentEvent?.options?.map((option, idx) => {
                        if (option.requiredBackground && option.requiredBackground !== player.background?.id) return null;
                        return (
                        <button 
                          key={idx} 
                          onClick={() => { playSound('click'); onSelectOption(idx); }} 
                          className="w-full text-left p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-150 flex items-center justify-between group shadow-sm"
                        >
                          <div className="flex items-center gap-2 md:gap-3 pr-2">
                            <span className="font-semibold text-[10px] md:text-sm text-slate-800 dark:text-white leading-tight">{option.text}</span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 text-[10px] md:text-xs transition-transform group-hover:translate-x-1 flex-shrink-0">➔</span>
                        </button>
                      ); })}
                    </div>
                  )}
                </div>

                <div className="hidden md:block">
{/* GRAPH VALEUR MARCHANDE */}
                {player.valueHistory && player.valueHistory.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit relative">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="heading-typography text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Valeur Marchande</h3>
                      <span className="text-emerald-600 font-black text-xl leading-none">
                        {(player.valueHistory[player.valueHistory.length - 1].value / 1000000).toFixed(1)} M€
                      </span>
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={player.valueHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                          <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#94a3b8' }} 
                            tickLine={false} 
                            axisLine={false}
                            domain={['auto', 'auto']}
                            tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                          />
                          <Tooltip 
                            formatter={(value) => [`${(value / 1000000).toFixed(1)} M€`, 'Valeur']}
                            labelFormatter={(label) => `Âge: ${label} ans`}
                            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', padding: '10px', color: '#f8fafc' }}
                          />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#047857' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                </div>
                {multiplayerContext && (
                  <div className="flex justify-center mt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('click');
                        if (window.confirm("Êtes-vous sûr de vouloir quitter le mode 1v1 ? Toute progression non sauvegardée de cette saison sera perdue.")) {
                          onRestartGame();
                        }
                      }}
                      className="bg-rose-600/90 hover:bg-rose-500 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-lg shadow-lg backdrop-blur-md transition-colors border border-rose-500/50 flex items-center justify-center"
                    >
                      Quitter
                    </button>
                  </div>
                )}
              </div>

              {/* ONGLET : CARRIÈRE (TROPHÉES & ÉTAT) */}
              <div className={`${activeMobileTab !== 'carriere' ? 'hidden md:flex' : 'flex'} flex-col space-y-4 md:col-span-1`}>

                {/* BLOC COMPARATIF NÉMÉSIS */}
                {rival && (() => {
                  const rivalCountryId = rival.club ? rival.club.origin : 'FR';
                  
                  let playerBdOrs = 0;
                  let playerTotalTrophies = 0;
                  if (palmares) {
                     playerBdOrs = (palmares.awards || []).filter(a => a.name === "Ballon d'Or").length;
                     if (palmares.tournaments) {
                        Object.values(palmares.tournaments).forEach(arr => {
                           if (Array.isArray(arr)) playerTotalTrophies += arr.length;
                        });
                     }
                  }
                  
                  const h2hWon = gameState.rivalConfrontations?.won || 0;
                  const h2hLost = gameState.rivalConfrontations?.lost || 0;
                  const h2hDrawn = gameState.rivalConfrontations?.drawn || 0;
                  
                  return (
                    <div className="bg-white dark:bg-slate-900 border border-rose-900/50 rounded-3xl p-4 shadow-2xl flex flex-col relative overflow-hidden gap-4">
                      <div className="absolute -top-4 -right-4 p-4 opacity-10 text-6xl transform rotate-12 pointer-events-none">⚔️</div>
                      <div className="w-full flex justify-between items-center px-1 relative z-10 mb-2">
                        <h4 className="heading-typography text-[12px] font-black text-rose-500 uppercase tracking-widest">Némésis</h4>
                        {player.ovr > rival.ovr ? (
                          <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold bg-emerald-400/10 px-2 py-0.5 rounded shadow-sm">DOMINÉ</span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 text-[10px] font-bold bg-rose-400/10 px-2 py-0.5 rounded shadow-sm">MENAÇANT</span>
                        )}
                      </div>

                      {/* CARTE RIVAL SEULE */}
                      <div className="flex flex-col items-center justify-center relative z-10 mb-2 w-full">
                        <div className="inline-block" style={{ backgroundColor: 'transparent' }}>
                          <PlayerCard player={{ ...rival, origin: rivalCountryId }} club={rival.club} cardType="auto" />
                        </div>
                      </div>

                      {/* STATS COMPARATIVES */}
                      <div className="w-full flex flex-col gap-2 relative z-10 bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-300 dark:border-slate-700">
                        
                        <div className="flex justify-between items-center w-full">
                          <span className={`font-bold text-sm w-1/3 text-center ${playerBdOrs > (rival.ballonDorCount || 0) ? 'text-emerald-500' : 'text-slate-800 dark:text-white'}`}>{playerBdOrs}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase w-1/3 text-center">Ballons d'Or</span>
                          <span className={`font-bold text-sm w-1/3 text-center ${(rival.ballonDorCount || 0) > playerBdOrs ? 'text-rose-500' : 'text-slate-800 dark:text-white'}`}>{rival.ballonDorCount || 0}</span>
                        </div>
                        
                        <div className="w-full h-px bg-slate-300 dark:bg-slate-700/50"></div>
                        
                        <div className="flex justify-between items-center w-full">
                          <span className={`font-bold text-sm w-1/3 text-center ${playerTotalTrophies > (rival.trophiesCount || 0) ? 'text-emerald-500' : 'text-slate-800 dark:text-white'}`}>{playerTotalTrophies}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase w-1/3 text-center">Trophées</span>
                          <span className={`font-bold text-sm w-1/3 text-center ${(rival.trophiesCount || 0) > playerTotalTrophies ? 'text-rose-500' : 'text-slate-800 dark:text-white'}`}>{rival.trophiesCount || 0}</span>
                        </div>

                      </div>

                      {/* JAUGE H2H */}
                      <div className="w-full flex flex-col gap-1 relative z-10 mt-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mb-1">
                          <span className="text-emerald-500">{h2hWon} Victoires</span>
                          <span className="text-slate-400">Confrontations</span>
                          <span className="text-rose-500">{h2hLost} Défaites</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex shadow-inner">
                          {h2hWon > 0 && <div style={{ width: `${(h2hWon / Math.max(1, h2hWon + h2hLost + h2hDrawn)) * 100}%` }} className="h-full bg-emerald-500"></div>}
                          {h2hDrawn > 0 && <div style={{ width: `${(h2hDrawn / Math.max(1, h2hWon + h2hLost + h2hDrawn)) * 100}%` }} className="h-full bg-slate-400"></div>}
                          {h2hLost > 0 && <div style={{ width: `${(h2hLost / Math.max(1, h2hWon + h2hLost + h2hDrawn)) * 100}%` }} className="h-full bg-rose-500"></div>}
                        </div>
                        {h2hWon === 0 && h2hLost === 0 && h2hDrawn === 0 && (
                          <span className="text-center text-[9px] text-slate-500 mt-1 italic">Aucune rencontre directe pour l'instant.</span>
                        )}
                      </div>

                    </div>
                  );
                })()}

                {/* BLOC TRAITS (PLAYSTYLES) MOVED HERE */}
                {((player.perks && player.perks.length > 0) || (player.traits && player.traits.length > 0)) && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-3xl p-4 shadow-2xl">
                    <h4 className="heading-typography text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span>✨ Traits & Styles de Jeu</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      {player.perks && player.perks.map(traitId => {
                        const trait = PERKS_LIST.find(p => p.id === traitId);
                        if (!trait) return null;
                        return (
                          <div key={`perk-${traitId}`} className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-300 dark:border-slate-700">
                            <span className="text-2xl drop-shadow-md">{trait.icon}</span>
                            <div>
                              <p className="heading-typography text-xs font-bold text-slate-800 dark:text-white uppercase">{trait.name}</p>
                              <p className="text-[9px] text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{trait.description}</p>
                            </div>
                          </div>
                        );
                      })}
                      {player.traits && player.traits.map(tObj => {
                        const traitDef = PERKS_LIST.find(p => p.id === tObj.id);
                        if (!traitDef) return null;
                        return (
                          <div key={`trait-${tObj.id}`} className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-amber-300 dark:border-amber-700/50 shadow-sm">
                            <span className="text-2xl drop-shadow-md">{traitDef.icon}</span>
                            <div>
                              <p className="heading-typography text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">{traitDef.name}</p>
                              <p className="text-[9px] text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{traitDef.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* SPONSORS */}
                {player.sponsor && player.sponsor !== 'Aucun' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-3xl p-4 shadow-2xl mt-4">
                    <h4 className="heading-typography text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span>💎 Sponsors Officiels</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 p-3 rounded-xl shadow-sm">
                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 text-white rounded-lg shadow-inner text-xl font-black">
                          {player.sponsor.charAt(0)}
                        </div>
                        <div>
                          <p className="heading-typography text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase">{player.sponsor}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            Partenaire principal {player.sponsorValue ? `• ${(player.sponsorValue).toLocaleString()} €/an` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {multiplayerContext && (
                  <div className="flex md:hidden justify-center mt-4 mb-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound('click');
                        if (window.confirm("Êtes-vous sûr de vouloir quitter le mode 1v1 ? Toute progression non sauvegardée de cette saison sera perdue.")) {
                          onRestartGame();
                        }
                      }}
                      className="bg-rose-600/90 hover:bg-rose-500 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg backdrop-blur-md transition-colors border border-rose-500/50 flex items-center justify-center w-full"
                    >
                      Quitter
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
          </div>
          {/* MOBILE BOTTOM NAV */}
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 md:hidden z-50 flex justify-around p-2 pb-safe shadow-2xl">
              <button 
                  onClick={() => { playSound('click'); setActiveMobileTab('terrain'); }} 
                  className={`flex flex-col items-center justify-center p-2 px-4 rounded-xl transition-colors ${activeMobileTab === 'terrain' ? 'bg-white text-amber-600' : 'text-slate-600 hover:bg-white/50'}`}
              >
                  <span className="text-xl mb-1">🏟️</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase">Terrain</span>
              </button>
              <button 
                  onClick={() => { playSound('click'); setActiveMobileTab('joueur'); }} 
                  className={`flex flex-col items-center justify-center p-2 px-4 rounded-xl transition-colors ${activeMobileTab === 'joueur' ? 'bg-white text-amber-600' : 'text-slate-600 hover:bg-white/50'}`}
              >
                  <span className="text-xl mb-1">👕</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase">Joueur</span>
              </button>
              <button 
                  onClick={() => { playSound('click'); setActiveMobileTab('carriere'); }} 
                  className={`flex flex-col items-center justify-center p-2 px-4 rounded-xl transition-colors ${activeMobileTab === 'carriere' ? 'bg-white text-amber-600' : 'text-slate-600 hover:bg-white/50'}`}
              >
                  <span className="text-xl mb-1">⚔️</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase">Rival</span>
              </button>
            </div>
          </>
      )}

      <LifestyleShopModal 
        isOpen={isShopOpen} 
        onClose={() => setIsShopOpen(false)} 
        bankBalance={bankBalance} 
        player={player} 
        onBuyItem={onBuyLifestyleItem} 
      />

      {/* HIDDEN CARDS FOR CLEAN HTML2CANVAS EXPORT */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, opacity: 0, pointerEvents: 'none' }}>
        <div ref={exportCardRef}>
          <PlayerCard player={player} club={club} cardType={cardStyle} exportMode={true} />
        </div>
        {bestVersion && (
          <div ref={exportPrimeCardRef}>
            <PlayerCard player={bestVersion.player} club={bestVersion.club} cardType={cardStyle} exportMode={true} />
          </div>
        )}
      </div>
      
    </>
  );
}

// ============================================================================
// 5. CONTRÔLEUR PRINCIPAL (APP)
// ============================================================================
