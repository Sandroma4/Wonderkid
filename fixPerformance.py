import os

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    
    # Replace mix-blend-overlay to improve rendering performance
    new_content = content.replace('mix-blend-overlay opacity-30', 'opacity-10')
    new_content = new_content.replace('mix-blend-overlay opacity-50', 'opacity-20')
    new_content = new_content.replace('mix-blend-overlay', '')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

files = [
    'src/components/MainMenu.jsx',
    'src/components/GlobalPalmares.jsx',
    'src/components/Dashboard.jsx',
    'src/components/CharacterCreation.jsx',
    'src/components/Achievements.jsx'
]

for file in files:
    if os.path.exists(file):
        replace_in_file(file)
