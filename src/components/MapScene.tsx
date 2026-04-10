import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { regions } from '@/data/mockData';

/* Each island is drawn as a stylised floating landmass.
   Visual state is driven by region.status:
     locked       → grey / desaturated / dim
     available    → muted colours, sparse detail (sad / incomplete)
     in_progress  → muted colours, sparse detail, subtle pulse
     restored     → full colour, lush detail, glow
*/

interface IslandProps {
  cx: number;
  cy: number;
  status: string;
  theme: 'green' | 'snow' | 'volcano' | 'desert' | 'water' | 'forest' | 'crystal';
}

const islandThemes: Record<string, { base: string; detail: string; highlight: string }> = {
  green:   { base: '#6BBF7B', detail: '#4A9E5A', highlight: '#A8E6A3' },
  snow:    { base: '#C5D8E8', detail: '#8FAEC0', highlight: '#EBF4FA' },
  volcano: { base: '#D98050', detail: '#B85C3A', highlight: '#F2B08A' },
  desert:  { base: '#E6C872', detail: '#C4A44E', highlight: '#F5E6A8' },
  water:   { base: '#6DB8D0', detail: '#4A96AD', highlight: '#A8DDE8' },
  forest:  { base: '#5AA06A', detail: '#3D7A4E', highlight: '#8FD4A0' },
  crystal: { base: '#A88BD4', detail: '#8668B8', highlight: '#D4C4F0' },
};

const FloatingIsland = ({ cx, cy, status, theme }: IslandProps) => {
  const t = islandThemes[theme] || islandThemes.green;
  const isLocked = status === 'locked';
  const isRestored = status === 'restored';
  const isActive = status === 'in_progress' || status === 'available';

  // Determine visual intensity
  const mainOpacity = isLocked ? 0.35 : isRestored ? 1 : 0.65;
  const satFilter = isLocked ? 'saturate(0.2)' : isRestored ? 'saturate(1.1)' : 'saturate(0.6)';

  return (
    <g filter={isRestored ? 'url(#glow)' : undefined} style={{ opacity: mainOpacity }}>
      {/* Island shadow on water */}
      <ellipse cx={cx} cy={cy + 45} rx={52} ry={10} fill="#4A8FA8" opacity={0.15} />

      {/* Bottom cliff / rock face */}
      <path
        d={`M${cx - 50},${cy + 10} Q${cx - 55},${cy + 30} ${cx - 30},${cy + 42} Q${cx},${cy + 50} ${cx + 30},${cy + 42} Q${cx + 55},${cy + 30} ${cx + 50},${cy + 10} Z`}
        fill={isLocked ? '#8899A5' : t.detail}
        style={{ filter: satFilter }}
      />

      {/* Main island top */}
      <ellipse cx={cx} cy={cy + 8} rx={52} ry={22} fill={isLocked ? '#A0AEB8' : t.base} style={{ filter: satFilter }} />

      {/* Surface detail: restored gets lush vegetation / features */}
      {isRestored && (
        <>
          {/* Trees / lush elements */}
          <circle cx={cx - 18} cy={cy - 8} r={12} fill={t.highlight} opacity={0.7} />
          <circle cx={cx - 14} cy={cy - 14} r={10} fill={t.detail} opacity={0.8} />
          <circle cx={cx + 15} cy={cy - 5} r={10} fill={t.highlight} opacity={0.6} />
          <circle cx={cx + 10} cy={cy - 12} r={8} fill={t.detail} opacity={0.7} />
          <circle cx={cx} cy={cy - 10} r={6} fill={t.highlight} opacity={0.5} />
        </>
      )}

      {/* Active but incomplete: sparse/small elements */}
      {isActive && (
        <>
          <circle cx={cx - 12} cy={cy - 2} r={6} fill={t.highlight} opacity={0.35} />
          <circle cx={cx + 10} cy={cy} r={5} fill={t.detail} opacity={0.3} />
        </>
      )}

      {/* Locked: no decoration, just a subtle cross-hatch feel */}
      {isLocked && (
        <line x1={cx - 20} y1={cy + 5} x2={cx + 20} y2={cy + 5} stroke="#7A8A96" strokeWidth={1} opacity={0.3} strokeDasharray="4,4" />
      )}
    </g>
  );
};

const MapScene = () => {
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 5,
    })), []
  );

  // Island themes mapped to regions
  const regionThemes: Record<string, 'green' | 'snow' | 'volcano' | 'desert' | 'water' | 'forest' | 'crystal'> = {
    'self-knowledge': 'green',
    'exploration': 'water',
    'skills': 'snow',
    'decision': 'volcano',
    'parents': 'crystal',
    'projects': 'desert',
    'future': 'forest',
  };

  // Stepping-stone paths between connected islands
  const connections: [string, string][] = [
    ['self-knowledge', 'exploration'],
    ['skills', 'self-knowledge'],
    ['self-knowledge', 'parents'],
    ['exploration', 'future'],
    ['decision', 'projects'],
    ['decision', 'future'],
  ];

  const regionMap = Object.fromEntries(regions.map(r => [r.id, r]));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(199 60% 82%) 0%, hsl(199 50% 92%) 40%, hsl(199 55% 80%) 100%)',
        }}
      />

      {/* Subtle cloud shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 200, height: 60, top: '8%', left: '10%', background: 'rgba(255,255,255,0.5)', filter: 'blur(20px)' }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 150, height: 45, top: '15%', right: '15%', background: 'rgba(255,255,255,0.4)', filter: 'blur(18px)' }}
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 180, height: 50, top: '5%', left: '55%', background: 'rgba(255,255,255,0.35)', filter: 'blur(22px)' }}
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      {/* SVG Island map */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stepping-stone dotted paths */}
        {connections.map(([from, to]) => {
          const a = regionMap[from];
          const b = regionMap[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.position.x * 10}
              y1={a.position.y * 10}
              x2={b.position.x * 10}
              y2={b.position.y * 10}
              stroke="hsl(205 15% 70%)"
              strokeWidth={2}
              strokeDasharray="6,8"
              opacity={0.45}
            />
          );
        })}

        {/* Stepping stones along paths */}
        {connections.map(([from, to]) => {
          const a = regionMap[from];
          const b = regionMap[to];
          if (!a || !b) return null;
          const stones = [0.25, 0.5, 0.75];
          return stones.map((t, i) => (
            <circle
              key={`stone-${from}-${to}-${i}`}
              cx={a.position.x * 10 + (b.position.x * 10 - a.position.x * 10) * t}
              cy={a.position.y * 10 + (b.position.y * 10 - a.position.y * 10) * t}
              r={3}
              fill="hsl(205 15% 70%)"
              opacity={0.4}
            />
          ));
        })}

        {/* Islands */}
        {regions.map((region) => (
          <FloatingIsland
            key={region.id}
            cx={region.position.x * 10}
            cy={region.position.y * 10}
            status={region.status}
            theme={regionThemes[region.id] || 'green'}
          />
        ))}
      </svg>

      {/* Floating particles (soft light specks) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'hsl(43 86% 63% / 0.5)',
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Soft water reflection at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(199 55% 72% / 0.3), transparent)',
        }}
      />
    </div>
  );
};

export default MapScene;
