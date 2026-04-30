import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SlideContainer from './SlideContainer';
import { InformationalSlide } from '@/data/parentData';
import { interpolateChildName } from '@/data/parentData';

interface Props {
  slide: InformationalSlide;
  childName?: string;
  hasBg: boolean;
  onAdvance: () => void;
  isLast: boolean;
}

const InformationalSlideView = ({ slide, childName, onAdvance, isLast }: Props) => {
  const title = childName ? interpolateChildName(slide.title, childName) : slide.title;
  const body = childName ? interpolateChildName(slide.body, childName) : slide.body;

  return (
    <SlideContainer backgroundImage={slide.backgroundImage}>
      <div className={`${slide.backgroundImage ? 'text-white' : 'text-foreground'} space-y-5`}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">{title}</h2>
        )}
        <div className="space-y-4 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {body}
        </div>
        <div className="pt-6">
          <Button size="lg" onClick={onAdvance} className="gap-2">
            {isLast ? 'Finalizar' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </SlideContainer>
  );
};

export default InformationalSlideView;
