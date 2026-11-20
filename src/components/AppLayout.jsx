import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Shield, Users, CalendarDays, Radio, Trophy, FileText,
  Search, Bell, Menu, Settings, LogOut,
} from 'lucide-react';
import { Logo } from './ui.jsx';
import { tournament } from '../data/mock.js';

const nav = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/live', label: 'Live Scoring', icon: Radio, badge: 'LIVE' },
  { to: '/app/fixtures', label: 'Fixtures', icon: CalendarDays },
  { to: '/app/standings', label: 'Leaderboard', icon: Trophy },
];
const manage = [
  { to: '/app/teams', label: 'Teams', icon: Shield },
  { to: '/app/players', label: 'Players', icon: Users },
  { to: '/app/reports', label: 'Reports', icon: FileText },
];

function Item({ to, label, icon: Icon, badge, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
      <Icon size={17} /> {label}
      {badge && <span className="badge">{badge}</span>}
    </NavLink>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="shell">
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <Link to="/" className="brand">
          <Logo />
          <div>
            <div className="brand-name">Crickit</div>
            <div className="brand-sub">Team Management System</div>
          </div>
        </Link>
        <div className="nav-label">Tournament</div>
        {nav.map((n) => <Item key={n.to} {...n} />)}
        <div className="nav-label">Manage</div>
        {manage.map((n) => <Item key={n.to} {...n} />)}
        <div className="nav-label">System</div>
        <a className="nav-link" href="#/app" onClick={(e) => e.preventDefault()}><Settings size={17} /> Settings</a>
        <Link className="nav-link" to="/login"><LogOut size={17} /> Sign out</Link>
        <div className="side-foot">
          <span className="avatar">SS</span>
          <div>
            <div className="who">Sagar Saini</div>
            <div className="role">Tournament Admin</div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
          <label className="search">
            <Search size={16} />
            <input placeholder="Search teams, players, matches…" />
            <kbd>⌘K</kbd>
          </label>
          <div className="spacer" />
          <div className="tourney-chip"><Trophy size={15} color="var(--brand)" /> {tournament.name}</div>
          <button className="icon-btn" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={17} />
            <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--ball)' }} />
          </button>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
