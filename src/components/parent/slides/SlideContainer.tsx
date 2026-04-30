import { ReactNode } from 'react';

interface Props {
  backgroundImage?: string;
  children: ReactNode;
}

const SlideContainer = ({ backgroundImage, children }: Props) => (
  <div
    className="relative flex-1 flex items-center justify-center overflow-hidden"
    style={
      backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : undefined
    }
  >
    {backgroundImage && <div className="absolute inset-0 bg-foreground/40" />}
    <div className="relative z-10 w-full max-w-3xl px-8 py-10">
      {children}
    </div>
  </div>
);

export default SlideContainer;
