import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import RpgDialogueStep from '@/components/RpgDialogueStep';
import { activitiesMap } from '@/data/activityData';

const ActivityPlayer = () => {
  const { regionId, activityId } = useParams();
  const navigate = useNavigate();
  const activity = activityId ? activitiesMap[activityId] : undefined;

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [points, setPoints] = useState(0);

  if (!activity) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Actividad no encontrada.</p>
      </div>
    );
  }

  const totalSteps = activity.steps.length;
  const progressPct = completed ? 100 : ((currentStep) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPoints(activity.pointsReward);
      setCompleted(true);
    }
  };

  const handleExit = () => {
    navigate(`/adventure/island/${regionId ?? 'self-knowledge'}`);
  };

  const step = activity.steps[currentStep];

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Fullscreen background */}
      <div className="absolute inset-0 z-0"
        style={{
          background: activity.backgroundUrl
            ? `url(${activity.backgroundUrl}) center/cover`
            : 'linear-gradient(160deg, hsl(var(--primary) / 0.35) 0%, hsl(205 40% 12%) 50%, hsl(var(--accent) / 0.2) 100%)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-foreground/30" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: 'hsla(var(--foreground) / 0.35)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          <button onClick={handleExit}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors">
            <ArrowLeft className="w-4 h-4 text-primary-foreground" />
          </button>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-primary-foreground/80">
              Paso {currentStep + 1} de {totalSteps}
            </span>
            <Progress value={progressPct} className="w-32 h-1.5 bg-background/20 [&>div]:bg-accent" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-accent">+{points} pts</span>
          <button onClick={() => setSoundOn(!soundOn)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors">
            {soundOn
              ? <Volume2 className="w-4 h-4 text-primary-foreground" />
              : <VolumeX className="w-4 h-4 text-primary-foreground/50" />}
          </button>
        </div>
      </header>

      {/* Content area */}
      <div className="relative flex-1 z-10">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center p-8 rounded-3xl max-w-sm mx-auto"
                style={{ background: 'hsla(var(--foreground) / 0.65)', backdropFilter: 'blur(20px)' }}>
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                  ¡Actividad completada!
                </h2>
                <p className="text-primary-foreground/70 text-sm mb-1">{activity.title}</p>
                <p className="text-accent font-bold text-lg mb-6">+{activity.pointsReward} puntos</p>
                <Button onClick={handleExit} className="bg-accent text-accent-foreground hover:brightness-110">
                  Volver a la isla
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {step.type === 'rpg' && (
                <RpgDialogueStep
                  step={step}
                  onNext={handleNext}
                  isLast={currentStep === totalSteps - 1}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityPlayer;
