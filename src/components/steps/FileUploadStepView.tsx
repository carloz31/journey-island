import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import type { FileUploadStep } from '@/data/activityData';

interface Props {
  step: FileUploadStep;
  file: File | null;
  onFileChange: (f: File | null) => void;
}

const FileUploadStepView = ({ step, file, onFileChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFileChange(f);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center h-full px-4"
    >
      <div
        className="max-w-lg w-full rounded-2xl border border-border/20 p-6 sm:p-8 shadow-xl"
        style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }}
      >
        <h3 className="text-base sm:text-lg font-semibold text-primary-foreground mb-4">
          {step.prompt}
        </h3>

        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors
            ${dragging
              ? 'border-accent bg-accent/10'
              : 'border-border/30 bg-background/10 hover:border-accent/40'
            }
          `}
        >
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 text-accent" />
              <p className="text-sm text-primary-foreground font-medium">{file.name}</p>
              <p className="text-xs text-primary-foreground/50">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-primary-foreground/40" />
              <p className="text-sm text-primary-foreground/60">
                Arrastra un archivo aquí o haz clic para seleccionar
              </p>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={step.accept}
          className="hidden"
          onChange={e => onFileChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </motion.div>
  );
};

export default FileUploadStepView;
