// src/App.jsx

import { useState, useCallback } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useDropzone } from 'react-dropzone';
import { cn } from "@/lib/utils";
import { UploadCloud } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';
import { File } from 'lucide-react';

function App() {
  const [conversionMode, setConversionMode] = useState("cubeToPng");
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // Dropzone hooks
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setConvertedUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.cube'],
      'image/png': ['.png']
    },
    multiple: false,
  });
  // End dropzone hooks


  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Tabs value={conversionMode} onValueChange={setConversionMode} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cubeToPng">Cube to PNG</TabsTrigger>
          <TabsTrigger value="pngToCube">PNG to Cube</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cubeToPng">
          <Card>
            <CardHeader>
              <CardTitle>Convert .CUBE to .PNG</CardTitle>
              <CardDescription>Upload a .cube file to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={cn(
                  "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                  isDragActive ? "border-primary bg-muted" : "border-border hover:border-primary/50"
                )}
              >
                <input {...getInputProps()} />
                <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isDragActive ? "Drop the file here..." : `Drag & drop a .cube file`}
                </p>
                <p className="text-sm text-muted-foreground/80">or click to browse</p>
              </div>

              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="mt-4 flex items-center justify-between p-3 text-sm border rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <File className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        &times;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pngToCube">
          <Card>
            <CardHeader>
              <CardTitle>Convert .CUBE to .PNG</CardTitle>
              <CardDescription>Upload a .cube file to begin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={cn(
                  "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                  isDragActive ? "border-primary bg-muted" : "border-border hover:border-primary/50"
                )}
              >
                <input {...getInputProps()} />
                <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isDragActive ? "Drop the file here..." : `Drag & drop a .png file`}
                </p>
                <p className="text-sm text-muted-foreground/80">or click to browse</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;