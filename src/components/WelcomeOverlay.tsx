import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { StudentData } from '@/data/mockData';

interface WelcomeOverlayProps {
  student: StudentData;
}

const WelcomeOverlay = ({ student }: WelcomeOverlayProps) => {
  return (
    <motion.div
      className="absolute top-4 left-4 z-20 glass-panel p-4 w-72"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10 border-2 border-primary">
          <AvatarFallback className="bg-primary/20 text-primary font-display font-bold text-sm">
            {student.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-muted-foreground">¡Bienvenida de nuevo!</p>
          <p className="font-display font-bold text-sm text-foreground">{student.name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Plan orientador</span>
            <span className="text-primary font-semibold">{student.counselorProgress}%</span>
          </div>
          <Progress value={student.counselorProgress} className="h-1.5" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Plataforma total</span>
            <span className="text-secondary font-semibold">{student.platformProgress}%</span>
          </div>
          <Progress value={student.platformProgress} className="h-1.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
