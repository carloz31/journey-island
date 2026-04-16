import { motion } from 'framer-motion';
import type { LikertStep } from '@/data/activityData';

interface Props {
  step: LikertStep;
  value: number | null;
  onChange: (v: number) => void;
}

const LikertStepView = ({ step, value, onChange }: Props) => {
  const points = Array.from({ length: step.max - step.min + 1 }, (_, i) => step.min + i);

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
        <h3 className="text-base sm:text-lg font-semibold text-primary-foreground mb-6">
          {step.question}
        </h3>

        <div className="flex items-center justify-between gap-2">
          {points.map(p => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`
                w-12 h-12 rounded-full text-sm font-bold transition-all
                ${value === p
                  ? 'bg-accent text-accent-foreground scale-110 shadow-lg'
                  : 'bg-background/15 text-primary-foreground/70 hover:bg-background/25 border border-border/30'
                }
              `}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-3">
          <span className="text-xs text-primary-foreground/50">{step.minLabel}</span>
          <span className="text-xs text-primary-foreground/50">{step.maxLabel}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LikertStepView;
