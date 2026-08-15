from PIL import Image

img_path = 'C:\\Users\\romai\\Downloads\\Gemini_Generated_Image_ykppcnykppcnykpp (1).png'
img = Image.open(img_path)
img = img.convert('RGBA')

data = img.load()
width, height = img.size

has_transparency = False
for y in range(height):
    for x in range(width):
        r, g, b, a = data[x, y]
        if a < 255:
            has_transparency = True
            break
    if has_transparency:
        break

print(f"Has transparency: {has_transparency}")
