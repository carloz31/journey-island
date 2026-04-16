import { Users, Activity, AlertTriangle, UserX, Clock, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import {
  students, recentActions, weeklyHeatmap,
  careerInterests, hollandDistribution, learningStylesDistribution,
} from '@/data/counselorMockData';

const bloquesProgress = [
  { nombre: 'Autoconocimiento', pct: 68 },
  { nombre: 'Exploración de Intereses', pct: 52 },
  { nombre: 'Estilos de Aprendizaje', pct: 45 },
  { nombre: 'Mundo Laboral', pct: 30 },
  { nombre: 'Proyecto Vocacional', pct: 15 },
];

const KpiCard = ({ icon: Icon, label, value, color, subtitle }: { icon: React.ElementType; label: string; value: string | number; color: string; subtitle: string }) => (
  <Card className="relative overflow-hidden">
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${color}`} />
    <CardContent className="p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color.replace('bg-', 'bg-')}/10`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground/70">{subtitle}</p>
      </div>
    </CardContent>
  </Card>
);

const heatmapColors = ['hsl(var(--muted))', 'hsl(187 52% 85%)', 'hsl(187 52% 70%)', 'hsl(187 52% 55%)', 'hsl(187 52% 40%)'];
const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const DashboardView = () => {
  const [alertsOpen, setAlertsOpen] = useState(true);
  const atRisk = students.filter(s => s.riesgo);
  const noAccountParents = students.filter(s => s.apoderado1.estado === 'sin_cuenta' || s.apoderado2?.estado === 'sin_cuenta');
  const avgCompletion = Math.round(students.reduce((a, s) => a + s.porcentajeCompletado, 0) / students.length);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">4to Año B — Promoción 2025</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard icon={Users} label="Total Estudiantes" value={28} color="bg-primary" subtitle="18 activos" />
        <KpiCard icon={Activity} label="Actividad Promedio" value={`${avgCompletion}%`} color="bg-secondary" subtitle="del plan completado" />
        <KpiCard icon={AlertTriangle} label="Estudiantes en Riesgo" value={atRisk.length} color="bg-destructive" subtitle="7+ días sin actividad" />
        <KpiCard icon={UserX} label="Apoderados sin cuenta" value={noAccountParents.length} color="bg-warning" subtitle="cuentas no activadas" />
      </div>

      {/* Alerts */}
      <Collapsible open={alertsOpen} onOpenChange={setAlertsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer flex flex-row items-center justify-between py-3 px-5">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Alertas Prioritarias
                <Badge variant="destructive" className="ml-2">{atRisk.length + noAccountParents.length}</Badge>
              </CardTitle>
              {alertsOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-3">
              {atRisk.slice(0, 4).map(s => (
                <div key={s.id} className="flex items-center justify-between bg-destructive/5 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-destructive" />
                    <div>
                      <p className="text-sm font-medium">{s.nombre} {s.apellido}</p>
                      <p className="text-xs text-muted-foreground">{s.diasInactivo} días inactivo · {s.porcentajeCompletado}% completado</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><Send className="w-3 h-3" />Enviar recordatorio</Button>
                </div>
              ))}
              {noAccountParents.slice(0, 3).map(s => (
                <div key={`p-${s.id}`} className="flex items-center justify-between bg-warning/5 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <UserX className="w-4 h-4 text-warning" />
                    <div>
                      <p className="text-sm font-medium">{s.apoderado1.nombre}</p>
                      <p className="text-xs text-muted-foreground">Apoderado de {s.nombre} · Sin cuenta activa</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><Send className="w-3 h-3" />Reenviar invitación</Button>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Classroom Progress */}
      <Card>
        <CardHeader className="py-3 px-5">
          <CardTitle className="text-sm font-display">Progreso del Aula por Bloque</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {bloquesProgress.map(b => (
            <div key={b.nombre} className="flex items-center gap-4">
              <span className="text-xs w-48 shrink-0 text-muted-foreground">{b.nombre}</span>
              <Progress value={b.pct} className="h-3 flex-1" />
              <span className="text-xs font-semibold w-10 text-right">{b.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Career Interests */}
        <Card>
          <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Top Áreas de Interés</CardTitle></CardHeader>
          <CardContent className="pt-0 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={careerInterests} layout="vertical" margin={{ left: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="area" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(187, 52%, 48%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Holland */}
        <Card>
          <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Tipos de Personalidad Holland</CardTitle></CardHeader>
          <CardContent className="pt-0 h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={hollandDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} label={({ name, value }) => `${name} (${value})`} labelLine={false}>
                  {hollandDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Learning Styles */}
        <Card>
          <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Estilos de Aprendizaje</CardTitle></CardHeader>
          <CardContent className="pt-0 h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={learningStylesDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} label={({ name, value }) => `${name} (${value})`} labelLine={false}>
                  {learningStylesDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap + Activity Feed */}
      <div className="grid grid-cols-[1fr_380px] gap-4">
        {/* Heatmap */}
        <Card>
          <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Actividad Semanal (últimas 8 semanas)</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-1">
              <div className="flex flex-col gap-1 pr-2">
                {dayLabels.map(d => <div key={d} className="h-5 flex items-center text-[10px] text-muted-foreground">{d}</div>)}
              </div>
              {weeklyHeatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((val, di) => (
                    <div key={di} className="w-5 h-5 rounded-sm" style={{ backgroundColor: heatmapColors[val] }} title={`Semana ${wi + 1}, ${dayLabels[di]}: nivel ${val}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
              <span>Menos</span>
              {heatmapColors.map((c, i) => <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />)}
              <span>Más</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="flex flex-col">
          <CardHeader className="py-3 px-5"><CardTitle className="text-sm font-display">Actividad Reciente</CardTitle></CardHeader>
          <CardContent className="pt-0 flex-1">
            <ScrollArea className="h-[220px]">
              <div className="space-y-3">
                {recentActions.map(a => (
                  <div key={a.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs"><span className="font-semibold">{a.estudiante}</span> {a.accion}</p>
                      <p className="text-[10px] text-muted-foreground">{a.bloque} · {a.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
