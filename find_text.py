from PIL import Image

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size

min_y = height
max_y = 0

for y in range(height):
    for x in range(width):
        r, g, b, a = data[x, y]
        # Dark blue pixel
        if a > 20 and r < 140 and g < 140 and b < 140:
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"Dark pixels found between Y={min_y} and Y={max_y} (Image height: {height})")
