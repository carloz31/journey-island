import { useCallback, useMemo, useRef, useState } from 'react';
import { IslandData, IslandNode } from '@/data/islandData';
import IslandNodeCircle from '@/components/IslandNodeCircle';
import IslandZoomControls from '@/components/IslandZoomControls';

type IslandMapCanvasProps = {
  island: IslandData;
  selectedNodeId?: string;
  onSelectNode: (node: IslandNode) => void;
};

const DEFAULT_VIEW_BOX = { x: 0, y: 0, w: 1000, h: 700 };
const MIN_WIDTH = 400;
const MAX_WIDTH = 1800;

const IslandMapCanvas = ({ island, selectedNodeId, onSelectNode }: IslandMapCanvasProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ ...DEFAULT_VIEW_BOX });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const zoomSliderValue = Math.round(((MAX_WIDTH - viewBox.w) / (MAX_WIDTH - MIN_WIDTH)) * 100);

  const applyZoom = useCallback((sliderVal: number) => {
    const newW = MAX_WIDTH - (sliderVal / 100) * (MAX_WIDTH - MIN_WIDTH);
    const newH = newW * 0.7;
    setViewBox(vb => {
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      return { x: cx - newW / 2, y: cy - newH / 2, w: newW, h: newH };
    });
  }, []);

  const zoomIn = useCallback(() => applyZoom(Math.min(100, zoomSliderValue + 15)), [applyZoom, zoomSliderValue]);
  const zoomOut = useCallback(() => applyZoom(Math.max(0, zoomSliderValue - 15)), [applyZoom, zoomSliderValue]);
  const resetView = useCallback(() => setViewBox({ ...DEFAULT_VIEW_BOX }), []);

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
      const nw = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, vb.w * factor));
      const nh = Math.min(MAX_WIDTH * 0.7, Math.max(MIN_WIDTH * 0.7, vb.h * factor));
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

  const nodePositions = useMemo(() => {
    return island.nodes.map(node => ({
      node,
      cx: node.x,
      cy: node.y,
    }));
  }, [island]);

  const mainPathPositions = useMemo(() => {
    return island.mainPath.map(id => nodePositions.find(np => np.node.id === id)!).filter(Boolean);
  }, [island, nodePositions]);

  return (
    <>
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

        <ellipse cx={505} cy={380} rx={340} ry={160}
          fill="hsl(199 40% 60%)" opacity={0.12} />

        <ellipse cx={500} cy={350} rx={530} ry={280}
          fill="url(#islandGrad)" filter="url(#islandGlow)" />

        <ellipse cx={460} cy={310} rx={220} ry={110}
          fill="hsl(140 55% 78%)" opacity={0.3} />

        <circle cx={150} cy={300} r={5} fill="hsl(140 50% 68%)" opacity={0.4} />
        <circle cx={850} cy={400} r={4} fill="hsl(140 60% 72%)" opacity={0.35} />
        <circle cx={300} cy={450} r={6} fill="hsl(43 86% 70%)" opacity={0.3} />
        <circle cx={700} cy={260} r={5} fill="hsl(140 45% 65%)" opacity={0.35} />
        <circle cx={500} cy={480} r={4} fill="hsl(140 50% 70%)" opacity={0.25} />

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

        {nodePositions.map(({ node, cx, cy }) => (
          <IslandNodeCircle
            key={node.id}
            node={node}
            cx={cx}
            cy={cy}
            onSelect={() => onSelectNode(node)}
            isSelected={selectedNodeId === node.id}
          />
        ))}
      </svg>

      <IslandZoomControls
        zoomSliderValue={zoomSliderValue}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetView}
        onZoomChange={applyZoom}
      />
    </>
  );
};

export default IslandMapCanvas;
