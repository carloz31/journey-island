import { useState } from 'react';
import { Plus, Eye, Settings, Users, AlertTriangle, UserX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useClassroom } from '@/contexts/ClassroomContext';
import type { CounselorView } from './CounselorLayout';
import MiAulaDetailView from './MiAulaDetailView';

interface Props {
  onViewChange: (view: CounselorView) => void;
}

const MisAulasView = ({ onViewChange }: Props) => {
  const { allClassrooms, setCurrentClassroomId } = useClassroom();
  const [managingClassroomId, setManagingClassroomId] = useState<string | null>(null);

  if (managingClassroomId) {
    return (
      <MiAulaDetailView
        classroomId={managingClassroomId}
        onBack={() => setManagingClassroomId(null)}
        onViewChange={onViewChange}
      />
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Mis Aulas</h1>
          <p className="text-sm text-muted-foreground">Gestiona todas las aulas a tu cargo</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Crear Nueva Aula</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allClassrooms.map(c => {
          const healthColor = c.health === 'green' ? 'bg-success' : c.health === 'yellow' ? 'bg-warning' : 'bg-destructive';
          return (
            <Card key={c.id} className="overflow-hidden">
              <div className={`h-1 ${healthColor}`} />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base">{c.nombre}</h3>
                    <p className="text-xs text-muted-foreground">{c.totalEstudiantes} estudiantes · {c.coTutores} co-tutores · {c.anioAcademico}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{c.hollandDominant}</Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avance general</span>
                    <span className="font-semibold">{c.completionPct}%</span>
                  </div>
                  <Progress value={c.completionPct} className="h-2.5" />
                </div>

                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-destructive">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{c.atRiskCount} en riesgo</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-warning">
                    <UserX className="w-3.5 h-3.5" />
                    <span>{c.noAccountParents} apod. sin cuenta</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5"
                    onClick={() => { setCurrentClassroomId(c.id); onViewChange('dashboard'); }}
                  >
                    <Eye className="w-3.5 h-3.5" />Ver Aula
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5"
                    onClick={() => setManagingClassroomId(c.id)}
                  >
                    <Settings className="w-3.5 h-3.5" />Gestionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MisAulasView;
