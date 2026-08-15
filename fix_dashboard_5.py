import re

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

stats_pattern = r'(\{/\* STATS DÉTAILLÉES \(Toujours visible\) \*/\}.*?</div>\s*</div>\s*</div>\s*</div>)'
# Actually, the stats block ends precisely at line 621.
# Let's extract exactly what's between "{/* STATS DÉTAILLÉES (Toujours visible) */}" and "              </div>\n\n              {/* ONGLET : TERRAIN (EVENTS) */}"
stats_start = content.find("{/* STATS DÉTAILLÉES (Toujours visible) */}")
stats_end_str = "              </div>\n\n              {/* ONGLET : TERRAIN (EVENTS) */}"
stats_end = content.find(stats_end_str)
stats_code = content[stats_start:stats_end]

graph_start = content.find("{/* GRAPH VALEUR MARCHANDE */}")
graph_end_str = "              </div>\n\n              {/* ONGLET : CARRIÈRE (TROPHÉES & ÉTAT) */}"
graph_end = content.find(graph_end_str)
graph_code = content[graph_start:graph_end]

if stats_start != -1 and stats_end != -1 and graph_start != -1 and graph_end != -1:
    col1_replacement = f'<div className="hidden md:block">\n{stats_code}</div>\n<div className="block md:hidden">\n{graph_code}</div>\n'
    col2_replacement = f'<div className="hidden md:block">\n{graph_code}</div>\n<div className="block md:hidden">\n{stats_code}</div>\n'
    
    # We must be careful not to replace one and break the other.
    # Since we are using exact string offsets or replacements, let's just do sequential replace.
    # Wait, graph_code might change if we replace stats_code first?
    # String .replace() is safe.
    content = content.replace(stats_code, col1_replacement)
    # Wait, now `stats_code` is in `content` twice (inside col1_replacement).
    # So `content.replace(graph_code, col2_replacement)` might also replace the graph_code we just inserted!
    
    # To fix this, we can do it manually by string splicing.
    
with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()
    
stats_start = content.find("{/* STATS DÉTAILLÉES (Toujours visible) */}")
stats_end = content.find(stats_end_str)
stats_code = content[stats_start:stats_end]

graph_start = content.find("{/* GRAPH VALEUR MARCHANDE */}")
graph_end = content.find(graph_end_str)
graph_code = content[graph_start:graph_end]

if stats_start != -1 and stats_end != -1 and graph_start != -1 and graph_end != -1:
    content = content[:stats_start] + f'<div className="hidden md:block">\n{stats_code}</div>\n<div className="block md:hidden">\n{graph_code}</div>\n' + content[stats_end:]
    
    # Now recalculate graph position
    graph_start = content.find("{/* GRAPH VALEUR MARCHANDE */}", content.find("ONGLET : TERRAIN (EVENTS)"))
    graph_end = content.find(graph_end_str)
    
    if graph_start != -1 and graph_end != -1:
        content = content[:graph_start] + f'<div className="hidden md:block">\n{graph_code}</div>\n<div className="block md:hidden">\n{stats_code}</div>\n' + content[graph_end:]
        print("Successfully swapped blocks!")
    else:
        print("Failed on second swap")
else:
    print("Could not find stats or graph")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
