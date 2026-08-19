const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'components');
const appPath = path.join(__dirname, '..', 'src', 'App.jsx');

const replacements = [
  // Backgrounds
  { regex: /bg-\[\#0F172A\]/g, replacement: 'bg-slate-50 dark:bg-[#0F172A]' },
  { regex: /bg-slate-900/g, replacement: 'bg-white dark:bg-slate-900' },
  { regex: /bg-slate-950/g, replacement: 'bg-slate-50 dark:bg-slate-950' },
  { regex: /bg-slate-800(?!\/)/g, replacement: 'bg-white dark:bg-slate-800' },
  { regex: /bg-slate-800\/80/g, replacement: 'bg-white/80 dark:bg-slate-800/80' },
  { regex: /bg-slate-800\/90/g, replacement: 'bg-white/90 dark:bg-slate-800/90' },
  { regex: /bg-slate-700/g, replacement: 'bg-slate-100 dark:bg-slate-700' },
  { regex: /bg-slate-8000\/10/g, replacement: 'bg-slate-200/50 dark:bg-slate-8000/10' },

  // Text
  { regex: /text-white/g, replacement: 'text-slate-900 dark:text-white' },
  { regex: /text-slate-300/g, replacement: 'text-slate-700 dark:text-slate-300' },
  { regex: /text-slate-400/g, replacement: 'text-slate-600 dark:text-slate-400' },
  { regex: /text-slate-500/g, replacement: 'text-slate-500 dark:text-slate-500' },
  { regex: /text-slate-200/g, replacement: 'text-slate-800 dark:text-slate-200' },
  { regex: /text-slate-900/g, replacement: 'text-slate-900 dark:text-slate-900' },

  // Borders
  { regex: /border-slate-800/g, replacement: 'border-slate-200 dark:border-slate-800' },
  { regex: /border-slate-700/g, replacement: 'border-slate-300 dark:border-slate-700' },
  { regex: /border-slate-600/g, replacement: 'border-slate-300 dark:border-slate-600' },

  // Hover states
  { regex: /hover:bg-slate-800(?!\/)/g, replacement: 'hover:bg-slate-100 dark:hover:bg-slate-800' },
  { regex: /hover:bg-slate-700/g, replacement: 'hover:bg-slate-100 dark:hover:bg-slate-700' },
  { regex: /hover:border-slate-500/g, replacement: 'hover:border-slate-400 dark:hover:border-slate-500' },
  { regex: /hover:text-white/g, replacement: 'hover:text-slate-900 dark:hover:text-white' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, (match, offset, string) => {
        const before = string.slice(Math.max(0, offset - 20), offset);
        // Avoid double replace
        if (before.includes('dark:') || before.includes('bg-white') || before.includes('text-slate-900')) {
            return match; 
        }
        return replacement;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

processDirectory(directoryPath);
processFile(appPath);
console.log('Done replacing tailwind classes.');
