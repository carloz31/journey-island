import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HelpCircle, Loader2, Plus, Minus, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { startIsland, IslandNode } from '@/data/islandData';
import IslandActivitySidePanel from '@/components/IslandActivitySidePanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';
import TopBar from '@/components/TopBar';

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

/* ---------- Node positions now come from IslandNode.x / .y ---------- */

/* ---------- Single node ---------- */
const NodeCircle = ({ node, cx, cy, onSelect, isSelected }: {
  node: IslandNode; cx: number; cy: number; onSelect: () => void; isSelected: boolean;
}) => {
  const isMain = node.type === 'main';
  const r = isMain ? 32 : 26;
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isActive = node.status === 'in_progress';

  // Blue for main, yellow/amber for secondary
  const colors = isMain
    ? { bg: 'hsl(210 70% 96%)', border: 'hsl(210 70% 55%)', activeBorder: 'hsl(210 80% 50%)', completedBg: 'hsl(210 60% 92%)', completedBorder: 'hsl(210 60% 45%)', glow: 'hsl(210 80% 55%)' }
    : { bg: 'hsl(43 90% 95%)', border: 'hsl(43 80% 50%)', activeBorder: 'hsl(43 90% 45%)', completedBg: 'hsl(43 70% 90%)', completedBorder: 'hsl(43 70% 42%)', glow: 'hsl(43 90% 55%)' };

  const getBg = () => {
    if (isLocked) return 'hsl(205 10% 90%)';
    if (isCompleted) return colors.completedBg;
    return colors.bg;
  };
  const getBorder = () => {
    if (isLocked) return 'hsl(205 10% 75%)';
    if (isCompleted) return colors.completedBorder;
    if (isActive) return colors.activeBorder;
    return colors.border;
  };

  return (
    <g onClick={(e) => { e.stopPropagation(); onSelect(); }} style={{ cursor: 'pointer' }} data-island>
      {/* Glow for active/selected */}
      {(isActive || isSelected) && (
        <circle cx={cx} cy={cy} r={r + 8} fill="none"
          stroke={colors.glow} strokeWidth={2.5} opacity={0.45}>
          <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Background */}
      <circle cx={cx} cy={cy} r={r}
        fill={getBg()} stroke={getBorder()}
        strokeWidth={isCompleted || isActive ? 3 : 2}
        filter="url(#nodeShadow)"
      />

      {/* Emoji */}
      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="central"
        fontSize={isMain ? 22 : 18} opacity={isLocked ? 0.35 : 1}
      >
        {node.imageEmoji}
      </text>

      {/* Lock badge */}
      {isLocked && (
        <g transform={`translate(${cx + r * 0.6}, ${cy - r * 0.6})`}>
          <circle r={9} fill="hsl(205 10% 60%)" />
          <text textAnchor="middle" dominantBaseline="central" fontSize={10} fill="white">🔒</text>
        </g>
      )}

      {/* Completed check */}
      {isCompleted && (
        <g transform={`translate(${cx + r * 0.6}, ${cy - r * 0.6})`}>
          <circle r={10} fill={isMain ? 'hsl(210 60% 45%)' : 'hsl(43 70% 42%)'} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={11} fill="white">✓</text>
        </g>
      )}

      {/* Label */}
      <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize={10}
        fontWeight={600} fill={isLocked ? 'hsl(205 15% 60%)' : 'hsl(205 40% 18%)'}
        className="font-display"
      >
        {node.title.length > 20 ? node.title.slice(0, 18) + '…' : node.title}
      </text>

      {/* Activity type tag */}
      {!isLocked && (
        <text x={cx} y={cy + r + 28} textAnchor="middle" fontSize={8}
          fill={isMain ? 'hsl(210 50% 50%)' : 'hsl(43 60% 42%)'} opacity={0.7}
        >
          {node.activityType}
        </text>
      )}
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

  const island = startIsland;

  const progress = useMemo(() => {
    const completed = island.nodes.filter(n => n.status === 'completed').length;
    return Math.round((completed / island.nodes.length) * 100);
  }, [island]);

  /* ---- Pan & Zoom (reused from MapScene) ---- */
  const svgRef = useRef<SVGSVGElement>(null);
  const DEFAULT_VB = { x: 0, y: 0, w: 1000, h: 700 };
  const MIN_W = 400;
  const MAX_W = 1800;

  const [viewBox, setViewBox] = useState({ ...DEFAULT_VB });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const zoomSliderValue = Math.round(((MAX_W - viewBox.w) / (MAX_W - MIN_W)) * 100);

  const applyZoom = useCallback((sliderVal: number) => {
    const newW = MAX_W - (sliderVal / 100) * (MAX_W - MIN_W);
    const newH = newW * 0.7;
    setViewBox(vb => {
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      return { x: cx - newW / 2, y: cy - newH / 2, w: newW, h: newH };
    });
  }, []);

  const zoomIn = useCallback(() => applyZoom(Math.min(100, zoomSliderValue + 15)), [applyZoom, zoomSliderValue]);
  const zoomOut = useCallback(() => applyZoom(Math.max(0, zoomSliderValue - 15)), [applyZoom, zoomSliderValue]);
  const resetView = useCallback(() => setViewBox({ ...DEFAULT_VB }), []);

  const getSvgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * viewBox.w + viewBox.x,
      y: ((clientY - rect.top) / rect.height) * viewBox.h + viewBox.y,
    };
  }, [viewBox]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    const pt = getSvgPoint(e.clientX, e.clientY);
    setViewBox(vb => {
      const nw = Math.min(MAX_W, Math.max(MIN_W, vb.w * factor));
      const nh = Math.min(MAX_W * 0.7, Math.max(MIN_W * 0.7, vb.h * factor));
      const nx = pt.x - (pt.x - vb.x) * (nw / vb.w);
      const ny = pt.y - (pt.y - vb.y) * (nh / vb.h);
      return { x: nx, y: ny, w: nw, h: nh };
    });
  }, [getSvgPoint]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as Element).closest('[data-island]')) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, vx: viewBox.x, vy: viewBox.y };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }, [viewBox]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - panStart.current.x) / rect.width) * viewBox.w;
    const dy = ((e.clientY - panStart.current.y) / rect.height) * viewBox.h;
    setViewBox(vb => ({ ...vb, x: panStart.current.vx - dx, y: panStart.current.vy - dy }));
  }, [isPanning, viewBox.w, viewBox.h]);

  const handlePointerUp = useCallback(() => setIsPanning(false), []);

  /* ---- Node position lookup ---- */
  const nodePositions = useMemo(() => {
    return island.nodes.map(node => {
      const pos = node.type === 'main'
        ? MAIN_NODE_POSITIONS[node.id] || { x: 500, y: 350 }
        : SECONDARY_NODE_POSITIONS[node.id] || { x: 500, y: 250 };
      return { node, cx: pos.x, cy: pos.y };
    });
  }, [island]);

  const mainPathPositions = useMemo(() => {
    return island.mainPath.map(id => nodePositions.find(np => np.node.id === id)!).filter(Boolean);
  }, [island, nodePositions]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence>
        {loading && <IslandLoadingScreen name={island.name} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* System TopBar — same as Adventure */}
      <TopBar
        onLogout={() => navigate('/')}
        onMessagesClick={() => {}}
      />

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, hsl(199 60% 85%) 0%, hsl(199 50% 92%) 50%, hsl(199 55% 82%) 100%)' }}
      >
        {/* Floating overlay: back button + island name + progress + help */}
        {!loading && (
          <motion.div
            className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"
                className="glass-panel w-9 h-9 rounded-xl"
                onClick={() => navigate('/adventure')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="glass-panel px-3 py-1.5 rounded-xl">
                <p className="font-display text-sm font-bold text-foreground leading-tight">{island.name}</p>
                <p className="text-[10px] text-muted-foreground">{island.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="glass-panel px-3 py-1.5 rounded-xl flex items-center gap-2 min-w-[130px]">
                <Progress value={progress} className="h-2 flex-1" />
                <span className="text-xs font-bold text-foreground">{progress}%</span>
              </div>
              <Button variant="ghost" size="icon"
                className="glass-panel w-9 h-9 rounded-xl"
                onClick={() => setHelpOpen(true)}
              >
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* SVG island scene with pan & zoom */}
        {!loading && (
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
            preserveAspectRatio="xMidYMid slice"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ cursor: isPanning ? 'grabbing' : 'grab', touchAction: 'none' }}
          >
            <defs>
              <filter id="nodeShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
              </filter>
              <filter id="islandGlow">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="islandGrad" cx="35%" cy="30%">
                <stop offset="0%" stopColor="hsl(140 55% 75%)" />
                <stop offset="60%" stopColor="hsl(140 45% 62%)" />
                <stop offset="100%" stopColor="hsl(140 35% 52%)" />
              </radialGradient>
            </defs>

            {/* Ocean waves */}
            {[0, 1, 2].map(i => (
              <ellipse key={i} cx={500} cy={360}
                rx={420 + i * 30} ry={260 + i * 20}
                fill="none" stroke="hsl(199 55% 75%)" strokeWidth={1}
                opacity={0.2 - i * 0.05} strokeDasharray="10,14"
              >
                <animateTransform attributeName="transform" type="rotate"
                  from={`${i % 2 === 0 ? 0 : 360} 500 360`}
                  to={`${i % 2 === 0 ? 360 : 0} 500 360`}
                  dur={`${50 + i * 15}s`} repeatCount="indefinite" />
              </ellipse>
            ))}

            {/* Island shadow */}
            <ellipse cx={505} cy={380} rx={340} ry={160}
              fill="hsl(199 40% 60%)" opacity={0.12} />

            {/* Main island body — large horizontal ellipse */}
            <ellipse cx={500} cy={350} rx={330} ry={180}
              fill="url(#islandGrad)" filter="url(#islandGlow)" />

            {/* Inner highlight */}
            <ellipse cx={460} cy={310} rx={220} ry={110}
              fill="hsl(140 55% 78%)" opacity={0.3} />

            {/* Decorative dots */}
            <circle cx={150} cy={300} r={5} fill="hsl(140 50% 68%)" opacity={0.4} />
            <circle cx={850} cy={400} r={4} fill="hsl(140 60% 72%)" opacity={0.35} />
            <circle cx={300} cy={450} r={6} fill="hsl(43 86% 70%)" opacity={0.3} />
            <circle cx={700} cy={260} r={5} fill="hsl(140 45% 65%)" opacity={0.35} />
            <circle cx={500} cy={480} r={4} fill="hsl(140 50% 70%)" opacity={0.25} />

            {/* Main path connections — left to right */}
            {mainPathPositions.map((pos, i) => {
              if (i === 0) return null;
              const prev = mainPathPositions[i - 1];
              const bothCompleted = prev.node.status === 'completed' && pos.node.status === 'completed';
              const oneActive = prev.node.status === 'completed' && (pos.node.status === 'in_progress' || pos.node.status === 'available');
              return (
                <line key={`path-${i}`}
                  x1={prev.cx} y1={prev.cy}
                  x2={pos.cx} y2={pos.cy}
                  stroke={bothCompleted ? 'hsl(210 60% 45%)' : oneActive ? 'hsl(210 70% 55%)' : 'hsl(205 15% 72%)'}
                  strokeWidth={bothCompleted ? 3.5 : 2.5}
                  strokeDasharray={bothCompleted ? 'none' : '8,8'}
                  opacity={bothCompleted ? 0.8 : 0.45}
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
        )}

        {/* Zoom controls — bottom right, same style as MapScene */}
        {!loading && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 glass-panel p-1.5 rounded-xl">
            <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Zoom out">
              <Minus className="w-4 h-4" />
            </button>
            <div className="w-24 flex items-center px-1">
              <Slider value={[zoomSliderValue]} onValueChange={([v]) => applyZoom(v)} min={0} max={100} step={1} />
            </div>
            <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Zoom in">
              <Plus className="w-4 h-4" />
            </button>
            <div className="h-6 border-l border-border mx-0.5" />
            <button onClick={resetView} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Reset view">
              <Locate className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Activity side panel */}
      <IslandActivitySidePanel
        node={selectedNode}
        open={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Help tutorial with Pepe */}
      <HelpTutorialOverlay
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        steps={island.pepeIntro}
      />
    </div>
  );
};

export default IslandView;
