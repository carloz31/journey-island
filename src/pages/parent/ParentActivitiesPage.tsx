import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, BookOpen, Heart, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { parentActivities, interpolateChildName } from '@/data/parentData';
import { useParent } from '@/contexts/ParentContext';

const ParentActivitiesPage = () => {
  const navigate = useNavigate();
  const { profile, selectedChildId, setSelectedChildId, selectedChild, isCompleted } = useParent();
  const [tab, setTab] = useState<'info' | 'child'>('info');

  const informational = parentActivities.filter(a => a.category === 'informational');
  const childRelated = parentActivities.filter(a => a.category === 'child_related');

  const childCompleted = childRelated.filter(a => isCompleted(a.id, selectedChildId)).length;
  const childPending = childRelated.length - childCompleted;

  const renderAccordion = (activities: typeof parentActivities, childId: string | null) => (
    <Accordion type="single" collapsible className="space-y-3">
      {activities.map(act => {
        const done = isCompleted(act.id, childId);
        const displayTitle = childId
          ? interpolateChildName(act.title, selectedChild.name)
          : act.title;
        const displayDesc = childId
          ? interpolateChildName(act.description, selectedChild.name)
          : act.description;
        return (
          <AccordionItem
            key={act.id}
            value={act.id}
            className="border rounded-xl bg-card px-5 shadow-sm data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-4 flex-1 text-left">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  childId ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'
                }`}>
                  {childId ? <Heart className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm">{displayTitle}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {act.estimatedMinutes} min
                  </p>
                </div>
                {done ? (
                  <Badge className="bg-success/15 text-success hover:bg-success/15 border-0 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completada
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1 text-muted-foreground">
                    <Circle className="w-3 h-3" /> Pendiente
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-1">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{displayDesc}</p>
              <Button
                onClick={() => navigate(`/parents/activities/${act.id}${childId ? `?childId=${childId}` : ''}`)}
                className="gap-2"
              >
                {done ? 'Repasar' : 'Comenzar'}
              </Button>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-1">Actividades para padres</h1>
        <p className="text-sm text-muted-foreground">
          Reflexiona y acompaña el proceso vocacional de tu hijo/a.
        </p>
      </div>

      <Tabs value={tab} onValueChange={v => setTab(v as 'info' | 'child')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="info">Actividades Informativas</TabsTrigger>
          <TabsTrigger value="child">Actividades por Hijo/a</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          {renderAccordion(informational, null)}
        </TabsContent>

        <TabsContent value="child" className="mt-6">
          {/* Child selector */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Hijo/a seleccionado</p>
              {profile.children.length === 1 ? (
                <p className="font-display font-bold text-lg">{profile.children[0].name}</p>
              ) : (
                <Select value={selectedChildId} onValueChange={setSelectedChildId}>
                  <SelectTrigger className="w-64 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {profile.children.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} <span className="text-muted-foreground text-xs ml-2">{c.grade}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Disponibles</p>
              <p className="text-2xl font-display font-bold mt-1">{childRelated.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Completadas</p>
              <p className="text-2xl font-display font-bold mt-1 text-success">{childCompleted}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-display font-bold mt-1 text-warning">{childPending}</p>
            </Card>
          </div>

          {renderAccordion(childRelated, selectedChildId)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentActivitiesPage;
