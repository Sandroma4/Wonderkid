import json
import re
import os

data_path = 'src/utils/gameData.js'

with open(data_path, 'r', encoding='utf8') as f:
    data = f.read()

# Make sure we find the end of the CLUBS array
c_str_end = '];\n\nexport const LIFESTYLE_ITEMS'
if c_str_end not in data:
    # Alternative format check
    c_str_end = '];\nexport const LIFESTYLE_ITEMS'

if c_str_end in data:
    all_new_lines = []
    
    # Process batches 1 to 7
    for batch_num in range(1, 8):
        batch_file = f'clubs_batch{batch_num}.json'
        if os.path.exists(batch_file):
            with open(batch_file, 'r', encoding='utf8') as bf:
                clubs = json.load(bf)
                for c in clubs:
                    desc = c["desc"].replace("'", "\\'")
                    pitch = c["pitch"].replace("'", "\\'")
                    name = c["name"].replace("'", "\\'")
                    line = f"  {{ id: '{c['id']}', ovr: {c['ovr']}, name: '{name}', origin: '{c['origin']}', primary: '{c['primary']}', secondary: '{c['secondary']}', tier: {c['tier']}, leagueName: '{c['leagueName']}', desc: '{desc}', preferredStat: '{c['preferredStat']}', lifestyleFit: '{c['lifestyleFit']}', pitch: '{pitch}' }}"
                    all_new_lines.append(line)
                    
    if all_new_lines:
        data = data.replace(c_str_end, ',\n' + ',\n'.join(all_new_lines) + '\n' + c_str_end)
        
    with open(data_path, 'w', encoding='utf8') as f:
        f.write(data)
    print(f"Successfully injected {len(all_new_lines)} clubs from batches.")
else:
    print("Could not find the insertion point for CLUBS.")
