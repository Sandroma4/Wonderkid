from PIL import Image

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size

# Calculate density of dark pixels per row
row_density = []
for y in range(height):
    count = 0
    for x in range(width):
        r, g, b, a = data[x, y]
        if a > 20 and r < 140 and g < 140 and b < 140:
            count += 1
    row_density.append(count)

# Find the gap between the logo and the text
# We scan backwards from Y=748
text_bottom = 748
gap_y = -1
for y in range(text_bottom, 0, -1):
    if row_density[y] == 0:
        gap_y = y
        break

print(f"Gap found at Y={gap_y}. Text is between Y={gap_y} and Y={text_bottom}.")
