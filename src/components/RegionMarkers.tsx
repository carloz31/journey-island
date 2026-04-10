import { motion } from 'framer-motion';
import { Lock, Sparkles, CheckCircle2, Users } from 'lucide-react';
import { Region, RegionStatus } from '@/data/mockData';

interface RegionMarkersProps {
  regions: Region[];
  onRegionClick: (region: Region) => void;
}

const statusConfig: Record<RegionStatus, { icon: typeof Lock; ringColor: string; bgColor: string; textColor: string }> = {
  locked:      { icon: Lock,         ringColor: 'border-inactive',  bgColor: 'bg-muted',         textColor: 'text-inactive' },
  available:   { icon: Sparkles,     ringColor: 'border-primary',   bgColor: 'bg-primary/10',    textColor: 'text-primary' },
  restored:    { icon: CheckCircle2, ringColor: 'border-success',   bgColor: 'bg-success/15',    textColor: 'text-success' },
};

const RegionMarkers = ({ regions, onRegionClick }: RegionMarkersProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {regions.map((region, idx) => {
        const config = statusConfig[region.status];
        const Icon = region.isParentBlock ? Users : config.icon;
        const isActive = region.status === 'restored';
        const isClickable = region.status !== 'locked';

        return (
          <motion.div
            key={region.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${region.position.x}%`,
              top: `${(region.position.y / 70) * 100}%`,
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
              {/* wrapper solo del icono */}
              <div className="relative w-11 h-11">
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 rounded-full ${config.ringColor} border-2`}
                    style={{
                      width: 56,
                      height: 56,
                      left: -6,
                      top: -6,
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center
                    border-2 ${config.ringColor} ${config.bgColor}
                    shadow-md transition-all duration-300 bg-card
                    ${isClickable ? 'group-hover:shadow-lg' : 'opacity-50'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${config.textColor}`} />
                </div>
              </div>

              <div className="glass-panel px-3 py-1 text-center min-w-max shadow-sm">
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
