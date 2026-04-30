import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, TrendingUp, GraduationCap, Wallet } from 'lucide-react';

const categories = [
  {
    icon: Building2,
    title: 'Instituciones educativas',
    description: 'Universidades, institutos técnicos y centros de formación cercanos a ti.',
  },
  {
    icon: TrendingUp,
    title: 'Demanda por carrera',
    description: 'Datos actualizados de empleabilidad, salarios y proyección laboral.',
  },
  {
    icon: GraduationCap,
    title: 'Carreras por área',
    description: 'Explora familias de carreras agrupadas por áreas de interés.',
  },
  {
    icon: Wallet,
    title: 'Opciones de financiamiento',
    description: 'Becas, créditos educativos y modalidades de pago disponibles.',
  },
];

const ParentExplorePage = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold mb-1">Explorar Carreras</h1>
      <p className="text-sm text-muted-foreground">
        Un catálogo para que conozcas las opciones disponibles y acompañes mejor a tu hijo/a en su decisión.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map(c => (
        <Card key={c.title} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-base mb-1">{c.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{c.description}</p>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <p className="text-xs text-muted-foreground text-center mt-8">
      Próximamente: contenido completo del catálogo.
    </p>
  </div>
);

export default ParentExplorePage;
