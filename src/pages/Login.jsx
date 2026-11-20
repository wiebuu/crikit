import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { Logo } from '../components/ui.jsx';

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
        <Link to="/" className="brand" style={{ padding: 0 }}>
          <Logo />
          <div><div className="brand-name">Crickit</div><div className="brand-sub">Team Management System</div></div>
        </Link>
        <blockquote>
          “Fixtures, scores and standings used to live in five different spreadsheets. Now the whole league runs from one screen.”
          <div style={{ fontSize: 14, color: '#9fc4b5', fontWeight: 500, marginTop: 16 }}>— Tournament organiser, pilot season</div>
        </blockquote>
        <div style={{ fontSize: 12.5, color: '#6f8a7e' }}>© 2026 Crickit · SRHU School of Science & Technology</div>
      </div>

      <div className="auth-form">
        <form onSubmit={submit}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Welcome back</h1>
          <p className="muted" style={{ marginTop: 6 }}>Sign in to manage your teams and tournaments.</p>

          <div className="field">
            <label>Sign in as</label>
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
          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
            Sign in as {role} <ArrowRight size={16} />
          </button>
          <p className="row subtle" style={{ fontSize: 12.5, marginTop: 16, gap: 6, justifyContent: 'center' }}>
            <Lock size={13} /> Demo mode — any details will open the dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}
