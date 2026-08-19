import os
import re

components_dir = os.path.join("src", "components")
app_file = os.path.join("src", "App.jsx")
index_file = os.path.join("index.html")

files_to_process = [app_file, index_file]
for root, _, files in os.walk(components_dir):
    for file in files:
        if file.endswith(".jsx"):
            files_to_process.append(os.path.join(root, file))

mapping = {
    # Darken emerald-50 to emerald-100
    r'(?<![\w:-])bg-emerald-50(?![\w/-])': 'bg-emerald-100',
    # Darken emerald-100 to emerald-200
    r'(?<![\w:-])bg-emerald-100(?![\w/-])': 'bg-emerald-200',
    # Darken emerald-200 to emerald-300
    r'(?<![\w:-])bg-emerald-200(?![\w/-])': 'bg-emerald-300',
    
    # Also adjust opacities if any
    r'(?<![\w:-])bg-emerald-50/(\d+)': r'bg-emerald-100/\1',
    r'(?<![\w:-])bg-emerald-100/(\d+)': r'bg-emerald-200/\1',
    r'(?<![\w:-])bg-emerald-200/(\d+)': r'bg-emerald-300/\1',
}

for fp in files_to_process:
    if not os.path.exists(fp): continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
        
    orig = content
    for pattern, repl in mapping.items():
        content = re.sub(pattern, repl, content)
        
    if orig != content:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fp}")

print("Done making emerald darker.")
