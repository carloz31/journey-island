import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SlideContainer from './SlideContainer';
import { FrequencySlide } from '@/data/parentData';
import { cn } from '@/lib/utils';

interface Props {
  slide: FrequencySlide;
  onAdvance: (data: any) => void;
  isLast: boolean;
}

const FrequencySlideView = ({ slide, onAdvance, isLast }: Props) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = slide.statements.every(s => answers[s.id]);

  return (
    <SlideContainer backgroundImage={slide.backgroundImage}>
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">{slide.title}</h2>
          <p className="text-sm text-muted-foreground">{slide.instructions}</p>
        </div>

        <div className="bg-card rounded-xl border divide-y">
          {slide.statements.map(stmt => (
            <div key={stmt.id} className="p-4">
              <p className="text-sm mb-3">{stmt.text}</p>
              <div className="flex flex-wrap gap-2">
                {slide.options.map(opt => {
                  const selected = answers[stmt.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers(prev => ({ ...prev, [stmt.id]: opt }))}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                        selected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:border-primary/40 text-foreground'
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div className="flex items-center gap-2 p-4 bg-info/10 rounded-lg border border-info/30">
            <CheckCircle2 className="w-5 h-5 text-info" />
            <p className="text-sm text-foreground">{slide.completionMessage}</p>
          </div>
        )}

        <div className="pt-2">
          <Button size="lg" disabled={!allAnswered} onClick={() => onAdvance(answers)} className="gap-2">
            {isLast ? 'Finalizar' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </SlideContainer>
  );
};

export default FrequencySlideView;
