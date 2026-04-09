import { useState } from 'react';
import MapScene from '@/components/MapScene';
import RegionMarkers from '@/components/RegionMarkers';
import RegionActivitiesPanel from '@/components/RegionActivitiesPanel';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import ProgressOverlay from '@/components/ProgressOverlay';
import QuickAccessOverlay from '@/components/QuickAccessOverlay';
import { regions, studentData, Region } from '@/data/mockData';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <MapScene />
      <RegionMarkers regions={regions} onRegionClick={setSelectedRegion} />
      <WelcomeOverlay student={studentData} />
      <ProgressOverlay student={studentData} />
      <QuickAccessOverlay />
      <RegionActivitiesPanel
        region={selectedRegion}
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
      />
    </div>
  );
};

export default Index;
