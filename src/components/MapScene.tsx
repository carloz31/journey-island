import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { regions } from '@/data/mockData';

const IslandShape = ({ status, cx, cy, r, color }: { status: string; cx: number; cy: number; r: number; color: string }) => {
  const isActive = status === 'restored' || status === 'in_progress';
  const isAvailable = status === 'available';

  const fillOpacity = isActive ? 0.6 : isAvailable ? 0.3 : 0.1;
  const glowColor = color === 'glow-gold' ? '#d4a024' : color === 'glow-teal' ? '#2dd4bf' : '#f06292';

  return (
    <g>
      {isActive && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={r + 20}
          fill={glowColor}
          opacity={0}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={r * 0.7}
        fill={glowColor}
        opacity={fillOpacity}
        filter={isActive ? 'url(#glow)' : undefined}
      />
      {isActive && (
        <ellipse
          cx={cx}
          cy={cy - r * 0.15}
          rx={r * 0.6}
          ry={r * 0.4}
          fill={glowColor}
          opacity={0.2}
        />
      )}
    </g>
  );
};

const MapScene = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ocean gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(200 50% 20%), hsl(215 60% 12%) 60%, hsl(220 40% 6%) 100%)',
        }}
      />

      {/* SVG Island regions */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main island landmass */}
        <ellipse cx={480} cy={380} rx={380} ry={240} fill="hsl(150 20% 15%)" opacity={0.4} />
        <ellipse cx={460} cy={360} rx={340} ry={200} fill="hsl(140 15% 18%)" opacity={0.3} />

        {/* Region blobs */}
        {regions.map((region) => (
          <IslandShape
            key={region.id}
            status={region.status}
            cx={region.position.x * 10}
            cy={region.position.y * 10}
            r={70}
            color={region.color}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'hsl(38 90% 55% / 0.4)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Mist layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, hsl(200 40% 30% / 0.15) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, hsl(38 60% 40% / 0.1) 0%, transparent 40%)',
        }}
      />
    </div>
  );
};

export default MapScene;
