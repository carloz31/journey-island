import { useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useClassroom } from '@/contexts/ClassroomContext';

type ParentRow = {
  key: string;
  nombre: string;
  correo: string;
  // Activo = tiene cuenta vinculada; Inactivo = aún no se registró con el código
  activo: boolean;
  ultimoLogin: string | null;
  studentName: string;
  studentId: string;
  classroomId: string;
};

const ApoderadosView = () => {
  const [search, setSearch] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('all');
  const [classroomFilter, setClassroomFilter] = useState('all');
  const { allStudents, allClassrooms } = useClassroom();

  const classroomById = Object.fromEntries(allClassrooms.map(c => [c.id, c.nombre]));

  const rows: ParentRow[] = [];
  allStudents.forEach(s => {
    rows.push({
      key: `${s.id}-1`,
      nombre: s.apoderado1.nombre,
      correo: s.apoderado1.correo,
      activo: s.apoderado1.estado === 'activo',
      ultimoLogin: s.apoderado1.ultimoLogin,
      studentName: `${s.nombre} ${s.apellido}`,
      studentId: s.id,
      classroomId: s.classroomId,
    });
    if (s.apoderado2) {
      rows.push({
        key: `${s.id}-2`,
        nombre: s.apoderado2.nombre,
        correo: s.apoderado2.correo,
        activo: s.apoderado2.estado === 'activo',
        ultimoLogin: s.apoderado2.ultimoLogin,
        studentName: `${s.nombre} ${s.apellido}`,
        studentId: s.id,
        classroomId: s.classroomId,
      });
    }
  });

  const filtered = rows.filter(r => {
    const matchSearch = `${r.nombre} ${r.studentName} ${r.correo}`.toLowerCase().includes(search.toLowerCase());
    const matchEstado = estadoFilter === 'all' || (estadoFilter === 'activo' ? r.activo : !r.activo);
    const matchClassroom = classroomFilter === 'all' || r.classroomId === classroomFilter;
    return matchSearch && matchEstado && matchClassroom;
  });

  const activos = filtered.filter(r => r.activo).length;
  const inactivos = filtered.length - activos;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Apoderados</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} apoderados · {activos} activos · {inactivos} sin cuenta vinculada
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">
          Los apoderados se registran por su cuenta usando el código de acceso del aula del estudiante.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar apoderado o hijo/a..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={classroomFilter} onValueChange={setClassroomFilter}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Aula" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las aulas</SelectItem>
            {allClassrooms.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={estadoFilter} onValueChange={setEstadoFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="inactivo">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apoderado</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Hijo/a</TableHead>
              <TableHead>Aula</TableHead>
              <TableHead>Último acceso</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? filtered.map(r => (
              <TableRow key={r.key}>
                <TableCell className="font-medium text-sm">{r.nombre}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.activo ? r.correo : '—'}</TableCell>
                <TableCell className="text-sm">{r.studentName}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{classroomById[r.classroomId]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.ultimoLogin ?? '—'}</TableCell>
                <TableCell className="text-center">
                  {r.activo ? (
                    <Badge className="bg-success text-white text-[10px] h-5">Activo</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] h-5">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {r.activo && (
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Enviar correo">
                      <Mail className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  No se encontraron apoderados con los filtros seleccionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApoderadosView;
