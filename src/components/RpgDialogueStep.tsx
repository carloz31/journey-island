import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { RpgStep } from '@/data/activityData';

interface Props {
  step: RpgStep;
  onNext: () => void;
  isLast: boolean;
}

const RpgDialogueStep = ({ step, onNext, isLast }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayedText(step.text.slice(0, i));
      if (i >= step.text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [step.text]);

  const handleClick = () => {
    if (!done) {
      setDisplayedText(step.text);
      setDone(true);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20"
    >
      <div className="max-w-2xl mx-auto rounded-2xl border border-border/30 shadow-2xl overflow-hidden"
        style={{ background: 'hsla(var(--foreground) / 0.72)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-start gap-4 p-5">
          {/* Avatar */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl ring-2 ring-accent/60 shadow-lg"
              style={{ background: 'hsla(var(--accent) / 0.25)' }}>
              {step.avatar}
            </div>
            <span className="text-[10px] font-bold tracking-wide uppercase text-accent">{step.character}</span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm sm:text-base leading-relaxed text-primary-foreground">
              {displayedText}
              {!done && <span className="animate-pulse">▌</span>}
            </p>
          </div>
        </div>

        {/* Next button */}
        <div className="px-5 pb-4 flex justify-end">
          <button
            onClick={handleClick}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all
              bg-accent text-accent-foreground hover:brightness-110 active:scale-95"
          >
            {!done ? 'Saltar ▸' : isLast ? '✨ Finalizar' : 'Siguiente ▸'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RpgDialogueStep;
