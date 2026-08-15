import os

files_to_fix = [
    'src/components/Dashboard.jsx',
    'src/components/CharacterCreation.jsx',
    'src/components/Achievements.jsx',
    'src/components/GlobalPalmares.jsx',
    'src/components/LifestyleShopModal.jsx',
    'src/components/MainMenu.jsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    
    original = content
    
    # Remove backdrop-blur-md (very GPU intensive, causes jank)
    content = content.replace(' backdrop-blur-md', '')
    content = content.replace(' backdrop-blur-sm', '')
    content = content.replace(' backdrop-blur', '')
    
    # Replace bg-white/95 with bg-white (removes transparency compositing)
    content = content.replace('bg-white/95', 'bg-white')
    
    # Replace bg-slate-900/95 with bg-slate-900
    content = content.replace('bg-slate-900/95', 'bg-slate-900')
    
    if content != original:
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Optimized: {filepath}")
    else:
        print(f"No changes: {filepath}")

print("\nDone! Removed all backdrop-blur and transparency compositing.")
