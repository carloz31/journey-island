import { Save, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useClassroom } from '@/contexts/ClassroomContext';
import { useState } from 'react';
import type { ActivityBlock } from '@/data/counselorMockData';

const tipoIcons: Record<string, string> = {
  test: '📝',
  respuesta_abierta: '✍️',
  subida_archivo: '📎',
  reflexion: '💭',
};

const ActividadesView = () => {
  const { currentClassroom } = useClassroom();
  const [blocks, setBlocks] = useState<ActivityBlock[]>(currentClassroom.activityBlocks);

  // Reset blocks when classroom changes
  const [lastClassroomId, setLastClassroomId] = useState(currentClassroom.id);
  if (currentClassroom.id !== lastClassroomId) {
    setBlocks(currentClassroom.activityBlocks);
    setLastClassroomId(currentClassroom.id);
  }

  const totalMandatorias = blocks.reduce((a, b) => a + b.actividades.filter(act => act.mandatoria).length, 0);
  const totalActividades = blocks.reduce((a, b) => a + b.actividades.length, 0);

  const toggleMandatoria = (blockId: number, actId: string) => {
    setBlocks(prev => prev.map(b =>
      b.id === blockId ? { ...b, actividades: b.actividades.map(a => a.id === actId ? { ...a, mandatoria: !a.mandatoria } : a) } : b
    ));
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Actividades y Plan</h1>
          <p className="text-sm text-muted-foreground">{currentClassroom.nombre} · {totalMandatorias} de {totalActividades} actividades marcadas como mandatorias</p>
        </div>
        <Button className="gap-2"><Save className="w-4 h-4" />Guardar Plan</Button>
      </div>

      <Accordion type="multiple" defaultValue={blocks.map(b => String(b.id))} className="space-y-3">
        {blocks.map(block => (
          <AccordionItem key={block.id} value={String(block.id)} className="border rounded-lg">
            <AccordionTrigger className="px-5 py-3 text-sm font-display">
              <span className="flex items-center gap-2">
                Bloque {block.id}: {block.nombre}
                <Badge variant="secondary" className="text-[10px]">{block.actividades.filter(a => a.mandatoria).length} mandatorias</Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 space-y-3">
              {block.actividades.map(act => (
                <div key={act.id} className="flex items-center gap-4 rounded-lg border p-3">
                  <span className="text-lg">{tipoIcons[act.tipo]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{act.nombre}</p>
                    <p className="text-[10px] text-muted-foreground">{act.tipo.replace('_', ' ')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mandatoria</span>
                    <Switch checked={act.mandatoria} onCheckedChange={() => toggleMandatoria(block.id, act.id)} />
                  </div>
                  {act.mandatoria && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                          <Calendar className="w-3 h-3" />
                          {act.deadline || 'Fecha límite'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent mode="single" className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  )}
                  <span className="text-xs text-muted-foreground w-16 text-right">{act.completados}/{act.total}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card>
        <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Cobertura del Plan</CardTitle></CardHeader>
        <CardContent className="space-y-3 pt-0">
          {blocks.flatMap(b => b.actividades.filter(a => a.mandatoria)).map(act => (
            <div key={act.id} className="flex items-center gap-4">
              <span className="text-xs w-56 shrink-0 truncate">{act.nombre}</span>
              <Progress value={(act.completados / act.total) * 100} className="h-2.5 flex-1" />
              <span className="text-xs font-semibold w-16 text-right">{act.completados}/{act.total}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActividadesView;
