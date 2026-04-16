import { useState } from 'react';
import { Search, Plus, Upload, Send, Eye, Mail, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { students, coTeachers, counselorProfile } from '@/data/counselorMockData';
import type { CounselorView } from './CounselorLayout';

const statusBadge = (estado: string) => {
  switch (estado) {
    case 'activo': return <Badge className="bg-success text-white text-[10px] h-5">Activo</Badge>;
    case 'pendiente': return <Badge className="bg-warning text-white text-[10px] h-5">Pendiente</Badge>;
    case 'no_invitado': return <Badge variant="destructive" className="text-[10px] h-5">No invitado</Badge>;
    case 'sin_cuenta': return <Badge variant="destructive" className="text-[10px] h-5">Sin cuenta</Badge>;
    default: return <Badge variant="outline" className="text-[10px] h-5">{estado}</Badge>;
  }
};

interface Props {
  onViewChange: (view: CounselorView) => void;
}

const MiAulaView = ({ onViewChange }: Props) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = students.filter(s => {
    const matchSearch = `${s.nombre} ${s.apellido}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.estado === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingInvites = students.filter(s => s.estado === 'no_invitado' || s.estado === 'pendiente');

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Mi Aula</h1>
          <p className="text-sm text-muted-foreground">{counselorProfile.aula} · {counselorProfile.totalEstudiantes} estudiantes · {counselorProfile.coTutores} co-tutores</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="gap-2"><Send className="w-4 h-4" />Iniciar Aula</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Iniciar el aula?</AlertDialogTitle>
              <AlertDialogDescription>
                Se enviarán invitaciones por correo a todos los estudiantes y apoderados registrados. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar y enviar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Tabs defaultValue="estudiantes">
        <TabsList>
          <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
          <TabsTrigger value="docentes">Docentes Co-tutores</TabsTrigger>
        </TabsList>

        <TabsContent value="estudiantes" className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar estudiante..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="no_invitado">No invitados</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" />Agregar Estudiante</Button>
            <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" />Importar Excel</Button>
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="gap-2"><Send className="w-4 h-4" />Invitaciones pendientes</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Enviar invitaciones pendientes</DialogTitle></DialogHeader>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {pendingInvites.map(s => (
                    <div key={s.id} className="flex items-center gap-3 py-1">
                      <Checkbox id={s.id} defaultChecked />
                      <label htmlFor={s.id} className="text-sm">{s.nombre} {s.apellido} — {statusBadge(s.estado)}</label>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button onClick={() => setInviteOpen(false)} className="gap-2"><Send className="w-4 h-4" />Enviar seleccionados</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Apoderado 1</TableHead>
                    <TableHead>Apoderado 2</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última actividad</TableHead>
                    <TableHead>Completado</TableHead>
                    <TableHead className="w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">{s.nombre[0]}{s.apellido[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium text-sm">{s.nombre} {s.apellido}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.correo}</TableCell>
                      <TableCell>
                        <div className="text-xs">{s.apoderado1.nombre}</div>
                        {statusBadge(s.apoderado1.estado)}
                      </TableCell>
                      <TableCell>
                        {s.apoderado2 ? (
                          <>
                            <div className="text-xs">{s.apoderado2.nombre}</div>
                            {statusBadge(s.apoderado2.estado)}
                          </>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell>{statusBadge(s.estado)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.ultimaActividad || '—'}</TableCell>
                      <TableCell className="text-sm font-semibold">{s.porcentajeCompletado}%</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onViewChange('estudiantes')}><Eye className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="w-3.5 h-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docentes" className="space-y-4">
          <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" />Agregar Docente</Button>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="w-20">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coTeachers.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.nombre}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.correo}</TableCell>
                      <TableCell className="text-sm">{t.rol}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MiAulaView;
