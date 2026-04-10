import { motion } from 'framer-motion';
import { GraduationCap, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onSelectRole: (role: 'student' | 'counselor' | 'parent') => void;
}

const roles = [
  { key: 'counselor' as const, label: 'Vista de orientador', icon: GraduationCap, description: 'Gestiona planes y seguimiento de estudiantes' },
  { key: 'student' as const, label: 'Vista de estudiante', icon: User, description: 'Explora tu mapa vocacional' },
  { key: 'parent' as const, label: 'Vista de padres', icon: Users, description: 'Acompaña el proceso de tu hijo/a' },
];

const LandingScreen = ({ onSelectRole }: LandingScreenProps) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{
        background: 'linear-gradient(180deg, hsl(199 60% 82%) 0%, hsl(198 40% 97%) 60%)',
      }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Mi camino</h1>
        <p className="text-muted-foreground text-sm">Plataforma de orientación vocacional</p>
      </motion.div>

      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {roles.map((role, i) => (
          <motion.div
            key={role.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Button
              variant="outline"
              onClick={() => onSelectRole(role.key)}
              className="glass-panel h-auto flex flex-col items-center gap-3 p-8 w-56 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <role.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-display font-bold text-sm text-foreground">{role.label}</span>
              <span className="text-xs text-muted-foreground text-center leading-snug">{role.description}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingScreen;
