import { motion } from 'framer-motion';
import type { OpenQuestionStep } from '@/data/activityData';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  step: OpenQuestionStep;
  value: string;
  onChange: (v: string) => void;
}

const todayString = () =>
  new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

const OpenQuestionStepView = ({ step, value, onChange }: Props) => {
  const showCounter =
    !step.hideCounter && typeof step.maxLength === 'number';
  const remaining = showCounter ? (step.maxLength as number) - value.length : null;

  // Token replacement on the question (supports {today}).
  const renderedQuestion = step.question.replace(/\{today\}/g, todayString());

  // Light-ambient variant uses a lighter card so it reads well after the sunrise transition.
  const isLight = step.ambient === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center h-full px-4 py-4"
    >
      <div
        className={`max-w-2xl w-full rounded-2xl border p-6 sm:p-8 shadow-xl ${
          isLight
            ? 'border-border/40 bg-background/80 backdrop-blur-md'
            : 'border-border/20'
        }`}
        style={
          !isLight
            ? { background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }
            : undefined
        }
      >
        <h3
          className={`text-base sm:text-lg font-semibold mb-4 ${
            isLight ? 'text-foreground' : 'text-primary-foreground'
          }`}
        >
          {renderedQuestion}
        </h3>

        <Textarea
          value={value}
          onChange={e =>
            onChange(step.maxLength ? e.target.value.slice(0, step.maxLength) : e.target.value)
          }
          placeholder={step.placeholder ?? 'Escribe aquí...'}
          className={
            isLight
              ? 'bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[220px] resize-none focus-visible:ring-accent'
              : 'bg-background/20 border-border/30 text-primary-foreground placeholder:text-primary-foreground/40 min-h-[120px] resize-none focus-visible:ring-accent'
          }
        />

        {remaining !== null && (
          <p
            className={`text-xs mt-2 text-right ${
              isLight ? 'text-muted-foreground' : 'text-primary-foreground/50'
            }`}
          >
            {remaining} caracteres restantes
          </p>
        )}

        {/* Sub-questions as soft suggestions */}
        {step.subQuestions && step.subQuestions.length > 0 && (
          <ul
            className={`mt-5 space-y-1.5 text-xs sm:text-sm ${
              isLight ? 'text-muted-foreground' : 'text-primary-foreground/60'
            }`}
          >
            {step.subQuestions.map((q, i) => (
              <li key={i} className="leading-relaxed">
                • {q}
              </li>
            ))}
          </ul>
        )}

        {/* Optional small note from Pepe */}
        {step.note && (
          <p
            className={`mt-4 text-xs italic leading-relaxed ${
              isLight ? 'text-muted-foreground' : 'text-primary-foreground/60'
            }`}
          >
            {step.note}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default OpenQuestionStepView;
