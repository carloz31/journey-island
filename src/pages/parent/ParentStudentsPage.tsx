import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

const ParentStudentsPage = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold mb-1">Perfil de Hijos/as</h1>
      <p className="text-sm text-muted-foreground">
        Pronto podrás revisar el perfil vocacional de cada hijo/a.
      </p>
    </div>
    <Card className="p-12 flex flex-col items-center text-center gap-3">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Users className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-lg font-display font-bold">Próximamente</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Aquí encontrarás un resumen del perfil vocacional, intereses y avances de cada uno de tus
        hijos/as inscritos en la plataforma.
      </p>
    </Card>
  </div>
);

export default ParentStudentsPage;
