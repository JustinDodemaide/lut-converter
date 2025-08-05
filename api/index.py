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
from flask import Flask, request, send_file, jsonify
from io import BytesIO

app = Flask(__name__)

@app.route('/api/cube-to-png', methods=['POST'])
def cube_to_png():
    # Check if the file was uploaded
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    try:
        lines = file.read().decode('utf-8').splitlines()
        lut_size = None

        # get the LUT_3D_SIZE and make the blank png
        for line in lines:
            if line.startswith("LUT_3D_SIZE"):
                lut_size = int(line.strip().split()[1])
                break
        
        if lut_size is None:
            return jsonify({"error": "LUT_3D_SIZE not found in the file"}), 400
        
        
        img = Image.new("RGB", (lut_size * lut_size, lut_size), (0, 0, 0))

        # parse the data section
        index = 0
        for line in lines:
            line = line.strip()
            is_empty = line.strip() == ""
            if is_empty:
                continue  # skip empty lines
            if line.startswith(("LUT_3D_SIZE", "#", "TITLE", "DOMAIN_MIN", "DOMAIN_MAX")):
                continue  # skip header lines

            # map the rgb values to pixels
            r, g, b = map(float, line.strip().split())

            r_index = index % lut_size
            g_index = (index // lut_size) % lut_size
            b_index = index // (lut_size * lut_size)

            x = b_index * lut_size + r_index
            y = g_index

            # add the color to the image
            img.putpixel((x, y), (int(r * 255), int(g * 255), int(b * 255)))

            index += 1


        # return the image
        # since we're hosting this service on Vercel, we can't save the image as a file
        # https://www.reddit.com/r/nextjs/comments/zo5ez3/creating_a_file_using_fs_on_vercel/
        # "severless functions can't write to the filesystem"
        # so we need to save the file to memory and respond with that instead
        img_io = BytesIO()
        img.save(img_io, format='PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='converted-lut.png')
    
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500