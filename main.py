# each lut has a header and data section
# starts with a blank line
# header is "LUT_3D_SIZE" followed by 17, 33, 51, or 65 (33 in our example .cube)
# the data is lines and lines of floats. Each line has 3 floats seperated by spaces
# our example has 35939 lines (example: 0.998993 0.998016 0.998474)
# Each value represents a red green blue value

# the height and width of a lut png are LUT_3D_SIZE * LUT_3D_SIZE. Our example would be
# 1089x1089 pixels

# So to convert a .cube to a png:
# First, parse the cube file and get the LUT_3D_SIZE
# Create a blank png in the appropriate dimensions based on the LUT_3D_SIZE
# Map the .cube section to pixels - Parse each line, determine the rgb value of the line,
# map it to a pixel on the png



from PIL import Image
import math

# get the LUT_3D_SIZE and make the blank png
with open("Cinematic-Teal.cube", "r") as f:
    for line in f:
        if line.startswith("LUT_3D_SIZE"):
            lut_size = int(line.strip().split()[1])
            break
    img = Image.new("RGB", (lut_size * lut_size, lut_size), (0, 0, 0))
    # todo: if eof and no lut size, raise error


# parse the cube file and map the rgb values to pixels
    index = 0
    for line in f:
        if line.strip() == "":
            continue  # skip empty lines

        r, g, b = map(float, line.strip().split())

        r_index = index % lut_size
        g_index = (index // lut_size) % lut_size
        b_index = index // (lut_size * lut_size)

        x = b_index * lut_size + r_index
        y = g_index

        index += 1

        # add the color to the image
        img.putpixel((x, y), (int(r * 255), int(g * 255), int(b * 255)))

# save the image
img.save("Cinematic-Teal.png")