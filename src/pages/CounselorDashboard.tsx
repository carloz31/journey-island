import { useState } from 'react';
import { ClassroomProvider } from '@/contexts/ClassroomContext';
import CounselorLayout, { type CounselorView } from '@/components/counselor/CounselorLayout';
import DashboardView from '@/components/counselor/DashboardView';
import MisAulasView from '@/components/counselor/MisAulasView';
import EstudiantesView from '@/components/counselor/EstudiantesView';
import ActividadesView from '@/components/counselor/ActividadesView';
import MensajeriaView from '@/components/counselor/MensajeriaView';
import InformesView from '@/components/counselor/InformesView';
import ConfiguracionView from '@/components/counselor/ConfiguracionView';

const CounselorDashboard = () => {
  const [view, setView] = useState<CounselorView>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <DashboardView />;
      case 'aulas': return <MisAulasView onViewChange={setView} />;
      case 'estudiantes': return <EstudiantesView />;
      case 'actividades': return <ActividadesView />;
      case 'mensajeria': return <MensajeriaView />;
      case 'informes': return <InformesView />;
      case 'configuracion': return <ConfiguracionView />;
      default: return <DashboardView />;
    }
  };

  return (
    <ClassroomProvider>
      <CounselorLayout activeView={view} onViewChange={setView}>
        {renderView()}
      </CounselorLayout>
    </ClassroomProvider>
  );
};

export default CounselorDashboard;
