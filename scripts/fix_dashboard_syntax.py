import re

dashboard_file = "src/components/Dashboard.jsx"
with open(dashboard_file, "r", encoding="utf-8") as f:
    dashboard = f.read()

# I need to find the `) : (` that introduces the two siblings and change it to `) : (<>`
# And then find `      )}\n          </div>\n        </div>` (the closing block) and change it to `      )}</>\n          </div>\n        </div>`
# Let's do it carefully.

target1 = """) : (
            <div className="text-center mb-8">"""
repl1 = """) : (
            <>
            <div className="text-center mb-8">"""

if target1 in dashboard:
    dashboard = dashboard.replace(target1, repl1)
else:
    print("Could not find target1")

target2 = """                 )})}
               </div>
            )}
          </div>
        </div>"""
repl2 = """                 )})}
               </div>
            )}
            </>
          </div>
        </div>"""

if target2 in dashboard:
    dashboard = dashboard.replace(target2, repl2)
else:
    # try regex
    match_end = re.search(r'\}\)\}\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>', dashboard, re.DOTALL)
    if match_end:
        repl = match_end.group(0).replace(')}\n          </div>', ')}\n            </>\n          </div>')
        dashboard = dashboard.replace(match_end.group(0), repl)
    else:
        print("Could not find target2")

with open(dashboard_file, "w", encoding="utf-8") as f:
    f.write(dashboard)
print("Fixed syntax in Dashboard.jsx")
