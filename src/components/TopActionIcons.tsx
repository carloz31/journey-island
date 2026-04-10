import { motion } from 'framer-motion';
import { MessageSquare, Users, HelpCircle } from 'lucide-react';

interface TopActionIconsProps {
  onMessagesClick: () => void;
  onCommunityClick: () => void;
  onHelpClick: () => void;
  unreadCount: number;
}

const TopActionIcons = ({ onMessagesClick, onCommunityClick, onHelpClick, unreadCount }: TopActionIconsProps) => {
  const icons = [
    { icon: MessageSquare, onClick: onMessagesClick, label: 'Mensajes', badge: unreadCount },
    { icon: Users, onClick: onCommunityClick, label: 'Comunidad', badge: 0 },
    { icon: HelpCircle, onClick: onHelpClick, label: 'Ayuda', badge: 0 },
  ];

  return (
    <motion.div
      className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {icons.map(({ icon: Icon, onClick, label, badge }) => (
        <motion.button
          key={label}
          onClick={onClick}
          className="relative glass-panel w-10 h-10 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className="w-4 h-4 text-foreground" />
          {badge > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {badge}
            </span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default TopActionIcons;
