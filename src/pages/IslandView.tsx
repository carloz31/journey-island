import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { startIsland, IslandNode } from '@/data/islandData';
import IslandActivitySidePanel from '@/components/IslandActivitySidePanel';
import HelpTutorialOverlay from '@/components/HelpTutorialOverlay';
import TopBar from '@/components/TopBar';
import IslandLoadingScreen from '@/components/IslandLoadingScreen';
import MessagesPanel from '@/components/MessagesPanel';
import CommunityPanel from '@/components/CommunityPanel';
import IslandMapCanvas from '@/components/IslandMapCanvas';
import IslandTopOverlay from '@/components/IslandTopOverlay';

/* ---------- Main Island View ---------- */
const IslandView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<IslandNode | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

  const island = startIsland;

  const handleLogout = () => navigate('/');

  const progress = useMemo(() => {
    const completed = island.nodes.filter(n => n.status === 'completed').length;
    return Math.round((completed / island.nodes.length) * 100);
  }, [island]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence>
        {loading && <IslandLoadingScreen name={island.name} onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* System TopBar — same as Adventure */}
      <TopBar
        onLogout={handleLogout}
        onMessagesClick={() => { setMessagesOpen(o => !o); setCommunityOpen(false); }}
      />

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, hsl(199 60% 85%) 0%, hsl(199 50% 92%) 50%, hsl(199 55% 82%) 100%)' }}
      >
        {!loading && (
          <>
            <IslandTopOverlay
              name={island.name}
              subtitle={island.subtitle}
              progress={progress}
              onBackClick={() => navigate('/adventure')}
              onHelpClick={() => setHelpOpen(true)}
            />
            <IslandMapCanvas
              island={island}
              selectedNodeId={selectedNode?.id}
              onSelectNode={setSelectedNode}
            />
          </>
        )}
      </div>

      {/* Activity side panel */}
      <IslandActivitySidePanel
        node={selectedNode}
        open={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Help tutorial with Pepe */}
      <HelpTutorialOverlay
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        steps={island.pepeIntro}
      />

      <MessagesPanel 
        open={messagesOpen} 
        onClose={() => setMessagesOpen(false)} 
      />
      
      <CommunityPanel 
        open={communityOpen} 
        onClose={() => setCommunityOpen(false)} 
      />
    </div>
  );
};

export default IslandView;
