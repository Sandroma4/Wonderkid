from PIL import Image

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size

# Find the gap between the logo and the text
# Calculate density of non-transparent pixels per row
row_density = []
for y in range(height):
    count = 0
    for x in range(width):
        r, g, b, a = data[x, y]
        if a > 50:
            count += 1
    row_density.append(count)

# Start looking from the bottom up to find the text
text_bottom = height - 1
while text_bottom > 0 and row_density[text_bottom] == 0:
    text_bottom -= 1

# Now find the gap (where density is 0) above the text
gap_y = text_bottom
while gap_y > 0 and row_density[gap_y] > 0:
    gap_y -= 1

print(f"Gap found at Y={gap_y}. Text is between Y={gap_y} and Y={text_bottom}.")

# Make everything below the gap white
changed = 0
for y in range(gap_y, height):
    for x in range(width):
        r, g, b, a = data[x, y]
        # Change the color to white, but keep the original alpha for smooth edges
        if a > 0:
            data[x, y] = (255, 255, 255, a)
            changed += 1

print(f"Changed {changed} pixels to white in the text area!")
img.save('c:\\Users\\romai\\golden-xi\\public\\logo.png')
