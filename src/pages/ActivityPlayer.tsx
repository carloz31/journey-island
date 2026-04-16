import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import RpgDialogueStep from '@/components/RpgDialogueStep';
import StepRenderer, { isStepComplete, type StepAnswer } from '@/components/steps/StepRenderer';
import DialogueLayer from '@/components/steps/DialogueLayer';
import { activitiesMap } from '@/data/activityData';

const ActivityPlayer = () => {
  const { regionId, activityId } = useParams();
  const navigate = useNavigate();
  const activity = activityId ? activitiesMap[activityId] : undefined;

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [points, setPoints] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [answers, setAnswers] = useState<Record<number, StepAnswer>>({});

  const updateAnswer = useCallback(
    (patch: Partial<StepAnswer>) => {
      setAnswers(prev => ({
        ...prev,
        [currentStep]: { ...prev[currentStep], ...patch },
      }));
    },
    [currentStep],
  );

  if (!activity) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Actividad no encontrada.</p>
      </div>
    );
  }

  const totalSteps = activity.steps.length;
  const progressPct = completed ? 100 : (currentStep / totalSteps) * 100;
  const step = activity.steps[currentStep];
  const currentAnswer = answers[currentStep] ?? {};
  const canAdvance = step.type === 'rpg' ? true : isStepComplete(step, currentAnswer);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPoints(activity.pointsReward);
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleExit = () => {
    navigate(`/adventure/island/${regionId ?? 'self-knowledge'}`);
  };

  // Check if step has companion dialogue
  const hasDialogue =
    step.type !== 'rpg' &&
    'withDialogue' in step &&
    step.withDialogue &&
    'dialogue' in step &&
    step.dialogue;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: activity.backgroundUrl
            ? `url(${activity.backgroundUrl}) center/cover`
            : 'linear-gradient(160deg, hsl(var(--primary) / 0.35) 0%, hsl(205 40% 12%) 50%, hsl(var(--accent) / 0.2) 100%)',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-foreground/30" />

      {/* Top bar */}
      <header
        className="relative z-10 flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: 'hsla(var(--foreground) / 0.35)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-primary-foreground/80">
              Paso {currentStep + 1} de {totalSteps}
            </span>
            <Progress value={progressPct} className="w-32 h-1.5 bg-background/20 [&>div]:bg-accent" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-accent">+{points} pts</span>
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-primary-foreground" />
            ) : (
              <VolumeX className="w-4 h-4 text-primary-foreground/50" />
            )}
          </button>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="relative flex-1 z-10">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="text-center p-8 rounded-3xl max-w-sm mx-auto"
                style={{ background: 'hsla(var(--foreground) / 0.65)', backdropFilter: 'blur(20px)' }}
              >
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
          ) : step.type === 'rpg' ? (
            <motion.div key={`rpg-${currentStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RpgDialogueStep step={step} onNext={handleNext} onBack={handleBack} isFirst={currentStep === 0} isLast={currentStep === totalSteps - 1} />
            </motion.div>
          ) : (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Scrollable area: dialogue (if any) + content + nav button */}
              <div className="flex-1 overflow-auto px-3 sm:px-4 py-3">
                <div className="max-w-5xl mx-auto flex flex-col gap-3">
                  {/* Dialogue — shown inline, not as a separate phase */}
                  {hasDialogue && 'dialogue' in step && step.dialogue && (
                    <DialogueLayer
                      character={step.dialogue.character}
                      avatar={step.dialogue.avatar}
                      text={step.dialogue.text}
                    />
                  )}

                  {/* Step content */}
                  <StepRenderer step={step} answer={currentAnswer} onAnswerChange={updateAnswer} />
                </div>
              </div>

              {/* Bottom nav */}
              <div className="shrink-0 p-3 z-20">
                <div className="max-w-5xl mx-auto flex justify-between">
                  {currentStep > 0 ? (
                    <button
                      onClick={handleBack}
                      className="px-8 py-3 rounded-lg text-sm font-semibold transition-all
                        bg-background/20 text-primary-foreground hover:bg-background/30 active:scale-95"
                    >
                      ◂ Anterior
                    </button>
                  ) : <div />}
                  <button
                    onClick={handleNext}
                    disabled={!canAdvance}
                    className="px-8 py-3 rounded-lg text-sm font-semibold transition-all
                      bg-accent text-accent-foreground hover:brightness-110 active:scale-95
                      disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {currentStep === totalSteps - 1 ? '✨ Finalizar' : 'Siguiente ▸'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit confirmation modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowExitConfirm(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 rounded-2xl border border-border/30 p-6 max-w-xs w-full mx-4 text-center shadow-2xl"
              style={{ background: 'hsla(var(--foreground) / 0.85)', backdropFilter: 'blur(20px)' }}
            >
              <p className="text-primary-foreground font-semibold mb-1">¿Salir de la actividad?</p>
              <p className="text-primary-foreground/60 text-sm mb-5">Tu progreso no se guardará.</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExitConfirm(false)}
                  className="border-border/40 text-primary-foreground hover:bg-background/20"
                >
                  Quedarme
                </Button>
                <Button
                  size="sm"
                  onClick={handleExit}
                  className="bg-destructive text-destructive-foreground hover:brightness-110"
                >
                  Salir
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityPlayer;
