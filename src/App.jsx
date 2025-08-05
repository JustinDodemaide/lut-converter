import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



function App() {
  const [count, setCount] = useState(0)
  const [conversionMode, setConversionMode] = useState("cubeToPng") // or "pngToCube"
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Tabs value={conversionMode} onValueChange={setConversionMode}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cubeToPng">Cube to PNG</TabsTrigger>
          <TabsTrigger value="pngToCube">PNG to Cube</TabsTrigger>
        </TabsList>
        <TabsContent value="cubeToPng">
          // upload box for cube file
        </TabsContent>
        <TabsContent value="pngToCube">
          // upload box for PNG file
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App