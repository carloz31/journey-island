import { IslandNode } from '@/data/islandData';

type IslandNodeCircleProps = {
  node: IslandNode;
  cx: number;
  cy: number;
  isSelected: boolean;
  onSelect: () => void;
};

const IslandNodeCircle = ({ node, cx, cy, isSelected, onSelect }: IslandNodeCircleProps) => {
  const isMain = node.type === 'main';
  const r = isMain ? 32 : 26;
  const isLocked = node.status === 'locked';
  const isCompleted = node.status === 'completed';
  const isActive = node.status === 'in_progress';

  const colors = isMain
    ? {
        bg: 'hsl(210 70% 96%)',
        border: 'hsl(210 70% 55%)',
        activeBorder: 'hsl(210 80% 50%)',
        completedBg: 'hsl(210 60% 92%)',
        completedBorder: 'hsl(210 60% 45%)',
        glow: 'hsl(210 80% 55%)',
      }
    : {
        bg: 'hsl(43 90% 95%)',
        border: 'hsl(43 80% 50%)',
        activeBorder: 'hsl(43 90% 45%)',
        completedBg: 'hsl(43 70% 90%)',
        completedBorder: 'hsl(43 70% 42%)',
        glow: 'hsl(43 90% 55%)',
      };

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
      {(isActive || isSelected) && (
        <circle cx={cx} cy={cy} r={r + 8} fill="none"
          stroke={colors.glow} strokeWidth={2.5} opacity={0.45}>
          <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}

      <circle cx={cx} cy={cy} r={r}
        fill={getBg()} stroke={getBorder()}
        strokeWidth={isCompleted || isActive ? 3 : 2}
        filter="url(#nodeShadow)"
      />

      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="central"
        fontSize={isMain ? 22 : 18} opacity={isLocked ? 0.35 : 1}
      >
        {node.imageEmoji}
      </text>

      {isLocked && (
        <g transform={`translate(${cx + r * 0.6}, ${cy - r * 0.6})`}>
          <circle r={9} fill="hsl(205 10% 60%)" />
          <text textAnchor="middle" dominantBaseline="central" fontSize={10} fill="white">{'\u{1F512}'}</text>
        </g>
      )}

      {isCompleted && (
        <g transform={`translate(${cx + r * 0.6}, ${cy - r * 0.6})`}>
          <circle r={10} fill={isMain ? 'hsl(210 60% 45%)' : 'hsl(43 70% 42%)'} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={11} fill="white">{'\u2713'}</text>
        </g>
      )}

      <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize={10}
        fontWeight={600} fill={isLocked ? 'hsl(205 15% 60%)' : 'hsl(205 40% 18%)'}
        className="font-display"
      >
        {node.title.length > 20 ? node.title.slice(0, 18) + '\u2026' : node.title}
      </text>

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

export default IslandNodeCircle;
