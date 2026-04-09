import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tutorialSteps } from '@/data/mockData';

interface HelpTutorialOverlayProps {
  open: boolean;
  onClose: () => void;
}

const TypewriterText = ({ text, speed = 25 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}<span className="animate-pulse">|</span></span>;
};

const HelpTutorialOverlay = ({ open, onClose }: HelpTutorialOverlayProps) => {
  const [step, setStep] = useState(0);

  const handleClose = useCallback(() => {
    setStep(0);
    onClose();
  }, [onClose]);

  const isLast = step === tutorialSteps.length - 1;
  const isFirst = step === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Darkened backdrop */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={handleClose} />

          {/* Pepe character */}
          <motion.div
            className="absolute bottom-44 left-1/2 -translate-x-[calc(50%+200px)] z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border-4 border-primary/40 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-5xl">🐒</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-xs font-display font-bold text-primary">Pepe</span>
            </div>
          </motion.div>

          {/* Dialogue box */}
          <motion.div
            className="relative z-10 w-full max-w-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-panel p-6 border-2 border-primary/30 shadow-lg shadow-primary/10">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Step indicator */}
              <div className="flex gap-1 mb-3">
                {tutorialSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full flex-1 transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>

              {/* Text area */}
              <div className="min-h-[60px] text-sm text-foreground leading-relaxed font-body">
                <TypewriterText key={step} text={tutorialSteps[step].text} />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(s => s - 1)}
                  disabled={isFirst}
                  className="text-xs gap-1"
                >
                  <ChevronLeft className="w-3 h-3" /> Anterior
                </Button>

                {isLast ? (
                  <Button
                    size="sm"
                    onClick={handleClose}
                    className="text-xs gap-1"
                  >
                    Salir
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setStep(s => s + 1)}
                    className="text-xs gap-1"
                  >
                    Siguiente <ChevronRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpTutorialOverlay;
