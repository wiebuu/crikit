import { useState, useEffect, useRef, Suspense } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCog, Trophy, CalendarDays, Radio, BarChart3, Settings2,
  Search, Bell, Menu, LogOut, ChevronRight, Plus, UserPlus, CalendarPlus, Flag,
} from 'lucide-react';
import { Logo, TeamLogo, ThemeToggle, PageLoader, Avatar } from './ui.jsx';
import { useStore } from '../store.jsx';

const groups = [
  { label: 'Team', items: [
    { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/app/squad', label: 'Squad', icon: Users },
    { to: '/app/staff', label: 'Staff', icon: UserCog },
  ] },
  { label: 'Competition', items: [
    { to: '/app/competitions', label: 'Competitions', icon: Trophy },
    { to: '/app/matches', label: 'Matches', icon: CalendarDays },
    { to: '/app/live', label: 'Live Match', icon: Radio, live: true },
  ] },
  { label: 'Insights', items: [
    { to: '/app/stats', label: 'Statistics', icon: BarChart3 },
  ] },
  { label: 'Club', items: [
    { to: '/app/team', label: 'Team Profile', icon: Settings2 },
  ] },
];
const titles = Object.fromEntries(groups.flatMap((g) => g.items).map((i) => [i.to, i.label]));

const quick = [
  { to: '/app/squad?new=1', label: 'Add player', icon: UserPlus },
  { to: '/app/matches?new=1', label: 'Schedule match', icon: CalendarPlus },
  { to: '/app/competitions?new=1', label: 'Enter competition', icon: Flag },
  { to: '/app/staff?new=1', label: 'Add staff member', icon: UserCog },
];

function QuickAdd() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const h = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className="menu-wrap" ref={ref}>
      <button className="btn btn-primary" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu">
        <Plus size={15} /> <span className="hide-sm">New</span>
      </button>
      {open && (
        <div className="menu" role="menu">
          {quick.map(({ to, label, icon: Icon }) => (
            <button key={to} role="menuitem" className="menu-item" onClick={() => { setOpen(false); navigate(to); }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { state } = useStore();
  const { team } = state;
  const manager = state.staff.find((s) => s.role === 'Team Manager');
  const hasLive = state.matches.some((m) => m.status === 'Live');
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="shell">
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <Link to="/" className="brand app-brand"><Logo size={16} /><span className="brand-name">Crickit</span></Link>

        <Link to="/app/team" className="team-card-side">
          <TeamLogo size={42} />
          <div style={{ minWidth: 0 }}>
            <div className="tc-name">{team.name}</div>
            <div className="tc-sub">Season {state.season} · {state.players.length} players</div>
          </div>
        </Link>

        <nav className="side-nav">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="nav-label">{g.label}</div>
              {g.items.map(({ to, label, icon: Icon, end, live }) => (
                <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  <Icon size={16} strokeWidth={1.9} /> {label}
                  {live && hasLive && <span className="badge badge-accent"><span className="live-dot" />LIVE</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="side-foot">
          <Avatar name={manager?.name ?? 'Manager'} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="who">{manager?.name ?? 'Team Manager'}</div>
            <div className="role">Team Manager</div>
          </div>
          <Link to="/login" className="icon-btn ghost" aria-label="Sign out" title="Sign out"><LogOut size={15} /></Link>
        </div>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={17} /></button>
          <div className="crumbs">
            <span>{team.name}</span>
            <ChevronRight size={14} />
            <b>{titles[pathname] ?? 'Overview'}</b>
          </div>
          <div className="spacer" />
          <label className="search">
            <Search size={15} />
            <input placeholder="Search players, matches…" />
            <kbd>⌘K</kbd>
          </label>
          <ThemeToggle />
          <button className="icon-btn notif-btn" aria-label="Notifications" style={{ position: 'relative' }}>
            <Bell size={16} />
            <span className="notif-dot" />
          </button>
          <QuickAdd />
        </header>
        <main className="page">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
