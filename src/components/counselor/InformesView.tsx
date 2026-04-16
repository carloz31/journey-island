import { FileText, Users, BarChart3, Heart, Download, GitCompare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClassroom } from '@/contexts/ClassroomContext';

const InformesView = () => {
  const { currentStudents, currentClassroom, allClassrooms } = useClassroom();

  const reports = [
    {
      icon: FileText,
      title: 'Informe Individual del Estudiante',
      description: 'Resumen completo del perfil vocacional: resultados Holland, estilo de aprendizaje, intereses, actividades y respuestas clave.',
      action: 'Generar PDF',
      hasStudentSelector: true,
      color: 'text-primary',
    },
    {
      icon: Users,
      title: 'Informe General del Aula',
      description: 'Panorama vocacional del aula: distribución Holland, estilos de aprendizaje, áreas de interés y tasas de completado.',
      action: 'Generar PDF',
      hasStudentSelector: false,
      color: 'text-secondary',
    },
    {
      icon: BarChart3,
      title: 'Reporte de Participación',
      description: 'Tabla de todos los estudiantes con porcentaje de avance, última actividad y estado de cuenta de apoderados. Exportable a Excel.',
      action: 'Exportar Excel',
      hasStudentSelector: false,
      color: 'text-lavender',
    },
    {
      icon: Heart,
      title: 'Reporte para Apoderados',
      description: 'Resumen simplificado en lenguaje amigable del avance del estudiante, diseñado para comunicar a las familias.',
      action: 'Generar y Enviar',
      hasStudentSelector: true,
      color: 'text-success',
    },
    {
      icon: GitCompare,
      title: 'Comparativo entre Aulas',
      description: 'Comparación lado a lado de distribuciones Holland, tasas de completado e intereses vocacionales entre todas las aulas.',
      action: 'Generar PDF',
      hasStudentSelector: false,
      isComparative: true,
      color: 'text-primary',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-display font-bold">Informes</h1>
      <p className="text-sm text-muted-foreground">Genera reportes para acompañar y comunicar el proceso vocacional.</p>

      <div className="grid grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${report.color}`}>
                  <report.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-display">{report.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {/* Classroom selector on each report */}
              {!('isComparative' in report && report.isComparative) && (
                <Select defaultValue={currentClassroom.id}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar aula..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allClassrooms.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {report.hasStudentSelector && (
                <Select>
                  <SelectTrigger><SelectValue placeholder="Seleccionar estudiante..." /></SelectTrigger>
                  <SelectContent>
                    {currentStudents.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.nombre} {s.apellido}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="h-24 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center text-xs text-muted-foreground">
                Vista previa del reporte
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2 w-full"><Download className="w-4 h-4" />{report.action}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InformesView;
