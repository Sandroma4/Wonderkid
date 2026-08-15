with open("src/components/Dashboard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

target = 'Ys Rester  {club.name}'
replacement = '🏠 Rester à {club.name}'

if target in content:
    content = content.replace(target, replacement)
    print("Replaced successfully!")
else:
    print("Could not find target.")

with open("src/components/Dashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
