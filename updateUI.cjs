const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'CharacterCreation.jsx');

const fileContent = `import { useState } from 'react';
import { FlagIcon } from './FlagIcon';
import { playSound } from '../utils/audio';
import { COUNTRIES, GENDERS, ORIGINS_BACKGROUNDS, POSITIONS_DATA, LIFESTYLES, getRandomName, generateYoungPlayerStats, calculateOVR } from '../utils/gameData';

export function CharacterCreation({ onStartGame }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [country, setCountry] = useState(COUNTRIES[0]);
  const [gender, setGender] = useState(GENDERS[0]);
  const [playerName, setPlayerName] = useState(getRandomName(COUNTRIES[0].id, GENDERS[0].id));
  
  const [background, setBackground] = useState(ORIGINS_BACKGROUNDS[0]);

  const [selectedPositionCat, setSelectedPositionCat] = useState(null);
  const [positionName, setPositionName] = useState('');
  const [role, setRole] = useState(null);

  const [lifestyle, setLifestyle] = useState(LIFESTYLES[0]);

  const handleSelectCountry = (selectedCountry) => {
    playSound('click');
    setCountry(selectedCountry);
    setPlayerName(getRandomName(selectedCountry.id, gender.id));
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
    setStep(4);
  };

  const handleFinish = (selectedLifestyle) => {
    playSound('success');
    const finalLifestyle = selectedLifestyle || lifestyle;
    const enginePos = selectedPositionCat ? selectedPositionCat.engineCode : 'ATT';

    const baseStats = role ? { ...role.baseStats } : { pace: 70, finishing: 70, passing: 70, dribbling: 70, defense: 70, physical: 70 };
    
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
      origin: country,
      background,
      lifestyle: finalLifestyle,
      attributes: finalAttributes,
      ovr: overall,
      age: 15,
      form: 85,
      morale: 80,
      bankBalance: background.startingMoney,
      palmares: []
    };

    onStartGame(playerData);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-pattern pointer-events-none mix-blend-overlay opacity-50"></div>
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: \`\${(step / totalSteps) * 100}%\` }}
          />
        </div>

        <div className="text-center mb-6 mt-2 space-y-1">
          <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">Étape {step} sur {totalSteps}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {step === 1 && "Identité du Joueur"}
            {step === 2 && "Origine Sociale"}
            {step === 3 && (!selectedPositionCat ? "Poste sur le terrain" : \`Rôle : \${selectedPositionCat.name}\`)}
            {step === 4 && "Hygiène de Vie"}
            {step === 5 && "Confirmation de Carrière"}
          </h1>
        </div>

        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">1. Nationalité</label>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-[140px] overflow-y-auto pr-1">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={\`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 \${
                        country.id === c.id ? 'border-emerald-400 bg-emerald-500/10 scale-105' : 'border-slate-800 bg-slate-950 opacity-60'
                      }\`}
                    >
                      <FlagIcon code={c.id} className="w-6 h-4" />
                      <span className="text-[10px] font-bold text-white text-center leading-tight line-clamp-1">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-2">2. Sexe</label>
                <div className="grid grid-cols-2 gap-3">
                  {GENDERS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelectGender(g)}
                      className={\`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-3 \${
                        gender.id === g.id ? 'border-emerald-400 bg-emerald-500/10' : 'border-slate-800 bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10'
                      }\`}
                    >
                      <div className="text-2xl">{g.icon}</div>
                      <div className="font-extrabold text-white text-sm">{g.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">3. Nom généré</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-bold focus:border-emerald-400 outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => { playSound('click'); setPlayerName(getRandomName(country.id, gender.id)); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-slate-200 transition-all whitespace-nowrap flex items-center gap-1"
                  >
                    <span className="text-sm">🎲</span> Relancer
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { playSound('click'); setStep(2); }}
                className="w-full py-3 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-100 font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Suivant ➔
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
              {ORIGINS_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => { playSound('click'); setBackground(bg); setStep(3); }}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{bg.icon}</span>
                    <h4 className="font-black text-white text-sm group-hover:text-emerald-400 transition-colors">{bg.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">{bg.desc}</p>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    💰 Budget initial : {bg.startingMoney.toLocaleString()} €
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              {!selectedPositionCat ? (
                <div className="grid grid-cols-2 gap-3">
                  {POSITIONS_DATA.map((posCat) => (
                    <button
                      key={posCat.id}
                      type="button"
                      onClick={() => { playSound('click'); setSelectedPositionCat(posCat); }}
                      className="p-5 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-center transition-all group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{posCat.icon}</div>
                      <div className="font-extrabold text-white text-sm group-hover:text-emerald-400">{posCat.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{posCat.roles.length} rôles disponibles</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400 font-medium">Spécialité :</span>
                    <button
                      type="button"
                      onClick={() => { playSound('click'); setSelectedPositionCat(null); }}
                      className="text-xs text-emerald-400 hover:underline font-bold"
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
                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left transition-all group"
                      >
                        <div className="font-extrabold text-xs text-white group-hover:text-emerald-400 flex items-center justify-between">
                          <span>{r.name}</span>
                          <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{r.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 gap-3">
              {LIFESTYLES.map((ls) => (
                <button
                  key={ls.id}
                  type="button"
                  onClick={() => { playSound('click'); setLifestyle(ls); setStep(5); }}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-400 hover:bg-emerald-500/10 text-left flex items-center justify-between transition-all group"
                >
                  <div>
                    <div className="font-extrabold text-sm text-white group-hover:text-emerald-400">{ls.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{ls.description}</div>
                  </div>
                  <span className="text-slate-400 group-hover:text-emerald-400 font-bold">➔</span>
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="inline-block p-4 rounded-2xl border border-slate-800 bg-slate-950 shadow-inner w-full max-w-md">
                <div className="flex justify-center mb-2">
                  <FlagIcon code={country.id} className="w-8 h-5" />
                </div>
                <h2 className="text-xl font-black text-white">{playerName}</h2>
                <p className="text-emerald-400 font-bold text-xs">{positionName} • {role ? role.name : ''}</p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300 grid grid-cols-2 gap-2 text-left">
                  <p>Sexe : <strong className="text-white">{gender.name}</strong></p>
                  <p>Origine : <strong className="text-white">{background.name}</strong></p>
                  <p className="col-span-2">Hygiène : <strong className="text-white">{lifestyle.name}</strong></p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleFinish()}
                className="w-full max-w-md mx-auto block py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-100 font-black text-xs uppercase tracking-wider hover:scale-[1.02] transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                LANCER MA CARRIÈRE EN D3 🚀
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-start items-center border-t border-slate-800 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                playSound('click');
                if (step === 3 && selectedPositionCat) {
                  setSelectedPositionCat(null);
                } else {
                  setStep((prev) => Math.max(prev - 1, 1));
                }
              }}
              className="text-slate-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
            >
              ← Revenir à l'étape précédente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log("Updated CharacterCreation.jsx successfully!");
