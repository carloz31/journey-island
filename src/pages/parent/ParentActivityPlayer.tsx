import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { useParent } from '@/contexts/ParentContext';
import { getActivityById, interpolateChildName } from '@/data/parentData';
import InformationalSlideView from '@/components/parent/slides/InformationalSlideView';
import ClassificationSlideView from '@/components/parent/slides/ClassificationSlideView';
import FrequencySlideView from '@/components/parent/slides/FrequencySlideView';
import OpenInputSlideView from '@/components/parent/slides/OpenInputSlideView';
import CompletionSlideView from '@/components/parent/slides/CompletionSlideView';
import { AnimatePresence, motion } from 'framer-motion';

const ParentActivityPlayer = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [searchParams] = useSearchParams();
  const childIdParam = searchParams.get('childId');
  const navigate = useNavigate();
  const { profile, markCompleted } = useParent();

  const activity = useMemo(() => (activityId ? getActivityById(activityId) : undefined), [activityId]);
  const child = childIdParam ? profile.children.find(c => c.id === childIdParam) : undefined;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<{ slideId: string; data: any; storeAs?: any }[]>([]);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Actividad no encontrada</p>
          <Button onClick={() => navigate('/parents/activities')}>Volver</Button>
        </div>
      </div>
    );
  }

  const slide = activity.slides[currentIndex];
  const total = activity.slides.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);
  const isLast = currentIndex === total - 1;
  const displayTitle = child ? interpolateChildName(activity.title, child.name) : activity.title;
  const childName = child?.name;

  const handleAdvance = (data?: any) => {
    if (data !== undefined) {
      const storeAs = (slide as any).storeAs;
      setResponses(prev => [...prev.filter(r => r.slideId !== slide.id), { slideId: slide.id, data, storeAs }]);
    }
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    markCompleted(activity.id, child?.id ?? null, responses);
    navigate('/parents/activities');
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Auto-mark completion as soon as the user reaches the completion slide
  if (slide.type === 'completion') {
    // record on first arrival
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left progress sidebar */}
      <aside className="w-72 shrink-0 bg-card border-r flex flex-col p-6">
        <Button
          variant="ghost"
          size="sm"
          className="self-start gap-2 -ml-2 mb-6 text-muted-foreground"
          onClick={() => navigate('/parents/activities')}
        >
          <ArrowLeft className="w-4 h-4" /> Salir
        </Button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Actividad para padres
          </p>
          <h2 className="font-display font-bold text-lg leading-snug">{displayTitle}</h2>
          {child && (
            <p className="text-xs text-muted-foreground mt-2">
              Para: <span className="font-semibold text-foreground">{child.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-[11px] text-muted-foreground">
            Slide {currentIndex + 1} de {total}
          </p>
        </div>

        <div className="mt-auto space-y-2">
          {currentIndex > 0 && slide.type !== 'completion' && (
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleBack}>
              <ArrowLeft className="w-3 h-3" /> Anterior
            </Button>
          )}
        </div>
      </aside>

      {/* Slide area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <button
          onClick={() => navigate('/parents/activities')}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/80 backdrop-blur border flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {slide.type === 'informational' && (
              <InformationalSlideView
                slide={slide}
                childName={childName}
                hasBg={!!slide.backgroundImage}
                onAdvance={() => handleAdvance()}
                isLast={isLast}
              />
            )}
            {slide.type === 'classification' && (
              <ClassificationSlideView slide={slide} onAdvance={handleAdvance} isLast={isLast} />
            )}
            {slide.type === 'frequency' && (
              <FrequencySlideView slide={slide} onAdvance={handleAdvance} isLast={isLast} />
            )}
            {slide.type === 'open_input' && (
              <OpenInputSlideView
                slide={slide}
                childName={childName}
                onAdvance={handleAdvance}
                isLast={isLast}
              />
            )}
            {slide.type === 'completion' && (
              <CompletionSlideView slide={slide} childName={childName} onFinish={handleFinish} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ParentActivityPlayer;
