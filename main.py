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

# Mapping:
#slices_per_row = ceil(sqrt(N))
#slice_x_position = b % slices_per_row
#slice_y_position = floor(b / slices_per_row)

# LUT_3D_SIZE 33
# Line 20869: 0.186340 0.597382 0.907471

# Red coord:
# r = index % N
# r = 20868 % 33 = 9

# Green coord:
# g = floor(index / N) % N
# g = floor(20868 / 33) % 33 = floor(632.36) % 33 = 632 % 33 = 5

# Blue coord:
# b = floor(index / (N * N))
# b = floor(20868 / (33 * 33)) = floor(20868 / 1089) = floor(19.16) = 19

# slice_x_position = b % 6 = 19 % 6 = 1
# slice_y_position = floor(b / 6) = floor(19 / 6) = 3
# pixel_x = (slice_x_position * N) + r = (1 * 33) + 9 = 33 + 9 = 42
# pixel_y = (slice_y_position * N) + g = (3 * 33) + 5 = 99 + 5 = 104
# The color (9,5,19) is placed at (42, 104) in slice (1, 3)