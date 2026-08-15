const fs = require('fs');

const path = 'c:/Users/romai/golden-xi/src/components/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Group palmares early in the component
const palmaresLogic = `
  const groupedPalmares = useMemo(() => {
    if (!palmares) return [];
    const groups = palmares.reduce((acc, trophy) => {
      if (!acc[trophy.text]) acc[trophy.text] = { ...trophy, count: 1 };
      else acc[trophy.text].count++;
      return acc;
    }, {});
    return Object.values(groups).sort((a, b) => b.count - a.count);
  }, [palmares]);
`;

if (!content.includes('groupedPalmares')) {
  content = content.replace(
    'const effectiveStats = getEffectiveStats(player);',
    'const effectiveStats = getEffectiveStats(player);\n' + palmaresLogic
  );
}

// 2. Remove isShopOpen state
content = content.replace(/const \[isShopOpen,\s*setIsShopOpen\] = useState\(false\);\s*\n/g, '');

// 3. Remove boutique button
const boutiqueRegex = /<button[^>]*onClick={\(\)\s*=>\s*{\s*playSound\('click'\);\s*setIsShopOpen\(true\);\s*}}[\s\S]*?🛍️ Boutique[\s\S]*?<\/button>/g;
content = content.replace(boutiqueRegex, '');

// 4. Remove LifestyleShopModal
const modalRegex = /{\/\* BOUTIQUE \/ LIFESTYLE SHOP MODAL \*\/}[\s\S]*?<\/LifestyleShopModal>/g;
content = content.replace(modalRegex, '');
const modalRegexSelfClosing = /{\/\* BOUTIQUE \/ LIFESTYLE SHOP MODAL \*\/}[\s\S]*?\/>/g;
content = content.replace(modalRegexSelfClosing, '');

// 5. Remove old palmares
const oldPalmaresRegex = /{\s*palmares && palmares\.length > 0 && \(\s*<div className="bg-white\/95 backdrop-blur-md border border-white\/50 rounded-3xl p-4 shadow-lg flex items-center gap-4 overflow-x-auto">[\s\S]*?<\/div>\s*\)\s*}\s*/g;
content = content.replace(oldPalmaresRegex, '');

// 6. Replace social block
const socialRegex = /<div className="bg-white\/95 backdrop-blur-md border border-white\/50 rounded-3xl p-6 shadow-xl flex-1">[\s\S]*?<h4 className="heading-typography text-\[10px\] font-bold text-slate-600 uppercase tracking-wider mb-4">📱 Réseaux Sociaux<\/h4>[\s\S]*?<div className="space-y-3">[\s\S]*?{socialFeed\.map\(\(tweet, i\) => \([\s\S]*?<\/div>\s*\)\)}[\s\S]*?<\/div>\s*<\/div>/;

const newSocialAndPalmares = `
                <div className="flex flex-col gap-6 flex-1">
                  <div className="bg-white/95 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-xl flex-1 overflow-y-auto max-h-[300px]">
                    <h4 className="heading-typography text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-4">📱 Réseaux Sociaux</h4>
                    <div className="space-y-3">
                      {socialFeed.map((tweet, i) => (
                        <div key={i} className="flex gap-3 items-start p-3 bg-white/95 rounded-2xl border border-white/50">
                          <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold shrink-0">{tweet.user[1].toUpperCase()}</div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-600 mb-0.5">{tweet.user}</p>
                            <p className="text-xs text-slate-800 leading-snug">{tweet.text}</p>
                            <p className="text-[10px] text-slate-600 mt-1.5 flex items-center gap-1">❤️ {tweet.likes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-xl flex-1 overflow-y-auto max-h-[300px]">
                    <h4 className="heading-typography text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-4">🏆 Palmarès</h4>
                    {groupedPalmares.length > 0 ? (
                      <div className="space-y-3">
                        {groupedPalmares.map((trophy, idx) => (
                          <div key={idx} className="bg-slate-100/80 border border-slate-200/80 p-3 rounded-2xl flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{trophy.icon}</span>
                              <span className="heading-typography text-xs text-slate-800 font-semibold">{trophy.text}</span>
                            </div>
                            <span className="heading-typography font-black text-amber-600 text-lg">x{trophy.count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">Aucun trophée remporté pour le moment.</p>
                    )}
                  </div>
                </div>
`;

content = content.replace(socialRegex, newSocialAndPalmares);

fs.writeFileSync(path, content, 'utf8');
console.log('Done refactoring Dashboard.jsx!');
