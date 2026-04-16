import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type MapLoadingScreenProps = {
  onDone: () => void;
};

const MapLoadingScreen = ({ onDone }: MapLoadingScreenProps) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{ background: 'linear-gradient(180deg, hsl(199 60% 82%), hsl(var(--background)))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-lg"
      >
        <span className="text-5xl">{'\u{1F5FA}\uFE0F'}</span>
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="font-display text-xl font-bold text-foreground"
      >
        Cargando aventura
      </motion.p>
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
    </motion.div>
  );
};

export default MapLoadingScreen;
