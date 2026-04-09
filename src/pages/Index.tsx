import { useState } from 'react';
import MapScene from '@/components/MapScene';
import RegionMarkers from '@/components/RegionMarkers';
import RegionActivitiesPanel from '@/components/RegionActivitiesPanel';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import ProgressOverlay from '@/components/ProgressOverlay';
import QuickAccessOverlay from '@/components/QuickAccessOverlay';
import TopActionIcons from '@/components/TopActionIcons';
import MessagesPanel from '@/components/MessagesPanel';
import CommunityPanel from '@/components/CommunityPanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';
import { regions, studentData, messagesData, Region } from '@/data/mockData';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  const unreadCount = messagesData.filter(m => m.unread).length;

  const handleMessagesClick = () => {
    setMessagesOpen(o => !o);
    setCommunityOpen(false);
  };
  const handleCommunityClick = () => {
    setCommunityOpen(o => !o);
    setMessagesOpen(false);
  };
  const handleHelpClick = () => {
    setTutorialOpen(true);
    setMessagesOpen(false);
    setCommunityOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <MapScene />
      <RegionMarkers regions={regions} onRegionClick={setSelectedRegion} />
      <WelcomeOverlay student={studentData} />
      <ProgressOverlay student={studentData} />
      <QuickAccessOverlay />
      <TopActionIcons
        onMessagesClick={handleMessagesClick}
        onCommunityClick={handleCommunityClick}
        onHelpClick={handleHelpClick}
        unreadCount={unreadCount}
      />
      <MessagesPanel open={messagesOpen} onClose={() => setMessagesOpen(false)} />
      <CommunityPanel open={communityOpen} onClose={() => setCommunityOpen(false)} />
      <HelpTutorialOverlay open={tutorialOpen} onClose={() => setTutorialOpen(false)} />
      <RegionActivitiesPanel
        region={selectedRegion}
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
      />
    </div>
  );
};

export default Index;
