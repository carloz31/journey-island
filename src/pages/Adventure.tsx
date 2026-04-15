import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import MapScene from '@/components/MapScene';
import SidePanel from '@/components/SidePanel';
import MapControls from '@/components/MapControls';
import MessagesPanel from '@/components/MessagesPanel';
import CommunityPanel from '@/components/CommunityPanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';
import BadgesModal from '@/components/BadgesModal';
import { studentData, Region } from '@/data/mockData';

const Adventure = () => {
  const navigate = useNavigate();
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);

  const handleLogout = () => navigate('/');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TopBar
        onLogout={handleLogout}
        onMessagesClick={() => { setMessagesOpen(o => !o); setCommunityOpen(false); }}
      />

      <div className="relative flex-1 overflow-hidden">
        <MapScene onRegionClick={(region: Region) => navigate(`/adventure/island/${region.id}`)} />
        <SidePanel student={studentData} onBadgesClick={() => setBadgesOpen(true)} />
        <MapControls
          onLeaderboardClick={() => { setCommunityOpen(o => !o); setMessagesOpen(false); }}
          onHelpClick={() => { setTutorialOpen(true); setMessagesOpen(false); setCommunityOpen(false); }}
        />
        <MessagesPanel open={messagesOpen} onClose={() => setMessagesOpen(false)} />
        <CommunityPanel open={communityOpen} onClose={() => setCommunityOpen(false)} />
      </div>

      <HelpTutorialOverlay open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
      <BadgesModal open={badgesOpen} onClose={() => setBadgesOpen(false)} />
    </div>
  );
};

export default Adventure;
