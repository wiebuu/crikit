import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Info, Users, ListChecks, Trophy } from 'lucide-react';
import { Logo, ThemeToggle } from '../components/ui.jsx';

const points = [
  { icon: Users, text: 'Squad, staff and availability in one place' },
  { icon: Trophy, text: 'Every competition your team enters' },
  { icon: ListChecks, text: 'Pick the playing XI in a few taps' },
];

export default function Login() {
  const [role, setRole] = useState('Manager');
  const navigate = useNavigate();
  // Frontend-only prototype: the backend will issue a JWT here.
  const submit = (e) => { e.preventDefault(); navigate('/app'); };

  return (
    <div className="auth">
      <div className="auth-side">
        <Link to="/" className="brand"><Logo /><div><div className="brand-name">Crickit</div><div className="brand-sub">Cricket Team Management</div></div></Link>
        <div>
          <blockquote>Everything your team needs, managed from one screen.</blockquote>
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
          <h1 style={{ fontSize: 26, letterSpacing: '-0.035em' }}>Sign in to your team</h1>
          <p className="muted" style={{ marginTop: 6 }}>Welcome back. Choose your role and enter your details.</p>
          <div style={{ display: 'grid', gap: 16, marginTop: 28 }}>
            <div className="field">
              <span className="field-label">Role</span>
              <div className="role-pick">
                {['Manager', 'Coach', 'Player'].map((r) => <button type="button" key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>{r}</button>)}
              </div>
            </div>
            <label className="field"><span className="field-label">Email</span><input className="input" type="email" placeholder="you@club.com" autoComplete="email" /></label>
            <label className="field">
              <span className="row between"><span className="field-label">Password</span><a className="subtle" style={{ fontSize: 12.5 }} href="#/login">Forgot password?</a></span>
              <input className="input" type="password" placeholder="••••••••" autoComplete="current-password" />
            </label>
          </div>
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 24 }}>Continue as {role} <ArrowRight size={16} /></button>
          <div className="or">New here?</div>
          <Link to="/setup" className="btn btn-lg" style={{ width: '100%' }}>Create a new team</Link>
          <p className="row subtle" style={{ fontSize: 12.5, gap: 8, alignItems: 'flex-start', marginTop: 20 }}>
            <Info size={14} style={{ flex: 'none', marginTop: 2 }} /> Demo mode: authentication isn’t connected yet, so any details open the demo team.
          </p>
        </form>
      </div>
    </div>
  );
}
