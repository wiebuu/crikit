import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import { PageLoader, Toasts } from './components/ui.jsx';

// Pages are code-split; PageLoader shows skeletons while each one loads.
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Setup = lazy(() => import('./pages/Setup.jsx'));
const Overview = lazy(() => import('./pages/Overview.jsx'));
const Squad = lazy(() => import('./pages/Squad.jsx'));
const Staff = lazy(() => import('./pages/Staff.jsx'));
const Competitions = lazy(() => import('./pages/Competitions.jsx'));
const Matches = lazy(() => import('./pages/Matches.jsx'));
const LiveMatch = lazy(() => import('./pages/LiveMatch.jsx'));
const Stats = lazy(() => import('./pages/Stats.jsx'));
const TeamProfile = lazy(() => import('./pages/TeamProfile.jsx'));

export default function App() {
  return (
    <>
      <Suspense fallback={<div style={{ padding: 32 }}><PageLoader /></div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="squad" element={<Squad />} />
            <Route path="staff" element={<Staff />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="matches" element={<Matches />} />
            <Route path="live" element={<LiveMatch />} />
            <Route path="stats" element={<Stats />} />
            <Route path="team" element={<TeamProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toasts />
    </>
  );
}
