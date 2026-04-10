import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy, Star, Target, User, Award, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StudentData } from '@/data/mockData';
import { availableActivities } from '@/data/mockData';

interface SidePanelProps {
  student: StudentData;
  onBadgesClick: () => void;
}

const SidePanel = ({ student, onBadgesClick }: SidePanelProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const counselorPct = student.counselorProgress;
  const progressPct = student.platformProgress;

  const quickLinks = [
    { label: 'Ver perfil', icon: User, onClick: undefined },
    { label: 'Ver insignias', icon: Award, onClick: onBadgesClick },
    { label: 'Carreras de interés', icon: Compass, onClick: undefined },
    { label: 'Diario de reflexión', icon: BookOpen, onClick: undefined },
  ];

  return (
    <div className="absolute top-0 left-0 z-20 h-full flex">
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            className="glass-panel w-72 h-full overflow-y-auto flex flex-col gap-4 p-4 rounded-none rounded-r-xl border-l-0"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Welcome card */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 border-2 border-primary">
                  <AvatarFallback className="bg-primary/15 text-primary font-display font-bold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">¡Bienvenida de nuevo!</p>
                  <p className="font-display font-bold text-sm text-foreground">{student.name}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progreso total</span>
                  <span className="text-primary font-semibold">{progressPct}%</span>
                </div>
                <div className="relative w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-accent z-10"
                    style={{ left: `${counselorPct}%` }}
                  />
                  <div
                    className="absolute -top-0.5 w-2 h-[calc(100%+4px)] rounded-sm bg-accent"
                    style={{ left: `calc(${counselorPct}% - 3px)` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Meta del orientador: {counselorPct}% <span className="text-accent font-bold">▼</span>
                </p>
              </div>

              {/* Achievements */}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-foreground">{student.totalBadges}</span>
                  <span className="text-[10px] text-muted-foreground">insignias</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-foreground">{student.totalPoints}</span>
                  <span className="text-[10px] text-muted-foreground">puntos</span>
                </div>
              </div>
            </div>

            {/* Next goal */}
            <div className="border-t border-border pt-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="font-display font-bold text-xs text-foreground">Próxima meta</p>
              </div>
              <p className="text-xs text-foreground">{student.nextGoal}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{student.nextGoalMissing}</p>
            </div>

            {/* Quick access */}
            <div className="border-t border-border pt-3">
              <p className="font-display font-bold text-xs text-foreground mb-2">Acceso rápido</p>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.onClick}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                  >
                    <link.icon className="w-3.5 h-3.5 text-primary" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Available activities */}
            <div className="border-t border-border pt-3 flex-1 min-h-0 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-bold text-xs text-foreground">Actividades disponibles</p>
                <Button variant="ghost" size="sm" className="text-[10px] text-primary h-auto p-0">
                  Ver todas <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="space-y-1.5 overflow-y-auto flex-1">
                {availableActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{act.title}</p>
                      <p className="text-[10px] text-muted-foreground">{act.region} · {act.type}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="self-center -ml-px glass-panel w-6 h-12 flex items-center justify-center cursor-pointer rounded-r-lg border-l-0 hover:bg-muted/60 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-foreground" /> : <ChevronLeft className="w-3.5 h-3.5 text-foreground" />}
      </button>
    </div>
  );
};

export default SidePanel;
