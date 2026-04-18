import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClassroomProvider } from '@/contexts/ClassroomContext';
import CounselorLayout, { type CounselorView } from '@/components/counselor/CounselorLayout';
import DashboardView from '@/components/counselor/DashboardView';
import MisAulasView from '@/components/counselor/MisAulasView';
import EstudiantesView from '@/components/counselor/EstudiantesView';
import ActividadesView from '@/components/counselor/ActividadesView';
import MensajeriaView from '@/components/counselor/MensajeriaView';
import InformesView from '@/components/counselor/InformesView';
import ConfiguracionView from '@/components/counselor/ConfiguracionView';
import StudentDetailPanel from '@/components/counselor/StudentDetailPanel';
import { allStudents } from '@/data/counselorMockData';

type LocationState = {
  view?: CounselorView;
};

const CounselorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const locationState = location.state as LocationState | null;
  const [view, setView] = useState<CounselorView>(locationState?.view ?? 'dashboard');
  const activeView: CounselorView = studentId ? 'estudiantes' : view;

  useEffect(() => {
    if (locationState?.view) {
      setView(locationState.view);
    }
  }, [locationState?.view]);

  const handleViewChange = (nextView: CounselorView) => {
    setView(nextView);
    navigate('/counselor', { state: { view: nextView } });
  };

  const renderView = () => {
    if (studentId) {
      const student = allStudents.find(s => s.id === studentId) ?? null;
      return (
        <StudentDetailPanel
          student={student}
          onBack={() => navigate('/counselor', { state: { view: 'estudiantes' } })}
        />
      );
    }

    switch (view) {
      case 'dashboard': return <DashboardView />;
      case 'aulas': return <MisAulasView onViewChange={handleViewChange} />;
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
      <CounselorLayout activeView={activeView} onViewChange={handleViewChange}>
        {renderView()}
      </CounselorLayout>
    </ClassroomProvider>
  );
};

export default CounselorDashboard;
