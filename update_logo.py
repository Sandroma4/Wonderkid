from PIL import Image

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size
start_y = int(height * 0.75)
changed = 0

for y in range(start_y, height):
    for x in range(width):
        r, g, b, a = data[x, y]
        # Text WONDERKID is very dark, but maybe not purely blue.
        # Let's loosen the threshold to catch the text:
        # Any pixel that is dark (RGB all < 120) and not fully transparent.
        if a > 20 and r < 140 and g < 140 and b < 140:
            data[x, y] = (16, 185, 129, a)
            changed += 1

print(f"Pixels changed: {changed}")
img.save('c:\\Users\\romai\\golden-xi\\public\\logo.png')
