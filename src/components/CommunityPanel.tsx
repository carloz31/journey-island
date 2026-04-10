import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { classmatesData, badgesData } from '@/data/mockData';

interface CommunityPanelProps {
  open: boolean;
  onClose: () => void;
}

type Tab = 'classmates' | 'ranking' | 'badges';

const CommunityPanel = ({ open, onClose }: CommunityPanelProps) => {
  const [tab, setTab] = useState<Tab>('ranking');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'classmates', label: 'Compañeros' },
    { key: 'ranking', label: 'Ranking' },
    { key: 'badges', label: 'Insignias' },
  ];

  const sorted = [...classmatesData].sort((a, b) => b.progress - a.progress);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute top-3 right-14 z-30 glass-panel w-80 max-h-[75vh] flex flex-col"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-display font-bold text-sm text-foreground">Comunidad</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex border-b border-border">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${tab === t.key ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto flex-1 p-3">
            {tab === 'classmates' && (
              <div className="space-y-2">
                {classmatesData.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">{c.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.badges} insignias · {c.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'ranking' && (
              <div className="space-y-2">
                {sorted.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                      <Progress value={c.progress} className="h-1 mt-1" />
                    </div>
                    <span className="text-xs font-semibold text-primary">{c.progress}%</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'badges' && (
              <div className="grid grid-cols-2 gap-2">
                {badgesData.map(b => (
                  <div
                    key={b.id}
                    className={`p-3 rounded-lg text-center transition-colors ${b.earned ? 'bg-accent/10' : 'bg-muted/50 opacity-40'}`}
                  >
                    <span className="text-2xl block mb-1">{b.icon}</span>
                    <p className="text-[10px] font-semibold text-foreground">{b.name}</p>
                    {b.earned && <Trophy className="w-3 h-3 text-accent mx-auto mt-1" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommunityPanel;
