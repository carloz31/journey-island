import { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import type { DragDropStep, DragDropItem } from '@/data/activityData';

interface Props {
  step: DragDropStep;
  order: string[];
  onReorder: (newOrder: string[]) => void;
}

const DragDropStepView = ({ step, order, onReorder }: Props) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center h-full px-4"
    >
      <div
        className="max-w-lg w-full rounded-2xl border border-border/20 p-6 sm:p-8 shadow-xl"
        style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }}
      >
        <h3 className="text-base sm:text-lg font-semibold text-primary-foreground mb-5">
          {step.instruction}
        </h3>

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
                  flex items-center gap-3 rounded-xl border px-4 py-3 cursor-grab active:cursor-grabbing
                  transition-all text-sm font-medium
                  ${dragIdx === idx
                    ? 'border-accent/50 bg-accent/10 scale-[1.02]'
                    : 'border-border/30 bg-background/10 text-primary-foreground/80'
                  }
                `}
              >
                <GripVertical className="w-4 h-4 text-primary-foreground/40 shrink-0" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default DragDropStepView;
