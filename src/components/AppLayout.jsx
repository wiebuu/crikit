import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Shield, Users, CalendarDays, Radio, Trophy, FileText,
  Search, Bell, Menu, Settings, LogOut, ChevronsUpDown, ChevronRight, HelpCircle,
} from 'lucide-react';
import { Logo, ThemeToggle } from './ui.jsx';
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
const titles = Object.fromEntries([...nav, ...manage].map((n) => [n.to, n.label]));

function Item({ to, label, icon: Icon, badge, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
      <Icon size={16} strokeWidth={1.9} /> {label}
      {badge && <span className="badge badge-accent">{badge}</span>}
    </NavLink>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="shell">
      <aside className={`sidebar${open ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <Link to="/" className="brand">
          <Logo />
          <div>
            <div className="brand-name">Crickit</div>
            <div className="brand-sub">Team Management</div>
          </div>
        </Link>

        <button className="ws-switch" type="button">
          <Trophy size={16} color="var(--brand-text)" />
          <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
            <div className="t">HPL 2026</div>
            <div className="s">{tournament.format.split(' · ')[0]} · League stage</div>
          </div>
          <ChevronsUpDown size={14} color="var(--text-3)" />
        </button>

        <div className="nav-label">Tournament</div>
        {nav.map((n) => <Item key={n.to} {...n} />)}
        <div className="nav-label">Manage</div>
        {manage.map((n) => <Item key={n.to} {...n} />)}
        <div className="nav-label">Account</div>
        <a className="nav-link" href="#/app" onClick={(e) => e.preventDefault()}><Settings size={16} strokeWidth={1.9} /> Settings</a>
        <a className="nav-link" href="#/app" onClick={(e) => e.preventDefault()}><HelpCircle size={16} strokeWidth={1.9} /> Help & docs</a>

        <div className="side-foot">
          <span className="avatar">SS</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="who">Sagar Saini</div>
            <div className="role">Tournament Admin</div>
          </div>
          <Link to="/login" className="icon-btn ghost" aria-label="Sign out" title="Sign out"><LogOut size={15} /></Link>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={17} /></button>
          <div className="crumbs">
            <span>{tournament.name}</span>
            <ChevronRight size={14} />
            <b>{titles[pathname] ?? 'Dashboard'}</b>
          </div>
          <div className="spacer" />
          <label className="search">
            <Search size={15} />
            <input placeholder="Search teams, players, matches…" />
            <kbd>⌘K</kbd>
          </label>
          <ThemeToggle />
          <button className="icon-btn" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={16} />
            <span style={{ position: 'absolute', top: 8, right: 9, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }} />
          </button>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
