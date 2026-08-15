from PIL import Image

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size
changed = 0

for y in range(666, 750):
    for x in range(width):
        r, g, b, a = data[x, y]
        # Any non-transparent pixel that is darkish blue/black
        # In our analysis, the text is mostly (0,0,1) which is R<32, G<32, B<64
        if a > 0 and r < 150 and g < 150 and b < 150:
            # We preserve the original alpha to keep edges smooth
            data[x, y] = (16, 185, 129, a)
            changed += 1

print(f"Replaced {changed} pixels in the text area!")
img.save('c:\\Users\\romai\\golden-xi\\public\\logo.png')
