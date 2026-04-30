import { useState } from 'react';
import { Search, Send, Mail } from 'lucide-react';
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
  estado: 'activo' | 'pendiente' | 'sin_cuenta';
  ultimoLogin: string | null;
  studentName: string;
  studentId: string;
  classroomId: string;
};

const stateBadge = (estado: ParentRow['estado']) => {
  switch (estado) {
    case 'activo': return <Badge className="bg-success text-white text-[10px] h-5">Activa</Badge>;
    case 'pendiente': return <Badge className="bg-warning text-white text-[10px] h-5">Pendiente</Badge>;
    case 'sin_cuenta': return <Badge variant="destructive" className="text-[10px] h-5">Sin cuenta</Badge>;
  }
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
      estado: s.apoderado1.estado,
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
        estado: s.apoderado2.estado,
        ultimoLogin: s.apoderado2.ultimoLogin,
        studentName: `${s.nombre} ${s.apellido}`,
        studentId: s.id,
        classroomId: s.classroomId,
      });
    }
  });

  const filtered = rows.filter(r => {
    const matchSearch = `${r.nombre} ${r.studentName} ${r.correo}`.toLowerCase().includes(search.toLowerCase());
    const matchEstado = estadoFilter === 'all' || r.estado === estadoFilter;
    const matchClassroom = classroomFilter === 'all' || r.classroomId === classroomFilter;
    return matchSearch && matchEstado && matchClassroom;
  });

  const sinCuenta = filtered.filter(r => r.estado === 'sin_cuenta').length;
  const pendientes = filtered.filter(r => r.estado === 'pendiente').length;
  const activos = filtered.filter(r => r.estado === 'activo').length;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Apoderados</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} apoderados · {activos} activos · {pendientes} pendientes · {sinCuenta} sin cuenta
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
            <SelectItem value="pendiente">Pendientes</SelectItem>
            <SelectItem value="sin_cuenta">Sin cuenta</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2"><Send className="w-4 h-4" />Reenviar pendientes</Button>
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
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? filtered.map(r => (
              <TableRow key={r.key}>
                <TableCell className="font-medium text-sm">{r.nombre}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.correo}</TableCell>
                <TableCell className="text-sm">{r.studentName}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{classroomById[r.classroomId]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.ultimoLogin ?? '—'}</TableCell>
                <TableCell className="text-center">{stateBadge(r.estado)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" title="Enviar correo"><Mail className="w-3.5 h-3.5" /></Button>
                    {r.estado !== 'activo' && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Reenviar invitación"><Send className="w-3.5 h-3.5" /></Button>
                    )}
                  </div>
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
