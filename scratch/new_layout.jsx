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
                      <div ref={playerCardRef} className="inline-block p-2 scale-90 md:scale-100 transform origin-top" id="prime-card-wrapper">
                        <PlayerCard player={bestVersion.player} club={bestVersion.club} cardType={cardStyle} />
                      </div>
                      
                      <button
                        onClick={async () => {
                          if (!playerCardRef.current) return;
                          try {
                            const canvas = await html2canvas(playerCardRef.current, { 
                              backgroundColor: null, 
                              scale: 2,
                              logging: false,
                              onclone: (clonedDoc) => {
                                const wrapper = clonedDoc.getElementById('prime-card-wrapper');
                                if (wrapper && wrapper.firstChild) {
                                  const card = wrapper.firstChild;
                                  card.classList.remove('scale-75', 'scale-90', 'md:scale-100', 'mb-[-92px]', 'mx-[-32px]', 'md:mb-0', 'md:mx-0');
                                  card.style.transform = 'none';
                                  card.style.margin = '0';
                                }
                              }
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
                        <div className="w-full md:w-1/3 bg-slate-800/70 p-3 rounded-2xl border border-amber-500/30 shadow-inner text-center flex flex-col justify-center min-h-[80px]">
                          <h3 className="heading-typography font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 text-[10px] md:text-xs flex items-center justify-center gap-1.5">
                            <span>👑</span> Score Carrière
                          </h3>
                          <div className="text-2xl md:text-3xl font-black text-amber-500 drop-shadow-md leading-none mb-1">
                            {gameState.score?.totalScore ? gameState.score.totalScore.toLocaleString('fr-FR') : "0"}
                          </div>
                          <p className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest leading-none">Pts Légendaires</p>
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
