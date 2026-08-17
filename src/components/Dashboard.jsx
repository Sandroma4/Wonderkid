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
    <div className="flex flex-col gap-1.5 w-full max-w-[160px] bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50 shadow-inner">
      <div className="flex justify-between items-center text-[9px] uppercase font-black tracking-wider">
        <span className="text-slate-300">{label}</span>
        <span className={gain > 0 ? "text-emerald-400" : "text-rose-400"}>
          {gain > 0 ? `+${gain}` : gain} <span className="text-white text-[11px] ml-1">{displayVal}</span>
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
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
    <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase text-slate-500 tracking-wider mt-0.5">
      <span>{club.leagueName} {club.tier ? `(D${club.tier})` : ''}</span>
      <FlagIcon code={club.origin} className="w-3 h-2 rounded-[1px] shadow-sm" />
    </span>
  );
};


const formatEventCategory = (cat) => {
  if (!cat) return 'Événement';
  const labels = {
    'WORLD_CUP': 'Coupe du Monde',
    'EURO': 'Euro',
    'CHAMPIONS_LEAGUE': 'Ligue des Champions',
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
  
  const { 
    player, club, season, eventsList, eventStep, totalEvents, currentEvent,
    isInteractiveMatch, interactiveMatchPhases, interactiveMatchCurrentPhaseIndex, 
    interactiveMatchScore, interactiveMatchResult, interactiveMatchFinalOutcome, isRetired, 
    seasonStats, lastSeasonStats, 
    transferMarketOffers, clubOffers, bankBalance, palmares,
    rival, rivalConfrontations, isSelectingPerk
  } = gameState || {};

  const opponent = multiplayerContext?.players?.find(p => p.playerId !== multiplayerContext.playerId);


  const effectiveStats = getEffectiveStats(player);

  const statLabels = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique' };


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
        <div className="app-typography min-h-[100dvh] bg-[#0F172A] p-4 md:p-8 text-slate-100 relative overflow-y-auto flex flex-col items-center justify-center font-sans">
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {(() => {
            const bestVersion = getBestPlayerVersion(player, club);
            return (
              <div className="max-w-3xl w-full bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl z-10 flex flex-col items-center text-center my-auto">
                <div className="mb-2">
                  <span className="heading-typography text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full inline-block mb-2">
                    Bilan Définitif de Carrière
                  </span>
                  <h1 className="heading-typography text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-wider">
                    FIN DE CARRIÈRE
                  </h1>
                  <p className="text-sm md:text-base text-slate-300 mt-1">
                    Félicitations pour cette belle aventure, <span className="text-amber-400 font-bold">{player.name}</span> !
                  </p>
                </div>
                
                {/* Zone carte joueur PRIME avec ref pour html2canvas */}
                <div className="flex flex-col items-center my-2">
                  <div className="text-[11px] font-bold text-amber-400/90 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <span>👑</span> Version Prime ({bestVersion.player.ovr} GEN)
                  </div>
                  <div ref={playerCardRef} className="inline-block">
                    <PlayerCard player={bestVersion.player} club={bestVersion.club} cardType={cardStyle} />
                  </div>
                </div>

                {/* Bouton téléchargement carte */}
                <button
                  onClick={async () => {
                    if (!playerCardRef.current) return;
                    try {
                      const canvas = await html2canvas(playerCardRef.current, { backgroundColor: null, scale: 2 });
                      const link = document.createElement('a');
                      link.download = `carte-prime-${player.name.replace(/\s/g, '_')}.png`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                    } catch (e) { console.error('Export failed', e); }
                  }}
                  className="heading-typography text-xs font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 mt-1 mb-4"
                >
                  📥 Télécharger ma carte Prime
                </button>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-2">
                  <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center shadow-inner">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Âge final</p>
                    <p className="text-xl md:text-2xl font-black text-white mt-0.5">{player.age} ans</p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center shadow-inner">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Gains Totaux</p>
                    <p className="text-xl md:text-2xl font-black text-emerald-400 mt-0.5">{(bankBalance / 1000000).toFixed(1)} M€</p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center shadow-inner">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sélections</p>
                    <p className="text-xl md:text-2xl font-black text-white mt-0.5">{player.nationalCaps || 0}</p>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center shadow-inner">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">OVR Prime</p>
                    <p className="text-xl md:text-2xl font-black text-amber-400 mt-0.5">{bestVersion.player.ovr || player.careerMaxOvr || player.ovr}</p>
                  </div>
                </div>

                <div className="w-full bg-slate-800/70 p-5 rounded-2xl border border-amber-500/30 mt-4 shadow-inner">
                  <h3 className="heading-typography font-bold text-amber-400 uppercase tracking-wider mb-3 text-xs flex items-center justify-center gap-1.5">
                    <span>🏆</span> Palmarès & Distinctions
                  </h3>
                  {groupedPalmares.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {groupedPalmares.slice(0, 12).map((trophy, idx) => (
                        <span key={idx} className="bg-slate-900/90 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5">
                          <span className="text-sm">{trophy.icon}</span> {trophy.text} {trophy.count > 1 && <span className="text-amber-400 font-bold ml-1">×{trophy.count}</span>}
                        </span>
                      ))}
                      {groupedPalmares.length > 12 && <span className="text-xs text-amber-400/80 font-bold self-center">et bien d'autres...</span>}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Aucun trophée majeur remporté.</p>
                  )}
                </div>

                {/* Comparatif Légendes (Hall of Fame) */}
                {(() => {
                  const boCount = groupedPalmares.find(t => t.text === "Ballon d'Or")?.count || 0;
                  const ldcCount = groupedPalmares.find(t => t.text === "Vainqueur de la Ligue des Champions")?.count || 0;
                  const cmCount = groupedPalmares.find(t => t.text === "Vainqueur de la Coupe du Monde")?.count || 0;
                  
                  let rankTitle = "Joueur Professionnel";
                  if (player.traits?.some(t => t.id === 'legende_club')) rankTitle = "Légende du Club";
                  if (boCount >= 1 || ldcCount >= 2 || cmCount >= 1) rankTitle = "Star Mondiale";
                  if (boCount >= 3 || (ldcCount >= 3 && cmCount >= 1)) rankTitle = "Légende Absolue";
                  if (boCount >= 6 && ldcCount >= 4) rankTitle = "Le G.O.A.T.";

                  return (
                    <div className="w-full bg-slate-800/70 p-5 rounded-2xl border border-emerald-500/30 mt-4 shadow-inner">
                      <h3 className="heading-typography font-bold text-emerald-400 uppercase tracking-wider mb-3 text-xs flex items-center justify-center gap-1.5">
                        <span>🏛️</span> Hall of Fame
                      </h3>
                      <div className="text-center mb-4">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Rang Historique</span>
                        <span className="text-lg font-black text-white px-4 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg shadow-lg inline-block">{rankTitle}</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="text-slate-400 font-bold border-b border-slate-700/50 pb-1 truncate">Joueur</div>
                        <div className="text-slate-400 font-bold border-b border-slate-700/50 pb-1">BO 🥇</div>
                        <div className="text-slate-400 font-bold border-b border-slate-700/50 pb-1">LDC 🏆</div>
                        <div className="text-slate-400 font-bold border-b border-slate-700/50 pb-1">CM 🌎</div>
                        
                        <div className="text-emerald-400 font-black py-1.5 truncate">{player.name.split(' ').pop()}</div>
                        <div className="text-emerald-400 font-black py-1.5">{boCount}</div>
                        <div className="text-emerald-400 font-black py-1.5">{ldcCount}</div>
                        <div className="text-emerald-400 font-black py-1.5">{cmCount}</div>
                        
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">Messi</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">8</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">4</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">1</div>
                        
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">C. Ronaldo</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">5</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">5</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">0</div>
                        
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">Pelé</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">0</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">0</div>
                        <div className="text-slate-300 py-1 border-t border-slate-700/30">3</div>
                      </div>
                    </div>
                  );
                })()}

                {player.careerHistory && player.careerHistory.length > 0 && (
                  <details className="w-full bg-slate-800/70 rounded-2xl border border-slate-700/60 mt-4 group">
                    <summary className="p-4 heading-typography font-bold text-slate-200 uppercase tracking-wider text-xs cursor-pointer list-none flex justify-between items-center hover:text-white transition-colors">
                      <span className="flex items-center gap-2"><span>📜</span> Historique Saison par Saison</span>
                      <span className="transition-transform group-open:rotate-180 text-amber-400">▼</span>
                    </summary>
                    <div className="overflow-x-auto px-4 pb-4 pt-0">
                      <table className="w-full text-xs text-left">
                        <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/80 rounded-lg">
                          <tr>
                            <th className="px-3 py-2">Saison</th>
                            <th className="px-3 py-2">Club</th>
                            <th className="px-3 py-2">GEN</th>
                            <th className="px-3 py-2">Buts</th>
                            <th className="px-3 py-2">Passes</th>
                            <th className="px-3 py-2">Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {player.careerHistory.map((season, i) => (
                            <tr key={i} className="border-b border-slate-700/40 last:border-0 hover:bg-slate-700/30 transition-colors">
                              <td className="px-3 py-2 font-medium text-slate-200">{season.year} <span className="text-[10px] text-slate-400">({season.age} ans)</span></td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-white">{season.club}</span>
                                  {season.origin && <FlagIcon code={season.origin} className="w-3.5 h-2.5 rounded-sm shadow-sm" />}
                                </div>
                                <div className="text-[9px] text-slate-400 uppercase">{season.league}</div>
                              </td>
                              <td className="px-3 py-2 font-black text-amber-400">{season.ovr}</td>
                              <td className="px-3 py-2 font-bold text-slate-200">{season.goals}</td>
                              <td className="px-3 py-2 font-bold text-slate-200">{season.assists}</td>
                              <td className="px-3 py-2 font-bold text-slate-200">{season.rating}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                )}

                
                {/* Multiplayer Versus Result */}
                {multiplayerContext && opponent && (
                  <div className="w-full bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/50 mt-4 shadow-inner text-center">
                    <h3 className="heading-typography font-bold text-cyan-400 uppercase tracking-wider mb-3 text-xs flex items-center justify-center gap-1.5">
                      <span>⚔️</span> Résultat du Face-à-Face
                    </h3>
                    {!opponent.isRetired ? (
                      <p className="text-slate-400 text-sm animate-pulse">En attente de la fin de carrière de {opponent.name}...</p>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex justify-between w-full items-center px-4">
                          <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{player.name}</p>
                            <p className="text-xl md:text-2xl font-black text-amber-400">{gameState.score ? gameState.score.totalScore : (player.bankBalance ? player.bankBalance : 0)} pts</p>
                          </div>
                          <div className="text-2xl font-black text-slate-600">VS</div>
                          <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{opponent.name}</p>
                            <p className="text-xl md:text-2xl font-black text-cyan-400">{opponent.finalScore || 0} pts</p>
                          </div>
                        </div>
                        {(() => {
                          const myScore = gameState.score ? gameState.score.totalScore : 0; // Wait, how to get my score? Let's assume it's calculated before. Actually, we should import calculateCareerScore but let's just use what we have. I will use gameState.finalScore if available, else 0.
                          const opScore = opponent.finalScore || 0;
                          if (myScore > opScore) return <div className="text-emerald-400 font-black text-xl md:text-2xl uppercase tracking-widest mt-2">Victoire ! 🏆</div>;
                          if (myScore < opScore) return <div className="text-rose-500 font-black text-xl md:text-2xl uppercase tracking-widest mt-2">Défaite... ❌</div>;
                          return <div className="text-slate-300 font-black text-xl md:text-2xl uppercase tracking-widest mt-2">Égalité 🤝</div>;
                        })()}
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={() => { playSound('click'); onRestartGame(); }} 
                  className="mt-6 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl font-black text-sm md:text-base uppercase tracking-wider transition-all shadow-xl active:scale-95"
                >
                  Retour au Menu Principal 🏠
                </button>
              </div>
            );
          })()}
        </div>
      ) : !club ? (
        <div className="app-typography min-h-[100dvh] text-slate-200 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-4xl w-full z-10 flex flex-col justify-center py-8">
            <div className="text-center mb-2 md:mb-8 shrink-0">
              <h1 className="heading-typography text-xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                Choisissez votre premier club
              </h1>
              <p className="text-[10px] md:text-sm text-slate-300 font-normal mt-1 md:mt-2">
                Démarrez votre carrière professionnelle
              </p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 min-h-0 shrink">
              {clubOffers.map((offer) => {
                const offerTheme = getTheme(offer.primary, offer.secondary);
                return (
                  <div 
                    key={offer.id} 
                    className="bg-slate-800 border-2 rounded-xl md:rounded-2xl p-2 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch shadow-2xl transition-all duration-300 hover:scale-[1.02] flex-1 min-h-0 gap-2 md:gap-0"
                    style={{ borderColor: offerTheme.accent }}
                  >
                    <div className="min-h-0 overflow-hidden flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-3">
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow border border-black/15" style={{ backgroundColor: offer.primary }} />
                        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow border border-black/15" style={{ backgroundColor: offer.secondary }} />
                        <div className="scale-75 md:scale-100 origin-left"><LeagueLabel club={offer} /></div>
                      </div>
                      <h3 className="heading-typography text-sm md:text-xl font-bold text-slate-200 truncate">{offer.name}</h3>
                      <p className="hidden md:block text-[9px] md:text-xs text-slate-400 mt-0.5 md:mt-1.5 font-normal leading-tight line-clamp-2">{offer.desc.replace(/^[^-]+-\s*/, '')}</p>
                    </div>
                    <button 
                      onClick={() => { playSound('click'); onChooseClub(offer); }} 
                      className="heading-typography md:mt-6 py-2 px-3 md:py-3 md:px-4 rounded-lg md:rounded-xl font-semibold text-[9px] md:text-xs text-white shadow-md transition-transform active:scale-95 hover:brightness-110 tracking-wider uppercase shrink-0"
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
        <div className="app-typography h-[100dvh] text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-hidden" style={clubBackgroundStyle}>

      {multiplayerContext && opponent && !isRetired && (
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-slate-900/90 border border-cyan-500/50 p-2 md:p-3 rounded-xl shadow-lg z-50 text-xs text-white backdrop-blur-md">
          <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider mb-1">Rival en ligne</p>
          <p className="font-semibold">{opponent.name}</p>
          <p className="text-slate-300">OVR: <span className="text-amber-400 font-bold">{opponent.ovr || '?'}</span> | {opponent.club || 'Sans club'}</p>
          <p className="text-[9px] text-slate-400 mt-1">
            {opponent.isRetired ? 'Carrière terminée' : (opponent.readyForNextSeason ? 'Attente de votre fin de saison...' : `Saison ${opponent.season || 'en cours'}`)}
          </p>
        </div>
      )}

          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-3xl w-full bg-slate-900/95 border border-slate-700/50 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-7 shadow-2xl z-10 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center h-[95%] md:h-auto overflow-hidden">
            
            <div className="flex flex-col items-center scale-[0.55] md:scale-100 origin-center -mt-24 md:mt-0 shrink-0">
              <PlayerCard player={player} club={club} cardType={cardStyle} />
            </div>

            <div className="flex-1 space-y-2 md:space-y-5 w-full flex flex-col min-h-0 shrink -mt-16 md:mt-0">
              <div className="shrink-0 text-center md:text-left">
                <span className="heading-typography text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm bg-slate-900 text-white">
                  Bilan de la Saison {season} • {club.name}
                </span>
                <h3 className="heading-typography text-lg md:text-2xl font-bold text-white mt-1 md:mt-4 leading-snug">{seasonStats.headline}</h3>
                {player.injuryDuration > 0 && (
                  <p className="text-xs font-medium text-rose-600 mt-2">🚑 Vous avez manqué quelques semaines pour cause de blessure.</p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-3">
                <div className="bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Matchs</span>
                  <span className="heading-typography text-lg font-bold text-white mt-0.5 block">{seasonStats.matches}</span>
                </div>
                
                {isGoalkeeper ? (
                  <div className="bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Clean Sheets</span>
                    <span className="heading-typography text-lg font-bold text-emerald-400 mt-0.5 block">{seasonStats.cleanSheets}</span>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Buts</span>
                      <span className="heading-typography text-lg font-bold text-emerald-400 mt-0.5 block">{seasonStats.goals}</span>
                    </div>
                    <div className="bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Passes D.</span>
                      <span className="heading-typography text-lg font-bold text-cyan-400 mt-0.5 block">{seasonStats.assists}</span>
                    </div>
                  </>
                )}

                <div className="bg-slate-800/80 p-1.5 md:p-3 rounded-2xl border border-slate-700/50 text-center shadow-inner">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Note Moy.</span>
                  <span className="heading-typography text-lg font-bold text-amber-400 mt-0.5 block">{seasonStats.rating}</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-2 md:p-3.5 rounded-2xl border border-slate-700/50 space-y-0.5 md:space-y-1 shadow-inner text-xs overflow-y-auto">
                <p className="font-medium text-slate-100">📢 {seasonStats.promotionRelegationText}</p>
                <p className="text-slate-400">Classement final : <span className="heading-typography text-amber-400 font-semibold">{seasonStats.leaguePosition}e</span> | Gains : <span className="heading-typography text-emerald-400 font-semibold">+{seasonStats.earnings} M€</span></p>
                {seasonStats.ballonDorRank && (
                  <p className="text-slate-300 font-semibold mt-1">🌟 {seasonStats.ballonDorRank === 1 ? 'Vainqueur du Ballon d\'Or !' : `${seasonStats.ballonDorRank}ème au classement du Ballon d'Or`}</p>
                )}
              </div>

              
              {seasonStats.tournaments && (
                <div className="bg-slate-800/80 p-2 md:p-3.5 rounded-2xl border border-slate-700/50 shadow-inner text-xs space-y-1 md:space-y-1.5 hidden md:block">
                  <p className="font-bold text-slate-100 mb-1 uppercase tracking-wider text-[10px]">Tournois Disputés</p>
                  {seasonStats.tournaments.worldCup && <p className="text-slate-200">🌍 Coupe du Monde : <span className="font-semibold">{seasonStats.tournaments.worldCup.stage}</span></p>}
                  {seasonStats.tournaments.euro && <p className="text-slate-200">🇪🇺 Euro : <span className="font-semibold">{seasonStats.tournaments.euro.stage}</span></p>}
                  {seasonStats.tournaments.championsLeague && <p className="text-slate-200">⭐ Ligue des Champions : <span className="font-semibold">{seasonStats.tournaments.championsLeague.stage}</span></p>}
                  {seasonStats.tournaments.domesticCup && <p className="text-slate-200">🏆 Coupe Nationale : <span className="font-semibold">{seasonStats.tournaments.domesticCup.stage}</span></p>}
                </div>
              )}

              {seasonStats.statGains && Object.keys(seasonStats.statGains).length > 0 && (
                <div className="bg-slate-800/80 p-2 md:p-4 rounded-2xl border border-slate-700/50 shadow-inner text-xs space-y-1.5 md:space-y-3 mt-1.5 md:mt-4">
                  <p className="font-bold text-slate-100 mb-1 md:mb-2 uppercase tracking-wider text-[10px] md:text-[11px] border-b border-slate-700 pb-1 md:pb-2">Bilan de Progression Physique & Technique</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(seasonStats.statGains).map(([attr, gain]) => {
                      const labels = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique' };
                      const newVal = Math.floor(player.attributes[attr]);
                      const oldVal = Math.floor(player.attributes[attr] - gain);
                      const displayGain = newVal - oldVal;
                      
                      if (displayGain === 0) return null;
                      
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
                  className="heading-typography flex-1 py-2.5 md:py-3.5 font-semibold text-white rounded-2xl shadow-lg transition-transform active:scale-95 hover:brightness-110 tracking-wider uppercase text-xs"
                  style={{ backgroundColor: theme.btnBg }}
                >
                  Continuer vers le Mercato 🚀
                </button>
                {player.age >= 31 && (
                  <button 
                    onClick={() => { playSound('click'); if(window.confirm('Voulez-vous vraiment prendre votre retraite ?')) onRetire(); }} 
                    className="heading-typography flex-shrink-0 px-4 md:px-5 py-2.5 md:py-3.5 font-semibold text-white bg-rose-600 rounded-2xl shadow-lg transition-transform active:scale-95 hover:bg-rose-500 tracking-wider uppercase text-xs"
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
          <div className="max-w-3xl w-full bg-slate-900/90 border-2 border-rose-500/50 rounded-3xl p-4 md:p-8 shadow-2xl z-10 text-white relative">
            {gameState.interactiveMatchFinalOutcome ? (
               <div className="bg-slate-900 border border-slate-700/50 p-6 md:p-8 rounded-2xl text-center shadow-inner space-y-6">
                 <h3 className={`heading-typography text-3xl md:text-4xl font-black uppercase tracking-wider ${gameState.interactiveMatchFinalOutcome === 'win' ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {gameState.interactiveMatchFinalOutcome === 'win' ? 'Victoire !' : 'Défaite...'}
                 </h3>
                 <p className="text-slate-300 text-sm md:text-base leading-relaxed">
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
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                  {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.time}
                </span>
                <span className="bg-slate-800 text-amber-400 border border-amber-500/50 text-sm font-bold px-4 py-1 rounded-full tracking-widest">
                  SCORE DU MATCH : {interactiveMatchScore > 0 ? `+${interactiveMatchScore}` : interactiveMatchScore}
                </span>
              </div>
              <h2 className="text-3xl font-black mt-4">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.title}</h2>
              <p className="text-slate-200 mt-2">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.description}</p>
            </div>

            {interactiveMatchResult ? (
               <div className="bg-slate-900 border border-slate-700/80 p-6 md:p-8 rounded-2xl text-center space-y-6 shadow-2xl backdrop-blur-md">
                 <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-wider ${interactiveMatchResult.success ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}>
                   {interactiveMatchResult.success ? 'RÉUSSI !' : 'ÉCHEC...'}
                 </h3>
                 <p className="text-base md:text-lg text-slate-200 font-semibold leading-relaxed">{interactiveMatchResult.narrative}</p>
                 <button onClick={() => { playSound('click'); onContinueFromInteractiveMatch(); }} className="w-full py-3.5 md:py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl font-bold text-base md:text-lg uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30">
                   {interactiveMatchCurrentPhaseIndex < 2 ? 'Phase Suivante ➡️' : 'Fin du Match 🏁'}
                 </button>
               </div>
            ) : (
               <div className="space-y-4">
                 {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.options.map((opt, idx) => {
                   const statLabels = { pace: 'Vitesse', finishing: 'Tir', passing: 'Passe', dribbling: 'Dribble', defense: 'Défense', physical: 'Physique' };
                   return (
                   <button key={idx} onClick={() => { playSound('click'); onPlayInteractiveMatch(idx); }} className="w-full text-left p-3 md:p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-slate-700 transition-all duration-150 flex items-center justify-between group shadow-sm">
                     <span className="font-semibold text-[10px] md:text-sm text-white">{opt.text}</span>
                     <span className="text-slate-400 group-hover:text-emerald-500 text-[9px] md:text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-transform group-hover:translate-x-1">Test {statLabels[opt.stat] || opt.stat}</span>
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
               <p className="text-slate-500 mt-2">Choisissez un nouveau talent (Perk) pour récompenser votre progression.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PERKS_LIST.filter(p => !player.perks.includes(p.id) && (!p.roles || p.roles.some(r => (player.position || '').toUpperCase().includes(r)))).map(perk => (
                  <button key={perk.id} onClick={() => onSelectPerk(perk.id)} className="p-5 border-2 border-amber-200 bg-amber-50 rounded-2xl hover:bg-amber-100 hover:scale-105 transition-transform flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{perk.icon}</span>
                    <h4 className="font-bold text-slate-900">{perk.name}</h4>
                    <p className="text-xs text-slate-400 mt-2">{perk.desc}</p>
                  </button>
                ))}
             </div>
           </div>
        </div>
      ) : transferMarketOffers && transferMarketOffers.length > 0 ? (
        <div className="app-typography min-h-[100dvh] text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center relative overflow-y-auto" style={clubBackgroundStyle}>
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-4xl w-full flex flex-col z-10 justify-center py-8">
            <div className="text-center shrink-0 mb-2 md:mb-6">
              <h2 className="heading-typography text-2xl md:text-4xl font-black text-white uppercase tracking-tight drop-shadow-md">Marché des Transferts</h2>
              <p className="text-[10px] md:text-sm text-slate-200 font-medium mt-1 md:mt-2">Ces clubs veulent s'attacher vos services !</p>
            </div>
            
            <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-5 min-h-0 shrink">
              {transferMarketOffers.map((offer) => {
                const offerTheme = getTheme(offer.primary, offer.secondary);
                return (
                  <div 
                    key={offer.id} 
                    className="bg-slate-800 rounded-xl md:rounded-3xl p-2 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch shadow-xl border-2 md:border-4 transition-all duration-300 hover:scale-[1.02] flex-1 min-h-0 gap-2 md:gap-0"
                    style={{ borderColor: offerTheme.accent }}
                  >
                    <div className="min-h-0 overflow-hidden flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-3">
                        <span className="w-3 h-3 md:w-5 md:h-5 rounded-full shadow border border-slate-200" style={{ backgroundColor: offer.primary }} />
                        <span className="w-3 h-3 md:w-5 md:h-5 rounded-full shadow border border-slate-200" style={{ backgroundColor: offer.secondary }} />
                        <div className="scale-75 md:scale-100 origin-left"><LeagueLabel club={offer} /></div>
                      </div>
                      <h4 className="heading-typography text-sm md:text-lg font-bold text-white truncate">{offer.name}</h4>
                      <p className="hidden md:block text-[9px] md:text-xs text-slate-400 mt-0.5 md:mt-1 font-normal leading-tight line-clamp-2">{offer.desc.replace(/^[^-]+-\s*/, '')}</p>
                    </div>
                    {player.challenge !== 'one_club' ? (
                      <button 
                        onClick={() => { playSound('click'); setSelectedOfferClub(offer); }} 
                        className="heading-typography md:mt-6 py-2 px-3 md:py-3 md:px-4 rounded-lg md:rounded-xl font-semibold text-[9px] md:text-xs uppercase tracking-wider text-white bg-emerald-600 shadow-md hover:bg-amber-500 transition-colors shrink-0"
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
                className="heading-typography py-3 px-6 md:py-4 md:px-8 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider text-slate-300 bg-slate-800 border-2 border-slate-700 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
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
        /* DASHBOARD PRINCIPAL EN SAISON */
        <div 
          className="app-typography min-h-[100dvh] text-slate-900 p-1 md:p-4 pb-20 md:pb-4 relative overflow-y-auto overflow-x-hidden transition-all duration-700"
          style={clubBackgroundStyle}
        >
          <div className="absolute inset-0 bg-football-pattern pointer-events-none opacity-10"></div>
          <div className="max-w-5xl mx-auto space-y-1.5 md:space-y-4 relative z-10">
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-1.5 md:mb-4">
              <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 px-3 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center">
                <p className="heading-typography font-bold text-slate-300 text-[10px] md:text-sm tracking-widest uppercase">
                  Âge <span className="text-white ml-1 mr-1 md:mr-3">{player.age} ans</span>
                  <span className="text-slate-600 mx-1">|</span>
                  <span className="md:hidden text-amber-400 mx-1">OVR {player.ovr}</span>
                  <span className="md:hidden text-slate-600 mx-1">|</span>
                  <span className="hidden md:inline text-slate-600 mx-1">|</span>
                  <span className="md:ml-3 text-slate-400">Année</span> <span className="text-white ml-1">{player.currentYear || 2024}</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              
              {/* ONGLET : JOUEUR (CARTE & STATS) */}
              <div className={`${activeMobileTab !== 'joueur' ? 'hidden md:flex' : 'flex'} flex-col space-y-4 lg:col-span-1`}>
                {/* BLOC CARTE FUT DU JOUEUR */}
                <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit">
                  <button onClick={() => window.print()} className="w-full mb-2 text-xs font-bold uppercase tracking-wider bg-slate-800 text-white py-1.5 rounded-xl shadow-md hover:bg-slate-700 transition-colors">📸 Exporter ma Carte</button>
                  <PlayerCard player={player} club={club} cardType="auto" />
                </div>
                <div className="hidden md:block">
                  {/* STATS DÉTAILLÉES (Toujours visible sur desktop) */}
                  <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 shadow-2xl">
                    <div className="heading-typography text-[9px] font-bold text-slate-300 uppercase tracking-wider flex items-center mb-3">
                      <span className="flex items-center gap-1.5">📊 Stats Détaillées</span>
                    </div>
                    <div className="border-t border-slate-700/50 pt-3 grid grid-cols-2 gap-1.5">
                      {['pace', 'dribbling', 'finishing', 'defense', 'passing', 'physical'].map((attr) => {
                        const val = Math.floor(player.attributes?.[attr] || 0);
                        const eff = Math.floor(effectiveStats[attr] || val);
                        const diff = eff - val;
                        return (
                          <div key={attr} className="bg-slate-800 px-2 py-1.5 rounded-md border border-slate-700/50 flex justify-between items-center shadow-sm">
                            <span className="text-[9px] text-slate-400 capitalize font-medium">{statLabels[attr] || attr}</span>
                            <div className="flex items-center gap-1">
                              <span className="heading-typography font-bold text-[10px] text-slate-100">{val}</span>
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
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 shadow-2xl">
                  <button onClick={() => setIsTrophiesOpen(!isTrophiesOpen)} className="w-full heading-typography text-[10px] font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center bg-slate-800 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">🏆 Vitrine à Trophées</span>
                    <span className="text-amber-500 text-sm">{isTrophiesOpen ? '▲' : '▼'}</span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isTrophiesOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="space-y-3 pt-2 border-t border-slate-700/50">
                      <div>
                        <h4 className="heading-typography text-[8px] font-bold text-emerald-500 uppercase tracking-wider mb-1.5">🛡️ Collectifs</h4>
                        {collectiveTrophies.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {collectiveTrophies.map((trophy, idx) => (
                              <span key={`col-${idx}`} className="bg-emerald-900/40 border border-emerald-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                <span className="text-[10px]">{trophy.icon}</span>
                                <span className="heading-typography text-[8px] text-emerald-400 font-semibold">{trophy.text}</span>
                                {trophy.count > 1 && <span className="heading-typography font-black text-emerald-500 text-[8px]">×{trophy.count}</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[8px] text-slate-500 italic mb-2">Aucun trophée collectif.</p>
                        )}
                      </div>

                      <div>
                        <h4 className="heading-typography text-[8px] font-bold text-amber-500 uppercase tracking-wider mb-1.5">🏅 Individuels</h4>
                        {individualTrophies.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {individualTrophies.map((trophy, idx) => (
                              <span key={`ind-${idx}`} className="bg-amber-900/40 border border-amber-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                <span className="text-[10px]">{trophy.icon}</span>
                                <span className="heading-typography text-[8px] text-amber-400 font-semibold">{trophy.text}</span>
                                {trophy.count > 1 && <span className="heading-typography font-black text-amber-500 text-[8px]">×{trophy.count}</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[8px] text-slate-500 italic">Aucune distinction individuelle.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
<div className="block md:hidden">
{/* GRAPH VALEUR MARCHANDE */}
                {player.valueHistory && player.valueHistory.length > 0 && (
                  <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit relative">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="heading-typography text-sm font-bold text-slate-100 uppercase tracking-wider">Valeur Marchande</h3>
                      <span className="text-emerald-600 font-black text-xl leading-none">
                        {(player.valueHistory[player.valueHistory.length - 1].value / 1000000).toFixed(1)} M€
                      </span>
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={player.valueHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                          <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#94a3b8' }} 
                            tickLine={false} 
                            axisLine={false}
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
              <div className={`${activeMobileTab !== 'terrain' ? 'hidden md:flex' : 'flex'} lg:col-span-2 flex-col space-y-4`}>
                
                {/* TERRAIN / EVENTS EN HAUT */}

                {/* ROW: CLUB & GAUGES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Club Actuel - DESKTOP */}
                  <div className="hidden md:flex bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex-col justify-between gap-4 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate">
                        <span className="heading-typography text-sm font-black text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto relative z-10">
                      {/* Statut */}
                      <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl shadow-sm">
                        <span className="heading-typography text-[9px] font-bold uppercase tracking-widest text-amber-400 leading-none text-center">
                          {player.statusText}
                        </span>
                        {player.nationalStatus === 'CAPITAINE' && (
                          <span className="heading-typography text-[8px] font-bold uppercase tracking-widest text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        )}
                      </div>
                      {/* Solde */}
                      <div className="flex-1 flex flex-col gap-1">
                        {player.sponsor && player.sponsor !== 'Aucun' && (
                          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-2 py-0.5 rounded-lg text-center shadow-sm">
                            <span className="heading-typography text-[7px] md:text-[8px] font-black uppercase text-amber-400 tracking-wider">
                              ⭐ {player.sponsor}
                            </span>
                          </div>
                        )}
                        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-3 py-2 rounded-xl flex items-center justify-center shadow-lg border border-emerald-300">

                        <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                        <span className="heading-typography text-[11px] font-black text-white drop-shadow-md z-10 tracking-wide">
                          {bankBalance.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  {/* Club Actuel - MOBILE */}
                  <div className="flex md:hidden bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-2xl items-center justify-between gap-2 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2">
                      <div className="w-16 h-16 rounded-full blur-xl" style={{ background: `linear-gradient(135deg, ${club.primary} 0%, ${club.secondary} 100%)` }} />
                    </div>
                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-lg border-2 border-slate-800" style={{ backgroundColor: club.secondary }} />
                      </div>
                      <div className="truncate">
                        <span className="heading-typography text-sm font-black text-white block truncate tracking-wide">{club.name}</span>
                        <LeagueLabel club={club} />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 relative z-10 flex-shrink-0">
                      {/* Statut */}
                      <div className="flex flex-col gap-1 items-end justify-center">
                        <span className="heading-typography text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-amber-400 leading-none text-right">
                          {player.statusText}
                        </span>
                        {player.nationalStatus === 'CAPITAINE' && (
                          <span className="heading-typography text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-white bg-amber-600 px-1.5 py-0.5 rounded shadow-sm">
                            © Capitaine
                          </span>
                        )}
                      </div>
                      {/* Solde */}
                      <div className="flex flex-col gap-1 items-end justify-center w-full">
                        {player.sponsor && player.sponsor !== 'Aucun' && (
                          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-1.5 py-0.5 rounded text-center shadow-sm w-full">
                            <span className="heading-typography text-[7px] font-black uppercase text-amber-400 tracking-wider block">
                              ⭐ {player.sponsor}
                            </span>
                          </div>
                        )}
                        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 px-2 py-1 rounded-md flex items-center justify-center shadow-lg border border-emerald-300 w-full">

                        <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                        <span className="heading-typography text-[9px] sm:text-[10px] font-black text-white drop-shadow-md z-10 tracking-wide">
                          {bankBalance.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  {/* Gauges (États) */}
                  <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 shadow-2xl flex flex-col justify-center h-full">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-400">
                          <span>Forme physique</span>
                          <span className={player.form < 30 ? 'text-rose-500 font-bold' : 'text-white font-semibold'}>{player.form}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                          <div className={`${player.form < 30 ? 'bg-rose-500' : 'bg-amber-500'} h-full rounded-full transition-all shadow-sm`} style={{ width: `${player.form}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-400">
                          <span>Moral</span>
                          <span className="text-white font-semibold">{player.morale}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                          <div className="bg-cyan-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.morale}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] md:text-[10px] mb-0.5 font-medium text-slate-400">
                          <span>Confiance Coach</span>
                          <span className="text-white font-semibold">{player.coachTrust}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                          <div className="bg-purple-500 h-full rounded-full transition-all shadow-sm" style={{ width: `${player.coachTrust}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { playSound('click'); setIsShopOpen(true); }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3 md:py-4 px-4 rounded-2xl shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2 border border-emerald-400/50"
                >
                  <span className="text-lg md:text-xl">💎</span>
                  <span className="heading-typography text-[10px] md:text-xs tracking-widest uppercase">Boutique d'Investissements</span>
                  <span className="bg-slate-900/50 px-2 py-1 rounded-md text-[10px] font-black ml-2 shadow-inner">
                    {bankBalance.toLocaleString('fr-FR')} €
                  </span>
                </button>

                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit">
                  <div>
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <span className="heading-typography text-[9px] md:text-[10px] font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg uppercase tracking-wider shadow-sm bg-rose-500 text-white">
                        {formatEventCategory(currentEvent?.category)}
                      </span>
                      <span className="heading-typography text-[10px] md:text-[11px] font-semibold text-slate-400">Étape {eventStep} / {totalEvents}</span>
                    </div>
                    <h3 className="heading-typography text-sm md:text-xl font-bold text-white mb-2 leading-snug">{currentEvent?.description}</h3>
                  </div>

                  {activeOutcome ? (
                    <div className="my-2 md:my-4 sticky bottom-16 md:static z-20 bg-slate-100/95 md:bg-slate-100/80 p-3 md:p-4 rounded-xl border border-slate-200/80 space-y-3 shadow-xl md:shadow-inner">
                      <p className="text-xs md:text-sm text-slate-800 font-normal leading-relaxed">✨ {activeOutcome.narrative}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeOutcome.effects?.map((eff, i) => (
                          <span key={i} className={`heading-typography text-[9px] md:text-[10px] font-semibold px-2 py-1 rounded-lg border shadow-sm flex items-center gap-1 ${
                            eff.isBoosted
                              ? 'bg-violet-100 text-violet-900 border-violet-400'
                              : eff.style === 'positive' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}>
                            {eff.isBoosted && <span className="opacity-80">⚡</span>}
                            {eff.text}
                          </span>
                        ))}

                      </div>
                      {activeOutcome.ageBoostApplied && (
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
                        className="heading-typography w-full py-2 md:py-2.5 font-semibold text-white uppercase text-[10px] tracking-wider rounded-xl mt-2 shadow-lg transition-transform active:scale-95 hover:brightness-110"
                        style={{ backgroundColor: theme.btnBg }}
                      >
                        Continuer la saison ➡️
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 my-2 md:my-3 sticky bottom-14 md:static z-20 bg-slate-900 md:bg-transparent p-2 md:p-0 -mx-2 md:mx-0 rounded-xl shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.5)] md:shadow-none">
                      {currentEvent?.options?.map((option, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => { playSound('click'); onSelectOption(idx); }} 
                          className="w-full text-left p-3 md:p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-slate-700 transition-all duration-150 flex items-center justify-between group shadow-sm"
                        >
                          <div className="flex items-center gap-2 md:gap-3 pr-2">
                            <span className="heading-typography text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-slate-950 text-emerald-400 shadow-sm flex-shrink-0">{option.typeTag}</span>
                            <span className="font-semibold text-[10px] md:text-sm text-white leading-tight">{option.text}</span>
                          </div>
                          <span className="text-slate-400 group-hover:text-emerald-500 text-[10px] md:text-xs transition-transform group-hover:translate-x-1 flex-shrink-0">➔</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden md:block">
{/* GRAPH VALEUR MARCHANDE */}
                {player.valueHistory && player.valueHistory.length > 0 && (
                  <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col h-fit relative">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="heading-typography text-sm font-bold text-slate-100 uppercase tracking-wider">Valeur Marchande</h3>
                      <span className="text-emerald-600 font-black text-xl leading-none">
                        {(player.valueHistory[player.valueHistory.length - 1].value / 1000000).toFixed(1)} M€
                      </span>
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={player.valueHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                          <XAxis dataKey="age" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                          <YAxis 
                            tick={{ fontSize: 10, fill: '#94a3b8' }} 
                            tickLine={false} 
                            axisLine={false}
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
<div className="block md:hidden">
{/* STATS DÉTAILLÉES (Toujours visible) */}
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 shadow-2xl">
                  <button onClick={() => setIsMobileStatsOpen(!isMobileStatsOpen)} className="w-full heading-typography text-[10px] font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center mb-1 bg-slate-800 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">📊 Stats Détaillées</span>
                    <span className="text-emerald-500 text-sm">{isMobileStatsOpen ? '▲' : '▼'}</span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isMobileStatsOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="border-t border-slate-700/50 pt-3 grid grid-cols-2 gap-1.5">
                    {['pace', 'dribbling', 'finishing', 'defense', 'passing', 'physical'].map((attr) => {
                      const val = Math.floor(player.attributes?.[attr] || 0);
                      const eff = Math.floor(effectiveStats[attr] || val);
                      const diff = eff - val;
                      return (
                        <div key={attr} className="bg-slate-800 px-2 py-1.5 rounded-md border border-slate-700/50 flex justify-between items-center shadow-sm">
                          <span className="text-[9px] text-slate-400 capitalize font-medium">{statLabels[attr] || attr}</span>
                          <div className="flex items-center gap-1">
                            <span className="heading-typography font-bold text-[10px] text-slate-100">{val}</span>
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
</div>
              </div>

              {/* ONGLET : CARRIÈRE (TROPHÉES & ÉTAT) */}
              <div className={`${activeMobileTab !== 'carriere' ? 'hidden md:flex' : 'flex'} flex-col space-y-4 lg:col-span-1`}>

                {/* BLOC CARTE FUT DU RIVAL (JUSTE LA CARTE) */}
                {rival && (() => {
                  const rivalCountryId = rival.club ? rival.club.origin : 'FR';
                  return (
                    <div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit relative overflow-hidden">
                      <div className="absolute -top-4 -right-4 p-4 opacity-10 text-6xl transform rotate-12 pointer-events-none">⚔️</div>
                      <h4 className="heading-typography text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3 w-full text-center">Carte du Rival</h4>
                      <PlayerCard 
                        player={{ ...rival, origin: rivalCountryId }} 
                        club={rival.club} 
                        cardType="auto" 
                      />
                    </div>
                  );
                })()}

                {/* RIVAL INFO (sans la carte) */}
                {rival && (() => {
                  const rivalInitials = rival.name ? (() => {
                    const p = rival.name.trim().split(' ');
                    if (p.length === 1) return p[0].substring(0, 2).toUpperCase();
                    return (p[0][0] + '.' + p[p.length - 1][0]).toUpperCase();
                  })() : '??';
                  
                  const rivalCountryId = rival.club ? rival.club.origin : 'FR';
                  
                  return (
                    <div className="bg-slate-900 border border-rose-900/50 rounded-3xl p-4 shadow-2xl flex flex-col relative overflow-hidden gap-4">
                      <div className="absolute -top-4 -right-4 p-4 opacity-10 text-6xl transform rotate-12 pointer-events-none">⚔️</div>
                      <div className="w-full flex justify-between items-center px-1 relative z-10">
                        <h4 className="heading-typography text-[10px] font-black text-rose-500 uppercase tracking-widest">Rival Historique</h4>
                        {player.ovr > rival.ovr ? (
                          <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded shadow-sm">DOMINÉ</span>
                        ) : (
                          <span className="text-rose-400 text-xs font-bold bg-rose-400/10 px-2 py-0.5 rounded shadow-sm">MENAÇANT</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 relative z-10 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                         <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-inner flex-shrink-0 tracking-widest border border-slate-600">{rivalInitials}</div>
                         <div className="truncate flex-1">
                           <p className="font-black text-white text-sm leading-tight truncate">{rival.name}</p>
                           <div className="flex items-center gap-1.5 text-[10px] text-slate-400 truncate mt-1 font-medium">
                             <span>{rival.club?.name || 'Club Inconnu'}</span>
                             <span className="text-slate-600">•</span>
                             <FlagIcon code={rivalCountryId} className="w-3.5 h-2.5 rounded-[1px] shadow-sm" />
                             <span className="text-slate-600">•</span>
                             <span className="text-slate-300">GEN <span className="font-black text-rose-500 text-[11px]">{rival.ovr}</span></span>
                           </div>
                         </div>
                      </div>
                      
                      <div className="w-full flex flex-col md:flex-row items-center md:justify-around bg-slate-800/50 p-2 rounded-xl border border-slate-700 relative z-10 gap-2 md:gap-0">
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:gap-0 w-full text-left md:text-center px-4 md:px-0">
                          <span className="text-lg block w-8 md:w-auto text-center">🌟</span>
                          <span className="text-white font-bold text-sm">{rival.ballonDorCount || 0} <span className="md:hidden text-[10px] text-slate-400 font-normal ml-1">Ballons d'Or</span></span>
                        </div>
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:gap-0 w-full text-left md:text-center md:border-l md:border-slate-600 md:pl-4 border-t border-slate-600 pt-2 md:pt-0 md:border-t-0 px-4 md:px-0">
                          <span className="text-lg block w-8 md:w-auto text-center">🏆</span>
                          <span className="text-white font-bold text-sm">{rival.trophiesCount || 0} <span className="md:hidden text-[10px] text-slate-400 font-normal ml-1">Trophées</span></span>
                        </div>
                        <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:gap-0 w-full text-left md:text-center md:border-l md:border-slate-600 md:pl-4 border-t border-slate-600 pt-2 md:pt-0 md:border-t-0 px-4 md:px-0">
                          <span className="text-lg block w-8 md:w-auto text-center">⚔️</span>
                          <span className="text-white font-bold text-[10px]">
                            {gameState.rivalConfrontations?.won || 0}V - {gameState.rivalConfrontations?.drawn || 0}N - {gameState.rivalConfrontations?.lost || 0}D
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* BLOC TRAITS (PLAYSTYLES) MOVED HERE */}
                {player.traits && player.traits.length > 0 && (
                  <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-4 shadow-2xl">
                    <h4 className="heading-typography text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span>✨ Traits & Styles de Jeu</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      {player.traits.map(traitId => {
                        const trait = getTraitDetails(traitId);
                        if (!trait) return null;
                        return (
                          <div key={traitId} className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                            <span className="text-2xl drop-shadow-md">{trait.icon}</span>
                            <div>
                              <p className="heading-typography text-xs font-bold text-white uppercase">{trait.name}</p>
                              <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{trait.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* MOBILE BOTTOM NAV */}
          <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 md:hidden z-50 flex justify-around p-2 pb-safe shadow-2xl">
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
        </div>
      )}

      <LifestyleShopModal 
        isOpen={isShopOpen} 
        onClose={() => setIsShopOpen(false)} 
        bankBalance={bankBalance} 
        player={player} 
        onBuyItem={onBuyLifestyleItem} 
      />
      
    </>
  );
}

// ============================================================================
// 5. CONTRÔLEUR PRINCIPAL (APP)
// ============================================================================
