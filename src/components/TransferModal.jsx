import React, { useState } from 'react';
import { FlagIcon } from './FlagIcon';
import { playSound } from '../utils/audio';

export const TransferModal = ({ club, playerOvr, onAccept, onReject, onClose }) => {
  const [negotiating, setNegotiating] = useState(false);
  const [result, setResult] = useState(null);

  // Chances de base modifiées par l'OVR du joueur par rapport au tier du club
  // Tier 1 (top): dur de négocier si ovr < 85
  // Tier 2: facile si ovr > 75
  // Tier 3: très facile si ovr > 65
  const getBonusChance = () => {
    let diff = 0;
    if (club.tier === 1) diff = playerOvr - 80;
    else if (club.tier === 2) diff = playerOvr - 70;
    else diff = playerOvr - 60;
    return Math.max(-20, Math.min(30, diff));
  };

  const handleNegotiation = (type) => {
    setNegotiating(true);
    playSound('click');
    setTimeout(() => {
      let success = false;
      let newSalary = club.salary;
      let newStatus = 'Rotation';
      
      const roll = Math.random() * 100;
      const bonus = getBonusChance();

      if (type === 'prudent') {
        success = true; // 100%
        newSalary = club.salary;
        newStatus = 'Rotation';
      } else if (type === 'ambitious') {
        const chance = 70 + bonus;
        if (roll < chance) {
          success = true;
          newSalary = club.salary * 1.3;
          newStatus = 'Titulaire';
        }
      } else if (type === 'greedy') {
        const chance = 30 + bonus;
        if (roll < chance) {
          success = true;
          newSalary = club.salary * 1.8;
          newStatus = 'Star de l\'équipe';
        }
      }

      if (success) {
        playSound('success');
        setResult({ success: true, salary: newSalary, status: newStatus });
      } else {
        playSound('error');
        setResult({ success: false });
      }
      setNegotiating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-xl w-[95%] shadow-2xl relative overflow-y-auto max-h-[90vh]">
        {!negotiating && !result && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-900 dark:text-white text-xl">&times;</button>
        )}
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{club.logo}</div>
          <div>
            <h2 className="heading-typography text-2xl font-black text-slate-900 dark:text-slate-900 dark:text-white uppercase tracking-wider">{club.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <FlagIcon code={club.origin} className="w-5 h-5 rounded-sm shadow-sm" />
              <span className="text-slate-600 dark:text-slate-400 text-sm font-semibold">{club.leagueName}</span>
            </div>
          </div>
        </div>

        {result ? (
          <div className="text-center py-6">
            {result.success ? (
              <>
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="heading-typography text-xl font-bold text-emerald-400 mb-2">Accord Trouvé !</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">Vous allez signer avec un salaire de <strong className="text-amber-400">{Math.floor(result.salary).toLocaleString()} €/sem</strong> et un statut de <strong>{result.status}</strong>.</p>
                <button onClick={() => onAccept({ ...club, salary: result.salary, status: result.status })} className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-900 dark:text-slate-900 dark:text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
                  Signer le Contrat
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">🚪</div>
                <h3 className="heading-typography text-xl font-bold text-rose-500 mb-2">Négociations Rompues</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6">Vos exigences étaient trop élevées. Le club a retiré son offre.</p>
                <button onClick={() => onReject(club.id)} className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-600 text-slate-900 dark:text-slate-900 dark:text-white font-bold py-3 rounded-xl shadow-lg transition-colors">
                  Retour au Mercato
                </button>
              </>
            )}
          </div>
        ) : negotiating ? (
          <div className="text-center py-10">
            <div className="animate-spin text-4xl mb-4 inline-block text-amber-500">⏳</div>
            <p className="text-slate-700 dark:text-slate-300 font-bold animate-pulse">L'agent discute avec les dirigeants...</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">L'offre initiale est de <strong className="text-amber-400">{club.salary.toLocaleString()} €/sem</strong>. Comment souhaitez-vous aborder la négociation ?</p>
            <div className="space-y-3">
              <button onClick={() => handleNegotiation('prudent')} className="w-full flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl transition-colors text-left group">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-900 dark:text-white block group-hover:text-amber-400 transition-colors">Prudent</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Accepter l'offre de base. (Rotation)</span>
                </div>
                <span className="text-emerald-400 font-black text-sm bg-emerald-400/10 px-2 py-1 rounded">100%</span>
              </button>
              
              <button onClick={() => handleNegotiation('ambitious')} className="w-full flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl transition-colors text-left group">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-900 dark:text-white block group-hover:text-amber-400 transition-colors">Ambitieux</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Demander un meilleur salaire et être Titulaire.</span>
                </div>
                <span className="text-amber-400 font-black text-sm bg-amber-400/10 px-2 py-1 rounded">~70%</span>
              </button>
              
              <button onClick={() => handleNegotiation('greedy')} className="w-full flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl transition-colors text-left group">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-900 dark:text-white block group-hover:text-amber-400 transition-colors">Gourmand</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Exiger le max. (Star de l'équipe)</span>
                </div>
                <span className="text-rose-400 font-black text-sm bg-rose-400/10 px-2 py-1 rounded">~30%</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
