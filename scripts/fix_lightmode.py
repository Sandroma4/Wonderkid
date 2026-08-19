import os
import re

components_dir = os.path.join("src", "components")
app_file = os.path.join("src", "App.jsx")

files_to_process = [app_file]
for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".jsx"):
            files_to_process.append(os.path.join(root, file))

# Mapping dictionaries
# For each property, what should it be in light mode?
# If we see the key and it's NOT prefixed with dark:, we replace the whole class group.

# First, clean up previous script messes.
# We'll remove all dark: classes we added if we want, or just do a smart regex.
# Actually, the easiest way to fix it is to do a regex substitution that replaces
# "bg-white dark:bg-slate-900", "bg-slate-50 dark:bg-[#0F172A]", etc. back to their originals.
# Then apply a better rule.

revert_map = {
    r'bg-slate-50 dark:bg-\[\#0F172A\]': 'bg-[#0F172A]',
    r'bg-white dark:bg-slate-900': 'bg-slate-900',
    r'bg-slate-50 dark:bg-slate-950': 'bg-slate-950',
    r'bg-white dark:bg-slate-800(?!\/)': 'bg-slate-800',
    r'bg-white/80 dark:bg-slate-800/80': 'bg-slate-800/80',
    r'bg-white/90 dark:bg-slate-800/90': 'bg-slate-800/90',
    r'bg-slate-100 dark:bg-slate-700': 'bg-slate-700',
    r'bg-slate-200/50 dark:bg-slate-8000/10': 'bg-slate-8000/10',
    r'text-slate-900 dark:text-white': 'text-white',
    r'text-slate-700 dark:text-slate-300': 'text-slate-300',
    r'text-slate-600 dark:text-slate-400': 'text-slate-400',
    r'text-slate-500 dark:text-slate-500': 'text-slate-500',
    r'text-slate-800 dark:text-slate-200': 'text-slate-200',
    r'text-slate-900 dark:text-slate-900': 'text-slate-900',
    r'border-slate-200 dark:border-slate-800': 'border-slate-800',
    r'border-slate-300 dark:border-slate-700': 'border-slate-700',
    r'border-slate-300 dark:border-slate-600': 'border-slate-600',
    r'hover:bg-slate-100 dark:hover:bg-slate-800(?!\/)': 'hover:bg-slate-800',
    r'hover:bg-slate-100 dark:hover:bg-slate-700': 'hover:bg-slate-700',
    r'hover:border-slate-400 dark:hover:border-slate-500': 'hover:border-slate-500',
    r'hover:text-slate-900 dark:hover:text-white': 'hover:text-white'
}

new_map = {
    # App Background
    r'\bbg-\[\#0F172A\]\b': 'bg-slate-100 dark:bg-[#0F172A]',
    r'\bbg-slate-950\b': 'bg-slate-100 dark:bg-slate-950',
    
    # Containers
    r'\bbg-slate-900\b': 'bg-white dark:bg-slate-900',
    r'\bbg-slate-900/50\b': 'bg-white/50 dark:bg-slate-900/50',
    r'\bbg-slate-900/80\b': 'bg-white/80 dark:bg-slate-900/80',
    
    r'\bbg-slate-800\b': 'bg-slate-50 dark:bg-slate-800',
    r'\bbg-slate-800/80\b': 'bg-slate-50/90 dark:bg-slate-800/80',
    r'\bbg-slate-800/50\b': 'bg-slate-50/50 dark:bg-slate-800/50',
    
    r'\bbg-slate-700\b': 'bg-slate-200 dark:bg-slate-700',
    r'\bbg-slate-700/50\b': 'bg-slate-200/50 dark:bg-slate-700/50',
    
    r'\bbg-black/80\b': 'bg-slate-200/90 dark:bg-black/80',
    r'\bbg-black/50\b': 'bg-slate-200/70 dark:bg-black/50',

    # Text
    r'\btext-white\b': 'text-slate-900 dark:text-white',
    r'\btext-slate-200\b': 'text-slate-800 dark:text-slate-200',
    r'\btext-slate-300\b': 'text-slate-700 dark:text-slate-300',
    r'\btext-slate-400\b': 'text-slate-600 dark:text-slate-400',
    r'\btext-slate-500\b': 'text-slate-500 dark:text-slate-500',
    
    # Borders
    r'\bborder-slate-800\b': 'border-slate-300 dark:border-slate-800',
    r'\bborder-slate-700\b': 'border-slate-300 dark:border-slate-700',
    r'\bborder-slate-700/50\b': 'border-slate-300/80 dark:border-slate-700/50',
    r'\bborder-slate-600\b': 'border-slate-400 dark:border-slate-600',
    
    # Accent text that's unreadable on white (often they have drop shadow or similar)
    r'\btext-emerald-400\b': 'text-emerald-600 dark:text-emerald-400',
    r'\btext-emerald-300\b': 'text-emerald-600 dark:text-emerald-300',
    r'\btext-amber-400\b': 'text-amber-600 dark:text-amber-400',
    r'\btext-amber-300\b': 'text-amber-600 dark:text-amber-300',
    r'\btext-rose-400\b': 'text-rose-600 dark:text-rose-400',
    r'\btext-rose-300\b': 'text-rose-600 dark:text-rose-300',
    r'\btext-cyan-400\b': 'text-cyan-600 dark:text-cyan-400',
    r'\btext-cyan-300\b': 'text-cyan-600 dark:text-cyan-300',
    r'\btext-violet-400\b': 'text-violet-600 dark:text-violet-400',
    r'\btext-violet-300\b': 'text-violet-600 dark:text-violet-300',
    
    # Hovers
    r'\bhover:bg-slate-800\b': 'hover:bg-slate-200 dark:hover:bg-slate-800',
    r'\bhover:bg-slate-700\b': 'hover:bg-slate-300 dark:hover:bg-slate-700',
    r'\bhover:border-slate-500\b': 'hover:border-slate-400 dark:hover:border-slate-500',
}

for fp in files_to_process:
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
        
    orig = content
    
    # 1. Revert previous script
    for pattern, repl in revert_map.items():
        content = re.sub(pattern, repl, content)
        
    # 2. Apply new robust mapping
    for pattern, repl in new_map.items():
        content = re.sub(pattern, repl, content)

    # 3. Clean up any weird double darks if any
    content = re.sub(r'dark:(dark:)+', 'dark:', content)
        
    if content != orig:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fp}")

print("Done fixing light mode colors.")
