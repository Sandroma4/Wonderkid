import os
import re

components_dir = os.path.join("src", "components")
app_file = os.path.join("src", "App.jsx")

files_to_process = [app_file]
for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".jsx"):
            files_to_process.append(os.path.join(root, file))

# Revert map from previous mistakes
# We want to revert things like "bg-slate-100 dark:bg-[#0F172A]" back to "bg-[#0F172A]"
# so we can apply them cleanly.

def revert(content):
    # This matches `light_class dark:original_class` and restores `original_class`
    # e.g. `bg-white dark:bg-slate-900` -> `bg-slate-900`
    
    # Text
    content = re.sub(r'text-slate-\d+\s+dark:(text-(?:white|slate-\d+))', r'\1', content)
    content = re.sub(r'text-slate-\d+\s+dark:(text-\w+-\d+)', r'\1', content)
    content = re.sub(r'text-\w+-\d+\s+dark:(text-\w+-\d+)', r'\1', content)
    
    # Background
    content = re.sub(r'bg-white(?:/\d+)?\s+dark:(bg-slate-\d+(?:/\d+)?)', r'\1', content)
    content = re.sub(r'bg-slate-\d+(?:/\d+)?\s+dark:(bg-slate-\d+(?:/\d+)?)', r'\1', content)
    content = re.sub(r'bg-slate-\d+(?:/\d+)?\s+dark:(bg-\[\#[a-fA-F0-9]+\])', r'\1', content)
    content = re.sub(r'bg-slate-\d+(?:/\d+)?\s+dark:(bg-black(?:/\d+)?)', r'\1', content)
    
    # Border
    content = re.sub(r'border-slate-\d+(?:/\d+)?\s+dark:(border-slate-\d+(?:/\d+)?)', r'\1', content)
    
    # Hover
    content = re.sub(r'hover:bg-[a-z0-9/-]+\s+dark:(hover:bg-[a-z0-9/-]+)', r'\1', content)
    content = re.sub(r'hover:text-[a-z0-9/-]+\s+dark:(hover:text-[a-z0-9/-]+)', r'\1', content)
    content = re.sub(r'hover:border-[a-z0-9/-]+\s+dark:(hover:border-[a-z0-9/-]+)', r'\1', content)

    # Double darks
    content = re.sub(r'dark:dark:', r'dark:', content)
    
    return content

def apply_new(content):
    # Mapping
    # Pattern: replacement
    mapping = {
        r'(?<![\w:-])bg-\[\#0F172A\](?![\w/-])': 'bg-slate-50 dark:bg-[#0F172A]',
        r'(?<![\w:-])bg-slate-950(?![\w/-])': 'bg-slate-100 dark:bg-slate-950',
        r'(?<![\w:-])bg-slate-900(?![\w/-])': 'bg-white dark:bg-slate-900',
        r'(?<![\w:-])bg-slate-900/95(?![\w/-])': 'bg-white/95 dark:bg-slate-900/95',
        r'(?<![\w:-])bg-slate-900/90(?![\w/-])': 'bg-white/90 dark:bg-slate-900/90',
        r'(?<![\w:-])bg-slate-900/80(?![\w/-])': 'bg-white/80 dark:bg-slate-900/80',
        r'(?<![\w:-])bg-slate-900/50(?![\w/-])': 'bg-white/50 dark:bg-slate-900/50',
        
        r'(?<![\w:-])bg-slate-800(?![\w/-])': 'bg-slate-50 dark:bg-slate-800',
        r'(?<![\w:-])bg-slate-800/90(?![\w/-])': 'bg-slate-50/90 dark:bg-slate-800/90',
        r'(?<![\w:-])bg-slate-800/80(?![\w/-])': 'bg-white/90 dark:bg-slate-800/80',
        r'(?<![\w:-])bg-slate-800/50(?![\w/-])': 'bg-white/50 dark:bg-slate-800/50',
        
        r'(?<![\w:-])bg-slate-700(?![\w/-])': 'bg-slate-200 dark:bg-slate-700',
        r'(?<![\w:-])bg-slate-700/80(?![\w/-])': 'bg-slate-200/80 dark:bg-slate-700/80',
        r'(?<![\w:-])bg-slate-700/50(?![\w/-])': 'bg-slate-200/50 dark:bg-slate-700/50',
        
        r'(?<![\w:-])bg-black/80(?![\w/-])': 'bg-slate-200/90 dark:bg-black/80',
        r'(?<![\w:-])bg-black/50(?![\w/-])': 'bg-slate-200/70 dark:bg-black/50',

        r'(?<![\w:-])text-white(?![\w/-])': 'text-slate-900 dark:text-white',
        r'(?<![\w:-])text-slate-100(?![\w/-])': 'text-slate-900 dark:text-slate-100',
        r'(?<![\w:-])text-slate-200(?![\w/-])': 'text-slate-800 dark:text-slate-200',
        r'(?<![\w:-])text-slate-300(?![\w/-])': 'text-slate-700 dark:text-slate-300',
        r'(?<![\w:-])text-slate-400(?![\w/-])': 'text-slate-600 dark:text-slate-400',
        r'(?<![\w:-])text-slate-500(?![\w/-])': 'text-slate-500 dark:text-slate-500',
        
        r'(?<![\w:-])border-slate-800(?![\w/-])': 'border-slate-300 dark:border-slate-800',
        r'(?<![\w:-])border-slate-700(?![\w/-])': 'border-slate-300 dark:border-slate-700',
        r'(?<![\w:-])border-slate-700/80(?![\w/-])': 'border-slate-300/80 dark:border-slate-700/80',
        r'(?<![\w:-])border-slate-700/50(?![\w/-])': 'border-slate-300/80 dark:border-slate-700/50',
        r'(?<![\w:-])border-slate-600(?![\w/-])': 'border-slate-400 dark:border-slate-600',
        
        r'(?<![\w:-])text-emerald-400(?![\w/-])': 'text-emerald-600 dark:text-emerald-400',
        r'(?<![\w:-])text-emerald-300(?![\w/-])': 'text-emerald-600 dark:text-emerald-300',
        r'(?<![\w:-])text-amber-400(?![\w/-])': 'text-amber-600 dark:text-amber-400',
        r'(?<![\w:-])text-amber-300(?![\w/-])': 'text-amber-600 dark:text-amber-300',
        r'(?<![\w:-])text-rose-400(?![\w/-])': 'text-rose-600 dark:text-rose-400',
        r'(?<![\w:-])text-rose-300(?![\w/-])': 'text-rose-600 dark:text-rose-300',
        r'(?<![\w:-])text-cyan-400(?![\w/-])': 'text-cyan-600 dark:text-cyan-400',
        r'(?<![\w:-])text-cyan-300(?![\w/-])': 'text-cyan-600 dark:text-cyan-300',
        r'(?<![\w:-])text-violet-400(?![\w/-])': 'text-violet-600 dark:text-violet-400',
        r'(?<![\w:-])text-violet-300(?![\w/-])': 'text-violet-600 dark:text-violet-300',
        
        r'(?<![\w:-])hover:bg-slate-800(?![\w/-])': 'hover:bg-slate-200 dark:hover:bg-slate-800',
        r'(?<![\w:-])hover:bg-slate-700(?![\w/-])': 'hover:bg-slate-300 dark:hover:bg-slate-700',
        r'(?<![\w:-])hover:border-slate-500(?![\w/-])': 'hover:border-slate-400 dark:hover:border-slate-500',
    }

    for pattern, repl in mapping.items():
        content = re.sub(pattern, repl, content)
    return content

for fp in files_to_process:
    with open(fp, "r", encoding="utf-8") as f:
        orig_content = f.read()
        
    cleaned = revert(orig_content)
    new_content = apply_new(cleaned)
    
    if orig_content != new_content:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {fp}")

print("Done fixing light mode colors round 2.")
