import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Adventure from "./pages/Adventure.tsx";
import IslandView from "./pages/IslandView.tsx";
import ActivityPlayer from "./pages/ActivityPlayer.tsx";
import Messages from "./pages/Messages.tsx";
import VocationalProfile from "./pages/VocationalProfile.tsx";
import CounselorDashboard from "./pages/CounselorDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/adventure" element={<Adventure />} />
          <Route path="/adventure/island/:regionId" element={<IslandView />} />
          <Route path="/adventure/island/:regionId/actividad/:activityId" element={<ActivityPlayer />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<VocationalProfile />} />
          <Route path="/counselor" element={<CounselorDashboard />} />
          <Route path="/counselor/student/:studentId" element={<CounselorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
