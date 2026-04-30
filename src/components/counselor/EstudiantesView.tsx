import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, FileSpreadsheet, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useClassroom } from '@/contexts/ClassroomContext';

const EstudiantesView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [classroomFilter, setClassroomFilter] = useState<string>('all');
  const [estadoFilter, setEstadoFilter] = useState<string>('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadClassroom, setUploadClassroom] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { allStudents, allClassrooms } = useClassroom();
  const { toast } = useToast();

  const classroomById = Object.fromEntries(allClassrooms.map(c => [c.id, c]));

  // Estado simplificado: 'activo' (tiene cuenta vinculada) | 'inactivo' (sin cuenta vinculada todavía)
  const isActivo = (s: typeof allStudents[number]) => s.estado === 'activo';

  const filtered = allStudents.filter(s => {
    const matchSearch = `${s.nombre} ${s.apellido}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'riesgo' && s.riesgo);
    const matchClassroom = classroomFilter === 'all' || s.classroomId === classroomFilter;
    const matchEstado = estadoFilter === 'all' || (estadoFilter === 'activo' ? isActivo(s) : !isActivo(s));
    return matchSearch && matchFilter && matchClassroom && matchEstado;
  });

  const totalActivos = filtered.filter(isActivo).length;
  const totalInactivos = filtered.length - totalActivos;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const downloadTemplate = () => {
    const csv = 'nombre,apellido\nJuan,Pérez García\nMaría,López Soto\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_estudiantes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadConfirm = () => {
    if (!uploadClassroom || !fileName) {
      toast({ title: 'Faltan datos', description: 'Selecciona un aula y un archivo.', variant: 'destructive' });
      return;
    }
    toast({
      title: 'Estudiantes cargados',
      description: `Se procesó "${fileName}" para ${classroomById[uploadClassroom]?.nombre}. Comparte el código de acceso para que se vinculen sus cuentas.`,
    });
    setUploadOpen(false);
    setFileName(null);
    setUploadClassroom('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold">Estudiantes</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} estudiantes · {totalActivos} con cuenta · {totalInactivos} sin cuenta
          </p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Upload className="w-4 h-4" />Cargar estudiantes</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cargar estudiantes masivamente</DialogTitle>
              <DialogDescription>
                Sube un archivo CSV o XLSX con las columnas <span className="font-mono text-xs">nombre</span> y <span className="font-mono text-xs">apellido</span>. Los estudiantes se crearán como inactivos hasta que se registren con el código de acceso del aula.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Aula destino</label>
                <Select value={uploadClassroom} onValueChange={setUploadClassroom}>
                  <SelectTrigger><SelectValue placeholder="Selecciona un aula" /></SelectTrigger>
                  <SelectContent>
                    {allClassrooms.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {uploadClassroom && (
                  <p className="text-[11px] text-muted-foreground pt-1">
                    Código de acceso del aula: <span className="font-mono font-semibold">{classroomById[uploadClassroom]?.accessCode}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Archivo (CSV o XLSX)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <FileSpreadsheet className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{fileName ?? 'Haz clic para seleccionar un archivo'}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Acepta .csv, .xlsx</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              <Button variant="ghost" size="sm" onClick={downloadTemplate} className="gap-2 text-xs">
                <Download className="w-3.5 h-3.5" />Descargar plantilla CSV
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancelar</Button>
              <Button onClick={handleUploadConfirm}>Cargar estudiantes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
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
              <TableHead>Aula</TableHead>
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
                const activo = isActivo(s);

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
                          <p className="text-[10px] text-muted-foreground">{s.riesgo ? 'Seguimiento prioritario' : activo ? 'Cuenta vinculada' : 'Sin cuenta vinculada'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{classroomById[s.classroomId]?.nombre}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{activo ? s.correo : '—'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {s.ultimaActividad ?? 'Sin actividad'}
                    </TableCell>
                    <TableCell className="text-center text-sm font-bold text-primary">
                      {activo ? `${s.porcentajeCompletado}%` : '—'}
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
                      {activo ? (
                        <Badge className="bg-success text-white text-[10px] h-5">Activo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] h-5">Inactivo</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
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
