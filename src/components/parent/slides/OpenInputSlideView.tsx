import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, Check } from 'lucide-react';
import SlideContainer from './SlideContainer';
import { OpenInputSlide, interpolateChildName } from '@/data/parentData';
import { cn } from '@/lib/utils';

interface Props {
  slide: OpenInputSlide;
  childName?: string;
  onAdvance: (data: any) => void;
  isLast: boolean;
}

const OpenInputSlideView = ({ slide, childName, onAdvance, isLast }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [openText, setOpenText] = useState('');

  const title = childName && slide.title ? interpolateChildName(slide.title, childName) : slide.title;
  const body = childName && slide.body ? interpolateChildName(slide.body, childName) : slide.body;
  const question = childName ? interpolateChildName(slide.question, childName) : slide.question;
  const openTextLabel = childName && slide.openTextLabel
    ? interpolateChildName(slide.openTextLabel, childName)
    : slide.openTextLabel;

  const toggle = (opt: string) => {
    if (slide.inputType === 'single_select') {
      setSelected([opt]);
      return;
    }
    if (selected.includes(opt)) {
      setSelected(selected.filter(s => s !== opt));
    } else {
      if (slide.maxSelections && selected.length >= slide.maxSelections) return;
      setSelected([...selected, opt]);
    }
  };

  const canAdvance =
    slide.inputType === 'open_text'
      ? openText.trim().length > 0
      : selected.length > 0 || (slide.allowOpenText && openText.trim().length > 0);

  return (
    <SlideContainer backgroundImage={slide.backgroundImage}>
      <div className="space-y-5">
        {title && <h2 className="text-2xl md:text-3xl font-display font-bold">{title}</h2>}
        {body && <p className="text-base text-muted-foreground leading-relaxed">{body}</p>}
        <p className="text-base font-semibold">{question}</p>

        {slide.options && (
          <div className={cn('grid gap-2', slide.options.length > 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1')}>
            {slide.options.map(opt => {
              const isSel = selected.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  className={cn(
                    'flex items-center gap-3 text-left p-3 rounded-lg border transition-all',
                    isSel
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-card hover:border-primary/40'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center shrink-0',
                      slide.inputType === 'single_select' ? 'rounded-full' : '',
                      isSel ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30'
                    )}
                  >
                    {isSel && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-sm">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {slide.maxSelections && (
          <p className="text-xs text-muted-foreground">
            {selected.length} / {slide.maxSelections} seleccionadas
          </p>
        )}

        {(slide.allowOpenText || slide.inputType === 'open_text') && (
          <div className="space-y-2">
            {openTextLabel && <Label className="text-xs">{openTextLabel}</Label>}
            <Textarea
              value={openText}
              onChange={e => setOpenText(e.target.value)}
              placeholder="Escribe aquí..."
              rows={3}
            />
          </div>
        )}

        <div className="pt-2">
          <Button
            size="lg"
            disabled={!canAdvance}
            onClick={() => onAdvance({ selected, openText: openText.trim() })}
            className="gap-2"
          >
            {isLast ? 'Finalizar' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </SlideContainer>
  );
};

export default OpenInputSlideView;
