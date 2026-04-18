import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClassroom } from '@/contexts/ClassroomContext';

const EstudiantesView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const { currentStudents, currentClassroom } = useClassroom();

  const filtered = currentStudents.filter(s => {
    const matchSearch = `${s.nombre} ${s.apellido}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'riesgo' && s.riesgo);
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Estudiantes</h1>
        <p className="text-sm text-muted-foreground">Estudiantes de: {currentClassroom.nombre}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Filtrar" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="riesgo">En riesgo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Última actividad</TableHead>
              <TableHead className="w-28 text-center">Progreso</TableHead>
              <TableHead className="w-40 text-center">Pendientes de revisión</TableHead>
              <TableHead className="w-28 text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map(s => {
                const pendingReview = s.actividadesDetalle.filter(a => a.completada && !a.revisado).length;

                return (
                  <TableRow
                    key={s.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/counselor/student/${s.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                              {s.nombre[0]}{s.apellido[0]}
                            </AvatarFallback>
                          </Avatar>
                          {s.riesgo && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-destructive rounded-full border-2 border-card" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{s.nombre} {s.apellido}</p>
                          <p className="text-[10px] text-muted-foreground">{s.riesgo ? 'Seguimiento prioritario' : 'Sin alertas'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{s.correo}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.ultimaActividad ?? 'Sin actividad'}
                    </TableCell>
                    <TableCell className="text-center text-sm font-bold text-primary">
                      {s.porcentajeCompletado}%
                    </TableCell>
                    <TableCell className="text-center">
                      {pendingReview > 0 ? (
                        <Badge variant="secondary" className="h-5 text-[10px]">
                          {pendingReview}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {s.riesgo ? (
                        <Badge variant="destructive" className="text-[10px] h-5">En riesgo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] h-5">Activo</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                  No se encontraron estudiantes con los filtros seleccionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EstudiantesView;
