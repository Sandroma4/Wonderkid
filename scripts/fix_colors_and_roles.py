import re

# 1. Update text colors in Dashboard.jsx
with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    dashboard_content = f.read()

# Bilan de la Saison text color fixes
bilan_start = dashboard_content.find("/* BILAN DE LA SAISON AVEC AFFICHAGE DE LA CARTE */")
if bilan_start != -1:
    bilan_end = dashboard_content.find("/* AFFICHER LES NOUVEAUX TRAITS DÉBLOQUÉS (FIN DE SAISON) */", bilan_start)
    if bilan_end == -1: bilan_end = dashboard_content.find("transferMarketOffers", bilan_start)
    
    bilan_block = dashboard_content[bilan_start:bilan_end]
    
    # Replace all bad text colors in this block
    bilan_block = bilan_block.replace('text-slate-900', 'text-slate-100')
    bilan_block = bilan_block.replace('text-slate-800', 'text-slate-200')
    bilan_block = bilan_block.replace('text-slate-700', 'text-slate-300')
    bilan_block = bilan_block.replace('text-slate-600', 'text-slate-400')
    
    dashboard_content = dashboard_content[:bilan_start] + bilan_block + dashboard_content[bilan_end:]
    print("Dashboard text colors updated.")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(dashboard_content)


# 2. Remove role selection in CharacterCreation.jsx
with open("src/components/CharacterCreation.jsx", "r", encoding="utf-8") as f:
    char_content = f.read()

# Replace the onClick for position selection to immediately set the role and proceed to step 5
target_pos_btn = "onClick={() => { playSound('click'); setSelectedPositionCat(posCat); }}"
replacement_pos_btn = "onClick={() => { playSound('click'); setSelectedPositionCat(posCat); setPositionName(posCat.name); setRole(posCat.roles[0]); setStep(5); }}"
if target_pos_btn in char_content:
    char_content = char_content.replace(target_pos_btn, replacement_pos_btn)
    print("Position selection updated to skip role.")

# Hide the role selection UI by replacing `!selectedPositionCat ? (` with `true ? (`
# or better, just replace `{step === 4 && (` block content so it only renders the position categories.
# Let's find the `!selectedPositionCat` condition.
target_condition = "!selectedPositionCat ? ("
replacement_condition = "true ? ("
if target_condition in char_content:
    char_content = char_content.replace(target_condition, replacement_condition)
    print("Role selection UI hidden.")

# Also remove the "X rôles disponibles" text as it's no longer relevant
target_roles_text = '<div className="text-[10px] text-slate-400 mt-1">{posCat.roles.length} rôles disponibles</div>'
replacement_roles_text = ''
if target_roles_text in char_content:
    char_content = char_content.replace(target_roles_text, replacement_roles_text)
elif '<div className="text-[10px] text-slate-400 mt-1">{posCat.roles.length} r' in char_content:
    char_content = re.sub(r'<div className="text-\[10px\] text-slate-400 mt-1">\{posCat\.roles\.length\} r[^<]+<\/div>', '', char_content)

# Update step 4 text (header)
target_header = '{step === 4 && (!selectedPositionCat ? "Poste sur le terrain" : `Rôle : ${selectedPositionCat.name}`)}'
replacement_header = '{step === 4 && "Poste sur le terrain"}'
if target_header in char_content:
    char_content = char_content.replace(target_header, replacement_header)
elif '{step === 4 && (!selectedPositionCat ? "Poste sur le terrain" : `R' in char_content:
    char_content = re.sub(r'\{step === 4 && \(\!selectedPositionCat \? "Poste sur le terrain" : `R[^`]+`\)\}', '{step === 4 && "Poste sur le terrain"}', char_content)

# Remove the "if (step === 4 && selectedPositionCat)" back button logic
target_back_logic = """                if (step === 4 && selectedPositionCat) {
                  setSelectedPositionCat(null);
                } else {"""
replacement_back_logic = """                if (false) {
                } else {"""
if target_back_logic in char_content:
    char_content = char_content.replace(target_back_logic, replacement_back_logic)

with open("src/components/CharacterCreation.jsx", "w", encoding="utf-8") as f:
    f.write(char_content)
    print("CharacterCreation updated.")
