import re

with open('src/utils/gameData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'export const ALL_CLUBS = [' in line:
        start_idx = i
    elif start_idx != -1 and '];' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    seen_names = set()
    new_lines = []
    removed_count = 0
    
    for i in range(start_idx + 1, end_idx):
        line = lines[i]
        match = re.search(r"name:\s*'([^']+)'", line)
        if not match:
             match = re.search(r'name:\s*"([^"]+)"', line)
        if match:
            name = match.group(1).lower().strip()
            if name in seen_names:
                removed_count += 1
                print(f"Removed duplicate: {name}")
                continue
            else:
                seen_names.add(name)
        new_lines.append(line)
        
    final_lines = lines[:start_idx + 1] + new_lines + lines[end_idx:]
    
    with open('src/utils/gameData.js', 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    print(f'Removed {removed_count} duplicate clubs')
else:
    print('ALL_CLUBS not found')
