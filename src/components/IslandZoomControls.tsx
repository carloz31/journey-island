import { Locate, Minus, Plus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

type IslandZoomControlsProps = {
  zoomSliderValue: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onZoomChange: (value: number) => void;
};

const IslandZoomControls = ({
  zoomSliderValue,
  onZoomIn,
  onZoomOut,
  onResetView,
  onZoomChange,
}: IslandZoomControlsProps) => (
  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 glass-panel p-1.5 rounded-xl">
    <button onClick={onZoomOut} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Zoom out">
      <Minus className="w-4 h-4" />
    </button>
    <div className="w-24 flex items-center px-1">
      <Slider value={[zoomSliderValue]} onValueChange={([value]) => onZoomChange(value)} min={0} max={100} step={1} />
    </div>
    <button onClick={onZoomIn} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Zoom in">
      <Plus className="w-4 h-4" />
    </button>
    <div className="h-6 border-l border-border mx-0.5" />
    <button onClick={onResetView} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors text-foreground" title="Reset view">
      <Locate className="w-4 h-4" />
    </button>
  </div>
);

export default IslandZoomControls;
