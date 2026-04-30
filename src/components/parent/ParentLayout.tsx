import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Users, Compass, ChevronLeft, ChevronRight, LogOut, Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useParent } from '@/contexts/ParentContext';

const navItems = [
  { to: '/parents/activities', label: 'Actividades', icon: ClipboardList },
  { to: '/parents/students', label: 'Perfil de Hijos/as', icon: Users },
  { to: '/parents/explore', label: 'Explorar Carreras', icon: Compass },
];

interface Props {
  children: React.ReactNode;
}

const ParentLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useParent();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar (matches counselor style) */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col bg-foreground text-primary-foreground shrink-0 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-sm">MC</span>
          </div>
          {!collapsed && <span className="font-display font-bold text-sm truncate">Mi Camino</span>}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                  active
                    ? 'bg-gradient-to-r from-primary/80 to-primary/50 text-white font-semibold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-10 border-t border-white/10 text-white/40 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10">
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarFallback className="bg-primary text-sm font-bold">
              {profile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{profile.name}</p>
              <p className="text-[10px] text-white/50 truncate">Madre / Padre</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-white h-8 w-8" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 bg-card border-b border-border flex items-center px-4 gap-3 shrink-0">
          <p className="text-xs text-muted-foreground">
            Bienvenido/a, <span className="font-semibold text-foreground">{profile.name.split(' ')[0]}</span>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
