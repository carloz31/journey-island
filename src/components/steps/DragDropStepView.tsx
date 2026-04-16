import { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical, Check, X as XIcon } from 'lucide-react';
import type { DragDropStep } from '@/data/activityData';

interface Props {
  step: DragDropStep;
  order: string[];
  onReorder: (newOrder: string[]) => void;
  matches?: Record<string, string>;
  onMatchChange?: (matches: Record<string, string>) => void;
}

/* ── Order mode ── */
const OrderMode = ({
  step,
  order,
  onReorder,
}: {
  step: DragDropStep;
  order: string[];
  onReorder: (o: string[]) => void;
}) => {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const itemsMap = Object.fromEntries(step.items.map(i => [i.id, i]));

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragIdx, 1);
    newOrder.splice(idx, 0, moved);
    onReorder(newOrder);
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  return (
    <div className="flex flex-col gap-2">
      {order.map((id, idx) => {
        const item = itemsMap[id];
        if (!item) return null;
        return (
          <div
            key={id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`
              flex items-center gap-3 rounded-xl border px-5 py-4 cursor-grab active:cursor-grabbing
              transition-all text-sm sm:text-base font-medium
              ${dragIdx === idx
                ? 'border-accent/50 bg-accent/10 scale-[1.02]'
                : 'border-border/30 bg-background/10 text-primary-foreground/80'
              }
            `}
          >
            <GripVertical className="w-5 h-5 text-primary-foreground/40 shrink-0" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ── Match mode ── */
const MatchMode = ({
  step,
  matches,
  onMatchChange,
}: {
  step: DragDropStep;
  matches: Record<string, string>;
  onMatchChange: (m: Record<string, string>) => void;
}) => {
  const pairs = step.pairs ?? [];
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect'>>({});

  // Items available for dragging (not yet matched correctly)
  const correctlyMatched = new Set(
    Object.entries(matches)
      .filter(([conceptId, matchVal]) => {
        const pair = pairs.find(p => p.id === conceptId);
        return pair && pair.match === matchVal;
      })
      .map(([, matchVal]) => matchVal),
  );

  const availableItems = pairs
    .map(p => p.match)
    .filter(m => !correctlyMatched.has(m));

  const handleDrop = (conceptId: string) => {
    if (!dragItem) return;
    const pair = pairs.find(p => p.id === conceptId);
    const isCorrect = pair?.match === dragItem;

    if (isCorrect) {
      const newMatches = { ...matches, [conceptId]: dragItem };
      onMatchChange(newMatches);
      setFeedback(prev => ({ ...prev, [conceptId]: 'correct' }));
    } else if (step.requireAllCorrect) {
      setFeedback(prev => ({ ...prev, [conceptId]: 'incorrect' }));
      setTimeout(() => {
        setFeedback(prev => {
          const copy = { ...prev };
          if (copy[conceptId] === 'incorrect') delete copy[conceptId];
          return copy;
        });
      }, 800);
    } else {
      const newMatches = { ...matches, [conceptId]: dragItem };
      onMatchChange(newMatches);
      setFeedback(prev => ({ ...prev, [conceptId]: 'incorrect' }));
    }

    setDragItem(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: concepts / drop zones */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/50 mb-1">
          Conceptos
        </span>
        {pairs.map(pair => {
          const matched = matches[pair.id];
          const isCorrect = matched === pair.match;
          const fb = feedback[pair.id];

          return (
            <div
              key={pair.id}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(pair.id)}
              className={`
                rounded-xl border-2 border-dashed px-5 py-4 min-h-[72px] transition-all
                flex items-center justify-between gap-3
                ${fb === 'correct' || isCorrect
                  ? 'border-accent/60 bg-accent/10'
                  : fb === 'incorrect'
                    ? 'border-destructive/60 bg-destructive/10 animate-[shake_0.3s]'
                    : 'border-border/40 bg-background/5 hover:border-accent/30'
                }
              `}
            >
              <span className="text-sm sm:text-base text-primary-foreground/90 font-medium flex-1">
                {pair.concept}
              </span>
              {isCorrect && matched ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent shrink-0">
                  <Check className="w-4 h-4" /> {matched}
                </span>
              ) : fb === 'incorrect' ? (
                <XIcon className="w-4 h-4 text-destructive shrink-0" />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Right: draggable items */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/50 mb-1">
          Arrastra aquí
        </span>
        {availableItems.map(item => (
          <div
            key={item}
            draggable
            onDragStart={() => setDragItem(item)}
            onDragEnd={() => setDragItem(null)}
            className={`
              rounded-xl border px-5 py-4 cursor-grab active:cursor-grabbing
              transition-all text-sm sm:text-base font-semibold
              ${dragItem === item
                ? 'border-accent/50 bg-accent/15 scale-[1.03]'
                : 'border-border/30 bg-background/15 text-primary-foreground hover:bg-background/25'
              }
            `}
          >
            <GripVertical className="w-4 h-4 text-primary-foreground/40 inline mr-2" />
            {item}
          </div>
        ))}
        {availableItems.length === 0 && (
          <div className="text-center py-6 text-accent/70 text-sm font-medium">
            ¡Todos emparejados! ✨
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main component ── */
const DragDropStepView = ({ step, order, onReorder, matches, onMatchChange }: Props) => {
  const isMatch = step.mode === 'match';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        className="w-full rounded-2xl border border-border/20 p-5 sm:p-8 shadow-xl"
        style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }}
      >
        <h3 className="text-base sm:text-lg font-semibold text-primary-foreground mb-5">
          {step.instruction}
        </h3>

        {isMatch ? (
          <MatchMode
            step={step}
            matches={matches ?? {}}
            onMatchChange={onMatchChange ?? (() => {})}
          />
        ) : (
          <OrderMode step={step} order={order} onReorder={onReorder} />
        )}
      </div>
    </motion.div>
  );
};

export default DragDropStepView;
