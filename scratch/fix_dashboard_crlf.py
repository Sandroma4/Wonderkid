import sys

path = 'src/components/Dashboard.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """                      <div className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700/50 rounded-3xl p-0 md:p-4 shadow-2xl flex flex-col items-center h-fit relative z-10 mb-2">
                        <div className="w-full mb-2 text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 py-1.5 rounded-xl shadow-sm flex items-center justify-center border border-rose-500/20">
                          ⚔️ Rival
                        </div>
                        <div className="inline-block" style={{ backgroundColor: 'transparent' }}>"""

replacement = """                      <div className="flex flex-col items-center justify-center relative z-10 mb-2 w-full">
                        <div className="inline-block" style={{ backgroundColor: 'transparent' }}>"""

content = content.replace(target, replacement)

# If it didn't work because of CRLF vs LF:
target_crlf = target.replace('\n', '\r\n')
content = content.replace(target_crlf, replacement)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
