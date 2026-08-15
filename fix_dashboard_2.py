import re

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

stats_pattern = re.compile(r'(\s*\{\/\* STATS DÉTAILLÉES \(Toujours visible\) \*\/\}[\s\S]*?</div>\s*</div>\s*</div>)', re.MULTILINE)
graph_pattern = re.compile(r'(\s*\{\/\* GRAPH VALEUR MARCHANDE \*\/\}[\s\S]*?</div>\s*</div>\s*\)\})', re.MULTILINE)

stats_match = stats_pattern.search(content)
graph_match = graph_pattern.search(content)

if stats_match and graph_match:
    stats_code = stats_match.group(1)
    graph_code = graph_match.group(1)
    
    desktop_stats = f'<div className="hidden md:block">{stats_code}</div>'
    mobile_graph = f'<div className="block md:hidden">{graph_code}</div>'
    
    desktop_graph = f'<div className="hidden md:block">{graph_code}</div>'
    mobile_stats = f'<div className="block md:hidden">{stats_code}</div>'
    
    col1_replacement = f'<> {desktop_stats} {mobile_graph} </>'
    col2_replacement = f'<> {desktop_graph} {mobile_stats} </>'
    
    content = content.replace(stats_code, col1_replacement)
    content = content.replace(graph_code, col2_replacement)
    print("Replaced stats and graph")
else:
    print("Not found")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
