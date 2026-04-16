import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  character: string;
  avatar: string;
  text: string;
  onDismiss: () => void;
}

const DialogueLayer = ({ character, avatar, text, onDismiss }: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 12);
    return () => clearInterval(id);
  }, [text]);

  const handleClick = () => {
    if (!done) {
      setDisplayedText(text);
      setDone(true);
    } else {
      onDismiss();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-20"
    >
      <div className="relative max-w-5xl w-full mx-auto">
        {/* Avatar */}
        <div className="absolute -top-14 left-6 sm:left-10 z-30 flex flex-col items-center gap-1">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-5xl sm:text-6xl ring-3 ring-accent/60 shadow-xl"
            style={{ background: 'hsla(var(--accent) / 0.25)', backdropFilter: 'blur(8px)' }}
          >
            {avatar}
          </div>
          <span className="text-[10px] font-bold tracking-wide uppercase text-accent drop-shadow-md">
            {character}
          </span>
        </div>

        {/* Box */}
        <div
          className="rounded-2xl border border-border/30 shadow-2xl overflow-hidden"
          style={{ background: 'hsla(var(--foreground) / 0.72)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-6 sm:px-8 pt-6 pb-4 min-h-[100px]">
            <div className="pl-28 sm:pl-36">
              <p className="text-sm sm:text-base leading-relaxed text-primary-foreground">
                {displayedText}
                {!done && <span className="animate-pulse">▌</span>}
              </p>
            </div>
          </div>
          <div className="px-6 sm:px-8 pb-4 flex justify-end">
            <button
              onClick={handleClick}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                bg-accent text-accent-foreground hover:brightness-110 active:scale-95"
            >
              {!done ? 'Saltar ▸' : 'Continuar ▸'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DialogueLayer;
