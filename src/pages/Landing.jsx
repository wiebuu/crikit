import { Link } from 'react-router-dom';
import {
  ArrowRight, Users, UserCog, Trophy, CalendarDays, Radio, BarChart3, ListChecks, ShieldCheck, Check,
  Monitor, Server, Database, Zap, Plus, LayoutDashboard, KeyRound, History, Lock, Github,
  FileSpreadsheet, MessagesSquare, CalendarX2, Upload, Crown, ClipboardList, UserRound,
} from 'lucide-react';
import { Logo, OppMark, Avatar, StatusBadge, ThemeToggle, TeamLogo } from '../components/ui.jsx';
import { useStore } from '../store.jsx';

const scrollTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

const problems = [
  { icon: FileSpreadsheet, title: 'Squad info in spreadsheets', text: 'Player details, availability and stats live in scattered files that are never up to date.' },
  { icon: MessagesSquare, title: 'Selection by group chat', text: 'Picking the XI means chasing replies. Nobody knows who is injured or unavailable.' },
  { icon: CalendarX2, title: 'Competitions hard to track', text: 'Several leagues and cups at once make fixtures, results and standings easy to lose.' },
];

const steps = [
  { icon: Upload, title: 'Create your team', text: 'Add your team name, upload the logo and set your home ground. It takes a minute.' },
  { icon: Users, title: 'Build the squad', text: 'Register players and staff with roles, jersey numbers and availability.' },
  { icon: Trophy, title: 'Enter competitions', text: 'Add every league, cup or series you play in, then schedule matches inside them.' },
  { icon: ListChecks, title: 'Pick, play, review', text: 'Select the XI, score live and watch the stats update after every ball.' },
];

const roles = [
  { icon: Crown, title: 'Team manager', text: 'Full control of the team.', items: ['Manage squad, staff and team profile', 'Enter competitions and schedule matches', 'Pick the playing XI and approve scores'] },
  { icon: ClipboardList, title: 'Coach & captain', text: 'Day-to-day cricket decisions.', items: ['Track form, fitness and availability', 'Suggest playing XI for each match', 'Score live and review statistics'] },
  { icon: UserRound, title: 'Players', text: 'Everything they need to know.', items: ['Upcoming matches and training', 'Selection notifications', 'Personal stats across competitions'] },
];

const arch = [
  { icon: Monitor, layer: '01 · Client', title: 'React', text: 'Mobile-first dashboard, squad tools and live scoring UI.' },
  { icon: Server, layer: '02 · API', title: 'Express + Node.js', text: 'REST API with role-based access and JWT auth.' },
  { icon: Database, layer: '03 · Data', title: 'MongoDB', text: 'Team, players, staff, competitions, matches and ball-by-ball events.' },
  { icon: Zap, layer: '04 · Realtime', title: 'Socket.IO', text: 'Pushes live scores to every team member instantly.' },
];

const security = [
  { icon: KeyRound, title: 'JWT authentication', text: 'Secure sign-in with short-lived tokens.' },
  { icon: Lock, title: 'Role-based access', text: 'Managers, coaches and players see what they should.' },
  { icon: History, title: 'Audit trail', text: 'Every score edit is logged with who, when and why.' },
];

const faqs = [
  { q: 'Is Crickit for one team or a whole league?', a: 'One team. Crickit is built for a team manager to run their own club: squad, staff, the competitions the team enters, its matches and its statistics.' },
  { q: 'Can my team play in more than one competition?', a: 'Yes. Add as many leagues, cups, series or friendlies as you like. Each match belongs to a competition, so results and records stay organised.' },
  { q: 'How does playing XI selection work?', a: 'Open any upcoming match and tick 11 players. Injured or unavailable players are blocked, and Crickit warns you if there is no wicket-keeper or too few bowling options.' },
  { q: 'Can I upload our team logo and player photos?', a: 'Yes. Upload a logo during team setup or later in Team Profile, and add a photo to each player profile.' },
  { q: 'Does it work on phones?', a: 'Yes. The interface is mobile-first, so you can score from the boundary or update availability on the go.' },
];

function ProductPreview() {
  const { state } = useStore();
  const next = state.matches.filter((m) => m.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date))[0];
  return (
    <div className="product-frame">
      <div className="product-inner">
        <div className="pf-bar"><i /><i /><i /><span className="pf-url">crickit.app/team</span></div>
        <div className="pf-body">
          <div className="pf-side">
            <div className="row" style={{ gap: 8, padding: '6px 6px 12px' }}><TeamLogo size={28} /><b style={{ fontSize: 12.5 }}>{state.team.shortName}</b></div>
            <div className="on"><LayoutDashboard size={14} /> Overview</div>
            <div><Users size={14} /> Squad</div>
            <div><UserCog size={14} /> Staff</div>
            <div><Trophy size={14} /> Competitions</div>
            <div><CalendarDays size={14} /> Matches</div>
            <div><Radio size={14} /> Live Match</div>
            <div><BarChart3 size={14} /> Statistics</div>
          </div>
          <div className="pf-main">
            <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
              <div className="team-hero" style={{ '--tc': state.team.color, margin: 0, padding: 16, gap: 14 }}>
                <TeamLogo size={44} />
                <div><b style={{ fontSize: 15 }}>{state.team.name}</b><div className="subtle" style={{ fontSize: 12 }}>Season {state.season} · {state.players.length} players</div></div>
              </div>
              {next && (
                <div className="card" style={{ boxShadow: 'none', padding: 14 }}>
                  <div className="subtle" style={{ fontSize: 11.5 }}>Next match</div>
                  <div className="row between" style={{ marginTop: 8 }}>
                    <span className="row" style={{ gap: 8, fontSize: 13, fontWeight: 500 }}><OppMark name={next.opponent} size="sm" />vs {next.opponent}</span>
                    <span className="badge badge-accent">XI {next.xi.length}/11</span>
                  </div>
                </div>
              )}
              <div className="card" style={{ boxShadow: 'none', padding: 14 }}>
                <div className="subtle" style={{ fontSize: 11.5 }}>Competitions</div>
                {state.competitions.slice(0, 2).map((c) => (
                  <div key={c.id} className="row between" style={{ marginTop: 8, fontSize: 13 }}>
                    <span className="row" style={{ gap: 8 }}><Trophy size={14} style={{ color: 'var(--brand-text)' }} />{c.name}</span>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ boxShadow: 'none', overflow: 'hidden' }}>
              <div className="card-head" style={{ minHeight: 44, padding: '10px 16px' }}><h3 style={{ fontSize: 13 }}>Squad</h3><span className="hint">Availability</span></div>
              {state.players.slice(0, 7).map((p) => (
                <div key={p.id} className="row between" style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', fontSize: 12.5 }}>
                  <span className="row" style={{ gap: 8 }}><Avatar name={p.name} size={22} /><span style={{ fontWeight: 500 }}>{p.name}</span><span className="subtle mono">#{p.jersey}</span></span>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SquadVisual() {
  const { state } = useStore();
  return (
    <div className="bento-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
      {state.players.slice(0, 6).map((p) => (
        <div key={p.id} className="row" style={{ gap: 8, padding: '8px 10px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <Avatar name={p.name} size={26} />
          <div style={{ minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div><div className="subtle" style={{ fontSize: 11 }}>#{p.jersey} · {p.role}</div></div>
        </div>
      ))}
    </div>
  );
}

function XIVisual() {
  return (
    <div className="bento-visual" style={{ display: 'grid', gap: 6 }}>
      {['Arjun Negi', 'Vikas Bisht', 'Rohit Rawat'].map((n, i) => (
        <div key={n} className={`xi-item${i < 2 ? ' on' : ''}`} style={{ cursor: 'default' }}>
          <input type="checkbox" readOnly checked={i < 2} tabIndex={-1} /><span style={{ fontSize: 13 }}>{n}</span>
        </div>
      ))}
      <span className="badge badge-accent" style={{ justifySelf: 'start', marginTop: 4 }}>11 / 11 selected</span>
    </div>
  );
}

function CompVisual() {
  const { state } = useStore();
  return (
    <div className="bento-visual" style={{ display: 'grid', gap: 8 }}>
      {state.competitions.slice(0, 3).map((c) => (
        <div key={c.id} className="row between" style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <span className="row" style={{ gap: 10 }}><Trophy size={15} style={{ color: 'var(--brand-text)' }} /><span style={{ fontWeight: 500, fontSize: 13 }}>{c.name}</span></span>
          <StatusBadge status={c.result ?? c.status} />
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
          <Link to="/" className="brand"><Logo /><span className="brand-name">Crickit</span></Link>
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
          <Link to="/setup" className="btn btn-dark">Create your team</Link>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <Link to="/app" className="eyebrow"><span className="tag">Demo</span> Explore a sample team dashboard <ArrowRight size={13} /></Link>
          <h1>Your cricket team, <span className="accent">managed properly.</span></h1>
          <p className="lead">
            Crickit gives your team manager one place to run the club: the squad and staff, every competition
            you enter, match fixtures, playing XI selection, live scoring and season stats.
          </p>
          <div className="hero-cta">
            <Link to="/setup" className="btn btn-primary btn-lg">Create your team <ArrowRight size={16} /></Link>
            <Link to="/app" className="btn btn-lg"><LayoutDashboard size={16} /> View demo team</Link>
          </div>
          <div className="hero-note">
            <span><Check size={14} /> Upload your team logo</span>
            <span><Check size={14} /> Works on any device</span>
            <span><Check size={14} /> Built for one team, not a league</span>
          </div>
          <ProductPreview />
        </div>
        <div className="hero-fade" />
      </section>

      <div className="container">
        <div className="metrics" style={{ marginTop: 24 }}>
          <div className="metric"><b>1</b><span>Home for your whole team</span></div>
          <div className="metric"><b>4</b><span>Kinds of competition</span></div>
          <div className="metric"><b>11</b><span>Taps to pick your XI</span></div>
          <div className="metric"><b>&lt;100ms</b><span>Live score updates</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">// The problem</span>
            <h2>Running a cricket team shouldn’t feel like admin work</h2>
            <p>Most school, college and club teams are managed through spreadsheets, paper and group chats. Things get missed.</p>
          </div>
          <div className="problems">
            {problems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="problem"><div className="ic"><Icon size={18} /></div><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="features" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Features</span>
            <h2>Everything a team manager needs</h2>
            <p>From registering a new player to reviewing the season’s stats, it all happens in one place.</p>
          </div>
          <div className="bento">
            <div className="bento-card span-4">
              <div className="ic"><Users size={18} /></div>
              <h3>Squad & staff management</h3>
              <p>Player profiles with photos, jersey numbers, roles, availability and stats. Plus your coaches, physio and analyst.</p>
              <SquadVisual />
            </div>
            <div className="bento-card span-2">
              <div className="ic"><ListChecks size={18} /></div>
              <h3>Playing XI selection</h3>
              <p>Pick 11 from the available players, with checks for a keeper and enough bowlers.</p>
              <XIVisual />
            </div>
            <div className="bento-card span-3">
              <div className="ic"><Trophy size={18} /></div>
              <h3>Every competition you enter</h3>
              <p>Leagues, cups, series and friendlies, each with its own fixtures, record, stage and position.</p>
              <CompVisual />
            </div>
            <div className="bento-card span-3">
              <div className="ic"><Radio size={18} /></div>
              <h3>Live ball-by-ball scoring</h3>
              <p>Score from the boundary rope. Every delivery updates the team’s dashboard and stats in real time.</p>
              <div className="bento-visual balls">{['1', '4', 'W', '0', '6', '2'].map((b, i) => <span key={i} className={`ball b${b}`}>{b}</span>)}</div>
            </div>
            <div className="bento-card span-3">
              <div className="ic"><BarChart3 size={18} /></div>
              <h3>Season statistics</h3>
              <p>Batting and bowling tables, top performers, win rate and results by competition.</p>
            </div>
            <div className="bento-card span-3">
              <div className="ic"><ShieldCheck size={18} /></div>
              <h3>Secure & role-based</h3>
              <p>JWT sign-in, role-based permissions for manager, coach and player, and an audit trail on scores.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// How it works</span>
            <h2>Up and running in four steps</h2>
          </div>
          <div className="steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="step">
                <div className="row between"><span className="n">STEP {String(i + 1).padStart(2, '0')}</span><Icon size={18} style={{ color: 'var(--text-3)' }} /></div>
                <h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="roles" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Roles</span>
            <h2>The manager decides. Everyone stays informed.</h2>
            <p>Role-based access gives each person exactly the tools they need.</p>
          </div>
          <div className="roles">
            {roles.map(({ icon: Icon, title, text, items }) => (
              <div key={title} className="role-card">
                <div className="head"><span className="ic"><Icon size={17} /></span><div><h3>{title}</h3><p className="muted" style={{ fontSize: 13.5 }}>{text}</p></div></div>
                <ul>{items.map((i) => <li key={i}><Check size={15} /> {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tech" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">// Technology</span>
            <h2>Built on the MERN stack</h2>
            <p>A three-tier architecture with real-time updates and secure, auditable data.</p>
          </div>
          <div className="arch">
            {arch.map(({ icon: Icon, layer, title, text }) => (
              <div key={title} className="arch-node">
                <div className="row between"><span className="ic"><Icon size={18} /></span><small>{layer}</small></div>
                <h4>{title}</h4><p>{text}</p>
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

      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head center"><span className="kicker">// FAQ</span><h2>Frequently asked questions</h2></div>
          <div className="faq">
            {faqs.map((f) => <details key={f.q}><summary>{f.q}<Plus size={18} /></summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-band">
          <h2>Give your team the setup it deserves</h2>
          <p>Create your team in a minute, or explore the demo team first.</p>
          <div className="row">
            <Link to="/setup" className="btn btn-lg btn-white">Create your team <ArrowRight size={16} /></Link>
            <Link to="/app" className="btn btn-lg btn-outline">View demo team</Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand"><Logo /><span className="brand-name">Crickit</span></div>
              <p style={{ marginTop: 14, maxWidth: 340 }}>Cricket Team Management System. A BCA project at the School of Science & Technology, Swami Rama Himalayan University.</p>
              <a href="https://github.com/wiebuu/crikit" target="_blank" rel="noreferrer" className="btn btn-sm" style={{ marginTop: 18 }}><Github size={14} /> View on GitHub</a>
            </div>
            <div><h5>Team</h5><ul><li><Link to="/app">Overview</Link></li><li><Link to="/app/squad">Squad</Link></li><li><Link to="/app/staff">Staff</Link></li><li><Link to="/app/team">Team profile</Link></li></ul></div>
            <div><h5>Cricket</h5><ul><li><Link to="/app/competitions">Competitions</Link></li><li><Link to="/app/matches">Matches</Link></li><li><Link to="/app/live">Live match</Link></li><li><Link to="/app/stats">Statistics</Link></li></ul></div>
            <div><h5>Project team</h5><ul><li>Sagar Saini</li><li>Aditya Kaintura</li><li>Kajal Bisht</li><li className="subtle">Mentor: Dr. Anupama Mishra</li></ul></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Crickit. All rights reserved.</span><span>Swami Rama Himalayan University · Dehradun</span></div>
        </div>
      </footer>
    </div>
  );
}
