import { useState } from 'react';
import LandingScreen from '@/pages/LandingScreen';
import TopBar from '@/components/TopBar';
import MapScene from '@/components/MapScene';
import SidePanel from '@/components/SidePanel';
import MapControls from '@/components/MapControls';
import RegionActivitiesPanel from '@/components/RegionActivitiesPanel';
import MessagesPanel from '@/components/MessagesPanel';
import CommunityPanel from '@/components/CommunityPanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';
import BadgesModal from '@/components/BadgesModal';
import { regions, studentData, Region } from '@/data/mockData';

const Index = () => {
  const [role, setRole] = useState<'student' | 'counselor' | 'parent' | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);

  if (!role) {
    return <LandingScreen onSelectRole={setRole} />;
  }

  const handleLogout = () => setRole(null);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TopBar
        onLogout={handleLogout}
        onMessagesClick={() => { setMessagesOpen(o => !o); setCommunityOpen(false); }}
      />

      <div className="relative flex-1 overflow-hidden">
        <MapScene onRegionClick={setSelectedRegion} />

        <SidePanel student={studentData} onBadgesClick={() => setBadgesOpen(true)} />

        <MapControls
          onLeaderboardClick={() => { setCommunityOpen(o => !o); setMessagesOpen(false); }}
          onHelpClick={() => { setTutorialOpen(true); setMessagesOpen(false); setCommunityOpen(false); }}
        />

        {/* Floating panels */}
        <MessagesPanel open={messagesOpen} onClose={() => setMessagesOpen(false)} />
        <CommunityPanel open={communityOpen} onClose={() => setCommunityOpen(false)} />
      </div>

      {/* Modals / overlays */}
      <HelpTutorialOverlay open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
      <BadgesModal open={badgesOpen} onClose={() => setBadgesOpen(false)} />
      <RegionActivitiesPanel
        region={selectedRegion}
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
      />
    </div>
  );
};

export default Index;
