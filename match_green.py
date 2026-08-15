from PIL import Image
import collections

# Reload the original downloaded image so we don't double-process the text
# Wait, did the user overwrite it in their Downloads?
# Let's just read the current logo.png, find the brightest green in the upper part,
# and recolor the text area (Y > 666).

img_path = 'c:\\Users\\romai\\golden-xi\\public\\logo.png'
img = Image.open(img_path)
img = img.convert('RGBA')
data = img.load()

width, height = img.size

# 1. Find the exact RGB of the prominent bright green in the graphic (Y < 666)
green_colors = collections.Counter()
for y in range(666):
    for x in range(width):
        r, g, b, a = data[x, y]
        # Look for bright green
        if g > 150 and r < g - 40 and b < g - 40:
            green_colors[(r, g, b)] += 1

if green_colors:
    best_green = green_colors.most_common(1)[0][0]
    print(f"Found exact green color: {best_green}")
else:
    best_green = (116, 255, 68) # Fallback neon green
    print(f"Could not find green, using fallback: {best_green}")

# 2. Re-color the text area (Y > 666)
# Notice that the text might currently be colored (16, 185, 129) from our last script!
# So we need to look for pixels that are (16, 185, 129) OR dark blue, and change them.
changed = 0
for y in range(666, height):
    for x in range(width):
        r, g, b, a = data[x, y]
        # If it's the green we previously set, or if it's a dark color
        is_previous_green = (r == 16 and g == 185 and b == 129)
        is_dark = (r < 150 and g < 150 and b < 150)
        
        if a > 0 and (is_previous_green or is_dark):
            data[x, y] = (best_green[0], best_green[1], best_green[2], a)
            changed += 1

print(f"Replaced {changed} pixels with exact green {best_green}")
img.save('c:\\Users\\romai\\golden-xi\\public\\logo.png')
