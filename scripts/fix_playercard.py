with open("src/components/PlayerCard.jsx", "r", encoding="utf-8") as f:
    content = f.read()

target = 'className={`relative inline-block select-none transform transition-transform duration-300 hover:scale-[1.02] scale-75 md:scale-100 origin-top ${className}`}'
replacement = 'className={`relative inline-block select-none transform transition-transform duration-300 hover:scale-[1.02] scale-75 md:scale-100 origin-top mb-[-92px] mx-[-32px] md:mb-0 md:mx-0 ${className}`}'

if target in content:
    content = content.replace(target, replacement)
    print("Replaced PlayerCard successfully!")
else:
    print("Could not find target in PlayerCard.")

with open("src/components/PlayerCard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
