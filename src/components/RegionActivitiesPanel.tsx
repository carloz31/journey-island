import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Lock, Play, RotateCcw, Eye } from 'lucide-react';
import { Region, Activity, ActivityStatus } from '@/data/mockData';

interface RegionActivitiesPanelProps {
  region: Region | null;
  open: boolean;
  onClose: () => void;
}

const statusBadge: Record<ActivityStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  locked: { label: 'Bloqueado', variant: 'outline' },
  available: { label: 'Disponible', variant: 'secondary' },
  in_progress: { label: 'En progreso', variant: 'default' },
  completed: { label: 'Completado', variant: 'secondary' },
};

const ActionButton = ({ status }: { status: ActivityStatus }) => {
  const config = {
    locked: { label: 'Bloqueado', icon: Lock, disabled: true },
    available: { label: 'Comenzar', icon: Play, disabled: false },
    in_progress: { label: 'Continuar', icon: RotateCcw, disabled: false },
    completed: { label: 'Ver resultado', icon: Eye, disabled: false },
  }[status];

  return (
    <Button
      disabled={config.disabled}
      variant={status === 'locked' ? 'outline' : 'default'}
      className="w-full mt-4"
    >
      <config.icon className="w-4 h-4 mr-2" />
      {config.label}
    </Button>
  );
};

const ActivityCard = ({ activity, direction }: { activity: Activity; direction: number }) => (
  <motion.div
    key={activity.id}
    initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="glass-panel p-6 min-h-[240px] flex flex-col"
  >
    <div className="flex items-center justify-between mb-3">
      <Badge variant={statusBadge[activity.status].variant}>
        {statusBadge[activity.status].label}
      </Badge>
      <span className="text-xs text-muted-foreground">{activity.type}</span>
    </div>
    <h3 className="font-display text-lg font-bold text-foreground mb-2">{activity.title}</h3>
    <p className="text-sm text-muted-foreground flex-1">{activity.description}</p>
    {activity.status === 'locked' && activity.lockedReason && (
      <p className="text-xs text-accent mt-2 flex items-center gap-1">
        <Lock className="w-3 h-3" />
        {activity.lockedReason}
      </p>
    )}
    <ActionButton status={activity.status} />
  </motion.div>
);

const RegionActivitiesPanel = ({ region, open, onClose }: RegionActivitiesPanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!region) return null;

  const activities = region.activities;

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return activities.length - 1;
      if (next >= activities.length) return 0;
      return next;
    });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) { onClose(); setCurrentIndex(0); } }}>
      <SheetContent
        side="bottom"
        className="bg-card/90 backdrop-blur-xl border-t border-border/50 max-h-[50vh] rounded-t-2xl"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="font-display text-xl">
            {region.name}
            <span className="text-muted-foreground text-sm font-body ml-2">
              — {region.subtitle}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="relative flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0 rounded-full"
            disabled={activities.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex-1 overflow-hidden relative" style={{ minHeight: 260 }}>
            <AnimatePresence mode="wait" initial={false}>
              <ActivityCard
                activity={activities[currentIndex]}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(1)}
            className="shrink-0 rounded-full"
            disabled={activities.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {activities.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RegionActivitiesPanel;
