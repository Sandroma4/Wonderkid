import re

with open('src/components/Dashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the extra closing div at line 1079
# We look for the exact block around 1079
block1 = """                      </div>
                      </div>
                    </div>
                  </div>
                  {/* Gauges (États) */}"""
replacement1 = """                      </div>
                      </div>
                    </div>
                  {/* Gauges (États) */}"""

if block1 in content:
    content = content.replace(block1, replacement1)
    print("Fixed extra div!")
else:
    print("Could not find block1")

# 2. Remove the duplicate mobile stats block
block2 = """</div>
<div className="block md:hidden">
{/* STATS DÉTAILLÉES (Toujours visible) */}"""

block2_end = """                  </div>
                </div>
                  </div>
</div>
              </div>

              {/* ONGLET : CARRIÈRE (TROPHÉES & ÉTAT) */}"""

replacement2 = """</div>
              </div>

              {/* ONGLET : CARRIÈRE (TROPHÉES & ÉTAT) */}"""

start_idx = content.find(block2)
end_idx = content.find(block2_end)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx + 6] + replacement2[6:] + content[end_idx + len(block2_end):]
    print("Fixed duplicate stats block!")
else:
    print("Could not find block2 or block2_end")

with open('src/components/Dashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
