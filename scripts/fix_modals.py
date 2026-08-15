import re

with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix Bilan de la Saison
bilan_start = content.find("/* BILAN DE LA SAISON AVEC AFFICHAGE DE LA CARTE */")
if bilan_start != -1:
    bilan_end = content.find("/* AFFICHER LES NOUVEAUX TRAITS DÉBLOQUÉS (FIN DE SAISON) */", bilan_start)
    if bilan_end == -1: bilan_end = content.find("transferMarketOffers", bilan_start)
    
    bilan_block = content[bilan_start:bilan_end]
    
    bilan_block = bilan_block.replace('text-slate-900 p-2 md:p-6 flex flex-col items-center justify-center', 'text-slate-100 p-2 md:p-6 flex flex-col items-center justify-center')
    bilan_block = bilan_block.replace('bg-white border border-white/50', 'bg-slate-900/95 border border-slate-700/50 backdrop-blur-md')
    bilan_block = bilan_block.replace('text-slate-900 mt-4', 'text-white mt-4')
    bilan_block = bilan_block.replace('bg-slate-100/80', 'bg-slate-800/80')
    bilan_block = bilan_block.replace('border-slate-200/80', 'border-slate-700/50')
    bilan_block = bilan_block.replace('text-slate-600 font-medium uppercase', 'text-slate-400 font-medium uppercase')
    bilan_block = bilan_block.replace('text-slate-900 mt-0.5', 'text-white mt-0.5')
    
    content = content[:bilan_start] + bilan_block + content[bilan_end:]
    print("Bilan de la Saison visually aligned.")

# 2. Fix Marché des Transferts
market_start = content.find("transferMarketOffers && transferMarketOffers.length > 0 ? (")
if market_start != -1:
    market_end = content.find("/* FIN DU BLOC MARCHE DES TRANSFERTS */", market_start)
    if market_end == -1: market_end = content.find("isRetired", market_start)
    
    market_block = content[market_start:market_end]
    
    market_block = market_block.replace('text-slate-900 p-2 md:p-6 flex flex-col', 'text-slate-100 p-2 md:p-6 flex flex-col')
    market_block = market_block.replace('className="bg-white rounded-xl md:rounded-3xl', 'className="bg-slate-800 rounded-xl md:rounded-3xl')
    market_block = market_block.replace('font-bold text-slate-900 truncate', 'font-bold text-white truncate')
    market_block = market_block.replace('text-[9px] md:text-xs text-slate-600 mt-0.5', 'text-[9px] md:text-xs text-slate-400 mt-0.5')
    
    search_str = "              })}\n            </div>\n"
    idx = market_block.find(search_str)
    if idx != -1:
        insert_str = """              })}
            </div>
            
            <div className="mt-4 md:mt-8 flex justify-center shrink-0">
              <button 
                onClick={() => { playSound('click'); onStayCurrentClub(); }}
                className="heading-typography py-3 px-6 md:py-4 md:px-8 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider text-slate-300 bg-slate-800 border-2 border-slate-700 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
              >
                🏠 Rester à {club.name}
              </button>
            </div>
"""
        market_block = market_block.replace(search_str, insert_str)
        print("Rester au club button added.")
    
    content = content[:market_start] + market_block + content[market_end:]
    print("Marché des Transferts visually aligned.")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
