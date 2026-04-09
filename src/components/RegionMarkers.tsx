import { motion } from 'framer-motion';
import { Lock, Sparkles, Loader2, CheckCircle2, Users } from 'lucide-react';
import { Region, RegionStatus } from '@/data/mockData';

interface RegionMarkersProps {
  regions: Region[];
  onRegionClick: (region: Region) => void;
}

const statusConfig: Record<RegionStatus, { icon: typeof Lock; ringClass: string; bgClass: string }> = {
  locked: { icon: Lock, ringClass: 'border-locked', bgClass: 'bg-locked/50' },
  available: { icon: Sparkles, ringClass: 'border-glow-teal', bgClass: 'bg-glow-teal/20' },
  in_progress: { icon: Loader2, ringClass: 'border-primary', bgClass: 'bg-primary/20' },
  restored: { icon: CheckCircle2, ringClass: 'border-restored', bgClass: 'bg-restored/20' },
};

const RegionMarkers = ({ regions, onRegionClick }: RegionMarkersProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {regions.map((region, idx) => {
        const config = statusConfig[region.status];
        const Icon = region.isParentBlock ? Users : config.icon;
        const isActive = region.status === 'restored' || region.status === 'in_progress';
        const isClickable = region.status !== 'locked';

        return (
          <motion.div
            key={region.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${region.position.x}%`,
              top: `${region.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
          >
            <motion.button
              onClick={() => onRegionClick(region)}
              disabled={!isClickable}
              className={`
                relative flex flex-col items-center gap-2 group
                ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
              whileHover={isClickable ? { scale: 1.1 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              {/* Glow ring for active */}
              {isActive && (
                <motion.div
                  className={`absolute w-16 h-16 rounded-full ${config.ringClass} border-2 -top-1 -left-1`}
                  style={{ width: 64, height: 64, left: -8, top: -8 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Marker circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  border-2 ${config.ringClass} ${config.bgClass}
                  backdrop-blur-sm transition-all duration-300
                  ${isClickable ? 'group-hover:shadow-lg' : 'opacity-50'}
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    region.status === 'locked' ? 'text-muted-foreground' :
                    region.status === 'in_progress' ? 'text-primary animate-spin' :
                    'text-foreground'
                  }`}
                  style={region.status === 'in_progress' ? { animationDuration: '3s' } : {}}
                />
              </div>

              {/* Label */}
              <div className="glass-panel px-3 py-1 text-center min-w-max">
                <p className="text-xs font-display font-semibold text-foreground leading-tight">
                  {region.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{region.subtitle}</p>
              </div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RegionMarkers;
