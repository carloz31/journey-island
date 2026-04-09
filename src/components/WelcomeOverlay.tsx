import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Star } from 'lucide-react';
import { StudentData } from '@/data/mockData';

interface WelcomeOverlayProps {
  student: StudentData;
}

const WelcomeOverlay = ({ student }: WelcomeOverlayProps) => {
  const counselorPct = student.counselorProgress;
  const progressPct = student.platformProgress;

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

      {/* Unified progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progreso total</span>
          <span className="text-primary font-semibold">{progressPct}%</span>
        </div>
        <div className="relative w-full h-2.5 rounded-full bg-muted overflow-hidden">
          {/* Progress fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all"
            style={{ width: `${progressPct}%` }}
          />
          {/* Counselor threshold marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-accent z-10"
            style={{ left: `${counselorPct}%` }}
          />
          <div
            className="absolute -top-0.5 w-2 h-[calc(100%+4px)] rounded-sm bg-accent/80"
            style={{ left: `calc(${counselorPct}% - 3px)` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Meta del orientador: {counselorPct}% <span className="text-accent">▼</span>
        </p>
      </div>

      {/* Achievements row */}
      <div className="flex items-center gap-4 pt-2 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">{student.totalBadges}</span>
          <span className="text-[10px] text-muted-foreground">insignias</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">{student.totalPoints}</span>
          <span className="text-[10px] text-muted-foreground">puntos</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
