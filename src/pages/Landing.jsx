import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarX2, FileWarning, EyeOff, Users, CalendarDays, Radio, Trophy, FileText, ShieldCheck,
  Check, Monitor, Server, Database, Zap, Sparkles, Play,
} from 'lucide-react';
import { Logo, TeamMark, Form, fmtNrr } from '../components/ui.jsx';
import { teams } from '../data/mock.js';

const problems = [
  { icon: CalendarX2, title: 'Scattered scheduling', text: 'Paper and spreadsheets cause fixture conflicts and last-minute changes.' },
  { icon: FileWarning, title: 'Lost or duplicate records', text: 'Manual scorekeeping leads to missing match records and inconsistent stats.' },
  { icon: EyeOff, title: 'Delayed visibility', text: 'Standings aren’t updated in real time, so teams and fans lack timely insight.' },
];

const features = [
  { icon: Users, title: 'Team & player registration', text: 'Structured profiles for squads, captains, coaches and players — with roles, fitness and history.' },
  { icon: CalendarDays, title: 'Smart fixture engine', text: 'Generates clash-free round-robin schedules and resolves venue and rest-day conflicts automatically.' },
  { icon: Radio, title: 'Live ball-by-ball scoring', text: 'Fast scoring console that streams every delivery to connected dashboards in real time.' },
  { icon: Trophy, title: 'Instant leaderboards', text: 'Points and Net Run Rate recalculated the moment a result is committed. No manual maths.' },
  { icon: FileText, title: 'Reports & summaries', text: 'Downloadable PDFs and CSVs, plus shareable match summaries for every stakeholder.' },
  { icon: ShieldCheck, title: 'Secure by design', text: 'JWT authentication, role-based access, input validation and an immutable audit trail for score edits.' },
];

const roles = [
  { title: 'Admin', text: 'Runs the tournament end to end.', items: ['Register teams & venues', 'Generate and edit fixtures', 'Verify scores & export reports'] },
  { title: 'Coach', text: 'Manages a squad through the season.', items: ['Maintain player profiles', 'Pick playing XI per match', 'Track team form & stats'] },
  { title: 'Player & fans', text: 'Follow every ball as it happens.', items: ['Live scores & commentary', 'Personal stats & records', 'Leaderboards & fixtures'] },
];

const arch = [
  { icon: Monitor, layer: 'Client', title: 'React', text: 'Responsive, mobile-first dashboards, fixture calendar and scoring UI.' },
  { icon: Server, layer: 'Application', title: 'Express + Node.js', text: 'REST API with role-based middleware and JWT auth.' },
  { icon: Database, layer: 'Data', title: 'MongoDB', text: 'Teams, players, fixtures and ball-by-ball events.' },
  { icon: Zap, layer: 'Realtime', title: 'Socket.IO', text: 'Pushes live scores and leaderboard updates instantly.' },
];

const timeline = [
  { m: 'Month 01', t: 'Discovery & Architecture' },
  { m: 'Month 02', t: 'Core Data & Scheduling Engine' },
  { m: 'Month 03', t: 'Scoring & Live Pipeline' },
  { m: 'Month 04', t: 'Dashboards & Reporting' },
  { m: 'Month 05', t: 'Pilot & Tournament Launch' },
];

function HeroMock() {
  const rows = [...teams].sort((a, b) => b.pts - a.pts || b.nrr - a.nrr).slice(0, 4);
  return (
    <div className="hero-shot">
      <div className="mock">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="mock-body">
          <div className="scoreboard" style={{ padding: '16px 18px' }}>
            <div className="row between">
              <div className="row"><TeamMark id="GT" /><div>
                <div style={{ fontSize: 11.5, color: '#9fc4b5' }}>Ganga Titans · chasing 173</div>
                <div className="mono" style={{ fontSize: 26, fontWeight: 800 }}>127/4 <span className="sb-overs" style={{ fontSize: 12 }}>(14.4)</span></div>
              </div></div>
              <span className="badge badge-red" style={{ background: 'rgba(230,57,70,.18)', color: '#ff8a93' }}><span className="live-dot" /> LIVE</span>
            </div>
            <div className="balls" style={{ marginTop: 12 }}>
              {['1', '4', 'W', '0'].map((b, i) => <span key={i} className={`ball b${b}`} style={{ width: 28, height: 28, fontSize: 12 }}>{b}</span>)}
            </div>
          </div>
          <div className="card" style={{ boxShadow: 'none' }}>
            <table className="table" style={{ fontSize: 12.5 }}>
              <thead><tr><th>Team</th><th className="num">W</th><th className="num">NRR</th><th className="num">Pts</th></tr></thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id}>
                    <td style={{ padding: '9px 14px' }}><div className="row" style={{ gap: 8 }}><TeamMark id={t.id} size="sm" /><b>{t.name}</b></div></td>
                    <td className="num" style={{ padding: '9px 14px' }}>{t.w}</td>
                    <td className="num" style={{ padding: '9px 14px', color: 'var(--brand)' }}>{fmtNrr(t.nrr)}</td>
                    <td className="num" style={{ padding: '9px 14px' }}><b>{t.pts}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="float-card">
        <span className="stat-icon" style={{ background: 'var(--brand-50)', color: 'var(--brand)' }}><Check size={17} /></span>
        <div><b>Schedule generated</b><div className="subtle" style={{ fontSize: 12 }}>56 matches · 0 clashes</div></div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="lp">
      <header className="lp-nav">
        <Link to="/" className="brand">
          <Logo />
          <span className="brand-name">Crickit</span>
        </Link>
        <nav>
          <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
          <a href="#roles" onClick={(e) => { e.preventDefault(); document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' }); }}>Who it’s for</a>
          <a href="#tech" onClick={(e) => { e.preventDefault(); document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' }); }}>Technology</a>
          <a href="#roadmap" onClick={(e) => { e.preventDefault(); document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' }); }}>Roadmap</a>
        </nav>
        <div className="spacer" />
        <Link to="/login" className="btn btn-ghost">Sign in</Link>
        <Link to="/app" className="btn btn-primary">Open dashboard</Link>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div style={{ paddingBottom: 72 }}>
            <span className="eyebrow"><Sparkles size={13} /> Cricket analytics & sports management</span>
            <h1>From chaos to <em>clear play.</em></h1>
            <p className="lead">
              One secure platform for team registration, fixture scheduling, live scoring and real-time
              leaderboards — built to save time, remove errors and make tournaments transparent for admins,
              coaches and fans.
            </p>
            <div className="hero-cta">
              <Link to="/app" className="btn btn-primary btn-lg">Explore the dashboard <ArrowRight size={17} /></Link>
              <Link to="/app/live" className="btn btn-lg btn-outline"><Play size={16} /> Watch live scoring</Link>
            </div>
            <div className="hero-trust">
              <div><b>&lt;100ms</b>live score updates</div>
              <div><b>0</b>fixture clashes</div>
              <div><b>3</b>access roles</div>
            </div>
          </div>
          <HeroMock />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">The problem</div>
            <h2>Why cricket operations break down</h2>
            <p>Most local and college tournaments still run on paper, spreadsheets and group chats.</p>
          </div>
          <div className="problems">
            {problems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="problem">
                <div className="ic"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="features">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Features</div>
            <h2>Everything a tournament needs, in one place</h2>
            <p>From the first registration to the final trophy, every step is tracked, verified and visible.</p>
          </div>
          <div className="features">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature">
                <div className="ic"><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="roles">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Who it’s for</div>
            <h2>Built around the people who run the game</h2>
            <p>Role-based access means everyone sees exactly what they need — and nothing they shouldn’t change.</p>
          </div>
          <div className="roles">
            {roles.map((r) => (
              <div key={r.title} className="role-card">
                <h3 style={{ fontSize: 19 }}>{r.title}</h3>
                <p className="muted" style={{ marginTop: 4 }}>{r.text}</p>
                <ul>{r.items.map((i) => <li key={i}><Check size={16} /> {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="tech">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Technology</div>
            <h2>A modern MERN architecture</h2>
            <p>Three-tier design with real-time data flow, ACID-safe score edits and caching for fast leaderboards.</p>
          </div>
          <div className="arch">
            {arch.map(({ icon: Icon, layer, title, text }) => (
              <div key={title} className="arch-node">
                <Icon size={22} color="#5ee0a8" />
                <div style={{ marginTop: 14 }}><small>{layer}</small></div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Roadmap</div>
            <h2>Phased delivery, season-ready</h2>
            <p>Core algorithms are de-risked early so an end-to-end solution ships before the season opener.</p>
          </div>
          <div className="timeline">
            {timeline.map((s, i) => (
              <div key={s.m} className="tl">
                <div className="dot">{String(i + 1).padStart(2, '0')}</div>
                <small>{s.m.toUpperCase()}</small>
                <h4>{s.t}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-band">
          <div>
            <h2>Ready to run your next tournament?</h2>
            <p>Take a tour of the admin dashboard with sample league data.</p>
          </div>
          <Link to="/app" className="btn btn-lg" style={{ background: '#fff', color: 'var(--brand)', border: 0 }}>
            Open dashboard <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand" style={{ padding: 0 }}><Logo /><span className="brand-name">Crickit</span></div>
              <p style={{ marginTop: 12, maxWidth: 320 }}>Cricket Team Management System — a BCA project at the School of Science & Technology, Swami Rama Himalayan University.</p>
            </div>
            <div><h5>Product</h5><ul><li><Link to="/app">Dashboard</Link></li><li><Link to="/app/live">Live scoring</Link></li><li><Link to="/app/fixtures">Fixtures</Link></li><li><Link to="/app/standings">Leaderboard</Link></li></ul></div>
            <div><h5>Manage</h5><ul><li><Link to="/app/teams">Teams</Link></li><li><Link to="/app/players">Players</Link></li><li><Link to="/app/reports">Reports</Link></li></ul></div>
            <div><h5>Team</h5><ul><li>Sagar Saini</li><li>Aditya Kaintura</li><li>Kajal Bisht</li><li>Mentor: Dr. Anupama Mishra</li></ul></div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Crickit. All rights reserved.</span>
            <span>Swami Rama Himalayan University · Dehradun</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
