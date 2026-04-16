import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { RpgStep } from '@/data/activityData';

interface Props {
  step: RpgStep;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const RpgDialogueStep = ({ step, onNext, onBack, isFirst, isLast }: Props) => {
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
    }, 12);
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
      className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-20"
    >
      <div className="relative max-w-5xl w-full mx-auto">
        {/* Avatar - overlapping top of dialogue box */}
        <div className="absolute -top-14 left-6 sm:left-10 z-30 flex flex-col items-center gap-1">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-5xl sm:text-6xl ring-3 ring-accent/60 shadow-xl"
            style={{ background: 'hsla(var(--accent) / 0.25)', backdropFilter: 'blur(8px)' }}
          >
            {step.avatar}
          </div>
          <span className="text-[10px] font-bold tracking-wide uppercase text-accent drop-shadow-md">
            {step.character}
          </span>
        </div>

        {/* Dialogue box */}
        <div
          className="rounded-2xl border border-border/30 shadow-2xl overflow-hidden"
          style={{ background: 'hsla(var(--foreground) / 0.72)', backdropFilter: 'blur(20px)' }}
        >
          {/* Text area - offset left to account for avatar */}
          <div className="px-6 sm:px-8 pt-6 pb-4 min-h-[120px] sm:min-h-[140px]">
            <div className="pl-28 sm:pl-36">
              <p className="text-sm sm:text-base leading-relaxed text-primary-foreground">
                {displayedText}
                {!done && <span className="animate-pulse">▌</span>}
              </p>
            </div>
          </div>

          {/* Next button */}
          <div className="px-6 sm:px-8 pb-4 flex justify-between">
            {!isFirst ? (
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                  bg-background/20 text-primary-foreground hover:bg-background/30 active:scale-95"
              >
                ◂ Anterior
              </button>
            ) : <div />}
            <button
              onClick={handleClick}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                bg-accent text-accent-foreground hover:brightness-110 active:scale-95"
            >
              {!done ? 'Saltar ▸' : isLast ? '✨ Finalizar' : 'Siguiente ▸'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RpgDialogueStep;
