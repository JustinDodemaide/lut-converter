import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UploadCloud, File, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ConversionCardContent = ({
  file,
  setFile,
  getRootProps,
  getInputProps,
  isDragActive,
  fileType,
  handleConvert,
  isLoading,
  error,
  convertedUrl
}) => (
  <CardContent className="space-y-4">
    {!file ? (
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
          {isDragActive ? "Drop the file here..." : `Drag & drop a ${fileType} file`}
        </p>
        <p className="text-sm text-muted-foreground/80">or click to browse</p>
      </div>
    ) : (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center justify-between p-3 text-sm border rounded-lg bg-muted/50">
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
      </AnimatePresence>
    )}

    <Button
      onClick={handleConvert}
      disabled={!file || isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Converting...
        </>
      ) : (
        'Convert'
      )}
    </Button>

    {error && (
      <p className="text-sm text-center text-red-500">{error}</p>
    )}
    {convertedUrl && (
      <div className="text-center">
        <a
          href={convertedUrl}
          download={`converted-${Date.now()}`}
          className="text-primary hover:underline"
        >
          Download Converted File
        </a>
      </div>
    )}
  </CardContent>
);

export default ConversionCardContent;