import { Routes, Route, Navigate } from 'react-router-dom';
import { ParentProvider } from '@/contexts/ParentContext';
import ParentLayout from '@/components/parent/ParentLayout';
import ParentActivitiesPage from './parent/ParentActivitiesPage';
import ParentStudentsPage from './parent/ParentStudentsPage';
import ParentExplorePage from './parent/ParentExplorePage';
import ParentActivityPlayer from './parent/ParentActivityPlayer';

const ParentApp = () => (
  <ParentProvider>
    <Routes>
      {/* Activity player has its own dedicated layout (no sidebar/topbar) */}
      <Route path="activities/:activityId" element={<ParentActivityPlayer />} />

      {/* Standard layout for the rest */}
      <Route
        path="*"
        element={
          <ParentLayout>
            <Routes>
              <Route index element={<Navigate to="activities" replace />} />
              <Route path="activities" element={<ParentActivitiesPage />} />
              <Route path="students" element={<ParentStudentsPage />} />
              <Route path="explore" element={<ParentExplorePage />} />
              <Route path="*" element={<Navigate to="activities" replace />} />
            </Routes>
          </ParentLayout>
        }
      />
    </Routes>
  </ParentProvider>
);

export default ParentApp;
