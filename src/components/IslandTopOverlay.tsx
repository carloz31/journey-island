import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type IslandTopOverlayProps = {
  name: string;
  subtitle: string;
  progress: number;
  onBackClick: () => void;
  onHelpClick: () => void;
};

const IslandTopOverlay = ({
  name,
  subtitle,
  progress,
  onBackClick,
  onHelpClick,
}: IslandTopOverlayProps) => (
  <motion.div
    className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon"
        className="glass-panel w-9 h-9 rounded-xl"
        onClick={onBackClick}
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="glass-panel px-3 py-1.5 rounded-xl">
        <p className="font-display text-sm font-bold text-foreground leading-tight">{name}</p>
        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="glass-panel px-3 py-1.5 rounded-xl flex items-center gap-2 min-w-[130px]">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-xs font-bold text-foreground">{progress}%</span>
      </div>
      <Button variant="ghost" size="icon"
        className="glass-panel w-9 h-9 rounded-xl"
        onClick={onHelpClick}
      >
        <HelpCircle className="w-4 h-4 text-muted-foreground" />
      </Button>
    </div>
  </motion.div>
);

export default IslandTopOverlay;
