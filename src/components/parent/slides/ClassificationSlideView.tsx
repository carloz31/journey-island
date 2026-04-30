import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SlideContainer from './SlideContainer';
import { ClassificationSlide } from '@/data/parentData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Props {
  slide: ClassificationSlide;
  onAdvance: (data: any) => void;
  isLast: boolean;
}

const ClassificationSlideView = ({ slide, onAdvance, isLast }: Props) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const allAnswered = Object.keys(answers).length === slide.rows.length;
  const score = useMemo(
    () => slide.rows.filter((r, i) => answers[i] === r.correct).length,
    [answers, slide.rows]
  );

  return (
    <SlideContainer backgroundImage={slide.backgroundImage}>
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">{slide.title}</h2>
          <p className="text-sm text-muted-foreground">{slide.instructions}</p>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          {slide.rows.map((row, i) => {
            const answered = answers[i];
            const correct = answered === row.correct;
            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 border-b last:border-b-0 transition-colors',
                  answered && (correct ? 'bg-success/5' : 'bg-destructive/5')
                )}
              >
                <span className="text-sm flex-1">{row.phrase}</span>
                <Select value={answered ?? ''} onValueChange={v => setAnswers(prev => ({ ...prev, [i]: v }))}>
                  <SelectTrigger className="w-40 h-9 text-xs">
                    <SelectValue placeholder="Elige..." />
                  </SelectTrigger>
                  <SelectContent>
                    {slide.categories.map(cat => (
                      <SelectItem key={cat.key} value={cat.key}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <div className="flex items-center gap-2 p-4 bg-success/10 text-success-foreground rounded-lg border border-success/30">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-sm text-foreground">
              {slide.completionMessage} <span className="text-muted-foreground ml-2">({score}/{slide.rows.length} correctas)</span>
            </p>
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

export default ClassificationSlideView;
