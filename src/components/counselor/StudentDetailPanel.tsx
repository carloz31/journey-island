import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, FileText, CheckCircle2, Clock, Save } from 'lucide-react';
import type { Student } from '@/data/counselorMockData';
import { useState } from 'react';

interface Props {
  student: Student | null;
  onClose: () => void;
}

const statusBadge = (estado: string) => {
  switch (estado) {
    case 'activo': return <Badge className="bg-success text-white text-[10px]">Activo</Badge>;
    case 'pendiente': return <Badge className="bg-warning text-white text-[10px]">Pendiente</Badge>;
    default: return <Badge variant="destructive" className="text-[10px]">Sin cuenta</Badge>;
  }
};

const StudentDetailPanel = ({ student, onClose }: Props) => {
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ['Seguimiento prioritario', 'Reunión pendiente', 'Derivado'];
  const s = student;

  if (!s) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const bloqueGroups = s.actividadesDetalle.reduce((acc, a) => {
    if (!acc[a.bloque]) acc[a.bloque] = [];
    acc[a.bloque].push(a);
    return acc;
  }, {} as Record<string, typeof s.actividadesDetalle>);

  return (
    <Sheet open={!!student} onOpenChange={() => onClose()}>
      <SheetContent className="w-[560px] sm:max-w-[560px] p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <SheetHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{s.nombre[0]}{s.apellido[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="text-lg">{s.nombre} {s.apellido}</SheetTitle>
                  <p className="text-xs text-muted-foreground">{s.correo}</p>
                </div>
              </div>
            </SheetHeader>

            <Tabs defaultValue="resumen">
              <TabsList className="w-full">
                <TabsTrigger value="resumen" className="flex-1">Vista Resumida</TabsTrigger>
                <TabsTrigger value="detalle" className="flex-1">Vista Extendida</TabsTrigger>
              </TabsList>

              <TabsContent value="resumen" className="space-y-5 mt-4">
                {/* Parents */}
                <div className="space-y-2">
                  <h4 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">Apoderados</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border p-3 space-y-1">
                      <p className="text-sm font-medium">{s.apoderado1.nombre}</p>
                      <p className="text-xs text-muted-foreground">{s.apoderado1.correo}</p>
                      {statusBadge(s.apoderado1.estado)}
                    </div>
                    {s.apoderado2 && (
                      <div className="rounded-lg border p-3 space-y-1">
                        <p className="text-sm font-medium">{s.apoderado2.nombre}</p>
                        <p className="text-xs text-muted-foreground">{s.apoderado2.correo}</p>
                        {statusBadge(s.apoderado2.estado)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Block Progress */}
                <div className="space-y-2">
                  <h4 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">Progreso por Bloque</h4>
                  {s.bloques.map(b => (
                    <div key={b.nombre} className="flex items-center gap-3">
                      <span className="text-xs w-40 shrink-0 truncate">{b.nombre}</span>
                      <Progress value={(b.completado / b.total) * 100} className="h-2 flex-1" />
                      <span className="text-xs font-semibold w-12 text-right">{b.completado}/{b.total}</span>
                    </div>
                  ))}
                </div>

                {/* Profile Results */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Holland</p>
                    <p className="text-sm font-bold text-primary">{s.hollandType}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Aprendizaje</p>
                    <p className="text-sm font-bold text-primary">{s.learningStyle}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Completado</p>
                    <p className="text-sm font-bold text-primary">{s.porcentajeCompletado}%</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">Etiquetas</h4>
                  <div className="flex gap-2 flex-wrap">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                        className="cursor-pointer text-xs"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <h4 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">Notas del Orientador</h4>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Escribe notas privadas sobre este estudiante..." rows={3} />
                  <Button size="sm" className="gap-1"><Save className="w-3 h-3" />Guardar</Button>
                </div>
              </TabsContent>

              <TabsContent value="detalle" className="mt-4">
                <Accordion type="multiple" className="space-y-2">
                  {Object.entries(bloqueGroups).map(([bloque, acts]) => (
                    <AccordionItem key={bloque} value={bloque} className="border rounded-lg px-3">
                      <AccordionTrigger className="text-sm font-display py-3">{bloque}</AccordionTrigger>
                      <AccordionContent className="space-y-3 pb-3">
                        {acts.map((a, i) => (
                          <div key={i} className="rounded-lg border p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {a.completada ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                                <span className="text-sm font-medium">{a.nombre}</span>
                                <Badge variant="outline" className="text-[10px]">{a.tipo.replace('_', ' ')}</Badge>
                              </div>
                              {a.completada && <span className="text-[10px] text-muted-foreground">{a.fechaCompletada}</span>}
                            </div>
                            {a.resultado && <p className="text-xs bg-muted rounded px-2 py-1">{a.resultado}</p>}
                            {a.respuestaAbierta && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-xs italic">{a.respuestaAbierta}</p>
                              </div>
                            )}
                            {a.archivo && (
                              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                <Download className="w-3 h-3" />{a.archivo}
                              </Button>
                            )}
                            {a.completada && a.tipo === 'respuesta_abierta' && (
                              <div className="space-y-1 border-t pt-2">
                                <Textarea placeholder="Dejar comentario para el estudiante..." rows={2} className="text-xs" />
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Checkbox checked={a.revisado} />
                                    <span className="text-xs">Marcar como revisado</span>
                                  </div>
                                  <Button size="sm" variant="outline" className="h-6 text-xs">Enviar comentario</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailPanel;
