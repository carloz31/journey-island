import { motion } from 'framer-motion';
import type { ContentStep } from '@/data/activityData';

interface Props {
  step: ContentStep;
}

const ContentStepView = ({ step }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-center h-full px-4"
  >
    <div
      className="max-w-lg w-full rounded-2xl border border-border/20 p-6 sm:p-8 shadow-xl"
      style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }}
    >
      {step.imageUrl && (
        <img
          src={step.imageUrl}
          alt={step.title ?? ''}
          className="w-full rounded-xl mb-5 max-h-52 object-cover"
        />
      )}
      {step.title && (
        <h3 className="text-lg sm:text-xl font-display font-bold text-primary-foreground mb-3">
          {step.title}
        </h3>
      )}
      <p className="text-sm sm:text-base leading-relaxed text-primary-foreground/85">
        {step.body}
      </p>
    </div>
  </motion.div>
);

export default ContentStepView;
