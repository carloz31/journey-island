import { useNavigate } from 'react-router-dom';
import LandingScreen from '@/pages/LandingScreen';

const Index = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'student' | 'counselor' | 'parent') => {
    if (role === 'student') {
      navigate('/adventure');
    } else if (role === 'counselor') {
      navigate('/counselor');
    }
  };

  return <LandingScreen onSelectRole={handleSelectRole} />;
};

export default Index;
