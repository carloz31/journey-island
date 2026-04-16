import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy, Star, Target, User, Award, Compass, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StudentData } from '@/data/mockData';
import { availableActivities } from '@/data/mockData';

interface SidePanelProps {
  student: StudentData;
  onBadgesClick: () => void;
}

const ACTIVITIES_PER_PAGE = 5;

const SidePanel = ({ student, onBadgesClick }: SidePanelProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activityPage, setActivityPage] = useState(0);

  const counselorPct = student.counselorProgress;
  const progressPct = student.platformProgress;
  const activityPages = Math.max(1, Math.ceil(availableActivities.length / ACTIVITIES_PER_PAGE));
  const currentActivities = availableActivities.slice(
    activityPage * ACTIVITIES_PER_PAGE,
    activityPage * ACTIVITIES_PER_PAGE + ACTIVITIES_PER_PAGE,
  );
  const progressRadius = 42;
  const progressStroke = 9;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressOffset = progressCircumference * (1 - progressPct / 100);
  const counselorAngle = (counselorPct / 100) * 360 - 90;
  const counselorAngleRad = (counselorAngle * Math.PI) / 180;
  const counselorMarkerX = 56 + Math.cos(counselorAngleRad) * progressRadius;
  const counselorMarkerY = 56 + Math.sin(counselorAngleRad) * progressRadius;

  const quickLinks = [
    { label: 'Ver perfil', icon: User, onClick: () => navigate('/profile') },
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

              {/* Progress ring */}
              <div className="mb-3 flex flex-col items-center">
                <p className="mb-2 text-xs text-muted-foreground">Progreso total</p>
                <div className="relative h-28 w-28">
                  <svg className="h-28 w-28" viewBox="0 0 112 112">
                    <circle
                      cx="56"
                      cy="56"
                      r={progressRadius}
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth={progressStroke}
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r={progressRadius}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={progressStroke}
                      strokeLinecap="round"
                      strokeDasharray={progressCircumference}
                      strokeDashoffset={progressOffset}
                      transform="rotate(-90 56 56)"
                      className="transition-all duration-500"
                    />
                    <circle
                      cx={counselorMarkerX}
                      cy={counselorMarkerY}
                      r="4"
                      fill="hsl(var(--accent))"
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary">{progressPct}%</span>
                    <span className="text-[10px] text-muted-foreground">completado</span>
                  </div>
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                  Meta del orientador: <span className="font-bold text-accent">{counselorPct}%</span>
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
                {availableActivities.length > ACTIVITIES_PER_PAGE && (
                  <span className="text-[10px] text-muted-foreground">
                    {activityPage + 1}/{activityPages}
                  </span>
                )}
              </div>
              <div className="space-y-1.5 overflow-y-auto flex-1">
                {currentActivities.length > 0 ? (
                  currentActivities.map((act) => (
                    <button
                      key={act.id}
                      onClick={() => navigate(`/adventure/island/${act.regionId}`)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-left hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-foreground">{act.title}</p>
                        <p className="text-[10px] text-muted-foreground">{act.region} · {act.type}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    </button>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-muted/20 px-3 py-4 text-center">
                    <p className="text-xs font-semibold text-foreground">No hay actividades por realizar de momento.</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Vuelve más tarde para revisar nuevas tareas.</p>
                  </div>
                )}
              </div>
              {availableActivities.length > ACTIVITIES_PER_PAGE && (
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <button
                    onClick={() => setActivityPage(page => Math.max(0, page - 1))}
                    disabled={activityPage === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Actividades anteriores"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] text-muted-foreground">
                    {Math.min(activityPage * ACTIVITIES_PER_PAGE + 1, availableActivities.length)}
                    -
                    {Math.min((activityPage + 1) * ACTIVITIES_PER_PAGE, availableActivities.length)}
                    {' '}de {availableActivities.length}
                  </span>
                  <button
                    onClick={() => setActivityPage(page => Math.min(activityPages - 1, page + 1))}
                    disabled={activityPage >= activityPages - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Actividades siguientes"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
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
