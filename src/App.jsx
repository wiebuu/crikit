import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Teams from './pages/Teams.jsx';
import Players from './pages/Players.jsx';
import Fixtures from './pages/Fixtures.jsx';
import LiveScoring from './pages/LiveScoring.jsx';
import Standings from './pages/Standings.jsx';
import Reports from './pages/Reports.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="players" element={<Players />} />
        <Route path="fixtures" element={<Fixtures />} />
        <Route path="live" element={<LiveScoring />} />
        <Route path="standings" element={<Standings />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
