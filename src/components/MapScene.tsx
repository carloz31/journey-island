import { useState, useRef, useCallback, useMemo } from 'react';
import { regions, Region } from '@/data/mockData';
import { Plus, Minus, Locate } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface MapSceneProps {
  onRegionClick: (region: Region) => void;
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

const regionThemes: Record<string, string> = {
  'self-knowledge': 'green',
  'exploration': 'water',
  'skills': 'snow',
  'decision': 'volcano',
  'parents': 'crystal',
  'projects': 'desert',
  'future': 'forest',
};

const connections: [string, string][] = [
  ['self-knowledge', 'exploration'],
  ['skills', 'self-knowledge'],
  ['self-knowledge', 'parents'],
  ['exploration', 'future'],
  ['decision', 'projects'],
  ['decision', 'future'],
];

const MapScene = ({ onRegionClick }: MapSceneProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const DEFAULT_VB = { x: 0, y: 0, w: 1000, h: 700 };
  const MIN_W = 300;
  const MAX_W = 2000;

  // Pan & zoom state
  const [viewBox, setViewBox] = useState({ ...DEFAULT_VB });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  // Zoom level as 0-100 slider value (0 = max zoom out, 100 = max zoom in)
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

  const regionMap = useMemo(() => Object.fromEntries(regions.map(r => [r.id, r])), []);

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
      const nw = Math.min(2000, Math.max(300, vb.w * factor));
      const nh = Math.min(1400, Math.max(210, vb.h * factor));
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

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(199 60% 82%) 0%, hsl(199 50% 92%) 40%, hsl(199 55% 80%) 100%)' }}>
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
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Dotted paths */}
        {connections.map(([from, to]) => {
          const a = regionMap[from], b = regionMap[to];
          if (!a || !b) return null;
          return (
            <g key={`${from}-${to}`}>
              <line x1={a.position.x * 10} y1={a.position.y * 10} x2={b.position.x * 10} y2={b.position.y * 10}
                stroke="hsl(205 15% 70%)" strokeWidth={2} strokeDasharray="6,8" opacity={0.45} />
              {[0.25, 0.5, 0.75].map((t, i) => (
                <circle key={i}
                  cx={a.position.x * 10 + (b.position.x * 10 - a.position.x * 10) * t}
                  cy={a.position.y * 10 + (b.position.y * 10 - a.position.y * 10) * t}
                  r={3} fill="hsl(205 15% 70%)" opacity={0.4} />
              ))}
            </g>
          );
        })}

        {/* Islands */}
        {regions.map((region) => {
          const cx = region.position.x * 10;
          const cy = region.position.y * 10;
          const theme = islandThemes[regionThemes[region.id] || 'green'];
          const isLocked = region.status === 'locked';
          const isRestored = region.status === 'restored';
          const isHovered = hoveredId === region.id;
          const isClickable = !isLocked;
          const mainOpacity = isLocked ? 0.35 : isRestored ? 1 : 0.65;
          const satFilter = isLocked ? 'saturate(0.2)' : isRestored ? 'saturate(1.1)' : 'saturate(0.6)';
          const scale = isHovered && isClickable ? 1.08 : 1;

          return (
            <g
              key={region.id}
              data-island
              style={{ cursor: isClickable ? 'pointer' : 'not-allowed', transition: 'transform 0.2s' }}
              transform={`translate(${cx}, ${cy}) scale(${scale}) translate(${-cx}, ${-cy})`}
              onMouseEnter={() => setHoveredId(region.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => { if (isClickable) { e.stopPropagation(); onRegionClick(region); } }}
            >
              {/* Region name above */}
              <text x={cx} y={cy - 38} textAnchor="middle" className="font-display" fontSize="11" fontWeight="700"
                fill={isLocked ? 'hsl(205 15% 60%)' : 'hsl(205 40% 18%)'}>
                {region.name}
              </text>

              <g filter={isRestored ? 'url(#glow)' : 'url(#shadow)'} style={{ opacity: mainOpacity }}>
                {/* Shadow */}
                <ellipse cx={cx} cy={cy + 45} rx={52} ry={10} fill="#4A8FA8" opacity={0.15} />
                {/* Cliff */}
                <path
                  d={`M${cx - 50},${cy + 10} Q${cx - 55},${cy + 30} ${cx - 30},${cy + 42} Q${cx},${cy + 50} ${cx + 30},${cy + 42} Q${cx + 55},${cy + 30} ${cx + 50},${cy + 10} Z`}
                  fill={isLocked ? '#8899A5' : theme.detail} style={{ filter: satFilter }}
                />
                {/* Top */}
                <ellipse cx={cx} cy={cy + 8} rx={52} ry={22} fill={isLocked ? '#A0AEB8' : theme.base} style={{ filter: satFilter }} />
                {/* Restored decorations */}
                {isRestored && (
                  <>
                    <circle cx={cx - 18} cy={cy - 8} r={12} fill={theme.highlight} opacity={0.7} />
                    <circle cx={cx - 14} cy={cy - 14} r={10} fill={theme.detail} opacity={0.8} />
                    <circle cx={cx + 15} cy={cy - 5} r={10} fill={theme.highlight} opacity={0.6} />
                    <circle cx={cx + 10} cy={cy - 12} r={8} fill={theme.detail} opacity={0.7} />
                    <circle cx={cx} cy={cy - 10} r={6} fill={theme.highlight} opacity={0.5} />
                  </>
                )}
                {/* Available sparse elements */}
                {!isLocked && !isRestored && (
                  <>
                    <circle cx={cx - 12} cy={cy - 2} r={6} fill={theme.highlight} opacity={0.35} />
                    <circle cx={cx + 10} cy={cy} r={5} fill={theme.detail} opacity={0.3} />
                  </>
                )}
                {/* Locked dashes */}
                {isLocked && (
                  <line x1={cx - 20} y1={cy + 5} x2={cx + 20} y2={cy + 5} stroke="#7A8A96" strokeWidth={1} opacity={0.3} strokeDasharray="4,4" />
                )}
              </g>

              {/* Tooltip on hover */}
              {isHovered && isClickable && (
                <g>
                  <rect x={cx - 70} y={cy + 55} width={140} height={24} rx={6}
                    fill="white" stroke="hsl(196 25% 88%)" strokeWidth={1} opacity={0.95} />
                  <text x={cx} y={cy + 71} textAnchor="middle" fontSize="9" fill="hsl(205 20% 46%)">
                    {region.subtitle}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Zoom controls - bottom right */}
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
    </div>
  );
};

export default MapScene;
