import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { StudentData } from '@/data/mockData';

interface ProgressOverlayProps {
  student: StudentData;
}

const ProgressOverlay = ({ student }: ProgressOverlayProps) => {
  return (
    <motion.div
      className="absolute top-4 right-4 z-20 glass-panel p-4 w-64"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Target className="w-4 h-4 text-primary" />
        </div>
        <p className="font-display font-bold text-sm text-foreground">Próxima meta</p>
      </div>
      <p className="text-sm text-foreground mb-1">{student.nextGoal}</p>
      <p className="text-xs text-muted-foreground">{student.nextGoalMissing}</p>
    </motion.div>
  );
};

export default ProgressOverlay;
