import { Project } from '$chocolate-frontend/pages/Project/Project';
import { Projects } from '$chocolate-frontend/pages/Projects/Projects';
import { Route, Routes } from 'react-router-dom';
import Verify from '../pages/Verify/Verify';
// Import pages and render them here
export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Projects />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  );
}
