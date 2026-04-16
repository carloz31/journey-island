import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students } from '@/data/counselorMockData';
import StudentDetailPanel from './StudentDetailPanel';
import type { Student } from '@/data/counselorMockData';

const EstudiantesView = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filtered = students.filter(s => {
    const matchSearch = `${s.nombre} ${s.apellido}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'riesgo' && s.riesgo) || s.hollandType === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-display font-bold">Estudiantes</h1>

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
            <SelectItem value="Social">Holland: Social</SelectItem>
            <SelectItem value="Investigativo">Holland: Investigativo</SelectItem>
            <SelectItem value="Artístico">Holland: Artístico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filtered.map(s => (
          <Card key={s.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStudent(s)}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{s.nombre[0]}{s.apellido[0]}</AvatarFallback>
                  </Avatar>
                  {s.riesgo && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-destructive rounded-full border-2 border-card" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{s.nombre} {s.apellido}</p>
                  <p className="text-[10px] text-muted-foreground">{s.ultimaActividad ? `Últ. actividad: ${s.ultimaActividad}` : 'Sin actividad'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-semibold">{s.porcentajeCompletado}%</span>
                </div>
                <Progress value={s.porcentajeCompletado} className="h-2" />
              </div>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="secondary" className="text-[10px] h-5">{s.hollandType}</Badge>
                <Badge variant="outline" className="text-[10px] h-5">{s.learningStyle}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <StudentDetailPanel student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
};

export default EstudiantesView;
