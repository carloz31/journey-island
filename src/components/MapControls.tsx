import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, HelpCircle, Volume2, VolumeX } from 'lucide-react';

interface MapControlsProps {
  onLeaderboardClick: () => void;
  onHelpClick: () => void;
}

const MapControls = ({ onLeaderboardClick, onHelpClick }: MapControlsProps) => {
  const [soundOn, setSoundOn] = useState(true);

  const controls = [
    { icon: Trophy, label: 'Leaderboard', onClick: onLeaderboardClick },
    { icon: HelpCircle, label: 'Ayuda', onClick: onHelpClick },
    { icon: soundOn ? Volume2 : VolumeX, label: soundOn ? 'Sonido on' : 'Sonido off', onClick: () => setSoundOn(s => !s) },
  ];

  return (
    <motion.div
      className="absolute top-3 right-3 z-20 flex flex-row gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {controls.map(({ icon: Icon, label, onClick }) => (
        <motion.button
          key={label}
          onClick={onClick}
          className="glass-panel w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-muted/60 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="w-4 h-4 text-foreground" />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default MapControls;
