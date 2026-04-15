import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Play, RotateCcw, Eye, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IslandNode } from '@/data/islandData';

interface Props {
  node: IslandNode | null;
  open: boolean;
  onClose: () => void;
}

const statusConfig = {
  locked: { label: 'Bloqueado', variant: 'outline' as const, color: 'text-muted-foreground' },
  available: { label: 'Disponible', variant: 'secondary' as const, color: 'text-secondary' },
  in_progress: { label: 'En progreso', variant: 'default' as const, color: 'text-primary' },
  completed: { label: 'Completado', variant: 'secondary' as const, color: 'text-success' },
};

const IslandActivitySidePanel = ({ node, open, onClose }: Props) => {
  if (!node) return null;

  const cfg = statusConfig[node.status];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col glass-panel rounded-l-2xl border-l border-border shadow-xl overflow-hidden">
              {/* Header illustration */}
              <div className="relative h-44 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.2))' }}>
                <span className="text-7xl">{node.imageEmoji}</span>
                <button onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 flex items-center justify-center hover:bg-background transition-colors">
                  <X className="w-4 h-4 text-foreground" />
                </button>

                {/* Type tag */}
                <div className="absolute bottom-3 left-4">
                  <Badge variant="outline" className="bg-background/80 text-xs">
                    {node.type === 'exploration' ? '🌿 Exploración' : '🛤️ Camino principal'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {node.duration}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">{node.title}</h2>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{node.description}</p>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  Tipo: {node.activityType}
                </div>

                {/* Locked message */}
                {node.status === 'locked' && node.lockedReason && (
                  <div className="rounded-lg border border-border bg-muted/50 p-3 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">{node.lockedReason}</p>
                  </div>
                )}
              </div>

              {/* Action button */}
              <div className="p-5 pt-0">
                {node.status === 'locked' ? (
                  <Button disabled variant="outline" className="w-full">
                    <Lock className="w-4 h-4 mr-2" /> Bloqueado
                  </Button>
                ) : node.status === 'completed' ? (
                  <Button variant="secondary" className="w-full">
                    <Eye className="w-4 h-4 mr-2" /> Ver resultado
                  </Button>
                ) : node.status === 'in_progress' ? (
                  <Button className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" /> Continuar
                  </Button>
                ) : (
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" /> Comenzar
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IslandActivitySidePanel;
