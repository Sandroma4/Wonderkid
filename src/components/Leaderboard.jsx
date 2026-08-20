import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { playSound } from '../utils/audio';

export const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('solo');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        let query = supabase.from('leaderboard').select('*').gte('created_at', '2026-08-12T00:00:00Z');
        if (activeTab === 'solo') {
          query = query.eq('is_coop', false);
        } else if (activeTab === 'coop') {
          query = query.eq('is_coop', true);
        }
        
        const { data, error } = await query.order('score', { ascending: false }).limit(50);
        
        if (error) throw error;
        setScores(data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération du classement :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-emerald-200 dark:bg-[#0F172A] p-3 md:p-6 text-slate-700 dark:text-slate-200 relative overflow-hidden font-sans flex flex-col items-center">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-10"></div>
      
      <div className="w-full max-w-3xl relative z-10">
        <div className="flex justify-center mb-6 gap-4">
          <button onClick={() => setActiveTab('solo')} className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${activeTab === 'solo' ? 'bg-amber-500 text-white shadow-lg scale-105' : 'bg-white/50 text-slate-600 hover:bg-white/80'}`}>Solo</button>
          <button onClick={() => setActiveTab('coop')} className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${activeTab === 'coop' ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-white/50 text-slate-600 hover:bg-white/80'}`}>Coop</button>
        </div>
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap"
          >
            ← Retour
          </button>
          <h1 className="heading-typography text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 tracking-wider">
            CLASSEMENT
          </h1>
          <div className="w-10 md:w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-2xl backdrop-blur-sm min-h-[60vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-amber-500 font-bold tracking-wider uppercase text-sm">Chargement des légendes...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="text-5xl mb-4">🏆</span>
              <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400 font-semibold text-lg">Aucun score enregistré pour le moment.</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Termine une carrière en étant connecté pour inaugurer le classement !</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scores.map((entry, index) => {
                const isTop3 = index < 3;
                let bgClass = "bg-emerald-200/50 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700";
                let rankColor = "text-slate-500 dark:text-slate-500";
                
                if (index === 0) { bgClass = "bg-amber-900/40 border border-amber-500/30"; rankColor = "text-amber-600 dark:text-amber-400"; }
                else if (index === 1) { bgClass = "bg-slate-400/20 border border-slate-300/30"; rankColor = "text-slate-600 dark:text-slate-300"; }
                else if (index === 2) { bgClass = "bg-amber-900/20 border border-amber-700/30"; rankColor = "text-amber-600"; }

                return (
                  <div key={entry.id} className={`${bgClass} rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-between transition-colors`}>
                    <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
                      <div className={`text-lg md:text-2xl font-black w-6 md:w-8 text-center shrink-0 ${rankColor}`}>
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 md:gap-2 truncate">
                          <p className="font-bold text-slate-800 dark:text-white text-sm md:text-lg truncate">{entry.pseudo || entry.player_name || 'Inconnu'}</p>
                          {entry.nationality && (
                            <span className="text-[9px] md:text-[10px] bg-white dark:bg-slate-800 px-1 md:px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 shrink-0">{entry.nationality}</span>
                          )}
                          {entry.position && (
                            <span className="text-[9px] md:text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-1 md:px-1.5 py-0.5 rounded border border-emerald-300/50 dark:border-emerald-700/50 shrink-0">{entry.position}</span>
                          )}
                        </div>
                        <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1 md:gap-2 truncate">
                          <span className="truncate">{entry.pseudo ? entry.player_name : 'Carrière'}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">OVR: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{entry.ovr}</span></span>
                          {entry.ballon_dor > 0 && (
                            <span className="hidden md:flex items-center gap-1 text-amber-500">
                              • 🌕 x{entry.ballon_dor}
                            </span>
                          )}
                          {entry.major_trophies > 0 && (
                            <span className="hidden md:flex items-center gap-1">
                              • 🏆 {entry.major_trophies}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mb-0.5">Score</p>
                      <p className="text-sm md:text-xl font-black text-amber-500 drop-shadow-sm">{entry.score.toLocaleString('fr-FR')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
