import re

with open("src/components/CharacterCreation.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state for continent
if "const [activeContinent, setActiveContinent] = useState('Europe');" not in content:
    content = content.replace("const [country, setCountry] = useState(COUNTRIES[0]);", 
                              "const [country, setCountry] = useState(COUNTRIES.find(c => c.id === 'FR') || COUNTRIES[0]);\n  const [activeContinent, setActiveContinent] = useState('Europe');")

# 2. Add continent mapping before component or inside
continent_mapping_code = """
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
"""

if "const CONTINENTS =" not in content:
    content = content.replace("export function CharacterCreation({", continent_mapping_code + "\nexport function CharacterCreation({")

# 3. Modify the grid rendering for COUNTRIES
old_countries_grid = """              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 border-slate-800 bg-slate-950 opacity-80`}
                  >
                    <FlagIcon code={c.id} className="w-8 h-5 sm:w-10 sm:h-7" />
                    <span className="text-[11px] font-bold text-white text-center leading-tight line-clamp-1">{c.name}</span>
                  </button>
                ))}
              </div>"""

new_countries_grid = """              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.keys(CONTINENTS).map((continent) => (
                  <button
                    key={continent}
                    type="button"
                    onClick={() => setActiveContinent(continent)}
                    className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-colors ${activeContinent === continent ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {continent}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[350px] overflow-y-auto pr-1">
                {COUNTRIES.filter(c => getContinentForCountry(c.id) === activeContinent).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 ${country.id === c.id ? 'border-emerald-400 bg-emerald-900/40 opacity-100' : 'border-slate-800 bg-slate-950 opacity-80'}`}
                  >
                    <FlagIcon code={c.id} className="w-8 h-5 sm:w-10 sm:h-7" />
                    <span className="text-[11px] font-bold text-white text-center leading-tight line-clamp-1">{c.name}</span>
                  </button>
                ))}
              </div>"""

if old_countries_grid in content:
    content = content.replace(old_countries_grid, new_countries_grid)
    print("Replaced country grid!")
else:
    print("Could not find country grid string verbatim")

with open("src/components/CharacterCreation.jsx", "w", encoding="utf-8") as f:
    f.write(content)
