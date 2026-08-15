const fs = require('fs');

const path = 'c:/Users/romai/golden-xi/src/components/Dashboard.jsx';

const reverseReplacements = [
  // Backgrounds
  { replace: /bg-\[\#0F172A\]/g, search: 'bg-gradient-to-br from-black via-black to-amber-900' },
  { replace: /backgroundColor:\s*'#0F172A'/g, search: "background: 'linear-gradient(135deg, #000000 0%, #000000 70%, #78350f 100%)'" },
  { replace: /bg-tactical-pattern/g, search: 'bg-football-pattern' },
  
  // Cards and Containers
  { replace: /bg-slate-800/g, search: 'bg-white/95' },
  { replace: /bg-slate-700\/80/g, search: 'bg-slate-100/80' },
  { replace: /bg-slate-700\/95/g, search: 'bg-slate-100/95' },
  
  // Text colors
  { replace: /text-slate-200/g, search: 'text-slate-900' },
  { replace: /text-slate-300/g, search: 'text-slate-800' },
  { replace: /text-slate-400/g, search: 'text-slate-600' },
  { replace: /text-slate-100/g, search: 'text-slate-950' },
  
  // Borders
  { replace: /border-slate-700/g, search: 'border-white/50' },
  { replace: /border-slate-600\/80/g, search: 'border-slate-200/80' },
  { replace: /border-slate-600/g, search: 'border-slate-200' },
  
  // Specific amber accent -> emerald
  { replace: /text-emerald-400/g, search: 'text-amber-600' },
  { replace: /text-emerald-500/g, search: 'text-amber-500' },
  { replace: /bg-emerald-500/g, search: 'bg-amber-500' },
  { replace: /hover:bg-emerald-400/g, search: 'hover:bg-amber-400' },
  { replace: /bg-emerald-900\/20/g, search: 'bg-amber-50' },
  { replace: /border-emerald-700\/50/g, search: 'border-amber-200' },
  { replace: /text-emerald-300/g, search: 'text-amber-900' }
];

let content = fs.readFileSync(path, 'utf8');

for (const { search, replace } of reverseReplacements) {
  content = content.replace(replace, search);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done reverting theme on Dashboard.jsx!');
