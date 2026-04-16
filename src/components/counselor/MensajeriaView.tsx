import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { messages } from '@/data/counselorMockData';

const MensajeriaView = () => {
  const [selectedMsg, setSelectedMsg] = useState(messages[0]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [tab, setTab] = useState('recibidos');

  const recibidos = messages.filter(m => m.tipo === 'recibido');
  const enviados = messages.filter(m => m.tipo === 'enviado');
  const current = tab === 'recibidos' ? recibidos : tab === 'enviados' ? enviados : [];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Mensajería</h1>
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" />Nuevo Mensaje</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Nuevo mensaje</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Select>
                <SelectTrigger><SelectValue placeholder="Seleccionar destinatarios..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_students">Todos los estudiantes</SelectItem>
                  <SelectItem value="all_parents">Todos los apoderados</SelectItem>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Asunto" />
              <Textarea placeholder="Escribe tu mensaje..." rows={5} />
              <div className="flex items-center gap-2">
                <Checkbox id="ics" />
                <label htmlFor="ics" className="text-sm">Adjuntar evento de calendario (.ics)</label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setComposeOpen(false)} className="gap-2"><Send className="w-4 h-4" />Enviar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="recibidos">Recibidos ({recibidos.length})</TabsTrigger>
          <TabsTrigger value="enviados">Enviados ({enviados.length})</TabsTrigger>
          <TabsTrigger value="borradores">Borradores (0)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-[360px_1fr] gap-4 min-h-[500px]">
        {/* Message list */}
        <Card className="flex flex-col">
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {current.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMsg(m)}
                  className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${selectedMsg?.id === m.id ? 'bg-muted/50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${!m.leido ? 'font-bold' : 'font-medium'}`}>{m.tipo === 'recibido' ? m.de : m.para}</span>
                    {!m.leido && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs font-medium mt-0.5">{m.asunto}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{m.fecha}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Message detail */}
        <Card>
          {selectedMsg ? (
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold">{selectedMsg.asunto}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedMsg.tipo === 'recibido' ? `De: ${selectedMsg.de}` : `Para: ${selectedMsg.para}`} · {selectedMsg.fecha}
                </p>
              </div>
              <p className="text-sm leading-relaxed">{selectedMsg.contenido}</p>
              {selectedMsg.tipo === 'recibido' && (
                <div className="border-t pt-4 space-y-3">
                  <Textarea placeholder="Responder..." rows={3} />
                  <Button size="sm" className="gap-1"><Send className="w-3 h-3" />Responder</Button>
                </div>
              )}
            </CardContent>
          ) : (
            <CardContent className="p-6 flex items-center justify-center text-muted-foreground text-sm">
              Selecciona un mensaje para verlo
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MensajeriaView;
