
# LUT Converter

![LUT Converter Banner](https://github.com/user-attachments/assets/80951361-0678-4188-9059-f3d721a6d292)

A web-based tool that converts between .cube LUT files and PNG images, making color grading LUTs portable across different software platforms.

## Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

- **Frontend**: React + Vite
- **Backend**: Python with Flask
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## How to Use

### In-browser

1. Go to [lut-converter.vercel.app](https://lut-converter.vercel.app)
2. Choose conversion (.cube to PNG or PNG to .cube)
3. Upload or drag and drop your file
4. Download will start automatically after conversion

You can find LUTs at:
- [FreshLUTs](https://freshluts.com)
- Uppbeat.io
- DaVinci Resolve built-in LUTs
- Adobe Premiere Pro LUT presets

### Local Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JustinDodemaide/lut-converter.git
   cd lut-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Python requirements**
   ```bash
    pip install -r requirements.txt
    ```

4. **Start the Flask Server**
   ```bash
   flask run
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Navigate to `http://localhost:5173` (or the port shown in your terminal) in your browser
     
## How It Works
Color grading is a process common to video and photo editing that involves adjusting attributes like contrast, saturation, and white balance to alter the presentation of an image. Normally, this requires going through each pixel of the original image, performing a mathematical function on the pixel's color value to produce a new color value, then applying that value to the same pixel position.

A lookup table precalculates the output color of every input color, which allows us to replace the mathematical function with a simple lookup operation.

The lookup table (LUT) is an array that utilizes direct addressing: the values of an input color (r, g, b) are the indices of its respective output color.

The array can be stored in different formats, like an image file or a text file. Different color correction software may not be compatible with some formats (The Godot Engine can perform color correction using PNGs, but not with .cube files), so it may be necessary to convert them to different formats.

The .cube LUT format is a text file with a specific structure:
- **Header Section**: Contains metadata including `LUT_3D_SIZE` (typically 17, 33, 51, or 65)
- **Data Section**: RGB values
  - Each line contains 3 space-separated floats (0.0 - 1.0) (R, G, B)
  - A 33-size LUT contains 35,937 lines of color data (33³)

#### PNG LUT Format

- **Dimensions**: Width and height = LUT_3D_SIZE × LUT_3D_SIZE
  - Example: 33-size LUT → 1089×1089 pixel PNG (33×33)
- **Pixel Mapping**: Each pixel represents a specific color transformation

#### Conversion Process

**CUBE to PNG Conversion:**
1. Parse the .cube file header to extract LUT_3D_SIZE
2. Create a blank PNG with dimensions (SIZE×SIZE)²
3. Map each RGB triplet from the .cube file to corresponding pixels
4. Each line's RGB values (0-1 range) are converted to pixel values (0-255 range)
5. Save the resulting PNG with new color data

**PNG to CUBE Conversion:**
Same process but in reverse.
1. Read PNG dimensions to determine LUT_3D_SIZE
2. Extract pixel RGB values
3. Convert pixel values (0-255) to floating-point (0-1)
4. Generate .cube header with appropriate LUT_3D_SIZE
5. Write data section with RGB values in the correct triplet format

Because the website is deployed on Vercel, the functions have an "ephemeral filesystem," and the completed conversion files can't be written to storage. We instead use BytesIO to write the converted file to memory and send it as a response.

## Reflection

### What I Learned

- **LUTs as a data structure** - Learned about the practical applications and performance advantages of LUTs, especially in enabling real-time color correction in game engines and speeding up render times in coloring software like Resolve
- **File Parsing** - Learned a couple interesting ways that the same data could be stored in different formats. Got some experience reading the data from very different (text based vs. image based) file formats
- **Full-Stack Integration**: Successfully connected React frontend with Python backend using Flask, gaining hands-on experience with networking functionalities and I/O operations
-   **Component Libraries**: Learned the advantage of using pre-made component libraries in React

### Potential Features

- [ ] Generate LUTs from before/after image pairs
- [ ] Support for additional LUT formats (.3dl, .mga, .m3d)
- [ ] Progress indicators for large file conversions
- [ ] Batch conversion for multiple files
- [ ] LUT preview - apply LUT to sample images before downloading
- [ ] LUT editor - allow the user to adjust HSL

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) - Thanks for the UI components
- [Uppbeat.io](https://uppbeat.io) - Sample LUT files for testing
