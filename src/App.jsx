// src/App.jsx

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import ConversionCardContent from '@/components/ConversionCardContent'; // Adjust path if needed

function App() {
  const [conversionMode, setConversionMode] = useState("cube-to-png");
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleModeChange = (newMode) => {
    setConversionMode(newMode);
    setFile(null);
    setConvertedUrl(null);
    setError(null);
  }

  
  // Dropzone hook
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
  // End dropzone hook


  // API call
  const handleConvert = async () => {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setConvertedUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/convert/${conversionMode}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);

    } catch (err) {
      setError(err.message || "Failed to convert file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // API call end


  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Tabs value={conversionMode} onValueChange={handleModeChange} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cube-to-png">Cube to PNG</TabsTrigger>
          <TabsTrigger value="png-to-cube">PNG to Cube</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cube-to-png">
          <Card>
            <CardHeader>
              <CardTitle>Convert .CUBE to .PNG</CardTitle>
              <CardDescription>Upload a .cube file</CardDescription>
            </CardHeader>
            <ConversionCardContent
                file={file}
                setFile={setFile}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                fileType=".cube"
                handleConvert={handleConvert}
                isLoading={isLoading}
                error={error}
                convertedUrl={convertedUrl}
            />
          </Card>
        </TabsContent>
        <TabsContent value="png-to-cube">
           <Card>
            <CardHeader>
              <CardTitle>Convert .PNG to .CUBE</CardTitle>
              <CardDescription>Upload a .png file</CardDescription>
            </CardHeader>
             <ConversionCardContent
                file={file}
                setFile={setFile}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                fileType=".png"
                handleConvert={handleConvert}
                isLoading={isLoading}
                error={error}
                convertedUrl={convertedUrl}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;