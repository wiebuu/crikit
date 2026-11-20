import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Info, Radio, Trophy, CalendarDays } from 'lucide-react';
import { Logo, ThemeToggle } from '../components/ui.jsx';

const points = [
  { icon: CalendarDays, text: 'Clash-free fixtures generated in seconds' },
  { icon: Radio, text: 'Ball-by-ball scoring streamed live to every screen' },
  { icon: Trophy, text: 'Points and Net Run Rate updated after every result' },
];

export default function Login() {
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  // Frontend-only prototype: no real auth yet. The backend will issue a JWT here.
  const submit = (e) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="auth">
      <div className="auth-side">
        <Link to="/" className="brand">
          <Logo />
          <div><div className="brand-name">Crickit</div><div className="brand-sub">Team Management System</div></div>
        </Link>
        <div>
          <blockquote>Run your whole tournament — teams, fixtures, scores and standings — from one screen.</blockquote>
          <div style={{ display: 'grid', gap: 14, marginTop: 32 }}>
            {points.map(({ icon: Icon, text }) => (
              <div key={text} className="row" style={{ color: '#b9bbcc', fontSize: 14.5 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(84,112,230,.18)', color: '#a9b8ff' }}><Icon size={15} /></span>
                {text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: '#6f7186' }}>© 2026 Crickit · SRHU School of Science & Technology</div>
      </div>

      <div className="auth-form">
        <div className="corner"><ThemeToggle /></div>
        <form onSubmit={submit}>
          <h1 style={{ fontSize: 26, letterSpacing: '-0.035em' }}>Sign in to Crickit</h1>
          <p className="muted" style={{ marginTop: 6 }}>Welcome back. Choose your role and enter your details.</p>

          <div className="field" style={{ marginTop: 28 }}>
            <label>Role</label>
            <div className="role-pick">
              {['Admin', 'Coach', 'Player'].map((r) => (
                <button type="button" key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>{r}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="you@club.com" autoComplete="email" />
          </div>
          <div className="field">
            <div className="row between"><label htmlFor="pw">Password</label><a className="subtle" style={{ fontSize: 12.5 }} href="#/login">Forgot password?</a></div>
            <input id="pw" className="input" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>
            Continue as {role} <ArrowRight size={16} />
          </button>
          <div className="or">Prototype</div>
          <p className="row subtle" style={{ fontSize: 12.5, gap: 8, alignItems: 'flex-start' }}>
            <Info size={14} style={{ flex: 'none', marginTop: 2 }} /> Demo mode: authentication isn’t connected yet, so any details open the dashboard.
          </p>
          <p className="subtle" style={{ fontSize: 13, marginTop: 28, textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-2)' }}>← Back to website</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
