import re

dashboard_file = "src/components/Dashboard.jsx"
with open(dashboard_file, "r", encoding="utf-8") as f:
    dashboard = f.read()

# Replace the inner block of `interactiveMatchFinalOutcome` false branch.
target = """            ) : (
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                  {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.time}
                </span>
                <span className="bg-slate-800 text-amber-400 border border-amber-500/50 text-sm font-bold px-4 py-1 rounded-full tracking-widest">
                  SCORE DU MATCH : {interactiveMatchScore > 0 ? `+${interactiveMatchScore}` : interactiveMatchScore}
                </span>
              </div>
              <h2 className="text-3xl font-black mt-4">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.title}</h2>
              <p className="text-slate-200 mt-2">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.description}</p>
            </div>

            {interactiveMatchResult ? ("""

repl = """            ) : (
            <>
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                  {interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.time}
                </span>
                <span className="bg-slate-800 text-amber-400 border border-amber-500/50 text-sm font-bold px-4 py-1 rounded-full tracking-widest">
                  SCORE DU MATCH : {interactiveMatchScore > 0 ? `+${interactiveMatchScore}` : interactiveMatchScore}
                </span>
              </div>
              <h2 className="text-3xl font-black mt-4">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.title}</h2>
              <p className="text-slate-200 mt-2">{interactiveMatchPhases[interactiveMatchCurrentPhaseIndex]?.description}</p>
            </div>

            {interactiveMatchResult ? ("""

dashboard = dashboard.replace(target, repl)


target_end = """                   </button>
                 )})}
               </div>
            )}
          </div>
        </div>
      ) : ("""

repl_end = """                   </button>
                 )})}
               </div>
            )}
            </>
            )}
          </div>
        </div>
      ) : ("""

dashboard = dashboard.replace(target_end, repl_end)

with open(dashboard_file, "w", encoding="utf-8") as f:
    f.write(dashboard)
print("Updated Dashboard.jsx")
