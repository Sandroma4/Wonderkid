import { useState, useEffect } from 'react';
import { FlagIcon } from './FlagIcon';
import { playSound } from '../utils/audio';
import { COUNTRIES, GENDERS, ORIGINS_BACKGROUNDS, POSITIONS_DATA, LIFESTYLES, CHALLENGES_LIST, getRandomName, generateYoungPlayerStats, calculateOVR } from '../utils/gameData';
import { supabase } from '../supabaseClient';


const CONTINENTS = {
  'Europe': ['DE', 'EN', 'BE', 'HR', 'DK', 'SCO', 'ES', 'FR', 'GR', 'IT', 'NO', 'NL', 'PL', 'PT', 'CH', 'TR'],
  'Afrique': ['ZA', 'DZ', 'CV', 'CI', 'EG', 'GH', 'MA', 'NG', 'CD', 'SN', 'TN'],
  'Amérique': ['AR', 'BR', 'CO', 'EC', 'US', 'MX', 'UY'],
  'Asie & Océanie': ['SA', 'AU', 'KR', 'AE', 'IQ', 'IR', 'JP', 'JO', 'UZ', 'PS', 'QA']
};

const getContinentForCountry = (countryId) => {
  for (const [continent, countries] of Object.entries(CONTINENTS)) {
    if (countries.includes(countryId)) return continent;
  }
  return 'Europe';
};

export function CharacterCreation({ onStartGame, multiplayerContext }) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [country, setCountry] = useState(COUNTRIES.find(c => c.id === 'FR') || COUNTRIES[0]);
  const [activeContinent, setActiveContinent] = useState('Europe');
  const [gender, setGender] = useState(GENDERS[0]);
  const [playerName, setPlayerName] = useState(getRandomName(COUNTRIES[0].id, GENDERS[0].id));
  const [user, setUser] = useState(null);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [playerDataReady, setPlayerDataReady] = useState(null);

  // Sync effect
  useEffect(() => {
    if (isWaitingForOpponent && multiplayerContext?.players && playerDataReady) {
      const opponent = multiplayerContext.players.find(p => p.playerId !== multiplayerContext.playerId);
      if (opponent && (opponent.characterCreated || opponent.season >= 2026)) {
        onStartGame(playerDataReady);
      }
    }
  }, [multiplayerContext?.players, isWaitingForOpponent, playerDataReady, onStartGame]);

  const [challenge, setChallenge] = useState(null);
  
  // Initialize playerName on mount
  useEffect(() => {
    setPlayerName(getRandomName(COUNTRIES[0].id, GENDERS[0].id));
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
    });
  }, []);
  
  const [background, setBackground] = useState(ORIGINS_BACKGROUNDS[0]);

  const [selectedPositionCat, setSelectedPositionCat] = useState(null);
  const [positionName, setPositionName] = useState('');
  const [role, setRole] = useState(null);

  const [lifestyle, setLifestyle] = useState(LIFESTYLES[0]);

  const handleSelectCountry = (selectedCountry) => {
    playSound('click');
    setCountry(selectedCountry);
    setPlayerName(getRandomName(selectedCountry.id, gender.id));
    setStep(2);
  };

  const handleSelectGender = (selectedGender) => {
    playSound('click');
    setGender(selectedGender);
    setPlayerName(getRandomName(country.id, selectedGender.id));
  };

  const handleSelectRole = (posCat, selectedRole) => {
    playSound('click');
    setSelectedPositionCat(posCat);
    setPositionName(posCat.name);
    setRole(selectedRole);
    setStep(5);
  };

  const handleFinish = (selectedLifestyle) => {
    playSound('success');
    const finalLifestyle = selectedLifestyle || lifestyle;
    const enginePos = selectedPositionCat ? selectedPositionCat.engineCode : 'ATT';

    let baseStats = { pace: 70, finishing: 70, passing: 70, dribbling: 70, defense: 70, physical: 70 };
    if (enginePos === 'GK') {
      baseStats = { diving: 70, handling: 70, kicking: 70, reflexes: 70, pace: 70, positioning: 70 };
    }
    
    const finalAttributes = generateYoungPlayerStats(enginePos, baseStats, background?.statBonus);
    const overall = calculateOVR({ position: enginePos, attributes: finalAttributes });

    const nameParts = playerName.trim().split(' ');
    const firstName = nameParts[0] || 'Joueur';
    const lastName = nameParts.slice(1).join(' ') || 'Inconnu';

    const playerData = {
      firstName,
      lastName,
      name: playerName,
      gender,
      position: enginePos,
      positionName,
      role: role ? role.name : 'Standard',
      nationality: country.name,
      origin: country.id,
      background,
      lifestyle: finalLifestyle,
      challenge: challenge ? challenge.id : 'none',
      attributes: finalAttributes,
      ovr: overall,
      age: 15,
      declineAge: 30 + Math.floor(Math.random() * 6),
      form: 85,
      morale: 80,
      bankBalance: background.startingMoney || 0,
      palmares: [],
      perks: (() => {
        if (background?.id === 'STREET') return ['bg_street'];
        if (background?.id === 'ACADEMY') return ['bg_academy'];
        if (background?.id === 'LEGACY') return ['star'];
        if (background?.id === 'AMATEUR') return ['increvable'];
        if (background?.id === 'FUTSAL') return ['bg_futsal'];
        return [];
      })()
    };

    if (multiplayerContext?.roomObj) {
      multiplayerContext.roomObj.updateState({ characterCreated: true });
      setPlayerDataReady(playerData);
      setIsWaitingForOpponent(true);
      // Fallback if opponent is already ready or left, will be handled by useEffect or we check directly
      const opponent = multiplayerContext.players.find(p => p.playerId !== multiplayerContext.playerId);
      if (opponent && opponent.characterCreated) {
        onStartGame(playerData);
      }
    } else {
      onStartGame(playerData);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-emerald-200 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 flex flex-col justify-center items-center p-3 sm:p-6 relative overflow-y-auto font-sans">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none opacity-20"></div>
      {isWaitingForOpponent ? (
      <div className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden z-10 my-auto">
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-widest uppercase">En attente du joueur 2...</h2>
          <p className="text-slate-500 dark:text-slate-500 dark:text-slate-400">Ton rival est encore en train de lacer ses crampons.</p>
          <button
            onClick={() => {
              if (window.confirm("Êtes-vous sûr de vouloir quitter le 1v1 ?")) {
                if (onRestartGame) onRestartGame();
              }
            }}
            className="mt-6 px-6 py-2 bg-rose-600 hover:bg-rose-500 text-slate-800 dark:text-white font-bold rounded-xl text-sm tracking-wider uppercase transition-colors border border-rose-500/50"
          >
            Quitter le 1v1
          </button>
        </div>
      </div>
) : (
      <div className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden z-10 my-auto max-h-[95dvh] overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white dark:bg-slate-800">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="text-center mb-5 sm:mb-6 mt-1 sm:mt-2 space-y-1">
          <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black tracking-widest uppercase">Étape {step} sur {totalSteps}</span>
          <h1 className="text-xl sm:text-3xl font-black text-slate-800 dark:text-white">
            {step === 1 && "Nationalité"}
            {step === 2 && "Sexe & Identité"}
            {step === 3 && "Origine Sociale"}
            {step === 4 && "Poste sur le terrain"}
            {step === 5 && "Hygiène de Vie"}
            {step === 6 && "Confirmation de Carrière"}
          </h1>
        </div>

        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase block mb-3 text-center">Choisissez la nationalité de votre joueur</label>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
                {Object.keys(CONTINENTS).map((continent) => (
                  <button
                    key={continent}
                    type="button"
                    onClick={() => setActiveContinent(continent)}
                    className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-colors ${activeContinent === continent ? 'bg-emerald-600 text-slate-800 dark:text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                  >
                    {continent}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3 max-h-[350px] overflow-y-auto pr-1">
                {COUNTRIES.filter(c => getContinentForCountry(c.id) === activeContinent).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`p-2.5 sm:p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 ${country.id === c.id ? 'border-emerald-400 bg-emerald-900/40 opacity-100' : 'border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 opacity-80'}`}
                  >
                    <FlagIcon code={c.id} className="w-8 h-5 sm:w-10 sm:h-7" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white text-center leading-tight line-clamp-1">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase block mb-3 text-center">Sexe du joueur</label>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {GENDERS.map((g) => {
                    const isSelected = gender.id === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleSelectGender(g)}
                        className={`p-2 sm:p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 sm:gap-3 relative overflow-hidden group ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_35px_rgba(16,185,129,0.35)] scale-[1.02]'
                            : 'border-slate-300 dark:border-slate-800 bg-slate-950/80 hover:border-emerald-400/50 hover:bg-emerald-500/10'
                        }`}
                      >
                        {/* Glowing radial halo backdrop */}
                        <div
                          className={`absolute w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-3xl transition-all duration-300 pointer-events-none ${
                            isSelected
                              ? 'bg-emerald-400/45 opacity-100 scale-110'
                              : 'bg-emerald-500/20 opacity-50 group-hover:opacity-90 group-hover:scale-105'
                          }`}
                        />
                        
                        <div className="relative z-10 py-1 flex justify-center items-center">
                          <img
                            src={g.id === 'F' ? "/female_silhouette.png" : "/male_silhouette.png"}
                            alt={g.name}
                            className="w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_0_20px_rgba(52,211,153,0.85)] drop-shadow-[0_0_45px_rgba(16,185,129,0.6)] brightness-110 contrast-125 transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="font-extrabold text-slate-800 dark:text-white text-base md:text-lg z-10 tracking-wide">
                          {g.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 uppercase block mb-2 text-center">Nom généré ({country.name})</label>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={25}
                    className="w-full bg-emerald-200 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold focus:border-emerald-400 outline-none text-base text-center"
                  />
                  <button
                    type="button"
                    onClick={() => { playSound('click'); setPlayerName(getRandomName(country.id, gender.id)); }}
                    className="px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm font-bold rounded-xl text-slate-700 dark:text-slate-200 transition-all flex items-center gap-2"
                  >
                    <span>🎲</span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { playSound('click'); setStep(3); }}
                className="w-full max-w-sm mx-auto block py-3 mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-800 dark:text-slate-100 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                Suivant ➔
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
              {ORIGINS_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => { playSound('click'); setBackground(bg); setStep(4); }}
                  className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{bg.icon}</span>
                    <h4 className="font-black text-slate-800 dark:text-white text-sm group-hover:text-emerald-400 transition-colors">{bg.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-2">{bg.desc}</p>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    💰 Budget initial : {bg.startingMoney.toLocaleString()} €
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              {true ? (
                <div className="grid grid-cols-2 gap-3">
                  {POSITIONS_DATA.map((posCat) => (
                    <button
                      key={posCat.id}
                      type="button"
                      onClick={() => { playSound('click'); setSelectedPositionCat(posCat); setPositionName(posCat.name); setRole(posCat.roles[0]); setStep(5); }}
                      className="p-5 rounded-xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-center transition-all group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{posCat.icon}</div>
                      <div className="font-extrabold text-slate-800 dark:text-white text-sm group-hover:text-emerald-400">{posCat.name}</div>
                      
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 font-medium">Spécialité :</span>
                    <button
                      type="button"
                      onClick={() => { playSound('click'); setSelectedPositionCat(null); }}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                    >
                      ← Changer de poste
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {selectedPositionCat.roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleSelectRole(selectedPositionCat, r)}
                        className="p-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left transition-all group"
                      >
                        <div className="font-extrabold text-xs text-slate-800 dark:text-white group-hover:text-emerald-400 flex items-center justify-between">
                          <span>{r.name}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{r.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 gap-3">
              {LIFESTYLES.map((ls) => (
                <button
                  key={ls.id}
                  type="button"
                  onClick={() => { playSound('click'); setLifestyle(ls); setStep(6); }}
                  className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left flex items-center justify-between transition-all group"
                >
                  <div>
                    <div className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-emerald-400">{ls.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-1">{ls.description}</div>
                  </div>
                  <span className="text-slate-500 dark:text-slate-500 dark:text-slate-400 group-hover:text-emerald-400 font-bold">➔</span>
                </button>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="grid grid-cols-1 gap-3">
              {CHALLENGES_LIST.map((chal) => (
                <button
                  key={chal.id}
                  type="button"
                  onClick={() => { playSound('click'); setChallenge(chal); setStep(7); }}
                  className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left flex items-center justify-between transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">{chal.icon}</span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-emerald-400 flex items-center gap-2">
                        {chal.name}
                        {chal.multiplier > 1 && <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded text-[9px] uppercase font-black">Score x{chal.multiplier}</span>}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{chal.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4 text-center">
              <div className="inline-block p-4 rounded-2xl border border-slate-300 dark:border-slate-800 bg-emerald-200 dark:bg-slate-950 shadow-inner w-full max-w-md">
                <div className="flex justify-center mb-2">
                  <FlagIcon code={country.id} className="w-8 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">{playerName}</h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">{positionName} • {role ? role.name : ''}</p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2 text-left">
                  <p>Sexe : <strong className="text-slate-800 dark:text-white">{gender.name}</strong></p>
                  <p>Origine : <strong className="text-slate-800 dark:text-white">{background.name}</strong></p>
                  <p>Hygiène : <strong className="text-slate-800 dark:text-white">{lifestyle.name}</strong></p>
                  <p>Défi : <strong className="text-slate-800 dark:text-white">{challenge ? challenge.name : 'Aucun'}</strong></p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleFinish()}
                className="w-full max-w-md mx-auto block py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-800 dark:text-slate-100 font-black text-xs uppercase tracking-wider hover:scale-[1.02] transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                Commencer ma carrière
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-start items-center border-t border-slate-300 dark:border-slate-800 pt-4 h-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                playSound('click');
                if (false) {
                } else {
                  setStep((prev) => Math.max(prev - 1, 1));
                }
              }}
              className="text-slate-500 dark:text-slate-500 dark:text-slate-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
            >
              ← Revenir à l'étape précédente
            </button>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
