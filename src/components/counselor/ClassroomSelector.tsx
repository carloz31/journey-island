import { ChevronDown, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useClassroom } from '@/contexts/ClassroomContext';

const healthDot = (health: 'green' | 'yellow' | 'red') => {
  const colors = { green: 'bg-success', yellow: 'bg-warning', red: 'bg-destructive' };
  return <div className={`w-2.5 h-2.5 rounded-full ${colors[health]} shrink-0`} />;
};

const ClassroomSelector = () => {
  const { currentClassroom, setCurrentClassroomId, allClassrooms } = useClassroom();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium max-w-[300px]">
          {healthDot(currentClassroom.health)}
          <span className="truncate">{currentClassroom.nombre}</span>
          <ChevronDown className="w-3 h-3 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {allClassrooms.map(c => (
          <DropdownMenuItem
            key={c.id}
            onClick={() => setCurrentClassroomId(c.id)}
            className="flex items-center gap-3 py-2.5"
          >
            {healthDot(c.health)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{c.nombre}</p>
              <p className="text-[10px] text-muted-foreground">{c.totalEstudiantes} estudiantes · {c.anioAcademico}</p>
            </div>
            {c.id === currentClassroom.id && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-primary">
          <Plus className="w-4 h-4" />
          Nueva Aula
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClassroomSelector;
