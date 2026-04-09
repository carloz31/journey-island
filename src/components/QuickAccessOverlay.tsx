import { motion } from 'framer-motion';
import { User, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { availableActivities } from '@/data/mockData';

const quickLinks = [
  { label: 'Perfil vocacional', icon: User },
  { label: 'Carreras de interés', icon: Compass },
  { label: 'Diario de reflexión', icon: BookOpen },
];

const QuickAccessOverlay = () => {
  return (
    <>
      {/* Quick access buttons - bottom left */}
      <motion.div
        className="absolute bottom-4 left-4 z-20 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        {quickLinks.map((link) => (
          <button
            key={link.label}
            className="glass-panel px-3 py-2 flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <link.icon className="w-4 h-4 text-primary" />
            <span className="text-xs font-body font-semibold text-foreground">{link.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Available activities - bottom right */}
      <motion.div
        className="absolute bottom-4 right-4 z-20 glass-panel p-4 w-72"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-bold text-sm text-foreground">Actividades disponibles</p>
          <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
            Ver todas <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="space-y-2">
          {availableActivities.slice(0, 3).map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            >
              <div>
                <p className="text-xs font-semibold text-foreground">{act.title}</p>
                <p className="text-[10px] text-muted-foreground">{act.region} · {act.type}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-glow-teal animate-pulse-glow" />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default QuickAccessOverlay;
