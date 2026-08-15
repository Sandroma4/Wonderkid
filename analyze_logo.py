from PIL import Image
import collections

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size
colors = collections.Counter()

for y in range(height):
    for x in range(width):
        r, g, b, a = data[x, y]
        if a > 50:
            # group similar colors by dividing by 32
            c = (r//32, g//32, b//32)
            colors[c] += 1

print(colors.most_common(10))
