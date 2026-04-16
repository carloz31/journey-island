import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  character: string;
  avatar: string;
  text: string;
}

const DialogueLayer = ({ character, avatar, text }: Props) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl ring-2 ring-accent/60 shadow-lg"
          style={{ background: 'hsla(var(--accent) / 0.25)', backdropFilter: 'blur(8px)' }}
        >
          {avatar}
        </div>
        <span className="text-[9px] font-bold tracking-wide uppercase text-accent drop-shadow-md">
          {character}
        </span>
      </div>

      {/* Bubble */}
      <div
        className="flex-1 rounded-xl border border-border/30 px-4 py-3 shadow-lg"
        style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(14px)' }}
      >
        <p className="text-sm leading-relaxed text-primary-foreground">
          {displayedText}
          {!done && <span className="animate-pulse">▌</span>}
        </p>
      </div>
    </motion.div>
  );
};

export default DialogueLayer;
