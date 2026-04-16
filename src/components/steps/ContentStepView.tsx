import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, BookOpen, Play } from 'lucide-react';
import type { ContentStep } from '@/data/activityData';

interface Props {
  step: ContentStep;
  confirmed: boolean;
  onConfirm: () => void;
}

/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string | null {
  const m =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&/#]+)/) ??
    null;
  return m ? m[1] : null;
}

const ContentStepView = ({ step, confirmed, onConfirm }: Props) => {
  const mode = step.contentMode ?? 'text';

  const confirmLabel =
    mode === 'video'
      ? 'Ya terminé de ver el video ✓'
      : mode === 'image'
        ? 'Ya terminé de ver la imagen ✓'
        : 'Ya terminé de leer ✓';

  const ConfirmIcon = mode === 'video' ? Play : mode === 'image' ? Eye : BookOpen;

  const videoId = mode === 'video' && step.videoUrl ? extractYouTubeId(step.videoUrl) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center w-full px-2"
    >
      <div
        className="w-full max-w-4xl rounded-2xl border border-border/20 p-5 sm:p-8 shadow-xl"
        style={{ background: 'hsla(var(--foreground) / 0.55)', backdropFilter: 'blur(16px)' }}
      >
        {/* Title */}
        {step.title && (
          <h3 className="text-lg sm:text-xl font-display font-bold text-primary-foreground mb-4">
            {step.title}
          </h3>
        )}

        {/* Video embed */}
        {mode === 'video' && videoId && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-black/40">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={step.title ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}

        {/* Image */}
        {(mode === 'image' || (mode === 'text' && step.imageUrl)) && step.imageUrl && (
          <img
            src={step.imageUrl}
            alt={step.title ?? ''}
            className="w-full rounded-xl mb-5 max-h-[50vh] object-contain"
          />
        )}

        {/* Body text */}
        <p className="text-sm sm:text-base leading-relaxed text-primary-foreground/85 mb-5">
          {step.body}
        </p>

        {/* Confirmation button */}
        {!confirmed ? (
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-sm font-semibold
              bg-accent/20 text-accent border border-accent/30
              hover:bg-accent/30 active:scale-95 transition-all"
          >
            <ConfirmIcon className="w-4 h-4" />
            {confirmLabel}
          </button>
        ) : (
          <div className="flex items-center gap-2 justify-center text-accent text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Completado
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentStepView;
