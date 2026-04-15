import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HelpCircle, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { startIsland, IslandNode } from '@/data/islandData';
import IslandActivitySidePanel from '@/components/IslandActivitySidePanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';

/* ---------- Loading screen ---------- */
const IslandLoadingScreen = ({ name, onDone }: { name: string; onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{ background: 'linear-gradient(180deg, hsl(199 60% 82%), hsl(var(--background)))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shadow-lg"
      >
        <span className="text-5xl">🏝️</span>
      </motion.div>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="font-display text-xl font-bold text-foreground"
      >
        {name}
      </motion.p>
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
    </motion.div>
  );
};

/* ---------- Single node on the island SVG ---------- */
const NodeCircle = ({ node, cx, cy, onSelect, isSelected }: {
  node: IslandNode; cx: number; cy: number; onSelect: () => void; isSelected: boolean;
}) => {
  const r = node.type === 'main' ? 28 : 22;
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isActive = node.status === 'in_progress';

  return (
    <g
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow ring for active/selected */}
      {(isActive || isSelected) && (
        <circle cx={cx} cy={cy} r={r + 6} fill="none"
          stroke={isActive ? 'hsl(187 52% 48%)' : 'hsl(43 86% 63%)'}
          strokeWidth={2.5} opacity={0.5}>
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r}
        fill={isLocked ? 'hsl(205 10% 88%)' : isCompleted ? 'hsl(140 45% 92%)' : 'hsl(0 0% 100%)'}
        stroke={isLocked ? 'hsl(205 10% 75%)' : isCompleted ? 'hsl(140 45% 58%)' : isActive ? 'hsl(187 52% 48%)' : 'hsl(196 25% 82%)'}
        strokeWidth={isCompleted || isActive ? 3 : 2}
        filter="url(#nodeShadow)"
      />

      {/* Emoji icon */}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
        fontSize={node.type === 'main' ? 20 : 16}
        opacity={isLocked ? 0.4 : 1}
      >
        {node.imageEmoji}
      </text>

      {/* Lock overlay */}
      {isLocked && (
        <g transform={`translate(${cx + r * 0.55}, ${cy - r * 0.55})`}>
          <circle r={8} fill="hsl(205 10% 60%)" />
          <text textAnchor="middle" dominantBaseline="central" fontSize={9} fill="white">🔒</text>
        </g>
      )}

      {/* Completed check */}
      {isCompleted && (
        <g transform={`translate(${cx + r * 0.55}, ${cy - r * 0.55})`}>
          <circle r={9} fill="hsl(140 45% 58%)" />
          <text textAnchor="middle" dominantBaseline="central" fontSize={10} fill="white">✓</text>
        </g>
      )}

      {/* Label below */}
      <text x={cx} y={cy + r + 14} textAnchor="middle" fontSize={9}
        fontWeight={600} fill={isLocked ? 'hsl(205 15% 60%)' : 'hsl(205 40% 18%)'}
        className="font-display"
      >
        {node.title.length > 18 ? node.title.slice(0, 16) + '…' : node.title}
      </text>
    </g>
  );
};

/* ---------- Main Island View ---------- */
const IslandView = () => {
  const navigate = useNavigate();
  const { regionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<IslandNode | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  // For now we only have start island
  const island = startIsland;

  const progress = useMemo(() => {
    const completed = island.nodes.filter(n => n.status === 'completed').length;
    return Math.round((completed / island.nodes.length) * 100);
  }, [island]);

  // Compute node positions on a circular island
  const CENTER = 250;
  const ISLAND_R = 140;

  const nodePositions = useMemo(() => {
    return island.nodes.map(node => {
      const angleRad = (node.angle - 90) * (Math.PI / 180);
      const r = ISLAND_R * node.radius;
      return {
        node,
        cx: CENTER + Math.cos(angleRad) * r,
        cy: CENTER + Math.sin(angleRad) * r,
      };
    });
  }, [island]);

  // Main path connections
  const mainPathPositions = useMemo(() => {
    return island.mainPath.map(id => nodePositions.find(np => np.node.id === id)!).filter(Boolean);
  }, [island, nodePositions]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence>
        {loading && <IslandLoadingScreen name={island.name} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/adventure')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-display text-base font-bold text-foreground leading-tight">{island.name}</h1>
            <p className="text-xs text-muted-foreground">{island.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 min-w-[140px]">
            <Progress value={progress} className="h-2.5 flex-1" />
            <span className="text-xs font-bold text-foreground">{progress}%</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setHelpOpen(true)} className="rounded-full">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Island map area */}
      <div className="flex-1 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, hsl(199 60% 85%) 0%, hsl(199 50% 92%) 50%, hsl(199 55% 82%) 100%)' }}
      >
        {!loading && (
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          >
            <svg viewBox="0 0 500 500" className="w-full h-full max-w-[600px] max-h-[600px]" style={{ touchAction: 'none' }}>
              <defs>
                <filter id="nodeShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                </filter>
                <filter id="islandGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="islandGrad" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(140 50% 72%)" />
                  <stop offset="55%" stopColor="hsl(140 40% 60%)" />
                  <stop offset="100%" stopColor="hsl(140 30% 50%)" />
                </radialGradient>
                <radialGradient id="islandInner" cx="45%" cy="40%">
                  <stop offset="0%" stopColor="hsl(140 55% 78%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(140 40% 60%)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ocean waves */}
              {[0, 1, 2].map(i => (
                <ellipse key={i} cx={CENTER} cy={CENTER + 10}
                  rx={ISLAND_R + 35 + i * 18} ry={ISLAND_R + 20 + i * 14}
                  fill="none" stroke="hsl(199 55% 75%)" strokeWidth={1}
                  opacity={0.25 - i * 0.06} strokeDasharray="8,12"
                >
                  <animateTransform attributeName="transform" type="rotate"
                    from={`${i % 2 === 0 ? 0 : 360} ${CENTER} ${CENTER}`}
                    to={`${i % 2 === 0 ? 360 : 0} ${CENTER} ${CENTER}`}
                    dur={`${40 + i * 15}s`} repeatCount="indefinite" />
                </ellipse>
              ))}

              {/* Island shadow */}
              <ellipse cx={CENTER + 4} cy={CENTER + 12} rx={ISLAND_R + 8} ry={ISLAND_R - 10}
                fill="hsl(199 40% 60%)" opacity={0.15} />

              {/* Main island body */}
              <ellipse cx={CENTER} cy={CENTER} rx={ISLAND_R + 5} ry={ISLAND_R - 5}
                fill="url(#islandGrad)" filter="url(#islandGlow)" />

              {/* Inner highlight */}
              <ellipse cx={CENTER - 15} cy={CENTER - 15} rx={ISLAND_R * 0.6} ry={ISLAND_R * 0.5}
                fill="url(#islandInner)" />

              {/* Decorative elements on island */}
              <circle cx={CENTER - 80} cy={CENTER - 50} r={6} fill="hsl(140 50% 68%)" opacity={0.5} />
              <circle cx={CENTER + 70} cy={CENTER + 40} r={5} fill="hsl(140 60% 72%)" opacity={0.4} />
              <circle cx={CENTER - 50} cy={CENTER + 60} r={4} fill="hsl(43 86% 70%)" opacity={0.35} />
              <circle cx={CENTER + 90} cy={CENTER - 30} r={3} fill="hsl(140 45% 65%)" opacity={0.4} />

              {/* Main path connections */}
              {mainPathPositions.map((pos, i) => {
                if (i === 0) return null;
                const prev = mainPathPositions[i - 1];
                const bothCompleted = prev.node.status === 'completed' && pos.node.status === 'completed';
                const oneActive = prev.node.status === 'completed' && (pos.node.status === 'in_progress' || pos.node.status === 'available');
                return (
                  <line key={`path-${i}`}
                    x1={prev.cx} y1={prev.cy}
                    x2={pos.cx} y2={pos.cy}
                    stroke={bothCompleted ? 'hsl(140 45% 58%)' : oneActive ? 'hsl(187 52% 48%)' : 'hsl(205 15% 70%)'}
                    strokeWidth={bothCompleted ? 3 : 2.5}
                    strokeDasharray={bothCompleted ? 'none' : '6,6'}
                    opacity={bothCompleted ? 0.8 : 0.5}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Render nodes */}
              {nodePositions.map(({ node, cx, cy }) => (
                <NodeCircle
                  key={node.id}
                  node={node}
                  cx={cx}
                  cy={cy}
                  onSelect={() => setSelectedNode(node)}
                  isSelected={selectedNode?.id === node.id}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </div>

      {/* Activity side panel */}
      <IslandActivitySidePanel
        node={selectedNode}
        open={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Help tutorial with Pepe - reuse existing overlay with island-specific steps */}
      <HelpTutorialOverlay
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        steps={island.pepeIntro}
      />
    </div>
  );
};

export default IslandView;
