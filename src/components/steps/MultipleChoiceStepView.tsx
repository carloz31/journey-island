import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X as XIcon } from 'lucide-react';
import type { MultipleChoiceStep } from '@/data/activityData';

interface Props {
  step: MultipleChoiceStep;
  selected: string | null;
  onSelect: (id: string) => void;
}

const MultipleChoiceStepView = ({ step, selected, onSelect }: Props) => {
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleSelect = (id: string) => {
    if (step.mode === 'validation' && feedback === 'correct') return;

    onSelect(id);

    if (step.mode === 'validation') {
      const opt = step.options.find(o => o.id === id);
      setFeedback(opt?.isCorrect ? 'correct' : 'incorrect');
    }
  };

  const isCards = step.layout === 'cards';

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
          {step.question}
        </h3>

        <div className={isCards ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5'}>
          {step.options.map(opt => {
            const isSelected = selected === opt.id;
            const showCorrect = step.mode === 'validation' && isSelected && feedback === 'correct';
            const showIncorrect = step.mode === 'validation' && isSelected && feedback === 'incorrect';

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`
                  relative rounded-xl border text-left transition-all px-4 py-3 text-sm font-medium
                  ${isSelected
                    ? showCorrect
                      ? 'border-green-400/60 bg-green-400/15 text-green-300'
                      : showIncorrect
                        ? 'border-red-400/60 bg-red-400/15 text-red-300'
                        : 'border-accent/60 bg-accent/15 text-accent'
                    : 'border-border/30 bg-background/10 text-primary-foreground/80 hover:bg-background/20'
                  }
                `}
              >
                {opt.label}
                {showCorrect && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
                {showIncorrect && <XIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
              </button>
            );
          })}
        </div>

        {step.mode === 'validation' && feedback === 'incorrect' && (
          <p className="text-xs text-red-300/80 mt-3">Intenta de nuevo.</p>
        )}
      </div>
    </motion.div>
  );
};

export default MultipleChoiceStepView;
