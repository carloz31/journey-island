import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trophy } from 'lucide-react';
import { badgesData } from '@/data/mockData';

interface BadgesModalProps {
  open: boolean;
  onClose: () => void;
}

const BadgesModal = ({ open, onClose }: BadgesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Insignias</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {badgesData.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-xl text-center transition-colors border ${b.earned ? 'bg-accent/10 border-accent/30' : 'bg-muted/50 border-border opacity-40'}`}
            >
              <span className="text-3xl block mb-1">{b.icon}</span>
              <p className="text-xs font-semibold text-foreground">{b.name}</p>
              {b.earned && <Trophy className="w-3 h-3 text-accent mx-auto mt-1" />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgesModal;
