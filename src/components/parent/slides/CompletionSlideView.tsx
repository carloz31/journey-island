import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import SlideContainer from './SlideContainer';
import { CompletionSlide, interpolateChildName } from '@/data/parentData';

interface Props {
  slide: CompletionSlide;
  childName?: string;
  onFinish: () => void;
}

const CompletionSlideView = ({ slide, childName, onFinish }: Props) => {
  const title = childName ? interpolateChildName(slide.title, childName) : slide.title;
  const body = childName ? interpolateChildName(slide.body, childName) : slide.body;

  return (
    <SlideContainer backgroundImage={slide.backgroundImage}>
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold">{title}</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
          {body}
        </p>
        <Button size="lg" onClick={onFinish} className="gap-2">
          Volver a actividades
        </Button>
      </div>
    </SlideContainer>
  );
};

export default CompletionSlideView;
