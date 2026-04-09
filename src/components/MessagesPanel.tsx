import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bot } from 'lucide-react';
import { messagesData } from '@/data/mockData';

interface MessagesPanelProps {
  open: boolean;
  onClose: () => void;
}

const MessagesPanel = ({ open, onClose }: MessagesPanelProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute top-16 right-4 z-30 glass-panel w-80 max-h-[70vh] flex flex-col"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <h3 className="font-display font-bold text-sm text-foreground">Mensajes</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {messagesData.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${msg.unread ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.senderType === 'counselor' ? 'bg-secondary/20' : 'bg-muted'}`}>
                    {msg.senderType === 'counselor' ? (
                      <User className="w-3.5 h-3.5 text-secondary" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground truncate">{msg.sender}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{msg.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{msg.preview}</p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagesPanel;
