import os
import re

components_dir = os.path.join("src", "components")
app_file = os.path.join("src", "App.jsx")
index_file = os.path.join("index.html")

files_to_process = [app_file, index_file]
for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".jsx"):
            files_to_process.append(os.path.join(root, file))

mapping = {
    # Main background -> emerald-50
    r'bg-slate-200\s+dark:bg-\[\#0F172A\]': 'bg-emerald-50 dark:bg-[#0F172A]',
    r'bg-slate-300\s+dark:bg-slate-950': 'bg-emerald-100 dark:bg-slate-950',
    
    # Containers -> pure white on top of the emerald background gives a very premium, readable look
    r'bg-slate-50\s+dark:bg-slate-900(?!\/)': 'bg-white dark:bg-slate-900',
    r'bg-slate-50/(\d+)\s+dark:bg-slate-900/(\d+)': r'bg-white/\1 dark:bg-slate-900/\2',
    
    r'bg-slate-100\s+dark:bg-slate-800(?!\/)': 'bg-white dark:bg-slate-800',
    r'bg-slate-100/(\d+)\s+dark:bg-slate-800/(\d+)': r'bg-white/\1 dark:bg-slate-800/\2',
    
    r'bg-slate-300\s+dark:bg-slate-700(?!\/)': 'bg-emerald-100 dark:bg-slate-700',
    r'bg-slate-300/(\d+)\s+dark:bg-slate-700/(\d+)': r'bg-emerald-100/\1 dark:bg-slate-700/\2',
    
    r'bg-slate-300/(\d+)\s+dark:bg-black/(\d+)': r'bg-emerald-200/\1 dark:bg-black/\2',
}

for fp in files_to_process:
    if not os.path.exists(fp): continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
        
    orig = content
    for pattern, repl in mapping.items():
        content = re.sub(pattern, repl, content)
        
    if orig != content:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fp}")

print("Done applying Emerald light mode.")
