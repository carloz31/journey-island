import { useState } from 'react';
import { motion } from 'framer-motion';
import type { OpenQuestionStep } from '@/data/activityData';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  step: OpenQuestionStep;
  value: string;
  onChange: (v: string) => void;
}

const OpenQuestionStepView = ({ step, value, onChange }: Props) => {
  const remaining = step.maxLength ? step.maxLength - value.length : null;

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
        <h3 className="text-base sm:text-lg font-semibold text-primary-foreground mb-4">
          {step.question}
        </h3>
        <Textarea
          value={value}
          onChange={e => onChange(e.target.value.slice(0, step.maxLength ?? 2000))}
          placeholder={step.placeholder ?? 'Escribe aquí...'}
          className="bg-background/20 border-border/30 text-primary-foreground placeholder:text-primary-foreground/40
            min-h-[120px] resize-none focus-visible:ring-accent"
        />
        {remaining !== null && (
          <p className="text-xs text-primary-foreground/50 mt-2 text-right">
            {remaining} caracteres restantes
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default OpenQuestionStepView;
