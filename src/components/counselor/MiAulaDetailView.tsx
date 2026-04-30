import { useState } from 'react';
import { ChevronRight, Send, Users, GraduationCap, UserSquare2, AlertTriangle, Copy, RefreshCw, KeyRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { allStudents, classrooms } from '@/data/counselorMockData';
import type { CounselorView } from './CounselorLayout';

interface Props {
  classroomId: string;
  onBack: () => void;
  onViewChange: (view: CounselorView) => void;
}

const MiAulaDetailView = ({ classroomId, onBack, onViewChange }: Props) => {
  const classroom = classrooms.find(c => c.id === classroomId)!;
  const classStudents = allStudents.filter(s => s.classroomId === classroomId);

  const activos = classStudents.filter(s => s.estado === 'activo').length;
  const inactivos = classStudents.length - activos;
  const apoderadosCount = classStudents.reduce((acc, s) => acc + 1 + (s.apoderado2 ? 1 : 0), 0);
  const apoderadosSinCuenta = classStudents.reduce((acc, s) => {
    let n = 0;
    if (s.apoderado1.estado !== 'activo') n++;
    if (s.apoderado2 && s.apoderado2.estado !== 'activo') n++;
    return acc + n;
  }, 0);

  const [nombre, setNombre] = useState(classroom.nombre);
  const [anio, setAnio] = useState(classroom.anioAcademico);
  const [accessCode, setAccessCode] = useState(classroom.accessCode);
  const { toast } = useToast();

  const copyCode = () => {
    navigator.clipboard.writeText(accessCode);
    toast({ title: 'Código copiado', description: accessCode });
  };

  const regenerateCode = () => {
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const newCode = `AULA-${classroom.anioAcademico.slice(-2)}-${rand}`;
    setAccessCode(newCode);
    toast({ title: 'Nuevo código generado', description: 'Comparte el nuevo código con tus estudiantes y apoderados.' });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-foreground transition-colors">Mis Aulas</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{classroom.nombre}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">{classroom.nombre}</h1>
          <p className="text-sm text-muted-foreground">{classroom.anioAcademico}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="gap-2"><Send className="w-4 h-4" />Iniciar Aula</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Iniciar el aula?</AlertDialogTitle>
              <AlertDialogDescription>Se enviarán invitaciones por correo a todos los estudiantes y apoderados registrados.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar y enviar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Métricas resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-display font-bold">{classroom.coTutores}</p>
              <p className="text-[11px] text-muted-foreground">Docentes co-tutores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <UserSquare2 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xl font-display font-bold">{apoderadosCount}</p>
              <p className="text-[11px] text-muted-foreground">Apoderados ({apoderadosSinCuenta} sin cuenta)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-display font-bold">{activos}</p>
              <p className="text-[11px] text-muted-foreground">Estudiantes activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xl font-display font-bold">{inactivos}</p>
              <p className="text-[11px] text-muted-foreground">Estudiantes inactivos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editar info del aula */}
      <Card>
        <CardHeader className="py-3 px-5">
          <CardTitle className="text-sm font-display">Información del aula</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="aula-nombre" className="text-xs">Nombre del aula</Label>
              <Input id="aula-nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="aula-anio" className="text-xs">Año académico</Label>
              <Input id="aula-anio" value={anio} onChange={e => setAnio(e.target.value)} />
            </div>
          </div>

          <div className="rounded-lg border border-dashed bg-muted/40 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-primary" />
              <Label className="text-xs font-semibold">Código de acceso del aula</Label>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Estudiantes y apoderados se registran ingresando este código. Mantenlo seguro y compártelo solo con los miembros del aula.
            </p>
            <div className="flex items-center gap-2">
              <Input value={accessCode} readOnly className="font-mono font-semibold text-sm bg-card" />
              <Button variant="outline" size="sm" className="gap-1.5 shrink-0" onClick={copyCode}>
                <Copy className="w-3.5 h-3.5" />Copiar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                    <RefreshCw className="w-3.5 h-3.5" />Regenerar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Regenerar el código de acceso?</AlertDialogTitle>
                    <AlertDialogDescription>
                      El código anterior dejará de funcionar. Los estudiantes y apoderados que aún no se han registrado deberán usar el nuevo código. Las cuentas ya vinculadas no se verán afectadas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={regenerateCode}>Regenerar código</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>

      {/* Avance */}
      <Card>
        <CardHeader className="py-3 px-5 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-display">Progreso del aula</CardTitle>
          <Badge variant="outline" className="text-[10px]">{classroom.completionPct}% completado</Badge>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {classroom.bloquesProgress.map(b => (
            <div key={b.nombre} className="flex items-center gap-4">
              <span className="text-xs w-48 shrink-0 text-muted-foreground">{b.nombre}</span>
              <Progress value={b.pct} className="h-2.5 flex-1" />
              <span className="text-xs font-semibold w-10 text-right">{b.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Atajos a las listas globales */}
      <Card>
        <CardHeader className="py-3 px-5">
          <CardTitle className="text-sm font-display">Ver listas detalladas</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onViewChange('estudiantes')}>
            <Users className="w-3.5 h-3.5" />Ver estudiantes
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onViewChange('apoderados')}>
            <UserSquare2 className="w-3.5 h-3.5" />Ver apoderados
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onViewChange('docentes')}>
            <GraduationCap className="w-3.5 h-3.5" />Ver docentes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiAulaDetailView;
