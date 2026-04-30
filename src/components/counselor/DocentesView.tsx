import { useState } from 'react';
import { Search, Plus, Mail, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useClassroom } from '@/contexts/ClassroomContext';

type DocenteRow = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  classroomId: string;
};

const DocentesView = () => {
  const [search, setSearch] = useState('');
  const [classroomFilter, setClassroomFilter] = useState('all');
  const { allClassrooms } = useClassroom();

  const classroomById = Object.fromEntries(allClassrooms.map(c => [c.id, c.nombre]));

  const rows: DocenteRow[] = allClassrooms.flatMap(c =>
    c.coTeachers.map(t => ({ ...t, classroomId: c.id }))
  );

  const filtered = rows.filter(r => {
    const matchSearch = `${r.nombre} ${r.correo} ${r.rol}`.toLowerCase().includes(search.toLowerCase());
    const matchClassroom = classroomFilter === 'all' || r.classroomId === classroomFilter;
    return matchSearch && matchClassroom;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold">Docentes</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} docentes co-tutores en {classroomFilter === 'all' ? 'todas las aulas' : classroomById[classroomFilter]}
          </p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Agregar Docente</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar docente..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
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
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Aula</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? filtered.map(r => (
              <TableRow key={`${r.classroomId}-${r.id}`}>
                <TableCell className="font-medium text-sm">{r.nombre}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.correo}</TableCell>
                <TableCell className="text-sm"><Badge variant="outline" className="text-[10px]">{r.rol}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{classroomById[r.classroomId]}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                  No se encontraron docentes con los filtros seleccionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocentesView;
