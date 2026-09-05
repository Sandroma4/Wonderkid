import React, { useState, useEffect } from 'react';
import { getOrGenerateDailyChallenges, claimChallenge } from '../utils/dailyChallenges';
import { playSound } from '../utils/audio';

export const DailyChallengesModal = ({ onClose }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    setChallenges(getOrGenerateDailyChallenges());
  }, []);

  const handleClaim = (id) => {
    const success = claimChallenge(id);
    if (success) {
      setChallenges(getOrGenerateDailyChallenges()); // refresh state to show it's claimed
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => { playSound('click'); onClose(); }}></div>
      <div className="bg-[#0F172A] border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-10 shadow-[0_0_40px_rgba(245,158,11,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center shrink-0">
          <div>
            <h2 className="heading-typography text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 uppercase tracking-tight">
              Défis Quotidiens
            </h2>
            <p className="text-slate-400 text-sm mt-1">Complétez ces défis extrêmes pour gagner des Golden Coins.</p>
          </div>
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full flex items-center justify-center transition-colors shadow-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          {challenges.map(ch => {
            const progressPct = Math.min(100, Math.round((ch.progress / ch.target) * 100));
            
            return (
              <div key={ch.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between transition-all hover:border-amber-500/50">
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">{ch.title}</h3>
                  <p className="text-sm text-slate-400">{ch.description}</p>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Progression</span>
                      <span className={ch.completed ? 'text-amber-400' : 'text-slate-400'}>
                        {ch.progress} / {ch.target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-700 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${ch.completed ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-blue-500 to-emerald-400'}`}
                        style={{ width: `${progressPct}%`, transition: 'width 0.5s ease-out' }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center justify-center md:justify-end mt-2 md:mt-0">
                  {ch.claimed ? (
                    <div className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-slate-500 font-bold text-sm uppercase flex items-center gap-2">
                      <span>✓ Réclamé</span>
                    </div>
                  ) : ch.completed ? (
                    <button 
                      onClick={() => handleClaim(ch.id)}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 rounded-xl font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <span>Réclamer</span>
                      <span className="bg-slate-900/20 px-2 py-0.5 rounded-md">{ch.reward} 💰</span>
                    </button>
                  ) : (
                    <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 font-bold text-sm flex items-center gap-2">
                      <span>Récompense : {ch.reward} 💰</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
