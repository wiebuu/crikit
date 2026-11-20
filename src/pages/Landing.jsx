import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarX2, FileWarning, EyeOff, Users, CalendarDays, Radio, Trophy, FileText, ShieldCheck,
  Check, Monitor, Server, Database, Zap, Plus, LayoutDashboard, Shield, KeyRound, History, Lock,
  ClipboardList, UserRound, Github,
} from 'lucide-react';
import { Logo, TeamMark, Form, fmtNrr, ThemeToggle } from '../components/ui.jsx';
import { teams, liveMatch, fixtures, teamById } from '../data/mock.js';

const standings = [...teams].sort((a, b) => b.pts - a.pts || b.nrr - a.nrr);
const scrollTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

const problems = [
  { icon: CalendarX2, title: 'Scattered scheduling', text: 'Paper and spreadsheets cause fixture conflicts and last-minute changes.' },
  { icon: FileWarning, title: 'Lost or duplicate records', text: 'Manual scorekeeping leads to missing match records and inconsistent stats.' },
  { icon: EyeOff, title: 'Delayed visibility', text: 'Standings aren’t updated in real time, so teams and fans lack timely insight.' },
];

const steps = [
  { title: 'Register teams & players', text: 'Coaches build structured squad profiles. Admins approve teams and set up venues.' },
  { title: 'Generate the schedule', text: 'The fixture engine creates a clash-free round-robin across every venue in one click.' },
  { title: 'Score live, publish instantly', text: 'Each delivery is recorded, verified and pushed to dashboards, standings and reports.' },
];

const roles = [
  { icon: Shield, title: 'Admin', text: 'Manages the whole system.', items: ['Register teams, players and venues', 'Generate and edit fixtures', 'Verify scores and export reports'] },
  { icon: ClipboardList, title: 'Coach', text: 'Manages a squad through the season.', items: ['Maintain player profiles', 'Pick the playing XI for each match', 'Track team form and statistics'] },
  { icon: UserRound, title: 'Players & fans', text: 'Follow every ball as it happens.', items: ['Live scores and commentary', 'Personal stats and records', 'Leaderboards and fixtures'] },
];

const arch = [
  { icon: Monitor, layer: '01 · Client', title: 'React', text: 'Mobile-first dashboards, fixture calendar and scoring UI.' },
  { icon: Server, layer: '02 · API', title: 'Express + Node.js', text: 'REST API with role-based middleware and JWT auth.' },
  { icon: Database, layer: '03 · Data', title: 'MongoDB', text: 'Teams, players, fixtures and ball-by-ball events.' },
  { icon: Zap, layer: '04 · Realtime', title: 'Socket.IO', text: 'Pushes scores and standings to clients instantly.' },
];

const security = [
  { icon: KeyRound, title: 'JWT authentication', text: 'Short-lived access tokens with refresh flows.' },
  { icon: Lock, title: 'Role-based access', text: 'Server-side checks for Admin, Coach and Player.' },
  { icon: History, title: 'Audit trail', text: 'Every score edit is logged with who, when and why.' },
];

const timeline = [
  { m: 'Month 01', t: 'Discovery & architecture', p: 100 },
  { m: 'Month 02', t: 'Core data & scheduling engine', p: 100 },
  { m: 'Month 03', t: 'Scoring & live pipeline', p: 60 },
  { m: 'Month 04', t: 'Dashboards & reporting', p: 15 },
  { m: 'Month 05', t: 'Pilot & launch', p: 0 },
];

const faqs = [
  { q: 'Who is Crickit built for?', a: 'Cricket teams at schools, colleges and clubs: the admins who run them, the coaches who manage squads, and the players and fans who follow every match. It replaces spreadsheets and group chats with one shared source of truth.' },
  { q: 'How does the fixture generator avoid clashes?', a: 'It uses a deterministic round-robin algorithm that checks venue availability and minimum rest days per team before committing a schedule.' },
  { q: 'How is Net Run Rate calculated?', a: 'NRR is recomputed on every committed result: runs scored per over minus runs conceded per over, across all completed matches.' },
  { q: 'Can scores be changed after a match?', a: 'Only by authorised roles. Every edit is recorded in an immutable audit log and can require umpire verification.' },
  { q: 'Does it work on phones?', a: 'Yes. The interface is mobile-first, so scorers can record deliveries from the boundary on any device.' },
];

/* ---------- Product preview shown in the hero ---------- */
function ProductPreview() {
  const lm = liveMatch;
  return (
    <div className="product-frame">
      <div className="product-inner">
        <div className="pf-bar"><i /><i /><i /><span className="pf-url">crickit.app/dashboard</span></div>
        <div className="pf-body">
          <div className="pf-side">
            <div className="on"><LayoutDashboard size={14} /> Dashboard</div>
            <div><Radio size={14} /> Live Scoring</div>
            <div><CalendarDays size={14} /> Fixtures</div>
            <div><Trophy size={14} /> Leaderboard</div>
            <div><Shield size={14} /> Teams</div>
            <div><Users size={14} /> Players</div>
            <div><FileText size={14} /> Reports</div>
          </div>
          <div className="pf-main">
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="scoreboard" style={{ padding: '16px 18px' }}>
                <div className="row between">
                  <span className="sb-label">M31 · Ganga Titans chasing 173</span>
                  <span className="badge" style={{ background: 'rgba(255,255,255,.06)', color: '#d6d8e6', borderColor: 'rgba(255,255,255,.1)' }}><span className="live-dot" style={{ color: '#8ea2ff' }} /> LIVE</span>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <TeamMark id="GT" />
                  <span className="sb-score" style={{ fontSize: 32 }}>{lm.runs}/{lm.wkts}</span>
                  <span className="sb-overs">({lm.overs})</span>
                </div>
                <div className="sb-pills" style={{ marginTop: 12 }}>
                  <div className="sb-pill">CRR<b>{lm.crr}</b></div>
                  <div className="sb-pill">RRR<b>{lm.rrr}</b></div>
                  <div className="sb-pill">Need<b>46</b></div>
                </div>
              </div>
              <div className="card" style={{ boxShadow: 'none' }}>
                <div className="card-head" style={{ minHeight: 44, padding: '10px 16px' }}><h3 style={{ fontSize: 13 }}>Upcoming</h3></div>
                {fixtures.filter((f) => f.status === 'Upcoming').slice(0, 2).map((f) => (
                  <div key={f.id} className="row between" style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: 12.5 }}>
                    <span className="row" style={{ gap: 8 }}><TeamMark id={f.home} size="sm" /><b style={{ fontWeight: 500 }}>{f.home} vs {f.away}</b><TeamMark id={f.away} size="sm" /></span>
                    <span className="subtle mono">{f.date.slice(5)} · {f.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ boxShadow: 'none', overflow: 'hidden' }}>
              <div className="card-head" style={{ minHeight: 44, padding: '10px 16px' }}><h3 style={{ fontSize: 13 }}>Points table</h3><span className="hint">NRR</span></div>
              <table className="table" style={{ fontSize: 12.5 }}>
                <tbody>
                  {standings.slice(0, 6).map((t, i) => (
                    <tr key={t.id} className={i < 4 ? 'qualify' : ''}>
                      <td style={{ padding: '9px 14px' }}><div className="row" style={{ gap: 8 }}><span className="subtle mono" style={{ width: 12 }}>{i + 1}</span><TeamMark id={t.id} size="sm" /><span style={{ fontWeight: 500 }}>{t.name}</span></div></td>
                      <td className="num" style={{ padding: '9px 14px', color: t.nrr >= 0 ? 'var(--success)' : 'var(--red)' }}>{fmtNrr(t.nrr)}</td>
                      <td className="num" style={{ padding: '9px 14px' }}><b>{t.pts}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small visuals for the bento grid ---------- */
function BallsVisual() {
  return (
    <div className="bento-visual">
      <div className="balls">
        {['1', '4', 'W', '0', '6', '2'].map((b, i) => <span key={i} className={`ball b${b}`}>{b}</span>)}
      </div>
      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        {liveMatch.commentary.slice(0, 3).map((c) => (
          <div key={c.ball} className="row" style={{ fontSize: 13, gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            <span className="mono" style={{ fontWeight: 500, fontSize: 12 }}>{c.ball}</span>
            <span className="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StandingsVisual() {
  return (
    <div className="bento-visual" style={{ display: 'grid', gap: 8 }}>
      {standings.slice(0, 3).map((t, i) => (
        <div key={t.id} className="row between" style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <span className="row" style={{ gap: 10 }}><span className="mono subtle" style={{ fontSize: 12 }}>{i + 1}</span><TeamMark id={t.id} size="sm" /><span style={{ fontWeight: 500, fontSize: 13 }}>{t.name}</span></span>
          <Form form={t.form.slice(-3)} />
        </div>
      ))}
    </div>
  );
}

function FixtureVisual() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const filled = { 0: ['HH', 'NK'], 2: ['DS', 'MM'], 3: ['RR', 'GT'], 5: ['HR', 'GG'], 6: ['HH', 'DS'] };
  return (
    <div className="bento-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
      {days.map((d, i) => (
        <div key={d} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 8, background: 'var(--surface-2)', minHeight: 84 }}>
          <div className="subtle" style={{ fontSize: 11 }}>{d}</div>
          {filled[i] && (
            <div style={{ display: 'grid', gap: 4, marginTop: 8 }}>
              <TeamMark id={filled[i][0]} size="sm" />
              <TeamMark id={filled[i][1]} size="sm" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="lp">
      <header className="lp-nav">
        <div className="container">
          <Link to="/" className="brand">
            <Logo />
            <span className="brand-name">Crickit</span>
          </Link>
          <nav>
            <a href="#features" onClick={scrollTo('features')}>Features</a>
            <a href="#how" onClick={scrollTo('how')}>How it works</a>
            <a href="#roles" onClick={scrollTo('roles')}>Roles</a>
            <a href="#tech" onClick={scrollTo('tech')}>Technology</a>
            <a href="#faq" onClick={scrollTo('faq')}>FAQ</a>
          </nav>
          <div className="spacer" />
          <ThemeToggle className="icon-btn ghost" />
          <Link to="/login" className="btn btn-ghost hide-sm">Sign in</Link>
          <Link to="/app" className="btn btn-dark">Open app</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <Link to="/app/live" className="eyebrow">
            <span className="tag">New</span> Live ball-by-ball scoring is here <ArrowRight size={13} />
          </Link>
          <h1>Cricket team management, <span className="accent">made simple.</span></h1>
          <p className="lead">
            Crickit brings team and player registration, match scheduling, live scoring and real-time
            standings into one secure platform — for admins, coaches and players.
          </p>
          <div className="hero-cta">
            <Link to="/app" className="btn btn-primary btn-lg">Explore the dashboard <ArrowRight size={16} /></Link>
            <Link to="/app/live" className="btn btn-lg"><Radio size={16} /> Try live scoring</Link>
          </div>
          <div className="hero-note">
            <span><Check size={14} /> No setup needed</span>
            <span><Check size={14} /> Works on any device</span>
            <span><Check size={14} /> Sample team data included</span>
          </div>
          <ProductPreview />
        </div>
        <div className="hero-fade" />
      </section>

      {/* Metrics */}
      <div className="container">
        <div className="metrics" style={{ marginTop: 24 }}>
          <div className="metric"><b>&lt;100ms</b><span>Live score delivery</span></div>
          <div className="metric"><b>0</b><span>Fixture clashes</span></div>
          <div className="metric"><b>3</b><span>Access roles</span></div>
          <div className="metric"><b>100%</b><span>Score edits audited</span></div>
        </div>
      </div>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">// The problem</span>
            <h2>Why cricket operations break down</h2>
            <p>Most school, college and club teams are still managed on paper, spreadsheets and group chats. That costs time and causes mistakes.</p>
          </div>
          <div className="problems">
            {problems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="problem">
                <div className="ic"><Icon size={18} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features (bento) */}
      <section className="section" id="features" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Features</span>
            <h2>Everything your team needs, in one place</h2>
            <p>From registering players to the final scorecard, every step is tracked, verified and visible.</p>
          </div>
          <div className="bento">
            <div className="bento-card span-4">
              <div className="ic"><Radio size={18} /></div>
              <h3>Live ball-by-ball scoring</h3>
              <p>A fast scoring console built for the boundary rope. Every delivery streams to connected dashboards in real time.</p>
              <BallsVisual />
            </div>
            <div className="bento-card span-2">
              <div className="ic"><Trophy size={18} /></div>
              <h3>Instant leaderboards</h3>
              <p>Points and Net Run Rate recalculated the moment a result is committed.</p>
              <StandingsVisual />
            </div>
            <div className="bento-card span-3">
              <div className="ic"><CalendarDays size={18} /></div>
              <h3>Smart fixture engine</h3>
              <p>Clash-free round-robin schedules that respect venues and rest days.</p>
              <FixtureVisual />
            </div>
            <div className="bento-card span-3">
              <div className="ic"><Users size={18} /></div>
              <h3>Team & player registration</h3>
              <p>Structured profiles for squads, captains, coaches and players, with roles, fitness and history.</p>
              <div className="bento-visual" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {teams.map((t) => <span key={t.id} className="badge" style={{ height: 30, paddingLeft: 4 }}><TeamMark id={t.id} size="sm" />{t.name}</span>)}
              </div>
            </div>
            <div className="bento-card span-3">
              <div className="ic"><FileText size={18} /></div>
              <h3>Reports & summaries</h3>
              <p>Downloadable PDF and CSV reports, plus shareable match summaries for every stakeholder.</p>
            </div>
            <div className="bento-card span-3">
              <div className="ic"><ShieldCheck size={18} /></div>
              <h3>Secure by design</h3>
              <p>JWT authentication, role-based access, input validation and an audit trail for every score edit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// How it works</span>
            <h2>From sign-up to final in three steps</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={s.title} className="step">
                <span className="n">STEP {String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section" id="roles" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Roles</span>
            <h2>Built around the people who run the game</h2>
            <p>Role-based access means everyone sees exactly what they need, and nothing they shouldn’t change.</p>
          </div>
          <div className="roles">
            {roles.map(({ icon: Icon, title, text, items }) => (
              <div key={title} className="role-card">
                <div className="head">
                  <span className="ic"><Icon size={17} /></span>
                  <div><h3>{title}</h3><p className="muted" style={{ fontSize: 13.5 }}>{text}</p></div>
                </div>
                <ul>{items.map((i) => <li key={i}><Check size={15} /> {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section" id="tech" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Technology</span>
            <h2>A modern MERN architecture</h2>
            <p>Three-tier design with real-time data flow, ACID-safe score edits and caching for fast leaderboards.</p>
          </div>
          <div className="arch">
            {arch.map(({ icon: Icon, layer, title, text }) => (
              <div key={title} className="arch-node">
                <div className="row between"><span className="ic"><Icon size={18} /></span><small>{layer}</small></div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="sec-row">
            {security.map(({ icon: Icon, title, text }) => (
              <div key={title} className="sec-item"><Icon size={18} /><div><b>{title}</b><span>{text}</span></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section" id="roadmap" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Roadmap</span>
            <h2>Phased delivery, season-ready</h2>
            <p>Core algorithms are de-risked early so a complete solution ships before the season opener.</p>
          </div>
          <div className="timeline">
            {timeline.map((s) => (
              <div key={s.m} className="tl">
                <div className="bar"><i style={{ width: `${s.p}%` }} /></div>
                <small>{s.m}</small>
                <h4>{s.t}</h4>
                <span className={`badge ${s.p === 100 ? 'badge-green' : s.p > 0 ? 'badge-amber' : ''}`} style={{ marginTop: 12 }}>
                  {s.p === 100 ? 'Done' : s.p > 0 ? 'In progress' : 'Planned'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head center">
            <span className="kicker">// FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Plus size={18} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <div className="cta-band">
          <h2>Ready to manage your team?</h2>
          <p>Take a tour of the admin dashboard with sample teams and matches.</p>
          <div className="row">
            <Link to="/app" className="btn btn-lg btn-white">Open dashboard <ArrowRight size={16} /></Link>
            <Link to="/login" className="btn btn-lg btn-outline">Sign in</Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand"><Logo /><span className="brand-name">Crickit</span></div>
              <p style={{ marginTop: 14, maxWidth: 340 }}>
                Cricket Team Management System. A BCA project at the School of Science & Technology,
                Swami Rama Himalayan University.
              </p>
              <a href="https://github.com/wiebuu/crikit" target="_blank" rel="noreferrer" className="btn btn-sm" style={{ marginTop: 18 }}>
                <Github size={14} /> View on GitHub
              </a>
            </div>
            <div><h5>Product</h5><ul><li><Link to="/app">Dashboard</Link></li><li><Link to="/app/live">Live scoring</Link></li><li><Link to="/app/fixtures">Fixtures</Link></li><li><Link to="/app/standings">Leaderboard</Link></li></ul></div>
            <div><h5>Manage</h5><ul><li><Link to="/app/teams">Teams</Link></li><li><Link to="/app/players">Players</Link></li><li><Link to="/app/reports">Reports</Link></li><li><Link to="/login">Sign in</Link></li></ul></div>
            <div><h5>Project team</h5><ul><li>Sagar Saini</li><li>Aditya Kaintura</li><li>Kajal Bisht</li><li className="subtle">Mentor: Dr. Anupama Mishra</li></ul></div>
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
