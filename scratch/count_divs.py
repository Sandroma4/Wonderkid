import re

with open('src/components/Dashboard.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('<div className="grid grid-cols-1 md:grid-cols-4 gap-4">')
text_from_grid = text[start_idx:]
end_idx = text_from_grid.find('</>')
chunk = text_from_grid[:end_idx]

lines = chunk.split('\n')
depth = 0
for i, line in enumerate(lines):
    opens = len(re.findall(r'<div(?=[\s>])', line))
    closes = line.count('</div')
    if opens > 0 or closes > 0:
        depth += opens - closes
        print(f'{i+861:4d} | +{opens} -{closes} | Depth: {depth} | {line.strip()[:60]}')
        if depth == 0:
            print(f'GRID CLOSED AT LINE {i+861}')
            break
