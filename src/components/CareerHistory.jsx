import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { playSound } from '../utils/audio';
import { getPseudonym } from '../utils/storage';

export const CareerHistory = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const pseudo = getPseudonym();
      if (!pseudo) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .ilike('player_name', `${pseudo}%`)
          .gte('created_at', '2026-08-12T00:00:00Z')
          .order('score', { ascending: false })
          .limit(50);
        
        if (error) throw error;
        setScores(data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération du classement :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-300 dark:bg-[#0F172A] p-6 text-slate-700 dark:text-slate-200 relative overflow-hidden font-sans flex flex-col items-center">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-10"></div>
      
      <div className="w-full max-w-3xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="text-slate-800 dark:text-white bg-white/90 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 p-3 rounded-xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 whitespace-nowrap"
          >
            ← Retour
          </button>
          <h1 className="heading-typography text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 tracking-wider">
            HISTORIQUE DES CARRIÈRES
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="bg-white/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-2xl backdrop-blur-sm min-h-[60vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-amber-500 font-bold tracking-wider uppercase text-sm">Chargement des archives...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="text-5xl mb-4">📖</span>
              <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400 font-semibold text-lg">Aucune carrière enregistrée pour le moment.</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Termine une carrière en étant connecté pour inaugurer ton historique !</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scores.map((entry, index) => {
                const isTop3 = index < 3;
                let bgClass = "bg-emerald-300/50 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700";
                let rankColor = "text-slate-500 dark:text-slate-500";
                
                if (index === 0) { bgClass = "bg-amber-900/40 border border-amber-500/30"; rankColor = "text-amber-600 dark:text-amber-400"; }
                else if (index === 1) { bgClass = "bg-slate-400/20 border border-slate-300/30"; rankColor = "text-slate-600 dark:text-slate-300"; }
                else if (index === 2) { bgClass = "bg-amber-900/20 border border-amber-700/30"; rankColor = "text-amber-600"; }

                return (
                  <div key={entry.id} className={`${bgClass} rounded-2xl p-4 flex items-center justify-between transition-colors`}>
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-black w-8 text-center ${rankColor}`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800 dark:text-white text-lg">{entry.pseudo}</p>
                          {entry.nationality && (
                            <span className="text-[10px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">{entry.nationality}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider flex items-center gap-2">
                          <span>{entry.player_name || 'Inconnu'}</span>
                          <span>•</span>
                          <span>OVR Max : <span className="text-emerald-600 dark:text-emerald-400 font-bold">{entry.ovr}</span></span>
                          {entry.major_trophies > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">🏆 {entry.major_trophies}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest mb-0.5">Score</p>
                      <p className="text-xl font-black text-amber-500 drop-shadow-sm">{entry.score.toLocaleString('fr-FR')}</p>
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
