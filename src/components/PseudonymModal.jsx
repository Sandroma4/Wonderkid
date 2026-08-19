import { useState } from 'react';
import { savePseudonym } from '../utils/storage';

export function PseudonymModal({ onConfirm }) {
  const [pseudo, setPseudo] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const trimmed = pseudo.trim();
    if (trimmed.length < 3) {
      setError('Le pseudo doit contenir au moins 3 caractères.');
      return;
    }
    if (trimmed.length > 20) {
      setError('Le pseudo ne peut pas dépasser 20 caractères.');
      return;
    }
    savePseudonym(trimmed);
    onConfirm(trimmed);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-emerald-50 dark:bg-[#0F172A] border border-emerald-500/50 rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-sm w-[95%] shadow-[0_0_60px_rgba(16,185,129,0.3)] relative overflow-y-auto max-h-[90vh]">
        {/* Glow decor */}
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              Choisissez votre pseudo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Ce nom apparaîtra dans le <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Classement Mondial</span>.
              Choisissez-le bien — il vous représentera pour toujours.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <input
              type="text"
              value={pseudo}
              onChange={(e) => { setPseudo(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              maxLength={20}
              placeholder="Ex: xX_Striker_Xx"
              className="w-full bg-emerald-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 focus:border-emerald-500 rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white font-bold text-lg text-center outline-none transition-colors placeholder:text-slate-600"
              autoFocus
            />
            {error && (
              <p className="text-rose-600 dark:text-rose-400 text-xs font-semibold">{error}</p>
            )}
            <p className="text-slate-600 text-[10px] uppercase tracking-wider">
              {pseudo.trim().length}/20 caractères • Min. 3
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleConfirm}
            disabled={pseudo.trim().length < 3}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-800 dark:text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-900/50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-emerald-600"
          >
            Commencer l'aventure ⚽
          </button>
        </div>
      </div>
    </div>
  );
}
