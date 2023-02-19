import { Route, Routes } from 'react-router-dom';
import Verify from '../pages/Verify/Verify';
// Import pages and render them here
export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}
