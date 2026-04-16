import { useState } from 'react';
import { Mail, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { messagesData } from '@/data/mockData';

interface TopBarProps {
  onLogout: () => void;
  onMessagesClick: () => void;
}

const TopBar = ({ onLogout, onMessagesClick }: TopBarProps) => {
  const unreadCount = messagesData.filter(m => m.unread).length;

  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0 z-30">
      <h1 className="font-display font-bold text-base text-foreground">Mi camino</h1>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative h-8 w-8" onClick={onMessagesClick}>
          <Mail className="w-4 h-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" /> Ajustes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
