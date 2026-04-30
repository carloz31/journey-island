import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useClassroom } from '@/contexts/ClassroomContext';
import { allStudents } from '@/data/counselorMockData';
import type { CounselorView } from './CounselorLayout';
import MiAulaDetailView from './MiAulaDetailView';

interface Props {
  onViewChange: (view: CounselorView) => void;
}

const MisAulasView = ({ onViewChange }: Props) => {
  const { allClassrooms } = useClassroom();
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
          <p className="text-sm text-muted-foreground">Gestiona la información de cada una de tus aulas</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Crear Nueva Aula</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allClassrooms.map(c => {
          const healthColor = c.health === 'green' ? 'bg-success' : c.health === 'yellow' ? 'bg-warning' : 'bg-destructive';
          const classStudents = allStudents.filter(s => s.classroomId === c.id);
          const activos = classStudents.filter(s => s.estado === 'activo').length;
          const inactivos = classStudents.length - activos;
          const apoderadosCount = classStudents.reduce((acc, s) => acc + 1 + (s.apoderado2 ? 1 : 0), 0);

          return (
            <Card key={c.id} className="overflow-hidden">
              <div className={`h-1 ${healthColor}`} />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base">{c.nombre}</h3>
                    <p className="text-xs text-muted-foreground">{c.anioAcademico}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{c.hollandDominant}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-lg border bg-muted/30 px-2 py-2 text-center">
                    <p className="text-base font-display font-bold">{c.coTutores}</p>
                    <p className="text-[10px] text-muted-foreground">Docentes</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 px-2 py-2 text-center">
                    <p className="text-base font-display font-bold">{apoderadosCount}</p>
                    <p className="text-[10px] text-muted-foreground">Apoderados</p>
                  </div>
                  <div className="rounded-lg border bg-success/10 px-2 py-2 text-center">
                    <p className="text-base font-display font-bold text-success">{activos}</p>
                    <p className="text-[10px] text-muted-foreground">Activos</p>
                  </div>
                  <div className="rounded-lg border bg-warning/10 px-2 py-2 text-center">
                    <p className="text-base font-display font-bold text-warning">{inactivos}</p>
                    <p className="text-[10px] text-muted-foreground">Inactivos</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avance general</span>
                    <span className="font-semibold">{c.completionPct}%</span>
                  </div>
                  <Progress value={c.completionPct} className="h-2.5" />
                </div>

                <Button
                  size="sm"
                  className="w-full gap-1.5"
                  onClick={() => setManagingClassroomId(c.id)}
                >
                  <Settings className="w-3.5 h-3.5" />Gestionar
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MisAulasView;
